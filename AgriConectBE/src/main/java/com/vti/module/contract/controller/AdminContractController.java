package com.vti.module.contract.controller;

import com.vti.common.ApiResponse;
import com.vti.common.PageResponse;
import com.vti.common.enums.ContractStatus;
import com.vti.module.contract.dto.*;
import com.vti.module.contract.service.ContractService;
import com.vti.security.UserPrincipal;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin/contracts")
@RequiredArgsConstructor
@PreAuthorize("hasRole('ADMIN')")
public class AdminContractController {

    private final ContractService contractService;

    @GetMapping("/escrow")
    public ApiResponse<PageResponse<EscrowDTO>> getEscrows(
            @RequestParam(required = false) ContractStatus status,
            Pageable pageable) {
        return ApiResponse.success(contractService.getEscrows(status, pageable));
    }

    @GetMapping("/escrow/{id}")
    public ApiResponse<EscrowDTO> getEscrowById(@PathVariable Long id) {
        return ApiResponse.success(contractService.getEscrowById(id));
    }

    @PostMapping("/escrow")
    public ApiResponse<EscrowDTO> createEscrow(
            @RequestBody CreateEscrowRequest request,
            @AuthenticationPrincipal UserPrincipal userPrincipal) {
        return ApiResponse.success(contractService.createEscrow(request, userPrincipal.getId()));
    }

    @PutMapping("/escrow/{id}/status")
    public ApiResponse<EscrowDTO> updateEscrowStatus(
            @PathVariable Long id,
            @RequestBody UpdateContractStatusRequest request) {
        return ApiResponse.success(contractService.updateEscrowStatus(id, request.getStatus()));
    }

    @PutMapping("/escrow/{id}/milestones/{milestoneId}")
    public ApiResponse<EscrowDTO> updateMilestone(@PathVariable Long id, @PathVariable Long milestoneId, @RequestBody com.vti.module.contract.dto.UpdateMilestoneRequest request) {
        return ApiResponse.success(contractService.updateMilestone(id, milestoneId, request));
    }

    @GetMapping("/forward")
    public ApiResponse<PageResponse<ForwardContractDTO>> getForwardContracts(
            @RequestParam(required = false) ContractStatus status,
            Pageable pageable) {
        return ApiResponse.success(contractService.getForwardContracts(status, pageable));
    }

    @PostMapping("/forward")
    public ApiResponse<ForwardContractDTO> createForwardContract(
            @RequestBody CreateForwardRequest request,
            @AuthenticationPrincipal UserPrincipal userPrincipal) {
        return ApiResponse.success(contractService.createForwardContract(request, userPrincipal.getId()));
    }

    @PutMapping("/forward/{id}/status")
    public ApiResponse<ForwardContractDTO> updateForwardStatus(
            @PathVariable Long id,
            @RequestBody UpdateContractStatusRequest request) {
        return ApiResponse.success(contractService.updateForwardStatus(id, request.getStatus()));
    }
}
