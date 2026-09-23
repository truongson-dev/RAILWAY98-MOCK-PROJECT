package com.vti.module.groupbuy.controller;

import com.vti.common.ApiResponse;
import com.vti.common.PageResponse;
import com.vti.common.enums.GroupBuyStatus;
import com.vti.module.groupbuy.dto.GroupBuyDTO;
import com.vti.module.groupbuy.service.GroupBuyService;
import com.vti.security.UserPrincipal;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/supplier/group-buys")
@RequiredArgsConstructor
@PreAuthorize("hasRole('SUPPLIER')")
public class SupplierGroupBuyController {

    private final GroupBuyService groupBuyService;

    @GetMapping
    public ApiResponse<PageResponse<GroupBuyDTO>> getMyGroupBuys(
            @RequestParam(required = false) GroupBuyStatus status,
            Pageable pageable,
            @AuthenticationPrincipal UserPrincipal userPrincipal) {
        return ApiResponse.success(groupBuyService.getSupplierGroupBuys(userPrincipal.getId(), status, pageable));
    }
    
    @PutMapping("/{id}/status")
    public ApiResponse<GroupBuyDTO> updateStatus(
            @PathVariable Long id,
            @RequestParam GroupBuyStatus status,
            @AuthenticationPrincipal UserPrincipal userPrincipal) {
        return ApiResponse.success(groupBuyService.updateStatus(id, status, userPrincipal.getId()));
    }
}
