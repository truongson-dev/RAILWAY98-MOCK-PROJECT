package com.vti.AccountManagerment.backend.controller;

import java.util.function.Function;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.vti.AccountManagerment.backend.service.IShipperService;
import com.vti.AccountManagerment.dto.ShipperDTO;
import com.vti.AccountManagerment.entity.Shipper;

@RestController
@RequestMapping("/api/v1/shippers")
@CrossOrigin(origins = "*")
public class ShipperController {

	@Autowired
	private IShipperService shipperService;

	@GetMapping
	public ResponseEntity<?> getAllShipper(Pageable pageable, @RequestParam(required = false) String search) {
		Page<Shipper> pageShippers = shipperService.getAllShipper(pageable, search);

		Page<ShipperDTO> pageShipperDtos = pageShippers.map(new Function<Shipper, ShipperDTO>() {
			@Override
			public ShipperDTO apply(Shipper shipper) {
				ShipperDTO shipperDto = new ShipperDTO();
				shipperDto.setPhoneNumber(shipper.getPhoneNumber());
				shipperDto.setEmail(shipper.getEmail());
				shipperDto.setUsername(shipper.getUsername());
				shipperDto.setRole(shipper.getRole());
				shipperDto.setStatus(shipper.getStatus().name());

				shipperDto.setVehicleType(shipper.getVehicleType());
				shipperDto.setLicenseNumber(shipper.getLicenseNumber());
				shipperDto.setOperatingArea(shipper.getOperatingArea());
				return shipperDto;
			}
		});

		return new ResponseEntity<>(pageShipperDtos, HttpStatus.OK);
	}

}
