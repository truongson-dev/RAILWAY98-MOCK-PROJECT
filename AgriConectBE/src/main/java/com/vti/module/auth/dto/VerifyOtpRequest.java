package com.vti.module.auth.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

/**
 * DTO yêu cầu xác thực OTP
 */
@Data
public class VerifyOtpRequest {
    @NotBlank(message = "Email không được để trống")
    @Email(message = "Email không đúng định dạng")
    private String email;

    @NotBlank(message = "Mã OTP không được để trống")
    @Size(min = 6, max = 6, message = "Mã OTP gồm 6 chữ số")
    private String otpCode;

    public String getEmail() { return email; }
    public String getOtpCode() { return otpCode; }
    public void setEmail(String email) { this.email = email; }
    public void setOtpCode(String otpCode) { this.otpCode = otpCode; }
}
