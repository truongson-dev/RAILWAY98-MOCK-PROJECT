# 📋 TEAM WORKFLOW — AgriConnect

> Tài liệu phân công task theo Business Flow cho 4 thành viên.
> Mỗi người chịu trách nhiệm **toàn bộ luồng**: DB → Entity → Service → API → Frontend → Test.

---

## 👥 Phân công chi tiết

---

### 🔐 Tiến — Auth & User Management

**Mục tiêu:** Hoàn thành TRƯỚC để team khác dùng được JWT

| # | Task | Layer | Trạng thái |
|---|---|---|---|
| 1 | Đăng ký tài khoản | FE + BE | ✅ Done |
| 2 | Xác thực OTP email | FE + BE | ✅ Done |
| 3 | Đăng nhập → trả JWT | FE + BE | ✅ Done |
| 4 | Refresh Token | BE | ✅ Done |
| 5 | Logout (revoke token) | BE | ⬜ Todo |
| 6 | Xem/Cập nhật Profile | FE + BE | ⬜ Todo |
| 7 | Đổi mật khẩu | FE + BE | ⬜ Todo |
| 8 | RBAC Guard API theo Role | BE (Security) | ✅ Done |
| 9 | Menu/Route theo Role | FE | ✅ Done |
| 10 | Cung cấp mock JWT cho team | Doc | ✅ Done |

**API chịu trách nhiệm:**
```
POST /api/auth/register
POST /api/auth/verify-email
POST /api/auth/login
POST /api/auth/refresh-token
POST /api/auth/logout
GET  /api/auth/profile
PUT  /api/auth/profile
PUT  /api/auth/change-password
```

---

### 🛠️ Nguyễn Sơn — Admin System

**Bắt đầu sau khi:** Tiến xong Login + JWT

| # | Task | Layer | Trạng thái |
|---|---|---|---|
| 1 | Dashboard Admin (thống kê tổng quan) | FE + BE | 🔄 In Progress |
| 2 | Quản lý tất cả User (list, search, filter) | FE + BE | 🔄 In Progress |
| 3 | Duyệt tài khoản Supplier/Partner/Shipper | FE + BE | ✅ Done |
| 4 | Từ chối tài khoản (có lý do) | FE + BE | ✅ Done |
| 5 | Khóa/Mở khóa tài khoản | FE + BE | ⬜ Todo |
| 6 | Quản lý Category (CRUD) | FE + BE | ⬜ Todo |
| 7 | Hệ thống Notification Admin | FE + BE | ⬜ Todo |
| 8 | Báo cáo & Thống kê (Revenue, Orders) | FE + BE | ⬜ Todo |

**API chịu trách nhiệm:**
```
GET    /api/admin/accounts
GET    /api/admin/accounts/{id}
PATCH  /api/admin/accounts/{id}/approve
PATCH  /api/admin/accounts/{id}/reject
PATCH  /api/admin/accounts/{id}/lock
GET    /api/admin/categories
POST   /api/admin/categories
PUT    /api/admin/categories/{id}
DELETE /api/admin/categories/{id}
GET    /api/admin/stats/dashboard
GET    /api/admin/notifications
```

---

### 🌾 Thanh Sơn — Supplier System

**Bắt đầu sau khi:** Tiến xong JWT + Nguyễn Sơn xong Category

| # | Task | Layer | Trạng thái |
|---|---|---|---|
| 1 | Dashboard Supplier (tổng quan nông trại) | FE | ✅ Done |
| 2 | Quản lý hồ sơ nông trại | FE + BE | ⬜ Todo |
| 3 | Đăng sản phẩm mới (3 bước) | FE + BE | 🔄 In Progress |
| 4 | Xem danh sách sản phẩm của mình | FE + BE | 🔄 In Progress |
| 5 | Sửa / Xóa sản phẩm | FE + BE | ⬜ Todo |
| 6 | Quản lý kho (Inventory) | FE | ⬜ Todo |
| 7 | Nhận & xác nhận đơn hàng | FE + BE | ⬜ Todo |
| 8 | Theo dõi trạng thái đơn | FE + BE | ⬜ Todo |
| 9 | Hợp đồng kỳ hạn (Forward Contract) | FE + BE | 🔄 In Progress |
| 10 | Mua chung (Group Buy) | FE + BE | 🔄 In Progress |
| 11 | Báo cáo Supplier (Revenue, Analytics) | FE | ⬜ Todo |

