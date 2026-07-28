package com.vti.module.groupbuy.dto;

import lombok.Data;
import java.math.BigDecimal;

@Data
public class JoinGroupBuyRequest {
    private BigDecimal volumeKg;

    public BigDecimal getVolumeKg() { return volumeKg; }
}
