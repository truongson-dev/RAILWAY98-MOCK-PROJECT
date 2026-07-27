package com.vti.module.account.repository;

import com.vti.module.account.entity.Shipper;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * ShipperRepository — Truy vấn bảng shippers
 *
 * <p>Hibernate JOIN accounts + shippers khi query.
 */
@Repository
public interface ShipperRepository extends JpaRepository<Shipper, Long> {

}
