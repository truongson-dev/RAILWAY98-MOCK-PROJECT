-- ============================================================
-- AGRICONNECT DATABASE SCHEMA
-- Version: 2.0 — Tương ứng với Spring Boot Backend đầy đủ
-- Engine: MySQL 8.0+
-- Charset: utf8mb4 (hỗ trợ tiếng Việt + emoji)
-- ============================================================

CREATE DATABASE IF NOT EXISTS agriconnect_db
    CHARACTER SET utf8mb4
    COLLATE utf8mb4_unicode_ci;

USE agriconnect_db;

-- ============================================================
-- BẢNG 1: account — Tài khoản người dùng (Joined Inheritance)
-- Bảng cha dùng cho tất cả loại user
-- discriminator: role (ADMIN, PARTNER, SUPPLIER, SHIPPER)
-- ============================================================
CREATE TABLE IF NOT EXISTS account (
    id           BIGINT          NOT NULL AUTO_INCREMENT,
    username     VARCHAR(100)    NOT NULL UNIQUE COMMENT 'Email/username đăng nhập',
    password     VARCHAR(255)    NOT NULL COMMENT 'BCrypt hashed password',
    role         VARCHAR(50)     NOT NULL COMMENT 'Discriminator: ADMIN|PARTNER|SUPPLIER|SHIPPER',
    status       VARCHAR(20)     NOT NULL DEFAULT 'ACTIVE' COMMENT 'ACTIVE|PENDING|SUSPENDED',
    full_name    VARCHAR(100)    COMMENT 'Họ và tên',
    phone        VARCHAR(20)     COMMENT 'Số điện thoại',
    email        VARCHAR(100)    COMMENT 'Email liên hệ (có thể khác username)',
    address      VARCHAR(255)    COMMENT 'Địa chỉ cụ thể',
    province     VARCHAR(100)    COMMENT 'Tỉnh/thành phố',
    avatar       VARCHAR(500)    COMMENT 'URL ảnh đại diện',
    PRIMARY KEY (id),
    INDEX idx_account_username (username),
    INDEX idx_account_role (role),
    INDEX idx_account_status (status)
) ENGINE=InnoDB COMMENT='Tài khoản người dùng — Joined Inheritance Strategy';

-- ============================================================
-- BẢNG 2: partner — Đối tác thu mua B2B (con của account)
-- ============================================================
CREATE TABLE IF NOT EXISTS partner (
    account_id    BIGINT          NOT NULL,
    company_name  VARCHAR(255)    COMMENT 'Tên công ty / doanh nghiệp',
    tax_code      VARCHAR(50)     COMMENT 'Mã số thuế',
    business_type VARCHAR(100)    COMMENT 'Loại hình: Bán sỉ, Xuất nhập khẩu...',
    PRIMARY KEY (account_id),
    FOREIGN KEY (account_id) REFERENCES account(id) ON DELETE CASCADE
) ENGINE=InnoDB COMMENT='Đối tác thu mua B2B';

-- ============================================================
-- BẢNG 3: supplier — Nhà cung cấp / Nông trại (con của account)
-- ============================================================
CREATE TABLE IF NOT EXISTS supplier (
    account_id          BIGINT          NOT NULL,
    farm_name           VARCHAR(255)    COMMENT 'Tên trang trại / HTX',
    farm_area           DECIMAL(15,2)   COMMENT 'Diện tích canh tác (ha)',
    certificate         VARCHAR(255)    COMMENT 'Chứng nhận: VietGAP, GlobalGAP...',
    production_capacity DECIMAL(15,2)   COMMENT 'Năng lực sản xuất (tấn/năm)',
    PRIMARY KEY (account_id),
    FOREIGN KEY (account_id) REFERENCES account(id) ON DELETE CASCADE
) ENGINE=InnoDB COMMENT='Nhà cung cấp nông sản';

-- ============================================================
-- BẢNG 4: shipper — Đơn vị vận chuyển (con của account)
-- ============================================================
CREATE TABLE IF NOT EXISTS shipper (
    account_id      BIGINT          NOT NULL,
    vehicle_type    VARCHAR(50)     COMMENT 'Loại xe: Xe tải lạnh, Container...',
    license_number  VARCHAR(50)     COMMENT 'Biển số xe',
    operating_area  VARCHAR(255)    COMMENT 'Khu vực hoạt động: Miền Nam...',
    PRIMARY KEY (account_id),
    FOREIGN KEY (account_id) REFERENCES account(id) ON DELETE CASCADE
) ENGINE=InnoDB COMMENT='Đơn vị vận chuyển logistics';

