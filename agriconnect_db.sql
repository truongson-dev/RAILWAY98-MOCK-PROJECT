-- Tạo database cho dự án AgriConnect
DROP DATABASE IF EXISTS agriconnect_db;
CREATE DATABASE agriconnect_db;
USE agriconnect_db;

-- 1. Account (Tài khoản)
DROP TABLE IF EXISTS `account`;
CREATE TABLE `account` (
    `id` BIGINT AUTO_INCREMENT PRIMARY KEY,
    `email` VARCHAR(100) NOT NULL UNIQUE,
    `phone_number` NVARCHAR(13) NOT NULL UNIQUE,
    `username` VARCHAR(50) NOT NULL UNIQUE,	
    `password` VARCHAR(255) NOT NULL,
    `role` ENUM('SUPPLIER', 'PARTNER', 'SHIPPER', 'ADMIN') NOT NULL,
    `status` ENUM('PENDING', 'ACTIVE', 'LOCKED', 'REJECTED') DEFAULT 'PENDING' COMMENT "PENDING: Vừa đăng ký, chờ admin duyệt
																						ACTIVE: Đã duyệt, hoạt động bình thường 
                                                                                        LOCKED: Bị khoá (do vi phạm, hoặc admin chủ động khoá)
                                                                                        REJECTED: Bị từ chối duyệt (tuỳ chọn — hoặc dùng LOCKED luôn cho gọn, tuỳ bạn)"
);

-- 2.1 Supplier
DROP TABLE IF EXISTS `supplier`;
CREATE TABLE `supplier` (
    `supplier_id` BIGINT PRIMARY KEY,
    `farm_name` VARCHAR(255) NOT NULL,
    `farm_area` DECIMAL(15, 2) NOT NULL,
    `certificate` VARCHAR(255) NOT NULL UNIQUE,
    `production_capacity` DECIMAL(15, 2),
    FOREIGN KEY (`supplier_id`) REFERENCES `account`(`id`) ON DELETE CASCADE
);

-- 2.2 Partner
DROP TABLE IF EXISTS `partner`;
CREATE TABLE `partner` (
    `partner_id` BIGINT PRIMARY KEY,
    `company_name` VARCHAR(255) NOT NULL,
    `tax_code` VARCHAR(50) NOT NULL,
    `business_type` VARCHAR(100) NOT NULL,
    FOREIGN KEY (`partner_id`) REFERENCES `account`(`id`) ON DELETE CASCADE
);

-- 2.3 Shipper
DROP TABLE IF EXISTS `shipper`;
CREATE TABLE `shipper` (
    `shipper_id` BIGINT PRIMARY KEY,
    `vehicle_type` VARCHAR(50) NOT NULL,
    `license_number` VARCHAR(50) NOT NULL UNIQUE,
    `operating_area` VARCHAR(255) NOT NULL,
    FOREIGN KEY (`shipper_id`) REFERENCES `account`(`id`) ON DELETE CASCADE
);

-- 3. Profile (Hồ sơ người dùng)
CREATE TABLE IF NOT EXISTS `profile` (
    `id` BIGINT AUTO_INCREMENT PRIMARY KEY,
    `account_id` BIGINT NOT NULL UNIQUE,
    `full_name` VARCHAR(100) NOT NULL,
    `phone` VARCHAR(20),
    `email` VARCHAR(100),
    `address` VARCHAR(255),
    `avatar` VARCHAR(255),
    FOREIGN KEY (`account_id`) REFERENCES `account`(`id`) ON DELETE CASCADE
);

-- 4. Category (Danh mục)
CREATE TABLE IF NOT EXISTS `category` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(100) NOT NULL,
    `parent_id` INT,
    FOREIGN KEY (`parent_id`) REFERENCES `category`(`id`)
);

-- 5. Product (Sản phẩm)
CREATE TABLE IF NOT EXISTS `product` (
    `id` BIGINT AUTO_INCREMENT PRIMARY KEY,
    `category_id` INT NOT NULL,
    `seller_id` BIGINT NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    `description` TEXT,
    `price` DECIMAL(15, 2) NOT NULL,
    `unit` VARCHAR(50),
    `status` VARCHAR(50) DEFAULT 'AVAILABLE',
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (`category_id`) REFERENCES `category`(`id`),
    FOREIGN KEY (`seller_id`) REFERENCES `supplier`(`supplier_id`)
);

-- 6. Product_Image (Hình ảnh sản phẩm)
CREATE TABLE IF NOT EXISTS `product_image` (
    `id` BIGINT AUTO_INCREMENT PRIMARY KEY,
    `product_id` BIGINT NOT NULL,
    `image_url` VARCHAR(255) NOT NULL,
    `is_primary` BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (`product_id`) REFERENCES `product`(`id`) ON DELETE CASCADE
);

