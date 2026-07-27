package com.vti.module.system.dto;

import com.vti.module.system.enums.AlertLevel;
import lombok.Data;

@Data
public class CreateSystemAlertRequest {
    private String title;
    private String description;
    private AlertLevel level;
    private String category;
    
    public String getTitle() { return title; }
    public String getDescription() { return description; }
    public AlertLevel getLevel() { return level; }
    public String getCategory() { return category; }
}
