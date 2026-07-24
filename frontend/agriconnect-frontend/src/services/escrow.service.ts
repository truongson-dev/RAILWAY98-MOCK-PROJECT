// ─── Escrow Service ───────────────────────────────────────────────────────────
// Xử lý API call cho hợp đồng Escrow (thanh toán tạm khóa).
//
// Luồng Escrow chuẩn:
//   1. Bên mua tạo hợp đồng qua createEscrow()
//   2. Bên mua chuyển tiền → backend cập nhật status
//   3. Kiểm định viên Vinacontrol xác nhận → completeMilestone(id, 2)
//   4. Vận chuyển xong → completeMilestone(id, 3)
//   5. Bên mua xác nhận nhận hàng → completeMilestone(id, 4) → giải ngân 100%

import type { EscrowContract } from '@/types/escrow.type';

const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? '';

/**
 * Lấy thông tin hợp đồng Escrow theo mã hợp đồng.
 * @param id  Ví dụ: 'ESC-2026-8842'
 */
export async function getEscrowById(id: string): Promise<EscrowContract> {
  const res = await fetch(`${API_BASE}/api/escrow/${id}`);
  if (!res.ok) throw new Error(await res.text());
  return res.json() as Promise<EscrowContract>;
}

/**
 * Tạo hợp đồng Escrow mới cho một giao dịch B2B.
 * Backend tự động khởi tạo milestones và đặt status = 'Chờ đặt cọc'.
 */
export async function createEscrow(
  payload: Omit<EscrowContract, 'id' | 'status' | 'progressPercent' | 'milestones'>,
): Promise<EscrowContract> {
  const res = await fetch(`${API_BASE}/api/escrow`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json() as Promise<EscrowContract>;
}

/**
 * Đánh dấu một milestone là đã hoàn thành.
 * Thường được gọi bởi: kiểm định viên, shipper, hoặc bên mua khi xác nhận nhận hàng.
 *
 * @param escrowId       Mã hợp đồng
 * @param milestoneIndex Chỉ số milestone (0-based)
 */
export async function completeMilestone(
  escrowId: string,
  milestoneIndex: number,
): Promise<EscrowContract> {
  const res = await fetch(
    `${API_BASE}/api/escrow/${escrowId}/milestones/${milestoneIndex}/complete`,
    { method: 'PATCH' },
  );
  if (!res.ok) throw new Error(await res.text());
  return res.json() as Promise<EscrowContract>;
}
