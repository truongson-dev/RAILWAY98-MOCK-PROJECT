package com.vti.module.groupbuy.entity;

import com.vti.common.enums.GroupBuyStatus;
import com.vti.module.account.entity.Account;
import com.vti.module.product.entity.Product; // Assume Product entity exists
import jakarta.persistence.*;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name="group_buys")
@EntityListeners(AuditingEntityListener.class)
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class GroupBuy {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "title")
    private String title;

    @Column(name = "description", columnDefinition = "TEXT")
    private String description;

    @Column(name = "target_quantity")
    private BigDecimal targetQuantity;

    @Column(name = "current_quantity")
    private BigDecimal currentQuantity;

    @Column(name = "discount_percent", precision=5, scale=2)
    private BigDecimal discountPercent;

    @Column(name = "original_price", precision=15, scale=2)
    private BigDecimal originalPrice;

    @Column(name = "discount_price", precision=15, scale=2)
    private BigDecimal discountPrice;

    @Enumerated(EnumType.STRING)
    @Column(name = "status")
    private GroupBuyStatus status; // OPEN, CLOSED, COMPLETED, CANCELLED

    @Column(name = "start_date")
    private LocalDateTime startDate;

    @Column(name = "end_date")
    private LocalDateTime endDate;

    @Column(name = "participants_count")
    private int participantsCount;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "product_id")
    private Product product;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "created_by")
    private Account createdBy;

    @OneToMany(mappedBy="groupBuy", cascade = CascadeType.ALL)
    private List<GroupBuyParticipant> participants;

    @CreatedDate
    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    @LastModifiedDate
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    public void setTitle(String title) { this.title = title; }
    public void setDescription(String description) { this.description = description; }
    public void setTargetQuantity(BigDecimal targetQuantity) { this.targetQuantity = targetQuantity; }
    public void setCurrentQuantity(BigDecimal currentQuantity) { this.currentQuantity = currentQuantity; }
    public void setDiscountPercent(BigDecimal discountPercent) { this.discountPercent = discountPercent; }
    public void setOriginalPrice(BigDecimal originalPrice) { this.originalPrice = originalPrice; }
    public void setDiscountPrice(BigDecimal discountPrice) { this.discountPrice = discountPrice; }
    public GroupBuyStatus getStatus() { return status; }
    public BigDecimal getCurrentQuantity() { return currentQuantity; }
    public Account getCreatedBy() { return createdBy; }
    public Product getProduct() { return product; }
    public void setStartDate(LocalDateTime startDate) { this.startDate = startDate; }
    public void setEndDate(LocalDateTime endDate) { this.endDate = endDate; }
    public void setStatus(GroupBuyStatus status) { this.status = status; }
    public void setProduct(Product product) { this.product = product; }
    public void setCreatedBy(Account createdBy) { this.createdBy = createdBy; }
    public void setParticipantsCount(Integer participantsCount) { this.participantsCount = participantsCount; }
    public void setParticipants(List<GroupBuyParticipant> participants) { this.participants = participants; }
    
    public Integer getParticipantsCount() { return participantsCount; }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getTitle() { return title; }

    public String getDescription() { return description; }

    public BigDecimal getTargetQuantity() { return targetQuantity; }

    public BigDecimal getDiscountPercent() { return discountPercent; }

    public BigDecimal getOriginalPrice() { return originalPrice; }

    public BigDecimal getDiscountPrice() { return discountPrice; }

    public LocalDateTime getStartDate() { return startDate; }

    public LocalDateTime getEndDate() { return endDate; }

    public List<GroupBuyParticipant> getParticipants() { return participants; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }
}
