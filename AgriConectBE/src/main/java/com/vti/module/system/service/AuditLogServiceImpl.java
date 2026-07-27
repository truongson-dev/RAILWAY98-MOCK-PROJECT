package com.vti.module.system.service;

import com.vti.common.PageResponse;
import com.vti.module.system.dto.AuditLogDTO;
import com.vti.module.system.entity.AuditLog;
import com.vti.module.system.repository.AuditLogRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

/**
 * Implement nghiệp vụ Audit Log
 */
@Service
@RequiredArgsConstructor
public class AuditLogServiceImpl implements AuditLogService {

    private final AuditLogRepository auditLogRepository;

    @Override
    public PageResponse<AuditLogDTO> getAll(int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<AuditLog> auditLogs = auditLogRepository.findAllByOrderByCreatedAtDesc(pageable);
        return PageResponse.of(auditLogs.map(this::mapToDTO));
    }

    @Override
    public PageResponse<AuditLogDTO> getByEntityTypeAndId(String entityType, Long entityId, int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<AuditLog> auditLogs = auditLogRepository.findByEntityTypeAndEntityId(entityType, entityId, pageable);
        return PageResponse.of(auditLogs.map(this::mapToDTO));
    }

    @Override
    public PageResponse<AuditLogDTO> getByUser(String email, int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<AuditLog> auditLogs = auditLogRepository.findByPerformedByEmail(email, pageable);
        return PageResponse.of(auditLogs.map(this::mapToDTO));
    }

    private AuditLogDTO mapToDTO(AuditLog log) {
        AuditLogDTO dto = new AuditLogDTO();
        dto.setId(log.getId());
        dto.setAction(log.getAction());
        dto.setEntityType(log.getEntityType());
        dto.setEntityId(log.getEntityId());
        dto.setPerformedByEmail(log.getPerformedByEmail());
        dto.setIpAddress(log.getIpAddress());
        dto.setCreatedAt(log.getCreatedAt());
        return dto;
    }
}
