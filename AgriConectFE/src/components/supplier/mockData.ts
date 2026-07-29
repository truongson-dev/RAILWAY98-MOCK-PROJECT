import { Product, MarketPrice, NoticeItem, Order, FarmPlot, HarvestEvent, InventoryItem } from './types';

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'prod-1',
    name: 'Cam Sành Tiền Giang',
    category: 'Trái cây',
    price: 22000,
    unit: 'kg',
    stockText: 'Còn 500kg',
    stockKg: 500,
    description: 'Cam sành loại 1, mọng nước, ngọt thanh đậm đà. Được trồng theo tiêu chuẩn VietGAP tại vùng bãi bồi Tiền Giang.',
    imageUrl: 'https://images.unsplash.com/photo-1611080626919-7cf5a9dbab5b?auto=format&fit=crop&w=800&q=80',
    status: 'active',
    origin: 'Tiền Giang',
    certifications: ['VietGAP', 'OCOP 4 sao'],
    harvestDate: '2026-07-20'
  },
  {
    id: 'prod-2',
    name: 'Sầu riêng Ri6',
    category: 'Trái cây',
    price: 85000,
    unit: 'kg',
    stockText: 'Còn 1200kg',
    stockKg: 1200,
    description: 'Cơm vàng hạt lép, thơm ngon đặc trưng. Thu hoạch chính vụ, đạt tiêu chuẩn xuất khẩu chính ngạch.',
    imageUrl: 'https://images.unsplash.com/photo-1595180424598-ef228f4201a0?auto=format&fit=crop&w=800&q=80',
    status: 'active',
    origin: 'An Giang',
    certifications: ['GlobalGAP', 'Mã số vùng trồng'],
    harvestDate: '2026-07-22'
  },
  {
    id: 'prod-3',
    name: 'Gạo ST25 Sóc Trăng',
    category: 'Lúa gạo',
    price: 28500,
    unit: 'kg',
    stockText: 'Còn 5 tấn',
    stockKg: 5000,
    description: 'Gạo ngon nhất thế giới, hạt dài, trắng trong, dẻo thơm hương lá dứa tự nhiên. Lúa trồng vụ đông xuân chất lượng cao.',
    imageUrl: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=800&q=80',
    status: 'active',
    origin: 'Sóc Trăng',
    certifications: ['Hữu cơ Organic', 'VietGAP'],
    harvestDate: '2026-07-15'
  },
  {
    id: 'prod-4',
    name: 'Cà phê Robusta Đắk Lắk',
    category: 'Nông sản khô',
    price: 98000,
    unit: 'kg',
    stockText: 'Còn 3.2 tấn',
    stockKg: 3200,
    description: 'Hạt cà phê nhân xô hái chín 98%, phơi giàn nhà kính, hương vị đậm đà hậu ngọt tự nhiên.',
    imageUrl: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80',
    status: 'active',
    origin: 'Đắk Lắk',
    certifications: ['4C Certified', 'Rainforest Alliance'],
    harvestDate: '2026-06-30'
  },
  {
    id: 'prod-5',
    name: 'Tiêu đen Chư Sê (Hữu cơ)',
    category: 'Nông sản khô',
    price: 145000,
    unit: 'kg',
    stockText: 'Còn 800kg',
    stockKg: 800,
    description: 'Hạt tiêu cay nồng đặc trưng, dung trọng cao >570g/l. Không dư lượng thuốc bảo vệ thực vật.',
    imageUrl: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=800&q=80',
    status: 'active',
    origin: 'Gia Lai',
    certifications: ['USDA Organic', 'EU Organic'],
    harvestDate: '2026-07-10'
  },
  {
    id: 'prod-6',
    name: 'Xoài Cát Hòa Lộc',
    category: 'Trái cây',
    price: 62000,
    unit: 'kg',
    stockText: 'Còn 950kg',
    stockKg: 950,
    description: 'Trái to tròn, thịt dày mịn, ít xơ, hương thơm ngọt lịm hảo hạng đặc sản Đồng Tháp.',
    imageUrl: 'https://images.unsplash.com/photo-1553279768-865429fa0078?auto=format&fit=crop&w=800&q=80',
    status: 'active',
    origin: 'Đồng Tháp',
    certifications: ['VietGAP'],
    harvestDate: '2026-07-24'
  }
];