-- 7. Certificate (Chứng chỉ sản phẩm/nông sản)
CREATE TABLE IF NOT EXISTS `certificate` (
    `id` BIGINT AUTO_INCREMENT PRIMARY KEY,
    `product_id` BIGINT NOT NULL,
    `name` VARCHAR(100) NOT NULL,
    `issued_by` VARCHAR(100),
    `valid_until` DATE,
    `image_url` VARCHAR(255),
    FOREIGN KEY (`product_id`) REFERENCES `product`(`id`) ON DELETE CASCADE
);

-- 8. Inventory_Batch (Lô hàng tồn kho/thu hoạch)
CREATE TABLE IF NOT EXISTS `inventory_batch` (
    `id` BIGINT AUTO_INCREMENT PRIMARY KEY,
    `product_id` BIGINT NOT NULL,
    `quantity` DECIMAL(15, 2) NOT NULL,
    `min_stock_level` DECIMAL(15, 2) DEFAULT 10,
    `harvest_date` DATE,
    `expiry_date` DATE,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (`product_id`) REFERENCES `product`(`id`)
);

-- 9. Order (Đơn đặt hàng)
CREATE TABLE IF NOT EXISTS `orders` (
    `id` BIGINT AUTO_INCREMENT PRIMARY KEY,
    `buyer_id` BIGINT NOT NULL,
    `total_amount` DECIMAL(15, 2) NOT NULL,
    `status` VARCHAR(50) DEFAULT 'PENDING',
    `shipping_address` VARCHAR(255),
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (`buyer_id`) REFERENCES `account`(`id`)
);

-- 10. Order_Item (Chi tiết đơn hàng)
CREATE TABLE IF NOT EXISTS `order_item` (
    `id` BIGINT AUTO_INCREMENT PRIMARY KEY,
    `order_id` BIGINT NOT NULL,
    `product_id` BIGINT NOT NULL,
    `quantity` DECIMAL(15, 2) NOT NULL,
    `price` DECIMAL(15, 2) NOT NULL,
    FOREIGN KEY (`order_id`) REFERENCES `orders`(`id`) ON DELETE CASCADE,
    FOREIGN KEY (`product_id`) REFERENCES `product`(`id`)
);

-- 11. Group_Buy (Chiến dịch mua chung)
CREATE TABLE IF NOT EXISTS `group_buy` (
    `id` BIGINT AUTO_INCREMENT PRIMARY KEY,
    `product_id` BIGINT NOT NULL,
    `target_quantity` DECIMAL(15, 2) NOT NULL,
    `current_quantity` DECIMAL(15, 2) DEFAULT 0,
    `discount_price` DECIMAL(15, 2) NOT NULL,
    `start_date` DATETIME NOT NULL,
    `end_date` DATETIME NOT NULL,
    `status` VARCHAR(50) DEFAULT 'OPEN',
    FOREIGN KEY (`product_id`) REFERENCES `product`(`id`)
);

