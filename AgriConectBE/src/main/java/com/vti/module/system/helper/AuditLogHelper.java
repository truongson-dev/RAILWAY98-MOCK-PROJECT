package com.vti.module.system.helper;

import com.vti.module.system.entity.AuditLog;
import com.vti.module.system.repository.AuditLogRepository;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Component;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

@Component
@RequiredArgsConstructor
@Slf4j
public class AuditLogHelper {

    private final AuditLogRepository auditLogRepository;

    /**
     * Ghi log bất đồng bộ để không block luồng chính
     */
    @Async
    public void logAsync(String action, String entityType, String entityId, String oldValue, String newValue, String performedByEmail) {
        try {
            AuditLog auditLog = new AuditLog();
            auditLog.setAction(action);
            auditLog.setEntityType(entityType);
            auditLog.setEntityId(entityId);
            auditLog.setOldValue(oldValue);
            auditLog.setNewValue(newValue);
            auditLog.setPerformedByEmail(performedByEmail);
            auditLogRepository.save(auditLog);
        } catch (Exception e) {
            System.err.println("Error in AuditLogHelper: " + e.getMessage());
        }
    }

    /**
     * Lấy IP của Client
     */
    public String getClientIp() {
        try {
            ServletRequestAttributes attributes = (ServletRequestAttributes) RequestContextHolder.getRequestAttributes();
            if (attributes != null) {
                HttpServletRequest request = attributes.getRequest();
                String xForwardedFor = request.getHeader("X-Forwarded-For");
                if (xForwardedFor != null && !xForwardedFor.isEmpty()) {
                    return xForwardedFor.split(",")[0];
                }
                return request.getRemoteAddr();
            }
        } catch (Exception e) {
            System.err.println("Could not get client IP: " + e.getMessage());
        }
        return "UNKNOWN";
    }
}
