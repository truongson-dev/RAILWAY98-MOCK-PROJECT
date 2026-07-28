package com.vti.module.system.service;

import com.vti.common.PageResponse;
import com.vti.module.system.dto.CreateSystemAlertRequest;
import com.vti.module.system.dto.SystemAlertDTO;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface SystemAlertService {
    PageResponse<SystemAlertDTO> getAlerts(Boolean isRead, Pageable pageable);
    List<SystemAlertDTO> getUnreadAlerts();
    SystemAlertDTO createAlert(CreateSystemAlertRequest request);
    void markAsRead(Long id);
    void markAllAsRead();
}
