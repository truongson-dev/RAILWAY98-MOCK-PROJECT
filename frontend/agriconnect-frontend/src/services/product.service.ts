// ─── Product Service ──────────────────────────────────────────────────────────
// Xử lý API call cho danh sách sản phẩm nông sản và hồ sơ truy xuất lô hàng.
//
// Hiện tại frontend dùng MOCK_PRODUCTS / MOCK_TRACE_BATCH (src/data/mockData.ts).
// Khi backend sẵn sàng, thay thế các import mock bằng các hàm dưới đây.
//
// Ví dụ tích hợp trong component:
//   const [products, setProducts] = useState<AgProduct[]>([]);
//   useEffect(() => {
//     getProducts().then(setProducts).catch(console.error);
//   }, []);

import type { AgProduct, TraceBatch } from '@/types/product.type';

const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? '';

/**
 * Lấy danh sách tất cả sản phẩm trên sàn B2B.
 * @param cert  Lọc theo chứng nhận, ví dụ: 'GlobalGAP'. Bỏ qua để lấy tất cả.
 */
export async function getProducts(cert?: string): Promise<AgProduct[]> {
  const url = cert
    ? `${API_BASE}/api/products?cert=${encodeURIComponent(cert)}`
    : `${API_BASE}/api/products`;
  const res = await fetch(url, { cache: 'no-store' }); // no-store để luôn lấy dữ liệu mới
  if (!res.ok) throw new Error(await res.text());
  return res.json() as Promise<AgProduct[]>;
}

/**
 * Lấy thông tin chi tiết một sản phẩm theo ID.
 */
export async function getProductById(id: string): Promise<AgProduct> {
  const res = await fetch(`${API_BASE}/api/products/${id}`);
  if (!res.ok) throw new Error(await res.text());
  return res.json() as Promise<AgProduct>;
}

/**
 * Lấy hồ sơ truy xuất nguồn gốc theo mã lô QR.
 * @param batchCode  Ví dụ: 'LOT-TL-2026-009'
 *
 * Dữ liệu trả về bao gồm: nhật ký canh tác, nhiệt độ cold-chain,
 * chứng nhận chất lượng và thông tin kiểm định Vinacontrol.
 */
export async function getBatchTrace(batchCode: string): Promise<TraceBatch> {
  const res = await fetch(
    `${API_BASE}/api/trace/${encodeURIComponent(batchCode)}`,
  );
  if (!res.ok) throw new Error(await res.text());
  return res.json() as Promise<TraceBatch>;
}
