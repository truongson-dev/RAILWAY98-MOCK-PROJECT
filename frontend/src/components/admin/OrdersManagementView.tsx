'use client';
// Đây là component thuộc giao diện Admin
import React, { useState, useMemo } from 'react';
import {
  ShoppingCart,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  AlertTriangle,
  Truck,
  ShieldCheck,
  DollarSign,
  FileText,
  Eye,
  ChevronLeft,
  ChevronRight,
  X,
  Plus,
  ArrowUpRight,
  Building2,
  Package,
  Calendar,
  UserCheck,
  RefreshCw,
  Download,
  AlertCircle,
  Check,
  Ban,
  FileSpreadsheet
} from 'lucide-react';

export interface OrderItem {
  id: string;
  code: string;
  createdAt: string;
  buyerName: string;
  buyerTaxCode: string;
  buyerType: 'Doanh nghiệp XNK' | 'Chuỗi siêu thị' | 'Nhà chế biến' | 'Đại lý phân phối';
  supplierName: string;
  supplierCoop: string;
  productName: string;
  category: string;
  volume: string; // e.g., '50 Tấn'
  unitPrice: string; // e.g., '85,000đ/kg'
  totalValue: number; // in VNĐ
  escrowDeposit: number; // in VNĐ
  escrowPercent: number; // e.g. 100 or 30
  status:
    | 'pending_escrow'
    | 'quality_audit'
    | 'shipping'
    | 'delivered'
    | 'completed'
    | 'disputed'
    | 'cancelled';
  qualityCertificate: string; // e.g., 'VietGAP #VG-9912'
  shippingPartner: string; // e.g., 'Logistics Phía Nam - Xe Lạnh #51C-882.11'
  deliveryDate: string;
  disputeReason?: string;
  paymentMethod: 'Escrow Ngân hàng' | 'Thư tín dụng L/C' | 'Thanh toán bảo chứng';
}

const INITIAL_ORDERS: OrderItem[] = [
  {
    id: 'ord-101',
    code: 'DH-8801',
    createdAt: '2026-07-22 14:30',
    buyerName: 'EuroAgri Import GmbH',
    buyerTaxCode: 'DE-81293841',
    buyerType: 'Doanh nghiệp XNK',
    supplierName: 'HTX Sầu Riêng Krông Pắc',
    supplierCoop: 'HTX Nông Nghiệp Đắk Lắk',
    productName: 'Sầu Riêng Ri6 Xuất Khẩu Loại A',
    category: 'Trái Cây Xuất Khẩu',
    volume: '50 Tấn',
    unitPrice: '85,000đ/kg',
    totalValue: 4250000000, // 4.25 tỷ
    escrowDeposit: 4250000000,
    escrowPercent: 100,
    status: 'quality_audit',
    qualityCertificate: 'GlobalGAP #GG-8821 (Đạt 100%)',
    shippingPartner: 'Chuỗi Lạnh Tây Nguyên - Cont 40ft',
    deliveryDate: '2026-07-28',
    paymentMethod: 'Escrow Ngân hàng'
  },
  {
    id: 'ord-102',
    code: 'DH-8802',
    createdAt: '2026-07-21 09:15',
    buyerName: 'Tập Đoàn Bán Lẻ WinMart',
    buyerTaxCode: '0101234567',
    buyerType: 'Chuỗi siêu thị',
    supplierName: 'Nông trại Sen Vàng',
    supplierCoop: 'HTX Rau Củ Hữu Cơ Đà Lạt',
    productName: 'Dâu Tây Organic & Dưa Lưới Huỳnh Long',
    category: 'Rau Củ Ôn Đới Đà Lạt',
    volume: '15 Tấn',
    unitPrice: '120,000đ/kg',
    totalValue: 1800000000, // 1.8 tỷ
    escrowDeposit: 1800000000,
    escrowPercent: 100,
    status: 'shipping',
    qualityCertificate: 'Organic USDA & VietGAP',
    shippingPartner: 'Vận Tải Lạnh Phía Nam - 51C-902.11',
    deliveryDate: '2026-07-24',
    paymentMethod: 'Escrow Ngân hàng'
  },
  {
    id: 'ord-103',
    code: 'DH-8803',
    createdAt: '2026-07-20 16:45',
    buyerName: 'Singapore Agro Trading Pte',
    buyerTaxCode: 'SG-2019381M',
    buyerType: 'Doanh nghiệp XNK',
    supplierName: 'Mekong Rice Export Co.',
    supplierCoop: 'HTX Lúa Gạo Thoại Sơn An Giang',
    productName: 'Lúa Gạo ST25 Thượng Hạng',
    category: 'Lúa Gạo & Lương Thực',
    volume: '500 Tấn',
    unitPrice: '26,000đ/kg',
    totalValue: 13000000000, // 13 tỷ
    escrowDeposit: 3900000000, // 30% cọc
    escrowPercent: 30,
    status: 'completed',
    qualityCertificate: 'ISO 22000 & HACCP Export',
    shippingPartner: 'Tàu Vận Tải Sông Biển Mekong',
    deliveryDate: '2026-07-22',
    paymentMethod: 'Thư tín dụng L/C'
  },
  {
    id: 'ord-104',
    code: 'DH-8804',
    createdAt: '2026-07-19 11:20',
    buyerName: 'Công ty Cổ Phần Lương Thực Miền Nam',
    buyerTaxCode: '0300998877',
    buyerType: 'Nhà chế biến',
    supplierName: 'Nông Trường Cà Phê Chư Sê',
    supplierCoop: 'Liên Minh Hợp Tác Xá Gia Lai',
    productName: 'Cà Phê Arabica Cầu Đất Nhân Xô',
    category: 'Cà Phê & Hạt Nông Sản',
    volume: '80 Tấn',
    unitPrice: '115,000đ/kg',
    totalValue: 9200000000, // 9.2 tỷ
    escrowDeposit: 9200000000,
    escrowPercent: 100,
    status: 'disputed',
    qualityCertificate: 'Rainforest Certified',
    shippingPartner: 'Logistics Hàng Khô Đồng Nai',
    deliveryDate: '2026-07-21',
    disputeReason: 'Độ ẩm hạt thực tế 14.5% vượt mức tiêu chuẩn hợp đồng (12.5%). Bên mua yêu cầu giảm 3% giá trị đơn.',
    paymentMethod: 'Escrow Ngân hàng'
  },
  {
    id: 'ord-105',
    code: 'DH-8805',
    createdAt: '2026-07-18 08:30',
    buyerName: 'Chuỗi Siêu Thị Co.opmart',
    buyerTaxCode: '0301482910',
    buyerType: 'Chuỗi siêu thị',
    supplierName: 'Nông Nghiệp Xanh Tiền Giang',
    supplierCoop: 'HTX Xoài Cát Hòa Lộc Cái Bè',
    productName: 'Xoài Cát Hòa Lộc Bao Trái',
    category: 'Trái Cây Xuất Khẩu',
    volume: '20 Tấn',
    unitPrice: '62,000đ/kg',
    totalValue: 1240000000, // 1.24 tỷ
    escrowDeposit: 1240000000,
    escrowPercent: 100,
    status: 'delivered',
    qualityCertificate: 'VietGAP #VG-4412',
    shippingPartner: 'Chuyển Phát Nhanh Nông Sản Xe Mát',
    deliveryDate: '2026-07-23',
    paymentMethod: 'Escrow Ngân hàng'
  },
  {
    id: 'ord-106',
    code: 'DH-8806',
    createdAt: '2026-07-23 10:00',
    buyerName: 'Global Grains Corp',
    buyerTaxCode: 'US-99210481',
    buyerType: 'Doanh nghiệp XNK',
    supplierName: 'HTX Bưởi Da Xanh Chợ Lách',
    supplierCoop: 'HTX Bến Tre Organic',
    productName: 'Bưởi Da Xanh Ruột Hồng Xuất Khẩu',
    category: 'Trái Cây Xuất Khẩu',
    volume: '30 Tấn',
    unitPrice: '45,000đ/kg',
    totalValue: 1350000000, // 1.35 tỷ
    escrowDeposit: 0,
    escrowPercent: 0,
    status: 'pending_escrow',
    qualityCertificate: 'Chờ kiểm định VietGAP',
    shippingPartner: 'Chưa phân công xe',
    deliveryDate: '2026-08-02',
    paymentMethod: 'Thanh toán bảo chứng'
  }
];

