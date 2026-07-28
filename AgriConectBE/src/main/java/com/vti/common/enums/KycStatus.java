package com.vti.common.enums;

/**
 * KycStatus — Trạng thái hồ sơ KYC (Know Your Customer)
 *
 * <p>KYC là quy trình xác minh danh tính doanh nghiệp trước khi
 * cho phép hoạt động giao dịch trên nền tảng AgriConnect.
 *
 * <p>Luồng:
 * PENDING → APPROVED (admin duyệt, tài khoản được ACTIVE)
 * PENDING → REJECTED (admin từ chối, tài khoản bị REJECTED)
 * PENDING → NEEDS_INFO (admin yêu cầu bổ sung giấy tờ)
 */
public enum KycStatus {
    /** Hồ sơ mới nộp, chờ Admin xem xét */
    PENDING,

    /** Hồ sơ đã được Admin chấp thuận */
    APPROVED,

    /** Hồ sơ bị Admin từ chối */
    REJECTED,

    /** Admin yêu cầu bổ sung thêm giấy tờ */
    NEEDS_INFO
}
