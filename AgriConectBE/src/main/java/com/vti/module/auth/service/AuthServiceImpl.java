package com.vti.module.auth.service;

import com.vti.common.enums.AccountStatus;
import com.vti.common.enums.UserRole;
import com.vti.exception.AppException;
import com.vti.exception.ErrorCode;
import com.vti.module.account.entity.Account;
import com.vti.module.account.entity.Partner;
import com.vti.module.account.entity.Shipper;
import com.vti.module.account.entity.Supplier;
import com.vti.module.account.repository.AccountRepository;
import com.vti.module.auth.dto.*;
import com.vti.module.auth.entity.EmailVerification;
import com.vti.module.auth.entity.PasswordReset;
import com.vti.module.auth.entity.RefreshToken;
import com.vti.module.auth.repository.EmailVerificationRepository;
import com.vti.module.auth.repository.PasswordResetRepository;
import com.vti.module.auth.repository.RefreshTokenRepository;
import com.vti.security.jwt.JwtProperties;
import com.vti.security.jwt.JwtService;
import com.vti.util.EmailService;
import com.vti.util.OtpService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Lazy;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.UUID;

/**
 * Service implementation cho module Auth
 */
@Service
public class AuthServiceImpl implements AuthService {

    private static final org.slf4j.Logger log = org.slf4j.LoggerFactory.getLogger(AuthServiceImpl.class);

    private final AccountRepository accountRepository;
    private final RefreshTokenRepository refreshTokenRepository;
    private final EmailVerificationRepository emailVerificationRepository;
    private final PasswordResetRepository passwordResetRepository;
    private final JwtService jwtService;
    private final JwtProperties jwtProperties;
    private final PasswordEncoder passwordEncoder;
    private final OtpService otpService;
    private final EmailService emailService;

    @Value("${app.otp.expiration-minutes:10}")
    private int otpExpirationMinutes;

    // Inject các dependency bằng constructor (EmailService dùng @Lazy để tránh circular dependency)
    public AuthServiceImpl(AccountRepository accountRepository,
                           RefreshTokenRepository refreshTokenRepository,
                           EmailVerificationRepository emailVerificationRepository,
                           PasswordResetRepository passwordResetRepository,
                           JwtService jwtService,
                           JwtProperties jwtProperties,
                           PasswordEncoder passwordEncoder,
                           OtpService otpService,
                           @Lazy EmailService emailService) {
        this.accountRepository = accountRepository;
        this.refreshTokenRepository = refreshTokenRepository;
        this.emailVerificationRepository = emailVerificationRepository;
        this.passwordResetRepository = passwordResetRepository;
        this.jwtService = jwtService;
        this.jwtProperties = jwtProperties;
        this.passwordEncoder = passwordEncoder;
        this.otpService = otpService;
        this.emailService = emailService;
    }

    @Override
    @Transactional
    public AuthResponse login(LoginRequest request) {
        log.info("Xử lý đăng nhập cho email: {}", request.getEmail());
        
        // 1. Tìm account theo email
        Account account = accountRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new AppException(ErrorCode.AUTH_INVALID_CREDENTIALS));

        // 2. Check password bằng passwordEncoder.matches()
        if (!passwordEncoder.matches(request.getPassword(), account.getPassword())) {
            throw new AppException(ErrorCode.AUTH_INVALID_CREDENTIALS);
        }

        // 3. Check status
        switch (account.getStatus()) {
            case PENDING_VERIFICATION:
                throw new AppException(ErrorCode.AUTH_ACCOUNT_NOT_VERIFIED);
            case PENDING_APPROVAL:
                throw new AppException(ErrorCode.AUTH_ACCOUNT_PENDING_APPROVAL);
            case REJECTED:
                throw new AppException(ErrorCode.AUTH_ACCOUNT_REJECTED);
            case LOCKED:
                throw new AppException(ErrorCode.AUTH_ACCOUNT_LOCKED);
            case ACTIVE:
            default:
                break;
        }

        // 4. Tạo Access Token + Refresh Token
        com.vti.security.UserPrincipal principal = new com.vti.security.UserPrincipal(account);
        String accessToken = jwtService.generateAccessToken(principal, account.getRole());
        String refreshTokenString = jwtService.generateRefreshToken(principal);

        RefreshToken refreshToken = new RefreshToken();
        refreshToken.setToken(refreshTokenString);
        refreshToken.setAccount(account);
        refreshToken.setExpiresAt(LocalDateTime.now().plusSeconds(jwtProperties.getRefreshTokenExpiration() / 1000));
        refreshToken.setRevoked(false);
        
        refreshTokenRepository.save(refreshToken);

