package com.vti.module.inventory.service;

import com.vti.common.PageResponse;
import com.vti.module.inventory.dto.CreateBatchRequest;
import com.vti.module.inventory.dto.CreateWarehouseRequest;
import com.vti.module.inventory.dto.InventoryBatchDTO;
import com.vti.module.inventory.dto.WarehouseDTO;
import com.vti.module.inventory.entity.BatchStatus;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface InventoryService {
    // Quản lý kho (Warehouse)
    List<WarehouseDTO> getAllWarehouses();
    WarehouseDTO createWarehouse(CreateWarehouseRequest request);
    WarehouseDTO updateWarehouse(Long id, CreateWarehouseRequest request);

    // Quản lý lô hàng (InventoryBatch)
    PageResponse<InventoryBatchDTO> getBatches(Long productId, Long warehouseId, BatchStatus status, Pageable pageable);
    InventoryBatchDTO createBatch(CreateBatchRequest request);
    InventoryBatchDTO updateBatchStatus(Long id, BatchStatus status);
}
