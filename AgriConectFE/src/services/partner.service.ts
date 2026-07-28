// ─── Partner Service ───────────────────────────────────────────────────────────
// Kết nối API BE Spring Boot cho giao diện Partner B2B Marketplace.
// Base URL: NEXT_PUBLIC_API_URL (mặc định http://localhost:8080)

const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8080';

// ─── Lấy JWT Token từ localStorage ────────────────────────────────────────────
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

// ─── Kiểu dữ liệu raw từ BE ────────────────────────────────────────────────────
interface BeProduct {
  id: number;
  name: string;
  description: string;
  price: number;
  unit: string;
  status: string;
  categoryName: string;
  sellerUsername: string;
  createdAt: string;
  updatedAt: string;
}

interface BePage<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  number: number;
  size: number;
}

// ─── Kiểu dữ liệu dùng trong FE ───────────────────────────────────────────────
export interface ApiProduct {
  id: string;
  name: string;
  nameEn: string;
  category: string;
  categoryVn: string;
  location: string;
  minOrderKg: number;
  priceVnd: number;
  priceUsd: number;
  unit: string;
  image: string;
  imageAlt: string;
  badges: string[];
  inStock: boolean;
  rating: number;
  reviewsCount: number;
  description: string;
  harvestDate: string;
  supplier: {
    name: string;
    verified: boolean;
    phone: string;
    address: string;
  };
}

export interface ApiOrder {
  id: string | number;
  date: string;
  totalVnd: number;
  status: string;
  paymentMethod?: string;
  paymentStatus?: string;
  trackingCode: string;
  estimatedDelivery: string;
  supplierName: string;
  items: {
    productName: string;
    quantityKg: number;
    priceVnd: number;
  }[];
}

export interface ApiGroupBuy {
  id: string;
  title: string;
  targetVolumeKg: number;
  currentVolumeKg: number;
  discountPercent: number;
  originalPriceVnd: number;
  discountedPriceVnd: number;
  endDate: string;
  participantsCount: number;
  product: {
    id: string;
    name: string;
    location: string;
    image: string;
  };
}

export interface ApiForwardContract {
  id: string;
  title: string;
  cropName: string;
  farmName: string;
  location: string;
  expectedHarvest: string;
  estimatedQuantityKg: number;
  contractPriceVnd: number;
  depositPercent: number;
  status: string;
  image: string;
}

// ─── Map BE product → FE product ──────────────────────────────────────────────
function mapBeProduct(p: BeProduct): ApiProduct {
  // Map category name sang CategoryType
  const catMap: Record<string, string> = {
    'Rau lá xanh': 'Vegetables',
    'Rau củ': 'Vegetables',
    'Rau củ quả': 'Vegetables',
    'Trái cây nhiệt đới': 'Fruits',
    'Trái cây ôn đới': 'Fruits',
    'Trái cây': 'Fruits',
    'Đậu các loại': 'Grains',
    'Ngũ cốc - Đậu': 'Grains',
    'Gạo - Ngũ cốc': 'Grains',
    'Thảo mộc - Gia vị': 'Roots',
  };

  const category = catMap[p.categoryName] ?? 'Vegetables';
  const usdRate = 25000;

  return {
    id: String(p.id),
    name: p.name,
    nameEn: p.name, // BE chưa có trường nameEn
    category,
    categoryVn: p.categoryName ?? 'Rau củ quả',
    location: 'Việt Nam',
    minOrderKg: 10,
    priceVnd: p.price,
    priceUsd: Math.round(p.price / usdRate * 100) / 100,
    unit: p.unit ?? 'kg',
    image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=400',
    imageAlt: p.name,
    badges: p.status === 'AVAILABLE' ? ['Còn hàng'] : ['Hết hàng'],
    inStock: p.status === 'AVAILABLE',
    rating: 4.5,
    reviewsCount: 0,
    description: p.description ?? '',
    harvestDate: p.createdAt?.split('T')[0] ?? '',
    supplier: {
      name: p.sellerUsername ?? 'Nhà cung cấp',
      verified: true,
      phone: '',
      address: 'Việt Nam',
    },
  };
}

// ─── API Calls ─────────────────────────────────────────────────────────────────

/**
 * Lấy tất cả sản phẩm từ BE (public - không cần JWT)
 * GET /api/v1/products?size=100
 */
export async function fetchProducts(): Promise<ApiProduct[]> {
  try {
    const res = await fetch(`${API_BASE}/api/v1/products?size=100`, {
      headers: { 'Content-Type': 'application/json' },
      cache: 'no-store',
    });
    if (!res.ok) throw new Error(`Lỗi lấy sản phẩm: ${res.status}`);
    const page: BePage<BeProduct> = await res.json();
    return page.content.map(mapBeProduct);
  } catch (err) {
    console.error('[partner.service] fetchProducts error:', err);
    return [];
  }
}

/**
 * Lấy đơn hàng của Partner đang đăng nhập (cần JWT)
 * GET /api/v1/orders/my — chưa có BE, trả về mảng rỗng
 */
export async function fetchMyOrders(): Promise<ApiOrder[]> {
  try {
    const res = await fetch(`${API_BASE}/api/v1/orders/my`, {
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeader(),
      },
      cache: 'no-store',
    });
    if (!res.ok) return [];
    return res.json();
  } catch {
    return [];
  }
}

/**
 * Lấy danh sách mua chung (chưa có BE → trả về rỗng)
 */
export async function fetchGroupBuys(): Promise<ApiGroupBuy[]> {
  try {
    const res = await fetch(`${API_BASE}/api/v1/group-buys`, {
      headers: { 'Content-Type': 'application/json' },
      cache: 'no-store',
    });
    if (!res.ok) return [];
    return res.json();
  } catch {
    return [];
  }
}

/**
 * Lấy danh sách hợp đồng tương lai (chưa có BE → trả về rỗng)
 */
export async function fetchForwardContracts(): Promise<ApiForwardContract[]> {
  try {
    const res = await fetch(`${API_BASE}/api/v1/forward-contracts`, {
      headers: { 'Content-Type': 'application/json' },
      cache: 'no-store',
    });
    if (!res.ok) return [];
    return res.json();
  } catch {
    return [];
  }
}

/**
 * Tham gia chiến dịch mua chung (cần JWT)
 * POST /api/v1/group-buys/{id}/join
 */
export async function joinGroupBuy(id: string, volumeKg: number): Promise<ApiGroupBuy | null> {
  try {
    const res = await fetch(`${API_BASE}/api/v1/group-buys/${id}/join`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeader(),
      },
      body: JSON.stringify({ volumeKg }),
    });
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

/**
 * Tạo đơn hàng (cần JWT)
 * POST /api/v1/orders
 */
export async function createOrder(payload: {
  totalVnd: number;
  paymentMethod: string;
  supplierName: string;
  items: { productId: string; quantityKg: number }[];
}): Promise<ApiOrder | null> {
  try {
    const res = await fetch(`${API_BASE}/api/v1/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeader(),
      },
      body: JSON.stringify(payload),
    });
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

/**
 * Lấy thông tin tín dụng B2B (cần JWT)
 */
export async function fetchMyCreditInfo(): Promise<Record<string, unknown>> {
  try {
    const res = await fetch(`${API_BASE}/api/v1/credit/my-info`, {
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeader(),
      },
      cache: 'no-store',
    });
    if (!res.ok) return {};
    return res.json();
  } catch {
    return {};
  }
}
