package com.vti.ProductManagement.backend.controller;

import java.util.List;
import java.util.function.Function;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.vti.ProductManagement.backend.service.IProductService;
import com.vti.ProductManagement.dto.InventoryDTO;
import com.vti.ProductManagement.dto.ProductDTO;
import com.vti.ProductManagement.entity.Inventory;
import com.vti.ProductManagement.entity.Product;
import com.vti.ProductManagement.entity.ProductImage;

@RestController
@RequestMapping("/api/v1/products")
@CrossOrigin(origins = "*")
public class ProductController {

	@Autowired
	private IProductService productService;

	@GetMapping
	public ResponseEntity<?> getAllProduct(Pageable pageable, @RequestParam(required = false) String search) {
		Page<Product> pageProducts = productService.getAllProduct(pageable, search);

		Page<ProductDTO> pageProductDtos = pageProducts.map(new Function<Product, ProductDTO>() {
			@Override
			public ProductDTO apply(Product product) {
				ProductDTO productDto = new ProductDTO();
				productDto.setId(product.getId());
				productDto.setName(product.getName());
				productDto.setDescription(product.getDescription());
				productDto.setPrice(product.getPrice());
				productDto.setUnit(product.getUnit());
				productDto.setStatus(product.getStatus());
				productDto.setCreatedAt(product.getCreatedAt());
				productDto.setUpdatedAt(product.getUpdatedAt());

				// Map thông tin từ các mối quan hệ (tránh NullPointerException)
				if (product.getCategoryId() != null) {
					productDto.setCategoryName(product.getCategoryId().getName());
				}
				if (product.getSellerId() != null) {
					productDto.setSellerUsername(product.getSellerId().getUsername());
				}

				if (product.getImageProducts() != null && !product.getImageProducts().isEmpty()) {
					List<String> getImageProducts = new java.util.ArrayList<>();
					for (ProductImage img : product.getImageProducts()) {
						getImageProducts.add(img.getImageUrl());
					}
					productDto.setImageProducts(getImageProducts);
				}

				return productDto;
			}
		});

		return new ResponseEntity<>(pageProductDtos, HttpStatus.OK);
	}

	@GetMapping("/inventory/{id}")
	public ResponseEntity<?> getProductInventory(@PathVariable("id") Long productId) {
		Inventory inventory = productService.findInventoryByProductId(productId);

		if (inventory == null) {
			return ResponseEntity.status(404).body("Không tìm thấy thông tin kho cho sản phẩm có ID: " + productId);
		}

		InventoryDTO dto = new InventoryDTO(inventory.getId(), inventory.getProductId().getId(),
				inventory.getQuantity(), inventory.getMinStockLevel(), inventory.getHarvestDate(),
				inventory.getExpiryDate());

		return ResponseEntity.ok(dto);
	}

	@PutMapping("/inventory/{id}")
	public ResponseEntity<?> updateProductInventory(@PathVariable("id") Long productId,
			@RequestParam(required = false) Double quantity, @RequestParam(required = false) Double minStockLevel) {

		Inventory updatedInventory = productService.updateInventory(productId, quantity, minStockLevel);

		if (updatedInventory == null) {
			return ResponseEntity.status(404).body("Không tìm thấy thông tin kho cho sản phẩm có ID: " + productId);
		}

		// Map sang DTO để trả về kết quả đẹp mắt cho client
		InventoryDTO dto = new InventoryDTO(updatedInventory.getId(), updatedInventory.getProductId().getId(),
				updatedInventory.getQuantity(), updatedInventory.getMinStockLevel(), updatedInventory.getHarvestDate(),
				updatedInventory.getExpiryDate());

		return ResponseEntity.ok(dto);
	}

	@GetMapping("/inventory/low-stock")
	public ResponseEntity<?> checkLowStock() {
		List<Inventory> lowStockItems = productService.getLowStockInventories();

		if (lowStockItems.isEmpty()) {
			return ResponseEntity.ok("Tất cả sản phẩm trong kho đều ở mức an toàn.");
		}

		List<InventoryDTO> lowStockList = lowStockItems.stream()
				.map(inventory -> new InventoryDTO(inventory.getId(), inventory.getProductId().getId(),
						inventory.getQuantity(), inventory.getMinStockLevel(), inventory.getHarvestDate(),
						inventory.getExpiryDate()))
				.collect(Collectors.toList());

		return ResponseEntity.ok(lowStockList);
	}
}
