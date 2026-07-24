'use client';

import React, { useState } from 'react';
import { Search, Filter, QrCode, ShoppingBag, MapPin, Calendar, Star } from 'lucide-react';
import { Modal } from '@/components/ui/Modal';
import { Badge } from '@/components/ui/Badge';
import { MOCK_PRODUCTS } from '@/data/mockData';
import { useUIStore } from '@/store/uiStore';
import type { CertificationLabel } from '@/types/product.type';
import { formatNumber } from '@/utils/currency';

export const MarketplaceModal: React.FC = () => {
  const { isMarketplaceOpen, closeMarketplace, openQrModal } = useUIStore();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCert, setSelectedCert] = useState<string>('ALL');

  const filtered = MOCK_PRODUCTS.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.origin.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.seller.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCert =
      selectedCert === 'ALL' || p.certifications.includes(selectedCert as CertificationLabel);
    return matchesSearch && matchesCert;
  });

  return (
    <Modal
      isOpen={isMarketplaceOpen}
      onClose={closeMarketplace}
      title="Sàn Giao Dịch Nông Sản B2B AgriMarket"
      subtitle="Trực tiếp từ các trang trại VietGAP/GlobalGAP đạt chuẩn xuất khẩu"
      headerIcon={<ShoppingBag className="w-5 h-5" />}
      headerVariant="light"
      maxWidth="max-w-5xl"
    >
      {/* Filter & Search */}
      <div className="p-6 border-b border-[#e0e4d9] bg-[#f7fbf0] flex flex-col sm:flex-row items-center gap-4">
        <div className="relative flex-1 w-full">
          <Search className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#707a6c]" />
          <input
            type="text"
            placeholder="Tìm kiếm nông sản, vùng trồng (Tiền Giang, Đắk Lắk...)"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-11 pr-4 py-2.5 bg-white border border-[#bfcaba] rounded-xl text-sm text-[#181d16] focus:outline-none focus:ring-2 focus:ring-[#176a22]"
          />
        </div>
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Filter className="w-4 h-4 text-[#707a6c]" />
          <span className="text-xs font-semibold text-[#40493d] whitespace-nowrap">Chứng nhận:</span>
          <select
            value={selectedCert}
            onChange={(e) => setSelectedCert(e.target.value)}
            className="px-3 py-2 bg-white border border-[#bfcaba] rounded-xl text-xs font-semibold text-[#181d16] focus:outline-none focus:ring-2 focus:ring-[#176a22]"
          >
            <option value="ALL">Tất cả chứng nhận</option>
            <option value="GlobalGAP">GlobalGAP</option>
            <option value="VietGAP">VietGAP</option>
            <option value="Organic">Organic</option>
            <option value="HACCP">HACCP</option>
          </select>
        </div>
      </div>

      {/* Product Grid */}
      <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((p) => (
          <div
            key={p.id}
            className="bg-white border border-[#e0e4d9] rounded-2xl overflow-hidden hover:shadow-lg transition-all flex flex-col justify-between"
          >
            <div>
              <div className="relative h-44 overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
                <div className="absolute top-3 left-3 flex gap-1.5 flex-wrap">
                  {p.certifications.map((cert) => (
                    <Badge key={cert} variant="green">{cert}</Badge>
                  ))}
                </div>
                <div className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-md text-white text-xs px-2.5 py-1 rounded-md flex items-center gap-1 font-semibold">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  {p.rating}
                </div>
              </div>

              <div className="p-4 space-y-2">
                <span className="text-[11px] font-semibold text-[#176a22] tracking-wider uppercase">
                  {p.category}
                </span>
                <h3 className="font-bold text-base text-[#181d16] leading-snug line-clamp-1">
                  {p.name}
                </h3>
                <div className="flex items-center gap-1.5 text-xs text-[#40493d]">
                  <MapPin className="w-3.5 h-3.5 text-[#707a6c]" />
                  <span>{p.origin}</span>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-[#40493d]">
                  <Calendar className="w-3.5 h-3.5 text-[#707a6c]" />
                  <span>Thu hoạch: {p.harvestDate}</span>
                </div>
                <div className="pt-2 flex items-baseline justify-between border-t border-[#f1f5ea]">
                  <span className="text-xs text-[#707a6c]">Giá sỉ B2B:</span>
                  <span className="text-lg font-bold text-[#176a22]">
                    {formatNumber(p.pricePerKg)} đ/kg
                  </span>
                </div>
                <p className="text-[11px] text-[#707a6c] text-right">
                  Số lượng: {p.availableQuantityTons} Tấn (Min order: {p.minOrderTons} Tấn)
                </p>
              </div>
            </div>

            <div className="p-4 bg-[#f1f5ea]/50 border-t border-[#e0e4d9]">
              <button
                onClick={() => {
                  closeMarketplace();
                  openQrModal(p.qrBatchCode);
                }}
                className="w-full py-2.5 px-4 bg-[#176a22] hover:bg-[#12531a] active:scale-95 text-white text-xs font-semibold rounded-xl flex items-center justify-center gap-2 transition-all"
              >
                <QrCode className="w-4 h-4" />
                <span>Xem Mã QR & Thông Tin Sản Phẩm</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </Modal>
  );
};
