package com.vti.module.contract.dto;

import com.vti.common.enums.ContractStatus;
import lombok.Data;

@Data
public class UpdateContractStatusRequest {
    private ContractStatus status;

    public ContractStatus getStatus() { return status; }
    public void setStatus(ContractStatus status) { this.status = status; }
    private String reason;
}
