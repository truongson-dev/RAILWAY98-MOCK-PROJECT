package com.vti.module.kyc.controller;

import com.vti.common.ApiResponse;
import com.vti.common.PageResponse;
import com.vti.common.enums.KycStatus;
import com.vti.module.kyc.dto.KycActionRequest;
import com.vti.module.kyc.dto.KycProfileDTO;
import com.vti.module.kyc.service.KycService;
import com.vti.security.UserPrincipal;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/admin/kyc")
@RequiredArgsConstructor
@PreAuthorize("hasRole('ADMIN')")
public class AdminKycController {

    private final KycService kycService;

    // Lấy danh sách KYC có bộ lọc và phân trang
    @GetMapping
    public ApiResponse<PageResponse<KycProfileDTO>> getAllKyc(
            @RequestParam(required = false) KycStatus status,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        Pageable pageable = PageRequest.of(page, size);
        return ApiResponse.success(kycService.getAllKyc(status, pageable));
    }

    // Lấy chi tiết hồ sơ KYC
    @GetMapping("/{id}")
    public ApiResponse<KycProfileDTO> getKycById(@PathVariable Long id) {
        return ApiResponse.success(kycService.getKycById(id));
    }

    // Duyệt hồ sơ KYC
    @PutMapping("/{id}/review")
    public ApiResponse<KycProfileDTO> reviewKyc(
            @PathVariable Long id,
            @RequestBody @Valid KycActionRequest request,
            @AuthenticationPrincipal UserPrincipal currentUser) {
        return ApiResponse.success(kycService.reviewKyc(id, request, currentUser.getId()));
    }

    // Từ chối KYC
    @PostMapping("/{id}/reject")
    public ApiResponse<String> rejectKyc(
            @PathVariable Long id,
            @RequestBody @Valid KycActionRequest request,
            @AuthenticationPrincipal UserPrincipal currentUser) {
        kycService.rejectKyc(id, request, currentUser.getId());
        return ApiResponse.success("Từ chối KYC thành công");
    }

    // Upload tài liệu bổ sung (admin)
    @PostMapping("/upload-document")
    public ApiResponse<String> uploadDocument(@RequestParam("file") MultipartFile file) {
        return ApiResponse.success("https://storage.example.com/" + file.getOriginalFilename());
    }
}
