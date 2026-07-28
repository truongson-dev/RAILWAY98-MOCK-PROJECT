import React, { useState, useMemo } from 'react';
import {
  X,
  MapPin,
  ShieldCheck,
  Phone,
  Calendar,
  ShoppingCart,
  Truck,
  Award,
  Star,
  CheckCircle2,
  ChevronRight,
  Sparkles,
  Play,
  ThermometerSnowflake,
  PackageCheck,
  Lock,
  ExternalLink,
  MessageSquareText,
  QrCode,
  FileCheck2,
  Leaf,
  Microscope,
  Download,
} from 'lucide-react';
import { Product } from './types';

interface ProductDetailModalProps {
  product: Product | null;
  currency: 'VND' | 'USD';
  onClose: () => void;
  onAddToCart: (product: Product, quantityKg: number) => void;
  onOpenAiAssistantWithTopic: (topic: string) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  currency,
  onClose,
  onAddToCart,
  onOpenAiAssistantWithTopic,
}) => {
  if (!product) return null;

  const [quantity, setQuantity] = useState<number>(
    Math.max(product.minOrderKg, 500)
  );
  const [showQrModal, setShowQrModal] = useState<boolean>(false);

  // Gallery images with fallback mock thumbnails
  const galleryImages = useMemo(() => {
    return [
      {
        id: 'main',
        url: product.image,
        title: 'Nông sản thực tế',
        type: 'image',
      },
      {
        id: 'close-up',
        url: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=800&q=80',
        title: 'Cận cảnh chất lượng',
        type: 'image',
      },
      {
        id: 'warehouse',
        url: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80',
        title: 'Quy cách đóng gói & Kho',
        type: 'image',
      },
      {
        id: 'farm',
        url: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=800&q=80',
        title: 'Nhà kính chuẩn GlobalGAP',
        type: 'image',
      },
    ];
  }, [product]);

  const [activeImage, setActiveImage] = useState<string>(product.image);

  // Calculate volume tiered price
  const activeTier = useMemo(() => {
    if (quantity >= 1000) {
      return {
        discountPercent: 25,
        unitPriceVnd: Math.round(product.priceVnd * 0.75),
        label: 'Tiết kiệm 25%',
      };
    } else if (quantity >= 500) {
      return {
        discountPercent: 12,
        unitPriceVnd: Math.round(product.priceVnd * 0.88),
        label: 'Phổ biến nhất',
      };
    } else {
      return {
        discountPercent: 0,
        unitPriceVnd: product.priceVnd,
        label: 'Giá cơ bản',
      };
    }
  }, [quantity, product.priceVnd]);

  const totalPriceVnd = quantity * activeTier.unitPriceVnd;

  const formatPrice = (priceVnd: number) => {
    return currency === 'USD'
      ? `$${(priceVnd / 24500).toFixed(2)}`
      : `${priceVnd.toLocaleString('vi-VN')}đ`;
  };

  const handleAdd = () => {
    onAddToCart(product, quantity);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200 overflow-y-auto">
      <div className="bg-[#fcfdfa] rounded-3xl max-w-5xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-[#bfcaba] flex flex-col relative my-auto">
        {/* Header Breadcrumbs & Close */}
        <div className="sticky top-0 bg-[#fcfdfa]/95 backdrop-blur-md z-30 px-6 py-3.5 border-b border-[#bfcaba]/30 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs text-[#707a6c] font-medium overflow-x-auto hide-scrollbar">
            <span>Sàn giao dịch</span>
            <ChevronRight className="w-3.5 h-3.5 shrink-0 text-stone-400" />
            <span>{product.categoryVn}</span>
            <ChevronRight className="w-3.5 h-3.5 shrink-0 text-stone-400" />
            <span className="font-bold text-[#181d16] truncate">
              {product.name}
            </span>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-stone-100 hover:bg-stone-200 flex items-center justify-center text-[#181d16] transition-colors shrink-0 ml-2"
            title="Đóng cửa sổ"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Main Content Container */}
        <div className="p-6 space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Column: Gallery & Technical Specifications (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              {/* Main Image Display */}
              <div className="space-y-3">
                <div className="rounded-2xl overflow-hidden bg-stone-100 h-72 sm:h-96 relative border border-[#bfcaba]/40 shadow-xs group">
                  <img
                    src={activeImage}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-102"
                  />

                  {/* Badges Overlay */}
                  <div className="absolute top-4 left-4 flex flex-wrap gap-2 z-10">
                    {product.badges.map((badge, idx) => (
                      <span
                        key={idx}
                        className="bg-[#176a22] text-white text-[11px] font-extrabold px-3 py-1 rounded-lg uppercase tracking-wider shadow-md backdrop-blur-xs"
                      >
                        {badge}
                      </span>
                    ))}
                    <span className="bg-[#9d3c5f] text-white text-[11px] font-extrabold px-3 py-1 rounded-lg uppercase tracking-wider shadow-md">
                      HÀNG ƯU TIÊN
                    </span>
                  </div>
                </div>

                {/* Thumbnails Gallery Strip */}
                <div className="grid grid-cols-4 gap-3">
                  {galleryImages.map((img) => (
                    <button
                      key={img.id}
                      onClick={() => setActiveImage(img.url)}
                      className={`h-20 rounded-xl overflow-hidden border-2 transition-all relative ${
                        activeImage === img.url
                          ? 'border-[#176a22] ring-2 ring-[#176a22]/30 scale-98'
                          : 'border-transparent opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img
                        src={img.url}
                        alt={img.title}
                        className="w-full h-full object-cover"
                      />
                      {img.type === 'video' && (
                        <div className="absolute inset-0 bg-black/30 flex items-center justify-center text-white">
                          <Play className="w-5 h-5 fill-white" />
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Product Specifications & Farm Details */}
              <div className="bg-white rounded-2xl p-6 border border-[#bfcaba]/30 shadow-2xs space-y-5">
                <div className="border-b border-stone-100 pb-3">
                  <h4 className="font-bold text-base text-[#181d16] flex items-center gap-2">
                    <PackageCheck className="w-5 h-5 text-[#176a22]" />
                    <span>Thông Số Nông Sản & Tiêu Chuẩn Chất Lượng</span>
                  </h4>
                </div>

                <p className="text-sm text-[#40493d] leading-relaxed">
                  {product.description}
                </p>

                {/* Specs Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs pt-2">
                  <div className="p-3.5 bg-[#f7fbf0] rounded-xl border border-[#bfcaba]/30 flex items-start gap-3">
                    <Award className="w-5 h-5 text-[#176a22] shrink-0 mt-0.5" />
                    <div>
                      <p className="font-bold text-[#181d16]">Chứng nhận Nông nghiệp</p>
                      <p className="text-[#707a6c] mt-0.5">
                        VietGAP, GlobalGAP, USDA Organic
                      </p>
                    </div>
                  </div>

                  <div className="p-3.5 bg-[#f7fbf0] rounded-xl border border-[#bfcaba]/30 flex items-start gap-3">
                    <Calendar className="w-5 h-5 text-[#176a22] shrink-0 mt-0.5" />
                    <div>
                      <p className="font-bold text-[#181d16]">Cửa Sổ Thu Hoạch</p>
                      <p className="text-[#707a6c] mt-0.5">
                        {product.harvestDate}
                      </p>
                    </div>
                  </div>

                  <div className="p-3.5 bg-[#f7fbf0] rounded-xl border border-[#bfcaba]/30 flex items-start gap-3">
                    <ThermometerSnowflake className="w-5 h-5 text-[#176a22] shrink-0 mt-0.5" />
                    <div>
                      <p className="font-bold text-[#181d16]">Bảo Quản Lạnh Chuẩn</p>
                      <p className="text-[#707a6c] mt-0.5">
                        Nhiệt độ 8°C - 12°C, độ ẩm 85%
                      </p>
                    </div>
                  </div>

                  <div className="p-3.5 bg-[#f7fbf0] rounded-xl border border-[#bfcaba]/30 flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-[#176a22] shrink-0 mt-0.5" />
                    <div>
                      <p className="font-bold text-[#181d16]">Vùng Trồng</p>
                      <p className="text-[#707a6c] mt-0.5">{product.location}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* QR Traceability Card (Mã QR Truy Xuất Nguồn Gốc) */}
              <div className="bg-gradient-to-br from-[#f7fbf0] to-white rounded-2xl p-5 border border-[#176a22]/30 shadow-2xs space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-[#176a22]/15">
                  <div className="flex items-center gap-2.5 text-[#176a22]">
                    <QrCode className="w-5 h-5" />
                    <h4 className="font-extrabold text-sm text-[#181d16]">
                      Mã QR Truy Xuất Nguồn Gốc Lô Hàng
                    </h4>
                  </div>
                  <span className="bg-[#176a22] text-white text-[10px] font-extrabold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                    XÁC THỰC BLOCKCHAIN
                  </span>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 items-center">
                  {/* QR Image Graphic Container */}
                  <div className="w-28 h-28 bg-white p-2.5 rounded-2xl border border-[#bfcaba]/50 shadow-xs shrink-0 flex flex-col items-center justify-center relative group cursor-pointer"
                       onClick={() => setShowQrModal(true)}>
                    <img
                      src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://agriconnect.vn/trace/BATCH-2026-${product.id}`}
                      alt="QR Truy Xuất Nguồn Gốc"
                      className="w-full h-full object-contain"
                    />
                    <span className="absolute bottom-1 bg-[#176a22] text-white text-[8px] font-bold px-1.5 py-0.5 rounded shadow-2xs opacity-90">
                      CHẤM BẢO MẬT
                    </span>
                  </div>

                  {/* Traceability Info */}
                  <div className="flex-1 space-y-2 text-xs">
                    <div className="flex justify-between items-center text-[#40493d]">
                      <span>Mã Lô Nông Sản:</span>
                      <strong className="font-mono text-[#176a22] bg-[#176a22]/10 px-2 py-0.5 rounded">
                        BATCH-2026-{product.id.toUpperCase()}
                      </strong>
                    </div>

                    <div className="flex justify-between items-center text-[#40493d]">
                      <span>Mã Vùng Trồng (PUC):</span>
                      <strong className="font-mono text-[#181d16]">
                        VN-DLT-88392-VG
                      </strong>
                    </div>

                    <div className="flex justify-between items-center text-[#40493d]">
                      <span>Dư Lượng Thuốc BVTV:</span>
                      <span className="text-[#176a22] font-bold flex items-center gap-1">
                        <Microscope className="w-3.5 h-3.5" />
                        <span>0.00% (An toàn tuyệt đối)</span>
                      </span>
                    </div>

                    <div className="pt-2 flex gap-2">
                      <button
                        onClick={() => setShowQrModal(true)}
                        className="flex-1 bg-[#176a22] hover:bg-[#358439] text-white py-2 rounded-xl font-bold text-[11px] flex items-center justify-center gap-1.5 shadow-2xs transition-all"
                      >
                        <QrCode className="w-3.5 h-3.5" />
                        <span>Xem Tem QR Điện Tử</span>
                      </button>

                      <button
                        onClick={() =>
                          onOpenAiAssistantWithTopic(
                            `Xem chi tiết hồ sơ kiểm định chất lượng và nhật ký canh tác của mã lô BATCH-2026-${product.id}`
                          )
                        }
                        className="px-3 py-2 bg-white hover:bg-stone-50 text-[#176a22] border border-[#176a22]/30 rounded-xl font-bold text-[11px] flex items-center gap-1"
                      >
                        <FileCheck2 className="w-3.5 h-3.5" />
                        <span>Hồ Sơ Cụ Thể</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Verified Supplier Info */}
              <div className="bg-white rounded-2xl p-5 border border-[#bfcaba]/30 shadow-2xs flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3.5">
                  <div className="w-12 h-12 rounded-full bg-[#176a22] text-white font-extrabold text-lg flex items-center justify-center shrink-0 shadow-xs">
                    {product.supplier.name.charAt(0)}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h5 className="font-bold text-sm text-[#181d16]">
                        {product.supplier.name}
                      </h5>
                      {product.supplier.verified && (
                        <CheckCircle2 className="w-4 h-4 text-[#176a22] fill-[#176a22]/20" />
                      )}
                    </div>
                    <p className="text-xs text-[#707a6c] mt-0.5 flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5" />
                      <span>{product.supplier.address}</span>
                    </p>
                    <p className="text-[11px] text-[#40493d] font-medium mt-1">
                      Thành viên đối tác B2B từ 2019 • Đã kiểm định mã số thuế
                    </p>
                  </div>
                </div>

                <div className="flex sm:flex-col gap-2 w-full sm:w-auto shrink-0">
                  <button
                    onClick={() =>
                      onOpenAiAssistantWithTopic(
                        `Kết nối tư vấn trực tiếp với chủ trang trại ${product.supplier.name}`
                      )
                    }
                    className="flex-1 sm:flex-none px-3 py-2 bg-[#f7fbf0] hover:bg-[#ebefe4] text-[#176a22] border border-[#176a22]/30 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <MessageSquareText className="w-3.5 h-3.5" />
                    <span>Liên Hệ Chủ Trại</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Right Column: B2B Volume Pricing & Order Form (5 cols) */}
            <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-20">
              <div className="bg-white rounded-3xl p-6 border border-[#bfcaba]/40 shadow-sm space-y-6">
                {/* Title & Ratings */}
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-extrabold text-[#176a22] bg-[#176a22]/10 px-3 py-1 rounded-full uppercase">
                      {product.categoryVn}
                    </span>
                    <div className="flex items-center gap-1 text-xs text-[#181d16] font-bold">
                      <div className="flex text-amber-500">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                        ))}
                      </div>
                      <span>4.9</span>
                      <span className="text-[#707a6c] font-normal">(124 đánh giá)</span>
                    </div>
                  </div>

                  <h2 className="text-2xl font-extrabold text-[#181d16] mt-2 leading-snug">
                    {product.name}
                  </h2>
                  <p className="text-xs text-[#707a6c] mt-1 flex items-center gap-1 font-medium">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>{product.location}</span>
                  </p>
                </div>

                {/* Tiered Volume Price Matrix */}
                <div className="space-y-2">
                  <label className="text-xs font-extrabold text-[#181d16] uppercase tracking-wider block">
                    Bảng Giá Khối Lượng Tích Lũy (Volume Tier)
                  </label>

                  <div className="rounded-2xl border border-[#bfcaba]/40 overflow-hidden text-xs">
                    <div className="grid grid-cols-2 bg-[#f7fbf0] p-2.5 font-bold text-[#707a6c] border-b border-[#bfcaba]/20">
                      <span>KHỐI LƯỢNG MUA</span>
                      <span className="text-right">ĐƠN GIÁ BÁN BUÔN</span>
                    </div>

                    {/* Tier 1 */}
                    <div
                      className={`grid grid-cols-2 p-3 border-b border-stone-100 items-center transition-colors ${
                        quantity < 500 ? 'bg-[#176a22]/5 font-bold' : ''
                      }`}
                    >
                      <span className="text-[#181d16]">100 - 499 kg</span>
                      <span className="text-right font-extrabold text-[#181d16]">
                        {formatPrice(product.priceVnd)}/kg
                      </span>
                    </div>

                    {/* Tier 2 */}
                    <div
                      className={`grid grid-cols-2 p-3 border-b border-stone-100 items-center transition-colors ${
                        quantity >= 500 && quantity < 1000
                          ? 'bg-[#176a22]/10 font-bold'
                          : ''
                      }`}
                    >
                      <div className="flex items-center gap-1.5">
                        <span className="text-[#181d16]">500 - 999 kg</span>
                        <span className="bg-[#176a22] text-white text-[9px] font-extrabold px-1.5 py-0.5 rounded">
                          PHỔ BIẾN
                        </span>
                      </div>
                      <span className="text-right font-extrabold text-[#176a22]">
                        {formatPrice(Math.round(product.priceVnd * 0.88))}/kg
                      </span>
                    </div>

                    {/* Tier 3 */}
                    <div
                      className={`grid grid-cols-2 p-3 items-center transition-colors ${
                        quantity >= 1000 ? 'bg-[#176a22]/10 font-bold' : ''
                      }`}
                    >
                      <div className="flex items-center gap-1.5">
                        <span className="text-[#181d16]">&gt; 1,000 kg</span>
                        <span className="bg-[#9d3c5f] text-white text-[9px] font-extrabold px-1.5 py-0.5 rounded">
                          -25% TIẾT KIỆM
                        </span>
                      </div>
                      <span className="text-right font-extrabold text-[#176a22]">
                        {formatPrice(Math.round(product.priceVnd * 0.75))}/kg
                      </span>
                    </div>
                  </div>
                </div>

                {/* Quantity Selector */}
                <div className="space-y-3 pt-2 border-t border-stone-100">
                  <div className="flex justify-between items-center">
                    <label className="text-xs font-bold text-[#181d16]">
                      Số Lượng Đặt Mua (kg):
                    </label>
                    <span className="text-xs text-[#176a22] font-semibold">
                      {activeTier.label}
                    </span>
                  </div>

                  <div className="flex items-center border-2 border-[#176a22] rounded-2xl bg-[#f7fbf0] overflow-hidden p-1 shadow-2xs">
                    <button
                      onClick={() =>
                        setQuantity((q) =>
                          Math.max(product.minOrderKg, q - 100)
                        )
                      }
                      className="w-12 h-10 font-extrabold text-base text-[#176a22] hover:bg-[#176a22]/10 rounded-xl transition-colors"
                    >
                      -
                    </button>

                    <input
                      type="number"
                      value={quantity}
                      onChange={(e) =>
                        setQuantity(
                          Math.max(
                            product.minOrderKg,
                            parseInt(e.target.value) || product.minOrderKg
                          )
                        )
                      }
                      className="flex-1 text-center font-extrabold text-lg text-[#181d16] bg-transparent outline-none"
                      min={product.minOrderKg}
                      step={50}
                    />

                    <button
                      onClick={() => setQuantity((q) => q + 100)}
                      className="w-12 h-10 font-extrabold text-base text-[#176a22] hover:bg-[#176a22]/10 rounded-xl transition-colors"
                    >
                      +
                    </button>
                  </div>

                  {/* Preset Volume Buttons */}
                  <div className="flex gap-2">
                    {[200, 500, 1000].map((vol) => (
                      <button
                        key={vol}
                        onClick={() => setQuantity(vol)}
                        className={`flex-1 py-1.5 rounded-xl text-xs font-bold transition-all border ${
                          quantity === vol
                            ? 'bg-[#176a22] text-white border-[#176a22]'
                            : 'bg-stone-50 hover:bg-stone-100 text-[#40493d] border-stone-200'
                        }`}
                      >
                        {vol} kg
                      </button>
                    ))}
                  </div>
                </div>

                {/* Total Summary */}
                <div className="p-4 bg-[#f7fbf0] rounded-2xl border border-[#bfcaba]/30 space-y-2">
                  <div className="flex justify-between items-center text-xs text-[#707a6c]">
                    <span>Ước tính thời gian giao:</span>
                    <span className="font-bold text-[#181d16] flex items-center gap-1">
                      <Truck className="w-3.5 h-3.5 text-[#176a22]" />
                      <span>1 - 3 Ngày làm việc</span>
                    </span>
                  </div>

                  <div className="flex justify-between items-baseline pt-2 border-t border-stone-200">
                    <span className="text-sm font-bold text-[#181d16]">
                      Thành tiền dự kiến:
                    </span>
                    <span className="text-2xl font-black text-[#176a22]">
                      {formatPrice(totalPriceVnd)}
                    </span>
                  </div>
                </div>

                {/* CTA Action Buttons */}
                <div className="space-y-2.5">
                  <button
                    onClick={handleAdd}
                    className="w-full bg-[#176a22] hover:bg-[#358439] text-white py-3.5 rounded-2xl font-extrabold text-sm flex items-center justify-center gap-2 shadow-md transition-all active:scale-98"
                  >
                    <ShoppingCart className="w-5 h-5" />
                    <span>Thêm Vào Giỏ Hàng Sỉ</span>
                  </button>

                  <button
                    onClick={() =>
                      onOpenAiAssistantWithTopic(
                        `Tôi muốn đàm phán hợp đồng cung cấp dài hạn sản phẩm ${product.name} (Khối lượng dự kiến: ${quantity}kg/tháng) với ${product.supplier.name}.`
                      )
                    }
                    className="w-full bg-white hover:bg-[#f7fbf0] text-[#176a22] border-2 border-[#176a22] py-3 rounded-2xl font-bold text-xs flex items-center justify-center gap-2 transition-all"
                  >
                    <Sparkles className="w-4 h-4" />
                    <span>Đàm Phán Hợp Đồng Qua AI Assistant</span>
                  </button>
                </div>

                {/* Guarantees Row */}
                <div className="grid grid-cols-3 gap-2 pt-2 text-[10px] text-[#707a6c] text-center border-t border-stone-100">
                  <div className="flex flex-col items-center gap-1">
                    <Lock className="w-4 h-4 text-[#176a22]" />
                    <span className="font-semibold">Thanh toán an toàn B2B</span>
                  </div>
                  <div className="flex flex-col items-center gap-1">
                    <Truck className="w-4 h-4 text-[#176a22]" />
                    <span className="font-semibold">Bảo quản kho lạnh</span>
                  </div>
                  <div className="flex flex-col items-center gap-1">
                    <ShieldCheck className="w-4 h-4 text-[#176a22]" />
                    <span className="font-semibold">Truy xuất nguồn gốc</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Full QR Traceability Passport Modal */}
      {showQrModal && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-[#bfcaba] relative space-y-6">
            {/* Close Button */}
            <button
              onClick={() => setShowQrModal(false)}
              className="absolute top-4 right-4 w-9 h-9 rounded-full bg-stone-100 hover:bg-stone-200 flex items-center justify-center text-[#181d16] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Passport Header */}
            <div className="text-center space-y-1 pt-2">
              <span className="bg-[#176a22]/10 text-[#176a22] text-[11px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider inline-flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                HỒ SƠ TRUY XUẤT NÔNG SẢN ĐIỆN TỬ
              </span>
              <h3 className="text-xl font-extrabold text-[#181d16]">
                {product.name}
              </h3>
              <p className="text-xs text-[#707a6c]">
                Mã định danh lô hàng B2B chuẩn mã hóa QR
              </p>
            </div>

            {/* Main QR Display */}
            <div className="bg-[#f7fbf0] rounded-2xl p-6 border border-[#bfcaba]/40 flex flex-col items-center text-center space-y-3">
              <div className="w-48 h-48 bg-white p-3 rounded-2xl border-2 border-[#176a22]/30 shadow-md relative">
                <img
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=https://agriconnect.vn/trace/BATCH-2026-${product.id}`}
                  alt="QR Code Passport"
                  className="w-full h-full object-contain"
                />
              </div>

              <div className="font-mono text-xs text-[#176a22] font-bold bg-white px-3 py-1 rounded-lg border border-[#176a22]/20">
                MÃ LÔ: BATCH-2026-{product.id.toUpperCase()}
              </div>
            </div>

            {/* Traceability Timeline */}
            <div className="space-y-3 text-xs">
              <h5 className="font-extrabold text-[#181d16] uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                <Leaf className="w-4 h-4 text-[#176a22]" />
                Nhật Ký Canh Tác Điện Tử
              </h5>

              <div className="space-y-2 relative pl-4 border-l-2 border-[#176a22]/30 ml-2">
                <div className="relative">
                  <div className="absolute -left-[21px] top-1 w-2.5 h-2.5 rounded-full bg-[#176a22]" />
                  <p className="font-bold text-[#181d16]">Gieo trồng & Chuẩn bị giống</p>
                  <p className="text-[#707a6c] text-[11px]">
                    Giống thuần F1 kiểm định VietGAP • 12/04/2026
                  </p>
                </div>

                <div className="relative">
                  <div className="absolute -left-[21px] top-1 w-2.5 h-2.5 rounded-full bg-[#176a22]" />
                  <p className="font-bold text-[#181d16]">Thu hoạch & Phân loại Grade A</p>
                  <p className="text-[#707a6c] text-[11px]">
                    {product.harvestDate} • {product.location}
                  </p>
                </div>

                <div className="relative">
                  <div className="absolute -left-[21px] top-1 w-2.5 h-2.5 rounded-full bg-[#176a22]" />
                  <p className="font-bold text-[#181d16]">Kiểm định chất lượng Quatest 3</p>
                  <p className="text-[#707a6c] text-[11px]">
                    Đạt 100% chỉ tiêu vi sinh & dư lượng BVTV (0.00%)
                  </p>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="pt-2 flex gap-3">
              <button
                onClick={() => {
                  const link = document.createElement('a');
                  link.href = `https://api.qrserver.com/v1/create-qr-code/?size=500x500&data=https://agriconnect.vn/trace/BATCH-2026-${product.id}`;
                  link.download = `QR_AgriConnect_${product.id}.png`;
                  link.click();
                }}
                className="flex-1 bg-[#176a22] hover:bg-[#358439] text-white py-3 rounded-xl font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition-all"
              >
                <Download className="w-4 h-4" />
                <span>Tải Tem QR Về Máy</span>
              </button>

              <button
                onClick={() => setShowQrModal(false)}
                className="px-5 py-3 bg-stone-100 hover:bg-stone-200 text-[#181d16] rounded-xl font-bold text-xs"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

