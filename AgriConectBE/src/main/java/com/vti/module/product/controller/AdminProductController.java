package com.vti.module.product.controller;

import com.vti.common.ApiResponse;
import com.vti.module.product.dto.CategoryCreateRequest;
import com.vti.module.product.dto.CategoryDTO;
import com.vti.module.product.dto.ProductCreateRequest;
import com.vti.module.product.dto.ProductDTO;
import com.vti.module.product.dto.ProductUpdateRequest;
import com.vti.module.product.service.CategoryService;
import com.vti.module.product.service.ProductService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import com.vti.security.UserPrincipal;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
@PreAuthorize("hasRole('ADMIN')")
public class AdminProductController {

    private final ProductService productService;
    private final CategoryService categoryService;

    // ----- QUẢN LÝ SẢN PHẨM -----

    // Thêm mới sản phẩm
    @PostMapping
    @PreAuthorize("hasRole('ADMIN') or hasRole('SUPPLIER')")
    public ApiResponse<ProductDTO> createProduct(@Valid @RequestBody ProductCreateRequest request, @AuthenticationPrincipal UserPrincipal currentUser) {
        ProductDTO response = productService.createProduct(request, currentUser.getId());
        return ApiResponse.success(response);
    }

    // Xóa sản phẩm
    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN') or hasRole('SUPPLIER')")
    public ApiResponse<Void> deleteProduct(@PathVariable Long id, @AuthenticationPrincipal UserPrincipal currentUser) {
        productService.deleteProduct(id, currentUser.getId());
        return ApiResponse.success(null);
    }

    // Cập nhật sản phẩm
    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN') or hasRole('SUPPLIER')")
    public ApiResponse<ProductDTO> updateProduct(@PathVariable Long id, @Valid @RequestBody ProductUpdateRequest request, @AuthenticationPrincipal UserPrincipal currentUser) {
        ProductDTO response = productService.updateProduct(id, request, currentUser.getId());
        return ApiResponse.success(response);
    }

    // Upload ảnh sản phẩm
    @PostMapping("/products/{id}/images")
    public ApiResponse<String> uploadProductImage(
            @PathVariable Long id,
            @RequestParam("file") MultipartFile file,
            @RequestParam(defaultValue = "false") boolean isPrimary) {
        String url = productService.uploadProductImage(id, file, isPrimary);
        return ApiResponse.success("Upload ảnh thành công", url);
    }

    // ----- DUYỆT SẢN PHẨM -----
    @GetMapping("/products/pending")
    public ApiResponse<com.vti.common.PageResponse<ProductDTO>> getPendingProducts(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size) {
        org.springframework.data.domain.Pageable pageable = org.springframework.data.domain.PageRequest.of(page, size);
        return ApiResponse.success(productService.searchProducts(null, null, com.vti.common.enums.ProductStatus.PENDING_APPROVAL, null, pageable));
    }

    @PatchMapping("/products/{id}/approve")
    public ApiResponse<ProductDTO> approveProduct(@PathVariable Long id) {
        return ApiResponse.success(productService.approveProduct(id));
    }

    @PatchMapping("/products/{id}/reject")
    public ApiResponse<ProductDTO> rejectProduct(@PathVariable Long id) {
        return ApiResponse.success(productService.rejectProduct(id));
    }

    // ----- QUẢN LÝ DANH MỤC -----

    // Tạo mới danh mục
    @PostMapping("/categories")
    public ApiResponse<CategoryDTO> createCategory(@RequestBody @Valid CategoryCreateRequest request) {
        return ApiResponse.success(categoryService.createCategory(request));
    }

    // Cập nhật danh mục
    @PutMapping("/categories/{id}")
    public ApiResponse<CategoryDTO> updateCategory(@PathVariable Long id, @RequestBody @Valid CategoryCreateRequest request) {
        return ApiResponse.success(categoryService.updateCategory(id, request));
    }

    // Xóa danh mục
    @DeleteMapping("/categories/{id}")
    public ApiResponse<Void> deleteCategory(@PathVariable Long id) {
        categoryService.deleteCategory(id);
        return ApiResponse.success("Xóa danh mục thành công");
    }
}
