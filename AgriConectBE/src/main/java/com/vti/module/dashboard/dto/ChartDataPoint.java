package com.vti.module.dashboard.dto;

import java.math.BigDecimal;

/**
 * Dữ liệu cho một điểm trên biểu đồ
 */
public class ChartDataPoint {
    private String label;  // Nhãn của dữ liệu (Ví dụ: "Tháng 1")
    private BigDecimal value; // Giá trị tương ứng

    public ChartDataPoint() {}
    
    public ChartDataPoint(String label, BigDecimal value) {
        this.label = label;
        this.value = value;
    }

    public String getLabel() { return label; }
    public void setLabel(String label) { this.label = label; }

    public BigDecimal getValue() { return value; }
    public void setValue(BigDecimal value) { this.value = value; }
}
