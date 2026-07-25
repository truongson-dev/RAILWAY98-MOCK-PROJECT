package com.vti.AccountManagement.backend.controller;

import java.util.function.Function;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.vti.AccountManagement.backend.service.IPartnerService;
import com.vti.AccountManagement.dto.PartnerDTO;
import com.vti.AccountManagement.entity.Partner;

@RestController
@RequestMapping("/api/v1/partners")
@CrossOrigin(origins = "*")
public class PartnerController {

	@Autowired
	private IPartnerService partnerService;

	@GetMapping
	public ResponseEntity<?> getAllPartner(Pageable pageable, @RequestParam(required = false) String search) {
		Page<Partner> pagePartners = partnerService.getAllPartner(pageable, search);

		Page<PartnerDTO> pagePartnerDtos = pagePartners.map(new Function<Partner, PartnerDTO>() {
			@Override
			public PartnerDTO apply(Partner partner) {
				PartnerDTO partnerDto = new PartnerDTO();
				partnerDto.setUsername(partner.getUsername());
				partnerDto.setRole(partner.getRole());
				partnerDto.setStatus(partner.getStatus());

				partnerDto.setCompanyName(partner.getCompanyName());
				partnerDto.setTaxCode(partner.getTaxCode());
				partnerDto.setBusinessType(partner.getBusinessType());
				return partnerDto;

			}
		});

		return new ResponseEntity<>(pagePartnerDtos, HttpStatus.OK);
	}

	@GetMapping("/{id}")
	public ResponseEntity<?> getById(@PathVariable(name = "id") Long id) {
		Partner partner = partnerService.getById(id);

		PartnerDTO partnerDto = new PartnerDTO();
		partnerDto.setUsername(partner.getUsername());
		partnerDto.setRole(partner.getRole());
		partnerDto.setStatus(partner.getStatus());
		partnerDto.setCompanyName(partner.getCompanyName());
		partnerDto.setTaxCode(partner.getTaxCode());
		partnerDto.setBusinessType(partner.getBusinessType());

		return new ResponseEntity<>(partnerDto, HttpStatus.OK);
	}

}
