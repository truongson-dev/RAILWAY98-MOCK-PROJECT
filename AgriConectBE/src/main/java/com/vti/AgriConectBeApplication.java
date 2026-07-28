package com.vti;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.scheduling.annotation.EnableAsync;

import io.github.cdimascio.dotenv.Dotenv;

@SpringBootApplication
// Bật xử lý bất đồng bộ cho các tác vụ như gửi email
@EnableAsync
public class AgriConectBeApplication {

	public static void main(String[] args) {
		Dotenv dotenv = Dotenv.configure().ignoreIfMissing().load();
		dotenv.entries().forEach(entry -> System.setProperty(entry.getKey(), entry.getValue()));

		SpringApplication.run(AgriConectBeApplication.class, args);
        System.out.println("""
                ╔════════════════════════════════════════════════════════╗
                ║   🌾 AgriConnect Backend v1.0 đã khởi động             ║
                ║   📖 Swagger UI: http://localhost:8080/swagger-ui.html ║
                ╚════════════════════════════════════════════════════════╝
                """);
	}
}

