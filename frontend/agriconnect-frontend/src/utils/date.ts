// ─── Date Helpers ─────────────────────────────────────────────────────────────
// Các hàm xử lý ngày tháng theo định dạng Việt Nam.
//
// Lưu ý: Nếu dự án sau này cần đa ngôn ngữ, thay thế bằng thư viện date-fns
// hoặc dayjs kết hợp với i18n. Hiện tại dùng Intl.DateTimeFormat cho đơn giản.
//
// Cách dùng:
//   formatDateVN('2026-07-20')        → '20/07/2026'
//   relativeTime(new Date('2026-07-20T08:00:00')) → '10 phút trước' (tùy thời điểm)

/**
 * Chuyển chuỗi ISO date (YYYY-MM-DD) sang định dạng ngày Việt Nam (DD/MM/YYYY).
 * @example formatDateVN('2026-07-20') → '20/07/2026'
 */
export function formatDateVN(isoDate: string): string {
  const [year, month, day] = isoDate.split('-');
  return `${day}/${month}/${year}`;
}

/**
 * Trả về nhãn thời gian tương đối bằng tiếng Việt.
 * Dùng để hiển thị trong danh sách thông báo (giống Facebook).
 *
 * @example
 *   relativeTime(new Date(Date.now() - 5 * 60 * 1000)) → '5 phút trước'
 *   relativeTime(new Date(Date.now() - 2 * 3600 * 1000)) → '2 giờ trước'
 *
 * Lưu ý: Chỉ phù hợp cho timestamp trong vòng vài ngày.
 * Với khoảng thời gian dài hơn, nên dùng formatDateVN() để hiển thị ngày cụ thể.
 */
export function relativeTime(date: Date): string {
  const diffMs = Date.now() - date.getTime();
  const diffMinutes = Math.floor(diffMs / 60_000);

  if (diffMinutes < 1) return 'Vừa xong';
  if (diffMinutes < 60) return `${diffMinutes} phút trước`;

  const diffHours = Math.floor(diffMinutes / 60);
  if (diffHours < 24) return `${diffHours} giờ trước`;

  const diffDays = Math.floor(diffHours / 24);
  return `${diffDays} ngày trước`;
}
