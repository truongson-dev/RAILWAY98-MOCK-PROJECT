package com.vti.AccountManagement.entity;

import jakarta.persistence.Column;
import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import jakarta.persistence.PrimaryKeyJoinColumn;
import jakarta.persistence.Table;

@Entity
@Table(name = "partner", catalog = "agriconnect_db")
@PrimaryKeyJoinColumn(name = "partner_id")
@DiscriminatorValue("PARTNER")
public class Partner extends Account {

	@Column(name = "company_name", nullable = false, length = 255)
	private String companyName;

	@Column(name = "tax_code", nullable = false, length = 50)
	private String taxCode;

	@Column(name = "business_type", nullable = false, length = 100)
	private String businessType;

	public Partner() {
		super();
		// TODO Auto-generated constructor stub
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
