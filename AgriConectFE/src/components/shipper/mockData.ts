import { OrderItem, Vehicle, TransportRoute, NotificationItem } from './types';
const hino500Img = '/images/hino_500_tarp_truck_1785141331701.jpg';
const hino300Img = '/images/hino_300_tarp_truck_1785141343872.jpg';
const kiaBoxImg = '/images/kia_box_truck_1785141358554.jpg';
const isuzuRefrigImg = '/images/isuzu_refrigerated_truck_1785141370773.jpg';
const sitrakTractorImg = '/images/sitrak_orange_tractor_1785141383476.jpg';
const sanyTractorImg = '/images/sany_red_tractor_1785141397011.jpg';
const lightRefrigImg = '/images/light_refrigerated_truck_1785141409579.jpg';

export const INITIAL_ORDERS: OrderItem[] = [
  {
    id: 'ord-1',
    orderCode: '#ORD-7829',
    pickupLocation: 'Kho Tổng Quận 7',
    deliveryLocation: 'Siêu thị Mega Market Q2',
    expectedRevenue: 1250000,
    revenueFormatted: '1.250.000đ',
    status: 'pending',
    productType: 'Lúa mì',
    weight: '12.5 Tấn',
    createdAt: '10 phút trước',
    estimatedDeliveryTime: '11:30 AM',
    temperatureTarget: 'Khô ráo'
  },
  {
    id: 'ord-2',
    orderCode: '#ORD-7830',
    pickupLocation: 'Chợ Đầu Mối Bình Điền',
    deliveryLocation: 'Nhà hàng Sen Việt Q1',
    expectedRevenue: 1800000,
    revenueFormatted: '1.800.000đ',
    status: 'pending',
    productType: 'Cà phê',
    weight: '24.5 Tấn',
    createdAt: '25 phút trước',
    estimatedDeliveryTime: '12:15 PM',
    temperatureTarget: 'Khô ráo'
  },
  {
    id: 'ord-3',
    orderCode: '#ORD-7831',
    pickupLocation: 'Trang trại AgriFarm Củ Chi',
    deliveryLocation: 'Kho Trung Chuyển Q12',
    expectedRevenue: 1550000,
    revenueFormatted: '1.550.000đ',
    status: 'pending',
    productType: 'Trái cây',
    weight: '8.5 Tấn',
    createdAt: '40 phút trước',
    estimatedDeliveryTime: '02:00 PM',
    temperatureTarget: '10°C - 15°C'
  },
  {
    id: 'ord-4',
    orderCode: '#ORD-7832',
    pickupLocation: 'Kho Nông Sản Đắk Lắk',
    deliveryLocation: 'Cảng Cát Lái, TP.HCM',
    expectedRevenue: 1750000,
    revenueFormatted: '1.750.000đ',
    status: 'pending',
    productType: 'Ngô',
    weight: '15.0 Tấn',
    createdAt: '50 phút trước',
    estimatedDeliveryTime: '04:00 PM'
  },
  {
    id: 'ord-5',
    orderCode: '#ORD-7833',
    pickupLocation: 'Nông trường Cao su Bình Phước',
    deliveryLocation: 'Nhà máy Chế biến Bình Dương',
    expectedRevenue: 1450000,
    revenueFormatted: '1.450.000đ',
    status: 'pending',
    productType: 'Sữa tươi',
    weight: '10.0 Tấn',
    createdAt: '1 giờ trước',
    estimatedDeliveryTime: '05:30 PM',
    temperatureTarget: '2°C - 4°C'
  },
  {
    id: 'ord-6',
    orderCode: '#ORD-7834',
    pickupLocation: 'Hợp tác xã Điều Bình Phước',
    deliveryLocation: 'Kho Ngoại quan Long An',
    expectedRevenue: 950000,
    revenueFormatted: '950.000đ',
    status: 'pending',
    productType: 'Điều',
    weight: '5.0 Tấn',
    createdAt: '1.5 giờ trước',
    estimatedDeliveryTime: '06:00 PM'
  },
  {
    id: 'ord-7',
    orderCode: '#ORD-7835',
    pickupLocation: 'Vùng nguyên liệu Hồ tiêu Gia Lai',
    deliveryLocation: 'Kho trung chuyển Quận 9',
    expectedRevenue: 1100000,
    revenueFormatted: '1.100.000đ',
    status: 'pending',
    productType: 'Hồ tiêu',
    weight: '7.2 Tấn',
    createdAt: '2 giờ trước',
    estimatedDeliveryTime: '07:00 PM'
  },
  {
    id: 'ord-8',
    orderCode: '#ORD-7836',
    pickupLocation: 'Vườn rau Đà Lạt',
    deliveryLocation: 'Chợ đầu mối Hóc Môn',
    expectedRevenue: 850000,
    revenueFormatted: '850.000đ',
    status: 'pending',
    productType: 'Rau củ',
    weight: '4.5 Tấn',
    createdAt: '2.5 giờ trước',
    estimatedDeliveryTime: '08:00 PM',
    temperatureTarget: '8°C'
  },
  {
    id: 'ord-9',
    orderCode: '#ORD-7837',
    pickupLocation: 'Vườn Thanh Long Bình Thuận',
    deliveryLocation: 'Kho lạnh Thủ Đức',
    expectedRevenue: 1200000,
    revenueFormatted: '1.200.000đ',
    status: 'pending',
    productType: 'Trái cây',
    weight: '6.0 Tấn',
    createdAt: '3 giờ trước',
    estimatedDeliveryTime: '09:00 PM'
  },
  {
    id: 'ord-10',
    orderCode: '#ORD-7838',
    pickupLocation: 'Cảng cá Phan Thiết',
    deliveryLocation: 'Nhà máy Đông lạnh Q7',
    expectedRevenue: 1650000,
    revenueFormatted: '1.650.000đ',
    status: 'pending',
    productType: 'Thủy sản',
    weight: '3.5 Tấn',
    createdAt: '3.5 giờ trước',
    estimatedDeliveryTime: '10:00 PM',
    temperatureTarget: '-18°C'
  },
  {
    id: 'ord-11',
    orderCode: '#ORD-7839',
    pickupLocation: 'Kho Gạo Tiền Giang',
    deliveryLocation: 'Tổng kho Lương thực Miền Nam',
    expectedRevenue: 1850000,
    revenueFormatted: '1.850.000đ',
    status: 'pending',
    productType: 'Gạo',
    weight: '20.0 Tấn',
    createdAt: '4 giờ trước',
    estimatedDeliveryTime: '11:00 PM'
  },
  {
    id: 'ord-12',
    orderCode: '#ORD-7840',
    pickupLocation: 'Đồi chè Thái Nguyên',
    deliveryLocation: 'Showroom Trà Quận 1',
    expectedRevenue: 750000,
    revenueFormatted: '750.000đ',
    status: 'pending',
    productType: 'Chè',
    weight: '2.0 Tấn',
    createdAt: '4.5 giờ trước',
    estimatedDeliveryTime: '11:30 PM'
  },
  {
    id: 'ord-13',
    orderCode: '#ORD-7825',
    pickupLocation: 'Nông trại Đà Lạt (Trung chuyển Q9)',
    deliveryLocation: 'Chuỗi Bách Hóa Xanh Q3',
    expectedRevenue: 2400000,
    revenueFormatted: '2.400.000đ',
    status: 'in_transit',
    productType: 'Rau xanh & Nấm tươi',
    weight: '5.0 Tấn',
    driverName: 'Nguyễn Văn A',
    vehiclePlate: '51H-123.45',
    createdAt: '2 giờ trước',
    estimatedDeliveryTime: '10:45 AM',
    temperatureTarget: '5°C'
  },
  {
    id: 'ord-5',
    orderCode: '#ORD-7820',
    pickupLocation: 'HTX Nông nghiệp Tiền Giang',
    deliveryLocation: 'Kho Bãi Chợ Bình Điền',
    expectedRevenue: 3100000,
    revenueFormatted: '3.100.000đ',
    status: 'delivered',
    productType: 'Xoài Cát Hòa Lộc',
    weight: '8.0 Tấn',
    driverName: 'Lê Hoàng Nam',
    vehiclePlate: '51D-452.18',
    createdAt: '5 giờ trước',
    estimatedDeliveryTime: '08:30 AM',
    temperatureTarget: '12°C'
  },
  {
    id: 'ord-6',
    orderCode: '#ORD-7818',
    pickupLocation: 'Trang trại Nấm Thủ Đức',
    deliveryLocation: 'Siêu thị Co.opmart Q10',
    expectedRevenue: 980000,
    revenueFormatted: '980.000đ',
    status: 'delivered',
    productType: 'Nấm đùi gà & Nấm kim针',
    weight: '1.2 Tấn',
    driverName: 'Phạm Đức Bảo',
    vehiclePlate: '50H-119.34',
    createdAt: '6 giờ trước',
    estimatedDeliveryTime: '07:45 AM'
  }
];

