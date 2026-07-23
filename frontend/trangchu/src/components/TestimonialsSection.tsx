import React, { useState } from 'react';
import { Star, Quote, CheckCircle2, Building2, Sprout, Truck, Sparkles } from 'lucide-react';

export interface TestimonialItem {
  id: string;
  name: string;
  role: string;
  company: string;
  location: string;
  avatar: string;
  category: 'farmer' | 'buyer' | 'carrier';
  rating: number;
  metric: string;
  content: string;
  date: string;
}

const TESTIMONIALS: TestimonialItem[] = [
  {
    id: 't1',
    name: 'Ông Nguyễn Văn Hùng',
    role: 'Giám Đốc HTX',
    company: 'HTX Nông Nghiệp Tiền Giang',
    location: 'Chợ Gạo, Tiền Giang',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200',
    category: 'farmer',
    rating: 5,
    metric: 'Tăng 40% giá trị nông sản',
    content: 'Từ khi niêm yết Thanh Long Ruột Đỏ lên AgriConnect có gắn hộ chiếu QR GlobalGAP, chúng tôi đã ký hợp đồng trực tiếp với 3 tập đoàn chế biến xuất khẩu lớn mà không qua thương lái ép giá. Minh bạch thông tin giúp xã viên tăng thu nhập rõ rệt.',
    date: 'Tháng 5, 2026',
  },
  {
    id: 't2',
    name: 'Bà Trần Thị Thu Hà',
    role: 'Trưởng Phòng Thu Mua',
    company: 'Công Ty CP VinAgri Xuất Nhập Khẩu',
    location: 'Q.1, TP. Hồ Chí Minh',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200',
    category: 'buyer',
    rating: 5,
    metric: 'Tiết kiệm 60% thời gian tìm nguồn hàng',
    content: 'AgriConnect giải quyết triệt để bài toán nguồn cung nông sản đạt chuẩn MRL Châu Âu. Chỉ cần quét mã QR là kiểm tra ngay nhật ký phun thuốc, kiểm định Vinacontrol và tọa độ GPS vùng trồng. Dữ liệu cực kỳ chuẩn xác và đáng tin cậy.',
    date: 'Tháng 6, 2026',
  },
  {
    id: 't3',
    name: 'Anh Lê Minh Trí',
    role: 'Chủ Trang Trại Sầu Riêng',
    company: 'Trang Trại Sầu Riêng Ri6 Krông Pắc',
    location: 'Krông Pắc, Đắk Lắk',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200',
    category: 'farmer',
    rating: 5,
    metric: 'Xuất bán 120 Tấn Sầu Riêng',
    content: 'Trước đây mỗi mùa thu hoạch sầu riêng gia đình tôi rất lo lắng rủi ro đầu ra. Nhờ tính năng đăng ký mã vùng trồng và kết nối sàn B2B, lô hàng 120 Tấn đã được đối tác bao tiêu toàn bộ ngay tại vườn với giá cao.',
    date: 'Tháng 4, 2026',
  },
  {
    id: 't4',
    name: 'Ông Phạm Quốc Bảo',
    role: 'Giám Đốc Logistics',
    company: 'Công Ty Vận Tải Lạnh Mekong Cold-Chain',
    location: 'Cần Thơ',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200',
    category: 'carrier',
    rating: 5,
    metric: 'Giảm 95% khiếu nại nhiệt độ',
    content: 'Hệ thống tích hợp cảm biến IoT Cold-Chain giúp xe container chở xoài, xoài cát Hòa Lộc liên tục truyền dữ liệu nhiệt độ 4.2°C và độ ẩm lên ứng dụng. Khách hàng theo dõi realtime nên vô cùng an tâm khi nhận hàng.',
    date: 'Tháng 6, 2026',
  },
  {
    id: 't5',
    name: 'Bà Nguyễn Ngọc Mai',
    role: 'GĐ Điều Hành',
    company: 'Công Ty Chế Biến Măng Cầu Tây Ninh',
    location: 'Tây Ninh',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
    category: 'buyer',
    rating: 5,
    metric: 'Nguồn hàng ổn định quanh năm',
    content: 'Chúng tôi cần lượng lớn măng cầu dai Tây Ninh phục vụ nhà máy đóng hộp. AgriConnect giúp liên kết trực tiếp với 15 HTX địa phương, đảm bảo nguyên liệu sạch, đồng đều và giao hàng đúng tiến độ.',
    date: 'Tháng 5, 2026',
  },
  {
    id: 't6',
    name: 'Ông Đặng Văn Hoàng',
    role: 'Chủ Tịch HĐQT',
    company: 'HTX Bưởi Da Xanh Bến Tre',
    location: 'Châu Thành, Bến Tre',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=200',
    category: 'farmer',
    rating: 5,
    metric: 'Đạt chuẩn VietGAP xuất khẩu Mỹ',
    content: 'Đội ngũ tư vấn AgriConnect hướng dẫn HTX số hóa toàn bộ nhật ký canh tác điện tử. Đối tác nước ngoài rất ấn tượng khi chỉ cần bấm đường link là xem toàn bộ hồ sơ chất lượng của từng trái bưởi.',
    date: 'Tháng 7, 2026',
  },
];

