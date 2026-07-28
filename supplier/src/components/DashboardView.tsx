import React from 'react';
import { 
  Plus, 
  Calendar as CalendarIcon, 
  ChevronRight, 
  ChevronLeft,
  TrendingUp,
  Circle,
  Clock,
  Sun,
  CloudSun,
  CloudRain,
  Droplets,
  Wind,
  MapPin,
  Sparkles,
  Sprout,
  FileText,
  Users,
  ShieldCheck,
  ArrowUpRight
} from 'lucide-react';
import { Product, MarketPrice, NoticeItem, HarvestEvent } from '../types';

interface DashboardViewProps {
  products: Product[];
  marketPrices: MarketPrice[];
  notices: NoticeItem[];
  harvestEvents: HarvestEvent[];
  onOpenAddProductModal: () => void;
  onOpenUpdateSeasonModal: () => void;
  onOpenMarketRatesModal: () => void;
  onSelectProductToEdit: (product: Product) => void;
  onToggleProductStatus: (productId: string) => void;
  onNavigateToTab: (tab: any) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  products,
  marketPrices,
  notices,
  harvestEvents,
  onOpenAddProductModal,
  onOpenUpdateSeasonModal,
  onOpenMarketRatesModal,
  onSelectProductToEdit,
  onToggleProductStatus,
  onNavigateToTab
}) => {
  // Grab top 3 products for "Sản phẩm vừa đăng"
  const recentProducts = products.slice(0, 3);

  return (
    <div className="space-y-6 pb-12">
      {/* 1. Welcome & Header Greeting Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-[#181d16] tracking-tight">
            Chào buổi sáng, Ông Hùng!
          </h2>
          <p className="text-sm text-[#5e6958] mt-0.5 font-medium">
            Hôm nay là một ngày tuyệt vời để thu hoạch.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          <button
            id="dash-add-product-btn"
            onClick={onOpenAddProductModal}
            className="bg-[#176a22] hover:bg-[#12541b] text-white px-4 py-2.5 rounded-xl font-semibold text-sm flex items-center gap-2 shadow-xs transition-all cursor-pointer"
          >
            <Plus size={18} strokeWidth={2.5} />
            <span>Thêm sản phẩm</span>
          </button>

          <button
            id="dash-update-season-btn"
            onClick={onOpenUpdateSeasonModal}
            className="bg-[#ebefe4] hover:bg-[#dfe6d4] text-[#181d16] px-4 py-2.5 rounded-xl font-bold text-sm border border-[#d0d6c7] flex items-center gap-2 transition-all cursor-pointer shadow-2xs hover:shadow-xs"
          >
            <CalendarIcon size={18} className="text-[#176a22]" />
            <span>Đăng Lịch Sản Xuất</span>
          </button>
        </div>
      </div>

      {/* Overview KPI Summary Stats Cards */}
      <div id="overview-summary-stats" className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4">
        {/* Stat 1: Sản lượng bao tiêu */}
        <div className="bg-white p-4 rounded-2xl border border-[#bfcaba]/30 shadow-2xs hover:shadow-xs transition-shadow space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[#5e6958]">Sản Lượng Bao Tiêu</span>
            <div className="w-8 h-8 rounded-xl bg-[#c9ecc1] text-[#176a22] flex items-center justify-center font-bold">
              <Sprout size={18} />
            </div>
          </div>
          <div>
            <div className="text-xl sm:text-2xl font-black text-[#181d16] tracking-tight">68.5 Tấn</div>
            <div className="text-[11px] text-[#176a22] font-bold flex items-center gap-1 mt-0.5">
              <ArrowUpRight size={12} />
              <span>3 vụ mùa thu hoạch sắp tới</span>
            </div>
          </div>
        </div>

        {/* Stat 2: Hợp đồng tương lai */}
        <div 
          onClick={() => onNavigateToTab('forward-contracts')}
          className="bg-white p-4 rounded-2xl border border-[#bfcaba]/30 shadow-2xs hover:border-[#176a22] hover:shadow-xs transition-all cursor-pointer space-y-2 group"
          title="Xem danh sách Hợp đồng tương lai"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[#5e6958] group-hover:text-[#176a22] transition-colors">Hợp Đồng Tương Lai</span>
            <div className="w-8 h-8 rounded-xl bg-[#176a22] text-white flex items-center justify-center font-bold shadow-2xs group-hover:scale-105 transition-transform">
              <FileText size={18} />
            </div>
          </div>
          <div>
            <div className="text-xl sm:text-2xl font-black text-[#181d16] tracking-tight">4 Hợp Đồng</div>
            <div className="text-[11px] text-[#176a22] font-bold flex items-center gap-1 mt-0.5">
              <ShieldCheck size={12} />
              <span>Tổng giá trị ~1.85 Tỷ VNĐ &rarr;</span>
            </div>
          </div>
        </div>

        {/* Stat 3: Yêu cầu thu mua mới */}
        <div className="bg-white p-4 rounded-2xl border border-[#bfcaba]/30 shadow-2xs hover:shadow-xs transition-shadow space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[#5e6958]">Yêu Cầu Thu Mua</span>
            <div className="w-8 h-8 rounded-xl bg-[#ffd9e2] text-[#9d3c5f] flex items-center justify-center font-bold">
              <Users size={18} />
            </div>
          </div>
          <div>
            <div className="text-xl sm:text-2xl font-black text-[#181d16] tracking-tight">12 Doanh Nghiệp</div>
            <div className="text-[11px] text-[#9d3c5f] font-bold flex items-center gap-1 mt-0.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#9d3c5f] animate-ping inline-block" />
              <span>+3 kết nối mới tuần này</span>
            </div>
          </div>
        </div>

        {/* Stat 4: Chỉ số giá nông sản */}
        <div className="bg-white p-4 rounded-2xl border border-[#bfcaba]/30 shadow-2xs hover:shadow-xs transition-shadow space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[#5e6958]">Chỉ Số Giá Thị Trường</span>
            <div className="w-8 h-8 rounded-xl bg-[#e3f2fd] text-[#1565c0] flex items-center justify-center font-bold">
              <TrendingUp size={18} />
            </div>
          </div>
          <div>
            <div className="text-xl sm:text-2xl font-black text-[#181d16] tracking-tight">+8.2% <span className="text-xs font-normal text-[#5e6958]">/tháng</span></div>
            <div className="text-[11px] text-[#1565c0] font-bold flex items-center gap-1 mt-0.5">
              <span>Sầu riêng & Cà phê tăng mạnh</span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Middle Grid Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column (Market Prices & Weather Forecast) - 5 cols */}
        <div className="lg:col-span-5 space-y-6">
          {/* Compact Weather Forecast Card with Horizontal Scroll/Ticker */}
          <div className="bg-gradient-to-r from-[#176a22] via-[#23772f] to-[#358439] text-white rounded-2xl p-3.5 shadow-xs relative overflow-hidden">
            {/* Background Accent */}
            <div className="absolute right-0 top-0 bottom-0 opacity-10 pointer-events-none flex items-center pr-4">
              <Sun size={90} />
            </div>

            <div className="relative z-10 space-y-2.5">
              {/* Header Bar */}
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-1.5 font-bold text-[#a3f69c]">
                  <MapPin size={14} />
                  <span>Mỹ Tho, Tiền Giang</span>
                  <span className="text-[10px] text-white/80 font-normal">• Thứ Bảy, 25/7</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="bg-white/20 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                    Dự báo thời tiết 7 ngày
                  </span>
                </div>
              </div>

              {/* Main Weather Row + Horizontal Forecast Ticker */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-0.5">
                {/* Left: Compact Main Temp */}
                <div className="flex items-center gap-3 shrink-0">
                  <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-xs flex items-center justify-center text-[#a3f69c]">
                    <Sun size={24} className="animate-pulse" />
                  </div>
                  <div>
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-2xl font-black leading-none">29°C</span>
                      <span className="text-xs text-[#a3f69c] font-semibold">Nắng nhẹ</span>
                    </div>
                    <div className="text-[11px] text-white/80 flex items-center gap-2 mt-0.5">
                      <span className="flex items-center gap-0.5"><Droplets size={11} className="text-[#a3f69c]" /> 72%</span>
                      <span className="flex items-center gap-0.5"><Wind size={11} className="text-[#a3f69c]" /> 12km/h</span>
                    </div>
                  </div>
                </div>

                {/* Right: Horizontal Scrolling 7-Day Forecast Ticker */}
                <div className="flex-1 overflow-x-auto no-scrollbar py-0.5 pr-1">
                  <div className="flex items-center gap-2 text-center text-[11px] min-w-max">
                    <div className="px-2.5 py-1.5 rounded-xl bg-white/20 border border-white/20 flex flex-col items-center min-w-[62px]">
                      <span className="font-bold text-[#a3f69c]">Hôm nay</span>
                      <Sun size={14} className="my-0.5 text-amber-300" />
                      <span className="font-bold">29°C</span>
                    </div>
                    <div className="px-2.5 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 transition-colors flex flex-col items-center min-w-[62px]">
                      <span className="opacity-80">CN 26/7</span>
                      <Sun size={14} className="my-0.5 text-amber-300" />
                      <span className="font-bold">31°C</span>
                    </div>
                    <div className="px-2.5 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 transition-colors flex flex-col items-center min-w-[62px]">
                      <span className="opacity-80">T2 27/7</span>
                      <CloudRain size={14} className="my-0.5 text-sky-300" />
                      <span className="font-bold">28°C</span>
                    </div>
                    <div className="px-2.5 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 transition-colors flex flex-col items-center min-w-[62px]">
                      <span className="opacity-80">T3 28/7</span>
                      <CloudSun size={14} className="my-0.5 text-amber-200" />
                      <span className="font-bold">30°C</span>
                    </div>
                    <div className="px-2.5 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 transition-colors flex flex-col items-center min-w-[62px]">
                      <span className="opacity-80">T4 29/7</span>
                      <Sun size={14} className="my-0.5 text-amber-300" />
                      <span className="font-bold">32°C</span>
                    </div>
                    <div className="px-2.5 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 transition-colors flex flex-col items-center min-w-[62px]">
                      <span className="opacity-80">T5 30/7</span>
                      <CloudSun size={14} className="my-0.5 text-amber-200" />
                      <span className="font-bold">30°C</span>
                    </div>
                    <div className="px-2.5 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 transition-colors flex flex-col items-center min-w-[62px]">
                      <span className="opacity-80">T6 31/7</span>
                      <Sun size={14} className="my-0.5 text-amber-300" />
                      <span className="font-bold">31°C</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Ultra Compact AI Advice Strip */}
              <div className="bg-white/15 backdrop-blur-xs px-2.5 py-1 rounded-lg flex items-center gap-1.5 text-[11px] text-[#f7fff1] truncate">
                <Sparkles size={13} className="text-[#a3f69c] shrink-0" />
                <span className="truncate">
                  <strong>Khuyên nông:</strong> Nắng đẹp, thích hợp tưới gốc buổi sáng và vận chuyển cam sành.
                </span>
              </div>
            </div>
          </div>

          {/* Market Prices Card */}
          <div className="bg-white rounded-2xl border border-[#e0e4d9] shadow-xs p-5 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-base font-bold text-[#181d16]">Giá thị trường hôm nay</h3>
                <TrendingUp size={18} className="text-[#176a22]" />
              </div>

              <div className="divide-y divide-[#f0f4ea]">
                {marketPrices.slice(0, 3).map((item) => (
                  <div key={item.id} className="py-3.5 flex items-center justify-between first:pt-0">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-[#f1f5ea] flex items-center justify-center text-[#176a22]">
                        <Circle size={10} className="fill-[#176a22]" />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-[#181d16] leading-snug">
                          {item.cropName}
                        </h4>
                        <p className="text-xs text-[#707a6c]">{item.grade}</p>
                      </div>
                    </div>

                    <div className="text-right">
                      <p className="text-sm font-extrabold text-[#181d16]">
                        {item.price.toLocaleString('vi-VN')}đ
                      </p>
                      <span className={`text-[11px] font-semibold ${item.changePercent >= 0 ? 'text-[#176a22]' : 'text-[#ba1a1a]'}`}>
                        {item.changePercent >= 0 ? `+${item.changePercent}%` : `${item.changePercent}%`}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={onOpenMarketRatesModal}
              className="mt-4 w-full py-2.5 text-center text-xs font-bold text-[#176a22] hover:bg-[#f1f5ea] rounded-xl transition-colors"
            >
              Xem tất cả báo giá
            </button>
          </div>
        </div>

        {/* Right Column (Harvest Calendar & Cards) - 7 cols */}
        <div className="lg:col-span-7">
          <div className="bg-white rounded-2xl border border-[#e0e4d9] shadow-xs p-5 space-y-5">
            {/* Calendar Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <h3 className="text-base font-bold text-[#181d16]">Lịch thu hoạch</h3>
                <span className="bg-[#c9ecc1] text-[#176a22] text-xs font-bold px-3 py-1 rounded-full">
                  Tháng 10
                </span>
              </div>

              <div className="flex items-center gap-1 text-[#5e6958]">
                <button className="p-1 hover:bg-[#f1f5ea] rounded-lg">
                  <ChevronLeft size={20} />
                </button>
                <button className="p-1 hover:bg-[#f1f5ea] rounded-lg">
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>

            {/* Mini Calendar Table */}
            <div className="border border-[#e0e4d9] rounded-xl overflow-hidden text-center text-xs">
              <div className="grid grid-cols-7 bg-[#f1f5ea] py-2.5 font-bold text-[#3e483a] border-b border-[#e0e4d9]">
                <div>CN</div>
                <div>T2</div>
                <div>T3</div>
                <div>T4</div>
                <div>T5</div>
                <div>T6</div>
                <div>T7</div>
              </div>

              <div className="grid grid-cols-7 bg-white text-[#181d16] divide-x divide-y divide-[#e0e4d9]">
                {/* Row 1 */}
                <div className="p-2.5 text-[#a0a89a]">27</div>
                <div className="p-2.5 text-[#a0a89a]">28</div>
                <div className="p-2.5 text-[#a0a89a]">29</div>
                <div className="p-2.5 text-[#a0a89a]">30</div>
                <div className="p-2 font-bold">1</div>
                <div className="p-1 font-bold relative bg-[#f7fbf0]">
                  <span>2</span>
                  <div className="mt-0.5 bg-[#176a22] text-white text-[9px] px-1 py-0.5 rounded-sm font-semibold truncate" title="Thu hoạch Cam Sành">
                    Thu hoạch Cam...
                  </div>
                </div>
                <div className="p-2 font-bold">3</div>

                {/* Row 2 */}
                <div className="p-2 font-bold">4</div>
                <div className="p-2 font-bold">5</div>
                <div className="p-2 font-bold">6</div>
                <div className="p-1 font-bold relative bg-[#f7fbf0]">
                  <span>7</span>
                  <div className="mt-0.5 bg-[#bc5478] text-white text-[9px] px-1 py-0.5 rounded-sm font-semibold truncate" title="Phun thuốc bảo vệ">
                    Phun thuốc...
                  </div>
                </div>
                <div className="p-2 font-bold">8</div>
                <div className="p-2 font-bold">9</div>
                <div className="p-2 font-bold">10</div>

                {/* Row 3 */}
                <div className="p-2 font-bold">11</div>
                <div className="p-2 font-bold">12</div>
                <div className="p-2 font-bold">13</div>
                <div className="p-2 font-bold">14</div>
                <div className="p-1 font-bold relative bg-[#f7fbf0]">
                  <span>15</span>
                  <div className="mt-0.5 bg-[#358439] text-white text-[9px] px-1 py-0.5 rounded-sm font-semibold truncate" title="Bón phân đợt 2">
                    Bón phân...
                  </div>
                </div>
                <div className="p-2 font-bold">16</div>
                <div className="p-2 font-bold">17</div>

                {/* Row 4 */}
                <div className="p-2 font-bold">18</div>
                <div className="p-2 font-bold">19</div>
                <div className="p-1 font-bold relative bg-[#f7fbf0]">
                  <span>20</span>
                  <div className="mt-0.5 bg-[#176a22] text-white text-[9px] px-1 py-0.5 rounded-sm font-semibold truncate" title="Thu hoạch Sầu Riêng">
                    Thu hoạch Sầu...
                  </div>
                </div>
                <div className="p-2 font-bold">21</div>
                <div className="p-2 font-bold">22</div>
                <div className="p-2 font-bold">23</div>
                <div className="p-2 font-bold">24</div>

                {/* Row 5 */}
                <div className="p-2 font-bold">25</div>
                <div className="p-2 font-bold">26</div>
                <div className="p-2 font-bold">27</div>
                <div className="p-1 font-bold relative bg-[#f7fbf0]">
                  <span>28</span>
                  <div className="mt-0.5 bg-[#176a22] text-white text-[9px] px-1 py-0.5 rounded-sm font-semibold truncate" title="Thu hoạch Gạo ST25">
                    Thu hoạch Gạo...
                  </div>
                </div>
                <div className="p-2 font-bold">29</div>
                <div className="p-2 font-bold">30</div>
                <div className="p-2 font-bold">31</div>
              </div>
            </div>

            {/* Harvest Item Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
              {harvestEvents.map((event) => (
                <div 
                  key={event.id}
                  className="bg-[#f1f5ea] p-3.5 rounded-xl border border-[#e0e4d9] flex items-center gap-3"
                >
                  <img
                    src={event.imageUrl}
                    alt={event.cropName}
                    className="w-14 h-14 object-cover rounded-lg shrink-0"
                  />
                  <div>
                    <h4 className="text-sm font-bold text-[#181d16]">
                      {event.cropName}
                    </h4>
                    <p className="text-xs text-[#176a22] font-semibold flex items-center gap-1 mt-0.5">
                      <Clock size={12} />
                      {event.daysLeftText}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 4. Bottom Section: Sản phẩm vừa đăng */}
      <div className="space-y-4 pt-2">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-[#181d16]">Sản phẩm vừa đăng</h3>
          <button
            onClick={() => onNavigateToTab('product-catalog')}
            className="text-xs font-bold text-[#176a22] hover:underline flex items-center gap-1"
          >
            <span>Tất cả sản phẩm</span>
            <ChevronRight size={16} />
          </button>
        </div>

        {/* 3 Product Cards Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {recentProducts.map((prod) => (
            <div
              key={prod.id}
              className="bg-white rounded-2xl border border-[#e0e4d9] shadow-xs overflow-hidden flex flex-col justify-between hover:shadow-md transition-shadow"
            >
              <div>
                {/* Image & Badge Overlay */}
                <div className="relative h-48 w-full overflow-hidden bg-gray-100">
                  <img
                    src={prod.imageUrl}
                    alt={prod.name}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                  <div className="absolute top-3 right-3 bg-black/70 backdrop-blur-xs text-white text-xs font-bold px-3 py-1 rounded-full">
                    {prod.stockText}
                  </div>
                </div>

                {/* Info */}
                <div className="p-4 space-y-2">
                  <div className="flex items-baseline justify-between gap-2">
                    <h4 className="text-base font-bold text-[#181d16] truncate">
                      {prod.name}
                    </h4>
                    <span className="text-sm font-black text-[#176a22] shrink-0">
                      {prod.price.toLocaleString('vi-VN')}đ/{prod.unit}
                    </span>
                  </div>

                  <p className="text-xs text-[#5e6958] line-clamp-2 leading-relaxed">
                    {prod.description}
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="p-4 pt-0 grid grid-cols-2 gap-3">
                <button
                  onClick={() => onSelectProductToEdit(prod)}
                  className="py-2 px-4 border border-[#bfcaba] text-[#181d16] rounded-xl text-xs font-bold hover:bg-[#f1f5ea] transition-colors"
                >
                  Sửa
                </button>
                <button
                  onClick={() => onToggleProductStatus(prod.id)}
                  className="py-2 px-4 bg-[#ebefe4] hover:bg-[#dfe6d4] text-[#3e483a] rounded-xl text-xs font-bold transition-colors"
                >
                  {prod.status === 'active' ? 'Ẩn tin' : 'Hiện tin'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
