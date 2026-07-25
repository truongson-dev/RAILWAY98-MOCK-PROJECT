'use client';
// Đây là component thuộc giao diện Admin
import React, { useState, useMemo } from 'react';
import {
  FileText,
  Search,
  Filter,
  Plus,
  Eye,
  CheckCircle2,
  Clock,
  AlertTriangle,
  Truck,
  ShieldCheck,
  DollarSign,
  Calendar,
  Building2,
  Users,
  X,
  ChevronLeft,
  ChevronRight,
  TrendingUp,
  FileSignature,
  Download,
  Check,
  Scale,
  Sparkles,
  Lock,
  ArrowUpRight,
  PackageCheck
} from 'lucide-react';

export interface ContractItem {
  id: string;
  code: string; // e.g. HD-2026-8801
  title: string;
  type: 'spot' | 'forward' | 'futures'; // Spot = Mua bán ngay, Forward = Bao tiêu mùa vụ, Futures = Đơn hàng tương lai
  createdAt: string;
  expectedDeliveryDate: string; // Mùa vụ / Ngày giao tương lai
  
  // Parties
  buyerName: string;
  buyerTaxCode: string;
  buyerRepresentative: string;
  
  sellerName: string;
  sellerCoop: string;
  sellerRepresentative: string;

  // Logistics Partner
  logisticsPartnerName: string;
  logisticsCode: string;
  temperatureRequirement: string;
  shippingRoute: string;

  // Commodity
  productName: string;
  category: string;
  volume: string; // e.g., '100 Tấn'
  agreedPrice: string; // e.g., '85,000 đ/kg' or 'Giá sàn 75k + Thưởng chất lượng'
  totalValue: number; // in VNĐ
  escrowDepositPercent: number; // e.g., 30% or 100%
  escrowAmount: number;

  // Status
  status: 'draft' | 'pending_signature' | 'active' | 'in_fulfillment' | 'completed' | 'cancelled';
  digitalSignatureHash: string;
  clauseSummary: string;
}

