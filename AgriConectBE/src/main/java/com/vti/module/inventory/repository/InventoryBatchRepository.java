package com.vti.module.inventory.repository;

import com.vti.module.inventory.entity.BatchStatus;
import com.vti.module.inventory.entity.InventoryBatch;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface InventoryBatchRepository extends JpaRepository<InventoryBatch, Long> {

    @Query("SELECT b FROM InventoryBatch b WHERE " +
           "(:productId IS NULL OR b.product.id = :productId) AND " +
           "(:warehouseId IS NULL OR b.warehouse.id = :warehouseId) AND " +
           "(:status IS NULL OR b.batchStatus = :status)")
    Page<InventoryBatch> filterBatches(@Param("productId") Long productId,
                                       @Param("warehouseId") Long warehouseId,
                                       @Param("status") BatchStatus status,
                                       Pageable pageable);
}
