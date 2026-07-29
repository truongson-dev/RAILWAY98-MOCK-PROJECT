import React, { useState } from 'react';
import { 
  Download, 
  Filter, 
  MapPin, 
  Package, 
  Calendar, 
  Fuel, 
  CheckCircle2, 
  Search, 
  X, 
  FileText, 
  FileSpreadsheet, 
  Check, 
  ChevronDown,
  Star,
  Clock,
  TrendingUp,
  Award
} from 'lucide-react';
import { OrderItem } from './types';

interface HistoryViewProps {
  orders: OrderItem[];
}

export interface DetailedHistoryItem {
  id: string;
  orderCode: string;
  driverName: string;
  driverAvatar: string;
  vehiclePlate: string;
  origin: string;
  destination: string;
  routeName: string;
  productType: string;
  weight: string;
  startDate: string;
  endDate: string;
  totalDuration: string;
  fuelCost: string;
  fuelNorm: string;
  status: 'completed';
}

const DEFAULT_HISTORY_ITEMS: DetailedHistoryItem[] = [
  {
    id: '1',
    orderCode: '#ORD-98770',
    driverName: 'Nguyễn Huệ',
    driverAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    vehiclePlate: '63H-882.34',
    origin: 'Bãi đỗ Huế',
    destination: 'Bãi đỗ Quy Nhơn',
    routeName: 'Đèo Hải Vân - QL1A',
    productType: 'Thủy hải sản đông lạnh',
    weight: '2.8 Tấn',
    startDate: '31/07/2026',
    endDate: '31/07/2026',
    totalDuration: '8 giờ 45 phút',
    fuelCost: '980.000 VNĐ',
    fuelNorm: '11L/100km',
    status: 'completed',
  },
  {
    id: '2',
    orderCode: '#ORD-98760',
    driverName: 'Phan Trần D',
    driverAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    vehiclePlate: '50E-111.90',
    origin: 'Bãi đỗ Quy Nhơn',
    destination: 'Bãi đỗ Huế',
    routeName: 'QL1A',
    productType: 'Cà phê hạt',
    weight: '2.5 Tấn',
    startDate: '31/07/2026',
    endDate: '31/07/2026',
    totalDuration: '6 giờ 30 phút',
    fuelCost: '850.000 VNĐ',
    fuelNorm: '11L/100km',
    status: 'completed',
  },
  {
    id: '3',
    orderCode: '#ORD-28765',
    driverName: 'Lê Duẩn',
    driverAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    vehiclePlate: '51C-287.65',
    origin: 'Bãi đỗ Quảng Trị',
    destination: 'Bãi đỗ Đà Nẵng',
    routeName: 'QL1A',
    productType: 'Hải sản tươi sống',
    weight: '1.5 Tấn',
    startDate: '14/07/2026',
    endDate: '14/07/2026',
    totalDuration: '3 giờ 45 phút',
    fuelCost: '450.000 VNĐ',
    fuelNorm: '10L/100km',
    status: 'completed',
  },
  {
    id: '4',
    orderCode: '#ORD-00592',
    driverName: 'Lê Văn S',
    driverAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80',
    vehiclePlate: '51D-005.92',
    origin: 'Bãi đỗ Gia Lâm',
    destination: 'Cảng Hải Phòng',
    routeName: 'QL5B - Cao tốc',
    productType: 'Gạo ST25',
    weight: '5.0 Tấn',
    startDate: '10/07/2026',
    endDate: '11/07/2026',
    totalDuration: '12 giờ 00 phút',
    fuelCost: '1.500.000 VNĐ',
    fuelNorm: '13L/100km',
    status: 'completed',
  },
  {
    id: '5',
    orderCode: '#ORD-11190',
    driverName: 'Phạm Văn D',
    driverAvatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80',
    vehiclePlate: 'UV-1122-WQ',
    origin: 'Bãi đỗ Gia Lâm',
    destination: 'Bãi đỗ Đà Nẵng',
    routeName: 'QL1A - Đường tránh Huế',
    productType: 'Trái cây xuất khẩu',
    weight: '3.2 Tấn',
    startDate: '07/07/2026',
    endDate: '08/07/2026',
    totalDuration: '22 giờ 15 phút',
    fuelCost: '2.450.000 VNĐ',
    fuelNorm: '14L/100km',
    status: 'completed',
  },
  {
    id: '6',
    orderCode: '#ORD-88234',
    driverName: 'Lê Văn A',
    driverAvatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80',
    vehiclePlate: '60C-224.11',
    origin: 'Bãi đỗ Bắc Ninh',
    destination: 'Cảng Hải Phòng',
    routeName: 'QL5B - Cao tốc Hà Nội - Hải Phòng',
    productType: 'Nông sản sạch (Rau củ)',
    weight: '4.5 Tấn',
    startDate: '05/07/2026',
    endDate: '06/07/2026',
    totalDuration: '18 giờ 30 phút',
    fuelCost: '1.200.000 VNĐ',
    fuelNorm: '12L/100km',
    status: 'completed',
  },
  {
    id: '7',
    orderCode: '#ORD-95765',
    driverName: 'Trần Thái Tông',
    driverAvatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80',
    vehiclePlate: '51C-957.65',
    origin: 'Bãi đỗ Nam Định',
    destination: 'Bãi đỗ Bắc Ninh',
    routeName: 'QL10',
    productType: 'Thịt gà',
    weight: '8.0 Tấn',
    startDate: '01/07/2026',
    endDate: '01/07/2026',
    totalDuration: '4 giờ 15 phút',
    fuelCost: '600.000 VNĐ',
    fuelNorm: '15L/100km',
    status: 'completed',
  },
];

