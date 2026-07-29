package com.vti.module.shipment.controller;

import com.vti.common.ApiResponse;
import com.vti.common.PageResponse;
import com.vti.common.enums.ShipmentStatus;
import com.vti.module.shipment.dto.ShipmentDTO;
import com.vti.module.shipment.service.ShipmentService;
import com.vti.security.UserPrincipal;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/shipper/shipments")
@RequiredArgsConstructor
public class ShipperShipmentController {

    private final ShipmentService shipmentService;

    // Lấy danh sách chuyến hàng của Shipper hiện tại
    @GetMapping
    @PreAuthorize("hasAnyRole('SHIPPER')")
    public ApiResponse<PageResponse<ShipmentDTO>> getMyShipments(
            @RequestParam(required = false) ShipmentStatus status,
            Pageable pageable,
            @AuthenticationPrincipal UserPrincipal currentUser) {
        // Return shipments for the current shipper
        return ApiResponse.success(shipmentService.getShipmentsByShipper(currentUser.getId(), pageable)); 
    }

    // Lấy chi tiết chuyến hàng
    @GetMapping("/{id}")
    @PreAuthorize("hasAnyRole('SHIPPER')")
    public ApiResponse<ShipmentDTO> getShipmentById(@PathVariable Long id) {
        return ApiResponse.success(shipmentService.getShipmentById(id));
    }
}
