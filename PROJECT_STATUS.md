# 📊 PROJECT STATUS — AgriConnect (Cập nhật 29/07/2026)

> Tài liệu tổng hợp tiến độ toàn dự án. Cập nhật mỗi khi có merge lớn vào `main`.

---

## 🏗️ Kiến trúc tổng thể

```
┌─────────────────────────────────────────────────────────┐
│                    AgriConectFE (Next.js 15)             │
│                                                         │
│  /auth/login       /admin      /dashboard/partner       │
│  /auth/register               /dashboard/supplier       │
│                               /dashboard/shipper        │
└─────────────────────┬───────────────────────────────────┘
                      │ HTTP (Axios + JWT interceptor)
                      ▼
┌─────────────────────────────────────────────────────────┐
│                AgriConectBE (Spring Boot 3.2.5)          │
│                                                         │
│  /api/auth/**      /api/admin/**    /api/products/**    │
│  /api/supplier/**  /api/shipper/**  /api/categories/**  │
└─────────────────────┬───────────────────────────────────┘
                      │ JPA / Hibernate
                      ▼
              MySQL 8.0 (agriconnect_db)
```

---

## ✅ Đã hoàn thành

### Backend
- [x] Database schema 21 bảng (`V1__init_schema.sql`)
- [x] Kiến trúc Domain-Driven (chia module: auth, product, order, shipment, contract...)
- [x] Spring Security + JWT (AccessToken + RefreshToken)
- [x] OAuth2 Google Login (cấu hình sẵn)
- [x] API Authentication (Register → OTP → Login → Refresh)
- [x] RBAC: phân quyền theo Role (ADMIN, PARTNER, SUPPLIER, SHIPPER)
- [x] Admin API: Duyệt/Từ chối tài khoản
- [x] Product API: CRUD sản phẩm (Public GET, Protected POST/PUT/DELETE)
- [x] Category API: GET danh mục
- [x] CORS cấu hình cho `localhost:3000` và `localhost:3001`
- [x] Swagger UI tại `/swagger-ui.html`
- [x] Notification entity (cơ bản)
- [x] Supplier Order Controller (skeleton)
- [x] Shipper Shipment Controller (skeleton)
- [x] Partner/Supplier Contract Controller (skeleton)

### Frontend
- [x] Auth pages: Login, Register + OTP Modal
- [x] Route guard theo Role (redirect đúng dashboard)
- [x] Zustand auth store (persist JWT vào localStorage)
- [x] Axios interceptor tự động gắn Bearer token
- [x] **Admin Dashboard**: Users Management (List, Duyệt, Từ chối, Khóa)
- [x] **Partner Dashboard**: Marketplace B2B, Group Buy, Forward Contract, Order tracking
- [x] **Supplier Dashboard**: Farm Management, Product Catalog, Inventory, Analytics, AI Chat
- [x] **Shipper Dashboard**: Shipment list, Fleet Management, Route View, Tracking
- [x] Kết nối `FarmManagementView` với API thật (createProduct → DB)
- [x] Seed 4 danh mục mặc định (Trái cây, Cây công nghiệp, Lúa gạo, Rau củ)
- [x] Toast notification UI

---

## 🔄 Đang làm (In Progress)

| Feature | Người làm | Tiến độ |
|---|---|---|
| Form thêm sản phẩm 3 bước | Thanh Sơn | 60% |
| Hợp đồng kỳ hạn Supplier | Thanh Sơn | 70% |
| Mua chung Supplier | Thanh Sơn | 70% |
| Dashboard thống kê Admin | Nguyễn Sơn | 40% |

---

## ⬜ Chưa làm (Todo)

### Auth (Tiến)
- [ ] Logout API (revoke refresh token)
- [ ] View/Update Profile
- [ ] Change Password

### Admin (Nguyễn Sơn)
- [ ] Category CRUD (Admin UI)
- [ ] Lock/Unlock account
- [ ] Revenue dashboard + charts
- [ ] Notification system

