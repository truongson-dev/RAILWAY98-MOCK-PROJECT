package com.vti.module.system.controller;

import com.vti.common.ApiResponse;
import com.vti.common.PageResponse;
import com.vti.module.system.dto.AuditLogDTO;
import com.vti.module.system.dto.CreateSystemAlertRequest;
import com.vti.module.system.dto.SystemAlertDTO;
import com.vti.module.system.service.AuditLogService;
import com.vti.module.system.service.SystemAlertService;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

/**
 * Controller quản lý System (Dành cho Admin)
 */
@RestController
@RequestMapping("/api/admin")
@PreAuthorize("hasRole('ADMIN')")
@RequiredArgsConstructor
@Tag(name = "Admin System")
public class AdminSystemController {

    private final AuditLogService auditLogService;
    private final SystemAlertService systemAlertService;

    // ----- AUDIT LOG ----- //

    /**
     * Lấy danh sách Audit Logs
     */
    @GetMapping("/audit-logs")
    public ResponseEntity<ApiResponse<PageResponse<AuditLogDTO>>> getAuditLogs(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(required = false) String entityType,
            @RequestParam(required = false) Long entityId,
            @RequestParam(required = false) String email) {
        
        PageResponse<AuditLogDTO> response;
        if (entityType != null && entityId != null) {
            response = auditLogService.getByEntityTypeAndId(entityType, entityId, page, size);
        } else if (email != null) {
            response = auditLogService.getByUser(email, page, size);
        } else {
            response = auditLogService.getAll(page, size);
        }
        return ResponseEntity.ok(ApiResponse.success(response));
    }

    // ----- SYSTEM ALERTS ----- //

    /**
     * Lấy danh sách cảnh báo hệ thống
     */
    @GetMapping("/system-alerts")
    public ResponseEntity<ApiResponse<PageResponse<SystemAlertDTO>>> getSystemAlerts(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "false") boolean unreadOnly) {
        if (unreadOnly) {
            org.springframework.data.domain.Page<SystemAlertDTO> mockPage = new org.springframework.data.domain.PageImpl<>(systemAlertService.getUnreadAlerts());
            return ResponseEntity.ok(ApiResponse.success(PageResponse.of(mockPage)));
        }
        org.springframework.data.domain.Pageable pageable = org.springframework.data.domain.PageRequest.of(page, size);
        return ResponseEntity.ok(ApiResponse.success(systemAlertService.getAlerts(null, pageable)));
    }

    /**
     * Tạo cảnh báo hệ thống (bằng tay, phục vụ testing hoặc quản trị viên thông báo)
     */
    @PostMapping("/system-alerts")
    public ResponseEntity<ApiResponse<SystemAlertDTO>> createSystemAlert(
            @Valid @RequestBody CreateSystemAlertRequest request) {
        return ResponseEntity.ok(ApiResponse.success(systemAlertService.createAlert(request)));
    }

    /**
     * Đánh dấu 1 cảnh báo là đã đọc
     */
    @PutMapping("/system-alerts/{id}/read")
    public ResponseEntity<ApiResponse<Void>> markAlertAsRead(@PathVariable Long id) {
        systemAlertService.markAsRead(id);
        return ResponseEntity.ok(ApiResponse.success(null));
    }

    /**
     * Đánh dấu toàn bộ cảnh báo là đã đọc
     */
    @PutMapping("/system-alerts/read-all")
    public ResponseEntity<ApiResponse<Void>> markAllAlertsAsRead() {
        systemAlertService.markAllAsRead();
        return ResponseEntity.ok(ApiResponse.success(null));
    }
}
