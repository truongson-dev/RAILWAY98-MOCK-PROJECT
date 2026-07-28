package com.vti.module.dashboard.dto;

import java.math.BigDecimal;
import java.util.List;

public class RevenueChartDTO {
    public RevenueChartDTO() {}

    private List<ChartDataPoint> dataPoints;
    private String period; // "monthly" | "weekly"
    private BigDecimal total; // Tổng doanh thu trong khoảng thời gian

    public List<ChartDataPoint> getDataPoints() { return dataPoints; }
    public void setDataPoints(List<ChartDataPoint> dataPoints) { this.dataPoints = dataPoints; }
    public String getPeriod() { return period; }
    public void setPeriod(String period) { this.period = period; }
    public BigDecimal getTotal() { return total; }
    public void setTotal(BigDecimal total) { this.total = total; }
}
