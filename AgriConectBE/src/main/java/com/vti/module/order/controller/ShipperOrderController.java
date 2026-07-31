package com.vti.module.order.controller;

import com.vti.common.ApiResponse;
import com.vti.common.PageResponse;
import com.vti.common.enums.OrderStatus;
import com.vti.module.order.dto.OrderDTO;
import com.vti.module.order.service.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/shipper/orders")
@RequiredArgsConstructor
public class ShipperOrderController {

    private final OrderService orderService;

    @GetMapping
    @PreAuthorize("hasAnyRole('SHIPPER')")
    public ApiResponse<PageResponse<OrderDTO>> getShipperOrders(
            @RequestParam(required = false) OrderStatus status,
            Pageable pageable) {
        return ApiResponse.success(orderService.getOrders(null, status, pageable));
    }
}
