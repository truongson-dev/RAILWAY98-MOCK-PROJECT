package com.vti.module.account.service;

import com.vti.common.PageResponse;
import com.vti.common.enums.AccountStatus;
import com.vti.common.enums.UserRole;
import com.vti.exception.AppException;
import com.vti.exception.ErrorCode;
import com.vti.module.account.dto.AccountDTO;
import com.vti.module.account.dto.UpdateProfileRequest;
import com.vti.module.account.dto.UpdateStatusRequest;
import com.vti.module.account.mapper.AccountMapper;
import com.vti.module.account.repository.AccountRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Cài đặt service quản lý tài khoản.
 */
@Service
@RequiredArgsConstructor
@Slf4j
public class AccountServiceImpl implements AccountService {

    private final AccountRepository accountRepository;
    private final AccountMapper accountMapper;

    @Override
    @Transactional(readOnly = true)
    public PageResponse<AccountDTO> getAll(String keyword, UserRole role, AccountStatus status, Pageable pageable) {
        // Tạm thời gọi findAll, cần triển khai Specification cho việc filter nếu cần
        Page<AccountDTO> pageData = accountRepository.findAll(pageable).map(accountMapper::toDTO);
        return new PageResponse<>(pageData.getContent(), pageData.getNumber(), pageData.getSize(), pageData.getTotalElements(), pageData.getTotalPages());
    }

    @Override
    @Transactional(readOnly = true)
    public AccountDTO getById(Long id) {
        return accountRepository.findById(id)
                .map(accountMapper::toDTO)
                .orElseThrow(() -> new AppException(ErrorCode.ACCOUNT_NOT_FOUND));
    }

    @Override
    @Transactional
    public AccountDTO updateStatus(Long id, UpdateStatusRequest request) {
        var account = accountRepository.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.ACCOUNT_NOT_FOUND));
        
        account.setStatus(request.getStatus());
        // Nếu entity Account có field rejectReason thì lưu thêm vào đây
        // account.setRejectReason(request.getReason());
        
        accountRepository.save(account);
        return accountMapper.toDTO(account);
    }

    @Override
    @Transactional
    public void deleteAccount(Long id) {
        if (!accountRepository.existsById(id)) {
            throw new AppException(ErrorCode.ACCOUNT_NOT_FOUND);
        }
        accountRepository.deleteById(id);
    }

    @Override
    @Transactional(readOnly = true)
    public AccountDTO getProfile(Long currentUserId) {
        return getById(currentUserId);
    }

    @Override
    @Transactional
    public AccountDTO updateProfile(Long currentUserId, UpdateProfileRequest request) {
        var account = accountRepository.findById(currentUserId)
                .orElseThrow(() -> new AppException(ErrorCode.ACCOUNT_NOT_FOUND));
                
        account.setFullName(request.getFullName());
        account.setPhone(request.getPhone());
        account.setProvince(request.getProvince());
        account.setAddress(request.getAddress());
        account.setAvatar(request.getAvatar());
        
        accountRepository.save(account);
        return accountMapper.toDTO(account);
    }
}
