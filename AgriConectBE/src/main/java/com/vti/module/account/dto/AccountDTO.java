package com.vti.module.account.dto;

import com.vti.common.enums.AccountStatus;
import com.vti.common.enums.UserRole;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;

/**
 * DTO trả về thông tin tài khoản chung.
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AccountDTO {
    private Long id;
    private String email;
    private String fullName;
    private String phone;
    private String province;
    private String address;
    private String avatar;
    private UserRole role;
    private AccountStatus status;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    
    // Thông tin mở rộng theo role
    
    // Thuộc tính của PARTNER
    private String companyName;
    private String taxCode;
    private String businessType;
    private String businessLicense;
    
    // Thuộc tính của SUPPLIER
    private String farmName;
    private BigDecimal farmArea;
    private String certificate;
    private String farmAddress;
    
    // Thuộc tính của SHIPPER
    private String vehicleType;
    private String licenseNumber;
    private String operatingArea;
    
    // Thuộc tính của ADMIN
    private String department;
}
