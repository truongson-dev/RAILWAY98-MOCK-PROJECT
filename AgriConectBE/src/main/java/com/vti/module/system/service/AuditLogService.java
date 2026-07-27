package com.vti.module.system.service;

import com.vti.common.PageResponse;
import com.vti.module.system.dto.AuditLogDTO;

/**
 * Interface nghiệp vụ cho Audit Log
 */
public interface AuditLogService {
    PageResponse<AuditLogDTO> getAll(int page, int size);
    PageResponse<AuditLogDTO> getByEntityTypeAndId(String entityType, Long entityId, int page, int size);
    PageResponse<AuditLogDTO> getByUser(String email, int page, int size);
}