### Supplier (Thanh Sơn)
- [ ] Lấy sản phẩm của riêng Supplier từ API
- [ ] Sửa / Xóa sản phẩm (kết nối API)
- [ ] Xác nhận đơn hàng
- [ ] Báo cáo doanh thu Supplier

### Shipper (Lâm)
- [ ] Nhận đơn giao hàng (API)
- [ ] Cập nhật trạng thái giao (API)
- [ ] Upload Proof of Delivery
- [ ] Lịch sử chuyến hàng (API)

### Partner (Chưa phân công)
- [ ] Đặt hàng từ Marketplace
- [ ] Giỏ hàng + Checkout
- [ ] Tham gia Group Buy
- [ ] Ký hợp đồng kỳ hạn

---

## 🐛 Lỗi đã biết (Known Issues)

| Lỗi | Trạng thái | Ghi chú |
|---|---|---|
| Axios 401 khi chưa login | ✅ Fixed | Đã gắn JWT interceptor vào `axios.ts` |
| Import `getAuthHeader` không tồn tại | ✅ Fixed | Sửa trong `supplier.service.ts` |
| NaN trong form Group Buy | ✅ Fixed | Thêm `minOrderKg` vào mock object |
| Port 3000 bị chiếm | ✅ Fixed | Kill PID và khởi động lại |
| Danh mục DB trống | ✅ Fixed | Chạy `seed.py` để insert 4 danh mục |
| Backend compile lỗi Lombok | ✅ Fixed | Chạy `mvn clean` trước khi build |

---

## 📁 Cấu trúc thư mục hiện tại

```
AgriConectFE/src/
├── app/
│   ├── auth/login/          ✅
│   ├── auth/register/       ✅
│   ├── admin/               ✅
│   ├── dashboard/partner/   ✅
│   ├── dashboard/supplier/  ✅
│   └── dashboard/shipper/   ✅
├── components/
│   ├── admin/               ✅ UsersManagementView
│   ├── pages/               ✅ PartnerApp, SupplierDashboard, ShipperDashboard, AdminDashboard
│   ├── partner/             ✅ Views cho Partner
│   ├── supplier/            ✅ Views cho Supplier (Farm, Inventory, ForwardContract...)
│   ├── shipper/             ✅ Views cho Shipper (Fleet, Route, Tracking...)
│   ├── modals/              ✅ MarketplaceModal
│   └── shared/              ✅ Components dùng chung
├── services/
│   ├── partner.service.ts   ✅ Kết nối API products, group-buys, contracts
│   ├── supplier.service.ts  ✅ Tạo sản phẩm, lấy sản phẩm
│   └── product.service.ts   ⬜ Placeholder
├── store/
│   └── authStore.ts         ✅ Zustand + persist JWT
├── lib/
│   └── axios.ts             ✅ Axios instance + JWT auto-attach
└── hooks/
    └── useAuth.ts           ✅

AgriConectBE/src/main/java/com/vti/
├── module/
│   ├── auth/                ✅ Login, Register, OTP, JWT
│   ├── account/             ✅ Admin, Partner, Supplier, Shipper entities
│   ├── product/             ✅ Product CRUD, Category
│   ├── order/               🔄 Skeleton Supplier order controller
│   ├── shipment/            🔄 Skeleton Shipper controller
│   ├── contract/            🔄 Skeleton Forward Contract
│   └── notification/        🔄 Entity cơ bản
├── config/                  ✅ Security, CORS, Swagger
└── security/                ✅ JWT Filter, UserDetails
```

---

## 📅 Lịch sử commit lớn

| Ngày | Commit | Mô tả |
|---|---|---|
| 27/07/2026 | `2c0af6d` | Merge feature/authentication-api |
| 28/07/2026 | `beda61a` | Merge & resolve conflicts |
| 29/07/2026 | `32b7f18` | Integrate Supplier/Shipper/Partner dashboards vào Next.js, xóa Vite cũ |

---

*Cập nhật lần cuối: 29/07/2026 | Thanh Sơn*
