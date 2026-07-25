package com.vti.AccountManagement.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.vti.AccountManagement.entity.Shipper;

public interface IShipperRepository extends JpaRepository<Shipper, Long> {

}
