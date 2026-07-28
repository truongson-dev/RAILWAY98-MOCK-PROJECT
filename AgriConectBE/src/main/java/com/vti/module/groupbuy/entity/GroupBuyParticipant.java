package com.vti.module.groupbuy.entity;

import com.vti.module.account.entity.Account;
import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name="group_buy_participants", 
       uniqueConstraints=@UniqueConstraint(columnNames={"group_buy_id","account_id"}))
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class GroupBuyParticipant {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "group_buy_id")
    private GroupBuy groupBuy;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "account_id")
    private Account account;

    @Column(name = "volume_kg")
    private BigDecimal volumeKg;

    @Column(name = "amount_vnd")
    private BigDecimal amountVnd;

    @Column(name = "joined_at")
    private LocalDateTime joinedAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    public void setGroupBuy(GroupBuy groupBuy) { this.groupBuy = groupBuy; }
    public void setAccount(Account account) { this.account = account; }
    public void setVolumeKg(BigDecimal volumeKg) { this.volumeKg = volumeKg; }
    public void setAmountVnd(BigDecimal amountVnd) { this.amountVnd = amountVnd; }
    public void setJoinedAt(LocalDateTime joinedAt) { this.joinedAt = joinedAt; }
}
