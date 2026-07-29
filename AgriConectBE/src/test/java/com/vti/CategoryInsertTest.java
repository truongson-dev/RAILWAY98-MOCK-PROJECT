package com.vti;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.jdbc.core.JdbcTemplate;

@SpringBootTest
public class CategoryInsertTest {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Test
    public void insertCategories() {
        String sql = "INSERT IGNORE INTO categories (id, name, name_en, description) VALUES " +
                "(1, 'Trái cây ăn quả', 'Fruits', 'Các loại trái cây tươi'), " +
                "(2, 'Cây công nghiệp', 'Industrial Crops', 'Cà phê, tiêu, điều...'), " +
                "(3, 'Lúa gạo & Lương thực', 'Rice & Grains', 'Lúa gạo và các loại ngũ cốc'), " +
                "(4, 'Rau củ quả sạch', 'Vegetables', 'Rau củ hữu cơ, an toàn')";
        jdbcTemplate.execute(sql);
        System.out.println("====== INSERTED CATEGORIES SUCCESSFULLY ======");
    }
}
