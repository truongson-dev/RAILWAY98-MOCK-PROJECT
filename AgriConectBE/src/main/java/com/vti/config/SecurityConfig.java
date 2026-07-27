package com.vti.config;

import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserService;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.filter.OncePerRequestFilter;

/**
 * Cấu hình bảo mật cho ứng dụng sử dụng Spring Security
 */
@Configuration
@EnableWebSecurity
@EnableMethodSecurity // Bật tính năng phân quyền dựa trên Annotation như @PreAuthorize
@RequiredArgsConstructor
public class SecurityConfig {

    // Inject JwtAuthFilter, CustomUserDetailsService, OAuth2UserService, OAuth2SuccessHandler
    private final OncePerRequestFilter jwtAuthFilter; // Đổi type cụ thể nếu cần, ở đây dùng interface cha
    private final UserDetailsService customUserDetailsService;
    private final OAuth2UserService<OAuth2UserRequest, OAuth2User> oauth2UserService;
    private final AuthenticationSuccessHandler oauth2SuccessHandler;
    private final CorsConfigurationSource corsConfigurationSource;

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            // Tắt CSRF vì ứng dụng sử dụng JWT (stateless)
            .csrf(AbstractHttpConfigurer::disable)
            
            // Cấu hình CORS sử dụng cấu hình từ CorsConfigurationSource (chấp nhận localhost:3000, etc.)
            .cors(cors -> cors.configurationSource(corsConfigurationSource))
            
            // Tắt quản lý session của Spring Security, cấu hình Stateless vì dùng JWT
            .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
            
            // Cấu hình quyền truy cập cho các API
            .authorizeHttpRequests(auth -> auth
                // Cấp quyền công khai cho các endpoints không cần đăng nhập
                .requestMatchers(org.springframework.http.HttpMethod.OPTIONS, "/**").permitAll()
                .requestMatchers("/api/products", "/api/products/**").permitAll()
                .requestMatchers("/api/group-buys").permitAll()
                .requestMatchers("/api/forward-contracts").permitAll()
                .requestMatchers("/api/auth/**").permitAll()
                .requestMatchers("/swagger-ui.html", "/swagger-ui/**", "/api-docs/**", "/v3/api-docs/**").permitAll()
                .requestMatchers("/uploads/**").permitAll()
                .requestMatchers("/oauth2/**").permitAll()
                
                // Mọi yêu cầu khác đều phải được xác thực
                .anyRequest().authenticated()
            )
            
            // Cấu hình đăng nhập bằng OAuth2 (Google, Facebook...)
            .oauth2Login(oauth2 -> oauth2
                .userInfoEndpoint(userInfo -> userInfo.userService(oauth2UserService))
                .successHandler(oauth2SuccessHandler)
            )
            
            // Thêm Filter xử lý JWT trước Filter kiểm tra Username/Password của Spring
            .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class)
            
            // Xử lý ngoại lệ về bảo mật (Security Exceptions)
            .exceptionHandling(exceptions -> exceptions
                .authenticationEntryPoint((request, response, authException) -> {
                    // Trả về lỗi 401 (Unauthorized) định dạng JSON khi chưa đăng nhập
                    response.setContentType("application/json;charset=UTF-8");
                    response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                    response.getWriter().write("{\"status\": 401, \"message\": \"Chưa xác thực quyền truy cập (Unauthorized).\"}");
                })
            );

        return http.build();
    }

    /**
     * Cấu hình cơ chế mã hoá mật khẩu
     */
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    /**
     * Cấu hình AuthenticationProvider dùng để kiểm tra thông tin đăng nhập
     */
    @Bean
    public AuthenticationProvider authenticationProvider() {
        DaoAuthenticationProvider provider = new DaoAuthenticationProvider();
        provider.setUserDetailsService(customUserDetailsService);
        provider.setPasswordEncoder(passwordEncoder());
        return provider;
    }

    /**
     * Bean quản lý Authentication
     */
    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager();
    }
}
