package com.vti.module.account.controller;

import com.vti.common.ApiResponse;
import com.vti.common.PageResponse;
import com.vti.common.enums.AccountStatus;
import com.vti.common.enums.UserRole;
import com.vti.module.account.dto.AccountDTO;
import com.vti.module.account.dto.UpdateProfileRequest;
import com.vti.module.account.dto.UpdateStatusRequest;
import com.vti.module.account.service.AccountService;
import com.vti.security.UserPrincipal;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;

/**
 * Controller quản lý tài khoản người dùng và admin.
 */
@RestController
@RequiredArgsConstructor
@Tag(name = "Account Management", description = "API quản lý tài khoản")
@SecurityRequirement(name = "bearerAuth")
public class AccountController {

    private final AccountService accountService;

    /**
     * API Lấy danh sách tài khoản (chỉ dành cho ADMIN)
     */
    @Operation(summary = "Lấy danh sách tài khoản (ADMIN)")
    @GetMapping("/api/admin/accounts")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<PageResponse<AccountDTO>>> getAllAccounts(
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) UserRole role,
            @RequestParam(required = false) AccountStatus status,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        Pageable pageable = PageRequest.of(page, size);
        return ResponseEntity.ok(ApiResponse.success(accountService.getAll(keyword, role, status, pageable)));
    }

    /**
     * API Lấy thông tin tài khoản theo ID (chỉ dành cho ADMIN)
     */
    @Operation(summary = "Lấy chi tiết tài khoản theo ID (ADMIN)")
    @GetMapping("/api/admin/accounts/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<AccountDTO>> getAccountById(@PathVariable Long id) {
        return ResponseEntity.ok(ApiResponse.success(accountService.getById(id)));
    }

    /**
     * API Cập nhật trạng thái tài khoản (chỉ dành cho ADMIN)
     */
    @Operation(summary = "Cập nhật trạng thái tài khoản (ADMIN)")
    @PutMapping("/api/admin/accounts/{id}/status")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<AccountDTO>> updateAccountStatus(
            @PathVariable Long id,
            @Valid @RequestBody UpdateStatusRequest request) {
        return ResponseEntity.ok(ApiResponse.success(accountService.updateStatus(id, request)));
    }

    /**
     * API Xóa tài khoản (chỉ dành cho ADMIN)
     */
    @Operation(summary = "Xóa tài khoản (ADMIN)")
    @DeleteMapping("/api/admin/accounts/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<Void>> deleteAccount(@PathVariable Long id) {
        accountService.deleteAccount(id);
        return ResponseEntity.ok(ApiResponse.success(null));
    }

    /**
     * API Lấy hồ sơ cá nhân của người dùng đang đăng nhập
     */
    @Operation(summary = "Lấy hồ sơ cá nhân")
    @GetMapping("/api/user/profile")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<ApiResponse<AccountDTO>> getMyProfile(@AuthenticationPrincipal UserPrincipal userPrincipal) {
        return ResponseEntity.ok(ApiResponse.success(accountService.getProfile(userPrincipal.getId())));
    }

    /**
     * API Cập nhật hồ sơ cá nhân của người dùng đang đăng nhập
     */
    @Operation(summary = "Cập nhật hồ sơ cá nhân")
    @PutMapping("/api/user/profile")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<ApiResponse<AccountDTO>> updateMyProfile(
            @AuthenticationPrincipal UserPrincipal userPrincipal,
            @Valid @RequestBody UpdateProfileRequest request) {
        return ResponseEntity.ok(ApiResponse.success(accountService.updateProfile(userPrincipal.getId(), request)));
    }
}
