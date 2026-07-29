import React, { useState } from 'react';
import { X, TrendingUp, TrendingDown, Minus, RefreshCw, Filter } from 'lucide-react';
import { MarketPrice } from './types';

interface MarketRatesModalProps {
  isOpen: boolean;
  onClose: () => void;
  marketPrices: MarketPrice[];
}

export const MarketRatesModal: React.FC<MarketRatesModalProps> = ({
  isOpen,
  onClose,
  marketPrices
}) => {
  const [filterText, setFilterText] = useState('');

  if (!isOpen) return null;

  const filteredPrices = marketPrices.filter(p => 
    p.cropName.toLowerCase().includes(filterText.toLowerCase()) ||
    p.marketName?.toLowerCase().includes(filterText.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4">
      <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl border border-[#e0e4d9] overflow-hidden my-6">
        <div className="bg-[#f1f5ea] px-6 py-4 border-b border-[#e0e4d9] flex items-center justify-between">
          <div className="flex items-center gap-2 text-[#176a22]">
            <TrendingUp size={20} />
            <div>
              <h3 className="text-lg font-bold">Bảng Giá Thị Trường Nông Sản Nông Nghiệp</h3>
              <p className="text-xs text-[#5e6958]">Cập nhật trực tiếp từ các sàn giao dịch & chợ đầu mối nông sản Việt Nam</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 text-[#5e6958] hover:text-[#ba1a1a] rounded-lg">
            <X size={20} />
          </button>
        </div>

        <div className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
          {/* Search/Filter Bar */}
          <div className="flex items-center justify-between gap-3">
            <input
              type="text"
              placeholder="Tìm theo tên nông sản hoặc chợ..."
              value={filterText}
              onChange={(e) => setFilterText(e.target.value)}
              className="flex-1 px-3.5 py-2 bg-[#f7fbf0] border border-[#bfcaba] rounded-lg text-sm outline-none focus:border-[#176a22]"
            />
            <button 
              onClick={() => alert("Đã làm mới dữ liệu báo giá mới nhất!")}
              className="px-3.5 py-2 bg-[#e0e8d6] hover:bg-[#d0dcb8] text-[#176a22] rounded-lg text-xs font-semibold flex items-center gap-1.5"
            >
              <RefreshCw size={14} /> Làm mới
            </button>
          </div>

          {/* Table */}
          <div className="border border-[#e0e4d9] rounded-xl overflow-hidden">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#f1f5ea] text-[11px] uppercase tracking-wider text-[#5e6958] border-b border-[#e0e4d9]">
                  <th className="py-3 px-4 font-semibold">Tên nông sản</th>
                  <th className="py-3 px-4 font-semibold">Phân loại</th>
                  <th className="py-3 px-4 font-semibold text-right">Giá niêm yết</th>
                  <th className="py-3 px-4 font-semibold text-right">Biến động</th>
                  <th className="py-3 px-4 font-semibold">Sàn / Chợ</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#e0e4d9] text-sm">
                {filteredPrices.map((item) => (
                  <tr key={item.id} className="hover:bg-[#f7fbf0] transition-colors">
                    <td className="py-3 px-4 font-bold text-[#181d16]">{item.cropName}</td>
                    <td className="py-3 px-4 text-xs text-[#5e6958]">{item.grade}</td>
                    <td className="py-3 px-4 text-right font-extrabold text-[#176a22]">
                      {item.price.toLocaleString('vi-VN')}đ
                    </td>
                    <td className="py-3 px-4 text-right">
                      {item.trend === 'up' && (
                        <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#176a22]">
                          <TrendingUp size={14} /> +{item.changePercent}%
                        </span>
                      )}
                      {item.trend === 'down' && (
                        <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#ba1a1a]">
                          <TrendingDown size={14} /> {item.changePercent}%
                        </span>
                      )}
                      {item.trend === 'stable' && (
                        <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#5e6958]">
                          <Minus size={14} /> 0.0%
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-4 text-xs text-[#5e6958]">{item.marketName || 'Chợ đầu mối'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-[#f1f5ea] px-6 py-3 border-t border-[#e0e4d9] flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-[#176a22] text-white rounded-xl text-sm font-semibold hover:bg-[#12541b]"
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
};
