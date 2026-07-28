package com.vti.module.system.repository;

import com.vti.module.system.entity.AuditLog;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * Repository cho AuditLog
 */
@Repository
public interface AuditLogRepository extends JpaRepository<AuditLog, Long> {
    Page<AuditLog> findAllByOrderByCreatedAtDesc(Pageable p);
    Page<AuditLog> findByEntityTypeAndEntityId(String entityType, Long entityId, Pageable p);
    Page<AuditLog> findByPerformedByEmail(String email, Pageable p);
}
