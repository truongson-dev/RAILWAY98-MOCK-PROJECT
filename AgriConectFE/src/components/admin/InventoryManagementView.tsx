'use client';
// Đây là component thuộc giao diện Admin
import React, { useState, useMemo } from 'react';
import {
  Warehouse,
  Package,
  Plus,
  Search,
  Filter,
  CheckCircle2,
  AlertTriangle,
  ChevronLeft,
  ChevronRight,
  Edit2,
  Trash2,
  Building2,
  Thermometer,
  Calendar,
  X,
  MapPin,
  User,
  Phone,
  BarChart2,
  Check
} from 'lucide-react';

export interface WarehouseItem {
  id: string;
  code: string;
  name: string;
  type: 'Kho Mát' | 'Kho Đông Lạnh' | 'Kho Thường / Hàng Khô' | 'Kho Trung Chuyển Export';
  location: string;
  manager: string;
  phone: string;
  totalCapacity: number; // Tấn
  usedCapacity: number; // Tấn
  temperature: string;
  status: 'active' | 'maintenance' | 'full';
  createdAt: string;
}

export interface InventoryBatchItem {
  id: string;
  batchCode: string;
  productName: string;
  warehouseId: string;
  warehouseName: string;
  quantity: number; // Tấn
  unit: string;
  importDate: string;
  expiryDate: string;
  supplier: string;
  qualityStatus: 'good' | 'expiring_soon' | 'warning';
}

const INITIAL_WAREHOUSES: WarehouseItem[] = [
  {
    id: 'wh-1',
    code: 'KHO-LD01',
    name: 'Kho Lạnh Nông Sản Đà Lạt #1',
    type: 'Kho Mát',
    location: 'TP. Đà Lạt, Lâm Đồng',
    manager: 'Nguyễn Văn Hùng',
    phone: '0918 223 344',
    totalCapacity: 1200,
    usedCapacity: 850,
    temperature: '2°C - 5°C',
    status: 'active',
    createdAt: '2025-11-10'
  },
  {
    id: 'wh-2',
    code: 'KHO-DL02',
    name: 'Kho Chuỗi Lạnh Tây Nguyên',
    type: 'Kho Đông Lạnh',
    location: 'Buôn Ma Thuột, Đắk Lắk',
    manager: 'Y Bham Niê',
    phone: '0935 112 233',
    totalCapacity: 2500,
    usedCapacity: 2100,
    temperature: '-18°C đến -22°C',
    status: 'active',
    createdAt: '2025-08-15'
  },
  {
    id: 'wh-3',
    code: 'KHO-MK01',
    name: 'Kho Logistics Nông Sản Cần Thơ',
    type: 'Kho Trung Chuyển Export',
    location: 'Q. Bình Thủy, Cần Thơ',
    manager: 'Trần Minh Tâm',
    phone: '0903 887 766',
    totalCapacity: 3000,
    usedCapacity: 1450,
    temperature: '15°C - 20°C',
    status: 'active',
    createdAt: '2026-01-05'
  },
  {
    id: 'wh-4',
    code: 'KHO-DN01',
    name: 'Kho Hàng Khô & Hạt Nông Sản Đồng Nai',
    type: 'Kho Thường / Hàng Khô',
    location: 'Long Thành, Đồng Nai',
    manager: 'Lê Hoàng Anh',
    phone: '0977 445 566',
    totalCapacity: 5000,
    usedCapacity: 4800,
    temperature: 'Nhiệt độ phòng',
    status: 'full',
    createdAt: '2025-06-20'
  },
  {
    id: 'wh-5',
    code: 'KHO-TG01',
    name: 'Kho Lạnh Trái Cây Tiền Giang',
    type: 'Kho Mát',
    location: 'Mỹ Tho, Tiền Giang',
    manager: 'Phạm Quốc Bảo',
    phone: '0912 667 788',
    totalCapacity: 1800,
    usedCapacity: 920,
    temperature: '4°C - 8°C',
    status: 'active',
    createdAt: '2026-02-01'
  }
];