export const DRIVER_AVATARS: Record<string, string> = {
  'Nguyễn Văn A': 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
  'Trần Thế B': 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
  'Nguyễn Văn C': 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
  'Lê Văn D': 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80',
  'Lê Văn D.': 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80',
  'Lê Văn A': 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80',
  'Lê Văn A.': 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80',
  'Lê Văn S': 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80',
  'Lê Văn S.': 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80',
  'Phạm Văn D': 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80',
  'Phạm Văn D.': 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80',
  'Ngô Quyền': 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
  'Lý Thư Kiệt': 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
  'Trần Hưng Đạo': 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
  'Lê Hồng Phong': 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80',
  'Võ Thị Sáu': 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
  'Phan Trần D': 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
  'Nguyễn Huệ': 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
  'Trần Thái Tông': 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80',
  'Lê Duẩn': 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
  'Lê Hoàng Nam': 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
  'Phạm Đức Bảo': 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
};

export function getDriverAvatarByName(name?: string, fallback?: string): string {
  if (!name) return fallback || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80';
  const cleanName = name.trim();
  if (DRIVER_AVATARS[cleanName]) return DRIVER_AVATARS[cleanName];
  const noDot = cleanName.replace(/\.$/, '');
  if (DRIVER_AVATARS[noDot]) return DRIVER_AVATARS[noDot];
  return fallback || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80';
}

