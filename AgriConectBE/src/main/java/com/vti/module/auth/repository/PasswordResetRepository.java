package com.vti.module.auth.repository;

import com.vti.module.auth.entity.PasswordReset;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

/**
 * PasswordResetRepository — Quản lý token đặt lại mật khẩu
 */
@Repository
public interface PasswordResetRepository extends JpaRepository<PasswordReset, Long> {

    /**
     * Tìm token reset theo giá trị chuỗi
     * Dùng trong: API reset-password — xác thực link từ email
     */
    Optional<PasswordReset> findByResetToken(String resetToken);

    /**
     * Kiểm tra email có đang có token reset đang hoạt động không
     * Tránh spam gửi email reset quá nhiều
     */
    boolean existsByEmailAndUsedFalse(String email);
}
