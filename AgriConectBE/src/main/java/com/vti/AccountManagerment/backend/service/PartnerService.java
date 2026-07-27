package com.vti.AccountManagerment.backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import com.vti.AccountManagerment.backend.repository.IPartnerRepository;
import com.vti.AccountManagerment.entity.Partner;

@Service
public class PartnerService implements IPartnerService {

	@Autowired
	private IPartnerRepository partnerRepository;

	@Override
	public Page<Partner> getAllPartner(Pageable pageable, String search) {
		Specification<Partner> where = null;

		if (!StringUtils.isEmpty(search)) {

		}
		return partnerRepository.findAll(where, pageable);
	}

}
