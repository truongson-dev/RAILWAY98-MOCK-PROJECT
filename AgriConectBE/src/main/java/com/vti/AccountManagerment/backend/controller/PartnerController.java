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

import com.vti.AccountManagerment.backend.service.IPartnerService;
import com.vti.AccountManagerment.dto.PartnerDTO;

@RestController
@RequestMapping("/api/v1/partners")
@CrossOrigin("*")
public class PartnerController {

	@Autowired
	private IPartnerService partnerService;

	@GetMapping
	public ResponseEntity<List<PartnerDTO>> getAll() {
		return ResponseEntity.ok(partnerService.getAll());
	}

	@GetMapping("/{id}")
	public ResponseEntity<PartnerDTO> getById(@PathVariable Long id) {
		return ResponseEntity.ok(partnerService.getById(id));
	}

	@PostMapping
	public ResponseEntity<PartnerDTO> create(@RequestBody PartnerDTO dto) {
		PartnerDTO created = partnerService.create(dto);
		return ResponseEntity.status(HttpStatus.CREATED).body(created);
	}

	@PutMapping("/{id}")
	public ResponseEntity<PartnerDTO> update(@PathVariable Long id, @RequestBody PartnerDTO dto) {
		return ResponseEntity.ok(partnerService.update(id, dto));
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<Void> delete(@PathVariable Long id) {
		partnerService.delete(id);
		return ResponseEntity.noContent().build();
	}

}
