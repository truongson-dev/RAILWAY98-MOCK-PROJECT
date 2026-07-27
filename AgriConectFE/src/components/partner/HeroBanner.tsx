import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';

const HERO_BANNER_IMAGE = 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1200&auto=format&fit=crop';

interface HeroBannerProps {
  onViewSeasonalOffers: () => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({ onViewSeasonalOffers }) => {
  return (
    <section className="mb-8 relative rounded-2xl overflow-hidden min-h-[260px] md:h-64 flex items-center px-6 md:px-10 group shadow-md border border-[#bfcaba]/30">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={HERO_BANNER_IMAGE}
          alt="Nông trại nông sản bền vững"
          className="w-full h-full object-cover brightness-70 group-hover:scale-105 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-white max-w-xl py-6">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#176a22]/80 backdrop-blur-md rounded-full text-xs font-semibold mb-3 border border-white/20">
          <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
          <span>Ưu Đãi Bán Buôn Tháng 7/2026</span>
        </div>
        <h2 className="text-2xl md:text-3xl font-extrabold mb-2.5 leading-tight tracking-tight">
          Nguồn Nông Sản Bền Vững, Giao Hàng Bán Buôn.
        </h2>
        <p className="text-sm md:text-base opacity-90 mb-5 leading-relaxed text-slate-100">
          Đồng hành cùng nhà nông xác thực cho nhu cầu chuỗi cung ứng của bạn. Nhận ưu đãi theo mùa cho đơn hàng số lượng lớn tháng này.
        </p>
        <button
          onClick={onViewSeasonalOffers}
          className="bg-[#176a22] text-white px-6 py-3 rounded-xl font-bold text-sm hover:bg-[#358439] active:scale-95 transition-all shadow-lg flex items-center gap-2 group/btn"
        >
          <span>Xem Ưu Đãi Theo Mùa</span>
          <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
        </button>
      </div>
    </section>
  );
};