const INITIAL_CONTRACTS: ContractItem[] = [
  {
    id: 'ctr-01',
    code: 'HD-2026-901',
    title: 'Hợp Đồng Tương Lai Bao Tiêu Sầu Riêng Ri6 Vụ Thu 2026',
    type: 'futures',
    createdAt: '2026-07-20 09:30',
    expectedDeliveryDate: '2026-09-15 (Đợt Thu Hoạch 1)',
    buyerName: 'EuroAgri Import GmbH',
    buyerTaxCode: 'DE-81293841',
    buyerRepresentative: 'Ông Michael Schmidt (Giám đốc Thu Mua)',
    sellerName: 'HTX Sầu Riêng Krông Pắc',
    sellerCoop: 'Liên Minh HTX Nông Nghiệp Đắk Lắk',
    sellerRepresentative: 'Ông Y Bham Ksor (Chủ tịch HTX)',
    logisticsPartnerName: 'Chuỗi Lạnh Tây Nguyên Logistics',
    logisticsCode: 'LOG-TN-991',
    temperatureRequirement: 'Container Lạnh 12°C - 15°C',
    shippingRoute: 'Kho Krông Pắc (Đắk Lắk) ➔ Cảng Cát Lái (TP.HCM)',
    productName: 'Sầu Riêng Ri6 Loại A Xuất Khẩu',
    category: 'Trái Cây Xuất Khẩu',
    volume: '150 Tấn',
    agreedPrice: '88,000 đ/kg (Cố định Tương lai)',
    totalValue: 13200000000, // 13.2 tỷ
    escrowDepositPercent: 30,
    escrowAmount: 3960000000,
    status: 'active',
    digitalSignatureHash: '0x8f2a99b817c10d3e09841ab7',
    clauseSummary: 'Cam kết tiêu chuẩn GlobalGAP, độ chín 85%. Đặt cọc Escrow 30% khi ký, 70% thanh toán sau khi thông quan.'
  },
  {
    id: 'ctr-02',
    code: 'HD-2026-902',
    title: 'Hợp Đồng Mua Bán Ngay Lúa Gạo ST25 Thượng Hạng',
    type: 'spot',
    createdAt: '2026-07-22 14:15',
    expectedDeliveryDate: '2026-07-26',
    buyerName: 'Tập Đoàn Bán Lẻ WinMart',
    buyerTaxCode: '0101234567',
    buyerRepresentative: 'Bà Nguyễn Thị Minh (Trưởng phòng Cung ứng)',
    sellerName: 'Mekong Rice Export Co.',
    sellerCoop: 'HTX Lúa Gạo Thoại Sơn An Giang',
    sellerRepresentative: 'Ông Trần Văn Út (Giám đốc)',
    logisticsPartnerName: 'Vận Tải Sông Biển Mekong Fleet',
    logisticsCode: 'LOG-MK-442',
    temperatureRequirement: 'Thông thoáng khô ráo, độ ẩm < 13%',
    shippingRoute: 'Kho Thoại Sơn (An Giang) ➔ Tổng kho WinMart Bình Dương',
    productName: 'Lúa Gạo ST25 Đóng Túi 5kg',
    category: 'Lúa Gạo & Lương Thực',
    volume: '200 Tấn',
    agreedPrice: '27,000 đ/kg',
    totalValue: 5400000000, // 5.4 tỷ
    escrowDepositPercent: 100,
    escrowAmount: 5400000000,
    status: 'in_fulfillment',
    digitalSignatureHash: '0x3c11e0098ba4f12d8a0129cd',
    clauseSummary: 'Thanh toán 100% Escrow giữ tại Ngân hàng BIDV. Giao hàng trong 5 ngày làm việc.'
  },
  {
    id: 'ctr-03',
    code: 'HD-2026-903',
    title: 'Hợp Đồng Bao Tiêu Mùa Vụ Cà Phê Arabica Cầu Đất 2026-2027',
    type: 'forward',
    createdAt: '2026-07-15 11:00',
    expectedDeliveryDate: '2026-11-30 (Thu Hoạch Mùa Đông)',
    buyerName: 'Công ty Cổ Phần Lương Thực Miền Nam',
    buyerTaxCode: '0300998877',
    buyerRepresentative: 'Ông Lê Hoàng Nam (Phó TGĐ)',
    sellerName: 'Nông Trường Cà Phê Chư Sê',
    sellerCoop: 'Liên Minh HTX Gia Lai',
    sellerRepresentative: 'Bà Kpă H’Rinh (Chủ nhiệm)',
    logisticsPartnerName: 'Viettel Post Cold Chain Logistics',
    logisticsCode: 'LOG-VT-108',
    temperatureRequirement: 'Bảo quản mát 18°C',
    shippingRoute: 'Nông trường Cầu Đất (Lâm Đồng) ➔ Nhà máy Chế biến Đồng Nai',
    productName: 'Cà Phê Arabica Nhân Xô Cầu Đất',
    category: 'Cà Phê & Hạt Nông Sản',
    volume: '300 Tấn',
    agreedPrice: 'Giá Sàn 110k + Thưởng 5% nếu Đạt Grade 1',
    totalValue: 33000000000, // 33 tỷ
    escrowDepositPercent: 20,
    escrowAmount: 6600000000,
    status: 'pending_signature',
    digitalSignatureHash: 'Chờ bên Mua ký xác thực OTP',
    clauseSummary: 'Chờ hai bên hoàn tất xác thực chữ ký số Smart CA. Tạm giữ 20% tiền đặt cọc phát triển vùng trồng.'
  },
  {
    id: 'ctr-04',
    code: 'HD-2026-904',
    title: 'Hợp Đồng Đơn Hàng Tương Lai Dâu Tây Organic & Dưa Lưới',
    type: 'futures',
    createdAt: '2026-07-18 16:40',
    expectedDeliveryDate: '2026-08-20 (Mùa Vụ Tháng 8)',
    buyerName: 'Singapore Agro Trading Pte',
    buyerTaxCode: 'SG-2019381M',
    buyerRepresentative: 'Mr. David Tan (Procurement Manager)',
    sellerName: 'Nông trại Sen Vàng Đà Lạt',
    sellerCoop: 'HTX Rau Củ Hữu Cơ Đà Lạt',
    sellerRepresentative: 'Ông Phạm Văn Đức (Giám đốc kỹ thuật)',
    logisticsPartnerName: 'Vận Tải Lạnh Phía Nam Express',
    logisticsCode: 'LOG-PN-882',
    temperatureRequirement: 'Xe Lạnh Chuyên Dụng 4°C - 6°C',
    shippingRoute: 'Nông trại Đà Lạt ➔ Sân Bay Tân Sơn Nhất (Chuyển Hàng Không)',
    productName: 'Dâu Tây Organic & Dưa Lưới Huỳnh Long',
    category: 'Rau Củ Ôn Đới Đà Lạt',
    volume: '25 Tấn',
    agreedPrice: '130,000 đ/kg',
    totalValue: 3250000000, // 3.25 tỷ
    escrowDepositPercent: 50,
    escrowAmount: 1625000000,
    status: 'active',
    digitalSignatureHash: '0x9d0012bc44e1123a45e990ff',
    clauseSummary: 'Đơn hàng tương lai giao bằng hàng không sang Singapore. Cam kết tiêu chuẩn dư lượng bằng 0.'
  },
  {
    id: 'ctr-05',
    code: 'HD-2026-905',
    title: 'Hợp Đồng Mua Bán Ngay Xoài Cát Hòa Lộc Tiền Giang',
    type: 'spot',
    createdAt: '2026-07-21 08:20',
    expectedDeliveryDate: '2026-07-24',
    buyerName: 'Chuỗi Siêu Thị Co.opmart',
    buyerTaxCode: '0301482910',
    buyerRepresentative: 'Bà Đặng Thị Hương (Trưởng ngành hàng Trái cây)',
    sellerName: 'Nông Nghiệp Xanh Tiền Giang',
    sellerCoop: 'HTX Xoài Cát Hòa Lộc Cái Bè',
    sellerRepresentative: 'Ông Nguyễn Văn Ba (Chủ nhiệm HTX)',
    logisticsPartnerName: 'Giao Hàng Nhanh Nông Sản Đồng Bằng',
    logisticsCode: 'LOG-DB-221',
    temperatureRequirement: 'Nhiệt độ phòng mát 20°C',
    shippingRoute: 'Cái Bè (Tiền Giang) ➔ Trung Tâm Phân Phối Co.opmart An Lạc',
    productName: 'Xoài Cát Hòa Lộc Bao Trái Loại 1',
    category: 'Trái Cây Xuất Khẩu',
    volume: '18 Tấn',
    agreedPrice: '65,000 đ/kg',
    totalValue: 1170000000, // 1.17 tỷ
    escrowDepositPercent: 100,
    escrowAmount: 1170000000,
    status: 'completed',
    digitalSignatureHash: '0x12a884c102390881be2d7c01',
    clauseSummary: 'Đã hoàn tất giao nhận hàng, kiểm định 100% đạt chuẩn và giải ngân Escrow thành công.'
  }
];

