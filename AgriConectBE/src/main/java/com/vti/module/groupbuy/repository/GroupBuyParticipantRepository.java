package com.vti.module.groupbuy.repository;

import com.vti.module.groupbuy.entity.GroupBuyParticipant;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface GroupBuyParticipantRepository extends JpaRepository<GroupBuyParticipant, Long> {
    Optional<GroupBuyParticipant> findByGroupBuyIdAndAccountId(Long groupBuyId, Long accountId);
    long countByGroupBuyId(Long groupBuyId);
}