const INITIAL_BATCHES: InventoryBatchItem[] = [
  {
    id: 'bat-1',
    batchCode: 'LO-2026-001',
    productName: 'Sầu Riêng Ri6 Xuất Khẩu',
    warehouseId: 'wh-2',
    warehouseName: 'Kho Chuỗi Lạnh Tây Nguyên',
    quantity: 180,
    unit: 'Tấn',
    importDate: '2026-07-15',
    expiryDate: '2026-08-15',
    supplier: 'HTX Sầu Riêng Krông Pắc',
    qualityStatus: 'good'
  },
  {
    id: 'bat-2',
    batchCode: 'LO-2026-002',
    productName: 'Dâu Tây Organic Đà Lạt',
    warehouseId: 'wh-1',
    warehouseName: 'Kho Lạnh Nông Sản Đà Lạt #1',
    quantity: 25,
    unit: 'Tấn',
    importDate: '2026-07-20',
    expiryDate: '2026-07-30',
    supplier: 'Nông trại Sen Vàng',
    qualityStatus: 'expiring_soon'
  },
  {
    id: 'bat-3',
    batchCode: 'LO-2026-003',
    productName: 'Cà Phê Arabica Nhân Xô',
    warehouseId: 'wh-4',
    warehouseName: 'Kho Hàng Khô & Hạt Nông Sản Đồng Nai',
    quantity: 650,
    unit: 'Tấn',
    importDate: '2026-06-10',
    expiryDate: '2027-06-10',
    supplier: 'Nông Trường Cà Phê Chư Sê',
    qualityStatus: 'good'
  },
  {
    id: 'bat-4',
    batchCode: 'LO-2026-004',
    productName: 'Lúa Gạo ST25 Thượng Hạng',
    warehouseId: 'wh-3',
    warehouseName: 'Kho Logistics Nông Sản Cần Thơ',
    quantity: 800,
    unit: 'Tấn',
    importDate: '2026-07-01',
    expiryDate: '2026-12-31',
    supplier: 'Mekong Rice Export Co.',
    qualityStatus: 'good'
  },
  {
    id: 'bat-5',
    batchCode: 'LO-2026-005',
    productName: 'Xoài Cát Hòa Lộc',
    warehouseId: 'wh-5',
    warehouseName: 'Kho Lạnh Trái Cây Tiền Giang',
    quantity: 95,
    unit: 'Tấn',
    importDate: '2026-07-18',
    expiryDate: '2026-08-05',
    supplier: 'Nông Nghiệp Xanh Tiền Giang',
    qualityStatus: 'good'
  }
];