export const HistoryView: React.FC<HistoryViewProps> = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTimeRange, setSelectedTimeRange] = useState('Tất cả thời gian');
  const [showFilterBar, setShowFilterBar] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);

  // Export Modal state
  const [exportFileType, setExportFileType] = useState<'pdf' | 'excel'>('pdf');
  const [exportTimeRange, setExportTimeRange] = useState('7 ngày qua');
  const [exportDataIncludes, setExportDataIncludes] = useState({
    shipmentInfo: true,
    fuelCost: true,
    time: false,
    goods: true,
  });
  const [downloadToast, setDownloadToast] = useState(false);

  // Helper function to parse "DD/MM/YYYY"
  const parseDateStr = (str: string) => {
    const [d, m, y] = str.split('/').map(Number);
    return new Date(y, m - 1, d);
  };

  // Filter items
  const filteredItems = DEFAULT_HISTORY_ITEMS.filter((item) => {
    const term = searchTerm.toLowerCase();
    const matchesSearch =
      item.driverName.toLowerCase().includes(term) ||
      item.orderCode.toLowerCase().includes(term) ||
      item.vehiclePlate.toLowerCase().includes(term) ||
      item.productType.toLowerCase().includes(term) ||
      item.origin.toLowerCase().includes(term) ||
      item.destination.toLowerCase().includes(term);

    if (!matchesSearch) return false;

    if (selectedTimeRange === 'Tất cả thời gian') return true;

    const itemDate = parseDateStr(item.endDate || item.startDate);
    // Reference date is 31/07/2026
    const refDate = new Date(2026, 6, 31); // Month is 0-indexed: 6 = July

    if (selectedTimeRange === 'Hôm nay (31/07/2026)' || selectedTimeRange === '31/07/2026') {
      return (
        itemDate.getDate() === 31 &&
        itemDate.getMonth() === 6 &&
        itemDate.getFullYear() === 2026
      );
    }

    if (selectedTimeRange === '7 ngày qua') {
      // 7 days back from 31/07/2026 is 25/07/2026
      const minDate = new Date(2026, 6, 25);
      return itemDate >= minDate && itemDate <= refDate;
    }

    if (selectedTimeRange === '30 ngày qua') {
      // 30 days back from 31/07/2026
      const minDate = new Date(2026, 6, 1);
      return itemDate >= minDate && itemDate <= refDate;
    }

    if (selectedTimeRange === 'Tháng này') {
      return itemDate.getMonth() === 6 && itemDate.getFullYear() === 2026;
    }

    return true;
  });

  const handleDownloadReport = () => {
    setDownloadToast(true);
    setTimeout(() => {
      setDownloadToast(false);
      setShowExportModal(false);
    }, 1500);
  };

  return (
    <div className="space-y-6">
      {/* 1. Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-[#181d16]">Lịch sử giao hàng hoàn tất</h2>
          <p className="text-sm text-[#40493d] mt-0.5">
            Danh sách chi tiết các chuyến hàng đã vận chuyển thành công trong hệ thống.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* Lọc dữ liệu */}
          <button
            onClick={() => setShowFilterBar(!showFilterBar)}
            className={`px-4 py-2 border rounded-lg font-bold text-sm transition-colors flex items-center gap-2 cursor-pointer shadow-2xs ${
              showFilterBar
                ? 'bg-[#176a22] text-white border-[#176a22]'
                : 'bg-white border-[#bfcaba] text-[#181d16] hover:bg-[#f1f5ea]'
            }`}
          >
            <Filter className="w-4 h-4" />
            Lọc dữ liệu
          </button>

          {/* Xuất báo cáo */}
          <button
            onClick={() => setShowExportModal(true)}
            className="px-4 py-2 bg-[#176a22] hover:bg-[#12541a] text-white rounded-lg font-bold text-sm transition-colors flex items-center gap-2 cursor-pointer shadow-2xs"
          >
            <Download className="w-4 h-4" />
            Xuất báo cáo
          </button>
        </div>
      </div>

      {/* Filter Bar (Collapsible) */}
      {showFilterBar && (
        <div className="bg-white border border-[#bfcaba] p-4 rounded-2xl shadow-2xs space-y-3 animate-fadeIn">
          <div className="flex flex-col sm:flex-row gap-3 items-center">
            <div className="relative flex-1 w-full">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#707a6c]" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Tìm kiếm theo tên tài xế, mã đơn, biển số xe, hàng hóa..."
                className="w-full pl-9 pr-4 py-2 text-sm border border-[#bfcaba] rounded-xl outline-none focus:border-[#176a22] bg-white"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#707a6c] hover:text-[#181d16]"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <span className="text-xs font-bold text-[#40493d] whitespace-nowrap">Thời gian:</span>
              <select
                value={selectedTimeRange}
                onChange={(e) => setSelectedTimeRange(e.target.value)}
                className="px-3 py-2 text-xs border border-[#bfcaba] rounded-xl bg-white outline-none focus:border-[#176a22] cursor-pointer"
              >
                <option value="Tất cả thời gian">Tất cả thời gian</option>
                <option value="Hôm nay (31/07/2026)">Hôm nay (31/07/2026)</option>
                <option value="7 ngày qua">7 ngày qua (25/07 - 31/07)</option>
                <option value="30 ngày qua">30 ngày qua (01/07 - 31/07)</option>
                <option value="Tháng này">Tháng này (07/2026)</option>
              </select>
            </div>
          </div>
        </div>
      )}

      {/* 2. Thống kê tổng quan */}
      <div>
        <h3 className="text-xs font-bold text-[#40493d] uppercase tracking-wider mb-2.5">
          THỐNG KÊ TỔNG QUAN LỊCH SỬ GIAO HÀNG ({selectedTimeRange})
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* Stat 1 */}
          <div className="bg-white border border-[#bfcaba] p-5 rounded-2xl shadow-2xs">
            <div className="flex justify-between items-start mb-2">
              <span className="text-xs font-bold text-[#40493d] uppercase tracking-wider">
                Tổng chuyến hoàn thành
              </span>
              <div className="w-8 h-8 rounded-full bg-[#e6f4ea] text-[#176a22] flex items-center justify-center">
                <CheckCircle2 className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl font-black text-[#181d16]">
              {filteredItems.length} Chuyến
            </div>
            <p className="text-xs text-emerald-700 font-semibold mt-1 flex items-center gap-1">
              <TrendingUp className="w-3.5 h-3.5" /> 100% đúng tiến độ cam kết
            </p>
          </div>

          {/* Stat 2 */}
          <div className="bg-white border border-[#bfcaba] p-5 rounded-2xl shadow-2xs">
            <div className="flex justify-between items-start mb-2">
              <span className="text-xs font-bold text-[#40493d] uppercase tracking-wider">
                Tổng chi phí nhiên liệu
              </span>
              <div className="w-8 h-8 rounded-full bg-[#e6f4ea] text-[#176a22] flex items-center justify-center">
                <Fuel className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl font-black text-[#176a22]">
              {(
                filteredItems.reduce((sum, item) => {
                  const num = parseInt(item.fuelCost.replace(/\D/g, ''), 10) || 0;
                  return sum + num;
                }, 0)
              ).toLocaleString('vi-VN')}{' '}
              VNĐ
            </div>
            <p className="text-xs text-[#40493d] mt-1">Định mức trung bình: 12.1L/100km</p>
          </div>

          {/* Stat 3 */}
          <div className="bg-white border border-[#bfcaba] p-5 rounded-2xl shadow-2xs">
            <div className="flex justify-between items-start mb-2">
              <span className="text-xs font-bold text-[#40493d] uppercase tracking-wider">
                Đánh giá chất lượng vận chuyển
              </span>
              <div className="w-8 h-8 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center">
                <Award className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl font-black text-[#181d16] flex items-center gap-2">
              4.9 / 5.0
              <span className="flex text-amber-400">
                <Star className="w-5 h-5 fill-amber-400" />
              </span>
            </div>
            <p className="text-xs text-[#40493d] mt-1">Đánh giá từ các nhà vườn & đại lý đối tác</p>
          </div>
        </div>
      </div>

      {/* 3. Delivery History List (Detail Cards) */}
      <div className="space-y-4">
        {filteredItems.length === 0 ? (
          <div className="bg-white border border-[#bfcaba] rounded-2xl p-8 text-center text-[#40493d]">
            Không tìm thấy chuyến hàng hoàn tất nào phù hợp với từ khóa "{searchTerm}".
          </div>
        ) : (
          filteredItems.map((item) => (
            <div
              key={item.id}
              className="bg-white border border-[#bfcaba]/80 rounded-2xl p-5 shadow-2xs hover:shadow-md transition-all space-y-4"
            >
              {/* Card Top Header Row */}
              <div className="flex items-center justify-between border-b border-[#bfcaba]/40 pb-3">
                <div className="flex items-center gap-3">
                  <img
                    src={item.driverAvatar}
                    alt={item.driverName}
                    className="w-11 h-11 rounded-full object-cover border border-[#bfcaba]"
                  />
                  <div>
                    <h3 className="font-bold text-base text-[#181d16]">{item.driverName}</h3>
                    <p className="text-xs text-[#40493d] font-mono">BSX: {item.vehiclePlate}</p>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-sm font-extrabold text-[#176a22] font-mono">{item.orderCode}</span>
                  <div className="flex items-center gap-1 text-emerald-700 text-xs font-bold uppercase mt-0.5">
                    <CheckCircle2 className="w-4 h-4 fill-emerald-600 text-white" />
                    ĐÃ HOÀN THÀNH
                  </div>
                </div>
              </div>

              {/* Card 4-Column Grid Data */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
                {/* Col 1: LỘ TRÌNH */}
                <div className="space-y-1.5">
                  <div className="flex items-center gap-1.5 text-[#40493d] font-bold uppercase tracking-wider text-[11px]">
                    <MapPin className="w-3.5 h-3.5 text-[#176a22]" />
                    LỘ TRÌNH
                  </div>
                  <p className="font-semibold text-sm text-[#181d16]">
                    {item.origin} <span className="text-[#707a6c] mx-1">→</span> {item.destination}
                  </p>
                  <p className="text-[#40493d] text-[11px]">Tuyến đường: {item.routeName}</p>
                </div>

                {/* Col 2: HÀNG HÓA */}
                <div className="space-y-1.5">
                  <div className="flex items-center gap-1.5 text-[#40493d] font-bold uppercase tracking-wider text-[11px]">
                    <Package className="w-3.5 h-3.5 text-[#176a22]" />
                    HÀNG HÓA
                  </div>
                  <p className="font-semibold text-sm text-[#181d16]">{item.productType}</p>
                  <p className="text-[#40493d] text-[11px]">Trọng lượng: {item.weight}</p>
                </div>

                {/* Col 3: THỜI GIAN */}
                <div className="space-y-1.5">
                  <div className="flex items-center gap-1.5 text-[#40493d] font-bold uppercase tracking-wider text-[11px]">
                    <Calendar className="w-3.5 h-3.5 text-[#176a22]" />
                    THỜI GIAN
                  </div>
                  <p className="font-semibold text-sm text-[#181d16]">
                    {item.startDate} - {item.endDate}
                  </p>
                  <p className="text-[#40493d] text-[11px]">Tổng thời gian: {item.totalDuration}</p>
                </div>

                {/* Col 4: CHI PHÍ XĂNG */}
                <div className="space-y-1.5">
                  <div className="flex items-center gap-1.5 text-[#40493d] font-bold uppercase tracking-wider text-[11px]">
                    <Fuel className="w-3.5 h-3.5 text-[#176a22]" />
                    CHI PHÍ XĂNG
                  </div>
                  <p className="font-bold text-sm text-[#176a22]">{item.fuelCost}</p>
                  <p className="text-[#40493d] text-[11px]">Định mức: {item.fuelNorm}</p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Export Report Modal ("Xuất báo cáo giao hàng") */}
      {showExportModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
          <div className="w-full max-w-md bg-white border border-[#bfcaba] rounded-3xl shadow-2xl p-6 relative space-y-5">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-[#e2e8da] pb-3">
              <h3 className="font-extrabold text-base text-[#181d16]">Xuất báo cáo giao hàng</h3>
              <button
                onClick={() => setShowExportModal(false)}
                className="p-1 text-[#707a6c] hover:text-[#181d16] hover:bg-stone-100 rounded-full cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Form Section 1: Định dạng tệp */}
            <div className="space-y-2">
              <div className="text-xs font-bold text-[#181d16]">
                <span>Định dạng tệp</span>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {/* PDF */}
                <button
                  type="button"
                  onClick={() => setExportFileType('pdf')}
                  className={`p-3 rounded-2xl border flex flex-col items-center justify-center gap-2 transition-all cursor-pointer relative ${
                    exportFileType === 'pdf'
                      ? 'border-[#176a22] bg-[#f1f8f3] text-[#176a22]'
                      : 'border-[#bfcaba] bg-white text-[#40493d] hover:bg-[#f8fbf5]'
                  }`}
                >
                  {exportFileType === 'pdf' && (
                    <span className="absolute top-2 right-2 w-4 h-4 rounded-full bg-[#176a22] text-white flex items-center justify-center text-[10px]">
                      <Check className="w-3 h-3" />
                    </span>
                  )}
                  <FileText className="w-6 h-6 text-[#176a22]" />
                  <span className="text-xs font-bold">Tài liệu PDF</span>
                </button>

                {/* Excel */}
                <button
                  type="button"
                  onClick={() => setExportFileType('excel')}
                  className={`p-3 rounded-2xl border flex flex-col items-center justify-center gap-2 transition-all cursor-pointer relative ${
                    exportFileType === 'excel'
                      ? 'border-[#176a22] bg-[#f1f8f3] text-[#176a22]'
                      : 'border-[#bfcaba] bg-white text-[#40493d] hover:bg-[#f8fbf5]'
                  }`}
                >
                  {exportFileType === 'excel' && (
                    <span className="absolute top-2 right-2 w-4 h-4 rounded-full bg-[#176a22] text-white flex items-center justify-center text-[10px]">
                      <Check className="w-3 h-3" />
                    </span>
                  )}
                  <FileSpreadsheet className="w-6 h-6 text-[#176a22]" />
                  <span className="text-xs font-bold">Bảng tính Excel</span>
                </button>
              </div>
            </div>

            {/* Form Section 2: Phạm vi thời gian */}
            <div className="space-y-1.5">
              <div className="text-xs font-bold text-[#181d16]">
                <span>Phạm vi thời gian</span>
              </div>
              <div className="relative">
                <select
                  value={exportTimeRange}
                  onChange={(e) => setExportTimeRange(e.target.value)}
                  className="w-full px-3 py-2.5 bg-[#f7fbf0] border border-[#bfcaba] rounded-xl text-xs font-semibold text-[#181d16] outline-none focus:border-[#176a22] appearance-none cursor-pointer pr-8"
                >
                  <option>7 ngày qua</option>
                  <option>30 ngày qua</option>
                  <option>Tháng này</option>
                  <option>Quý này</option>
                  <option>Tất cả thời gian</option>
                </select>
                <ChevronDown className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-[#707a6c] pointer-events-none" />
              </div>
            </div>

            {/* Form Section 3: Dữ liệu bao gồm */}
            <div className="space-y-2">
              <div className="text-xs font-bold text-[#181d16]">
                <span>Dữ liệu bao gồm</span>
              </div>
              <div className="space-y-2 text-xs font-medium text-[#181d16]">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={exportDataIncludes.shipmentInfo}
                    onChange={(e) =>
                      setExportDataIncludes({ ...exportDataIncludes, shipmentInfo: e.target.checked })
                    }
                    className="w-4 h-4 rounded text-[#176a22] focus:ring-[#176a22] cursor-pointer"
                  />
                  <span>Thông tin chuyến hàng</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={exportDataIncludes.fuelCost}
                    onChange={(e) =>
                      setExportDataIncludes({ ...exportDataIncludes, fuelCost: e.target.checked })
                    }
                    className="w-4 h-4 rounded text-[#176a22] focus:ring-[#176a22] cursor-pointer"
                  />
                  <span>Chi phí xăng</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={exportDataIncludes.time}
                    onChange={(e) =>
                      setExportDataIncludes({ ...exportDataIncludes, time: e.target.checked })
                    }
                    className="w-4 h-4 rounded text-[#176a22] focus:ring-[#176a22] cursor-pointer"
                  />
                  <span>Thời gian</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={exportDataIncludes.goods}
                    onChange={(e) =>
                      setExportDataIncludes({ ...exportDataIncludes, goods: e.target.checked })
                    }
                    className="w-4 h-4 rounded text-[#176a22] focus:ring-[#176a22] cursor-pointer"
                  />
                  <span>Hàng hóa</span>
                </label>
              </div>
            </div>

            {/* Download Toast Notification */}
            {downloadToast && (
              <div className="p-3 bg-emerald-100 border border-emerald-300 text-emerald-800 rounded-xl text-xs font-bold text-center flex items-center justify-center gap-2 animate-fadeIn">
                <Check className="w-4 h-4" /> Báo cáo đã được tạo và đang tải xuống...
              </div>
            )}

            {/* Modal Footer Action Buttons */}
            <div className="flex items-center justify-end gap-3 pt-2 border-t border-[#e2e8da]">
              <button
                type="button"
                onClick={() => setShowExportModal(false)}
                className="px-4 py-2 border border-[#bfcaba] text-[#40493d] rounded-xl text-xs font-bold hover:bg-stone-100 cursor-pointer transition-colors"
              >
                Hủy bỏ
              </button>
              <button
                type="button"
                onClick={handleDownloadReport}
                className="px-4 py-2 bg-[#176a22] hover:bg-[#12541a] text-white rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-xs transition-colors"
              >
                <Download className="w-3.5 h-3.5" /> Tải xuống báo cáo
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
