package com.vti.security;

import com.vti.module.account.repository.AccountRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

/**
 * CustomUserDetailsService — Cung cấp dịch vụ lấy thông tin người dùng từ cơ sở dữ liệu
 */
@Service
@RequiredArgsConstructor
public class CustomUserDetailsService implements UserDetailsService {

    private final AccountRepository accountRepository;

    /**
     * Tải thông tin người dùng dựa trên email
     * @param username Email của người dùng
     * @return UserDetails để Spring Security sử dụng
     * @throws UsernameNotFoundException Nếu không tìm thấy người dùng
     */
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return accountRepository.findByEmail(username)
                .map(UserPrincipal::create)
                .orElseThrow(() -> new UsernameNotFoundException("Không tìm thấy tài khoản với email: " + username));
    }
}
