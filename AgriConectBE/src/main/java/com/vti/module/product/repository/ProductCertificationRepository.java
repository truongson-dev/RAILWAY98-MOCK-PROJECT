package com.vti.module.product.repository;

import com.vti.module.product.entity.ProductCertification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductCertificationRepository extends JpaRepository<ProductCertification, Long> {
}
