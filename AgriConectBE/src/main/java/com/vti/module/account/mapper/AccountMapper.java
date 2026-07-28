package com.vti.module.account.mapper;

import com.vti.module.account.dto.AccountDTO;
import com.vti.module.account.entity.Account;
import org.mapstruct.Mapper;

/**
 * Mapper để chuyển đổi Entity Account sang DTO.
 */
@Mapper(componentModel = "spring")
public interface AccountMapper {
    
    /**
     * Chuyển đổi từ Account Entity sang AccountDTO.
     * Các trường phụ thuộc subclass có thể xử lý map chi tiết hơn nếu cần.
     * 
     * @param account Entity tài khoản
     * @return DTO tài khoản
     */
    AccountDTO toDTO(Account account);
}
