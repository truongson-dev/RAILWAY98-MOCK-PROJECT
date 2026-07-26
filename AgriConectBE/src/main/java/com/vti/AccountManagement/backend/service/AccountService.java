package com.vti.AccountManagement.backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import com.vti.AccountManagement.backend.repository.IAccountRepository;
import com.vti.AccountManagement.entity.Account;
import com.vti.AccountManagement.specification.AccountSpecification;

@Service
public class AccountService implements IAccountService {

	@Autowired
	private IAccountRepository accountRepository;

	@Override
	public Page<Account> getAllAccount(Pageable pageable, String search) {
		Specification<Account> where = null;

		if (!StringUtils.isEmpty(search)) {
			AccountSpecification idSpecification = new AccountSpecification("id", "LIKE", search);
			AccountSpecification usernameSpecification = new AccountSpecification("username", "LIKE", search);
			AccountSpecification roleSpecification = new AccountSpecification("role", "LIKE", search);

			where = Specification.where(idSpecification).or(usernameSpecification).or(roleSpecification);
		}
		return accountRepository.findAll(where, pageable);
	}

}
