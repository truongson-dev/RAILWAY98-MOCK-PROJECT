# 🌾 AgriConnect — Nền tảng Giao dịch Nông sản B2B

<div align="center">
  <img src="https://img.shields.io/badge/Spring%20Boot-3.2.5-brightgreen?style=for-the-badge&logo=spring" />
  <img src="https://img.shields.io/badge/Next.js-15.3-black?style=for-the-badge&logo=next.js" />
  <img src="https://img.shields.io/badge/MySQL-8.0-blue?style=for-the-badge&logo=mysql" />
  <img src="https://img.shields.io/badge/Java-17-orange?style=for-the-badge&logo=java" />
</div>

<br />

## 📖 1. Ý nghĩa và Mục tiêu dự án
**AgriConnect** là một nền tảng thương mại điện tử B2B chuyên biệt dành riêng cho lĩnh vực nông nghiệp. Hệ thống được xây dựng với mục tiêu chuyển đổi số chuỗi cung ứng nông sản, giải quyết bài toán được mùa mất giá và tối ưu hóa chi phí logistics.

**Các đối tượng chính tham gia hệ thống:**
- **Nhà cung cấp (Supplier):** Các hợp tác xã, trang trại, hộ nông dân có thể đăng bán nông sản, quản lý kho hàng, tạo các chiến dịch mua chung (Group Buy) hoặc ký kết hợp đồng kỳ hạn (Forward Contracts).
- **Đối tác Thu mua (Partner):** Các chuỗi siêu thị, nhà hàng, doanh nghiệp xuất khẩu có thể tìm kiếm nguồn hàng lớn, chất lượng cao, tham gia gom đơn để được giá sỉ tốt nhất.
- **Đơn vị Vận chuyển (Shipper):** Các công ty logistics, chuỗi cung ứng lạnh (cold-chain) tiếp nhận đơn hàng, quản lý lộ trình xe và cập nhật trạng thái vận chuyển theo thời gian thực.
- **Ban Quản trị (Admin):** Quản lý toàn bộ hệ thống, kiểm duyệt tài khoản doanh nghiệp, kiểm định chứng nhận VietGAP/GlobalGAP, theo dõi doanh thu và giải quyết khiếu nại.

---

## 🚀 2. Hướng dẫn Tải & Cài đặt (Dành cho Dev & QA)

### Yêu cầu hệ thống
- **Java (JDK):** 17+
- **Node.js:** 18+ (khuyên dùng v20)
- **MySQL:** 8.0+

### Bước 1: Khởi tạo Cơ sở dữ liệu (Database)
Mở công cụ quản lý MySQL (VD: MySQL Workbench, DBeaver, phpMyAdmin) và chạy lệnh sau để tạo DB:
`sql
CREATE DATABASE agriconnect_db
  DEFAULT CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;
`
*Lưu ý: Mật khẩu MySQL mặc định trong code Backend đang để trống (oot / ""). Nếu máy bạn có mật khẩu, hãy mở file AgriConectBE/src/main/resources/application.properties và sửa dòng spring.datasource.password=.*

Tiếp theo, hãy **import** file griconnect_db.sql đi kèm trong thư mục gốc của dự án vào database vừa tạo để có sẵn cấu trúc bảng.

### Bước 2: Chạy Backend (Spring Boot)
Mở Terminal / Command Prompt và di chuyển vào thư mục Backend:
`ash
cd AgriConectBE

# Dành cho Windows:
.\mvnw.cmd spring-boot:run

# Dành cho Mac / Linux:
./mvnw spring-boot:run
`
> ✅ Backend sẽ khởi chạy tại: **http://localhost:8080**  
> 📖 Xem tài liệu API (Swagger): **http://localhost:8080/swagger-ui.html**

### Bước 3: Chạy Frontend (Next.js)
Mở một Terminal khác và di chuyển vào thư mục Frontend:
`ash
cd AgriConectFE
npm install   # Cài đặt thư viện (Chỉ chạy 1 lần đầu tiên)
npm run dev   # Khởi chạy giao diện
`
> ✅ Frontend sẽ khởi chạy tại: **http://localhost:3000**

---

## 🔑 3. Hướng dẫn Đăng nhập & Tạo Tài Khoản (Dành cho QA)

Hệ thống cung cấp đầy đủ chức năng tạo tài khoản cho 4 Role (Vai trò) khác nhau. 
Do mật khẩu được mã hóa bảo mật chuẩn Spring Security (BCrypt), nếu bạn dùng script chèn tay vào Database với mật khẩu thuần, hệ thống sẽ báo sai mật khẩu.

**Cách làm chuẩn nhất để có tài khoản Test:**
1. Mở trang Đăng ký: http://localhost:3000/auth/register
2. Tự điền thông tin và **đăng ký mới** các tài khoản test đại diện cho từng Role (Partner, Supplier, Shipper). 
3. **Mẹo:** Đặt chung mật khẩu là 12345678 cho dễ nhớ.
4. Đăng ký thành công là có thể lập tức Đăng nhập để sử dụng Dashboard tương ứng.

---

## 🐛 4. Kịch bản Kiểm thử QA Trọng Tâm

Hệ thống đã hoàn thiện các tính năng cốt lõi. QA có thể thực hiện kiểm thử theo các hướng dẫn sau:

### 4.1. Luồng Xác thực (OTP)
- Truy cập form Đăng ký. Điền đủ thông tin và gửi.
- Tại màn hình nhập OTP, hãy quan sát đồng hồ đếm ngược. Hệ thống quy định bạn phải chờ đúng 60 giây.
- Sau khi hết thời gian, nút **"Gửi lại mã OTP"** sẽ xuất hiện -> Nhấp vào để gọi lại API gửi mã mới.

### 4.2. Luồng Khóa Tài Khoản
- Để test, bạn hãy mở Database, vào bảng ccounts, tìm tài khoản vừa tạo và sửa giá trị cột status thành BLOCKED.
- Ra ngoài trang Đăng nhập và cố tình login bằng tài khoản này.
- Giao diện sẽ chặn bạn lại và hiển thị lỗi màu đỏ: *"Tài khoản đã bị khóa. Vui lòng liên hệ Admin"*.

### 4.3. Luồng Đổi Mật Khẩu
- Đăng nhập thành công vào hệ thống.
- Ở thanh menu bên trái, chuyển tới tab **Cài đặt & Trợ giúp**. Tìm mục Đổi mật khẩu bảo mật.
- Cố tình nhập sai mật khẩu cũ -> Hệ thống báo lỗi chính xác: *"Mật khẩu hiện tại không đúng"*.
- Nhập đúng mật khẩu cũ + nhập mật khẩu mới. Bấm lưu.
- Hệ thống sẽ hiện dòng chữ xanh thành công, và **tự động ép đăng xuất (đẩy về trang login) sau 3 giây**.

### 4.4. Upload Ảnh Đại Diện (Validate Files)
- Đăng nhập vào Dashboard. Rê chuột vào ảnh đại diện mặc định ở góc phải trên cùng của màn hình.
- Click vào để chọn ảnh.
- Hãy thử chọn một file **.pdf**, **.docx** hoặc một file **ảnh lớn hơn 5MB**. Hệ thống sẽ bật pop-up cảnh báo chặn ngay tại trình duyệt, ảnh cũ hoàn toàn không bị ảnh hưởng.
- Sau đó chọn ảnh .jpg/.png nhẹ, hợp lệ. Avatar mới sẽ lập tức được thay thế trên giao diện.

---
*(Tài liệu này được biên soạn cho việc thiết lập dự án và hỗ trợ Đội ngũ Kiểm thử - QA)*
