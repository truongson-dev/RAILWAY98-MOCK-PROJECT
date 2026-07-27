package com.vti.AccountManagerment.backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import com.vti.AccountManagerment.backend.repository.ISupplierRepository;
import com.vti.AccountManagerment.entity.Supplier;

@Service
public class SupplierService implements ISupplierService {

	@Autowired
	private ISupplierRepository supplierRepository;

	@Override
	public Page<Supplier> getAllSupplier(Pageable pageable, String search) {
		Specification<Supplier> where = null;

		if (!StringUtils.isEmpty(search)) {

		}
		return supplierRepository.findAll(where, pageable);
	}

}