// Component: InventoryManagementView - Giao diện quản lý/hiển thị cho Admin
export const InventoryManagementView: React.FC = () => {
  const [activeSub, setActiveSub] = useState<'warehouses' | 'batches'>('warehouses');
  const [warehouses, setWarehouses] = useState<WarehouseItem[]>(INITIAL_WAREHOUSES);
  const [batches, setBatches] = useState<InventoryBatchItem[]>(INITIAL_BATCHES);

  // Filters & Search State
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<string>('all');

  // Pagination State
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(6);

  // Toast Notification
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  // Modal States
  const [showAddWarehouseModal, setShowAddWarehouseModal] = useState(false);
  const [editingWarehouse, setEditingWarehouse] = useState<WarehouseItem | null>(null);
  const [deletingWarehouseId, setDeletingWarehouseId] = useState<string | null>(null);

  const [showAddBatchModal, setShowAddBatchModal] = useState(false);
  const [editingBatch, setEditingBatch] = useState<InventoryBatchItem | null>(null);
  const [deletingBatchId, setDeletingBatchId] = useState<string | null>(null);

  // Form inputs for Warehouse
  const [whName, setWhName] = useState('');
  const [whCode, setWhCode] = useState('');
  const [whType, setWhType] = useState<WarehouseItem['type']>('Kho Mát');
  const [whLocation, setWhLocation] = useState('Lâm Đồng');
  const [whManager, setWhManager] = useState('');
  const [whPhone, setWhPhone] = useState('');
  const [whCapacity, setWhCapacity] = useState('1500');
  const [whTemp, setWhTemp] = useState('2°C - 8°C');

  // Form inputs for Batch
  const [bName, setBName] = useState('');
  const [bCode, setBCode] = useState('');
  const [bWarehouseId, setBWarehouseId] = useState(warehouses[0]?.id || 'wh-1');
  const [bQuantity, setBQuantity] = useState('50');
  const [bSupplier, setBSupplier] = useState('HTX Nông Sản');
  const [bExpiry, setBExpiry] = useState('2026-09-30');

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3000);
  };

  // Open Create Warehouse Modal
  const handleOpenCreateWarehouse = () => {
    setEditingWarehouse(null);
    setWhName('');
    setWhCode(`KHO-${Math.floor(1000 + Math.random() * 9000)}`);
    setWhType('Kho Mát');
    setWhLocation('Đà Lạt, Lâm Đồng');
    setWhManager('Quản lý Kho mới');
    setWhPhone('0912 345 678');
    setWhCapacity('1500');
    setWhTemp('2°C - 5°C');
    setShowAddWarehouseModal(true);
  };

  // Open Edit Warehouse Modal
  const handleOpenEditWarehouse = (wh: WarehouseItem) => {
    setEditingWarehouse(wh);
    setWhName(wh.name);
    setWhCode(wh.code);
    setWhType(wh.type);
    setWhLocation(wh.location);
    setWhManager(wh.manager);
    setWhPhone(wh.phone);
    setWhCapacity(wh.totalCapacity.toString());
    setWhTemp(wh.temperature);
    setShowAddWarehouseModal(true);
  };

  // Save (Create/Update) Warehouse
  const handleSaveWarehouse = (e: React.FormEvent) => {
    e.preventDefault();
    if (!whName.trim()) return;

    if (editingWarehouse) {
      // Update
      const updatedList = warehouses.map((w) => {
        if (w.id === editingWarehouse.id) {
          return {
            ...w,
            name: whName,
            code: whCode,
            type: whType,
            location: whLocation,
            manager: whManager,
            phone: whPhone,
            totalCapacity: Number(whCapacity) || 1000,
            temperature: whTemp
          };
        }
        return w;
      });
      setWarehouses(updatedList);
      showToast(`Đã cập nhật thông tin kho: "${whName}"`);
    } else {
      // Create
      const newWh: WarehouseItem = {
        id: `wh-${Date.now()}`,
        code: whCode,
        name: whName,
        type: whType,
        location: whLocation,
        manager: whManager,
        phone: whPhone,
        totalCapacity: Number(whCapacity) || 1000,
        usedCapacity: 0,
        temperature: whTemp,
        status: 'active',
        createdAt: new Date().toISOString().split('T')[0]
      };
      setWarehouses([newWh, ...warehouses]);
      showToast(`Đã tạo kho mới: "${whName}" thành công!`);
    }

    setShowAddWarehouseModal(false);
  };

  // Delete Warehouse
  const handleConfirmDeleteWarehouse = () => {
    if (!deletingWarehouseId) return;
    const targetWh = warehouses.find((w) => w.id === deletingWarehouseId);
    setWarehouses(warehouses.filter((w) => w.id !== deletingWarehouseId));
    setDeletingWarehouseId(null);
    showToast(`Đã xóa kho "${targetWh?.name || 'đã chọn'}" khỏi hệ thống.`);
  };

  // Open Create Batch Modal
  const handleOpenCreateBatch = () => {
    setEditingBatch(null);
    setBName('');
    setBCode(`LO-${new Date().getFullYear()}-${Math.floor(100 + Math.random() * 900)}`);
    setBWarehouseId(warehouses[0]?.id || 'wh-1');
    setBQuantity('50');
    setBSupplier('HTX Nông Sản Đà Lạt');
    setBExpiry('2026-09-30');
    setShowAddBatchModal(true);
  };

  // Open Edit Batch Modal
  const handleOpenEditBatch = (batch: InventoryBatchItem) => {
    setEditingBatch(batch);
    setBName(batch.productName);
    setBCode(batch.batchCode);
    setBWarehouseId(batch.warehouseId);
    setBQuantity(batch.quantity.toString());
    setBSupplier(batch.supplier);
    setBExpiry(batch.expiryDate);
    setShowAddBatchModal(true);
  };

  // Save (Create/Update) Batch
  const handleSaveBatch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bName.trim()) return;

    const matchedWh = warehouses.find((w) => w.id === bWarehouseId);
    const whNameResolved = matchedWh ? matchedWh.name : 'Kho Nông Sản';

    if (editingBatch) {
      const updatedBatches = batches.map((b) => {
        if (b.id === editingBatch.id) {
          return {
            ...b,
            productName: bName,
            batchCode: bCode,
            warehouseId: bWarehouseId,
            warehouseName: whNameResolved,
            quantity: Number(bQuantity) || 10,
            supplier: bSupplier,
            expiryDate: bExpiry
          };
        }
        return b;
      });
      setBatches(updatedBatches);
      showToast(`Đã cập nhật lô hàng: "${bCode}"`);
    } else {
      const newBatch: InventoryBatchItem = {
        id: `bat-${Date.now()}`,
        batchCode: bCode,
        productName: bName,
        warehouseId: bWarehouseId,
        warehouseName: whNameResolved,
        quantity: Number(bQuantity) || 10,
        unit: 'Tấn',
        importDate: new Date().toISOString().split('T')[0],
        expiryDate: bExpiry,
        supplier: bSupplier,
        qualityStatus: 'good'
      };
      setBatches([newBatch, ...batches]);
      showToast(`Đã nhập lô hàng mới: "${bName}" vào kho!`);
    }

    setShowAddBatchModal(false);
  };

  // Delete Batch
  const handleConfirmDeleteBatch = () => {
    if (!deletingBatchId) return;
    const targetBatch = batches.find((b) => b.id === deletingBatchId);
    setBatches(batches.filter((b) => b.id !== deletingBatchId));
    setDeletingBatchId(null);
    showToast(`Đã xuất/xóa lô hàng "${targetBatch?.batchCode}" khỏi hệ thống.`);
  };

  // Filter Warehouses
  const filteredWarehouses = useMemo(() => {
    return warehouses.filter((w) => {
      const matchesSearch =
        w.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        w.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
        w.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        w.manager.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesType = filterType === 'all' || w.type === filterType;
      return matchesSearch && matchesType;
    });
  }, [warehouses, searchQuery, filterType]);

  // Filter Batches
  const filteredBatches = useMemo(() => {
    return batches.filter((b) => {
      const matchesSearch =
        b.productName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        b.batchCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
        b.supplier.toLowerCase().includes(searchQuery.toLowerCase()) ||
        b.warehouseName.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesSearch;
    });
  }, [batches, searchQuery]);

  // Active Dataset & Pagination
  const currentDataset = activeSub === 'warehouses' ? filteredWarehouses : filteredBatches;
  const totalItems = currentDataset.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage) || 1;
  const validCurrentPage = Math.min(currentPage, totalPages);
  const startIdx = (validCurrentPage - 1) * itemsPerPage;
  const paginatedDataset = currentDataset.slice(startIdx, startIdx + itemsPerPage);
  const startItemNum = totalItems > 0 ? startIdx + 1 : 0;
  const endItemNum = Math.min(startIdx + itemsPerPage, totalItems);

  // Total metrics
  const totalCapacitySum = warehouses.reduce((acc, w) => acc + w.totalCapacity, 0);
  const totalUsedSum = warehouses.reduce((acc, w) => acc + w.usedCapacity, 0);
  const fillRatePercent = totalCapacitySum > 0 ? Math.round((totalUsedSum / totalCapacitySum) * 100) : 0;

  return (
    <div className="p-6 md:p-8 space-y-6 bg-[#f7fbf0] min-h-full">
      {/* Toast */}
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
            <Warehouse className="w-6 h-6 text-[#176a22]" />
            <span>Quản Lý Kho Nông Sản & Mùa Vụ</span>
          </h2>
          <p className="text-sm text-[#40493d] mt-1">
            Theo dõi hệ thống kho bãi, nhiệt độ bảo quản, quản lý nhập/xuất lô hàng và sức chứa toàn quốc
          </p>
        </div>

        {/* Action Button */}
        <div className="flex items-center space-x-2 self-start md:self-auto">
          {activeSub === 'warehouses' ? (
            <button
              onClick={handleOpenCreateWarehouse}
              className="px-4 py-2.5 bg-[#176a22] hover:bg-[#13561b] text-white text-xs font-bold rounded-xl shadow-xs transition-colors cursor-pointer flex items-center space-x-1.5"
            >
              <Plus className="w-4 h-4" />
              <span>Thêm Kho Mới</span>
            </button>
          ) : (
            <button
              onClick={handleOpenCreateBatch}
              className="px-4 py-2.5 bg-[#176a22] hover:bg-[#13561b] text-white text-xs font-bold rounded-xl shadow-xs transition-colors cursor-pointer flex items-center space-x-1.5"
            >
              <Plus className="w-4 h-4" />
              <span>Nhập Lô Hàng Vào Kho</span>
            </button>
          )}
        </div>
      </div>

      {/* Metric Summary Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-2xl border border-[#e0e4d9] shadow-2xs flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-[#707a6c] uppercase">Tổng số Kho bãi</span>
            <p className="text-xl font-bold text-[#181d16] mt-0.5">{warehouses.length} Kho hoạt động</p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-[#a3f69c]/30 text-[#003808] flex items-center justify-center font-bold">
            <Building2 className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-[#e0e4d9] shadow-2xs flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-[#707a6c] uppercase">Tỉ lệ lấp đầy hệ thống</span>
            <p className="text-xl font-bold text-[#176a22] mt-0.5">{fillRatePercent}% ({totalUsedSum.toLocaleString()} / {totalCapacitySum.toLocaleString()} Tấn)</p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-[#a3f69c]/30 text-[#003808] flex items-center justify-center font-bold">
            <BarChart2 className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-[#e0e4d9] shadow-2xs flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-[#707a6c] uppercase">Lô hàng trong kho</span>
            <p className="text-xl font-bold text-[#181d16] mt-0.5">{batches.length} Lô hàng lưu trữ</p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-[#a3f69c]/30 text-[#003808] flex items-center justify-center font-bold">
            <Package className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex items-center justify-between bg-white p-1.5 rounded-2xl border border-[#e0e4d9] shadow-2xs">
        <div className="flex items-center space-x-1">
          <button
            onClick={() => {
              setActiveSub('warehouses');
              setCurrentPage(1);
            }}
            className={`px-4 py-2.5 rounded-xl font-bold text-xs transition-all cursor-pointer flex items-center space-x-2 ${
              activeSub === 'warehouses'
                ? 'bg-[#a3f69c] text-[#003808] shadow-2xs'
                : 'text-[#40493d] hover:bg-[#f7fbf0]'
            }`}
          >
            <Warehouse className="w-4 h-4" />
            <span>Danh Sách Kho Nông Sản ({warehouses.length})</span>
          </button>

          <button
            onClick={() => {
              setActiveSub('batches');
              setCurrentPage(1);
            }}
            className={`px-4 py-2.5 rounded-xl font-bold text-xs transition-all cursor-pointer flex items-center space-x-2 ${
              activeSub === 'batches'
                ? 'bg-[#a3f69c] text-[#003808] shadow-2xs'
                : 'text-[#40493d] hover:bg-[#f7fbf0]'
            }`}
          >
            <Package className="w-4 h-4" />
            <span>Lô Hàng Tồn Kho ({batches.length})</span>
          </button>
        </div>
      </div>

      {/* Control Search Bar */}
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
            placeholder={
              activeSub === 'warehouses'
                ? 'Tìm tên kho, mã kho, tỉnh thành, người quản lý...'
                : 'Tìm mã lô, tên sản phẩm, nhà cung cấp...'
            }
            className="w-full pl-9 pr-4 py-2 bg-[#f7fbf0] border border-[#bfcaba] rounded-lg text-[#181d16] focus:outline-none focus:ring-2 focus:ring-[#176a22]"
          />
        </div>

        {activeSub === 'warehouses' && (
          <div className="flex items-center space-x-2 w-full md:w-auto">
            <div className="flex items-center space-x-1 bg-[#f7fbf0] px-3 py-1.5 rounded-lg border border-[#bfcaba]">
              <Filter className="w-3.5 h-3.5 text-[#707a6c]" />
              <span className="text-[#707a6c] font-medium">Loại kho:</span>
              <select
                value={filterType}
                onChange={(e) => {
                  setFilterType(e.target.value);
                  setCurrentPage(1);
                }}
                className="bg-transparent text-[#181d16] font-semibold focus:outline-none cursor-pointer"
              >
                <option value="all">Tất cả loại kho</option>
                <option value="Kho Mát">Kho Mát</option>
                <option value="Kho Đông Lạnh">Kho Đông Lạnh</option>
                <option value="Kho Thường / Hàng Khô">Kho Hàng Khô</option>
                <option value="Kho Trung Chuyển Export">Kho Trung Chuyển</option>
              </select>
            </div>
          </div>
        )}
      </div>

      {/* SUB TAB 1: WAREHOUSES GRID */}
      {activeSub === 'warehouses' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {(paginatedDataset as WarehouseItem[]).map((wh) => {
            const usagePercent = Math.round((wh.usedCapacity / wh.totalCapacity) * 100);

            return (
              <div
                key={wh.id}
                className="bg-white rounded-2xl border border-[#e0e4d9] p-5 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between space-y-4 group"
              >
                <div className="space-y-3">
                  {/* Top Bar */}
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-[10px] font-mono font-bold text-[#176a22] bg-[#f7fbf0] px-2 py-0.5 rounded-md border border-[#e0e4d9]">
                        {wh.code}
                      </span>
                      <h3 className="font-bold text-[#181d16] text-base mt-1 group-hover:text-[#176a22] transition-colors">
                        {wh.name}
                      </h3>
                    </div>

                    <span className="bg-[#a3f69c]/40 text-[#003808] text-[10px] font-bold px-2.5 py-1 rounded-full">
                      {wh.type}
                    </span>
                  </div>

                  {/* Info details */}
                  <div className="space-y-1.5 text-xs text-[#40493d]">
                    <div className="flex items-center space-x-1.5">
                      <MapPin className="w-3.5 h-3.5 text-[#707a6c] shrink-0" />
                      <span>{wh.location}</span>
                    </div>

                    <div className="flex items-center space-x-1.5">
                      <Thermometer className="w-3.5 h-3.5 text-[#d97706] shrink-0" />
                      <span>Nhiệt độ bảo quản: <strong>{wh.temperature}</strong></span>
                    </div>

                    <div className="flex items-center space-x-1.5">
                      <User className="w-3.5 h-3.5 text-[#707a6c] shrink-0" />
                      <span>Quản lý: <strong>{wh.manager}</strong> ({wh.phone})</span>
                    </div>
                  </div>

                  {/* Capacity Bar */}
                  <div className="space-y-1 pt-2">
                    <div className="flex items-center justify-between text-[11px] font-medium">
                      <span className="text-[#707a6c]">Dung lượng lưu trữ:</span>
                      <span className="font-bold text-[#181d16]">
                        {wh.usedCapacity.toLocaleString()} / {wh.totalCapacity.toLocaleString()} Tấn ({usagePercent}%)
                      </span>
                    </div>
                    <div className="w-full bg-[#f1f5ea] rounded-full h-2 overflow-hidden border border-[#e0e4d9]">
                      <div
                        className={`h-full rounded-full transition-all ${
                          usagePercent > 85 ? 'bg-[#ba1a1a]' : usagePercent > 60 ? 'bg-[#d97706]' : 'bg-[#176a22]'
                        }`}
                        style={{ width: `${Math.min(usagePercent, 100)}%` }}
                      />
                    </div>
                  </div>
                </div>

                {/* Explicitly Requested: EDIT & DELETE BUTTONS FOR WAREHOUSE */}
                <div className="pt-3 border-t border-[#e0e4d9] flex items-center justify-between text-xs">
                  <span className="text-[10px] text-[#707a6c]">Tạo ngày {wh.createdAt}</span>

                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => handleOpenEditWarehouse(wh)}
                      className="px-2.5 py-1.5 bg-[#f7fbf0] text-[#176a22] border border-[#bfcaba] hover:bg-[#a3f69c]/30 rounded-lg font-bold flex items-center space-x-1 cursor-pointer transition-colors"
                      title="Sửa thông tin kho"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                      <span>Sửa</span>
                    </button>

                    <button
                      onClick={() => setDeletingWarehouseId(wh.id)}
                      className="px-2.5 py-1.5 bg-red-50 text-[#ba1a1a] border border-red-200 hover:bg-red-100 rounded-lg font-bold flex items-center space-x-1 cursor-pointer transition-colors"
                      title="Xóa kho khỏi hệ thống"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Xóa</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* SUB TAB 2: INVENTORY BATCHES TABLE */}
      {activeSub === 'batches' && (
        <div className="bg-white rounded-2xl border border-[#e0e4d9] shadow-2xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-[#f1f5ea] border-b border-[#e0e4d9] text-[#707a6c] uppercase font-bold tracking-wider">
                  <th className="py-3.5 px-4">Mã Lô & Tên Sản Phẩm</th>
                  <th className="py-3.5 px-4">Kho Lưu Trữ</th>
                  <th className="py-3.5 px-4">Khối Lượng</th>
                  <th className="py-3.5 px-4">Ngày Nhập Kho</th>
                  <th className="py-3.5 px-4">Hạn Bảo Quản</th>
                  <th className="py-3.5 px-4">Nhà Cung Cấp</th>
                  <th className="py-3.5 px-4 text-center">Thao Tác Quản Lý</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#e0e4d9]">
                {(paginatedDataset as InventoryBatchItem[]).map((batch) => (
                  <tr key={batch.id} className="hover:bg-[#f7fbf0] transition-colors">
                    <td className="py-3.5 px-4">
                      <div className="space-y-0.5">
                        <span className="text-[10px] font-mono font-bold text-[#176a22]">{batch.batchCode}</span>
                        <p className="font-bold text-[#181d16]">{batch.productName}</p>
                      </div>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="bg-[#f7fbf0] text-[#181d16] border border-[#bfcaba] px-2.5 py-1 rounded-lg font-semibold text-[11px]">
                        {batch.warehouseName}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 font-bold text-[#176a22] text-xs">
                      {batch.quantity} {batch.unit}
                    </td>
                    <td className="py-3.5 px-4 text-[#40493d]">{batch.importDate}</td>
                    <td className="py-3.5 px-4 font-medium text-[#181d16]">{batch.expiryDate}</td>
                    <td className="py-3.5 px-4 text-[#40493d]">{batch.supplier}</td>
                    {/* Explicitly Requested: EDIT & DELETE BUTTONS FOR BATCH */}
                    <td className="py-3.5 px-4 text-center">
                      <div className="flex items-center justify-center space-x-1.5">
                        <button
                          onClick={() => handleOpenEditBatch(batch)}
                          className="p-1.5 text-[#176a22] hover:bg-[#a3f69c]/30 rounded-lg cursor-pointer transition-colors"
                          title="Sửa thông tin lô hàng"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setDeletingBatchId(batch.id)}
                          className="p-1.5 text-[#ba1a1a] hover:bg-red-100 rounded-lg cursor-pointer transition-colors"
                          title="Xóa / Xuất kho lô hàng"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* BOTTOM PAGINATION BAR */}
      {totalItems > 0 && (
        <div className="bg-white p-4 rounded-xl border border-[#e0e4d9] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#40493d] shadow-2xs">
          <div className="flex items-center space-x-3">
            <span>
              Hiển thị <strong>{startItemNum}</strong> - <strong>{endItemNum}</strong> trong tổng số <strong>{totalItems}</strong> {activeSub === 'warehouses' ? 'kho' : 'lô hàng'}
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
              disabled={validCurrentPage === 1}
              className={`p-1.5 rounded-lg border transition-all cursor-pointer flex items-center ${
                validCurrentPage === 1
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
                  validCurrentPage === page
                    ? 'bg-[#176a22] text-white shadow-xs'
                    : 'bg-white text-[#40493d] border border-[#e0e4d9] hover:bg-[#f7fbf0]'
                }`}
              >
                {page}
              </button>
            ))}

            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={validCurrentPage === totalPages}
              className={`p-1.5 rounded-lg border transition-all cursor-pointer flex items-center ${
                validCurrentPage === totalPages
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

      {/* MODAL 1: ADD / EDIT WAREHOUSE */}
      {showAddWarehouseModal && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full border border-[#e0e4d9] p-6 shadow-xl space-y-4 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-[#e0e4d9] pb-3">
              <h3 className="text-base font-bold text-[#181d16] flex items-center space-x-2">
                <Warehouse className="w-5 h-5 text-[#176a22]" />
                <span>{editingWarehouse ? 'Chỉnh Sửa Thông Tin Kho' : 'Thêm Kho Nông Sản Mới'}</span>
              </h3>
              <button
                onClick={() => setShowAddWarehouseModal(false)}
                className="text-[#707a6c] hover:text-[#181d16] p-1 rounded-lg cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveWarehouse} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-[#181d16] mb-1">
                  Tên Kho Nông Sản <span className="text-[#ba1a1a]">*</span>:
                </label>
                <input
                  type="text"
                  required
                  value={whName}
                  onChange={(e) => setWhName(e.target.value)}
                  placeholder="Ví dụ: Kho Lạnh Bảo Quản Dầu Tây Lâm Đồng"
                  className="w-full p-2.5 bg-[#f7fbf0] border border-[#bfcaba] rounded-xl text-[#181d16] font-medium focus:outline-none focus:ring-2 focus:ring-[#176a22]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-[#181d16] mb-1">Mã Kho:</label>
                  <input
                    type="text"
                    value={whCode}
                    onChange={(e) => setWhCode(e.target.value)}
                    className="w-full p-2.5 bg-[#f7fbf0] border border-[#bfcaba] rounded-xl text-[#181d16] font-mono focus:outline-none focus:ring-2 focus:ring-[#176a22]"
                  />
                </div>

                <div>
                  <label className="block font-bold text-[#181d16] mb-1">Loại Kho Bãi:</label>
                  <select
                    value={whType}
                    onChange={(e) => setWhType(e.target.value as any)}
                    className="w-full p-2.5 bg-[#f7fbf0] border border-[#bfcaba] rounded-xl text-[#181d16] font-semibold focus:outline-none cursor-pointer"
                  >
                    <option value="Kho Mát">Kho Mát</option>
                    <option value="Kho Đông Lạnh">Kho Đông Lạnh</option>
                    <option value="Kho Thường / Hàng Khô">Kho Hàng Khô</option>
                    <option value="Kho Trung Chuyển Export">Kho Trung Chuyển Export</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-[#181d16] mb-1">Tỉnh Thành / Địa Chỉ:</label>
                  <input
                    type="text"
                    value={whLocation}
                    onChange={(e) => setWhLocation(e.target.value)}
                    placeholder="Đà Lạt, Lâm Đồng"
                    className="w-full p-2.5 bg-[#f7fbf0] border border-[#bfcaba] rounded-xl text-[#181d16] focus:outline-none focus:ring-2 focus:ring-[#176a22]"
                  />
                </div>

                <div>
                  <label className="block font-bold text-[#181d16] mb-1">Sức Chứa Tối Đa (Tấn):</label>
                  <input
                    type="number"
                    value={whCapacity}
                    onChange={(e) => setWhCapacity(e.target.value)}
                    placeholder="2000"
                    className="w-full p-2.5 bg-[#f7fbf0] border border-[#bfcaba] rounded-xl text-[#181d16] font-bold focus:outline-none focus:ring-2 focus:ring-[#176a22]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-[#181d16] mb-1">Quản Lý Kho:</label>
                  <input
                    type="text"
                    value={whManager}
                    onChange={(e) => setWhManager(e.target.value)}
                    placeholder="Nguyễn Văn A"
                    className="w-full p-2.5 bg-[#f7fbf0] border border-[#bfcaba] rounded-xl text-[#181d16] focus:outline-none focus:ring-2 focus:ring-[#176a22]"
                  />
                </div>

                <div>
                  <label className="block font-bold text-[#181d16] mb-1">Số Điện Thoại:</label>
                  <input
                    type="text"
                    value={whPhone}
                    onChange={(e) => setWhPhone(e.target.value)}
                    placeholder="0912 345 678"
                    className="w-full p-2.5 bg-[#f7fbf0] border border-[#bfcaba] rounded-xl text-[#181d16] focus:outline-none focus:ring-2 focus:ring-[#176a22]"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-[#181d16] mb-1">Nhiệt Độ Bảo Quản Chẩn Chuẩn:</label>
                <input
                  type="text"
                  value={whTemp}
                  onChange={(e) => setWhTemp(e.target.value)}
                  placeholder="2°C - 8°C"
                  className="w-full p-2.5 bg-[#f7fbf0] border border-[#bfcaba] rounded-xl text-[#181d16] focus:outline-none focus:ring-2 focus:ring-[#176a22]"
                />
              </div>

              <div className="pt-3 border-t border-[#e0e4d9] flex items-center justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setShowAddWarehouseModal(false)}
                  className="px-4 py-2 bg-[#e0e4d9] text-[#40493d] rounded-xl font-bold cursor-pointer hover:bg-[#d0d4c9]"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#176a22] text-white rounded-xl font-bold cursor-pointer hover:bg-[#13561b] shadow-xs flex items-center space-x-1.5"
                >
                  <Check className="w-4 h-4" />
                  <span>{editingWarehouse ? 'Lưu Cập Nhật' : 'Tạo Kho Mới'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 2: ADD / EDIT INVENTORY BATCH */}
      {showAddBatchModal && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full border border-[#e0e4d9] p-6 shadow-xl space-y-4 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-[#e0e4d9] pb-3">
              <h3 className="text-base font-bold text-[#181d16] flex items-center space-x-2">
                <Package className="w-5 h-5 text-[#176a22]" />
                <span>{editingBatch ? 'Chỉnh Sửa Lô Hàng Tồn Kho' : 'Nhập Lô Hàng Nông Sản Mới'}</span>
              </h3>
              <button
                onClick={() => setShowAddBatchModal(false)}
                className="text-[#707a6c] hover:text-[#181d16] p-1 rounded-lg cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveBatch} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-[#181d16] mb-1">
                  Tên Sản Phẩm Nông Sản <span className="text-[#ba1a1a]">*</span>:
                </label>
                <input
                  type="text"
                  required
                  value={bName}
                  onChange={(e) => setBName(e.target.value)}
                  placeholder="Sầu riêng Ri6, Dầu tây, Cà phê Arabica..."
                  className="w-full p-2.5 bg-[#f7fbf0] border border-[#bfcaba] rounded-xl text-[#181d16] font-medium focus:outline-none focus:ring-2 focus:ring-[#176a22]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-[#181d16] mb-1">Mã Lô Hàng:</label>
                  <input
                    type="text"
                    value={bCode}
                    onChange={(e) => setBCode(e.target.value)}
                    className="w-full p-2.5 bg-[#f7fbf0] border border-[#bfcaba] rounded-xl text-[#181d16] font-mono focus:outline-none focus:ring-2 focus:ring-[#176a22]"
                  />
                </div>

                <div>
                  <label className="block font-bold text-[#181d16] mb-1">Lưu Tại Kho:</label>
                  <select
                    value={bWarehouseId}
                    onChange={(e) => setBWarehouseId(e.target.value)}
                    className="w-full p-2.5 bg-[#f7fbf0] border border-[#bfcaba] rounded-xl text-[#181d16] font-semibold focus:outline-none cursor-pointer"
                  >
                    {warehouses.map((w) => (
                      <option key={w.id} value={w.id}>
                        {w.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-[#181d16] mb-1">Khối Lượng Nhập (Tấn):</label>
                  <input
                    type="number"
                    value={bQuantity}
                    onChange={(e) => setBQuantity(e.target.value)}
                    className="w-full p-2.5 bg-[#f7fbf0] border border-[#bfcaba] rounded-xl text-[#181d16] font-bold focus:outline-none focus:ring-2 focus:ring-[#176a22]"
                  />
                </div>

                <div>
                  <label className="block font-bold text-[#181d16] mb-1">Hạn Bảo Quản / Xuất Kho:</label>
                  <input
                    type="date"
                    value={bExpiry}
                    onChange={(e) => setBExpiry(e.target.value)}
                    className="w-full p-2.5 bg-[#f7fbf0] border border-[#bfcaba] rounded-xl text-[#181d16] focus:outline-none focus:ring-2 focus:ring-[#176a22]"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-[#181d16] mb-1">Nhà Cung Cấp / Hợp Tác Xã:</label>
                <input
                  type="text"
                  value={bSupplier}
                  onChange={(e) => setBSupplier(e.target.value)}
                  placeholder="HTX Nông Sản Xuất Nhập Khẩu"
                  className="w-full p-2.5 bg-[#f7fbf0] border border-[#bfcaba] rounded-xl text-[#181d16] focus:outline-none focus:ring-2 focus:ring-[#176a22]"
                />
              </div>

              <div className="pt-3 border-t border-[#e0e4d9] flex items-center justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setShowAddBatchModal(false)}
                  className="px-4 py-2 bg-[#e0e4d9] text-[#40493d] rounded-xl font-bold cursor-pointer hover:bg-[#d0d4c9]"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#176a22] text-white rounded-xl font-bold cursor-pointer hover:bg-[#13561b] shadow-xs flex items-center space-x-1.5"
                >
                  <Check className="w-4 h-4" />
                  <span>{editingBatch ? 'Lưu Cập Nhật' : 'Nhập Lô Hàng'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* CONFIRM DELETE WAREHOUSE MODAL */}
      {deletingWarehouseId && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-sm w-full border border-[#e0e4d9] p-6 shadow-xl space-y-4 animate-in fade-in">
            <div className="flex items-center space-x-3 text-[#ba1a1a]">
              <AlertTriangle className="w-6 h-6 shrink-0" />
              <h3 className="font-bold text-base text-[#181d16]">Xác Nhận Xóa Kho</h3>
            </div>

            <p className="text-xs text-[#40493d] leading-relaxed">
              Bạn có chắc chắn muốn xóa kho này khỏi hệ thống quản lý? Thao tác này không thể hoàn tác.
            </p>

            <div className="flex items-center justify-end space-x-2 pt-2">
              <button
                onClick={() => setDeletingWarehouseId(null)}
                className="px-4 py-2 bg-[#e0e4d9] text-[#40493d] rounded-xl font-bold cursor-pointer hover:bg-[#d0d4c9] text-xs"
              >
                Hủy
              </button>
              <button
                onClick={handleConfirmDeleteWarehouse}
                className="px-4 py-2 bg-[#ba1a1a] text-white rounded-xl font-bold cursor-pointer hover:bg-[#9c1414] text-xs shadow-xs"
              >
                Xóa Kho
              </button>
            </div>
          </div>
        </div>
      )}

      {/* CONFIRM DELETE BATCH MODAL */}
      {deletingBatchId && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-sm w-full border border-[#e0e4d9] p-6 shadow-xl space-y-4 animate-in fade-in">
            <div className="flex items-center space-x-3 text-[#ba1a1a]">
              <AlertTriangle className="w-6 h-6 shrink-0" />
              <h3 className="font-bold text-base text-[#181d16]">Xác Nhận Xuất / Xóa Lô Hàng</h3>
            </div>

            <p className="text-xs text-[#40493d] leading-relaxed">
              Bạn có chắc chắn muốn xuất hoặc xóa lô hàng tồn kho này?
            </p>

            <div className="flex items-center justify-end space-x-2 pt-2">
              <button
                onClick={() => setDeletingBatchId(null)}
                className="px-4 py-2 bg-[#e0e4d9] text-[#40493d] rounded-xl font-bold cursor-pointer hover:bg-[#d0d4c9] text-xs"
              >
                Hủy
              </button>
              <button
                onClick={handleConfirmDeleteBatch}
                className="px-4 py-2 bg-[#ba1a1a] text-white rounded-xl font-bold cursor-pointer hover:bg-[#9c1414] text-xs shadow-xs"
              >
                Xóa Lô Hàng
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
