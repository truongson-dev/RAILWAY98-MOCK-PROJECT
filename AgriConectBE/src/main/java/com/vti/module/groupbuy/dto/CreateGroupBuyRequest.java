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
    public void setTitle(String title) { this.title = title; }
    public void setDescription(String description) { this.description = description; }
    public void setTargetQuantity(BigDecimal targetQuantity) { this.targetQuantity = targetQuantity; }
    public void setDiscountPercent(BigDecimal discountPercent) { this.discountPercent = discountPercent; }
    public void setOriginalPrice(BigDecimal originalPrice) { this.originalPrice = originalPrice; }
    public void setDiscountPrice(BigDecimal discountPrice) { this.discountPrice = discountPrice; }
    public void setStartDate(LocalDateTime startDate) { this.startDate = startDate; }
    public void setEndDate(LocalDateTime endDate) { this.endDate = endDate; }
    public void setProductId(Long productId) { this.productId = productId; }
}
