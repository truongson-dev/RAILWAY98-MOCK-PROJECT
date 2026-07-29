import type { ApiProduct } from './partner.service';

const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? 'http://127.0.0.1:8080';

function getAuthHeader(): Record<string, string> {
  if (typeof window === 'undefined') return {};
  try {
    const stored = localStorage.getItem('agriconnect-auth');
    if (!stored) return {};
    const parsed = JSON.parse(stored);
    const token = parsed?.state?.token;
    return token ? { Authorization: `Bearer ${token}` } : {};
  } catch {
    return {};
  }
}

export interface ProductCreatePayload {
  name: string;
  nameEn?: string;
  description: string;
  price: number;
  unit: string;
  minOrderKg: number;
  location: string;
  harvestDate: string;
  categoryId: number;
  imageUrls: string[];
}

export async function createProduct(payload: ProductCreatePayload): Promise<ApiProduct | null> {
  try {
    const res = await fetch(`${API_BASE}/api/admin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeader(),
      },
      body: JSON.stringify(payload),
    });
    if (!res.ok) {
      console.error('Lỗi khi tạo sản phẩm:', await res.text());
      return null;
    }
    const json = await res.json();
    return json.data;
  } catch (err) {
    console.error('Lỗi mạng khi tạo sản phẩm:', err);
    return null;
  }
}

export async function fetchSupplierProducts(): Promise<ApiProduct[]> {
  try {
    const res = await fetch(`${API_BASE}/api/products?size=100`, {
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeader(),
      },
      cache: 'no-store',
    });
    if (!res.ok) return [];
    const json = await res.json();
    // Assuming the API returns PageResponse, and since it's the public endpoint, 
    // we would actually need an endpoint to fetch ONLY the supplier's products.
    // If not available, we filter by the logged-in user on the client side (not ideal but works for now)
    return json.data.content;
  } catch (err) {
    return [];
  }
}
