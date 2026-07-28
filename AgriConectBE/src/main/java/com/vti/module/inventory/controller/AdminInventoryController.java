package com.vti.module.inventory.controller;

import com.vti.common.ApiResponse;
import com.vti.common.PageResponse;
import com.vti.module.inventory.dto.CreateBatchRequest;
import com.vti.module.inventory.dto.CreateWarehouseRequest;
import com.vti.module.inventory.dto.InventoryBatchDTO;
import com.vti.module.inventory.dto.WarehouseDTO;
import com.vti.module.inventory.entity.BatchStatus;
import com.vti.module.inventory.service.InventoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/inventory")
@RequiredArgsConstructor
public class AdminInventoryController {

    private final InventoryService inventoryService;

    // Lấy danh sách các kho (Warehouse)
    @GetMapping("/warehouses")
    @PreAuthorize("hasRole('ADMIN')")
    public ApiResponse<List<WarehouseDTO>> getWarehouses() {
        return ApiResponse.success(inventoryService.getAllWarehouses());
    }

    // Tạo mới kho
    @PostMapping("/warehouses")
    @PreAuthorize("hasRole('ADMIN')")
    public ApiResponse<WarehouseDTO> createWarehouse(@RequestBody CreateWarehouseRequest request) {
        return ApiResponse.success(inventoryService.createWarehouse(request));
    }

    // Cập nhật kho
    @PutMapping("/warehouses/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ApiResponse<WarehouseDTO> updateWarehouse(@PathVariable Long id, @RequestBody CreateWarehouseRequest request) {
        return ApiResponse.success(inventoryService.updateWarehouse(id, request));
    }

    // Lấy danh sách lô hàng (InventoryBatch) với bộ lọc
    @GetMapping("/inventory-batches")
    @PreAuthorize("hasRole('ADMIN')")
    public ApiResponse<PageResponse<InventoryBatchDTO>> getBatches(
            @RequestParam(required = false) Long productId,
            @RequestParam(required = false) Long warehouseId,
            @RequestParam(required = false) BatchStatus status,
            Pageable pageable) {
        return ApiResponse.success(inventoryService.getBatches(productId, warehouseId, status, pageable));
    }

    // Tạo lô hàng mới
    @PostMapping("/inventory-batches")
    @PreAuthorize("hasRole('ADMIN')")
    public ApiResponse<InventoryBatchDTO> createBatch(@RequestBody CreateBatchRequest request) {
        return ApiResponse.success(inventoryService.createBatch(request));
    }

    // Cập nhật trạng thái lô hàng
    @PutMapping("/inventory-batches/{id}/status")
    @PreAuthorize("hasRole('ADMIN')")
    public ApiResponse<InventoryBatchDTO> updateBatchStatus(
            @PathVariable Long id,
            @RequestParam BatchStatus status) {
        return ApiResponse.success(inventoryService.updateBatchStatus(id, status));
    }
}
