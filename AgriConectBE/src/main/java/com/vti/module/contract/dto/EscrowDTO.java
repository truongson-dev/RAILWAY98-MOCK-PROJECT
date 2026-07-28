package com.vti.module.contract.dto;

import com.vti.common.enums.ContractStatus;
import lombok.Data;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Data
public class EscrowDTO {
    private Long id;
    private String contractCode;
    private Long buyerId;
    private Long sellerId;
    private String productName;
    private BigDecimal quantityTons;
    private BigDecimal totalValueVnd;
    private ContractStatus status;
    private int progressPercent;

    public void setBuyerId(Long buyerId) { this.buyerId = buyerId; }
    public void setSellerId(Long sellerId) { this.sellerId = sellerId; }
    private String notes;
    private List<EscrowMilestoneDTO> milestones;

    public void setMilestones(List<EscrowMilestoneDTO> milestones) { this.milestones = milestones; }
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
