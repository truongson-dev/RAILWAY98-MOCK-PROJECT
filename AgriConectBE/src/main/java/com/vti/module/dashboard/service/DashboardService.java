package com.vti.module.dashboard.service;

import com.vti.module.dashboard.dto.OrderStatusSummaryDTO;
import com.vti.module.dashboard.dto.OverviewMetricsDTO;
import com.vti.module.dashboard.dto.RevenueChartDTO;
import com.vti.module.dashboard.dto.UserDistributionDTO;

/**
 * Service xử lý các nghiệp vụ của Dashboard
 */
public interface DashboardService {
    OverviewMetricsDTO getOverviewMetrics();
    RevenueChartDTO getRevenueChart(String period); // "monthly" | "weekly"
    UserDistributionDTO getUserDistribution();
    OrderStatusSummaryDTO getOrderStatusSummary();
}
