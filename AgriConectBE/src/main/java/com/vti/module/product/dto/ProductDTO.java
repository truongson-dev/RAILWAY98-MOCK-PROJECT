package com.vti.module.product.dto;

import com.vti.common.enums.ProductStatus;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Data
public class ProductDTO {
    private Long id;
    private String name;
    private String nameEn;
    private String description;
    private BigDecimal price;
    private String unit;
    private Integer minOrderKg;
    private String location;
    private String harvestDate;
    private ProductStatus status;
    private BigDecimal rating;
    private Integer reviewsCount;
    private Long categoryId;
    private String categoryName;
    private Long sellerId;
    private String sellerName;
    private List<String> imageUrls;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    public void setId(Long id) { this.id = id; }
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
    public void setCategoryId(Long categoryId) { this.categoryId = categoryId; }
    public void setCategoryName(String categoryName) { this.categoryName = categoryName; }
    public void setSellerId(Long sellerId) { this.sellerId = sellerId; }
    public void setSellerName(String sellerName) { this.sellerName = sellerName; }
    public void setImageUrls(List<String> imageUrls) { this.imageUrls = imageUrls; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }

    public Long getId() { return id; }

    public String getName() { return name; }

    public String getNameEn() { return nameEn; }

    public String getDescription() { return description; }

    public BigDecimal getPrice() { return price; }

    public String getUnit() { return unit; }

    public Integer getMinOrderKg() { return minOrderKg; }

    public String getLocation() { return location; }

    public String getHarvestDate() { return harvestDate; }

    public ProductStatus getStatus() { return status; }

    public BigDecimal getRating() { return rating; }

    public Integer getReviewsCount() { return reviewsCount; }

    public Long getCategoryId() { return categoryId; }

    public String getCategoryName() { return categoryName; }

    public Long getSellerId() { return sellerId; }

    public String getSellerName() { return sellerName; }

    public List<String> getImageUrls() { return imageUrls; }

    public LocalDateTime getCreatedAt() { return createdAt; }

    public LocalDateTime getUpdatedAt() { return updatedAt; }
}
