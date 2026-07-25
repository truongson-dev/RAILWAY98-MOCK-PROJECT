-- Tạo database cho dự án AgriConnect
DROP DATABASE IF EXISTS agriconnect_db;
CREATE DATABASE agriconnect_db;
USE agriconnect_db;

-- 1. Account (Tài khoản)
DROP TABLE IF EXISTS `account`;
CREATE TABLE `account` (
    `id` BIGINT AUTO_INCREMENT PRIMARY KEY,
    `username` VARCHAR(50) NOT NULL UNIQUE,
    `password` VARCHAR(255) NOT NULL,
    `role` ENUM('SUPPLIER', 'PARTNER', 'SHIPPER', 'ADMIN') NOT NULL,
    `status` VARCHAR(20) DEFAULT 'ACTIVE'
);

-- 2.1 Supplier
DROP TABLE IF EXISTS `supplier`;
CREATE TABLE `supplier` (
    `supplier_id` BIGINT PRIMARY KEY,
    `farm_name` VARCHAR(255),
    `farm_area` DECIMAL(15, 2),
    `certificate` VARCHAR(255),
    `production_capacity` DECIMAL(15, 2),
    FOREIGN KEY (`supplier_id`) REFERENCES `account`(`id`) ON DELETE CASCADE
);

-- 2.2 Partner
DROP TABLE IF EXISTS `partner`;
CREATE TABLE `partner` (
    `partner_id` BIGINT PRIMARY KEY,
    `company_name` VARCHAR(255),
    `tax_code` VARCHAR(50),
    `business_type` VARCHAR(100),
    FOREIGN KEY (`partner_id`) REFERENCES `account`(`id`) ON DELETE CASCADE
);

-- 2.3 Shipper
DROP TABLE IF EXISTS `shipper`;
CREATE TABLE `shipper` (
    `shipper_id` BIGINT PRIMARY KEY,
    `vehicle_type` VARCHAR(50),
    `license_number` VARCHAR(50),
    `operating_area` VARCHAR(255),
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
    `description` TEXT,
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
    FOREIGN KEY (`seller_id`) REFERENCES `account`(`id`)
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

INSERT INTO `account` (`id`, `username`, `password`, `role`, `status`) VALUES
(1, 'supplier01', '123456', 'SUPPLIER', 'ACTIVE'),
(2, 'supplier02', '123456', 'SUPPLIER', 'ACTIVE'),
(3, 'supplier03', '123456', 'SUPPLIER', 'ACTIVE'),
(4, 'supplier04', '123456', 'SUPPLIER', 'INACTIVE'),
(5, 'supplier05', '123456', 'SUPPLIER', 'ACTIVE'),

(6, 'partner01', '123456', 'PARTNER', 'ACTIVE'),
(7, 'partner02', '123456', 'PARTNER', 'ACTIVE'),
(8, 'partner03', '123456', 'PARTNER', 'ACTIVE'),
(9, 'partner04', '123456', 'PARTNER', 'INACTIVE'),
(10, 'partner05', '123456', 'PARTNER', 'ACTIVE'),

(11, 'shipper01', '123456', 'SHIPPER', 'ACTIVE'),
(12, 'shipper02', '123456', 'SHIPPER', 'ACTIVE'),
(13, 'shipper03', '123456', 'SHIPPER', 'ACTIVE'),
(14, 'shipper04', '123456', 'SHIPPER', 'INACTIVE'),
(15, 'shipper05', '123456', 'SHIPPER', 'ACTIVE');

-- ============================
-- 2. SUPPLIER (account_id 1 -> 5)
-- ============================
INSERT INTO `supplier` (`supplier_id`, `farm_name`, `farm_area`, `certificate`, `production_capacity`) VALUES
(1, 'Nông trại Xanh Sạch', 12.50, 'VietGAP-2023-001', 500.00),
(2, 'Trang trại Hữu Cơ Đà Lạt', 8.75, 'Organic-VN-2022', 320.50),
(3, 'HTX Nông sản Miền Tây', 25.00, 'GlobalGAP-2024-045', 1200.00),
(4, 'Nông trại Ba Vì', 15.20, NULL, 450.00),
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
