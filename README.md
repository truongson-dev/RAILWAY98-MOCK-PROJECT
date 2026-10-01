# AgriConnect

> Hệ thống kết nối Nông dân và Đối tác thu mua nông sản trực tiếp, minh bạch và hiệu quả.

## 📌 Giới thiệu

Mô tả dự án:
- Dự án giải quyết vấn đề gì? AgriConnect giải quyết bài toán trung gian trong chuỗi cung ứng nông sản, giúp người nông dân có thể bán trực tiếp sản phẩm của mình cho các đối tác thu mua với giá cả minh bạch và có hợp đồng rõ ràng (Forward Contract, Escrow Contract).
- Đối tượng sử dụng là ai? Nông dân (Supplier), Đối tác thu mua (Partner), Tài xế vận chuyển (Shipper) và Quản trị viên (Admin).
- Mục tiêu của dự án là gì? Số hóa chuỗi cung ứng nông sản, đảm bảo an toàn giao dịch thông qua cơ chế đặt cọc (Escrow) và tối ưu hóa vận chuyển.

## ✨ Tính năng

- Đăng ký / Đăng nhập
- Quản lý tài khoản (Đăng ký tài khoản cần được Admin duyệt mới có thể đăng nhập)
- Quản lý sản phẩm và kho hàng (Dành cho Supplier)
- Mua chung (Group Buy) & Hợp đồng tương lai (Forward Contract)
- Quản lý thanh toán an toàn (Escrow)
- Quản lý đơn hàng và vận chuyển (Dành cho Shipper và Partner)

## 🛠️ Công nghệ sử dụng

### Frontend
- ReactJS
- HTML / CSS / JavaScript
- Tailwind CSS

### Backend
- Spring Boot
- Java
- REST API
- Spring Security

### Database
- MySQL

### Khác
- JWT Authentication
- Git / GitHub

## 📂 Cấu trúc thư mục

```text
AgriConnect/
├── AgriConectFE/
│   ├── src/
│   ├── public/
│   └── package.json
│
├── AgriConectBE/
│   ├── src/
│   └── pom.xml
│
├── .gitignore
└── README.md
```

## ⚙️ Cài đặt

1. Clone project
```bash
git clone https://github.com/username/project-name.git
cd project-name
```

2. Cài đặt Frontend
```bash
cd AgriConectFE
npm install
npm run dev
```

3. Cài đặt Backend
```bash
cd AgriConectBE
mvn install
mvn spring-boot:run
```

## 🔐 Cấu hình

Tạo file .env và cấu hình (Frontend):
```env
VITE_API_BASE_URL=http://localhost:8080/api
```

Cấu hình Backend (`application.properties`):
```properties
DB_HOST=localhost
DB_PORT=3306
DB_NAME=project_db
DB_USERNAME=root
DB_PASSWORD=
JWT_SECRET=your_secret
spring.security.oauth2.client.registration.google.client-id=YOUR_GOOGLE_CLIENT_ID
spring.security.oauth2.client.registration.google.client-secret=YOUR_GOOGLE_CLIENT_SECRET
```
*Lưu ý: Không commit các thông tin nhạy cảm như password, API key hoặc secret lên GitHub.*

## 🗄️ Database

Thông tin database:

| Thành phần | Giá trị |
| --- | --- |
| Database | MySQL |
| Database name | project_db |
| Port | 3306 |
