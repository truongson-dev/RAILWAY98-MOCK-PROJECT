import React from 'react';
import { 
  X, 
  Truck, 
  PlusCircle, 
  SlidersHorizontal, 
  ArrowRight,
  Search,
  Package
} from 'lucide-react';

interface SearchResultsOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  searchTerm?: string;
  onSelectSearchTag?: (tag: string) => void;
  onAssignTruck?: (plate: string) => void;
  onCreateNewShipment?: () => void;
  onViewAllResults?: () => void;
}

export const SearchResultsOverlay: React.FC<SearchResultsOverlayProps> = ({
  isOpen,
  onClose,
  searchTerm = '',
  onSelectSearchTag,
  onAssignTruck,
  onCreateNewShipment,
  onViewAllResults
}) => {
  if (!isOpen) return null;

  const termLower = searchTerm.toLowerCase().trim();

  // Generic keyword lists
  const genericFleetTerms = ['biển số xe', 'biển số', 'xe', 'tài xế', 'tìm xe', 'đội xe'];
  const genericOrderTerms = ['mã đơn hàng', 'mã đơn', 'đơn hàng', 'tìm đơn', 'đơn'];

  const isGenericFleetQuery = !termLower || genericFleetTerms.some(term => 
    termLower === term || (termLower.includes(term) && !/\d/.test(termLower))
  );
  
  const isGenericOrderQuery = genericOrderTerms.some(term => 
    termLower === term || (termLower.includes(term) && !/\d/.test(termLower) && !termLower.includes('xe'))
  );

  // Detect whether search is for an Order or Fleet/Truck
  const orderSpecificKeywords = ['ord', 'ag-', '#', '5012', '4988', '5011', '5015', '7830', '7831', '98770', '98760', '8829', '7829'];
  const isOrderQuery = isGenericOrderQuery || orderSpecificKeywords.some(k => termLower.includes(k));

  // ==================== DATA SOURCES ====================
  // Fleet Data
  const activeTrucks = [
    {
      plate: '51H-123.45',
      driver: 'Nguyễn Văn A',
      status: 'Đang di chuyển',
      pickup: 'Kho Tổng Agri Mart - Đà Lạt',
      delivery: 'Chợ Đầu Mối Bình Điền - HCM'
    },
    {
      plate: '29C-987.65',
      driver: 'Trần Thế B',
      status: 'Đang di chuyển',
      pickup: 'Hợp tác xã Rau sạch - Bảo Lộc',
      delivery: 'Cửa hàng thực phẩm Q7 - HCM'
    },
    {
      plate: '60C-223.11',
      driver: 'Nguyễn Văn C',
      status: 'Đang di chuyển',
      pickup: 'Kho Nông Sản Long Khánh',
      delivery: 'Chợ Đầu Mối Hóc Môn - HCM'
    },
    {
      plate: '51D-004.92',
      driver: 'Lê Văn D',
      status: 'Đang di chuyển',
      pickup: 'Vườn Trái Cây Tiền Giang',
      delivery: 'Kho Lạnh Quận 9 - HCM'
    }
  ];

  const pendingTrucks = [
    { plate: '60C-224.11 (Xe 2.5T)', location: 'Khu vực: Bãi đỗ Gia Lâm', rawPlate: '60C-224.11' },
    { plate: '51D-005.92 (Xe Lạnh 5T)', location: 'Khu vực: Bãi đỗ Bắc Ninh', rawPlate: '51D-005.92' }
  ];

  const completedTrucks = [
    { plate: '63H-882.34', time: 'Giao thành công: 10:45 AM' },
    { plate: '50E-111.90', time: 'Giao thành công: 09:12 AM' }
  ];

  // Orders Data
  const confirmedOrders = [
    {
      code: '#AG-5012',
      driver: 'Nguyễn Văn A',
      vehicle: '29H-123.45',
      pickup: 'Kho Tổng Agri Mart - Đà Lạt',
      delivery: 'Chợ Đầu Mối Bình Điền - HCM',
      status: 'ĐÃ XÁC NHẬN'
    },
    {
      code: '#AG-4988',
      driver: 'Trần Thế B',
      vehicle: '51C-987.65',
      pickup: 'HTX Rau sạch - Bảo Lộc',
      delivery: 'Cửa hàng thực phẩm Q7 - HCM',
      status: 'ĐÃ XÁC NHẬN'
    },
    {
      code: '#AG-5011',
      driver: 'Nguyễn Văn C',
      vehicle: '60C-223.11',
      pickup: 'Kho Nông Sản Long Khánh',
      delivery: 'Chợ Đầu Mối Hóc Môn - HCM',
      status: 'ĐÃ XÁC NHẬN'
    },
    {
      code: '#AG-5015',
      driver: 'Lê Văn D',
      vehicle: '51D-004.92',
      pickup: 'Vườn Trái Cây Tiền Giang',
      delivery: 'Kho Lạnh Quận 9 - HCM',
      status: 'ĐÃ XÁC NHẬN'
    }
  ];

  const pendingOrders = [
    {
      code: '#ORD-7830',
      pickup: 'Chợ Đầu Mối Bình Điền',
      delivery: 'Nhà hàng Sen Việt Q1',
      status: 'CHỜ XÁC NHẬN'
    },
    {
      code: '#ORD-7831',
      pickup: 'Trang trại AgriFarm Củ Chi',
      delivery: 'Kho Trung Chuyển Q12',
      status: 'CHỜ XÁC NHẬN'
    }
  ];

  const completedOrders = [
    {
      code: '#ORD-98770',
      pickup: 'Bãi đỗ Huế',
      delivery: 'Bãi đỗ Quy Nhơn',
      status: 'HOÀN THÀNH'
    },
    {
      code: '#ORD-98760',
      pickup: 'Bãi đỗ Quy Nhơn',
      delivery: 'Bãi đỗ Huế',
      status: 'HOÀN THÀNH'
    }
  ];

  // ==================== FILTERING LOGIC ====================
  const filteredActiveTrucks = activeTrucks.filter(t =>
    isGenericFleetQuery ||
    t.plate.toLowerCase().includes(termLower) ||
    t.driver.toLowerCase().includes(termLower) ||
    t.pickup.toLowerCase().includes(termLower) ||
    t.delivery.toLowerCase().includes(termLower)
  );

  const filteredPendingTrucks = pendingTrucks.filter(t =>
    isGenericFleetQuery ||
    t.plate.toLowerCase().includes(termLower) ||
    t.location.toLowerCase().includes(termLower)
  );

  const filteredCompletedTrucks = completedTrucks.filter(c =>
    isGenericFleetQuery ||
    c.plate.toLowerCase().includes(termLower)
  );

  const filteredConfirmedOrders = confirmedOrders.filter(o =>
    isGenericOrderQuery ||
    o.code.toLowerCase().includes(termLower) ||
    (o.driver && o.driver.toLowerCase().includes(termLower)) ||
    (o.vehicle && o.vehicle.toLowerCase().includes(termLower)) ||
    o.pickup.toLowerCase().includes(termLower) ||
    o.delivery.toLowerCase().includes(termLower)
  );

  const filteredPendingOrders = pendingOrders.filter(o =>
    isGenericOrderQuery ||
    o.code.toLowerCase().includes(termLower) ||
    o.pickup.toLowerCase().includes(termLower) ||
    o.delivery.toLowerCase().includes(termLower)
  );

  const filteredCompletedOrders = completedOrders.filter(o =>
    isGenericOrderQuery ||
    o.code.toLowerCase().includes(termLower) ||
    o.pickup.toLowerCase().includes(termLower) ||
    o.delivery.toLowerCase().includes(termLower)
  );

  const fleetTotalMatches = filteredActiveTrucks.length + filteredPendingTrucks.length + filteredCompletedTrucks.length;
  const orderTotalMatches = filteredConfirmedOrders.length + filteredPendingOrders.length + filteredCompletedOrders.length;

  const currentMatchCount = isOrderQuery ? orderTotalMatches : fleetTotalMatches;

  return (
    <div className="fixed inset-0 z-50 bg-black/35 backdrop-blur-2xs flex justify-center items-start pt-12 pb-6 px-4 animate-in fade-in duration-150">
      <div className="w-full max-w-[500px] max-h-[calc(100vh-80px)] bg-[#f7fbf0] shadow-2xl flex flex-col border border-[#bfcaba] rounded-2xl overflow-hidden relative">
        
        {/* OVERLAY HEADER */}
        <div className="flex items-center justify-between px-5 py-3.5 bg-[#f7fbf0] border-b border-[#bfcaba]/70 sticky top-0 z-40">
          <div className="flex items-center gap-2.5">
            <h2 className="font-bold text-base text-[#181d16]">
              Kết quả tìm kiếm
            </h2>
            <span className="w-6 h-6 rounded-full bg-[#e60000] text-white text-xs font-extrabold flex items-center justify-center shadow-2xs">
              {currentMatchCount}
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-1 hover:bg-[#e5eadf] rounded-full transition-colors text-[#181d16]"
            aria-label="Đóng"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* SCROLLABLE BODY */}
        <div className="flex-1 overflow-y-auto p-4 bg-[#f7fbf0] space-y-4">
          
          {/* ========================================================= */}
          {/* INTERFACE 1: FLEET SEARCH RESULTS (TÌM XE & TÀI XẾ)       */}
          {/* ========================================================= */}
          {!isOrderQuery && (
            <>
              {/* SECTION 1: XE ĐANG GIAO HÀNG */}
              {filteredActiveTrucks.length > 0 && (
                <div>
                  <div className="flex items-center justify-between mb-2.5">
                    <h3 className="text-[11px] font-bold text-[#176a22] uppercase tracking-wider">
                      XE ĐANG GIAO HÀNG ({filteredActiveTrucks.length})
                    </h3>
                    <span className="px-2 py-0.5 bg-[#176a22] text-white text-[10px] font-bold rounded">
                      LIVE
                    </span>
                  </div>

                  <div className="space-y-3">
                    {filteredActiveTrucks.map((truck, idx) => (
                      <div
                        key={idx}
                        className="p-3.5 bg-white border border-[#bfcaba] rounded-xl shadow-2xs hover:shadow-xs transition-shadow"
                      >
                        <div className="flex justify-between items-start mb-1">
                          <p className="text-base font-extrabold text-[#176a22]">{truck.plate}</p>
                          <span className="px-2.5 py-0.5 bg-[#d2f3cd] text-[#176a22] rounded-full text-[11px] font-semibold">
                            {truck.status}
                          </span>
                        </div>

                        <p className="text-xs text-[#40493d] mb-2.5">
                          Tài xế: <span className="text-[#181d16] font-medium">{truck.driver}</span>
                        </p>

                        <div className="space-y-1.5 text-xs">
                          <div className="flex items-center gap-2">
                            <span className="w-2.5 h-2.5 rounded-full bg-[#176a22] flex-shrink-0" />
                            <p className="text-[#181d16]">
                              <span className="font-semibold text-[#40493d]">Điểm lấy:</span> {truck.pickup}
                            </p>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="w-2.5 h-2.5 rounded-full border-2 border-[#9d3c5f] flex-shrink-0" />
                            <p className="text-[#181d16]">
                              <span className="font-semibold text-[#40493d]">Điểm giao:</span> {truck.delivery}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* SECTION 2: XE ĐANG CHỜ PHÂN CÔNG */}
              {filteredPendingTrucks.length > 0 && (
                <div>
                  <h3 className="text-[11px] font-bold text-[#40493d] uppercase tracking-wider mb-2.5">
                    XE ĐANG CHỜ PHÂN CÔNG ({filteredPendingTrucks.length})
                  </h3>

                  <div className="space-y-2.5">
                    {filteredPendingTrucks.map((truck, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between p-3 bg-[#ebefe4] border border-[#bfcaba]/80 rounded-xl"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-[#e0e6d8] flex items-center justify-center flex-shrink-0">
                            <Truck className="w-5 h-5 text-[#40493d]" />
                          </div>
                          <div>
                            <p className="text-sm font-bold text-[#181d16]">{truck.plate}</p>
                            <p className="text-xs text-[#40493d]">{truck.location}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* SECTION 3: XE ĐÃ GIAO XONG GẦN ĐÂY */}
              {filteredCompletedTrucks.length > 0 && (
                <div>
                  <h3 className="text-[11px] font-bold text-[#40493d] uppercase tracking-wider mb-2.5">
                    XE ĐÃ GIAO XONG GẦN ĐÂY ({filteredCompletedTrucks.length})
                  </h3>

                  <div className="space-y-2 bg-[#f1f5ea] border border-[#bfcaba]/80 rounded-xl p-3">
                    {filteredCompletedTrucks.map((truck, idx) => (
                      <div key={idx} className="flex justify-between items-center text-xs">
                        <div>
                          <p className="font-bold text-[#181d16]">{truck.plate}</p>
                          <p className="text-[11px] text-[#40493d]">{truck.time}</p>
                        </div>
                        <span className="px-2 py-0.5 bg-[#e2eadb] text-[#40493d] text-[10px] font-bold rounded">
                          HOÀN TẤT
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {fleetTotalMatches === 0 && (
                <div className="py-12 text-center space-y-2">
                  <Search className="w-8 h-8 text-[#40493d] mx-auto opacity-50" />
                  <p className="text-sm font-bold text-[#181d16]">Không tìm thấy xe hay tài xế phù hợp</p>
                  <p className="text-xs text-[#40493d]">Không có dữ liệu trùng khớp với từ khóa "{searchTerm}"</p>
                </div>
              )}
            </>
          )}

          {/* ========================================================= */}
          {/* INTERFACE 2: ORDERS SEARCH RESULTS (TÌM MÃ ĐƠN HÀNG)      */}
          {/* ========================================================= */}
          {isOrderQuery && (
            <>
              {/* SECTION 1: ĐƠN HÀNG ĐÃ XÁC NHẬN */}
              {filteredConfirmedOrders.length > 0 && (
                <div>
                  <h3 className="text-[11px] font-bold text-[#40493d] uppercase tracking-wider mb-2.5">
                    ĐƠN HÀNG ĐÃ XÁC NHẬN ({filteredConfirmedOrders.length})
                  </h3>

                  <div className="space-y-2.5">
                    {filteredConfirmedOrders.map((ord, idx) => (
                      <div
                        key={idx}
                        className="p-3.5 bg-white border border-[#bfcaba] rounded-xl shadow-2xs"
                      >
                        <div className="flex justify-between items-start mb-1.5">
                          <div>
                            <span className="text-base font-extrabold text-[#176a22] font-mono block">
                              {ord.code}
                            </span>
                            {ord.driver && (
                              <span className="text-[11px] text-[#525e4e] font-medium block">
                                Tài xế: <strong>{ord.driver}</strong> ({ord.vehicle})
                              </span>
                            )}
                          </div>
                          <span className="px-2.5 py-0.5 bg-[#e3f4e0] text-[#176a22] rounded text-[11px] font-bold shrink-0">
                            {ord.status}
                          </span>
                        </div>
                        <p className="text-xs text-[#40493d] font-medium flex items-center gap-1.5 mt-2">
                          <span>{ord.pickup}</span>
                          <ArrowRight className="w-3.5 h-3.5 text-[#176a22] flex-shrink-0" />
                          <span>{ord.delivery}</span>
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* SECTION 2: ĐANG CHỜ XÁC NHẬN */}
              {filteredPendingOrders.length > 0 && (
                <div>
                  <h3 className="text-[11px] font-bold text-[#40493d] uppercase tracking-wider mb-2.5">
                    ĐANG CHỜ XÁC NHẬN ({filteredPendingOrders.length})
                  </h3>

                  <div className="space-y-2.5">
                    {filteredPendingOrders.map((ord, idx) => (
                      <div
                        key={idx}
                        className="p-3.5 bg-white border border-[#bfcaba] rounded-xl shadow-2xs"
                      >
                        <div className="flex justify-between items-center mb-1.5">
                          <span className="text-base font-extrabold text-[#181d16] font-mono">
                            {ord.code}
                          </span>
                          <span className="px-2.5 py-0.5 bg-[#fef3c7] text-[#b45309] rounded text-[11px] font-bold">
                            {ord.status}
                          </span>
                        </div>
                        <p className="text-xs text-[#40493d] font-medium flex items-center gap-1.5">
                          <span>{ord.pickup}</span>
                          <ArrowRight className="w-3.5 h-3.5 text-[#b45309] flex-shrink-0" />
                          <span>{ord.delivery}</span>
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* SECTION 3: ĐÃ GIAO XONG GẦN ĐÂY */}
              {filteredCompletedOrders.length > 0 && (
                <div>
                  <h3 className="text-[11px] font-bold text-[#40493d] uppercase tracking-wider mb-2.5">
                    ĐÃ GIAO XONG GẦN ĐÂY ({filteredCompletedOrders.length})
                  </h3>

                  <div className="space-y-2.5">
                    {filteredCompletedOrders.map((ord, idx) => (
                      <div
                        key={idx}
                        className="p-3.5 bg-white border border-[#bfcaba] rounded-xl shadow-2xs"
                      >
                        <div className="flex justify-between items-center mb-1.5">
                          <span className="text-base font-extrabold text-[#181d16] font-mono">
                            {ord.code}
                          </span>
                          <span className="px-2.5 py-0.5 bg-[#e2e8f0] text-[#475569] rounded text-[11px] font-bold">
                            {ord.status}
                          </span>
                        </div>
                        <p className="text-xs text-[#40493d] font-medium flex items-center gap-1.5">
                          <span>{ord.pickup}</span>
                          <ArrowRight className="w-3.5 h-3.5 text-[#475569] flex-shrink-0" />
                          <span>{ord.delivery}</span>
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {orderTotalMatches === 0 && (
                <div className="py-12 text-center space-y-2">
                  <Package className="w-8 h-8 text-[#40493d] mx-auto opacity-50" />
                  <p className="text-sm font-bold text-[#181d16]">Không tìm thấy mã đơn hàng phù hợp</p>
                  <p className="text-xs text-[#40493d]">Không có đơn hàng nào khớp với từ khóa "{searchTerm}"</p>
                </div>
              )}
            </>
          )}

        </div>

        {/* FOOTER ACTIONS */}
        <div className="p-3.5 bg-white border-t border-[#bfcaba]">
          {!isOrderQuery ? (
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  if (onCreateNewShipment) onCreateNewShipment();
                  onClose();
                }}
                className="flex-1 flex items-center justify-center gap-2 bg-[#176a22] hover:bg-[#12541a] text-white py-3 rounded-xl font-bold transition-colors text-sm shadow-2xs"
              >
                <PlusCircle className="w-4 h-4" />
                Tạo chuyến hàng mới
              </button>
              <button
                onClick={() => alert('Bộ lọc nâng cao')}
                className="p-3 border border-[#176a22] text-[#176a22] hover:bg-[#176a22]/10 rounded-xl font-bold transition-colors"
                aria-label="Lọc"
              >
                <SlidersHorizontal className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <button
              onClick={() => {
                if (onViewAllResults) onViewAllResults();
                onClose();
              }}
              className="w-full py-3 bg-[#f1f5ea] hover:bg-[#176a22] text-[#176a22] hover:text-white rounded-xl text-xs font-bold transition-colors text-center border border-[#bfcaba]"
            >
              Xem tất cả kết quả
            </button>
          )}
        </div>

      </div>
    </div>
  );
};
