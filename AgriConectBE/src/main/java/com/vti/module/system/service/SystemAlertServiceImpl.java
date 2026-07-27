package com.vti.module.system.service;

import com.vti.common.PageResponse;
import com.vti.exception.AppException;
import com.vti.exception.ErrorCode;
import com.vti.module.system.dto.CreateSystemAlertRequest;
import com.vti.module.system.dto.SystemAlertDTO;
import com.vti.module.system.entity.SystemAlert;
import com.vti.module.system.repository.SystemAlertRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class SystemAlertServiceImpl implements SystemAlertService {

    private final SystemAlertRepository alertRepo;

    @Override
    public PageResponse<SystemAlertDTO> getAlerts(Boolean isRead, Pageable pageable) {
        Page<SystemAlert> page;
        if (isRead != null) {
            page = alertRepo.findByIsRead(isRead, pageable);
        } else {
            page = alertRepo.findAll(pageable);
        }
        return PageResponse.of(page.map(this::convertToDTO));
    }

    @Override
    public List<SystemAlertDTO> getUnreadAlerts() {
        return alertRepo.findByIsReadFalseOrderByCreatedAtDesc().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional
    public SystemAlertDTO createAlert(CreateSystemAlertRequest request) {
        SystemAlert alert = new SystemAlert();
        alert.setTitle(request.getTitle());
        alert.setDescription(request.getDescription());
        alert.setLevel(request.getLevel());
        alert.setCategory(request.getCategory());
        alert.setRead(false);
        alert.setCreatedAt(LocalDateTime.now());
        
        return convertToDTO(alertRepo.save(alert));
    }

    @Override
    @Transactional
    public void markAsRead(Long id) {
        SystemAlert alert = alertRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Alert not found"));
        alert.setRead(true);
        alertRepo.save(alert);
    }

    @Override
    @Transactional
    public void markAllAsRead() {
        List<SystemAlert> unreadAlerts = alertRepo.findByIsReadFalseOrderByCreatedAtDesc();
        unreadAlerts.forEach(a -> a.setRead(true));
        alertRepo.saveAll(unreadAlerts);
    }

    private SystemAlertDTO convertToDTO(SystemAlert alert) {
        SystemAlertDTO dto = new SystemAlertDTO();
        dto.setId(alert.getId());
        dto.setTitle(alert.getTitle());
        dto.setDescription(alert.getDescription());
        dto.setLevel(alert.getLevel());
        dto.setCategory(alert.getCategory());
        dto.setRead(alert.isRead());
        dto.setCreatedAt(alert.getCreatedAt());
        return dto;
    }
}
