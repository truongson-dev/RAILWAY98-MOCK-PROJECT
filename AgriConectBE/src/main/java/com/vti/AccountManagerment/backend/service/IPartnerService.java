package com.vti.AccountManagerment.backend.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.vti.AccountManagerment.entity.Partner;

public interface IPartnerService {

	Page<Partner> getAllPartner(Pageable pageable, String search);

}
