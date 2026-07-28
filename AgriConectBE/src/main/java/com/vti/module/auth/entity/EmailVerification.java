package com.vti.module.auth.entity;

import jakarta.persistence.*;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;

/**
 * EmailVerification — Lưu mã OTP xác thực email
 *
 * <p>Luồng xác thực email:
 * 1. User đăng ký → tạo OTP 6 chữ số ngẫu nhiên, lưu vào bảng này
 * 2. Gửi email chứa OTP tới user
 * 3. User nhập OTP → backend kiểm tra: đúng + chưa hết hạn → kích hoạt tài khoản
 * 4. Đánh dấu used = true để OTP không dùng lại được
 *
 * <p>OTP hết hạn sau 10 phút (cấu hình trong application.properties)
 */
@Entity
@Table(
    name = "email_verifications",
    indexes = @Index(name = "idx_email_verification_email", columnList = "email")
)
@EntityListeners(AuditingEntityListener.class)
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class EmailVerification {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /** Email cần xác thực */
    @Column(nullable = false, length = 100)
    private String email;

    /** Mã OTP 6 chữ số (ví dụ: "483921") */
    @Column(name = "otp_code", nullable = false, length = 6)
    private String otpCode;

    /** Thời điểm OTP hết hạn (10 phút từ lúc tạo) */
    @Column(name = "expires_at", nullable = false)
    private LocalDateTime expiresAt;

    /**
     * Đã dùng chưa?
     * true = OTP đã được dùng thành công, không dùng lại
     */
    @Column(nullable = false)
    @Builder.Default
    private Boolean used = false;

    @CreatedDate
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    /**
     * Kiểm tra OTP còn hợp lệ không
     * Hợp lệ = chưa dùng VÀ chưa hết hạn
     */
    public boolean isValid() {
        return !used && LocalDateTime.now().isBefore(expiresAt);
    }

    public void setEmail(String email) { this.email = email; }
    public void setOtpCode(String otpCode) { this.otpCode = otpCode; }
    public void setExpiresAt(LocalDateTime expiresAt) { this.expiresAt = expiresAt; }
    public void setUsed(Boolean used) { this.used = used; }
    
    public String getEmail() { return email; }
    public String getOtpCode() { return otpCode; }
    public LocalDateTime getExpiresAt() { return expiresAt; }
    public Boolean getUsed() { return used; }
}