-- ============================================================
-- BẢNG 5: admin — Quản trị viên (con của account)
-- ============================================================
CREATE TABLE IF NOT EXISTS admin (
    account_id  BIGINT  NOT NULL,
    PRIMARY KEY (account_id),
    FOREIGN KEY (account_id) REFERENCES account(id) ON DELETE CASCADE
) ENGINE=InnoDB COMMENT='Quản trị viên hệ thống';

-- ============================================================
-- BẢNG 6: category — Danh mục sản phẩm
-- ============================================================
CREATE TABLE IF NOT EXISTS category (
    id          INT             NOT NULL AUTO_INCREMENT,
    name        VARCHAR(100)    NOT NULL COMMENT 'Tên tiếng Việt: Rau củ, Trái cây...',
    code        VARCHAR(50)     NOT NULL UNIQUE COMMENT 'Code tiếng Anh: Vegetables, Fruits...',
    description VARCHAR(500)    COMMENT 'Mô tả danh mục',
    PRIMARY KEY (id),
    INDEX idx_category_code (code)
) ENGINE=InnoDB COMMENT='Danh mục sản phẩm nông sản';

-- ============================================================
-- BẢNG 7: product — Sản phẩm nông sản
-- ============================================================
CREATE TABLE IF NOT EXISTS product (
    id              BIGINT          NOT NULL AUTO_INCREMENT,
    category_id     INT             NOT NULL COMMENT 'FK → category',
    seller_id       BIGINT          NOT NULL COMMENT 'FK → account (Supplier/Partner)',
    name            VARCHAR(255)    NOT NULL COMMENT 'Tên tiếng Việt',
    name_en         VARCHAR(255)    COMMENT 'Tên tiếng Anh',
    description     TEXT            COMMENT 'Mô tả chi tiết',
    price           DECIMAL(15,2)   NOT NULL COMMENT 'Giá bán (VND/kg)',
    unit            VARCHAR(50)     DEFAULT 'kg' COMMENT 'Đơn vị tính',
    status          VARCHAR(50)     DEFAULT 'AVAILABLE' COMMENT 'AVAILABLE|OUT_OF_STOCK|INACTIVE',
    min_order_kg    INT             COMMENT 'Khối lượng đặt tối thiểu (kg)',
    location        VARCHAR(255)    COMMENT 'Vị trí thu hoạch: Đà Lạt, Lâm Đồng...',
    badges          VARCHAR(500)    COMMENT 'JSON array chứng nhận: [\"VIETGAP\",\"HỮU CƠ\"]',
    harvest_date    VARCHAR(100)    COMMENT 'Ngày/mùa thu hoạch',
    rating          DOUBLE          DEFAULT 5.0 COMMENT 'Điểm đánh giá trung bình (1-5)',
    reviews_count   INT             DEFAULT 0 COMMENT 'Số lượt đánh giá',
    created_at      DATETIME(6)     COMMENT 'Ngày tạo',
    updated_at      DATETIME(6)     COMMENT 'Ngày cập nhật',
    PRIMARY KEY (id),
    FOREIGN KEY (category_id) REFERENCES category(id),
    FOREIGN KEY (seller_id) REFERENCES account(id),
    INDEX idx_product_status (status),
    INDEX idx_product_seller (seller_id),
    INDEX idx_product_category (category_id)
) ENGINE=InnoDB COMMENT='Sản phẩm nông sản';

-- ============================================================
-- BẢNG 8: product_image — Hình ảnh sản phẩm
-- ============================================================
CREATE TABLE IF NOT EXISTS product_image (
    id          BIGINT          NOT NULL AUTO_INCREMENT,
    product_id  BIGINT          NOT NULL COMMENT 'FK → product',
    image_url   VARCHAR(1000)   NOT NULL COMMENT 'URL hình ảnh',
    is_primary  TINYINT(1)      DEFAULT 0 COMMENT 'Ảnh đại diện: 1=có, 0=không',
    PRIMARY KEY (id),
    FOREIGN KEY (product_id) REFERENCES product(id) ON DELETE CASCADE,
    INDEX idx_image_product (product_id)
) ENGINE=InnoDB COMMENT='Hình ảnh sản phẩm';

