package com.vti.module.groupbuy.repository;

import com.vti.common.enums.GroupBuyStatus;
import com.vti.module.groupbuy.entity.GroupBuy;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface GroupBuyRepository extends JpaRepository<GroupBuy, Long> {
    Page<GroupBuy> findByStatus(GroupBuyStatus status, Pageable pageable);
    java.util.Optional<GroupBuy> findFirstByProductIdAndStatusOrderByCreatedAtDesc(Long productId, GroupBuyStatus status);
}
