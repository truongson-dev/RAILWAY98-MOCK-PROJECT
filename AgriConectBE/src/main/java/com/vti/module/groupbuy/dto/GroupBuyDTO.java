package com.vti.module.groupbuy.dto;

import com.vti.common.enums.GroupBuyStatus;
import lombok.Builder;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@Builder
public class GroupBuyDTO {
    private Long id;
    private String title;
    private BigDecimal targetVolumeKg;
    private BigDecimal currentVolumeKg;
    private BigDecimal discountedPriceVnd;
    private BigDecimal originalPriceVnd;
    private Integer discountPercent;
    private Integer participantsCount;
    private LocalDateTime startDate;
    private LocalDateTime endDate;
    private GroupBuyStatus status;
    private String description;
    
    private ProductSummary product;

    @Data
    @Builder
    public static class ProductSummary {
        private Long id;
        private String name;
        private String location;
        private String image;
        private Integer minOrderKg;
        private String supplierName;
    }
}
