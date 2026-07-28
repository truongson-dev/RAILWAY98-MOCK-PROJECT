package com.vti.module.inventory.entity;

import com.vti.module.account.entity.Account;
import com.vti.module.product.entity.Product;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name="inventory_batches")
@EntityListeners(AuditingEntityListener.class)
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class InventoryBatch {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Mã lô hàng
    @Column(name="batch_code", unique=true, length=50)
    private String batchCode;

    // Sản phẩm của lô
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="product_id")
    private Product product;

    // Lưu kho nào
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="warehouse_id")
    private Warehouse warehouse;

    // Số lượng (kg)
    @Column(name="quantity_kg", precision=15, scale=2)
    private BigDecimal quantityKg;

    // Đơn giá nhập
    @Column(name="unit_cost")
    private BigDecimal unitCost;

    @Column(name="available_quantity_kg")
    private BigDecimal availableQuantityKg;

    // Ngày thu hoạch
    @Column(name="harvest_date")
    private LocalDate harvestDate;

    // Ngày hết hạn
    @Column(name="expiry_date")
    private LocalDate expiryDate;

    // Chất lượng
    @Enumerated(EnumType.STRING)
    @Column(name="quality_grade")
    private QualityGrade qualityGrade;

    // Trạng thái lô hàng
    @Enumerated(EnumType.STRING)
    @Column(name="batch_status")
    private BatchStatus batchStatus;

    // Nhà cung cấp
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="supplier_id")
    private Account supplier;

    @CreatedDate
    @Column(name="created_at", updatable = false)
    private LocalDateTime createdAt;

    @LastModifiedDate
    @Column(name="updated_at")
    private LocalDateTime updatedAt;

    public void setBatchCode(String batchCode) { this.batchCode = batchCode; }
    public void setProduct(Product product) { this.product = product; }
    public void setWarehouse(Warehouse warehouse) { this.warehouse = warehouse; }
    public void setQuantityKg(BigDecimal quantityKg) { this.quantityKg = quantityKg; }
    public void setAvailableQuantityKg(BigDecimal availableQuantityKg) { this.availableQuantityKg = availableQuantityKg; }
    public void setUnitCost(BigDecimal unitCost) { this.unitCost = unitCost; }
    public void setHarvestDate(LocalDate harvestDate) { this.harvestDate = harvestDate; }
    public void setExpiryDate(LocalDate expiryDate) { this.expiryDate = expiryDate; }
    public void setQualityGrade(QualityGrade qualityGrade) { this.qualityGrade = qualityGrade; }
    public void setBatchStatus(BatchStatus batchStatus) { this.batchStatus = batchStatus; }
    public void setSupplier(Account supplier) { this.supplier = supplier; }

    public Long getId() { return id; }
    public String getBatchCode() { return batchCode; }
    public Product getProduct() { return product; }
    public Warehouse getWarehouse() { return warehouse; }
    public BigDecimal getQuantityKg() { return quantityKg; }
    public BigDecimal getAvailableQuantityKg() { return availableQuantityKg; }
    public BigDecimal getUnitCost() { return unitCost; }
    public LocalDate getHarvestDate() { return harvestDate; }
    public LocalDate getExpiryDate() { return expiryDate; }
    public QualityGrade getQualityGrade() { return qualityGrade; }
    public BatchStatus getBatchStatus() { return batchStatus; }
    public Account getSupplier() { return supplier; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public LocalDateTime getUpdatedAt() { return updatedAt; }
}
