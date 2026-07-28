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
        int updated = jdbcTemplate.update("UPDATE accounts SET role = UPPER(role)");
        System.out.println("====== DB FIX RUNNER: Updated " + updated + " rows in accounts table to UPPER(role) ======");
    }
}
