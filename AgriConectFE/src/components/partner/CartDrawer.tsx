import React, { useState } from 'react';
import { X, Trash2, ShoppingBag, ArrowRight, ShieldCheck, CheckCircle2, Truck, CreditCard, Crown, Sparkles } from 'lucide-react';
import { CartItem, PartnerCreditInfo } from './types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  currency: 'VND' | 'USD';
  creditInfo?: PartnerCreditInfo;
  onUpdateQuantity: (productId: string, quantityKg: number) => void;
  onRemoveItem: (productId: string) => void;
  onClearCart: () => void;
  onOrderPlaced: (orderData: any) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  currency,
  creditInfo,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onOrderPlaced,
}) => {
  if (!isOpen) return null;

  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);
  const [shippingAddress, setShippingAddress] = useState('Kho Tổng TP. Hồ Chí Minh (Cụm Công nghiệp Tân Bình)');
  const [buyerName, setBuyerName] = useState('Nguyễn Văn Sơn - Chuỗi Bán Buôn Nông Sản');
  const [buyerPhone, setBuyerPhone] = useState('0989 123 456');
  const [notes, setNotes] = useState('Yêu cầu kiểm tra chứng nhận VietGAP trước khi bốc xếp.');
  const [paymentMethod, setPaymentMethod] = useState<'credit' | 'bank' | 'deposit'>('credit');
  const [isSuccess, setIsSuccess] = useState(false);

  // Total Calculations
  const totalVolumeKg = cartItems.reduce((acc, item) => acc + item.quantityKg, 0);
  const rawTotalVnd = cartItems.reduce(
    (acc, item) => acc + item.quantityKg * item.product.priceVnd,
    0
  );
  const rawTotalUsd = cartItems.reduce(
    (acc, item) => acc + item.quantityKg * item.product.priceUsd,
    0
  );

  // Bulk Discount calculation
  let discountPercent = 0;
  if (totalVolumeKg >= 3000) discountPercent = 10;
  else if (totalVolumeKg >= 1000) discountPercent = 5;

  const discountAmountVnd = (rawTotalVnd * discountPercent) / 100;
  const discountAmountUsd = (rawTotalUsd * discountPercent) / 100;

  const finalTotalVnd = rawTotalVnd - discountAmountVnd;
  const finalTotalUsd = rawTotalUsd - discountAmountUsd;

  const formatMoney = (vnd: number, usd: number) => {
    return currency === 'USD'
      ? `$${usd.toFixed(2)}`
      : `${vnd.toLocaleString('vi-VN')}đ`;
  };

  const handleConfirmOrder = () => {
    const orderId = `AGRI-${Math.floor(100000 + Math.random() * 900000)}`;
    const newOrder = {
      id: orderId,
      date: new Date().toLocaleDateString('vi-VN'),
      items: cartItems.map((ci) => ({
        productName: ci.product.name,
        quantityKg: ci.quantityKg,
        priceVnd: ci.product.priceVnd,
      })),
      totalVnd: finalTotalVnd,
      status: 'Đang xử lý' as const,
      paymentMethod:
        paymentMethod === 'credit'
          ? ('credit_30' as const)
          : paymentMethod === 'bank'
          ? ('bank' as const)
          : ('deposit' as const),
      paymentStatus:
        paymentMethod === 'credit'
          ? ('Chờ quyết toán cuối tháng' as const)
          : ('Đã thanh toán' as const),
      trackingCode: `TK-VN-${Math.floor(100000 + Math.random() * 900000)}`,
      estimatedDelivery: '3 ngày tới',
      supplierName: cartItems[0]?.product.supplier.name || 'AgriConnect Hub',
    };

    onOrderPlaced(newOrder);
    setIsSuccess(true);

    setTimeout(() => {
      setIsSuccess(false);
      setIsCheckoutModalOpen(false);
      onClearCart();
      onClose();
    }, 2000);
  };

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/40 z-50 backdrop-blur-xs animate-in fade-in duration-200"
      />

      {/* Slide-over Drawer */}
      <aside className="fixed top-0 right-0 h-full w-full max-w-md bg-white z-50 shadow-2xl flex flex-col border-l border-[#bfcaba]/40 animate-in slide-in-from-right duration-300">
        {/* Drawer Header */}
        <div className="p-4 bg-[#f7fbf0] border-b border-[#bfcaba]/30 flex items-center justify-between">
          <div className="flex items-center gap-2 text-[#176a22]">
            <ShoppingBag className="w-5 h-5" />
            <h3 className="font-bold text-lg text-[#181d16]">
              Giỏ Hàng Nông Sản Sỉ
            </h3>
            <span className="text-xs bg-[#176a22]/10 px-2 py-0.5 rounded-full font-bold">
              {cartItems.length} mặt hàng
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-stone-500 hover:text-stone-800 rounded-lg hover:bg-stone-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Cart Items List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {cartItems.length === 0 ? (
            <div className="text-center py-16 text-[#707a6c]">
              <ShoppingBag className="w-12 h-12 mx-auto mb-3 opacity-40" />
              <p className="font-bold text-base text-[#181d16]">
                Giỏ hàng sỉ đang trống
              </p>
              <p className="text-xs mt-1">
                Vui lòng chọn các sản phẩm nông sản từ danh mục để bắt đầu đặt hàng.
              </p>
            </div>
          ) : (
            <>
              {/* Bulk Discount Indicator */}
              <div className="bg-[#358439]/10 border border-[#358439]/20 p-3 rounded-xl text-xs text-[#176a22]">
                <div className="flex justify-between font-bold mb-1">
                  <span>Ưu đãi tổng sản lượng: {totalVolumeKg} kg</span>
                  {discountPercent > 0 ? (
                    <span className="bg-[#176a22] text-white px-2 py-0.5 rounded text-[10px] uppercase font-extrabold">
                      Đã giảm {discountPercent}%
                    </span>
                  ) : (
                    <span>Cần thêm {1000 - totalVolumeKg}kg để giảm 5%</span>
                  )}
                </div>
                <div className="w-full bg-stone-200 h-1.5 rounded-full overflow-hidden">
                  <div
                    className="bg-[#176a22] h-full transition-all"
                    style={{
                      width: `${Math.min(100, (totalVolumeKg / 3000) * 100)}%`,
                    }}
                  />
                </div>
              </div>

              {/* Items */}
              {cartItems.map((item) => (
                <div
                  key={item.product.id}
                  className="bg-[#EFEFE9]/60 border border-[#bfcaba]/30 rounded-2xl p-3 flex gap-3 relative group"
                >
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-16 h-16 rounded-xl object-cover shrink-0"
                  />
                  <div className="flex-1 min-w-0 pr-6">
                    <h5 className="font-bold text-sm text-[#181d16] truncate">
                      {item.product.name}
                    </h5>
                    <p className="text-xs text-[#707a6c]">
                      Đơn giá:{' '}
                      {formatMoney(
                        item.product.priceVnd,
                        item.product.priceUsd
                      )}
                      /kg
                    </p>

                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center border border-[#bfcaba] rounded-lg bg-white overflow-hidden text-xs">
                        <button
                          onClick={() =>
                            onUpdateQuantity(
                              item.product.id,
                              Math.max(
                                item.product.minOrderKg,
                                item.quantityKg - 50
                              )
                            )
                          }
                          className="px-2 py-1 font-bold text-stone-600 hover:bg-stone-100"
                        >
                          -
                        </button>
                        <span className="px-2 py-1 font-bold text-[#181d16]">
                          {item.quantityKg} kg
                        </span>
                        <button
                          onClick={() =>
                            onUpdateQuantity(
                              item.product.id,
                              item.quantityKg + 50
                            )
                          }
                          className="px-2 py-1 font-bold text-stone-600 hover:bg-stone-100"
                        >
                          +
                        </button>
                      </div>

                      <p className="font-extrabold text-sm text-[#176a22]">
                        {formatMoney(
                          item.quantityKg * item.product.priceVnd,
                          item.quantityKg * item.product.priceUsd
                        )}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => onRemoveItem(item.product.id)}
                    className="absolute top-3 right-3 text-stone-400 hover:text-red-600 transition-colors"
                    title="Xóa khỏi giỏ hàng"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </>
          )}
        </div>

        {/* Drawer Footer & Total Summary */}
        {cartItems.length > 0 && (
          <div className="p-4 bg-[#f7fbf0] border-t border-[#bfcaba]/40 space-y-3">
            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between text-[#707a6c]">
                <span>Tạm tính ({totalVolumeKg}kg):</span>
                <span>{formatMoney(rawTotalVnd, rawTotalUsd)}</span>
              </div>

              {discountPercent > 0 && (
                <div className="flex justify-between text-[#176a22] font-semibold">
                  <span>Chiết khấu khối lượng ({discountPercent}%):</span>
                  <span>
                    -{formatMoney(discountAmountVnd, discountAmountUsd)}
                  </span>
                </div>
              )}

              <div className="flex justify-between text-[#707a6c]">
                <span>Phí vận chuyển logistics:</span>
                <span className="text-[#176a22] font-bold">Thỏa thuận kho</span>
              </div>

              <div className="flex justify-between text-base font-extrabold text-[#181d16] pt-2 border-t border-[#bfcaba]/30">
                <span>Tổng cộng:</span>
                <span className="text-[#176a22] text-xl">
                  {formatMoney(finalTotalVnd, finalTotalUsd)}
                </span>
              </div>
            </div>

            <button
              onClick={() => setIsCheckoutModalOpen(true)}
              className="w-full bg-[#176a22] hover:bg-[#358439] text-white py-3.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 shadow-md transition-all active:scale-98"
            >
              <span>Tiến Hành Đặt Đơn Bán Buôn</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </aside>

      {/* Checkout Confirmation Modal */}
      {isCheckoutModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-[#bfcaba] relative">
            {isSuccess ? (
              <div className="text-center py-8">
                <CheckCircle2 className="w-16 h-16 text-[#176a22] mx-auto mb-3 animate-bounce" />
                <h3 className="text-2xl font-bold text-[#181d16]">
                  Đặt Đơn Thành Công!
                </h3>
                <p className="text-sm text-[#40493d] mt-2">
                  Mã đơn hàng sỉ đã được khởi tạo. Nhà cung cấp nông sản đang chuẩn bị xác nhận kho và phương tiện vận chuyển.
                </p>
              </div>
            ) : (
              <>
                <div className="flex justify-between items-center mb-4 pb-2 border-b border-stone-200">
                  <h3 className="font-bold text-lg text-[#181d16]">
                    Xác Nhận Đơn Hàng Sỉ
                  </h3>
                  <button
                    onClick={() => setIsCheckoutModalOpen(false)}
                    className="p-1 text-stone-400 hover:text-stone-700"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="space-y-3.5 text-xs text-[#40493d]">
                  <div>
                    <label className="font-bold block mb-1 text-[#181d16]">
                      Tên Đơn Vị Thu Mua / Đại Lý:
                    </label>
                    <input
                      type="text"
                      value={buyerName}
                      onChange={(e) => setBuyerName(e.target.value)}
                      className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-lg outline-none focus:border-[#176a22] font-medium"
                    />
                  </div>

                  <div>
                    <label className="font-bold block mb-1 text-[#181d16]">
                      Số Điện Thoại Liên Hệ Kho:
                    </label>
                    <input
                      type="text"
                      value={buyerPhone}
                      onChange={(e) => setBuyerPhone(e.target.value)}
                      className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-lg outline-none focus:border-[#176a22] font-medium"
                    />
                  </div>

                  <div>
                    <label className="font-bold block mb-1 text-[#181d16]">
                      Địa Chỉ Giao Hàng Bán Buôn:
                    </label>
                    <input
                      type="text"
                      value={shippingAddress}
                      onChange={(e) => setShippingAddress(e.target.value)}
                      className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-lg outline-none focus:border-[#176a22] font-medium"
                    />
                  </div>

                  <div>
                    <label className="font-bold block mb-1.5 text-[#181d16]">
                      Phương Thức Thanh Toán Sỉ:
                    </label>
                    <div className="space-y-2">
                      {/* B2B Pay Later Credit Option */}
                      <button
                        type="button"
                        onClick={() => setPaymentMethod('credit')}
                        className={`w-full p-3 rounded-2xl border text-left transition-all ${
                          paymentMethod === 'credit'
                            ? 'border-2 border-[#176a22] bg-[#f7fbf0] shadow-xs'
                            : 'border-stone-200 bg-stone-50 hover:bg-stone-100'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <CreditCard className="w-4 h-4 text-[#176a22]" />
                            <span className="font-extrabold text-xs text-[#181d16]">
                              Tín Dụng Partner B2B (Thanh Toán Sau 1 Lần)
                            </span>
                          </div>
                          <span className="bg-amber-400 text-[#181d16] font-extrabold text-[10px] px-2 py-0.5 rounded flex items-center gap-1">
                            <Crown className="w-3 h-3 fill-[#181d16]" />
                            HẠNG VÀNG
                          </span>
                        </div>
                        <p className="text-[11px] text-[#707a6c] mt-1">
                          Hạn mức còn lại: <strong className="text-[#176a22]">380.000.000đ</strong>. Gộp hóa đơn chi trả 1 lần duy nhất vào <strong>30/08/2026</strong>.
                        </p>
                      </button>

                      <div className="grid grid-cols-2 gap-2">
                        <button
                          type="button"
                          onClick={() => setPaymentMethod('bank')}
                          className={`p-2.5 rounded-xl border text-left font-semibold transition-all ${
                            paymentMethod === 'bank'
                              ? 'border-[#176a22] bg-[#176a22]/10 text-[#176a22]'
                              : 'border-stone-200 bg-stone-50 hover:bg-stone-100'
                          }`}
                        >
                          Chuyển Khoản Ngân Hàng (VA)
                        </button>
                        <button
                          type="button"
                          onClick={() => setPaymentMethod('deposit')}
                          className={`p-2.5 rounded-xl border text-left font-semibold transition-all ${
                            paymentMethod === 'deposit'
                              ? 'border-[#176a22] bg-[#176a22]/10 text-[#176a22]'
                              : 'border-stone-200 bg-stone-50 hover:bg-stone-100'
                          }`}
                        >
                          Đặt Cọc 30% Hợp Đồng
                        </button>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="font-bold block mb-1 text-[#181d16]">
                      Ghi Chú Đóng Gói / Yêu Cầu Vận Chuyển:
                    </label>
                    <textarea
                      rows={2}
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-lg outline-none focus:border-[#176a22] font-medium resize-none"
                    />
                  </div>

                  <div className="p-3 bg-[#f7fbf0] rounded-xl border border-[#bfcaba]/40 flex justify-between items-center text-sm font-bold text-[#181d16]">
                    <span>Tổng Thanh Toán:</span>
                    <span className="text-[#176a22] text-lg font-extrabold">
                      {formatMoney(finalTotalVnd, finalTotalUsd)}
                    </span>
                  </div>

                  <button
                    onClick={handleConfirmOrder}
                    className="w-full bg-[#176a22] hover:bg-[#358439] text-white py-3 rounded-xl font-bold text-sm shadow-md transition-all mt-2"
                  >
                    Xác Nhận Đặt Đơn Nông Sản
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};
