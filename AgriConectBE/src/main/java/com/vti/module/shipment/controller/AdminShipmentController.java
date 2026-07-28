package com.vti.module.shipment.controller;

import com.vti.common.ApiResponse;
import com.vti.common.PageResponse;
import com.vti.common.enums.ShipmentStatus;
import com.vti.module.shipment.dto.CreateShipmentRequest;
import com.vti.module.shipment.dto.ShipmentDTO;
import com.vti.module.shipment.dto.UpdateShipmentStatusRequest;
import com.vti.module.shipment.service.ShipmentService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin/shipments")
@RequiredArgsConstructor
@PreAuthorize("hasRole('ADMIN')")
public class AdminShipmentController {

    private final ShipmentService shipmentService;

    @PostMapping
    public ApiResponse<ShipmentDTO> createShipment(@RequestBody CreateShipmentRequest request) {
        return ApiResponse.success(shipmentService.createShipment(request));
    }

    @GetMapping
    public ApiResponse<PageResponse<ShipmentDTO>> getAllShipments(
            @RequestParam(required = false) ShipmentStatus status,
            Pageable pageable) {
        if (status != null) {
            return ApiResponse.success(shipmentService.getShipmentsByStatus(status, pageable));
        }
        return ApiResponse.success(shipmentService.getAllShipments(pageable));
    }

    @GetMapping("/{id}")
    public ApiResponse<ShipmentDTO> getShipmentById(@PathVariable Long id) {
        return ApiResponse.success(shipmentService.getShipmentById(id));
    }

    @GetMapping("/order/{orderId}")
    public ApiResponse<ShipmentDTO> getShipmentByOrderId(@PathVariable Long orderId) {
        return ApiResponse.success(shipmentService.getShipmentByOrderId(orderId));
    }

    @PutMapping("/{id}/status")
    public ApiResponse<ShipmentDTO> updateShipmentStatus(
            @PathVariable Long id,
            @RequestBody UpdateShipmentStatusRequest request) {
        return ApiResponse.success(shipmentService.updateShipmentStatus(id, request));
    }

    @PutMapping("/{id}/assign")
    public ApiResponse<ShipmentDTO> assignShipper(
            @PathVariable Long id,
            @RequestParam Long shipperId) {
        return ApiResponse.success(shipmentService.assignShipper(id, shipperId));
    }
}
