package com.vti.module.credit.dto;

import lombok.Data;
import java.math.BigDecimal;

@Data
public class UpdateCreditLimitRequest {
    private BigDecimal creditLimit;
    private Integer billingCycle;

    public BigDecimal getCreditLimit() { return creditLimit; }
    public Integer getBillingCycle() { return billingCycle; }
}