export const INITIAL_MARKET_PRICES: MarketPrice[] = [
  {
    id: 'mp-1',
    cropName: 'Thanh long ruột đỏ',
    grade: 'Lớp A • kg',
    price: 35000,
    unit: 'đ/kg',
    changePercent: 2.1,
    trend: 'up',
    marketName: 'Chợ đầu mối Bình Điền',
    date: 'Hôm nay'
  },
  {
    id: 'mp-2',
    cropName: 'Lúa thơm ST25',
    grade: 'Vụ mới • kg',
    price: 12500,
    unit: 'đ/kg',
    changePercent: -0.5,
    trend: 'down',
    marketName: 'Sàn Nông sản ĐBSCL',
    date: 'Hôm nay'
  },
  {
    id: 'mp-3',
    cropName: 'Sầu riêng Ri6',
    grade: 'Xuất khẩu • kg',
    price: 85000,
    unit: 'đ/kg',
    changePercent: 5.8,
    trend: 'up',
    marketName: 'Cửa khẩu Hữu Nghị',
    date: 'Hôm nay'
  },
  {
    id: 'mp-4',
    cropName: 'Cà phê nhân Robusta',
    grade: 'Loại 1 • kg',
    price: 99500,
    unit: 'đ/kg',
    changePercent: 1.4,
    trend: 'up',
    marketName: 'Sàn Bôn Ma Thuột',
    date: 'Hôm nay'
  },
  {
    id: 'mp-5',
    cropName: 'Tiêu hạt đen',
    grade: 'Tiêu khô 570g/l',
    price: 148000,
    unit: 'đ/kg',
    changePercent: 0.0,
    trend: 'stable',
    marketName: 'Chợ Nông sản Gia Lai',
    date: 'Hôm nay'
  }
];

export const INITIAL_NOTICES: NoticeItem[] = [
  {
    id: 'notif-1',
    title: 'Đơn hàng #ORD-8821 đã được xác nhận',
    timeAgo: '2 giờ trước',
    category: 'Hệ thống',
    isRead: false,
    type: 'order',
    content: 'Khách hàng Công ty Nông sản Nông Việt đã chuyển cọc 30% cho đơn hàng 500kg Cam Sành Tiền Giang.'
  },
  {
    id: 'notif-2',
    title: 'Thanh toán 12.000.000đ đang được chuyển',
    timeAgo: '5 giờ trước',
    category: 'Tài chính',
    isRead: false,
    type: 'finance',
    content: 'Lệnh giải ngân từ Ngân hàng Agribank chi nhánh An Giang đang xử lý vào tài khoản của ông Lê Văn Hùng.'
  },
  {
    id: 'notif-3',
    title: 'Dự báo thời tiết: Mưa lớn vào chiều tối mai',
    timeAgo: 'Hôm qua',
    category: 'Cảnh báo',
    isRead: true,
    type: 'weather',
    content: 'Khu vực Chợ Mới - An Giang dự báo có mưa rào kèm dông bão. Khuyến nghị phủ bạt bảo vệ kho lúa ngoài trời.'
  },
  {
    id: 'notif-4',
    title: 'Yêu cầu kiểm định mã vùng trồng VietGAP',
    timeAgo: '2 ngày trước',
    category: 'Hệ thống',
    isRead: true,
    type: 'system',
    content: 'Sở Nông nghiệp & PTNT đã duyệt hồ sơ tái cấp chứng nhận VietGAP cho lô vườn Cam sành Lô A1.'
  }
];

export const INITIAL_HARVEST_EVENTS: HarvestEvent[] = [
  {
    id: 'harv-1',
    cropName: 'Cà phê Robusta',
    date: '2026-07-27',
    status: 'ready',
    daysLeftText: 'Sẵn sàng: 2 ngày tới',
    imageUrl: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=400&q=80',
    location: 'Lô C3 - Vườn đồi Đắk Lắk',
    expectedYield: '4.5 Tấn'
  },
  {
    id: 'harv-2',
    cropName: 'Tiêu đen (Hữu cơ)',
    date: '2026-08-09',
    status: 'upcoming',
    daysLeftText: 'Sẵn sàng: 15 ngày tới',
    imageUrl: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=400&q=80',
    location: 'Lô B1 - Gia Lai Organic',
    expectedYield: '1.2 Tấn'
  }
];

