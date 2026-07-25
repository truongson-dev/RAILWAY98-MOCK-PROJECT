package com.vti.ProductManagement.backend.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.vti.ProductManagement.entity.Category;

public interface ICategoryService {

	Page<Category> getAllCategory(Pageable pageable, String search);

}
