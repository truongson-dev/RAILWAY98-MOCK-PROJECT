package com.vti.AccountManagerment.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import com.vti.AccountManagerment.entity.Account;

public interface IAccountRepository extends JpaRepository<Account, Long>, JpaSpecificationExecutor<Account> {

}