        AuthResponse response = new AuthResponse();
        response.setAccessToken(accessToken);
        response.setRefreshToken(refreshTokenString);
        response.setUserId(account.getId());
        response.setEmail(account.getEmail());
        response.setFullName(account.getFullName());
        response.setAvatar(account.getAvatar());
        response.setRole(account.getRole());
        response.setStatus(account.getStatus());
        return response;
    }

    @Override
    @Transactional
    public void register(RegisterRequest request) {
        log.info("Xử lý đăng ký tài khoản cho email: {}", request.getEmail());
        
        // 1. Validate email chưa tồn tại
        if (accountRepository.existsByEmail(request.getEmail())) {
            throw new AppException(ErrorCode.AUTH_EMAIL_ALREADY_EXISTS);
        }

        // 2. Tạo đối tượng Account phù hợp theo role
        Account account;
        switch (request.getRole()) {
            case PARTNER:
                Partner partner = new Partner();
                partner.setCompanyName(request.getCompanyName());
                partner.setTaxCode(request.getTaxCode());
                partner.setBusinessType(request.getBusinessType());
                account = partner;
                break;
            case SUPPLIER:
                Supplier supplier = new Supplier();
                supplier.setFarmName(request.getFarmName());
                account = supplier;
                break;
            case SHIPPER:
                Shipper shipper = new Shipper();
                shipper.setVehicleType(request.getVehicleType());
                account = shipper;
                break;
            default:
                throw new AppException(ErrorCode.SYSTEM_VALIDATION_ERROR);
        }

        // 3. Gán thông tin chung và hash password
        account.setEmail(request.getEmail());
        account.setPassword(passwordEncoder.encode(request.getPassword()));
        account.setFullName(request.getFullName());
        account.setPhone(request.getPhone());
        account.setProvince(request.getProvince());
        account.setRole(request.getRole());
        
        // 4. Set status = PENDING_VERIFICATION
        account.setStatus(AccountStatus.PENDING_VERIFICATION);

        // 5. Lưu vào DB
        accountRepository.save(account);
        
        // 6. Tạo OTP và gửi qua EmailService
        generateAndSendOtp(account.getEmail());
    }

    private void generateAndSendOtp(String email) {
        // Hủy các OTP cũ
        emailVerificationRepository.invalidateAllOtpByEmail(email);

        String otp = otpService.generateOtp();
        EmailVerification verification = new EmailVerification();
        verification.setEmail(email);
        verification.setOtpCode(otp);
        verification.setUsed(false);
        verification.setExpiresAt(LocalDateTime.now().plusMinutes(otpExpirationMinutes));
        
        emailVerificationRepository.save(verification);
        emailService.sendOtpEmail(email, otp);
    }

    @Override
    @Transactional
    public void verifyEmail(VerifyOtpRequest request) {
        log.info("Xác thực email cho: {}", request.getEmail());
        
        // 1. Tìm OTP mới nhất trong DB
        EmailVerification verification = emailVerificationRepository
                .findTopByEmailAndUsedFalseOrderByCreatedAtDesc(request.getEmail())
                .orElseThrow(() -> new AppException(ErrorCode.AUTH_OTP_INVALID));
                
        if (verification.getExpiresAt().isBefore(LocalDateTime.now())) {
            throw new AppException(ErrorCode.AUTH_OTP_EXPIRED);
        }
        
        // 2. Kiểm tra mã OTP
        if (!verification.getOtpCode().equals(request.getOtpCode())) {
            throw new AppException(ErrorCode.AUTH_OTP_INVALID);
        }
        
        // Đánh dấu OTP used = true
        verification.setUsed(true);
        emailVerificationRepository.save(verification);
        
        Account account = accountRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new AppException(ErrorCode.ACCOUNT_NOT_FOUND));
                
        // 3 & 4. Cập nhật status
        if (account.getRole() == UserRole.ADMIN) {
            account.setStatus(AccountStatus.ACTIVE);
        } else {
            account.setStatus(AccountStatus.PENDING_APPROVAL);
        }
        
        accountRepository.save(account);
    }

    @Override
    @Transactional
    public void resendOtp(String email) {
        log.info("Gửi lại OTP cho email: {}", email);
        if (!accountRepository.existsByEmail(email)) {
            throw new AppException(ErrorCode.ACCOUNT_NOT_FOUND);
        }
        generateAndSendOtp(email);
    }

    @Override
    @Transactional
    public AuthResponse refreshToken(RefreshTokenRequest request) {
        log.info("Làm mới token");
        
        // 1. Tìm RefreshToken trong DB
        RefreshToken refreshToken = refreshTokenRepository.findByToken(request.getRefreshToken())
                .orElseThrow(() -> new AppException(ErrorCode.AUTH_REFRESH_TOKEN_INVALID));
                
        // 2. Kiểm tra tính hợp lệ
        if (refreshToken.isRevoked() || refreshToken.getExpiresAt().isBefore(LocalDateTime.now())) {
            throw new AppException(ErrorCode.AUTH_REFRESH_TOKEN_INVALID);
        }
        
        Account account = refreshToken.getAccount();
        
        // 3. Tạo Access Token mới
        com.vti.security.UserPrincipal principal = new com.vti.security.UserPrincipal(account);
        String newAccessToken = jwtService.generateAccessToken(principal, account.getRole());
        
        AuthResponse response = new AuthResponse();
        response.setAccessToken(newAccessToken);
        response.setRefreshToken(refreshToken.getToken());
        response.setUserId(account.getId());
        response.setEmail(account.getEmail());
        response.setFullName(account.getFullName());
        response.setAvatar(account.getAvatar());
        response.setRole(account.getRole());
        response.setStatus(account.getStatus());
        return response;
    }

    @Override
    @Transactional
    public void logout(String refreshToken) {
        log.info("Xử lý đăng xuất");
        // Tìm RefreshToken, set revoked = true
        refreshTokenRepository.findByToken(refreshToken).ifPresent(token -> {
            token.setRevoked(true);
            refreshTokenRepository.save(token);
        });
    }

    @Override
    @Transactional
    public void forgotPassword(ForgotPasswordRequest request) {
        log.info("Yêu cầu quên mật khẩu cho email: {}", request.getEmail());
        
        // 1. Tìm account theo email
        Account account = accountRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new AppException(ErrorCode.ACCOUNT_NOT_FOUND));
                
        // 2. Tạo UUID token, lưu vào PasswordReset
        String resetTokenString = UUID.randomUUID().toString();
        
        PasswordReset passwordReset = new PasswordReset();
        passwordReset.setEmail(account.getEmail());
        passwordReset.setResetToken(resetTokenString);
        passwordReset.setUsed(false);
        passwordReset.setExpiresAt(LocalDateTime.now().plusMinutes(60)); // Link có hiệu lực 60 phút
        
        passwordResetRepository.save(passwordReset);
        
        // 3. Gửi email reset link qua EmailService
        emailService.sendPasswordResetEmail(account.getEmail(), resetTokenString);
    }

    @Override
    @Transactional
    public void resetPassword(ResetPasswordRequest request) {
        log.info("Đặt lại mật khẩu với reset token");
        
        // 1. Tìm PasswordReset theo token
        PasswordReset passwordReset = passwordResetRepository.findByResetToken(request.getResetToken())
                .orElseThrow(() -> new AppException(ErrorCode.AUTH_RESET_TOKEN_INVALID));
                
        // 2. Kiểm tra isValid
        if (passwordReset.isUsed() || passwordReset.getExpiresAt().isBefore(LocalDateTime.now())) {
            throw new AppException(ErrorCode.AUTH_RESET_TOKEN_INVALID);
        }
        
        // 3. Validate confirmPassword
        if (!request.getNewPassword().equals(request.getConfirmPassword())) {
            throw new AppException(ErrorCode.AUTH_INVALID_CREDENTIALS);
        }
        
        Account account = accountRepository.findByEmail(passwordReset.getEmail())
                .orElseThrow(() -> new AppException(ErrorCode.ACCOUNT_NOT_FOUND));
                
        // 4. Cập nhật password đã hash cho Account
        account.setPassword(passwordEncoder.encode(request.getNewPassword()));
        accountRepository.save(account);
        
        // 5. Đánh dấu token used = true
        passwordReset.setUsed(true);
        passwordResetRepository.save(passwordReset);
        
        // Vô hiệu hóa tất cả refresh token cũ
        refreshTokenRepository.revokeAllByAccountId(account.getId());
    }

    @Override
    @Transactional
    public void changePassword(ChangePasswordRequest request, Long currentUserId) {
        log.info("Đổi mật khẩu cho userId: {}", currentUserId);
        
        // 1. Tìm user hiện tại theo ID
        Account account = accountRepository.findById(currentUserId)
                .orElseThrow(() -> new AppException(ErrorCode.ACCOUNT_NOT_FOUND));
                
        // 2. Kiểm tra oldPassword
        if (!passwordEncoder.matches(request.getOldPassword(), account.getPassword())) {
            throw new AppException(ErrorCode.AUTH_OLD_PASSWORD_INCORRECT);
        }
        
        // 3. Validate confirm == new
        if (!request.getNewPassword().equals(request.getConfirmPassword())) {
            throw new AppException(ErrorCode.AUTH_INVALID_CREDENTIALS);
        }
        
        // 4. Cập nhật password
        account.setPassword(passwordEncoder.encode(request.getNewPassword()));
        accountRepository.save(account);
        
        // Vô hiệu hóa tất cả refresh token cũ
        refreshTokenRepository.revokeAllByAccountId(account.getId());
    }
}
