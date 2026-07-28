import React, { useState } from 'react';
import { 
  Wallet, 
  Gauge, 
  CheckCircle2, 
  Clock, 
  ArrowUp, 
  ArrowRight,
  Check,
  X,
  Info,
  AlertTriangle
} from 'lucide-react';
import { OrderItem, Vehicle, NavigationTab } from '../types';
import { InteractiveMap } from './InteractiveMap';

interface DashboardViewProps {
  orders: OrderItem[];
  vehicles: Vehicle[];
  onAcceptOrder: (id: string, orderCode?: string) => void;
  onRejectOrder: (id: string) => void;
  onNavigateTab: (tab: NavigationTab) => void;
  onOpenAssignOrderModal?: (driverName: string, vehiclePlate?: string) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  orders,
  vehicles,
  onAcceptOrder,
  onRejectOrder,
  onNavigateTab,
  onOpenAssignOrderModal
}) => {
  // Filter assigned orders (pending, accepted, rejected) and limit to max 3 items
  const assignedOrders = orders.filter(o => 
    ['pending', 'accepted', 'rejected'].includes(o.status) || o.id === 'ord-1' || o.id === 'ord-2' || o.id === 'ord-3'
  ).slice(0, 3);

  // Modals state
  const [rejectingOrder, setRejectingOrder] = useState<OrderItem | null>(null);
  const [rejectionReason, setRejectionReason] = useState<string>('');

  const handleAcceptClick = (order: OrderItem) => {
    onAcceptOrder(order.id, order.orderCode);
    onNavigateTab('shipments');
  };

  const handleRejectClick = (order: OrderItem) => {
    setRejectingOrder(order);
    setRejectionReason('');
  };

  const handleConfirmReject = () => {
    if (rejectingOrder) {
      onRejectOrder(rejectingOrder.id);
      setRejectingOrder(null);
      setRejectionReason('');
    }
  };

  return (
    <div className="space-y-6">
      {/* Title Header */}
      <div>
        <h2 className="text-2xl font-bold text-[#181d16]">Tổng quan Quản lý</h2>
        <p className="text-[#40493d] mt-1 text-sm">
          Theo dõi hiệu suất vận hành thời gian thực.
        </p>
      </div>

      {/* 4 Summary Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Tổng thu nhập */}
        <div className="bg-[#f1f5ea] border border-[#bfcaba] border-l-4 border-l-[#176a22] rounded-xl p-5 shadow-xs">
          <div className="flex flex-col h-full justify-between">
            <div className="flex items-center gap-3 mb-4 text-[#40493d]">
              <div className="p-2 bg-[#e8f5e9] rounded-lg text-[#176a22]">
                <Wallet className="w-5 h-5" />
              </div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#40493d]">
                TỔNG THU NHẬP CÔNG TY
              </h3>
            </div>
            <div className="flex items-baseline justify-between gap-2">
              <span className="text-2xl font-black text-[#181d16]">845.2M ₫</span>
              <span className="text-[#176a22] font-bold text-sm flex items-center gap-0.5">
                <ArrowUp className="w-4 h-4" /> 12.5%
              </span>
            </div>
          </div>
        </div>

        {/* Card 2: Điểm hiệu quả */}
        <div className="bg-[#f1f5ea] border border-[#bfcaba] border-l-4 border-l-blue-500 rounded-xl p-5 shadow-xs">
          <div className="flex flex-col h-full justify-between">
            <div className="flex items-center gap-3 mb-4 text-[#40493d]">
              <div className="p-2 bg-blue-50 rounded-lg text-blue-600">
                <Gauge className="w-5 h-5" />
              </div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#40493d]">
                ĐIỂM HIỆU QUẢ
              </h3>
            </div>
            <div className="flex items-baseline justify-between gap-2">
              <span className="text-2xl font-black text-[#181d16]">94.2%</span>
              <span className="text-blue-600 font-bold text-sm flex items-center gap-0.5">
                <ArrowUp className="w-4 h-4" /> 2.1%
              </span>
            </div>
          </div>
        </div>

        {/* Card 3: Đơn thành công */}
        <div className="bg-[#f1f5ea] border border-[#bfcaba] border-l-4 border-l-emerald-600 rounded-xl p-5 shadow-xs">
          <div className="flex flex-col h-full justify-between">
            <div className="flex items-center gap-3 mb-4 text-[#40493d]">
              <div className="p-2 bg-emerald-50 rounded-lg text-emerald-600">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#40493d]">
                ĐƠN THÀNH CÔNG
              </h3>
            </div>
            <div className="flex items-baseline justify-between gap-2">
              <span className="text-2xl font-black text-[#181d16]">1,248</span>
              <span className="text-[#40493d] text-xs font-semibold">Hôm nay</span>
            </div>
          </div>
        </div>

        {/* Card 4: Đơn đang xử lý */}
        <div className="bg-[#f1f5ea] border border-[#bfcaba] border-l-4 border-l-amber-500 rounded-xl p-5 shadow-xs">
          <div className="flex flex-col h-full justify-between">
            <div className="flex items-center gap-3 mb-4 text-[#40493d]">
              <div className="p-2 bg-amber-50 rounded-lg text-amber-600">
                <Clock className="w-5 h-5" />
              </div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#40493d]">
                ĐƠN ĐANG XỬ LÝ
              </h3>
            </div>
            <div className="flex items-baseline justify-between gap-2">
              <span className="text-2xl font-black text-[#181d16]">156</span>
              <span className="text-amber-600 font-bold text-xs flex items-center gap-1">
                Cần chú ý: 12
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Online Activity Live Map */}
      <InteractiveMap vehicles={vehicles} />

      {/* Assigned New Orders Table Card */}
      <div className="bg-white border border-[#bfcaba] rounded-xl shadow-xs overflow-hidden pb-4">
        <div className="px-5 py-4 border-b border-[#bfcaba] flex justify-between items-center bg-white">
          <div>
            <h3 className="font-bold text-[#181d16] text-base">Đơn hàng mới được gán</h3>
            <p className="text-xs text-[#40493d] mt-0.5">Xác nhận đơn hàng trực tiếp từ hệ thống nhà vườn</p>
          </div>
          <button
            onClick={() => onNavigateTab('shipments_list')}
            className="text-sm font-bold text-[#176a22] hover:text-[#12541a] flex items-center gap-1 transition-colors"
          >
            Xem tất cả <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#f1f5ea] border-b border-[#bfcaba] text-xs uppercase text-[#40493d] tracking-wider">
                <th className="px-5 py-3.5 font-bold">MÃ ĐƠN</th>
                <th className="px-5 py-3.5 font-bold">ĐIỂM LẤY</th>
                <th className="px-5 py-3.5 font-bold">ĐIỂM GIAO</th>
                <th className="px-5 py-3.5 font-bold text-right">DỰ KIẾN THU</th>
                <th className="px-5 py-3.5 font-bold text-center">TRẠNG THÁI</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#bfcaba] text-sm text-[#181d16]">
              {assignedOrders.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-5 py-8 text-center text-[#40493d]">
                    <p className="font-medium">Không có đơn hàng mới nào cần xử lý!</p>
                  </td>
                </tr>
              ) : (
                assignedOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-[#f7fbf0] transition-colors">
                    <td className="px-5 py-4 font-bold text-[#176a22]">
                      {order.orderCode}
                    </td>
                    <td className="px-5 py-4 font-medium">{order.pickupLocation}</td>
                    <td className="px-5 py-4 font-medium">{order.deliveryLocation}</td>
                    <td className="px-5 py-4 text-right font-bold text-[#181d16]">
                      {order.revenueFormatted}
                    </td>
                    <td className="px-5 py-4 text-center">
                      {order.status === 'pending' ? (
                        <div className="flex items-center justify-center gap-2">
                          <button
                            onClick={() => handleRejectClick(order)}
                            className="px-3.5 py-1.5 rounded-lg text-xs font-bold border border-red-500 text-red-600 hover:bg-red-50 transition-colors flex items-center gap-1"
                          >
                            <X className="w-3.5 h-3.5" /> Từ chối
                          </button>
                          <button
                            onClick={() => handleAcceptClick(order)}
                            className="px-3.5 py-1.5 rounded-lg text-xs font-bold bg-[#176a22] text-white hover:bg-[#12541a] transition-colors shadow-xs flex items-center gap-1"
                          >
                            <Check className="w-3.5 h-3.5" /> Chấp nhận
                          </button>
                        </div>
                      ) : order.status === 'accepted' || order.status === 'in_transit' ? (
                        <div className="flex items-center justify-center">
                          <span className="px-4 py-1.5 rounded-lg text-xs font-bold bg-[#e6f4ea] text-[#137333] border border-[#a5d6a7]">
                            Đã chấp nhận
                          </span>
                        </div>
                      ) : (
                        <div className="flex items-center justify-center">
                          <span className="px-4 py-1.5 rounded-lg text-xs font-bold bg-[#fce8e6] text-[#c5221f] border border-[#fad2cf]">
                            Đã từ chối
                          </span>
                        </div>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL 2: REJECT REASON POPUP */}
      {rejectingOrder && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl max-w-xl w-full shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200 border border-[#bfcaba]">
            {/* Header */}
            <div className="px-6 py-5 border-b border-gray-200 flex items-start justify-between bg-white">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center shrink-0 text-red-600">
                  <X className="w-5 h-5 stroke-[2.5]" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[#181d16]">Từ chối đơn hàng</h3>
                  <p className="text-xs text-[#40493d] mt-0.5">
                    Vui lòng cho chúng tôi biết lý do bạn từ chối đơn hàng này.
                  </p>
                </div>
              </div>
              <button
                onClick={() => setRejectingOrder(null)}
                className="text-gray-400 hover:text-gray-600 p-1.5 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Body */}
            <div className="p-6 space-y-5 bg-white">
              <div>
                <label className="block text-xs font-bold text-[#181d16] mb-1.5">
                  Lý do từ chối chi tiết
                </label>
                <textarea
                  rows={4}
                  value={rejectionReason}
                  onChange={(e) => setRejectionReason(e.target.value)}
                  placeholder="Nhập lý do từ chối tại đây..."
                  className="w-full p-3.5 bg-[#f8faf7] border border-[#bfcaba] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-red-500 text-[#181d16] resize-none"
                />
              </div>

              {/* Information Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="bg-[#f1f8f3] border border-[#d2e3d5] p-3.5 rounded-xl text-xs text-[#1e4d2b] flex items-start gap-2.5">
                  <Info className="w-4 h-4 text-[#176a22] shrink-0 mt-0.5" />
                  <span>
                    Hành động này sẽ thông báo ngay lập tức cho bộ phận điều phối để tìm phương án vận chuyển thay thế.
                  </span>
                </div>
                <div className="bg-[#fdf3f2] border border-[#f8d7d5] p-3.5 rounded-xl text-xs text-[#8c1d18] flex items-start gap-2.5">
                  <AlertTriangle className="w-4 h-4 text-[#d93025] shrink-0 mt-0.5" />
                  <span>
                    Tỷ lệ từ chối cao có thể ảnh hưởng đến điểm uy tín của đối tác vận tải trên nền tảng AgriMarket.
                  </span>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="px-6 py-4 bg-[#f8faf7] border-t border-gray-200 flex justify-end items-center gap-3">
              <button
                onClick={() => setRejectingOrder(null)}
                className="px-5 py-2.5 bg-white border border-[#bfcaba] text-[#181d16] hover:bg-gray-50 rounded-xl text-sm font-bold transition-colors"
              >
                Hủy bỏ
              </button>
              <button
                onClick={handleConfirmReject}
                className="px-5 py-2.5 bg-[#d93025] hover:bg-[#b3261e] text-white rounded-xl text-sm font-bold transition-colors shadow-xs"
              >
                Xác nhận từ chối
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