export const TestimonialsSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'all' | 'farmer' | 'buyer' | 'carrier'>('all');

  const filteredTestimonials = TESTIMONIALS.filter((item) => {
    if (activeTab === 'all') return true;
    return item.category === activeTab;
  });

  return (
    <section className="py-16 lg:py-24 px-4 lg:px-12 bg-[#f1f5ea]/60 border-t border-b border-[#e0e4d9]">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Section Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#bfcaba] text-[#176a22] text-xs font-semibold uppercase tracking-wider shadow-2xs">
            <Sparkles className="w-4 h-4 text-[#176a22]" />
            <span>ĐÁNH GIÁ THỰC TẾ TỪ ĐỐI TÁC</span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#181d16] font-sans">
            Khách Hàng Nói Gì Về <span className="text-[#176a22]">AgriConnect</span>?
          </h2>

          <p className="text-sm sm:text-base text-[#40493d] leading-relaxed">
            Hơn 1,200+ Hợp tác xã, Doanh nghiệp B2B và Đơn vị Vận tải nông sản tin tưởng đồng hành và tối ưu chuỗi giá trị nông nghiệp Việt.
          </p>

          {/* Social Proof Rating Banner */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-6">
            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-2xl border border-[#e0e4d9] shadow-2xs">
              <div className="flex text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <span className="text-sm font-bold text-[#181d16]">4.95 / 5.0</span>
              <span className="text-xs text-[#707a6c]">(1,240+ đánh giá)</span>
            </div>

            <div className="flex items-center gap-2 text-xs font-semibold text-[#176a22] bg-[#e8f5e9] px-3.5 py-2 rounded-2xl border border-[#c8e6c9]">
              <CheckCircle2 className="w-4 h-4" />
              <span>100% Hồ sơ xác minh Mã Số Vùng Trồng & MST</span>
            </div>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex items-center justify-center gap-2 flex-wrap">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'all'
                ? 'bg-[#176a22] text-white shadow-md'
                : 'bg-white border border-[#bfcaba] text-[#40493d] hover:border-[#176a22] hover:text-[#176a22]'
            }`}
          >
            Tất Cả Đánh Giá ({TESTIMONIALS.length})
          </button>

          <button
            onClick={() => setActiveTab('farmer')}
            className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'farmer'
                ? 'bg-[#176a22] text-white shadow-md'
                : 'bg-white border border-[#bfcaba] text-[#40493d] hover:border-[#176a22] hover:text-[#176a22]'
            }`}
          >
            <Sprout className="w-4 h-4" />
            <span>HTX & Nhà Vườn</span>
          </button>

          <button
            onClick={() => setActiveTab('buyer')}
            className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'buyer'
                ? 'bg-[#176a22] text-white shadow-md'
                : 'bg-white border border-[#bfcaba] text-[#40493d] hover:border-[#176a22] hover:text-[#176a22]'
            }`}
          >
            <Building2 className="w-4 h-4" />
            <span>Doanh Nghiệp B2B</span>
          </button>

          <button
            onClick={() => setActiveTab('carrier')}
            className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'carrier'
                ? 'bg-[#176a22] text-white shadow-md'
                : 'bg-white border border-[#bfcaba] text-[#40493d] hover:border-[#176a22] hover:text-[#176a22]'
            }`}
          >
            <Truck className="w-4 h-4" />
            <span>Đối Tác Vận Tải</span>
          </button>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTestimonials.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-3xl p-6 border border-[#e0e4d9] shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-5 relative group hover:-translate-y-1"
            >
              {/* Quote Icon Background watermark */}
              <Quote className="absolute top-6 right-6 w-10 h-10 text-[#176a22]/10 pointer-events-none" />

              <div className="space-y-4">
                {/* Rating & Metric Pill */}
                <div className="flex items-center justify-between gap-2 flex-wrap">
                  <div className="flex text-amber-400">
                    {[...Array(item.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <span className="px-2.5 py-1 bg-emerald-50 text-[#176a22] border border-emerald-200 text-[11px] font-bold rounded-lg">
                    {item.metric}
                  </span>
                </div>

                {/* Content */}
                <p className="text-sm text-[#40493d] leading-relaxed italic font-normal">
                  "{item.content}"
                </p>
              </div>

              {/* Author Info */}
              <div className="pt-4 border-t border-[#f1f5ea] flex items-center gap-3.5">
                <img
                  src={item.avatar}
                  alt={item.name}
                  className="w-11 h-11 rounded-2xl object-cover ring-2 ring-[#e0e4d9] shrink-0"
                />
                <div className="overflow-hidden">
                  <h4 className="font-bold text-sm text-[#181d16] flex items-center gap-1.5 truncate">
                    <span>{item.name}</span>
                    <CheckCircle2 className="w-4 h-4 text-[#176a22] shrink-0" title="Đã xác minh" />
                  </h4>
                  <p className="text-xs text-[#176a22] font-semibold truncate">
                    {item.role} • {item.company}
                  </p>
                  <p className="text-[11px] text-[#707a6c] truncate">
                    {item.location}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Call to Action */}
        <div className="bg-[#176a22] rounded-3xl p-8 sm:p-10 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-lg relative overflow-hidden">
          <div className="space-y-2 max-w-2xl text-center md:text-left">
            <h3 className="text-xl sm:text-2xl font-bold font-sans">
              Bạn Muốn Đưa Nông Sản Của Mình Lên Sàn B2B Toàn Cầu?
            </h3>
            <p className="text-xs sm:text-sm text-white/90 leading-relaxed">
              Đăng ký tài khoản miễn phí ngay hôm nay để nhận tư vấn cấp mã vùng trồng và số hóa nhật ký sản xuất.
            </p>
          </div>

          <div className="shrink-0 flex items-center gap-3">
            <a
              href="#register"
              onClick={(e) => {
                e.preventDefault();
                const btn = document.querySelector('button[onClick*="Register"]') as HTMLButtonElement;
                if (btn) btn.click();
              }}
              className="px-6 py-3.5 bg-white text-[#176a22] hover:bg-emerald-50 active:scale-95 text-xs sm:text-sm font-bold rounded-2xl shadow-sm transition-all whitespace-nowrap"
            >
              Đăng Ký Khảo Sát Ngay
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};