// Component: OrdersManagementView - Giao diện quản lý/hiển thị cho Admin
export const OrdersManagementView: React.FC = () => {
  const [orders, setOrders] = useState<OrderItem[]>(INITIAL_ORDERS);

  // Filtering & Search
  const [activeTabFilter, setActiveTabFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState('all');

  // Pagination
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(6);

  // Toast
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  // Selected Order for Detail Drawer / Modal
  const [detailOrder, setDetailOrder] = useState<OrderItem | null>(null);

  // Dispute Resolution Modal
  const [disputeOrder, setDisputeOrder] = useState<OrderItem | null>(null);
  const [disputeAction, setDisputeAction] = useState<'payout' | 'refund' | 'partial'>('partial');
  const [partialDiscountPercent, setPartialDiscountPercent] = useState<number>(3);

  // Create Order Modal State
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newBuyer, setNewBuyer] = useState('');
  const [newSupplier, setNewSupplier] = useState('');
  const [newProduct, setNewProduct] = useState('');
  const [newVolume, setNewVolume] = useState('10 Tấn');
  const [newPrice, setNewPrice] = useState('500,000,000');
  const [newCategory, setNewCategory] = useState('Trái Cây Xuất Khẩu');

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3000);
  };

  // Status Helper
  const getStatusBadge = (status: OrderItem['status']) => {
    switch (status) {
      case 'pending_escrow':
        return (
          <span className="bg-amber-100 text-amber-800 border border-amber-300 px-2.5 py-1 rounded-full text-[10px] font-bold flex items-center space-x-1 shrink-0">
            <Clock className="w-3 h-3 text-amber-600" />
            <span>Chờ nạp Escrow</span>
          </span>
        );
      case 'quality_audit':
        return (
          <span className="bg-blue-100 text-blue-800 border border-blue-300 px-2.5 py-1 rounded-full text-[10px] font-bold flex items-center space-x-1 shrink-0">
            <ShieldCheck className="w-3 h-3 text-blue-600" />
            <span>Đang kiểm định</span>
          </span>
        );
      case 'shipping':
        return (
          <span className="bg-purple-100 text-purple-800 border border-purple-300 px-2.5 py-1 rounded-full text-[10px] font-bold flex items-center space-x-1 shrink-0">
            <Truck className="w-3 h-3 text-purple-600" />
            <span>Đang vận chuyển</span>
          </span>
        );
      case 'delivered':
        return (
          <span className="bg-cyan-100 text-cyan-800 border border-cyan-300 px-2.5 py-1 rounded-full text-[10px] font-bold flex items-center space-x-1 shrink-0">
            <UserCheck className="w-3 h-3 text-cyan-600" />
            <span>Đã giao & Nghiệm thu</span>
          </span>
        );
      case 'completed':
        return (
          <span className="bg-[#a3f69c]/40 text-[#003808] border border-[#176a22]/30 px-2.5 py-1 rounded-full text-[10px] font-bold flex items-center space-x-1 shrink-0">
            <CheckCircle2 className="w-3 h-3 text-[#176a22]" />
            <span>Đã giải ngân Escrow</span>
          </span>
        );
      case 'disputed':
        return (
          <span className="bg-red-100 text-[#ba1a1a] border border-red-300 px-2.5 py-1 rounded-full text-[10px] font-bold flex items-center space-x-1 shrink-0 animate-pulse">
            <AlertTriangle className="w-3 h-3 text-[#ba1a1a]" />
            <span>Đang khiếu nại</span>
          </span>
        );
      case 'cancelled':
        return (
          <span className="bg-gray-100 text-gray-700 border border-gray-300 px-2.5 py-1 rounded-full text-[10px] font-bold flex items-center space-x-1 shrink-0">
            <Ban className="w-3 h-3 text-gray-500" />
            <span>Đã hủy đơn</span>
          </span>
        );
      default:
        return null;
    }
  };

  // Handle Release Escrow
  const handleReleaseEscrow = (orderId: string) => {
    const updated = orders.map((o) => {
      if (o.id === orderId) {
        return { ...o, status: 'completed' as const };
      }
      return o;
    });
    setOrders(updated);
    if (detailOrder?.id === orderId) {
      setDetailOrder({ ...detailOrder, status: 'completed' });
    }
    showToast(`Đã giải ngân Escrow thành công cho đơn hàng #${orders.find((o) => o.id === orderId)?.code}!`);
  };

  // Handle Dispute Resolution Confirm
  const handleConfirmDisputeResolution = () => {
    if (!disputeOrder) return;

    let updatedStatus: OrderItem['status'] = 'completed';
    let message = '';

    if (disputeAction === 'payout') {
      updatedStatus = 'completed';
      message = `Admin đã bác bỏ khiếu nại và giải ngân 100% Escrow cho đơn #${disputeOrder.code}.`;
    } else if (disputeAction === 'refund') {
      updatedStatus = 'cancelled';
      message = `Admin đã chấp nhận khiếu nại, hoàn tiền 100% Escrow cho Khách hàng đơn #${disputeOrder.code}.`;
    } else {
      updatedStatus = 'completed';
      message = `Admin đã áp dụng mức bồi hoàn ${partialDiscountPercent}% và giải ngân số tiền còn lại cho Đơn #${disputeOrder.code}.`;
    }

    setOrders(
      orders.map((o) => {
        if (o.id === disputeOrder.id) {
          return { ...o, status: updatedStatus };
        }
        return o;
      })
    );

    setDisputeOrder(null);
    if (detailOrder?.id === disputeOrder.id) {
      setDetailOrder({ ...detailOrder, status: updatedStatus });
    }
    showToast(message);
  };

  // Handle Create New Order
  const handleCreateOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newBuyer.trim() || !newSupplier.trim() || !newProduct.trim()) return;

    const valNum = parseInt(newPrice.replace(/[^0-9]/g, '')) || 500000000;

    const newOrd: OrderItem = {
      id: `ord-${Date.now()}`,
      code: `DH-${Math.floor(8000 + Math.random() * 1000)}`,
      createdAt: new Date().toISOString().replace('T', ' ').substring(0, 16),
      buyerName: newBuyer,
      buyerTaxCode: '0319882710',
      buyerType: 'Doanh nghiệp XNK',
      supplierName: newSupplier,
      supplierCoop: 'HTX Nông Sản Xuất Nhập Khẩu',
      productName: newProduct,
      category: newCategory,
      volume: newVolume,
      unitPrice: 'Thỏa thuận',
      totalValue: valNum,
      escrowDeposit: valNum,
      escrowPercent: 100,
      status: 'pending_escrow',
      qualityCertificate: 'VietGAP Tiêu chuẩn',
      shippingPartner: 'Xe Lạnh Chuỗi Cung Ứng',
      deliveryDate: '2026-08-05',
      paymentMethod: 'Escrow Ngân hàng'
    };

    setOrders([newOrd, ...orders]);
    setShowCreateModal(false);
    setNewBuyer('');
    setNewSupplier('');
    setNewProduct('');
    showToast(`Đã khởi tạo đơn hàng Escrow mới #${newOrd.code} thành công!`);
  };

  // Filter Logic
  const filteredOrders = useMemo(() => {
    return orders.filter((ord) => {
      const matchesSearch =
        ord.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ord.buyerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ord.supplierName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ord.productName.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory =
        selectedCategoryFilter === 'all' || ord.category === selectedCategoryFilter;

      let matchesStatus = true;
      if (activeTabFilter === 'pending_escrow') matchesStatus = ord.status === 'pending_escrow';
      else if (activeTabFilter === 'quality_audit') matchesStatus = ord.status === 'quality_audit';
      else if (activeTabFilter === 'shipping') matchesStatus = ord.status === 'shipping';
      else if (activeTabFilter === 'delivered') matchesStatus = ord.status === 'delivered';
      else if (activeTabFilter === 'completed') matchesStatus = ord.status === 'completed';
      else if (activeTabFilter === 'disputed') matchesStatus = ord.status === 'disputed';

      return matchesSearch && matchesCategory && matchesStatus;
    });
  }, [orders, searchQuery, selectedCategoryFilter, activeTabFilter]);

  // Pagination Logic
  const totalItems = filteredOrders.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage) || 1;
  const validPage = Math.min(currentPage, totalPages);
  const startIdx = (validPage - 1) * itemsPerPage;
  const paginatedOrders = filteredOrders.slice(startIdx, startIdx + itemsPerPage);
  const startItemNum = totalItems > 0 ? startIdx + 1 : 0;
  const endItemNum = Math.min(startIdx + itemsPerPage, totalItems);

  // Financial Metrics
  const totalGMV = orders.reduce((acc, o) => acc + o.totalValue, 0);
  const totalEscrowFunded = orders
    .filter((o) => o.status !== 'cancelled')
    .reduce((acc, o) => acc + o.escrowDeposit, 0);
  const disputedCount = orders.filter((o) => o.status === 'disputed').length;

  const formatVND = (num: number) => {
    if (num >= 1000000000) {
      return `${(num / 1000000000).toFixed(2)} Tỷ VNĐ`;
    }
    return `${(num / 1000000).toFixed(0)} Triệu VNĐ`;
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
            <ShoppingCart className="w-6 h-6 text-[#176a22]" />
            <span>Quản Lý Đơn Hàng Escrow & Giao Dịch B2B</span>
          </h2>
          <p className="text-sm text-[#40493d] mt-1">
            Giám sát toàn bộ dòng tiền tạm giữ Escrow, hợp đồng nông sản, kiểm định chất lượng và giải ngân cho nhà cung cấp
          </p>
        </div>

        <div className="flex items-center space-x-2 self-start md:self-auto">
          <button
            onClick={() => setShowCreateModal(true)}
            className="px-4 py-2.5 bg-[#176a22] hover:bg-[#13561b] text-white text-xs font-bold rounded-xl shadow-xs transition-colors cursor-pointer flex items-center space-x-1.5"
          >
            <Plus className="w-4 h-4" />
            <span>Tạo Đơn Hàng Escrow Mới</span>
          </button>
        </div>
      </div>

      {/* Summary KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-2xl border border-[#e0e4d9] shadow-2xs flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-[#707a6c] uppercase">Tổng Giá Trị Giao Dịch (GMV)</span>
            <p className="text-xl font-bold text-[#181d16] mt-0.5">{formatVND(totalGMV)}</p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-[#a3f69c]/30 text-[#003808] flex items-center justify-center font-bold">
            <DollarSign className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-[#e0e4d9] shadow-2xs flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-[#707a6c] uppercase">Quỹ Escrow Tạm Giữ</span>
            <p className="text-xl font-bold text-[#176a22] mt-0.5">{formatVND(totalEscrowFunded)}</p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-[#a3f69c]/30 text-[#003808] flex items-center justify-center font-bold">
            <ShieldCheck className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-[#e0e4d9] shadow-2xs flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-[#707a6c] uppercase">Tổng Đơn Hàng Hợp Đồng</span>
            <p className="text-xl font-bold text-[#181d16] mt-0.5">{orders.length} Đơn hàng B2B</p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-[#a3f69c]/30 text-[#003808] flex items-center justify-center font-bold">
            <FileText className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-[#e0e4d9] shadow-2xs flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-[#707a6c] uppercase">Đơn Cần Xử Lý Khiếu Nại</span>
            <p className="text-xl font-bold text-[#ba1a1a] mt-0.5">{disputedCount} Đơn tranh chấp</p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-red-100 text-[#ba1a1a] flex items-center justify-center font-bold">
            <AlertTriangle className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Filter Tabs Bar */}
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
            Tất Cả Đơn ({orders.length})
          </button>

          <button
            onClick={() => {
              setActiveTabFilter('pending_escrow');
              setCurrentPage(1);
            }}
            className={`px-3.5 py-2 rounded-xl font-bold text-xs transition-all cursor-pointer ${
              activeTabFilter === 'pending_escrow'
                ? 'bg-[#a3f69c] text-[#003808] shadow-2xs'
                : 'text-[#40493d] hover:bg-[#f7fbf0]'
            }`}
          >
            Chờ Nạp Escrow ({orders.filter((o) => o.status === 'pending_escrow').length})
          </button>

          <button
            onClick={() => {
              setActiveTabFilter('quality_audit');
              setCurrentPage(1);
            }}
            className={`px-3.5 py-2 rounded-xl font-bold text-xs transition-all cursor-pointer ${
              activeTabFilter === 'quality_audit'
                ? 'bg-[#a3f69c] text-[#003808] shadow-2xs'
                : 'text-[#40493d] hover:bg-[#f7fbf0]'
            }`}
          >
            Đang Kiểm Định ({orders.filter((o) => o.status === 'quality_audit').length})
          </button>

          <button
            onClick={() => {
              setActiveTabFilter('shipping');
              setCurrentPage(1);
            }}
            className={`px-3.5 py-2 rounded-xl font-bold text-xs transition-all cursor-pointer ${
              activeTabFilter === 'shipping'
                ? 'bg-[#a3f69c] text-[#003808] shadow-2xs'
                : 'text-[#40493d] hover:bg-[#f7fbf0]'
            }`}
          >
            Đang Vận Chuyển ({orders.filter((o) => o.status === 'shipping').length})
          </button>

          <button
            onClick={() => {
              setActiveTabFilter('delivered');
              setCurrentPage(1);
            }}
            className={`px-3.5 py-2 rounded-xl font-bold text-xs transition-all cursor-pointer ${
              activeTabFilter === 'delivered'
                ? 'bg-[#a3f69c] text-[#003808] shadow-2xs'
                : 'text-[#40493d] hover:bg-[#f7fbf0]'
            }`}
          >
            Đã Nghiệm Thu ({orders.filter((o) => o.status === 'delivered').length})
          </button>

          <button
            onClick={() => {
              setActiveTabFilter('completed');
              setCurrentPage(1);
            }}
            className={`px-3.5 py-2 rounded-xl font-bold text-xs transition-all cursor-pointer ${
              activeTabFilter === 'completed'
                ? 'bg-[#a3f69c] text-[#003808] shadow-2xs'
                : 'text-[#40493d] hover:bg-[#f7fbf0]'
            }`}
          >
            Đã Giải Ngân ({orders.filter((o) => o.status === 'completed').length})
          </button>

          <button
            onClick={() => {
              setActiveTabFilter('disputed');
              setCurrentPage(1);
            }}
            className={`px-3.5 py-2 rounded-xl font-bold text-xs transition-all cursor-pointer flex items-center space-x-1 ${
              activeTabFilter === 'disputed'
                ? 'bg-red-100 text-[#ba1a1a] shadow-2xs border border-red-200'
                : 'text-[#ba1a1a] hover:bg-red-50'
            }`}
          >
            <AlertTriangle className="w-3 h-3 text-[#ba1a1a]" />
            <span>Tranh Chấp ({disputedCount})</span>
          </button>
        </div>
      </div>

      {/* Control Search & Filters */}
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
            placeholder="Tìm mã đơn #DH, bên mua, nhà cung cấp, sản phẩm..."
            className="w-full pl-9 pr-4 py-2 bg-[#f7fbf0] border border-[#bfcaba] rounded-lg text-[#181d16] focus:outline-none focus:ring-2 focus:ring-[#176a22]"
          />
        </div>

        <div className="flex items-center space-x-2 w-full md:w-auto">
          <div className="flex items-center space-x-1 bg-[#f7fbf0] px-3 py-1.5 rounded-lg border border-[#bfcaba]">
            <Filter className="w-3.5 h-3.5 text-[#707a6c]" />
            <span className="text-[#707a6c] font-medium">Danh mục sản phẩm:</span>
            <select
              value={selectedCategoryFilter}
              onChange={(e) => {
                setSelectedCategoryFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="bg-transparent text-[#181d16] font-semibold focus:outline-none cursor-pointer"
            >
              <option value="all">Tất cả danh mục</option>
              <option value="Trái Cây Xuất Khẩu">Trái Cây Xuất Khẩu</option>
              <option value="Cà Phê & Hạt Nông Sản">Cà Phê & Hạt Nông Sản</option>
              <option value="Rau Củ Ôn Đới Đà Lạt">Rau Củ Ôn Đới</option>
              <option value="Lúa Gạo & Lương Thực">Lúa Gạo & Lương Thực</option>
            </select>
          </div>
        </div>
      </div>

      {/* ORDERS TABLE */}
      <div className="bg-white rounded-2xl border border-[#e0e4d9] shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-[#f1f5ea] border-b border-[#e0e4d9] text-[#707a6c] uppercase font-bold tracking-wider">
                <th className="py-3.5 px-4">Mã Đơn & Thời Gian</th>
                <th className="py-3.5 px-4">Khách Hàng (Bên Mua)</th>
                <th className="py-3.5 px-4">Nhà Cung Cấp (Bên Bán)</th>
                <th className="py-3.5 px-4">Mặt Hàng & Sản Lượng</th>
                <th className="py-3.5 px-4">Tổng Giá Trị / Escrow</th>
                <th className="py-3.5 px-4">Trạng Thái Đơn Hàng</th>
                <th className="py-3.5 px-4 text-center">Thao Tác Admin</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#e0e4d9]">
              {paginatedOrders.map((ord) => (
                <tr key={ord.id} className="hover:bg-[#f7fbf0] transition-colors">
                  <td className="py-3.5 px-4">
                    <div className="space-y-0.5">
                      <span className="text-[11px] font-mono font-bold text-[#176a22]">{ord.code}</span>
                      <p className="text-[10px] text-[#707a6c]">{ord.createdAt}</p>
                    </div>
                  </td>

                  <td className="py-3.5 px-4">
                    <div>
                      <p className="font-bold text-[#181d16]">{ord.buyerName}</p>
                      <span className="text-[10px] text-[#707a6c] bg-[#f7fbf0] px-1.5 py-0.5 rounded border border-[#e0e4d9]">
                        {ord.buyerType}
                      </span>
                    </div>
                  </td>

                  <td className="py-3.5 px-4">
                    <div>
                      <p className="font-semibold text-[#181d16]">{ord.supplierName}</p>
                      <p className="text-[10px] text-[#707a6c]">{ord.supplierCoop}</p>
                    </div>
                  </td>

                  <td className="py-3.5 px-4">
                    <div>
                      <p className="font-bold text-[#181d16]">{ord.productName}</p>
                      <p className="text-[10px] text-[#176a22] font-semibold">
                        {ord.volume} ({ord.unitPrice})
                      </p>
                    </div>
                  </td>

                  <td className="py-3.5 px-4">
                    <div>
                      <p className="font-bold text-[#176a22] text-xs">{formatVND(ord.totalValue)}</p>
                      <span className="text-[10px] text-[#707a6c]">
                        Escrow: {ord.escrowPercent}% ({formatVND(ord.escrowDeposit)})
                      </span>
                    </div>
                  </td>

                  <td className="py-3.5 px-4">{getStatusBadge(ord.status)}</td>

                  <td className="py-3.5 px-4 text-center">
                    <div className="flex items-center justify-center space-x-2">
                      <button
                        onClick={() => setDetailOrder(ord)}
                        className="px-2.5 py-1 bg-[#f7fbf0] text-[#176a22] border border-[#bfcaba] hover:bg-[#a3f69c]/30 rounded-lg font-bold flex items-center space-x-1 cursor-pointer transition-colors"
                        title="Xem chi tiết đơn hàng & hợp đồng"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>Chi tiết</span>
                      </button>

                      {ord.status === 'delivered' && (
                        <button
                          onClick={() => handleReleaseEscrow(ord.id)}
                          className="px-2.5 py-1 bg-[#176a22] text-white hover:bg-[#13561b] rounded-lg font-bold flex items-center space-x-1 cursor-pointer transition-colors shadow-2xs"
                          title="Giải ngân Escrow ngay cho Nhà cung cấp"
                        >
                          <Check className="w-3.5 h-3.5" />
                          <span>Giải ngân</span>
                        </button>
                      )}

                      {ord.status === 'disputed' && (
                        <button
                          onClick={() => setDisputeOrder(ord)}
                          className="px-2.5 py-1 bg-[#ba1a1a] text-white hover:bg-[#9c1414] rounded-lg font-bold flex items-center space-x-1 cursor-pointer transition-colors shadow-2xs"
                          title="Phán quyết khiếu nại tranh chấp"
                        >
                          <AlertTriangle className="w-3 h-3" />
                          <span>Xử lý tranh chấp</span>
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredOrders.length === 0 && (
          <div className="p-12 text-center text-xs text-[#707a6c] space-y-2">
            <ShoppingCart className="w-8 h-8 text-[#bfcaba] mx-auto" />
            <p className="font-semibold text-[#181d16]">Không tìm thấy đơn hàng B2B phù hợp</p>
            <p>Thử điều chỉnh bộ lọc hoặc từ khóa tìm kiếm.</p>
          </div>
        )}
      </div>

      {/* BOTTOM PAGINATION BAR */}
      {totalItems > 0 && (
        <div className="bg-white p-4 rounded-xl border border-[#e0e4d9] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#40493d] shadow-2xs">
          <div className="flex items-center space-x-3">
            <span>
              Hiển thị <strong>{startItemNum}</strong> - <strong>{endItemNum}</strong> trong tổng số <strong>{totalItems}</strong> đơn hàng B2B
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
                <option value={6}>6 / trang</option>
                <option value={12}>12 / trang</option>
                <option value={24}>24 / trang</option>
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

      {/* MODAL 1: ORDER DETAIL DRAWER / MODAL */}
      {detailOrder && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full border border-[#e0e4d9] p-6 shadow-xl space-y-5 animate-in fade-in zoom-in-95 max-h-[90vh] overflow-y-auto custom-scrollbar">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-[#e0e4d9] pb-3">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-xl bg-[#a3f69c]/30 text-[#003808] flex items-center justify-center font-bold">
                  <ShoppingCart className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <h3 className="text-lg font-bold text-[#181d16]">Chi Tiết Đơn Hàng #{detailOrder.code}</h3>
                    {getStatusBadge(detailOrder.status)}
                  </div>
                  <p className="text-xs text-[#707a6c]">Khởi tạo lúc: {detailOrder.createdAt}</p>
                </div>
              </div>

              <button
                onClick={() => setDetailOrder(null)}
                className="text-[#707a6c] hover:text-[#181d16] p-1.5 rounded-lg cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Buyer vs Seller Card */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="bg-[#f7fbf0] p-4 rounded-xl border border-[#e0e4d9] space-y-2">
                <span className="font-bold text-[#176a22] uppercase tracking-wider text-[10px]">Bên Mua (Khách Hàng)</span>
                <p className="font-bold text-[#181d16] text-sm">{detailOrder.buyerName}</p>
                <p className="text-[#40493d]">Mã số thuế: {detailOrder.buyerTaxCode}</p>
                <p className="text-[#40493d]">Loại hình: {detailOrder.buyerType}</p>
              </div>

              <div className="bg-[#f7fbf0] p-4 rounded-xl border border-[#e0e4d9] space-y-2">
                <span className="font-bold text-[#176a22] uppercase tracking-wider text-[10px]">Bên Bán (Nhà Cung Cấp)</span>
                <p className="font-bold text-[#181d16] text-sm">{detailOrder.supplierName}</p>
                <p className="text-[#40493d]">Tổ chức: {detailOrder.supplierCoop}</p>
                <p className="text-[#40493d]">Chứng nhận: {detailOrder.qualityCertificate}</p>
              </div>
            </div>

            {/* Product & Financial Breakdown */}
            <div className="bg-white p-4 rounded-xl border border-[#e0e4d9] space-y-3 text-xs">
              <h4 className="font-bold text-[#181d16] flex items-center space-x-2 border-b border-[#e0e4d9] pb-2">
                <Package className="w-4 h-4 text-[#176a22]" />
                <span>Thông Tin Hàng Hóa & Thanh Toán Escrow</span>
              </h4>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <div>
                  <span className="text-[#707a6c]">Tên nông sản:</span>
                  <p className="font-bold text-[#181d16]">{detailOrder.productName}</p>
                </div>
                <div>
                  <span className="text-[#707a6c]">Sản lượng / Quy cách:</span>
                  <p className="font-bold text-[#181d16]">{detailOrder.volume}</p>
                </div>
                <div>
                  <span className="text-[#707a6c]">Đơn giá thương lượng:</span>
                  <p className="font-bold text-[#181d16]">{detailOrder.unitPrice}</p>
                </div>
                <div>
                  <span className="text-[#707a6c]">Tổng hợp đồng:</span>
                  <p className="font-bold text-[#176a22] text-sm">{formatVND(detailOrder.totalValue)}</p>
                </div>
                <div>
                  <span className="text-[#707a6c]">Tỷ lệ cọc Escrow:</span>
                  <p className="font-bold text-[#181d16]">{detailOrder.escrowPercent}% Tạm giữ Ngân hàng</p>
                </div>
                <div>
                  <span className="text-[#707a6c]">Phương thức:</span>
                  <p className="font-bold text-[#181d16]">{detailOrder.paymentMethod}</p>
                </div>
              </div>
            </div>

            {/* Logistics & Audit */}
            <div className="bg-white p-4 rounded-xl border border-[#e0e4d9] space-y-2 text-xs">
              <h4 className="font-bold text-[#181d16] flex items-center space-x-2 border-b border-[#e0e4d9] pb-2">
                <Truck className="w-4 h-4 text-[#176a22]" />
                <span>Vận Chuyển & Kiểm Định Lạnh</span>
              </h4>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <span className="text-[#707a6c]">Đơn vị vận chuyển:</span>
                  <p className="font-semibold text-[#181d16]">{detailOrder.shippingPartner}</p>
                </div>
                <div>
                  <span className="text-[#707a6c]">Ngày giao hàng dự kiến:</span>
                  <p className="font-semibold text-[#181d16]">{detailOrder.deliveryDate}</p>
                </div>
              </div>
            </div>

            {/* Dispute Callout if any */}
            {detailOrder.disputeReason && (
              <div className="bg-red-50 border border-red-200 p-4 rounded-xl space-y-1.5 text-xs text-[#ba1a1a]">
                <span className="font-bold flex items-center space-x-1.5">
                  <AlertTriangle className="w-4 h-4" />
                  <span>Nội dung khiếu nại từ khách hàng:</span>
                </span>
                <p className="leading-relaxed text-[#181d16]">{detailOrder.disputeReason}</p>
              </div>
            )}

            {/* Admin Action Bar */}
            <div className="pt-3 border-t border-[#e0e4d9] flex items-center justify-between">
              <button
                type="button"
                onClick={() => setDetailOrder(null)}
                className="px-4 py-2 bg-[#e0e4d9] text-[#40493d] rounded-xl font-bold cursor-pointer hover:bg-[#d0d4c9] text-xs"
              >
                Đóng
              </button>

              <div className="flex items-center space-x-2">
                {detailOrder.status === 'delivered' && (
                  <button
                    onClick={() => handleReleaseEscrow(detailOrder.id)}
                    className="px-4 py-2 bg-[#176a22] text-white rounded-xl font-bold cursor-pointer hover:bg-[#13561b] text-xs shadow-xs flex items-center space-x-1.5"
                  >
                    <Check className="w-4 h-4" />
                    <span>Giải Ngân Escrow Ngay</span>
                  </button>
                )}

                {detailOrder.status === 'disputed' && (
                  <button
                    onClick={() => {
                      setDisputeOrder(detailOrder);
                      setDetailOrder(null);
                    }}
                    className="px-4 py-2 bg-[#ba1a1a] text-white rounded-xl font-bold cursor-pointer hover:bg-[#9c1414] text-xs shadow-xs flex items-center space-x-1.5"
                  >
                    <AlertTriangle className="w-4 h-4" />
                    <span>Phán Quyết Tranh Chấp</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 2: DISPUTE RESOLUTION MODAL */}
      {disputeOrder && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full border border-[#e0e4d9] p-6 shadow-xl space-y-4 animate-in fade-in zoom-in-95 text-xs">
            <div className="flex items-center justify-between border-b border-[#e0e4d9] pb-3">
              <div className="flex items-center space-x-2 text-[#ba1a1a]">
                <AlertTriangle className="w-5 h-5 shrink-0" />
                <h3 className="font-bold text-base text-[#181d16]">Hội Đồng Phán Quyết Tranh Chấp #{disputeOrder.code}</h3>
              </div>
              <button
                onClick={() => setDisputeOrder(null)}
                className="text-[#707a6c] hover:text-[#181d16] p-1 rounded-lg cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="bg-red-50 p-3 rounded-xl border border-red-200 text-[#181d16] space-y-1">
              <span className="font-bold text-[#ba1a1a]">Nội dung phản ánh từ Bên Mua:</span>
              <p className="text-xs">{disputeOrder.disputeReason}</p>
            </div>

            <div className="space-y-3">
              <label className="block font-bold text-[#181d16]">Chọn hình thức xử lý của Trọng tài Admin:</label>

              <div
                onClick={() => setDisputeAction('partial')}
                className={`p-3 rounded-xl border cursor-pointer transition-all flex items-start space-x-3 ${
                  disputeAction === 'partial'
                    ? 'border-[#176a22] bg-[#f7fbf0] ring-2 ring-[#176a22]/20'
                    : 'border-[#e0e4d9] hover:bg-[#f7fbf0]'
                }`}
              >
                <input
                  type="radio"
                  name="disputeOpt"
                  checked={disputeAction === 'partial'}
                  onChange={() => setDisputeAction('partial')}
                  className="mt-0.5 accent-[#176a22]"
                />
                <div>
                  <p className="font-bold text-[#181d16]">Giảm trừ phạt chất lượng ({partialDiscountPercent}%) & Giải ngân số còn lại</p>
                  <p className="text-[11px] text-[#707a6c] mt-0.5">
                    Trừ {formatVND((disputeOrder.totalValue * partialDiscountPercent) / 100)} hoàn lại cho khách hàng, giải ngân phần còn lại cho Nhà cung cấp.
                  </p>
                </div>
              </div>

              <div
                onClick={() => setDisputeAction('payout')}
                className={`p-3 rounded-xl border cursor-pointer transition-all flex items-start space-x-3 ${
                  disputeAction === 'payout'
                    ? 'border-[#176a22] bg-[#f7fbf0] ring-2 ring-[#176a22]/20'
                    : 'border-[#e0e4d9] hover:bg-[#f7fbf0]'
                }`}
              >
                <input
                  type="radio"
                  name="disputeOpt"
                  checked={disputeAction === 'payout'}
                  onChange={() => setDisputeAction('payout')}
                  className="mt-0.5 accent-[#176a22]"
                />
                <div>
                  <p className="font-bold text-[#181d16]">Bác bỏ khiếu nại - Giải ngân 100% cho Bên Bán</p>
                  <p className="text-[11px] text-[#707a6c] mt-0.5">
                    Xác nhận kết quả chứng nhận kiểm định chất lượng ban đầu là hợp lệ.
                  </p>
                </div>
              </div>

              <div
                onClick={() => setDisputeAction('refund')}
                className={`p-3 rounded-xl border cursor-pointer transition-all flex items-start space-x-3 ${
                  disputeAction === 'refund'
                    ? 'border-red-500 bg-red-50 ring-2 ring-red-200'
                    : 'border-[#e0e4d9] hover:bg-[#f7fbf0]'
                }`}
              >
                <input
                  type="radio"
                  name="disputeOpt"
                  checked={disputeAction === 'refund'}
                  onChange={() => setDisputeAction('refund')}
                  className="mt-0.5 accent-[#ba1a1a]"
                />
                <div>
                  <p className="font-bold text-[#ba1a1a]">Chấp nhận khiếu nại - Hoàn lại 100% Escrow cho Bên Mua</p>
                  <p className="text-[11px] text-[#707a6c] mt-0.5">Hủy hợp đồng, trả toàn bộ tiền cọc Escrow cho khách hàng.</p>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-[#e0e4d9] flex items-center justify-end space-x-2">
              <button
                type="button"
                onClick={() => setDisputeOrder(null)}
                className="px-4 py-2 bg-[#e0e4d9] text-[#40493d] rounded-xl font-bold cursor-pointer hover:bg-[#d0d4c9]"
              >
                Hủy
              </button>
              <button
                type="button"
                onClick={handleConfirmDisputeResolution}
                className="px-5 py-2 bg-[#176a22] text-white rounded-xl font-bold cursor-pointer hover:bg-[#13561b] shadow-xs flex items-center space-x-1.5"
              >
                <Check className="w-4 h-4" />
                <span>Xác Nhận Quyết Định</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 3: CREATE NEW B2B ORDER */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full border border-[#e0e4d9] p-6 shadow-xl space-y-4 animate-in fade-in zoom-in-95 text-xs">
            <div className="flex items-center justify-between border-b border-[#e0e4d9] pb-3">
              <h3 className="text-base font-bold text-[#181d16] flex items-center space-x-2">
                <ShoppingCart className="w-5 h-5 text-[#176a22]" />
                <span>Khởi Tạo Đơn Hàng Escrow Mới (Admin Override)</span>
              </h3>
              <button
                onClick={() => setShowCreateModal(false)}
                className="text-[#707a6c] hover:text-[#181d16] p-1 rounded-lg cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateOrder} className="space-y-3">
              <div>
                <label className="block font-bold text-[#181d16] mb-1">
                  Khách Hàng (Bên Mua) <span className="text-[#ba1a1a]">*</span>:
                </label>
                <input
                  type="text"
                  required
                  value={newBuyer}
                  onChange={(e) => setNewBuyer(e.target.value)}
                  placeholder="Ví dụ: Tập đoàn Siêu thị Central Retail..."
                  className="w-full p-2.5 bg-[#f7fbf0] border border-[#bfcaba] rounded-xl text-[#181d16] font-medium focus:outline-none focus:ring-2 focus:ring-[#176a22]"
                />
              </div>

              <div>
                <label className="block font-bold text-[#181d16] mb-1">
                  Nhà Cung Cấp (Bên Bán) <span className="text-[#ba1a1a]">*</span>:
                </label>
                <input
                  type="text"
                  required
                  value={newSupplier}
                  onChange={(e) => setNewSupplier(e.target.value)}
                  placeholder="Ví dụ: HTX Nông Nghiệp Lâm Đồng..."
                  className="w-full p-2.5 bg-[#f7fbf0] border border-[#bfcaba] rounded-xl text-[#181d16] font-medium focus:outline-none focus:ring-2 focus:ring-[#176a22]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-[#181d16] mb-1">Tên Nông Sản:</label>
                  <input
                    type="text"
                    required
                    value={newProduct}
                    onChange={(e) => setNewProduct(e.target.value)}
                    placeholder="Sầu Riêng Ri6 Loại 1"
                    className="w-full p-2.5 bg-[#f7fbf0] border border-[#bfcaba] rounded-xl text-[#181d16] focus:outline-none focus:ring-2 focus:ring-[#176a22]"
                  />
                </div>

                <div>
                  <label className="block font-bold text-[#181d16] mb-1">Danh Mục:</label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    className="w-full p-2.5 bg-[#f7fbf0] border border-[#bfcaba] rounded-xl text-[#181d16] font-semibold focus:outline-none cursor-pointer"
                  >
                    <option value="Trái Cây Xuất Khẩu">Trái Cây Xuất Khẩu</option>
                    <option value="Cà Phê & Hạt Nông Sản">Cà Phê & Hạt Nông Sản</option>
                    <option value="Rau Củ Ôn Đới Đà Lạt">Rau Củ Ôn Đới Đà Lạt</option>
                    <option value="Lúa Gạo & Lương Thực">Lúa Gạo & Lương Thực</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-[#181d16] mb-1">Sản Lượng:</label>
                  <input
                    type="text"
                    value={newVolume}
                    onChange={(e) => setNewVolume(e.target.value)}
                    placeholder="20 Tấn"
                    className="w-full p-2.5 bg-[#f7fbf0] border border-[#bfcaba] rounded-xl text-[#181d16] focus:outline-none focus:ring-2 focus:ring-[#176a22]"
                  />
                </div>

                <div>
                  <label className="block font-bold text-[#181d16] mb-1">Tổng Giá Trị (VNĐ):</label>
                  <input
                    type="text"
                    value={newPrice}
                    onChange={(e) => setNewPrice(e.target.value)}
                    placeholder="1,500,000,000"
                    className="w-full p-2.5 bg-[#f7fbf0] border border-[#bfcaba] rounded-xl text-[#181d16] font-bold focus:outline-none focus:ring-2 focus:ring-[#176a22]"
                  />
                </div>
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
                  <Plus className="w-4 h-4" />
                  <span>Tạo Đơn Hàng</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
