package com.vti.module.groupbuy.repository;

import com.vti.common.enums.GroupBuyStatus;
import com.vti.module.groupbuy.entity.GroupBuy;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface GroupBuyRepository extends JpaRepository<GroupBuy, Long> {
    Page<GroupBuy> findByStatus(GroupBuyStatus status, Pageable pageable);

    @Query("SELECT g FROM GroupBuy g WHERE g.product.seller.id = :supplierId AND (:status IS NULL OR g.status = :status)")
    Page<GroupBuy> findBySupplierAndStatus(@Param("supplierId") Long supplierId, @Param("status") GroupBuyStatus status, Pageable pageable);
}
