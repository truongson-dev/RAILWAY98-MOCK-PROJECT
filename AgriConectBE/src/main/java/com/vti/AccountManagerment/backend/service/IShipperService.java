package com.vti.AccountManagerment.backend.service;

import java.util.List;

import com.vti.AccountManagerment.dto.ShipperDTO;

public interface IShipperService {

	List<ShipperDTO> getAll();

	ShipperDTO getById(Long id);

	ShipperDTO create(ShipperDTO dto);

	ShipperDTO update(Long id, ShipperDTO dto);

	void delete(Long id);

}
