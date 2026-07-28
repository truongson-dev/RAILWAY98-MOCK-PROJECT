package com.vti.module.groupbuy.service;

import com.vti.common.PageResponse;
import com.vti.common.enums.GroupBuyStatus;
import com.vti.exception.AppException;
import com.vti.exception.ErrorCode;
import com.vti.module.account.entity.Account;
import com.vti.module.account.repository.AccountRepository;
import com.vti.module.groupbuy.dto.CreateGroupBuyRequest;
import com.vti.module.groupbuy.dto.GroupBuyDTO;
import com.vti.module.groupbuy.dto.JoinGroupBuyRequest;
import com.vti.module.groupbuy.entity.GroupBuy;
import com.vti.module.groupbuy.entity.GroupBuyParticipant;
import com.vti.module.groupbuy.repository.GroupBuyParticipantRepository;
import com.vti.module.groupbuy.repository.GroupBuyRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.BeanUtils;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class GroupBuyServiceImpl implements GroupBuyService {

    private final GroupBuyRepository groupBuyRepo;
    private final GroupBuyParticipantRepository participantRepo;
    private final AccountRepository accountRepo;

    @Override
    public PageResponse<GroupBuyDTO> getGroupBuys(GroupBuyStatus status, Pageable pageable) {
        Page<GroupBuy> page = status != null ? groupBuyRepo.findByStatus(status, pageable) : groupBuyRepo.findAll(pageable);
        return PageResponse.of(page.map(this::convertToDTO));
    }

    @Override
    public GroupBuyDTO getById(Long id) {
        return convertToDTO(groupBuyRepo.findById(id).orElseThrow(() -> new AppException(ErrorCode.GROUP_BUY_NOT_FOUND)));
    }

    @Override
    @Transactional
    public GroupBuyDTO createGroupBuy(CreateGroupBuyRequest request, Long adminId) {
        Account admin = accountRepo.findById(adminId).orElseThrow(() -> new AppException(ErrorCode.ACCOUNT_NOT_FOUND));
        GroupBuy groupBuy = new GroupBuy();
        groupBuy.setTitle(request.getTitle());
        groupBuy.setDescription(request.getDescription());
        groupBuy.setTargetQuantity(request.getTargetQuantity());
        groupBuy.setCurrentQuantity(BigDecimal.ZERO);
        groupBuy.setDiscountPercent(request.getDiscountPercent());
        groupBuy.setOriginalPrice(request.getOriginalPrice());
        groupBuy.setDiscountPrice(request.getDiscountPrice());
        groupBuy.setStartDate(request.getStartDate());
        groupBuy.setEndDate(request.getEndDate());
        groupBuy.setStatus(GroupBuyStatus.OPEN);
        groupBuy.setParticipantsCount(0);
        groupBuy.setCreatedBy(admin);
        return convertToDTO(groupBuyRepo.save(groupBuy));
    }

    @Override
    @Transactional
    public GroupBuyDTO joinGroupBuy(Long id, JoinGroupBuyRequest request, Long userId) {
        GroupBuy gb = groupBuyRepo.findById(id).orElseThrow(() -> new AppException(ErrorCode.GROUP_BUY_NOT_FOUND));
        if (gb.getStatus() != GroupBuyStatus.OPEN) {
            throw new AppException(ErrorCode.GROUP_BUY_CLOSED);
        }
        
        Optional<GroupBuyParticipant> existing = participantRepo.findByGroupBuyIdAndAccountId(id, userId);
        if (existing.isPresent()) {
            throw new AppException(ErrorCode.GROUP_BUY_ALREADY_JOINED);
        }
        
        Account user = accountRepo.findById(userId).orElseThrow(() -> new AppException(ErrorCode.ACCOUNT_NOT_FOUND));
        
        GroupBuyParticipant participant = new GroupBuyParticipant();
        participant.setGroupBuy(gb);
        participant.setAccount(user);
        participant.setVolumeKg(request.getVolumeKg());
        participant.setJoinedAt(LocalDateTime.now());
        participantRepo.save(participant);
        
        gb.setCurrentQuantity(gb.getCurrentQuantity().add(request.getVolumeKg()));
        gb.setParticipantsCount(gb.getParticipantsCount() + 1);
        
        return convertToDTO(groupBuyRepo.save(gb));
    }

    @Override
    @Transactional
    public GroupBuyDTO closeGroupBuy(Long id) {
        GroupBuy gb = groupBuyRepo.findById(id).orElseThrow(() -> new AppException(ErrorCode.GROUP_BUY_NOT_FOUND));
        gb.setStatus(GroupBuyStatus.CLOSED);
        return convertToDTO(groupBuyRepo.save(gb));
    }

    private GroupBuyDTO convertToDTO(GroupBuy entity) {
        GroupBuyDTO dto = new GroupBuyDTO();
        BeanUtils.copyProperties(entity, dto);
        if (entity.getProduct() != null) dto.setProductId(entity.getProduct().getId());
        if (entity.getCreatedBy() != null) dto.setCreatedById(entity.getCreatedBy().getId());
        return dto;
    }
}
