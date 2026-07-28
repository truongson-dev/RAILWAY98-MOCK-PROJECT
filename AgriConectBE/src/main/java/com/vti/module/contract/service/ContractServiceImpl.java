package com.vti.module.contract.service;

import com.vti.common.PageResponse;
import com.vti.common.enums.ContractStatus;
import com.vti.module.contract.enums.MilestoneStatus;
import com.vti.exception.AppException;
import com.vti.exception.ErrorCode;
import com.vti.module.account.entity.Account;
import com.vti.module.account.repository.AccountRepository;
import com.vti.module.contract.dto.*;
import com.vti.module.contract.entity.EscrowContract;
import com.vti.module.contract.entity.EscrowMilestone;
import com.vti.module.contract.entity.ForwardContract;
import com.vti.module.contract.repository.EscrowContractRepository;
import com.vti.module.contract.repository.ForwardContractRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.BeanUtils;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ContractServiceImpl implements ContractService {
    
    private final EscrowContractRepository escrowRepo;
    private final ForwardContractRepository forwardRepo;
    private final AccountRepository accountRepo;

    @Override
    @Transactional
    public EscrowDTO createEscrow(CreateEscrowRequest request, Long adminId) {
        Account buyer = accountRepo.findById(request.getBuyerId()).orElseThrow(() -> new AppException(ErrorCode.ACCOUNT_NOT_FOUND));
        Account seller = accountRepo.findById(request.getSellerId()).orElseThrow(() -> new AppException(ErrorCode.ACCOUNT_NOT_FOUND));

        EscrowContract contract = new EscrowContract();
        contract.setContractCode("ESC-" + UUID.randomUUID().toString().substring(0, 8).toUpperCase());
        contract.setBuyer(buyer);
        contract.setSeller(seller);
        contract.setProductName(request.getProductName());
        contract.setQuantityTons(request.getQuantityTons());
        contract.setTotalValueVnd(request.getTotalValueVnd());
        contract.setNotes(request.getNotes());
        contract.setStatus(ContractStatus.OPEN);
        contract.setProgressPercent(0);

        if (request.getMilestones() != null) {
            contract.setMilestones(request.getMilestones().stream().map(m -> {
                EscrowMilestone milestone = new EscrowMilestone();
                milestone.setContract(contract);
                milestone.setTitle(m.getTitle());
                milestone.setDescription(m.getDescription());
                milestone.setDisplayOrder(m.getDisplayOrder());
                milestone.setStatus(com.vti.module.contract.enums.MilestoneStatus.PENDING);
                return milestone;
            }).collect(Collectors.toList()));
        }

        escrowRepo.save(contract);
        return convertToEscrowDTO(contract);
    }

    @Override
    public PageResponse<EscrowDTO> getEscrows(ContractStatus status, Pageable pageable) {
        Page<EscrowContract> page = status != null ? 
            escrowRepo.findByStatus(status, pageable) : 
            escrowRepo.findAll(pageable);
        return PageResponse.of(page.map(this::convertToEscrowDTO));
    }

    @Override
    public EscrowDTO getEscrowById(Long id) {
        return convertToEscrowDTO(escrowRepo.findById(id).orElseThrow(() -> new AppException(ErrorCode.ESCROW_NOT_FOUND)));
    }

    @Override
    @Transactional
    public EscrowDTO updateEscrowStatus(Long id, ContractStatus newStatus) {
        EscrowContract contract = escrowRepo.findById(id).orElseThrow(() -> new AppException(ErrorCode.ESCROW_NOT_FOUND));
        contract.setStatus(newStatus);
        return convertToEscrowDTO(escrowRepo.save(contract));
    }

    @Override
    @Transactional
    public EscrowDTO updateMilestone(Long escrowId, Long milestoneId, UpdateMilestoneRequest request) {
        EscrowContract contract = escrowRepo.findById(escrowId).orElseThrow(() -> new AppException(ErrorCode.ESCROW_NOT_FOUND));
        EscrowMilestone milestone = contract.getMilestones().stream()
                .filter(m -> m.getId().equals(milestoneId))
                .findFirst()
                .orElseThrow(() -> new AppException(ErrorCode.ESCROW_NOT_FOUND));
                
        milestone.setStatus(request.getStatus());
        if (request.getStatus() == com.vti.module.contract.enums.MilestoneStatus.COMPLETED) {
            milestone.setCompletionDate(LocalDateTime.now());
        }
        
        long completedCount = contract.getMilestones().stream()
                .filter(m -> m.getStatus() == com.vti.module.contract.enums.MilestoneStatus.COMPLETED)
                .count();
        contract.setProgressPercent(contract.getMilestones().isEmpty() ? 0 : (int) ((completedCount * 100) / contract.getMilestones().size()));
        
        if (contract.getProgressPercent() == 100) {
            contract.setStatus(ContractStatus.COMPLETED);
        }
        
        return convertToEscrowDTO(escrowRepo.save(contract));
    }

    @Override
    @Transactional
    public ForwardContractDTO createForwardContract(CreateForwardRequest request, Long adminId) {
        Account admin = accountRepo.findById(adminId).orElseThrow(() -> new AppException(ErrorCode.ACCOUNT_NOT_FOUND));
        ForwardContract contract = new ForwardContract();
        contract.setContractCode("FWD-" + UUID.randomUUID().toString().substring(0, 8).toUpperCase());
        contract.setTitle(request.getTitle());
        contract.setCropName(request.getCropName());
        contract.setFarmName(request.getFarmName());
        contract.setLocation(request.getLocation());
        contract.setExpectedHarvest(request.getExpectedHarvest());
        contract.setEstimatedQuantityKg(request.getEstimatedQuantityKg());
        contract.setContractPriceVnd(request.getContractPriceVnd());
        contract.setDepositPercent(request.getDepositPercent());
        contract.setImageUrl(request.getImageUrl());
        contract.setDescription(request.getDescription());
        contract.setCreatedBy(admin);
        contract.setStatus(ContractStatus.OPEN);
                
        return convertToForwardDTO(forwardRepo.save(contract));
    }

    @Override
    public PageResponse<ForwardContractDTO> getForwardContracts(ContractStatus status, Pageable pageable) {
        Page<ForwardContract> page = status != null ? 
            forwardRepo.findByStatus(status, pageable) : 
            forwardRepo.findAll(pageable);
        return PageResponse.of(page.map(this::convertToForwardDTO));
    }

    @Override
    public ForwardContractDTO getForwardContractById(Long id) {
        return convertToForwardDTO(forwardRepo.findById(id).orElseThrow(() -> new AppException(ErrorCode.FORWARD_CONTRACT_NOT_FOUND)));
    }

    @Override
    @Transactional
    public ForwardContractDTO updateForwardStatus(Long id, ContractStatus status) {
        ForwardContract contract = forwardRepo.findById(id).orElseThrow(() -> new AppException(ErrorCode.FORWARD_CONTRACT_NOT_FOUND));
        contract.setStatus(status);
        return convertToForwardDTO(forwardRepo.save(contract));
    }
    
    private EscrowDTO convertToEscrowDTO(EscrowContract entity) {
        EscrowDTO dto = new EscrowDTO();
        BeanUtils.copyProperties(entity, dto);
        if (entity.getBuyer() != null) dto.setBuyerId(entity.getBuyer().getId());
        if (entity.getSeller() != null) dto.setSellerId(entity.getSeller().getId());
        if (entity.getMilestones() != null) {
            dto.setMilestones(entity.getMilestones().stream().map(this::convertToMilestoneDTO).collect(Collectors.toList()));
        }
        return dto;
    }
    
    private EscrowMilestoneDTO convertToMilestoneDTO(EscrowMilestone entity) {
        EscrowMilestoneDTO dto = new EscrowMilestoneDTO();
        BeanUtils.copyProperties(entity, dto);
        dto.setContractId(entity.getContract() != null ? entity.getContract().getId() : null);
        return dto;
    }
    
    private ForwardContractDTO convertToForwardDTO(ForwardContract entity) {
        ForwardContractDTO dto = new ForwardContractDTO();
        BeanUtils.copyProperties(entity, dto);
        if (entity.getCreatedBy() != null) dto.setCreatedById(entity.getCreatedBy().getId());
        return dto;
    }
}
