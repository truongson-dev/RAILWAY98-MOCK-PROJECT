package com.vti.config;

import com.vti.module.product.entity.Category;
import com.vti.module.product.repository.CategoryRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@RequiredArgsConstructor
@Slf4j
public class DatabaseSeeder implements CommandLineRunner {

    private final CategoryRepository categoryRepository;

    @Override
    public void run(String... args) throws Exception {
        if (categoryRepository.count() == 0) {
            log.info("Seeding initial categories into database...");
            Category vegetables = new Category();
            vegetables.setName("Rau củ");
            vegetables.setNameEn("Vegetables");
            vegetables.setDescription("Các loại rau xanh và củ");

            Category fruits = new Category();
            fruits.setName("Trái cây");
            fruits.setNameEn("Fruits");
            fruits.setDescription("Trái cây tươi các loại");

            Category grains = new Category();
            grains.setName("Ngũ cốc");
            grains.setNameEn("Grains");
            grains.setDescription("Các loại hạt và ngũ cốc");

            Category roots = new Category();
            roots.setName("Củ quả");
            roots.setNameEn("Roots");
            roots.setDescription("Nông sản dạng củ và quả");

            categoryRepository.saveAll(List.of(vegetables, fruits, grains, roots));
            log.info("Categories seeded successfully.");
        }
    }
}
