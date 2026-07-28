package com.vti.module.account.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import jakarta.persistence.DiscriminatorValue;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Entity
@Table(name = "suppliers")
@DiscriminatorValue("SUPPLIER")
@Data
@EqualsAndHashCode(callSuper = true)
public class Supplier extends Account {
    private String farmName;
    private Double farmArea;
    private String certificate;
    private Double productionCapacity;
    private String farmAddress;

    public String getFarmName() { return farmName; }
    public void setFarmName(String farmName) { this.farmName = farmName; }

    public Double getFarmArea() { return farmArea; }
    public void setFarmArea(Double farmArea) { this.farmArea = farmArea; }

    public String getCertificate() { return certificate; }
    public void setCertificate(String certificate) { this.certificate = certificate; }

    public Double getProductionCapacity() { return productionCapacity; }
    public void setProductionCapacity(Double productionCapacity) { this.productionCapacity = productionCapacity; }

    public String getFarmAddress() { return farmAddress; }
    public void setFarmAddress(String farmAddress) { this.farmAddress = farmAddress; }
}
