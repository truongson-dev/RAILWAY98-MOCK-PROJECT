import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Filter, 
  ChevronDown, 
  MapPin, 
  Truck, 
  Package, 
  Clock, 
  CheckCircle2, 
  X, 
  ShieldCheck, 
  Send,
  Building2,
  ArrowRight,
  UserCheck,
  AlertCircle
} from 'lucide-react';
import { OrderItem, NavigationTab, Vehicle } from './types';

interface ShipmentsListViewProps {
  orders: OrderItem[];
  vehicles?: Vehicle[];
  assignedOrderCodes?: string[];
  busyDriverNames?: string[];
  onAssignDriver?: (driverName: string, vehiclePlate?: string) => void;
  onNavigateTab: (tab: NavigationTab) => void;
  onOpenAssignOrderCode: (code: string) => void;
  onAcceptOrder?: (id: string) => void;
  onRejectOrder?: (id: string) => void;
  showToast?: (msg: string) => void;
}

interface UnassignedOrder {
  id: string;
  code: string;
  title: string;
  weight: string;
  route: string;
  pickup: string;
  delivery: string;
  revenue: string;
  deadline: string;
  category: string;
}

interface DriverCandidate {
  id: string;
  name: string;
  avatar: string;
  plateNumber: string;
  vehicleType: string;
  licenseClass: string;
  dutyYard: string;
  rating: number;
}

