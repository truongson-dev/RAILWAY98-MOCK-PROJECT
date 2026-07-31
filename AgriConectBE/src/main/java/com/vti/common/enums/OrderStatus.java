package com.vti.common.enums;

/**
 * OrderStatus — Trạng thái đơn hàng
 *
 * <p>Luồng trạng thái:
 * PENDING → CONFIRMED → PROCESSING → SHIPPING → DELIVERED → COMPLETED
 *                    ↘ cancelled (có thể hủy khi chưa SHIPPING)
 */
public enum OrderStatus {
    /** Đơn vừa được tạo, chờ xác nhận từ nhà cung cấp */
    pending,

    /** Nhà cung cấp đã xác nhận đơn hàng */
    confirmed,

    /** Đang đóng gói/chuẩn bị hàng */
    processing,

    /** Đang vận chuyển */
    shipping,

    /** Đã giao hàng thành công */
    delivered,

    /** Hoàn thành (thanh toán xong, không khiếu nại) */
    completed,

    /** Đã hủy (bởi Partner hoặc Admin) */
    cancelled
}
