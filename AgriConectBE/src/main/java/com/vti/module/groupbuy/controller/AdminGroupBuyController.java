package com.vti.module.groupbuy.controller;

import com.vti.common.ApiResponse;
import com.vti.module.groupbuy.dto.CreateGroupBuyRequest;
import com.vti.module.groupbuy.dto.GroupBuyDTO;
import com.vti.module.groupbuy.service.GroupBuyService;
import com.vti.security.UserPrincipal;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin/group-buys")
@RequiredArgsConstructor
@PreAuthorize("hasRole('ADMIN')")
public class AdminGroupBuyController {

    private final GroupBuyService groupBuyService;

    @PostMapping
    public ApiResponse<GroupBuyDTO> createGroupBuy(
            @RequestBody CreateGroupBuyRequest request,
            @AuthenticationPrincipal UserPrincipal userPrincipal) {
        return ApiResponse.success(groupBuyService.createGroupBuy(request, userPrincipal.getId()));
    }

    @PutMapping("/{id}/close")
    public ApiResponse<GroupBuyDTO> closeGroupBuy(@PathVariable Long id) {
        return ApiResponse.success(groupBuyService.closeGroupBuy(id));
    }
}
