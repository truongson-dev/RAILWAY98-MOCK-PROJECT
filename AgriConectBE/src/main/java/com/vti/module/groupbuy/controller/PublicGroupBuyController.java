package com.vti.module.groupbuy.controller;

import com.vti.common.ApiResponse;
import com.vti.common.PageResponse;
import com.vti.common.enums.GroupBuyStatus;
import com.vti.module.groupbuy.dto.GroupBuyDTO;
import com.vti.module.groupbuy.service.GroupBuyService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/group-buys")
@RequiredArgsConstructor
public class PublicGroupBuyController {

    private final GroupBuyService groupBuyService;

    @GetMapping
    public ApiResponse<PageResponse<GroupBuyDTO>> getGroupBuys(
            @RequestParam(required = false) GroupBuyStatus status,
            Pageable pageable) {
        return ApiResponse.success(groupBuyService.getGroupBuys(status, pageable));
    }

    @GetMapping("/{id}")
    public ApiResponse<GroupBuyDTO> getGroupBuyById(@PathVariable Long id) {
        return ApiResponse.success(groupBuyService.getById(id));
    }
}
