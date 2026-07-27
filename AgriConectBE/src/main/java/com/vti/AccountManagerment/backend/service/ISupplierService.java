package com.vti.AccountManagement.backend.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.vti.AccountManagement.entity.Supplier;

public interface ISupplierService {

	Page<Supplier> getAllSupplier(Pageable pageable, String search);

}
