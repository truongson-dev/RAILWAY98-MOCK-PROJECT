import React, { useState } from 'react';
import { 
  X, 
  Search, 
  CircleDot, 
  MapPin, 
  Wheat, 
  Coffee, 
  Apple, 
  Plus, 
  Check, 
  Package, 
  Sprout, 
  Droplets,
  ChevronDown
} from 'lucide-react';

export interface AssignableOrder {
  id: string;
  orderCode: string;
  weight: string;
  pickupLocation: string;
  deliveryLocation: string;
  cargoType: string;
  expectedRevenue: string;
  isNew?: boolean;
}

const DEFAULT_ORDERS: AssignableOrder[] = [
  {
    id: 'ord-7829',
    orderCode: '#ORD-7829',
    weight: '12,500 kg',
    pickupLocation: 'Kho Tổng Quận 7',
    deliveryLocation: 'Siêu thị Mega Market Q2',
    cargoType: 'Lúa mì',
    expectedRevenue: '1.250.000 ₫',
    isNew: true
  },
  {
    id: 'ord-7830',
    orderCode: '#ORD-7830',
    weight: '24,500 kg',
    pickupLocation: 'Chợ Đầu Mối Bình Điền',
    deliveryLocation: 'Nhà hàng Sen Việt Q1',
    cargoType: 'Cà phê',
    expectedRevenue: '1.800.000 ₫',
    isNew: true
  },
  {
    id: 'ord-7831',
    orderCode: '#ORD-7831',
    weight: '8,500 kg',
    pickupLocation: 'Trang trại AgriFarm Củ Chi',
    deliveryLocation: 'Kho Trung Chuyển Q12',
    cargoType: 'Trái cây',
    expectedRevenue: '1.550.000 ₫',
    isNew: true
  },
  {
    id: 'ord-7832',
    orderCode: '#ORD-7832',
    weight: '15,000 kg',
    pickupLocation: 'Kho Nông Sản Đắk Lắk',
    deliveryLocation: 'Cảng Cát Lái, TP.HCM',
    cargoType: 'Ngô',
    expectedRevenue: '1.750.000 ₫',
    isNew: true
  },
  {
    id: 'ord-7833',
    orderCode: '#ORD-7833',
    weight: '10,000 kg',
    pickupLocation: 'Nông trường Cao su Bình Phước',
    deliveryLocation: 'Nhà máy Chế biến Bình Dương',
    cargoType: 'Sữa tươi',
    expectedRevenue: '1.450.000 ₫',
    isNew: true
  },
  {
    id: 'ord-7834',
    orderCode: '#ORD-7834',
    weight: '5,000 kg',
    pickupLocation: 'Hợp tác xã Điều Bình Phước',
    deliveryLocation: 'Kho Ngoại quan Long An',
    cargoType: 'Điều',
    expectedRevenue: '950.000 ₫',
    isNew: true
  },
  {
    id: 'ord-7835',
    orderCode: '#ORD-7835',
    weight: '7,200 kg',
    pickupLocation: 'Vùng nguyên liệu Hồ tiêu Gia Lai',
    deliveryLocation: 'Kho trung chuyển Quận 9',
    cargoType: 'Hồ tiêu',
    expectedRevenue: '1.100.000 ₫',
    isNew: true
  },
  {
    id: 'ord-7836',
    orderCode: '#ORD-7836',
    weight: '4,500 kg',
    pickupLocation: 'Vườn rau Đà Lạt',
    deliveryLocation: 'Chợ đầu mối Hóc Môn',
    cargoType: 'Rau củ',
    expectedRevenue: '850.000 ₫',
    isNew: true
  }
];

interface AssignOrderModalProps {
  isOpen: boolean;
  driverName: string;
  vehiclePlate?: string;
  assignedOrderCodes?: string[];
  onClose: () => void;
  onConfirmAssign: (selectedOrders: AssignableOrder[], driverName: string, vehiclePlate?: string) => void;
}

