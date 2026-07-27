package com.vti;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.scheduling.annotation.EnableAsync;

/**
 * AgriConnect Backend — Điểm khởi động ứng dụng Spring Boot
 *
 * <p>Đây là class chính (entry point) của toàn bộ ứng dụng.
 * Khi chạy class này, Spring Boot sẽ:
 * 1. Quét toàn bộ package com.vti để tìm Bean (@Component, @Service, @Repository, @Controller)
 * 2. Kết nối Database MySQL qua cấu hình application.properties
 * 3. Chạy Flyway migration để tạo/cập nhật schema Database
 * 4. Khởi động server HTTP tại cổng 8080
 * 5. Kích hoạt Spring Security với JWT và OAuth2
 */
@SpringBootApplication
// Bật xử lý bất đồng bộ cho các tác vụ như gửi email
@EnableAsync
public class AgriConectBeApplication {

    public static void main(String[] args) {
        SpringApplication.run(AgriConectBeApplication.class, args);
        System.out.println("""
                ╔═══════════════════════════════════════════════╗
                ║   🌾 AgriConnect Backend v2.0 đã khởi động   ║
                ║   📖 Swagger UI: http://localhost:8080/swagger-ui.html ║
                ╚═══════════════════════════════════════════════╝
                """);
    }
}
