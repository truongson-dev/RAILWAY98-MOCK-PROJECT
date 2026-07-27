package com.vti.module.account.repository;

import com.vti.module.account.entity.Partner;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

/**
 * PartnerRepository — Truy vấn bảng partners
 *
 * <p>Kế thừa JpaRepository<Partner, Long> để có các phương thức CRUD cơ bản.
 * Hibernate sẽ tự JOIN bảng accounts + partners khi query.
 */
@Repository
public interface PartnerRepository extends JpaRepository<Partner, Long> {

    Optional<Partner> findByEmail(String email);

    boolean existsByTaxCode(String taxCode);
}
