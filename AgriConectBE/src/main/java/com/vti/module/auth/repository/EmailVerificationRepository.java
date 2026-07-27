package com.vti.module.auth.repository;

import com.vti.module.auth.entity.EmailVerification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

/**
 * EmailVerificationRepository — Quản lý OTP xác thực email
 */
@Repository
public interface EmailVerificationRepository extends JpaRepository<EmailVerification, Long> {

    /**
     * Tìm OTP mới nhất, chưa dùng của một email
     * Dùng trong: xác thực OTP khi user đăng ký
     */
    Optional<EmailVerification> findTopByEmailAndUsedFalseOrderByCreatedAtDesc(String email);

    /**
     * Đánh dấu tất cả OTP cũ của email là đã dùng
     * Dùng khi tạo OTP mới: vô hiệu hóa OTP cũ để tránh nhầm lẫn
     */
    @Modifying
    @Query("UPDATE EmailVerification ev SET ev.used = true WHERE ev.email = :email AND ev.used = false")
    void invalidateAllOtpByEmail(@Param("email") String email);
}
