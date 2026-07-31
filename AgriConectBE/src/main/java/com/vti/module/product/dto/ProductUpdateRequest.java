package com.vti.module.product.dto;

import com.vti.common.enums.ProductStatus;
import lombok.Data;

import java.math.BigDecimal;
import java.util.List;

@Data
public class ProductUpdateRequest {
    private String name;
    private String nameEn;
    private String description;
    private BigDecimal price;
    private String unit;
    private Integer minOrderKg;
    private String location;
    private String harvestDate;
    private ProductStatus status;
    private Long categoryId;
    private List<String> imageUrls;

    public String getName() { return name; }
    public String getNameEn() { return nameEn; }
    public String getDescription() { return description; }
    public BigDecimal getPrice() { return price; }
    public String getUnit() { return unit; }
    public Integer getMinOrderKg() { return minOrderKg; }
    public String getLocation() { return location; }
    public String getHarvestDate() { return harvestDate; }
    public ProductStatus getStatus() { return status; }
    public Long getCategoryId() { return categoryId; }
    public List<String> getImageUrls() { return imageUrls; }
    public void setName(String name) { this.name = name; }
    public void setNameEn(String nameEn) { this.nameEn = nameEn; }
    public void setDescription(String description) { this.description = description; }
    public void setPrice(BigDecimal price) { this.price = price; }
    public void setUnit(String unit) { this.unit = unit; }
    public void setMinOrderKg(Integer minOrderKg) { this.minOrderKg = minOrderKg; }
    public void setLocation(String location) { this.location = location; }
    public void setHarvestDate(String harvestDate) { this.harvestDate = harvestDate; }
    public void setStatus(ProductStatus status) { this.status = status; }
    public void setCategoryId(Long categoryId) { this.categoryId = categoryId; }
    public void setImageUrls(List<String> imageUrls) { this.imageUrls = imageUrls; }
}
