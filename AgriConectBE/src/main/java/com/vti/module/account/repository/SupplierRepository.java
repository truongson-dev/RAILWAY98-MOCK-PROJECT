package com.vti.module.account.repository;

import com.vti.module.account.entity.Supplier;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * SupplierRepository — Truy vấn bảng suppliers
 *
 * <p>Hibernate JOIN accounts + suppliers khi query.
 */
@Repository
public interface SupplierRepository extends JpaRepository<Supplier, Long> {

    boolean existsByFarmName(String farmName);
}
