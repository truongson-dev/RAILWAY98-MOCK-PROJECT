import React, { useState } from 'react';
import { 
  Package, 
  Truck, 
  MapPin, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  X, 
  Search, 
  Star, 
  ShieldCheck, 
  ChevronDown, 
  Radio, 
  Info, 
  AlertTriangle,
  FileImage,
  Calendar,
  Building2,
  Wheat,
  Coffee,
  Sprout,
  Fish,
  Utensils,
  Leaf,
  Apple,
  Droplets
} from 'lucide-react';
import { OrderItem, Vehicle } from './types';
import { getDriverAvatarByName } from './mockData';

interface ShipmentTrackingViewProps {
  orders?: OrderItem[];
  vehicles?: Vehicle[];
  assignedOrderCodes?: string[];
  busyDriverNames?: string[];
  initialAssigningOrderCode?: string | null;
  onClearInitialAssigningOrderCode?: () => void;
  onOpenAssignOrderModal?: (driverName: string, vehiclePlate?: string) => void;
  onConfirmAssignOrderFromTracking?: (
    driverName: string,
    vehiclePlate: string,
    orderCode: string,
    pickup: string,
    delivery: string,
    cargoType: string,
    weight: string,
    revenue: string
  ) => void;
}

interface DriverOption {
  id: string;
  name: string;
  initials: string;
  avatar: string;
  rating: number;
  vehiclePlate: string;
  licenseClass: string;
  dutyYard: string;
}

const DRIVER_OPTIONS: DriverOption[] = [
  { id: 'd1', name: 'Lê Văn A', initials: 'DV', avatar: getDriverAvatarByName('Lê Văn A'), rating: 5.0, vehiclePlate: '60C-224.11', licenseClass: 'Hạng D', dutyYard: 'Bãi đỗ Bắc Ninh' },
  { id: 'd2', name: 'Lê Văn S', initials: 'CA', avatar: getDriverAvatarByName('Lê Văn S'), rating: 4.9, vehiclePlate: '51D-005.92', licenseClass: 'Hạng E', dutyYard: 'Bãi đỗ Gia Lâm' },
  { id: 'd3', name: 'Phạm Văn D', initials: 'BL', avatar: getDriverAvatarByName('Phạm Văn D'), rating: 4.7, vehiclePlate: 'UV-1122-WQ', licenseClass: 'Hạng C', dutyYard: 'Bãi đỗ Gia Lâm' },
  { id: 'd4', name: 'Phan Trần D', initials: 'PT', avatar: getDriverAvatarByName('Phan Trần D'), rating: 4.7, vehiclePlate: '50E-111.90', licenseClass: 'Hạng C', dutyYard: 'Bãi đỗ Quy Nhơn' },
  { id: 'd5', name: 'Nguyễn Huệ', initials: 'NH', avatar: getDriverAvatarByName('Nguyễn Huệ'), rating: 4.9, vehiclePlate: '63H-882.34', licenseClass: 'Hạng E', dutyYard: 'Bãi đỗ Huế' },
  { id: 'd6', name: 'Trần Thái Tông', initials: 'TT', avatar: getDriverAvatarByName('Trần Thái Tông'), rating: 4.8, vehiclePlate: '51C-957.65', licenseClass: 'Hạng D', dutyYard: 'Bãi đỗ Nam Định' },
  { id: 'd7', name: 'Lê Duẩn', initials: 'LD', avatar: getDriverAvatarByName('Lê Duẩn'), rating: 4.7, vehiclePlate: '51C-287.65', licenseClass: 'Hạng C', dutyYard: 'Bãi đỗ Quảng Trị' },
];

const getCategoryIcon = (category: string, className = "w-5 h-5 text-[#176a22] shrink-0") => {
  const cat = (category || '').toLowerCase();
  if (cat.includes('thủy') || cat.includes('hải') || cat.includes('cá')) {
    return <Fish className={className} />;
  }
  if (cat.includes('cà phê') || cat.includes('coffee')) {
    return <Coffee className={className} />;
  }
  if (cat.includes('lúa') || cat.includes('gạo') || cat.includes('ngô') || cat.includes('bột')) {
    return <Wheat className={className} />;
  }
  if (cat.includes('rau') || cat.includes('củ')) {
    return <Sprout className={className} />;
  }
  if (cat.includes('chè') || cat.includes('trà') || cat.includes('tiêu') || cat.includes('điều') || cat.includes('hồ tiêu')) {
    return <Leaf className={className} />;
  }
  if (cat.includes('sữa') || cat.includes('nước') || cat.includes('cao su')) {
    return <Droplets className={className} />;
  }
  if (cat.includes('thịt') || cat.includes('gà') || cat.includes('heo') || cat.includes('bò')) {
    return <Utensils className={className} />;
  }
  if (cat.includes('trái') || cat.includes('quả') || cat.includes('thanh long') || cat.includes('hoa quả')) {
    return <Apple className={className} />;
  }
  return <Wheat className={className} />;
};

