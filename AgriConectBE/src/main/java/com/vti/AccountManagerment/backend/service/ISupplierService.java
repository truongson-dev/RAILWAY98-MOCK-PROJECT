package com.vti.AccountManagerment.backend.service;

import java.util.List;

import com.vti.AccountManagerment.dto.SupplierDTO;

public interface ISupplierService {

	List<SupplierDTO> getAll();

	SupplierDTO getById(Long id);

	SupplierDTO create(SupplierDTO dto);

	SupplierDTO update(Long id, SupplierDTO dto);

	void delete(Long id);

}
