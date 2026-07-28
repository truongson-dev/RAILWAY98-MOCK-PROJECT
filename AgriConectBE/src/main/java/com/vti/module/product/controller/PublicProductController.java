package com.vti.module.product.controller;

import com.vti.common.ApiResponse;
import com.vti.common.PageResponse;
import com.vti.module.product.dto.CategoryDTO;
import com.vti.module.product.dto.ProductDTO;
import com.vti.module.product.service.CategoryService;
import com.vti.module.product.service.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class PublicProductController {

    private final ProductService productService;
    private final CategoryService categoryService;

    // Lấy danh sách sản phẩm (có filter, pagination)
    @GetMapping("/products")
    public ApiResponse<PageResponse<ProductDTO>> getProducts(
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) Long categoryId,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size,
            @RequestParam(defaultValue = "id,desc") String sort) {
        
        Pageable pageable = PageRequest.of(page, size);
        return ApiResponse.success(productService.searchProducts(keyword, categoryId, pageable));
    }

    // Lấy chi tiết sản phẩm
    @GetMapping("/products/{id}")
    public ApiResponse<ProductDTO> getProductById(@PathVariable Long id) {
        return ApiResponse.success(productService.getProductById(id));
    }

    // Lấy danh sách danh mục
    @GetMapping("/categories")
    public ApiResponse<List<CategoryDTO>> getAllCategories() {
        return ApiResponse.success(categoryService.getAllCategories());
    }
}
