package com.vti.ProductManagement.backend.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import com.vti.ProductManagement.backend.repository.IInventoryRepository;
import com.vti.ProductManagement.backend.repository.IProductRepository;
import com.vti.ProductManagement.entity.Inventory;
import com.vti.ProductManagement.entity.Product;

@Service
public class ProductService implements IProductService {

	@Autowired
	private IProductRepository productRepository;

	@Autowired
	private IInventoryRepository inventoryRepository;

	@Override
	public Page<Product> getAllProduct(Pageable pageable, String search) {
		Specification<Product> where = null;

		if (!StringUtils.isEmpty(search)) {

		}

		return productRepository.findAll(where, pageable);
	}

	@Override
	public Inventory findInventoryByProductId(Long productId) {
		return inventoryRepository.findByProductId(productId);
	}

	@Override
	public Inventory updateInventory(Long productId, Double quantity, Double minStockLevel) {
		Inventory inventory = inventoryRepository.findByProductId(productId);

		if (inventory == null) {
			return null;
		}

		if (quantity != null) {
			inventory.setQuantity(quantity);
		}
		if (minStockLevel != null) {
			inventory.setMinStockLevel(minStockLevel);
		}

		return inventoryRepository.save(inventory);
	}

	@Override
	public List<Inventory> getLowStockInventories() {
		return inventoryRepository.findLowStockInventories();
	}

}
