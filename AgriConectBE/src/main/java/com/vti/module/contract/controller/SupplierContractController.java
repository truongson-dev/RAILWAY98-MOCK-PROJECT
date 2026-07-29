package com.vti.module.contract.controller;

import com.vti.common.PageResponse;
import com.vti.common.enums.ContractStatus;
import com.vti.module.contract.dto.ForwardContractDTO;
import com.vti.module.contract.service.ContractService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
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
        // In a real scenario, supplierId should be extracted from SecurityContext (JWT)
        // For mock project, we use parameter or just return all to demonstrate UI
        PageResponse<ForwardContractDTO> contracts = contractService.getForwardContracts(null, pageable);
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
            contract = contractService.updateForwardStatus(id, status);
        } else {
            contract = contractService.getForwardContractById(id);
        }
        
        return ResponseEntity.ok(ApiResponse.success(contract));
    }
}
