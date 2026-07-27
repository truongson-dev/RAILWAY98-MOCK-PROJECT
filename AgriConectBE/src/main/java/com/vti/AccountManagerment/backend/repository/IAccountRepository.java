package com.vti.AccountManagerment.backend.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import com.vti.AccountManagerment.entity.Account;

public interface IAccountRepository extends JpaRepository<Account, Long>, JpaSpecificationExecutor<Account> {

	Optional<Account> findByUsername(String username);

}
