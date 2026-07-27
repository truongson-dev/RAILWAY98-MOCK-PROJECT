package com.vti.module.shipment.repository;

import com.vti.common.enums.ShipmentStatus;
import com.vti.module.shipment.entity.Shipment;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface ShipmentRepository extends JpaRepository<Shipment, Long> {
    Optional<Shipment> findByOrderId(Long orderId);
    Page<Shipment> findByShipperId(Long shipperId, Pageable pageable);
    Page<Shipment> findByStatus(ShipmentStatus status, Pageable pageable);
}
