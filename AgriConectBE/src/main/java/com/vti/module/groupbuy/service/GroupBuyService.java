package com.vti.module.groupbuy.service;

import com.vti.common.PageResponse;
import com.vti.common.enums.GroupBuyStatus;
import com.vti.module.groupbuy.dto.CreateGroupBuyRequest;
import com.vti.module.groupbuy.dto.GroupBuyDTO;
import com.vti.module.groupbuy.dto.JoinGroupBuyRequest;
import org.springframework.data.domain.Pageable;

public interface GroupBuyService {
    PageResponse<GroupBuyDTO> getGroupBuys(GroupBuyStatus status, Pageable pageable);
    GroupBuyDTO getById(Long id);
    GroupBuyDTO createGroupBuy(CreateGroupBuyRequest request, Long adminId);
    GroupBuyDTO joinGroupBuy(Long id, JoinGroupBuyRequest request, Long userId);
    GroupBuyDTO closeGroupBuy(Long id);
}
