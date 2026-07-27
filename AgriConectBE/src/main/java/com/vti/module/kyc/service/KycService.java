package com.vti.module.kyc.service;

import com.vti.common.PageResponse;
import com.vti.common.enums.KycStatus;
import com.vti.module.kyc.dto.KycActionRequest;
import com.vti.module.kyc.dto.KycProfileDTO;
import com.vti.module.kyc.dto.KycSubmitRequest;
import org.springframework.data.domain.Pageable;

public interface KycService {
    // Nộp hồ sơ KYC
    KycProfileDTO submitKyc(KycSubmitRequest request, Long currentUserId);
    
    // Xem hồ sơ KYC của user hiện tại
    KycProfileDTO getMyKyc(Long currentUserId);
    
    // Admin: Xem danh sách hồ sơ (có filter theo trạng thái)
    PageResponse<KycProfileDTO> getAllKyc(KycStatus status, Pageable pageable);
    
    // Admin: Xem chi tiết 1 hồ sơ KYC
    KycProfileDTO getKycById(Long id);
    
    // Admin: Duyệt hồ sơ KYC
    KycProfileDTO reviewKyc(Long id, KycActionRequest request, Long adminId);
    
    // Admin: Từ chối hồ sơ KYC
    void rejectKyc(Long id, KycActionRequest request, Long adminId);
    
    // User: Hủy hồ sơ KYC
    void cancelKyc(Long accountId);
}
