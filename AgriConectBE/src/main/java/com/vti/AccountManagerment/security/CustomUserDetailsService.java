package com.vti.AccountManagerment.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.vti.AccountManagerment.backend.repository.IAccountRepository;
import com.vti.AccountManagerment.entity.Account;

@Service
public class CustomUserDetailsService implements UserDetailsService {

	@Autowired
	private IAccountRepository accountRepository;

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		Account account = accountRepository.findByUsername(username)
				.orElseThrow(() -> new UsernameNotFoundException("User not found with username: " + username));
		return new UserPrincipal(account);
	}
}
