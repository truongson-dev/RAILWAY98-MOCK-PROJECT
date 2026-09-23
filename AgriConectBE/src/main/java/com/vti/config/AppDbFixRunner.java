package com.vti.config;

import org.springframework.boot.CommandLineRunner;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;

@Component
public class AppDbFixRunner implements CommandLineRunner {
    private final JdbcTemplate jdbcTemplate;

    public AppDbFixRunner(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public void run(String... args) throws Exception {
        System.out.println("====== DB FIX RUNNER: PRINTING ACCOUNTS ======");
        jdbcTemplate.query("SELECT id, email, role FROM accounts", (rs, rowNum) -> {
            System.out.println("ID: " + rs.getLong("id") + ", Email: " + rs.getString("email") + ", Role: " + rs.getString("role"));
            return null;
        });
        
        // Fix 1: Đảm bảo tất cả role đều viết HOA
        int updated = jdbcTemplate.update("UPDATE accounts SET role = UPPER(role)");
        System.out.println("====== DB FIX RUNNER: Updated " + updated + " rows in accounts table to UPPER(role) ======");

        // Fix 2: Đảm bảo tài khoản admin hệ thống luôn ở trạng thái ACTIVE
        //        (tránh bị vô tình REJECT trong quá trình test)
        int adminFixed = jdbcTemplate.update(
            "UPDATE accounts SET status = 'ACTIVE', role = 'ADMIN' " +
            "WHERE email = 'admin@agriconnect.vn' AND (status != 'ACTIVE' OR role != 'ADMIN')"
        );
        if (adminFixed > 0) {
            System.out.println("====== DB FIX RUNNER: Khôi phục tài khoản admin về ACTIVE (" + adminFixed + " row) ======");
        }

        try {
            jdbcTemplate.execute("ALTER TABLE products MODIFY COLUMN status ENUM('PENDING_APPROVAL','AVAILABLE','OUT_OF_STOCK','DISCONTINUED','REJECTED') DEFAULT 'PENDING_APPROVAL'");
            System.out.println("====== DB FIX RUNNER: Updated products ENUM successfully! ======");
        } catch (Exception e) {
            System.out.println("====== DB FIX RUNNER ERROR updating products ENUM: " + e.getMessage() + " ======");
        }

        try {
            org.springframework.core.io.Resource resource = new org.springframework.core.io.ClassPathResource("db/migration/V4__seed_data.sql");
            String sql = new String(resource.getInputStream().readAllBytes(), java.nio.charset.StandardCharsets.UTF_8);
            String[] statements = sql.split(";");
            for (String stmt : statements) {
                if (!stmt.trim().isEmpty()) {
                    jdbcTemplate.execute(stmt);
                }
            }
            System.out.println("====== DB FIX RUNNER: Executed V4_seed_data.sql successfully! ======");
        } catch (Exception e) {
            System.err.println("Failed to execute seed data: " + e.getMessage());
        }
    }
}
