package com.vti.module.shipment.dto;

import com.vti.common.enums.ShipmentStatus;
import lombok.Data;
import java.time.LocalDateTime;

@Data
public class ShipmentDTO {
    private Long id;
    private String trackingCode;
    private Long orderId;
    private Long shipperId;
    private ShipmentStatus status;
    private String deliveryAddress;
    private String contactName;
    private String contactPhone;
    private String notes;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    public void setId(Long id) { this.id = id; }
    public void setTrackingCode(String trackingCode) { this.trackingCode = trackingCode; }
    public void setOrderId(Long orderId) { this.orderId = orderId; }
    public void setShipperId(Long shipperId) { this.shipperId = shipperId; }
    public void setStatus(ShipmentStatus status) { this.status = status; }
    public void setDeliveryAddress(String deliveryAddress) { this.deliveryAddress = deliveryAddress; }
    public void setContactName(String contactName) { this.contactName = contactName; }
    public void setContactPhone(String contactPhone) { this.contactPhone = contactPhone; }
    public void setNotes(String notes) { this.notes = notes; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }
}
