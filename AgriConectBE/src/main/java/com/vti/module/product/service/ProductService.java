package com.vti.module.product.service;

import com.vti.common.PageResponse;
import com.vti.module.product.dto.ProductCreateRequest;
import com.vti.module.product.dto.ProductDTO;
import com.vti.module.product.dto.ProductUpdateRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.web.multipart.MultipartFile;
import java.math.BigDecimal;

public interface ProductService {
    PageResponse<ProductDTO> searchProducts(String keyword, Long categoryId, Pageable pageable);
    
    ProductDTO getProductById(Long id);
    
    ProductDTO createProduct(ProductCreateRequest request, Long sellerId);
    
    ProductDTO updateProduct(Long id, ProductUpdateRequest request, Long currentUserId);
    
    void deleteProduct(Long id, Long currentUserId);
    
    String uploadProductImage(Long productId, MultipartFile file, boolean isPrimary);
}
