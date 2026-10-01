package com.vti.module.contract.controller;

import com.vti.common.PageResponse;
import com.vti.common.enums.ContractStatus;
import com.vti.module.contract.dto.ForwardContractDTO;
import com.vti.module.contract.service.ContractService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.vti.security.UserPrincipal;
import com.vti.common.ApiResponse;
import java.util.Map;

@RestController
@RequestMapping("/api/supplier/contracts")
@RequiredArgsConstructor
public class SupplierContractController {

    private final ContractService contractService;

    @GetMapping("/forward")
    public ResponseEntity<ApiResponse<PageResponse<ForwardContractDTO>>> getSupplierForwardContracts(
            @RequestParam(required = false) Long supplierId,
            Pageable pageable) {
        // Extract supplierId from SecurityContext
        Long actualSupplierId = null;
        try {
            UserPrincipal currentUser = (UserPrincipal) org.springframework.security.core.context.SecurityContextHolder.getContext().getAuthentication().getPrincipal();
            actualSupplierId = currentUser.getId();
        } catch (Exception e) {}
        
        PageResponse<ForwardContractDTO> contracts = contractService.getForwardContractsBySupplier(actualSupplierId, null, pageable);
        return ResponseEntity.ok(ApiResponse.success(contracts));
    }

    @PutMapping("/forward/{id}/status")
    public ResponseEntity<ApiResponse<ForwardContractDTO>> updateForwardContractStatus(
            @PathVariable Long id,
            @RequestBody Map<String, String> body) {
        // Mock update status implementation for UI Demo
        String statusStr = body.get("status");
        ContractStatus status = null;
        try {
            if (statusStr != null) {
                status = ContractStatus.valueOf(statusStr.toUpperCase());
            }
        } catch (IllegalArgumentException e) {
            // Ignore
        }
        
        ForwardContractDTO contract;
        if (status != null) {
            Long actualSupplierId = null;
            try {
                UserPrincipal currentUser = (UserPrincipal) org.springframework.security.core.context.SecurityContextHolder.getContext().getAuthentication().getPrincipal();
                actualSupplierId = currentUser.getId();
            } catch (Exception e) {}
            contract = contractService.updateForwardStatusBySupplier(id, status, actualSupplierId);
        } else {
            contract = contractService.getForwardContractById(id);
        }
        
        return ResponseEntity.ok(ApiResponse.success(contract));
    }
}
