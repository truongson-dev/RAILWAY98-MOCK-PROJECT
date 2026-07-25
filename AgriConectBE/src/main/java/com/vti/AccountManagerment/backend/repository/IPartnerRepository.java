package com.vti.AccountManagerment.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.vti.AccountManagerment.entity.Partner;

public interface IPartnerRepository extends JpaRepository<Partner, Long> {

}
