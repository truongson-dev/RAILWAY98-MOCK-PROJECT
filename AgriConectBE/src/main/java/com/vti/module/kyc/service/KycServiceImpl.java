package com.vti.module.kyc.service;

import com.vti.common.PageResponse;
import com.vti.common.enums.AccountStatus;
import com.vti.common.enums.DocumentType;
import com.vti.common.enums.KycStatus;
import com.vti.module.account.entity.Account;
import com.vti.exception.AppException;
import com.vti.exception.ErrorCode;
import com.vti.module.kyc.dto.KycActionRequest;
import com.vti.module.kyc.dto.KycProfileDTO;
import com.vti.module.kyc.dto.KycSubmitRequest;
import com.vti.module.kyc.entity.KycDocument;
import com.vti.module.kyc.entity.KycProfile;
import com.vti.module.kyc.repository.KycDocumentRepository;
import com.vti.module.kyc.repository.KycProfileRepository;
import com.vti.module.account.repository.AccountRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class KycServiceImpl implements KycService {

    private final KycProfileRepository kycProfileRepository;
    private final KycDocumentRepository kycDocumentRepository;
    private final AccountRepository accountRepository;

    @Override
    @Transactional
    public KycProfileDTO submitKyc(KycSubmitRequest request, Long currentUserId) {
        Account account = accountRepository.findById(currentUserId)
                .orElseThrow(() -> new AppException(ErrorCode.ACCOUNT_NOT_FOUND));

        Optional<KycProfile> existingProfile = kycProfileRepository.findByAccountId(currentUserId);
        KycProfile profile;
        if (existingProfile.isPresent()) {
            profile = existingProfile.get();
            if (profile.getStatus() == KycStatus.PENDING || profile.getStatus() == KycStatus.APPROVED) {
                throw new AppException(ErrorCode.KYC_ALREADY_SUBMITTED);
            }
        }

        KycProfile newProfile = new KycProfile();
        newProfile.setAccount(account);
        newProfile.setDocumentType(request.getDocumentType());
        newProfile.setDocumentNumber(request.getDocumentNumber());
        newProfile.setFrontImageUrl(request.getFrontImageUrl());
        newProfile.setBackImageUrl(request.getBackImageUrl());
        newProfile.setSelfieImageUrl(request.getSelfieImageUrl());
        newProfile.setStatus(KycStatus.PENDING);
        newProfile.setSubmittedAt(LocalDateTime.now());
        newProfile.setAdditionalNote(request.getAdditionalNote());
        
        KycProfile savedProfile = kycProfileRepository.save(newProfile);
        
        if (existingProfile.isPresent()) {
            List<KycDocument> oldDocs = kycDocumentRepository.findByKycProfileId(savedProfile.getId());
            kycDocumentRepository.deleteAll(oldDocs);
        }
        
        if (request.getDocuments() != null && !request.getDocuments().isEmpty()) {
            List<KycDocument> documents = request.getDocuments().stream().map(docReq -> {
                KycDocument doc = new KycDocument();
                doc.setKycProfile(savedProfile);
                doc.setDocumentType(DocumentType.valueOf(docReq.getDocumentType()));
                doc.setDocumentUrl(docReq.getDocumentUrl());
                doc.setUploadedAt(LocalDateTime.now());
                return doc;
            }).collect(Collectors.toList());
            kycDocumentRepository.saveAll(documents);
            savedProfile.setDocuments(documents);
        }

        return mapToDTO(savedProfile);
    }

    @Override
    public KycProfileDTO getMyKyc(Long currentUserId) {
        KycProfile profile = kycProfileRepository.findByAccountId(currentUserId)
                .orElseThrow(() -> new AppException(ErrorCode.KYC_NOT_FOUND)); 
        return mapToDTO(profile);
    }

    @Override
    public PageResponse<KycProfileDTO> getAllKyc(KycStatus status, Pageable pageable) {
        Page<KycProfile> page;
        if (status != null) {
            page = kycProfileRepository.findByStatus(status, pageable);
        } else {
            page = kycProfileRepository.findAll(pageable);
        }
        
        Page<KycProfileDTO> dtoPage = page.map(this::mapToDTO);
        return PageResponse.of(dtoPage);
    }

    @Override
    public KycProfileDTO getKycById(Long id) {
        KycProfile profile = kycProfileRepository.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.KYC_NOT_FOUND)); 
        return mapToDTO(profile);
    }

    @Override
    @Transactional
    public KycProfileDTO reviewKyc(Long id, KycActionRequest request, Long adminId) {
        KycProfile profile = kycProfileRepository.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.KYC_NOT_FOUND));
                
        Account admin = accountRepository.findById(adminId)
                .orElseThrow(() -> new AppException(ErrorCode.ACCOUNT_NOT_FOUND));
                
        Account userAccount = profile.getAccount();
        
        profile.setReviewedBy(admin);
        profile.setReviewedAt(LocalDateTime.now());
        String actionStr = request.getAction() != null ? request.getAction().name() : "";
        switch (actionStr) {
            case "APPROVE":
                profile.setStatus(KycStatus.APPROVED);
                userAccount.setStatus(AccountStatus.ACTIVE);
                break;
            case "REJECT":
                profile.setStatus(KycStatus.REJECTED);
                profile.setRejectReason(request.getReason());
                userAccount.setStatus(AccountStatus.REJECTED);
                break;
            case "NEEDS_INFO":
                profile.setStatus(KycStatus.NEEDS_INFO);
                profile.setRejectReason(request.getReason());
                break;
            default:
                throw new AppException(ErrorCode.SYSTEM_VALIDATION_ERROR);
        }
        
        accountRepository.save(userAccount);
        return mapToDTO(kycProfileRepository.save(profile));
    }
    
    @Override
    @Transactional
    public void rejectKyc(Long id, KycActionRequest request, Long adminId) {
        KycProfile profile = kycProfileRepository.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.KYC_NOT_FOUND));
                
        Account admin = accountRepository.findById(adminId)
                .orElseThrow(() -> new AppException(ErrorCode.ACCOUNT_NOT_FOUND));
                
        Account userAccount = profile.getAccount();
        
        profile.setReviewedBy(admin);
        profile.setReviewedAt(LocalDateTime.now());
        profile.setStatus(KycStatus.REJECTED);
        profile.setRejectReason(request.getNote());
        userAccount.setStatus(AccountStatus.REJECTED);
        
        accountRepository.save(userAccount);
        kycProfileRepository.save(profile);
    }
    
    @Override
    @Transactional
    public void cancelKyc(Long accountId) {
        KycProfile profile = kycProfileRepository.findByAccountId(accountId)
                .orElseThrow(() -> new AppException(ErrorCode.KYC_NOT_FOUND));
        if (profile.getStatus() != KycStatus.PENDING) {
            throw new AppException(ErrorCode.SYSTEM_VALIDATION_ERROR);
        }
        if (profile.getDocuments() != null) {
            kycDocumentRepository.deleteAll(profile.getDocuments());
        }
        kycProfileRepository.delete(profile);
    }

    public KycProfileDTO mapToDTO(KycProfile profile) {
        if (profile == null) return null;
        KycProfileDTO dto = new KycProfileDTO();
        dto.setId(profile.getId());
        dto.setStatus(profile.getStatus());
        dto.setAccountId(profile.getAccount() != null ? profile.getAccount().getId() : null);
        dto.setRejectReason(profile.getRejectReason());
        dto.setAdditionalNote(profile.getAdditionalNote());
        dto.setSubmittedAt(profile.getSubmittedAt());
        dto.setReviewedAt(profile.getReviewedAt());
        dto.setReviewedById(profile.getReviewedBy() != null ? profile.getReviewedBy().getId() : null);

        if (profile.getDocuments() != null) {
            List<KycProfileDTO.KycDocumentDTO> docDtos = profile.getDocuments().stream().map(doc -> {
                KycProfileDTO.KycDocumentDTO docDto = new KycProfileDTO.KycDocumentDTO();
                docDto.setId(doc.getId());
                docDto.setDocumentType(doc.getDocumentType() != null ? doc.getDocumentType().name() : null);
                docDto.setDocumentUrl(doc.getDocumentUrl());
                docDto.setUploadedAt(doc.getUploadedAt());
                return docDto;
            }).collect(Collectors.toList());
            dto.setDocuments(docDtos);
        }
        return dto;
    }
}
