import React, { useState } from 'react';
import { GroupBuyCampaign } from './types';
import { Users, Clock, ArrowRight, CheckCircle2 } from 'lucide-react';

interface GroupBuyingViewProps {
  campaigns: GroupBuyCampaign[];
  currency: 'VND' | 'USD';
  onJoinCampaign: (campaign: GroupBuyCampaign, volumeKg: number) => void;
}

export const GroupBuyingView: React.FC<GroupBuyingViewProps> = ({
  campaigns,
  currency,
  onJoinCampaign,
}) => {
  const [selectedCampaign, setSelectedCampaign] = useState<GroupBuyCampaign | null>(null);
  const [joinVolumeKg, setJoinVolumeKg] = useState<number>(300);
  const [isSuccess, setIsSuccess] = useState(false);

  const formatPrice = (priceVnd: number) => {
    return currency === 'USD'
      ? `$${(priceVnd / 24500).toFixed(2)}`
      : `${priceVnd.toLocaleString('vi-VN')}đ`;
  };

  const handleConfirmJoin = () => {
    if (selectedCampaign) {
      onJoinCampaign(selectedCampaign, joinVolumeKg);
      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
        setSelectedCampaign(null);
      }, 1500);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-3xl shadow-xs border border-[#bfcaba]/30">
        <div className="flex items-center gap-3 text-[#176a22] mb-2">
          <Users className="w-8 h-8" />
          <h2 className="text-2xl font-bold text-[#181d16]">
            Mua Chung Nông Sản Sỉ (Group Buying)
          </h2>
        </div>
        <p className="text-sm text-[#40493d] max-w-3xl leading-relaxed">
          Gom đơn chung với các đại lý và nhà thu mua toàn quốc để đạt hạn mức sản lượng lớn của trang trại, hưởng mức giá chiết khấu đặc biệt lên tới 25%.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {campaigns.map((camp) => {
          const progressPercent = Math.min(
            100,
            Math.round((camp.currentVolumeKg / camp.targetVolumeKg) * 100)
          );

          return (
            <div
              key={camp.id}
              className="bg-white rounded-2xl overflow-hidden border border-[#bfcaba]/30 shadow-xs hover:shadow-md transition-shadow flex flex-col"
            >
              <div className="h-44 relative bg-stone-200">
                <img
                  src={camp.product.image}
                  alt={camp.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 left-3 bg-[#ba1a1a] text-white text-xs font-extrabold px-2.5 py-1 rounded-md uppercase tracking-wider">
                  Giảm {camp.discountPercent}% Sỉ
                </div>
                <div className="absolute top-3 right-3 bg-black/60 backdrop-blur text-white text-xs px-2.5 py-1 rounded-md flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{camp.endDate}</span>
                </div>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <h4 className="font-bold text-base text-[#181d16] line-clamp-2">
                    {camp.title}
                  </h4>
                  <p className="text-xs text-[#707a6c] mt-1 font-medium">
                    Xuất xứ: {camp.product.location}
                  </p>

                  <div className="mt-3 flex items-baseline gap-2">
                    <span className="text-xl font-extrabold text-[#176a22]">
                      {formatPrice(camp.discountedPriceVnd)}/kg
                    </span>
                    <span className="text-xs text-[#707a6c] line-through">
                      {formatPrice(camp.originalPriceVnd)}
                    </span>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs font-semibold text-[#40493d]">
                    <span>
                      Đã gom: {camp.currentVolumeKg.toLocaleString()} / {camp.targetVolumeKg.toLocaleString()} kg
                    </span>
                    <span className="text-[#176a22] font-bold">
                      {progressPercent}%
                    </span>
                  </div>
                  <div className="w-full bg-stone-200 h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-[#176a22] h-full transition-all duration-500"
                      style={{ width: `${progressPercent}%` }}
                    />
                  </div>
                  <p className="text-[11px] text-[#707a6c]">
                    {camp.participantsCount} đối tác đã đăng ký tham gia
                  </p>
                </div>

                <button
                  onClick={() => {
                    setSelectedCampaign(camp);
                    setJoinVolumeKg(camp.product.minOrderKg);
                  }}
                  className="w-full bg-[#176a22] hover:bg-[#358439] text-white py-2.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all active:scale-98"
                >
                  <span>Tham Gia Gom Đơn Sỉ</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Join Modal */}
      {selectedCampaign && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-[#bfcaba] relative">
            {isSuccess ? (
              <div className="text-center py-6">
                <CheckCircle2 className="w-12 h-12 text-[#176a22] mx-auto mb-2" />
                <h4 className="text-xl font-bold text-[#181d16]">
                  Đã Đăng Ký Gom Đơn!
                </h4>
                <p className="text-xs text-[#40493d] mt-1">
                  Khối lượng nông sản của bạn đã được cộng vào chiến dịch.
                </p>
              </div>
            ) : (
              <>
                <h3 className="text-lg font-bold text-[#181d16] mb-2">
                  Đăng Ký Gom Đơn Sỉ
                </h3>
                <p className="text-xs text-[#40493d] mb-4">
                  {selectedCampaign.title}
                </p>

                <div className="space-y-4">
                  <div>
                    <label className="text-xs font-bold text-[#181d16] block mb-1">
                      Nhập khối lượng muốn mua chung (kg):
                    </label>
                    <input
                      type="number"
                      value={joinVolumeKg}
                      onChange={(e) =>
                        setJoinVolumeKg(
                          Math.max(
                            selectedCampaign.product.minOrderKg,
                            parseInt(e.target.value) ||
                              selectedCampaign.product.minOrderKg
                          )
                        )
                      }
                      className="w-full p-2.5 border border-stone-300 rounded-xl font-bold text-sm outline-none focus:border-[#176a22]"
                      min={selectedCampaign.product.minOrderKg}
                      step={50}
                    />
                    <p className="text-[11px] text-[#707a6c] mt-1">
                      Khối lượng tối thiểu: {selectedCampaign.product.minOrderKg}kg
                    </p>
                  </div>

                  <div className="p-3 bg-[#f7fbf0] rounded-xl border border-[#bfcaba]/40 space-y-1 text-xs">
                    <div className="flex justify-between">
                      <span>Giá sỉ sau giảm:</span>
                      <span className="font-bold text-[#176a22]">
                        {formatPrice(selectedCampaign.discountedPriceVnd)}/kg
                      </span>
                    </div>
                    <div className="flex justify-between font-bold text-sm pt-1 border-t border-stone-200">
                      <span>Thành tiền:</span>
                      <span className="text-[#176a22]">
                        {formatPrice(
                          joinVolumeKg * selectedCampaign.discountedPriceVnd
                        )}
                      </span>
                    </div>
                  </div>

                  <div className="flex gap-2 pt-2">
                    <button
                      onClick={() => setSelectedCampaign(null)}
                      className="flex-1 py-2.5 bg-stone-100 hover:bg-stone-200 rounded-xl font-bold text-xs text-stone-700"
                    >
                      Hủy Bỏ
                    </button>
                    <button
                      onClick={handleConfirmJoin}
                      className="flex-1 py-2.5 bg-[#176a22] hover:bg-[#358439] rounded-xl font-bold text-xs text-white"
                    >
                      Xác Nhận Tham Gia
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
