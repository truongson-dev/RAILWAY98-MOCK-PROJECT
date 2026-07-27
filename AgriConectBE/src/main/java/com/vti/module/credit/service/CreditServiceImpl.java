package com.vti.module.credit.service;

import com.vti.common.PageResponse;
import com.vti.exception.AppException;
import com.vti.exception.ErrorCode;
import com.vti.module.credit.dto.CreditDTO;
import com.vti.module.credit.dto.UpdateCreditLimitRequest;
import com.vti.module.credit.entity.CreditInfo;
import com.vti.module.credit.repository.CreditRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.BeanUtils;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class CreditServiceImpl implements CreditService {

    private final CreditRepository creditRepo;

    @Override
    public CreditDTO getMyCredit(Long userId) {
        CreditInfo info = creditRepo.findByAccountId(userId)
                .orElseThrow(() -> new AppException(ErrorCode.CREDIT_NOT_FOUND));
        return convertToDTO(info);
    }

    @Override
    public PageResponse<CreditDTO> getAllCredit(Pageable pageable) {
        Page<CreditInfo> page = creditRepo.findAll(pageable);
        return PageResponse.of(page.map(this::convertToDTO));
    }

    @Override
    @Transactional
    public CreditDTO updateCreditLimit(Long id, UpdateCreditLimitRequest request) {
        CreditInfo info = creditRepo.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.CREDIT_NOT_FOUND));
        info.setCreditLimit(request.getCreditLimit());
        info.setBillingCycle(request.getBillingCycle());
        
        // update available credit
        info.setAvailableCredit(info.getCreditLimit().subtract(info.getUsedCredit()));
        
        return convertToDTO(creditRepo.save(info));
    }

    @Override
    public CreditDTO getCreditByAccountId(Long accountId) {
        CreditInfo info = creditRepo.findByAccountId(accountId)
                .orElseThrow(() -> new AppException(ErrorCode.CREDIT_NOT_FOUND));
        return convertToDTO(info);
    }

    private CreditDTO convertToDTO(CreditInfo entity) {
        CreditDTO dto = new CreditDTO();
        BeanUtils.copyProperties(entity, dto);
        if (entity.getAccount() != null) {
            dto.setAccountId(entity.getAccount().getId());
        }
        return dto;
    }
}
