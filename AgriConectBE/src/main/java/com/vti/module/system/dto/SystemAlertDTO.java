package com.vti.module.system.dto;

import com.vti.module.system.enums.AlertLevel;
import lombok.Data;
import java.time.LocalDateTime;

@Data
public class SystemAlertDTO {
    private Long id;
    private String title;
    private String description;
    private AlertLevel level;
    private String category;
    private boolean isRead;
    private LocalDateTime createdAt;
    
    public void setId(Long id) { this.id = id; }
    public void setTitle(String title) { this.title = title; }
    public void setDescription(String description) { this.description = description; }
    public void setLevel(AlertLevel level) { this.level = level; }
    public void setCategory(String category) { this.category = category; }
    public void setRead(boolean isRead) { this.isRead = isRead; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
    
    public Long getId() { return id; }
    public String getTitle() { return title; }
    public String getDescription() { return description; }
    public AlertLevel getLevel() { return level; }
    public String getCategory() { return category; }
    public boolean isRead() { return isRead; }
    public LocalDateTime getCreatedAt() { return createdAt; }
}
