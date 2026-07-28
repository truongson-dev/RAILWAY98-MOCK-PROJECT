package com.vti.module.contract.dto;

import com.vti.module.contract.enums.MilestoneStatus;
import lombok.Data;

@Data
public class UpdateMilestoneRequest {
    private MilestoneStatus status;
    private String notes;

    public MilestoneStatus getStatus() { return status; }
    public void setStatus(MilestoneStatus status) { this.status = status; }
    
    public String getNotes() { return notes; }
    public void setNotes(String notes) { this.notes = notes; }
}
