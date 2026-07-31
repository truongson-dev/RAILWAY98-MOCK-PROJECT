package com.vti.module.dashboard.service;

import com.vti.common.enums.AccountStatus;
import com.vti.common.enums.KycStatus;
import com.vti.common.enums.OrderStatus;
import com.vti.common.enums.UserRole;
import com.vti.module.account.repository.AccountRepository;
import com.vti.module.dashboard.dto.*;
import com.vti.module.kyc.repository.KycProfileRepository;
import com.vti.module.order.repository.OrderRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

/**
 * Implement cho DashboardService với dữ liệu thực từ Repositories
 */
@Service
@RequiredArgsConstructor
public class DashboardServiceImpl implements DashboardService {
    
    private final AccountRepository accountRepository;
    private final OrderRepository orderRepository;
    private final KycProfileRepository kycProfileRepository;
    // Bỏ qua GroupBuyRepository và EscrowContractRepository nếu chưa tồn tại
    
    @Override
    public OverviewMetricsDTO getOverviewMetrics() {
        BigDecimal totalRevenue = orderRepository.calculateTotalRevenue();
        if (totalRevenue == null) totalRevenue = BigDecimal.ZERO;

        OverviewMetricsDTO metrics = new OverviewMetricsDTO();
        metrics.setTotalPartners(accountRepository.countByRole(UserRole.PARTNER));
        metrics.setTotalSuppliers(accountRepository.countByRole(UserRole.SUPPLIER));
        metrics.setTotalOrders(orderRepository.count());
        metrics.setPendingOrders(orderRepository.countByStatus(OrderStatus.pending));
        metrics.setPendingKyc(kycProfileRepository.countByStatus(KycStatus.PENDING));
        metrics.setActiveContracts(0); // Mock tạm nếu chưa có Contract module
        metrics.setOpenGroupBuys(0);   // Mock tạm nếu chưa có GroupBuy module
        metrics.setTotalRevenue(totalRevenue);
        metrics.setRevenueGrowth(BigDecimal.ZERO); // Tính sau
        return metrics;
    }

    @Override
    public RevenueChartDTO getRevenueChart(String period) {
        int currentYear = LocalDate.now().getYear();
        List<ChartDataPoint> dataPoints = new ArrayList<>();
        BigDecimal total = BigDecimal.ZERO;

        if ("monthly".equalsIgnoreCase(period)) {
            // Khởi tạo 12 tháng với giá trị 0
            BigDecimal[] monthlyTotals = new BigDecimal[13];
            for (int i = 1; i <= 12; i++) monthlyTotals[i] = BigDecimal.ZERO;

            List<Object[]> results = orderRepository.getMonthlyRevenue(currentYear);
            for (Object[] row : results) {
                int month = ((Number) row[0]).intValue();
                BigDecimal amount = (BigDecimal) row[1];
                monthlyTotals[month] = amount;
                total = total.add(amount);
            }

            for (int i = 1; i <= 12; i++) {
                dataPoints.add(new ChartDataPoint("Tháng " + i, monthlyTotals[i]));
            }
        } else {
            // Weekly logic tương tự
            List<Object[]> results = orderRepository.getWeeklyRevenue(currentYear);
            for (Object[] row : results) {
                String label = "Tuần " + ((Number) row[0]).intValue();
                BigDecimal amount = (BigDecimal) row[1];
                dataPoints.add(new ChartDataPoint(label, amount));
                total = total.add(amount);
            }
        }

        RevenueChartDTO metrics = new RevenueChartDTO();
        metrics.setDataPoints(dataPoints);
        metrics.setTotal(total);
        metrics.setPeriod(period);
        return metrics;
    }

    @Override
    public UserDistributionDTO getUserDistribution() {
        UserDistributionDTO dto = new UserDistributionDTO();
        dto.setPartners(accountRepository.countByRole(UserRole.PARTNER));
        dto.setSuppliers(accountRepository.countByRole(UserRole.SUPPLIER));
        dto.setShippers(accountRepository.countByRole(UserRole.SHIPPER));
        dto.setActiveAccounts(accountRepository.countByStatus(AccountStatus.ACTIVE));
        dto.setPendingAccounts(accountRepository.countByStatus(AccountStatus.PENDING_APPROVAL));
        return dto;
    }

    @Override
    public OrderStatusSummaryDTO getOrderStatusSummary() {
        OrderStatusSummaryDTO dto = new OrderStatusSummaryDTO();
        dto.setPending(orderRepository.countByStatus(OrderStatus.pending));
        dto.setProcessing(orderRepository.countByStatus(OrderStatus.processing));
        dto.setShipping(orderRepository.countByStatus(OrderStatus.shipping));
        dto.setDelivered(orderRepository.countByStatus(OrderStatus.delivered));
        dto.setCompleted(orderRepository.countByStatus(OrderStatus.completed));
        dto.setCancelled(orderRepository.countByStatus(OrderStatus.cancelled));
        return dto;
    }
}
