package com.vti.module.contract.controller;

import com.vti.common.ApiResponse;
import com.vti.module.contract.dto.CreateEscrowRequest;
import com.vti.module.contract.dto.EscrowDTO;
import com.vti.module.contract.service.ContractService;
import com.vti.security.UserPrincipal;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/partner/contracts")
@RequiredArgsConstructor
@PreAuthorize("hasRole('PARTNER')")
public class PartnerContractController {

    private final ContractService contractService;

    @PostMapping("/escrow")
    public ApiResponse<EscrowDTO> createEscrow(
            @RequestBody CreateEscrowRequest request,
            @AuthenticationPrincipal UserPrincipal userPrincipal) {
        
        // Ensure buyer is the current partner
        request.setBuyerId(userPrincipal.getId());
        
        // For testing, if sellerId is missing we can just fail or assign a default admin/supplier.
        // The frontend will need to send sellerId or we infer it from ForwardContract
        return ApiResponse.success(contractService.createEscrow(request, userPrincipal.getId()));
    }

    @PostMapping("/forward/{id}/register")
    public ApiResponse<EscrowDTO> registerForwardContract(
            @PathVariable Long id,
            @AuthenticationPrincipal UserPrincipal userPrincipal) {
        return ApiResponse.success(contractService.createEscrowFromForwardContract(id, userPrincipal.getId()));
    }
}
