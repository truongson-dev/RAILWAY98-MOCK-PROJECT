package com.vti.config;

import org.springframework.boot.CommandLineRunner;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;

@Component
public class DbFixRunner implements CommandLineRunner {
    private final JdbcTemplate jdbcTemplate;

    public DbFixRunner(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public void run(String... args) throws Exception {
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
    }
}
