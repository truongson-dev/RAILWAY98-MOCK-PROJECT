package com.vti.module.contract.dto;

import lombok.Data;
import java.math.BigDecimal;
import java.util.List;

@Data
public class CreateEscrowRequest {
    private Long buyerId;
    private Long sellerId;
    private String productName;
    private BigDecimal quantityTons;
    private BigDecimal totalValueVnd;
    private String notes;

    public Long getBuyerId() { return buyerId; }
    public Long getSellerId() { return sellerId; }
    public String getProductName() { return productName; }
    public BigDecimal getQuantityTons() { return quantityTons; }
    public BigDecimal getTotalValueVnd() { return totalValueVnd; }
    public String getNotes() { return notes; }
    public List<EscrowMilestoneDTO> getMilestones() { return milestones; }
    public void setBuyerId(Long buyerId) { this.buyerId = buyerId; }
    public void setSellerId(Long sellerId) { this.sellerId = sellerId; }
    public void setProductName(String productName) { this.productName = productName; }
    public void setQuantityTons(BigDecimal quantityTons) { this.quantityTons = quantityTons; }
    public void setTotalValueVnd(BigDecimal totalValueVnd) { this.totalValueVnd = totalValueVnd; }
    public void setNotes(String notes) { this.notes = notes; }
    private List<EscrowMilestoneDTO> milestones;
}