export function getVehicleImage(type?: string, plateNumber?: string): string {
  const t = (type || '').toLowerCase();
  const plate = (plateNumber || '').toUpperCase();
  
  if (t.includes('đầu kéo') || plate.includes('60C-789') || plate.includes('51D-004')) {
    return sitrakTractorImg;
  }
  if (t.includes('rơ-moóc') || t.includes('trailer')) {
    return sanyTractorImg;
  }
  if (t.includes('lạnh') || t.includes('refrigerated') || plate.includes('CD-7821') || plate.includes('60C-224') || plate.includes('51D-005')) {
    if (t.includes('nhẹ') || plate.includes('51D-005')) {
      return lightRefrigImg;
    }
    return isuzuRefrigImg;
  }
  if (t.includes('van') || t.includes('sprinter') || plate.includes('FG-1100') || plate.includes('29A-555') || plate.includes('MN-4455')) {
    return kiaBoxImg;
  }
  if (t.includes('nặng') || t.includes('15 tấn') || plate.includes('60C-223') || plate.includes('UV-1122')) {
    return hino500Img;
  }
  if (t.includes('trung') || t.includes('300') || plate.includes('29H-123') || plate.includes('51C-987')) {
    return hino300Img;
  }
  if (t.includes('hino') || t.includes('bạt')) {
    return hino500Img;
  }
  return hino300Img;
}

export interface VehicleReportData {
  totalDistance: string;
  fuelConsumption: string;
  tripsLast30Days: number;
  evaluation: string;
  evaluationColor: string;
  activityPercentage: number;
  weeklyPerformance: number[];
  maintenanceHistory: { date: string; content: string; status: string }[];
  incidents: { date: string; issue: string; severity: string }[];
}

