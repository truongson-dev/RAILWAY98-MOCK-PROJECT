package com.vti.module.contract.dto;

import lombok.Data;
import java.math.BigDecimal;
import java.time.LocalDate;

@Data
public class CreateForwardRequest {
    private String title;
    private String cropName;
    private String farmName;
    private String location;
    private LocalDate expectedHarvest;
    private BigDecimal estimatedQuantityKg;
    private BigDecimal contractPriceVnd;
    private BigDecimal depositPercent;
    private String imageUrl;
    private String description;

    public String getTitle() { return title; }
    public String getCropName() { return cropName; }
    public String getFarmName() { return farmName; }
    public String getLocation() { return location; }
    public LocalDate getExpectedHarvest() { return expectedHarvest; }
    public BigDecimal getEstimatedQuantityKg() { return estimatedQuantityKg; }
    public BigDecimal getContractPriceVnd() { return contractPriceVnd; }
    public BigDecimal getDepositPercent() { return depositPercent; }
    public String getImageUrl() { return imageUrl; }
    public String getDescription() { return description; }
}
