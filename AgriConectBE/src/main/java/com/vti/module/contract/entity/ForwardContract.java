package com.vti.module.contract.entity;

import com.vti.common.enums.ContractStatus;
import com.vti.module.account.entity.Account;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name="forward_contracts")
@EntityListeners(AuditingEntityListener.class)
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ForwardContract {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name="contract_code", unique=true, nullable = false)
    private String contractCode;

    @Column(name = "title")
    private String title;
    
    @Column(name = "crop_name")
    private String cropName;
    
    @Column(name = "farm_name")
    private String farmName;
    
    @Column(name = "location")
    private String location;

    @Column(name = "expected_harvest")
    private LocalDate expectedHarvest;

    @Column(name = "estimated_quantity_kg")
    private BigDecimal estimatedQuantityKg;

    @Column(name = "contract_price_vnd", precision=15, scale=2)
    private BigDecimal contractPriceVnd;

    @Column(name = "deposit_percent", precision=5, scale=2)
    private BigDecimal depositPercent;

    @Enumerated(EnumType.STRING)
    @Column(name = "status")
    private ContractStatus status; // OPEN, CLOSED, IN_PROGRESS, COMPLETED, CANCELLED

    @Column(name = "image_url")
    private String imageUrl;
    
    @Column(name = "description", columnDefinition = "TEXT")
    private String description;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "created_by")
    private Account createdBy;

    @CreatedDate
    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    @LastModifiedDate
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    public Account getCreatedBy() { return createdBy; }
    public void setCreatedBy(Account createdBy) { this.createdBy = createdBy; }
    public void setStatus(ContractStatus status) { this.status = status; }
    public void setContractCode(String contractCode) { this.contractCode = contractCode; }
    public void setTitle(String title) { this.title = title; }
    public void setCropName(String cropName) { this.cropName = cropName; }
    public void setFarmName(String farmName) { this.farmName = farmName; }
    public void setLocation(String location) { this.location = location; }
    public void setExpectedHarvest(LocalDate expectedHarvest) { this.expectedHarvest = expectedHarvest; }
    public void setEstimatedQuantityKg(BigDecimal estimatedQuantityKg) { this.estimatedQuantityKg = estimatedQuantityKg; }
    public void setContractPriceVnd(BigDecimal contractPriceVnd) { this.contractPriceVnd = contractPriceVnd; }
    public void setDepositPercent(BigDecimal depositPercent) { this.depositPercent = depositPercent; }
    public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }
    public void setDescription(String description) { this.description = description; }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getContractCode() { return contractCode; }

    public String getTitle() { return title; }

    public String getCropName() { return cropName; }

    public String getFarmName() { return farmName; }

    public String getLocation() { return location; }

    public LocalDate getExpectedHarvest() { return expectedHarvest; }

    public BigDecimal getEstimatedQuantityKg() { return estimatedQuantityKg; }

    public BigDecimal getContractPriceVnd() { return contractPriceVnd; }

    public BigDecimal getDepositPercent() { return depositPercent; }

    public ContractStatus getStatus() { return status; }

    public String getImageUrl() { return imageUrl; }

    public String getDescription() { return description; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }
}
