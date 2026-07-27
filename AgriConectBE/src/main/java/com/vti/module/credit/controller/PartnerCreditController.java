package com.vti.module.credit.controller;

import com.vti.common.ApiResponse;
import com.vti.module.credit.dto.CreditDTO;
import com.vti.module.credit.service.CreditService;
import com.vti.security.UserPrincipal;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/partner/credit")
@RequiredArgsConstructor
@PreAuthorize("hasRole('PARTNER')")
public class PartnerCreditController {

    private final CreditService creditService;

    @GetMapping("/my-credit")
    public ApiResponse<CreditDTO> getMyCredit(@AuthenticationPrincipal UserPrincipal userPrincipal) {
        return ApiResponse.success(creditService.getMyCredit(userPrincipal.getId()));
    }
}

