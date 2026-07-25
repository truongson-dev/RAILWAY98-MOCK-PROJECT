package com.vti.AccountManagement.entity;

import jakarta.persistence.Column;
import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import jakarta.persistence.PrimaryKeyJoinColumn;
import jakarta.persistence.Table;

@Entity
@Table(name = "shipper", catalog = "agriconnect_db")
@PrimaryKeyJoinColumn(name = "shipper_id")
@DiscriminatorValue("SHIPPER")
public class Shipper extends Account {

	@Column(name = "vehicle_type", length = 50)
	private String vehicleType;

	@Column(name = "license_number", length = 50)
	private String licenseNumber;

	@Column(name = "operating_area", length = 255)
	private String operatingArea;

	public Shipper() {
		super();
		// TODO Auto-generated constructor stub
	}

	public String getVehicleType() {
		return vehicleType;
	}

	public void setVehicleType(String vehicleType) {
		this.vehicleType = vehicleType;
	}

	public String getLicenseNumber() {
		return licenseNumber;
	}

	public void setLicenseNumber(String licenseNumber) {
		this.licenseNumber = licenseNumber;
	}

	public String getOperatingArea() {
		return operatingArea;
	}

	public void setOperatingArea(String operatingArea) {
		this.operatingArea = operatingArea;
	}

}
