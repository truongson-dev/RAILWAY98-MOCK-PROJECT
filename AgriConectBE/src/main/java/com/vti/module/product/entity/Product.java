package com.vti.module.product.entity;

import com.vti.common.enums.ProductStatus;
import com.vti.module.account.entity.Account;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "products")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@EntityListeners(AuditingEntityListener.class)
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    private String nameEn;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(nullable = false)
    private BigDecimal price;

    private String unit = "kg";
    private Integer minOrderKg = 100;
    private String location;
    private String harvestDate;

    @Enumerated(EnumType.STRING)
    private ProductStatus status = ProductStatus.AVAILABLE;

    private BigDecimal rating = BigDecimal.ZERO;
    private Integer reviewsCount = 0;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "category_id")
    private Category category;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "seller_id")
    private Account seller;

    @CreatedDate
    @Column(updatable = false)
    private LocalDateTime createdAt;

    @LastModifiedDate
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;
    
    public BigDecimal getPrice() { return price; }
    public Long getId() { return id; }
    public String getName() { return name; }
    public String getNameEn() { return nameEn; }
    public String getDescription() { return description; }
    public String getUnit() { return unit; }
    public Integer getMinOrderKg() { return minOrderKg; }
    public String getLocation() { return location; }
    public String getHarvestDate() { return harvestDate; }
    public ProductStatus getStatus() { return status; }
    public BigDecimal getRating() { return rating; }
    public Integer getReviewsCount() { return reviewsCount; }
    public Category getCategory() { return category; }
    public Account getSeller() { return seller; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public LocalDateTime getUpdatedAt() { return updatedAt; }
    
    public void setCategory(Category category) { this.category = category; }
    public void setName(String name) { this.name = name; }
    public void setNameEn(String nameEn) { this.nameEn = nameEn; }
    public void setDescription(String description) { this.description = description; }
    public void setPrice(BigDecimal price) { this.price = price; }
    public void setUnit(String unit) { this.unit = unit; }
    public void setMinOrderKg(Integer minOrderKg) { this.minOrderKg = minOrderKg; }
    public void setLocation(String location) { this.location = location; }
    public void setHarvestDate(String harvestDate) { this.harvestDate = harvestDate; }
    public void setStatus(ProductStatus status) { this.status = status; }
    public void setRating(BigDecimal rating) { this.rating = rating; }
    public void setReviewsCount(Integer reviewsCount) { this.reviewsCount = reviewsCount; }
    public void setSeller(Account seller) { this.seller = seller; }
}
