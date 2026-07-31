package com.vti.module.auth.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "password_resets")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PasswordReset {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String email;

    @Column(name = "reset_token", unique = true, nullable = false)
    private String resetToken;

    @Column(name = "expires_at")
    private LocalDateTime expiresAt;
    
    @Column(name = "is_used")
    private boolean used = false;
    
    @Column(name = "created_at")
    private LocalDateTime createdAt = LocalDateTime.now();

    public void setEmail(String email) { this.email = email; }
    public void setResetToken(String resetToken) { this.resetToken = resetToken; }
    public void setExpiryDate(LocalDateTime expiresAt) { this.expiresAt = expiresAt; }
    public void setExpiresAt(LocalDateTime expiresAt) { this.expiresAt = expiresAt; }
    public void setUsed(boolean used) { this.used = used; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
    
    public Long getId() { return id; }
    public String getEmail() { return email; }
    public String getResetToken() { return resetToken; }
    public LocalDateTime getExpiresAt() { return expiresAt; }
    public boolean isUsed() { return used; }
    public LocalDateTime getCreatedAt() { return createdAt; }
}
