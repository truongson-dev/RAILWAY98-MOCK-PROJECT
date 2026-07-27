package com.vti.AccountManagerment.dto;

public class UserProfileDTO {
	private Long accountId;
	private String username;
	private String role;
	private String status;
	private String fullName;
	private String phone;
	private String email;
	private String address;
	private String avatar;

	public UserProfileDTO() {
	}

	public UserProfileDTO(Long accountId, String username, String role, String status, String fullName, String phone,
			String email, String address, String avatar) {
		this.accountId = accountId;
		this.username = username;
		this.role = role;
		this.status = status;
		this.fullName = fullName;
		this.phone = phone;
		this.email = email;
		this.address = address;
		this.avatar = avatar;
	}

	public Long getAccountId() {
		return accountId;
	}

	public void setAccountId(Long accountId) {
		this.accountId = accountId;
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

	public String getFullName() {
		return fullName;
	}

	public void setFullName(String fullName) {
		this.fullName = fullName;
	}

	public String getPhone() {
		return phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public String getAvatar() {
		return avatar;
	}

	public void setAvatar(String avatar) {
		this.avatar = avatar;
	}
}
