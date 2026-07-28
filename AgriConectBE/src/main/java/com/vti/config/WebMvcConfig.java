package com.vti.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.nio.file.Path;
import java.nio.file.Paths;

/**
 * WebMvcConfig — Cấu hình phục vụ file tĩnh (ảnh upload)
 *
 * <p>Mục đích: Khi user upload ảnh sản phẩm hoặc tài liệu KYC,
 * file được lưu tại thư mục `uploads/` trên server.
 * Class này cho phép client truy cập file qua URL: /uploads/{filename}
 *
 * <p>Ví dụ:
 * - File lưu tại: ./uploads/products/abc123.jpg
 * - URL truy cập: http://localhost:8080/uploads/products/abc123.jpg
 */
@Configuration
public class WebMvcConfig implements WebMvcConfigurer {

    /**
     * Đăng ký resource handler để phục vụ file từ thư mục uploads/
     *
     * <p>addResourceHandler("/uploads/**"):
     * Mọi request có path bắt đầu bằng /uploads/ sẽ được xử lý ở đây
     *
     * <p>addResourceLocations(uploadPath):
     * Spring sẽ tìm file tại đường dẫn tuyệt đối của thư mục uploads/
     */
    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        // Lấy đường dẫn tuyệt đối của thư mục uploads/ (cùng cấp với ứng dụng)
        Path uploadDir = Paths.get("uploads").toAbsolutePath().normalize();
        String uploadPath = uploadDir.toUri().toString();

        registry.addResourceHandler("/uploads/**")
                .addResourceLocations(uploadPath);
    }
}
