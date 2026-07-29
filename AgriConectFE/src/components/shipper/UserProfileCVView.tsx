import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Mail, 
  Phone, 
  MapPin, 
  Award, 
  ShieldCheck, 
  Star, 
  Truck, 
  CheckCircle2, 
  Download,
  Share2,
  Building2,
  Globe2,
  Users,
  Sparkles,
  Thermometer,
  ShieldAlert,
  Gauge,
  Clock,
  AlertTriangle,
  Route,
  TrendingUp,
  PackageCheck,
  UserCheck,
  X,
  Copy,
  Check,
  QrCode,
  FileText,
  ExternalLink,
  ShoppingBag,
  HeartHandshake
} from 'lucide-react';

interface UserProfileCVViewProps {
  onBack: () => void;
}

export const UserProfileCVView: React.FC<UserProfileCVViewProps> = ({ onBack }) => {
  // Modal states
  const [isDownloadModalOpen, setIsDownloadModalOpen] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const [selectedDoc, setSelectedDoc] = useState('profile-full');

  const profileUrl = 'https://agrishipper.vn/company/grabfood-vietnam';

  const handleCopyLink = () => {
    navigator.clipboard.writeText(profileUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleStartDownload = () => {
    setDownloading(true);
    setDownloadSuccess(false);
    setTimeout(() => {
      setDownloading(false);
      setDownloadSuccess(true);
      setTimeout(() => {
        setDownloadSuccess(false);
        setIsDownloadModalOpen(false);
      }, 2000);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#f4f7f0] text-[#181d16] font-sans pb-16">
      {/* Standalone Header - Clean Navigation */}
      <header className="bg-white border-b border-[#bfcaba] sticky top-0 z-40 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3 sm:gap-4">
            <button
              onClick={onBack}
              className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-[#e8f0e3] hover:bg-[#176a22] hover:text-white text-[#176a22] font-bold text-xs sm:text-sm transition-all shadow-2xs group cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
              <span>Quay lại Bảng Điều Khiển</span>
            </button>
            <div className="h-6 w-px bg-[#bfcaba] hidden sm:block" />
            <div className="hidden md:flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#00b14f] animate-pulse" />
              <span className="font-bold text-sm text-[#181d16]">
                Trang Doanh Nghiệp GrabFood - Hồ Sơ Ban Điều Phối Nguyễn Minh Anh
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <button 
              onClick={() => setIsDownloadModalOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#bfcaba] hover:bg-gray-100 text-[#181d16] text-xs font-semibold transition-colors cursor-pointer"
            >
              <Download className="w-3.5 h-3.5 text-[#176a22]" />
              <span className="hidden sm:inline">Tải Hồ Sơ Doanh Nghiệp (PDF)</span>
            </button>
            <button 
              onClick={() => setIsShareModalOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#00b14f] hover:bg-[#00893d] text-white text-xs font-semibold transition-colors shadow-2xs cursor-pointer"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Chia sẻ</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-6 space-y-6">
        
        {/* Clean Hero Header - Split strictly into Green Company Banner & White Manager Details */}
        <div className="bg-white rounded-2xl border border-[#bfcaba] shadow-sm overflow-hidden">
          
          {/* Top Green Banner: GrabFood Brand Identity */}
          <div className="bg-gradient-to-r from-[#00b14f] via-[#00893d] to-[#005a28] p-6 text-white space-y-3">
            <div className="flex justify-between items-center flex-wrap gap-2">
              <div className="flex items-center gap-2 bg-black/20 backdrop-blur-md px-3 py-1 rounded-full border border-white/20">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-white text-xs font-bold tracking-wide">
                  Tài Khoản Quản Lý GrabFood Đang Đăng Nhập Hệ Thống AgriShipper
                </span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md text-white text-xs font-mono font-bold px-3 py-1 rounded-lg border border-white/20">
                <ShieldCheck className="w-4 h-4 text-emerald-300" />
                GrabFood Vietnam Co., Ltd • MST: 0313889921
              </div>
            </div>

            <div className="pt-1">
              <p className="text-emerald-100 text-xs sm:text-sm font-semibold flex items-center gap-1.5">
                <Globe2 className="w-4 h-4 text-emerald-300" />
                Thương Hiệu Đồ Ăn & Thực Phẩm Tươi Sống Hàng Đầu Việt Nam
              </p>
              <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight mt-0.5">
                GrabFood - Trung Tâm Quản Lý Vận Tải & Điều Phối Tuyến Xe Tải Lạnh
              </h1>
            </div>
          </div>

          {/* White Card Body: Manager Profile & Quick Contacts */}
          <div className="p-6 bg-white space-y-5">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              
              {/* Manager Details inside White Canvas */}
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
                <div className="relative shrink-0">
                  <img
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuC5FGJTm53QiP48WIfv4cxwNJmQPgD6K1JLkIOSwyHJRB31pbVtk3s_DT6QAq5l1lEe-ViZW2rx_74AEIqmKMdUTf53t1IKch5eqI94DQ2n0A_a3dAIFjMGw7Py-uDttVLLbsfIuJOQPzo3CW9aL2ZTH2seKMB8lhK0kj9X_aZ6oTvVKg50UIiOV0Y0KoHjqoR1XDd8ILWPtVTrtTR9OzsQNZ9mjSkB7P6AFymRaynYIvmmHE3LJ3KR"
                    alt="Nguyễn Minh Anh"
                    className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl object-cover ring-2 ring-[#00b14f] shadow-sm bg-gray-50"
                  />
                  <div className="absolute -bottom-1 -right-1 bg-[#00b14f] text-white p-1 rounded-lg shadow-2xs" title="Tài khoản Quản lý Đã Xác Minh">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                </div>

                <div className="space-y-1.5 text-center sm:text-left">
                  <div className="flex items-center justify-center sm:justify-start gap-2 flex-wrap">
                    <h2 className="text-xl sm:text-2xl font-black text-[#181d16]">Nguyễn Minh Anh</h2>
                    <span className="px-3 py-0.5 rounded-full text-xs font-bold bg-[#e6f4ea] text-[#00893d] border border-[#a5d6a7]">
                      Giám Đốc Điều Phối Vận Hành GrabFood
                    </span>
                  </div>
                  <p className="text-sm font-bold text-[#176a22] flex items-center justify-center sm:justify-start gap-1.5">
                    <Users className="w-4 h-4 text-[#00b14f]" />
                    Quản lý Hệ thống Xe Tải Đông Lạnh & Lộ Trình Vận Chuyển Liên Tỉnh
                  </p>
                  <p className="text-xs text-[#40493d] flex items-center justify-center sm:justify-start gap-1.5">
                    <Building2 className="w-3.5 h-3.5 text-[#176a22]" />
                    Sử dụng phần mềm AgriShipper làm cổng công cụ giám sát & phân bổ tuyến đường
                  </p>
                </div>
              </div>

            </div>

            {/* Quick Contacts Info Bar */}
            <div className="pt-4 border-t border-[#bfcaba] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs text-[#40493d]">
              <div className="flex items-center gap-2 p-2.5 rounded-xl bg-[#f7fbf0] border border-[#d8e2d4]">
                <Globe2 className="w-4 h-4 text-[#00b14f] shrink-0" />
                <span className="truncate font-semibold">www.grab.com/vn/food</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 rounded-xl bg-[#f7fbf0] border border-[#d8e2d4]">
                <Phone className="w-4 h-4 text-[#00b14f] shrink-0" />
                <span className="font-semibold">Hotline: 1900 633 688</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 rounded-xl bg-[#f7fbf0] border border-[#d8e2d4]">
                <MapPin className="w-4 h-4 text-[#00b14f] shrink-0" />
                <span className="truncate">Mapletree Business Centre, Q.7, TP.HCM</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 rounded-xl bg-[#f7fbf0] border border-[#d8e2d4]">
                <Mail className="w-4 h-4 text-[#00b14f] shrink-0" />
                <span className="truncate">minhanh.nguyen@grab.com</span>
              </div>
            </div>
          </div>
        </div>

        {/* Real Metrics - Mapped directly from Dashboard */}
        <div className="space-y-2">
          <div className="flex items-center justify-between px-1">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#40493d] flex items-center gap-1.5">
              <Gauge className="w-4 h-4 text-[#176a22]" />
              Thống kê lộ trình vận tải GrabFood hôm nay (Đồng bộ từ Bảng Điều Khiển)
            </h3>
            <span className="text-[11px] font-semibold text-[#176a22] bg-[#e8f0e3] px-2.5 py-0.5 rounded-full border border-[#c4dbc1]">
              Hệ thống GrabFood
            </span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white p-5 rounded-2xl border border-[#bfcaba] shadow-2xs space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#40493d]">Doanh Thu Luân Chuyển</span>
                <div className="w-8 h-8 rounded-xl bg-emerald-100 text-[#176a22] flex items-center justify-center">
                  <TrendingUp className="w-4 h-4" />
                </div>
              </div>
              <p className="text-2xl font-black text-[#181d16]">845.2M ₫</p>
              <p className="text-[11px] text-[#176a22] font-semibold flex items-center gap-1">
                <span className="text-emerald-600 font-bold">+12.5%</span> tăng trưởng vận tải
              </p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-[#bfcaba] shadow-2xs space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#40493d]">Hiệu Suất Tuyến Lạnh</span>
                <div className="w-8 h-8 rounded-xl bg-emerald-100 text-[#176a22] flex items-center justify-center">
                  <Gauge className="w-4 h-4" />
                </div>
              </div>
              <p className="text-2xl font-black text-[#181d16]">94.2%</p>
              <p className="text-[11px] text-[#176a22] font-semibold flex items-center gap-1">
                <span className="text-emerald-600 font-bold">Đạt KPI</span> bảo quản nhiệt độ
              </p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-[#bfcaba] shadow-2xs space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#40493d]">Chuyến Xe Hoàn Thành</span>
                <div className="w-8 h-8 rounded-xl bg-emerald-100 text-[#176a22] flex items-center justify-center">
                  <PackageCheck className="w-4 h-4" />
                </div>
              </div>
              <p className="text-2xl font-black text-[#181d16]">128 Chuyến</p>
              <p className="text-[11px] text-[#176a22] font-semibold">Giao hàng liên tỉnh hoàn tất</p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-[#bfcaba] shadow-2xs space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#40493d]">Chuyến Đang Lăn Bánh</span>
                <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center">
                  <Clock className="w-4 h-4" />
                </div>
              </div>
              <p className="text-2xl font-black text-[#181d16]">4 Tuyến</p>
              <p className="text-[11px] text-amber-700 font-semibold flex items-center gap-1">
                <AlertTriangle className="w-3 h-3 text-amber-600" /> Cần giám sát: 4 tuyến
              </p>
            </div>
          </div>
        </div>

        {/* Main Content Layout - Grid 3 Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Left / Center Columns (2 Cols) */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Giới Thiệu Thương Hiệu Doanh Nghiệp GrabFood */}
            <div className="bg-white p-6 rounded-2xl border border-[#bfcaba] shadow-2xs space-y-4">
              <div className="flex items-center justify-between border-b border-[#bfcaba] pb-3">
                <h2 className="text-lg font-black text-[#181d16] flex items-center gap-2.5">
                  <Building2 className="w-5 h-5 text-[#00b14f]" />
                  Giới Thiệu Thương Hiệu GrabFood & Hệ Thống Vận Tải Nông Sản
                </h2>
                <span className="px-3 py-1 bg-[#00b14f]/10 text-[#00893d] border border-[#00b14f]/30 rounded-lg text-xs font-bold">
                  GrabFood Ecosystem
                </span>
              </div>

              <p className="text-sm text-[#40493d] leading-relaxed">
                <strong>GrabFood</strong> là thương hiệu dịch vụ giao nhận thực phẩm & nông sản hàng đầu thuộc tập đoàn Grab. Không chỉ dừng lại ở giao đồ ăn ăn liền trong thành phố, GrabFood mở rộng hệ thống chuỗi cung ứng nông sản tươi sống B2B kết nối từ các vùng trồng chính (Đà Lạt, Tiền Giang, Long An, Đắc Lắc) tới các kho tổng phân phối và hệ thống siêu thị trên cả nước.
              </p>

              <p className="text-sm text-[#40493d] leading-relaxed">
                Để quản lý hiệu quả các tuyến xe tải vận chuyển nông sản liên tỉnh có hành trình dài từ <strong>1 đến 2 ngày</strong>, ban điều hành GrabFood đăng nhập vào cổng thông tin phần mềm <strong>AgriShipper</strong> để trực tiếp theo dõi vị trí xe tải lạnh, giám sát cảm biến nhiệt độ thùng xe và điều phối lịch trình xe chạy đồng bộ.
              </p>

              {/* Ecosystem Features Grid */}
              <div className="pt-2 grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-4 rounded-xl bg-[#f7fbf0] border border-[#d8e2d4] space-y-1.5">
                  <div className="w-8 h-8 rounded-lg bg-[#00b14f] text-white flex items-center justify-center font-bold text-xs">
                    <Truck className="w-4 h-4" />
                  </div>
                  <h3 className="font-bold text-xs text-[#181d16]">Vận Chuyển Liên Tỉnh 1 - 2 Ngày</h3>
                  <p className="text-[11px] text-[#40493d]">Đảm bảo tiến độ thu gom nông sản tươi từ vùng trồng và luân chuyển về kho phân phối.</p>
                </div>

                <div className="p-4 rounded-xl bg-[#f7fbf0] border border-[#d8e2d4] space-y-1.5">
                  <div className="w-8 h-8 rounded-lg bg-[#00b14f] text-white flex items-center justify-center font-bold text-xs">
                    <Thermometer className="w-4 h-4" />
                  </div>
                  <h3 className="font-bold text-xs text-[#181d16]">Đội Xe Tải Lạnh Đông Lạnh</h3>
                  <p className="text-[11px] text-[#40493d]">Trang bị hệ thống làm lạnh công nghiệp cài đặt nhiệt độ chuẩn từ -18°C đến +10°C.</p>
                </div>

                <div className="p-4 rounded-xl bg-[#f7fbf0] border border-[#d8e2d4] space-y-1.5">
                  <div className="w-8 h-8 rounded-lg bg-[#00b14f] text-white flex items-center justify-center font-bold text-xs">
                    <Route className="w-4 h-4" />
                  </div>
                  <h3 className="font-bold text-xs text-[#181d16]">Tối Ưu Lộ Trình Vận Tải</h3>
                  <p className="text-[11px] text-[#40493d]">Công nghệ gợi ý tuyến đường tránh ùn tắc, cân bằng tải trọng và tối ưu chi phí nhiên liệu.</p>
                </div>
              </div>
            </div>

            {/* Các Chứng Chỉ Vệ Sinh An Toàn & Cam Kết Quốc Tế (Có Logo Badges) */}
            <div className="bg-white p-6 rounded-2xl border border-[#bfcaba] shadow-2xs space-y-5">
              <div className="border-b border-[#bfcaba] pb-3 flex items-center justify-between">
                <h2 className="text-lg font-black text-[#181d16] flex items-center gap-2.5">
                  <Award className="w-5 h-5 text-[#00b14f]" />
                  Chứng Nhận Vệ Sinh An Toàn Thực Phẩm & Cam Kết Quốc Tế
                </h2>
                <span className="text-xs font-bold text-[#00893d] bg-[#e6f4ea] px-3 py-1 rounded-full border border-[#a5d6a7]">
                  Đã Kiểm Định 2026
                </span>
              </div>

              {/* Certificate Cards Grid with Logo Badges */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* Cert 1: Cục ATTP - Bộ Y Tế */}
                <div className="p-4 rounded-2xl bg-[#fcfdfe] border border-[#bfcaba] hover:border-[#00b14f] transition-all shadow-2xs space-y-3 relative overflow-hidden group">
                  <div className="flex items-center gap-3">
                    {/* Badge Logo */}
                    <div className="w-12 h-12 rounded-xl bg-red-600 text-white flex flex-col items-center justify-center shrink-0 shadow-sm font-black text-[10px] leading-tight text-center border-2 border-red-700">
                      <span className="text-[9px] tracking-tighter uppercase font-extrabold text-amber-200">BỘ Y TẾ</span>
                      <span className="text-[8px] font-bold">ATTP</span>
                    </div>
                    <div>
                      <h3 className="font-bold text-sm text-[#181d16]">Giấy Chứng Nhận Cục An Toàn Thực Phẩm</h3>
                      <p className="text-[11px] text-red-700 font-bold">Mã Giấy Phép: 8829/2024/ATTP-CNĐK</p>
                    </div>
                  </div>
                  <p className="text-xs text-[#40493d] leading-relaxed">
                    Chứng nhận đủ điều kiện an toàn vệ sinh thực phẩm áp dụng cho quy trình bốc dỡ và vận tải thực phẩm tươi sống do Bộ Y Tế cấp.
                  </p>
                  <div className="flex items-center gap-1.5 text-[11px] font-bold text-[#00b14f] pt-1 border-t border-gray-100">
                    <CheckCircle2 className="w-3.5 h-3.5" /> 100% phương tiện & đội xe tuân thủ nghiêm ngặt
                  </div>
                </div>

                {/* Cert 2: ISO 22000 */}
                <div className="p-4 rounded-2xl bg-[#fcfdfe] border border-[#bfcaba] hover:border-[#00b14f] transition-all shadow-2xs space-y-3 relative overflow-hidden group">
                  <div className="flex items-center gap-3">
                    {/* Badge Logo */}
                    <div className="w-12 h-12 rounded-xl bg-[#005a28] text-white flex flex-col items-center justify-center shrink-0 shadow-sm font-black text-[10px] leading-tight text-center border-2 border-emerald-400">
                      <span className="text-[11px] font-black text-amber-300">ISO</span>
                      <span className="text-[8px] font-bold">22000</span>
                    </div>
                    <div>
                      <h3 className="font-bold text-sm text-[#181d16]">Tiêu Chuẩn ISO 22000:2018</h3>
                      <p className="text-[11px] text-[#00893d] font-bold">Bureau Veritas Certification</p>
                    </div>
                  </div>
                  <p className="text-xs text-[#40493d] leading-relaxed">
                    Hệ thống quản lý an toàn thực phẩm toàn cầu áp dụng xuyên suốt từ trang trại đầu nguồn đến trung tâm phân phối GrabFood.
                  </p>
                  <div className="flex items-center gap-1.5 text-[11px] font-bold text-[#00b14f] pt-1 border-t border-gray-100">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Đạt xếp hạng kiểm toán A+ định kỳ hàng năm
                  </div>
                </div>

                {/* Cert 3: HACCP Cold Chain */}
                <div className="p-4 rounded-2xl bg-[#fcfdfe] border border-[#bfcaba] hover:border-[#00b14f] transition-all shadow-2xs space-y-3 relative overflow-hidden group">
                  <div className="flex items-center gap-3">
                    {/* Badge Logo */}
                    <div className="w-12 h-12 rounded-xl bg-blue-700 text-white flex flex-col items-center justify-center shrink-0 shadow-sm font-black text-[9px] leading-tight text-center border-2 border-blue-400">
                      <span className="text-[11px] font-black text-cyan-200">HACCP</span>
                      <span className="text-[7px] font-bold">COLD CHAIN</span>
                    </div>
                    <div>
                      <h3 className="font-bold text-sm text-[#181d16]">HACCP Chuỗi Lạnh Xe Tải</h3>
                      <p className="text-[11px] text-blue-700 font-bold">Kiểm Soát Nhiệt Độ Tới Hạn</p>
                    </div>
                  </div>
                  <p className="text-xs text-[#40493d] leading-relaxed">
                    Đảm bảo duy trì nhiệt độ tiêu chuẩn từ 2°C – 8°C đối với rau củ quả tươi và dưới -18°C đối với thủy hải sản đông lạnh.
                  </p>
                  <div className="flex items-center gap-1.5 text-[11px] font-bold text-blue-700 pt-1 border-t border-gray-100">
                    <Thermometer className="w-3.5 h-3.5" /> Tích hợp cảm biến nhiệt IoT cảnh báo tức thì
                  </div>
                </div>

                {/* Cert 4: VietGAP / GlobalG.A.P */}
                <div className="p-4 rounded-2xl bg-[#fcfdfe] border border-[#bfcaba] hover:border-[#00b14f] transition-all shadow-2xs space-y-3 relative overflow-hidden group">
                  <div className="flex items-center gap-3">
                    {/* Badge Logo */}
                    <div className="w-12 h-12 rounded-xl bg-emerald-700 text-white flex flex-col items-center justify-center shrink-0 shadow-sm font-black text-[9px] leading-tight text-center border-2 border-emerald-300">
                      <span className="text-[9px] font-black text-emerald-200">VietGAP</span>
                      <span className="text-[7px] font-bold">CoC Certified</span>
                    </div>
                    <div>
                      <h3 className="font-bold text-sm text-[#181d16]">VietGAP & GlobalG.A.P CoC</h3>
                      <p className="text-[11px] text-emerald-700 font-bold">Truy Xuất Nguồn Gốc Sạch</p>
                    </div>
                  </div>
                  <p className="text-xs text-[#40493d] leading-relaxed">
                    Đảm bảo 100% lô hàng nông sản vận chuyển qua GrabFood có mã QR truy xuất chính xác nông trại đạt chuẩn thực hành tốt.
                  </p>
                  <div className="flex items-center gap-1.5 text-[11px] font-bold text-emerald-700 pt-1 border-t border-gray-100">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Quét mã QR xác minh vùng trồng nhanh chóng
                  </div>
                </div>

              </div>
            </div>

            {/* Quản Lý Điều Phối Nguyễn Minh Anh */}
            <div className="bg-white p-6 rounded-2xl border border-[#bfcaba] shadow-2xs space-y-4">
              <h2 className="text-lg font-black text-[#181d16] flex items-center gap-2.5 border-b border-[#bfcaba] pb-3">
                <Users className="w-5 h-5 text-[#00b14f]" />
                Ban Quản Lý & Lực Lượng Điều Phối GrabFood
              </h2>

              <div className="p-4 rounded-2xl bg-[#f7fbf0] border border-[#d8e2d4] flex flex-col sm:flex-row items-center gap-4">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuC5FGJTm53QiP48WIfv4cxwNJmQPgD6K1JLkIOSwyHJRB31pbVtk3s_DT6QAq5l1lEe-ViZW2rx_74AEIqmKMdUTf53t1IKch5eqI94DQ2n0A_a3dAIFjMGw7Py-uDttVLLbsfIuJOQPzo3CW9aL2ZTH2seKMB8lhK0kj9X_aZ6oTvVKg50UIiOV0Y0KoHjqoR1XDd8ILWPtVTrtTR9OzsQNZ9mjSkB7P6AFymRaynYIvmmHE3LJ3KR"
                  alt="Nguyễn Minh Anh"
                  className="w-20 h-20 rounded-2xl object-cover shrink-0 ring-2 ring-[#00b14f]"
                />
                <div className="space-y-1 text-center sm:text-left">
                  <div className="flex items-center justify-center sm:justify-start gap-2">
                    <h3 className="font-black text-base text-[#181d16]">Nguyễn Minh Anh</h3>
                    <span className="text-[11px] bg-[#00b14f] text-white px-2.5 py-0.5 rounded-md font-bold">
                      Giám Đốc Vận Hành
                    </span>
                  </div>
                  <p className="text-xs text-[#40493d] leading-relaxed">
                    Trực tiếp theo dõi tiến độ lưu thông của đội xe tải lạnh trên bảng điều khiển AgriShipper, giám sát rủi ro biến động nhiệt độ và đảm bảo hoàn thành đúng thời gian 1-2 ngày cam kết.
                  </p>
                  <p className="text-xs text-[#00893d] font-bold">
                    "Cam kết chất lượng và sự minh bạch trong theo dõi lộ trình xe tải là tiêu chuẩn cốt lõi của ban điều hành GrabFood."
                  </p>
                </div>
              </div>
            </div>

          </div>

          {/* Right Sidebar Column */}
          <div className="space-y-6 flex flex-col">
            
            {/* Cam Kết Bảo Hàng & Đền Bù */}
            <div className="bg-gradient-to-br from-[#00b14f] to-[#005a28] text-white p-6 rounded-2xl shadow-md space-y-4">
              <div className="flex items-center gap-2">
                <ShieldAlert className="w-6 h-6 text-emerald-300" />
                <h3 className="font-bold text-base">Cam Kết Đền Bù 100%</h3>
              </div>
              <p className="text-xs text-emerald-100 leading-relaxed">
                GrabFood cam kết đền bù 100% giá trị lô hàng nông sản nếu hàng hóa bị biến chất, hư hỏng do sự cố nhiệt độ hoặc giao trễ quá thời hạn hành trình 1-2 ngày.
              </p>
              <div className="pt-2 border-t border-white/20 space-y-2 text-xs">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-300 shrink-0" />
                  <span>Bảo hiểm vận tải hàng hóa tự động</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-300 shrink-0" />
                  <span>Giải quyết hồ sơ đền bù trong 24 giờ</span>
                </div>
              </div>
            </div>

            {/* Vùng Cung Cấp Nông Sản & Nguồn Nhập Đối Tác */}
            <div className="bg-white p-6 rounded-2xl border border-[#bfcaba] shadow-2xs space-y-4">
              <h2 className="text-base font-bold text-[#181d16] flex items-center gap-2 border-b border-[#bfcaba] pb-3">
                <Building2 className="w-5 h-5 text-[#00b14f]" />
                Nguồn Cung Nông Sản & Đối Tác Vùng Trồng
              </h2>

              <div className="space-y-2.5">
                {[
                  { name: 'HTX Rau Sạch Đà Lạt (Lâm Đồng)', role: 'Rau củ quả xứ lạnh chuẩn VietGAP' },
                  { name: 'Nông Trại Hữu Cơ Củ Chi (TP.HCM)', role: 'Cung cấp rau mầm & nấm tươi' },
                  { name: 'Chợ Đầu Mối Bình Điền & Hóc Môn', role: 'Điểm tiếp nhận & phân phối lớn' },
                  { name: 'Vùng Trồng Cây Ăn Quả Long An & Tiền Giang', role: 'Trái cây nhiệt đới xuất khẩu' },
                  { name: 'Chuỗi Siêu Thị WinMart & Co.opmart', role: 'Hệ thống tiếp nhận B2B' }
                ].map((item, idx) => (
                  <div key={idx} className="p-3 rounded-xl bg-[#f7fbf0] border border-[#d8e2d4] flex items-center justify-between text-xs">
                    <div>
                      <p className="font-bold text-[#181d16]">{item.name}</p>
                      <p className="text-[11px] text-[#00893d] font-semibold">{item.role}</p>
                    </div>
                    <CheckCircle2 className="w-4 h-4 text-[#00b14f] shrink-0" />
                  </div>
                ))}
              </div>
            </div>

            {/* Đánh Giá Của Khách Hàng Về Chất Lượng Đơn Hàng GrabFood (Public Customer Reviews) */}
            <div className="bg-white p-6 rounded-2xl border border-[#bfcaba] shadow-2xs space-y-4">
              <div className="border-b border-[#bfcaba] pb-3 space-y-1">
                <div className="flex items-center justify-between">
                  <h2 className="text-base font-bold text-[#181d16] flex items-center gap-2">
                    <Star className="w-5 h-5 text-amber-500 fill-amber-500" />
                    Đánh Giá Khách Hàng Về Đơn Hàng
                  </h2>
                  <span className="text-xs font-black text-[#00893d] bg-[#e6f4ea] px-2.5 py-0.5 rounded-full border border-[#a5d6a7]">
                    4.9 ★ (1,480+)
                  </span>
                </div>
                <p className="text-[11px] text-[#63705d] leading-snug">
                  *Đánh giá công khai từ đối tác mua nông sản GrabFood.
                </p>
              </div>

              <div className="space-y-3 pt-1">
                {/* Review Item 1 */}
                <div className="p-3 bg-[#f7fbf0] rounded-xl border border-[#d8e2d4] space-y-1 hover:border-[#00b14f] transition-all">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <ShoppingBag className="w-3.5 h-3.5 text-[#00b14f]" />
                      <span className="font-bold text-xs text-[#181d16]">Co.opmart Lý Thường Kiệt</span>
                    </div>
                    <div className="flex text-amber-500 text-xs">
                      {'★'.repeat(5)}
                    </div>
                  </div>
                  <p className="text-xs text-[#40493d] italic leading-snug">
                    "2.5 tấn rau củ quả Đà Lạt giao bởi GrabFood tươi ngon, xe lạnh giữ chuẩn 4°C không héo."
                  </p>
                  <div className="flex items-center justify-between text-[10px] text-[#00893d] font-semibold pt-0.5">
                    <span>Mã đơn: #GF-88329 • Đã xác minh</span>
                    <span className="text-[#63705d]">2 giờ trước</span>
                  </div>
                </div>

                {/* Review Item 2 */}
                <div className="p-3 bg-[#f7fbf0] rounded-xl border border-[#d8e2d4] space-y-1 hover:border-[#00b14f] transition-all">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <ShoppingBag className="w-3.5 h-3.5 text-[#00b14f]" />
                      <span className="font-bold text-xs text-[#181d16]">Chuỗi Nông Sản GreenFarm</span>
                    </div>
                    <div className="flex text-amber-500 text-xs">
                      {'★'.repeat(5)}
                    </div>
                  </div>
                  <p className="text-xs text-[#40493d] italic leading-snug">
                    "Trái cây Tiền Giang & Long An nguyên đai nguyên kiện, hoa quả căng mọng chuẩn B2B."
                  </p>
                  <div className="flex items-center justify-between text-[10px] text-[#00893d] font-semibold pt-0.5">
                    <span>Mã đơn: #GF-99120 • Đã xác minh</span>
                    <span className="text-[#63705d]">Hôm qua</span>
                  </div>
                </div>

                {/* Review Item 3 */}
                <div className="p-3 bg-[#f7fbf0] rounded-xl border border-[#d8e2d4] space-y-1 hover:border-[#00b14f] transition-all">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <ShoppingBag className="w-3.5 h-3.5 text-[#00b14f]" />
                      <span className="font-bold text-xs text-[#181d16]">Nhà Hàng Hải Sản Biển Đông</span>
                    </div>
                    <div className="flex text-amber-500 text-xs">
                      {'★'.repeat(5)}
                    </div>
                  </div>
                  <p className="text-xs text-[#40493d] italic leading-snug">
                    "Hải sản tươi sống đóng xe lạnh GrabFood giao đúng hẹn 5h sáng, nhiệt độ bảo quản chuẩn tươi."
                  </p>
                  <div className="flex items-center justify-between text-[10px] text-[#00893d] font-semibold pt-0.5">
                    <span>Mã đơn: #GF-77102 • Đã xác minh</span>
                    <span className="text-[#63705d]">2 ngày trước</span>
                  </div>
                </div>
              </div>

              {/* Bottom Customer Satisfaction Summary Badge */}
              <div className="p-2.5 rounded-xl bg-[#e8f0e3] border border-[#a5d6a7] flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <HeartHandshake className="w-4 h-4 text-[#00893d]" />
                  <span className="font-bold text-[#181d16]">Tỷ lệ hài lòng chất lượng</span>
                </div>
                <span className="font-black text-[#00893d] text-sm">99.4%</span>
              </div>
            </div>

          </div>

        </div>

      </div>

      {/* POPUP MODAL 1: Tải Hồ Sơ Doanh Nghiệp (PDF) */}
      {isDownloadModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-[#bfcaba] space-y-5 relative">
            <button 
              onClick={() => setIsDownloadModalOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 p-1 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#00b14f]/10 text-[#00893d] flex items-center justify-center shrink-0">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-black text-lg text-[#181d16]">Tải Hồ Sơ Doanh Nghiệp GrabFood</h3>
                <p className="text-xs text-[#40493d]">Xuất tài liệu giới thiệu năng lực & chứng nhận vệ sinh an toàn</p>
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-xs font-bold text-[#181d16] block">Chọn bộ tài liệu cần tải:</label>
              
              <div 
                onClick={() => setSelectedDoc('profile-full')}
                className={`p-3 rounded-xl border cursor-pointer transition-all flex items-center justify-between ${
                  selectedDoc === 'profile-full' ? 'border-[#00b14f] bg-[#f7fbf0] ring-1 ring-[#00b14f]' : 'border-[#d8e2d4] hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <FileText className="w-4 h-4 text-[#00b14f]" />
                  <div>
                    <p className="text-xs font-bold text-[#181d16]">Hồ Sơ Năng Lực Vận Tải GrabFood 2026 (Đầy đủ)</p>
                    <p className="text-[11px] text-[#63705d]">Bao gồm giấy phép, quy trình xe tải lạnh & chứng nhận ISO</p>
                  </div>
                </div>
                <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                  selectedDoc === 'profile-full' ? 'border-[#00b14f] bg-[#00b14f] text-white' : 'border-gray-300'
                }`}>
                  {selectedDoc === 'profile-full' && <Check className="w-3 h-3" />}
                </div>
              </div>

              <div 
                onClick={() => setSelectedDoc('attp-certs')}
                className={`p-3 rounded-xl border cursor-pointer transition-all flex items-center justify-between ${
                  selectedDoc === 'attp-certs' ? 'border-[#00b14f] bg-[#f7fbf0] ring-1 ring-[#00b14f]' : 'border-[#d8e2d4] hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Award className="w-4 h-4 text-red-600" />
                  <div>
                    <p className="text-xs font-bold text-[#181d16]">Bộ Chứng Nhận Cục ATTP & Tiêu Chuẩn ISO 22000</p>
                    <p className="text-[11px] text-[#63705d]">Bản quét PDF công chứng của Bộ Y Tế & Bureau Veritas</p>
                  </div>
                </div>
                <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                  selectedDoc === 'attp-certs' ? 'border-[#00b14f] bg-[#00b14f] text-white' : 'border-gray-300'
                }`}>
                  {selectedDoc === 'attp-certs' && <Check className="w-3 h-3" />}
                </div>
              </div>

              <div 
                onClick={() => setSelectedDoc('fleet-audit')}
                className={`p-3 rounded-xl border cursor-pointer transition-all flex items-center justify-between ${
                  selectedDoc === 'fleet-audit' ? 'border-[#00b14f] bg-[#f7fbf0] ring-1 ring-[#00b14f]' : 'border-[#d8e2d4] hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Truck className="w-4 h-4 text-blue-600" />
                  <div>
                    <p className="text-xs font-bold text-[#181d16]">Báo Cáo Kiểm Định Đội Xe Tải Lạnh & HACCP</p>
                    <p className="text-[11px] text-[#63705d]">Thông số dải nhiệt độ đông lạnh -18°C đến +10°C</p>
                  </div>
                </div>
                <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                  selectedDoc === 'fleet-audit' ? 'border-[#00b14f] bg-[#00b14f] text-white' : 'border-gray-300'
                }`}>
                  {selectedDoc === 'fleet-audit' && <Check className="w-3 h-3" />}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-2 flex items-center gap-3">
              <button
                onClick={() => setIsDownloadModalOpen(false)}
                className="flex-1 py-2.5 rounded-xl border border-[#bfcaba] text-[#181d16] font-bold text-xs hover:bg-gray-50 transition-colors cursor-pointer"
              >
                Hủy bỏ
              </button>
              <button
                onClick={handleStartDownload}
                disabled={downloading || downloadSuccess}
                className="flex-1 py-2.5 rounded-xl bg-[#00b14f] hover:bg-[#00893d] text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-75"
              >
                {downloading ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Đang tạo bản PDF...</span>
                  </>
                ) : downloadSuccess ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-emerald-200" />
                    <span>Đã Tải Thành Công!</span>
                  </>
                ) : (
                  <>
                    <Download className="w-4 h-4" />
                    <span>Tải Về Ngay (PDF)</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* POPUP MODAL 2: Chia Sẻ Hồ Sơ Doanh Nghiệp */}
      {isShareModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-[#bfcaba] space-y-5 relative">
            <button 
              onClick={() => setIsShareModalOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 p-1 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#00b14f]/10 text-[#00893d] flex items-center justify-center shrink-0">
                <Share2 className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-black text-lg text-[#181d16]">Chia Sẻ Hồ Sơ GrabFood</h3>
                <p className="text-xs text-[#40493d]">Gửi liên kết giới thiệu doanh nghiệp cho Khách hàng & Đối tác</p>
              </div>
            </div>

            {/* QR Code and Direct URL Section */}
            <div className="p-4 rounded-2xl bg-[#f7fbf0] border border-[#d8e2d4] space-y-3">
              <div className="flex items-center gap-4">
                <div className="w-20 h-20 bg-white p-2 rounded-xl border border-[#bfcaba] shadow-2xs flex flex-col items-center justify-center shrink-0">
                  <QrCode className="w-12 h-12 text-[#00b14f]" />
                  <span className="text-[9px] font-bold text-[#176a22] mt-0.5">Quét Mã QR</span>
                </div>
                <div className="space-y-1">
                  <p className="text-xs font-bold text-[#181d16]">Hồ Sơ Doanh Nghiệp GrabFood</p>
                  <p className="text-[11px] text-[#40493d]">Quét mã QR bằng điện thoại di động để xem nhanh thông tin giấy phép & chứng nhận trên website.</p>
                </div>
              </div>

              {/* Copy URL Input Box */}
              <div className="space-y-1">
                <label className="text-[11px] font-bold text-[#40493d]">Liên kết truy cập công khai:</label>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    readOnly
                    value={profileUrl}
                    className="flex-1 bg-white border border-[#bfcaba] rounded-xl px-3 py-2 text-xs font-mono text-[#181d16] outline-none"
                  />
                  <button
                    onClick={handleCopyLink}
                    className={`px-3.5 py-2 rounded-xl font-bold text-xs transition-all flex items-center gap-1.5 shrink-0 cursor-pointer ${
                      copied 
                        ? 'bg-emerald-700 text-white shadow-xs' 
                        : 'bg-[#00b14f] hover:bg-[#00893d] text-white shadow-xs'
                    }`}
                  >
                    {copied ? (
                      <>
                        <Check className="w-4 h-4" />
                        <span>Đã chép!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        <span>Sao chép</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Quick Social Share Options */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-[#181d16] block">Chia sẻ nhanh qua nền tảng:</span>
              <div className="grid grid-cols-4 gap-2 text-center text-[11px] font-semibold">
                <button 
                  onClick={() => {
                    handleCopyLink();
                    alert('Đã sao chép liên kết! Bạn có thể dán vào ứng dụng Zalo để gửi cho đối tác.');
                  }}
                  className="p-2.5 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 transition-colors space-y-1 cursor-pointer"
                >
                  <Globe2 className="w-4 h-4 mx-auto" />
                  <span>Zalo</span>
                </button>
                <button 
                  onClick={() => {
                    handleCopyLink();
                    alert('Đã sao chép liên kết! Bạn có thể dán vào ứng dụng Messenger/Facebook.');
                  }}
                  className="p-2.5 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200 transition-colors space-y-1 cursor-pointer"
                >
                  <Share2 className="w-4 h-4 mx-auto" />
                  <span>Facebook</span>
                </button>
                <button 
                  onClick={() => {
                    handleCopyLink();
                    alert('Đã sao chép liên kết! Sẵn sàng chia sẻ lên LinkedIn.');
                  }}
                  className="p-2.5 rounded-xl bg-sky-50 hover:bg-sky-100 text-sky-700 border border-sky-200 transition-colors space-y-1 cursor-pointer"
                >
                  <ExternalLink className="w-4 h-4 mx-auto" />
                  <span>LinkedIn</span>
                </button>
                <button 
                  onClick={() => {
                    window.location.href = `mailto:?subject=Hồ sơ doanh nghiệp GrabFood&body=${profileUrl}`;
                  }}
                  className="p-2.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 transition-colors space-y-1 cursor-pointer"
                >
                  <Mail className="w-4 h-4 mx-auto" />
                  <span>Email</span>
                </button>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={() => setIsShareModalOpen(false)}
                className="w-full py-2.5 rounded-xl border border-[#bfcaba] text-[#181d16] font-bold text-xs hover:bg-gray-50 transition-colors cursor-pointer"
              >
                Đóng Cửa Sổ
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
