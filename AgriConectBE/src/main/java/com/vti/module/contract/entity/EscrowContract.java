package com.vti.module.contract.entity;

import com.vti.common.enums.ContractStatus;
import com.vti.module.account.entity.Account; // Assuming this package structure
import jakarta.persistence.*;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name="escrow_contracts")
@EntityListeners(AuditingEntityListener.class)
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class EscrowContract {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name="contract_code", unique=true, nullable = false)
    private String contractCode;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "buyer_id")
    private Account buyer;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "seller_id")
    private Account seller;

    @Column(name = "product_name")
    private String productName;

    @Column(name = "quantity_tons")
    private BigDecimal quantityTons;

    @Column(name = "total_value_vnd", precision=15, scale=2)
    private BigDecimal totalValueVnd;

    @Enumerated(EnumType.STRING)
    @Column(name = "status")
    private ContractStatus status; // DRAFT, ACTIVE, COMPLETED, DISPUTED, RESOLVED, CANCELLED

    @Column(name = "progress_percent")
    private int progressPercent; // 0-100%

    @Column(name = "notes", columnDefinition = "TEXT")
    private String notes;

    @OneToMany(mappedBy="contract", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<EscrowMilestone> milestones;

    @CreatedDate
    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    @LastModifiedDate
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    public void setStatus(ContractStatus status) { this.status = status; }
    public ContractStatus getStatus() { return status; }
    public void setProgressPercent(int progressPercent) { this.progressPercent = progressPercent; }
    public int getProgressPercent() { return progressPercent; }
    public List<EscrowMilestone> getMilestones() { return milestones; }
    public Account getBuyer() { return buyer; }
    public Account getSeller() { return seller; }
    public void setBuyer(Account buyer) { this.buyer = buyer; }
    public void setSeller(Account seller) { this.seller = seller; }
    public void setContractCode(String contractCode) { this.contractCode = contractCode; }
    public void setProductName(String productName) { this.productName = productName; }
    public void setQuantityTons(BigDecimal quantityTons) { this.quantityTons = quantityTons; }
    public void setTotalValueVnd(BigDecimal totalValueVnd) { this.totalValueVnd = totalValueVnd; }
    public void setNotes(String notes) { this.notes = notes; }
    public void setMilestones(List<EscrowMilestone> milestones) { this.milestones = milestones; }
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getContractCode() { return contractCode; }

    public String getProductName() { return productName; }

    public BigDecimal getQuantityTons() { return quantityTons; }

    public BigDecimal getTotalValueVnd() { return totalValueVnd; }

    public String getNotes() { return notes; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }
}