export function getVehicleReportData(vehicle: Vehicle): VehicleReportData {
  const plate = vehicle.plateNumber || '';
  
  if (plate === 'FG-1100-LS') {
    return {
      totalDistance: '8,450 km',
      fuelConsumption: '9.2 L/100km',
      tripsLast30Days: 32,
      evaluation: 'Cần bảo trì',
      evaluationColor: 'text-amber-600',
      activityPercentage: 60,
      weeklyPerformance: [50, 70, 45, 80, 65, 35, 75],
      maintenanceHistory: [
        { date: 'Hôm nay', content: 'Sửa cảm biến Phanh (GreenTech Auto)', status: 'Đang xử lý' },
        { date: '01 Th 07, 2026', content: 'Kiểm tra hệ thống phanh ABS', status: 'Hoàn thành' },
        { date: '15 Th10, 2025', content: 'Thay dầu & lọc gió động cơ', status: 'Hoàn thành' },
      ],
      incidents: [
        { date: '02 Th11, 2025', issue: 'Đèn báo phanh nhấp nháy', severity: 'Trung bình (Đã khắc phục)' }
      ]
    };
  }

  if (plate === 'CD-7821-ZM') {
    return {
      totalDistance: '12,380 km',
      fuelConsumption: '11.5 L/100km',
      tripsLast30Days: 28,
      evaluation: 'Cần bảo trì',
      evaluationColor: 'text-amber-600',
      activityPercentage: 45,
      weeklyPerformance: [40, 60, 35, 70, 50, 25, 60],
      maintenanceHistory: [
        { date: 'Hôm nay', content: 'Thay lốc lạnh tủ đông (GreenTech Auto)', status: 'Đang xử lý' },
        { date: '01 Th 07, 2026', content: 'Bảo dưỡng máy lạnh phụ', status: 'Hoàn thành' },
        { date: '20 Th12, 2025', content: 'Bơm ga máy lạnh & cân vành', status: 'Hoàn thành' },
      ],
      incidents: [
        { date: '12 Th01, 2026', issue: 'Nhiệt độ thùng lạnh tăng đột ngột', severity: 'Cao (Đã khắc phục)' }
      ]
    };
  }

  if (plate === '60C-789.01') {
    return {
      totalDistance: '45,200 km',
      fuelConsumption: '22.8 L/100km',
      tripsLast30Days: 19,
      evaluation: 'Cần bảo trì',
      evaluationColor: 'text-amber-600',
      activityPercentage: 52,
      weeklyPerformance: [65, 80, 55, 90, 40, 30, 85],
      maintenanceHistory: [
        { date: 'Hôm nay', content: 'Bảo dưỡng định kỳ 50.000km (Garage Thành Lợi)', status: 'Đang xử lý' },
        { date: '01 Th 07, 2026', content: 'Thay nhớt hộp số & lọc dầu', status: 'Hoàn thành' },
        { date: '05 Th03, 2026', content: 'Thay 4 lốp xe cầu sau', status: 'Hoàn thành' },
      ],
      incidents: [
        { date: '18 Th02, 2026', issue: 'Áp suất lốp giảm bất thường', severity: 'Thấp (Đã xử lý)' }
      ]
    };
  }

  if (plate === '29A-555.22') {
    return {
      totalDistance: '18,900 km',
      fuelConsumption: '9.8 L/100km',
      tripsLast30Days: 35,
      evaluation: 'Cần bảo trì',
      evaluationColor: 'text-amber-600',
      activityPercentage: 68,
      weeklyPerformance: [70, 85, 60, 75, 90, 40, 80],
      maintenanceHistory: [
        { date: 'Hôm nay', content: 'Kiểm tra hệ thống phanh (VinFast Service)', status: 'Đang xử lý' },
        { date: '01 Th 07, 2026', content: 'Thay má phanh trước', status: 'Hoàn thành' },
        { date: '10 Th02, 2026', content: 'Vệ sinh khoang máy & bugi', status: 'Hoàn thành' },
      ],
      incidents: [
        { date: '01 Th04, 2026', issue: 'Tiếng kêu rít nhẹ khi phanh', severity: 'Nhẹ (Đã khắc phục)' }
      ]
    };
  }

  if (plate === 'MN-4455-OP') {
    return {
      totalDistance: '6,750 km',
      fuelConsumption: '8.5 L/100km',
      tripsLast30Days: 24,
      evaluation: 'Cần bảo trì',
      evaluationColor: 'text-amber-600',
      activityPercentage: 40,
      weeklyPerformance: [30, 50, 40, 60, 45, 20, 55],
      maintenanceHistory: [
        { date: 'Hôm nay', content: 'Thay lốp định kỳ (Garage Thành Lợi)', status: 'Đang xử lý' },
        { date: '01 Th 07, 2026', content: 'Cân chỉnh thước lái', status: 'Hoàn thành' },
        { date: '18 Th11, 2025', content: 'Bảo dưỡng 5.000 km đầu', status: 'Hoàn thành' },
      ],
      incidents: [
        { date: '22 Th05, 2026', issue: 'Đinh đâm lốp sau phải', severity: 'Thấp (Đã thay lốp dự phòng)' }
      ]
    };
  }

  const isMaint = vehicle.status === 'maintenance';
  return {
    totalDistance: vehicle.mileage || '15,400 km',
    fuelConsumption: '10.2 L/100km',
    tripsLast30Days: 26,
    evaluation: isMaint ? 'Cần bảo trì' : 'Hoạt động tốt',
    evaluationColor: isMaint ? 'text-amber-600' : 'text-emerald-700',
    activityPercentage: isMaint ? 50 : 88,
    weeklyPerformance: [65, 80, 75, 90, 85, 60, 95],
    maintenanceHistory: [
      ...(vehicle.issue ? [{ date: 'Hôm nay', content: `Sửa ${vehicle.issue} (${vehicle.serviceShop || 'Xưởng dịch vụ'})`, status: 'Đang xử lý' }] : []),
      { date: vehicle.lastMaintenance || '01 Th 07, 2026', content: 'Bảo dưỡng định kỳ toàn xe', status: 'Hoàn thành' },
      { date: '15 Th10, 2025', content: 'Thay dầu động cơ & lọc gió', status: 'Hoàn thành' }
    ],
    incidents: [
      { date: '10 Th01, 2026', issue: 'Kiểm tra cảm biến áp suất', severity: 'Đã hoàn thành' }
    ]
  };
}

