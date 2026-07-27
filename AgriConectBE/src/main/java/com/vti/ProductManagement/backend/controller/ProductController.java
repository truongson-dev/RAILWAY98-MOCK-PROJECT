package com.vti.ProductManagement.backend.controller;

import java.util.function.Function;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.vti.ProductManagement.backend.service.IProductService;
import com.vti.ProductManagement.dto.ProductDTO;
import com.vti.ProductManagement.entity.Product;

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
				if (product.getCategory() != null) {
					productDto.setCategoryName(product.getCategory().getName());
				}
				if (product.getSeller() != null) {
					productDto.setSellerUsername(product.getSeller().getUsername());
				}

				return productDto;
			}
		});

		return new ResponseEntity<>(pageProductDtos, HttpStatus.OK);
	}
}
