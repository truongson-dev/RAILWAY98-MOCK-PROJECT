package com.vti.AccountManagement.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import com.vti.AccountManagement.entity.Partner;

public interface IPartnerRepository extends JpaRepository<Partner, Long>, JpaSpecificationExecutor<Partner> {

}
