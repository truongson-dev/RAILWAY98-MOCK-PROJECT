package com.vti.ProductManagement.backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import com.vti.ProductManagement.backend.repository.IProductRepository;
import com.vti.ProductManagement.entity.Product;

@Service
public class ProductService implements IProductService {

	@Autowired
	private IProductRepository productRepository;

	@Override
	public Page<Product> getAllProduct(Pageable pageable, String search) {
		Specification<Product> where = null;

		if (!StringUtils.isEmpty(search)) {

		}

		return productRepository.findAll(where, pageable);
	}

}
