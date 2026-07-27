// ─── Partner B2B Marketplace Types ────────────────────────────────────────────
// Các kiểu dữ liệu cho giao diện Partner B2B Marketplace (đã tích hợp từ Partner app).

export type CategoryType = 'Vegetables' | 'Fruits' | 'Grains' | 'Roots';

export interface Product {
  id: string;
  name: string;
  nameEn: string;
  category: CategoryType;
  categoryVn: string;
  location: string;
  minOrderKg: number;
  priceUsd: number;
  priceVnd: number;
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

export interface CartItem {
  product: Product;
  quantityKg: number;
}

export interface FilterState {
  categories: CategoryType[];
  vietgapOnly: boolean;
  organicOnly: boolean;
  exportGradeOnly: boolean;
  searchQuery: string;
  sortBy: 'relevance' | 'price-asc' | 'price-desc' | 'min-order';
}

export interface GroupBuyCampaign {
  id: string;
  title: string;
  product: Product;
  targetVolumeKg: number;
  currentVolumeKg: number;
  discountPercent: number;
  originalPriceVnd: number;
  discountedPriceVnd: number;
  endDate: string;
  participantsCount: number;
}

export interface FutureContract {
  id: string;
  title: string;
  cropName: string;
  farmName: string;
  location: string;
  expectedHarvest: string;
  estimatedQuantityKg: number;
  contractPriceVnd: number;
  depositPercent: number;
  status: 'ĐANG MỞ ĐĂNG KÝ' | 'ĐÃ CHỐT HỢP ĐỒNG' | 'ĐANG THU HOẠCH' | 'HOÀN THÀNH';
  image: string;
}

export type PartnerRankTier = 'Đồng' | 'Bạc' | 'Vàng' | 'Kim Cương';

export interface PartnerCreditInfo {
  partnerName: string;
  partnerCode: string;
  partnerRank: PartnerRankTier;
  creditLimitVnd: number;
  usedCreditVnd: number;
  availableCreditVnd: number;
  billingCycle: '30 ngày (Cuối tháng)' | '60 ngày (Mỗi 2 tháng)';
  nextDueDate: string;
  unpaidOrdersCount: number;
  accumulatedVolumeYtdKg: number;
  nextRankThresholdKg: number;
}

export interface Order {
  id: string;
  date: string;
  items: {
    productName: string;
    quantityKg: number;
    priceVnd: number;
  }[];
  totalVnd: number;
  status: 'Đang xử lý' | 'Đang vận chuyển' | 'Đã giao hàng' | 'Đã hoàn thành';
  paymentMethod?: 'credit_30' | 'credit_60' | 'bank' | 'deposit';
  paymentStatus?: 'Đã thanh toán' | 'Chờ quyết toán cuối tháng' | 'Chờ quyết toán 2 tháng';
  trackingCode: string;
  estimatedDelivery: string;
  supplierName: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}
