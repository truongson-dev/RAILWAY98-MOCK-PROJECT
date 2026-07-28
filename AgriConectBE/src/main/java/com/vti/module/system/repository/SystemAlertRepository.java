package com.vti.module.system.repository;

import com.vti.module.system.entity.SystemAlert;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SystemAlertRepository extends JpaRepository<SystemAlert, Long> {
    Page<SystemAlert> findByIsRead(Boolean isRead, Pageable pageable);
    List<SystemAlert> findByIsReadFalseOrderByCreatedAtDesc();
}
