package com.vti.module.account.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import jakarta.persistence.DiscriminatorValue;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Entity
@Table(name = "shippers")
@DiscriminatorValue("SHIPPER")
@Data
@EqualsAndHashCode(callSuper = true)
public class Shipper extends Account {
    private String vehicleType;
    private String licenseNumber;
    private String operatingArea;
    private Integer fleetCapacity;

    public String getVehicleType() { return vehicleType; }
    public void setVehicleType(String vehicleType) { this.vehicleType = vehicleType; }

    public String getLicenseNumber() { return licenseNumber; }
    public void setLicenseNumber(String licenseNumber) { this.licenseNumber = licenseNumber; }

    public String getOperatingArea() { return operatingArea; }
    public void setOperatingArea(String operatingArea) { this.operatingArea = operatingArea; }

    public Integer getFleetCapacity() { return fleetCapacity; }
    public void setFleetCapacity(Integer fleetCapacity) { this.fleetCapacity = fleetCapacity; }
}
