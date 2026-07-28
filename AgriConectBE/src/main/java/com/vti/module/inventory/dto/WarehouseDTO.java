package com.vti.module.inventory.dto;

import com.vti.module.inventory.entity.WarehouseStatus;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class WarehouseDTO {
    private Long id;
    private String name;
    private String location;
    private BigDecimal capacityTons;
    private BigDecimal currentStockTons;
    private boolean temperatureControlled;
    private String managerName;
    private String phone;
    private WarehouseStatus status;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    public void setId(Long id) { this.id = id; }
    public void setName(String name) { this.name = name; }
    public void setLocation(String location) { this.location = location; }
    public void setCapacityTons(BigDecimal capacityTons) { this.capacityTons = capacityTons; }
    public void setCurrentStockTons(BigDecimal currentStockTons) { this.currentStockTons = currentStockTons; }
    public void setTemperatureControlled(boolean temperatureControlled) { this.temperatureControlled = temperatureControlled; }
    public void setManagerName(String managerName) { this.managerName = managerName; }
    public void setPhone(String phone) { this.phone = phone; }
    public void setStatus(WarehouseStatus status) { this.status = status; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }
}
