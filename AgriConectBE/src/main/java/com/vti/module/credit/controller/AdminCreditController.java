package com.vti.module.credit.controller;

import com.vti.common.ApiResponse;
import com.vti.common.PageResponse;
import com.vti.module.credit.dto.CreditDTO;
import com.vti.module.credit.dto.UpdateCreditLimitRequest;
import com.vti.module.credit.service.CreditService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin/credit")
@RequiredArgsConstructor
@PreAuthorize("hasRole('ADMIN')")
public class AdminCreditController {

    private final CreditService creditService;

    @GetMapping
    public ApiResponse<PageResponse<CreditDTO>> getAllCredit(Pageable pageable) {
        return ApiResponse.success(creditService.getAllCredit(pageable));
    }

    @GetMapping("/account/{accountId}")
    public ApiResponse<CreditDTO> getCreditByAccountId(@PathVariable Long accountId) {
        return ApiResponse.success(creditService.getCreditByAccountId(accountId));
    }

    @PutMapping("/{id}/limit")
    public ApiResponse<CreditDTO> updateCreditLimit(
            @PathVariable Long id,
            @RequestBody UpdateCreditLimitRequest request) {
        return ApiResponse.success(creditService.updateCreditLimit(id, request));
    }
}

