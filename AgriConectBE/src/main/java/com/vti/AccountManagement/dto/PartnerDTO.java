package com.vti.AccountManagement.dto;

public class PartnerDTO {

	private String username;
	private String role;
	private String status;

	private String companyName;
	private String taxCode;
	private String businessType;

	public PartnerDTO() {
		super();
		// TODO Auto-generated constructor stub
	}

	public PartnerDTO(String username, String role, String status, String companyName, String taxCode,
			String businessType) {
		super();
		this.username = username;
		this.role = role;
		this.status = status;
		this.companyName = companyName;
		this.taxCode = taxCode;
		this.businessType = businessType;
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

	public String getCompanyName() {
		return companyName;
	}

	public void setCompanyName(String companyName) {
		this.companyName = companyName;
	}

	public String getTaxCode() {
		return taxCode;
	}

	public void setTaxCode(String taxCode) {
		this.taxCode = taxCode;
	}

	public String getBusinessType() {
		return businessType;
	}

	public void setBusinessType(String businessType) {
		this.businessType = businessType;
	}

}
