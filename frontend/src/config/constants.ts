// ─── Application-Level Constants ──────────────────────────────────────────────
// Các hằng số dùng chung toàn app — tránh hard-code string rải rác.
//
// Lưu ý: Đây là hằng số TĨNH (không thay đổi theo môi trường).
// Cấu hình môi trường (API URL, API key) → dùng .env thay vì file này.

/** Tên thương hiệu — dùng trong title, logo, email */
export const APP_NAME = 'AgriConnect';

/** Tagline chính hiển thị trên Hero section */
export const APP_TAGLINE = 'Kết Nối Nông Sản Việt Với Thị Trường B2B';

/** Danh sách chứng nhận chất lượng được hỗ trợ trên sàn */
export const CERTIFICATION_LABELS = ['VietGAP', 'GlobalGAP', 'Organic', 'HACCP'] as const;

/**
 * Mã lô QR mặc định dùng trong demo và preview modal.
 * Khi tích hợp backend thật, mã này sẽ được lấy từ API.
 */
export const DEFAULT_BATCH_CODE = 'LOT-TL-2026-009';

/**
 * Tỷ lệ đặt cọc Escrow: bên mua đặt cọc 67% trước khi vận chuyển.
 * Phần còn lại 33% được giải ngân sau khi bên mua xác nhận nhận hàng đạt chuẩn.
 */
export const ESCROW_DEPOSIT_RATIO = 0.67;
