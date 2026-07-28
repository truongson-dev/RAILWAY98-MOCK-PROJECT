package com.vti.module.account.mapper;

import com.vti.module.account.dto.AccountDTO;
import com.vti.module.account.entity.Account;
import com.vti.module.account.entity.Partner;
import com.vti.module.account.entity.Supplier;
import com.vti.module.account.entity.Shipper;
import org.mapstruct.Mapper;

/**
 * Mapper để chuyển đổi Entity Account sang DTO.
 */
@Mapper(componentModel = "spring", builder = @org.mapstruct.Builder(disableBuilder = true))
public interface AccountMapper {
    
    /**
     * Chuyển đổi từ Account Entity sang AccountDTO.
     * Các trường phụ thuộc subclass có thể xử lý map chi tiết hơn nếu cần.
     * 
     * @param account Entity tài khoản
     * @return DTO tài khoản
     */
    AccountDTO toDTO(Account account);
    
    @org.mapstruct.AfterMapping
    default void mapSubclassFields(Account account, @org.mapstruct.MappingTarget AccountDTO dto) {
        if (account instanceof Partner) {
            Partner p = (Partner) account;
            dto.setCompanyName(p.getCompanyName());
            dto.setTaxCode(p.getTaxCode());
            dto.setBusinessType(p.getBusinessType());
            dto.setBusinessLicense(p.getBusinessLicense());
        } else if (account instanceof Supplier) {
            Supplier s = (Supplier) account;
            dto.setFarmName(s.getFarmName());
            if (s.getFarmArea() != null) {
                dto.setFarmArea(java.math.BigDecimal.valueOf(s.getFarmArea()));
            }
            dto.setCertificate(s.getCertificate());
            dto.setFarmAddress(s.getFarmAddress());
        } else if (account instanceof Shipper) {
            Shipper sh = (Shipper) account;
            dto.setVehicleType(sh.getVehicleType());
            dto.setLicenseNumber(sh.getLicenseNumber());
            dto.setOperatingArea(sh.getOperatingArea());
        }
    }
}
