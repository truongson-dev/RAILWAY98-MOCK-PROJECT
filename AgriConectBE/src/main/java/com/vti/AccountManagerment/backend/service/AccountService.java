package com.vti.AccountManagerment.backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import com.vti.AccountManagerment.backend.repository.IAccountRepository;
import com.vti.AccountManagerment.entity.Account;
import com.vti.AccountManagerment.entity.AccountStatus;
import com.vti.AccountManagerment.specification.AccountSpecification;

@Service
public class AccountService implements IAccountService {

	@Autowired
	private IAccountRepository accountRepository;

	@Autowired
	private EmailService emailService;

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

	@Override
	public Account approveUserEmail(Long id) {
		Account account = accountRepository.findById(id)
				.orElseThrow(() -> new RuntimeException("Account not found with id: " + id));

		account.setStatus(AccountStatus.ACTIVE);
		Account updated = accountRepository.save(account);

		emailService.sendApprovalEmail(updated.getEmail(), updated.getUsername());

		return updated;
	}

	@Override
	public Account rejectUserEmail(Long id) {
		Account account = accountRepository.findById(id)
				.orElseThrow(() -> new RuntimeException("Account not found with id: " + id));

		if (account.getStatus() != AccountStatus.PENDING) {
			throw new RuntimeException("Chỉ có thể từ chối tài khoản đang ở trạng thái PENDING");
		}

		account.setStatus(AccountStatus.REJECTED);
		Account updated = accountRepository.save(account);

		emailService.sendRejectionEmail(updated.getEmail(), updated.getUsername());

		return updated;
	}

	@Override
	public Account lockUserEmail(Long id) {
		Account account = accountRepository.findById(id)
				.orElseThrow(() -> new RuntimeException("Account not found with id: " + id));

		if (account.getStatus() != AccountStatus.ACTIVE) {
			throw new RuntimeException("Chỉ có thể khoá tài khoản đang ở trạng thái ACTIVE");
		}

		account.setStatus(AccountStatus.LOCKED);
		Account updated = accountRepository.save(account);

		emailService.sendLockEmail(updated.getEmail(), updated.getUsername());

		return updated;
	}

}