-- ============================================================
-- BẢNG 9: orders — Đơn đặt hàng
-- ============================================================
CREATE TABLE IF NOT EXISTS orders (
    id                  BIGINT          NOT NULL AUTO_INCREMENT,
    buyer_id            BIGINT          NOT NULL COMMENT 'FK → account (Partner)',
    total_amount        DECIMAL(15,2)   NOT NULL COMMENT 'Tổng tiền (VND)',
    status              VARCHAR(50)     DEFAULT 'PENDING'
                                        COMMENT 'PENDING|SHIPPING|DELIVERED|COMPLETED|CANCELLED',
    shipping_address    VARCHAR(255)    COMMENT 'Địa chỉ giao hàng',
    payment_method      VARCHAR(50)     COMMENT 'credit_30|credit_60|bank|deposit',
    tracking_code       VARCHAR(100)    COMMENT 'Mã vận đơn',
    estimated_delivery  VARCHAR(50)     COMMENT 'Ngày dự kiến giao',
    supplier_name       VARCHAR(255)    COMMENT 'Tên nhà cung cấp (denormalized để hiển thị nhanh)',
    created_at          DATETIME(6)     COMMENT 'Ngày đặt hàng',
    updated_at          DATETIME(6)     COMMENT 'Ngày cập nhật',
    PRIMARY KEY (id),
    FOREIGN KEY (buyer_id) REFERENCES account(id),
    INDEX idx_order_buyer (buyer_id),
    INDEX idx_order_status (status),
    INDEX idx_order_created (created_at)
) ENGINE=InnoDB COMMENT='Đơn đặt hàng nông sản';

-- ============================================================
-- BẢNG 10: order_item — Chi tiết đơn hàng
-- ============================================================
CREATE TABLE IF NOT EXISTS order_item (
    id          BIGINT          NOT NULL AUTO_INCREMENT,
    order_id    BIGINT          NOT NULL COMMENT 'FK → orders',
    product_id  BIGINT          NOT NULL COMMENT 'FK → product',
    quantity    DECIMAL(15,2)   NOT NULL COMMENT 'Khối lượng đặt (kg)',
    price       DECIMAL(15,2)   NOT NULL COMMENT 'Giá tại thời điểm đặt (VND/kg)',
    PRIMARY KEY (id),
    FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES product(id),
    INDEX idx_orderitem_order (order_id)
) ENGINE=InnoDB COMMENT='Chi tiết sản phẩm trong đơn hàng';

-- ============================================================
-- BẢNG 11: group_buy — Chiến dịch mua chung
-- ============================================================
CREATE TABLE IF NOT EXISTS group_buy (
    id                  BIGINT          NOT NULL AUTO_INCREMENT,
    product_id          BIGINT          NOT NULL COMMENT 'FK → product',
    title               VARCHAR(500)    COMMENT 'Tiêu đề chiến dịch',
    target_quantity     DECIMAL(15,2)   NOT NULL COMMENT 'Mục tiêu (kg)',
    current_quantity    DECIMAL(15,2)   DEFAULT 0 COMMENT 'Đã đăng ký (kg)',
    discount_price      DECIMAL(15,2)   NOT NULL COMMENT 'Giá ưu đãi (VND/kg)',
    original_price      DECIMAL(15,2)   COMMENT 'Giá gốc (VND/kg)',
    discount_percent    INT             COMMENT 'Phần trăm giảm giá',
    participants_count  INT             DEFAULT 0 COMMENT 'Số người tham gia',
    start_date          DATETIME        COMMENT 'Ngày bắt đầu',
    end_date            DATETIME        COMMENT 'Ngày kết thúc',
    status              VARCHAR(50)     DEFAULT 'OPEN' COMMENT 'OPEN|CLOSED|COMPLETED',
    PRIMARY KEY (id),
    FOREIGN KEY (product_id) REFERENCES product(id),
    INDEX idx_groupbuy_status (status)
) ENGINE=InnoDB COMMENT='Chiến dịch mua chung — gom đơn lấy giá ưu đãi';

