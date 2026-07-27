package com.vti.AccountManagerment.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import com.vti.AccountManagerment.entity.Partner;

public interface IPartnerRepository extends JpaRepository<Partner, Long>, JpaSpecificationExecutor<Partner> {

}
