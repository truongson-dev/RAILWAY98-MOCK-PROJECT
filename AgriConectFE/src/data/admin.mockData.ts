import {
  MetricCardData,
  ChartDataPoint,
  UserDistribution,
  AiRiskItem,
  RecentActivity,
  KycRecord,
  SupplierItem,
  PartnerItem,
  LogisticsItem,
  ContractItem
} from '@/types/admin.types';

export const METRIC_CARDS: MetricCardData[] = [
  {
    id: '1',
    title: 'TỔNG GIÁ TRỊ GIAO DỊCH',
    value: '12.8 tỷ VNĐ',
    change: '+8.2%',
    changeType: 'positive',
    icon: 'wallet'
  },
  {
    id: '2',
    title: 'NGƯỜI DÙNG HOẠT ĐỘNG',
    value: '2,450',
    change: '+124 mới',
    changeType: 'positive',
    icon: 'users'
  },
  {
    id: '3',
    title: 'HỢP ĐỒNG HIỆU LỰC',
    value: '856',
    changeType: 'neutral',
    icon: 'file-text'
  },
  {
    id: '4',
    title: 'HỒ SƠ CHỜ DUYỆT',
    value: '14',
    badgeText: 'CẦN XỬ LÝ',
    changeType: 'urgent',
    icon: 'briefcase'
  }
];

export const REVENUE_PROFIT_CHART: ChartDataPoint[] = [
  { month: 'Th1', revenue: 8.5, profit: 2.1 },
  { month: 'Th2', revenue: 9.2, profit: 2.4 },
  { month: 'Th3', revenue: 10.8, profit: 3.1 },
  { month: 'Th4', revenue: 11.4, profit: 3.5 },
  { month: 'Th5', revenue: 12.1, profit: 3.8 },
  { month: 'Th6', revenue: 12.8, profit: 4.2 }
];

export const USER_DISTRIBUTION: UserDistribution[] = [
  { name: 'Nhà cung cấp', percentage: 65, count: 1592, color: '#176a22' },
  { name: 'Đối tác', percentage: 25, count: 612, color: '#607f5b' },
  { name: 'Vận chuyển', percentage: 10, count: 246, color: '#d97706' }
];

export const AI_RISK_ITEMS: AiRiskItem[] = [
  {
    id: 'risk-1',
    title: 'Dấu hiệu bất thường tài chính',
    description: 'Phát hiện khối lượng giao dịch đột biến (300%) tại kho Lâm Đồng.',
    timestamp: '2 giờ trước',
    level: 'high',
    location: 'Lâm Đồng',
    category: 'financial'
  },
  {
    id: 'risk-2',
    title: 'Dự báo đứt gãy chuỗi cung ứng',
    description: 'Thời tiết xấu tại khu vực miền Tây làm ảnh hưởng tiến độ thu hoạch lúa ST25.',
    timestamp: '4 giờ trước',
    level: 'medium',
    location: 'Cần Thơ - An Giang',
    category: 'weather'
  },
  {
    id: 'risk-3',
    title: 'Cảnh báo chất lượng dư lượng',
    description: 'Lô hàng Sầu Riêng Ri6 tại Đồng Nai phát hiện tần suất biến động dư lượng phân bón.',
    timestamp: '6 giờ trước',
    level: 'high',
    location: 'Đồng Nai',
    category: 'quality'
  }
];

export const RECENT_ACTIVITIES: RecentActivity[] = [
  {
    id: 'act-1',
    type: 'approval',
    title: 'Phê duyệt đối tác mới',
    subtitle: 'Global Grains Corp đã được cấp quyền Tín dụng cấp 1.',
    timestamp: '12 phút trước • Quản trị viên A',
    author: 'Quản trị viên A',
    iconType: 'check'
  },
  {
    id: 'act-2',
    type: 'system',
    title: 'Cập nhật biểu phí Escrow',
    subtitle: 'Hệ thống đã cập nhật phí thanh toán tạm giữ mới cho nhà cung cấp.',
    timestamp: '45 phút trước • Hệ thống',
    author: 'Hệ thống',
    iconType: 'settings'
  },
  {
    id: 'act-3',
    type: 'contract',
    title: 'Giải ngân hợp đồng #HD-9082',
    subtitle: 'Đã hoàn tất thanh toán Escrow 1.25 tỷ VNĐ cho HTX Nông Nghiệp Lâm Đồng.',
    timestamp: '1 giờ trước • Tự động Escrow',
    author: 'Hệ thống Escrow',
    iconType: 'document'
  }
];

