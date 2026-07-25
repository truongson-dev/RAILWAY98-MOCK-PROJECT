package com.vti.AccountManagerment.backend.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.vti.AccountManagerment.backend.repository.ISupplierRepository;
import com.vti.AccountManagerment.dto.SupplierDTO;
import com.vti.AccountManagerment.entity.Supplier;

@Service
public class SupplierService implements ISupplierService {

	@Autowired
	private ISupplierRepository supplierRepository;

	@Override
	public List<SupplierDTO> getAll() {
		return supplierRepository.findAll().stream().map(this::toDTO).collect(Collectors.toList());
	}

	@Override
	public SupplierDTO getById(Long id) {
		Supplier supplier = supplierRepository.findById(id)
				.orElseThrow(() -> new RuntimeException("Supplier not found with id: " + id));
		return toDTO(supplier);
	}

	@Override
	public SupplierDTO create(SupplierDTO dto) {
		Supplier supplier = new Supplier();
		supplier.setUsername(dto.getUsername());
		supplier.setStatus(dto.getStatus() != null ? dto.getStatus() : "ACTIVE");
		supplier.setFarmName(dto.getFarmName());
		supplier.setFarmArea(dto.getFarmArea());
		supplier.setCertificate(dto.getCertificate());
		supplier.setProductionCapacity(dto.getProductionCapacity());
		Supplier saved = supplierRepository.save(supplier);
		return toDTO(saved);
	}

	@Override
	public SupplierDTO update(Long id, SupplierDTO dto) {
		Supplier supplier = supplierRepository.findById(id)
				.orElseThrow(() -> new RuntimeException("Supplier not found with id: " + id));

		supplier.setUsername(dto.getUsername());
		supplier.setStatus(dto.getStatus());
		supplier.setFarmName(dto.getFarmName());
		supplier.setFarmArea(dto.getFarmArea());
		supplier.setCertificate(dto.getCertificate());
		supplier.setProductionCapacity(dto.getProductionCapacity());

		Supplier updated = supplierRepository.save(supplier);
		return toDTO(updated);
	}

	@Override
	public void delete(Long id) {
		if (!supplierRepository.existsById(id)) {
			throw new RuntimeException("Supplier not found with id: " + id);
		}
		supplierRepository.deleteById(id);
	}

	private SupplierDTO toDTO(Supplier supplier) {
		return new SupplierDTO(supplier.getId(), supplier.getUsername(), supplier.getRole(), supplier.getStatus(),
				supplier.getFarmName(), supplier.getFarmArea(), supplier.getCertificate(),
				supplier.getProductionCapacity());
	}

}
