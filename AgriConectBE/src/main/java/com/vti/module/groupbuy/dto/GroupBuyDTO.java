package com.vti.module.groupbuy.dto;

import com.vti.common.enums.GroupBuyStatus;
import lombok.Data;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
public class GroupBuyDTO {
    private Long id;
    private String title;
    private String description;
    private BigDecimal targetQuantity;
    private BigDecimal currentQuantity;
    private BigDecimal discountPercent;
    private BigDecimal originalPrice;
    private BigDecimal discountPrice;
    private GroupBuyStatus status;
    private LocalDateTime startDate;
    private LocalDateTime endDate;
    private Integer participantsCount;

    public void setCreatedById(Long createdById) { this.createdById = createdById; }
    public void setProductId(Long productId) { this.productId = productId; }
    private Long productId;
    private Long createdById;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
