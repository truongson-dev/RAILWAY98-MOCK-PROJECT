import React, { useState, useEffect } from 'react';
import { InventoryItem } from '../types';
import { 
  Warehouse, 
  Thermometer, 
  Droplets, 
  Plus, 
  Search, 
  Trash2, 
  Boxes, 
  Calendar, 
  ShieldCheck, 
  Tag,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

interface InventoryViewProps {
  inventory: InventoryItem[];
  onOpenAddInventoryModal: () => void;
  onDeleteInventory?: (id: string) => void;
}

export const InventoryView: React.FC<InventoryViewProps> = ({ 
  inventory, 
  onOpenAddInventoryModal,
  onDeleteInventory 
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLocation, setSelectedLocation] = useState<string>('all');
  const [currentPage, setCurrentPage] = useState(1);

  // Filtered inventory list
  const filteredInventory = inventory.filter((item) => {
    const matchesSearch = 
      item.productName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.batchCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.warehouseLocation.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesLocation = selectedLocation === 'all' || item.warehouseLocation.includes(selectedLocation);

    return matchesSearch && matchesLocation;
  });

  // Reset page on filter or search change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedLocation]);

  // Pagination calculation
  const itemsPerPage = 3;
  const totalItems = filteredInventory.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage) || 1;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedInventory = filteredInventory.slice(startIndex, startIndex + itemsPerPage);

  // Calculate total stock
  const totalStockKg = inventory.reduce((sum, item) => {
    if (item.unit === 'Tấn') return sum + item.quantityInStock * 1000;
    return sum + item.quantityInStock;
  }, 0);

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl border border-[#e0e4d9] flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 shadow-2xs">
        <div>
          <h2 className="text-xl font-bold text-[#181d16] flex items-center gap-2">
            <Warehouse size={24} className="text-[#176a22]" />
            Quản Lý Kho Hàng & Lô Nông Sản
          </h2>
          <p className="text-sm text-[#5e6958]">
            Kiểm soát nhiệt độ kho lạnh, hạn sử dụng và phân loại chất lượng hàng nông sản lưu kho.
          </p>
        </div>

        <button 
          id="btn-add-inventory-batch"
          onClick={onOpenAddInventoryModal}
          className="bg-[#176a22] hover:bg-[#12541b] active:bg-[#0e4315] text-white px-5 py-3 rounded-xl font-extrabold text-xs flex items-center gap-2 shadow-xs transition-all cursor-pointer shrink-0"
        >
          <Plus size={18} />
          Nhập kho lô hàng
        </button>
      </div>

      {/* Warehouse Condition Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-[#f7fbf0] p-4 rounded-2xl border border-[#e0e4d9] flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-[#dbe6cf] text-[#176a22] flex items-center justify-center shrink-0">
            <Boxes size={24} />
          </div>
          <div>
            <p className="text-xs font-bold text-[#5e6958] uppercase">Tổng tồn kho khả dụng</p>
            <h3 className="text-xl font-extrabold text-[#181d16]">
              {(totalStockKg / 1000).toFixed(1)} Tấn ({inventory.length} lô)
            </h3>
          </div>
        </div>

        <div className="bg-[#f7fbf0] p-4 rounded-2xl border border-[#e0e4d9] flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-800 flex items-center justify-center shrink-0">
            <Thermometer size={24} />
          </div>
          <div>
            <p className="text-xs font-bold text-[#5e6958] uppercase">Nhiệt độ Kho Lạnh A1</p>
            <h3 className="text-xl font-extrabold text-[#181d16]">8.5 °C (Ổn định)</h3>
          </div>
        </div>

        <div className="bg-[#f7fbf0] p-4 rounded-2xl border border-[#e0e4d9] flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-teal-100 text-teal-800 flex items-center justify-center shrink-0">
            <Droplets size={24} />
          </div>
          <div>
            <p className="text-xs font-bold text-[#5e6958] uppercase">Độ ẩm trung bình kho</p>
            <h3 className="text-xl font-extrabold text-[#181d16]">71.6 %</h3>
          </div>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="bg-white p-4 rounded-2xl border border-[#e0e4d9] flex flex-col sm:flex-row gap-3 justify-between items-center">
        <div className="relative w-full sm:w-80">
          <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#5e6958]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Tìm theo mã lô, tên nông sản, kho..."
            className="w-full h-10 pl-10 pr-4 bg-[#f7fbf0] border border-[#bfcaba] focus:border-[#176a22] rounded-xl text-xs font-medium outline-none"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
          <span className="text-xs font-bold text-[#5e6958] shrink-0">Lọc theo kho:</span>
          <button
            onClick={() => setSelectedLocation('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all shrink-0 cursor-pointer ${
              selectedLocation === 'all'
                ? 'bg-[#176a22] text-white'
                : 'bg-[#f7fbf0] text-[#181d16] hover:bg-[#e0e4d9]'
            }`}
          >
            Tất cả
          </button>
          <button
            onClick={() => setSelectedLocation('Kho Lạnh')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all shrink-0 cursor-pointer ${
              selectedLocation === 'Kho Lạnh'
                ? 'bg-[#176a22] text-white'
                : 'bg-[#f7fbf0] text-[#181d16] hover:bg-[#e0e4d9]'
            }`}
          >
            Kho Lạnh
          </button>
          <button
            onClick={() => setSelectedLocation('Kho Thông Thoát')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all shrink-0 cursor-pointer ${
              selectedLocation === 'Kho Thông Thoát'
                ? 'bg-[#176a22] text-white'
                : 'bg-[#f7fbf0] text-[#181d16] hover:bg-[#e0e4d9]'
            }`}
          >
            Kho Thông Thoát
          </button>
        </div>
      </div>

      {/* Inventory Items Grid */}
      {filteredInventory.length === 0 ? (
        <div className="bg-white rounded-2xl border border-[#e0e4d9] p-12 text-center space-y-3">
          <Warehouse size={40} className="mx-auto text-[#5e6958]/50" />
          <p className="font-bold text-[#181d16] text-sm">Chưa có lô hàng nào phù hợp với bộ lọc</p>
          <button
            onClick={onOpenAddInventoryModal}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#176a22] hover:underline cursor-pointer"
          >
            <Plus size={16} /> Nhập kho lô hàng mới ngay
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {paginatedInventory.map((item) => (
              <div key={item.id} className="bg-white rounded-2xl border border-[#e0e4d9] p-5 space-y-4 shadow-2xs hover:border-[#176a22] transition-all relative group">
                <div className="flex justify-between items-start">
                  <div className="pr-2">
                    <span className="text-[10px] font-black uppercase text-[#176a22] bg-[#dbe6cf] px-2 py-0.5 rounded-md inline-flex items-center gap-1">
                      <Tag size={12} /> {item.batchCode}
                    </span>
                    <h3 className="font-bold text-[#181d16] text-base mt-1.5 leading-snug">{item.productName}</h3>
                    <p className="text-xs text-[#5e6958] flex items-center gap-1 mt-0.5">
                      <Warehouse size={13} className="shrink-0 text-[#176a22]" />
                      <span>{item.warehouseLocation}</span>
                    </p>
                  </div>

                  <div className="text-right shrink-0">
                    <span className="text-lg font-black text-[#176a22]">
                      {item.quantityInStock} {item.unit}
                    </span>
                  </div>
                </div>

                {/* Temp & Humidity Box */}
                <div className="grid grid-cols-2 gap-2 text-xs bg-[#f7fbf0] p-3 rounded-xl border border-[#e0e4d9]">
                  <div>
                    <span className="text-[#5e6958] text-[11px]">Nhiệt độ bảo quản:</span>
                    <p className="font-bold text-[#181d16] text-xs flex items-center gap-1">
                      <Thermometer size={14} className="text-[#176a22]" /> {item.tempCelsius}°C
                    </p>
                  </div>
                  <div>
                    <span className="text-[#5e6958] text-[11px]">Độ ẩm kho:</span>
                    <p className="font-bold text-[#181d16] text-xs flex items-center gap-1">
                      <Droplets size={14} className="text-teal-700" /> {item.humidityPercent}%
                    </p>
                  </div>
                </div>

                {/* Dates & Quality Details */}
                <div className="text-xs space-y-1.5 text-[#5e6958] pt-1 border-t border-[#e0e4d9]">
                  <div className="flex justify-between items-center">
                    <span className="flex items-center gap-1"><ShieldCheck size={13} className="text-[#176a22]" /> Phẩm cấp:</span>
                    <span className="font-bold text-[#181d16] text-[11px] bg-[#f1f5ea] px-2 py-0.5 rounded-md">{item.qualityGrade}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="flex items-center gap-1"><Calendar size={13} /> Ngày nhập kho:</span>
                    <span className="font-semibold text-[#181d16]">{item.entryDate}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="flex items-center gap-1"><Calendar size={13} className="text-[#ba1a1a]" /> Hạn lưu kho:</span>
                    <span className="font-extrabold text-[#ba1a1a]">{item.expiryDate}</span>
                  </div>
                </div>

                {/* Action Buttons */}
                {onDeleteInventory && (
                  <div className="pt-2 flex justify-end">
                    <button
                      onClick={() => {
                        if (confirm(`Bạn có chắc muốn xóa lô hàng ${item.batchCode}?`)) {
                          onDeleteInventory(item.id);
                        }
                      }}
                      className="p-1.5 text-[#5e6958] hover:text-[#ba1a1a] rounded-lg hover:bg-[#f1f5ea] transition-colors cursor-pointer text-xs flex items-center gap-1 font-semibold"
                      title="Xóa lô hàng"
                    >
                      <Trash2 size={14} /> Xóa lô
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Pagination Controls */}
          <div className="bg-white px-5 py-4 rounded-2xl border border-[#e0e4d9] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs shadow-2xs">
            <span className="text-[#5e6958] font-medium">
              Hiển thị <span className="font-bold text-[#181d16]">{totalItems > 0 ? startIndex + 1 : 0}</span> - <span className="font-bold text-[#181d16]">{Math.min(startIndex + itemsPerPage, totalItems)}</span> trên tổng số <span className="font-bold text-[#181d16]">{totalItems}</span> lô hàng
            </span>

            <div className="flex items-center gap-1.5">
              <button
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="px-3 py-1.5 rounded-xl border border-[#e0e4d9] bg-white text-[#181d16] hover:bg-[#f1f5ea] disabled:opacity-40 disabled:hover:bg-white font-bold flex items-center gap-1 transition-all cursor-pointer disabled:cursor-not-allowed"
              >
                <ChevronLeft size={16} /> Trang trước
              </button>

              <div className="flex items-center gap-1 px-2">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                  <button
                    key={pageNum}
                    onClick={() => setCurrentPage(pageNum)}
                    className={`w-8 h-8 rounded-xl font-black text-xs transition-all cursor-pointer ${
                      currentPage === pageNum
                        ? 'bg-[#176a22] text-white shadow-2xs scale-105'
                        : 'bg-[#f7fbf0] text-[#181d16] hover:bg-[#e0e4d9]'
                    }`}
                  >
                    {pageNum}
                  </button>
                ))}
              </div>

              <button
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="px-3 py-1.5 rounded-xl border border-[#e0e4d9] bg-white text-[#181d16] hover:bg-[#f1f5ea] disabled:opacity-40 disabled:hover:bg-white font-bold flex items-center gap-1 transition-all cursor-pointer disabled:cursor-not-allowed"
              >
                Trang sau <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

