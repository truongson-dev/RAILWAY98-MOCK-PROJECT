import React, { useState } from 'react';
import { 
  Truck, 
  Plus, 
  Thermometer, 
  Fuel, 
  MapPin, 
  CheckCircle2, 
  AlertTriangle, 
  User, 
  FileText, 
  X, 
  Star, 
  Calendar, 
  Download, 
  Search, 
  ChevronDown, 
  Wrench, 
  Activity, 
  UserPlus,
  UploadCloud,
  Check,
  Info,
  Clock,
  Gauge,
  Navigation,
  Edit3,
  Trash2,
  AlertCircle,
  CheckSquare,
  Square
} from 'lucide-react';
import { Vehicle, Driver, TransportRoute } from './types';
import { getDriverAvatarByName, getVehicleImage, getVehicleReportData } from './mockData';

const VIETNAM_PROVINCES = [
  'An Giang', 'Bà Rịa - Vũng Tàu', 'Bắc Giang', 'Bắc Kạn', 'Bạc Liêu', 'Bắc Ninh',
  'Bến Tre', 'Bình Định', 'Bình Dương', 'Bình Phước', 'Bình Thuận', 'Cà Mau',
  'Cần Thơ', 'Cao Bằng', 'Đà Nẵng', 'Đắk Lắk', 'Đắk Nông', 'Điện Biên',
  'Đồng Nai', 'Đồng Tháp', 'Gia Lai', 'Hà Giang', 'Hà Nam', 'Hà Nội',
  'Hà Tĩnh', 'Hải Dương', 'Hải Phòng', 'Hậu Giang', 'Hòa Bình', 'Hưng Yên',
  'Khánh Hòa', 'Kiên Giang', 'Kon Tum', 'Lai Châu', 'Lâm Đồng', 'Lạng Sơn',
  'Lào Cai', 'Long An', 'Nam Định', 'Nghệ An', 'Ninh Bình', 'Ninh Thuận',
  'Phú Thọ', 'Phú Yên', 'Quảng Bình', 'Quảng Nam', 'Quảng Ngãi', 'Quảng Ninh',
  'Quảng Trị', 'Sóc Trăng', 'Sơn La', 'Tây Ninh', 'Thái Bình', 'Thái Nguyên',
  'Thanh Hóa', 'Thừa Thiên Huế', 'Tiền Giang', 'TP. Hồ Chí Minh', 'Trà Vinh',
  'Tuyên Quang', 'Vĩnh Long', 'Vĩnh Phúc', 'Yên Bái'
];

interface FleetViewProps {
  vehicles: Vehicle[];
  routes?: TransportRoute[];
  busyDriverNames?: string[];
  onAddVehicle: (veh: Vehicle) => void;
  onUpdateVehicle?: (veh: Vehicle) => void;
  onDeleteVehicles?: (ids: string[]) => void;
  onNavigateTab?: (tab: string) => void;
  onOpenAssignOrderModal?: (driverName: string, vehiclePlate?: string) => void;
  showToast?: (msg: string) => void;
}

const INITIAL_DRIVERS: Driver[] = [
  {
    id: 'drv-1',
    fullName: 'Nguyễn Văn A',
    phone: '0912 345 678',
    email: 'nguyenvana@agrisite.vn',
    licenseCategory: 'Hạng E',
    licenseNumber: '29019283741',
    nationalId: '001092837461',
    assignedVehicle: '51H-123.45',
    rating: 4.9,
    status: 'active',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    route: 'Đà Lạt - HCM',
    dutyLocation: 'Bãi đỗ Đà Lạt (Lâm Đồng)',
  },
  {
    id: 'drv-2',
    fullName: 'Trần Thế B',
    phone: '0988 765 432',
    email: 'trantheb@agrisite.vn',
    licenseCategory: 'Hạng C',
    licenseNumber: '51098273612',
    nationalId: '079088234123',
    assignedVehicle: '29C-987.65',
    rating: 4.7,
    status: 'active',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    route: 'Bảo Lộc - HCM',
    dutyLocation: 'Bãi đỗ Bảo Lộc (Lâm Đồng)',
  },
  {
    id: 'drv-3',
    fullName: 'Lê Văn D',
    phone: '0903 112 233',
    email: 'levand@agrisite.vn',
    licenseCategory: 'Hạng C',
    licenseNumber: '15029384751',
    nationalId: '031085123987',
    assignedVehicle: '51D-004.92',
    rating: 4.6,
    status: 'active',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80',
    route: 'Tiền Giang - HCM',
    dutyLocation: 'Bãi đỗ Tiền Giang',
  },
  {
    id: 'drv-4',
    fullName: 'Nguyễn Văn C',
    phone: '0977 445 566',
    email: 'nguyenvanc@agrisite.vn',
    licenseCategory: 'Hạng D',
    licenseNumber: '92019283712',
    nationalId: '048092112344',
    assignedVehicle: '60C-223.11',
    rating: 4.8,
    status: 'active',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    route: 'Long Khánh - HCM',
    dutyLocation: 'Bãi đỗ Long Khánh (Đồng Nai)',
  },
  {
    id: 'drv-5',
    fullName: 'Lê Văn A',
    phone: '0933 889 900',
    email: 'levana@agrisite.vn',
    licenseCategory: 'Hạng D',
    assignedVehicle: '60C-224.11',
    rating: 5.0,
    status: 'idle',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80',
    dutyLocation: 'Bãi đỗ TP.HCM (Quận 7)',
  },
  {
    id: 'drv-6',
    fullName: 'Lê Văn S',
    phone: '0911 223 344',
    email: 'levans@agrisite.vn',
    licenseCategory: 'Hạng E',
    assignedVehicle: '51D-005.92',
    rating: 4.9,
    status: 'idle',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80',
    dutyLocation: 'Bãi đỗ TP.HCM (Bình Điền)',
  },
  {
    id: 'drv-7',
    fullName: 'Phạm Văn D',
    phone: '0944 556 677',
    email: 'phamvand@agrisite.vn',
    licenseCategory: 'Hạng C',
    assignedVehicle: 'UV-1122-WQ',
    rating: 4.7,
    status: 'idle',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80',
    dutyLocation: 'Bãi đỗ Đà Lạt (Lâm Đồng)',
  },
  {
    id: 'drv-8',
    fullName: 'Ngô Quyền',
    phone: '0966 778 899',
    email: 'ngoquyen@agrisite.vn',
    licenseCategory: 'Hạng D',
    assignedVehicle: 'FG-1100-LS',
    rating: 4.8,
    status: 'maintenance',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    dutyLocation: 'Bãi đỗ Đà Nẵng',
  },
  {
    id: 'drv-9',
    fullName: 'Lý Thư Kiệt',
    phone: '0922 334 455',
    email: 'lythukiet@agrisite.vn',
    licenseCategory: 'Hạng E',
    assignedVehicle: 'CD-7821-ZM',
    rating: 5.0,
    status: 'maintenance',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    dutyLocation: 'Bãi đỗ Long Biên',
  },
  {
    id: 'drv-10',
    fullName: 'Trần Hưng Đạo',
    phone: '0988 112 233',
    email: 'tranhungdao@agrisite.vn',
    licenseCategory: 'Hạng D',
    assignedVehicle: '60C-789.01',
    rating: 4.9,
    status: 'maintenance',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    dutyLocation: 'Cảng Cát Lái',
  },
  {
    id: 'drv-11',
    fullName: 'Lê Hồng Phong',
    phone: '0977 111 222',
    email: 'lehongphong@agrisite.vn',
    licenseCategory: 'Hạng C',
    assignedVehicle: '29A-555.22',
    rating: 4.6,
    status: 'maintenance',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80',
    dutyLocation: 'Bãi đỗ Vinh',
  },
  {
    id: 'drv-12',
    fullName: 'Võ Thị Sáu',
    phone: '0933 444 555',
    email: 'vothisau@agrisite.vn',
    licenseCategory: 'Hạng D',
    assignedVehicle: 'MN-4455-OP',
    rating: 4.8,
    status: 'maintenance',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    dutyLocation: 'Bãi đỗ Cần Thơ',
  },
  {
    id: 'drv-13',
    fullName: 'Phan Trần D',
    phone: '0912 888 777',
    email: 'phantrand@agrisite.vn',
    licenseCategory: 'Hạng C',
    assignedVehicle: '50E-111.90',
    rating: 4.7,
    status: 'idle',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    dutyLocation: 'Bãi đỗ Cần Thơ',
  },
  {
    id: 'drv-14',
    fullName: 'Nguyễn Huệ',
    phone: '0989 333 222',
    email: 'nguyenhue@agrisite.vn',
    licenseCategory: 'Hạng E',
    assignedVehicle: '63H-882.34',
    rating: 4.9,
    status: 'idle',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    dutyLocation: 'Bãi đỗ Long Khánh (Đồng Nai)',
  },
  {
    id: 'drv-15',
    fullName: 'Trần Thái Tông',
    phone: '0905 666 777',
    email: 'tranthaitong@agrisite.vn',
    licenseCategory: 'Hạng D',
    assignedVehicle: '51C-957.65',
    rating: 4.8,
    status: 'idle',
    avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80',
    dutyLocation: 'Bãi đỗ TP.HCM (Thủ Đức)',
  },
  {
    id: 'drv-16',
    fullName: 'Lê Duẩn',
    phone: '0944 111 999',
    email: 'leduan@agrisite.vn',
    licenseCategory: 'Hạng C',
    assignedVehicle: '51C-287.65',
    rating: 4.7,
    status: 'idle',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    dutyLocation: 'Bãi đỗ Tiền Giang',
  }
];

export function normalizeDriverName(name?: string): string {
  if (!name) return '';
  return name.trim().replace(/\.$/, '').toLowerCase();
}

export function isSameDriver(name1?: string, name2?: string): boolean {
  if (!name1 || !name2) return false;
  return normalizeDriverName(name1) === normalizeDriverName(name2);
}

export function checkDriverProximity(driver: Driver, pickupLocation: string): boolean {
  if (!pickupLocation || !pickupLocation.trim()) return false;
  const locLower = pickupLocation.toLowerCase().trim();
  const duty = (driver.dutyLocation || '').toLowerCase();
  const route = (driver.route || '').toLowerCase();

  // Known key geographic locations
  const knownKeywords = [
    'đà lạt', 'hcm', 'hồ chí minh', 'sài gòn', 'bình điền', 'cần thơ', 
    'hà nội', 'tiền giang', 'đồng nai', 'bình dương', 'lâm đồng', 'quảng trị', 
    'nam định', 'đà nẵng', 'long khánh', 'bảo lộc', 'bắc ninh', 'gia lâm', 
    'long biên', 'vinh', 'quy nhơn', 'huế', 'cát lái', 'thủ đức', 'quận 7',
    'bình điền', 'chợ đầu mối', 'hải phòng', 'nha trang', 'vũng tàu', 'long an'
  ];

  for (const kw of knownKeywords) {
    if (locLower.includes(kw)) {
      if (duty.includes(kw) || route.includes(kw)) return true;
    }
  }

  // Common stop words to strip
  const stopWords = new Set([
    'kho', 'tổng', 'điểm', 'lấy', 'hàng', 'tên', 'địa', 'chỉ', 'bãi', 'đỗ', 'bến', 
    'xe', 'nhà', 'máy', 'công', 'ty', 'kcn', 'khu', 'quận', 'huyện', 'thành', 
    'phố', 'tp', 'tỉnh', 'chi', 'nhánh', 'vị', 'trí', 'giao', 'gần', 'chợ', 'đầu', 'mối'
  ]);

  const cleanLoc = locLower.replace(/[^a-z0-9àáảãạăắằẳẵặânấầnẩẫậnèéẻẽẹêếềểễệđìíỉĩịòóỏõọôốồổỗộơớờởỡợùúủũụưứừửữựỳýỷỹỵ\s]/gi, ' ');
  const words = cleanLoc.split(/\s+/).filter(w => w.length >= 2 && !stopWords.has(w));

  for (const w of words) {
    if (duty.includes(w) || route.includes(w)) return true;
  }
  return false;
}

export function getFilteredAndSortedDrivers(
  driversList: Driver[], 
  pickupLocation: string, 
  currentDriverName?: string
) {
  // Drivers that are ready (status !== 'maintenance') or currently assigned to this vehicle
  const eligible = driversList.filter(d => 
    d.status !== 'maintenance' || 
    (currentDriverName && isSameDriver(d.fullName, currentDriverName))
  );

  return [...eligible].sort((a, b) => {
    // Keep current driver on top if editing
    if (currentDriverName) {
      if (isSameDriver(a.fullName, currentDriverName)) return -1;
      if (isSameDriver(b.fullName, currentDriverName)) return 1;
    }

    const proxA = checkDriverProximity(a, pickupLocation);
    const proxB = checkDriverProximity(b, pickupLocation);

    if (proxA && !proxB) return -1;
    if (!proxA && proxB) return 1;

    return a.fullName.localeCompare(b.fullName, 'vi');
  });
}

