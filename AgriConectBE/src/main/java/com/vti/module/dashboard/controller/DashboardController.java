package com.vti.module.dashboard.controller;

import com.vti.common.ApiResponse;
import com.vti.module.dashboard.dto.OrderStatusSummaryDTO;
import com.vti.module.dashboard.dto.OverviewMetricsDTO;
import com.vti.module.dashboard.dto.RevenueChartDTO;
import com.vti.module.dashboard.dto.UserDistributionDTO;
import com.vti.module.dashboard.service.DashboardService;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

/**
 * Controller cho Dashboard (dành cho Admin)
 */
@RestController
@RequestMapping("/api/admin/dashboard")
@PreAuthorize("hasRole('ADMIN')")
@RequiredArgsConstructor
@Tag(name = "Admin")
public class DashboardController {

    private final DashboardService dashboardService;

    /**
     * Lấy dữ liệu tổng quan cho Dashboard
     */
    @GetMapping("/overview")
    public ResponseEntity<ApiResponse<OverviewMetricsDTO>> getOverviewMetrics() {
        return ResponseEntity.ok(ApiResponse.success(dashboardService.getOverviewMetrics()));
    }

    /**
     * Lấy dữ liệu biểu đồ doanh thu
     * @param period "monthly" (theo tháng) hoặc "weekly" (theo tuần)
     */
    @GetMapping("/revenue-chart")
    public ResponseEntity<ApiResponse<RevenueChartDTO>> getRevenueChart(
            @RequestParam(defaultValue = "monthly") String period) {
        return ResponseEntity.ok(ApiResponse.success(dashboardService.getRevenueChart(period)));
    }

    /**
     * Phân bố người dùng theo role
     */
    @GetMapping("/user-distribution")
    public ResponseEntity<ApiResponse<UserDistributionDTO>> getUserDistribution() {
        return ResponseEntity.ok(ApiResponse.success(dashboardService.getUserDistribution()));
    }

    /**
     * Tóm tắt trạng thái đơn hàng
     */
    @GetMapping("/order-summary")
    public ResponseEntity<ApiResponse<OrderStatusSummaryDTO>> getOrderStatusSummary() {
        return ResponseEntity.ok(ApiResponse.success(dashboardService.getOrderStatusSummary()));
    }
}
