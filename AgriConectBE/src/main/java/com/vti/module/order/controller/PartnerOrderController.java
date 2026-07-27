package com.vti.module.order.controller;

import com.vti.common.ApiResponse;
import com.vti.common.PageResponse;
import com.vti.common.enums.OrderStatus;
import com.vti.module.order.dto.CreateOrderRequest;
import com.vti.module.order.dto.OrderDTO;
import com.vti.module.order.service.OrderService;
import com.vti.security.UserPrincipal;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/partner/orders")
@RequiredArgsConstructor
public class PartnerOrderController {

    private final OrderService orderService;

    // Lấy danh sách đơn hàng của Partner hiện tại
    @GetMapping
    @PreAuthorize("hasAnyRole('PARTNER')")
    public ApiResponse<PageResponse<OrderDTO>> getMyOrders(
            @RequestParam(required = false) OrderStatus status,
            Pageable pageable,
            @AuthenticationPrincipal UserPrincipal currentUser) {
        return ApiResponse.success(orderService.getMyOrders(currentUser.getId(), status, pageable));
    }

    // Lấy chi tiết đơn hàng
    @GetMapping("/{id}")
    @PreAuthorize("hasAnyRole('PARTNER')")
    public ApiResponse<OrderDTO> getOrderById(@PathVariable Long id) {
        return ApiResponse.success(orderService.getOrderById(id));
    }

    // Tạo đơn hàng mới
    @PostMapping
    @PreAuthorize("hasAnyRole('PARTNER')")
    public ApiResponse<OrderDTO> createOrder(
            @RequestBody CreateOrderRequest request,
            @AuthenticationPrincipal UserPrincipal currentUser) {
        return ApiResponse.success(orderService.createOrder(request, currentUser.getId()));
    }

    // Hủy đơn hàng (chỉ khi đang ở trạng thái cho phép)
    @PutMapping("/{id}/cancel")
    @PreAuthorize("hasAnyRole('PARTNER')")
    public ApiResponse<OrderDTO> cancelOrder(
            @PathVariable Long id,
            @RequestParam String reason,
            @AuthenticationPrincipal UserPrincipal currentUser) {
        return ApiResponse.success(orderService.cancelOrder(id, reason, currentUser.getId()));
    }
}
