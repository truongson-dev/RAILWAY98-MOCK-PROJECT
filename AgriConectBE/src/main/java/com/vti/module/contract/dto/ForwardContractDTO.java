package com.vti.module.contract.dto;

import com.vti.common.enums.ContractStatus;
import lombok.Data;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
public class ForwardContractDTO {
    private Long id;
    private String contractCode;

    public void setCreatedById(Long createdById) { this.createdById = createdById; }
    private String cropName;
    private String farmName;
    private String location;
    private LocalDate expectedHarvest;
    private BigDecimal estimatedQuantityKg;
    private BigDecimal contractPriceVnd;
    private BigDecimal depositPercent;
    private ContractStatus status;
    private String imageUrl;
    private String description;
    private Long createdById;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
