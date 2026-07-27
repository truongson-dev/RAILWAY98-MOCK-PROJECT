package com.vti.module.credit.repository;

import com.vti.module.credit.entity.CreditInfo;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface CreditRepository extends JpaRepository<CreditInfo, Long> {
    Optional<CreditInfo> findByAccountId(Long accountId);
}
