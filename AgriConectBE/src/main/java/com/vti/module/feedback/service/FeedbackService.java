package com.vti.module.feedback.service;

import com.vti.module.feedback.dto.FeedbackRequest;
import com.vti.module.feedback.entity.ProductFeedback;

import java.util.List;

public interface FeedbackService {
    ProductFeedback createFeedback(FeedbackRequest request, Long accountId);
    List<ProductFeedback> getFeedbacksByProduct(Long productId);
}
