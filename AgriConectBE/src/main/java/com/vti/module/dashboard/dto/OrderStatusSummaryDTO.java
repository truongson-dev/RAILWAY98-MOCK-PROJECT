package com.vti.module.dashboard.dto;

public class OrderStatusSummaryDTO {
    public OrderStatusSummaryDTO() {}

    private long totalOrders; // Tổng đơn hàng
    private long pending; // Chờ xử lý
    private long confirmed; // Đã xác nhận
    private long processing; // Đang xử lý
    private long shipping; // Đang giao
    private long delivered; // Đã giao
    private long cancelled; // Đã hủy
    private long completed; // Đã hoàn thành

    public long getTotalOrders() { return totalOrders; }
    public void setTotalOrders(long totalOrders) { this.totalOrders = totalOrders; }
    public long getPending() { return pending; }
    public void setPending(long pending) { this.pending = pending; }
    public long getConfirmed() { return confirmed; }
    public void setConfirmed(long confirmed) { this.confirmed = confirmed; }
    public long getProcessing() { return processing; }
    public void setProcessing(long processing) { this.processing = processing; }
    public long getShipping() { return shipping; }
    public void setShipping(long shipping) { this.shipping = shipping; }
    public long getDelivered() { return delivered; }
    public void setDelivered(long delivered) { this.delivered = delivered; }
    public long getCancelled() { return cancelled; }
    public void setCancelled(long cancelled) { this.cancelled = cancelled; }
    public long getCompleted() { return completed; }
    public void setCompleted(long completed) { this.completed = completed; }
}
