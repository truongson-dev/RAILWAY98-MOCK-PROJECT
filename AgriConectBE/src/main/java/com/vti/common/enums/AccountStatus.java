package com.vti.common.enums;

/**
 * AccountStatus — Trạng thái tài khoản người dùng
 *
 * <p>Luồng trạng thái:
 * PENDING_VERIFICATION → (xác thực email) → PENDING_APPROVAL
 * PENDING_APPROVAL → (admin duyệt) → ACTIVE
 * PENDING_APPROVAL → (admin từ chối) → REJECTED
 * ACTIVE → (admin khóa) → LOCKED
 * LOCKED → (admin mở khóa) → ACTIVE
 */
public enum AccountStatus {
    /** Chờ xác thực email (mới đăng ký, chưa click link/OTP) */
    PENDING_VERIFICATION,

    /** Đã xác thực email, chờ Admin duyệt tài khoản doanh nghiệp */
    PENDING_APPROVAL,

    /** Tài khoản đang hoạt động bình thường */
    ACTIVE,

    /** Tài khoản bị Admin từ chối (do hồ sơ không hợp lệ) */
    REJECTED,

    /** Tài khoản bị Admin khóa tạm thời */
    LOCKED
}