**API chịu trách nhiệm:**
```
GET    /api/products?sellerId={id}       ← Sản phẩm của mình
POST   /api/admin                        ← Tạo sản phẩm (dùng tạm endpoint này)
PUT    /api/admin/{id}                   ← Cập nhật sản phẩm
DELETE /api/admin/{id}                   ← Xóa sản phẩm
GET    /api/supplier/orders              ← Đơn hàng nhận được
PATCH  /api/supplier/orders/{id}/confirm ← Xác nhận đơn
GET    /api/forward-contracts            ← Hợp đồng kỳ hạn
POST   /api/forward-contracts
GET    /api/group-buys                   ← Mua chung
POST   /api/group-buys
```

---

### 🚚 Lâm — Shipping Workflow

**Bắt đầu sau khi:** Tiến xong JWT + Thanh Sơn xong luồng đơn hàng

| # | Task | Layer | Trạng thái |
|---|---|---|---|
| 1 | Dashboard Shipper (tổng quan xe/đội) | FE | ✅ Done |
| 2 | Danh sách đơn hàng chờ giao | FE + BE | ⬜ Todo |
| 3 | Nhận đơn giao hàng | FE + BE | ⬜ Todo |
| 4 | Cập nhật trạng thái giao (Đang lấy / Đang giao / Đã giao) | FE + BE | ⬜ Todo |
| 5 | Tracking code & lộ trình giao hàng | FE + BE | ⬜ Todo |
| 6 | Proof of Delivery (ảnh xác nhận) | FE + BE | ⬜ Todo |
| 7 | Lịch sử chuyến hàng đã giao | FE + BE | ⬜ Todo |
| 8 | Quản lý đội xe (Fleet) | FE | ✅ Done |

**API chịu trách nhiệm:**
```
GET    /api/shipper/orders                        ← Đơn chờ giao
PATCH  /api/shipper/orders/{id}/accept            ← Nhận đơn
PATCH  /api/shipper/shipments/{id}/status         ← Cập nhật trạng thái
POST   /api/shipper/shipments/{id}/proof          ← Upload ảnh xác nhận
GET    /api/shipper/shipments/history             ← Lịch sử
```

---

## 🔁 Quy trình Git

```bash
# 1. Luôn pull trước khi làm
git pull origin main

# 2. Tạo branch theo format
git checkout -b feature/[ten]/[tinh-nang]
# Ví dụ:
# feature/tien/refresh-token
# feature/nguyen-son/category-management
# feature/thanh-son/product-create-form
# feature/lam/shipper-order-accept

# 3. Commit theo chuẩn
git commit -m "feat: mô tả tính năng"
git commit -m "fix: mô tả lỗi được sửa"
git commit -m "refactor: cải thiện code"
git commit -m "docs: cập nhật tài liệu"

# 4. Push branch lên remote
git push origin feature/[ten]/[tinh-nang]

# 5. Tạo Pull Request trên GitHub → Tag 1 người review
```

---

## ✅ Checklist hoàn thành mỗi Feature

Trước khi tạo PR, mỗi member phải tự check:

```
[ ] Database: Đã tạo/sửa table nếu cần
[ ] Entity/DTO: Đã định nghĩa đầy đủ field
[ ] Repository: Đã có query cần thiết
[ ] Service: Business logic hoàn chỉnh
[ ] Controller: API endpoint đúng HTTP method + path
[ ] Security: Endpoint được bảo vệ đúng Role
[ ] Validation: Input được validate (@Valid, @NotBlank...)
[ ] Error handling: Trả về lỗi rõ ràng, có message
[ ] Frontend: UI kết nối API, loading state, error state
[ ] Swagger: API được document đầy đủ
[ ] Test: Đã test thủ công tất cả happy path + edge case
```

---

## 🔗 Luồng phối hợp giữa các member

```
Tiến (Auth)
    ↓ merge JWT xong
    ↓
Nguyễn Sơn (Admin)          Thanh Sơn (Supplier)
Dùng JWT để test API         Dùng JWT để test API
    ↓                               ↓
Admin duyệt Supplier        Supplier tạo sản phẩm
    ↓_______________________________|
                ↓
    Supplier nhận đơn từ Partner
                ↓
          Lâm (Shipper)
    Nhận lệnh giao → Update status
                ↓
         ✅ Đơn hoàn thành
```

---

## 📌 Điểm chú ý chung

> ⚠️ **Không sửa file của người khác** nếu không báo trước qua chat nhóm.

> ⚠️ **Không merge trực tiếp vào `main`** — luôn tạo PR.

> ✅ Nếu cần thêm bảng DB — báo team trong nhóm chat trước khi thêm vào migration.

> ✅ API Base URL: `http://localhost:8080/api` (development)

---

*Cập nhật lần cuối: 29/07/2026 — Tech Lead review*
