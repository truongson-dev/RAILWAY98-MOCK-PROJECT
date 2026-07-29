-- ============================================================
-- SCRIPT THÊM DỮ LIỆU MẪU (SEED DATA)
-- Dành cho database: agriconnect_db
-- ============================================================
USE agriconnect_db;

-- Tạm thời tắt kiểm tra khóa ngoại để insert không bị lỗi thứ tự
SET FOREIGN_KEY_CHECKS = 0;

-- Xóa dữ liệu cũ (Tùy chọn: Bỏ comment nếu muốn xóa sạch data cũ trước khi insert)
-- TRUNCATE TABLE order_items;
-- TRUNCATE TABLE orders;
-- TRUNCATE TABLE inventory_batches;
-- TRUNCATE TABLE warehouses;
-- TRUNCATE TABLE products;
-- TRUNCATE TABLE categories;
-- TRUNCATE TABLE shippers;
-- TRUNCATE TABLE partners;
-- TRUNCATE TABLE suppliers;
-- TRUNCATE TABLE admins;
-- TRUNCATE TABLE accounts;

-- ================= SAMPLE DATA =================

-- 1. Thêm Accounts
INSERT INTO accounts(id, email, password, role, status, full_name, phone, address, province) VALUES
(1, 'admin@agri.com', '$2a$10$L1bYV.R7UqSxzE.h2rV8v.jB6h/D0uW9J4X1Z2y3p4q5r6s7t8u9', 'ADMIN', 'ACTIVE', 'System Admin', '0900000001', 'Hai Chau', 'Da Nang'),
(2, 'supplier1@agri.com', '$2a$10$L1bYV.R7UqSxzE.h2rV8v.jB6h/D0uW9J4X1Z2y3p4q5r6s7t8u9', 'SUPPLIER', 'ACTIVE', 'Nguyen Van A', '0900000002', 'Da Lat', 'Lam Dong'),
(3, 'partner1@agri.com', '$2a$10$L1bYV.R7UqSxzE.h2rV8v.jB6h/D0uW9J4X1Z2y3p4q5r6s7t8u9', 'PARTNER', 'ACTIVE', 'Cong ty ABC', '0900000003', 'Hai Chau', 'Da Nang'),
(4, 'shipper1@agri.com', '$2a$10$L1bYV.R7UqSxzE.h2rV8v.jB6h/D0uW9J4X1Z2y3p4q5r6s7t8u9', 'SHIPPER', 'ACTIVE', 'Logistics XYZ', '0900000004', 'Lien Chieu', 'Da Nang');

-- 2. Thêm Chi tiết Role (Admin, Supplier, Partner, Shipper)
INSERT INTO admins(id, department) VALUES (1, 'IT_SUPPORT');

INSERT INTO suppliers(id, farm_name, farm_area, certificate, production_capacity)
VALUES (2, 'Nong trai Da Lat', 12.5, 'VietGAP', 250);

INSERT INTO partners(id, company_name, tax_code, business_type)
VALUES (3, 'Cong ty ABC', '0401234567', 'Ban si');

INSERT INTO shippers(id, vehicle_type, license_number, operating_area)
VALUES (4, 'Xe tai lanh', '43C-12345', 'Mien Trung');

-- 3. Thêm Categories
INSERT INTO categories(id, name, name_en, description) VALUES
(1, 'Rau củ', 'VEGETABLE', 'Rau củ tươi'),
(2, 'Trái cây', 'FRUIT', 'Trái cây tươi');

-- 4. Thêm Products
INSERT INTO products(id, category_id, seller_id, name, price, unit, status, min_order_kg, location, created_at) VALUES
(1, 1, 2, 'Cà rốt', 18000, 'kg', 'AVAILABLE', 50, 'Đà Lạt', NOW()),
(2, 2, 2, 'Bơ sáp', 75000, 'kg', 'AVAILABLE', 20, 'Lâm Đồng', NOW());

-- 5. Thêm Warehouses
INSERT INTO warehouses(id, code, name, type, location, manager_name, status)
VALUES (1, 'WH-DN-01', 'Kho Da Nang', 'COLD', 'Da Nang', 'Tran Van B', 'ACTIVE');

-- 6. Thêm Inventory Batches
INSERT INTO inventory_batches(id, batch_code, warehouse_id, product_id, quantity_kg, quality_grade, status)
VALUES (1, 'BATCH-001', 1, 1, 500, 'A', 'AVAILABLE');

-- 7. Thêm Orders
INSERT INTO orders(id, buyer_id, total_amount, status, shipping_address, payment_method, supplier_name, created_at)
VALUES (1, 3, 900000, 'PENDING', 'Da Nang', 'bank', 'Nong trai Da Lat', NOW());

-- 8. Thêm Order Items
INSERT INTO order_items(id, order_id, product_id, quantity, price, subtotal)
VALUES (1, 1, 1, 50, 18000, 900000);

-- Bật lại kiểm tra khóa ngoại
SET FOREIGN_KEY_CHECKS = 1;

-- ================= HOÀN TẤT =================
