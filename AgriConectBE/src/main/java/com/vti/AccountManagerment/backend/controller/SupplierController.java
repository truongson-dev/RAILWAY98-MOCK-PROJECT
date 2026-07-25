package com.vti.AccountManagerment.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.vti.AccountManagerment.backend.service.ISupplierService;
import com.vti.AccountManagerment.dto.SupplierDTO;

@RestController
@RequestMapping("/api/v1/suppliers")
@CrossOrigin("*")
public class SupplierController {

	@Autowired
	private ISupplierService supplierService;

	@GetMapping
	public ResponseEntity<List<SupplierDTO>> getAll() {
		return ResponseEntity.ok(supplierService.getAll());
	}

	@GetMapping("/{id}")
	public ResponseEntity<SupplierDTO> getById(@PathVariable Long id) {
		return ResponseEntity.ok(supplierService.getById(id));
	}

	@PostMapping
	public ResponseEntity<SupplierDTO> create(@RequestBody SupplierDTO dto) {
		SupplierDTO created = supplierService.create(dto);
		return ResponseEntity.status(HttpStatus.CREATED).body(created);
	}

	@PutMapping("/{id}")
	public ResponseEntity<SupplierDTO> update(@PathVariable Long id, @RequestBody SupplierDTO dto) {
		return ResponseEntity.ok(supplierService.update(id, dto));
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<Void> delete(@PathVariable Long id) {
		supplierService.delete(id);
		return ResponseEntity.noContent().build();
	}

}
