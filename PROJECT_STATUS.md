# BÁO CÁO TRẠNG THÁI DỰ ÁN AGRICONNECT (Cập nhật 27/07/2026)

Tài liệu này cung cấp cái nhìn tổng quan cho team về những gì đã được hoàn thành, cấu trúc thư mục mới nhất, và luồng chạy của các tính năng cốt lõi.

---

## 1. CÁC CHỨC NĂNG ĐÃ HOÀN THÀNH

### 1.1. Backend (Spring Boot 3.3.5)
- **Thiết kế Database (21 bảng):** Khởi tạo thành công qua file `V1__init_schema.sql`, sử dụng Enum thay cho chuỗi và hỗ trợ JPA JOINED Inheritance cho các loại tài khoản (Partner, Supplier, Shipper, Admin).
- **Security & Authentication:** 
  - Cấu hình Spring Security với JWT (JSON Web Token).
  - Hoàn thiện bộ API Xác thực (Login, Đăng ký, Cấp lại Token).
  - Tích hợp dịch vụ gửi Email SMTP cho mã xác thực (OTP).
- **Quản lý Tài khoản (Account Management):**
  - Xử lý thành công lỗi phân quyền (Discriminator) do sai lệch định dạng chữ hoa/thường trong DB.
  - Cung cấp API lấy danh sách tài khoản theo trạng thái (Pending, Active...) dùng cho trang Quản trị.
- **Refactor Cấu trúc:** Toàn bộ Backend đã được chuyển sang kiến trúc Domain-Driven (chia theo Module) để tránh phình to Controller/Service, giúp dễ dàng phân chia task cho team.

### 1.2. Frontend (Next.js 15)
- **Luồng Đăng nhập / Đăng ký:**
  - Hoàn thiện UI/UX cho trang Đăng nhập và Đăng ký.
  - Tích hợp thành công luồng gọi API Backend và hiển thị Modal nhập mã OTP để xác thực email người dùng mới.
- **Admin Dashboard (Trang Quản trị):**
  - Xây dựng xong bộ khung giao diện (Sidebar, Header, Main Content).
  - Hoàn thiện màn hình **Users Management** (Quản lý người dùng) với đầy đủ các tab (Chờ duyệt, Đang hoạt động, Bị khóa, Đã từ chối). Tab "Chờ duyệt" đã được kết nối với API Backend để hiển thị danh sách thực tế.
- **Partner Dashboard (Trang Đối tác/Thu mua):**
  - Khởi tạo bộ khung cơ bản bao gồm HeroBanner, Sidebar, Modal thông báo, chuẩn bị cho việc ghép API mua hàng.

---

## 2. CẤU TRÚC THƯ MỤC CHUẨN

### 2.1. Backend (`/AgriConectBE`)
Cấu trúc theo chuẩn **Domain-Driven Design (DDD)**, chia tách theo từng nghiệp vụ (Module):

```text
src/main/java/com/vti/
├── common/         # Chứa Enums (UserRole, AccountStatus...), Constants dùng chung
├── config/         # Cấu hình Security, CORS, Swagger, JPA Auditing, DbFixRunner
├── exception/      # Xử lý lỗi tập trung (GlobalExceptionHandler, Custom Exceptions)
├── module/         # Các Module nghiệp vụ chính
│   ├── account/    # (Admin, Partner, Shipper, Supplier, Account entity & API)
│   ├── auth/       # (Token, OTP, Password Reset, Auth API)
│   ├── contract/   # (Hợp đồng kỳ hạn, Điều khoản, Trạng thái giải ngân)
│   ├── order/      # (Đơn hàng, Chi tiết đơn hàng, Thanh toán)
│   ├── product/    # (Sản phẩm, Danh mục, Chứng nhận chất lượng)
│   ├── shipment/   # (Vận chuyển, Lộ trình, Cập nhật trạng thái)
│   └── system/     # (Cảnh báo hệ thống, Audit Logs)
├── security/       # Xử lý JWT Token, OAuth2, Bộ lọc Filter
└── util/           # Utility class (EmailService, FileStorage, OTP generator...)
```

### 2.2. Frontend (`/AgriConectFE`)
Cấu trúc Next.js App Router kết hợp Atomic Design:

