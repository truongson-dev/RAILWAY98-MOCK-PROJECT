package com.vti.module.order.dto;

import com.vti.common.enums.OrderStatus;
import lombok.Data;

@Data
public class UpdateOrderStatusRequest {
    private OrderStatus status;
    private String reason;

    public OrderStatus getStatus() { return status; }
    public String getReason() { return reason; }
}
