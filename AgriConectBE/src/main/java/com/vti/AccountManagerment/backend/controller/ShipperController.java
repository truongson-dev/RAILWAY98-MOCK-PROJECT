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

import com.vti.AccountManagerment.backend.service.IShipperService;
import com.vti.AccountManagerment.dto.ShipperDTO;

@RestController
@RequestMapping("/api/v1/shippers")
@CrossOrigin("*")
public class ShipperController {

	@Autowired
	private IShipperService shipperService;

	@GetMapping
	public ResponseEntity<List<ShipperDTO>> getAll() {
		return ResponseEntity.ok(shipperService.getAll());
	}

	@GetMapping("/{id}")
	public ResponseEntity<ShipperDTO> getById(@PathVariable Long id) {
		return ResponseEntity.ok(shipperService.getById(id));
	}

	@PostMapping
	public ResponseEntity<ShipperDTO> create(@RequestBody ShipperDTO dto) {
		ShipperDTO created = shipperService.create(dto);
		return ResponseEntity.status(HttpStatus.CREATED).body(created);
	}

	@PutMapping("/{id}")
	public ResponseEntity<ShipperDTO> update(@PathVariable Long id, @RequestBody ShipperDTO dto) {
		return ResponseEntity.ok(shipperService.update(id, dto));
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<Void> delete(@PathVariable Long id) {
		shipperService.delete(id);
		return ResponseEntity.noContent().build();
	}

}
