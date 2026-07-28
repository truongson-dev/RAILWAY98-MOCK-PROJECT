package com.vti.module.credit.entity;

import com.vti.common.enums.PartnerRank;
import com.vti.module.account.entity.Account;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name="credit_infos")
@EntityListeners(AuditingEntityListener.class)
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CreditInfo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "account_id", unique = true)
    private Account account;

    @Column(name = "credit_limit", precision=15, scale=2)
    private BigDecimal creditLimit;

    @Column(name = "used_credit", precision=15, scale=2)
    private BigDecimal usedCredit;

    @Column(name = "available_credit", precision=15, scale=2)
    private BigDecimal availableCredit;

    @Column(name = "billing_cycle")
    private int billingCycle; // 30 or 60 days

    @Column(name = "next_due_date")
    private LocalDate nextDueDate;

    @Enumerated(EnumType.STRING)
    @Column(name = "partner_rank")
    private PartnerRank partnerRank; // DONG, BAC, VANG, KIM_CUONG

    @Column(name = "accumulated_volume_ytd_kg")
    private BigDecimal accumulatedVolumeYtdKg;

    @LastModifiedDate
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    public BigDecimal getCreditLimit() { return creditLimit; }
    public BigDecimal getUsedCredit() { return usedCredit; }
    public Account getAccount() { return account; }
    public void setCreditLimit(BigDecimal creditLimit) { this.creditLimit = creditLimit; }
    public void setBillingCycle(Integer billingCycle) { this.billingCycle = billingCycle; }
    public void setAvailableCredit(BigDecimal availableCredit) { /* Optional depending on logic, or just add field if needed */ }
}
