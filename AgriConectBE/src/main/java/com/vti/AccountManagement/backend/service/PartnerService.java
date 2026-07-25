package com.vti.AccountManagement.backend.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.vti.AccountManagement.backend.repository.IPartnerRepository;
import com.vti.AccountManagement.dto.PartnerDTO;
import com.vti.AccountManagement.entity.Partner;

@Service
public class PartnerService implements IPartnerService {

	@Autowired
	private IPartnerRepository partnerRepository;

	@Override
	public List<PartnerDTO> getAll() {
		return partnerRepository.findAll().stream().map(this::toDTO).collect(Collectors.toList());
	}

	@Override
	public PartnerDTO getById(Long id) {
		Partner partner = partnerRepository.findById(id)
				.orElseThrow(() -> new RuntimeException("Partner not found with id: " + id));
		return toDTO(partner);
	}

	@Override
	public PartnerDTO create(PartnerDTO dto) {
		Partner partner = new Partner();
		partner.setUsername(dto.getUsername());
		partner.setStatus(dto.getStatus() != null ? dto.getStatus() : "ACTIVE");
		partner.setCompanyName(dto.getCompanyName());
		partner.setTaxCode(dto.getTaxCode());
		partner.setBusinessType(dto.getBusinessType());
		Partner saved = partnerRepository.save(partner);
		return toDTO(saved);
	}

	@Override
	public PartnerDTO update(Long id, PartnerDTO dto) {
		Partner partner = partnerRepository.findById(id)
				.orElseThrow(() -> new RuntimeException("Partner not found with id: " + id));

		partner.setUsername(dto.getUsername());
		partner.setStatus(dto.getStatus());
		partner.setCompanyName(dto.getCompanyName());
		partner.setTaxCode(dto.getTaxCode());
		partner.setBusinessType(dto.getBusinessType());

		Partner updated = partnerRepository.save(partner);
		return toDTO(updated);
	}

	@Override
	public void delete(Long id) {
		if (!partnerRepository.existsById(id)) {
			throw new RuntimeException("Partner not found with id: " + id);
		}
		partnerRepository.deleteById(id);
	}

	private PartnerDTO toDTO(Partner partner) {
		return new PartnerDTO(partner.getId(), partner.getUsername(), partner.getRole(), partner.getStatus(),
				partner.getCompanyName(), partner.getTaxCode(), partner.getBusinessType());
	}

}
