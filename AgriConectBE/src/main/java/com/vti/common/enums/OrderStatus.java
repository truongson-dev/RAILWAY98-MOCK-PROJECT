package com.vti.common.enums;

/**
 * OrderStatus — Trạng thái đơn hàng
 *
 * <p>Luồng trạng thái:
 * PENDING → CONFIRMED → PROCESSING → SHIPPING → DELIVERED → COMPLETED
 *                    ↘ CANCELLED (có thể hủy khi chưa SHIPPING)
 */
public enum OrderStatus {
    /** Đơn vừa được tạo, chờ xác nhận từ nhà cung cấp */
    PENDING,

    /** Nhà cung cấp đã xác nhận đơn hàng */
    CONFIRMED,

    /** Đang đóng gói/chuẩn bị hàng */
    PROCESSING,

    /** Đang vận chuyển */
    SHIPPING,

    /** Đã giao hàng thành công */
    DELIVERED,

    /** Hoàn thành (thanh toán xong, không khiếu nại) */
    COMPLETED,

    /** Đã hủy (bởi Partner hoặc Admin) */
    CANCELLED
}
