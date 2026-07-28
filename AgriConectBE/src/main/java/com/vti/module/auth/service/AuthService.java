package com.vti.module.auth.service;

import com.vti.module.auth.dto.*;

/**
 * Service interface cho module Auth
 */
public interface AuthService {
    /**
     * Xử lý đăng nhập
     */
    AuthResponse login(LoginRequest request);

    /**
     * Xử lý đăng ký tài khoản mới
     */
    void register(RegisterRequest request);

    /**
     * Xác thực email bằng mã OTP
     */
    void verifyEmail(VerifyOtpRequest request);

    /**
     * Gửi lại mã OTP
     */
    void resendOtp(String email);

    /**
     * Làm mới access token bằng refresh token
     */
    AuthResponse refreshToken(RefreshTokenRequest request);

    /**
     * Đăng xuất, hủy refresh token
     */
    void logout(String refreshToken);

    /**
     * Yêu cầu quên mật khẩu
     */
    void forgotPassword(ForgotPasswordRequest request);

    /**
     * Đặt lại mật khẩu sử dụng reset token
     */
    void resetPassword(ResetPasswordRequest request);

    /**
     * Đổi mật khẩu cho người dùng đang đăng nhập
     */
    void changePassword(ChangePasswordRequest request, Long currentUserId);
}
