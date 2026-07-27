package com.vti.module.inventory.dto;

import com.vti.module.inventory.entity.QualityGrade;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CreateBatchRequest {
    private Long productId;
    private Long warehouseId;
    private BigDecimal quantityKg;
    private BigDecimal unitCost;
    private LocalDate harvestDate;
    private LocalDate expiryDate;
    private QualityGrade qualityGrade;
    private Long supplierId;

    public Long getProductId() { return productId; }
    public Long getWarehouseId() { return warehouseId; }
    public Long getSupplierId() { return supplierId; }
    public BigDecimal getQuantityKg() { return quantityKg; }
    public BigDecimal getUnitCost() { return unitCost; }
    public LocalDate getHarvestDate() { return harvestDate; }
    public LocalDate getExpiryDate() { return expiryDate; }
    public QualityGrade getQualityGrade() { return qualityGrade; }
}
