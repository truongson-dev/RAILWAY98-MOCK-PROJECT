// ─── Partner Service ───────────────────────────────────────────────────────────
// Kết nối API BE Spring Boot cho giao diện Partner B2B Marketplace.
// Base URL: NEXT_PUBLIC_API_URL (mặc định http://localhost:8080)

const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? 'http://127.0.0.1:8080';

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
  nameEn: string;
  description: string;
  price: number;
  unit: string;
  status: string;
  categoryName: string;
  sellerName: string;
  location: string;
  minOrderKg: number;
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

interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
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
    'Lúa gạo': 'Grains',
    'Thảo mộc - Gia vị': 'Roots',
  };

  const category = catMap[p.categoryName] ?? 'Vegetables';
  const usdRate = 25000;

  return {
    id: String(p.id),
    name: p.name,
    nameEn: p.nameEn ?? p.name, // BE có nameEn
    category,
    categoryVn: p.categoryName ?? 'Rau củ quả',
    location: p.location ?? 'Việt Nam',
    minOrderKg: p.minOrderKg ?? 10,
    priceVnd: p.price,
    priceUsd: Math.round(p.price / usdRate * 100) / 100,
    unit: p.unit ?? 'kg',
    image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=400',
    imageAlt: p.name,
    badges: p.status === 'AVAILABLE' ? ['Còn hàng'] : ['Hết hàng'],
    inStock: p.status === 'AVAILABLE',
    rating: 5.0,
    reviewsCount: 0,
    description: p.description ?? '',
    harvestDate: p.createdAt?.split('T')[0] ?? '',
    supplier: {
      name: p.sellerName ?? 'Nhà cung cấp',
      verified: true,
      phone: '',
      address: p.location ?? 'Việt Nam',
    },
  };
}

// ─── API Calls ─────────────────────────────────────────────────────────────────

/**
 * Lấy tất cả sản phẩm từ BE (public - không cần JWT)
 * GET /api/products?size=100
 */
export async function fetchProducts(): Promise<ApiProduct[]> {
  try {
    const res = await fetch(`${API_BASE}/api/products?size=100`, {
      headers: { 'Content-Type': 'application/json' },
      cache: 'no-store',
    });
    if (!res.ok) throw new Error(`Lỗi lấy sản phẩm: ${res.status}`);
    const json: ApiResponse<BePage<BeProduct>> = await res.json();
    return json.data.content.map(mapBeProduct);
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
 * Lấy danh sách mua chung
 */
export async function fetchGroupBuys(): Promise<ApiGroupBuy[]> {
  const MOCK_GROUP_BUYS = [
    {
      id: 'gb-1',
      title: 'Mua chung Cà chua Cherry Đà Lạt',
      targetVolumeKg: 500,
      currentVolumeKg: 250,
      discountPercent: 15,
      originalPriceVnd: 45000,
      discountedPriceVnd: 38250,
      endDate: '2026-10-15',
      participantsCount: 3,
      product: {
        id: 'p-1',
        name: 'Cà chua Cherry',
        location: 'Đà Lạt, Lâm Đồng',
        minOrderKg: 50,
        image: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=400'
      }
    },
    {
      id: 'gb-2',
      title: 'Gom đơn Hành Tây siêu tiết kiệm',
      targetVolumeKg: 1000,
      currentVolumeKg: 850,
      discountPercent: 20,
      originalPriceVnd: 20000,
      discountedPriceVnd: 16000,
      endDate: '2026-10-10',
      participantsCount: 8,
      product: {
        id: 'p-2',
        name: 'Hành Tây',
        location: 'Đơn Dương, Lâm Đồng',
        minOrderKg: 100,
        image: 'https://images.unsplash.com/photo-1461354464878-ad92f492a5a0?w=400'
      }
    }
  ];

  try {
    const res = await fetch(`${API_BASE}/api/v1/group-buys`, {
      headers: { 'Content-Type': 'application/json' },
      cache: 'no-store',
    });
    if (!res.ok) return MOCK_GROUP_BUYS;
    const json = await res.json();
    if (json && json.data && json.data.content && json.data.content.length > 0) {
      return json.data.content;
    }
    return MOCK_GROUP_BUYS;
  } catch {
    return MOCK_GROUP_BUYS;
  }
}

/**
 * Lấy danh sách hợp đồng tương lai
 */
export async function fetchForwardContracts(): Promise<ApiForwardContract[]> {
  const MOCK_FORWARD_CONTRACTS = [
    {
      id: 'fc-1',
      title: 'Hợp đồng Sầu Riêng Ri6',
      cropName: 'Sầu Riêng Ri6 VietGAP',
      farmName: 'Trang trại Sầu Riêng Chín Hóa',
      location: 'Cai Lậy, Tiền Giang',
      expectedHarvest: '2026-10-15',
      estimatedQuantityKg: 5000,
      contractPriceVnd: 85000,
      depositPercent: 20,
      status: 'Mở đăng ký',
      image: 'https://images.unsplash.com/photo-1595841696650-6819ebcb0338?w=500'
    },
    {
      id: 'fc-2',
      title: 'Hợp đồng Cà Phê Robusta',
      cropName: 'Cà Phê Robusta Chín Cây',
      farmName: 'Nông trang Ban Mê',
      location: 'Buôn Ma Thuột, Đắk Lắk',
      expectedHarvest: '2026-11-20',
      estimatedQuantityKg: 10000,
      contractPriceVnd: 110000,
      depositPercent: 25,
      status: 'Mở đăng ký',
      image: 'https://images.unsplash.com/photo-1559525839-b184a4d698c7?w=500'
    }
  ];

  try {
    const res = await fetch(`${API_BASE}/api/forward-contracts`, {
      headers: { 'Content-Type': 'application/json' },
      cache: 'no-store',
    });
    if (!res.ok) return MOCK_FORWARD_CONTRACTS;
    
    // The API returns ApiResponse<PageResponse<ForwardContractDTO>>
    const json = await res.json();
    if (json && json.data && json.data.content && json.data.content.length > 0) {
      return json.data.content.map((c: any) => ({
        id: String(c.id),
        title: c.title,
        cropName: c.cropName,
        farmName: c.farmName,
        location: c.location,
        expectedHarvest: c.expectedHarvest,
        estimatedQuantityKg: c.estimatedQuantityKg,
        contractPriceVnd: c.contractPriceVnd,
        depositPercent: c.depositPercent,
        status: c.status,
        image: c.imageUrl || 'https://images.unsplash.com/photo-1595841696650-6819ebcb0338?w=500'
      }));
    }
    return MOCK_FORWARD_CONTRACTS;
  } catch {
    return MOCK_FORWARD_CONTRACTS;
  }
}

/**
 * Tham gia chiến dịch mua chung (cần JWT)
 * POST /api/partner/group-buys/{id}/join
 */
export async function joinGroupBuy(id: string, volumeKg: number): Promise<ApiGroupBuy | null> {
  try {
    const res = await fetch(`${API_BASE}/api/partner/group-buys/${id}/join`, {
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
 * Đăng ký Hợp đồng Tương lai (cần JWT)
 * POST /api/partner/contracts/forward/{id}/register
 */
export async function registerForwardContract(id: string): Promise<any | null> {
  try {
    const res = await fetch(`${API_BASE}/api/partner/contracts/forward/${id}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeader(),
      },
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
