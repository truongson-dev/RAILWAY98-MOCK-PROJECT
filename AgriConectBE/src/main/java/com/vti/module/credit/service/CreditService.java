package com.vti.module.credit.service;

import com.vti.common.PageResponse;
import com.vti.module.credit.dto.CreditDTO;
import com.vti.module.credit.dto.UpdateCreditLimitRequest;
import org.springframework.data.domain.Pageable;

public interface CreditService {
    CreditDTO getMyCredit(Long userId);
    PageResponse<CreditDTO> getAllCredit(Pageable pageable);
    CreditDTO updateCreditLimit(Long id, UpdateCreditLimitRequest request);
    CreditDTO getCreditByAccountId(Long accountId);
}
