package com.vti.module.groupbuy.service;

import com.vti.common.PageResponse;
import com.vti.common.enums.GroupBuyStatus;
import com.vti.module.groupbuy.dto.GroupBuyDTO;
import org.springframework.data.domain.Pageable;

import java.math.BigDecimal;

public interface GroupBuyService {
    PageResponse<GroupBuyDTO> getGroupBuys(GroupBuyStatus status, Pageable pageable);
    PageResponse<GroupBuyDTO> getSupplierGroupBuys(Long supplierId, GroupBuyStatus status, Pageable pageable);
    GroupBuyDTO joinGroupBuy(Long id, Long partnerId, BigDecimal volumeKg);
    GroupBuyDTO updateStatus(Long id, GroupBuyStatus status, Long supplierId);
}
