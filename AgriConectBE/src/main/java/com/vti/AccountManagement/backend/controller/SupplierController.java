package com.vti.AccountManagement.backend.controller;

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

import com.vti.AccountManagement.backend.service.ISupplierService;
import com.vti.AccountManagement.dto.SupplierDTO;
import com.vti.AccountManagement.entity.Supplier;

@RestController
@RequestMapping("/api/v1/suppliers")
@CrossOrigin(origins = "*")
public class SupplierController {

	@Autowired
	private ISupplierService supplierService;

	@GetMapping
	public ResponseEntity<?> getAllSupplier(Pageable pageable, @RequestParam(required = false) String search) {
		Page<Supplier> pageSuppliers = supplierService.getAllSupplier(pageable, search);

		Page<SupplierDTO> pageSupplierDtos = pageSuppliers.map(new Function<Supplier, SupplierDTO>() {
			@Override
			public SupplierDTO apply(Supplier supplier) {
				SupplierDTO supplierDto = new SupplierDTO();
				supplierDto.setUsername(supplier.getUsername());
				supplierDto.setRole(supplier.getRole());
				supplierDto.setStatus(supplier.getStatus().name());

				supplierDto.setFarmName(supplier.getFarmName());
				supplierDto.setFarmArea(supplier.getFarmArea());
				supplierDto.setCertificate(supplier.getCertificate());
				supplierDto.setProductionCapacity(supplier.getProductionCapacity());

				return supplierDto;
			}
		});

		return new ResponseEntity<>(pageSupplierDtos, HttpStatus.OK);
	}

}
