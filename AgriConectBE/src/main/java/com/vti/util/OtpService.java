package com.vti.util;

import org.springframework.stereotype.Service;

import java.util.Random;

/**
 * Service hỗ trợ tạo mã xác thực.
 */
@Service
public class OtpService {
    
    private final Random random = new Random();

    /**
     * Tạo mã OTP ngẫu nhiên gồm 6 chữ số.
     * 
     * @return Chuỗi OTP
     */
    public String generateOtp() {
        return String.format("%06d", random.nextInt(1000000));
    }
}
