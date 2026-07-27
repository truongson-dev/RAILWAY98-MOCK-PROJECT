package com.vti.module.product.dto;

import lombok.Data;
import java.math.BigDecimal;
import java.util.List;

@Data
public class ProductCreateRequest {
    private String name;
    private String nameEn;
    private String description;
    private BigDecimal price;
    private String unit;
    private Integer minOrderKg;
    private String location;
    private String harvestDate;
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
    public Long getCategoryId() { return categoryId; }
    public List<String> getImageUrls() { return imageUrls; }
}
