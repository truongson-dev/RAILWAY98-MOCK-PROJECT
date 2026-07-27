package com.vti.AccountManagement.backend.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.vti.AccountManagement.entity.Partner;

public interface IPartnerService {

	Page<Partner> getAllPartner(Pageable pageable, String search);

}
