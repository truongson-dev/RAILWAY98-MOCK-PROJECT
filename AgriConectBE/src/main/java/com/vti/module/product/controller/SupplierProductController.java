package com.vti.module.product.controller;

import com.vti.common.ApiResponse;
import com.vti.common.PageResponse;
import com.vti.module.product.dto.ProductDTO;
import com.vti.module.product.service.ProductService;
import com.vti.security.UserPrincipal;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/supplier")
@RequiredArgsConstructor
@PreAuthorize("hasRole('SUPPLIER')")
public class SupplierProductController {

    private final ProductService productService;

    @GetMapping("/products")
    public ApiResponse<PageResponse<ProductDTO>> getMyProducts(
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) Long categoryId,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size,
            @AuthenticationPrincipal UserPrincipal currentUser) {
        
        Pageable pageable = PageRequest.of(page, size);
        return ApiResponse.success(productService.searchProducts(keyword, categoryId, null, currentUser.getId(), pageable));
    }
}
