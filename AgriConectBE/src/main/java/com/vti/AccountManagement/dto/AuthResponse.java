package com.vti.AccountManagerment.dto;

public class AuthResponse {
	private String accessToken;
	private String refreshToken;
	private String tokenType = "Bearer";
	private UserProfileDTO user;

	public AuthResponse() {
	}

	public AuthResponse(String accessToken, String refreshToken, UserProfileDTO user) {
		this.accessToken = accessToken;
		this.refreshToken = refreshToken;
		this.user = user;
	}

	public String getAccessToken() {
		return accessToken;
	}

	public void setAccessToken(String accessToken) {
		this.accessToken = accessToken;
	}

	public String getRefreshToken() {
		return refreshToken;
	}

	public void setRefreshToken(String refreshToken) {
		this.refreshToken = refreshToken;
	}

	public String getTokenType() {
		return tokenType;
	}

	public void setTokenType(String tokenType) {
		this.tokenType = tokenType;
	}

	public UserProfileDTO getUser() {
		return user;
	}

	public void setUser(UserProfileDTO user) {
		this.user = user;
	}
}