const AVAILABLE_DRIVERS_POOL: DriverCandidate[] = [
  { id: 'drv-1', name: 'Lê Văn A', avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80', plateNumber: '60C-224.11', vehicleType: 'Xe lạnh 5 Tấn', licenseClass: 'Hạng D', dutyYard: 'Bãi đỗ Bắc Ninh', rating: 5.0 },
  { id: 'drv-2', name: 'Lê Văn S', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80', plateNumber: '51D-005.92', vehicleType: 'Xe rơ-moóc 10 Tấn', licenseClass: 'Hạng E', dutyYard: 'Bãi đỗ Gia Lâm', rating: 4.9 },
  { id: 'drv-3', name: 'Phạm Văn D', avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80', plateNumber: 'UV-1122-WQ', vehicleType: 'Xe bạt 15 Tấn', licenseClass: 'Hạng C', dutyYard: 'Bãi đỗ Gia Lâm', rating: 4.7 },
  { id: 'drv-4', name: 'Phan Trần D', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80', plateNumber: '50E-111.90', vehicleType: 'Xe đông lạnh 2.5 Tấn', licenseClass: 'Hạng C', dutyYard: 'Bãi đỗ Quy Nhơn', rating: 4.7 },
  { id: 'drv-5', name: 'Nguyễn Huệ', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80', plateNumber: '63H-882.34', vehicleType: 'Xe tải 8 Tấn', licenseClass: 'Hạng E', dutyYard: 'Bãi đỗ Huế', rating: 4.9 },
  { id: 'drv-6', name: 'Trần Thái Tông', avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80', plateNumber: '51C-957.65', vehicleType: 'Xe lạnh 8 Tấn', licenseClass: 'Hạng D', dutyYard: 'Bãi đỗ Nam Định', rating: 4.8 },
  { id: 'drv-7', name: 'Lê Duẩn', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80', plateNumber: '51C-287.65', vehicleType: 'Xe 1.5 Tấn', licenseClass: 'Hạng C', dutyYard: 'Bãi đỗ Quảng Trị', rating: 4.7 },
  { id: 'drv-8', name: 'Trần Thế B', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80', plateNumber: 'FG-1100-LS', vehicleType: 'Xe Van 2 Tấn', licenseClass: 'Hạng D', dutyYard: 'Bãi đỗ Hà Nội', rating: 4.8 },
  { id: 'drv-9', name: 'Nguyễn Văn C', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80', plateNumber: '29A-555.22', vehicleType: 'Xe tải 3.5 Tấn', licenseClass: 'Hạng C', dutyYard: 'Bãi đỗ Long Biên', rating: 4.6 }
];

export const ShipmentsListView: React.FC<ShipmentsListViewProps> = ({
  orders,
  vehicles = [],
  assignedOrderCodes = [],
  busyDriverNames = [],
  onAssignDriver,
  onNavigateTab,
  onOpenAssignOrderCode,
  showToast
}) => {
  const [activeTab, setActiveTab] = useState<'assigned' | 'unassigned'>('assigned');
  
  // Filter states
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('Tất cả');
  const [selectedCategory, setSelectedCategory] = useState('Tất cả');
  const [selectedWeight, setSelectedWeight] = useState('Tất cả');
  const [openFilter, setOpenFilter] = useState<'region' | 'category' | 'weight' | null>(null);

  const REGION_OPTIONS = ['Tất cả', 'Miền Nam', 'Miền Trung', 'Tây Nguyên', 'Miền Bắc'];
  const CATEGORY_OPTIONS = ['Tất cả', 'Lúa mì', 'Cà phê', 'Trái cây', 'Ngô', 'Sữa tươi', 'Điều', 'Hồ tiêu', 'Rau củ', 'Thủy sản', 'Gạo', 'Chè'];
  const WEIGHT_OPTIONS = ['Tất cả', 'Dưới 5,000 kg', '5,000 - 15,000 kg', 'Trên 15,000 kg'];

  // Unassigned orders list (Đơn chưa có đơn vị vận chuyển)
  const [unassignedOrders, setUnassignedOrders] = useState<UnassignedOrder[]>([
    {
      id: 'u1',
      code: '#ORD-9901',
      title: 'Thanh long Bình Thuận',
      weight: '5.0 Tấn',
      route: 'Hàm Thuận Nam → Cảng Cát Lái',
      pickup: 'Hàm Thuận Nam, Bình Thuận',
      delivery: 'Cảng Cát Lái, TP.HCM',
      revenue: '1.450.000 VNĐ',
      deadline: '15:00 Hôm nay',
      category: 'Trái cây'
    },
    {
      id: 'u2',
      code: '#ORD-9902',
      title: 'Cà phê hạt Đắk Lắk',
      weight: '8.0 Tấn',
      route: 'Buôn Ma Thuột → Đà Nẵng',
      pickup: 'Buôn Ma Thuột, Đắk Lắk',
      delivery: 'Kho Tổng Đà Nẵng',
      revenue: '1.800.000 VNĐ',
      deadline: '08:00 Ngày mai',
      category: 'Cà phê'
    },
    {
      id: 'u3',
      code: '#ORD-9903',
      title: 'Gạo ST25 Sóc Trăng',
      weight: '15.0 Tấn',
      route: 'Sóc Trăng → Kho Tổng Q7',
      pickup: 'Sóc Trăng',
      delivery: 'Kho Tổng Quận 7, TP.HCM',
      revenue: '1.950.000 VNĐ',
      deadline: '17:30 Hôm nay',
      category: 'Gạo'
    },
    {
      id: 'u4',
      code: '#ORD-9904',
      title: 'Vải thiều Lục Ngạn',
      weight: '3.5 Tấn',
      route: 'Bắc Giang → Nội Bài',
      pickup: 'Lục Ngạn, Bắc Giang',
      delivery: 'Cảng hàng không Nội Bài, Hà Nội',
      revenue: '1.200.000 VNĐ',
      deadline: '12:00 Hôm nay',
      category: 'Trái cây'
    },
    {
      id: 'u5',
      code: '#ORD-9905',
      title: 'Hải sản Cam Ranh',
      weight: '2.0 Tấn',
      route: 'Khánh Hòa → TP.HCM',
      pickup: 'Cam Ranh, Khánh Hòa',
      delivery: 'Chợ đầu mối Bình Điền, TP.HCM',
      revenue: '1.650.000 VNĐ',
      deadline: '20:00 Hôm nay',
      category: 'Thủy sản'
    },
    {
      id: 'u6',
      code: '#ORD-9906',
      title: 'Hồ tiêu Gia Lai',
      weight: '10.0 Tấn',
      route: 'Pleiku → Cảng Quy Nhơn',
      pickup: 'Pleiku, Gia Lai',
      delivery: 'Cảng Quy Nhơn, Bình Định',
      revenue: '1.750.000 VNĐ',
      deadline: '09:00 Ngày mai',
      category: 'Hồ tiêu'
    },
    {
      id: 'u7',
      code: '#ORD-9907',
      title: 'Rau củ Đà Lạt',
      weight: '4.0 Tấn',
      route: 'Lâm Đồng → Chợ Đầu Mối Hóc Môn',
      pickup: 'Đà Lạt, Lâm Đồng',
      delivery: 'Chợ Đầu Mối Hóc Môn, TP.HCM',
      revenue: '1.350.000 VNĐ',
      deadline: '04:00 Sáng mai',
      category: 'Rau củ'
    },
    {
      id: 'u8',
      code: '#ORD-9908',
      title: 'Bưởi Năm Roi',
      weight: '6.0 Tấn',
      route: 'Vĩnh Long → TP. Cần Thơ',
      pickup: 'Vĩnh Long',
      delivery: 'Siêu thị Go! Cần Thơ',
      revenue: '1.150.000 VNĐ',
      deadline: '16:00 Hôm nay',
      category: 'Trái cây'
    },
    {
      id: 'u9',
      code: '#ORD-9909',
      title: 'Hạt điều Bình Phước',
      weight: '12.0 Tấn',
      route: 'Bình Phước → Cảng Cái Mép',
      pickup: 'Đồng Xoài, Bình Phước',
      delivery: 'Cảng Cái Mép, Bà Rịa - Vũng Tàu',
      revenue: '1.850.000 VNĐ',
      deadline: '10:00 Ngày mai',
      category: 'Điều'
    }
  ]);

  // Track driver IDs that have been assigned an order in this component session
  const [assignedDriverIds, setAssignedDriverIds] = useState<string[]>([]);
  const [selectedDriverId, setSelectedDriverId] = useState<string>('');

  // Request modal state for unassigned orders
  const [requestingOrder, setRequestingOrder] = useState<UnassignedOrder | null>(null);
  const [requestNote, setRequestNote] = useState<string>(
    'Chúng tôi muốn được làm đơn vị vận chuyển cho đơn hàng của bạn\nSĐT của đơn vị vận chuyển chúng tôi là 0987654321'
  );

  // Filter available drivers: must be "Sẵn sàng" and NOT currently assigned an order
  const availableDrivers = AVAILABLE_DRIVERS_POOL.filter(driver => {
    const normName = driver.name.toLowerCase().trim();

    // Exclude if already assigned an order in this session
    if (assignedDriverIds.includes(driver.id)) return false;

    // Exclude if driver is in global busyDriverNames list
    if (busyDriverNames && busyDriverNames.some(bName => bName.toLowerCase().trim() === normName)) {
      return false;
    }

    // Exclude if vehicle status in vehicles prop is 'active' or 'maintenance' or has an active orderCode or driverName match
    if (vehicles && vehicles.length > 0) {
      const veh = vehicles.find(v => 
        (v.driverName && v.driverName.toLowerCase().trim().includes(normName)) ||
        ((v.plateNumber || '').toUpperCase().replace(/[^A-Z0-9]/g, '') === driver.plateNumber.toUpperCase().replace(/[^A-Z0-9]/g, ''))
      );
      if (veh && (veh.status === 'active' || veh.status === 'maintenance' || veh.orderCode)) {
        return false;
      }
    }

    // Exclude if driver is assigned in an in_transit order
    const isDriverInTransit = orders.some(o => 
      o.status === 'in_transit' && 
      (o.driverName || '').toLowerCase().includes(normName)
    );
    if (isDriverInTransit) return false;

    return true;
  });

  // Auto select first available driver when opening modal or list changes
  useEffect(() => {
    if (requestingOrder) {
      if (availableDrivers.length > 0 && (!selectedDriverId || !availableDrivers.some(d => d.id === selectedDriverId))) {
        setSelectedDriverId(availableDrivers[0].id);
      }
    }
  }, [requestingOrder, availableDrivers, selectedDriverId]);

  const selectedDriver = availableDrivers.find(d => d.id === selectedDriverId) || availableDrivers[0];

  // Helper functions for filtering
  const parseWeightKg = (weightStr: string | number | undefined): number => {
    if (typeof weightStr === 'number') return weightStr;
    if (!weightStr) return 0;
    const str = String(weightStr).toLowerCase();
    const match = str.match(/[\d.,]+/);
    if (!match) return 0;
    let raw = match[0];
    if (raw.includes(',') && !raw.includes('.')) {
      if (raw.split(',')[1] && raw.split(',')[1].length === 3) {
        raw = raw.replace(',', '');
      } else {
        raw = raw.replace(',', '.');
      }
    }
    const num = parseFloat(raw);
    if (isNaN(num)) return 0;
    if (str.includes('tấn') || str.includes('tan')) {
      return num * 1000;
    }
    return num;
  };

  const matchesWeight = (weightStr: string | number | undefined, selectedOption: string): boolean => {
    if (selectedOption === 'Tất cả') return true;
    const kg = parseWeightKg(weightStr);
    if (selectedOption === 'Dưới 5,000 kg') return kg < 5000;
    if (selectedOption === '5,000 - 15,000 kg') return kg >= 5000 && kg <= 15000;
    if (selectedOption === 'Trên 15,000 kg') return kg > 15000;
    return true;
  };

  const matchesRegion = (locationStr: string, selectedReg: string): boolean => {
    if (selectedReg === 'Tất cả') return true;
    const loc = (locationStr || '').toLowerCase();

    const regionKeywords: Record<string, string[]> = {
      'Miền Bắc': ['bắc giang', 'bắc ninh', 'hà nội', 'nam định', 'lục ngạn', 'nội bài', 'hải phòng', 'quảng ninh', 'phú thọ', 'thái nguyên', 'hưng yên', 'hải dương', 'vĩnh phúc', 'ninh bình', 'hà nam', 'hòa bình', 'long biên', 'gia lâm'],
      'Tây Nguyên': ['đắk lắk', 'buôn ma thuột', 'gia lai', 'pleiku', 'lâm đồng', 'đà lạt', 'kon tum', 'đắk nông'],
      'Miền Trung': ['đà nẵng', 'khánh hòa', 'cam ranh', 'bình thuận', 'hàm thuận', 'quy nhơn', 'bình định', 'huế', 'quảng trị', 'quảng nam', 'quảng ngãi', 'phú yên', 'vũng tàu', 'bà rịa', 'nghệ an', 'thanh hóa', 'hà tĩnh', 'cái mép'],
      'Miền Nam': ['tp.hcm', 'hồ chí minh', 'sóc trăng', 'vĩnh long', 'cần thơ', 'tiền giang', 'hóc môn', 'bình phước', 'đồng xoài', 'bình điền', 'cát lái', 'q7', 'quận 7', 'bến tre', 'long an', 'an giang', 'đồng tháp', 'kiên giang', 'tây ninh', 'đồng nai', 'bình dương', 'sài gòn']
    };

    const keywords = regionKeywords[selectedReg] || [];
    return keywords.some(kw => loc.includes(kw));
  };

  const matchesCategory = (itemText: string, selectedCat: string, explicitCategory?: string): boolean => {
    if (selectedCat === 'Tất cả') return true;
    if (explicitCategory && explicitCategory.toLowerCase().trim() === selectedCat.toLowerCase().trim()) return true;
    
    const text = (itemText || '').toLowerCase();
    const target = selectedCat.toLowerCase();
    if (text.includes(target)) return true;

    if (target === 'trái cây' && (text.includes('thanh long') || text.includes('vải') || text.includes('bưởi') || text.includes('cam') || text.includes('sầu riêng') || text.includes('xoài') || text.includes('dưa') || text.includes('chuối'))) return true;
    if (target === 'thủy sản' && (text.includes('hải sản') || text.includes('cá') || text.includes('tôm') || text.includes('mực'))) return true;
    if (target === 'điều' && text.includes('hạt điều')) return true;
    if (target === 'hồ tiêu' && text.includes('tiêu')) return true;
    if (target === 'chè' && text.includes('trà')) return true;
    if (target === 'ngô' && text.includes('bắp')) return true;
    if (target === 'gạo' && text.includes('lúa')) return true;

    return false;
  };

  // Filter "Đơn mới được gán"
  // Requirement: Đồng bộ với tổng số đơn ở phần Vận chuyển yêu cầu mới
  const activeAssignedOrders = orders.filter(o => {
    const isPending = o.status === 'pending';
    const isNotConfirmed = !assignedOrderCodes.includes(o.orderCode);
    return isPending && isNotConfirmed;
  });

  // Apply filters on assigned orders
  const filteredAssignedOrders = activeAssignedOrders.filter(order => {
    // Search query filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      const matchCode = order.orderCode.toLowerCase().includes(q);
      const matchType = order.productType.toLowerCase().includes(q);
      const matchPickup = order.pickupLocation.toLowerCase().includes(q);
      const matchDelivery = order.deliveryLocation.toLowerCase().includes(q);
      if (!matchCode && !matchType && !matchPickup && !matchDelivery) return false;
    }

    // Region filter
    const locationText = `${order.pickupLocation} ${order.deliveryLocation}`;
    if (!matchesRegion(locationText, selectedRegion)) return false;

    // Category filter
    if (!matchesCategory(order.productType, selectedCategory)) return false;

    // Weight filter
    if (!matchesWeight(order.weight, selectedWeight)) return false;

    return true;
  });

  // Apply filters on unassigned orders
  const filteredUnassignedOrders = unassignedOrders.filter(order => {
    // Search query filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      const matchCode = order.code.toLowerCase().includes(q);
      const matchTitle = order.title.toLowerCase().includes(q);
      const matchRoute = order.route.toLowerCase().includes(q);
      const matchCategory = order.category.toLowerCase().includes(q);
      if (!matchCode && !matchTitle && !matchRoute && !matchCategory) return false;
    }

    // Region filter
    const locationText = `${order.pickup} ${order.delivery} ${order.route}`;
    if (!matchesRegion(locationText, selectedRegion)) return false;

    // Category filter
    if (!matchesCategory(order.title, selectedCategory, order.category)) return false;

    // Weight filter
    if (!matchesWeight(order.weight, selectedWeight)) return false;

    return true;
  });

  const handleSendTransportRequest = () => {
    if (!requestingOrder) return;
    const orderCode = requestingOrder.code;

    if (selectedDriver) {
      // Mark driver as assigned so they disappear from the available driver list
      setAssignedDriverIds(prev => [...prev, selectedDriver.id]);

      // Notify App.tsx globally so other components (ShipmentTrackingView, FleetView, etc.) remove this driver
      if (onAssignDriver) {
        onAssignDriver(selectedDriver.name, selectedDriver.plateNumber);
      }
    }

    // Remove from unassigned orders list (Requirement 3: mất đơn đấy đi khi được xác nhận)
    setUnassignedOrders(prev => prev.filter(o => o.id !== requestingOrder.id));
    
    if (showToast) {
      if (selectedDriver) {
        showToast(`Đã gửi yêu cầu vận chuyển cho đơn ${orderCode}! Phân công tài xế ${selectedDriver.name} (${selectedDriver.plateNumber}).`);
      } else {
        showToast(`Đã gửi yêu cầu vận chuyển cho đơn ${orderCode} thành công!`);
      }
    }

    setRequestingOrder(null);
  };

  return (
    <div className="space-y-6">
      {/* Title Header */}
      <div>
        <h2 className="text-2xl sm:text-3xl font-bold text-[#181d16]">Danh sách đơn vận chuyển</h2>
        <p className="text-sm text-[#40493d] mt-1">Quản lý và điều phối các đơn hàng nông sản trong hệ thống.</p>
      </div>

      {/* Navigation Tabs & Filter Bar */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 border-b border-[#bfcaba] pb-3">
        {/* Tabs */}
        <div className="flex items-center gap-6">
          <button
            onClick={() => setActiveTab('assigned')}
            className={`text-sm font-bold pb-2.5 px-1 relative transition-colors cursor-pointer ${
              activeTab === 'assigned'
                ? 'text-[#176a22] border-b-2 border-[#176a22]'
                : 'text-[#40493d] hover:text-[#181d16]'
            }`}
          >
            Đơn mới được gán ({filteredAssignedOrders.length})
          </button>
          <button
            onClick={() => setActiveTab('unassigned')}
            className={`text-sm font-bold pb-2.5 px-1 relative transition-colors cursor-pointer ${
              activeTab === 'unassigned'
                ? 'text-[#176a22] border-b-2 border-[#176a22]'
                : 'text-[#40493d] hover:text-[#181d16]'
            }`}
          >
            Đơn chưa có đơn vị vận chuyển ({filteredUnassignedOrders.length})
          </button>
        </div>

        {/* Dropdown Filters */}
        <div className="flex flex-wrap items-center gap-2">

          {/* Region Dropdown */}
          <div className="relative">
            <button
              onClick={() => setOpenFilter(openFilter === 'region' ? null : 'region')}
              className="px-3 py-1.5 bg-[#f1f5ea] hover:bg-[#e5eadf] text-[#181d16] text-xs font-semibold rounded-lg border border-[#bfcaba] flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <span>Khu vực: <strong className="text-[#176a22]">{selectedRegion}</strong></span>
              <ChevronDown className="w-3.5 h-3.5 text-[#40493d]" />
            </button>
            {openFilter === 'region' && (
              <div className="absolute right-0 mt-1 w-44 bg-white border border-[#bfcaba] rounded-xl shadow-xl z-20 py-1 text-xs">
                {REGION_OPTIONS.map(opt => (
                  <button
                    key={opt}
                    onClick={() => {
                      setSelectedRegion(opt);
                      setOpenFilter(null);
                    }}
                    className={`w-full text-left px-3 py-2 hover:bg-[#f1f5ea] font-medium ${selectedRegion === opt ? 'text-[#176a22] font-bold bg-[#f7fbf0]' : 'text-[#181d16]'}`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Category Dropdown */}
          <div className="relative">
            <button
              onClick={() => setOpenFilter(openFilter === 'category' ? null : 'category')}
              className="px-3 py-1.5 bg-[#f1f5ea] hover:bg-[#e5eadf] text-[#181d16] text-xs font-semibold rounded-lg border border-[#bfcaba] flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <span>Loại hàng: <strong className="text-[#176a22]">{selectedCategory}</strong></span>
              <ChevronDown className="w-3.5 h-3.5 text-[#40493d]" />
            </button>
            {openFilter === 'category' && (
              <div className="absolute right-0 mt-1 w-48 bg-white border border-[#bfcaba] rounded-xl shadow-xl z-20 py-1 text-xs max-h-56 overflow-y-auto">
                {CATEGORY_OPTIONS.map(opt => (
                  <button
                    key={opt}
                    onClick={() => {
                      setSelectedCategory(opt);
                      setOpenFilter(null);
                    }}
                    className={`w-full text-left px-3 py-2 hover:bg-[#f1f5ea] font-medium ${selectedCategory === opt ? 'text-[#176a22] font-bold bg-[#f7fbf0]' : 'text-[#181d16]'}`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Weight Dropdown */}
          <div className="relative">
            <button
              onClick={() => setOpenFilter(openFilter === 'weight' ? null : 'weight')}
              className="px-3 py-1.5 bg-[#f1f5ea] hover:bg-[#e5eadf] text-[#181d16] text-xs font-semibold rounded-lg border border-[#bfcaba] flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <span>Khối lượng: <strong className="text-[#176a22]">{selectedWeight}</strong></span>
              <ChevronDown className="w-3.5 h-3.5 text-[#40493d]" />
            </button>
            {openFilter === 'weight' && (
              <div className="absolute right-0 mt-1 w-52 bg-white border border-[#bfcaba] rounded-xl shadow-xl z-20 py-1 text-xs">
                {WEIGHT_OPTIONS.map(opt => (
                  <button
                    key={opt}
                    onClick={() => {
                      setSelectedWeight(opt);
                      setOpenFilter(null);
                    }}
                    className={`w-full text-left px-3 py-2 hover:bg-[#f1f5ea] font-medium ${selectedWeight === opt ? 'text-[#176a22] font-bold bg-[#f7fbf0]' : 'text-[#181d16]'}`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Clear Filters Button */}
          {(selectedRegion !== 'Tất cả' || selectedCategory !== 'Tất cả' || selectedWeight !== 'Tất cả') && (
            <button
              onClick={() => {
                setSelectedRegion('Tất cả');
                setSelectedCategory('Tất cả');
                setSelectedWeight('Tất cả');
                setOpenFilter(null);
              }}
              className="px-3 py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-bold rounded-lg border border-rose-200 flex items-center gap-1 transition-colors cursor-pointer"
            >
              <X className="w-3.5 h-3.5" /> Xóa bộ lọc
            </button>
          )}
        </div>
      </div>

      {/* Tab 1 Content: Đơn mới được gán */}
      {activeTab === 'assigned' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredAssignedOrders.length === 0 ? (
            <div className="col-span-full bg-white rounded-2xl border border-[#bfcaba] p-12 text-center text-[#40493d] space-y-3">
              <Package className="w-12 h-12 text-[#707a6c] mx-auto opacity-60" />
              <p className="font-bold text-base text-[#181d16]">Hiện không có đơn mới được gán nào</p>
              <p className="text-xs">Tất cả các đơn gán đã được tiếp nhận vận chuyển hoặc chưa có đơn hàng mới.</p>
            </div>
          ) : (
            filteredAssignedOrders.map(order => (
              <div
                key={order.id}
                className="bg-white rounded-2xl border border-[#bfcaba] p-5 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  {/* Top Bar: Code + MỚI badge */}
                  <div className="flex justify-between items-center mb-1">
                    <h3 className="text-lg font-bold text-[#181d16]">{order.orderCode}</h3>
                    <span className="px-2.5 py-0.5 bg-[#176a22] text-white text-[10px] font-extrabold uppercase rounded-full">
                      MỚI
                    </span>
                  </div>

                  {/* Weight */}
                  <p className="text-sm text-[#40493d] font-semibold mb-4">{order.weight}</p>

                  {/* Route Timeline */}
                  <div className="space-y-3 mb-5 pl-1 border-l-2 border-dashed border-[#bfcaba] ml-2">
                    <div className="relative pl-4">
                      <div className="w-3 h-3 rounded-full bg-[#176a22] border-2 border-white absolute -left-[7.5px] top-1 shadow-xs" />
                      <p className="text-[10px] uppercase font-bold text-[#707a6c]">ĐIỂM LẤY</p>
                      <p className="text-xs font-bold text-[#181d16]">{order.pickupLocation}</p>
                    </div>
                    <div className="relative pl-4">
                      <div className="w-3 h-3 rounded-full bg-[#ba1a1a] border-2 border-white absolute -left-[7.5px] top-1 shadow-xs" />
                      <p className="text-[10px] uppercase font-bold text-[#707a6c]">ĐIỂM GIAO</p>
                      <p className="text-xs font-bold text-[#181d16]">{order.deliveryLocation}</p>
                    </div>
                  </div>

                  {/* Bottom Stats Card */}
                  <div className="bg-[#f1f5ea] rounded-xl p-3 grid grid-cols-2 gap-2 mb-4 border border-[#bfcaba]/50 text-xs">
                    <div>
                      <p className="text-[10px] font-bold uppercase text-[#707a6c]">LOẠI HÀNG</p>
                      <p className="font-bold text-[#181d16] truncate">{order.productType}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-[10px] font-bold uppercase text-[#707a6c]">DỰ KIẾN THU</p>
                      <p className="font-extrabold text-[#176a22]">{order.revenueFormatted}</p>
                    </div>
                  </div>
                </div>

                {/* Vận chuyển Button -> Sync with Vận Chuyển view */}
                <button
                  onClick={() => onOpenAssignOrderCode(order.orderCode)}
                  className="w-full py-2.5 bg-[#176a22] text-white rounded-xl font-bold text-sm hover:bg-[#12541a] transition-all shadow-xs cursor-pointer flex items-center justify-center gap-2"
                >
                  <Truck className="w-4 h-4" /> Vận chuyển
                </button>
              </div>
            ))
          )}
        </div>
      )}

      {/* Tab 2 Content: Đơn chưa có đơn vị vận chuyển */}
      {activeTab === 'unassigned' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredUnassignedOrders.length === 0 ? (
            <div className="col-span-full bg-white rounded-2xl border border-[#bfcaba] p-12 text-center text-[#40493d] space-y-3">
              <Package className="w-12 h-12 text-[#707a6c] mx-auto opacity-60" />
              <p className="font-bold text-base text-[#181d16]">Không tìm thấy đơn chưa gán phù hợp</p>
              <p className="text-xs">Tất cả các đơn đã được tìm thấy đơn vị vận chuyển hoặc không khớp bộ lọc.</p>
            </div>
          ) : (
            filteredUnassignedOrders.map(order => (
              <div
                key={order.id}
                className="bg-white rounded-2xl border border-[#bfcaba] p-5 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  {/* Top Header: Box Icon + Badge */}
                  <div className="flex justify-between items-start mb-3">
                    <div className="w-10 h-10 rounded-xl bg-[#c9ecc1] flex items-center justify-center text-[#176a22]">
                      <Package className="w-5 h-5" />
                    </div>
                    <span className="px-2.5 py-1 bg-[#e0e4d9] text-[#40493d] text-xs font-bold rounded-full">
                      Chưa gán
                    </span>
                  </div>

                  {/* Title & Code */}
                  <h3 className="text-lg font-bold text-[#181d16]">{order.code}</h3>
                  <p className="text-xs text-[#40493d] font-semibold mb-3">{order.title} • {order.weight}</p>

                  {/* Route & Revenue */}
                  <div className="border-y border-[#bfcaba] py-3 my-2 space-y-2.5 text-xs">
                    <div>
                      <p className="text-[10px] text-[#707a6c] font-bold uppercase mb-0.5">LỘ TRÌNH</p>
                      <p className="text-xs font-semibold text-[#181d16]">{order.route}</p>
                    </div>
                    <div>
                      <p className="text-[10px] text-[#707a6c] font-bold uppercase mb-0.5">THU NHẬP DỰ KIẾN</p>
                      <p className="text-sm font-extrabold text-[#176a22]">{order.revenue}</p>
                    </div>
                  </div>
                </div>

                {/* Footer: Deadline + Action Button */}
                <div className="flex items-center justify-between mt-3 pt-1">
                  <span className="text-xs text-[#707a6c] font-medium flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" /> Hạn: {order.deadline}
                  </span>
                  <button
                    onClick={() => setRequestingOrder(order)}
                    className="px-3.5 py-2 bg-[#176a22] text-white text-xs font-bold rounded-xl hover:bg-[#12541a] transition-all shadow-xs cursor-pointer"
                  >
                    Yêu cầu được vận chuyển
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* Modal: Gửi Yêu Cầu Vận Chuyển (Modal Request Transport) */}
      {requestingOrder && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-xs">
          <div className="bg-white rounded-3xl p-6 max-w-lg w-full shadow-2xl border border-[#bfcaba] animate-in fade-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="flex justify-between items-center pb-4 border-b border-[#bfcaba]">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-[#c9ecc1] text-[#176a22] flex items-center justify-center font-bold">
                  <Send className="w-4 h-4" />
                </div>
                <h3 className="text-xl font-bold text-[#181d16]">Gửi yêu cầu vận chuyển</h3>
              </div>
              <button
                onClick={() => setRequestingOrder(null)}
                className="w-8 h-8 rounded-full hover:bg-[#f1f5ea] text-[#40493d] flex items-center justify-center font-bold cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 py-4">
              {/* Message to Order Owner */}
              <div>
                <label className="block text-xs font-bold text-[#40493d] uppercase mb-1.5">
                  Lời nhắn cho chủ hàng
                </label>
                <textarea
                  value={requestNote}
                  onChange={(e) => setRequestNote(e.target.value)}
                  rows={2}
                  className="w-full p-3 border border-[#bfcaba] rounded-xl text-xs text-[#181d16] font-medium focus:ring-2 focus:ring-[#176a22] focus:outline-none"
                />
              </div>

              {/* Driver Selection - ONLY drivers who are SẴN SÀNG and CHƯA CÓ ĐƠN */}
              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label className="block text-xs font-bold text-[#40493d] uppercase">
                    TÀI XẾ PHÂN CÔNG (SẴN SÀNG & CHƯA CÓ ĐƠN)
                  </label>
                  <span className="text-[11px] font-bold text-[#176a22]">
                    {availableDrivers.length} tài xế khả dụng
                  </span>
                </div>

                {availableDrivers.length === 0 ? (
                  <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 text-xs text-amber-800 font-semibold flex items-center gap-2.5">
                    <AlertCircle className="w-5 h-5 text-amber-600 shrink-0" />
                    <p>
                      Hiện không có tài xế nào <strong>Sẵn sàng</strong> chưa gán đơn. Tất cả tài xế trong đội xe hiện đang đảm nhận lộ trình vận chuyển khác!
                    </p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {/* Dropdown Selector */}
                    <div className="relative">
                      <select
                        value={selectedDriver?.id || ''}
                        onChange={(e) => setSelectedDriverId(e.target.value)}
                        className="w-full p-3 bg-white border border-[#bfcaba] rounded-xl text-xs font-bold text-[#181d16] focus:ring-2 focus:ring-[#176a22] focus:outline-none appearance-none cursor-pointer pr-10"
                      >
                        {availableDrivers.map(drv => (
                          <option key={drv.id} value={drv.id}>
                            {drv.name} • Xe {drv.plateNumber} ({drv.dutyYard})
                          </option>
                        ))}
                      </select>
                      <ChevronDown className="w-4 h-4 text-[#40493d] absolute right-3 top-3.5 pointer-events-none" />
                    </div>

                    {/* Selected Driver Detailed Card */}
                    {selectedDriver && (
                      <div className="bg-[#f1f5ea] border border-[#bfcaba] rounded-2xl p-4 space-y-3 transition-all">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <img
                              src={selectedDriver.avatar}
                              alt={selectedDriver.name}
                              className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-xs"
                            />
                            <div>
                              <h4 className="font-bold text-sm text-[#181d16]">{selectedDriver.name}</h4>
                              <p className="text-xs text-[#176a22] font-semibold">★ {selectedDriver.rating.toFixed(1)}/5.0</p>
                            </div>
                          </div>
                          <span className="px-2.5 py-1 bg-[#c9ecc1] text-[#176a22] text-xs font-bold rounded-full flex items-center gap-1.5">
                            <span className="w-2 h-2 rounded-full bg-[#176a22] animate-pulse" /> Sẵn sàng
                          </span>
                        </div>

                        <div className="pt-2 border-t border-[#bfcaba]/60 text-xs text-[#40493d] space-y-1">
                          <p className="font-bold text-[#181d16] flex items-center gap-1.5">
                            <Truck className="w-4 h-4 text-[#176a22]" /> PHƯƠNG TIỆN: <span className="text-[#176a22] font-extrabold">{selectedDriver.plateNumber}</span> ({selectedDriver.vehicleType})
                          </p>
                          <div className="flex justify-between pt-1 text-[11px]">
                            <span>HẠNG BẰNG: <strong className="text-[#181d16]">{selectedDriver.licenseClass}</strong></span>
                            <span>KHO TRỰC: <strong className="text-[#181d16]">{selectedDriver.dutyYard}</strong></span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Commitment Guarantee Box */}
              <div className="bg-[#f7fbf0] border border-[#176a22]/30 rounded-xl p-3 flex items-start gap-2.5 text-xs text-[#181d16]">
                <ShieldCheck className="w-5 h-5 text-[#176a22] shrink-0 mt-0.5" />
                <p className="leading-snug">
                  <strong className="text-[#176a22]">Cam kết chất lượng:</strong> Cam kết bồi thường 100% giá trị hàng hóa nếu xảy ra hư hỏng hoặc thất thoát trong quá trình vận chuyển.
                </p>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#bfcaba]">
              <button
                onClick={() => setRequestingOrder(null)}
                className="px-5 py-2.5 border border-[#bfcaba] text-[#181d16] rounded-xl text-xs font-bold hover:bg-[#f1f5ea] transition-colors cursor-pointer"
              >
                Hủy bỏ
              </button>
              <button
                onClick={handleSendTransportRequest}
                disabled={availableDrivers.length === 0}
                className={`px-6 py-2.5 rounded-xl text-xs font-bold transition-all shadow-xs flex items-center gap-1.5 cursor-pointer ${
                  availableDrivers.length > 0
                    ? 'bg-[#176a22] text-white hover:bg-[#12541a]'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                <Send className="w-3.5 h-3.5" /> Gửi yêu cầu
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
