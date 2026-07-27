package com.vti.AccountManagerment.backend.controller;

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

import com.vti.AccountManagerment.backend.service.IPartnerService;
import com.vti.AccountManagerment.dto.PartnerDTO;
import com.vti.AccountManagerment.entity.Partner;

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
				partnerDto.setId(partner.getId());
				partnerDto.setPhoneNumber(partner.getPhoneNumber());
				partnerDto.setEmail(partner.getEmail());
				partnerDto.setUsername(partner.getUsername());
				partnerDto.setRole(partner.getRole());
				partnerDto.setStatus(partner.getStatus().name());

				partnerDto.setCompanyName(partner.getCompanyName());
				partnerDto.setTaxCode(partner.getTaxCode());
				partnerDto.setBusinessType(partner.getBusinessType());
				return partnerDto;

			}
		});

		return new ResponseEntity<>(pagePartnerDtos, HttpStatus.OK);
	}

}
