package com.vti.module.feedback.controller;

import com.vti.common.ApiResponse;
import com.vti.module.feedback.dto.FeedbackRequest;
import com.vti.module.feedback.service.FeedbackService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/feedbacks")
@RequiredArgsConstructor
public class FeedbackController {

    private final FeedbackService feedbackService;

    @PostMapping
    public ResponseEntity<ApiResponse<Object>> createFeedback(
            @RequestBody FeedbackRequest request,
            @RequestAttribute("accountId") Long accountId) {
        return ResponseEntity.ok(ApiResponse.success(feedbackService.createFeedback(request, accountId)));
    }

    @GetMapping("/product/{productId}")
    public ResponseEntity<ApiResponse<Object>> getFeedbacksByProduct(@PathVariable Long productId) {
        return ResponseEntity.ok(ApiResponse.success(feedbackService.getFeedbacksByProduct(productId)));
    }
}