// Component: ContractsManagementView - Giao diện quản lý/hiển thị cho Admin
export const ContractsManagementView: React.FC = () => {
  const [contracts, setContracts] = useState<ContractItem[]>(INITIAL_CONTRACTS);

  // Filters
  const [activeTabFilter, setActiveTabFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTypeFilter, setSelectedTypeFilter] = useState('all');

  // Pagination
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(5);

  // Modals
  const [detailContract, setDetailContract] = useState<ContractItem | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  // Form states for creating contract
  const [newTitle, setNewTitle] = useState('');
  const [newType, setNewType] = useState<'spot' | 'forward' | 'futures'>('futures');
  const [newBuyer, setNewBuyer] = useState('');
  const [newSeller, setNewSeller] = useState('');
  const [newLogistics, setNewLogistics] = useState('Chuỗi Lạnh Tây Nguyên Logistics');
  const [newProduct, setNewProduct] = useState('');
  const [newVolume, setNewVolume] = useState('50 Tấn');
  const [newAgreedPrice, setNewAgreedPrice] = useState('85,000 đ/kg');
  const [newTotalValue, setNewTotalValue] = useState('2500000000');
  const [newExpectedDelivery, setNewExpectedDelivery] = useState('2026-09-30 (Thu Hoạch Tương Lai)');
  const [newEscrowPercent, setNewEscrowPercent] = useState<number>(30);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3000);
  };

  // Status Badge Helper
  const getStatusBadge = (status: ContractItem['status']) => {
    switch (status) {
      case 'draft':
        return (
          <span className="bg-gray-100 text-gray-700 border border-gray-300 px-2.5 py-1 rounded-full text-[10px] font-bold flex items-center space-x-1 shrink-0">
            <Clock className="w-3 h-3 text-gray-500" />
            <span>Bản Thảo</span>
          </span>
        );
      case 'pending_signature':
        return (
          <span className="bg-amber-100 text-amber-800 border border-amber-300 px-2.5 py-1 rounded-full text-[10px] font-bold flex items-center space-x-1 shrink-0">
            <FileSignature className="w-3 h-3 text-amber-600" />
            <span>Chờ Ký Số</span>
          </span>
        );
      case 'active':
        return (
          <span className="bg-blue-100 text-blue-800 border border-blue-300 px-2.5 py-1 rounded-full text-[10px] font-bold flex items-center space-x-1 shrink-0">
            <ShieldCheck className="w-3 h-3 text-blue-600" />
            <span>Đã Hiệu Lực</span>
          </span>
        );
      case 'in_fulfillment':
        return (
          <span className="bg-purple-100 text-purple-800 border border-purple-300 px-2.5 py-1 rounded-full text-[10px] font-bold flex items-center space-x-1 shrink-0">
            <Truck className="w-3 h-3 text-purple-600" />
            <span>Đang Thực Hiện</span>
          </span>
        );
      case 'completed':
        return (
          <span className="bg-[#a3f69c]/40 text-[#003808] border border-[#176a22]/30 px-2.5 py-1 rounded-full text-[10px] font-bold flex items-center space-x-1 shrink-0">
            <CheckCircle2 className="w-3 h-3 text-[#176a22]" />
            <span>Hoàn Thành</span>
          </span>
        );
      case 'cancelled':
        return (
          <span className="bg-red-100 text-[#ba1a1a] border border-red-300 px-2.5 py-1 rounded-full text-[10px] font-bold flex items-center space-x-1 shrink-0">
            <X className="w-3 h-3 text-[#ba1a1a]" />
            <span>Đã Hủy</span>
          </span>
        );
      default:
        return null;
    }
  };

  // Contract Type Badge Helper
  const getTypeBadge = (type: ContractItem['type']) => {
    switch (type) {
      case 'futures':
        return (
          <span className="bg-indigo-100 text-indigo-800 border border-indigo-200 px-2 py-0.5 rounded text-[10px] font-bold flex items-center space-x-1">
            <Sparkles className="w-3 h-3 text-indigo-600" />
            <span>Đơn Tương Lai (Futures)</span>
          </span>
        );
      case 'forward':
        return (
          <span className="bg-emerald-100 text-emerald-800 border border-emerald-200 px-2 py-0.5 rounded text-[10px] font-bold flex items-center space-x-1">
            <TrendingUp className="w-3 h-3 text-emerald-600" />
            <span>Bao Tiêu Mùa Vụ</span>
          </span>
        );
      case 'spot':
        return (
          <span className="bg-sky-100 text-sky-800 border border-sky-200 px-2 py-0.5 rounded text-[10px] font-bold flex items-center space-x-1">
            <PackageCheck className="w-3 h-3 text-sky-600" />
            <span>Mua Bán Ngay (Spot)</span>
          </span>
        );
      default:
        return null;
    }
  };

  // Format currency helper
  const formatVND = (num: number) => {
    if (num >= 1000000000) {
      return `${(num / 1000000000).toFixed(2)} Tỷ VNĐ`;
    }
    return `${(num / 1000000).toFixed(0)} Triệu VNĐ`;
  };

  // Filter logic
  const filteredContracts = useMemo(() => {
    return contracts.filter((ctr) => {
      const matchesSearch =
        ctr.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ctr.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ctr.buyerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ctr.sellerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ctr.productName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ctr.logisticsPartnerName.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesType = selectedTypeFilter === 'all' || ctr.type === selectedTypeFilter;

      let matchesTab = true;
      if (activeTabFilter === 'futures') matchesTab = ctr.type === 'futures';
      else if (activeTabFilter === 'forward') matchesTab = ctr.type === 'forward';
      else if (activeTabFilter === 'spot') matchesTab = ctr.type === 'spot';
      else if (activeTabFilter === 'pending') matchesTab = ctr.status === 'pending_signature';
      else if (activeTabFilter === 'active') matchesTab = ctr.status === 'active' || ctr.status === 'in_fulfillment';

      return matchesSearch && matchesType && matchesTab;
    });
  }, [contracts, searchQuery, selectedTypeFilter, activeTabFilter]);

  // Pagination logic
  const totalItems = filteredContracts.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage) || 1;
  const validPage = Math.min(currentPage, totalPages);
  const startIdx = (validPage - 1) * itemsPerPage;
  const paginatedContracts = filteredContracts.slice(startIdx, startIdx + itemsPerPage);
  const startItemNum = totalItems > 0 ? startIdx + 1 : 0;
  const endItemNum = Math.min(startIdx + itemsPerPage, totalItems);

  // High level Stats
  const totalContractValue = contracts.reduce((acc, c) => acc + c.totalValue, 0);
  const futuresContractsCount = contracts.filter((c) => c.type === 'futures').length;
  const activeContractsCount = contracts.filter((c) => ['active', 'in_fulfillment'].includes(c.status)).length;
  const pendingSignatureCount = contracts.filter((c) => c.status === 'pending_signature').length;

  // Handle Approve / Sign Contract as Admin
  const handleApproveSignature = (id: string) => {
    const updated = contracts.map((c) => {
      if (c.id === id) {
        return {
          ...c,
          status: 'active' as const,
          digitalSignatureHash: `0x${Math.random().toString(16).substring(2, 10)}${Math.random().toString(16).substring(2, 10)}`
        };
      }
      return c;
    });
    setContracts(updated);
    if (detailContract?.id === id) {
      setDetailContract({
        ...detailContract,
        status: 'active',
        digitalSignatureHash: '0x9a8820c1f28019ab332d1'
      });
    }
    showToast(`Đã duyệt và xác thực chữ ký số Admin cho Hợp đồng #${contracts.find((c) => c.id === id)?.code}!`);
  };

  // Handle Create New Contract
  const handleCreateContractSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newBuyer.trim() || !newSeller.trim() || !newProduct.trim()) return;

    const valNum = parseInt(newTotalValue.replace(/[^0-9]/g, '')) || 2000000000;
    const escrowAmt = (valNum * newEscrowPercent) / 100;

    const newCtr: ContractItem = {
      id: `ctr-${Date.now()}`,
      code: `HD-2026-${Math.floor(900 + Math.random() * 100)}`,
      title: newTitle,
      type: newType,
      createdAt: new Date().toISOString().replace('T', ' ').substring(0, 16),
      expectedDeliveryDate: newExpectedDelivery,
      buyerName: newBuyer,
      buyerTaxCode: '0319820120',
      buyerRepresentative: 'Đại diện ủy quyền',
      sellerName: newSeller,
      sellerCoop: 'HTX Nông Sản Vùng Trồng Chuẩn',
      sellerRepresentative: 'Chủ nhiệm HTX',
      logisticsPartnerName: newLogistics,
      logisticsCode: `LOG-AG-${Math.floor(100 + Math.random() * 900)}`,
      temperatureRequirement: 'Tiêu chuẩn lạnh 10°C - 15°C',
      shippingRoute: 'Vùng trồng ➔ Tổng kho phân phối',
      productName: newProduct,
      category: 'Nông Sản Hợp Đồng',
      volume: newVolume,
      agreedPrice: newAgreedPrice,
      totalValue: valNum,
      escrowDepositPercent: newEscrowPercent,
      escrowAmount: escrowAmt,
      status: 'pending_signature',
      digitalSignatureHash: 'Đang tạo phiên ký số SmartCA',
      clauseSummary: `Hợp đồng ${newType === 'futures' ? 'Đơn hàng Tương lai' : 'Mua bán'} cam kết sản lượng ${newVolume}, bảo chứng tài khoản Escrow ${newEscrowPercent}%.`
    };

    setContracts([newCtr, ...contracts]);
    setShowCreateModal(false);

    // Reset
    setNewTitle('');
    setNewBuyer('');
    setNewSeller('');
    setNewProduct('');
    showToast(`Khởi tạo thành công Hợp đồng Mua bán Tương lai #${newCtr.code}!`);
  };

  return (
    <div className="p-6 md:p-8 space-y-6 bg-[#f7fbf0] min-h-full">
      {/* Toast Notification */}
      {toastMsg && (
        <div className="fixed top-6 right-6 z-50 bg-[#176a22] text-white px-4 py-3 rounded-xl shadow-lg text-xs font-semibold flex items-center space-x-2 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-[#a3f69c]" />
          <span>{toastMsg}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-[#181d16] flex items-center space-x-2">
            <FileText className="w-6 h-6 text-[#176a22]" />
            <span>Quản Lý Hợp Đồng Mua Bán & Đơn Hàng Tương Lai</span>
          </h2>
          <p className="text-sm text-[#40493d] mt-1">
            Kết nối pháp lý giữa Bên Mua, Bên Bán (HTX/Nông trại), Đơn vị Vận chuyển Chuỗi Lạnh và Bảo chứng Đơn hàng Tương lai (Futures)
          </p>
        </div>

        <div className="flex items-center space-x-2 self-start md:self-auto">
          <button
            onClick={() => setShowCreateModal(true)}
            className="px-4 py-2.5 bg-[#176a22] hover:bg-[#13561b] text-white text-xs font-bold rounded-xl shadow-xs transition-colors cursor-pointer flex items-center space-x-1.5"
          >
            <Plus className="w-4 h-4" />
            <span>Soạn Hợp Đồng Tương Lai Mới</span>
          </button>
        </div>
      </div>

      {/* KPI Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-2xl border border-[#e0e4d9] shadow-2xs flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-[#707a6c] uppercase">Tổng Giá Trị Hợp Đồng</span>
            <p className="text-xl font-bold text-[#181d16] mt-0.5">{formatVND(totalContractValue)}</p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-[#a3f69c]/30 text-[#003808] flex items-center justify-center font-bold">
            <DollarSign className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-[#e0e4d9] shadow-2xs flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-[#707a6c] uppercase">Hợp Đồng Tương Lai (Futures)</span>
            <p className="text-xl font-bold text-indigo-700 mt-0.5">{futuresContractsCount} Hợp đồng mùa vụ</p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold">
            <Sparkles className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-[#e0e4d9] shadow-2xs flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-[#707a6c] uppercase">Hợp Đồng Đang Hiệu Lực</span>
            <p className="text-xl font-bold text-[#176a22] mt-0.5">{activeContractsCount} Đang thực hiện</p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-[#a3f69c]/30 text-[#003808] flex items-center justify-center font-bold">
            <ShieldCheck className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-[#e0e4d9] shadow-2xs flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-[#707a6c] uppercase">Chờ Admin & Các Bên Ký Số</span>
            <p className="text-xl font-bold text-amber-700 mt-0.5">{pendingSignatureCount} Hợp đồng chờ duyệt</p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center font-bold">
            <FileSignature className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="bg-white p-1.5 rounded-2xl border border-[#e0e4d9] shadow-2xs overflow-x-auto custom-scrollbar">
        <div className="flex items-center space-x-1 min-w-max">
          <button
            onClick={() => {
              setActiveTabFilter('all');
              setCurrentPage(1);
            }}
            className={`px-3.5 py-2 rounded-xl font-bold text-xs transition-all cursor-pointer ${
              activeTabFilter === 'all'
                ? 'bg-[#a3f69c] text-[#003808] shadow-2xs'
                : 'text-[#40493d] hover:bg-[#f7fbf0]'
            }`}
          >
            Tất Cả Hợp Đồng ({contracts.length})
          </button>

          <button
            onClick={() => {
              setActiveTabFilter('futures');
              setCurrentPage(1);
            }}
            className={`px-3.5 py-2 rounded-xl font-bold text-xs transition-all cursor-pointer ${
              activeTabFilter === 'futures'
                ? 'bg-[#a3f69c] text-[#003808] shadow-2xs'
                : 'text-[#40493d] hover:bg-[#f7fbf0]'
            }`}
          >
            Đơn Tương Lai - Futures ({contracts.filter((c) => c.type === 'futures').length})
          </button>

          <button
            onClick={() => {
              setActiveTabFilter('forward');
              setCurrentPage(1);
            }}
            className={`px-3.5 py-2 rounded-xl font-bold text-xs transition-all cursor-pointer ${
              activeTabFilter === 'forward'
                ? 'bg-[#a3f69c] text-[#003808] shadow-2xs'
                : 'text-[#40493d] hover:bg-[#f7fbf0]'
            }`}
          >
            Bao Tiêu Mùa Vụ ({contracts.filter((c) => c.type === 'forward').length})
          </button>

          <button
            onClick={() => {
              setActiveTabFilter('spot');
              setCurrentPage(1);
            }}
            className={`px-3.5 py-2 rounded-xl font-bold text-xs transition-all cursor-pointer ${
              activeTabFilter === 'spot'
                ? 'bg-[#a3f69c] text-[#003808] shadow-2xs'
                : 'text-[#40493d] hover:bg-[#f7fbf0]'
            }`}
          >
            Mua Bán Ngay - Spot ({contracts.filter((c) => c.type === 'spot').length})
          </button>

          <button
            onClick={() => {
              setActiveTabFilter('pending');
              setCurrentPage(1);
            }}
            className={`px-3.5 py-2 rounded-xl font-bold text-xs transition-all cursor-pointer ${
              activeTabFilter === 'pending'
                ? 'bg-amber-100 text-amber-900 border border-amber-300 shadow-2xs'
                : 'text-amber-800 hover:bg-amber-50'
            }`}
          >
            Chờ Ký Duyệt ({pendingSignatureCount})
          </button>

          <button
            onClick={() => {
              setActiveTabFilter('active');
              setCurrentPage(1);
            }}
            className={`px-3.5 py-2 rounded-xl font-bold text-xs transition-all cursor-pointer ${
              activeTabFilter === 'active'
                ? 'bg-[#a3f69c] text-[#003808] shadow-2xs'
                : 'text-[#40493d] hover:bg-[#f7fbf0]'
            }`}
          >
            Đang Hiệu Lực ({activeContractsCount})
          </button>
        </div>
      </div>

      {/* Control Search & Select Filters */}
      <div className="bg-white p-4 rounded-xl border border-[#e0e4d9] shadow-2xs flex flex-col md:flex-row items-center justify-between gap-3 text-xs">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 absolute left-3 top-2.5 text-[#707a6c]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
            placeholder="Tìm mã hợp đồng #HD, người mua, người bán, đối tác vận chuyển..."
            className="w-full pl-9 pr-4 py-2 bg-[#f7fbf0] border border-[#bfcaba] rounded-lg text-[#181d16] focus:outline-none focus:ring-2 focus:ring-[#176a22]"
          />
        </div>

        <div className="flex items-center space-x-2 w-full md:w-auto">
          <div className="flex items-center space-x-1 bg-[#f7fbf0] px-3 py-1.5 rounded-lg border border-[#bfcaba]">
            <Filter className="w-3.5 h-3.5 text-[#707a6c]" />
            <span className="text-[#707a6c] font-medium">Phân loại hợp đồng:</span>
            <select
              value={selectedTypeFilter}
              onChange={(e) => {
                setSelectedTypeFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="bg-transparent text-[#181d16] font-semibold focus:outline-none cursor-pointer"
            >
              <option value="all">Tất cả loại hình</option>
              <option value="futures">Đơn Hàng Tương Lai (Futures)</option>
              <option value="forward">Hợp Đồng Bao Tiêu</option>
              <option value="spot">Hợp Đồng Giao Ngay</option>
            </select>
          </div>
        </div>
      </div>

      {/* CONTRACTS TABLE */}
      <div className="bg-white rounded-2xl border border-[#e0e4d9] shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-[#f1f5ea] border-b border-[#e0e4d9] text-[#707a6c] uppercase font-bold tracking-wider">
                <th className="py-3.5 px-4">Mã & Loại Hợp Đồng</th>
                <th className="py-3.5 px-4">Bên Mua (Khách Hàng)</th>
                <th className="py-3.5 px-4">Bên Bán (HTX / Nông Trại)</th>
                <th className="py-3.5 px-4">Đơn Vị Vận Chuyển</th>
                <th className="py-3.5 px-4">Sản Phẩm & Giá Trị HĐ</th>
                <th className="py-3.5 px-4">Thời Gian Giao Tương Lai</th>
                <th className="py-3.5 px-4">Trạng Thái</th>
                <th className="py-3.5 px-4 text-center">Thao Tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#e0e4d9]">
              {paginatedContracts.map((ctr) => (
                <tr key={ctr.id} className="hover:bg-[#f7fbf0] transition-colors">
                  <td className="py-3.5 px-4">
                    <div className="space-y-1">
                      <div className="flex items-center space-x-1.5">
                        <span className="text-[11px] font-mono font-bold text-[#176a22]">{ctr.code}</span>
                      </div>
                      <p className="font-bold text-[#181d16] line-clamp-1 max-w-[200px]" title={ctr.title}>
                        {ctr.title}
                      </p>
                      {getTypeBadge(ctr.type)}
                    </div>
                  </td>

                  <td className="py-3.5 px-4">
                    <div>
                      <p className="font-bold text-[#181d16]">{ctr.buyerName}</p>
                      <p className="text-[10px] text-[#707a6c]">MST: {ctr.buyerTaxCode}</p>
                    </div>
                  </td>

                  <td className="py-3.5 px-4">
                    <div>
                      <p className="font-semibold text-[#181d16]">{ctr.sellerName}</p>
                      <p className="text-[10px] text-[#707a6c]">{ctr.sellerCoop}</p>
                    </div>
                  </td>

                  <td className="py-3.5 px-4">
                    <div className="flex items-start space-x-1.5">
                      <Truck className="w-3.5 h-3.5 text-purple-600 shrink-0 mt-0.5" />
                      <div>
                        <p className="font-medium text-[#181d16]">{ctr.logisticsPartnerName}</p>
                        <p className="text-[10px] text-[#707a6c]">{ctr.temperatureRequirement}</p>
                      </div>
                    </div>
                  </td>

                  <td className="py-3.5 px-4">
                    <div>
                      <p className="font-bold text-[#181d16]">{ctr.productName}</p>
                      <p className="text-[10px] text-[#707a6c]">
                        {ctr.volume} • Giá: {ctr.agreedPrice}
                      </p>
                      <p className="font-bold text-[#176a22] text-xs mt-0.5">{formatVND(ctr.totalValue)}</p>
                    </div>
                  </td>

                  <td className="py-3.5 px-4">
                    <div className="space-y-0.5">
                      <p className="font-bold text-indigo-900 text-[11px] flex items-center space-x-1">
                        <Calendar className="w-3 h-3 text-indigo-600" />
                        <span>{ctr.expectedDeliveryDate}</span>
                      </p>
                      <p className="text-[10px] text-[#707a6c]">Cọc Escrow: {ctr.escrowDepositPercent}%</p>
                    </div>
                  </td>

                  <td className="py-3.5 px-4">{getStatusBadge(ctr.status)}</td>

                  <td className="py-3.5 px-4 text-center">
                    <div className="flex items-center justify-center space-x-2">
                      <button
                        onClick={() => setDetailContract(ctr)}
                        className="px-2.5 py-1 bg-[#f7fbf0] text-[#176a22] border border-[#bfcaba] hover:bg-[#a3f69c]/30 rounded-lg font-bold flex items-center space-x-1 cursor-pointer transition-colors"
                        title="Xem chi tiết hợp đồng & ký số"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>Xem HĐ</span>
                      </button>

                      {ctr.status === 'pending_signature' && (
                        <button
                          onClick={() => handleApproveSignature(ctr.id)}
                          className="px-2.5 py-1 bg-amber-600 text-white hover:bg-amber-700 rounded-lg font-bold flex items-center space-x-1 cursor-pointer transition-colors shadow-2xs"
                          title="Phê duyệt & Duyệt chữ ký số Admin"
                        >
                          <FileSignature className="w-3.5 h-3.5" />
                          <span>Ký duyệt</span>
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredContracts.length === 0 && (
          <div className="p-12 text-center text-xs text-[#707a6c] space-y-2">
            <FileText className="w-8 h-8 text-[#bfcaba] mx-auto" />
            <p className="font-semibold text-[#181d16]">Không tìm thấy hợp đồng mua bán hoặc đơn hàng tương lai phù hợp</p>
            <p>Thử điều chỉnh từ khóa tìm kiếm hoặc chuyển tab filter.</p>
          </div>
        )}
      </div>

      {/* PAGINATION BAR */}
      {totalItems > 0 && (
        <div className="bg-white p-4 rounded-xl border border-[#e0e4d9] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#40493d] shadow-2xs">
          <div className="flex items-center space-x-3">
            <span>
              Hiển thị <strong>{startItemNum}</strong> - <strong>{endItemNum}</strong> trong tổng số <strong>{totalItems}</strong> hợp đồng B2B
            </span>

            <div className="flex items-center space-x-1">
              <span className="text-[#707a6c]">Hiển thị:</span>
              <select
                value={itemsPerPage}
                onChange={(e) => {
                  setItemsPerPage(Number(e.target.value));
                  setCurrentPage(1);
                }}
                className="px-2 py-1 bg-[#f7fbf0] border border-[#bfcaba] rounded-md text-[#181d16] font-semibold focus:outline-none cursor-pointer"
              >
                <option value={5}>5 / trang</option>
                <option value={10}>10 / trang</option>
                <option value={20}>20 / trang</option>
              </select>
            </div>
          </div>

          <div className="flex items-center space-x-1">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={validPage === 1}
              className={`p-1.5 rounded-lg border transition-all cursor-pointer flex items-center ${
                validPage === 1
                  ? 'border-[#e0e4d9] text-[#bfcaba] cursor-not-allowed bg-gray-50'
                  : 'border-[#bfcaba] text-[#181d16] hover:bg-[#f7fbf0]'
              }`}
              title="Trang trước"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`w-8 h-8 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  validPage === page
                    ? 'bg-[#176a22] text-white shadow-xs'
                    : 'bg-white text-[#40493d] border border-[#e0e4d9] hover:bg-[#f7fbf0]'
                }`}
              >
                {page}
              </button>
            ))}

            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={validPage === totalPages}
              className={`p-1.5 rounded-lg border transition-all cursor-pointer flex items-center ${
                validPage === totalPages
                  ? 'border-[#e0e4d9] text-[#bfcaba] cursor-not-allowed bg-gray-50'
                  : 'border-[#bfcaba] text-[#181d16] hover:bg-[#f7fbf0]'
              }`}
              title="Trang tiếp"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* MODAL 1: DETAILED CONTRACT MODAL */}
      {detailContract && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-3xl w-full border border-[#e0e4d9] p-6 shadow-xl space-y-5 animate-in fade-in zoom-in-95 max-h-[90vh] overflow-y-auto custom-scrollbar text-xs">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-[#e0e4d9] pb-3">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-xl bg-[#a3f69c]/30 text-[#003808] flex items-center justify-center font-bold">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <h3 className="text-base font-bold text-[#181d16]">Chi Tiết Hợp Đồng #{detailContract.code}</h3>
                    {getTypeBadge(detailContract.type)}
                    {getStatusBadge(detailContract.status)}
                  </div>
                  <p className="text-xs text-[#707a6c]">{detailContract.title}</p>
                </div>
              </div>

              <button
                onClick={() => setDetailContract(null)}
                className="text-[#707a6c] hover:text-[#181d16] p-1.5 rounded-lg cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* 3 Parties Overview: Buyer, Seller, Logistics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className="bg-[#f7fbf0] p-3.5 rounded-xl border border-[#e0e4d9] space-y-1.5">
                <div className="flex items-center space-x-1.5 text-[#176a22] font-bold uppercase text-[10px]">
                  <Building2 className="w-3.5 h-3.5" />
                  <span>Bên Mua (Khách Hàng)</span>
                </div>
                <p className="font-bold text-[#181d16] text-xs">{detailContract.buyerName}</p>
                <p className="text-[11px] text-[#40493d]">MST: {detailContract.buyerTaxCode}</p>
                <p className="text-[11px] text-[#707a6c]">Đại diện: {detailContract.buyerRepresentative}</p>
              </div>

              <div className="bg-[#f7fbf0] p-3.5 rounded-xl border border-[#e0e4d9] space-y-1.5">
                <div className="flex items-center space-x-1.5 text-[#176a22] font-bold uppercase text-[10px]">
                  <Users className="w-3.5 h-3.5" />
                  <span>Bên Bán (HTX / Nông Trại)</span>
                </div>
                <p className="font-bold text-[#181d16] text-xs">{detailContract.sellerName}</p>
                <p className="text-[11px] text-[#40493d]">Tổ chức: {detailContract.sellerCoop}</p>
                <p className="text-[11px] text-[#707a6c]">Đại diện: {detailContract.sellerRepresentative}</p>
              </div>

              <div className="bg-[#f7fbf0] p-3.5 rounded-xl border border-[#e0e4d9] space-y-1.5">
                <div className="flex items-center space-x-1.5 text-purple-700 font-bold uppercase text-[10px]">
                  <Truck className="w-3.5 h-3.5" />
                  <span>Đơn Vị Vận Chuyển</span>
                </div>
                <p className="font-bold text-[#181d16] text-xs">{detailContract.logisticsPartnerName}</p>
                <p className="text-[11px] text-[#40493d]">{detailContract.temperatureRequirement}</p>
                <p className="text-[11px] text-[#707a6c] line-clamp-1" title={detailContract.shippingRoute}>
                  {detailContract.shippingRoute}
                </p>
              </div>
            </div>

            {/* Financials & Deliverables */}
            <div className="bg-white p-4 rounded-xl border border-[#e0e4d9] space-y-3">
              <h4 className="font-bold text-[#181d16] flex items-center space-x-2 border-b border-[#e0e4d9] pb-2">
                <Scale className="w-4 h-4 text-[#176a22]" />
                <span>Điều Khoản Nông Sản & Bảo Chứng Escrow</span>
              </h4>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <div>
                  <span className="text-[#707a6c]">Mặt hàng giao dịch:</span>
                  <p className="font-bold text-[#181d16]">{detailContract.productName}</p>
                </div>
                <div>
                  <span className="text-[#707a6c]">Sản lượng cam kết:</span>
                  <p className="font-bold text-[#181d16]">{detailContract.volume}</p>
                </div>
                <div>
                  <span className="text-[#707a6c]">Đơn giá thỏa thuận:</span>
                  <p className="font-bold text-[#181d16]">{detailContract.agreedPrice}</p>
                </div>
                <div>
                  <span className="text-[#707a6c]">Tổng giá trị hợp đồng:</span>
                  <p className="font-bold text-[#176a22] text-sm">{formatVND(detailContract.totalValue)}</p>
                </div>
                <div>
                  <span className="text-[#707a6c]">Đặt cọc Escrow:</span>
                  <p className="font-bold text-[#181d16]">
                    {detailContract.escrowDepositPercent}% ({formatVND(detailContract.escrowAmount)})
                  </p>
                </div>
                <div>
                  <span className="text-[#707a6c]">Thời gian giao thu hoạch:</span>
                  <p className="font-bold text-indigo-900">{detailContract.expectedDeliveryDate}</p>
                </div>
              </div>

              <div className="p-3 bg-[#f7fbf0] rounded-xl border border-[#e0e4d9] space-y-1">
                <span className="font-bold text-[#181d16]">Tóm tắt điều khoản hợp đồng & Chạt chất lượng:</span>
                <p className="text-[#40493d] leading-relaxed">{detailContract.clauseSummary}</p>
              </div>
            </div>

            {/* Digital Signature Security Verification */}
            <div className="bg-emerald-50 p-4 rounded-xl border border-emerald-200 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-[#176a22] flex items-center space-x-1.5">
                  <Lock className="w-4 h-4" />
                  <span>Xác Thực Chữ Ký Số & Mã Mã Hóa SmartCA / Blockchain Hash</span>
                </span>
                <span className="text-[10px] bg-emerald-200 text-[#003808] font-mono px-2 py-0.5 rounded font-bold">
                  AgriConnect Verified
                </span>
              </div>
              <p className="font-mono text-[#181d16] text-[11px] bg-white p-2 rounded border border-emerald-200 select-all">
                {detailContract.digitalSignatureHash}
              </p>
            </div>

            {/* Footer Admin Action */}
            <div className="pt-3 border-t border-[#e0e4d9] flex items-center justify-between">
              <button
                type="button"
                onClick={() => setDetailContract(null)}
                className="px-4 py-2 bg-[#e0e4d9] text-[#40493d] rounded-xl font-bold cursor-pointer hover:bg-[#d0d4c9]"
              >
                Đóng
              </button>

              <div className="flex items-center space-x-2">
                {detailContract.status === 'pending_signature' && (
                  <button
                    onClick={() => handleApproveSignature(detailContract.id)}
                    className="px-4 py-2 bg-amber-600 text-white rounded-xl font-bold cursor-pointer hover:bg-amber-700 shadow-xs flex items-center space-x-1.5"
                  >
                    <FileSignature className="w-4 h-4" />
                    <span>Xác Nhận Ký Số Admin</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 2: CREATE NEW CONTRACT MODAL */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full border border-[#e0e4d9] p-6 shadow-xl space-y-4 animate-in fade-in zoom-in-95 text-xs max-h-[90vh] overflow-y-auto custom-scrollbar">
            <div className="flex items-center justify-between border-b border-[#e0e4d9] pb-3">
              <h3 className="text-base font-bold text-[#181d16] flex items-center space-x-2">
                <FileText className="w-5 h-5 text-[#176a22]" />
                <span>Soạn Thảo Hợp Đồng Tương Lai / Mua Bán</span>
              </h3>
              <button
                onClick={() => setShowCreateModal(false)}
                className="text-[#707a6c] hover:text-[#181d16] p-1 rounded-lg cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateContractSubmit} className="space-y-3">
              <div>
                <label className="block font-bold text-[#181d16] mb-1">
                  Tên / Tờ Trình Hợp Đồng <span className="text-[#ba1a1a]">*</span>:
                </label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="Ví dụ: Hợp Đồng Tương Lai Bao Tiêu Thanh Long Thu Vụ Q4/2026..."
                  className="w-full p-2.5 bg-[#f7fbf0] border border-[#bfcaba] rounded-xl text-[#181d16] font-medium focus:outline-none focus:ring-2 focus:ring-[#176a22]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-[#181d16] mb-1">Loại Hình Hợp Đồng:</label>
                  <select
                    value={newType}
                    onChange={(e) => setNewType(e.target.value as any)}
                    className="w-full p-2.5 bg-[#f7fbf0] border border-[#bfcaba] rounded-xl text-[#181d16] font-semibold focus:outline-none cursor-pointer"
                  >
                    <option value="futures">Đơn Hàng Tương Lai (Futures)</option>
                    <option value="forward">Bao Tiêu Mùa Vụ (Forward)</option>
                    <option value="spot">Mua Bán Giao Ngay (Spot)</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-[#181d16] mb-1">% Cọc Escrow Tạm Giữ:</label>
                  <select
                    value={newEscrowPercent}
                    onChange={(e) => setNewEscrowPercent(Number(e.target.value))}
                    className="w-full p-2.5 bg-[#f7fbf0] border border-[#bfcaba] rounded-xl text-[#181d16] font-semibold focus:outline-none cursor-pointer"
                  >
                    <option value={20}>20% (Tiêu chuẩn Bao Tiêu)</option>
                    <option value={30}>30% (Tiêu chuẩn Tương Lai)</option>
                    <option value={50}>50% (Đơn Hàng Lớn)</option>
                    <option value={100}>100% (Giao Ngay Spot)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold text-[#181d16] mb-1">
                  Bên Mua (Doanh Nghiệp / Siêu Thị) <span className="text-[#ba1a1a]">*</span>:
                </label>
                <input
                  type="text"
                  required
                  value={newBuyer}
                  onChange={(e) => setNewBuyer(e.target.value)}
                  placeholder="Tên doanh nghiệp mua hàng..."
                  className="w-full p-2.5 bg-[#f7fbf0] border border-[#bfcaba] rounded-xl text-[#181d16] font-medium focus:outline-none focus:ring-2 focus:ring-[#176a22]"
                />
              </div>

              <div>
                <label className="block font-bold text-[#181d16] mb-1">
                  Bên Bán (HTX / Nông Trường) <span className="text-[#ba1a1a]">*</span>:
                </label>
                <input
                  type="text"
                  required
                  value={newSeller}
                  onChange={(e) => setNewSeller(e.target.value)}
                  placeholder="Tên hợp tác xã hoặc nông trại bán..."
                  className="w-full p-2.5 bg-[#f7fbf0] border border-[#bfcaba] rounded-xl text-[#181d16] font-medium focus:outline-none focus:ring-2 focus:ring-[#176a22]"
                />
              </div>

              <div>
                <label className="block font-bold text-[#181d16] mb-1">Đơn Vị Vận Chuyển Chuỗi Lạnh:</label>
                <select
                  value={newLogistics}
                  onChange={(e) => setNewLogistics(e.target.value)}
                  className="w-full p-2.5 bg-[#f7fbf0] border border-[#bfcaba] rounded-xl text-[#181d16] font-semibold focus:outline-none cursor-pointer"
                >
                  <option value="Chuỗi Lạnh Tây Nguyên Logistics">Chuỗi Lạnh Tây Nguyên Logistics</option>
                  <option value="Vận Tải Lạnh Phía Nam Express">Vận Tải Lạnh Phía Nam Express</option>
                  <option value="Viettel Post Cold Chain Logistics">Viettel Post Cold Chain Logistics</option>
                  <option value="Vận Tải Sông Biển Mekong Fleet">Vận Tải Sông Biển Mekong Fleet</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-[#181d16] mb-1">Mặt Hàng Nông Sản:</label>
                  <input
                    type="text"
                    required
                    value={newProduct}
                    onChange={(e) => setNewProduct(e.target.value)}
                    placeholder="Sầu riêng, Lúa gạo, Cà phê..."
                    className="w-full p-2.5 bg-[#f7fbf0] border border-[#bfcaba] rounded-xl text-[#181d16] font-medium focus:outline-none focus:ring-2 focus:ring-[#176a22]"
                  />
                </div>

                <div>
                  <label className="block font-bold text-[#181d16] mb-1">Sản Lượng Cam Kết:</label>
                  <input
                    type="text"
                    required
                    value={newVolume}
                    onChange={(e) => setNewVolume(e.target.value)}
                    placeholder="100 Tấn..."
                    className="w-full p-2.5 bg-[#f7fbf0] border border-[#bfcaba] rounded-xl text-[#181d16] font-medium focus:outline-none focus:ring-2 focus:ring-[#176a22]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-[#181d16] mb-1">Đơn Giá Thỏa Thuận:</label>
                  <input
                    type="text"
                    required
                    value={newAgreedPrice}
                    onChange={(e) => setNewAgreedPrice(e.target.value)}
                    placeholder="85,000 đ/kg"
                    className="w-full p-2.5 bg-[#f7fbf0] border border-[#bfcaba] rounded-xl text-[#181d16] font-medium focus:outline-none focus:ring-2 focus:ring-[#176a22]"
                  />
                </div>

                <div>
                  <label className="block font-bold text-[#181d16] mb-1">Tổng Giá Trị (VNĐ):</label>
                  <input
                    type="text"
                    required
                    value={newTotalValue}
                    onChange={(e) => setNewTotalValue(e.target.value)}
                    placeholder="2500000000"
                    className="w-full p-2.5 bg-[#f7fbf0] border border-[#bfcaba] rounded-xl text-[#181d16] font-medium focus:outline-none focus:ring-2 focus:ring-[#176a22]"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-[#181d16] mb-1">Ngày / Đợt Thu Hoạch Giao Tương Lai:</label>
                <input
                  type="text"
                  required
                  value={newExpectedDelivery}
                  onChange={(e) => setNewExpectedDelivery(e.target.value)}
                  placeholder="2026-10-15 (Thu Hoạch Đợt 2)"
                  className="w-full p-2.5 bg-[#f7fbf0] border border-[#bfcaba] rounded-xl text-[#181d16] font-medium focus:outline-none focus:ring-2 focus:ring-[#176a22]"
                />
              </div>

              <div className="pt-3 border-t border-[#e0e4d9] flex items-center justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 bg-[#e0e4d9] text-[#40493d] rounded-xl font-bold cursor-pointer hover:bg-[#d0d4c9]"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#176a22] text-white rounded-xl font-bold cursor-pointer hover:bg-[#13561b] shadow-xs flex items-center space-x-1.5"
                >
                  <FileSignature className="w-4 h-4" />
                  <span>Khởi Tạo Hợp Đồng</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
