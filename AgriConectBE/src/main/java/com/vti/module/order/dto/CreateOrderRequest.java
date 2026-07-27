package com.vti.module.order.dto;

import com.vti.module.order.entity.PaymentMethod;
import lombok.Data;
import java.util.List;

@Data
public class CreateOrderRequest {
    private PaymentMethod paymentMethod;
    private String shippingAddress;
    private String note;
    private String estimatedDelivery;
    private List<OrderItemRequest> items;

    public PaymentMethod getPaymentMethod() { return paymentMethod; }
    public String getShippingAddress() { return shippingAddress; }
    public String getNote() { return note; }
    public String getEstimatedDelivery() { return estimatedDelivery; }
    public List<OrderItemRequest> getItems() { return items; }
}
