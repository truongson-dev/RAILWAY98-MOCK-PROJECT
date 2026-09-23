package com.vti.module.inventory.controller;

import com.vti.common.ApiResponse;
import com.vti.common.PageResponse;
import com.vti.module.inventory.dto.CreateBatchRequest;
import com.vti.module.inventory.dto.InventoryBatchDTO;
import com.vti.module.inventory.dto.WarehouseDTO;
import com.vti.module.inventory.entity.BatchStatus;
import com.vti.module.inventory.service.InventoryService;
import com.vti.security.UserPrincipal;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/supplier/inventory")
@RequiredArgsConstructor
@PreAuthorize("hasRole('SUPPLIER')")
public class SupplierInventoryController {

    private final InventoryService inventoryService;

    @GetMapping("/warehouses")
    public ApiResponse<List<WarehouseDTO>> getWarehouses() {
        return ApiResponse.success(inventoryService.getAllWarehouses());
    }

    @GetMapping("/batches")
    public ApiResponse<PageResponse<InventoryBatchDTO>> getBatches(
            @RequestParam(required = false) Long productId,
            @RequestParam(required = false) Long warehouseId,
            @RequestParam(required = false) BatchStatus status,
            Pageable pageable) {
        return ApiResponse.success(inventoryService.getBatches(productId, warehouseId, status, pageable));
    }

    @PostMapping("/batches")
    public ApiResponse<InventoryBatchDTO> createBatch(
            @RequestBody CreateBatchRequest request) {
        return ApiResponse.success(inventoryService.createBatch(request));
    }
}
