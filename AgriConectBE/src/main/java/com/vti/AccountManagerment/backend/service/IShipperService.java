package com.vti.AccountManagerment.backend.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.vti.AccountManagerment.entity.Shipper;

public interface IShipperService {

	Page<Shipper> getAllShipper(Pageable pageable, String search);

}
