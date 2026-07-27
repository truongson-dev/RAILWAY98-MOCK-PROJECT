package com.vti.AccountManagerment.backend.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.vti.AccountManagerment.entity.Supplier;

public interface ISupplierService {

	Page<Supplier> getAllSupplier(Pageable pageable, String search);

}
