package com.vti.module.contract.repository;

import com.vti.common.enums.ContractStatus;
import com.vti.module.contract.entity.ForwardContract;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface ForwardContractRepository extends JpaRepository<ForwardContract, Long> {
    
    Page<ForwardContract> findByStatus(ContractStatus status, Pageable pageable);
    
    @Query("SELECT f FROM ForwardContract f WHERE f.createdBy.id = :supplierId AND (:status IS NULL OR f.status = :status)")
    Page<ForwardContract> findBySupplierIdAndStatus(@Param("supplierId") Long supplierId, @Param("status") ContractStatus status, Pageable pageable);
    
    @Query("SELECT f FROM ForwardContract f WHERE LOWER(f.cropName) LIKE LOWER(CONCAT('%', :keyword, '%')) OR LOWER(f.location) LIKE LOWER(CONCAT('%', :keyword, '%'))")
    Page<ForwardContract> searchByCropNameOrLocation(@Param("keyword") String keyword, Pageable pageable);
}
