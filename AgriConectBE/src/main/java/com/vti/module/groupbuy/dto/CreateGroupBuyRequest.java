package com.vti.module.groupbuy.dto;

import lombok.Data;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
public class CreateGroupBuyRequest {
    private String title;
    private String description;
    private BigDecimal targetQuantity;
    private BigDecimal discountPercent;
    private BigDecimal originalPrice;
    private BigDecimal discountPrice;
    private LocalDateTime startDate;
    private LocalDateTime endDate;
    private Long productId;

    public String getTitle() { return title; }
    public String getDescription() { return description; }
    public BigDecimal getTargetQuantity() { return targetQuantity; }
    public BigDecimal getDiscountPercent() { return discountPercent; }
    public BigDecimal getOriginalPrice() { return originalPrice; }
    public BigDecimal getDiscountPrice() { return discountPrice; }
    public LocalDateTime getStartDate() { return startDate; }
    public LocalDateTime getEndDate() { return endDate; }
    public Long getProductId() { return productId; }
}
