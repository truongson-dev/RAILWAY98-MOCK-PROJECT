DELETE FROM products;
DELETE FROM categories;
DELETE FROM suppliers;
DELETE FROM accounts WHERE email = 'supplier@gmail.com';

-- Seed Supplier
INSERT INTO accounts (email, password, role, status, full_name, created_at)
VALUES ('supplier@gmail.com', '$2a$12$j3WnFySrxAC4ZdPnI3azG.IedP36BZ1YHNr1Fpz9ZXyke5bfb1eli', 'SUPPLIER', 'ACTIVE', 'Nhà Cung Cấp A', NOW());

-- Get the ID of the inserted supplier
SET @supplier_id = LAST_INSERT_ID();

-- Insert Supplier specific data
INSERT INTO suppliers (id, farm_name, certificate, farm_address)
VALUES (@supplier_id, 'Nông trại A', 'VietGAP', 'Đà Lạt');

-- Seed Category
INSERT INTO categories (name, description, name_en, created_at) VALUES ('Rau củ', 'Các loại rau củ quả tươi', 'Vegetables', NOW());
SET @cat_id = LAST_INSERT_ID();

-- Seed Products
INSERT INTO products (name, name_en, description, price, min_order_kg, location, harvest_date, status, category_id, seller_id, unit, rating, reviews_count, created_at)
VALUES 
('Cà chua Đà Lạt', 'Da Lat Tomato', 'Cà chua chuẩn VietGAP', 25000.00, 100, 'Đà Lạt, Lâm Đồng', '2023-11-20', 'AVAILABLE', @cat_id, @supplier_id, 'kg', 4.8, 120, NOW()),
('Khoai tây', 'Potato', 'Khoai tây tươi Đà Lạt', 18000.00, 500, 'Đà Lạt, Lâm Đồng', '2023-11-15', 'AVAILABLE', @cat_id, @supplier_id, 'kg', 4.5, 80, NOW()),
('Cà rốt', 'Carrot', 'Cà rốt tươi', 15000.00, 200, 'Đức Trọng, Lâm Đồng', '2023-11-18', 'AVAILABLE', @cat_id, @supplier_id, 'kg', 4.6, 95, NOW());
