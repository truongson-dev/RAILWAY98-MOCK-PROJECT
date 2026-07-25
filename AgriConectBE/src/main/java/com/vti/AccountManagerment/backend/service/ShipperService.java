package com.vti.AccountManagerment.backend.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.vti.AccountManagerment.backend.repository.IShipperRepository;
import com.vti.AccountManagerment.dto.ShipperDTO;
import com.vti.AccountManagerment.entity.Shipper;

@Service
public class ShipperService implements IShipperService {

	@Autowired
	private IShipperRepository shipperRepository;

	@Override
	public List<ShipperDTO> getAll() {
		return shipperRepository.findAll().stream().map(this::toDTO).collect(Collectors.toList());
	}

	@Override
	public ShipperDTO getById(Long id) {
		Shipper shipper = shipperRepository.findById(id)
				.orElseThrow(() -> new RuntimeException("Shipper not found with id: " + id));
		return toDTO(shipper);
	}

	@Override
	public ShipperDTO create(ShipperDTO dto) {
		Shipper shipper = new Shipper();
		shipper.setUsername(dto.getUsername());
		shipper.setStatus(dto.getStatus() != null ? dto.getStatus() : "ACTIVE");
		shipper.setVehicleType(dto.getVehicleType());
		shipper.setLicenseNumber(dto.getLicenseNumber());
		shipper.setOperatingArea(dto.getOperatingArea());
		Shipper saved = shipperRepository.save(shipper);
		return toDTO(saved);
	}

	@Override
	public ShipperDTO update(Long id, ShipperDTO dto) {
		Shipper shipper = shipperRepository.findById(id)
				.orElseThrow(() -> new RuntimeException("Shipper not found with id: " + id));

		shipper.setUsername(dto.getUsername());
		shipper.setStatus(dto.getStatus());
		shipper.setVehicleType(dto.getVehicleType());
		shipper.setLicenseNumber(dto.getLicenseNumber());
		shipper.setOperatingArea(dto.getOperatingArea());

		Shipper updated = shipperRepository.save(shipper);
		return toDTO(updated);
	}

	@Override
	public void delete(Long id) {
		if (!shipperRepository.existsById(id)) {
			throw new RuntimeException("Shipper not found with id: " + id);
		}
		shipperRepository.deleteById(id);
	}

	private ShipperDTO toDTO(Shipper shipper) {
		return new ShipperDTO(shipper.getId(), shipper.getUsername(), shipper.getRole(), shipper.getStatus(),
				shipper.getVehicleType(), shipper.getLicenseNumber(), shipper.getOperatingArea());
	}
}
