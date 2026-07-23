export type UserRole = 'farmer' | 'buyer' | 'carrier' | null;

export interface AgProduct {
  id: string;
  name: string;
  category: string;
  origin: string;
  seller: string;
  certifications: ('VietGAP' | 'GlobalGAP' | 'Organic' | 'HACCP')[];
  pricePerKg: number;
  availableQuantityTons: number;
  minOrderTons: number;
  image: string;
  harvestDate: string;
  qrBatchCode: string;
  rating: number;
  featured?: boolean;
}

export interface TraceBatch {
  batchCode: string;
  productName: string;
  farmName: string;
  location: string;
  certifications: string[];
  harvestDate: string;
  packagingDate: string;
  fertilizerLog: string[];
  pestControlLog: string[];
  coldChainTemp: string;
  inspector: string;
  qrImage: string;
  status: 'Xác thực' | 'Đang vận chuyển' | 'Đã giao hàng';
}

export interface EscrowContract {
  id: string;
  buyerName: string;
  sellerName: string;
  productName: string;
  quantityTons: number;
  totalValueVND: number;
  status: 'Chờ đặt cọc' | 'Đã ký quỹ 67%' | 'Kiểm định chất lượng' | 'Đã giải ngân 100%';
  progressPercent: number;
  milestones: {
    title: string;
    completed: boolean;
    date: string;
  }[];
}
