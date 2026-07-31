export type TabType = 
  | 'dashboard' 
  | 'farm-management' 
  | 'forward-contracts'
  | 'group-buys'
  | 'product-catalog' 
  | 'orders'
  | 'order-tracking' 
  | 'inventory' 
  | 'analytics' 
  | 'ai-chat'
  | 'support' 
  | 'settings';

export interface ForwardContractRequest {
  id: string;
  cropPlanId: string;
  cropName: string;
  plotName: string;
  buyerName: string;
  buyerCompany: string;
  buyerPhone: string;
  requestedQuantityTons: number;
  proposedPriceVnd: number;
  depositPercent: number;
  expectedDeliveryDate: string;
  notes: string;
  status: 'pending' | 'accepted' | 'rejected' | 'completed';
  createdAt: string;
  certifications?: string[];
}

export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  unit: string;
  stockText: string;
  stockKg: number;
  description: string;
  imageUrl: string;
  status: 'active' | 'hidden' | 'out_of_stock';
  origin: string;
  certifications: string[];
  harvestDate?: string;
}

export interface MarketPrice {
  id: string;
  cropName: string;
  grade: string;
  price: number;
  unit: string;
  changePercent: number;
  trend: 'up' | 'down' | 'stable';
  marketName?: string;
  date?: string;
}

export interface NoticeItem {
  id: string;
  title: string;
  timeAgo: string;
  category: string;
  isRead: boolean;
  type: 'order' | 'finance' | 'weather' | 'system';
  content?: string;
}

export interface Order {
  id: string;
  orderCode: string;
  customerName: string;
  customerPhone: string;
  customerAddress: string;
  productName: string;
  quantity: string;
  totalPrice: number;
  status: 'PENDING' | 'CONFIRMED' | 'PROCESSING' | 'SHIPPING' | 'DELIVERED' | 'CANCELLED' | 'new' | 'processing' | 'shipping' | 'completed' | 'cancelled';
  createdAt: string;
  deliveryDate?: string;
  paymentMethod: string;
  notes?: string;
  items?: any[];
  totalAmount?: number;
  shippingAddress?: string;
}

export interface FarmPlot {
  id: string;
  name: string;
  cropType: string;
  areaHa: number;
  healthStatus: 'Thịnh vượng' | 'Cần chú ý' | 'Thu hoạch ngay';
  soilMoisture: number;
  temperature: number;
  lastFertilized: string;
  nextHarvestDate: string;
  estimatedYieldKg: number;
}

export interface HarvestEvent {
  id: string;
  cropName: string;
  date: string;
  status: 'ready' | 'upcoming' | 'completed';
  daysLeftText: string;
  imageUrl: string;
  location: string;
  expectedYield: string;
}

export interface InventoryItem {
  id: string;
  batchCode: string;
  productName: string;
  warehouseLocation: string;
  quantityInStock: number;
  unit: string;
  tempCelsius: number;
  humidityPercent: number;
  qualityGrade: string;
  entryDate: string;
  expiryDate: string;
}
