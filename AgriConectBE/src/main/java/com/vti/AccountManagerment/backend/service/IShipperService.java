package com.vti.AccountManagement.backend.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.vti.AccountManagement.entity.Shipper;

public interface IShipperService {

	Page<Shipper> getAllShipper(Pageable pageable, String search);

}
