package com.vti.module.product.dto;

import lombok.Data;

@Data
public class CategoryCreateRequest {
    private String name;
    private String nameEn;
    private String description;
    private String imageUrl;

    public String getName() { return name; }
    public String getNameEn() { return nameEn; }
    public String getDescription() { return description; }
    public String getImageUrl() { return imageUrl; }
}
