package com.vti.ProductManagement.backend.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.vti.ProductManagement.entity.Product;

public interface IProductService {

	Page<Product> getAllProduct(Pageable pageable, String search);

}
