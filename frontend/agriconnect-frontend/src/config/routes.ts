// ─── App Route Constants ───────────────────────────────────────────────────────
// Tập trung tất cả các đường dẫn route trong một file.
// Lý do: tránh gõ string URL trực tiếp rải rác → dễ sai, khó tìm khi đổi cấu trúc.
//
// Cách dùng:
//   import { ROUTES } from '@/config/routes';
//   <Link href={ROUTES.SUPPLIER_PRODUCTS}>Sản phẩm của tôi</Link>
//
// Khi thêm route mới: thêm vào đây trước, sau đó tạo page.tsx tương ứng.

export const ROUTES = {
  // ── Trang công khai ──────────────────────────────────────────────────────
  HOME: '/',

  // ── Xác thực (nhóm route /auth) ───────────────────────────────────────────
  LOGIN: '/auth/login',
  REGISTER: '/auth/register',

  // ── Dashboard theo vai trò (nhóm route /dashboard) ───────────────────────
  // Admin — quản lý toàn hệ thống
  ADMIN: '/dashboard/admin',
  ADMIN_ROLES: '/dashboard/admin/roles',       // Quản lý vai trò người dùng
  ADMIN_DISPUTES: '/dashboard/admin/disputes', // Xử lý tranh chấp hợp đồng

  // Supplier — nhà cung cấp (nông dân, HTX)
  SUPPLIER: '/dashboard/supplier',
  SUPPLIER_PRODUCTS: '/dashboard/supplier/products', // Quản lý sản phẩm niêm yết
  SUPPLIER_LOGS: '/dashboard/supplier/logs',         // Nhật ký sản xuất (canh tác, phân bón)

  // Partner — đối tác thu mua (doanh nghiệp)
  PARTNER: '/dashboard/partner',
  PARTNER_CAMPAIGNS: '/dashboard/partner/campaigns', // Chiến dịch thu mua theo mùa vụ
  PARTNER_CONTRACTS: '/dashboard/partner/contracts', // Danh sách hợp đồng Escrow
  PARTNER_ORDERS: '/dashboard/partner/orders',       // Đơn đặt hàng đã tạo

  // Shipper — đơn vị vận chuyển
  SHIPPER: '/dashboard/shipper',
  SHIPPER_DELIVERIES: '/dashboard/shipper/deliveries', // Danh sách chuyến hàng
  SHIPPER_IOT: '/dashboard/shipper/iot',               // Màn hình cảm biến IoT live
} as const;

/** Kiểu union của tất cả các route — dùng khi cần type-safe navigation */
export type AppRoute = (typeof ROUTES)[keyof typeof ROUTES];
