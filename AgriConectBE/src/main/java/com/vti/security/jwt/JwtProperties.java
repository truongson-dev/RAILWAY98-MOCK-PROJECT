package com.vti.security.jwt;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

/**
 * JwtProperties — Đọc cấu hình JWT từ application.properties
 * @ConfigurationProperties tự map các key có prefix 'jwt' vào các field
 */
@Data
@Component
@ConfigurationProperties(prefix = "jwt")
public class JwtProperties {
    /** Secret key để ký JWT — phải dài ít nhất 256 bits */
    private String secret;
    /** Thời gian sống của Access Token (milliseconds, mặc định 15 phút) */
    private long accessTokenExpiration = 900_000L;
    /** Thời gian sống của Refresh Token (milliseconds, mặc định 30 ngày) */
    private long refreshTokenExpiration = 2_592_000_000L;

    public String getSecret() { return secret; }
    public long getAccessTokenExpiration() { return accessTokenExpiration; }
    public long getRefreshTokenExpiration() { return refreshTokenExpiration; }
    public void setSecret(String secret) { this.secret = secret; }
    public void setAccessTokenExpiration(long accessTokenExpiration) { this.accessTokenExpiration = accessTokenExpiration; }
    public void setRefreshTokenExpiration(long refreshTokenExpiration) { this.refreshTokenExpiration = refreshTokenExpiration; }
}
