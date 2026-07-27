package com.vti.module.auth.repository;

import com.vti.module.auth.entity.RefreshToken;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

/**
 * RefreshTokenRepository — Quản lý Refresh Token trong Database
 */
@Repository
public interface RefreshTokenRepository extends JpaRepository<RefreshToken, Long> {

    /**
     * Tìm Refresh Token theo giá trị chuỗi
     * Dùng trong: API refresh token, kiểm tra tính hợp lệ
     */
    Optional<RefreshToken> findByToken(String token);

    /**
     * Thu hồi tất cả Refresh Token của một tài khoản
     * Dùng trong: logout, khi phát hiện bảo mật bất thường
     *
     * @param accountId ID tài khoản cần thu hồi token
     */
    @Modifying
    @Query("UPDATE RefreshToken rt SET rt.revoked = true WHERE rt.account.id = :accountId")
    void revokeAllByAccountId(@Param("accountId") Long accountId);

    /**
     * Xóa tất cả Refresh Token hết hạn của một tài khoản
     * Dùng trong: dọn dẹp database định kỳ (scheduled job)
     */
    @Modifying
    @Query("DELETE FROM RefreshToken rt WHERE rt.account.id = :accountId AND rt.expiresAt < CURRENT_TIMESTAMP")
    void deleteExpiredTokensByAccountId(@Param("accountId") Long accountId);
}
