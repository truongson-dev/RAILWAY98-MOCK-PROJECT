package com.vti.module.order.dto;

import lombok.Data;
import java.math.BigDecimal;

@Data
public class OrderItemDTO {
    private Long id;
    private Long productId;
    private String productName;
    private BigDecimal quantity;
    private BigDecimal price;
    private BigDecimal subtotal;

    public void setId(Long id) { this.id = id; }
    public void setProductId(Long productId) { this.productId = productId; }
    public void setProductName(String productName) { this.productName = productName; }
    public void setQuantity(BigDecimal quantity) { this.quantity = quantity; }
    public void setPrice(BigDecimal price) { this.price = price; }
    public void setSubtotal(BigDecimal subtotal) { this.subtotal = subtotal; }
}
