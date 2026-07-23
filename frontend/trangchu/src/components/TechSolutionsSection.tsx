import React from 'react';
import { QrCode, FileText, Truck, CheckCircle2, ShieldCheck, Sparkles } from 'lucide-react';
import { IMAGES } from '../data/imagePaths';

interface TechSolutionsSectionProps {
  onOpenQrModal: () => void;
  onOpenLogisticsModal: () => void;
  onOpenCertModal: () => void;
}

export const TechSolutionsSection: React.FC<TechSolutionsSectionProps> = ({
  onOpenQrModal,
  onOpenLogisticsModal,
  onOpenCertModal,
}) => {
  return (
    <section id="giai-phap" className="py-16 lg:py-24 px-4 lg:px-12 bg-[#f7fbf0]">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#181d16] font-sans tracking-tight">
            Giải Pháp Công Nghệ Toàn Diện
          </h2>
          <p className="text-base sm:text-lg text-[#40493d]">
            Chúng tôi giải quyết các nút thắt trong chuỗi cung ứng bằng nền tảng quản trị dữ liệu tập trung.
          </p>
        </div>

        {/* Top Row: 2 Big Cards (QR Traceability & Escrow Payment) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
          
          {/* Left Card: QR Traceability (Span 7) */}
          <div 
            onClick={onOpenQrModal}
            className="lg:col-span-7 bg-[#f1f5ea] border border-[#e0e4d9] rounded-3xl p-6 sm:p-8 flex flex-col justify-between group cursor-pointer hover:shadow-lg transition-all transform hover:-translate-y-1"
          >
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-white border border-[#bfcaba]/40 flex items-center justify-center text-[#176a22] shadow-xs">
                <QrCode className="w-6 h-6" />
              </div>

              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-[#181d16] font-sans">
                  Truy xuất nguồn gốc (QR)
                </h3>
                <p className="text-sm sm:text-base text-[#40493d] mt-2 leading-relaxed">
                  Minh bạch hóa toàn bộ quá trình canh tác, thu hoạch và đóng gói thông qua mã định danh duy nhất cho từng lô hàng.
                </p>
              </div>
            </div>

            {/* Image Container */}
            <div className="mt-6 rounded-2xl overflow-hidden border border-[#e0e4d9] shadow-md relative">
              <img
                src={IMAGES.dragonFruitQr}
                alt="Truy xuất nguồn gốc QR"
                className="w-full h-[220px] sm:h-[280px] object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-md text-white text-xs px-3 py-1.5 rounded-full flex items-center gap-1.5 font-medium">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                Nhấp để xem Demo Quét QR
              </div>
            </div>
          </div>

          {/* Right Card: Product Information & QR Digital Passport (Span 5) - Dark Green Highlight Card */}
          <div 
            onClick={onOpenQrModal}
            className="lg:col-span-5 bg-[#176a22] text-white rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-lg cursor-pointer hover:bg-[#13571c] transition-all transform hover:-translate-y-1 relative overflow-hidden group"
          >
            <div className="space-y-4 relative z-10">
              <div className="w-12 h-12 rounded-xl bg-white/15 border border-white/20 flex items-center justify-center text-white">
                <FileText className="w-6 h-6" />
              </div>

              <div>
                <h3 className="text-xl sm:text-2xl font-bold font-sans flex items-center gap-2">
                  Thông Tin Lô Hàng & Hộ Chiếu QR
                </h3>
                <p className="text-sm sm:text-base text-white/90 mt-2 leading-relaxed">
                  Hiển thị đầy đủ chứng nhận MRL, nhật ký phun bón, vùng trồng GPS và mã QR xác thực chất lượng trước khi giao dịch.
                </p>
              </div>
            </div>

            {/* Product QR Quick Info Box */}
            <div className="mt-8 bg-[#12531a] border border-white/15 rounded-2xl p-4 sm:p-5 space-y-3 relative z-10">
              <div className="flex items-center justify-between text-xs sm:text-sm font-medium text-white/90">
                <span className="flex items-center gap-2 font-bold">
                  <Sparkles className="w-4 h-4 text-emerald-300" />
                  Mã Lô: LOT-TL-2026-009
                </span>
                <span className="px-2 py-0.5 bg-emerald-400/20 text-emerald-200 border border-emerald-400/30 text-[10px] font-bold rounded-md">
                  GlobalGAP
                </span>
              </div>

              <div className="text-xs text-white/80 space-y-1">
                <p>• Sản phẩm: Thanh Long Ruột Đỏ Chợ Gạo</p>
                <p>• Kiểm định: Đạt chuẩn MRL Dư Lượng Châu Âu</p>
              </div>

              <div className="pt-2 text-right">
                <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-200 group-hover:underline">
                  Quét QR xem thông tin chi tiết →
                </span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Row: 2 Medium Cards (Smart Logistics & Quality Commitment) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          
          {/* Smart Logistics */}
          <div 
            onClick={onOpenLogisticsModal}
            className="bg-[#f1f5ea] border border-[#e0e4d9] rounded-3xl p-6 sm:p-8 flex flex-col justify-between cursor-pointer hover:shadow-md transition-all transform hover:-translate-y-1"
          >
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-xl bg-white border border-[#bfcaba]/40 flex items-center justify-center text-[#176a22] shadow-xs">
                <Truck className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-[#181d16] font-sans">
                Smart Logistics
              </h3>
              <p className="text-sm sm:text-base text-[#40493d] leading-relaxed">
                Tối ưu hóa tuyến đường vận chuyển, giảm thiểu hao hụt sau thu hoạch với hệ thống cảm biến IoT nhiệt độ.
              </p>
            </div>
          </div>

          {/* Quality Commitment & Certification Badges */}
          <div 
            onClick={onOpenCertModal}
            className="bg-[#f1f5ea] border border-[#e0e4d9] rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 cursor-pointer hover:shadow-md transition-all transform hover:-translate-y-1"
          >
            <div className="space-y-3 max-w-sm">
              <div className="w-12 h-12 rounded-xl bg-white border border-[#bfcaba]/40 flex items-center justify-center text-[#176a22] shadow-xs">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-[#181d16] font-sans">
                Cam kết Chất lượng
              </h3>
              <p className="text-sm sm:text-base text-[#40493d] leading-relaxed">
                Mọi đối tác trên AgriMarket đều phải trải qua quy trình xác minh 3 lớp và sở hữu các chứng chỉ VietGAP/GlobalGAP.
              </p>
            </div>

            {/* Certification Badge Boxes */}
            <div className="flex items-center gap-3 shrink-0">
              <div className="w-20 h-20 rounded-2xl bg-white border border-[#bfcaba]/50 p-2 flex flex-col items-center justify-center text-center shadow-xs">
                <div className="w-7 h-7 rounded-full bg-[#176a22] text-white flex items-center justify-center font-bold text-[10px] mb-1">
                  🌿
                </div>
                <span className="text-[10px] font-bold text-[#181d16] tracking-tight">VIETGAP</span>
              </div>

              <div className="w-20 h-20 rounded-2xl bg-white border border-[#bfcaba]/50 p-2 flex flex-col items-center justify-center text-center shadow-xs">
                <div className="w-7 h-7 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-[10px] mb-1">
                  🌐
                </div>
                <span className="text-[10px] font-bold text-[#181d16] tracking-tight">GLOBALGAP</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
