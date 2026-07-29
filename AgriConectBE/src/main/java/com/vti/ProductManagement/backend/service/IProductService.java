package com.vti.ProductManagement.backend.service;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.vti.ProductManagement.entity.Inventory;
import com.vti.ProductManagement.entity.Product;

public interface IProductService {

	Page<Product> getAllProduct(Pageable pageable, String search);

	Inventory findInventoryByProductId(Long productId);

	List<Inventory> getLowStockInventories();

	Inventory updateInventory(Long productId, Double quantity, Double minStockLevel);

}