-- ============================================================
-- BẢNG 12: forward_contract — Hợp đồng tương lai / bao tiêu
-- ============================================================
CREATE TABLE IF NOT EXISTS forward_contract (
    id              BIGINT          NOT NULL AUTO_INCREMENT,
    buyer_id        BIGINT          NOT NULL COMMENT 'FK → account (Partner)',
    seller_id       BIGINT          NOT NULL COMMENT 'FK → account (Supplier)',
    product_id      BIGINT          NOT NULL COMMENT 'FK → product',
    title           VARCHAR(500)    COMMENT 'Tiêu đề hợp đồng',
    farm_name       VARCHAR(255)    COMMENT 'Tên nông trại cung cấp',
    quantity        DECIMAL(15,2)   NOT NULL COMMENT 'Khối lượng bao tiêu (kg)',
    total_amount    DECIMAL(15,2)   NOT NULL COMMENT 'Tổng giá trị hợp đồng (VND)',
    contract_price  DECIMAL(15,2)   COMMENT 'Giá cố định (VND/kg)',
    delivery_date   DATE            COMMENT 'Ngày giao hàng dự kiến',
    deposit_percent INT             COMMENT 'Phần trăm đặt cọc',
    status          VARCHAR(50)     DEFAULT 'OPEN'
                                    COMMENT 'DRAFT|OPEN|SIGNED|HARVESTING|COMPLETED',
    created_at      DATETIME(6)     COMMENT 'Ngày tạo',
    PRIMARY KEY (id),
    FOREIGN KEY (buyer_id) REFERENCES account(id),
    FOREIGN KEY (seller_id) REFERENCES account(id),
    FOREIGN KEY (product_id) REFERENCES product(id),
    INDEX idx_fc_buyer (buyer_id),
    INDEX idx_fc_seller (seller_id),
    INDEX idx_fc_status (status)
) ENGINE=InnoDB COMMENT='Hợp đồng tương lai — bao tiêu mùa vụ';

-- ============================================================
-- BẢNG 13: credit_info — Thông tin tín dụng B2B của Partner
-- ============================================================
CREATE TABLE IF NOT EXISTS credit_info (
    id              BIGINT          NOT NULL AUTO_INCREMENT,
    account_id      BIGINT          NOT NULL UNIQUE COMMENT 'FK → account (Partner)',
    partner_rank    VARCHAR(50)     DEFAULT 'BRONZE' COMMENT 'BRONZE|SILVER|GOLD|DIAMOND',
    credit_limit    DECIMAL(15,2)   COMMENT 'Hạn mức tín dụng (VND)',
    used_credit     DECIMAL(15,2)   DEFAULT 0 COMMENT 'Đã sử dụng (VND)',
    billing_cycle   INT             DEFAULT 30 COMMENT 'Chu kỳ thanh toán (ngày)',
    next_due_date   VARCHAR(50)     COMMENT 'Ngày đáo hạn thanh toán tiếp theo',
    PRIMARY KEY (id),
    FOREIGN KEY (account_id) REFERENCES account(id) ON DELETE CASCADE
) ENGINE=InnoDB COMMENT='Thông tin tín dụng B2B của Partner';

-- ============================================================
-- BẢNG 14: kyc_profile — Hồ sơ xác minh doanh nghiệp (KYC)
-- ============================================================
CREATE TABLE IF NOT EXISTS kyc_profile (
    id              BIGINT          NOT NULL AUTO_INCREMENT,
    account_id      BIGINT          NOT NULL UNIQUE COMMENT 'FK → account',
    business_name   VARCHAR(255)    COMMENT 'Tên doanh nghiệp',
    business_type   VARCHAR(100)    COMMENT 'Loại hình kinh doanh',
    tax_code        VARCHAR(50)     COMMENT 'Mã số thuế',
    representative  VARCHAR(100)    COMMENT 'Người đại diện pháp lý',
    status          VARCHAR(50)     DEFAULT 'PENDING'
                                    COMMENT 'PENDING|APPROVED|REJECTED|NEEDS_INFO',
    note            TEXT            COMMENT 'Ghi chú của Admin khi duyệt/từ chối',
    PRIMARY KEY (id),
    FOREIGN KEY (account_id) REFERENCES account(id) ON DELETE CASCADE,
    INDEX idx_kyc_status (status)
) ENGINE=InnoDB COMMENT='Hồ sơ xác minh doanh nghiệp KYC';

