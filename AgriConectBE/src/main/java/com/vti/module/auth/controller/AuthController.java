package com.vti.module.auth.controller;

import com.vti.common.ApiResponse;
import com.vti.module.auth.dto.*;
import com.vti.module.auth.service.AuthService;
import com.vti.security.UserPrincipal;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;

/**
 * REST Controller cung cấp các API liên quan đến xác thực người dùng.
 */
@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
@Tag(name = "Authentication", description = "API xác thực người dùng")
public class AuthController {
    
    private final AuthService authService;
    
    /**
     * API đăng nhập
     * 
     * @param request Dữ liệu đăng nhập (email, mật khẩu)
     * @return AuthResponse chứa token
     */
    @Operation(summary = "Đăng nhập")
    @PostMapping("/login")
    public ResponseEntity<ApiResponse<AuthResponse>> login(@Valid @RequestBody LoginRequest request) {
        return ResponseEntity.ok(ApiResponse.success(authService.login(request)));
    }
    
    /**
     * API đăng ký tài khoản mới
     * 
     * @param request Dữ liệu đăng ký
     * @return Trạng thái thành công
     */
    @Operation(summary = "Đăng ký tài khoản")
    @PostMapping("/register")
    public ResponseEntity<ApiResponse<Void>> register(@Valid @RequestBody RegisterRequest request) {
        authService.register(request);
        return ResponseEntity.ok(ApiResponse.success(null));
    }
    
    /**
     * API xác thực email bằng OTP
     * 
     * @param request Dữ liệu xác thực OTP (email, otp)
     * @return Trạng thái thành công
     */
    @Operation(summary = "Xác thực email bằng mã OTP")
    @PostMapping("/verify-email")
    public ResponseEntity<ApiResponse<Void>> verifyEmail(@Valid @RequestBody VerifyOtpRequest request) {
        authService.verifyEmail(request);
        return ResponseEntity.ok(ApiResponse.success(null));
    }
    
    /**
     * API yêu cầu gửi lại mã OTP
     * 
     * @param request Dữ liệu yêu cầu gửi OTP (email)
     * @return Trạng thái thành công
     */
    @Operation(summary = "Yêu cầu gửi lại mã OTP")
    @PostMapping("/resend-otp")
    public ResponseEntity<ApiResponse<Void>> resendOtp(@Valid @RequestBody ResendOtpRequest request) {
        authService.resendOtp(request.getEmail());
        return ResponseEntity.ok(ApiResponse.success(null));
    }
    
    /**
     * API lấy mới Access Token dựa vào Refresh Token
     * 
     * @param request Dữ liệu Refresh Token
     * @return AuthResponse chứa token mới
     */
    @Operation(summary = "Refresh access token")
    @PostMapping("/refresh")
    public ResponseEntity<ApiResponse<AuthResponse>> refreshToken(@Valid @RequestBody RefreshTokenRequest request) {
        return ResponseEntity.ok(ApiResponse.success(authService.refreshToken(request)));
    }
    
    /**
     * API đăng xuất (Hủy Refresh Token)
     * 
     * @param request Dữ liệu Refresh Token cần hủy
     * @return Trạng thái thành công
     */
    @Operation(summary = "Đăng xuất")
    @PostMapping("/logout")
    @SecurityRequirement(name = "bearerAuth")
    public ResponseEntity<ApiResponse<Void>> logout(@Valid @RequestBody LogoutRequest request) {
        authService.logout(request.getRefreshToken());
        return ResponseEntity.ok(ApiResponse.success(null));
    }
    
    /**
     * API yêu cầu quên mật khẩu
     * 
     * @param request Dữ liệu email yêu cầu reset
     * @return Trạng thái thành công
     */
    @Operation(summary = "Yêu cầu đặt lại mật khẩu")
    @PostMapping("/forgot-password")
    public ResponseEntity<ApiResponse<Void>> forgotPassword(@Valid @RequestBody ForgotPasswordRequest request) {
        authService.forgotPassword(request);
        return ResponseEntity.ok(ApiResponse.success(null));
    }
    
    /**
     * API đặt lại mật khẩu mới thông qua mã reset
     * 
     * @param request Dữ liệu reset mật khẩu (mã reset, mật khẩu mới)
     * @return Trạng thái thành công
     */
    @Operation(summary = "Đặt lại mật khẩu mới")
    @PostMapping("/reset-password")
    public ResponseEntity<ApiResponse<Void>> resetPassword(@Valid @RequestBody ResetPasswordRequest request) {
        authService.resetPassword(request);
        return ResponseEntity.ok(ApiResponse.success(null));
    }
    
    /**
     * API đổi mật khẩu cho người dùng đang đăng nhập
     * 
     * @param userPrincipal Thông tin người dùng hiện tại
     * @param request Dữ liệu đổi mật khẩu (mật khẩu cũ, mới)
     * @return Trạng thái thành công
     */
    @Operation(summary = "Đổi mật khẩu")
    @PutMapping("/change-password")
    @PreAuthorize("isAuthenticated()")
    @SecurityRequirement(name = "bearerAuth")
    public ResponseEntity<ApiResponse<Void>> changePassword(
            @AuthenticationPrincipal UserPrincipal userPrincipal,
            @Valid @RequestBody ChangePasswordRequest request) {
        authService.changePassword(request, userPrincipal.getId());
        return ResponseEntity.ok(ApiResponse.success(null));
    }
}
