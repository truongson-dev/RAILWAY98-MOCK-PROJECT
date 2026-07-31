package com.vti.module.feedback.repository;

import com.vti.module.feedback.entity.ProductFeedback;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FeedbackRepository extends JpaRepository<ProductFeedback, Long> {
    List<ProductFeedback> findByProductId(Long productId);
}
