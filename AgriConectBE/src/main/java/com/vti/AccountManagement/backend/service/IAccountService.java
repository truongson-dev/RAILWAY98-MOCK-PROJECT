package com.vti.AccountManagement.backend.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.vti.AccountManagement.entity.Account;

public interface IAccountService {

	Page<Account> getAllAccount(Pageable pageable, String search);

	Account approveUserEmail(Long id);

}
