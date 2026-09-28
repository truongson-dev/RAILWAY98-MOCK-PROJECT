# 🌾 AgriConnect — Nền tảng Giao dịch Nông sản B2B

> Hệ thống thương mại điện tử B2B chuyên biệt dành riêng cho lĩnh vực nông nghiệp, kết nối Nhà cung cấp, Đối tác thu mua và Đơn vị vận chuyển trong một chuỗi cung ứng khép kín.

---

## 📌 Giới thiệu

**Dự án giải quyết vấn đề gì?**
AgriConnect ra đời nhằm giải quyết bài toán "được mùa mất giá", tối ưu hóa chi phí logistics, và loại bỏ các khâu trung gian không cần thiết trong chuỗi cung ứng nông sản. Hệ thống giúp minh bạch hóa thông tin nguồn gốc, giá cả và chất lượng nông sản.

**Đối tượng sử dụng là ai?**
- **Nhà cung cấp (Supplier):** Hợp tác xã, trang trại, hộ nông dân.
- **Đối tác Thu mua (Partner):** Chuỗi siêu thị, nhà hàng, doanh nghiệp xuất khẩu, thương lái.
- **Đơn vị Vận chuyển (Shipper):** Công ty logistics, vận tải chuỗi lạnh (cold-chain).
- **Ban Quản trị (Admin):** Người vận hành, kiểm duyệt chứng nhận (VietGAP/GlobalGAP) và xử lý khiếu nại.

**Mục tiêu của dự án là gì?**
Xây dựng một hệ sinh thái thương mại điện tử toàn diện cho nông sản, từ khâu đăng bán, ký kết hợp đồng, mua chung (Group Buy) cho đến giao nhận, giúp số hóa hoàn toàn quy trình B2B truyền thống.

---

## ✨ Tính năng

- **Xác thực & Bảo mật:** Đăng ký / Đăng nhập, gửi mã xác thực OTP, khôi phục mật khẩu, phân quyền chặt chẽ (RBAC) bằng JWT.
- **Giao dịch thông minh:**
  - **Sàn giao dịch (Marketplace):** Tìm kiếm, lọc và đặt mua nông sản theo số lượng lớn.
  - **Mua chung (Group Buy):** Ghép đơn hàng từ nhiều đối tác để hưởng mức chiết khấu giá sỉ tốt nhất.
  - **Hợp đồng kỳ hạn (Forward Contracts):** Ký hợp đồng bao tiêu nông sản trước khi thu hoạch.
- **Quản lý Vận hành:**
  - **Nhà cung cấp:** Quản lý sản phẩm, tồn kho, theo dõi đơn hàng và doanh thu.
  - **Vận chuyển:** Tiếp nhận đơn hàng, cập nhật lộ trình giao nhận theo thời gian thực.
  - **Admin:** Phê duyệt tài khoản doanh nghiệp, quản lý danh mục và khóa tài khoản vi phạm.
- **Hệ thống hỗ trợ:** Tích hợp AI Assistant, thông báo (Notification) tự động và tùy chỉnh hồ sơ/ảnh đại diện.

---

## 🛠️ Công nghệ sử dụng

### Frontend
- Next.js 15
- ReactJS
- Tailwind CSS
- Zustand (State Management)
- Axios & TypeScript

### Backend
- Spring Boot 3.2.5
- Java 17
- Spring Security (JWT)
- Spring Data JPA
- Swagger / OpenAPI 3

### Database
- MySQL 8.0

### Khác
- JWT Authentication
- Google OAuth2 Login
- Mailtrap / SMTP (Gửi OTP)
- Git / GitHub

---

## 📂 Cấu trúc thư mục

```text
RAILWAY98-MOCK-PROJECT/
├── AgriConectBE/          # Spring Boot 3.2.5 — Backend REST API
│   ├── src/main/java/com/vti/
│   │   ├── module/        # Phân chia logic theo module: auth, account, product...
│   │   ├── config/        # Cấu hình Security, Swagger, CORS
│   │   ├── exception/     # Xử lý lỗi tập trung
│   │   └── security/      # JWT Filter & UserDetails
│   └── pom.xml            # Quản lý thư viện Maven
│
├── AgriConectFE/          # Next.js 15 — Frontend
│   ├── src/
│   │   ├── app/           # App Router (Pages: auth, dashboard...)
│   │   ├── components/    # Reusable UI Components
│   │   ├── services/      # Axios call API
│   │   ├── store/         # Zustand global state (authStore, uiStore)
│   │   └── types/         # TypeScript Interfaces
│   └── package.json
│
├── agriconnect_db.sql     # File Database SQL cấu trúc chuẩn
├── .gitignore
└── README.md
```

---

## ⚙️ Cài đặt

### 1. Clone project
```bash
git clone https://github.com/truongson-dev/RAILWAY98-MOCK-PROJECT.git
cd RAILWAY98-MOCK-PROJECT
```

### 2. Cài đặt Backend
```bash
cd AgriConectBE
# Khôi phục các thư viện Maven
./mvnw clean install
# Chạy Spring Boot Server
./mvnw spring-boot:run
```
> **Backend chạy tại:** `http://localhost:8080`

### 3. Cài đặt Frontend
Mở một Terminal khác:
```bash
cd AgriConectFE
# Cài đặt thư viện Node.js (Chỉ chạy lần đầu)
npm install
# Khởi chạy giao diện
npm run dev
```
> **Frontend chạy tại:** `http://localhost:3000`

---

## 🔐 Cấu hình

Tạo file (hoặc cấu hình trực tiếp) trong `AgriConectBE/src/main/resources/application.properties`:

```properties
# Thông tin DB
spring.datasource.url=jdbc:mysql://localhost:3306/agriconnect_db?useSSL=false&allowPublicKeyRetrieval=true&characterEncoding=UTF-8
spring.datasource.username=root
spring.datasource.password=

# JWT Secret Key
jwt.secret=thisismyverysecureandlongsecretkeyforjwttoken

# Google OAuth2 Credentials
spring.security.oauth2.client.registration.google.client-id=YOUR_GOOGLE_CLIENT_ID.apps.googleusercontent.com
spring.security.oauth2.client.registration.google.client-secret=YOUR_GOOGLE_CLIENT_SECRET
```

> ⚠️ **Lưu ý quan trọng:** Không bao giờ commit các thông tin nhạy cảm như password, API key thực tế hoặc JWT secret production lên GitHub. Các key ở trên chỉ dùng cho môi trường Local / MOCK.

---

## 🗄️ Database

Thông tin database để kết nối:

| Thành phần | Giá trị |
| :--- | :--- |
| **Hệ quản trị** | MySQL 8.0+ |
| **Database name** | `agriconnect_db` |
| **Port** | `3306` |
| **File Import (Dữ liệu mẫu)** | `agriconnect_db.sql` (ở thư mục gốc) |

---

## 🎯 Hướng Dẫn Kiểm Thử (Dành cho QA)

Để test các luồng đã hoàn thiện, QA cần tự tạo tài khoản:
1. Mở trang Đăng ký (`http://localhost:3000/auth/register`), tự điền form và tạo tài khoản (VD: vai trò Nhà cung cấp).
2. **Duyệt tài khoản:** Mở Database MySQL (`agriconnect_db`), bảng `accounts`, đổi cột `status` của tài khoản vừa tạo thành `ACTIVE`.
3. Đăng nhập và bắt đầu sử dụng hệ thống.
