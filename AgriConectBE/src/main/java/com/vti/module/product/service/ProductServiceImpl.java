package com.vti.module.product.service;

import com.vti.common.PageResponse;
import com.vti.exception.AppException;
import com.vti.exception.ErrorCode;
import com.vti.module.account.entity.Account;
import com.vti.module.product.dto.ProductCreateRequest;
import com.vti.module.product.dto.ProductDTO;
import com.vti.module.product.dto.ProductUpdateRequest;
import com.vti.module.product.entity.Category;
import com.vti.module.product.entity.Product;
import com.vti.module.product.repository.CategoryRepository;
import com.vti.module.product.repository.ProductRepository;
import com.vti.module.account.repository.AccountRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

@Service
@RequiredArgsConstructor
public class ProductServiceImpl implements ProductService {

    private final ProductRepository productRepository;
    private final CategoryRepository categoryRepository;
    private final AccountRepository accountRepository;

    @Override
    @Transactional
    public ProductDTO createProduct(ProductCreateRequest request, Long sellerId) {
        Account seller = accountRepository.findById(sellerId)
                .orElseThrow(() -> new AppException(ErrorCode.ACCOUNT_NOT_FOUND));

        Category category = null;
        if (request.getCategoryId() != null) {
            category = categoryRepository.findById(request.getCategoryId())
                    .orElseThrow(() -> new AppException(ErrorCode.CATEGORY_NOT_FOUND));
        }

        Product product = new Product();
        product.setName(request.getName());
        product.setNameEn(request.getNameEn());
        product.setDescription(request.getDescription());
        product.setPrice(request.getPrice());
        product.setUnit(request.getUnit());
        product.setMinOrderKg(request.getMinOrderKg());
        product.setLocation(request.getLocation());
        product.setHarvestDate(request.getHarvestDate());
        product.setCategory(category);
        product.setSeller(seller);
        product.setStatus(com.vti.common.enums.ProductStatus.PENDING_APPROVAL);

        return mapToDTO(productRepository.save(product));
    }

    @Override
    @Transactional
    public ProductDTO approveProduct(Long id) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.PRODUCT_NOT_FOUND));
        product.setStatus(com.vti.common.enums.ProductStatus.AVAILABLE);
        return mapToDTO(productRepository.save(product));
    }

    @Override
    @Transactional
    public ProductDTO rejectProduct(Long id) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.PRODUCT_NOT_FOUND));
        product.setStatus(com.vti.common.enums.ProductStatus.REJECTED);
        return mapToDTO(productRepository.save(product));
    }

    @Override
    @Transactional(readOnly = true)
    public ProductDTO getProductById(Long id) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.PRODUCT_NOT_FOUND));
        return mapToDTO(product);
    }

    @Override
    @Transactional(readOnly = true)
    public PageResponse<ProductDTO> searchProducts(String keyword, Long categoryId, com.vti.common.enums.ProductStatus status, Long sellerId, Pageable pageable) {
        Page<Product> page = productRepository.searchProducts(keyword, categoryId, null, null, null, status, sellerId, pageable);
        return PageResponse.of(page.map(this::mapToDTO));
    }

    @Override
    @Transactional
    public ProductDTO updateProduct(Long id, ProductUpdateRequest request, Long currentUserId) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.PRODUCT_NOT_FOUND));

        if (product.getSeller() == null || !product.getSeller().getId().equals(currentUserId)) {
            throw new AppException(ErrorCode.AUTH_UNAUTHORIZED);
        }

        if (request.getCategoryId() != null) {
            Category category = categoryRepository.findById(request.getCategoryId())
                    .orElseThrow(() -> new AppException(ErrorCode.CATEGORY_NOT_FOUND));
            product.setCategory(category);
        }

        if (request.getName() != null) product.setName(request.getName());
        if (request.getNameEn() != null) product.setNameEn(request.getNameEn());
        if (request.getDescription() != null) product.setDescription(request.getDescription());
        if (request.getPrice() != null) product.setPrice(request.getPrice());
        if (request.getUnit() != null) product.setUnit(request.getUnit());
        if (request.getMinOrderKg() != null) product.setMinOrderKg(request.getMinOrderKg());
        if (request.getLocation() != null) product.setLocation(request.getLocation());
        if (request.getHarvestDate() != null) product.setHarvestDate(request.getHarvestDate());
        if (request.getStatus() != null) product.setStatus(request.getStatus());

        return mapToDTO(productRepository.save(product));
    }

    @Override
    @Transactional
    public void deleteProduct(Long id, Long currentUserId) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.PRODUCT_NOT_FOUND));
                
        if (product.getSeller() == null || !product.getSeller().getId().equals(currentUserId)) {
            throw new AppException(ErrorCode.AUTH_UNAUTHORIZED);
        }
        
        productRepository.delete(product);
    }

    @Override
    public String uploadProductImage(Long productId, MultipartFile file, boolean isPrimary) {
        return "https://storage.example.com/" + file.getOriginalFilename();
    }

    private ProductDTO mapToDTO(Product product) {
        if (product == null) return null;
        
        ProductDTO dto = new ProductDTO();
        dto.setId(product.getId());
        dto.setName(product.getName());
        dto.setNameEn(product.getNameEn());
        dto.setDescription(product.getDescription());
        dto.setPrice(product.getPrice());
        dto.setUnit(product.getUnit());
        dto.setMinOrderKg(product.getMinOrderKg());
        dto.setLocation(product.getLocation());
        dto.setHarvestDate(product.getHarvestDate());
        dto.setStatus(product.getStatus());
        dto.setRating(product.getRating());
        dto.setReviewsCount(product.getReviewsCount());
        
        if (product.getCategory() != null) {
            dto.setCategoryId(product.getCategory().getId());
            dto.setCategoryName(product.getCategory().getName());
        }
        
        if (product.getSeller() != null) {
            dto.setSellerId(product.getSeller().getId());
            dto.setSellerName(product.getSeller().getFullName());
        }
        
        dto.setCreatedAt(product.getCreatedAt());
        dto.setUpdatedAt(product.getUpdatedAt());
        
        return dto;
    }
}
