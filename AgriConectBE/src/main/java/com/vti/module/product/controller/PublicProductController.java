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
        return ApiResponse.success(productService.searchProducts(keyword, categoryId, com.vti.common.enums.ProductStatus.AVAILABLE, null, pageable));
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

    // TẠM THỜI: Seed danh mục
    @PostMapping("/seed-categories")
    public ApiResponse<String> seedCategories() {
        String[][] cats = {
            {"Trái cây ăn quả", "Fruits", "Các loại trái cây tươi"},
            {"Cây công nghiệp", "Industrial Crops", "Cà phê, tiêu, điều..."},
            {"Lúa gạo & Lương thực", "Rice & Grains", "Lúa gạo và các loại ngũ cốc"},
            {"Rau củ quả sạch", "Vegetables", "Rau củ hữu cơ, an toàn"}
        };
        for (String[] cat : cats) {
            try {
                com.vti.module.product.dto.CategoryCreateRequest req = new com.vti.module.product.dto.CategoryCreateRequest();
                req.setName(cat[0]);
                req.setNameEn(cat[1]);
                req.setDescription(cat[2]);
                categoryService.createCategory(req);
            } catch(Exception e) {}
        }
        return ApiResponse.success("Seed done");
    }
}
