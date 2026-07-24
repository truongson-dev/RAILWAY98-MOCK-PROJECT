-- Tạo database cho dự án AgriConnect
CREATE DATABASE IF NOT EXISTS agriconnect_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE agriconnect_db;

-- 1. Role (Phân quyền)
CREATE TABLE IF NOT EXISTS `role` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `name` ENUM('Supplier', 'Partner', 'Shipper', 'Admin') NOT NULL UNIQUE,
    `description` VARCHAR(255)
);

-- 2. Account (Tài khoản)
CREATE TABLE IF NOT EXISTS `account` (
    `id` BIGINT AUTO_INCREMENT PRIMARY KEY,
    `username` VARCHAR(50) NOT NULL UNIQUE,
    `password` VARCHAR(255) NOT NULL,
    `role_id` INT NOT NULL,
    `status` VARCHAR(20) DEFAULT 'ACTIVE',
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (`role_id`) REFERENCES `role`(`id`)
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
