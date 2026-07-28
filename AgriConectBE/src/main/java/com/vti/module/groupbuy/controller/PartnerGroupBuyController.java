package com.vti.module.groupbuy.controller;

import com.vti.common.ApiResponse;
import com.vti.module.groupbuy.dto.GroupBuyDTO;
import com.vti.module.groupbuy.dto.JoinGroupBuyRequest;
import com.vti.module.groupbuy.service.GroupBuyService;
import com.vti.security.UserPrincipal;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/partner/group-buys")
@RequiredArgsConstructor
@PreAuthorize("hasRole('PARTNER')")
public class PartnerGroupBuyController {

    private final GroupBuyService groupBuyService;

    @PostMapping("/{id}/join")
    public ApiResponse<GroupBuyDTO> joinGroupBuy(
            @PathVariable Long id,
            @RequestBody JoinGroupBuyRequest request,
            @AuthenticationPrincipal UserPrincipal userPrincipal) {
        return ApiResponse.success(groupBuyService.joinGroupBuy(id, request, userPrincipal.getId()));
    }
}