export const INITIAL_ORDERS: Order[] = [
  {
    id: 'ord-8821',
    orderCode: '#ORD-8821',
    customerName: 'Siêu thị Co.opmart An Giang',
    customerPhone: '0918 234 567',
    customerAddress: '124 Trần Hưng Đạo, TP. Long Xuyên, An Giang',
    productName: 'Cam Sành Tiền Giang',
    quantity: '500 kg',
    totalPrice: 11000000,
    status: 'new',
    createdAt: '25/07/2026 08:30',
    deliveryDate: '27/07/2026',
    paymentMethod: 'Chuyển khoản Ngân hàng (Đã cọc 30%)',
    notes: 'Yêu cầu đóng thùng carton 10kg/thùng, có tem truy xuất nguồn gốc QR.'
  },
  {
    id: 'ord-8820',
    orderCode: '#ORD-8820',
    customerName: 'Công ty XK AgriWorld HCM',
    customerPhone: '0903 888 999',
    customerAddress: 'Kho cảng Cát Lái, Quận 2, TP. Hồ Chí Minh',
    productName: 'Sầu riêng Ri6',
    quantity: '1000 kg',
    totalPrice: 85000000,
    status: 'processing',
    createdAt: '24/07/2026 14:15',
    deliveryDate: '28/07/2026',
    paymentMethod: 'Thư tín dụng L/C',
    notes: 'Tiêu chuẩn xuất khẩu khẩu ngạch, độ chín 85%, chiếu xạ kiểm dịch.'
  },
  {
    id: 'ord-8819',
    orderCode: '#ORD-8819',
    customerName: 'Chuỗi Cửa hàng Thực phẩm Sạch GreenLife',
    customerPhone: '0987 112 233',
    customerAddress: '45 Lê Lợi, TP. Cần Thơ',
    productName: 'Gạo ST25 Sóc Trăng',
    quantity: '2000 kg',
    totalPrice: 57000000,
    status: 'shipping',
    createdAt: '23/07/2026 10:00',
    deliveryDate: '25/07/2026',
    paymentMethod: 'COD (Thanh toán khi nhận hàng)',
    notes: 'Giao trong giờ hành chính, xe tải có hạ bạt che nắng.'
  },
  {
    id: 'ord-8818',
    orderCode: '#ORD-8818',
    customerName: 'Đại lý Nông sản Miền Tây',
    customerPhone: '0977 444 555',
    customerAddress: 'Chợ đầu mối Nông sản Cai Lậy, Tiền Giang',
    productName: 'Xoài Cát Hòa Lộc',
    quantity: '800 kg',
    totalPrice: 49600000,
    status: 'completed',
    createdAt: '21/07/2026 09:20',
    deliveryDate: '22/07/2026',
    paymentMethod: 'Chuyển khoản toàn bộ',
    notes: 'Đã hoàn tất thanh toán và nghiệm thu hàng hóa.'
  }
];

export const INITIAL_FARM_PLOTS: FarmPlot[] = [
  {
    id: 'plot-1',
    name: 'Lô A1 - Vườn Cam Sành VietGAP',
    cropType: 'Cam Sành Tiền Giang',
    areaHa: 3.5,
    healthStatus: 'Thịnh vượng',
    soilMoisture: 72,
    temperature: 29.5,
    lastFertilized: '18/07/2026',
    nextHarvestDate: '10/08/2026',
    estimatedYieldKg: 8500
  },
  {
    id: 'plot-2',
    name: 'Lô B2 - Vườn Sầu Riêng Ri6',
    cropType: 'Sầu riêng Ri6',
    areaHa: 5.0,
    healthStatus: 'Thịnh vượng',
    soilMoisture: 68,
    temperature: 31.0,
    lastFertilized: '12/07/2026',
    nextHarvestDate: '02/08/2026',
    estimatedYieldKg: 14000
  },
  {
    id: 'plot-3',
    name: 'Lô C1 - Cánh đồng Lúa ST25',
    cropType: 'Gạo ST25 Sóc Trăng',
    areaHa: 12.0,
    healthStatus: 'Cần chú ý',
    soilMoisture: 88,
    temperature: 28.0,
    lastFertilized: '05/07/2026',
    nextHarvestDate: '15/09/2026',
    estimatedYieldKg: 60000
  }
];

export const INITIAL_INVENTORY: InventoryItem[] = [
  {
    id: 'inv-1',
    batchCode: 'BATCH-2026-CAM-01',
    productName: 'Cam Sành Tiền Giang',
    warehouseLocation: 'Kho Lạnh A1 - Cụm Tiền Giang',
    quantityInStock: 500,
    unit: 'kg',
    tempCelsius: 8.5,
    humidityPercent: 85,
    qualityGrade: 'Loại A (Xuất khẩu/Siêu thị)',
    entryDate: '20/07/2026',
    expiryDate: '10/08/2026'
  },
  {
    id: 'inv-2',
    batchCode: 'BATCH-2026-SR-04',
    productName: 'Sầu riêng Ri6',
    warehouseLocation: 'Kho Thông Thoát B2 - Chợ Mới',
    quantityInStock: 1200,
    unit: 'kg',
    tempCelsius: 18.0,
    humidityPercent: 70,
    qualityGrade: 'Hàng tuyển chọn VIP',
    entryDate: '22/07/2026',
    expiryDate: '30/07/2026'
  },
  {
    id: 'inv-3',
    batchCode: 'BATCH-2026-GAO-12',
    productName: 'Gạo ST25 Sóc Trăng',
    warehouseLocation: 'Kho Bột Lúa C3 - Khô ráo',
    quantityInStock: 5000,
    unit: 'kg',
    tempCelsius: 24.0,
    humidityPercent: 60,
    qualityGrade: 'Đạt chuẩn Hữu cơ Organic',
    entryDate: '15/07/2026',
    expiryDate: '15/01/2027'
  }
];
