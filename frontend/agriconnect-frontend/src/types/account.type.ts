// ─── Account & Auth Types ─────────────────────────────────────────────────────
// File này định nghĩa các kiểu dữ liệu liên quan đến tài khoản người dùng.
// Khi backend thay đổi cấu trúc user, chỉ cần sửa tại đây — toàn bộ app tự cập nhật.

/**
 * UserRole — vai trò của người dùng trong hệ thống AgriConnect.
 *
 * - 'Supplier' : Nhà cung cấp (nông dân, HTX, hợp tác xã)
 * - 'Partner'  : Đối tác thu mua (doanh nghiệp chế biến, xuất khẩu)
 * - 'Shipper'  : Đơn vị vận chuyển (logistics, cold-chain)
 * - 'Admin'    : Quản trị viên hệ thống
 * - null       : Chưa đăng nhập / khách vãng lai
 */
export type UserRole = 'Supplier' | 'Partner' | 'Shipper' | 'Admin' | null;

/**
 * BusinessRole — dùng trong form đăng ký để chọn loại doanh nghiệp.
 * Giống UserRole nhưng không có null (bắt buộc chọn khi đăng ký).
 */
export type BusinessRole = 'Supplier' | 'Partner' | 'Shipper' | 'Admin';

/** AuthTab — tab đang active trong modal đăng nhập/đăng ký */
export type AuthTab = 'login' | 'register';

/**
 * UserProfile — thông tin hồ sơ doanh nghiệp sau khi đăng nhập.
 * Trường `verified` = true khi admin đã xét duyệt tài khoản.
 */
export interface UserProfile {
  id: string;
  name: string;           // Tên người đại diện pháp luật
  companyName: string;    // Tên công ty / HTX
  email: string;
  phone: string;
  taxId: string;          // Mã số thuế doanh nghiệp
  role: BusinessRole;
  verified: boolean;      // Đã được admin xác minh chưa
  province: string;       // Tỉnh/thành phố hoạt động chính
  hasDigitalSignature?: boolean; // Có chữ ký số (USB Token / OTP) không
}
