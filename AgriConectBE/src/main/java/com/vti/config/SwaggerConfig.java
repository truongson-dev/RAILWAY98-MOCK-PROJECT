package com.vti.config;

import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.security.SecurityRequirement;
import io.swagger.v3.oas.models.security.SecurityScheme;
import io.swagger.v3.oas.models.tags.Tag;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.Arrays;

/**
 * Cấu hình Swagger OpenAPI 3.0
 */
@Configuration
public class SwaggerConfig {

    @Bean
    public OpenAPI customOpenAPI() {
        // Tên của Security Scheme
        final String securitySchemeName = "Bearer Auth";

        return new OpenAPI()
                // Cấu hình thông tin cơ bản
                .info(new Info()
                        .title("AgriConnect API")
                        .description("Sàn giao dịch nông sản B2B")
                        .version("2.0"))
                // Định nghĩa Security Scheme (JWT Bearer)
                .components(new Components()
                        .addSecuritySchemes(securitySchemeName,
                                new SecurityScheme()
                                        .name(securitySchemeName)
                                        .type(SecurityScheme.Type.HTTP)
                                        .scheme("bearer")
                                        .bearerFormat("JWT")))
                // Yêu cầu xác thực cho tất cả API (sẽ sử dụng Scheme định nghĩa ở trên)
                .addSecurityItem(new SecurityRequirement().addList(securitySchemeName))
                // Định nghĩa các thẻ (Tags) để gom nhóm API
                .tags(Arrays.asList(
                        new Tag().name("Authentication").description("Các API liên quan đến xác thực và phân quyền"),
                        new Tag().name("Admin").description("Các API dành riêng cho Quản trị viên"),
                        new Tag().name("Partner").description("Các API dành cho Đối tác (Partner)"),
                        new Tag().name("Public").description("Các API công khai, không cần xác thực")
                ));
    }
}
