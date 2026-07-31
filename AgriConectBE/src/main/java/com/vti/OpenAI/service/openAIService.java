package com.vti.OpenAI.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class openAIService {

	@Value("${openai.api.key}")
	private String apiKey;

	@Value("${openai.api.url}")
	private String apiUrl;

	public String getInventoryPrediction(String jsonInventory) {
		RestTemplate restTemplate = new RestTemplate();

		// 1. Thiết lập Header
		HttpHeaders headers = new HttpHeaders();
		headers.setContentType(MediaType.APPLICATION_JSON);
		headers.setBearerAuth(apiKey);

		// 2. Xây dựng nội dung Prompt và dữ liệu gửi đi
		String prompt = "Dựa trên danh sách hàng tồn kho dưới đây dưới dạng JSON, hãy phân tích và đưa ra dự đoán/đề xuất nhập hàng:\n"
				+ jsonInventory;

		Map<String, Object> message = new HashMap<>();
		message.put("role", "user");
		message.put("content", prompt);

		Map<String, Object> body = new HashMap<>();
		body.put("model", "gpt-3.5-turbo");
		body.put("messages", List.of(message));
		body.put("temperature", 0.7);

		HttpEntity<Map<String, Object>> entity = new HttpEntity<>(body, headers);

		try {
			// 3. Gọi API OpenAI sử dụng biến cấu hình apiUrl
			ResponseEntity<Map> response = restTemplate.postForEntity(apiUrl, entity, Map.class);

			// 4. Bóc tách kết quả trả về từ cấu trúc JSON của OpenAI
			if (response.getStatusCode() == HttpStatus.OK && response.getBody() != null) {
				List<Map<String, Object>> choices = (List<Map<String, Object>>) response.getBody().get("choices");
				if (choices != null && !choices.isEmpty()) {
					Map<String, Object> firstChoice = choices.get(0);
					Map<String, Object> msg = (Map<String, Object>) firstChoice.get("message");
					return (String) msg.get("content");
				}
			}
		} catch (Exception e) {
			throw new RuntimeException("Lỗi khi kết nối tới OpenAI API: " + e.getMessage());
		}

		return "Không thể nhận được phản hồi từ AI.";
	}

}
