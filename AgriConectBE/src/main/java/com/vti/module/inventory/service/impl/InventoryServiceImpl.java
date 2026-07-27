package com.vti.module.inventory.service.impl;

import com.vti.common.PageResponse;
import com.vti.exception.AppException;
import com.vti.exception.ErrorCode;
import com.vti.module.account.entity.Account;
import com.vti.module.account.repository.AccountRepository;
import com.vti.module.inventory.dto.*;
import com.vti.module.inventory.entity.BatchStatus;
import com.vti.module.inventory.entity.InventoryBatch;
import com.vti.module.inventory.entity.Warehouse;
import com.vti.module.inventory.entity.WarehouseStatus;
import com.vti.module.inventory.repository.InventoryBatchRepository;
import com.vti.module.inventory.repository.WarehouseRepository;
import com.vti.module.inventory.service.InventoryService;
import com.vti.module.product.entity.Product;
import com.vti.module.product.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Random;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class InventoryServiceImpl implements InventoryService {

    private final WarehouseRepository warehouseRepository;
    private final InventoryBatchRepository batchRepository;
    private final ProductRepository productRepository;
    private final AccountRepository accountRepository;

    @Override
    public List<WarehouseDTO> getAllWarehouses() {
        return warehouseRepository.findAll().stream()
                .map(this::mapToWarehouseDTO)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional
    public WarehouseDTO createWarehouse(CreateWarehouseRequest request) {
        Warehouse warehouse = new Warehouse();
        warehouse.setName(request.getName());
        warehouse.setLocation(request.getLocation());
        warehouse.setCapacityTons(request.getCapacityTons());
        warehouse.setCurrentStockTons(BigDecimal.ZERO);
        warehouse.setTemperatureControlled(request.isTemperatureControlled());
        warehouse.setManagerName(request.getManagerName());
        warehouse.setPhone(request.getPhone());
        warehouse.setStatus(WarehouseStatus.ACTIVE);

        warehouse = warehouseRepository.save(warehouse);
        return mapToWarehouseDTO(warehouse);
    }

    @Override
    @Transactional
    public WarehouseDTO updateWarehouse(Long id, CreateWarehouseRequest request) {
        Warehouse warehouse = warehouseRepository.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.WAREHOUSE_NOT_FOUND));

        warehouse.setName(request.getName());
        warehouse.setLocation(request.getLocation());
        warehouse.setCapacityTons(request.getCapacityTons());
        warehouse.setTemperatureControlled(request.isTemperatureControlled());
        warehouse.setManagerName(request.getManagerName());
        warehouse.setPhone(request.getPhone());

        warehouse = warehouseRepository.save(warehouse);
        return mapToWarehouseDTO(warehouse);
    }

    @Override
    public PageResponse<InventoryBatchDTO> getBatches(Long productId, Long warehouseId, BatchStatus status, Pageable pageable) {
        Page<InventoryBatch> batchPage = batchRepository.filterBatches(productId, warehouseId, status, pageable);
        Page<InventoryBatchDTO> dtoPage = batchPage.map(this::mapToBatchDTO);
        return PageResponse.of(dtoPage);
    }

    @Override
    @Transactional
    public InventoryBatchDTO createBatch(CreateBatchRequest request) {
        Product product = productRepository.findById(request.getProductId())
                .orElseThrow(() -> new AppException(ErrorCode.PRODUCT_NOT_FOUND));
        
        Warehouse warehouse = warehouseRepository.findById(request.getWarehouseId())
                .orElseThrow(() -> new AppException(ErrorCode.WAREHOUSE_NOT_FOUND)); // Kho không tìm thấy

        Account supplier = accountRepository.findById(request.getSupplierId())
                .orElseThrow(() -> new AppException(ErrorCode.ACCOUNT_NOT_FOUND));

        InventoryBatch batch = new InventoryBatch();
        batch.setBatchCode(generateBatchCode());
        batch.setProduct(product);
        batch.setWarehouse(warehouse);
        batch.setQuantityKg(request.getQuantityKg());
        batch.setUnitCost(request.getUnitCost());
        batch.setHarvestDate(request.getHarvestDate());
        batch.setExpiryDate(request.getExpiryDate());
        batch.setQualityGrade(request.getQualityGrade());
        batch.setBatchStatus(BatchStatus.AVAILABLE);
        batch.setSupplier(supplier);

        // Cập nhật khối lượng kho (ví dụ: chuyển đổi tấn - kg tuỳ theo thiết kế, ở đây giả sử quy đổi tự do hoặc chỉ lưu trữ logic)
        // logic quy đổi...

        batch = batchRepository.save(batch);
        return mapToBatchDTO(batch);
    }

    @Override
    @Transactional
    public InventoryBatchDTO updateBatchStatus(Long id, BatchStatus status) {
        InventoryBatch batch = batchRepository.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.INVENTORY_BATCH_NOT_FOUND));
        batch.setBatchStatus(status);
        batch = batchRepository.save(batch);
        return mapToBatchDTO(batch);
    }

    private String generateBatchCode() {
        String dateStr = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyyMMdd"));
        int randomNum = new Random().nextInt(9000) + 1000;
        return "B-" + dateStr + "-" + randomNum;
    }

    private WarehouseDTO mapToWarehouseDTO(Warehouse w) {
        WarehouseDTO dto = new WarehouseDTO();
        dto.setId(w.getId());
        dto.setName(w.getName());
        dto.setLocation(w.getLocation());
        dto.setCapacityTons(w.getCapacityTons());
        dto.setCurrentStockTons(w.getCurrentStockTons());
        dto.setTemperatureControlled(w.isTemperatureControlled());
        dto.setManagerName(w.getManagerName());
        dto.setPhone(w.getPhone());
        dto.setStatus(w.getStatus());
        dto.setCreatedAt(w.getCreatedAt());
        dto.setUpdatedAt(w.getUpdatedAt());
        return dto;
    }

    private InventoryBatchDTO mapToBatchDTO(InventoryBatch b) {
        InventoryBatchDTO dto = new InventoryBatchDTO();
        dto.setId(b.getId());
        dto.setBatchCode(b.getBatchCode());
        dto.setProductId(b.getProduct() != null ? b.getProduct().getId() : null);
        dto.setProductName(b.getProduct() != null ? b.getProduct().getName() : null);
        dto.setWarehouseId(b.getWarehouse() != null ? b.getWarehouse().getId() : null);
        dto.setWarehouseName(b.getWarehouse() != null ? b.getWarehouse().getName() : null);
        dto.setQuantityKg(b.getQuantityKg());
        dto.setUnitCost(b.getUnitCost());
        dto.setHarvestDate(b.getHarvestDate());
        dto.setExpiryDate(b.getExpiryDate());
        dto.setQualityGrade(b.getQualityGrade() != null ? b.getQualityGrade().name() : null);
        dto.setBatchStatus(b.getBatchStatus());
        dto.setSupplierId(b.getSupplier() != null ? b.getSupplier().getId() : null);
        dto.setSupplierName(b.getSupplier() != null ? b.getSupplier().getFullName() : null);
        dto.setCreatedAt(b.getCreatedAt());
        dto.setUpdatedAt(b.getUpdatedAt());
        return dto;
    }
}
