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
│   └── src/main/java/com/vti/
│       ├── module/        # Modules: auth, account, product, order, shipment, contract, notification
│       ├── config/        # Security, CORS, Swagger
│       └── security/      # JWT Filter, UserDetails
├── AgriConectFE/          # Next.js 15 — Frontend toàn bộ role
│   └── src/
│       ├── app/           # Routes: auth, admin, dashboard/partner, dashboard/supplier, dashboard/shipper
│       ├── components/    # UI Components theo tính năng
│       ├── services/      # Axios services API gọi Backend
│       ├── store/         # Zustand + persist JWT
│       ├── lib/           # Axios instance + JWT auto-attach
│       └── hooks/         # Custom hooks
└── agriconnect_db.sql     # Schema + data mẫu ban đầu
```

---

## 🚀 Hướng dẫn cài đặt & chạy

### Yêu cầu hệ thống

| Công cụ | Phiên bản |
|---|---|
| Java (JDK) | 17+ |
| Node.js | 18+ (khuyên dùng v20) |
| MySQL | 8.0+ |
| Python | 3.x (để chạy script tạo dữ liệu mẫu) |

---

### Bước 1 — Khởi tạo Database

```sql
-- Tạo database
CREATE DATABASE agriconnect_db
  DEFAULT CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;
```

Sau đó **import** file `agriconnect_db.sql` vào database vừa tạo.

**Seed danh mục mặc định:** Tạo file `seed.py` với nội dung bên dưới và chạy để thêm 4 danh mục cơ bản vào DB (chỉ chạy 1 lần):
```python
import pymysql

conn = pymysql.connect(host='localhost', user='root', password='', database='agriconnect_db')
cursor = conn.cursor()
cats = [
    (1, 'Trái cây ăn quả', 'Fruits', 'Các loại trái cây tươi'),
    (2, 'Cây công nghiệp', 'Industrial Crops', 'Cà phê, tiêu, điều...'),
    (3, 'Lúa gạo & Lương thực', 'Rice & Grains', 'Lúa gạo và các loại ngũ cốc'),
    (4, 'Rau củ quả sạch', 'Vegetables', 'Rau củ hữu cơ, an toàn')
]

for cat in cats:
    try:
        cursor.execute("INSERT IGNORE INTO categories (id, name, nameEn, description) VALUES (%s, %s, %s, %s)", cat)
    except Exception as e:
        print(f"Error: {e}")

conn.commit()
cursor.close()
conn.close()
print("Seed categories done!")
```

Chạy script bằng lệnh:
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

Kiểm tra file `AgriConectBE/src/main/resources/application.properties` — đảm bảo thông tin DB khớp với máy (mặc định user root, không password).

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

```text
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

## 🧑‍💻 Phân công & Tiến độ (Cập nhật 29/07/2026)

> Mỗi người chịu trách nhiệm **toàn bộ luồng**: DB → Entity → Service → API → Frontend → Test.

### 🔐 Tiến — Auth & User Management (Hoàn thành trước tiên)
- [x] Đăng ký, Login, OTP, Trả JWT
- [x] Refresh Token
- [x] RBAC Guard API theo Role & Route guard theo Role (FE)
- [ ] Logout API (revoke refresh token), Cập nhật Profile, Đổi mật khẩu

### 🛠️ Nguyễn Sơn — Admin System
- [x] Duyệt, từ chối tài khoản Supplier/Partner/Shipper
- [ ] Dashboard thống kê Admin (Đang làm 40%)
- [ ] Quản lý User (List, khóa/mở khóa)
- [ ] Quản lý Category CRUD
- [ ] Hệ thống Notification

### 🌾 Thanh Sơn — Supplier System
- [x] Dashboard Supplier
- [x] Form thêm sản phẩm 3 bước (Đang làm 60%)
- [x] Hợp đồng kỳ hạn Supplier (Đang làm 70%)
- [x] Mua chung Supplier (Đang làm 70%)
- [ ] Lấy danh sách sản phẩm riêng, sửa/xóa sản phẩm
- [ ] Xác nhận đơn hàng, Quản lý kho, Báo cáo doanh thu

### 🚚 Lâm — Shipping Workflow
- [x] Dashboard Shipper (tổng quan đội xe)
- [ ] Danh sách đơn chờ giao & nhận đơn
- [ ] Cập nhật trạng thái (Đang lấy / Đang giao / Đã giao)
- [ ] Upload Proof of Delivery & Tracking code

### 🛒 Partner (Chưa phân công)
- [ ] Đặt hàng từ Marketplace & Checkout
- [ ] Tham gia Group Buy & Ký hợp đồng kỳ hạn

---

## 🐛 Lỗi đã biết (Known Issues)

| Lỗi | Trạng thái | Ghi chú |
|---|---|---|
| Axios 401 khi chưa login | ✅ Fixed | Đã gắn JWT interceptor vào `axios.ts` |
| Import `getAuthHeader` không tồn tại | ✅ Fixed | Sửa trong `supplier.service.ts` |
| NaN trong form Group Buy | ✅ Fixed | Thêm `minOrderKg` vào mock object |
| Backend compile lỗi Lombok | ✅ Fixed | Chạy `mvn clean` trước khi build |

---

## ⚙️ Quy trình Git & Team Workflow

```bash
# 1. Luôn pull trước khi làm
git pull origin main

# 2. Tạo branch theo format: feature/[ten]/[tinh-nang]
git checkout -b feature/tien/refresh-token

# 3. Commit theo chuẩn Conventional Commits
git commit -m "feat: mô tả tính năng"
git commit -m "fix: mô tả lỗi được sửa"

# 4. Push branch lên remote
git push origin feature/tien/refresh-token

# 5. Tạo Pull Request trên GitHub → Tag 1 người review
```

> ⚠️ **Không push thẳng lên `main`** — luôn tạo PR.
> ⚠️ **Không sửa file của người khác** nếu không báo trước qua chat nhóm.
> ✅ Nếu cần thêm bảng DB — báo team trong nhóm chat trước khi thêm vào migration.
