package com.vti.ProductManagement.backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import com.vti.ProductManagement.backend.repository.ICategoryRepository;
import com.vti.ProductManagement.entity.Category;

@Service
public class CategoryService implements ICategoryService {

	@Autowired
	private ICategoryRepository categoryRepository;

	@Override
	public Page<Category> getAllCategory(Pageable pageable, String search) {

		Specification<Category> where = null;

		if (!StringUtils.isEmpty(search)) {

		}

		return categoryRepository.findAll(where, pageable);

	}

}