-- ============================================================
-- BẢNG 15: warehouse — Kho hàng
-- ============================================================
CREATE TABLE IF NOT EXISTS warehouse (
    id              BIGINT          NOT NULL AUTO_INCREMENT,
    code            VARCHAR(50)     NOT NULL UNIQUE COMMENT 'Mã kho: WH-SGN-01',
    name            VARCHAR(255)    NOT NULL COMMENT 'Tên kho',
    type            VARCHAR(100)    COMMENT 'Loại: DRY (khô), COLD (lạnh)',
    location        VARCHAR(255)    COMMENT 'Địa chỉ kho',
    manager         VARCHAR(100)    COMMENT 'Tên quản lý kho',
    phone           VARCHAR(50)     COMMENT 'SĐT quản lý',
    total_capacity  INT             COMMENT 'Tổng dung tích (tấn)',
    used_capacity   INT             COMMENT 'Đã sử dụng (tấn)',
    temperature     VARCHAR(50)     COMMENT 'Nhiệt độ bảo quản: 2°C - 8°C',
    status          VARCHAR(50)     DEFAULT 'ACTIVE' COMMENT 'ACTIVE|INACTIVE|MAINTENANCE',
    PRIMARY KEY (id),
    INDEX idx_warehouse_code (code)
) ENGINE=InnoDB COMMENT='Kho hàng nông sản';

-- ============================================================
-- BẢNG 16: inventory_batch — Lô hàng trong kho
-- ============================================================
CREATE TABLE IF NOT EXISTS inventory_batch (
    id              BIGINT          NOT NULL AUTO_INCREMENT,
    batch_code      VARCHAR(50)     NOT NULL UNIQUE COMMENT 'Mã lô: BATCH-2607-SR01',
    warehouse_id    BIGINT          COMMENT 'FK → warehouse',
    product_id      BIGINT          COMMENT 'FK → product',
    quantity        INT             COMMENT 'Số lượng (kg)',
    import_date     VARCHAR(50)     COMMENT 'Ngày nhập kho: 2026-07-25',
    expiry_date     VARCHAR(50)     COMMENT 'Ngày hết hạn: 2026-08-06',
    quality_status  VARCHAR(50)     DEFAULT 'GOOD' COMMENT 'GOOD|WARNING|EXPIRED',
    supplier_name   VARCHAR(255)    COMMENT 'Tên nhà cung cấp lô hàng',
    PRIMARY KEY (id),
    FOREIGN KEY (warehouse_id) REFERENCES warehouse(id),
    FOREIGN KEY (product_id) REFERENCES product(id),
    INDEX idx_batch_quality (quality_status)
) ENGINE=InnoDB COMMENT='Lô hàng trong kho';

-- ============================================================
-- BẢNG 17: system_alert — Cảnh báo hệ thống / AI Risk Alerts
-- ============================================================
CREATE TABLE IF NOT EXISTS system_alert (
    id          BIGINT          NOT NULL AUTO_INCREMENT,
    title       VARCHAR(255)    COMMENT 'Tiêu đề cảnh báo',
    description TEXT            COMMENT 'Mô tả chi tiết',
    risk_level  VARCHAR(50)     COMMENT 'WARNING|HIGH|LOW',
    location    VARCHAR(255)    COMMENT 'Khu vực liên quan',
    category    VARCHAR(100)    COMMENT 'PRICE_FLUCTUATION|WEATHER|QUALITY|FINANCIAL',
    created_at  VARCHAR(50)     COMMENT 'Thời điểm tạo: 2026-07-27T07:00:00',
    PRIMARY KEY (id),
    INDEX idx_alert_risk (risk_level)
) ENGINE=InnoDB COMMENT='Cảnh báo hệ thống và AI Risk Alerts';

-- ============================================================
-- BẢNG 18: audit_log — Nhật ký hoạt động Admin
-- ============================================================
CREATE TABLE IF NOT EXISTS audit_log (
    id          BIGINT          NOT NULL AUTO_INCREMENT,
    action_type VARCHAR(100)    COMMENT 'KYC_APPROVE|UPDATE_ORDER_STATUS|RESET_PASSWORD...',
    title       VARCHAR(255)    COMMENT 'Tiêu đề ngắn gọn',
    subtitle    TEXT            COMMENT 'Mô tả chi tiết hành động',
    author      VARCHAR(100)    COMMENT 'Username người thực hiện',
    created_at  VARCHAR(50)     COMMENT 'Thời điểm thực hiện',
    PRIMARY KEY (id),
    INDEX idx_auditlog_author (author),
    INDEX idx_auditlog_action (action_type)
) ENGINE=InnoDB COMMENT='Nhật ký hoạt động của Admin';
