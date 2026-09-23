-- ==========================================
-- SEED DATA CHO AGRICONNECT (PHỤC VỤ DEMO)
-- ==========================================

-- 1. Xóa dữ liệu cũ (nếu có, để tránh trùng lặp)
-- Không xóa accounts vì Flyway V1 đã insert Admin, Partner, Supplier, Shipper
DELETE FROM order_items;
DELETE FROM orders;
DELETE FROM group_buys;
DELETE FROM products;

-- 3. Thêm Products (Supplier ID = 3, vì V1 insert ID 3 cho Supplier)
INSERT INTO products (name, description, price, unit, min_order_kg, location, harvest_date, status, category_id, seller_id) VALUES
('Cà chua Đà Lạt', 'Cà chua baby trồng nhà kính tại Đà Lạt, chuẩn VietGAP', 25000, 'kg', 50, 'Lâm Đồng', '2026-10-01', 'AVAILABLE', 2, 3),
('Khoai lang mật', 'Khoai lang mật Tà Nung chín đỏ, ngọt lịm', 15000, 'kg', 100, 'Lâm Đồng', '2026-09-25', 'AVAILABLE', 2, 3),
('Dâu tây Mộc Châu', 'Dâu tây hái tại vườn, giống Nhật Hàn', 120000, 'kg', 10, 'Sơn La', '2026-10-15', 'AVAILABLE', 3, 3),
('Gạo ST25 Sóc Trăng', 'Gạo lúa tôm chính gốc Sóc Trăng', 35000, 'kg', 200, 'Sóc Trăng', '2026-11-20', 'AVAILABLE', 4, 3);

-- 4. Thêm Group Buy (Mô phỏng Mua Chung)
-- Cà chua Đà Lạt
INSERT INTO group_buys (product_id, title, target_quantity, current_quantity, discount_price, original_price, discount_percent, participants_count, start_date, end_date, status) VALUES
(1, 'Gom đơn Cà chua baby VietGAP - Giá tận vườn', 500, 200, 20000, 25000, 20, 5, '2026-09-01', '2026-10-01', 'OPEN');

-- Gạo ST25
INSERT INTO group_buys (product_id, title, target_quantity, current_quantity, discount_price, original_price, discount_percent, participants_count, start_date, end_date, status) VALUES
(4, 'Mua chung Gạo ST25 - Tặng kèm cẩm nang nấu', 1000, 800, 31000, 35000, 11, 12, '2026-09-15', '2026-10-15', 'OPEN');

-- 5. Thêm Forward Contracts (Hợp đồng tương lai)
-- Chú ý: Cần thêm bảng forward_contracts, ID của seller là 3 (Supplier)
INSERT INTO forward_contracts (contract_code, crop_name, farm_name, location, expected_harvest, estimated_quantity_kg, contract_price_vnd, deposit_percent, status, created_by) VALUES
('FWD-001', 'Sầu riêng Ri6', 'Trang trại Chú Tư', 'Bến Tre', '2027-05-15', 5000, 75000, 30, 'OPEN', 3),
('FWD-002', 'Bưởi Da Xanh', 'Nông trại Hữu cơ Bến Tre', 'Bến Tre', '2027-01-20', 2000, 45000, 20, 'OPEN', 3);

-- 6. Thêm Orders (Đơn hàng)
-- Partner (ID=2) mua của Supplier (ID=3)
INSERT INTO orders (order_code, total_amount, status, payment_method, payment_status, shipping_address, estimated_delivery, buyer_id) VALUES
('ORD-TEST-001', 500000, 'pending', 'bank', 'unpaid', '123 Nguyễn Văn Linh, Quận 7, TP.HCM', '2026-09-30', 2),
('ORD-TEST-002', 1200000, 'shipping', 'credit_30', 'unpaid', '456 Lê Lợi, Quận 1, TP.HCM', '2026-09-28', 2);

-- Order Items
-- Cho ORD-TEST-001 (mua 20kg Cà chua)
INSERT INTO order_items (order_id, product_id, product_name, quantity, price, subtotal) VALUES
(1, 1, 'Cà chua Đà Lạt', 20, 25000, 500000);

-- Cho ORD-TEST-002 (mua 10kg Dâu tây)
INSERT INTO order_items (order_id, product_id, product_name, quantity, price, subtotal) VALUES
(2, 3, 'Dâu tây Mộc Châu', 10, 120000, 1200000);

-- Thêm vào Inventory / Warehouses cho Shipper & Supplier Dashboard
INSERT INTO warehouses (name, address, capacity_kg, status, supplier_id) VALUES
('Kho trung chuyển miền Nam', 'Bình Chánh, TP.HCM', 10000, 'ACTIVE', 3),
('Kho phân loại Quận 7', 'Quận 7, TP.HCM', 5000, 'ACTIVE', 3);

INSERT INTO inventory_batches (batch_code, product_id, warehouse_id, quantity_kg, date_in, status, harvest_date) VALUES
('BATCH-CA-01', 1, 1, 500, '2026-09-20', 'AVAILABLE', '2026-09-18'),
('BATCH-KHOAI-01', 2, 2, 1000, '2026-09-22', 'AVAILABLE', '2026-09-21');
