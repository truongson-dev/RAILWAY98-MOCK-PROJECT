package com.vti.module.inventory.dto;

import lombok.*;

import java.math.BigDecimal;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CreateWarehouseRequest {
    private String name;
    private String location;
    private BigDecimal capacityTons;
    private boolean temperatureControlled;
    private String managerName;
    private String phone;

    public String getName() { return name; }
    public String getLocation() { return location; }
    public BigDecimal getCapacityTons() { return capacityTons; }
    public boolean isTemperatureControlled() { return temperatureControlled; }
    public String getManagerName() { return managerName; }
    public String getPhone() { return phone; }
}
