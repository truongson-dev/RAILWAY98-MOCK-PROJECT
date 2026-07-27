package com.vti.AccountManagement.backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import com.vti.AccountManagement.backend.repository.IShipperRepository;
import com.vti.AccountManagement.entity.Shipper;

@Service
public class ShipperService implements IShipperService {

	@Autowired
	private IShipperRepository shipperRepository;

	@Override
	public Page<Shipper> getAllShipper(Pageable pageable, String search) {
		Specification<Shipper> where = null;

		if (!StringUtils.isEmpty(search)) {

		}
		return shipperRepository.findAll(where, pageable);
	}

}