export const ShipmentTrackingView: React.FC<ShipmentTrackingViewProps> = ({ 
  orders,
  vehicles, 
  assignedOrderCodes = [], 
  busyDriverNames = [],
  initialAssigningOrderCode,
  onClearInitialAssigningOrderCode,
  onOpenAssignOrderModal, 
  onConfirmAssignOrderFromTracking 
}) => {
  const [activeTab, setActiveTab] = useState<'new' | 'in_transit' | 'completed'>('new');

  // Filters for New Requests
  const [selectedRegion, setSelectedRegion] = useState('Tất cả');
  const [selectedCategory, setSelectedCategory] = useState('Tất cả');
  const [selectedWeight, setSelectedWeight] = useState('Tất cả');
  const [openFilter, setOpenFilter] = useState<'region' | 'category' | 'weight' | null>(null);

  const REGION_OPTIONS = ['Tất cả', 'Miền Nam', 'Miền Trung', 'Tây Nguyên', 'Miền Bắc'];
  const CATEGORY_OPTIONS = ['Tất cả', 'Lúa mì', 'Cà phê', 'Trái cây', 'Ngô', 'Sữa tươi', 'Điều', 'Hồ tiêu', 'Rau củ', 'Thủy sản', 'Gạo', 'Chè'];
  const WEIGHT_OPTIONS = ['Tất cả', 'Dưới 5,000 kg', '5,000 - 15,000 kg', 'Trên 15,000 kg'];

  // Interactive order states for new requests
  const [newRequests, setNewRequests] = useState([
    { id: 'r1', code: '#ORD-7829', weight: '12,500 kg', region: 'Miền Nam', pickup: 'Kho Tổng Quận 7', delivery: 'Siêu thị Mega Market Q2', category: 'Lúa mì', revenue: '1.250.000 ₫', status: 'new', assignedDriver: null as string | null },
    { id: 'r2', code: '#ORD-7830', weight: '24,500 kg', region: 'Miền Nam', pickup: 'Chợ Đầu Mối Bình Điền', delivery: 'Nhà hàng Sen Việt Q1', category: 'Cà phê', revenue: '1.800.000 ₫', status: 'new', assignedDriver: null as string | null },
    { id: 'r3', code: '#ORD-7831', weight: '8,500 kg', region: 'Miền Nam', pickup: 'Trang trại AgriFarm Củ Chi', delivery: 'Kho Trung Chuyển Q12', category: 'Trái cây', revenue: '1.550.000 ₫', status: 'new', assignedDriver: null as string | null },
    { id: 'r4', code: '#ORD-7832', weight: '15,000 kg', region: 'Tây Nguyên', pickup: 'Kho Nông Sản Đắk Lắk', delivery: 'Cảng Cát Lái, TP.HCM', category: 'Ngô', revenue: '2.100.000 ₫', status: 'new', assignedDriver: null as string | null },
    { id: 'r5', code: '#ORD-7833', weight: '10,000 kg', region: 'Miền Nam', pickup: 'Nông trường Cao su Bình Phước', delivery: 'Nhà máy Chế biến Bình Dương', category: 'Sữa tươi', revenue: '1.450.000 ₫', status: 'new', assignedDriver: null as string | null },
    { id: 'r6', code: '#ORD-7834', weight: '5,000 kg', region: 'Miền Nam', pickup: 'Hợp tác xã Điều Bình Phước', delivery: 'Kho Ngoại quan Long An', category: 'Điều', revenue: '950.000 ₫', status: 'new', assignedDriver: null as string | null },
    { id: 'r7', code: '#ORD-7835', weight: '7,200 kg', region: 'Tây Nguyên', pickup: 'Vùng nguyên liệu Hồ tiêu Gia Lai', delivery: 'Kho trung chuyển Quận 9', category: 'Hồ tiêu', revenue: '1.100.000 ₫', status: 'new', assignedDriver: null as string | null },
    { id: 'r8', code: '#ORD-7836', weight: '4,500 kg', region: 'Miền Trung', pickup: 'Vườn rau Đà Lạt', delivery: 'Chợ đầu mối Hóc Môn', category: 'Rau củ', revenue: '850.000 ₫', status: 'new', assignedDriver: null as string | null },
    { id: 'r9', code: '#ORD-7837', weight: '6,000 kg', region: 'Miền Trung', pickup: 'Vườn Thanh Long Bình Thuận', delivery: 'Kho lạnh Thủ Đức', category: 'Trái cây', revenue: '1.200.000 ₫', status: 'new', assignedDriver: null as string | null },
    { id: 'r10', code: '#ORD-7838', weight: '3,500 kg', region: 'Miền Trung', pickup: 'Cảng cá Phan Thiết', delivery: 'Nhà máy Đông lạnh Q7', category: 'Thủy sản', revenue: '1.650.000 ₫', status: 'new', assignedDriver: null as string | null },
    { id: 'r11', code: '#ORD-7839', weight: '20,000 kg', region: 'Miền Nam', pickup: 'Kho Gạo Tiền Giang', delivery: 'Tổng kho Lương thực Miền Nam', category: 'Gạo', revenue: '2.500.000 ₫', status: 'new', assignedDriver: null as string | null },
    { id: 'r12', code: '#ORD-7840', weight: '2,000 kg', region: 'Miền Bắc', pickup: 'Đồi chè Thái Nguyên', delivery: 'Showroom Trà Quận 1', category: 'Chè', revenue: '750.000 ₫', status: 'new', assignedDriver: null as string | null },
  ]);

  // Modals state
  const [assigningOrderCode, setAssigningOrderCode] = useState<string | null>(initialAssigningOrderCode || null);

  React.useEffect(() => {
    if (initialAssigningOrderCode) {
      setAssigningOrderCode(initialAssigningOrderCode);
      setSelectedDriverId(null);
      setActiveTab('new');
    }
  }, [initialAssigningOrderCode]);
  const [driverSearch, setDriverSearch] = useState('');
  const [selectedDriverId, setSelectedDriverId] = useState<string | null>(null);

  const [rejectingOrderCode, setRejectingOrderCode] = useState<string | null>(null);
  const [rejectReason, setRejectReason] = useState('');

  const [viewingPODOrder, setViewingPODOrder] = useState<{
    code: string;
    driverName: string;
    date: string;
    location: string;
    product: string;
    review: string;
    podImage?: string;
  } | null>(null);

  // In Transit data state (supports dynamic insertion)
  const [inTransitShipments, setInTransitShipments] = useState([
    {
      id: 'it1',
      driverName: 'Nguyễn Văn A',
      driverAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
      rating: 4.9,
      plateNumber: '51H-123.45',
      orderCode: 'Đơn hàng #AG-5012',
      pickup: 'Kho Tổng Agri Mart - TP.HCM',
      delivery: 'Chợ Đầu Mối Bình Điền, Q.8',
      category: 'Rau củ tươi',
      weight: '12,500 kg',
    },
    {
      id: 'it2',
      driverName: 'Trần Thế B',
      driverAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
      rating: 4.7,
      plateNumber: '29C-987.65',
      orderCode: 'Đơn hàng #AG-4988',
      pickup: 'Hợp tác xã Rau sạch - Lâm Đồng',
      delivery: 'Cửa hàng thực phẩm sạch Q1',
      category: 'Lúa mì hữu cơ',
      weight: '24,500 kg',
    },
    {
      id: 'it3',
      driverName: 'Nguyễn Văn C',
      driverAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80',
      rating: 5.0,
      plateNumber: '60C-223.11',
      orderCode: 'Đơn hàng #AG-5011',
      pickup: 'Kho Nông Sản Long Khánh',
      delivery: 'Chợ Đầu Mối Hóc Môn',
      category: 'Cá tươi',
      weight: '4,200 kg',
    },
    {
      id: 'it4',
      driverName: 'Lê Văn D',
      driverAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80',
      rating: 4.8,
      plateNumber: '51D-004.92',
      orderCode: 'Đơn hàng #AG-5015',
      pickup: 'Vườn Trái Cây Tiền Giang',
      delivery: 'Kho Lạnh Quận 9 - TP.HCM',
      category: 'Trái cây tổng hợp',
      weight: '8,500 kg',
    },
  ]);

  // Active vehicle filtering & syncing across views
  const activeVehicles = (vehicles || []).filter(v => v.status === 'active');
  const activePlatesSet = new Set((vehicles || []).filter(v => v.status === 'active').map(v => (v.plateNumber || '').toUpperCase().trim()));
  const allVehiclePlatesSet = new Set((vehicles || []).map(v => (v.plateNumber || '').toUpperCase().trim()));

  // 1. Filter local inTransitShipments to remove deleted or non-active vehicles, and sync declared cargoType & driver
  const validInTransitShipments = inTransitShipments
    .filter(item => {
      if (!vehicles) return true;
      const plate = (item.plateNumber || '').toUpperCase().trim();
      return activePlatesSet.has(plate);
    })
    .map(item => {
      const plate = (item.plateNumber || '').toUpperCase().trim();
      const matchedVeh = (vehicles || []).find(v => (v.plateNumber || '').toUpperCase().trim() === plate);
      if (matchedVeh) {
        return {
          ...item,
          driverName: matchedVeh.driverName && matchedVeh.driverName !== 'Chưa phân công' ? matchedVeh.driverName : item.driverName,
          driverAvatar: matchedVeh.driverName ? getDriverAvatarByName(matchedVeh.driverName) : item.driverAvatar,
          orderCode: matchedVeh.orderCode || item.orderCode,
          pickup: matchedVeh.origin || item.pickup,
          delivery: matchedVeh.destination || item.delivery,
          category: matchedVeh.cargoType || item.category,
        };
      }
      return item;
    });

  // 2. Append active vehicles that are not yet in inTransitShipments
  const extraActiveShipments = activeVehicles
    .filter(v => !validInTransitShipments.some(s => (s.plateNumber || '').toUpperCase().trim() === (v.plateNumber || '').toUpperCase().trim()))
    .map(v => ({
      id: `dynamic-${v.id}`,
      driverName: v.driverName && v.driverName !== 'Chưa phân công' ? v.driverName : 'Tài xế điều hành',
      driverAvatar: getDriverAvatarByName(v.driverName || ''),
      rating: 4.8,
      plateNumber: v.plateNumber,
      orderCode: v.orderCode || `Đơn hàng #AG-${(v.plateNumber || '').replace(/[^0-9]/g, '').slice(-4) || '5012'}`,
      pickup: v.origin || v.operatingYard || 'Kho Tổng TP.HCM',
      delivery: v.destination || v.currentLocation || 'Chợ Đầu Mối Cần Thơ',
      category: v.cargoType || v.type || 'Nông sản tươi',
      weight: v.cargoCapacity ? `${v.cargoCapacity}` : '10,000 kg',
    }));

  const displayInTransitShipments = [...validInTransitShipments, ...extraActiveShipments];

  // Completed data
  const completedShipments = [
    {
      id: 'c1',
      driverName: 'Nguyễn Huệ',
      initials: 'NH',
      plateNumber: '63H-882.34',
      orderCode: '#ORD-98770',
      route: 'Bãi đỗ Huệ → Bãi đỗ Quy Nhơn',
      highway: 'Tuyến đường: Đèo Hải Vân - QL1A',
      dates: '31/07/2026 - 31/07/2026',
      deliveryTime: '08:45 SA, 31/07/2026',
      duration: 'Tổng thời gian: 8 giờ 45 phút',
      category: 'Thủy hải sản đông lạnh',
      weight: '2.8 Tấn',
      stars: 5,
      review: 'Thủy sản được bảo quản độ lạnh đúng chuẩn, tài xế giao đúng khung giờ!',
      deliveryLocation: 'Bãi đỗ Quy Nhơn, Bình Định',
      podImage: 'https://images.unsplash.com/photo-1534483509719-3feaee7c30da?auto=format&fit=crop&w=1000&q=80'
    },
    {
      id: 'c2',
      driverName: 'Phan Trần D',
      initials: 'PT',
      plateNumber: '50E-111.90',
      orderCode: '#ORD-98760',
      route: 'Bãi đỗ Quy Nhơn → Bãi đỗ Huế',
      highway: 'Tuyến đường: QL1A',
      dates: '31/07/2026 - 31/07/2026',
      deliveryTime: '14:15 CH, 31/07/2026',
      duration: 'Tổng thời gian: 6 giờ 30 phút',
      category: 'Cà phê hạt',
      weight: '2.5 Tấn',
      stars: 4,
      review: 'Cà phê đóng bao cẩn thận, thùng xe khô ráo không bị ẩm.',
      deliveryLocation: 'Bãi đỗ Huế, Thừa Thiên Huế',
      podImage: 'https://images.unsplash.com/photo-1587734195503-904fca47e0e9?auto=format&fit=crop&w=1000&q=80'
    },
    {
      id: 'c3',
      driverName: 'Lê Duẩn',
      initials: 'LD',
      plateNumber: '51C-287.65',
      orderCode: '#ORD-28765',
      route: 'Bãi đỗ Quảng Trị → Bãi đỗ Đà Nẵng',
      highway: 'Tuyến đường: QL1A',
      dates: '14/07/2026 - 14/07/2026',
      deliveryTime: '09:30 SA, 14/07/2026',
      duration: 'Tổng thời gian: 3 giờ 45 phút',
      category: 'Hải sản tươi sống',
      weight: '1.5 Tấn',
      stars: 5,
      review: 'Tài xế giao siêu nhanh, sục khí duy trì hải sản rất khỏe.',
      deliveryLocation: 'Bãi đỗ Đà Nẵng',
      podImage: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1000&q=80'
    },
    {
      id: 'c4',
      driverName: 'Lê Văn S',
      initials: 'CA',
      plateNumber: '51D-005.92',
      orderCode: '#ORD-00592',
      route: 'Bãi đỗ Gia Lâm → Cảng Hải Phòng',
      highway: 'Tuyến đường: QL5B - Cao tốc',
      dates: '10/07/2026 - 11/07/2026',
      deliveryTime: '16:00 CH, 11/07/2026',
      duration: 'Tổng thời gian: 12 giờ 00 phút',
      category: 'Gạo ST25',
      weight: '5.0 Tấn',
      stars: 5,
      review: 'Gạo ST25 đúng chất lượng, bao bì sạch sẽ. Tài xế Lê Văn S giao hàng rất nhanh và hỗ trợ nhiệt tình tại cảng.',
      deliveryLocation: 'Cảng Hải Phòng, Hải Phòng',
      podImage: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=1000&q=80'
    },
    {
      id: 'c5',
      driverName: 'Phạm Văn D',
      initials: 'BL',
      plateNumber: 'UV-1122-WQ',
      orderCode: '#ORD-11190',
      route: 'Bãi đỗ Gia Lâm → Bãi đỗ Đà Nẵng',
      highway: 'Tuyến đường: QL1A - Đường tránh Huế',
      dates: '07/07/2026 - 08/07/2026',
      deliveryTime: '11:20 SA, 08/07/2026',
      duration: 'Tổng thời gian: 22 giờ 15 phút',
      category: 'Trái cây xuất khẩu',
      weight: '3.2 Tấn',
      stars: 4,
      review: 'Trái cây tươi nguyên tép, đúng nhiệt độ cài đặt 5°C.',
      deliveryLocation: 'Bãi đỗ Đà Nẵng',
      podImage: 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&w=1000&q=80'
    },
    {
      id: 'c6',
      driverName: 'Lê Văn A',
      initials: 'DV',
      plateNumber: '60C-224.11',
      orderCode: '#ORD-88234',
      route: 'Bãi đỗ Bắc Ninh → Cảng Hải Phòng',
      highway: 'Tuyến đường: QL5B - Cao tốc Hà Nội - Hải Phòng',
      dates: '05/07/2026 - 06/07/2026',
      deliveryTime: '13:45 CH, 06/07/2026',
      duration: 'Tổng thời gian: 18 giờ 30 phút',
      category: 'Nông sản sạch (Rau củ)',
      weight: '4.5 Tấn',
      stars: 5,
      review: 'Bàn giao rau tươi nguyên cuống, chứng từ hóa đơn đầy đủ.',
      deliveryLocation: 'Cảng Hải Phòng',
      podImage: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=1000&q=80'
    },
    {
      id: 'c7',
      driverName: 'Trần Thái Tông',
      initials: 'TT',
      plateNumber: '51C-957.65',
      orderCode: '#ORD-95765',
      route: 'Bãi đỗ Nam Định → Bãi đỗ Bắc Ninh',
      highway: 'Tuyến đường: QL10',
      dates: '01/07/2026 - 01/07/2026',
      deliveryTime: '10:10 SA, 01/07/2026',
      duration: 'Tổng thời gian: 4 giờ 15 phút',
      category: 'Thịt gà tươi',
      weight: '8.0 Tấn',
      stars: 5,
      review: 'Thịt đông lạnh chuẩn quy trình, hạ tải cực kỳ chuyên nghiệp.',
      deliveryLocation: 'Bãi đỗ Bắc Ninh',
      podImage: 'https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?auto=format&fit=crop&w=1000&q=80'
    },
  ];

  // Actions
  const handleConfirmAssignDriver = () => {
    if (!assigningOrderCode || !selectedDriverId) return;
    const drv = DRIVER_OPTIONS.find(d => d.id === selectedDriverId);
    const targetOrder = newRequests.find(r => r.code === assigningOrderCode);
    
    if (drv && targetOrder) {
      setNewRequests(prev => prev.map(item => {
        if (item.code === assigningOrderCode) {
          return { ...item, status: 'accepted', assignedDriver: drv.name };
        }
        return item;
      }));

      // Directly create new card in "Đang giao hàng" with assigned driver details and avatar
      const newShipmentCard = {
        id: `it-${Date.now()}`,
        driverName: drv.name,
        driverAvatar: drv.avatar,
        rating: drv.rating,
        plateNumber: drv.vehiclePlate,
        orderCode: `Đơn hàng ${targetOrder.code}`,
        pickup: targetOrder.pickup,
        delivery: targetOrder.delivery,
        category: targetOrder.category,
        weight: targetOrder.weight,
      };

      setInTransitShipments(prev => [newShipmentCard, ...prev]);

      if (onConfirmAssignOrderFromTracking) {
        onConfirmAssignOrderFromTracking(
          drv.name,
          drv.vehiclePlate,
          targetOrder.code,
          targetOrder.pickup,
          targetOrder.delivery,
          targetOrder.category,
          targetOrder.weight,
          targetOrder.revenue
        );
      }
    }

    setAssigningOrderCode(null);
    setSelectedDriverId(null);
    setDriverSearch('');
    if (onClearInitialAssigningOrderCode) {
      onClearInitialAssigningOrderCode();
    }
  };

  const handleConfirmRejectOrder = () => {
    if (!rejectingOrderCode) return;
    setNewRequests(prev => prev.map(item => {
      if (item.code === rejectingOrderCode) {
        return { ...item, status: 'rejected' };
      }
      return item;
    }));
    setRejectingOrderCode(null);
    setRejectReason('');
  };

  const assignedDriverNames = new Set([
    ...inTransitShipments.map(s => s.driverName.replace(/\.$/, '').trim().toLowerCase()),
    ...newRequests.filter(r => r.assignedDriver).map(r => (r.assignedDriver as string).replace(/\.$/, '').trim().toLowerCase()),
    ...(vehicles || []).filter(v => v.status === 'active' && v.driverName).map(v => v.driverName!.replace(/\.$/, '').trim().toLowerCase()),
    ...(busyDriverNames || []).map(d => d.replace(/\.$/, '').trim().toLowerCase())
  ]);

  const filteredDrivers = DRIVER_OPTIONS.filter(d => {
    const cleanDName = d.name.replace(/\.$/, '').trim().toLowerCase();
    if (assignedDriverNames.has(cleanDName)) return false;
    const query = driverSearch.toLowerCase();
    return (
      d.name.toLowerCase().includes(query) ||
      d.vehiclePlate.toLowerCase().includes(query) ||
      d.dutyYard.toLowerCase().includes(query)
    );
  });

  const filteredNewRequests = newRequests.filter((req) => {
    if (req.status !== 'new') return false;
    if (assignedOrderCodes.includes(req.code)) return false;
    if (selectedRegion !== 'Tất cả' && req.region !== selectedRegion) {
      return false;
    }
    if (selectedCategory !== 'Tất cả' && req.category !== selectedCategory) {
      return false;
    }
    if (selectedWeight !== 'Tất cả') {
      const w = parseInt(req.weight.replace(/[^0-9]/g, ''), 10) || 0;
      if (selectedWeight === 'Dưới 5,000 kg' && w >= 5000) return false;
      if (selectedWeight === '5,000 - 15,000 kg' && (w < 5000 || w > 15000)) return false;
      if (selectedWeight === 'Trên 15,000 kg' && w <= 15000) return false;
    }
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Top Tab Bar Navigation */}
      <div className="flex items-center gap-8 border-b border-[#bfcaba]/50 pb-0 pt-2 px-2">
        <button
          onClick={() => setActiveTab('new')}
          className={`pb-3 font-bold text-base transition-all relative ${
            activeTab === 'new'
              ? 'text-[#176a22] border-b-2 border-[#176a22]'
              : 'text-[#40493d] hover:text-[#181d16]'
          }`}
        >
          Yêu cầu mới ({filteredNewRequests.length})
        </button>
        <button
          onClick={() => setActiveTab('in_transit')}
          className={`pb-3 font-bold text-base transition-all relative ${
            activeTab === 'in_transit'
              ? 'text-[#176a22] border-b-2 border-[#176a22]'
              : 'text-[#40493d] hover:text-[#181d16]'
          }`}
        >
          Đang giao hàng ({displayInTransitShipments.length})
        </button>
        <button
          onClick={() => setActiveTab('completed')}
          className={`pb-3 font-bold text-base transition-all relative ${
            activeTab === 'completed'
              ? 'text-[#176a22] border-b-2 border-[#176a22]'
              : 'text-[#40493d] hover:text-[#181d16]'
          }`}
        >
          Đã hoàn thành ({completedShipments.length})
        </button>
      </div>

      {/* TAB 1: YÊU CẦU MỚI */}
      {activeTab === 'new' && (
        <div className="space-y-6">
          {/* Backdrop for closing popovers */}
          {openFilter !== null && (
            <div 
              className="fixed inset-0 z-20 bg-transparent" 
              onClick={() => setOpenFilter(null)} 
            />
          )}

          {/* Dropdown Filters */}
          <div className="flex flex-wrap items-center gap-3 py-1 relative z-30">
            {/* Filter 1: Khu vực */}
            <div className="relative">
              <button 
                onClick={() => setOpenFilter(openFilter === 'region' ? null : 'region')}
                className={`px-3.5 py-1.5 border rounded-lg text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer ${
                  selectedRegion !== 'Tất cả'
                    ? 'bg-[#176a22] text-white border-[#176a22] shadow-xs'
                    : 'bg-[#f1f5ea] border-[#bfcaba]/70 text-[#40493d] hover:bg-[#e5eadf]'
                }`}
              >
                <span>Khu vực: {selectedRegion}</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${openFilter === 'region' ? 'rotate-180' : ''}`} />
              </button>
              {openFilter === 'region' && (
                <div className="absolute top-full left-0 mt-1.5 w-48 bg-white border border-[#bfcaba]/80 rounded-xl shadow-lg z-40 py-1.5 divide-y divide-gray-100">
                  {REGION_OPTIONS.map((opt) => (
                    <button
                      key={opt}
                      onClick={() => {
                        setSelectedRegion(opt);
                        setOpenFilter(null);
                      }}
                      className={`w-full text-left px-3.5 py-2 text-xs font-medium flex items-center justify-between hover:bg-[#f1f5ea] transition-colors ${
                        selectedRegion === opt ? 'text-[#176a22] font-bold bg-[#f1f5ea]/60' : 'text-[#181d16]'
                      }`}
                    >
                      <span>{opt}</span>
                      {selectedRegion === opt && <CheckCircle2 className="w-3.5 h-3.5 text-[#176a22]" />}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Filter 2: Loại hàng */}
            <div className="relative">
              <button 
                onClick={() => setOpenFilter(openFilter === 'category' ? null : 'category')}
                className={`px-3.5 py-1.5 border rounded-lg text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer ${
                  selectedCategory !== 'Tất cả'
                    ? 'bg-[#176a22] text-white border-[#176a22] shadow-xs'
                    : 'bg-[#f1f5ea] border-[#bfcaba]/70 text-[#40493d] hover:bg-[#e5eadf]'
                }`}
              >
                <span>Loại hàng: {selectedCategory}</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${openFilter === 'category' ? 'rotate-180' : ''}`} />
              </button>
              {openFilter === 'category' && (
                <div className="absolute top-full left-0 mt-1.5 w-52 bg-white border border-[#bfcaba]/80 rounded-xl shadow-lg z-40 py-1.5 max-h-60 overflow-y-auto">
                  {CATEGORY_OPTIONS.map((opt) => (
                    <button
                      key={opt}
                      onClick={() => {
                        setSelectedCategory(opt);
                        setOpenFilter(null);
                      }}
                      className={`w-full text-left px-3.5 py-2 text-xs font-medium flex items-center justify-between hover:bg-[#f1f5ea] transition-colors ${
                        selectedCategory === opt ? 'text-[#176a22] font-bold bg-[#f1f5ea]/60' : 'text-[#181d16]'
                      }`}
                    >
                      <span>{opt}</span>
                      {selectedCategory === opt && <CheckCircle2 className="w-3.5 h-3.5 text-[#176a22]" />}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Filter 3: Khối lượng */}
            <div className="relative">
              <button 
                onClick={() => setOpenFilter(openFilter === 'weight' ? null : 'weight')}
                className={`px-3.5 py-1.5 border rounded-lg text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer ${
                  selectedWeight !== 'Tất cả'
                    ? 'bg-[#176a22] text-white border-[#176a22] shadow-xs'
                    : 'bg-[#f1f5ea] border-[#bfcaba]/70 text-[#40493d] hover:bg-[#e5eadf]'
                }`}
              >
                <span>Khối lượng: {selectedWeight}</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${openFilter === 'weight' ? 'rotate-180' : ''}`} />
              </button>
              {openFilter === 'weight' && (
                <div className="absolute top-full left-0 mt-1.5 w-52 bg-white border border-[#bfcaba]/80 rounded-xl shadow-lg z-40 py-1.5">
                  {WEIGHT_OPTIONS.map((opt) => (
                    <button
                      key={opt}
                      onClick={() => {
                        setSelectedWeight(opt);
                        setOpenFilter(null);
                      }}
                      className={`w-full text-left px-3.5 py-2 text-xs font-medium flex items-center justify-between hover:bg-[#f1f5ea] transition-colors ${
                        selectedWeight === opt ? 'text-[#176a22] font-bold bg-[#f1f5ea]/60' : 'text-[#181d16]'
                      }`}
                    >
                      <span>{opt}</span>
                      {selectedWeight === opt && <CheckCircle2 className="w-3.5 h-3.5 text-[#176a22]" />}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Reset Filters button */}
            {(selectedRegion !== 'Tất cả' || selectedCategory !== 'Tất cả' || selectedWeight !== 'Tất cả') && (
              <button
                onClick={() => {
                  setSelectedRegion('Tất cả');
                  setSelectedCategory('Tất cả');
                  setSelectedWeight('Tất cả');
                  setOpenFilter(null);
                }}
                className="px-3 py-1.5 text-xs text-[#ba1a1a] font-bold hover:underline flex items-center gap-1 cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
                <span>Xóa bộ lọc</span>
              </button>
            )}
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredNewRequests.length === 0 ? (
              <div className="bg-white border border-[#bfcaba]/60 rounded-xl p-8 text-center space-y-3 col-span-full my-4">
                <Info className="w-8 h-8 text-[#707a6c] mx-auto" />
                <p className="text-sm font-bold text-[#181d16]">Không tìm thấy yêu cầu phù hợp với bộ lọc hiện tại</p>
                <p className="text-xs text-[#40493d]">Vui lòng chọn bộ lọc khác hoặc đặt lại bộ lọc.</p>
                <button
                  onClick={() => {
                    setSelectedRegion('Tất cả');
                    setSelectedCategory('Tất cả');
                    setSelectedWeight('Tất cả');
                  }}
                  className="px-4 py-2 bg-[#176a22] text-white rounded-lg text-xs font-bold shadow-xs hover:bg-[#0f4e17] transition-colors cursor-pointer"
                >
                  Đặt lại bộ lọc
                </button>
              </div>
            ) : (
              filteredNewRequests.map((req) => (
              <div 
                key={req.id} 
                className="bg-white border border-[#bfcaba]/60 rounded-xl p-5 shadow-xs hover:shadow-md transition-shadow flex flex-col gap-4"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="text-xl font-bold text-[#181d16]">{req.code}</h4>
                    <p className="text-sm text-[#40493d] font-semibold mt-0.5">{req.weight}</p>
                  </div>
                  <span className="px-3 py-1 bg-[#358439] text-[#f7fff1] rounded-full text-xs font-bold uppercase tracking-wider">
                    Mới
                  </span>
                </div>

                <div className="space-y-3">
                  <div className="flex gap-3">
                    <Radio className="w-5 h-5 text-[#176a22] shrink-0 mt-0.5" />
                    <div className="min-w-0">
                      <p className="text-[10px] text-[#40493d] uppercase tracking-wide font-extrabold">ĐIỂM LẤY</p>
                      <p className="text-xs text-[#181d16] font-medium truncate">{req.pickup}</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <MapPin className="w-5 h-5 text-[#ba1a1a] shrink-0 mt-0.5" />
                    <div className="min-w-0">
                      <p className="text-[10px] text-[#40493d] uppercase tracking-wide font-extrabold">ĐIỂM GIAO</p>
                      <p className="text-xs text-[#181d16] font-medium truncate">{req.delivery}</p>
                    </div>
                  </div>

                  <div className="bg-[#f1f5ea] p-3 rounded-lg flex justify-between items-center mt-2">
                    <div className="flex items-center gap-2.5 min-w-0 flex-1 pr-2">
                      {getCategoryIcon(req.category, "w-5 h-5 text-[#176a22] shrink-0")}
                      <div className="min-w-0 flex-1">
                        <p className="text-[10px] text-[#40493d] uppercase font-bold">Loại hàng</p>
                        <p className="text-xs font-bold text-[#181d16] leading-tight break-words whitespace-normal">{req.category}</p>
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-[10px] text-[#40493d] uppercase font-bold">Dự kiến thu</p>
                      <p className="text-xs font-bold text-[#176a22]">{req.revenue}</p>
                    </div>
                  </div>
                </div>

                {/* Bottom Action Buttons */}
                <div className="flex gap-3 mt-auto pt-1">
                  {req.status === 'accepted' ? (
                    <>
                      <button 
                        disabled 
                        className="flex-1 py-2 px-3 border border-[#bfcaba] rounded-lg text-[#40493d]/50 text-xs font-bold cursor-not-allowed bg-gray-50"
                      >
                        Từ chối
                      </button>
                      <button 
                        disabled 
                        className="flex-1 py-2 px-3 bg-[#22c55e] text-white rounded-lg text-xs font-bold flex items-center justify-center gap-1 shadow-xs cursor-default"
                      >
                        <CheckCircle2 className="w-4 h-4" />
                        Đã chấp nhận
                      </button>
                    </>
                  ) : req.status === 'rejected' ? (
                    <>
                      <button 
                        disabled 
                        className="flex-1 py-2 px-3 bg-[#ba1a1a] text-white rounded-lg text-xs font-bold cursor-default"
                      >
                        Đã từ chối
                      </button>
                      <button 
                        disabled 
                        className="flex-1 py-2 px-3 bg-[#e0e4d9] text-[#40493d]/50 rounded-lg text-xs font-bold cursor-not-allowed"
                      >
                        Chấp nhận
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => {
                          setRejectingOrderCode(req.code);
                          setRejectReason('');
                        }}
                        className="flex-1 py-2 px-3 border border-[#bfcaba] hover:border-red-300 rounded-lg text-[#181d16] hover:text-[#ba1a1a] hover:bg-red-50 text-xs font-bold transition-all"
                      >
                        Từ chối
                      </button>
                      <button
                        onClick={() => {
                          setAssigningOrderCode(req.code);
                          setSelectedDriverId(null);
                        }}
                        className="flex-1 py-2 px-3 bg-[#176a22] hover:bg-[#1b6d24] text-white rounded-lg text-xs font-bold shadow-xs transition-all active:scale-98"
                      >
                        Chấp nhận
                      </button>
                    </>
                  )}
                </div>
              </div>
            )))}
          </div>
        </div>
      )}

      {/* TAB 2: ĐANG GIAO HÀNG */}
      {activeTab === 'in_transit' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-stretch">
          {displayInTransitShipments.map((item) => (
            <div 
              key={item.id}
              className="bg-white border border-[#bfcaba]/60 rounded-xl p-5 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between h-full gap-4"
            >
              {/* Header with Driver info */}
              <div className="flex justify-between items-start min-h-[48px]">
                <div className="flex items-center gap-3">
                  <img 
                    src={item.driverAvatar} 
                    alt={item.driverName}
                    className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-xs shrink-0" 
                  />
                  <div className="min-w-0">
                    <h4 className="font-bold text-sm text-[#181d16] truncate">{item.driverName}</h4>
                    <div className="flex items-center gap-1.5 text-xs text-[#176a22] font-semibold mt-0.5">
                      <Star className="w-3.5 h-3.5 fill-[#176a22] text-[#176a22] shrink-0" />
                      <span>{item.rating}</span>
                      <span className="bg-[#e6f4ea] text-[#00893d] border border-[#a5d6a7] text-[10px] px-2 py-0.5 rounded-full font-bold ml-1 whitespace-nowrap">
                        Đang di chuyển
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Vehicle & Order */}
              <div className="flex items-center justify-between bg-[#f7fbf0] p-2.5 rounded-lg border border-[#bfcaba]/50 min-h-[52px]">
                <div>
                  <h3 className="text-base font-black text-[#181d16] tracking-tight">{item.plateNumber}</h3>
                  <p className="text-[10px] text-[#40493d] font-bold mt-0.5">{item.orderCode}</p>
                </div>
                <Truck className="w-6 h-6 text-[#176a22] opacity-80 shrink-0" />
              </div>

              {/* Pickup & Delivery */}
              <div className="space-y-3 flex-1 flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex gap-2.5 items-start">
                    <Radio className="w-4 h-4 text-[#176a22] shrink-0 mt-0.5" />
                    <div className="min-w-0 flex-1">
                      <p className="text-[10px] text-[#40493d] uppercase font-bold">ĐIỂM LẤY</p>
                      <p className="text-xs text-[#181d16] font-medium leading-tight break-words">{item.pickup}</p>
                    </div>
                  </div>
                  <div className="flex gap-2.5 items-start">
                    <MapPin className="w-4 h-4 text-[#ba1a1a] shrink-0 mt-0.5" />
                    <div className="min-w-0 flex-1">
                      <p className="text-[10px] text-[#40493d] uppercase font-bold">ĐIỂM GIAO</p>
                      <p className="text-xs text-[#181d16] font-medium leading-tight break-words">{item.delivery}</p>
                    </div>
                  </div>
                </div>

                {/* Cargo Details Box */}
                <div className="bg-[#f1f5ea] p-2.5 rounded-lg flex justify-between items-center text-xs mt-3 min-h-[56px]">
                  <div className="flex items-center gap-2 min-w-0 flex-1 pr-2">
                    {getCategoryIcon(item.category, "w-5 h-5 text-[#176a22] shrink-0")}
                    <div className="min-w-0 flex-1">
                      <p className="text-[10px] text-[#40493d] uppercase font-bold">Loại hàng</p>
                      <p className="font-bold text-[#181d16] leading-tight break-words whitespace-normal">{item.category}</p>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-[10px] text-[#40493d] uppercase font-bold">Khối lượng</p>
                    <p className="font-bold text-[#181d16]">{item.weight}</p>
                  </div>
                </div>
              </div>

              {/* Guarantee Tag */}
              <div className="pt-2 flex items-center gap-1.5 text-xs font-bold text-[#176a22] border-t border-[#bfcaba]/30">
                <ShieldCheck className="w-4 h-4 shrink-0" />
                <span>Cam kết bồi thường</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* TAB 3: ĐÃ HOÀN THÀNH */}
      {activeTab === 'completed' && (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
          {completedShipments.map((item) => (
            <div 
              key={item.id}
              className="bg-white border border-[#bfcaba]/60 rounded-xl p-5 shadow-xs flex flex-col gap-4"
            >
              {/* Header */}
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={getDriverAvatarByName(item.driverName)}
                    alt={item.driverName}
                    className="w-11 h-11 rounded-full object-cover border border-[#bfcaba]/80 shadow-xs shrink-0"
                  />
                  <div className="min-w-0">
                    <h4 className="font-bold text-[#181d16] text-sm truncate">{item.driverName}</h4>
                    <p className="text-[11px] text-[#40493d] font-semibold">BSX: {item.plateNumber}</p>
                  </div>
                </div>
                <span className="px-2.5 py-1 bg-[#358439]/15 text-[#176a22] rounded-full text-[10px] font-bold uppercase tracking-wider shrink-0">
                  Đã hoàn thành
                </span>
              </div>

              {/* Route Timeline */}
              <div className="space-y-3 py-1 border-l-2 border-dashed border-[#bfcaba]/60 ml-5 pl-4 flex-1">
                <div className="relative">
                  <span className="text-xs font-extrabold text-[#176a22] block mb-1">{item.orderCode}</span>
                  <Radio className="w-4 h-4 text-[#176a22] absolute -left-[25px] bg-white rounded-full" />
                  <p className="text-[10px] text-[#40493d] uppercase font-bold">LỘ TRÌNH</p>
                  <p className="text-xs text-[#181d16] font-medium leading-tight">{item.route}</p>
                  <p className="text-[10px] text-[#40493d] mt-0.5">{item.highway}</p>
                </div>

                <div className="relative">
                  <Calendar className="w-4 h-4 text-[#176a22] absolute -left-[25px] bg-white rounded-full" />
                  <p className="text-[10px] text-[#40493d] uppercase font-bold">THỜI GIAN</p>
                  <p className="text-xs text-[#181d16] font-medium leading-tight">{item.dates}</p>
                  <p className="text-[10px] text-[#40493d] mt-0.5">{item.duration}</p>
                </div>
              </div>

              {/* Cargo Details Box */}
              <div className="bg-[#f1f5ea] p-3 rounded-lg flex justify-between items-center mt-auto text-xs min-h-[52px]">
                <div className="flex items-center gap-2 min-w-0 flex-1 pr-2">
                  {getCategoryIcon(item.category, "w-4 h-4 text-[#176a22] shrink-0")}
                  <div className="min-w-0 flex-1">
                    <p className="text-[10px] text-[#40493d] uppercase font-bold">Hàng hóa</p>
                    <p className="font-bold text-[#181d16] leading-tight break-words whitespace-normal">{item.category}</p>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-[10px] text-[#40493d] uppercase font-bold">Trọng lượng</p>
                  <p className="font-bold text-[#181d16]">{item.weight}</p>
                </div>
              </div>

              {/* Star Rating & View POD Button */}
              <div className="flex items-center justify-between pt-1 border-t border-[#bfcaba]/40">
                <div className="flex items-center gap-0.5 text-amber-500">
                  {Array.from({ length: 5 }).map((_, idx) => (
                    <Star 
                      key={idx} 
                      className={`w-3.5 h-3.5 ${idx < item.stars ? 'fill-amber-400 text-amber-400' : 'text-gray-300'}`} 
                    />
                  ))}
                </div>
                <button
                  onClick={() => setViewingPODOrder({
                    code: item.orderCode,
                    driverName: item.driverName,
                    date: item.deliveryTime,
                    location: item.deliveryLocation,
                    product: item.category,
                    review: item.review,
                    podImage: item.podImage
                  })}
                  className="px-3 py-1 bg-white hover:bg-[#f1f5ea] border border-[#176a22] text-[#176a22] rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all shadow-xs"
                >
                  <FileImage className="w-3.5 h-3.5" />
                  <span>Xem POD</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* MODAL 1: CHỈ ĐỊNH TÀI XẾ (Assign Driver Modal) */}
      {assigningOrderCode && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-xs z-[100] flex items-center justify-center p-4 sm:p-6">
          <div className="bg-[#f7fbf0] w-full max-w-[940px] rounded-2xl shadow-2xl flex flex-col max-h-[90vh] overflow-hidden border border-[#bfcaba]">
            {/* Modal Header */}
            <div className="p-6 bg-white border-b border-[#bfcaba] shrink-0 space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-[#181d16]">
                  Chỉ định tài xế cho đơn hàng {assigningOrderCode}
                </h2>
                <button 
                  onClick={() => {
                    setAssigningOrderCode(null);
                    setSelectedDriverId(null);
                  }}
                  className="w-8 h-8 rounded-full hover:bg-[#f1f5ea] flex items-center justify-center text-[#40493d] transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Driver Search Input */}
              <div className="relative w-full max-w-lg">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#707a6c]" />
                <input
                  type="text"
                  value={driverSearch}
                  onChange={(e) => setDriverSearch(e.target.value)}
                  placeholder="Tìm kiếm tài xế hoặc biển số xe..."
                  className="w-full pl-9 pr-4 py-2 bg-white border border-[#bfcaba] rounded-lg text-sm focus:ring-2 focus:ring-[#176a22] focus:border-transparent outline-none text-[#181d16]"
                />
              </div>
            </div>

            {/* Drivers Grid */}
            <div className="p-6 overflow-y-auto flex-1 bg-[#f1f5ea]/60">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredDrivers.length === 0 ? (
                  <div className="col-span-full bg-white p-8 rounded-xl border border-[#bfcaba] text-center space-y-2">
                    <Info className="w-8 h-8 text-[#707a6c] mx-auto" />
                    <p className="text-sm font-bold text-[#181d16]">Không tìm thấy tài xế khả dụng</p>
                    <p className="text-xs text-[#40493d]">
                      Tất cả các tài xế khả dụng đã được phân công vận chuyển hoặc không tìm thấy kết quả phù hợp.
                    </p>
                  </div>
                ) : (
                  filteredDrivers.map((drv) => {
                    const isSelected = selectedDriverId === drv.id;
                    return (
                      <div 
                        key={drv.id}
                        onClick={() => setSelectedDriverId(drv.id)}
                        className={`bg-white border rounded-xl p-4 shadow-xs hover:shadow-md transition-all cursor-pointer flex flex-col justify-between gap-4 ${
                          isSelected 
                            ? 'border-[#176a22] ring-2 ring-[#176a22]/30 bg-emerald-50/20' 
                            : 'border-[#bfcaba]/70 hover:border-[#176a22]/50'
                        }`}
                      >
                        <div className="flex justify-between items-start">
                          <div className="flex items-center gap-3">
                            {drv.avatar || getDriverAvatarByName(drv.name) ? (
                              <img
                                src={drv.avatar || getDriverAvatarByName(drv.name)}
                                alt={drv.name}
                                className="w-10 h-10 rounded-xl object-cover border border-[#bfcaba] shrink-0"
                              />
                            ) : (
                              <div className="w-10 h-10 rounded-xl bg-[#ebefe4] border border-[#bfcaba] flex items-center justify-center text-xs font-extrabold text-[#181d16] shrink-0 uppercase tracking-wider">
                                {drv.initials}
                              </div>
                            )}
                            <div>
                              <h4 className="font-bold text-base text-[#181d16] leading-tight">{drv.name}</h4>
                              <div className="flex items-center gap-1 text-[#176a22] text-xs font-bold mt-0.5">
                                <Star className="w-3.5 h-3.5 fill-[#176a22]" />
                                <span>{drv.rating}/5</span>
                              </div>
                            </div>
                          </div>

                          <span className="px-2 py-0.5 bg-[#e6f4ea] text-[#00893d] border border-[#a5d6a7] rounded-full font-bold text-[10px] flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#176a22]"></span>
                            Sẵn sàng
                          </span>
                        </div>

                      <div className="space-y-2 text-xs">
                        <div>
                          <p className="text-[10px] text-[#40493d] uppercase tracking-wide font-extrabold mb-0.5">
                            PHƯƠNG TIỆN ĐƯỢC PHÂN CÔNG
                          </p>
                          <div className="flex items-center gap-2 font-bold text-[#181d16]">
                            <Truck className="w-4 h-4 text-[#40493d]" />
                            <span>{drv.vehiclePlate}</span>
                          </div>
                        </div>

                        <div className="flex justify-between border-t border-[#bfcaba]/40 pt-2 text-xs">
                          <div>
                            <p className="text-[10px] text-[#40493d] uppercase font-bold">HẠNG BẰNG</p>
                            <p className="font-semibold text-[#181d16]">{drv.licenseClass}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-[10px] text-[#40493d] uppercase font-bold">KHO TRỰC</p>
                            <p className="font-semibold text-[#181d16]">{drv.dutyYard}</p>
                          </div>
                        </div>
                      </div>

                      <button 
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedDriverId(drv.id);
                        }}
                        className={`w-full py-2 px-4 rounded-lg font-bold text-xs transition-colors ${
                          isSelected
                            ? 'bg-[#176a22] text-white'
                            : 'border border-[#bfcaba] text-[#176a22] hover:bg-[#f1f5ea]'
                        }`}
                      >
                        {isSelected ? 'Đã chọn' : 'Chọn tài xế'}
                      </button>
                    </div>
                  );
                }))}
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 sm:p-6 bg-white border-t border-[#bfcaba] shrink-0 flex justify-end gap-3 rounded-b-2xl">
              <button 
                onClick={() => {
                  setAssigningOrderCode(null);
                  setSelectedDriverId(null);
                }}
                className="px-5 py-2 rounded-lg text-[#40493d] hover:bg-[#f1f5ea] font-bold text-xs transition-colors"
              >
                Hủy bỏ
              </button>
              <button 
                disabled={!selectedDriverId}
                onClick={handleConfirmAssignDriver}
                className={`px-6 py-2 rounded-lg font-bold text-xs shadow-xs transition-all ${
                  selectedDriverId
                    ? 'bg-[#176a22] hover:bg-[#1b6d24] text-white active:scale-98 cursor-pointer'
                    : 'bg-[#e0e4d9] text-[#40493d]/50 cursor-not-allowed'
                }`}
              >
                Xác nhận chỉ định
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 2: TỪ CHỐI ĐƠN HÀNG (Reject Order Modal) */}
      {rejectingOrderCode && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs z-[100] flex items-center justify-center p-4 sm:p-6">
          <div className="bg-white w-full max-w-[940px] max-h-[600px] rounded-xl shadow-2xl border border-[#bfcaba] flex flex-col overflow-hidden animate-in fade-in zoom-in duration-200">
            {/* Modal Header */}
            <div className="px-6 py-4 flex justify-between items-center border-b border-[#bfcaba]">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-[#ffdad6] text-[#93000a] rounded-lg">
                  <X className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-[#181d16]">Từ chối đơn hàng {rejectingOrderCode}</h2>
                  <p className="text-xs text-[#40493d]">Vui lòng cho chúng tôi biết lý do bạn từ chối đơn hàng này.</p>
                </div>
              </div>
              <button 
                onClick={() => setRejectingOrderCode(null)}
                className="text-[#707a6c] hover:text-[#181d16] p-1.5 rounded-lg hover:bg-[#f1f5ea]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 flex-1 overflow-y-auto space-y-4">
              <label className="block text-xs font-bold text-[#40493d]">
                Lý do từ chối chi tiết
              </label>
              <textarea 
                rows={6}
                value={rejectReason}
                onChange={(e) => setRejectReason(e.target.value)}
                placeholder="Nhập lý do từ chối tại đây..."
                className="w-full bg-[#f7fbf0] border border-[#707a6c] rounded-lg p-3 text-sm focus:ring-2 focus:ring-[#176a22] focus:border-transparent outline-none resize-none placeholder:text-[#707a6c]/60"
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-3.5 rounded-lg bg-[#f1f5ea] border border-[#bfcaba] flex items-center gap-3">
                  <Info className="w-5 h-5 text-[#176a22] shrink-0" />
                  <p className="text-xs text-[#40493d] leading-snug font-medium">
                    Hành động này sẽ thông báo ngay lập tức cho bộ phận điều phối để tìm phương án vận chuyển thay thế.
                  </p>
                </div>
                <div className="p-3.5 rounded-lg bg-[#f1f5ea] border border-[#bfcaba] flex items-center gap-3">
                  <AlertTriangle className="w-5 h-5 text-[#9d3c5f] shrink-0" />
                  <p className="text-xs text-[#40493d] leading-snug font-medium">
                    Tỷ lệ từ chối cao có thể ảnh hưởng đến điểm uy tín của đối tác vận tải trên nền tảng AgriMarket.
                  </p>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-4 bg-[#f1f5ea] flex justify-end items-center gap-3 border-t border-[#bfcaba]">
              <button 
                onClick={() => setRejectingOrderCode(null)}
                className="px-5 py-2 rounded-lg text-xs font-bold text-[#486644] border border-[#707a6c] hover:bg-white transition-all active:scale-98"
              >
                Hủy bỏ
              </button>
              <button 
                onClick={handleConfirmRejectOrder}
                className="px-5 py-2 rounded-lg text-xs font-bold bg-[#ba1a1a] text-white hover:bg-[#93000a] shadow-xs transition-all active:scale-98 flex items-center gap-1.5"
              >
                Xác nhận từ chối
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 3: BẰNG CHỨNG GIAO HÀNG (POD Modal) */}
      {viewingPODOrder && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs z-[100] flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh] border border-[#bfcaba]">
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-[#bfcaba] flex justify-between items-center bg-white sticky top-0 z-10">
              <div>
                <h2 className="text-xl font-bold text-[#181d16]">Bằng chứng giao hàng (POD)</h2>
                <p className="text-xs text-[#40493d] mt-0.5">
                  Mã đơn: <span className="font-bold text-[#176a22]">{viewingPODOrder.code}</span>
                </p>
              </div>
              <button 
                onClick={() => setViewingPODOrder(null)}
                className="text-[#707a6c] hover:text-[#181d16] p-1.5 rounded-full hover:bg-[#f1f5ea]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto space-y-6">
              {/* POD Image */}
              <div className="rounded-lg overflow-hidden border border-[#bfcaba] bg-gray-50 relative max-h-[350px]">
                <img 
                  src={(viewingPODOrder as any).podImage || "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1000&q=80"}
                  alt={`Bằng chứng giao hàng ${viewingPODOrder.product}`}
                  className="w-full object-cover max-h-[350px]" 
                />
              </div>

              {/* Delivery Details & Feedback */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-xs font-bold text-[#40493d] uppercase tracking-wider">THÔNG TIN GIAO HÀNG</h3>
                  <ul className="space-y-2.5 text-xs text-[#181d16]">
                    <li className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-[#707a6c] shrink-0" />
                      <span>{viewingPODOrder.date}</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-[#707a6c] shrink-0" />
                      <span>{viewingPODOrder.location}</span>
                    </li>
                  </ul>

                  <div className="pt-2">
                    <h3 className="text-xs font-bold text-[#40493d] uppercase tracking-wider mb-2">ĐÁNH GIÁ CHẤT LƯỢNG</h3>
                    <div className="flex items-center gap-1.5">
                      <div className="flex text-emerald-600">
                        {Array.from({ length: 5 }).map((_, idx) => (
                          <Star key={idx} className="w-4 h-4 fill-emerald-600 text-emerald-600" />
                        ))}
                      </div>
                      <span className="text-xs font-bold text-[#181d16] ml-1">Rất hài lòng</span>
                    </div>
                  </div>
                </div>

                {/* Customer Review Box */}
                <div className="bg-amber-50/80 rounded-lg p-4 border border-amber-200/80 flex flex-col justify-center">
                  <h3 className="text-xs font-bold text-[#40493d] uppercase tracking-wider mb-2">PHẢN HỒI KHÁCH HÀNG</h3>
                  <blockquote className="text-xs text-amber-950 italic leading-relaxed">
                    "{viewingPODOrder.review}"
                  </blockquote>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-4 border-t border-[#bfcaba] bg-white flex justify-end sticky bottom-0 z-10">
              <button 
                onClick={() => setViewingPODOrder(null)}
                className="bg-[#176a22] hover:bg-[#1b6d24] text-white font-bold text-xs py-2 px-6 rounded-md shadow-xs transition-colors"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
