package com.vti.module.system.dto;

import lombok.Data;
import java.time.LocalDateTime;

@Data
public class AuditLogDTO {
    private Long id;
    private String action;
    private String entityType;
    private String entityId;
    private String performedByEmail;
    private String ipAddress;
    private String oldValue;
    private String newValue;
    private LocalDateTime createdAt;

    public void setId(Long id) { this.id = id; }
    public void setAction(String action) { this.action = action; }
    public void setEntityType(String entityType) { this.entityType = entityType; }
    public void setEntityId(String entityId) { this.entityId = entityId; }
    public void setPerformedByEmail(String performedByEmail) { this.performedByEmail = performedByEmail; }
    public void setIpAddress(String ipAddress) { this.ipAddress = ipAddress; }
    public void setOldValue(String oldValue) { this.oldValue = oldValue; }
    public void setNewValue(String newValue) { this.newValue = newValue; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}
