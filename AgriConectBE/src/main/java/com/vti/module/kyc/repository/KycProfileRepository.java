package com.vti.module.kyc.repository;

import com.vti.common.enums.KycStatus;
import com.vti.module.kyc.entity.KycProfile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface KycProfileRepository extends JpaRepository<KycProfile, Long> {
    long countByStatus(KycStatus status);
    
    java.util.Optional<KycProfile> findByAccountId(Long accountId);
    org.springframework.data.domain.Page<KycProfile> findByStatus(KycStatus status, org.springframework.data.domain.Pageable pageable);
}
