// ─── Currency Helpers ──────────────────────────────────────────────────────────
// Các hàm format tiền tệ và số theo chuẩn Việt Nam.
// Dùng Intl.NumberFormat — không cần cài thêm thư viện.
//
// Cách dùng:
//   formatVND(25000)      → "25.000 ₫"
//   formatNumber(1250000) → "1.250.000"

/**
 * Format số tiền sang định dạng tiền tệ VNĐ.
 * @example formatVND(1250000) → "1.250.000 ₫"
 */
export function formatVND(amount: number): string {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
    maximumFractionDigits: 0,
  }).format(amount);
}

/**
 * Format số với dấu chấm ngăn cách hàng nghìn theo chuẩn Việt Nam.
 * Dùng cho hiển thị số lượng, giá kg, ... mà không cần ký hiệu tiền tệ.
 * @example formatNumber(25000) → "25.000"
 */
export function formatNumber(value: number): string {
  return new Intl.NumberFormat('vi-VN').format(value);
}
