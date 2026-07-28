package com.vti.module.account.repository;

import com.vti.common.enums.AccountStatus;
import com.vti.common.enums.UserRole;
import com.vti.module.account.entity.Account;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AccountRepository extends JpaRepository<Account, Long> {
    long countByRole(UserRole role);
    long countByRoleAndStatus(UserRole role, AccountStatus status);
    long countByStatus(AccountStatus status);
    java.util.Optional<Account> findByEmail(String email);
    boolean existsByEmail(String email);
}
