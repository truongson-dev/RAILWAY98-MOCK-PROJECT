package com.vti.module.shipment.service;

import com.vti.common.PageResponse;
import com.vti.common.enums.ShipmentStatus;
import com.vti.module.shipment.dto.CreateShipmentRequest;
import com.vti.module.shipment.dto.ShipmentDTO;
import com.vti.module.shipment.dto.UpdateShipmentStatusRequest;
import org.springframework.data.domain.Pageable;

public interface ShipmentService {
    ShipmentDTO createShipment(CreateShipmentRequest request);
    PageResponse<ShipmentDTO> getAllShipments(Pageable pageable);
    PageResponse<ShipmentDTO> getShipmentsByStatus(ShipmentStatus status, Pageable pageable);
    PageResponse<ShipmentDTO> getShipmentsByShipper(Long shipperId, Pageable pageable);
    ShipmentDTO getShipmentById(Long id);
    ShipmentDTO getShipmentByOrderId(Long orderId);
    ShipmentDTO updateShipmentStatus(Long id, UpdateShipmentStatusRequest request);
    ShipmentDTO assignShipper(Long id, Long shipperId);
}
