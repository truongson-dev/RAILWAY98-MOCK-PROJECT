package com.vti.AccountManagerment.backend.controller;

import java.util.function.Function;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.vti.AccountManagerment.backend.service.IAccountService;
import com.vti.AccountManagerment.dto.AccountDTO;
import com.vti.AccountManagerment.entity.Account;

@RestController
@RequestMapping("/api/v1/accounts")
@CrossOrigin(origins = "*")
public class AccountController {

	@Autowired
	private IAccountService accountService;

	@GetMapping
	public ResponseEntity<?> getAllAccount(Pageable pageable, @RequestParam(required = false) String search) {
		Page<Account> pageAccounts = accountService.getAllAccount(pageable, search);

		Page<AccountDTO> pageAccountDtos = pageAccounts.map(new Function<Account, AccountDTO>() {
			@Override
			public AccountDTO apply(Account account) {
				AccountDTO accountDto = new AccountDTO();
				accountDto.setId(account.getId());
				accountDto.setPhoneNumber(account.getPhoneNumber());
				accountDto.setEmail(account.getEmail());
				accountDto.setUsername(account.getUsername());
				accountDto.setRole(account.getRole());
				accountDto.setStatus(account.getStatus().name());
				return accountDto;
			}
		});

		return new ResponseEntity<>(pageAccountDtos, HttpStatus.OK);
	}

	@PutMapping("/{id}/active")
	public ResponseEntity<AccountDTO> approve(@PathVariable Long id) {
		Account account = accountService.approveUserEmail(id);

		return ResponseEntity.ok(toAccountDto(account));
	}

	@PutMapping("/{id}/rejected")
	public ResponseEntity<AccountDTO> reject(@PathVariable Long id) {
		Account account = accountService.rejectUserEmail(id);
		return ResponseEntity.ok(toAccountDto(account));
	}

	@PutMapping("/{id}/locked")
	public ResponseEntity<AccountDTO> lock(@PathVariable Long id) {
		Account account = accountService.lockUserEmail(id);
		return ResponseEntity.ok(toAccountDto(account));
	}

	private AccountDTO toAccountDto(Account account) {
		AccountDTO accountDto = new AccountDTO();
		accountDto.setId(account.getId());
		accountDto.setUsername(account.getUsername());
		accountDto.setEmail(account.getEmail());
		accountDto.setPhoneNumber(account.getPhoneNumber());
		accountDto.setRole(account.getRole());
		accountDto.setStatus(account.getStatus().name());
		return accountDto;
	}

}
