package com.vti.module.contract.service;

import com.vti.common.PageResponse;
import com.vti.common.enums.ContractStatus;
import com.vti.module.contract.dto.CreateEscrowRequest;
import com.vti.module.contract.dto.CreateForwardRequest;
import com.vti.module.contract.dto.EscrowDTO;
import com.vti.module.contract.dto.ForwardContractDTO;
import org.springframework.data.domain.Pageable;

public interface ContractService {
    // Escrow Contracts
    EscrowDTO createEscrow(CreateEscrowRequest request, Long adminId);
    PageResponse<EscrowDTO> getEscrows(ContractStatus status, Pageable pageable);
    EscrowDTO getEscrowById(Long id);
    EscrowDTO updateEscrowStatus(Long id, ContractStatus newStatus);
    EscrowDTO updateMilestone(Long escrowId, Long milestoneId, com.vti.module.contract.dto.UpdateMilestoneRequest request);

    // Forward Contracts
    ForwardContractDTO createForwardContract(CreateForwardRequest request, Long adminId);
    EscrowDTO createEscrowFromForwardContract(Long forwardContractId, Long partnerId);
    PageResponse<ForwardContractDTO> getForwardContracts(ContractStatus status, Pageable pageable);
    ForwardContractDTO getForwardContractById(Long id);
    ForwardContractDTO updateForwardStatus(Long id, ContractStatus status);
}