export const INITIAL_VEHICLES: Vehicle[] = [
  {
    id: 'veh-1',
    plateNumber: '60C-224.11',
    type: 'Xe lạnh 5 Tấn',
    subtitle: 'Sẵn sàng cho Chuỗi lạnh',
    capacity: '5.0 Tấn',
    status: 'idle',
    lastMaintenance: '01 Th 07, 2026',
    driverName: 'Lê Văn A.',
    driverAvatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80',
    mileage: '42,500 km',
    health: '98%',
    fuelLevel: 92,
    currentLocation: 'Bãi đỗ Bắc Ninh',
    lastUpdate: 'Vừa xong',
    lat: 21.18,
    lng: 106.07,
    destination: 'Bãi đỗ Bắc Ninh'
  },
  {
    id: 'veh-2',
    plateNumber: '51D-004.92',
    type: 'Xe rơ-moóc chở ngũ cốc 10 Tấn',
    capacity: '10 Tấn',
    status: 'active',
    lastMaintenance: '01 Th 07, 2026',
    destination: 'Kho Lạnh Quận 9 - HCM',
    driverName: 'Lê Văn D.',
    driverAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80',
    eta: '08:50 AM (Hôm nay)',
    fuelLevel: 85,
    temperature: -18.0,
    currentLocation: 'Quận 3, TP.HCM',
    lastUpdate: '2 phút trước',
    lat: 10.78,
    lng: 106.69
  },
  {
    id: 'veh-3',
    plateNumber: 'FG-1100-LS',
    type: 'Xe Van Sprinter 2 Tấn',
    capacity: '2.0 Tấn',
    status: 'maintenance',
    lastMaintenance: '01 Th 07, 2026',
    issue: 'Cảm biến Phanh',
    serviceShop: 'GreenTech Auto',
    returnEstimate: '2 Ngày',
    fuelLevel: 45,
    driverName: 'Ngô Quyền',
    driverAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    currentLocation: 'GreenTech Auto',
    lastUpdate: '1 giờ trước',
    lat: 16.05,
    lng: 108.20,
    destination: 'Chờ sửa chữa'
  },
  {
    id: 'veh-4',
    plateNumber: 'CD-7821-ZM',
    type: 'Xe Tải Lạnh 5 Tấn',
    capacity: '5.0 Tấn',
    status: 'maintenance',
    lastMaintenance: '01 Th 07, 2026',
    issue: 'Thay lốc lạnh',
    serviceShop: 'GreenTech Auto',
    returnEstimate: 'Hôm nay',
    fuelLevel: 60,
    driverName: 'Lý Thư Kiệt',
    driverAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    currentLocation: 'GreenTech Auto',
    lastUpdate: '30 phút trước',
    lat: 21.03,
    lng: 105.88,
    destination: 'Chờ sửa chữa'
  },
  {
    id: 'veh-5',
    plateNumber: '60C-789.01',
    type: 'Xe Đầu Kéo',
    capacity: '20 Tấn',
    status: 'maintenance',
    lastMaintenance: '01 Th 07, 2026',
    issue: 'Bảo dưỡng định kỳ 50.000km',
    serviceShop: 'Garage Thành Lợi',
    returnEstimate: 'Hôm nay',
    fuelLevel: 50,
    driverName: 'Trần Hưng Đạo',
    driverAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    currentLocation: 'Garage Thành Lợi',
    lastUpdate: '45 phút trước',
    lat: 10.77,
    lng: 106.75,
    destination: 'Chờ bảo dưỡng'
  },
  {
    id: 'veh-6',
    plateNumber: '29A-555.22',
    type: 'Xe Van Sprinter',
    capacity: '2.0 Tấn',
    status: 'maintenance',
    lastMaintenance: '01 Th 07, 2026',
    issue: 'Kiểm tra hệ thống phanh',
    serviceShop: 'VinFast Service',
    returnEstimate: 'Ngày mai',
    fuelLevel: 70,
    driverName: 'Lê Hồng Phong',
    driverAvatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80',
    currentLocation: 'VinFast Service',
    lastUpdate: '15 phút trước',
    lat: 18.67,
    lng: 105.68,
    destination: 'Chờ kiểm tra'
  },
  {
    id: 'veh-7',
    plateNumber: '51D-005.92',
    type: 'Xe tải lạnh 8 Tấn',
    subtitle: 'Phù hợp hàng tươi sống',
    capacity: '8.0 Tấn',
    status: 'idle',
    lastMaintenance: '01 Th 07, 2026',
    driverName: 'Lê Văn S.',
    driverAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80',
    mileage: '15,200 km',
    health: '100%',
    fuelLevel: 88,
    currentLocation: 'Bãi đỗ Gia Lâm',
    lastUpdate: '1 giờ trước',
    lat: 21.04,
    lng: 105.90,
    destination: 'Bãi đỗ Gia Lâm'
  },
  {
    id: 'veh-8',
    plateNumber: 'MN-4455-OP',
    type: 'Xe Tải Nhẹ 2 Tấn',
    capacity: '2.0 Tấn',
    status: 'maintenance',
    lastMaintenance: '01 Th 07, 2026',
    issue: 'Thay lốp định kỳ',
    serviceShop: 'Garage Thành Lợi',
    returnEstimate: 'Hôm nay',
    fuelLevel: 55,
    driverName: 'Võ Thị Sáu',
    driverAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    currentLocation: 'Garage Thành Lợi',
    lastUpdate: '2 giờ trước',
    lat: 10.03,
    lng: 105.78,
    destination: 'Chờ thay lốp'
  },
  {
    id: 'veh-9',
    plateNumber: '51H-123.45',
    type: 'Xe tải Hino 5 tấn XZU730L',
    capacity: '5.0 Tấn',
    status: 'active',
    lastMaintenance: '01 Th 07, 2026',
    destination: 'Chợ Đầu Mối Bình Điền - HCM',
    driverName: 'Nguyễn Văn A',
    driverAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    eta: '11:15 AM (Hôm nay)',
    fuelLevel: 82,
    temperature: 4.5,
    currentLocation: 'Bình Thạnh, TP.HCM',
    lastUpdate: 'Vừa xong',
    lat: 10.782,
    lng: 106.685
  },
  {
    id: 'veh-10',
    plateNumber: '29C-987.65',
    type: 'Xe Tải Trung',
    capacity: '8.0 Tấn',
    status: 'active',
    lastMaintenance: '01 Th 07, 2026',
    destination: 'Cửa hàng thực phẩm Q7 - HCM',
    driverName: 'Trần Thế B',
    driverAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    eta: '10:15 AM (Hôm nay)',
    fuelLevel: 68,
    temperature: 5.0,
    currentLocation: 'Quận 1, TP.HCM',
    lastUpdate: '2 phút trước',
    lat: 10.768,
    lng: 106.695
  },
  {
    id: 'veh-11',
    plateNumber: '60C-223.11',
    type: 'Xe Tải Nặng',
    capacity: '15 Tấn',
    status: 'active',
    lastMaintenance: '01 Th 07, 2026',
    destination: 'Chợ Đầu Mối Hóc Môn - HCM',
    driverName: 'Nguyễn Văn C',
    driverAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    eta: '08:10 AM (Hôm nay)',
    fuelLevel: 90,
    temperature: 3.8,
    currentLocation: 'Quận 4, TP.HCM',
    lastUpdate: '1 phút trước',
    lat: 10.732,
    lng: 106.715
  },
  {
    id: 'veh-12',
    plateNumber: 'UV-1122-WQ',
    type: 'Xe tải bạt 15 Tấn',
    capacity: '15 Tấn',
    status: 'idle',
    lastMaintenance: '01 Th 07, 2026',
    driverName: 'Phạm Văn D.',
    driverAvatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80',
    mileage: '88,100 km',
    health: '95%',
    fuelLevel: 80,
    currentLocation: 'Bãi đỗ Gia Lâm',
    lastUpdate: '10 phút trước',
    lat: 21.04,
    lng: 105.90,
    destination: 'Bãi đỗ Gia Lâm'
  },
  {
    id: 'veh-13',
    plateNumber: '50E-111.90',
    type: 'Xe Tải Nhẹ 3.5 Tấn',
    subtitle: 'Vận chuyển liên tỉnh',
    capacity: '3.5 Tấn',
    status: 'idle',
    lastMaintenance: '01 Th 07, 2026',
    driverName: 'Phan Trần D',
    driverAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    mileage: '24,300 km',
    health: '96%',
    fuelLevel: 85,
    currentLocation: 'Bãi đỗ Quy Nhơn',
    lastUpdate: '15 phút trước',
    lat: 13.78,
    lng: 109.22,
    destination: 'Bãi đỗ Quy Nhơn'
  },
  {
    id: 'veh-14',
    plateNumber: '63H-882.34',
    type: 'Xe Tải Lạnh 8 Tấn',
    subtitle: 'Chuyên chở nông sản tươi',
    capacity: '8.0 Tấn',
    status: 'idle',
    lastMaintenance: '01 Th 07, 2026',
    driverName: 'Nguyễn Huệ',
    driverAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    mileage: '31,500 km',
    health: '98%',
    fuelLevel: 90,
    currentLocation: 'Bãi đỗ Huế',
    lastUpdate: '30 phút trước',
    lat: 16.46,
    lng: 107.59,
    destination: 'Bãi đỗ Huế'
  },
  {
    id: 'veh-15',
    plateNumber: '51C-957.65',
    type: 'Xe Tải Trung 5 Tấn',
    subtitle: 'Sẵn sàng giao hàng',
    capacity: '5.0 Tấn',
    status: 'idle',
    lastMaintenance: '01 Th 07, 2026',
    driverName: 'Trần Thái Tông',
    driverAvatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80',
    mileage: '18,900 km',
    health: '97%',
    fuelLevel: 88,
    currentLocation: 'Bãi đỗ Nam Định',
    lastUpdate: '20 phút trước',
    lat: 20.43,
    lng: 106.17,
    destination: 'Bãi đỗ Nam Định'
  },
  {
    id: 'veh-16',
    plateNumber: '51C-287.65',
    type: 'Xe Tải Bạt 10 Tấn',
    subtitle: 'Chuyên tuyến Miền Trung',
    capacity: '10 Tấn',
    status: 'idle',
    lastMaintenance: '01 Th 07, 2026',
    driverName: 'Lê Duẩn',
    driverAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    mileage: '29,100 km',
    health: '95%',
    fuelLevel: 82,
    currentLocation: 'Bãi đỗ Quảng Trị',
    lastUpdate: '10 phút trước',
    lat: 16.75,
    lng: 107.18,
    destination: 'Bãi đỗ Quảng Trị'
  }
];

