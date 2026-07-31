package com.vti.module.feedback.service;

import com.vti.exception.AppException;
import com.vti.exception.ErrorCode;
import com.vti.module.account.entity.Account;
import com.vti.module.account.repository.AccountRepository;
import com.vti.module.feedback.dto.FeedbackRequest;
import com.vti.module.feedback.entity.ProductFeedback;
import com.vti.module.feedback.repository.FeedbackRepository;
import com.vti.module.product.entity.Product;
import com.vti.module.product.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class FeedbackServiceImpl implements FeedbackService {

    private final FeedbackRepository feedbackRepository;
    private final AccountRepository accountRepository;
    private final ProductRepository productRepository;

    @Override
    public ProductFeedback createFeedback(FeedbackRequest request, Long accountId) {
        Account account = accountRepository.findById(accountId)
                .orElseThrow(() -> new AppException(ErrorCode.ACCOUNT_NOT_FOUND));
        Product product = productRepository.findById(request.getProductId())
                .orElseThrow(() -> new AppException(ErrorCode.PRODUCT_NOT_FOUND));

        ProductFeedback fb = new ProductFeedback();
        fb.setAccount(account);
        fb.setProduct(product);
        fb.setOrderId(request.getOrderId());
        fb.setRating(request.getRating());
        fb.setComment(request.getComment());
        return feedbackRepository.save(fb);
    }

    @Override
    public List<ProductFeedback> getFeedbacksByProduct(Long productId) {
        return feedbackRepository.findByProductId(productId);
    }
}