export const INITIAL_KYC_RECORDS: KycRecord[] = [
  {
    id: 'kyc-1',
    name: 'Nông trại Sen Vàng',
    category: 'Trồng trọt & Xuất khẩu Nông sản',
    type: 'supplier',
    status: 'pending',
    submittedDate: '2026-07-23 14:20',
    location: 'Đà Lạt, Lâm Đồng',
    taxCode: '5801293812',
    representative: 'Nguyễn Văn Sen',
    phone: '0912 345 678',
    email: 'senvang.farm@agriconnect.vn',
    documents: {
      businessLicense: true,
      landCertificate: true,
      vietGapCert: true,
      idCard: true
    },
    missingDocNote: 'Chờ xác minh thực địa'
  },
  {
    id: 'kyc-2',
    name: 'Logistics Phía Nam',
    category: 'Vận tải Chuỗi Cung ứng Lạnh',
    type: 'logistics',
    status: 'needs_info',
    submittedDate: '2026-07-23 11:05',
    location: 'Quận 7, TP. Hồ Chí Minh',
    taxCode: '0314920192',
    representative: 'Trần Minh Nam',
    phone: '0988 765 432',
    email: 'contact@logisticsphianam.vn',
    documents: {
      businessLicense: false,
      idCard: true
    },
    missingDocNote: 'Thiếu giấy phép kinh doanh'
  },
  {
    id: 'kyc-3',
    name: 'Global Grains Corp',
    category: 'Doanh nghiệp Xuất Nhập Khẩu Lương Thực',
    type: 'partner',
    status: 'approved',
    submittedDate: '2026-07-22 09:30',
    location: 'Cần Thơ',
    taxCode: '1801239981',
    representative: 'Lê Hoàng Anh',
    phone: '0903 112 233',
    email: 'info@globalgrains.com',
    documents: {
      businessLicense: true,
      idCard: true,
      vietGapCert: true
    }
  },
  {
    id: 'kyc-4',
    name: 'Hợp Tác Xã Sầu Riêng Krông Pắc',
    category: 'Trồng trọt & Thu hoạch Sầu Riêng',
    type: 'supplier',
    status: 'pending',
    submittedDate: '2026-07-23 08:15',
    location: 'Krông Pắc, Đắk Lắk',
    taxCode: '6001283910',
    representative: 'Y Bham Niê',
    phone: '0935 889 900',
    email: 'htx.saurieng.kp@agriconnect.vn',
    documents: {
      businessLicense: true,
      landCertificate: true,
      idCard: true,
      vietGapCert: true
    },
    missingDocNote: 'Chờ đối soát chứng nhận GlobalGAP xuất khẩu'
  },
  {
    id: 'kyc-5',
    name: 'Vận Tải Nông Sản Đồng Nai',
    category: 'Dịch vụ xe container lạnh',
    type: 'logistics',
    status: 'pending',
    submittedDate: '2026-07-22 16:45',
    location: 'Biên Hòa, Đồng Nai',
    taxCode: '3601928371',
    representative: 'Phạm Thanh Bình',
    phone: '0977 123 999',
    email: 'vantainongsan.dn@gmail.com',
    documents: {
      businessLicense: true,
      idCard: true
    },
    missingDocNote: 'Chờ thẩm định bảo hiểm lô hàng'
  }
];

