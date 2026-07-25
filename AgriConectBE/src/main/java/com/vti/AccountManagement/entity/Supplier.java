package com.vti.AccountManagement.entity;

import java.math.BigDecimal;

import jakarta.persistence.Column;
import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import jakarta.persistence.PrimaryKeyJoinColumn;
import jakarta.persistence.Table;

@Entity
@Table(name = "supplier", catalog = "agriconnect_db")
@PrimaryKeyJoinColumn(name = "supplier_id")
@DiscriminatorValue("SUPPLIER")
public class Supplier extends Account {

	@Column(name = "farm_name", length = 255)
	private String farmName;

	@Column(name = "farm_area", precision = 15, scale = 2)
	private BigDecimal farmArea;

	@Column(length = 255)
	private String certificate;

	@Column(name = "production_capacity", precision = 15, scale = 2)
	private BigDecimal productionCapacity;

	public Supplier() {
		super();
		// TODO Auto-generated constructor stub
	}

	public String getFarmName() {
		return farmName;
	}

	public void setFarmName(String farmName) {
		this.farmName = farmName;
	}

	public BigDecimal getFarmArea() {
		return farmArea;
	}

	public void setFarmArea(BigDecimal farmArea) {
		this.farmArea = farmArea;
	}

	public String getCertificate() {
		return certificate;
	}

	public void setCertificate(String certificate) {
		this.certificate = certificate;
	}

	public BigDecimal getProductionCapacity() {
		return productionCapacity;
	}

	public void setProductionCapacity(BigDecimal productionCapacity) {
		this.productionCapacity = productionCapacity;
	}

}