```text
src/
├── app/            # Cấu trúc Routing của Next.js (App Router)
│   ├── (auth)/     # Các trang login, register
│   ├── admin/      # Trang dành cho Admin
│   ├── dashboard/  # Các trang dashboard phân theo role (partner, supplier, shipper)
│   └── page.tsx    # Landing page
├── components/     # Các thành phần UI có thể tái sử dụng
│   ├── admin/      # Component dành riêng cho Admin (Sidebar, UserManagement...)
│   ├── forms/      # Các form (RegisterModal, Login form...)
│   ├── partner/    # Component dành riêng cho Partner
│   ├── shared/     # Component dùng chung (Navbar, Footer, Button...)
│   └── ui/         # Base UI components (Shadcn UI)
├── hooks/          # React hooks tùy chỉnh
├── services/       # Nơi gọi API Backend (sử dụng Axios)
│   ├── api.ts      # Axios instance (Cấu hình tự động gắn Token)
│   ├── auth.service.ts
│   └── admin.service.ts
└── types/          # Định nghĩa TypeScript Interfaces (Models)
```

---

## 3. LUỒNG CHẠY CỦA CÁC CHỨC NĂNG CỐT LÕI (WORKFLOWS)

### 3.1. Luồng Đăng ký & Xác thực (Register & OTP Flow)
1. **[FE]** Người dùng điền thông tin (Email, Pass, Role...) trên `Register Form`.
2. **[FE]** Gọi API `POST /api/auth/register` qua `auth.service.ts`.
3. **[BE]** Controller nhận Request, tạo tài khoản trạng thái `PENDING_VERIFICATION` lưu vào DB (bảng `accounts` và bảng vai trò tương ứng vd `partners`).
4. **[BE]** `EmailService` sinh mã OTP 6 số, lưu vào bảng `email_verifications` và gửi email cho người dùng. Trả về Response thành công.
5. **[FE]** Giao diện hiển thị `RegisterModal` yêu cầu nhập OTP.
6. **[FE]** Người dùng nhập OTP, gọi API `POST /api/auth/verify-email`.
7. **[BE]** Kiểm tra mã OTP, nếu hợp lệ thì chuyển trạng thái tài khoản sang `PENDING_APPROVAL` (Chờ Admin duyệt).
8. **[FE]** Thông báo thành công và chuyển người dùng về trang Đăng nhập.

### 3.2. Luồng Đăng nhập (Login Flow)
1. **[FE]** Người dùng nhập Email và Mật khẩu.
2. **[FE]** Gọi API `POST /api/auth/login`.
3. **[BE]** Spring Security Authentication Manager kiểm tra thông tin. Nếu tài khoản chưa được duyệt (`PENDING_APPROVAL`), trả về lỗi 403 báo cần chờ Admin.
4. **[BE]** Nếu hợp lệ (`ACTIVE`), `JwtService` sinh ra `AccessToken` và `RefreshToken`, trả về cho FE.
5. **[FE]** Lưu Token vào LocalStorage/Cookies, chuyển hướng user tới Dashboard tương ứng với `UserRole` (ví dụ: `/dashboard/partner`).
6. **[FE]** Các request tiếp theo, Axios Interceptor tự động gắn `Authorization: Bearer <Token>` vào header.

### 3.3. Luồng Quản trị tài khoản (Admin Approval Flow)
1. **[FE]** Admin đăng nhập, vào màn hình `UsersManagementView` (Quản lý người dùng).
2. **[FE]** Ở tab "Chờ duyệt", ứng dụng gọi API `GET /api/admin/accounts?status=PENDING_APPROVAL`.
3. **[BE]** `AdminController` thông qua `AccountService` gọi DB để lấy các tài khoản có trạng thái chờ. Trả về JSON cho FE.
4. **[FE]** Hiển thị danh sách lên bảng (Table). Admin có thể xem chi tiết giấy tờ chứng nhận, ấn nút "Duyệt" hoặc "Từ chối".
5. **[FE]** Khi ấn "Duyệt", gọi API `PATCH /api/admin/accounts/{id}/approve`.
6. **[BE]** Đổi trạng thái tài khoản thành `ACTIVE`, gửi email thông báo tài khoản đã được kích hoạt thành công.

---
*Văn bản này được tạo ra nhằm đồng bộ thông tin cho toàn bộ nhóm phát triển. Mọi người lưu ý pull code mới nhất trên nhánh `main` trước khi làm việc.*