export const SUPPLIERS_LIST: SupplierItem[] = [
  {
    id: 'sup-1',
    code: 'NCC-8812',
    name: 'Nông trại Sen Vàng',
    type: 'Trồng trọt hữu cơ',
    region: 'Lâm Đồng',
    products: ['Cà phê Arabica', 'Rau củ Đà Lạt', 'Dâu tây'],
    certifications: ['VietGAP', 'Organic EU'],
    creditLimit: '2.5 tỷ VNĐ',
    status: 'active',
    rating: 4.9,
    totalVolume: '450 tấn/năm'
  },
  {
    id: 'sup-2',
    code: 'NCC-7741',
    name: 'Hợp Tác Xã Sầu Riêng Krông Pắc',
    type: 'Trái cây xuất khẩu',
    region: 'Đắc Lắk',
    products: ['Sầu riêng Ri6', 'Sầu riêng Dona'],
    certifications: ['VietGAP', 'GlobalGAP'],
    creditLimit: '5.0 tỷ VNĐ',
    status: 'active',
    rating: 4.8,
    totalVolume: '1,200 tấn/năm'
  },
  {
    id: 'sup-3',
    code: 'NCC-6630',
    name: 'Mekong Rice Export Co.',
    type: 'Lúa gạo xuất khẩu',
    region: 'An Giang',
    products: ['Lúa ST25', 'Gạo Jasmine 85'],
    certifications: ['HACCP', 'ISO 22000'],
    creditLimit: '10.0 tỷ VNĐ',
    status: 'active',
    rating: 5.0,
    totalVolume: '8,500 tấn/năm'
  },
  {
    id: 'sup-4',
    code: 'NCC-5512',
    name: 'HTX Bưởi Da Xanh Chợ Lách',
    type: 'Trái cây ăn quả',
    region: 'Bến Tre',
    products: ['Bưởi Da Xanh', 'Dừa Xiêm'],
    certifications: ['VietGAP', 'OCOP 4 Sao'],
    creditLimit: '3.0 tỷ VNĐ',
    status: 'active',
    rating: 4.7,
    totalVolume: '950 tấn/năm'
  },
  {
    id: 'sup-5',
    code: 'NCC-4409',
    name: 'Nông Nghiệp Xanh Tiền Giang',
    type: 'Trái cây nhiệt đới',
    region: 'Tiền Giang',
    products: ['Xoài Cát Hòa Lộc', 'Thanh Long'],
    certifications: ['GlobalGAP', 'VietGAP'],
    creditLimit: '4.2 tỷ VNĐ',
    status: 'active',
    rating: 4.8,
    totalVolume: '1,500 tấn/năm'
  },
  {
    id: 'sup-6',
    code: 'NCC-3388',
    name: 'Nông Trường Cà Phê Chư Sê',
    type: 'Nông sản công nghiệp',
    region: 'Đắc Lắk',
    products: ['Cà phê Robusta', 'Hạt Tiêu Đen'],
    certifications: ['Rainforest', '4C Certified'],
    creditLimit: '6.5 tỷ VNĐ',
    status: 'active',
    rating: 4.9,
    totalVolume: '3,100 tấn/năm'
  },
  {
    id: 'sup-7',
    code: 'NCC-2210',
    name: 'Rau Sạch An Toàn Xuân Lộc',
    type: 'Rau củ quả tươi',
    region: 'Đồng Nai',
    products: ['Dưa lưới', 'Cà chua cherry', 'Ớt chuông'],
    certifications: ['VietGAP', 'HACCP'],
    creditLimit: '2.0 tỷ VNĐ',
    status: 'active',
    rating: 4.6,
    totalVolume: '600 tấn/năm'
  }
];

