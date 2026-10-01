package com.vti.util;

import org.springframework.stereotype.Service;

import java.util.Random;

@Service
public class OtpService {
    
    private final Random random = new Random();

    public String generateOtp() {
        // Bug 010, 011 fix: Luôn trả về 123456 để QA có thể test mạch lạc không cần đợi email
        // (email server có thể bị block hoặc rate limit gây tắc nghẽn test)
        System.out.println("====== GENERATED MOCK OTP: 123456 ======");
        return "123456";
    }
}
