package com.vti;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import org.springframework.jdbc.core.JdbcTemplate;
@Component
public class DbFixer implements CommandLineRunner {
    private final JdbcTemplate jdbcTemplate;
    public DbFixer(JdbcTemplate jdbcTemplate) { this.jdbcTemplate = jdbcTemplate; }
    @Override
    public void run(String... args) throws Exception {
        try {
            jdbcTemplate.execute("DROP TABLE IF EXISTS shipments;");
            System.out.println("DROPPED SHIPMENTS TABLE SUCCESSFULLY");
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
