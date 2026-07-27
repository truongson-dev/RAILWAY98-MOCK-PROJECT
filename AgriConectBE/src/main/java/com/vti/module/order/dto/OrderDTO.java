package com.vti.module.order.dto;

import com.vti.common.enums.OrderStatus;
import com.vti.module.order.entity.PaymentMethod;
import com.vti.module.order.entity.PaymentStatus;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Data
public class OrderDTO {
    private Long id;
    private String orderCode;
    private Long buyerId;
    private String supplierName;
    private BigDecimal totalAmount;
    private OrderStatus status;
    private PaymentMethod paymentMethod;
    private PaymentStatus paymentStatus;
    private String shippingAddress;
    private String trackingCode;
    private String estimatedDelivery;
    private String note;
    private String cancelledReason;
    private List<OrderItemDTO> items;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    public void setId(Long id) { this.id = id; }
    public void setOrderCode(String orderCode) { this.orderCode = orderCode; }
    public void setBuyerId(Long buyerId) { this.buyerId = buyerId; }
    public void setSupplierName(String supplierName) { this.supplierName = supplierName; }
    public void setTotalAmount(BigDecimal totalAmount) { this.totalAmount = totalAmount; }
    public void setStatus(OrderStatus status) { this.status = status; }
    public void setPaymentMethod(PaymentMethod paymentMethod) { this.paymentMethod = paymentMethod; }
    public void setPaymentStatus(PaymentStatus paymentStatus) { this.paymentStatus = paymentStatus; }
    public void setShippingAddress(String shippingAddress) { this.shippingAddress = shippingAddress; }
    public void setTrackingCode(String trackingCode) { this.trackingCode = trackingCode; }
    public void setEstimatedDelivery(String estimatedDelivery) { this.estimatedDelivery = estimatedDelivery; }
    public void setNote(String note) { this.note = note; }
    public void setCancelledReason(String cancelledReason) { this.cancelledReason = cancelledReason; }
    public void setItems(List<OrderItemDTO> items) { this.items = items; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }
}