export const PARTNERS_LIST: PartnerItem[] = [
  {
    id: 'part-1',
    code: 'DT-9011',
    name: 'Global Grains Corp',
    type: 'Doanh nghiệp XNK Lương thực',
    region: 'Cần Thơ',
    products: ['Lúa gạo ST25', 'Ngô hạt', 'Đậu đậu'],
    certifications: ['ISO 22000', 'Escrow VIP'],
    creditLimit: '50.0 tỷ VNĐ',
    status: 'active',
    rating: 4.9,
    totalVolume: '15,000 tấn/năm'
  },
  {
    id: 'part-2',
    code: 'DT-8820',
    name: 'VinFruit Trading International',
    type: 'Tập đoàn Thu mua Trái cây',
    region: 'Tiền Giang',
    products: ['Sầu riêng', 'Thanh long', 'Xoài Cát'],
    certifications: ['GlobalGAP', 'FDA Cleared'],
    creditLimit: '25.0 tỷ VNĐ',
    status: 'active',
    rating: 4.8,
    totalVolume: '8,200 tấn/năm'
  },
  {
    id: 'part-3',
    code: 'DT-7734',
    name: 'AgriExport Japan Co., Ltd',
    type: 'Đối tác Nhập khẩu Nhật Bản',
    region: 'Lâm Đồng',
    products: ['Cà phê Arabica', 'Rau củ sấy', 'Hoa tươi'],
    certifications: ['JAS Organic', 'HACCP'],
    creditLimit: '35.0 tỷ VNĐ',
    status: 'active',
    rating: 5.0,
    totalVolume: '4,500 tấn/năm'
  },
  {
    id: 'part-4',
    code: 'DT-6612',
    name: 'EuroAgri Import GmbH',
    type: 'Nhà phân phối Châu Âu',
    region: 'Đắc Lắk',
    products: ['Hạt điều', 'Tiêu đen', 'Cacao'],
    certifications: ['Organic EU', 'Fairtrade'],
    creditLimit: '40.0 tỷ VNĐ',
    status: 'active',
    rating: 4.7,
    totalVolume: '6,000 tấn/năm'
  },
  {
    id: 'part-5',
    code: 'DT-5509',
    name: 'Mekong Trading Alliance',
    type: 'Chuỗi siêu thị nội địa',
    region: 'An Giang',
    products: ['Trái cây Miền Tây', 'Rau Đà Lạt'],
    certifications: ['VietGAP', 'OCOP 5 Sao'],
    creditLimit: '15.0 tỷ VNĐ',
    status: 'active',
    rating: 4.6,
    totalVolume: '3,200 tấn/năm'
  },
  {
    id: 'part-6',
    code: 'DT-4481',
    name: 'Singapore Agro Trading',
    type: 'Thương mại Đông Nam Á',
    region: 'Bến Tre',
    products: ['Dừa tươi', 'Bưởi da xanh', 'Thủy sản'],
    certifications: ['Halal', 'GlobalGAP'],
    creditLimit: '30.0 tỷ VNĐ',
    status: 'active',
    rating: 4.9,
    totalVolume: '9,800 tấn/năm'
  },
  {
    id: 'part-7',
    code: 'DT-3310',
    name: 'Middle East Agri-Hub LLC',
    type: 'Tập đoàn Thu mua Nông sản',
    region: 'Đồng Nai',
    products: ['Gạo thơm', 'Hạt macca', 'Chuối cấy mô'],
    certifications: ['Halal', 'BRCGS'],
    creditLimit: '60.0 tỷ VNĐ',
    status: 'active',
    rating: 4.8,
    totalVolume: '20,000 tấn/năm'
  }
];

