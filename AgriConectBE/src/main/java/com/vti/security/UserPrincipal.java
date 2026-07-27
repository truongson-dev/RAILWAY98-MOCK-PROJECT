package com.vti.security;

import com.vti.common.enums.UserRole;
import com.vti.module.account.entity.Account;
import lombok.Getter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;

/**
 * UserPrincipal — Đối tượng đại diện user đang đăng nhập trong Spring Security
 *
 * <p>Spring Security cần UserDetails để:
 * 1. Lấy username (email) làm subject JWT
 * 2. Lấy authorities (roles) để kiểm tra phân quyền
 * 3. Kiểm tra trạng thái tài khoản
 */
@Getter
public class UserPrincipal implements UserDetails, org.springframework.security.oauth2.core.user.OAuth2User {

    /** Entity tài khoản từ Database */
    private final Account account;
    private java.util.Map<String, Object> attributes;

    public UserPrincipal(Account account) {
        this.account = account;
    }

    public static UserPrincipal create(Account account) {
        return new UserPrincipal(account);
    }

    public static UserPrincipal create(Account account, java.util.Map<String, Object> attributes) {
        UserPrincipal userPrincipal = UserPrincipal.create(account);
        userPrincipal.attributes = attributes;
        return userPrincipal;
    }

    @Override
    public java.util.Map<String, Object> getAttributes() {
        return attributes;
    }

    @Override
    public String getName() {
        return account.getEmail();
    }

    /**
     * Danh sách quyền — Spring Security kiểm tra @PreAuthorize
     * Format: "ROLE_ADMIN", "ROLE_PARTNER", ...
     */
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        UserRole role = account.getRole();
        String authority = "ROLE_" + (role != null ? role.name() : "PARTNER");
        return List.of(new SimpleGrantedAuthority(authority));
    }

    @Override
    public String getPassword() { return account.getPassword(); }

    /** Username = email, dùng làm subject trong JWT */
    @Override
    public String getUsername() { return account.getEmail(); }

    @Override
    public boolean isAccountNonExpired() { return true; }

    /** Trả về true = KHÔNG bị khóa */
    @Override
    public boolean isAccountNonLocked() {
        return account.getStatus() != null &&
               !account.getStatus().name().equals("LOCKED");
    }

    @Override
    public boolean isCredentialsNonExpired() { return true; }

    /** Chỉ ACTIVE mới được đăng nhập */
    @Override
    public boolean isEnabled() {
        return account.getStatus() != null &&
               account.getStatus().name().equals("ACTIVE");
    }

    public Long getId() { return account.getId(); }

    public UserRole getRole() { return account.getRole(); }
}
