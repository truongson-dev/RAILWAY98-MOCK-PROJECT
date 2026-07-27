package com.vti.AccountManagerment.backend.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.vti.AccountManagerment.entity.Account;

public interface IAccountService {

	Page<Account> getAllAccount(Pageable pageable, String search);

	Account approveUserEmail(Long id);

	Account rejectUserEmail(Long id);

	Account lockUserEmail(Long id);

}
