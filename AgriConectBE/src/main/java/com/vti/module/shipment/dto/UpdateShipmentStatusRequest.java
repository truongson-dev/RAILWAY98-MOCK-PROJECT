package com.vti.module.shipment.dto;

import com.vti.common.enums.ShipmentStatus;
import lombok.Data;

@Data
public class UpdateShipmentStatusRequest {
    private ShipmentStatus status;
    private String notes;

    public ShipmentStatus getStatus() { return status; }
    public String getNotes() { return notes; }
}
