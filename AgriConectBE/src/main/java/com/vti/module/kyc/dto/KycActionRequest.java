package com.vti.module.kyc.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class KycActionRequest {
    @NotBlank(message = "Hành động duyệt không được để trống (APPROVE/REJECT/NEEDS_INFO)")
    private KycAction action;
    private String reason;
    private String note;

    public KycAction getAction() { return action; }
    public String getReason() { return reason; }
    public String getNote() { return note; }

    public enum KycAction {
        APPROVE, REJECT, NEEDS_INFO
    }
}