export const AssignOrderModal: React.FC<AssignOrderModalProps> = ({
  isOpen,
  driverName,
  vehiclePlate,
  assignedOrderCodes = [],
  onClose,
  onConfirmAssign
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCargo, setSelectedCargo] = useState('all');

  const unassignedOrders = DEFAULT_ORDERS.filter((order) => !assignedOrderCodes.includes(order.orderCode));

  const [selectedOrderIds, setSelectedOrderIds] = useState<string[]>(() => {
    return unassignedOrders.length > 0 ? [unassignedOrders[0].id] : [];
  });

  // Ensure selectedOrderId points to an unassigned order when assignedOrderCodes changes
  React.useEffect(() => {
    if (unassignedOrders.length > 0) {
      if (selectedOrderIds.length === 0 || !unassignedOrders.some(o => selectedOrderIds.includes(o.id))) {
        setSelectedOrderIds([unassignedOrders[0].id]);
      }
    } else {
      setSelectedOrderIds([]);
    }
  }, [assignedOrderCodes]);

  if (!isOpen) return null;

  const getCargoIcon = (cargo: string) => {
    const c = cargo.toLowerCase();
    if (c.includes('cà phê')) return <Coffee className="w-5 h-5 text-[#40493d]" />;
    if (c.includes('lúa') || c.includes('ngô')) return <Wheat className="w-5 h-5 text-[#40493d]" />;
    if (c.includes('trái') || c.includes('quả')) return <Apple className="w-5 h-5 text-[#40493d]" />;
    if (c.includes('rau') || c.includes('củ')) return <Sprout className="w-5 h-5 text-[#40493d]" />;
    if (c.includes('sữa')) return <Droplets className="w-5 h-5 text-[#40493d]" />;
    return <Package className="w-5 h-5 text-[#40493d]" />;
  };

  const filteredOrders = unassignedOrders.filter((order) => {
    const matchesSearch = 
      order.orderCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.pickupLocation.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.deliveryLocation.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.cargoType.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCargo = selectedCargo === 'all' || order.cargoType === selectedCargo;
    return matchesSearch && matchesCargo;
  });

  const toggleSelectOrder = (id: string) => {
    // Only select 1 order at a time
    setSelectedOrderIds([id]);
  };

  const handleConfirm = () => {
    const assignedList = DEFAULT_ORDERS.filter((o) => selectedOrderIds.includes(o.id));
    onConfirmAssign(assignedList, driverName, vehiclePlate);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-[#181d16]/40 backdrop-blur-xs animate-fadeIn">
      {/* Modal Container */}
      <div className="bg-[#ffffff] w-full max-w-4xl rounded-2xl shadow-2xl flex flex-col max-h-[92vh] overflow-hidden border border-[#bfcaba]">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between p-5 sm:p-6 border-b border-[#bfcaba] bg-white">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-[#181d16] leading-tight">Chỉ định đơn hàng</h2>
            <p className="text-sm text-[#40493d] mt-1 font-medium">
              Cho tài xế: <span className="font-extrabold text-[#181d16]">{driverName || 'Lê Văn A'}</span>
              {vehiclePlate ? <span className="ml-2 text-xs text-[#176a22] bg-[#c9ecc1] px-2 py-0.5 rounded-full font-bold">Xe: {vehiclePlate}</span> : null}
            </p>
          </div>
          <button 
            onClick={onClose}
            className="text-[#40493d] hover:text-[#181d16] transition-colors p-2 rounded-full hover:bg-[#ebefe4] cursor-pointer"
            title="Đóng"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Search & Filters */}
        <div className="p-4 sm:px-6 sm:py-3.5 bg-[#f7fbf0] border-b border-[#bfcaba] flex flex-col sm:flex-row gap-3 items-center justify-between sticky top-0 z-20">
          <div className="relative w-full sm:w-96">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#40493d]" />
            <input 
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Tìm kiếm mã đơn, điểm đi/đến..."
              className="w-full pl-9 pr-3 py-2 rounded-lg border border-[#bfcaba] bg-white focus:ring-2 focus:ring-[#176a22] focus:border-[#176a22] text-sm text-[#181d16] placeholder-[#40493d]/70 outline-none transition-all"
            />
          </div>

          <div className="flex gap-2 w-full sm:w-auto relative">
            <select
              value={selectedCargo}
              onChange={(e) => setSelectedCargo(e.target.value)}
              className="w-full sm:w-auto px-4 py-2 pr-8 rounded-lg border border-[#bfcaba] bg-white text-sm font-medium text-[#181d16] focus:ring-2 focus:ring-[#176a22] outline-none cursor-pointer appearance-none"
            >
              <option value="all">Loại hàng</option>
              <option value="Lúa mì">Lúa mì</option>
              <option value="Cà phê">Cà phê</option>
              <option value="Trái cây">Trái cây</option>
              <option value="Ngô">Ngô</option>
              <option value="Sữa tươi">Sữa tươi</option>
              <option value="Điều">Điều</option>
              <option value="Hồ tiêu">Hồ tiêu</option>
              <option value="Rau củ">Rau củ</option>
            </select>
            <ChevronDown className="w-4 h-4 text-[#40493d] absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>

        {/* Modal Body - Order List */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 bg-[#f1f5ea]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredOrders.length === 0 ? (
              <div className="col-span-full py-12 text-center text-[#40493d] font-medium bg-white rounded-xl border border-[#bfcaba]">
                Không tìm thấy đơn hàng nào phù hợp với từ khóa search/bộ lọc.
              </div>
            ) : (
              filteredOrders.map((order) => {
                const isSelected = selectedOrderIds.includes(order.id);
                return (
                  <div 
                    key={order.id}
                    onClick={() => toggleSelectOrder(order.id)}
                    className={`bg-white rounded-xl border p-4 transition-all hover:shadow-md cursor-pointer flex flex-col justify-between ${
                      isSelected 
                        ? 'border-[#176a22] ring-2 ring-[#176a22]/30 bg-white shadow-sm' 
                        : 'border-[#bfcaba] hover:border-[#176a22]/50'
                    }`}
                  >
                    <div>
                      {/* Top Code & Weight & Badge */}
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h3 className="text-lg font-bold text-[#181d16]">{order.orderCode}</h3>
                          <p className="text-sm text-[#40493d]">{order.weight}</p>
                        </div>
                        <span className="bg-[#c9ecc1] text-[#4e6c49] text-xs font-extrabold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                          MỚI
                        </span>
                      </div>

                      {/* Timeline: Pickup & Delivery */}
                      <div className="space-y-3 mb-4 relative pl-1">
                        {/* Vertical Connector Line */}
                        <div className="absolute left-[11px] top-[18px] bottom-[18px] w-0.5 bg-[#bfcaba]" />

                        {/* Pickup Point */}
                        <div className="flex items-start gap-2.5 relative">
                          <CircleDot className="w-5 h-5 text-[#176a22] bg-white rounded-full z-10 shrink-0 mt-0.5" />
                          <div>
                            <p className="text-[10px] font-bold text-[#40493d] uppercase tracking-wider">ĐIỂM LẤY</p>
                            <p className="text-sm font-semibold text-[#181d16]">{order.pickupLocation}</p>
                          </div>
                        </div>

                        {/* Delivery Point */}
                        <div className="flex items-start gap-2.5 relative">
                          <MapPin className="w-5 h-5 text-red-600 bg-white rounded-full z-10 shrink-0 mt-0.5" />
                          <div>
                            <p className="text-[10px] font-bold text-[#40493d] uppercase tracking-wider">ĐIỂM GIAO</p>
                            <p className="text-sm font-semibold text-[#181d16]">{order.deliveryLocation}</p>
                          </div>
                        </div>
                      </div>

                      {/* Cargo Type & Expected Revenue */}
                      <div className="bg-[#ebefe4] p-3 rounded-xl flex justify-between items-center mb-4">
                        <div className="flex items-center gap-2">
                          {getCargoIcon(order.cargoType)}
                          <div>
                            <p className="text-[10px] font-bold text-[#40493d] uppercase tracking-wider">LOẠI HÀNG</p>
                            <p className="text-xs font-bold text-[#181d16]">{order.cargoType}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-[10px] font-bold text-[#40493d] uppercase tracking-wider">DỰ KIẾN THU</p>
                          <p className="text-sm font-black text-[#176a22]">{order.expectedRevenue}</p>
                        </div>
                      </div>
                    </div>

                    {/* Button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleSelectOrder(order.id);
                      }}
                      className={`w-full font-bold text-sm py-2.5 rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                        isSelected
                          ? 'bg-[#176a22] hover:bg-[#12541a] text-white shadow-xs'
                          : 'bg-[#ebefe4] hover:bg-[#e5eadf] border border-[#bfcaba] text-[#181d16]'
                      }`}
                    >
                      {isSelected ? (
                        <>
                          <Check className="w-4 h-4" />
                          <span>Đã chọn</span>
                        </>
                      ) : (
                        <>
                          <Plus className="w-4 h-4" />
                          <span>Chọn đơn hàng</span>
                        </>
                      )}
                    </button>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 sm:p-5 bg-white border-t border-[#bfcaba] flex flex-col sm:flex-row justify-between items-center gap-3">
          <div className="text-sm text-[#40493d]">
            Đã chọn <span className="font-extrabold text-[#181d16] text-base">{selectedOrderIds.length}</span> đơn hàng
          </div>
          <div className="flex gap-3 w-full sm:w-auto">
            <button
              onClick={onClose}
              className="flex-1 sm:flex-none px-6 py-2.5 rounded-xl font-bold text-sm text-[#181d16] hover:bg-[#ebefe4] transition-colors cursor-pointer border border-transparent hover:border-[#bfcaba]"
            >
              Hủy
            </button>
            <button
              onClick={handleConfirm}
              disabled={selectedOrderIds.length === 0}
              className="flex-1 sm:flex-none px-6 py-2.5 rounded-xl font-bold text-sm bg-[#176a22] text-white hover:bg-[#12541a] disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-xs cursor-pointer"
            >
              Xác nhận chỉ định
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
