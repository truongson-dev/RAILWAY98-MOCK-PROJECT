package com.vti.module.contract.dto;

import com.vti.module.contract.enums.MilestoneStatus;
import lombok.Data;
import java.time.LocalDateTime;

@Data
public class EscrowMilestoneDTO {
    private Long id;
    private Long contractId;
    private String title;
    private String description;
    private MilestoneStatus status;
    private int displayOrder;
    private LocalDateTime completionDate;
    private LocalDateTime createdAt;
    
    public void setId(Long id) { this.id = id; }
    public void setContractId(Long contractId) { this.contractId = contractId; }
    public void setTitle(String title) { this.title = title; }
    public void setDescription(String description) { this.description = description; }
    public void setStatus(MilestoneStatus status) { this.status = status; }
    public void setDisplayOrder(int displayOrder) { this.displayOrder = displayOrder; }
    public void setCompletionDate(LocalDateTime completionDate) { this.completionDate = completionDate; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
    
    public Long getId() { return id; }
    public Long getContractId() { return contractId; }
    public String getTitle() { return title; }
    public String getDescription() { return description; }
    public MilestoneStatus getStatus() { return status; }
    public int getDisplayOrder() { return displayOrder; }
    public LocalDateTime getCompletionDate() { return completionDate; }
    public LocalDateTime getCreatedAt() { return createdAt; }
}
