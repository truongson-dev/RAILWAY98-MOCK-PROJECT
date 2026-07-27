package com.vti.AccountManagerment.dto;

import java.math.BigDecimal;

public class SupplierDTO {

	private Long id;
	private String email;
	private String phoneNumber;
	private String username;
	private String role;
	private String status;

	private String farmName;
	private BigDecimal farmArea;
	private String certificate;
	private BigDecimal productionCapacity;

	public SupplierDTO() {
		super();
		// TODO Auto-generated constructor stub
	}

	public SupplierDTO(Long id, String email, String phoneNumber, String username, String role, String status,
			String farmName, BigDecimal farmArea, String certificate, BigDecimal productionCapacity) {
		super();
		this.id = id;
		this.email = email;
		this.phoneNumber = phoneNumber;
		this.username = username;
		this.role = role;
		this.status = status;
		this.farmName = farmName;
		this.farmArea = farmArea;
		this.certificate = certificate;
		this.productionCapacity = productionCapacity;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPhoneNumber() {
		return phoneNumber;
	}

	public void setPhoneNumber(String phoneNumber) {
		this.phoneNumber = phoneNumber;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getRole() {
		return role;
	}

	public void setRole(String role) {
		this.role = role;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
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
