package com.vti.module.inventory.entity;

import jakarta.persistence.*;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name="warehouses")
@EntityListeners(AuditingEntityListener.class)
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Warehouse {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Tên kho
    private String name;
    
    // Vị trí kho
    private String location;
    
    // Sức chứa (tấn)
    @Column(name="capacity_tons")
    private BigDecimal capacityTons;
    
    // Khối lượng hàng hiện tại (tấn)
    @Column(name="current_stock_tons")
    private BigDecimal currentStockTons;
    
    // Có kiểm soát nhiệt độ không
    @Column(name="temperature_controlled")
    private boolean temperatureControlled;
    
    // Tên người quản lý
    @Column(name="manager_name")
    private String managerName;
    
    // Số điện thoại
    private String phone;
    
    // Trạng thái kho
    @Enumerated(EnumType.STRING)
    private WarehouseStatus status;

    @CreatedDate
    @Column(name="created_at", updatable = false)
    private LocalDateTime createdAt;

    @LastModifiedDate
    @Column(name="updated_at")
    private LocalDateTime updatedAt;

    public void setName(String name) { this.name = name; }
    public void setLocation(String location) { this.location = location; }
    public void setCapacityTons(BigDecimal capacityTons) { this.capacityTons = capacityTons; }
    public void setCurrentStockTons(BigDecimal currentStockTons) { this.currentStockTons = currentStockTons; }
    public void setTemperatureControlled(boolean temperatureControlled) { this.temperatureControlled = temperatureControlled; }
    public void setManagerName(String managerName) { this.managerName = managerName; }
    public void setPhone(String phone) { this.phone = phone; }
    public void setStatus(WarehouseStatus status) { this.status = status; }

    public Long getId() { return id; }
    public String getName() { return name; }
    public String getLocation() { return location; }
    public BigDecimal getCapacityTons() { return capacityTons; }
    public BigDecimal getCurrentStockTons() { return currentStockTons; }
    public boolean isTemperatureControlled() { return temperatureControlled; }
    public String getManagerName() { return managerName; }
    public String getPhone() { return phone; }
    public WarehouseStatus getStatus() { return status; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public LocalDateTime getUpdatedAt() { return updatedAt; }
}
