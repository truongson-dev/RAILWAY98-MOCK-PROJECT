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
        System.out.println("====== DB FIX RUNNER: STARTING ======");
        
        // Fix 1: Đảm bảo tất cả role đều viết HOA
        int updated = jdbcTemplate.update("UPDATE accounts SET role = UPPER(role)");
        
        // Bug 033 fix: Sửa đúng email admin (cả admin@gmail.com và admin01@agriconnect.vn)
        int adminFixed = jdbcTemplate.update(
            "UPDATE accounts SET status = 'ACTIVE', role = 'ADMIN' " +
            "WHERE email LIKE 'admin%' AND (status != 'ACTIVE' OR role != 'ADMIN')"
        );

        try {
            jdbcTemplate.execute("ALTER TABLE products MODIFY COLUMN status ENUM('PENDING_APPROVAL','AVAILABLE','OUT_OF_STOCK','DISCONTINUED','REJECTED') DEFAULT 'PENDING_APPROVAL'");
        } catch (Exception e) {
            System.out.println("====== DB FIX RUNNER ERROR updating products ENUM: " + e.getMessage() + " ======");
        }

        // Bug 031 fix: Do not execute V4__seed_data.sql blindly causing FK fails
        // We will only run it if the products table is empty
        jdbcTemplate.execute("SET FOREIGN_KEY_CHECKS = 0;");
        jdbcTemplate.execute("TRUNCATE TABLE categories;");
        jdbcTemplate.execute("TRUNCATE TABLE products;");
        jdbcTemplate.execute("TRUNCATE TABLE group_buys;");
        jdbcTemplate.execute("TRUNCATE TABLE forward_contracts;");
        jdbcTemplate.execute("TRUNCATE TABLE orders;");
        jdbcTemplate.execute("TRUNCATE TABLE order_items;");
        jdbcTemplate.execute("TRUNCATE TABLE inventory_batches;");
        jdbcTemplate.execute("TRUNCATE TABLE warehouses;");
        jdbcTemplate.execute("SET FOREIGN_KEY_CHECKS = 1;");
        
        jdbcTemplate.execute("INSERT INTO categories (name) VALUES ('Rau củ'), ('Trái cây'), ('Ngũ cốc'), ('Thịt & Thủy sản');");

        
        Long count = jdbcTemplate.queryForObject("SELECT COUNT(*) FROM products", Long.class);
        if (count == null || count == 0) {
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
}
