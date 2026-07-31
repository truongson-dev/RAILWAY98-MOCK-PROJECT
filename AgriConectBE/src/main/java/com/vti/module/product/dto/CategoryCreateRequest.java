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
    public void setName(String name) { this.name = name; }
    public void setNameEn(String nameEn) { this.nameEn = nameEn; }
    public void setDescription(String description) { this.description = description; }
    public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }
}
