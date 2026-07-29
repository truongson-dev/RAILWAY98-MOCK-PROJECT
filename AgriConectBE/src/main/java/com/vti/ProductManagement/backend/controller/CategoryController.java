package com.vti.ProductManagement.backend.controller;

import java.util.function.Function;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.vti.ProductManagement.backend.service.ICategoryService;
import com.vti.ProductManagement.dto.CategoryDTO;
import com.vti.ProductManagement.entity.Category;

@RestController
@RequestMapping("/api/v1/categories")
@CrossOrigin(origins = "*")
public class CategoryController {

	@Autowired
	private ICategoryService categoryService;

	@GetMapping
	public ResponseEntity<?> getAllCategory(Pageable pageable, @RequestParam(required = false) String search) {
		Page<Category> pageCategories = categoryService.getAllCategory(pageable, search);

		Page<CategoryDTO> pageCategoryDtos = pageCategories.map(new Function<Category, CategoryDTO>() {
			@Override
			public CategoryDTO apply(Category category) {
				CategoryDTO categoryDto = new CategoryDTO();
				categoryDto.setId(category.getId());
				categoryDto.setName(category.getName());

				if (category.getParentId() != null) {
					categoryDto.setParentName(category.getParentId().getName());
				}

				return categoryDto;
			}
		});

		return new ResponseEntity<>(pageCategoryDtos, HttpStatus.OK);
	}

}