export const FleetView: React.FC<FleetViewProps> = ({ 
  vehicles, 
  routes = [], 
  busyDriverNames = [], 
  onAddVehicle, 
  onUpdateVehicle, 
  onDeleteVehicles, 
  onNavigateTab, 
  onOpenAssignOrderModal,
  showToast
}) => {
  const [activeCatalogTab, setActiveCatalogTab] = useState<'vehicles' | 'drivers'>('vehicles');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [drivers, setDrivers] = useState<Driver[]>(INITIAL_DRIVERS);

  // Helper to check if vehicle is busy
  const isVehBusy = (veh: Vehicle) => {
    if (veh.status === 'busy') return true;
    if (veh.driverName && busyDriverNames && busyDriverNames.some(b => normalizeDriverName(b) === normalizeDriverName(veh.driverName))) {
      return true;
    }
    return false;
  };

  // Modals state
  const [showAddVehicleModal, setShowAddVehicleModal] = useState(false);
  const [showAddDriverModal, setShowAddDriverModal] = useState(false);
  const [selectedVehicleForReport, setSelectedVehicleForReport] = useState<Vehicle | null>(null);

  // Multi-select & Batch Delete State
  const [selectedVehicleIds, setSelectedVehicleIds] = useState<string[]>([]);
  const [selectedDriverIds, setSelectedDriverIds] = useState<string[]>([]);
  const [isDeleteMode, setIsDeleteMode] = useState<boolean>(false);
  const [isEditMode, setIsEditMode] = useState<boolean>(false);

  // Edit Modals State
  const [editingVehicle, setEditingVehicle] = useState<Vehicle | null>(null);
  const [editingDriver, setEditingDriver] = useState<Driver | null>(null);

  // Vehicle Form State
  const [vStatus, setVStatus] = useState<'active' | 'idle' | 'maintenance'>('idle');
  const [vPlateNumber, setVPlateNumber] = useState('');
  const [vType, setVType] = useState('xe_tai_nho');
  const [vCapacity, setVCapacity] = useState('');
  const [vFuelType, setVFuelType] = useState('diesel');
  const [vDriverName, setVDriverName] = useState('');

  // Route Declaration Fields (for 'active' / Đang vận chuyển)
  const [vOrderCode, setVOrderCode] = useState('#AG-5012');
  const [vOrigin, setVOrigin] = useState('Kho Tổng Agri Mart - Đà Lạt');
  const [vOriginAddress, setVOriginAddress] = useState('Kho Tổng Agri Mart, Phường 9, TP. Đà Lạt, Lâm Đồng');
  const [vDestination, setVDestination] = useState('Chợ Đầu Mối Bình Điền - HCM');
  const [vDestinationAddress, setVDestinationAddress] = useState('Đại lộ Nguyễn Văn Linh, Phường 7, Quận 8, TP.HCM');
  const [vCargoType, setVCargoType] = useState('Rau củ quả tươi');
  const [vDistanceKm, setVDistanceKm] = useState('308');

  // Driver Form State
  const [dFullName, setDFullName] = useState('');
  const [dPhone, setDPhone] = useState('');
  const [dEmail, setDEmail] = useState('');
  const [dLicenseCategory, setDLicenseCategory] = useState('');
  const [dLicenseNumber, setDLicenseNumber] = useState('');
  const [dNationalId, setDNationalId] = useState('');
  const [dAssignedVehicle, setDAssignedVehicle] = useState('');
  const [dDutyLocation, setDDutyLocation] = useState('');

  // Handlers for Selection & Deletion (Bi-directional Paired Co-selection)
  const toggleSelectVehicle = (id: string) => {
    const isSelected = selectedVehicleIds.includes(id);
    const targetVeh = vehicles.find((v) => v.id === id);

    if (targetVeh && isVehBusy(targetVeh)) {
      const msg = 'Không thể chọn hoặc xóa phương tiện đang ở trạng thái Bận.';
      if (showToast) showToast(msg);
      else alert(msg);
      return;
    }

    if (!isSelected) {
      // Selecting vehicle -> also automatically select linked driver
      const nextVehIds = [...selectedVehicleIds, id];
      let nextDrvIds = [...selectedDriverIds];

      if (targetVeh) {
        const cleanPlate = (targetVeh.plateNumber || '').toLowerCase().replace(/[^a-z0-9]/g, '');
        const cleanDriverName = (targetVeh.driverName || '').toLowerCase().replace(/[^a-z0-9\s]/g, '').trim();

        const linkedDriver = drivers.find((d) => {
          const dVeh = (d.assignedVehicle || '').toLowerCase().replace(/[^a-z0-9]/g, '');
          const dName = (d.fullName || '').toLowerCase().replace(/[^a-z0-9\s]/g, '').trim();
          return (dVeh && cleanPlate && dVeh === cleanPlate) || (dName && cleanDriverName && dName === cleanDriverName);
        });

        if (linkedDriver && linkedDriver.status !== 'busy' && !nextDrvIds.includes(linkedDriver.id)) {
          nextDrvIds.push(linkedDriver.id);
        }
      }
      setSelectedVehicleIds(nextVehIds);
      setSelectedDriverIds(nextDrvIds);
    } else {
      // Unselecting vehicle -> also automatically unselect linked driver
      const nextVehIds = selectedVehicleIds.filter((vId) => vId !== id);
      let nextDrvIds = [...selectedDriverIds];

      if (targetVeh) {
        const cleanPlate = (targetVeh.plateNumber || '').toLowerCase().replace(/[^a-z0-9]/g, '');
        const cleanDriverName = (targetVeh.driverName || '').toLowerCase().replace(/[^a-z0-9\s]/g, '').trim();

        const linkedDriver = drivers.find((d) => {
          const dVeh = (d.assignedVehicle || '').toLowerCase().replace(/[^a-z0-9]/g, '');
          const dName = (d.fullName || '').toLowerCase().replace(/[^a-z0-9\s]/g, '').trim();
          return (dVeh && cleanPlate && dVeh === cleanPlate) || (dName && cleanDriverName && dName === cleanDriverName);
        });

        if (linkedDriver) {
          nextDrvIds = nextDrvIds.filter((dId) => dId !== linkedDriver.id);
        }
      }
      setSelectedVehicleIds(nextVehIds);
      setSelectedDriverIds(nextDrvIds);
    }
  };

  const toggleSelectDriver = (id: string) => {
    const isSelected = selectedDriverIds.includes(id);
    const targetDrv = drivers.find((d) => d.id === id);

    if (targetDrv && targetDrv.status === 'busy') {
      const msg = 'Không thể chọn hoặc xóa tài xế đang ở trạng thái Bận.';
      if (showToast) showToast(msg);
      else alert(msg);
      return;
    }

    if (!isSelected) {
      // Selecting driver -> also automatically select linked vehicle
      const nextDrvIds = [...selectedDriverIds, id];
      let nextVehIds = [...selectedVehicleIds];

      if (targetDrv) {
        const dVeh = (targetDrv.assignedVehicle || '').toLowerCase().replace(/[^a-z0-9]/g, '');
        const dName = (targetDrv.fullName || '').toLowerCase().replace(/[^a-z0-9\s]/g, '').trim();

        const linkedVeh = vehicles.find((v) => {
          const cleanPlate = (v.plateNumber || '').toLowerCase().replace(/[^a-z0-9]/g, '');
          const cleanDriverName = (v.driverName || '').toLowerCase().replace(/[^a-z0-9\s]/g, '').trim();
          return (dVeh && cleanPlate && cleanPlate === dVeh) || (dName && cleanDriverName && cleanDriverName === dName);
        });

        if (linkedVeh && !isVehBusy(linkedVeh) && !nextVehIds.includes(linkedVeh.id)) {
          nextVehIds.push(linkedVeh.id);
        }
      }
      setSelectedDriverIds(nextDrvIds);
      setSelectedVehicleIds(nextVehIds);
    } else {
      // Unselecting driver -> also automatically unselect linked vehicle
      const nextDrvIds = selectedDriverIds.filter((dId) => dId !== id);
      let nextVehIds = [...selectedVehicleIds];

      if (targetDrv) {
        const dVeh = (targetDrv.assignedVehicle || '').toLowerCase().replace(/[^a-z0-9]/g, '');
        const dName = (targetDrv.fullName || '').toLowerCase().replace(/[^a-z0-9\s]/g, '').trim();

        const linkedVeh = vehicles.find((v) => {
          const cleanPlate = (v.plateNumber || '').toLowerCase().replace(/[^a-z0-9]/g, '');
          const cleanDriverName = (v.driverName || '').toLowerCase().replace(/[^a-z0-9\s]/g, '').trim();
          return (dVeh && cleanPlate && cleanPlate === dVeh) || (dName && cleanDriverName && cleanDriverName === dName);
        });

        if (linkedVeh) {
          nextVehIds = nextVehIds.filter((vId) => vId !== linkedVeh.id);
        }
      }
      setSelectedDriverIds(nextDrvIds);
      setSelectedVehicleIds(nextVehIds);
    }
  };

  const handleConfirmDeleteBatch = () => {
    const safeVehicleIds = selectedVehicleIds.filter((id) => {
      const v = vehicles.find((veh) => veh.id === id);
      return v && !isVehBusy(v);
    });

    const safeDriverIds = selectedDriverIds.filter((id) => {
      const d = drivers.find((drv) => drv.id === id);
      return d && d.status !== 'busy';
    });

    if (safeVehicleIds.length === 0 && safeDriverIds.length === 0) {
      if (selectedVehicleIds.length > 0 || selectedDriverIds.length > 0) {
        const msg = 'Không thể xóa các phương tiện hoặc tài xế đang ở trạng thái Bận.';
        if (showToast) showToast(msg);
        else alert(msg);
      }
      setSelectedVehicleIds([]);
      setSelectedDriverIds([]);
      setIsDeleteMode(false);
      return;
    }

    if (safeVehicleIds.length > 0 && onDeleteVehicles) {
      onDeleteVehicles(safeVehicleIds);
    }
    if (safeDriverIds.length > 0) {
      setDrivers((prev) => prev.filter((d) => !safeDriverIds.includes(d.id)));
    }
    setSelectedVehicleIds([]);
    setSelectedDriverIds([]);
    setIsDeleteMode(false);
  };

  const handleDeleteSingleVehicle = (veh: Vehicle) => {
    if (isVehBusy(veh)) {
      const msg = 'Không thể xóa phương tiện đang ở trạng thái Bận.';
      if (showToast) showToast(msg);
      else alert(msg);
      return;
    }
    if (onDeleteVehicles) {
      onDeleteVehicles([veh.id]);
    }
    setSelectedVehicleIds((prev) => prev.filter((id) => id !== veh.id));
  };

  const handleDeleteSingleDriver = (drv: Driver) => {
    if (drv.status === 'busy') {
      const msg = 'Không thể xóa tài xế đang ở trạng thái Bận.';
      if (showToast) showToast(msg);
      else alert(msg);
      return;
    }
    setDrivers((prev) => prev.filter((d) => d.id !== drv.id));
    setSelectedDriverIds((prev) => prev.filter((id) => id !== drv.id));
  };

  // Handlers for Saving Edit Modals
  const handleSaveEditVehicleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingVehicle) return;

    if (onUpdateVehicle) {
      onUpdateVehicle(editingVehicle);
    }

    // Bi-directional sync with drivers
    if (editingVehicle.driverName && editingVehicle.driverName !== 'Chưa phân công') {
      setDrivers((prev) =>
        prev.map((d) => {
          if (isSameDriver(d.fullName, editingVehicle.driverName)) {
            return {
              ...d,
              assignedVehicle: editingVehicle.plateNumber,
              status: editingVehicle.status === 'active' ? 'active' : (editingVehicle.status === 'idle' ? 'idle' : d.status),
            };
          }
          return d;
        })
      );
    }

    setEditingVehicle(null);
  };

  const handleSaveEditDriverSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingDriver) return;

    setDrivers((prev) => prev.map((d) => (d.id === editingDriver.id ? editingDriver : d)));

    // Bi-directional sync with vehicles
    if (
      editingDriver.assignedVehicle &&
      editingDriver.assignedVehicle !== 'Chưa gán xe' &&
      onUpdateVehicle
    ) {
      const matchedVeh = vehicles.find(
        (v) => v.plateNumber.toLowerCase() === editingDriver.assignedVehicle.toLowerCase()
      );
      if (matchedVeh) {
        onUpdateVehicle({
          ...matchedVeh,
          driverName: editingDriver.fullName,
        });
      }
    }

    setEditingDriver(null);
  };

  // Auto-sync bi-directionally between drivers and vehicles
  React.useEffect(() => {
    setDrivers((prevDrivers) => {
      let changed = false;
      const updated = prevDrivers.map((drv) => {
        const normDrvName = normalizeDriverName(drv.fullName);
        const isBusyByName = busyDriverNames && busyDriverNames.some((bName) => normalizeDriverName(bName) === normDrvName);

        // Find all vehicles assigned to this driver
        const assignedVehicles = vehicles.filter(
          (v) => v.driverName && isSameDriver(v.driverName, drv.fullName)
        );

        const hasBusyVehicle = assignedVehicles.some((v) => v.status === 'busy');
        const hasActiveVehicle = assignedVehicles.some((v) => v.status === 'active');

        let newStatus: 'active' | 'idle' | 'maintenance' | 'busy' = 'idle';
        if (isBusyByName || hasBusyVehicle) {
          newStatus = 'busy';
        } else if (hasActiveVehicle) {
          newStatus = 'active';
        } else if (assignedVehicles.length > 0 && assignedVehicles.every((v) => v.status === 'maintenance')) {
          newStatus = 'maintenance';
        } else {
          newStatus = 'idle';
        }

        const assignedPlates = assignedVehicles.map((v) => v.plateNumber);
        const newAssignedVehicle = assignedPlates.length > 0 ? assignedPlates.join(', ') : (drv.assignedVehicle || 'Chưa gán xe');

        if (drv.status !== newStatus || drv.assignedVehicle !== newAssignedVehicle) {
          changed = true;
          return {
            ...drv,
            status: newStatus,
            assignedVehicle: newAssignedVehicle,
          };
        }
        return drv;
      });

      return changed ? updated : prevDrivers;
    });

    // Sync Vehicle's driverName if driver's single assignedVehicle matches an unassigned vehicle
    drivers.forEach((drv) => {
      if (drv.assignedVehicle && drv.assignedVehicle !== 'Chưa gán xe') {
        const plates = drv.assignedVehicle.split(',').map((p) => p.trim());
        for (const plate of plates) {
          const matchedVeh = vehicles.find(
            (v) => v.plateNumber.toLowerCase() === plate.toLowerCase()
          );
          if (
            matchedVeh &&
            (matchedVeh.driverName === 'Chưa phân công' || !matchedVeh.driverName) &&
            onUpdateVehicle
          ) {
            onUpdateVehicle({
              ...matchedVeh,
              driverName: drv.fullName,
            });
          }
        }
      }
    });
  }, [vehicles, busyDriverNames]);

  // Filtering vehicles
  const filteredVehicles = vehicles.filter((v) => {
    if (filterStatus === 'all') return true;
    if (filterStatus === 'busy') return isVehBusy(v);
    if (filterStatus === 'idle') return v.status === 'idle' && !isVehBusy(v);
    return v.status === filterStatus;
  });

  // Filtering drivers
  const filteredDrivers = drivers.filter((d) => {
    if (filterStatus === 'all') return true;
    return d.status === filterStatus;
  });

  // Handlers
  const handleAddVehicleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!vPlateNumber) return;

    if (vStatus === 'active' && (!vDriverName || vDriverName === 'Chưa phân công')) {
      alert('Vui lòng chọn tài xế sẵn sàng để điều khiển xe ở trạng thái Đang vận chuyển.');
      return;
    }

    const cleanPlate = vPlateNumber.trim();
    const typedDriver = vDriverName.trim();

    // Find matching driver in existing drivers list
    const matchingDriver = drivers.find(
      (d) =>
        (d.assignedVehicle && d.assignedVehicle.toLowerCase() === cleanPlate.toLowerCase()) ||
        (typedDriver && d.fullName.toLowerCase() === typedDriver.toLowerCase())
    );

    let assignedDriverName = 'Chưa phân công';
    if (typedDriver) {
      assignedDriverName = typedDriver;
    } else if (matchingDriver) {
      assignedDriverName = matchingDriver.fullName;
    }

    const typeLabel =
      vType === 'xe_lanh'
        ? 'Xe đông lạnh 5 Tấn'
        : vType === 'xe_tai_lon'
        ? 'Xe Tải Nặng 15 Tấn'
        : vType === 'xe_tai_vua'
        ? 'Xe Tải Trung 8 Tấn'
        : 'Xe Tải Nhẹ 2.5 Tấn';

    const avatarUrl = assignedDriverName !== 'Chưa phân công' ? getDriverAvatarByName(assignedDriverName) : undefined;

    const newVeh: Vehicle = {
      id: `veh-${Date.now()}`,
      plateNumber: cleanPlate,
      driverName: assignedDriverName,
      driverAvatar: avatarUrl,
      type: typeLabel,
      capacity: vCapacity ? `${vCapacity} Tấn` : '5.0 Tấn',
      status: vStatus,
      lastMaintenance: '01 Th 07, 2026',
      fuelLevel: 100,
      temperature: vType === 'xe_lanh' ? -18.0 : 4.0,
      currentLocation: vStatus === 'active' ? (vDestination || 'Chợ Đầu Mối Bình Điền - HCM') : 'Bãi đỗ Tổng TP.HCM',
      lastUpdate: 'Vừa xong',
      lat: 10.75,
      lng: 106.7,
      destination: vStatus === 'active' ? (vDestination || 'Chợ Đầu Mối Bình Điền - HCM') : 'Sẵn sàng điều động',
      // Route declaration details when active
      orderCode: vStatus === 'active' ? (vOrderCode || `#AG-${Math.floor(5000 + Math.random() * 1000)}`) : undefined,
      origin: vStatus === 'active' ? (vOrigin || 'Kho Tổng Agri Mart - Đà Lạt') : undefined,
      originAddress: vStatus === 'active' ? (vOriginAddress || 'Kho Tổng Agri Mart, Phường 9, TP. Đà Lạt, Lâm Đồng') : undefined,
      destinationAddress: vStatus === 'active' ? (vDestinationAddress || 'Đại lộ Nguyễn Văn Linh, Phường 7, Quận 8, TP.HCM') : undefined,
      cargoType: vStatus === 'active' ? (vCargoType || 'Rau củ quả tươi') : undefined,
      distanceKm: vStatus === 'active' ? (Number(vDistanceKm) || 308) : undefined,
    };

    // Auto update driver assignedVehicle if driver matched or typed
    if (assignedDriverName !== 'Chưa phân công') {
      setDrivers((prev) =>
        prev.map((d) => {
          if (isSameDriver(d.fullName, assignedDriverName)) {
            const currentList = (d.assignedVehicle && d.assignedVehicle !== 'Chưa gán xe')
              ? d.assignedVehicle.split(',').map((p) => p.trim())
              : [];
            if (!currentList.includes(cleanPlate)) {
              currentList.push(cleanPlate);
            }
            return {
              ...d,
              assignedVehicle: currentList.join(', '),
              status: vStatus === 'active' ? 'active' : d.status,
            };
          }
          return d;
        })
      );
    }

    onAddVehicle(newVeh);
    setShowAddVehicleModal(false);
    // Reset form
    setVPlateNumber('');
    setVCapacity('');
    setVDriverName('');
  };

  const handleAddDriverSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!dFullName || !dPhone) return;

    const cleanFullName = dFullName.trim();
    const cleanAssignedVeh = dAssignedVehicle.trim();
    const assignedVehText = cleanAssignedVeh ? cleanAssignedVeh : 'Chưa gán xe';

    const newDrv: Driver = {
      id: `drv-${Date.now()}`,
      fullName: cleanFullName,
      phone: dPhone,
      email: dEmail,
      licenseCategory: dLicenseCategory || 'Hạng C',
      licenseNumber: dLicenseNumber,
      nationalId: dNationalId,
      assignedVehicle: assignedVehText,
      rating: 5.0,
      status: 'idle', // Auto trạng thái Sẵn sàng
      dutyLocation: dDutyLocation ? `Bãi đỗ ${dDutyLocation}` : 'Bãi đỗ Tổng TP.HCM',
    };

    setDrivers((prev) => [newDrv, ...prev]);

    // Bi-directional sync with vehicles
    if (cleanAssignedVeh || cleanFullName) {
      const matchedVeh = vehicles.find(
        (v) =>
          (cleanAssignedVeh && v.plateNumber.toLowerCase() === cleanAssignedVeh.toLowerCase()) ||
          (cleanFullName && isSameDriver(v.driverName, cleanFullName))
      );
      if (matchedVeh && onUpdateVehicle) {
        onUpdateVehicle({
          ...matchedVeh,
          driverName: cleanFullName,
        });
      }
    }

    setShowAddDriverModal(false);
    // Reset form
    setDFullName('');
    setDPhone('');
    setDEmail('');
    setDLicenseNumber('');
    setDNationalId('');
    setDDutyLocation('');
    setDAssignedVehicle('');
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* 1. Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-[#181d16] tracking-tight">Quản lý Đội xe & Tài xế</h2>
          <p className="text-sm text-[#40493d] mt-0.5">
            Giám sát thời gian thực và phân công nhân sự vận hành cho toàn bộ hạm đội nông sản.
          </p>
        </div>

        <div className="flex flex-col gap-2 shrink-0">
          {/* Row 1: Thêm Tài xế & Thêm Xe mới */}
          <div className="flex items-center gap-2 justify-end">
            <button
              onClick={() => setShowAddDriverModal(true)}
              className="px-3.5 py-2.5 bg-white border border-[#bfcaba] hover:bg-[#f1f5ea] text-[#181d16] rounded-xl font-bold text-xs sm:text-sm transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-2xs flex-1 sm:flex-none"
            >
              <UserPlus className="w-4 h-4 text-[#176a22]" />
              Thêm Tài xế
            </button>

            <button
              onClick={() => setShowAddVehicleModal(true)}
              className="px-3.5 py-2.5 bg-[#176a22] hover:bg-[#12541a] text-white rounded-xl font-bold text-xs sm:text-sm transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs flex-1 sm:flex-none"
            >
              <Plus className="w-4 h-4" />
              Thêm Xe mới
            </button>
          </div>

          {/* Row 2: Chỉnh sửa & Xóa side-by-side directly underneath Row 1 */}
          <div className="flex items-center gap-2 justify-end">
            <button
              onClick={() => {
                if (isEditMode) {
                  setIsEditMode(false);
                } else {
                  setIsEditMode(true);
                  setIsDeleteMode(false);
                }
              }}
              className={`px-3.5 py-2 border rounded-xl font-bold text-xs sm:text-sm transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-2xs flex-1 ${
                isEditMode
                  ? 'bg-amber-500 hover:bg-amber-600 text-white border-amber-600 shadow-md ring-2 ring-amber-300'
                  : 'bg-amber-50 border-amber-300 hover:bg-amber-100 text-amber-900'
              }`}
              title="Bật/tắt chế độ chỉnh sửa thông tin"
            >
              <Edit3 className={`w-4 h-4 ${isEditMode ? 'text-white' : 'text-amber-700'}`} />
              {isEditMode ? 'Đang chọn sửa (Thoát)' : 'Chỉnh sửa'}
            </button>

            <button
              onClick={() => {
                setIsEditMode(false);
                const totalSelected = selectedVehicleIds.length + selectedDriverIds.length;
                if (totalSelected > 0) {
                  handleConfirmDeleteBatch();
                } else {
                  setIsDeleteMode(!isDeleteMode);
                }
              }}
              className={`px-3.5 py-2 border rounded-xl font-bold text-xs sm:text-sm transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-2xs flex-1 ${
                (selectedVehicleIds.length > 0 || selectedDriverIds.length > 0)
                  ? 'bg-rose-600 hover:bg-rose-700 text-white border-rose-700 shadow-md'
                  : isDeleteMode
                  ? 'bg-rose-100 text-rose-800 border-rose-300'
                  : 'bg-rose-50 border-rose-300 hover:bg-rose-100 text-rose-800'
              }`}
            >
              <Trash2 className="w-4 h-4" />
              {(selectedVehicleIds.length > 0 || selectedDriverIds.length > 0)
                ? `Xác nhận xóa (${selectedVehicleIds.length + selectedDriverIds.length})`
                : isDeleteMode
                ? 'Đang chọn xóa (Thoát)'
                : 'Xóa'}
            </button>
          </div>
        </div>
      </div>

      {/* Edit Mode Alert Bar */}
      {isEditMode && (
        <div className="bg-amber-50 border-2 border-amber-300 p-4 rounded-2xl flex flex-wrap items-center justify-between gap-3 shadow-md animate-fadeIn">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-amber-500 text-white rounded-xl shadow-xs">
              <Edit3 className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-extrabold text-sm text-amber-950">
                Chế độ Chỉnh sửa đang bật
              </h4>
              <p className="text-xs font-medium text-amber-800 mt-0.5">
                Nhấp vào bất kỳ khung thông tin xe hoặc tài xế nào bên dưới để chỉnh sửa chi tiết.
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsEditMode(false)}
            className="px-3.5 py-1.5 bg-amber-200 hover:bg-amber-300 text-amber-950 border border-amber-400 rounded-xl font-bold text-xs cursor-pointer transition-colors"
          >
            Tắt chế độ sửa
          </button>
        </div>
      )}

      {/* Batch Deletion Alert Bar */}
      {(selectedVehicleIds.length > 0 || selectedDriverIds.length > 0 || isDeleteMode) && (
        <div className="bg-rose-50 border-2 border-rose-300 p-4 rounded-2xl flex flex-wrap items-center justify-between gap-3 shadow-md animate-fadeIn">
          <div className="flex items-center gap-2.5">
            <Trash2 className="w-5 h-5 text-rose-600 shrink-0" />
            <div>
              <h4 className="font-extrabold text-sm text-rose-950">
                Chế độ chọn xóa danh mục tài xế & xe
              </h4>
              <p className="text-xs font-medium text-rose-800 mt-0.5">
                Đã chọn: <span className="font-bold text-rose-950">{selectedVehicleIds.length}</span> xe và <span className="font-bold text-rose-950">{selectedDriverIds.length}</span> tài xế. Tích chọn ô vuông trên mỗi thẻ để chọn thêm.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {(selectedVehicleIds.length > 0 || selectedDriverIds.length > 0) && (
              <button
                onClick={handleConfirmDeleteBatch}
                className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white font-black text-xs rounded-xl shadow-xs flex items-center gap-1.5 cursor-pointer"
              >
                <Trash2 className="w-4 h-4" />
                Xác nhận xóa ({selectedVehicleIds.length + selectedDriverIds.length})
              </button>
            )}
            <button
              onClick={() => {
                setSelectedVehicleIds([]);
                setSelectedDriverIds([]);
                setIsDeleteMode(false);
              }}
              className="px-3.5 py-2 bg-white border border-stone-300 hover:bg-stone-100 text-stone-700 font-bold text-xs rounded-xl cursor-pointer"
            >
              Hủy / Đóng
            </button>
          </div>
        </div>
      )}

      {/* 2. Primary Tabs: Danh mục Xe vs Danh mục Tài xế */}
      <div className="border-b border-[#bfcaba] pb-0">
        <div className="flex items-center gap-6">
          <button
            onClick={() => setActiveCatalogTab('vehicles')}
            className={`pb-3 font-bold text-sm transition-all border-b-2 cursor-pointer ${
              activeCatalogTab === 'vehicles'
                ? 'border-[#176a22] text-[#176a22]'
                : 'border-transparent text-[#40493d] hover:text-[#181d16]'
            }`}
          >
            Danh mục Xe ({vehicles.length})
          </button>

          <button
            onClick={() => setActiveCatalogTab('drivers')}
            className={`pb-3 font-bold text-sm transition-all border-b-2 cursor-pointer ${
              activeCatalogTab === 'drivers'
                ? 'border-[#176a22] text-[#176a22]'
                : 'border-transparent text-[#40493d] hover:text-[#181d16]'
            }`}
          >
            Danh mục Tài xế ({drivers.length})
          </button>
        </div>
      </div>

      {/* 3. Status Filter Tabs (Giữ lại & Đặt bên dưới danh mục xe & danh mục tài xế) */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-[#f7fbf0] p-2 rounded-2xl border border-[#bfcaba]/60">
        <div className="flex items-center gap-2 overflow-x-auto py-1">
          {[
            {
              id: 'all',
              label: 'Tất cả',
              count: activeCatalogTab === 'vehicles' ? vehicles.length : drivers.length,
            },
            {
              id: 'active',
              label: 'Đang di chuyển / Đang chạy',
              count:
                activeCatalogTab === 'vehicles'
                  ? vehicles.filter((v) => v.status === 'active').length
                  : drivers.filter((d) => d.status === 'active').length,
            },
            {
              id: 'idle',
              label: 'Sẵn sàng',
              count:
                activeCatalogTab === 'vehicles'
                  ? vehicles.filter((v) => v.status === 'idle' && !isVehBusy(v)).length
                  : drivers.filter((d) => d.status === 'idle').length,
            },
            {
              id: 'maintenance',
              label: 'Bảo trì',
              count:
                activeCatalogTab === 'vehicles'
                  ? vehicles.filter((v) => v.status === 'maintenance').length
                  : drivers.filter((d) => d.status === 'maintenance').length,
            },
            {
              id: 'busy',
              label: 'Bận',
              count:
                activeCatalogTab === 'vehicles'
                  ? vehicles.filter((v) => isVehBusy(v)).length
                  : drivers.filter((d) => d.status === 'busy').length,
            },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilterStatus(tab.id)}
              className={`px-3.5 py-1.5 text-xs font-bold rounded-xl transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
                filterStatus === tab.id
                  ? 'bg-[#176a22] text-white shadow-2xs'
                  : 'bg-white text-[#40493d] border border-[#bfcaba]/80 hover:bg-[#e5eadf]'
              }`}
            >
              <span>{tab.label}</span>
              <span
                className={`px-1.5 py-0.2 rounded-full text-[11px] ${
                  filterStatus === tab.id ? 'bg-white/20 text-white' : 'bg-[#e5eadf] text-[#181d16]'
                }`}
              >
                {tab.count}
              </span>
            </button>
          ))}
        </div>

        {/* Search or Quick dropdown */}
        <div className="text-xs font-semibold text-[#40493d]">
          Hiển thị{' '}
          <span className="font-bold text-[#176a22]">
            {activeCatalogTab === 'vehicles' ? filteredVehicles.length : filteredDrivers.length}
          </span>{' '}
          {activeCatalogTab === 'vehicles' ? 'phương tiện' : 'tài xế'}
        </div>
      </div>

      {/* 4. CONTENT AREA: Vehicles Grid OR Drivers Grid */}

      {/* A. VEHICLES CATALOG */}
      {activeCatalogTab === 'vehicles' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredVehicles.length === 0 ? (
              <div className="col-span-full bg-white border border-[#bfcaba] rounded-2xl p-8 text-center text-[#40493d]">
                Không tìm thấy phương tiện nào phù hợp với bộ lọc.
              </div>
            ) : (
              filteredVehicles.map((vehicle) => {
                const matchedRoute = routes.find((r) => r.vehiclePlate === vehicle.plateNumber);
                const effectiveDriverName = matchedRoute?.driverName || vehicle.driverName;
                const effectiveAvatar = matchedRoute?.driverAvatar || vehicle.driverAvatar || getDriverAvatarByName(effectiveDriverName);
                const idleAvatar = vehicle.driverAvatar || getDriverAvatarByName(vehicle.driverName);
                const maintenanceAvatar = vehicle.driverAvatar || getDriverAvatarByName(vehicle.driverName);
                const effectiveDestination = matchedRoute?.destination || vehicle.destination;
                const deliveryStop = matchedRoute?.stops?.find((s) => s.type === 'delivery');
                const effectiveEta = deliveryStop?.scheduledTime
                  ? `${deliveryStop.scheduledTime} (Hôm nay)`
                  : (vehicle.eta || '14:30 Hôm nay');
                const isVehSelected = selectedVehicleIds.includes(vehicle.id);
                const isBusy = isVehBusy(vehicle);

                return (
                  <div
                    key={vehicle.id}
                    onClick={() => {
                      if (isDeleteMode) {
                        toggleSelectVehicle(vehicle.id);
                      } else if (isEditMode) {
                        if (isBusy) {
                          const msg = 'Không thể chỉnh sửa phương tiện đang ở trạng thái Bận.';
                          if (showToast) showToast(msg);
                          else alert(msg);
                          return;
                        }
                        setEditingVehicle(vehicle);
                      }
                    }}
                    className={`relative bg-white border rounded-2xl p-4 shadow-2xs transition-all flex flex-col justify-between space-y-3 ${
                      isDeleteMode || isEditMode ? 'cursor-pointer' : ''
                    } ${
                      isVehSelected
                        ? 'border-rose-500 ring-2 ring-rose-300 bg-rose-50/30'
                        : isEditMode
                        ? isBusy
                          ? 'border-stone-300 bg-stone-50/50 cursor-not-allowed opacity-80'
                          : 'border-amber-400 ring-2 ring-amber-300 bg-amber-50/20 hover:bg-amber-50/50 hover:shadow-md'
                        : 'border-[#bfcaba] hover:shadow-md'
                    }`}
                  >
                    {isDeleteMode && (
                      <div className="absolute top-3 right-3 z-10 flex items-center gap-1.5 bg-white/90 backdrop-blur-xs px-2.5 py-1 rounded-xl border border-rose-300 shadow-sm">
                        <input
                          type="checkbox"
                          disabled={isBusy}
                          checked={isVehSelected}
                          onChange={(e) => {
                            e.stopPropagation();
                            toggleSelectVehicle(vehicle.id);
                          }}
                          className={`w-4 h-4 rounded ${isBusy ? 'opacity-40 cursor-not-allowed' : 'accent-rose-600 cursor-pointer'}`}
                        />
                        <span className={`text-[11px] font-extrabold ${isBusy ? 'text-stone-400' : 'text-rose-800'}`}>
                          {isBusy ? 'Không thể xóa (Bận)' : 'Chọn xóa'}
                        </span>
                      </div>
                    )}
                    {isEditMode && !isDeleteMode && (
                      <div className={`absolute top-3 right-3 z-10 flex items-center gap-1.5 px-2.5 py-1 rounded-xl shadow-xs font-extrabold text-[11px] ${
                        isBusy ? 'bg-stone-400 text-white' : 'bg-amber-500 text-white'
                      }`}>
                        <Edit3 className="w-3.5 h-3.5" />
                        <span>{isBusy ? 'Không thể sửa (Bận)' : 'Bấm để sửa'}</span>
                      </div>
                    )}
                    <div>
                      {/* Full-width Vehicle Image */}
                      <div className="relative w-full aspect-video rounded-xl overflow-hidden border border-[#bfcaba] shadow-2xs mb-3 bg-stone-100">
                        <img
                          src={getVehicleImage(vehicle.type, vehicle.plateNumber)}
                          alt={vehicle.type}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Header Row: Plate Number on Left, Status Pill on Far Right */}
                      <div className="flex items-center justify-between gap-2">
                        <h3 className="text-lg font-black text-[#181d16] tracking-tight">{vehicle.plateNumber}</h3>

                        <span
                          className={`px-3 py-1 text-xs font-bold rounded-full whitespace-nowrap shrink-0 ${
                            isBusy
                              ? 'bg-amber-100 text-amber-800 border border-amber-300'
                              : vehicle.status === 'active'
                              ? 'bg-rose-100 text-rose-700 border border-rose-200'
                              : vehicle.status === 'idle'
                              ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                              : 'bg-stone-200 text-stone-700 border border-stone-300'
                          }`}
                        >
                          {isBusy
                            ? 'Bận'
                            : vehicle.status === 'active'
                            ? 'Đang vận chuyển'
                            : vehicle.status === 'idle'
                            ? 'Sẵn sàng'
                            : 'Bảo trì'}
                        </span>
                      </div>

                      {/* Subtitle / Vehicle Type below Plate Number */}
                      <p className="text-xs text-[#40493d] font-medium truncate mt-1">
                        {vehicle.type} {vehicle.subtitle ? `• ${vehicle.subtitle}` : ''}
                      </p>

                      {/* Vehicle Context Details Box */}
                      <div className="mt-3 space-y-1.5 text-xs text-[#40493d] bg-[#f7fbf0] p-3 rounded-xl border border-[#bfcaba]/70">
                        {isBusy && (
                          <div className="grid grid-cols-2 gap-2 items-start">
                            <div>
                              <span className="text-[10px] font-bold text-[#707a6c] uppercase block">TRẠNG THÁI</span>
                              <span className="font-bold text-amber-800 block break-words">Đã phân công đơn</span>
                            </div>
                            <div>
                              <span className="text-[10px] font-bold text-[#707a6c] uppercase block">TÀI XẾ PHÂN CÔNG</span>
                              <div className="flex items-center gap-1.5 mt-0.5">
                                {idleAvatar ? (
                                  <img
                                    src={idleAvatar}
                                    alt={vehicle.driverName || 'Tài xế'}
                                    className="w-5 h-5 rounded-full object-cover shrink-0 border border-[#bfcaba]"
                                  />
                                ) : (
                                  <User className="w-4 h-4 text-[#176a22] shrink-0" />
                                )}
                                <span className="font-bold text-[#181d16] break-words">{vehicle.driverName || 'Chưa gán'}</span>
                              </div>
                            </div>
                          </div>
                        )}

                        {!isBusy && vehicle.status === 'idle' && (
                          <div className="grid grid-cols-2 gap-2 items-start">
                            <div>
                              <span className="text-[10px] font-bold text-[#707a6c] uppercase block">BẢO DƯỠNG LẦN CUỐI</span>
                              <span className="font-bold text-[#181d16] block break-words">{vehicle.lastMaintenance || '01 Th 07, 2026'}</span>
                            </div>
                            <div>
                              <span className="text-[10px] font-bold text-[#707a6c] uppercase block">TÀI XẾ HIỆN TẠI</span>
                              <div className="flex items-center gap-1.5 mt-0.5">
                                {idleAvatar ? (
                                  <img
                                    src={idleAvatar}
                                    alt={vehicle.driverName || 'Tài xế'}
                                    className="w-5 h-5 rounded-full object-cover shrink-0 border border-[#bfcaba]"
                                  />
                                ) : (
                                  <User className="w-4 h-4 text-[#176a22] shrink-0" />
                                )}
                                <span className="font-bold text-[#181d16] break-words">{vehicle.driverName || 'Chưa gán'}</span>
                              </div>
                            </div>
                          </div>
                        )}

                        {!isBusy && vehicle.status === 'active' && (
                          <div className="grid grid-cols-2 gap-2 items-start">
                            <div>
                              <span className="text-[10px] font-bold text-[#707a6c] uppercase block">ĐIỂM ĐẾN</span>
                              <span className="font-bold text-[#181d16] block break-words" title={effectiveDestination}>
                                {effectiveDestination}
                              </span>
                            </div>
                            <div>
                              <span className="text-[10px] font-bold text-[#707a6c] uppercase block">TÀI XẾ HIỆN TẠI</span>
                              <div className="flex items-center gap-1.5 mt-0.5">
                                {effectiveAvatar ? (
                                  <img
                                    src={effectiveAvatar}
                                    alt={effectiveDriverName || 'Tài xế'}
                                    className="w-5 h-5 rounded-full object-cover shrink-0 border border-[#bfcaba]"
                                  />
                                ) : (
                                  <User className="w-4 h-4 text-[#176a22] shrink-0" />
                                )}
                                <span className="font-bold text-[#181d16] break-words">{effectiveDriverName || 'Đang cập nhật'}</span>
                              </div>
                            </div>
                          </div>
                        )}

                        {!isBusy && vehicle.status === 'maintenance' && (
                          <div className="grid grid-cols-2 gap-2 items-start">
                            <div>
                              <span className="text-[10px] font-bold text-[#707a6c] uppercase block">VẤN ĐỀ</span>
                              <span className="font-bold text-red-600 block break-words">{vehicle.issue || 'Cảm biến Phanh'}</span>
                            </div>
                            <div>
                              <span className="text-[10px] font-bold text-[#707a6c] uppercase block">XƯỞNG DỊCH VỤ</span>
                              <span className="font-semibold text-[#181d16] block break-words">
                                {vehicle.serviceShop || 'GreenTech Auto'}
                              </span>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Metrics: Fuel level & Freezer Temperature */}
                    <div className="pt-2 border-t border-[#bfcaba]/60 space-y-2 text-xs">
                      {/* Fuel level (HIỂN THỊ CHO TẤT CẢ CÁC XE) */}
                      <div className="space-y-1">
                        <div className="flex justify-between items-center font-bold text-[#181d16]">
                          <span className="flex items-center gap-1 text-[#40493d] text-[11px]">
                            <Fuel className="w-3.5 h-3.5 text-amber-600" /> Nhiên liệu:
                          </span>
                          <span className="text-xs">{vehicle.fuelLevel ?? 85}%</span>
                        </div>
                        <div className="w-full bg-[#e0e4d9] h-1.5 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full ${
                              (vehicle.fuelLevel ?? 85) > 30 ? 'bg-emerald-600' : 'bg-red-500'
                            }`}
                            style={{ width: `${vehicle.fuelLevel ?? 85}%` }}
                          />
                        </div>
                      </div>

                      {/* Nhiệt độ thùng đông: CHỈ HIỂN THỊ KHI XE ĐANG VẬN CHUYỂN (status === 'active') */}
                      {!isBusy && vehicle.status === 'active' && (
                        <div className="flex items-center justify-between p-2 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 font-bold">
                          <span className="flex items-center gap-1.5 text-xs">
                            <Thermometer className="w-4 h-4 text-emerald-600" /> Nhiệt độ thùng đông:
                          </span>
                          <span className="text-sm font-extrabold">{vehicle.temperature ?? 4.0}°C</span>
                        </div>
                      )}

                      {/* Action Footer Row */}
                      <div className="pt-1 flex items-center justify-between text-xs">
                        {isBusy && (
                          <>
                            <span className="text-amber-800 font-bold">
                              Đang bận (Đã gửi yêu cầu)
                            </span>
                            <button
                              disabled
                              className="px-3 py-1 bg-amber-50 border border-amber-300 text-amber-800 rounded-lg text-xs font-bold cursor-not-allowed opacity-80"
                            >
                              Đã phân công
                            </button>
                          </>
                        )}

                        {!isBusy && vehicle.status === 'idle' && (
                          <>
                            <span className="text-[#707a6c] font-medium">
                              {vehicle.mileage || '42,500 km'} • Sức khỏe {vehicle.health || '98%'}
                            </span>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                if (onOpenAssignOrderModal) {
                                  onOpenAssignOrderModal(vehicle.driverName && vehicle.driverName !== 'Chưa phân công' ? vehicle.driverName : 'Lê Văn A', vehicle.plateNumber);
                                } else if (onNavigateTab) {
                                  onNavigateTab('shipments_list');
                                }
                              }}
                              className="px-3 py-1 bg-white border border-[#176a22] text-[#176a22] hover:bg-[#176a22] hover:text-white rounded-lg text-xs font-bold transition-all cursor-pointer"
                            >
                              Gán đơn
                            </button>
                          </>
                        )}

                        {!isBusy && vehicle.status === 'active' && (
                          <>
                            <span className="text-[#707a6c] font-medium">
                              Dự kiến: {effectiveEta}
                            </span>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                if (onNavigateTab) onNavigateTab('routes');
                              }}
                              className="text-[#176a22] hover:text-[#12541a] font-bold flex items-center gap-1 cursor-pointer hover:underline"
                            >
                              Theo dõi trực tiếp
                              <Navigation className="w-3.5 h-3.5 ml-0.5" />
                            </button>
                          </>
                        )}

                        {!isBusy && vehicle.status === 'maintenance' && (
                          <>
                            <span className="text-[#707a6c] font-medium">
                              Dự kiến trở lại: {vehicle.returnEstimate || 'Hôm nay'}
                            </span>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedVehicleForReport(vehicle);
                              }}
                              className="text-[#176a22] hover:text-[#12541a] font-bold flex items-center gap-1 cursor-pointer hover:underline"
                            >
                              Xem báo cáo
                              <FileText className="w-3.5 h-3.5" />
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      )}

      {/* B. DRIVERS CATALOG */}
      {activeCatalogTab === 'drivers' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filteredDrivers.length === 0 ? (
            <div className="col-span-full bg-white border border-[#bfcaba] rounded-2xl p-8 text-center text-[#40493d]">
              Không tìm thấy tài xế nào phù hợp với bộ lọc.
            </div>
          ) : (
            filteredDrivers.map((driver) => {
              const isDrvSelected = selectedDriverIds.includes(driver.id);
              const isBusy = driver.status === 'busy';
              return (
                <div
                  key={driver.id}
                  onClick={() => {
                    if (isDeleteMode) {
                      toggleSelectDriver(driver.id);
                    } else if (isEditMode) {
                      if (isBusy) {
                        const msg = 'Không thể chỉnh sửa tài xế đang ở trạng thái Bận.';
                        if (showToast) showToast(msg);
                        else alert(msg);
                        return;
                      }
                      setEditingDriver(driver);
                    }
                  }}
                  className={`relative bg-white border rounded-2xl p-4 shadow-2xs transition-all flex flex-col justify-between space-y-3 ${
                    isDeleteMode || isEditMode ? 'cursor-pointer' : ''
                  } ${
                    isDrvSelected
                      ? 'border-rose-500 ring-2 ring-rose-300 bg-rose-50/30'
                      : isEditMode
                      ? isBusy
                        ? 'border-stone-300 bg-stone-50/50 cursor-not-allowed opacity-80'
                        : 'border-amber-400 ring-2 ring-amber-300 bg-amber-50/20 hover:bg-amber-50/50 hover:shadow-md'
                      : 'border-[#bfcaba] hover:shadow-md'
                  }`}
                >
                  {isDeleteMode && (
                    <div className="absolute top-3 right-3 z-10 flex items-center gap-1.5 bg-white/90 backdrop-blur-xs px-2.5 py-1 rounded-xl border border-rose-300 shadow-sm">
                      <input
                        type="checkbox"
                        disabled={isBusy}
                        checked={isDrvSelected}
                        onChange={(e) => {
                          e.stopPropagation();
                          toggleSelectDriver(driver.id);
                        }}
                        className={`w-4 h-4 rounded ${isBusy ? 'opacity-40 cursor-not-allowed' : 'accent-rose-600 cursor-pointer'}`}
                      />
                      <span className={`text-[11px] font-extrabold ${isBusy ? 'text-stone-400' : 'text-rose-800'}`}>
                        {isBusy ? 'Không thể xóa (Bận)' : 'Chọn xóa'}
                      </span>
                    </div>
                  )}
                  {isEditMode && !isDeleteMode && (
                    <div className={`absolute top-3 right-3 z-10 flex items-center gap-1.5 px-2.5 py-1 rounded-xl shadow-xs font-extrabold text-[11px] ${
                      isBusy ? 'bg-stone-400 text-white' : 'bg-amber-500 text-white'
                    }`}>
                      <Edit3 className="w-3.5 h-3.5" />
                      <span>{isBusy ? 'Không thể sửa (Bận)' : 'Bấm để sửa'}</span>
                    </div>
                  )}
                  <div>
                    {/* Top Avatar & Name & Status */}
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex items-center gap-2.5">
                        {driver.avatar ? (
                          <img
                            src={driver.avatar}
                            alt={driver.fullName}
                            className="w-10 h-10 rounded-full object-cover border border-[#bfcaba]"
                          />
                        ) : (
                          <div className="w-10 h-10 rounded-xl bg-stone-200 text-stone-700 font-black text-xs flex items-center justify-center border border-[#bfcaba]">
                            {driver.initials ||
                              driver.fullName
                                .split(' ')
                                .map((n) => n[0])
                                .slice(-2)
                                .join('')}
                          </div>
                        )}
                        <div>
                          <h3 className="font-extrabold text-sm text-[#181d16] leading-tight">{driver.fullName}</h3>
                          <div className="flex items-center gap-1 text-amber-500 text-xs font-bold mt-0.5">
                            <Star className="w-3 h-3 fill-amber-400" />
                            <span>{driver.rating}/5</span>
                          </div>
                        </div>
                      </div>

                      <span
                        className={`px-2.5 py-1 text-[10px] font-bold rounded-full uppercase flex items-center gap-1 whitespace-nowrap ${
                          isBusy
                            ? 'bg-amber-100 text-amber-800 border border-amber-300'
                            : driver.status === 'active'
                            ? 'bg-rose-100 text-rose-700 border border-rose-200'
                            : driver.status === 'idle'
                            ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                            : 'bg-stone-200 text-stone-600 border border-stone-300'
                        }`}
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${
                            isBusy
                              ? 'bg-amber-600'
                              : driver.status === 'active'
                              ? 'bg-rose-500'
                              : driver.status === 'idle'
                              ? 'bg-emerald-600'
                              : 'bg-stone-500'
                          }`}
                        />
                        {isBusy
                          ? 'Bận'
                          : driver.status === 'active'
                          ? 'Đang di chuyển'
                          : driver.status === 'idle'
                          ? 'Sẵn sàng'
                          : 'Xe bảo trì'}
                      </span>
                    </div>

                    {/* Driver Specs Box */}
                    <div className="space-y-1.5 text-xs bg-[#f7fbf0] p-3 rounded-xl border border-[#bfcaba]/70">
                      <div>
                        <span className="text-[#707a6c] block font-semibold text-[10px] uppercase">
                          PHƯƠNG TIỆN {driver.status === 'active' ? 'ĐANG LÁI' : 'ĐƯỢC PHÂN CÔNG'}
                        </span>
                        <p className="font-bold text-xs text-[#181d16] flex items-center gap-1 mt-0.5">
                          <Truck className="w-3.5 h-3.5 text-[#176a22]" />
                          {driver.assignedVehicle}
                        </p>
                      </div>

                      <div className="grid grid-cols-2 gap-2 border-t border-[#bfcaba]/50 pt-1.5 mt-1.5">
                        <div>
                          <span className="text-[#707a6c] block font-semibold text-[10px] uppercase">HẠNG BẰNG</span>
                          <span className="font-bold text-[#181d16] text-xs">{driver.licenseCategory}</span>
                        </div>
                        <div className="text-right">
                          <span className="text-[#707a6c] block font-semibold text-[10px] uppercase">
                            {driver.status === 'active' ? 'TUYẾN ĐƯỜNG' : 'KHO TRỰC'}
                          </span>
                          <span
                            className="font-semibold text-[#181d16] text-xs block break-words"
                            title={driver.route || driver.dutyLocation}
                          >
                            {driver.route || driver.dutyLocation || 'Bãi đỗ Gia Lâm'}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Footer Action button */}
                  <div>
                    <button
                      disabled={isBusy}
                      onClick={(e) => {
                        e.stopPropagation();
                        if (isBusy) return;
                        if (driver.status === 'active') {
                          if (onNavigateTab) onNavigateTab('routes');
                        } else {
                          if (onOpenAssignOrderModal) {
                            onOpenAssignOrderModal(driver.fullName, driver.assignedVehicle !== 'Chưa gán xe' ? driver.assignedVehicle : undefined);
                          } else if (onNavigateTab) {
                            onNavigateTab('shipments_list');
                          }
                        }
                      }}
                      className={`w-full py-2 rounded-xl text-xs font-bold transition-all shadow-2xs flex items-center justify-center gap-1.5 ${
                        isBusy
                          ? 'bg-amber-50 border border-amber-300 text-amber-800 opacity-80 cursor-not-allowed'
                          : driver.status === 'active'
                          ? 'bg-[#176a22] hover:bg-[#12541a] text-white cursor-pointer'
                          : 'bg-white border border-[#bfcaba] hover:border-[#176a22] text-[#181d16] hover:text-[#176a22] cursor-pointer'
                      }`}
                    >
                      {isBusy
                        ? 'Đã bận (Đã gửi yêu cầu)'
                        : driver.status === 'idle' || driver.status === 'maintenance'
                        ? 'Phân công đơn hàng'
                        : 'Chi tiết lịch trình'}
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
      )}

      {/* 5. MODAL 1: ADD VEHICLE ("Thêm Phương Tiện Mới") */}
      {showAddVehicleModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
          <div className="bg-[#f7fbf0] border border-[#bfcaba] rounded-3xl shadow-2xl w-full max-w-[620px] flex flex-col max-h-[90vh] overflow-hidden">
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-[#bfcaba] bg-white">
              <h3 className="font-black text-lg text-[#181d16]">Thêm Phương Tiện Mới</h3>
              <button
                onClick={() => setShowAddVehicleModal(false)}
                className="p-1.5 text-[#707a6c] hover:text-[#181d16] hover:bg-stone-100 rounded-full cursor-pointer transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <form onSubmit={handleAddVehicleSubmit} className="p-6 overflow-y-auto space-y-5 flex-1">
              {/* Mandatory Status Field at the TOP */}
              <div className="bg-[#eaf4e8] p-3.5 rounded-2xl border border-[#a8d0a2] space-y-1">
                <label className="block text-xs font-bold text-[#176a22] uppercase tracking-wide">
                  Trạng thái vận hành <span className="text-red-600">*</span>
                </label>
                <select
                  required
                  value={vStatus}
                  onChange={(e) => setVStatus(e.target.value as any)}
                  className="w-full px-3.5 py-2 text-xs font-bold bg-white text-[#181d16] border border-[#a8d0a2] rounded-xl outline-none focus:ring-2 focus:ring-[#176a22]/30"
                >
                  <option value="idle">Sẵn sàng (Nghỉ)</option>
                  <option value="active">Đang vận chuyển (Tự động cập nhật Lộ trình)</option>
                  <option value="maintenance">Đang bảo trì / Sửa chữa</option>
                </select>
                <p className="text-[11px] text-[#52604d]">
                  {vStatus === 'active' 
                    ? '⚡ Đang vận chuyển: Hệ thống sẽ tự động thêm xe và tạo Lộ Trình Vận Chuyển mới ở 0% tiến độ.'
                    : vStatus === 'idle' 
                    ? 'Sẵn sàng điều động tại bãi đỗ.'
                    : 'Chuyển xe vào danh sách đang sửa chữa.'}
                </p>
              </div>

              {/* Conditional Route Declaration Section when Status is 'active' */}
              {vStatus === 'active' && (
                <div className="p-4 bg-emerald-50/80 rounded-2xl border-2 border-emerald-500/40 space-y-3.5 animate-fadeIn">
                  <div className="flex items-center gap-2 border-b border-emerald-200 pb-2">
                    <Navigation className="w-4 h-4 text-[#176a22]" />
                    <h4 className="font-bold text-xs text-[#176a22] uppercase tracking-wide">
                      Khai Báo Thông Tin Lộ Trình Vận Chuyển <span className="text-red-600">*</span>
                    </h4>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div>
                      <label className="block font-bold text-[#181d16] mb-1">
                        Mã Đơn Hàng / Vận Đơn <span className="text-red-600">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={vOrderCode}
                        onChange={(e) => setVOrderCode(e.target.value)}
                        placeholder="VD: #AG-5012"
                        className="w-full px-3 py-2 bg-white border border-[#bfcaba] rounded-xl font-bold font-mono outline-none focus:border-[#176a22]"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-[#181d16] mb-1">
                        Loại Nông Sản / Hàng Hóa <span className="text-red-600">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={vCargoType}
                        onChange={(e) => setVCargoType(e.target.value)}
                        placeholder="VD: Rau củ quả tươi"
                        className="w-full px-3 py-2 bg-white border border-[#bfcaba] rounded-xl font-bold outline-none focus:border-[#176a22]"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-[#181d16] mb-1">
                        Điểm Lấy Hàng (Tên Kho) <span className="text-red-600">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={vOrigin}
                        onChange={(e) => setVOrigin(e.target.value)}
                        placeholder="VD: Kho Tổng Agri Mart - Đà Lạt"
                        className="w-full px-3 py-2 bg-white border border-[#bfcaba] rounded-xl font-bold outline-none focus:border-[#176a22]"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-[#181d16] mb-1">
                        Điểm Giao Hàng (Tên Điểm Đến) <span className="text-red-600">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={vDestination}
                        onChange={(e) => setVDestination(e.target.value)}
                        placeholder="VD: Chợ Đầu Mối Bình Điền - HCM"
                        className="w-full px-3 py-2 bg-white border border-[#bfcaba] rounded-xl font-bold outline-none focus:border-[#176a22]"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block font-bold text-[#181d16] mb-1">
                        Địa Chỉ Lấy Hàng Chi Tiết <span className="text-red-600">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={vOriginAddress}
                        onChange={(e) => setVOriginAddress(e.target.value)}
                        placeholder="VD: Kho Tổng Agri Mart, Phường 9, TP. Đà Lạt, Lâm Đồng"
                        className="w-full px-3 py-2 bg-white border border-[#bfcaba] rounded-xl outline-none focus:border-[#176a22]"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block font-bold text-[#181d16] mb-1">
                        Địa Chỉ Giao Hàng Chi Tiết <span className="text-red-600">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={vDestinationAddress}
                        onChange={(e) => setVDestinationAddress(e.target.value)}
                        placeholder="VD: Đại lộ Nguyễn Văn Linh, Phường 7, Quận 8, TP.HCM"
                        className="w-full px-3 py-2 bg-white border border-[#bfcaba] rounded-xl outline-none focus:border-[#176a22]"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-[#181d16] mb-1">
                        Khoảng Cách Lộ Trình (km) <span className="text-red-600">*</span>
                      </label>
                      <input
                        type="number"
                        required
                        min="1"
                        value={vDistanceKm}
                        onChange={(e) => setVDistanceKm(e.target.value)}
                        placeholder="VD: 308"
                        className="w-full px-3 py-2 bg-white border border-[#bfcaba] rounded-xl font-bold outline-none focus:border-[#176a22]"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Vehicle Specs Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* License Plate */}
                <div>
                  <label className="block text-xs font-bold text-[#181d16] mb-1">
                    Biển số xe <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={vPlateNumber}
                    onChange={(e) => setVPlateNumber(e.target.value)}
                    placeholder="VD: 29A-123.45"
                    className="w-full px-3 py-2 text-xs font-semibold bg-white border border-[#bfcaba] rounded-xl outline-none focus:border-[#176a22]"
                  />
                </div>

                {/* Vehicle Type */}
                <div>
                  <label className="block text-xs font-bold text-[#181d16] mb-1">
                    Loại xe <span className="text-red-600">*</span>
                  </label>
                  <select
                    value={vType}
                    onChange={(e) => setVType(e.target.value)}
                    className="w-full px-3 py-2 text-xs font-semibold bg-white border border-[#bfcaba] rounded-xl outline-none focus:border-[#176a22]"
                  >
                    <option value="xe_tai_nho">Xe tải nhỏ (Dưới 5 tấn)</option>
                    <option value="xe_tai_vua">Xe tải vừa (5 - 15 tấn)</option>
                    <option value="xe_tai_lon">Xe tải lớn (Trên 15 tấn)</option>
                    <option value="xe_lanh">Xe đông lạnh</option>
                  </select>
                </div>

                {/* Capacity */}
                <div>
                  <label className="block text-xs font-bold text-[#181d16] mb-1">
                    Tải trọng (Tấn) <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="number"
                    required
                    step="0.5"
                    value={vCapacity}
                    onChange={(e) => setVCapacity(e.target.value)}
                    placeholder="VD: 5.0"
                    className="w-full px-3 py-2 text-xs font-semibold bg-white border border-[#bfcaba] rounded-xl outline-none focus:border-[#176a22]"
                  />
                </div>

                {/* Fuel Type */}
                <div>
                  <label className="block text-xs font-bold text-[#181d16] mb-1">Loại nhiên liệu</label>
                  <select
                    value={vFuelType}
                    onChange={(e) => setVFuelType(e.target.value)}
                    className="w-full px-3 py-2 text-xs font-semibold bg-white border border-[#bfcaba] rounded-xl outline-none focus:border-[#176a22]"
                  >
                    <option value="diesel">Diesel</option>
                    <option value="xang">Xăng</option>
                    <option value="dien">Điện</option>
                  </select>
                </div>

                {/* Assign Driver */}
                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-[#181d16] mb-1">
                    Phân công tài xế {vStatus === 'active' && <span className="text-red-600">* (Bắt buộc)</span>}
                  </label>
                  <select
                    required={vStatus === 'active'}
                    value={vDriverName}
                    onChange={(e) => setVDriverName(e.target.value)}
                    className={`w-full px-3 py-2 text-xs font-bold bg-white border rounded-xl outline-none transition-colors ${
                      vStatus === 'active' && (!vDriverName || vDriverName === 'Chưa phân công') 
                        ? 'border-amber-500 ring-2 ring-amber-500/20' 
                        : 'border-[#bfcaba] focus:border-[#176a22]'
                    }`}
                  >
                    <option value="">{vStatus === 'active' ? '-- Chọn tài xế sẵn sàng (Bắt buộc) --' : '-- Chưa phân công --'}</option>
                    {getFilteredAndSortedDrivers(drivers, vStatus === 'active' ? vOrigin : '', vDriverName).map((drv) => {
                      const isProx = checkDriverProximity(drv, vOrigin);
                      return (
                        <option key={drv.id} value={drv.fullName}>
                          {isProx ? '⭐ [Gần điểm lấy hàng] ' : ''}{drv.fullName} ({drv.licenseCategory} - {drv.dutyLocation || 'Sẵn sàng'} - {drv.phone})
                        </option>
                      );
                    })}
                  </select>
                  {vStatus === 'active' && (
                    <p className="mt-1 text-[11px] text-[#176a22] font-medium flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#176a22] shrink-0" />
                      Chỉ chọn tài xế sẵn sàng. Tự động ưu tiên xếp tài xế ở bãi đỗ gần điểm lấy hàng ({vOrigin || 'chưa chọn'}).
                    </p>
                  )}
                </div>
              </div>

              {/* Modal Footer */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#bfcaba]">
                <button
                  type="button"
                  onClick={() => setShowAddVehicleModal(false)}
                  className="px-4 py-2 border border-[#bfcaba] text-[#40493d] rounded-xl text-xs font-bold hover:bg-stone-100 cursor-pointer"
                >
                  Hủy bỏ
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#176a22] hover:bg-[#12541a] text-white rounded-xl text-xs font-bold cursor-pointer shadow-xs"
                >
                  Xác nhận thêm
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 6. MODAL 2: ADD DRIVER ("Thêm tài xế mới") */}
      {showAddDriverModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
          <div className="bg-[#f7fbf0] border border-[#bfcaba] rounded-3xl shadow-2xl w-full max-w-[640px] flex flex-col max-h-[92vh] overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-[#bfcaba] bg-white">
              <h3 className="font-black text-lg text-[#181d16]">Thêm tài xế mới</h3>
              <button
                onClick={() => setShowAddDriverModal(false)}
                className="p-1.5 text-[#707a6c] hover:text-[#181d16] hover:bg-stone-100 rounded-full cursor-pointer transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable Form Body */}
            <form onSubmit={handleAddDriverSubmit} className="p-6 overflow-y-auto space-y-5 flex-1">
              {/* Profile Photo Circle Upload */}
              <div className="flex flex-col items-center justify-center space-y-2">
                <div className="relative group cursor-pointer">
                  <div className="w-28 h-28 rounded-full bg-[#e5eadf] border-2 border-dashed border-[#bfcaba] flex items-center justify-center text-[#707a6c] group-hover:border-[#176a22] group-hover:text-[#176a22] transition-all">
                    <User className="w-12 h-12" />
                  </div>
                  <div className="absolute bottom-0 right-0 bg-[#176a22] text-white p-2 rounded-full shadow-md">
                    <UploadCloud className="w-4 h-4" />
                  </div>
                </div>
                <span className="text-xs font-bold text-[#40493d]">Tải lên ảnh chân dung tài xế</span>
              </div>

              {/* Input Fields Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Full Name */}
                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-[#181d16] mb-1">
                    Họ và tên <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={dFullName}
                    onChange={(e) => setDFullName(e.target.value)}
                    placeholder="Nhập họ và tên đầy đủ"
                    className="w-full px-3 py-2 text-xs font-semibold bg-white border border-[#bfcaba] rounded-xl outline-none focus:border-[#176a22]"
                  />
                </div>

                {/* Phone Number */}
                <div>
                  <label className="block text-xs font-bold text-[#181d16] mb-1">
                    Số điện thoại <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    value={dPhone}
                    onChange={(e) => setDPhone(e.target.value)}
                    placeholder="09xx xxx xxx"
                    className="w-full px-3 py-2 text-xs font-semibold bg-white border border-[#bfcaba] rounded-xl outline-none focus:border-[#176a22]"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-xs font-bold text-[#181d16] mb-1">Email (Tùy chọn)</label>
                  <input
                    type="email"
                    value={dEmail}
                    onChange={(e) => setDEmail(e.target.value)}
                    placeholder="example@agri.vn"
                    className="w-full px-3 py-2 text-xs font-semibold bg-white border border-[#bfcaba] rounded-xl outline-none focus:border-[#176a22]"
                  />
                </div>

                {/* License Category */}
                <div>
                  <label className="block text-xs font-bold text-[#181d16] mb-1">
                    Hạng bằng lái <span className="text-red-600">*</span>
                  </label>
                  <select
                    value={dLicenseCategory}
                    onChange={(e) => setDLicenseCategory(e.target.value)}
                    className="w-full px-3 py-2 text-xs font-semibold bg-white border border-[#bfcaba] rounded-xl outline-none focus:border-[#176a22]"
                  >
                    <option value="">Chọn hạng bằng</option>
                    <option value="Hạng B2">B2</option>
                    <option value="Hạng C">C</option>
                    <option value="Hạng D">D</option>
                    <option value="Hạng E">E</option>
                  </select>
                </div>

                {/* License Number */}
                <div>
                  <label className="block text-xs font-bold text-[#181d16] mb-1">
                    Số GPLX <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    value={dLicenseNumber}
                    onChange={(e) => setDLicenseNumber(e.target.value)}
                    placeholder="Số giấy phép lái xe"
                    className="w-full px-3 py-2 text-xs font-semibold bg-white border border-[#bfcaba] rounded-xl outline-none focus:border-[#176a22]"
                  />
                </div>

                {/* National ID */}
                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-[#181d16] mb-1">
                    Số CCCD/CMND <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    value={dNationalId}
                    onChange={(e) => setDNationalId(e.target.value)}
                    placeholder="Nhập số định danh cá nhân"
                    className="w-full px-3 py-2 text-xs font-semibold bg-white border border-[#bfcaba] rounded-xl outline-none focus:border-[#176a22]"
                  />
                </div>

                {/* Kho trực */}
                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-[#181d16] mb-1">
                    Kho trực <span className="text-red-600">*</span>
                  </label>
                  <select
                    required
                    value={dDutyLocation}
                    onChange={(e) => setDDutyLocation(e.target.value)}
                    className="w-full px-3 py-2 text-xs font-semibold bg-white border border-[#bfcaba] rounded-xl outline-none focus:border-[#176a22]"
                  >
                    <option value="">-- Chọn tỉnh / thành phố kho trực --</option>
                    {VIETNAM_PROVINCES.map((prov) => (
                      <option key={prov} value={prov}>
                        {prov}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Assign Vehicle */}
                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-[#181d16] mb-1">
                    Gán xe (Tùy chọn - Tự nhập biển số)
                  </label>
                  <input
                    type="text"
                    value={dAssignedVehicle}
                    onChange={(e) => setDAssignedVehicle(e.target.value)}
                    placeholder="Nhập biển số xe (Ví dụ: 51C-987.65)... Để trống nếu chưa gán xe"
                    className="w-full px-3 py-2 text-xs font-semibold bg-white border border-[#bfcaba] rounded-xl outline-none focus:border-[#176a22]"
                  />
                </div>
              </div>

              {/* Information Note Box */}
              <div className="p-3 bg-[#e8f5e9] border border-[#bfcaba] rounded-xl flex items-start gap-2 text-xs text-[#176a22]">
                <Info className="w-4 h-4 text-[#176a22] flex-shrink-0 mt-0.5" />
                <p>
                  Vui lòng đảm bảo các thông tin giấy tờ của tài xế chính xác để hệ thống có thể tự động xác thực và cấp quyền vận hành trên AgriShipper.
                </p>
              </div>

              {/* Action Footer */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#bfcaba]">
                <button
                  type="button"
                  onClick={() => setShowAddDriverModal(false)}
                  className="px-4 py-2 border border-[#bfcaba] text-[#40493d] rounded-xl text-xs font-bold hover:bg-stone-100 cursor-pointer"
                >
                  Hủy bỏ
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#176a22] hover:bg-[#12541a] text-white rounded-xl text-xs font-bold cursor-pointer shadow-xs"
                >
                  Xác nhận thêm
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 7. MODAL 3: VEHICLE MAINTENANCE REPORT ("Báo cáo chi tiết phương tiện") */}
      {selectedVehicleForReport && (() => {
        const report = getVehicleReportData(selectedVehicleForReport);
        const dayLabels = ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'];
        return (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
            <div className="bg-[#f7fbf0] border border-[#bfcaba] rounded-3xl shadow-2xl w-full max-w-[840px] flex flex-col max-h-[92vh] overflow-hidden">
              {/* Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-[#bfcaba] bg-white">
                <div>
                  <h3 className="font-extrabold text-lg text-[#181d16]">Báo cáo chi tiết phương tiện</h3>
                  <p className="text-xs text-[#40493d] mt-0.5 font-medium">
                    {selectedVehicleForReport.plateNumber} ({selectedVehicleForReport.type})
                  </p>
                </div>
                <button
                  onClick={() => setSelectedVehicleForReport(null)}
                  className="p-1.5 text-[#707a6c] hover:text-[#181d16] hover:bg-stone-100 rounded-full cursor-pointer transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Scrollable Body */}
              <div className="p-6 overflow-y-auto space-y-6 flex-1 text-xs">
                {/* 4 Stat Boxes */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div className="bg-white border border-[#bfcaba] p-4 rounded-2xl shadow-2xs">
                    <p className="text-[10px] font-bold text-[#707a6c] uppercase tracking-wider mb-1">TỔNG QUÃNG ĐƯỜNG</p>
                    <p className="text-lg font-black text-[#176a22]">{report.totalDistance}</p>
                  </div>

                  <div className="bg-white border border-[#bfcaba] p-4 rounded-2xl shadow-2xs">
                    <p className="text-[10px] font-bold text-[#707a6c] uppercase tracking-wider mb-1">TIÊU THỤ NHIÊN LIỆU</p>
                    <p className="text-lg font-black text-[#176a22]">{report.fuelConsumption}</p>
                  </div>

                  <div className="bg-white border border-[#bfcaba] p-4 rounded-2xl shadow-2xs">
                    <p className="text-[10px] font-bold text-[#707a6c] uppercase tracking-wider mb-1">CHUYẾN ĐI (30 NGÀY)</p>
                    <p className="text-lg font-black text-[#176a22]">{report.tripsLast30Days} Chuyến</p>
                  </div>

                  <div className="bg-white border border-[#bfcaba] p-4 rounded-2xl shadow-2xs">
                    <p className="text-[10px] font-bold text-[#707a6c] uppercase tracking-wider mb-1">ĐÁNH GIÁ</p>
                    <p className={`text-lg font-black ${report.evaluationColor}`}>
                      {report.evaluation}
                    </p>
                  </div>
                </div>

                {/* Charts Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* 7-day Bar Chart */}
                  <div className="bg-white border border-[#bfcaba] p-4 rounded-2xl space-y-3 flex flex-col justify-between">
                    <h4 className="font-bold text-[#181d16]">Hiệu suất (7 ngày qua)</h4>
                    <div className="h-32 flex items-end justify-between gap-2 pt-2 border-b border-[#bfcaba]/40 px-2">
                      {report.weeklyPerformance.map((val, idx) => (
                        <div key={idx} className="flex-1 flex flex-col items-center gap-1 h-full justify-end">
                          <span className="text-[9px] font-bold text-[#176a22]">{val}%</span>
                          <div
                            className="w-full bg-[#176a22] hover:bg-[#12541a] rounded-t-sm transition-all"
                            style={{ height: `${val}%` }}
                          />
                          <span className="text-[10px] font-semibold text-[#707a6c]">{dayLabels[idx] || `T${idx+2}`}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Circular Donut Chart */}
                  <div className="bg-white border border-[#bfcaba] p-4 rounded-2xl space-y-3 flex flex-col items-center justify-center">
                    <h4 className="font-bold text-[#181d16] w-full text-left">Trạng thái hoạt động</h4>
                    <div className="h-32 flex items-center justify-center my-1">
                      <div className="relative w-28 h-28 flex items-center justify-center">
                        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                          <circle
                            cx="50"
                            cy="50"
                            r="40"
                            className="text-[#e5eadf]"
                            strokeWidth="10"
                            stroke="currentColor"
                            fill="transparent"
                          />
                          <circle
                            cx="50"
                            cy="50"
                            r="40"
                            className="text-[#176a22]"
                            strokeWidth="10"
                            strokeDasharray={251.2}
                            strokeDashoffset={251.2 - (251.2 * report.activityPercentage) / 100}
                            strokeLinecap="round"
                            stroke="currentColor"
                            fill="transparent"
                          />
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                          <p className="text-lg font-black text-[#181d16] leading-none">{report.activityPercentage}%</p>
                          <p className="text-[10px] font-semibold text-[#707a6c] mt-1">Hoạt động</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Maintenance History Table */}
                <div className="bg-white border border-[#bfcaba] rounded-2xl p-4 space-y-3">
                  <h4 className="font-bold text-[#181d16]">Lịch sử bảo trì</h4>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="border-b border-[#bfcaba] text-[#707a6c] text-[11px] uppercase font-bold">
                          <th className="py-2.5 px-3">Ngày</th>
                          <th className="py-2.5 px-3">Nội dung</th>
                          <th className="py-2.5 px-3">Trạng thái</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#bfcaba]/40 font-medium text-[#181d16]">
                        {report.maintenanceHistory.map((row, idx) => (
                          <tr key={idx} className={row.status === 'Đang xử lý' ? 'bg-amber-50/60' : ''}>
                            <td className={`py-2.5 px-3 ${row.status === 'Đang xử lý' ? 'font-semibold text-amber-900' : ''}`}>
                              {row.date}
                            </td>
                            <td className="py-2.5 px-3">{row.content}</td>
                            <td className={`py-2.5 px-3 font-bold ${row.status === 'Đang xử lý' ? 'text-amber-700' : 'text-emerald-700'}`}>
                              {row.status}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Incidents Table */}
                {report.incidents && report.incidents.length > 0 && (
                  <div className="bg-white border border-[#bfcaba] rounded-2xl p-4 space-y-3">
                    <h4 className="font-bold text-[#181d16]">Sự cố ghi nhận</h4>
                    <div className="overflow-x-auto">
                      <table className="w-full text-left border-collapse">
                        <thead>
                          <tr className="border-b border-[#bfcaba] text-[#707a6c] text-[11px] uppercase font-bold">
                            <th className="py-2 px-3">Ngày</th>
                            <th className="py-2 px-3">Sự cố</th>
                            <th className="py-2 px-3">Mức độ</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-[#bfcaba]/50 font-medium">
                          {report.incidents.map((inc, idx) => (
                            <tr key={idx} className="bg-red-50 text-red-800">
                              <td className="py-2 px-3 font-bold">{inc.date}</td>
                              <td className="py-2 px-3">{inc.issue}</td>
                              <td className="py-2 px-3 font-bold text-red-600">{inc.severity}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </div>

              {/* Footer Actions */}
              <div className="p-4 border-t border-[#bfcaba] bg-white flex items-center justify-end gap-3">
                <button
                  onClick={() => setSelectedVehicleForReport(null)}
                  className="px-4 py-2 border border-[#bfcaba] text-[#40493d] rounded-xl font-bold text-xs hover:bg-stone-100 cursor-pointer"
                >
                  Đóng
                </button>
                <button
                  onClick={() => setSelectedVehicleForReport(null)}
                  className="px-4 py-2 bg-[#176a22] hover:bg-[#12541a] text-white rounded-xl font-bold text-xs flex items-center gap-2 cursor-pointer shadow-xs"
                >
                  <Download className="w-4 h-4" /> Xuất báo cáo PDF
                </button>
              </div>
            </div>
          </div>
        );
      })()}

      {/* 4. EDIT VEHICLE MODAL */}
      {editingVehicle && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-xl w-full p-6 space-y-4 shadow-2xl border border-[#bfcaba] my-8 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b border-[#bfcaba]/60 pb-3">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-amber-100 rounded-xl text-amber-800">
                  <Edit3 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-black text-[#181d16]">Chỉnh sửa phương tiện</h3>
                  <p className="text-xs text-[#707a6c]">Chỉnh sửa thông tin xe {editingVehicle.plateNumber}</p>
                </div>
              </div>
              <button
                onClick={() => setEditingVehicle(null)}
                className="p-1.5 hover:bg-stone-100 rounded-full text-stone-500 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (!editingVehicle) return;

                const assignedDriver = editingVehicle.driverName || 'Chưa phân công';
                const avatarUrl = assignedDriver !== 'Chưa phân công' ? getDriverAvatarByName(assignedDriver, editingVehicle.driverAvatar) : editingVehicle.driverAvatar;

                const updatedVeh: Vehicle = {
                  ...editingVehicle,
                  driverName: assignedDriver,
                  driverAvatar: avatarUrl,
                  currentLocation: editingVehicle.status === 'active' ? (editingVehicle.destination || 'Chợ Đầu Mối Bình Điền - HCM') : (editingVehicle.currentLocation || 'Bãi đỗ Tổng TP.HCM'),
                };

                if (onUpdateVehicle) {
                  onUpdateVehicle(updatedVeh);
                }

                if (assignedDriver && assignedDriver !== 'Chưa phân công') {
                  setDrivers((prev) =>
                    prev.map((d) => {
                      if (d.fullName.toLowerCase() === assignedDriver.toLowerCase()) {
                        const currentList = (d.assignedVehicle && d.assignedVehicle !== 'Chưa gán xe')
                          ? d.assignedVehicle.split(',').map((p) => p.trim())
                          : [];
                        if (!currentList.includes(editingVehicle.plateNumber)) {
                          currentList.push(editingVehicle.plateNumber);
                        }
                        return { 
                          ...d, 
                          assignedVehicle: currentList.join(', '),
                          status: editingVehicle.status === 'active' ? 'active' : (editingVehicle.status === 'idle' ? 'idle' : d.status)
                        };
                      }
                      return d;
                    })
                  );
                }

                setEditingVehicle(null);
              }}
              className="space-y-4 max-h-[70vh] overflow-y-auto pr-1"
            >
              {/* Mandatory Status Field at the TOP */}
              <div className="bg-[#eaf4e8] p-3.5 rounded-2xl border border-[#a8d0a2] space-y-1">
                <label className="block text-xs font-bold text-[#176a22] uppercase tracking-wide">
                  Trạng thái vận hành <span className="text-red-600">*</span>
                </label>
                <select
                  required
                  value={editingVehicle.status}
                  onChange={(e) =>
                    setEditingVehicle({
                      ...editingVehicle,
                      status: e.target.value as 'active' | 'idle' | 'maintenance',
                      orderCode: e.target.value === 'active' ? (editingVehicle.orderCode || '#AG-5012') : editingVehicle.orderCode,
                      origin: e.target.value === 'active' ? (editingVehicle.origin || 'Kho Tổng Agri Mart - Đà Lạt') : editingVehicle.origin,
                      originAddress: e.target.value === 'active' ? (editingVehicle.originAddress || 'Kho Tổng Agri Mart, Phường 9, TP. Đà Lạt, Lâm Đồng') : editingVehicle.originAddress,
                      destination: e.target.value === 'active' ? (editingVehicle.destination || 'Chợ Đầu Mối Bình Điền - HCM') : editingVehicle.destination,
                      destinationAddress: e.target.value === 'active' ? (editingVehicle.destinationAddress || 'Đại lộ Nguyễn Văn Linh, Phường 7, Quận 8, TP.HCM') : editingVehicle.destinationAddress,
                      cargoType: e.target.value === 'active' ? (editingVehicle.cargoType || 'Rau củ quả tươi') : editingVehicle.cargoType,
                      distanceKm: e.target.value === 'active' ? (editingVehicle.distanceKm || 308) : editingVehicle.distanceKm,
                    })
                  }
                  className="w-full px-3.5 py-2 text-xs font-bold bg-white text-[#181d16] border border-[#a8d0a2] rounded-xl outline-none focus:ring-2 focus:ring-[#176a22]/30"
                >
                  <option value="idle">Sẵn sàng (Nghỉ)</option>
                  <option value="active">Đang vận chuyển (Đồng bộ Lộ Trình & Đang Giao Hàng)</option>
                  <option value="maintenance">Đang bảo trì / Sửa chữa</option>
                </select>
                <p className="text-[11px] text-[#52604d]">
                  {editingVehicle.status === 'active'
                    ? '⚡ Khi chuyển sang Đang vận chuyển, xe sẽ tự động đồng bộ sang Lộ Trình Vận Chuyển và Khung Đang Giao Hàng (bắt đầu ở 0% tiến độ).'
                    : editingVehicle.status === 'idle'
                    ? 'Sẵn sàng điều động tại bãi đỗ.'
                    : 'Đang gửi xưởng sửa chữa hoặc bảo dưỡng định kỳ.'}
                </p>
              </div>

              {/* Conditional Route Declaration Section when Status is 'active' */}
              {editingVehicle.status === 'active' && (
                <div className="p-4 bg-emerald-50/80 rounded-2xl border-2 border-emerald-500/40 space-y-3.5 animate-fadeIn">
                  <div className="flex items-center gap-2 border-b border-emerald-200 pb-2">
                    <Navigation className="w-4 h-4 text-[#176a22]" />
                    <h4 className="font-bold text-xs text-[#176a22] uppercase tracking-wide">
                      Khai Báo Thông Tin Lộ Trình Vận Chuyển <span className="text-red-600">*</span>
                    </h4>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div>
                      <label className="block font-bold text-[#181d16] mb-1">
                        Mã Đơn Hàng / Vận Đơn <span className="text-red-600">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={editingVehicle.orderCode || '#AG-5012'}
                        onChange={(e) => setEditingVehicle({ ...editingVehicle, orderCode: e.target.value })}
                        placeholder="VD: #AG-5012"
                        className="w-full px-3 py-2 bg-white border border-[#bfcaba] rounded-xl font-bold font-mono outline-none focus:border-[#176a22]"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-[#181d16] mb-1">
                        Loại Nông Sản / Hàng Hóa <span className="text-red-600">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={editingVehicle.cargoType || 'Rau củ quả tươi'}
                        onChange={(e) => setEditingVehicle({ ...editingVehicle, cargoType: e.target.value })}
                        placeholder="VD: Rau củ quả tươi"
                        className="w-full px-3 py-2 bg-white border border-[#bfcaba] rounded-xl font-bold outline-none focus:border-[#176a22]"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-[#181d16] mb-1">
                        Điểm Lấy Hàng (Tên Kho) <span className="text-red-600">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={editingVehicle.origin || 'Kho Tổng Agri Mart - Đà Lạt'}
                        onChange={(e) => setEditingVehicle({ ...editingVehicle, origin: e.target.value })}
                        placeholder="VD: Kho Tổng Agri Mart - Đà Lạt"
                        className="w-full px-3 py-2 bg-white border border-[#bfcaba] rounded-xl font-bold outline-none focus:border-[#176a22]"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-[#181d16] mb-1">
                        Điểm Giao Hàng (Tên Điểm Đến) <span className="text-red-600">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={editingVehicle.destination || 'Chợ Đầu Mối Bình Điền - HCM'}
                        onChange={(e) => setEditingVehicle({ ...editingVehicle, destination: e.target.value })}
                        placeholder="VD: Chợ Đầu Mối Bình Điền - HCM"
                        className="w-full px-3 py-2 bg-white border border-[#bfcaba] rounded-xl font-bold outline-none focus:border-[#176a22]"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block font-bold text-[#181d16] mb-1">
                        Địa Chỉ Lấy Hàng Chi Tiết <span className="text-red-600">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={editingVehicle.originAddress || 'Kho Tổng Agri Mart, Phường 9, TP. Đà Lạt, Lâm Đồng'}
                        onChange={(e) => setEditingVehicle({ ...editingVehicle, originAddress: e.target.value })}
                        placeholder="VD: Kho Tổng Agri Mart, Phường 9, TP. Đà Lạt, Lâm Đồng"
                        className="w-full px-3 py-2 bg-white border border-[#bfcaba] rounded-xl outline-none focus:border-[#176a22]"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block font-bold text-[#181d16] mb-1">
                        Địa Chỉ Giao Hàng Chi Tiết <span className="text-red-600">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={editingVehicle.destinationAddress || 'Đại lộ Nguyễn Văn Linh, Phường 7, Quận 8, TP.HCM'}
                        onChange={(e) => setEditingVehicle({ ...editingVehicle, destinationAddress: e.target.value })}
                        placeholder="VD: Đại lộ Nguyễn Văn Linh, Phường 7, Quận 8, TP.HCM"
                        className="w-full px-3 py-2 bg-white border border-[#bfcaba] rounded-xl outline-none focus:border-[#176a22]"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-[#181d16] mb-1">
                        Khoảng Cách Lộ Trình (km) <span className="text-red-600">*</span>
                      </label>
                      <input
                        type="number"
                        required
                        min="1"
                        value={editingVehicle.distanceKm || 308}
                        onChange={(e) => setEditingVehicle({ ...editingVehicle, distanceKm: Number(e.target.value) })}
                        placeholder="VD: 308"
                        className="w-full px-3 py-2 bg-white border border-[#bfcaba] rounded-xl font-bold outline-none focus:border-[#176a22]"
                      />
                    </div>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="block font-bold text-[#181d16] mb-1">Biển số xe</label>
                  <input
                    type="text"
                    value={editingVehicle.plateNumber}
                    onChange={(e) => setEditingVehicle({ ...editingVehicle, plateNumber: e.target.value })}
                    className="w-full px-3 py-2 border border-[#bfcaba] rounded-xl font-bold bg-stone-50 text-[#181d16]"
                    required
                  />
                </div>

                <div>
                  <label className="block font-bold text-[#181d16] mb-1">Loại phương tiện / Tải trọng</label>
                  <input
                    type="text"
                    value={editingVehicle.type}
                    onChange={(e) => setEditingVehicle({ ...editingVehicle, type: e.target.value })}
                    className="w-full px-3 py-2 border border-[#bfcaba] rounded-xl font-bold text-[#181d16]"
                    required
                  />
                </div>

                <div>
                  <label className="block font-bold text-[#181d16] mb-1">Mô tả / Model</label>
                  <input
                    type="text"
                    value={editingVehicle.subtitle || ''}
                    onChange={(e) => setEditingVehicle({ ...editingVehicle, subtitle: e.target.value })}
                    className="w-full px-3 py-2 border border-[#bfcaba] rounded-xl text-[#181d16]"
                  />
                </div>

                <div className="sm:col-span-2 bg-[#f4f6f3] border border-[#bfcaba]/80 rounded-xl p-3 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4 text-[#176a22]" />
                    <span className="text-xs font-bold text-[#181d16]">Tài xế phụ trách:</span>
                  </div>
                  <span className="text-xs font-black text-[#176a22] bg-white px-2.5 py-1 rounded-lg border border-[#bfcaba]/60 shadow-2xs">
                    {editingVehicle.driverName && editingVehicle.driverName !== 'Chưa phân công' 
                      ? editingVehicle.driverName 
                      : 'Chưa phân công'}
                  </span>
                </div>

                <div>
                  <label className="block font-bold text-[#181d16] mb-1">Mức nhiên liệu (%)</label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={editingVehicle.fuelLevel ?? 85}
                    onChange={(e) => setEditingVehicle({ ...editingVehicle, fuelLevel: Number(e.target.value) })}
                    className="w-full px-3 py-2 border border-[#bfcaba] rounded-xl font-bold text-[#181d16]"
                  />
                </div>

                <div>
                  <label className="block font-bold text-[#181d16] mb-1">Nhiệt độ thùng đông (°C)</label>
                  <input
                    type="number"
                    step="0.1"
                    value={editingVehicle.temperature ?? 4.0}
                    onChange={(e) => setEditingVehicle({ ...editingVehicle, temperature: Number(e.target.value) })}
                    className="w-full px-3 py-2 border border-[#bfcaba] rounded-xl font-bold text-[#181d16]"
                  />
                </div>

                {editingVehicle.status === 'idle' && (
                  <div>
                    <label className="block font-bold text-[#181d16] mb-1">Bảo dưỡng lần cuối</label>
                    <input
                      type="text"
                      value={editingVehicle.lastMaintenance || ''}
                      onChange={(e) => setEditingVehicle({ ...editingVehicle, lastMaintenance: e.target.value })}
                      className="w-full px-3 py-2 border border-[#bfcaba] rounded-xl text-[#181d16]"
                    />
                  </div>
                )}

                {editingVehicle.status === 'maintenance' && (
                  <>
                    <div>
                      <label className="block font-bold text-[#181d16] mb-1">Lỗi / Sự cố</label>
                      <input
                        type="text"
                        value={editingVehicle.issue || ''}
                        onChange={(e) => setEditingVehicle({ ...editingVehicle, issue: e.target.value })}
                        className="w-full px-3 py-2 border border-[#bfcaba] rounded-xl text-[#181d16]"
                      />
                    </div>
                    <div>
                      <label className="block font-bold text-[#181d16] mb-1">Xưởng dịch vụ</label>
                      <input
                        type="text"
                        value={editingVehicle.serviceShop || ''}
                        onChange={(e) => setEditingVehicle({ ...editingVehicle, serviceShop: e.target.value })}
                        className="w-full px-3 py-2 border border-[#bfcaba] rounded-xl text-[#181d16]"
                      />
                    </div>
                  </>
                )}
              </div>

              <div className="flex items-center justify-end gap-2 border-t border-[#bfcaba]/60 pt-4">
                <button
                  type="button"
                  onClick={() => setEditingVehicle(null)}
                  className="px-4 py-2 border border-[#bfcaba] rounded-xl font-bold text-xs hover:bg-stone-100 cursor-pointer text-[#40493d]"
                >
                  Hủy bỏ
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#176a22] hover:bg-[#12541a] text-white rounded-xl font-bold text-xs flex items-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  Lưu thay đổi
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 5. EDIT DRIVER MODAL */}
      {editingDriver && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-xl w-full p-6 space-y-4 shadow-2xl border border-[#bfcaba] my-8 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b border-[#bfcaba]/60 pb-3">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-amber-100 rounded-xl text-amber-800">
                  <Edit3 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-black text-[#181d16]">Chỉnh sửa tài xế</h3>
                  <p className="text-xs text-[#707a6c]">Chỉnh sửa thông tin tài xế {editingDriver.fullName}</p>
                </div>
              </div>
              <button
                onClick={() => setEditingDriver(null)}
                className="p-1.5 hover:bg-stone-100 rounded-full text-stone-500 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (!editingDriver) return;

                const originShort = editingDriver.origin ? editingDriver.origin.split('-')[0].trim() : 'Đà Lạt';
                const destShort = editingDriver.destination ? editingDriver.destination.split('-')[0].trim() : 'HCM';
                const updatedRouteStr = editingDriver.status === 'active' 
                  ? `${originShort} - ${destShort}` 
                  : (editingDriver.route || 'Đà Lạt - HCM');

                const finalDriver: Driver = {
                  ...editingDriver,
                  route: updatedRouteStr,
                };

                // Update drivers state list
                setDrivers((prev) => prev.map((d) => (d.id === finalDriver.id ? finalDriver : d)));

                // Synchronize assigned vehicle & update across all views via onUpdateVehicle
                const targetPlate = (finalDriver.assignedVehicle || '').toLowerCase().replace(/[^a-z0-9]/g, '');
                const targetDriverName = (finalDriver.fullName || '').toLowerCase().replace(/[^a-z0-9\s]/g, '').trim();

                // Find matching vehicle
                const linkedVeh = vehicles.find((v) => {
                  const vPlate = (v.plateNumber || '').toLowerCase().replace(/[^a-z0-9]/g, '');
                  const vDriver = (v.driverName || '').toLowerCase().replace(/[^a-z0-9\s]/g, '').trim();
                  return (targetPlate && vPlate && vPlate === targetPlate) || (targetDriverName && vDriver && vDriver === targetDriverName);
                });

                if (linkedVeh && onUpdateVehicle) {
                  const updatedVeh: Vehicle = {
                    ...linkedVeh,
                    driverName: finalDriver.fullName,
                    driverAvatar: finalDriver.avatar || getDriverAvatarByName(finalDriver.fullName),
                    status: finalDriver.status === 'active' ? 'active' : (finalDriver.status === 'idle' ? 'idle' : 'maintenance'),
                    orderCode: finalDriver.status === 'active' ? (finalDriver.orderCode || '#AG-5012') : linkedVeh.orderCode,
                    cargoType: finalDriver.status === 'active' ? (finalDriver.cargoType || 'Rau củ quả tươi') : linkedVeh.cargoType,
                    origin: finalDriver.status === 'active' ? (finalDriver.origin || 'Kho Tổng Agri Mart - Đà Lạt') : linkedVeh.origin,
                    originAddress: finalDriver.status === 'active' ? (finalDriver.originAddress || 'Kho Tổng Agri Mart, Phường 9, TP. Đà Lạt, Lâm Đồng') : linkedVeh.originAddress,
                    destination: finalDriver.status === 'active' ? (finalDriver.destination || 'Chợ Đầu Mối Bình Điền - HCM') : linkedVeh.destination,
                    destinationAddress: finalDriver.status === 'active' ? (finalDriver.destinationAddress || 'Đại lộ Nguyễn Văn Linh, Phường 7, Quận 8, TP.HCM') : linkedVeh.destinationAddress,
                    distanceKm: finalDriver.status === 'active' ? Number(finalDriver.distanceKm || 308) : linkedVeh.distanceKm,
                    currentLocation: finalDriver.status === 'active' ? (finalDriver.destination || 'Chợ Đầu Mối Bình Điền - HCM') : linkedVeh.currentLocation,
                  };
                  onUpdateVehicle(updatedVeh);
                } else if (finalDriver.assignedVehicle && finalDriver.assignedVehicle !== 'Chưa gán xe' && onUpdateVehicle) {
                  const newVeh: Vehicle = {
                    id: `veh-${Date.now()}`,
                    plateNumber: finalDriver.assignedVehicle,
                    driverName: finalDriver.fullName,
                    driverAvatar: finalDriver.avatar || getDriverAvatarByName(finalDriver.fullName),
                    type: 'Xe tải thùng 5 tấn',
                    capacity: '5.0 Tấn',
                    fuelLevel: 90,
                    temperature: 4.5,
                    lastUpdate: 'Vừa xong',
                    lat: 11.9404,
                    lng: 108.4583,
                    status: finalDriver.status === 'active' ? 'active' : (finalDriver.status === 'idle' ? 'idle' : 'maintenance'),
                    orderCode: finalDriver.orderCode || '#AG-5012',
                    cargoType: finalDriver.cargoType || 'Rau củ quả tươi',
                    origin: finalDriver.origin || 'Kho Tổng Agri Mart - Đà Lạt',
                    originAddress: finalDriver.originAddress || 'Kho Tổng Agri Mart, Phường 9, TP. Đà Lạt, Lâm Đồng',
                    destination: finalDriver.destination || 'Chợ Đầu Mối Bình Điền - HCM',
                    destinationAddress: finalDriver.destinationAddress || 'Đại lộ Nguyễn Văn Linh, Phường 7, Quận 8, TP.HCM',
                    distanceKm: Number(finalDriver.distanceKm || 308),
                    currentLocation: finalDriver.destination || 'Chợ Đầu Mối Bình Điền - HCM',
                  };
                  onUpdateVehicle(newVeh);
                }

                if (showToast) {
                  showToast(`Đã cập nhật tài xế ${finalDriver.fullName}${finalDriver.status === 'active' ? ' (Đang di chuyển - Đã đồng bộ lộ trình)' : ''}!`);
                }

                setEditingDriver(null);
              }}
              className="space-y-4 max-h-[70vh] overflow-y-auto pr-1"
            >
              {/* Mandatory Status Field at the TOP */}
              <div className="bg-[#eaf4e8] p-3.5 rounded-2xl border border-[#a8d0a2] space-y-1">
                <label className="block text-xs font-bold text-[#176a22] uppercase tracking-wide">
                  Trạng thái làm việc <span className="text-red-600">*</span>
                </label>
                <select
                  required
                  value={editingDriver.status}
                  onChange={(e) => {
                    const nextStatus = e.target.value as 'active' | 'idle' | 'maintenance';
                    setEditingDriver({
                      ...editingDriver,
                      status: nextStatus,
                      orderCode: nextStatus === 'active' ? (editingDriver.orderCode || '#AG-5012') : editingDriver.orderCode,
                      cargoType: nextStatus === 'active' ? (editingDriver.cargoType || 'Rau củ quả tươi') : editingDriver.cargoType,
                      origin: nextStatus === 'active' ? (editingDriver.origin || 'Kho Tổng Agri Mart - Đà Lạt') : editingDriver.origin,
                      originAddress: nextStatus === 'active' ? (editingDriver.originAddress || 'Kho Tổng Agri Mart, Phường 9, TP. Đà Lạt, Lâm Đồng') : editingDriver.originAddress,
                      destination: nextStatus === 'active' ? (editingDriver.destination || 'Chợ Đầu Mối Bình Điền - HCM') : editingDriver.destination,
                      destinationAddress: nextStatus === 'active' ? (editingDriver.destinationAddress || 'Đại lộ Nguyễn Văn Linh, Phường 7, Quận 8, TP.HCM') : editingDriver.destinationAddress,
                      distanceKm: nextStatus === 'active' ? (editingDriver.distanceKm || 308) : editingDriver.distanceKm,
                    });
                  }}
                  className="w-full px-3.5 py-2 text-xs font-bold bg-white text-[#181d16] border border-[#a8d0a2] rounded-xl outline-none focus:ring-2 focus:ring-[#176a22]/30"
                >
                  <option value="idle">Sẵn sàng (Nghỉ)</option>
                  <option value="active">Đang di chuyển (Đồng bộ Lộ Trình & Đang Giao Hàng)</option>
                  <option value="maintenance">Bảo trì xe / Nghỉ phép</option>
                </select>
                <p className="text-[11px] text-[#52604d]">
                  {editingDriver.status === 'active'
                    ? '⚡ Khi chuyển sang Đang di chuyển, hệ thống sẽ tự động cập nhật trạng thái tài xế và phương tiện gán sang Lộ Trình Vận Chuyển và Khung Đang Giao Hàng.'
                    : editingDriver.status === 'idle'
                    ? 'Sẵn sàng nhận phân công đơn hàng tại bãi đỗ.'
                    : 'Tài xế tạm nghỉ hoặc đưa xe đi sửa chữa / bảo dưỡng.'}
                </p>
              </div>

              {/* Conditional Route Declaration Section when Status is 'active' */}
              {editingDriver.status === 'active' && (
                <div className="p-4 bg-emerald-50/80 rounded-2xl border-2 border-emerald-500/40 space-y-3.5 animate-fadeIn">
                  <div className="flex items-center gap-2 border-b border-emerald-200 pb-2">
                    <Navigation className="w-4 h-4 text-[#176a22]" />
                    <h4 className="font-bold text-xs text-[#176a22] uppercase tracking-wide">
                      Khai Báo Thông Tin Lộ Trình Vận Chuyển <span className="text-red-600">*</span>
                    </h4>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div>
                      <label className="block font-bold text-[#181d16] mb-1">
                        Mã Đơn Hàng / Vận Đơn <span className="text-red-600">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={editingDriver.orderCode || '#AG-5012'}
                        onChange={(e) => setEditingDriver({ ...editingDriver, orderCode: e.target.value })}
                        placeholder="VD: #AG-5012"
                        className="w-full px-3 py-2 bg-white border border-[#bfcaba] rounded-xl font-bold font-mono outline-none focus:border-[#176a22]"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-[#181d16] mb-1">
                        Loại Nông Sản / Hàng Hóa <span className="text-red-600">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={editingDriver.cargoType || 'Rau củ quả tươi'}
                        onChange={(e) => setEditingDriver({ ...editingDriver, cargoType: e.target.value })}
                        placeholder="VD: Rau củ quả tươi"
                        className="w-full px-3 py-2 bg-white border border-[#bfcaba] rounded-xl font-bold outline-none focus:border-[#176a22]"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-[#181d16] mb-1">
                        Điểm Lấy Hàng (Tên Kho) <span className="text-red-600">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={editingDriver.origin || 'Kho Tổng Agri Mart - Đà Lạt'}
                        onChange={(e) => setEditingDriver({ ...editingDriver, origin: e.target.value })}
                        placeholder="VD: Kho Tổng Agri Mart - Đà Lạt"
                        className="w-full px-3 py-2 bg-white border border-[#bfcaba] rounded-xl font-bold outline-none focus:border-[#176a22]"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-[#181d16] mb-1">
                        Điểm Giao Hàng (Tên Điểm Đến) <span className="text-red-600">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={editingDriver.destination || 'Chợ Đầu Mối Bình Điền - HCM'}
                        onChange={(e) => setEditingDriver({ ...editingDriver, destination: e.target.value })}
                        placeholder="VD: Chợ Đầu Mối Bình Điền - HCM"
                        className="w-full px-3 py-2 bg-white border border-[#bfcaba] rounded-xl font-bold outline-none focus:border-[#176a22]"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block font-bold text-[#181d16] mb-1">
                        Địa Chỉ Lấy Hàng Chi Tiết <span className="text-red-600">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={editingDriver.originAddress || 'Kho Tổng Agri Mart, Phường 9, TP. Đà Lạt, Lâm Đồng'}
                        onChange={(e) => setEditingDriver({ ...editingDriver, originAddress: e.target.value })}
                        placeholder="VD: Kho Tổng Agri Mart, Phường 9, TP. Đà Lạt, Lâm Đồng"
                        className="w-full px-3 py-2 bg-white border border-[#bfcaba] rounded-xl outline-none focus:border-[#176a22]"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block font-bold text-[#181d16] mb-1">
                        Địa Chỉ Giao Hàng Chi Tiết <span className="text-red-600">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={editingDriver.destinationAddress || 'Đại lộ Nguyễn Văn Linh, Phường 7, Quận 8, TP.HCM'}
                        onChange={(e) => setEditingDriver({ ...editingDriver, destinationAddress: e.target.value })}
                        placeholder="VD: Đại lộ Nguyễn Văn Linh, Phường 7, Quận 8, TP.HCM"
                        className="w-full px-3 py-2 bg-white border border-[#bfcaba] rounded-xl outline-none focus:border-[#176a22]"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-[#181d16] mb-1">
                        Khoảng Cách Lộ Trình (km) <span className="text-red-600">*</span>
                      </label>
                      <input
                        type="number"
                        required
                        min="1"
                        value={editingDriver.distanceKm || 308}
                        onChange={(e) => setEditingDriver({ ...editingDriver, distanceKm: e.target.value })}
                        placeholder="VD: 308"
                        className="w-full px-3 py-2 bg-white border border-[#bfcaba] rounded-xl font-bold outline-none focus:border-[#176a22]"
                      />
                    </div>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="block font-bold text-[#181d16] mb-1">Họ và tên tài xế</label>
                  <input
                    type="text"
                    value={editingDriver.fullName}
                    onChange={(e) => setEditingDriver({ ...editingDriver, fullName: e.target.value })}
                    className="w-full px-3 py-2 border border-[#bfcaba] rounded-xl font-bold text-[#181d16]"
                    required
                  />
                </div>

                <div>
                  <label className="block font-bold text-[#181d16] mb-1">Số điện thoại</label>
                  <input
                    type="text"
                    value={editingDriver.phone || ''}
                    onChange={(e) => setEditingDriver({ ...editingDriver, phone: e.target.value })}
                    className="w-full px-3 py-2 border border-[#bfcaba] rounded-xl text-[#181d16]"
                  />
                </div>

                <div>
                  <label className="block font-bold text-[#181d16] mb-1">Hạng bằng lái</label>
                  <input
                    type="text"
                    value={editingDriver.licenseCategory}
                    onChange={(e) => setEditingDriver({ ...editingDriver, licenseCategory: e.target.value })}
                    className="w-full px-3 py-2 border border-[#bfcaba] rounded-xl font-bold text-[#181d16]"
                    required
                  />
                </div>

                <div>
                  <label className="block font-bold text-[#181d16] mb-1">Phương tiện gán</label>
                  <input
                    type="text"
                    value={editingDriver.assignedVehicle}
                    onChange={(e) => setEditingDriver({ ...editingDriver, assignedVehicle: e.target.value })}
                    className="w-full px-3 py-2 border border-[#bfcaba] rounded-xl font-bold text-[#181d16]"
                    required
                  />
                </div>

                <div>
                  <label className="block font-bold text-[#181d16] mb-1">Đánh giá (Số sao / 5.0)</label>
                  <input
                    type="number"
                    step="0.1"
                    min="1"
                    max="5"
                    value={editingDriver.rating}
                    onChange={(e) => setEditingDriver({ ...editingDriver, rating: Number(e.target.value) })}
                    className="w-full px-3 py-2 border border-[#bfcaba] rounded-xl font-bold text-[#181d16]"
                  />
                </div>

                <div>
                  <label className="block font-bold text-[#181d16] mb-1">Kho / Bãi trực</label>
                  <input
                    type="text"
                    value={editingDriver.dutyLocation || ''}
                    onChange={(e) => setEditingDriver({ ...editingDriver, dutyLocation: e.target.value })}
                    className="w-full px-3 py-2 border border-[#bfcaba] rounded-xl text-[#181d16]"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block font-bold text-[#181d16] mb-1">Tuyến đường hiện tại</label>
                  <input
                    type="text"
                    value={editingDriver.route || ''}
                    onChange={(e) => setEditingDriver({ ...editingDriver, route: e.target.value })}
                    className="w-full px-3 py-2 border border-[#bfcaba] rounded-xl text-[#181d16]"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 border-t border-[#bfcaba]/60 pt-4">
                <button
                  type="button"
                  onClick={() => setEditingDriver(null)}
                  className="px-4 py-2 border border-[#bfcaba] rounded-xl font-bold text-xs hover:bg-stone-100 cursor-pointer text-[#40493d]"
                >
                  Hủy bỏ
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#176a22] hover:bg-[#12541a] text-white rounded-xl font-bold text-xs flex items-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  Lưu thay đổi
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
