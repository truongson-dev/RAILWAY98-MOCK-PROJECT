package com.vti.module.product.service;

import com.vti.module.product.dto.CategoryCreateRequest;
import com.vti.module.product.dto.CategoryDTO;

import java.util.List;

public interface CategoryService {
    // Lấy toàn bộ danh sách danh mục
    List<CategoryDTO> getAllCategories();
    
    // Tạo mới danh mục
    CategoryDTO createCategory(CategoryCreateRequest request);
    
    // Cập nhật danh mục
    CategoryDTO updateCategory(Long id, CategoryCreateRequest request);
    
    // Xóa danh mục
    void deleteCategory(Long id);
}
