package com.vti.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;

/**
 * Cấu hình CORS cho ứng dụng
 */
@Configuration
public class CorsConfig {

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration config = new CorsConfiguration();
        // Cho phép gửi cookie, thông tin xác thực
        config.setAllowCredentials(true);
        
        // Cho phép các domain nào được phép gọi API
        config.setAllowedOrigins(Arrays.asList("http://localhost:3000", "http://localhost:3001", "http://localhost:5173"));
        
        // Cho phép các method HTTP
        config.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"));
        
        // Cho phép các header
        config.setAllowedHeaders(Arrays.asList("*"));
        
        // Thời gian cache cho các preflight request (giây)
        config.setMaxAge(3600L);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        // Áp dụng cấu hình CORS này cho tất cả các endpoint
        source.registerCorsConfiguration("/**", config);
        
        return source;
    }
}
