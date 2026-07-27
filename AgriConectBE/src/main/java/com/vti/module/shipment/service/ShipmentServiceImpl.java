package com.vti.module.shipment.service;

import com.vti.common.PageResponse;
import com.vti.common.enums.ShipmentStatus;
import com.vti.exception.AppException;
import com.vti.exception.ErrorCode;
import com.vti.module.account.entity.Account;
import com.vti.module.account.repository.AccountRepository;
import com.vti.module.shipment.dto.CreateShipmentRequest;
import com.vti.module.shipment.dto.ShipmentDTO;
import com.vti.module.shipment.dto.UpdateShipmentStatusRequest;
import com.vti.module.shipment.entity.Shipment;
import com.vti.module.shipment.repository.ShipmentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.BeanUtils;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class ShipmentServiceImpl implements ShipmentService {

    private final ShipmentRepository shipmentRepo;
    private final AccountRepository accountRepo;

    @Override
    @Transactional
    public ShipmentDTO createShipment(CreateShipmentRequest request) {
        Shipment shipment = new Shipment();
        BeanUtils.copyProperties(request, shipment);
        shipment.setTrackingCode("SHP-" + UUID.randomUUID().toString().substring(0, 8).toUpperCase());
        shipment.setStatus(ShipmentStatus.PENDING);
        
        if (request.getShipperId() != null) {
            Account shipper = accountRepo.findById(request.getShipperId())
                    .orElseThrow(() -> new AppException(ErrorCode.ACCOUNT_NOT_FOUND));
            shipment.setShipper(shipper);
        }
        
        return convertToDTO(shipmentRepo.save(shipment));
    }

    @Override
    public PageResponse<ShipmentDTO> getAllShipments(Pageable pageable) {
        Page<Shipment> page = shipmentRepo.findAll(pageable);
        return PageResponse.of(page.map(this::convertToDTO));
    }

    @Override
    public PageResponse<ShipmentDTO> getShipmentsByStatus(ShipmentStatus status, Pageable pageable) {
        Page<Shipment> page = shipmentRepo.findByStatus(status, pageable);
        return PageResponse.of(page.map(this::convertToDTO));
    }

    @Override
    public PageResponse<ShipmentDTO> getShipmentsByShipper(Long shipperId, Pageable pageable) {
        Page<Shipment> page = shipmentRepo.findByShipperId(shipperId, pageable);
        return PageResponse.of(page.map(this::convertToDTO));
    }

    @Override
    public ShipmentDTO getShipmentById(Long id) {
        return convertToDTO(shipmentRepo.findById(id).orElseThrow(() -> new AppException(ErrorCode.SHIPMENT_NOT_FOUND)));
    }

    @Override
    public ShipmentDTO getShipmentByOrderId(Long orderId) {
        return convertToDTO(shipmentRepo.findByOrderId(orderId).orElseThrow(() -> new AppException(ErrorCode.SHIPMENT_NOT_FOUND)));
    }

    @Override
    @Transactional
    public ShipmentDTO updateShipmentStatus(Long id, UpdateShipmentStatusRequest request) {
        Shipment shipment = shipmentRepo.findById(id).orElseThrow(() -> new AppException(ErrorCode.SHIPMENT_NOT_FOUND));
        shipment.setStatus(request.getStatus());
        if (request.getNotes() != null) {
            shipment.setNotes(request.getNotes());
        }
        if (request.getStatus() == ShipmentStatus.DELIVERED) {
            // Không setActualDelivery vì Shipment không có trường này, 
            // có thể coi updatedAt là tgian giao hàng.
        }
        return convertToDTO(shipmentRepo.save(shipment));
    }

    @Override
    @Transactional
    public ShipmentDTO assignShipper(Long id, Long shipperId) {
        Shipment shipment = shipmentRepo.findById(id).orElseThrow(() -> new AppException(ErrorCode.SHIPMENT_NOT_FOUND));
        Account shipper = accountRepo.findById(shipperId).orElseThrow(() -> new AppException(ErrorCode.ACCOUNT_NOT_FOUND));
        shipment.setShipper(shipper);
        return convertToDTO(shipmentRepo.save(shipment));
    }

    private ShipmentDTO convertToDTO(Shipment entity) {
        ShipmentDTO dto = new ShipmentDTO();
        BeanUtils.copyProperties(entity, dto);
        if (entity.getShipper() != null) {
            dto.setShipperId(entity.getShipper().getId());
        }
        return dto;
    }
}
