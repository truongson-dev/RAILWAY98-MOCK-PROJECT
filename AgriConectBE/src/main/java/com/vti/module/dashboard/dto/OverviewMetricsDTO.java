package com.vti.module.dashboard.dto;

import java.math.BigDecimal;

public class OverviewMetricsDTO {
    public OverviewMetricsDTO() {}

    private long totalPartners;
    private long totalSuppliers;
    private long totalOrders;
    private long pendingOrders;
    private long pendingKyc;
    private long activeContracts;
    private long openGroupBuys;
    private BigDecimal totalRevenue;
    private BigDecimal revenueGrowth;

    public long getTotalPartners() { return totalPartners; }
    public void setTotalPartners(long totalPartners) { this.totalPartners = totalPartners; }
    public long getTotalSuppliers() { return totalSuppliers; }
    public void setTotalSuppliers(long totalSuppliers) { this.totalSuppliers = totalSuppliers; }
    public long getTotalOrders() { return totalOrders; }
    public void setTotalOrders(long totalOrders) { this.totalOrders = totalOrders; }
    public long getPendingOrders() { return pendingOrders; }
    public void setPendingOrders(long pendingOrders) { this.pendingOrders = pendingOrders; }
    public long getPendingKyc() { return pendingKyc; }
    public void setPendingKyc(long pendingKyc) { this.pendingKyc = pendingKyc; }
    public long getActiveContracts() { return activeContracts; }
    public void setActiveContracts(long activeContracts) { this.activeContracts = activeContracts; }
    public long getOpenGroupBuys() { return openGroupBuys; }
    public void setOpenGroupBuys(long openGroupBuys) { this.openGroupBuys = openGroupBuys; }
    public BigDecimal getTotalRevenue() { return totalRevenue; }
    public void setTotalRevenue(BigDecimal totalRevenue) { this.totalRevenue = totalRevenue; }
    public BigDecimal getRevenueGrowth() { return revenueGrowth; }
    public void setRevenueGrowth(BigDecimal revenueGrowth) { this.revenueGrowth = revenueGrowth; }
}
