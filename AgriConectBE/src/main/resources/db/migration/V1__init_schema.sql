-- NHÓM 1: AUTHENTICATION
CREATE TABLE accounts (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255),
    full_name VARCHAR(100),
    phone VARCHAR(20),
    province VARCHAR(100),
    address TEXT,
    avatar VARCHAR(500),
    role ENUM('ADMIN','PARTNER','SUPPLIER','SHIPPER') NOT NULL,
    status ENUM('PENDING_VERIFICATION','PENDING_APPROVAL','ACTIVE','REJECTED','LOCKED') DEFAULT 'PENDING_VERIFICATION',
    google_id VARCHAR(100),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    created_by VARCHAR(100),
    updated_by VARCHAR(100),
    INDEX idx_accounts_email (email),
    INDEX idx_accounts_status (status),
    INDEX idx_accounts_role (role)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Bảng lưu trữ thông tin tài khoản chung (Joined Inheritance)';

CREATE TABLE partners (
    id BIGINT PRIMARY KEY,
    company_name VARCHAR(200),
    tax_code VARCHAR(20),
    business_type VARCHAR(100),
    business_license VARCHAR(500),
    FOREIGN KEY (id) REFERENCES accounts(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Bảng lưu thông tin chi tiết đối tác (Partner)';

CREATE TABLE suppliers (
    id BIGINT PRIMARY KEY,
    farm_name VARCHAR(200),
    farm_area DECIMAL(10,2),
    certificate VARCHAR(100),
    production_capacity DECIMAL(10,2),
    farm_address TEXT,
    FOREIGN KEY (id) REFERENCES accounts(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Bảng lưu thông tin chi tiết nhà cung cấp/nhà nông (Supplier)';

CREATE TABLE shippers (
    id BIGINT PRIMARY KEY,
    vehicle_type VARCHAR(100),
    license_number VARCHAR(50),
    operating_area VARCHAR(200),
    fleet_capacity INT,
    FOREIGN KEY (id) REFERENCES accounts(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Bảng lưu thông tin chi tiết đơn vị vận chuyển (Shipper)';

CREATE TABLE admins (
    id BIGINT PRIMARY KEY,
    department VARCHAR(100),
    FOREIGN KEY (id) REFERENCES accounts(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Bảng lưu thông tin chi tiết quản trị viên (Admin)';

CREATE TABLE refresh_tokens (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    token VARCHAR(500) UNIQUE NOT NULL,
    account_id BIGINT,
    expires_at DATETIME NOT NULL,
    revoked BOOLEAN DEFAULT FALSE,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (account_id) REFERENCES accounts(id) ON DELETE CASCADE,
    INDEX idx_refresh_tokens_account (account_id),
    INDEX idx_refresh_tokens_token (token)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Bảng lưu trữ refresh token cho xác thực';

CREATE TABLE email_verifications (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(100) NOT NULL,
    otp_code VARCHAR(6) NOT NULL,
    expires_at DATETIME NOT NULL,
    used BOOLEAN DEFAULT FALSE,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_email_verifications_email (email)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Bảng lưu trữ mã OTP xác minh email';

CREATE TABLE password_resets (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(100) NOT NULL,
    reset_token VARCHAR(200) UNIQUE NOT NULL,
    expires_at DATETIME NOT NULL,
    used BOOLEAN DEFAULT FALSE,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_password_resets_email (email),
    INDEX idx_password_resets_token (reset_token)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Bảng lưu trữ token đặt lại mật khẩu';


-- NHÓM 2: CATALOG
CREATE TABLE categories (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) UNIQUE NOT NULL,
    name_en VARCHAR(100),
    description TEXT,
    image_url VARCHAR(500),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_categories_name (name)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Bảng danh mục nông sản';

CREATE TABLE products (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(200) NOT NULL,
    name_en VARCHAR(200),
    description TEXT,
    price DECIMAL(15,2) NOT NULL,
    unit VARCHAR(20) DEFAULT 'kg',
    min_order_kg INT DEFAULT 100,
    location VARCHAR(200),
    harvest_date VARCHAR(100),
    status ENUM('AVAILABLE','OUT_OF_STOCK','DISCONTINUED') DEFAULT 'AVAILABLE',
    rating DECIMAL(3,1) DEFAULT 0.0,
    reviews_count INT DEFAULT 0,
    badges JSON,
    category_id BIGINT,
    seller_id BIGINT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE SET NULL,
    FOREIGN KEY (seller_id) REFERENCES accounts(id) ON DELETE CASCADE,
    INDEX idx_products_category (category_id),
    INDEX idx_products_seller (seller_id),
    INDEX idx_products_status (status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Bảng thông tin sản phẩm nông sản';

CREATE TABLE product_images (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    product_id BIGINT,
    image_url VARCHAR(500) NOT NULL,
    is_primary BOOLEAN DEFAULT FALSE,
    display_order INT DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
    INDEX idx_product_images_product (product_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Bảng hình ảnh sản phẩm';

CREATE TABLE product_certifications (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    product_id BIGINT,
    certification_type ENUM('VIETGAP','GLOBALGAP','ORGANIC','HACCP','OTHER') NOT NULL,
    issued_by VARCHAR(200),
    issued_date DATE,
    expired_date DATE,
    document_url VARCHAR(500),
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
    INDEX idx_product_certifications_product (product_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Bảng chứng chỉ chất lượng sản phẩm';


-- NHÓM 3: TRADING
CREATE TABLE orders (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    order_code VARCHAR(50) UNIQUE NOT NULL,
    buyer_id BIGINT,
    supplier_name VARCHAR(200),
    total_amount DECIMAL(15,2) NOT NULL,
    status ENUM('PENDING','CONFIRMED','PROCESSING','SHIPPING','DELIVERED','COMPLETED','CANCELLED') DEFAULT 'PENDING',
    payment_method ENUM('bank','credit_30','credit_60','deposit') DEFAULT 'bank',
    payment_status ENUM('UNPAID','PAID','REFUNDED') DEFAULT 'UNPAID',
    shipping_address TEXT,
    tracking_code VARCHAR(100),
    estimated_delivery VARCHAR(100),
    note TEXT,
    cancelled_reason TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (buyer_id) REFERENCES accounts(id) ON DELETE SET NULL,
    INDEX idx_orders_buyer (buyer_id),
    INDEX idx_orders_status (status),
    INDEX idx_orders_created (created_at),
    INDEX idx_orders_code (order_code)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Bảng thông tin đơn hàng';

CREATE TABLE order_items (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    order_id BIGINT,
    product_id BIGINT,
    product_name VARCHAR(200),
    quantity DECIMAL(10,2) NOT NULL,
    price DECIMAL(15,2) NOT NULL,
    subtotal DECIMAL(15,2),
    FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE SET NULL,
    INDEX idx_order_items_order (order_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Bảng chi tiết đơn hàng';

CREATE TABLE group_buys (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(300) NOT NULL,
    description TEXT,
    target_quantity DECIMAL(15,2) NOT NULL,
    current_quantity DECIMAL(15,2) DEFAULT 0,
    discount_percent DECIMAL(5,2),
    original_price DECIMAL(15,2),
    discount_price DECIMAL(15,2),
    status ENUM('OPEN','CLOSED','COMPLETED','CANCELLED') DEFAULT 'OPEN',
    start_date DATETIME,
    end_date DATETIME,
    participants_count INT DEFAULT 0,
    product_id BIGINT,
    created_by BIGINT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE SET NULL,
    FOREIGN KEY (created_by) REFERENCES accounts(id) ON DELETE CASCADE,
    INDEX idx_group_buys_status (status),
    INDEX idx_group_buys_product (product_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Bảng mua chung (Group Buy)';

CREATE TABLE group_buy_participants (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    group_buy_id BIGINT,
    account_id BIGINT,
    volume_kg DECIMAL(10,2) NOT NULL,
    joined_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (group_buy_id) REFERENCES group_buys(id) ON DELETE CASCADE,
    FOREIGN KEY (account_id) REFERENCES accounts(id) ON DELETE CASCADE,
    UNIQUE KEY uk_group_buy_account (group_buy_id, account_id),
    INDEX idx_group_buy_participants_gb (group_buy_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Bảng người tham gia mua chung';

CREATE TABLE forward_contracts (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    contract_code VARCHAR(50) UNIQUE NOT NULL,
    title VARCHAR(300) NOT NULL,
    crop_name VARCHAR(200),
    farm_name VARCHAR(200),
    location VARCHAR(200),
    expected_harvest DATE,
    estimated_quantity_kg DECIMAL(15,2),
    contract_price_vnd DECIMAL(15,2),
    deposit_percent DECIMAL(5,2),
    status ENUM('OPEN','CLOSED','IN_PROGRESS','COMPLETED','CANCELLED') DEFAULT 'OPEN',
    image_url VARCHAR(500),
    description TEXT,
    created_by BIGINT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (created_by) REFERENCES accounts(id) ON DELETE CASCADE,
    INDEX idx_forward_contracts_status (status),
    INDEX idx_forward_contracts_created (created_by)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Bảng hợp đồng bao tiêu (Forward Contract)';

CREATE TABLE escrow_contracts (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    contract_code VARCHAR(50) UNIQUE NOT NULL,
    buyer_id BIGINT,
    seller_id BIGINT,
    product_name VARCHAR(200),
    quantity_tons DECIMAL(10,2),
    total_value_vnd DECIMAL(15,2),
    status ENUM('DRAFT','ACTIVE','COMPLETED','DISPUTED','RESOLVED','CANCELLED') DEFAULT 'DRAFT',
    progress_percent INT DEFAULT 0,
    notes TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (buyer_id) REFERENCES accounts(id) ON DELETE SET NULL,
    FOREIGN KEY (seller_id) REFERENCES accounts(id) ON DELETE SET NULL,
    INDEX idx_escrow_contracts_buyer (buyer_id),
    INDEX idx_escrow_contracts_seller (seller_id),
    INDEX idx_escrow_contracts_status (status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Bảng hợp đồng giao dịch đảm bảo (Escrow Contract)';

CREATE TABLE escrow_milestones (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    escrow_id BIGINT,
    title VARCHAR(200) NOT NULL,
    description TEXT,
    completed BOOLEAN DEFAULT FALSE,
    completion_date DATETIME,
    display_order INT,
    FOREIGN KEY (escrow_id) REFERENCES escrow_contracts(id) ON DELETE CASCADE,
    INDEX idx_escrow_milestones_escrow (escrow_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Bảng mốc thanh toán trong hợp đồng đảm bảo';


-- NHÓM 4: ADMIN
CREATE TABLE credit_infos (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    account_id BIGINT UNIQUE NOT NULL,
    credit_limit DECIMAL(15,2) DEFAULT 500000000,
    used_credit DECIMAL(15,2) DEFAULT 0,
    available_credit DECIMAL(15,2) DEFAULT 500000000,
    billing_cycle INT DEFAULT 30,
    next_due_date DATE,
    partner_rank ENUM('DONG','BAC','VANG','KIM_CUONG') DEFAULT 'DONG',
    accumulated_volume_ytd_kg DECIMAL(15,2) DEFAULT 0,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (account_id) REFERENCES accounts(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Bảng thông tin hạn mức tín dụng của đối tác';

CREATE TABLE kyc_profiles (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    account_id BIGINT UNIQUE NOT NULL,
    status ENUM('PENDING','APPROVED','REJECTED','NEEDS_INFO') DEFAULT 'PENDING',
    submitted_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    reviewed_at DATETIME,
    reviewed_by BIGINT,
    reject_reason TEXT,
    additional_note TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (account_id) REFERENCES accounts(id) ON DELETE CASCADE,
    FOREIGN KEY (reviewed_by) REFERENCES accounts(id) ON DELETE SET NULL,
    INDEX idx_kyc_profiles_status (status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Bảng hồ sơ xác minh danh tính (KYC)';

CREATE TABLE kyc_documents (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    kyc_id BIGINT,
    document_type ENUM('BUSINESS_LICENSE','LAND_CERTIFICATE','VIETGAP_CERT','ID_CARD','OTHER') NOT NULL,
    document_url VARCHAR(500) NOT NULL,
    uploaded_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (kyc_id) REFERENCES kyc_profiles(id) ON DELETE CASCADE,
    INDEX idx_kyc_documents_kyc (kyc_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Bảng tài liệu KYC';

CREATE TABLE warehouses (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(200) NOT NULL,
    location VARCHAR(300),
    capacity_tons DECIMAL(15,2),
    current_stock_tons DECIMAL(15,2) DEFAULT 0,
    temperature_controlled BOOLEAN DEFAULT FALSE,
    manager_name VARCHAR(100),
    phone VARCHAR(20),
    status ENUM('ACTIVE','INACTIVE') DEFAULT 'ACTIVE',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_warehouses_status (status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Bảng quản lý kho bãi';

CREATE TABLE inventory_batches (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    batch_code VARCHAR(50) UNIQUE NOT NULL,
    product_id BIGINT,
    warehouse_id BIGINT,
    quantity_kg DECIMAL(15,2) NOT NULL,
    unit_cost DECIMAL(15,2),
    harvest_date DATE,
    expiry_date DATE,
    quality_grade ENUM('A','B','C') DEFAULT 'A',
    status ENUM('AVAILABLE','RESERVED','SOLD','EXPIRED') DEFAULT 'AVAILABLE',
    supplier_id BIGINT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE SET NULL,
    FOREIGN KEY (warehouse_id) REFERENCES warehouses(id) ON DELETE CASCADE,
    FOREIGN KEY (supplier_id) REFERENCES accounts(id) ON DELETE SET NULL,
    INDEX idx_inventory_batches_warehouse (warehouse_id),
    INDEX idx_inventory_batches_status (status),
    INDEX idx_inventory_batches_expiry (expiry_date)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Bảng lô hàng tồn kho';

CREATE TABLE shipments (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    tracking_code VARCHAR(100) UNIQUE NOT NULL,
    order_id BIGINT,
    shipper_id BIGINT,
    pickup_address TEXT,
    delivery_address TEXT,
    status ENUM('WAITING','PICKED_UP','IN_TRANSIT','DELIVERED','FAILED') DEFAULT 'WAITING',
    estimated_delivery DATETIME,
    actual_delivery DATETIME,
    weight_kg DECIMAL(10,2),
    notes TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
    FOREIGN KEY (shipper_id) REFERENCES accounts(id) ON DELETE SET NULL,
    INDEX idx_shipments_order (order_id),
    INDEX idx_shipments_shipper (shipper_id),
    INDEX idx_shipments_status (status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Bảng thông tin vận chuyển';

CREATE TABLE system_alerts (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(300) NOT NULL,
    description TEXT,
    level ENUM('LOW','MEDIUM','HIGH','CRITICAL') DEFAULT 'MEDIUM',
    category ENUM('FINANCIAL','SUPPLY_CHAIN','WEATHER','QUALITY','SYSTEM') DEFAULT 'SYSTEM',
    is_read BOOLEAN DEFAULT FALSE,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_system_alerts_level (level),
    INDEX idx_system_alerts_created (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Bảng cảnh báo hệ thống';

CREATE TABLE audit_logs (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    action VARCHAR(100) NOT NULL,
    entity_type VARCHAR(100),
    entity_id BIGINT,
    old_value JSON,
    new_value JSON,
    performed_by BIGINT,
    performed_by_email VARCHAR(100),
    ip_address VARCHAR(50),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (performed_by) REFERENCES accounts(id) ON DELETE SET NULL,
    INDEX idx_audit_logs_entity (entity_type, entity_id),
    INDEX idx_audit_logs_created (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Bảng nhật ký hệ thống (Audit log)';
