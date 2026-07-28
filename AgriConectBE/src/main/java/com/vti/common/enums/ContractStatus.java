package com.vti.common.enums;

/**
 * ContractStatus — Trạng thái hợp đồng (Escrow và Forward Contract)
 *
 * <p>Với Escrow Contract (thanh toán khóa):
 * DRAFT → ACTIVE → COMPLETED | DISPUTED → RESOLVED | CANCELLED
 *
 * <p>Với Forward Contract (hợp đồng tương lai):
 * OPEN → CLOSED → IN_PROGRESS → COMPLETED | CANCELLED
 */
public enum ContractStatus {
    /** Bản nháp, chưa ký */
    DRAFT,

    /** Đang mở đăng ký (Forward Contract) */
    OPEN,

    /** Đang hoạt động / đã ký kết */
    ACTIVE,

    /** Đã chốt, không nhận thêm participant */
    CLOSED,

    /** Đang trong quá trình thu hoạch/thực hiện */
    IN_PROGRESS,

    /** Đã hoàn thành toàn bộ */
    COMPLETED,

    /** Đang có tranh chấp, chờ Admin giải quyết */
    DISPUTED,

    /** Tranh chấp đã được giải quyết */
    RESOLVED,

    /** Đã hủy */
    CANCELLED
}