export const INITIAL_ROUTES: TransportRoute[] = [
  {
    id: 'route-1',
    routeCode: 'ROUTE-DALAT-HCM',
    orderCode: '#AG-5012',
    driverName: 'Nguyễn Văn A',
    driverAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    vehiclePlate: '51H-123.45',
    origin: 'Kho Tổng Agri Mart - Đà Lạt',
    destination: 'Chợ Đầu Mối Bình Điền - HCM',
    distanceKm: 308.0,
    estimatedHours: 6.2,
    status: 'active',
    progressPercentage: 80,
    stops: [
      { id: 's1', name: 'Kho Tổng Agri Mart - Đà Lạt', type: 'pickup', address: 'Kho Tổng Agri Mart, Phường 9, TP. Đà Lạt, Lâm Đồng', scheduledTime: '05:00 AM', status: 'completed', contactPerson: 'Anh Bình (Quản kho)', phone: '0903 123 456' },
      { id: 's2', name: 'Trạm Kiểm Định Dầu Giây', type: 'transit', address: 'Trạm Kiểm Định Nông Sản, Dầu Giây, Đồng Nai', scheduledTime: '09:30 AM', status: 'completed', contactPerson: 'Kỹ thuật viên Trạm Cân', phone: '0918 222 333' },
      { id: 's3', name: 'Chợ Đầu Mối Bình Điền - HCM', type: 'delivery', address: 'Đại lộ Nguyễn Văn Linh, Phường 7, Quận 8, TP.HCM', scheduledTime: '11:15 AM', status: 'in_progress', contactPerson: 'Chị Mai (Nhận hàng)', phone: '0988 777 666' }
    ]
  },
  {
    id: 'route-2',
    routeCode: 'ROUTE-BAOLOC-Q7',
    orderCode: '#AG-4988',
    driverName: 'Trần Thế B',
    driverAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    vehiclePlate: '29C-987.65',
    origin: 'Hợp tác xã Rau sạch - Bảo Lộc',
    destination: 'Cửa hàng thực phẩm Q7 - HCM',
    distanceKm: 185.0,
    estimatedHours: 4.2,
    status: 'active',
    progressPercentage: 65,
    stops: [
      { id: 's4', name: 'Hợp tác xã Rau sạch - Bảo Lộc', type: 'pickup', address: '12 Đường Lộc Phát, TP. Bảo Lộc, Lâm Đồng', scheduledTime: '05:30 AM', status: 'completed', contactPerson: 'Chị Lan (HTX Rau sạch)', phone: '0912 888 999' },
      { id: 's5', name: 'Trạm Cân Dầu Giây', type: 'transit', address: 'QL1A, Huyện Thống Nhất, Đồng Nai', scheduledTime: '08:45 AM', status: 'completed', contactPerson: 'Cán bộ kiểm định', phone: '0909 111 222' },
      { id: 's6', name: 'Cửa hàng thực phẩm Q7 - HCM', type: 'delivery', address: '456 Nguyễn Thị Thập, Phường Tân Phong, Quận 7, TP.HCM', scheduledTime: '10:15 AM', status: 'in_progress', contactPerson: 'Anh Hoàng (Quản lý CH)', phone: '0908 666 555' }
    ]
  },
  {
    id: 'route-3',
    routeCode: 'ROUTE-LONGKHANH-HOCMON',
    orderCode: '#AG-5011',
    driverName: 'Nguyễn Văn C',
    driverAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    vehiclePlate: '60C-223.11',
    origin: 'Kho Nông Sản Long Khánh',
    destination: 'Chợ Đầu Mối Hóc Môn - HCM',
    distanceKm: 82.5,
    estimatedHours: 2.1,
    status: 'active',
    progressPercentage: 50,
    stops: [
      { id: 's7', name: 'Kho Nông Sản Long Khánh', type: 'pickup', address: 'Khu công nghiệp Long Khánh, Đồng Nai', scheduledTime: '06:00 AM', status: 'completed', contactPerson: 'Anh Minh (Đại diện kho)', phone: '0915 333 777' },
      { id: 's8', name: 'Chợ Đầu Mối Hóc Môn - HCM', type: 'delivery', address: 'Đường Nguyễn Thị Sóc, Xã Xuân Thới Đông, Hóc Môn, TP.HCM', scheduledTime: '08:10 AM', status: 'in_progress', contactPerson: 'Chị Thu (Điều phối chợ)', phone: '0982 444 111' }
    ]
  },
  {
    id: 'route-4',
    routeCode: 'ROUTE-TIENGIANG-Q9',
    orderCode: '#AG-5015',
    driverName: 'Lê Văn D',
    driverAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80',
    vehiclePlate: '51D-004.92',
    origin: 'Vườn Trái Cây Tiền Giang',
    destination: 'Kho Lạnh Quận 9 - HCM',
    distanceKm: 95.0,
    estimatedHours: 2.3,
    status: 'active',
    progressPercentage: 35,
    stops: [
      { id: 's9', name: 'Vườn Trái Cây Tiền Giang', type: 'pickup', address: 'Ấp Vĩnh Kim, Huyện Châu Thành, Tỉnh Tiền Giang', scheduledTime: '06:30 AM', status: 'completed', contactPerson: 'Ông Nông (Chủ vườn)', phone: '0934 555 111' },
      { id: 's10', name: 'Kho Lạnh Quận 9 - HCM', type: 'delivery', address: 'Đường D2, Khu Công Nghệ Cao, Quận 9, TP.HCM', scheduledTime: '08:50 AM', status: 'pending', contactPerson: 'Anh Hùng (Trưởng kho lạnh)', phone: '0977 444 888' }
    ]
  }
];

export const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'notif-1',
    title: 'Đơn hàng mới được gán',
    description: 'Bạn có 3 đơn hàng nông sản cần xác nhận nhận chuyến (#ORD-7829, #ORD-7830, #ORD-7831).',
    time: '5 phút trước',
    type: 'info',
    read: false
  },
  {
    id: 'notif-2',
    title: 'Cảnh báo nhiệt độ thùng lạnh',
    description: 'Xe 29H-123.45 báo nhiệt độ thùng lạnh đạt 4.5°C (Mức tối ưu: 4.0°C).',
    time: '18 phút trước',
    type: 'warning',
    read: false
  },
  {
    id: 'notif-3',
    title: 'Giao hàng thành công',
    description: 'Đơn #ORD-7820 đã hoàn thành giao 8 Tấn Xoài Cát Hòa Lộc tại Chợ Bình Điền.',
    time: '1 giờ trước',
    type: 'success',
    read: true
  }
];
