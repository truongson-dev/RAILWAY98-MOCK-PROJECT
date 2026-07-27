package com.vti.module.inventory.dto;

import com.vti.module.inventory.entity.BatchStatus;
import com.vti.module.inventory.entity.QualityGrade;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class InventoryBatchDTO {
    private Long id;
    private String batchCode;
    private Long productId;
    private Long warehouseId;
    private BigDecimal quantityKg;
    private BigDecimal unitCost;
    private LocalDate harvestDate;
    private LocalDate expiryDate;
    private String qualityGrade;
    private BatchStatus batchStatus;
    private Long supplierId;
    private String supplierName;
    private String productName;
    private String warehouseName;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    public void setId(Long id) { this.id = id; }
    public void setBatchCode(String batchCode) { this.batchCode = batchCode; }
    public void setProductId(Long productId) { this.productId = productId; }
    public void setProductName(String productName) { this.productName = productName; }
    public void setWarehouseId(Long warehouseId) { this.warehouseId = warehouseId; }
    public void setWarehouseName(String warehouseName) { this.warehouseName = warehouseName; }
    public void setQuantityKg(BigDecimal quantityKg) { this.quantityKg = quantityKg; }
    public void setUnitCost(BigDecimal unitCost) { this.unitCost = unitCost; }
    public void setHarvestDate(LocalDate harvestDate) { this.harvestDate = harvestDate; }
    public void setExpiryDate(LocalDate expiryDate) { this.expiryDate = expiryDate; }
    public void setQualityGrade(String qualityGrade) { this.qualityGrade = qualityGrade; }
    public void setBatchStatus(BatchStatus batchStatus) { this.batchStatus = batchStatus; }
    public void setSupplierId(Long supplierId) { this.supplierId = supplierId; }
    public void setSupplierName(String supplierName) { this.supplierName = supplierName; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }
}
