package com.vti.AccountManagerment.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.vti.AccountManagerment.entity.Supplier;

public interface ISupplierRepository extends JpaRepository<Supplier, Long> {

}
