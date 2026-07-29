# 🌾 AgriConnect — Nền tảng Giao dịch Nông sản B2B

<div align="center">
  <img src="https://img.shields.io/badge/Spring%20Boot-3.2.5-brightgreen?style=for-the-badge&logo=spring" />
  <img src="https://img.shields.io/badge/Next.js-15.3-black?style=for-the-badge&logo=next.js" />
  <img src="https://img.shields.io/badge/MySQL-8.0-blue?style=for-the-badge&logo=mysql" />
  <img src="https://img.shields.io/badge/Java-17-orange?style=for-the-badge&logo=java" />
</div>

<br />

> **AgriConnect** là nền tảng B2B kết nối Nhà nông (Supplier) — Đối tác Thu mua (Partner) — Đơn vị Vận chuyển (Shipper), được quản lý tập trung bởi Admin.

---

## 📦 Cấu trúc dự án

```
RAILWAY98-MOCK-PROJECT/
├── AgriConectBE/          # Spring Boot 3.2.5 — Backend REST API
├── AgriConectFE/          # Next.js 15 — Frontend toàn bộ role
├── agriconnect_db.sql     # Schema + data mẫu ban đầu
├── seed.py                # Script Python seed danh mục nhanh
└── PROJECT_STATUS.md      # Trạng thái tiến độ dự án
```

---

## 🚀 Hướng dẫn cài đặt & chạy

### Yêu cầu hệ thống

| Công cụ | Phiên bản |
|---|---|
| Java (JDK) | 17+ |
| Node.js | 18+ (khuyên dùng v20) |
| MySQL | 8.0+ |
| Python | 3.x (chỉ cần nếu chạy seed.py) |

---

### Bước 1 — Khởi tạo Database

```sql
-- Tạo database
CREATE DATABASE agriconnect_db
  DEFAULT CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;
```

Sau đó **import** file `agriconnect_db.sql` vào database vừa tạo.

Seed danh mục mặc định (chỉ chạy 1 lần):
```bash
pip install pymysql
python seed.py
```

---

### Bước 2 — Chạy Backend (Spring Boot)

```bash
cd AgriConectBE

# Windows
.\mvnw.cmd spring-boot:run

# Mac / Linux
./mvnw spring-boot:run
```

> ✅ Backend chạy tại: **http://localhost:8080**
> 📖 Swagger UI: **http://localhost:8080/swagger-ui.html**

Kiểm tra file `AgriConectBE/src/main/resources/application.properties` — đảm bảo thông tin DB khớp với máy:
```properties
spring.datasource.username=root
spring.datasource.password=       # để trống nếu không có mật khẩu
```

---

### Bước 3 — Chạy Frontend (Next.js)

```bash
cd AgriConectFE
npm install        # Chỉ cần chạy lần đầu
npm run dev -- -p 3000
```

> ✅ Frontend chạy tại: **http://localhost:3000**

---

## 🔑 Tài khoản test mặc định

| Role | Email | Mật khẩu |
|---|---|---|
| **Admin** | admin@gmail.com | 123456 |
| **Partner** | partner@gmail.com | 123456 |
| **Supplier** | supplier@gmail.com | 123456 |
| **Shipper** | shipper@gmail.com | 123456 |

---

## 🗺️ Sơ đồ luồng nghiệp vụ

```
[Supplier] Đăng sản phẩm
     ↓
[Admin] Duyệt tài khoản / sản phẩm
     ↓
[Partner] Browse sàn → Đặt đơn → Thanh toán
     ↓
[Supplier] Nhận & xác nhận đơn
     ↓
[Shipper] Nhận lệnh → Giao hàng → Cập nhật trạng thái
     ↓
[Partner] Nhận hàng ✅
```

---

## 🧑‍💻 Phân công team

| Thành viên | Luồng nghiệp vụ |
|---|---|
| **Tiến** | Auth & User Management (Login → JWT → RBAC) |
| **Nguyễn Sơn** | Admin System (Duyệt User → Category → Dashboard) |
| **Thanh Sơn** | Supplier System (Đăng sản phẩm → Quản lý đơn) |
| **Lâm** | Shipping Workflow (Nhận đơn → Giao hàng → Tracking) |

> Chi tiết phân công xem tại: [`TEAM_WORKFLOW.md`](./TEAM_WORKFLOW.md)

---

## 📡 API Endpoints chính

| Method | Endpoint | Mô tả | Auth |
|---|---|---|---|
| POST | `/api/auth/login` | Đăng nhập | Public |
| POST | `/api/auth/register` | Đăng ký | Public |
| POST | `/api/auth/verify-email` | Xác thực OTP | Public |
| GET | `/api/products` | Lấy danh sách sản phẩm | Public |
| POST | `/api/admin` | Tạo sản phẩm mới | SUPPLIER/ADMIN |
| GET | `/api/admin/accounts` | Quản lý tài khoản | ADMIN |
| GET | `/api/categories` | Danh sách danh mục | Public |

---

## 🏗️ Tech Stack

### Backend
- **Spring Boot 3.2.5** — REST API Framework
- **Spring Security + JWT** — Authentication & Authorization
- **Spring Data JPA + Hibernate** — ORM
- **MySQL 8.0** — Database
- **Flyway** — Database Migration
- **Lombok** — Boilerplate reduction
- **Swagger/OpenAPI 3** — API Documentation

### Frontend
- **Next.js 15** (App Router) — React Framework
- **TypeScript** — Type safety
- **Tailwind CSS** — Styling
- **Zustand** — State Management
- **Axios** — HTTP Client (với JWT interceptor tự động)
- **Recharts** — Biểu đồ / Analytics
- **Lucide React** — Icon library

---

## ⚙️ Lưu ý khi phát triển

```bash
# Mỗi khi bắt đầu làm việc
git pull origin main

# Tạo branch theo format
git checkout -b feature/[ten-thanh-vien]-[ten-tinh-nang]
# Ví dụ: feature/tien-refresh-token

# Commit theo Conventional Commits
git commit -m "feat: add refresh token endpoint"
git commit -m "fix: correct JWT expiry validation"
git commit -m "docs: update API documentation"
```

> ⚠️ **Không push thẳng lên `main`**. Tạo PR và cần ít nhất 1 người review trước khi merge.

---

*Cập nhật lần cuối: 29/07/2026 — Team AgriConnect*
