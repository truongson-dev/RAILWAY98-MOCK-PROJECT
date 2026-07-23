import React from 'react';
import { ArrowRight, Leaf, Box } from 'lucide-react';
import { IMAGES } from '../data/imagePaths';

interface HeroSectionProps {
  onStartNow: () => void;
  onViewProduct: () => void;
  onViewTestimonials?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onStartNow,
  onViewProduct,
  onViewTestimonials,
}) => {
  return (
    <section className="relative overflow-hidden pt-8 lg:pt-16 pb-12 lg:pb-20 px-4 lg:px-12 bg-[#f7fbf0]">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
        
        {/* Left Content */}
        <div className="lg:col-span-6 space-y-6 lg:space-y-8">
          
          {/* Tag Pill */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#ebefe4] border border-[#bfcaba]/50 text-[#176a22] text-xs sm:text-sm font-semibold tracking-wide uppercase">
            <Leaf className="w-4 h-4" />
            <span>CÔNG NGHỆ NÔNG NGHIỆP 4.0</span>
          </div>

          {/* Headline */}
          <h1 className="text-3xl sm:text-4xl lg:text-[52px] font-bold text-[#181d16] leading-[1.15] tracking-tight font-sans">
            Kết Nối Nông Sản Việt Với <br className="hidden sm:inline" />
            <span className="text-[#176a22]">Thị Trường B2B</span>
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg text-[#40493d] max-w-xl leading-relaxed font-normal">
            Hệ sinh thái thương mại nông nghiệp thông minh, tối ưu hóa chuỗi cung ứng từ nông trại đến doanh nghiệp chế biến và xuất khẩu.
          </p>

          {/* Action Button */}
          <div className="pt-2 flex flex-wrap items-center gap-4">
            <button
              onClick={onStartNow}
              className="px-7 py-3.5 bg-[#176a22] hover:bg-[#12531a] active:scale-95 text-white font-semibold text-base rounded-full shadow-md flex items-center gap-3 group transition-all"
            >
              <span>Bắt đầu ngay</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Social Proof Avatars */}
          <div 
            onClick={onViewTestimonials}
            className="pt-4 flex items-center gap-4 cursor-pointer group rounded-2xl p-2 -ml-2 hover:bg-[#ebefe4]/60 transition-all"
            title="Xem đánh giá từ khách hàng & đối tác"
          >
            <div className="flex -space-x-2 overflow-hidden">
              <img
                className="inline-block h-10 w-10 rounded-full ring-2 ring-[#f7fbf0] object-cover"
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200"
                alt="Farmer Avatar"
              />
              <img
                className="inline-block h-10 w-10 rounded-full ring-2 ring-[#f7fbf0] object-cover"
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200"
                alt="Buyer Avatar"
              />
              <img
                className="inline-block h-10 w-10 rounded-full ring-2 ring-[#f7fbf0] object-cover"
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200"
                alt="Manager Avatar"
              />
              <div className="flex items-center justify-center h-10 w-10 rounded-full bg-[#176a22] text-white text-xs font-bold ring-2 ring-[#f7fbf0]">
                +5k
              </div>
            </div>
            <div>
              <p className="text-xs sm:text-sm text-[#40493d] font-medium leading-snug group-hover:text-[#176a22] transition-colors">
                Tham gia cùng <strong className="text-[#181d16] font-bold">500+ doanh nghiệp</strong> đang tin dùng AgriConnect.
              </p>
              <span className="text-[11px] font-bold text-[#176a22] underline group-hover:no-underline">
                Xem đánh giá khách hàng (4.95★) →
              </span>
            </div>
          </div>

        </div>

        {/* Right Image & Floating Overlay Card */}
        <div className="lg:col-span-6 relative">
          <div className="relative rounded-[28px] overflow-hidden shadow-xl border border-[#e0e4d9]/80 bg-[#ebefe4]">
            <img
              src={IMAGES.heroWarehouse}
              alt="AgriConnect B2B Warehouse"
              className="w-full h-[360px] sm:h-[460px] object-cover hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none" />

            {/* Floating Card Overlay */}
            <div 
              onClick={onViewProduct}
              className="absolute bottom-6 left-6 right-6 sm:right-auto bg-white/95 backdrop-blur-md p-4 sm:p-5 rounded-2xl shadow-xl border border-white/60 flex items-center justify-between gap-4 cursor-pointer hover:bg-white transition-all transform hover:-translate-y-1"
            >
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#ebefe4] border border-[#bfcaba]/40 flex items-center justify-center text-[#176a22] shrink-0">
                  <Box className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-xs text-[#707a6c] font-medium block">Lô hàng mới</span>
                  <h4 className="text-base sm:text-lg font-bold text-[#181d16] font-sans leading-tight">
                    Thanh Long GlobalGAP
                  </h4>
                  <p className="text-sm font-bold text-[#176a22] mt-0.5">
                    25.000 VNĐ/kg
                  </p>
                </div>
              </div>

              <span className="px-3 py-1 bg-[#e0e4d9] text-[#176a22] text-[11px] font-bold uppercase rounded-md tracking-wider shrink-0">
                SẴN SÀNG
              </span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
