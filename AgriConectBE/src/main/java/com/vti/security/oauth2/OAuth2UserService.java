package com.vti.security.oauth2;

import com.vti.common.enums.AccountStatus;
import com.vti.common.enums.UserRole;
import com.vti.module.account.entity.Account;
import com.vti.module.account.entity.Partner;
import com.vti.module.account.repository.AccountRepository;
import com.vti.security.UserPrincipal;
import lombok.RequiredArgsConstructor;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import java.util.Optional;

/**
 * OAuth2UserService — Xử lý logic khi người dùng đăng nhập qua nhà cung cấp OAuth2 (vd: Google)
 */
@Service
@RequiredArgsConstructor
public class OAuth2UserService extends DefaultOAuth2UserService {

    private final AccountRepository accountRepository;

    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
        // Lấy thông tin user từ nhà cung cấp (Google)
        OAuth2User oAuth2User = super.loadUser(userRequest);
        return processOAuth2User(userRequest, oAuth2User);
    }

    /**
     * Xử lý thông tin người dùng sau khi Google trả về
     */
    private OAuth2User processOAuth2User(OAuth2UserRequest oAuth2UserRequest, OAuth2User oAuth2User) {
        // Lấy email từ Google attributes
        String email = oAuth2User.getAttribute("email");
        if (email == null) {
            throw new OAuth2AuthenticationException("Không tìm thấy email từ nhà cung cấp OAuth2");
        }

        Optional<Account> accountOptional = accountRepository.findByEmail(email);
        Account account;
        
        if (accountOptional.isPresent()) {
            // Đã tồn tại trong hệ thống, cập nhật thông tin nếu cần thiết
            account = accountOptional.get();
        } else {
            // Chưa tồn tại -> tạo mới với vai trò PARTNER mặc định và trạng thái ACTIVE (đã xác thực qua Google)
            account = new Partner();
            account.setEmail(email);
            account.setFullName(oAuth2User.getAttribute("name"));
            account.setRole(UserRole.PARTNER);
            account.setStatus(AccountStatus.ACTIVE);
            account = accountRepository.save(account);
        }

        return UserPrincipal.create(account, oAuth2User.getAttributes());
    }
}
