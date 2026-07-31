package com.vti.ProductManagement.backend.controller;

import java.io.ByteArrayInputStream;
import java.util.List;
import java.util.function.Function;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.InputStreamResource;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.vti.OpenAI.service.openAIService;
import com.vti.ProductManagement.backend.service.IProductService;
import com.vti.ProductManagement.dto.InventoryDTO;
import com.vti.ProductManagement.dto.ProductDTO;
import com.vti.ProductManagement.entity.Inventory;
import com.vti.ProductManagement.entity.Product;
import com.vti.ProductManagement.entity.ProductImage;
import com.vti.ProductManagement.form.ProductFormForCreating;

import tools.jackson.databind.ObjectMapper;

@RestController
@RequestMapping("/api/v1/products")
@CrossOrigin(origins = "*")
public class ProductController {

	@Autowired
	private IProductService productService;

	@Autowired
	private ModelMapper modelMapper;

	@Autowired
	private openAIService openAIService;

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
					productDto.setCategoryId(product.getCategoryId().getId());
				}
				if (product.getSellerId() != null) {
					productDto.setSellerId(product.getSellerId().getId());
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

	@PostMapping
	public ResponseEntity<?> createProduct(@RequestBody ProductFormForCreating form) {
		try {
			Product product = productService.createProduct(form);
			return ResponseEntity.status(HttpStatus.CREATED).body(product);
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Lỗi thêm sản phẩm: " + e.getMessage());
		}
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<?> deleteProduct(@PathVariable Long id) {
		try {
			productService.deleteProduct(id);
			return ResponseEntity.ok("Xóa sản phẩm thành công!");
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Lỗi xóa sản phẩm: " + e.getMessage());
		}
	}

	@GetMapping("/inventory/{id}")
	public ResponseEntity<?> getProductInventory(@PathVariable("id") Long productId) {
		Inventory inventory = productService.findInventoryByProductId(productId);

		if (inventory == null) {
			return ResponseEntity.status(404).body("Không tìm thấy thông tin kho cho sản phẩm có ID: " + productId);
		}

		InventoryDTO dto = modelMapper.map(inventory, InventoryDTO.class);

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
		InventoryDTO dto = modelMapper.map(updatedInventory, InventoryDTO.class);

		return ResponseEntity.ok(dto);
	}

	@GetMapping("/inventory/low-stock")
	public ResponseEntity<?> checkLowStock() {
		List<Inventory> lowStockItems = productService.getLowStockInventories();

		if (lowStockItems.isEmpty()) {
			return ResponseEntity.ok("Tất cả sản phẩm trong kho đều ở mức an toàn.");
		}

		InventoryDTO dto = modelMapper.map(lowStockItems, InventoryDTO.class);

		return ResponseEntity.ok(dto);
	}

	@GetMapping("/inventory/ai-forecast")
	public ResponseEntity<String> getAIPrediction() {
		// 1. Lấy danh sách hàng tồn kho thấp từ database
		List<Inventory> lowStockItems = productService.getLowStockInventories();

		// Chuyển danh sách thành chuỗi JSON (có thể dùng ObjectMapper của Jackson)
		ObjectMapper objectMapper = new ObjectMapper();
		try {
			String jsonInventory = objectMapper.writeValueAsString(lowStockItems);

			// 2. Gửi sang ChatGPT phân tích
			String aiAdvice = openAIService.getInventoryPrediction(jsonInventory);

			return ResponseEntity.ok(aiAdvice);
		} catch (Exception e) {
			return ResponseEntity.status(500).body("Lỗi xử lý dữ liệu: " + e.getMessage());
		}
	}

	@GetMapping("/export/excel")
	public ResponseEntity<InputStreamResource> exportToExcel() {
		ByteArrayInputStream in = productService.exportProductsToExcel();

		HttpHeaders headers = new HttpHeaders();
		headers.add("Content-Disposition", "attachment; filename=products.xlsx");

		return ResponseEntity.ok().headers(headers)
				.contentType(
						MediaType.parseMediaType("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"))
				.body(new InputStreamResource(in));
	}
}
