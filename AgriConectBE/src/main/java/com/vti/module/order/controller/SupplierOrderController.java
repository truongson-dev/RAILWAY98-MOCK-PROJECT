package com.vti.module.order.controller;

import com.vti.common.ApiResponse;
import com.vti.common.PageResponse;
import com.vti.common.enums.OrderStatus;
import com.vti.module.order.dto.OrderDTO;
import com.vti.module.order.service.OrderService;
import com.vti.security.UserPrincipal;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/supplier/orders")
@RequiredArgsConstructor
public class SupplierOrderController {

    private final OrderService orderService;

    // Lấy danh sách đơn hàng (Tạm thời dùng getOrders chung, sau này có thể filter theo seller_id)
    @GetMapping
    @PreAuthorize("hasAnyRole('SUPPLIER')")
    public ApiResponse<PageResponse<OrderDTO>> getMyOrders(
            @RequestParam(required = false) OrderStatus status,
            Pageable pageable,
            @AuthenticationPrincipal UserPrincipal currentUser) {
        return ApiResponse.success(orderService.getOrders(null, status, pageable));
    }

    // Lấy chi tiết đơn hàng
    @GetMapping("/{id}")
    @PreAuthorize("hasAnyRole('SUPPLIER')")
    public ApiResponse<OrderDTO> getOrderById(@PathVariable Long id) {
        return ApiResponse.success(orderService.getOrderById(id));
    }
}
