import React, { useState, useEffect } from 'react';
import { 
  X, 
  Warehouse, 
  Sparkles, 
  CheckCircle2, 
  Calendar, 
  Thermometer, 
  Droplets, 
  ShieldCheck, 
  Tag, 
  Boxes,
  FileText
} from 'lucide-react';
import { InventoryItem } from '../types';

interface AddInventoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddInventory: (item: Omit<InventoryItem, 'id'>) => void;
  initialData?: InventoryItem | null;
}

const PRESET_PRODUCTS = [
  'Cam Sành Tiền Giang',
  'Sầu riêng Ri6',
  'Gạo ST25 Sóc Trăng',
  'Cà phê Robusta Nhân Xô',
  'Xoài Cát Hòa Lộc',
  'Tiêu đen Hữu cơ',
  'Bưởi Da Xanh Bến Tre',
  'Thanh Long Bình Thuận'
];

const PRESET_LOCATIONS = [
  'Kho Lạnh A1 - Cụm Tiền Giang',
  'Kho Thông Thoát B2 - Chợ Mới',
  'Kho Bột Lúa C3 - Khô ráo',
  'Kho Đông Lạnh D1 - Bảo quản Sâu',
  'Kho Trung Chuyển Cần Thơ'
];

const PRESET_GRADES = [
  'Loại A (Xuất khẩu/Siêu thị)',
  'Hàng tuyển chọn VIP',
  'Đạt chuẩn Hữu cơ Organic',
  'Chuẩn VietGAP An Toàn',
  'Nông sản loại 2 (Nội địa)'
];

