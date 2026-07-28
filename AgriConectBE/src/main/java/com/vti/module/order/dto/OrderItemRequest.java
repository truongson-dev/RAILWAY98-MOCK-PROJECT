package com.vti.module.order.dto;

import lombok.Data;

@Data
public class OrderItemRequest {
    private Long productId;
    private java.math.BigDecimal quantity;

    public Long getProductId() { return productId; }
    public java.math.BigDecimal getQuantity() { return quantity; }
}
