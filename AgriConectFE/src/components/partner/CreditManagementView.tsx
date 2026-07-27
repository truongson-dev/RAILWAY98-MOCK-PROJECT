import React, { useState } from 'react';
import {
  CreditCard,
  Crown,
  Calendar,
  AlertCircle,
  CheckCircle2,
  TrendingUp,
  ShieldCheck,
  Building2,
  DollarSign,
  ArrowUpRight,
  FileText,
  Clock,
  Sparkles,
  ChevronRight,
  HelpCircle,
  Zap,
} from 'lucide-react';
import { PartnerCreditInfo, Order } from './types';

interface CreditManagementViewProps {
  creditInfo: PartnerCreditInfo;
  orders: Order[];
  currency: 'VND' | 'USD';
  onPayCreditBalance: (amountVnd: number) => void;
  onOpenAiAssistantWithTopic: (topic: string) => void;
}

export const CreditManagementView: React.FC<CreditManagementViewProps> = ({
  creditInfo,
  orders,
  currency,
  onPayCreditBalance,
  onOpenAiAssistantWithTopic,
}) => {
  const [selectedCycle, setSelectedCycle] = useState<'30' | '60'>(
    creditInfo.partnerRank === 'Kim Cương' ? '60' : '30'
  );
  const [isPayModalOpen, setIsPayModalOpen] = useState(false);
  const [payAmount, setPayAmount] = useState<number>(creditInfo.usedCreditVnd);
  const [paySuccess, setPaySuccess] = useState(false);

  const formatMoney = (vnd: number) => {
    return currency === 'USD'
      ? `$${(vnd / 24500).toLocaleString('en-US', { maximumFractionDigits: 0 })}`
      : `${vnd.toLocaleString('vi-VN')}đ`;
  };

  const usedPercent = Math.min(
    100,
    Math.round((creditInfo.usedCreditVnd / creditInfo.creditLimitVnd) * 100)
  );

  const pendingPayLaterOrders = orders.filter(
    (o) =>
      o.paymentStatus === 'Chờ quyết toán cuối tháng' ||
      o.paymentStatus === 'Chờ quyết toán 2 tháng' ||
      o.paymentMethod === 'credit_30' ||
      o.paymentMethod === 'credit_60'
  );

  const handleExecutePayment = () => {
    onPayCreditBalance(payAmount);
    setPaySuccess(true);
    setTimeout(() => {
      setPaySuccess(false);
      setIsPayModalOpen(false);
    }, 2000);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Top Banner: Partner Rank & Credit Limit Header */}
      <div className="bg-gradient-to-r from-[#176a22] via-[#247c30] to-[#0f4a17] text-white rounded-3xl p-6 md:p-8 shadow-lg relative overflow-hidden">
        {/* Subtle decorative background shapes */}
        <div className="absolute -right-12 -bottom-12 w-64 h-64 bg-white/5 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute right-32 top-0 w-48 h-48 bg-amber-400/10 rounded-full blur-xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          {/* Left: Rank Badge & Partner Name */}
          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="bg-amber-400 text-[#181d16] font-black text-xs px-3 py-1 rounded-full flex items-center gap-1.5 shadow-sm">
                <Crown className="w-4 h-4 fill-[#181d16]" />
                <span>HẠNG {creditInfo.partnerRank.toUpperCase()} (GOLD PARTNER)</span>
              </span>
              <span className="bg-white/15 text-white text-xs font-semibold px-3 py-1 rounded-full border border-white/20">
                Mã ĐT: {creditInfo.partnerCode}
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              {creditInfo.partnerName}
            </h1>

            <p className="text-xs sm:text-sm text-emerald-100/90 max-w-xl flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-amber-300 shrink-0" />
              <span>
                Đã xác thực điều kiện tín dụng B2B. Quý khách được quyền mua trước thanh toán sau 1 lần vào cuối tháng hoặc 2 tháng.
              </span>
            </p>
          </div>

          {/* Right: Quick Payment Action */}
          <div className="bg-white/10 backdrop-blur-md p-5 rounded-2xl border border-white/20 w-full lg:w-auto min-w-[280px] space-y-3">
            <div className="flex justify-between items-center text-xs text-emerald-100 font-medium">
              <span>Dư nợ tín dụng chờ thanh toán:</span>
              <span className="bg-amber-400/20 text-amber-200 font-bold px-2 py-0.5 rounded text-[10px]">
                Hạn chót: {creditInfo.nextDueDate}
              </span>
            </div>

            <div className="text-2xl font-black text-amber-300">
              {formatMoney(creditInfo.usedCreditVnd)}
            </div>

            <button
              onClick={() => {
                setPayAmount(creditInfo.usedCreditVnd);
                setIsPayModalOpen(true);
              }}
              className="w-full bg-amber-400 hover:bg-amber-300 text-[#181d16] font-extrabold py-2.5 px-4 rounded-xl text-xs flex items-center justify-center gap-2 shadow-md transition-all active:scale-98"
            >
              <CreditCard className="w-4 h-4" />
              <span>Thanh Toán Dư Nợ Ngay</span>
            </button>
          </div>
        </div>
      </div>

      {/* Credit Gauge & Analytics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Card 1: Hạn mức khả dụng */}
        <div className="bg-white rounded-3xl p-6 border border-[#bfcaba]/40 shadow-xs space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-xs font-extrabold text-[#707a6c] uppercase tracking-wider">
              Hạn Mức Khả Dụng
            </span>
            <div className="w-9 h-9 rounded-full bg-[#176a22]/10 flex items-center justify-center text-[#176a22]">
              <CreditCard className="w-5 h-5" />
            </div>
          </div>

          <div>
            <div className="text-3xl font-black text-[#176a22]">
              {formatMoney(creditInfo.availableCreditVnd)}
            </div>
            <p className="text-xs text-[#707a6c] mt-1 font-medium">
              Trên tổng hạn mức {formatMoney(creditInfo.creditLimitVnd)}
            </p>
          </div>

          {/* Progress Bar */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-[11px] font-bold text-[#40493d]">
              <span>Đã sử dụng: {usedPercent}%</span>
              <span>{formatMoney(creditInfo.usedCreditVnd)}</span>
            </div>
            <div className="w-full bg-stone-100 h-2.5 rounded-full overflow-hidden border border-stone-200">
              <div
                className={`h-full transition-all rounded-full ${
                  usedPercent > 80 ? 'bg-amber-500' : 'bg-[#176a22]'
                }`}
                style={{ width: `${usedPercent}%` }}
              />
            </div>
          </div>
        </div>

        {/* Card 2: Chu kỳ thanh toán */}
        <div className="bg-white rounded-3xl p-6 border border-[#bfcaba]/40 shadow-xs space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-xs font-extrabold text-[#707a6c] uppercase tracking-wider">
              Chu Kỳ Chi Trả (Pay Cycle)
            </span>
            <div className="w-9 h-9 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
              <Calendar className="w-5 h-5" />
            </div>
          </div>

          <div>
            <div className="text-xl font-extrabold text-[#181d16] flex items-center gap-2">
              <span>{creditInfo.billingCycle}</span>
            </div>
            <p className="text-xs text-[#707a6c] mt-1 font-medium">
              Gộp toàn bộ đơn hàng trong chu kỳ để thanh toán 01 lần duy nhất.
            </p>
          </div>

          <div className="bg-[#f7fbf0] p-3 rounded-2xl border border-[#bfcaba]/30 text-xs text-[#176a22] font-semibold flex items-center gap-2">
            <Clock className="w-4 h-4 shrink-0" />
            <span>Kỳ thanh toán tới: {creditInfo.nextDueDate}</span>
          </div>
        </div>

        {/* Card 3: Tiến trình thăng hạng Partner */}
        <div className="bg-white rounded-3xl p-6 border border-[#bfcaba]/40 shadow-xs space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-xs font-extrabold text-[#707a6c] uppercase tracking-wider">
              Tích Lũy Thăng Hạng
            </span>
            <div className="w-9 h-9 rounded-full bg-amber-50 flex items-center justify-center text-amber-600">
              <TrendingUp className="w-5 h-5" />
            </div>
          </div>

          <div>
            <div className="text-2xl font-black text-[#181d16]">
              {creditInfo.accumulatedVolumeYtdKg.toLocaleString('vi-VN')} kg
            </div>
            <p className="text-xs text-[#707a6c] mt-1 font-medium">
              Cần thêm {(creditInfo.nextRankThresholdKg - creditInfo.accumulatedVolumeYtdKg).toLocaleString('vi-VN')} kg để lên hạng KIM CƯƠNG
            </p>
          </div>

          <div className="space-y-1.5">
            <div className="w-full bg-stone-100 h-2.5 rounded-full overflow-hidden border border-stone-200">
              <div
                className="h-full bg-amber-500 transition-all rounded-full"
                style={{
                  width: `${Math.min(
                    100,
                    (creditInfo.accumulatedVolumeYtdKg / creditInfo.nextRankThresholdKg) * 100
                  )}%`,
                }}
              />
            </div>
            <div className="flex justify-between text-[10px] text-[#707a6c] font-bold">
              <span>Hạng Vàng (15.000 kg)</span>
              <span>Hạng Kim Cương (25.000 kg)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Section: Partner Tier & Credit Rules Comparison */}
      <div className="bg-white rounded-3xl p-6 md:p-8 border border-[#bfcaba]/40 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 border-b border-stone-100 pb-4">
          <div>
            <h3 className="text-lg font-bold text-[#181d16] flex items-center gap-2">
              <Crown className="w-5 h-5 text-amber-500" />
              <span>Chính Sách Hạn Mức Tín Dụng Theo Mức Rank Partner</span>
            </h3>
            <p className="text-xs text-[#707a6c] mt-0.5">
              Hạng đối tác B2B càng cao, hạn mức chi trả sau càng lớn và chu kỳ kéo dài hơn.
            </p>
          </div>

          <button
            onClick={() =>
              onOpenAiAssistantWithTopic(
                'Tôi muốn xét duyệt nâng hạng Partner B2B và tăng hạn mức tín dụng thanh toán sau.'
              )
            }
            className="px-4 py-2 bg-[#f7fbf0] hover:bg-[#ebefe4] text-[#176a22] border border-[#176a22]/30 rounded-xl font-bold text-xs flex items-center gap-1.5 transition-colors self-start sm:self-auto"
          >
            <Sparkles className="w-4 h-4" />
            <span>Yêu Cầu Nâng Hạn Mức Với AI</span>
          </button>
        </div>

        {/* Tier Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Bronze Tier */}
          <div className="p-5 rounded-2xl border border-stone-200 bg-stone-50 space-y-3 relative">
            <div className="flex justify-between items-center">
              <span className="font-extrabold text-xs text-amber-800 bg-amber-100 px-2.5 py-1 rounded-md">
                ĐỒNG (BRONZE)
              </span>
              <span className="text-[10px] font-bold text-stone-500">&gt; 1.000 kg/năm</span>
            </div>
            <div>
              <p className="text-xs text-[#707a6c]">Hạn mức tín dụng:</p>
              <p className="text-lg font-black text-[#181d16]">50.000.000đ</p>
            </div>
            <div className="space-y-1.5 text-xs text-[#40493d]">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-stone-400" />
                <span>Thanh toán theo từng đơn</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-stone-400" />
                <span>Hỗ trợ xuất hóa đơn VAT</span>
              </div>
            </div>
          </div>

          {/* Silver Tier */}
          <div className="p-5 rounded-2xl border border-stone-200 bg-stone-50 space-y-3 relative">
            <div className="flex justify-between items-center">
              <span className="font-extrabold text-xs text-slate-700 bg-slate-200 px-2.5 py-1 rounded-md">
                BẠC (SILVER)
              </span>
              <span className="text-[10px] font-bold text-stone-500">&gt; 5.000 kg/năm</span>
            </div>
            <div>
              <p className="text-xs text-[#707a6c]">Hạn mức tín dụng:</p>
              <p className="text-lg font-black text-[#181d16]">150.000.000đ</p>
            </div>
            <div className="space-y-1.5 text-xs text-[#40493d]">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#176a22]" />
                <span className="font-semibold">Thanh toán cuối tháng (30 ngày)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#176a22]" />
                <span>Chiết khấu đơn sỉ +0.5%</span>
              </div>
            </div>
          </div>

          {/* Gold Tier (CURRENT ACTIVE) */}
          <div className="p-5 rounded-2xl border-2 border-[#176a22] bg-[#f7fbf0] space-y-3 relative shadow-md">
            <div className="absolute -top-3 right-4 bg-[#176a22] text-white text-[9px] font-black px-2.5 py-0.5 rounded-full uppercase">
              HẠNG HIỆN TẠI
            </div>
            <div className="flex justify-between items-center">
              <span className="font-extrabold text-xs text-amber-900 bg-amber-200 px-2.5 py-1 rounded-md">
                VÀNG (GOLD)
              </span>
              <span className="text-[10px] font-bold text-[#176a22]">&gt; 15.000 kg/năm</span>
            </div>
            <div>
              <p className="text-xs text-[#707a6c]">Hạn mức tín dụng:</p>
              <p className="text-xl font-black text-[#176a22]">500.000.000đ</p>
            </div>
            <div className="space-y-1.5 text-xs text-[#181d16]">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#176a22]" />
                <span className="font-bold">Thanh toán 1 lần mỗi cuối tháng (30 ngày)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#176a22]" />
                <span>Ưu tiên vận chuyển xe lạnh</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#176a22]" />
                <span>Chiết khấu đơn sỉ +1.5%</span>
              </div>
            </div>
          </div>

          {/* Diamond Tier */}
          <div className="p-5 rounded-2xl border border-amber-300 bg-gradient-to-br from-amber-50/50 to-white space-y-3 relative">
            <div className="flex justify-between items-center">
              <span className="font-extrabold text-xs text-purple-900 bg-purple-100 px-2.5 py-1 rounded-md">
                KIM CƯƠNG (DIAMOND)
              </span>
              <span className="text-[10px] font-bold text-purple-700">&gt; 25.000 kg/năm</span>
            </div>
            <div>
              <p className="text-xs text-[#707a6c]">Hạn mức tín dụng:</p>
              <p className="text-lg font-black text-[#181d16]">1.500.000.000đ</p>
            </div>
            <div className="space-y-1.5 text-xs text-[#40493d]">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-purple-600" />
                <span className="font-bold text-purple-900">
                  Thanh toán 1 lần mỗi 2 THÁNG (60 ngày)
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-purple-600" />
                <span>Bảo lãnh hợp đồng tương lai</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-purple-600" />
                <span>Chiết khấu đơn sỉ +3.0%</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Pending Pay-Later Orders / Invoices Section */}
      <div className="bg-white rounded-3xl p-6 border border-[#bfcaba]/40 shadow-xs space-y-4">
        <div className="flex justify-between items-center border-b border-stone-100 pb-3">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-[#176a22]" />
            <h3 className="font-bold text-base text-[#181d16]">
              Danh Sách Đơn Hàng Dùng Tín Dụng B2B (Chờ Quyết Toán Cuối Tháng)
            </h3>
          </div>
          <span className="text-xs bg-[#176a22]/10 text-[#176a22] font-bold px-2.5 py-1 rounded-full">
            {pendingPayLaterOrders.length} đơn hàng
          </span>
        </div>

        {pendingPayLaterOrders.length === 0 ? (
          <div className="text-center py-8 text-[#707a6c] space-y-2">
            <CheckCircle2 className="w-10 h-10 mx-auto text-[#176a22]/50" />
            <p className="font-bold text-sm text-[#181d16]">
              Hiện không có đơn hàng nào đang nợ tín dụng
            </p>
            <p className="text-xs">
              Mọi đơn hàng mới đặt qua tín dụng AgriCredit sẽ được tích lũy vào kỳ quyết toán tiếp theo ({creditInfo.nextDueDate}).
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="bg-[#f7fbf0] text-[#707a6c] font-bold border-b border-[#bfcaba]/30">
                  <th className="p-3 rounded-l-xl">MÃ ĐƠN HÀNG</th>
                  <th className="p-3">NGÀY ĐẶT</th>
                  <th className="p-3">SẢN PHẨM & SỐ LƯỢNG</th>
                  <th className="p-3">HÌNH THỨC</th>
                  <th className="p-3 text-right">TỔNG TIỀN</th>
                  <th className="p-3 text-right rounded-r-xl">TRẠNG THÁI TÍN DỤNG</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {pendingPayLaterOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-stone-50/80 transition-colors">
                    <td className="p-3 font-mono font-bold text-[#176a22]">
                      {order.id}
                    </td>
                    <td className="p-3 text-[#40493d]">{order.date}</td>
                    <td className="p-3">
                      <div className="font-semibold text-[#181d16]">
                        {order.items.map((i) => `${i.productName} (${i.quantityKg}kg)`).join(', ')}
                      </div>
                    </td>
                    <td className="p-3">
                      <span className="bg-[#176a22]/10 text-[#176a22] font-bold px-2 py-0.5 rounded text-[10px]">
                        Tín Dụng Hạng Vàng (30 ngày)
                      </span>
                    </td>
                    <td className="p-3 text-right font-extrabold text-[#181d16]">
                      {formatMoney(order.totalVnd)}
                    </td>
                    <td className="p-3 text-right">
                      <span className="bg-amber-100 text-amber-800 font-bold px-2.5 py-1 rounded-full text-[10px] inline-flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        <span>Chờ quyết toán cuối tháng</span>
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Pay Credit Modal */}
      {isPayModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-[#bfcaba] space-y-5">
            <div className="flex justify-between items-center border-b border-stone-100 pb-3">
              <h3 className="font-bold text-lg text-[#181d16] flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-[#176a22]" />
                <span>Thanh Toán Dư Nợ Tín Dụng B2B</span>
              </h3>
              <button
                onClick={() => setIsPayModalOpen(false)}
                className="text-stone-400 hover:text-stone-700"
              >
                ✕
              </button>
            </div>

            {paySuccess ? (
              <div className="text-center py-6 space-y-3">
                <CheckCircle2 className="w-14 h-14 text-[#176a22] mx-auto animate-bounce" />
                <h4 className="font-bold text-lg text-[#181d16]">
                  Thanh Toán Tín Dụng Thành Công!
                </h4>
                <p className="text-xs text-[#707a6c]">
                  Hạn mức khả dụng của quý khách đã được khôi phục ngay lập tức.
                </p>
              </div>
            ) : (
              <>
                <div className="bg-[#f7fbf0] p-4 rounded-2xl border border-[#bfcaba]/30 space-y-2">
                  <div className="flex justify-between text-xs text-[#707a6c]">
                    <span>Tổng dư nợ đang dùng:</span>
                    <span className="font-bold text-[#181d16]">
                      {formatMoney(creditInfo.usedCreditVnd)}
                    </span>
                  </div>
                  <div className="flex justify-between text-xs text-[#707a6c]">
                    <span>Hạn chót thanh toán:</span>
                    <span className="font-bold text-[#176a22]">
                      {creditInfo.nextDueDate}
                    </span>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-[#181d16]">
                    Số tiền quyết toán (VNĐ):
                  </label>
                  <input
                    type="number"
                    value={payAmount}
                    onChange={(e) => setPayAmount(Number(e.target.value))}
                    className="w-full px-4 py-2.5 rounded-xl border border-stone-300 font-extrabold text-base text-[#181d16] outline-none focus:border-[#176a22]"
                  />
                </div>

                <div className="pt-2 flex gap-3">
                  <button
                    onClick={handleExecutePayment}
                    className="flex-1 bg-[#176a22] hover:bg-[#358439] text-white py-3 rounded-xl font-bold text-sm shadow-md transition-all"
                  >
                    Xác Nhận Quyết Toán
                  </button>
                  <button
                    onClick={() => setIsPayModalOpen(false)}
                    className="px-4 py-3 bg-stone-100 hover:bg-stone-200 text-[#181d16] rounded-xl font-bold text-xs"
                  >
                    Hủy
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
