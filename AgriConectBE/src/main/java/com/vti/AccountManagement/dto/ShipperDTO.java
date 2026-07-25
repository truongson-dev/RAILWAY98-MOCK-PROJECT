package com.vti.AccountManagement.dto;

public class ShipperDTO {

	private Long id;
	private String username;
	private String role;
	private String status;

	private String vehicleType;
	private String licenseNumber;
	private String operatingArea;

	public ShipperDTO() {
		super();
		// TODO Auto-generated constructor stub
	}

	public ShipperDTO(Long id, String username, String role, String status, String vehicleType, String licenseNumber,
			String operatingArea) {
		super();
		this.id = id;
		this.username = username;
		this.role = role;
		this.status = status;
		this.vehicleType = vehicleType;
		this.licenseNumber = licenseNumber;
		this.operatingArea = operatingArea;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
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
