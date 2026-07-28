package com.vti.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.domain.AuditorAware;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

import java.util.Optional;

/**
 * Cấu hình JPA Auditing để tự động cập nhật createdBy, updatedBy
 */
@Configuration
@EnableJpaAuditing(auditorAwareRef = "auditorProvider")
public class AuditingConfig {

    @Bean
    public AuditorAware<String> auditorProvider() {
        return () -> {
            // Lấy thông tin xác thực từ SecurityContext
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

            // Nếu không có thông tin xác thực hoặc chưa đăng nhập, trả về "system"
            if (authentication == null || !authentication.isAuthenticated() || authentication.getPrincipal().equals("anonymousUser")) {
                return Optional.of("system");
            }

            // Nếu đã đăng nhập, trả về username (thường là email) của user
            return Optional.of(authentication.getName());
        };
    }
}
