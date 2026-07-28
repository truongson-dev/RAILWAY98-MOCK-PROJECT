package com.vti.module.product.service;

import com.vti.exception.AppException;
import com.vti.exception.ErrorCode;
import com.vti.module.product.dto.CategoryCreateRequest;
import com.vti.module.product.dto.CategoryDTO;
import com.vti.module.product.entity.Category;
import com.vti.module.product.repository.CategoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CategoryServiceImpl implements CategoryService {

    private final CategoryRepository categoryRepository;

    @Override
    public List<CategoryDTO> getAllCategories() {
        return categoryRepository.findAll().stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional
    public CategoryDTO createCategory(CategoryCreateRequest request) {
        Category category = new Category();
        category.setName(request.getName());
        category.setNameEn(request.getNameEn());
        category.setDescription(request.getDescription());
        category.setImageUrl(request.getImageUrl());
        return mapToDTO(categoryRepository.save(category));
    }

    @Override
    @Transactional
    public CategoryDTO updateCategory(Long id, CategoryCreateRequest request) {
        Category category = categoryRepository.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.CATEGORY_NOT_FOUND));
                
        category.setName(request.getName());
        category.setNameEn(request.getNameEn());
        category.setDescription(request.getDescription());
        category.setImageUrl(request.getImageUrl());
        
        return mapToDTO(categoryRepository.save(category));
    }

    @Override
    @Transactional
    public void deleteCategory(Long id) {
        if (!categoryRepository.existsById(id)) {
            throw new AppException(ErrorCode.CATEGORY_NOT_FOUND);
        }
        categoryRepository.deleteById(id);
    }
    
    // Mapper thủ công Category sang CategoryDTO
    private CategoryDTO mapToDTO(Category category) {
        CategoryDTO dto = new CategoryDTO();
        dto.setId(category.getId());
        dto.setName(category.getName());
        dto.setNameEn(category.getNameEn());
        dto.setDescription(category.getDescription());
        dto.setImageUrl(category.getImageUrl());
        dto.setCreatedAt(category.getCreatedAt());
        dto.setUpdatedAt(category.getUpdatedAt());
        return dto;
    }
}
