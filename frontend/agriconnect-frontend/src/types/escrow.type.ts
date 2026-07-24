// ─── Escrow & Contract Types ───────────────────────────────────────────────────
// Kiểu dữ liệu cho hợp đồng thanh toán tạm khóa Escrow.
// Escrow là tính năng cốt lõi giúp bảo vệ cả bên mua và bên bán:
//   Bên mua đặt cọc 67% → tiền được tạm giữ → kiểm định đạt → giải ngân 100%

/**
 * EscrowStatus — trạng thái hiện tại của hợp đồng Escrow.
 * Thứ tự luồng: Chờ đặt cọc → Đã ký quỹ 67% → Kiểm định → Đã giải ngân 100%
 */
export type EscrowStatus =
  | 'Chờ đặt cọc'
  | 'Đã ký quỹ 67%'
  | 'Kiểm định chất lượng'
  | 'Đã giải ngân 100%';

/**
 * EscrowMilestone — một cột mốc trong tiến trình giải ngân.
 * Khi `completed = true`, hệ thống tự động chuyển sang bước tiếp theo.
 */
export interface EscrowMilestone {
  title: string;      // Mô tả công việc cần hoàn thành
  completed: boolean; // Đã hoàn thành chưa
  date: string;       // Ngày hoàn thành hoặc dự kiến
}

/**
 * EscrowContract — hợp đồng B2B đầy đủ với thông tin hai bên và tiến độ giải ngân.
 *
 * Lưu ý:
 * - `totalValueVND` đơn vị đồng (VNĐ)
 * - `progressPercent` từ 0 đến 100
 * - `milestones` là mảng các bước tuần tự, phải hoàn thành theo thứ tự
 */
export interface EscrowContract {
  id: string;               // Mã hợp đồng, ví dụ: 'ESC-2026-8842'
  buyerName: string;        // Tên công ty bên mua
  sellerName: string;       // Tên HTX hoặc bên bán
  productName: string;      // Mô tả hàng hóa, ví dụ: '50 Tấn Thanh Long Ruột Đỏ'
  quantityTons: number;     // Số lượng (Tấn)
  totalValueVND: number;    // Tổng giá trị giao dịch (VNĐ)
  status: EscrowStatus;
  progressPercent: number;  // Tiến độ giải ngân (0–100)
  milestones: EscrowMilestone[];
}
