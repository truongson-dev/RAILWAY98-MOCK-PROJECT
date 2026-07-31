package com.vti.module.groupbuy.dto;

import lombok.Data;
import java.math.BigDecimal;

@Data
public class JoinGroupBuyRequest {
    private String shippingAddress;
    public String getShippingAddress() { return shippingAddress; }
    public void setShippingAddress(String shippingAddress) { this.shippingAddress = shippingAddress; }
    private BigDecimal volumeKg;

    public BigDecimal getVolumeKg() { return volumeKg; }
    public void setVolumeKg(BigDecimal volumeKg) { this.volumeKg = volumeKg; }
}
