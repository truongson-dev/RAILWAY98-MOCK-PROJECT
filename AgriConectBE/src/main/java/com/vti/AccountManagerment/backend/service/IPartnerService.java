package com.vti.AccountManagerment.backend.service;

import java.util.List;

import com.vti.AccountManagerment.dto.PartnerDTO;

public interface IPartnerService {

	List<PartnerDTO> getAll();

	PartnerDTO getById(Long id);

	PartnerDTO create(PartnerDTO dto);

	PartnerDTO update(Long id, PartnerDTO dto);

	void delete(Long id);

}
