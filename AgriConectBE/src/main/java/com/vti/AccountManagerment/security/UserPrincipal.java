package com.vti.AccountManagerment.security;

import java.util.Collection;
import java.util.Collections;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.vti.AccountManagerment.entity.Account;
import com.vti.AccountManagerment.entity.AccountStatus;

public class UserPrincipal implements UserDetails {

private final Account account;

public UserPrincipal(Account account) {
this.account = account;
}

public Account getAccount() {
return account;
}

@Override
public Collection<? extends GrantedAuthority> getAuthorities() {
String role = account.getRole();
if (role == null) role = "ADMIN";
if (!role.startsWith("ROLE_")) {
role = "ROLE_" + role;
}
return Collections.singletonList(new SimpleGrantedAuthority(role));
}

@Override
public String getPassword() {
return account.getPassword();
}

@Override
public String getUsername() {
return account.getUsername();
}

@Override
public boolean isAccountNonExpired() {
return true;
}

@Override
public boolean isAccountNonLocked() {
return account.getStatus() != AccountStatus.LOCKED;
}

@Override
public boolean isCredentialsNonExpired() {
return true;
}

@Override
public boolean isEnabled() {
return account.getStatus() == AccountStatus.ACTIVE;
}
}