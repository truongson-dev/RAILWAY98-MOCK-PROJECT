package com.vti.security.oauth2;

import com.vti.security.UserPrincipal;
import com.vti.security.jwt.JwtService;
import com.vti.module.auth.repository.RefreshTokenRepository;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;
import org.springframework.web.util.UriComponentsBuilder;

import java.io.IOException;

/**
 * OAuth2SuccessHandler — Xử lý sau khi người dùng đăng nhập OAuth2 thành công
 */
@Component
@RequiredArgsConstructor
public class OAuth2SuccessHandler extends SimpleUrlAuthenticationSuccessHandler {

    private final JwtService jwtService;
    // Inject repository hoặc service để lưu refresh token 
    // Giả sử có RefreshTokenRepository
    private final RefreshTokenRepository refreshTokenRepository;
    
    @Value("${app.oauth2.redirect-uri}")
    private String redirectUri;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
        String targetUrl = determineTargetUrl(request, response, authentication);
        
        if (response.isCommitted()) {
            logger.debug("Response đã được gửi. Không thể chuyển hướng tới " + targetUrl);
            return;
        }
        
        getRedirectStrategy().sendRedirect(request, response, targetUrl);
    }

    /**
     * Xác định URL chuyển hướng sau khi đăng nhập thành công, đính kèm token
     */
    protected String determineTargetUrl(HttpServletRequest request, HttpServletResponse response, Authentication authentication) {
        UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();

        // Tạo JWT token và refresh token
        String accessToken = jwtService.generateAccessToken(userPrincipal, userPrincipal.getRole());
        String refreshToken = jwtService.generateRefreshToken(userPrincipal);
        
        // TODO: Lưu refresh token vào DB (ví dụ: tạo thực thể RefreshToken và dùng refreshTokenRepository.save(...))

        // Redirect đến frontend kèm token và refreshToken trên query string
        return UriComponentsBuilder.fromUriString(redirectUri)
                .queryParam("token", accessToken)
                .queryParam("refreshToken", refreshToken)
                .build().toUriString();
    }
}
