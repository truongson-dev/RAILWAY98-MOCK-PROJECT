package com.vti.module.kyc.controller;

import com.vti.common.ApiResponse;
import com.vti.module.kyc.dto.KycProfileDTO;
import com.vti.module.kyc.dto.KycSubmitRequest;
import com.vti.module.kyc.service.KycService;
import com.vti.security.UserPrincipal;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/user/kyc")
@RequiredArgsConstructor
@PreAuthorize("isAuthenticated()")
public class UserKycController {

    private final KycService kycService;

    // Nộp hồ sơ KYC
    @PostMapping
    public ApiResponse<KycProfileDTO> submitKyc(
            @RequestBody @Valid KycSubmitRequest request,
            @AuthenticationPrincipal UserPrincipal currentUser) {
        return ApiResponse.success(kycService.submitKyc(request, currentUser.getId()));
    }

    // Xem hồ sơ KYC cá nhân
    @GetMapping("/my-kyc")
    public ApiResponse<KycProfileDTO> getMyKyc(
            @AuthenticationPrincipal UserPrincipal userDetails) {
        KycProfileDTO profile = kycService.getMyKyc(userDetails.getId());
        return ApiResponse.success(profile);
    }

    // Upload tài liệu (user)
    @PostMapping("/upload-document")
    public ApiResponse<String> uploadDocument(@RequestParam("file") MultipartFile file) {
        // Giả lập logic upload
        // Gửi lên S3/Cloudinary và trả về URL
        return ApiResponse.success("https://storage.example.com/" + file.getOriginalFilename());
    }
}
