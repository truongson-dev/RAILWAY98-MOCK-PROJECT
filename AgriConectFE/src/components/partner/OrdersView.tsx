import React from 'react';
import { Order } from './types';
import { ShoppingBag, Truck, CheckCircle, Clock, MapPin, ExternalLink } from 'lucide-react';

interface OrdersViewProps {
  orders: Order[];
  currency: 'VND' | 'USD';
  onReorder: (order: Order) => void;
}

export const OrdersView: React.FC<OrdersViewProps> = ({ orders, currency, onReorder }) => {
  const formatPrice = (priceVnd: number) => {
    return currency === 'USD'
      ? `$${(priceVnd / 24500).toFixed(2)}`
      : `${priceVnd.toLocaleString('vi-VN')}đ`;
  };

  const getStatusBadge = (status: Order['status']) => {
    switch (status) {
      case 'Đang vận chuyển':
        return (
          <span className="bg-[#486644]/15 text-[#486644] text-xs font-bold px-2.5 py-1 rounded-full flex items-center gap-1">
            <Truck className="w-3.5 h-3.5" />
            <span>Đang vận chuyển</span>
          </span>
        );
      case 'Đã giao hàng':
      case 'Đã hoàn thành':
        return (
          <span className="bg-[#176a22]/15 text-[#176a22] text-xs font-bold px-2.5 py-1 rounded-full flex items-center gap-1">
            <CheckCircle className="w-3.5 h-3.5" />
            <span>Đã hoàn thành</span>
          </span>
        );
      default:
        return (
          <span className="bg-[#358439]/15 text-[#358439] text-xs font-bold px-2.5 py-1 rounded-full flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            <span>Đang xử lý kho</span>
          </span>
        );
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-3xl shadow-xs border border-[#bfcaba]/30">
        <div className="flex items-center gap-3 text-[#176a22] mb-2">
          <ShoppingBag className="w-8 h-8" />
          <h2 className="text-2xl font-bold text-[#181d16]">
            Quản Lý Đơn Hàng Sỉ (Orders)
          </h2>
        </div>
        <p className="text-sm text-[#40493d] max-w-3xl leading-relaxed">
          Theo dõi hành trình vận chuyển nông sản, vận đơn kiểm định chất lượng và lịch sử giao nhận từ các đối tác trang trại.
        </p>
      </div>

      <div className="space-y-4">
        {orders.length === 0 ? (
          <div className="bg-white p-12 text-center rounded-2xl border border-stone-200 text-[#707a6c]">
            <ShoppingBag className="w-12 h-12 mx-auto mb-2 opacity-30" />
            <p className="font-bold text-base text-[#181d16]">Chưa có đơn hàng nào</p>
            <p className="text-xs mt-1">Các đơn hàng nông sản sau khi đặt sẽ hiển thị đầy đủ tại đây.</p>
          </div>
        ) : (
          orders.map((ord) => (
            <div
              key={ord.id}
              className="bg-white rounded-2xl p-5 border border-[#bfcaba]/30 shadow-xs hover:shadow-md transition-shadow space-y-4"
            >
              {/* Header */}
              <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-stone-100">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-base text-[#181d16]">
                      Mã đơn: {ord.id}
                    </span>
                    <span className="text-xs text-[#707a6c]">| Ngày đặt: {ord.date}</span>
                    {ord.paymentStatus && (
                      <span className="bg-amber-100 text-amber-800 text-[10px] font-extrabold px-2 py-0.5 rounded-full border border-amber-200">
                        {ord.paymentStatus}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-[#40493d] font-medium mt-0.5">
                    Nhà cung cấp: <strong className="text-[#176a22]">{ord.supplierName}</strong>
                    {ord.paymentMethod === 'credit_30' && (
                      <span className="ml-2 text-[#176a22] font-semibold">
                        • Thanh toán sau B2B (Hạn Vàng 30 ngày)
                      </span>
                    )}
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  {getStatusBadge(ord.status)}
                  <span className="text-xs font-mono bg-stone-100 px-2.5 py-1 rounded-md text-stone-700 font-bold border border-stone-200">
                    Vận đơn: {ord.trackingCode}
                  </span>
                </div>
              </div>

              {/* Order Items Table */}
              <div className="space-y-2">
                {ord.items.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex justify-between items-center text-xs p-2.5 bg-[#f7fbf0] rounded-xl border border-[#bfcaba]/20"
                  >
                    <div className="font-bold text-[#181d16]">
                      {item.productName}
                    </div>
                    <div className="text-[#40493d]">
                      Khối lượng: <strong className="text-[#181d16]">{item.quantityKg} kg</strong> x {formatPrice(item.priceVnd)}/kg
                    </div>
                    <div className="font-extrabold text-[#176a22]">
                      {formatPrice(item.quantityKg * item.priceVnd)}
                    </div>
                  </div>
                ))}
              </div>

              {/* Order Footer */}
              <div className="flex flex-wrap justify-between items-center pt-2 gap-3 text-xs">
                <div className="text-[#707a6c]">
                  Dự kiến giao hàng: <strong className="text-[#181d16]">{ord.estimatedDelivery}</strong>
                </div>

                <div className="flex items-center gap-4">
                  <div>
                    <span className="text-[#707a6c]">Tổng thanh toán: </span>
                    <span className="text-lg font-extrabold text-[#176a22]">
                      {formatPrice(ord.totalVnd)}
                    </span>
                  </div>

                  <button
                    onClick={() => onReorder(ord)}
                    className="px-4 py-2 bg-[#176a22] hover:bg-[#358439] text-white rounded-xl font-bold text-xs shadow-xs transition-colors"
                  >
                    Đặt Lại Đơn Này
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