-- 12. Group_Buy_Participant (Người tham gia mua chung)
CREATE TABLE IF NOT EXISTS `group_buy_participant` (
    `id` BIGINT AUTO_INCREMENT PRIMARY KEY,
    `group_buy_id` BIGINT NOT NULL,
    `buyer_id` BIGINT NOT NULL,
    `quantity` DECIMAL(15, 2) NOT NULL,
    `joined_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (`group_buy_id`) REFERENCES `group_buy`(`id`),
    FOREIGN KEY (`buyer_id`) REFERENCES `account`(`id`)
);

-- 13. Delivery (Thông tin giao hàng)
CREATE TABLE IF NOT EXISTS `delivery` (
    `id` BIGINT AUTO_INCREMENT PRIMARY KEY,
    `order_id` BIGINT NOT NULL,
    `tracking_number` VARCHAR(100),
    `status` VARCHAR(50) DEFAULT 'PREPARING',
    `estimated_delivery_date` DATE,
    FOREIGN KEY (`order_id`) REFERENCES `orders`(`id`)
);

-- 14. Delivery_Log (Lịch sử giao hàng)
CREATE TABLE IF NOT EXISTS `delivery_log` (
    `id` BIGINT AUTO_INCREMENT PRIMARY KEY,
    `delivery_id` BIGINT NOT NULL,
    `status` VARCHAR(50) NOT NULL,
    `location` VARCHAR(255),
    `timestamp` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (`delivery_id`) REFERENCES `delivery`(`id`) ON DELETE CASCADE
);

-- 15. Forward_Contract (Hợp đồng)
CREATE TABLE IF NOT EXISTS `forward_contract` (
    `id` BIGINT AUTO_INCREMENT PRIMARY KEY,
    `buyer_id` BIGINT NOT NULL,
    `seller_id` BIGINT NOT NULL,
    `product_id` BIGINT NOT NULL,
    `quantity` DECIMAL(15, 2) NOT NULL,
    `total_amount` DECIMAL(15, 2) NOT NULL,
    `delivery_date` DATE NOT NULL,
    `status` VARCHAR(50) DEFAULT 'DRAFT',
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (`buyer_id`) REFERENCES `account`(`id`),
    FOREIGN KEY (`seller_id`) REFERENCES `account`(`id`),
    FOREIGN KEY (`product_id`) REFERENCES `product`(`id`)
);

-- 16. Contract_Milestone (Tiến độ hợp đồng)
CREATE TABLE IF NOT EXISTS `contract_milestone` (
    `id` BIGINT AUTO_INCREMENT PRIMARY KEY,
    `contract_id` BIGINT NOT NULL,
    `title` VARCHAR(100) NOT NULL,
    `description` TEXT,
    `due_date` DATE NOT NULL,
    `status` VARCHAR(50) DEFAULT 'PENDING',
    FOREIGN KEY (`contract_id`) REFERENCES `forward_contract`(`id`) ON DELETE CASCADE
);

-- 17. Payment (Thanh toán)
CREATE TABLE IF NOT EXISTS `payment` (
    `id` BIGINT AUTO_INCREMENT PRIMARY KEY,
    `order_id` BIGINT,
    `contract_id` BIGINT,
    `amount` DECIMAL(15, 2) NOT NULL,
    `payment_method` VARCHAR(50),
    `status` VARCHAR(50) DEFAULT 'PENDING',
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (`order_id`) REFERENCES `orders`(`id`),
    FOREIGN KEY (`contract_id`) REFERENCES `forward_contract`(`id`)
);

-- 18. Review (Đánh giá)
CREATE TABLE IF NOT EXISTS `review` (
    `id` BIGINT AUTO_INCREMENT PRIMARY KEY,
    `product_id` BIGINT NOT NULL,
    `reviewer_id` BIGINT NOT NULL,
    `rating` INT NOT NULL CHECK (rating >= 1 AND rating <= 5),
    `comment` TEXT,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (`product_id`) REFERENCES `product`(`id`),
    FOREIGN KEY (`reviewer_id`) REFERENCES `account`(`id`)
);

-- ============================
-- 1. ACCOUNT (15 dòng: 5 Supplier + 5 Partner + 5 Shipper)
-- ============================
INSERT INTO `account` (`id`, `email`, `phone_number`, `username`, `password`, `role`, `status`) VALUES
(1, 'supplier01@agriconnect.vn', '0912345001', 'supplier01', '123456', 'SUPPLIER', 'ACTIVE'),
(2, 'nguyenthanhsonyb2002@gmail.com', '0912345002', 'supplier02', '123456', 'SUPPLIER', 'PENDING'),
(3, 'supplier03@agriconnect.vn', '0912345003', 'supplier03', '123456', 'SUPPLIER', 'ACTIVE'),
(4, 'supplier04@agriconnect.vn', '0912345004', 'supplier04', '123456', 'SUPPLIER', 'LOCKED'),
(5, 'supplier05@agriconnect.vn', '0912345005', 'supplier05', '123456', 'SUPPLIER', 'PENDING'),

(6, 'partner01@agriconnect.vn', '0923456001', 'partner01', '123456', 'PARTNER', 'ACTIVE'),
(7, 'partner02@agriconnect.vn', '0923456002', 'partner02', '123456', 'PARTNER', 'PENDING'),
(8, 'partner03@agriconnect.vn', '0923456003', 'partner03', '123456', 'PARTNER', 'ACTIVE'),
(9, 'partner04@agriconnect.vn', '0923456004', 'partner04', '123456', 'PARTNER', 'LOCKED'),
(10, 'partner05@agriconnect.vn', '0923456005', 'partner05', '123456', 'PARTNER', 'REJECTED'),

(11, 'shipper01@agriconnect.vn', '0934567001', 'shipper01', '123456', 'SHIPPER', 'ACTIVE'),
(12, 'shipper02@agriconnect.vn', '0934567002', 'shipper02', '123456', 'SHIPPER', 'ACTIVE'),
(13, 'shipper03@agriconnect.vn', '0934567003', 'shipper03', '123456', 'SHIPPER', 'PENDING'),
(14, 'shipper04@agriconnect.vn', '0934567004', 'shipper04', '123456', 'SHIPPER', 'LOCKED'),
(15, 'shipper05@agriconnect.vn', '0934567005', 'shipper05', '123456', 'SHIPPER', 'ACTIVE');

-- ============================
-- 2. SUPPLIER (account_id 1 -> 5)
-- ============================
INSERT INTO `supplier` (`supplier_id`, `farm_name`, `farm_area`, `certificate`, `production_capacity`) VALUES
(1, 'Nông trại Xanh Sạch', 12.50, 'VietGAP-2023-001', 500.00),
(2, 'Trang trại Hữu Cơ Đà Lạt', 8.75, 'Organic-VN-2022', 320.50),
(3, 'HTX Nông sản Miền Tây', 25.00, 'GlobalGAP-2024-045', 1200.00),
(4, 'Nông trại Ba Vì', 15.20, 'VietGAP-2020-077', 450.00),
(5, 'Trang trại Rau Sạch Mộc Châu', 6.30, 'VietGAP-2021-089', 210.00);

-- ============================
-- 3. PARTNER (account_id 6 -> 10)
-- ============================
INSERT INTO `partner` (`partner_id`, `company_name`, `tax_code`, `business_type`) VALUES
(6, 'Công ty TNHH Thực Phẩm An Việt', '0102345678', 'Phân phối bán buôn'),
(7, 'Siêu thị Xanh Farmer Mart', '0309876543', 'Bán lẻ'),
(8, 'Công ty CP Xuất Nhập Khẩu Nông Sản', '0401122334', 'Xuất khẩu'),
(9, 'Chuỗi Cửa Hàng Thực Phẩm Sạch', '0355667788', 'Bán lẻ'),
(10, 'Công ty TNHH Chế Biến Nông Sản Việt', '0207788990', 'Chế biến - Gia công');

-- ============================
-- 4. SHIPPER (account_id 11 -> 15)
-- ============================
INSERT INTO `shipper` (`shipper_id`, `vehicle_type`, `license_number`, `operating_area`) VALUES
(11, 'Xe tải nhỏ 1.5 tấn', '29C-12345', 'Hà Nội - Hưng Yên'),
(12, 'Xe tải lạnh 3.5 tấn', '30H-67890', 'Hà Nội - Bắc Ninh - Bắc Giang'),
(13, 'Xe máy giao hàng', '29B1-11122', 'Nội thành Hà Nội'),
(14, 'Xe container', '51D-33445', 'TP.HCM - Miền Tây'),
(15, 'Xe tải 5 tấn', '43C-99887', 'Đà Nẵng - Quảng Nam');

-- 1. Insert dữ liệu vào bảng category trước (vì product phụ thuộc vào category)
INSERT INTO `category` (`id`, `name`, `parent_id`) VALUES
(1, 'Nông sản sạch', NULL),
(2, 'Trái cây tươi', NULL),
(3, 'Đặc sản vùng miền', NULL),
(4, 'Gạo các loại', 1),
(5, 'Hạt dinh dưỡng', 1);

-- 2. Insert dữ liệu vào bảng product (với seller_id giả định là 1, bạn có thể thay đổi nếu cần)
INSERT INTO `product` (`category_id`, `seller_id`, `name`, `description`, `price`, `unit`, `status`) VALUES
(4, 1, 'Gạo ST25 hữu cơ', 'Gạo đặc sản Sóc Trăng, hạt dài, dẻo thơm.', 180000.00, 'Túi 5kg', 'AVAILABLE'),
(2, 1, 'Xoài cát Hòa Lộc', 'Xoài tươi ngon, ngọt đậm đà, chuẩn VietGAP.', 60000.00, 'Kg', 'AVAILABLE'),
(3, 1, 'Mật ong hoa cà phê', 'Mật ong nguyên chất tự nhiên 100%.', 150000.00, 'Chai 1L', 'AVAILABLE'),
(5, 1, 'Hạt điều rang muối Bình Phước', 'Hạt điều to, giòn rụm, béo ngậy.', 160000.00, 'Hộp 500g', 'AVAILABLE'),
(2, 1, 'Bơ sáp Đắk Lắk', 'Bơ dẻo, béo, nhiều thịt, chuẩn chất lượng.', 45000.00, 'Kg', 'AVAILABLE');

-- 3. Insert dữ liệu vào bảng product_image tương ứng với 5 sản phẩm vừa tạo
INSERT INTO `product_image` (`product_id`, `image_url`, `is_primary`) VALUES
(1, 'https://example.com/images/gao-st25.jpg', TRUE),
(2, 'https://example.com/images/xoai-cat.jpg', TRUE),
(3, 'https://example.com/images/mat-ong.jpg', TRUE),
(4, 'https://example.com/images/hat-dieu.jpg', TRUE),
(5, 'https://example.com/images/bo-sap.jpg', TRUE);

INSERT INTO `inventory_batch` (`product_id`, `quantity`) VALUES
(1, 5.00),    
(2, 50.00),   
(3, 30.00),   
(4, 8.00),    
(5, 100.00);
