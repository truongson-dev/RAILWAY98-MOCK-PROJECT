package com.vti.module.contract.repository;

import com.vti.common.enums.ContractStatus;
import com.vti.module.contract.entity.EscrowContract;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface EscrowContractRepository extends JpaRepository<EscrowContract, Long> {
    
    @Query("SELECT e FROM EscrowContract e WHERE e.buyer.id = :accountId OR e.seller.id = :accountId")
    Page<EscrowContract> findByBuyerIdOrSellerId(@Param("accountId") Long accountId, Pageable pageable);
    
    Page<EscrowContract> findByStatus(ContractStatus status, Pageable pageable);
}
