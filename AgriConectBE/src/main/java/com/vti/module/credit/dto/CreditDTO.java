package com.vti.module.credit.dto;

import com.vti.common.enums.PartnerRank;
import lombok.Data;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
public class CreditDTO {
    private Long id;
    private Long accountId;
    private BigDecimal creditLimit;
    private BigDecimal usedCredit;
    private BigDecimal availableCredit;
    private Integer billingCycle;

    public void setAccountId(Long accountId) { this.accountId = accountId; }
    private LocalDate nextDueDate;
    private PartnerRank partnerRank;
    private BigDecimal accumulatedVolumeYtdKg;
    private LocalDateTime updatedAt;
}