export const LOGISTICS_LIST: LogisticsItem[] = [
  {
    id: 'log-1',
    code: 'VC-1001',
    name: 'Logistics Phía Nam',
    type: 'Chuỗi cung ứng lạnh',
    region: 'An Giang',
    products: ['Container lạnh -20°C', 'Kho mát bảo quản'],
    certifications: ['GPS Realtime', 'Chuyên dụng'],
    fleetCapacity: '45 Xe Container Lạnh',
    creditLimit: '10.0 tỷ VNĐ',
    status: 'active',
    rating: 4.9,
    totalVolume: '120 chuyến/tháng'
  },
  {
    id: 'log-2',
    code: 'VC-2015',
    name: 'Vận Tải Nông Sản Đồng Nai',
    type: 'Đội xe tải thùng lạnh',
    region: 'Đồng Nai',
    products: ['Xe tải 15 tấn', 'Kho lạnh tổng hợp'],
    certifications: ['Bảo hiểm lô hàng', 'GPS'],
    fleetCapacity: '28 Xe tải lạnh',
    creditLimit: '5.0 tỷ VNĐ',
    status: 'active',
    rating: 4.7,
    totalVolume: '85 chuyến/tháng'
  },
  {
    id: 'log-3',
    code: 'VC-3088',
    name: 'Lâm Đồng ColdChain Express',
    type: 'Chuyển phát nông sản tươi',
    region: 'Lâm Đồng',
    products: ['Xe mát 5-10 tấn', 'Bảo quản hoa & rau'],
    certifications: ['Kiểm soát nhiệt độ'],
    fleetCapacity: '35 Xe tải lạnh',
    creditLimit: '7.5 tỷ VNĐ',
    status: 'active',
    rating: 4.8,
    totalVolume: '150 chuyến/tháng'
  },
  {
    id: 'log-4',
    code: 'VC-4022',
    name: 'Mekong Waterway Freight',
    type: 'Vận tải đường thủy',
    region: 'Tiền Giang',
    products: ['Sà lan 1.000 tấn', 'Vận chuyển lúa gạo'],
    certifications: ['Định vị AIS', 'Hàng hải'],
    fleetCapacity: '12 Sà lan trọng tải lớn',
    creditLimit: '15.0 tỷ VNĐ',
    status: 'active',
    rating: 4.6,
    totalVolume: '40 chuyến/tháng'
  },
  {
    id: 'log-5',
    code: 'VC-5099',
    name: 'Hữu Nghị Cross-Border Logistics',
    type: 'Vận tải xuất khẩu cửa khẩu',
    region: 'Đắc Lắk',
    products: ['Xe thông quan nhanh', 'Xe container đường dài'],
    certifications: ['Xuất khẩu chính ngạch'],
    fleetCapacity: '60 Xe container',
    creditLimit: '20.0 tỷ VNĐ',
    status: 'active',
    rating: 4.9,
    totalVolume: '200 chuyến/tháng'
  },
  {
    id: 'log-6',
    code: 'VC-6033',
    name: 'Cảng Hàng Không Nông Sản AirCargo',
    type: 'Vận chuyển hàng không',
    region: 'Lâm Đồng',
    products: ['Bay hỏa tốc 24h', 'Trái cây cao cấp'],
    certifications: ['IATA Certified', 'ColdChain Air'],
    fleetCapacity: '5 Hãng hàng không đối tác',
    creditLimit: '30.0 tỷ VNĐ',
    status: 'active',
    rating: 5.0,
    totalVolume: '90 chuyến/tháng'
  },
  {
    id: 'log-7',
    code: 'VC-7044',
    name: 'Bến Tre Cold Express',
    type: 'Vận tải chuyên tuyến',
    region: 'Bến Tre',
    products: ['Xe tải bảo quản mít', 'Bảo quản dừa tươi'],
    certifications: ['GPS Realtime', 'Cảm biến độ ẩm'],
    fleetCapacity: '22 Xe tải lạnh',
    creditLimit: '4.5 tỷ VNĐ',
    status: 'active',
    rating: 4.7,
    totalVolume: '75 chuyến/tháng'
  }
];

export const CONTRACTS_LIST: ContractItem[] = [
  {
    id: 'hd-01',
    contractNo: 'HD-2026-8842',
    buyer: 'Global Grains Corp',
    seller: 'Mekong Rice Export Co.',
    product: 'Lúa ST25 Thượng Hạng',
    quantity: '500 Tấn',
    totalValue: '12.5 tỷ VNĐ',
    escrowStatus: 'locked',
    status: 'active',
    startDate: '2026-07-01',
    endDate: '2026-08-15'
  },
  {
    id: 'hd-02',
    contractNo: 'HD-2026-7719',
    buyer: 'VinFruit Trading',
    seller: 'HTX Sầu Riêng Krông Pắc',
    product: 'Sầu Riêng Ri6 Hàng Loại 1',
    quantity: '120 Tấn',
    totalValue: '9.6 tỷ VNĐ',
    escrowStatus: 'partially_released',
    status: 'active',
    startDate: '2026-07-10',
    endDate: '2026-07-30'
  }
];
