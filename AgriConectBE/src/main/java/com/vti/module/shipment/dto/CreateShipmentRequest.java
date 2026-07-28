package com.vti.module.shipment.dto;

import lombok.Data;

@Data
public class CreateShipmentRequest {
    private Long orderId;
    private Long shipperId;

    public Long getOrderId() { return orderId; }
    public Long getShipperId() { return shipperId; }
}
