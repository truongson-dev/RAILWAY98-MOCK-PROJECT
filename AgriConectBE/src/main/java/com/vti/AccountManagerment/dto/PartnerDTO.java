package com.vti.AccountManagerment.dto;

public class PartnerDTO {

	private Long id;
	private String email;
	private String phoneNumber;
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

	public PartnerDTO(Long id, String email, String phoneNumber, String username, String role, String status,
			String companyName, String taxCode, String businessType) {
		super();
		this.id = id;
		this.email = email;
		this.phoneNumber = phoneNumber;
		this.username = username;
		this.role = role;
		this.status = status;
		this.companyName = companyName;
		this.taxCode = taxCode;
		this.businessType = businessType;
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
