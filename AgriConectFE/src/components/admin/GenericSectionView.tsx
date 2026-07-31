'use client';
// Đây là component thuộc giao diện Admin
import React from 'react';
import {
  Package,
  Warehouse,
  ShoppingCart,
  Truck,
  FileText,
  CreditCard,
  Landmark,
  BarChart3,
  Sparkles,
  Settings,
  CheckCircle2,
  AlertTriangle,
  Clock,
  ShieldCheck,
  TrendingUp,
  MapPin,
  Calendar,
  Layers,
  Award
} from 'lucide-react';
import { NavTab } from '@/types/admin.types';
// import { CONTRACTS_LIST } from '@/data/admin.mockData';

interface GenericSectionViewProps {
  tab: NavTab;
  onOpenAiModal?: (topic: string, context?: string) => void;
}

// Component: GenericSectionView - Giao diện quản lý/hiển thị cho Admin
export const GenericSectionView: React.FC<GenericSectionViewProps> = ({ tab, onOpenAiModal }) => {
  switch (tab) {
    case 'products':
    case 'products-categories':
    case 'products-items':
    case 'products-certificates':
      return (
        <div className="p-6 md:p-8 space-y-6 bg-[#f7fbf0] min-h-full">
          <div>
            <h2 className="text-2xl font-bold text-[#181d16] flex items-center space-x-2">
              <Package className="w-6 h-6 text-[#176a22]" />
              <span>Quản Lý Danh Mục & Chứng Nhận Nông Sản</span>
            </h2>
            <p className="text-sm text-[#40493d] mt-1">
              Chuẩn hóa tiêu chuẩn VietGAP, GlobalGAP, Organic và mã vùng trồng xuất khẩu
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white p-5 rounded-xl border border-[#e0e4d9] shadow-2xs space-y-2">
              <span className="text-xs font-bold text-[#176a22] bg-[#a3f69c]/30 px-2 py-0.5 rounded-full">VietGAP</span>
              <h3 className="font-bold text-[#181d16] text-sm">Trái cây xuất khẩu</h3>
              <p className="text-xs text-[#707a6c]">Sầu Riêng Ri6, Xoài Cát Hòa Lộc, Bưởi Da Xanh, Thanh Long</p>
            </div>
            <div className="bg-white p-5 rounded-xl border border-[#e0e4d9] shadow-2xs space-y-2">
              <span className="text-xs font-bold text-[#0284c7] bg-[#e0f2fe] px-2 py-0.5 rounded-full">GlobalGAP</span>
              <h3 className="font-bold text-[#181d16] text-sm">Hạt nông sản & Cà phê</h3>
              <p className="text-xs text-[#707a6c]">Cà phê Arabica Cầu Đất, Robusta Tây Nguyên, Lúa ST25</p>
            </div>
            <div className="bg-white p-5 rounded-xl border border-[#e0e4d9] shadow-2xs space-y-2">
              <span className="text-xs font-bold text-[#d97706] bg-[#ffedd5] px-2 py-0.5 rounded-full">Organic EU / USDA</span>
              <h3 className="font-bold text-[#181d16] text-sm">Rau củ ôn đới Đà Lạt</h3>
              <p className="text-xs text-[#707a6c]">Cà chua bích ngọc, Dâu tây organic, Ớt chuông Đà Lạt</p>
            </div>
          </div>
        </div>
      );

    case 'inventory':
      return (
        <div className="p-6 md:p-8 space-y-6 bg-[#f7fbf0] min-h-full">
          <div>
            <h2 className="text-2xl font-bold text-[#181d16] flex items-center space-x-2">
              <Warehouse className="w-6 h-6 text-[#176a22]" />
              <span>Quản Lý Kho Hàng & Lịch Mùa Vụ Nông Sản</span>
            </h2>
            <p className="text-sm text-[#40493d] mt-1">
              Giám sát tồn kho chuỗi lạnh và tiến độ thu hoạch nông sản toàn quốc
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white p-5 rounded-xl border border-[#e0e4d9] shadow-2xs space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-[#181d16] text-sm flex items-center space-x-1.5">
                  <MapPin className="w-4 h-4 text-[#176a22]" />
                  <span>Kho Chuỗi Lạnh Lâm Đồng (Đà Lạt)</span>
                </h3>
                <span className="text-xs bg-[#a3f69c]/40 text-[#003808] px-2 py-0.5 rounded-full font-bold">Dung lượng: 82%</span>
              </div>
              <p className="text-xs text-[#40493d]">
                Nhiệt độ bảo quản hiện tại: <strong>4°C</strong> | Sản lượng lưu trữ: 1,850 Tấn (Rau củ & Dâu tây)
              </p>
            </div>

            <div className="bg-white p-5 rounded-xl border border-[#e0e4d9] shadow-2xs space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-[#181d16] text-sm flex items-center space-x-1.5">
                  <MapPin className="w-4 h-4 text-[#0284c7]" />
                  <span>Kho Trung Chuyển Lúa Gạo Cần Thơ</span>
                </h3>
                <span className="text-xs bg-[#e0f2fe] text-[#0284c7] px-2 py-0.5 rounded-full font-bold">Dung lượng: 65%</span>
              </div>
              <p className="text-xs text-[#40493d]">
                Đang chuẩn bị thu hoạch vụ Hè Thu | Sản lượng lưu trữ: 12,000 Tấn (Lúa ST25 & Jasmine)
              </p>
            </div>
          </div>
        </div>
      );

    case 'orders':
    case 'contracts':
      return (
        <div className="p-6 md:p-8 space-y-6 bg-[#f7fbf0] min-h-full">
          <div>
            <h2 className="text-2xl font-bold text-[#181d16] flex items-center space-x-2">
              <FileText className="w-6 h-6 text-[#176a22]" />
              <span>Quản Lý Hợp Đồng & Thanh Toán Tạm Giữ (Escrow)</span>
            </h2>
            <p className="text-sm text-[#40493d] mt-1">
              Đảm bảo tính an toàn giao dịch giữa bên mua và bên bán nông sản sỉ
            </p>
          </div>

          <div className="bg-white rounded-xl border border-[#e0e4d9] shadow-2xs overflow-hidden">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-[#f1f5ea] border-b border-[#e0e4d9] text-[#707a6c] uppercase font-semibold">
                  <th className="py-3 px-4">Mã Hợp Đồng</th>
                  <th className="py-3 px-4">Bên Thu Mua</th>
                  <th className="py-3 px-4">Nhà Cung Cấp</th>
                  <th className="py-3 px-4">Nông Sản</th>
                  <th className="py-3 px-4">Tổng Giá Trị</th>
                  <th className="py-3 px-4">Trạng Thái Escrow</th>
                  <th className="py-3 px-4 text-right">Thao Tác</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td colSpan={7} className="py-8 px-4 text-center text-[#707a6c]">
                    Chưa có hợp đồng nào (Tính năng mở rộng)
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      );

    case 'shipping':
      return (
        <div className="p-6 md:p-8 space-y-6 bg-[#f7fbf0] min-h-full">
          <div>
            <h2 className="text-2xl font-bold text-[#181d16] flex items-center space-x-2">
              <Truck className="w-6 h-6 text-[#176a22]" />
              <span>Giám Sát Vận Chuyển Chuỗi Lạnh GPS</span>
            </h2>
            <p className="text-sm text-[#40493d] mt-1">
              Theo dõi cảm biến nhiệt độ & độ ẩm lô hàng nông sản trên đường vận chuyển
            </p>
          </div>

          <div className="bg-white p-5 rounded-xl border border-[#e0e4d9] shadow-2xs space-y-3">
            <div className="flex items-center justify-between border-b border-[#e0e4d9] pb-3">
              <div>
                <p className="font-bold text-[#181d16] text-sm">Chuyến xe #VC-9912 (Container 40ft Lạnh)</p>
                <p className="text-xs text-[#707a6c]">Tuyến: Krông Pắc (Đắk Lắk) ➔ Cửa khẩu Hữu Nghị (Lạng Sơn)</p>
              </div>
              <span className="text-xs font-bold bg-[#a3f69c]/40 text-[#003808] px-3 py-1 rounded-full">
                Đang di chuyển (Tốc độ: 62 km/h)
              </span>
            </div>
            <div className="grid grid-cols-3 gap-2 text-xs text-[#40493d]">
              <p>Nhiệt độ thùng lạnh: <strong className="text-[#176a22]">2.8°C (Chuẩn)</strong></p>
              <p>Độ ẩm: <strong>85%</strong></p>
              <p>Hàng hóa: <strong>Sầu riêng Ri6 (22 Tấn)</strong></p>
            </div>
          </div>
        </div>
      );

    case 'credit':
    case 'payments':
      return (
        <div className="p-6 md:p-8 space-y-6 bg-[#f7fbf0] min-h-full">
          <div>
            <h2 className="text-2xl font-bold text-[#181d16] flex items-center space-x-2">
              <Landmark className="w-6 h-6 text-[#176a22]" />
              <span>Tín Dụng & Hạn Mức Bảo Lãnh Ngân Hàng</span>
            </h2>
            <p className="text-sm text-[#40493d] mt-1">
              Hợp tác cùng Ngân hàng Nông nghiệp để cấp tín dụng ưu đãi thu mua mùa vụ
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white p-5 rounded-xl border border-[#e0e4d9] shadow-2xs space-y-2">
              <h3 className="font-bold text-[#181d16] text-sm">Tổng Hạn Mức Tín Dụng Đã Cấp</h3>
              <p className="text-2xl font-bold text-[#176a22]">185 tỷ VNĐ</p>
              <p className="text-xs text-[#707a6c]">Áp dụng cho 120 doanh nghiệp thu mua lớn</p>
            </div>
            <div className="bg-white p-5 rounded-xl border border-[#e0e4d9] shadow-2xs space-y-2">
              <h3 className="font-bold text-[#181d16] text-sm">Quỹ Giải Ngân Tạm Giữ Escrow</h3>
              <p className="text-2xl font-bold text-[#0284c7]">42.5 tỷ VNĐ</p>
              <p className="text-xs text-[#707a6c]">Đang bảo chứng cho 856 hợp đồng mua bán</p>
            </div>
          </div>
        </div>
      );

    case 'ai-analytics':
      return (
        <div className="p-6 md:p-8 space-y-6 bg-[#f7fbf0] min-h-full">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-[#181d16] flex items-center space-x-2">
                <Sparkles className="w-6 h-6 text-[#176a22]" />
                <span>Trung Tâm AI Phân Tích & Dự Báo Rủi Ro Nông Nghiệp</span>
              </h2>
              <p className="text-sm text-[#40493d] mt-1">
                Ứng dụng mô hình AI Gemini phân tích xu hướng giá cà phê, sầu riêng, gạo và rủi ro chuỗi cung ứng
              </p>
            </div>
            <button
              onClick={() => onOpenAiModal && onOpenAiModal('Toàn cảnh thị trường nông sản Việt Nam 2026')}
              className="px-4 py-2 bg-[#176a22] text-white rounded-xl font-bold text-xs shadow-xs flex items-center space-x-1.5 cursor-pointer"
            >
              <Sparkles className="w-4 h-4" />
              <span>Khởi chạy Gemini AI</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white p-5 rounded-xl border border-[#e0e4d9] shadow-2xs space-y-3">
              <div className="flex items-center space-x-2 text-[#93000a] font-bold text-sm">
                <AlertTriangle className="w-4 h-4" />
                <span>Cảnh báo biến động giá Cà phê Arabica (Lâm Đồng)</span>
              </div>
              <p className="text-xs text-[#40493d]">
                AI phân tích giá cà phê nhân xô tăng 8% do sương muối khu vực Đắk Lắk. Đề xuất điều chỉnh giá sàn hợp đồng tương lai.
              </p>
            </div>

            <div className="bg-white p-5 rounded-xl border border-[#e0e4d9] shadow-2xs space-y-3">
              <div className="flex items-center space-x-2 text-[#176a22] font-bold text-sm">
                <TrendingUp className="w-4 h-4" />
                <span>Dự báo nhu cầu Lúa ST25 xuất khẩu Châu Âu</span>
              </div>
              <p className="text-xs text-[#40493d]">
                Nhu cầu nhập khẩu tăng 15% trong quý 3/2026. Hợp tác xã An Giang và Cần Thơ đủ năng lực cung ứng.
              </p>
            </div>
          </div>
        </div>
      );

    case 'system':
    case 'reports':
    default:
      return (
        <div className="p-6 md:p-8 space-y-6 bg-[#f7fbf0] min-h-full">
          <div>
            <h2 className="text-2xl font-bold text-[#181d16] flex items-center space-x-2">
              <Settings className="w-6 h-6 text-[#176a22]" />
              <span>Cấu Hình & Cài Đặt Hệ Thống AgriConnect</span>
            </h2>
            <p className="text-sm text-[#40493d] mt-1">
              Thiết lập cổng kết nối ngân hàng, biểu phí Escrow, cấu hình thông báo SMS/Zalo
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl border border-[#e0e4d9] shadow-2xs space-y-4 text-xs">
            <div className="flex items-center justify-between pb-3 border-b border-[#e0e4d9]">
              <div>
                <p className="font-bold text-[#181d16]">Phí thanh toán tạm giữ Escrow</p>
                <p className="text-[#707a6c]">Áp dụng cho mọi hợp đồng giao dịch nông sản sỉ</p>
              </div>
              <span className="font-bold text-[#176a22] bg-[#a3f69c]/30 px-3 py-1 rounded-full">0.5% / Giao dịch</span>
            </div>

            <div className="flex items-center justify-between pb-3 border-b border-[#e0e4d9]">
              <div>
                <p className="font-bold text-[#181d16]">Tích hợp Cổng AI Gemini Diagnostic</p>
                <p className="text-[#707a6c]">Cập nhật dự báo giá và quét gian lận tài chính tự động</p>
              </div>
              <span className="font-bold text-[#0284c7] bg-[#e0f2fe] px-3 py-1 rounded-full">Đang bật (Active)</span>
            </div>
          </div>
        </div>
      );
  }
};
