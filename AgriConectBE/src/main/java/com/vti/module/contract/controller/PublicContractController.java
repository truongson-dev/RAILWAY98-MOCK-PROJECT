package com.vti.module.contract.controller;

import com.vti.common.ApiResponse;
import com.vti.common.PageResponse;
import com.vti.common.enums.ContractStatus;
import com.vti.module.contract.dto.ForwardContractDTO;
import com.vti.module.contract.service.ContractService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/forward-contracts")
@RequiredArgsConstructor
public class PublicContractController {

    private final ContractService contractService;

    @GetMapping
    public ApiResponse<PageResponse<ForwardContractDTO>> getForwardContracts(
            @RequestParam(required = false) ContractStatus status,
            Pageable pageable) {
        return ApiResponse.success(contractService.getForwardContracts(status, pageable));
    }

    @GetMapping("/{id}")
    public ApiResponse<ForwardContractDTO> getForwardContractById(@PathVariable Long id) {
        return ApiResponse.success(contractService.getForwardContractById(id));
    }
}
