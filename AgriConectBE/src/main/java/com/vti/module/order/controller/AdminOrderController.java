package com.vti.module.order.controller;

import com.vti.common.ApiResponse;
import com.vti.common.PageResponse;
import com.vti.common.enums.OrderStatus;
import com.vti.module.order.dto.OrderDTO;
import com.vti.module.order.dto.UpdateOrderStatusRequest;
import com.vti.module.order.service.OrderService;
import com.vti.security.UserPrincipal;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin/orders")
@RequiredArgsConstructor
public class AdminOrderController {

    private final OrderService orderService;

    // Lấy danh sách đơn hàng cho Admin
    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ApiResponse<PageResponse<OrderDTO>> getOrders(
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) OrderStatus status,
            Pageable pageable) {
        return ApiResponse.success(orderService.getOrders(keyword, status, pageable));
    }

    // Lấy chi tiết đơn hàng
    @GetMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ApiResponse<OrderDTO> getOrderById(@PathVariable Long id) {
        return ApiResponse.success(orderService.getOrderById(id));
    }

    // Cập nhật trạng thái đơn hàng
    @PutMapping("/{id}/status")
    @PreAuthorize("hasRole('ADMIN')")
    public ApiResponse<OrderDTO> updateOrderStatus(
            @PathVariable Long id,
            @RequestBody UpdateOrderStatusRequest request,
            @AuthenticationPrincipal UserPrincipal currentUser) {
        return ApiResponse.success(orderService.updateOrderStatus(id, request, currentUser.getId()));
    }
}