export const AddInventoryModal: React.FC<AddInventoryModalProps> = ({
  isOpen,
  onClose,
  onAddInventory,
  initialData
}) => {
  const [batchCode, setBatchCode] = useState('');
  const [productName, setProductName] = useState(PRESET_PRODUCTS[0]);
  const [warehouseLocation, setWarehouseLocation] = useState(PRESET_LOCATIONS[0]);
  const [quantityInStock, setQuantityInStock] = useState<number | ''>(500);
  const [unit, setUnit] = useState('kg');
  const [tempCelsius, setTempCelsius] = useState<number | ''>(8.5);
  const [humidityPercent, setHumidityPercent] = useState<number | ''>(80);
  const [qualityGrade, setQualityGrade] = useState(PRESET_GRADES[0]);
  const [entryDate, setEntryDate] = useState(() => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  });
  const [expiryDate, setExpiryDate] = useState(() => {
    const nextMonth = new Date();
    nextMonth.setDate(nextMonth.getDate() + 30);
    return nextMonth.toISOString().split('T')[0];
  });
  const [originNote, setOriginNote] = useState('');
  const [successFeedback, setSuccessFeedback] = useState('');

  useEffect(() => {
    if (initialData) {
      setBatchCode(initialData.batchCode);
      setProductName(initialData.productName);
      setWarehouseLocation(initialData.warehouseLocation);
      setQuantityInStock(initialData.quantityInStock);
      setUnit(initialData.unit);
      setTempCelsius(initialData.tempCelsius);
      setHumidityPercent(initialData.humidityPercent);
      setQualityGrade(initialData.qualityGrade);
      setEntryDate(initialData.entryDate);
      setExpiryDate(initialData.expiryDate);
    } else {
      generateAutoBatchCode();
    }
  }, [initialData, isOpen]);

  const generateAutoBatchCode = () => {
    const randomNum = Math.floor(100 + Math.random() * 900);
    const code = `BATCH-2026-LOHANG-${randomNum}`;
    setBatchCode(code);
  };

  const handlePresetStorage = (type: 'cold' | 'cool' | 'dry') => {
    if (type === 'cold') {
      setTempCelsius(5.0);
      setHumidityPercent(85);
      setWarehouseLocation('Kho Lạnh A1 - Cụm Tiền Giang');
    } else if (type === 'cool') {
      setTempCelsius(16.0);
      setHumidityPercent(75);
      setWarehouseLocation('Kho Thông Thoát B2 - Chợ Mới');
    } else {
      setTempCelsius(24.0);
      setHumidityPercent(60);
      setWarehouseLocation('Kho Bột Lúa C3 - Khô ráo');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!batchCode || !productName || quantityInStock === '' || quantityInStock <= 0) {
      alert('Vui lòng điền đầy đủ các thông tin bắt buộc.');
      return;
    }

    const formattedEntryDate = entryDate.includes('-') 
      ? entryDate.split('-').reverse().join('/') 
      : entryDate;

    const formattedExpiryDate = expiryDate.includes('-') 
      ? expiryDate.split('-').reverse().join('/') 
      : expiryDate;

    onAddInventory({
      batchCode,
      productName,
      warehouseLocation,
      quantityInStock: Number(quantityInStock),
      unit,
      tempCelsius: tempCelsius === '' ? 25 : Number(tempCelsius),
      humidityPercent: humidityPercent === '' ? 70 : Number(humidityPercent),
      qualityGrade,
      entryDate: formattedEntryDate,
      expiryDate: formattedExpiryDate
    });

    setSuccessFeedback('Đã tạo phiếu nhập kho thành công!');
    setTimeout(() => {
      setSuccessFeedback('');
      onClose();
    }, 800);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-[#bfcaba]/40 overflow-hidden my-8">
        
        {/* Modal Header */}
        <div className="bg-[#176a22] text-white p-5 sm:p-6 flex items-center justify-between relative overflow-hidden">
          <div className="flex items-center gap-3 relative z-10">
            <div className="w-11 h-11 rounded-2xl bg-white/15 backdrop-blur-md flex items-center justify-center text-white border border-white/20">
              <Warehouse size={22} />
            </div>
            <div>
              <h3 className="text-lg font-black text-white leading-tight">
                Phiếu Nhập Kho Lô Hàng Nông Sản
              </h3>
              <p className="text-xs text-[#a3f69c] font-medium mt-0.5">
                Điền thông tin định danh mã lô, vị trí lưu kho & thông số bảo quản
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-full transition-colors cursor-pointer relative z-10"
          >
            <X size={20} />
          </button>
        </div>

        {/* Success Alert Banner */}
        {successFeedback && (
          <div className="bg-[#c9ecc1] text-[#176a22] p-3 text-xs font-bold text-center flex items-center justify-center gap-2 border-b border-[#358439]/20 animate-in slide-in-from-top duration-300">
            <CheckCircle2 size={16} />
            <span>{successFeedback}</span>
          </div>
        )}

        {/* Modal Form */}
        <form onSubmit={handleSubmit} className="p-5 sm:p-6 space-y-5 max-h-[75vh] overflow-y-auto">
          
          {/* Batch Code & Auto-Generate Button */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 items-end">
            <div className="sm:col-span-2 space-y-1.5">
              <label className="block text-xs font-bold text-[#181d16] flex items-center gap-1.5">
                <Tag size={15} className="text-[#176a22]" />
                <span>Mã Lô Hàng Độc Bản (Batch Code) *</span>
              </label>
              <input
                type="text"
                required
                value={batchCode}
                onChange={(e) => setBatchCode(e.target.value)}
                placeholder="VD: BATCH-2026-CAM-08"
                className="w-full h-11 px-3.5 bg-[#f7fbf0] border border-[#bfcaba] focus:border-[#176a22] focus:ring-2 focus:ring-[#176a22]/20 rounded-xl text-sm font-bold text-[#176a22] outline-none transition-all"
              />
            </div>

            <button
              type="button"
              onClick={generateAutoBatchCode}
              className="h-11 px-3 bg-[#e0e4d9] hover:bg-[#176a22] hover:text-white text-[#181d16] font-bold text-xs rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5 shrink-0"
              title="Tự động tạo mã lô hợp chuẩn"
            >
              <Sparkles size={15} />
              <span>Tạo mã AI</span>
            </button>
          </div>

          {/* Product Name & Quantity */}
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
            
            {/* Product Name */}
            <div className="sm:col-span-7 space-y-1.5">
              <label className="block text-xs font-bold text-[#181d16]">
                Tên Nông Sản / Sản Phẩm *
              </label>
              <div className="relative">
                <input
                  type="text"
                  required
                  list="product-list-options"
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                  placeholder="Chọn hoặc nhập tên nông sản..."
                  className="w-full h-11 px-3.5 bg-[#f7fbf0] border border-[#bfcaba] focus:border-[#176a22] focus:ring-2 focus:ring-[#176a22]/20 rounded-xl text-sm font-semibold text-[#181d16] outline-none transition-all"
                />
                <datalist id="product-list-options">
                  {PRESET_PRODUCTS.map((prod) => (
                    <option key={prod} value={prod} />
                  ))}
                </datalist>
              </div>
            </div>

            {/* Quantity */}
            <div className="sm:col-span-3 space-y-1.5">
              <label className="block text-xs font-bold text-[#181d16]">
                Số Lượng Nhập *
              </label>
              <input
                type="number"
                required
                min="0.1"
                step="any"
                value={quantityInStock}
                onChange={(e) => setQuantityInStock(e.target.value === '' ? '' : Number(e.target.value))}
                placeholder="500"
                className="w-full h-11 px-3.5 bg-[#f7fbf0] border border-[#bfcaba] focus:border-[#176a22] focus:ring-2 focus:ring-[#176a22]/20 rounded-xl text-sm font-bold text-[#181d16] outline-none transition-all"
              />
            </div>

            {/* Unit */}
            <div className="sm:col-span-2 space-y-1.5">
              <label className="block text-xs font-bold text-[#181d16]">
                Đơn Vị
              </label>
              <select
                value={unit}
                onChange={(e) => setUnit(e.target.value)}
                className="w-full h-11 px-2.5 bg-[#f7fbf0] border border-[#bfcaba] focus:border-[#176a22] focus:ring-2 focus:ring-[#176a22]/20 rounded-xl text-sm font-bold text-[#181d16] outline-none cursor-pointer"
              >
                <option value="kg">kg</option>
                <option value="Tấn">Tấn</option>
                <option value="Bao">Bao</option>
                <option value="Thùng">Thùng</option>
                <option value="Yến">Yến</option>
              </select>
            </div>
          </div>

          {/* Warehouse Location & Presets */}
          <div className="space-y-1.5">
            <div className="flex justify-between items-center">
              <label className="block text-xs font-bold text-[#181d16] flex items-center gap-1.5">
                <Boxes size={15} className="text-[#176a22]" />
                <span>Vị Trí Kho Lưu Trữ *</span>
              </label>

              {/* Quick Preset Buttons */}
              <div className="hidden sm:flex items-center gap-1.5 text-[11px]">
                <span className="text-[#5e6958]">Chế độ chuẩn:</span>
                <button
                  type="button"
                  onClick={() => handlePresetStorage('cold')}
                  className="px-2 py-0.5 bg-blue-100 text-blue-800 hover:bg-blue-200 font-bold rounded-md transition-colors cursor-pointer"
                >
                  Kho Lạnh (8°C)
                </button>
                <button
                  type="button"
                  onClick={() => handlePresetStorage('dry')}
                  className="px-2 py-0.5 bg-amber-100 text-amber-800 hover:bg-amber-200 font-bold rounded-md transition-colors cursor-pointer"
                >
                  Kho Khô (24°C)
                </button>
              </div>
            </div>

            <input
              type="text"
              required
              list="location-options"
              value={warehouseLocation}
              onChange={(e) => setWarehouseLocation(e.target.value)}
              placeholder="Nhập hoặc chọn vị trí kho..."
              className="w-full h-11 px-3.5 bg-[#f7fbf0] border border-[#bfcaba] focus:border-[#176a22] focus:ring-2 focus:ring-[#176a22]/20 rounded-xl text-sm font-medium text-[#181d16] outline-none transition-all"
            />
            <datalist id="location-options">
              {PRESET_LOCATIONS.map((loc) => (
                <option key={loc} value={loc} />
              ))}
            </datalist>
          </div>

          {/* Storage Environment Conditions (Temperature & Humidity) */}
          <div className="p-4 bg-[#f7fbf0] rounded-2xl border border-[#d0d6c7] space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[#181d16] flex items-center gap-1.5">
                <Thermometer size={16} className="text-[#176a22]" />
                <span>Thông Số Môi Trường Bảo Quản Lô Hàng</span>
              </span>
              <span className="text-[10px] text-[#176a22] bg-[#c9ecc1] px-2 py-0.5 rounded-full font-extrabold">
                Kiểm soát IoT tự động
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="block text-[11px] font-semibold text-[#5e6958]">
                  Nhiệt độ bảo quản (°C)
                </label>
                <div className="relative">
                  <input
                    type="number"
                    step="0.1"
                    value={tempCelsius}
                    onChange={(e) => setTempCelsius(e.target.value === '' ? '' : Number(e.target.value))}
                    placeholder="8.5"
                    className="w-full h-10 px-3 pr-8 bg-white border border-[#bfcaba] focus:border-[#176a22] rounded-xl text-sm font-bold text-[#181d16] outline-none"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-[#5e6958]">°C</span>
                </div>
              </div>

              <div className="space-y-1">
                <label className="block text-[11px] font-semibold text-[#5e6958]">
                  Độ ẩm kho hàng (%)
                </label>
                <div className="relative">
                  <input
                    type="number"
                    step="1"
                    min="0"
                    max="100"
                    value={humidityPercent}
                    onChange={(e) => setHumidityPercent(e.target.value === '' ? '' : Number(e.target.value))}
                    placeholder="80"
                    className="w-full h-10 px-3 pr-8 bg-white border border-[#bfcaba] focus:border-[#176a22] rounded-xl text-sm font-bold text-[#181d16] outline-none"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-[#5e6958]">%</span>
                </div>
              </div>
            </div>
          </div>

          {/* Quality Grade */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-[#181d16] flex items-center gap-1.5">
              <ShieldCheck size={15} className="text-[#176a22]" />
              <span>Phân Loại Chất Lượng & Phẩm Cấp Nông Sản *</span>
            </label>
            <select
              value={qualityGrade}
              onChange={(e) => setQualityGrade(e.target.value)}
              className="w-full h-11 px-3 bg-[#f7fbf0] border border-[#bfcaba] focus:border-[#176a22] focus:ring-2 focus:ring-[#176a22]/20 rounded-xl text-sm font-bold text-[#181d16] outline-none cursor-pointer"
            >
              {PRESET_GRADES.map((grade) => (
                <option key={grade} value={grade}>{grade}</option>
              ))}
            </select>
          </div>

          {/* Dates: Entry Date & Expiry Date */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-[#181d16] flex items-center gap-1.5">
                <Calendar size={15} className="text-[#176a22]" />
                <span>Ngày Nhập Kho *</span>
              </label>
              <input
                type="date"
                required
                value={entryDate}
                onChange={(e) => setEntryDate(e.target.value)}
                className="w-full h-11 px-3 bg-[#f7fbf0] border border-[#bfcaba] focus:border-[#176a22] rounded-xl text-sm font-semibold text-[#181d16] outline-none"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-[#181d16] flex items-center gap-1.5">
                <Calendar size={15} className="text-[#ba1a1a]" />
                <span>Hạn Sử Dụng / Ngày Dự Kiến Xuất</span>
              </label>
              <input
                type="date"
                required
                value={expiryDate}
                onChange={(e) => setExpiryDate(e.target.value)}
                className="w-full h-11 px-3 bg-[#f7fbf0] border border-[#bfcaba] focus:border-[#176a22] rounded-xl text-sm font-semibold text-[#181d16] outline-none"
              />
            </div>
          </div>

          {/* Additional Notes / Plot Source */}
          <div className="space-y-1.5 pt-1">
            <label className="block text-xs font-bold text-[#181d16]">
              Ghi Chú Nguồn Gốc Lô Thu Hoạch & Chứng Nhận (Tùy chọn)
            </label>
            <textarea
              rows={2}
              value={originNote}
              onChange={(e) => setOriginNote(e.target.value)}
              placeholder="VD: Thu hoạch từ Lô A1 - Vườn Cam Sành VietGAP, mã số vùng trồng MSVT-8831..."
              className="w-full p-3 bg-[#f7fbf0] border border-[#bfcaba] focus:border-[#176a22] focus:ring-2 focus:ring-[#176a22]/20 rounded-xl text-xs font-medium text-[#181d16] outline-none transition-all resize-none"
            />
          </div>

          {/* Modal Actions */}
          <div className="pt-3 border-t border-[#e0e4d9] flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 border border-[#bfcaba] text-[#3e483a] hover:bg-[#f1f5ea] rounded-xl text-xs font-bold transition-colors cursor-pointer"
            >
              Hủy bỏ
            </button>

            <button
              type="submit"
              className="px-6 py-2.5 bg-[#176a22] hover:bg-[#12541b] active:bg-[#0e4315] text-white rounded-xl text-xs font-extrabold shadow-sm transition-all cursor-pointer flex items-center gap-2"
            >
              <CheckCircle2 size={16} />
              <span>Xác Nhận Nhập Kho</span>
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};
