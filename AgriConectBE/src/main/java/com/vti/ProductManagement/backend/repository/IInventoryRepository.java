package com.vti.ProductManagement.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.vti.ProductManagement.entity.Inventory;

public interface IInventoryRepository extends JpaRepository<Inventory, Long> {

	@Query("SELECT i FROM Inventory i WHERE i.productId.id = :productId")
	Inventory findByProductId(@Param("productId") Long productId);

	@Query("SELECT i FROM Inventory i WHERE i.quantity <= i.minStockLevel")
	List<Inventory> findLowStockInventories();

}
