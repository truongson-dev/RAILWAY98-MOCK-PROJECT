package com.vti.AccountManagement.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.vti.AccountManagement.entity.Supplier;

public interface ISupplierRepository extends JpaRepository<Supplier, Long> {

}
