SET FOREIGN_KEY_CHECKS = 0;

TRUNCATE TABLE audit_logs;
TRUNCATE TABLE system_alerts;
TRUNCATE TABLE order_items;
TRUNCATE TABLE shipments;
TRUNCATE TABLE orders;
TRUNCATE TABLE escrow_milestones;
TRUNCATE TABLE escrow_contracts;
TRUNCATE TABLE kyc_documents;
TRUNCATE TABLE kyc_profiles;
TRUNCATE TABLE product_images;
TRUNCATE TABLE products;
TRUNCATE TABLE categories;
TRUNCATE TABLE partners;
TRUNCATE TABLE suppliers;
TRUNCATE TABLE shippers;
TRUNCATE TABLE accounts;
TRUNCATE TABLE group_buys;
TRUNCATE TABLE group_buy_participants;
TRUNCATE TABLE notifications;
TRUNCATE TABLE inventory_batches;
TRUNCATE TABLE warehouses;

SET FOREIGN_KEY_CHECKS = 1;

-- 1. SEED ACCOUNTS (ADMIN, PARTNER, SUPPLIER, SHIPPER)
-- Mật khẩu chung: 123456
SET @pwd = '$2a$12$j3WnFySrxAC4ZdPnI3azG.IedP36BZ1YHNr1Fpz9ZXyke5bfb1eli';

INSERT INTO accounts (email, password, role, status, full_name, created_at) VALUES 
('admin@gmail.com', @pwd, 'ADMIN', 'ACTIVE', 'System Admin', NOW()),
('partner@gmail.com', @pwd, 'PARTNER', 'ACTIVE', 'Global Grains Corp', NOW()),
('supplier@gmail.com', @pwd, 'SUPPLIER', 'ACTIVE', 'Nông trại Sen Vàng', NOW()),
('shipper@gmail.com', @pwd, 'SHIPPER', 'ACTIVE', 'Logistics Phía Nam', NOW());

SET @admin_id = (SELECT id FROM accounts WHERE email = 'admin@gmail.com');
SET @partner_id = (SELECT id FROM accounts WHERE email = 'partner@gmail.com');
SET @supplier_id = (SELECT id FROM accounts WHERE email = 'supplier@gmail.com');
SET @shipper_id = (SELECT id FROM accounts WHERE email = 'shipper@gmail.com');

-- Partner details
INSERT INTO partners (id, taxCode, companyName) VALUES (@partner_id, '1801239981', 'Global Grains Corp');

-- Supplier details
INSERT INTO suppliers (id, farmName, certificate, farmAddress, farmArea, productionCapacity) VALUES (@supplier_id, 'Nông trại Sen Vàng', 'VietGAP, Organic EU', 'Đà Lạt, Lâm Đồng', 15.5, 450.0);

-- Shipper details
INSERT INTO shippers (id, vehicleType, licenseNumber, fleetCapacity) VALUES (@shipper_id, 'Container lạnh -20°C', '29C-123.45', 15);

-- 2. SEED CATEGORIES
INSERT INTO categories (name, description, nameEn, createdAt) VALUES 
('Lúa gạo', 'Các loại lúa gạo tiêu chuẩn', 'Rice', NOW()),
('Trái cây', 'Trái cây nhiệt đới, trái cây đặc sản', 'Fruits', NOW()),
('Rau củ', 'Rau củ quả tươi sạch', 'Vegetables', NOW());

SET @cat_rice = (SELECT id FROM categories WHERE name = 'Lúa gạo');
SET @cat_fruit = (SELECT id FROM categories WHERE name = 'Trái cây');
SET @cat_veg = (SELECT id FROM categories WHERE name = 'Rau củ');

-- 3. SEED PRODUCTS
INSERT INTO products (name, nameEn, description, price, minOrderKg, location, harvestDate, status, category_id, seller_id, unit, rating, reviewsCount, createdAt)
VALUES 
('Gạo ST25 Thượng Hạng', 'Premium ST25 Rice', 'Gạo ngon nhất thế giới', 35000.00, 1000, 'Sóc Trăng', '2023-10-15', 'AVAILABLE', @cat_rice, @supplier_id, 'kg', 5.0, 150, NOW()),
('Sầu Riêng Ri6', 'Ri6 Durian', 'Sầu riêng chuẩn VietGAP, múi vàng hạt lép', 85000.00, 500, 'Đắk Lắk', '2023-11-01', 'AVAILABLE', @cat_fruit, @supplier_id, 'kg', 4.9, 85, NOW()),
('Cà chua Cherry Đà Lạt', 'Da Lat Cherry Tomato', 'Cà chua baby trồng nhà kính', 45000.00, 50, 'Đà Lạt', '2023-11-20', 'AVAILABLE', @cat_veg, @supplier_id, 'kg', 4.7, 120, NOW());

SET @prod_rice = (SELECT id FROM products WHERE name = 'Gạo ST25 Thượng Hạng');
SET @prod_durian = (SELECT id FROM products WHERE name = 'Sầu Riêng Ri6');

-- 4. SEED ORDERS
INSERT INTO orders (orderCode, buyer_id, totalAmount, status, createdAt, shippingAddress, paymentMethod, paymentStatus, supplierName)
VALUES 
('ORD-2023-001', @partner_id, 35000000.00, 'PENDING', NOW(), 'Kho A, Quận 7, TP.HCM', 'BANK', 'UNPAID', 'Nông trại Sen Vàng'),
('ORD-2023-002', @partner_id, 42500000.00, 'SHIPPING', NOW(), 'Kho B, Cần Thơ', 'BANK', 'PAID', 'Nông trại Sen Vàng');

SET @order_1 = (SELECT id FROM orders WHERE orderCode = 'ORD-2023-001');
SET @order_2 = (SELECT id FROM orders WHERE orderCode = 'ORD-2023-002');

-- Order Items
INSERT INTO order_items (order_id, product_id, quantity, price, subtotal, productName)
VALUES 
(@order_1, @prod_rice, 1000, 35000.00, 35000000.00, 'Gạo ST25 Thượng Hạng'),
(@order_2, @prod_durian, 500, 85000.00, 42500000.00, 'Sầu Riêng Ri6');

-- 5. SEED SHIPMENTS
INSERT INTO shipments (trackingCode, order_id, shipper_id, deliveryAddress, status, createdAt, contactName, contactPhone)
VALUES 
('SHIP-001', @order_2, @shipper_id, 'Kho B, Cần Thơ', 'IN_TRANSIT', NOW(), 'Trần Minh Nam', '0988765432');
