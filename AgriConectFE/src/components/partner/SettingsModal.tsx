import React from 'react';
import { X, Settings, ArrowRightLeft, Shield, Globe } from 'lucide-react';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  currency: 'VND' | 'USD';
  onToggleCurrency: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  currency,
  onToggleCurrency,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
      <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-[#bfcaba] relative">
        <div className="flex justify-between items-center mb-4 pb-2 border-b border-stone-200">
          <div className="flex items-center gap-2 text-[#176a22]">
            <Settings className="w-5 h-5" />
            <h3 className="font-bold text-lg text-[#181d16]">
              Cấu Hình Hệ Thống AgriConnect
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-stone-400 hover:text-stone-700"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-4 text-xs text-[#40493d]">
          {/* Currency Selection */}
          <div className="p-3 bg-[#f7fbf0] rounded-2xl border border-[#bfcaba]/30 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ArrowRightLeft className="w-4 h-4 text-[#176a22]" />
              <div>
                <p className="font-bold text-[#181d16]">Đơn Vị Tiền Tệ Hiển Thị</p>
                <p className="text-[11px] text-[#707a6c]">Tự động quy đổi tỷ giá 1 USD = 24.500 VND</p>
              </div>
            </div>

            <button
              onClick={onToggleCurrency}
              className="bg-[#176a22] text-white px-3 py-1.5 rounded-xl font-bold transition-all"
            >
              {currency}
            </button>
          </div>

          {/* Language */}
          <div className="p-3 bg-stone-50 rounded-2xl border border-stone-200 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Globe className="w-4 h-4 text-[#176a22]" />
              <div>
                <p className="font-bold text-[#181d16]">Ngôn Ngữ Giao Diện</p>
                <p className="text-[11px] text-[#707a6c]">Tiếng Việt (Toàn bộ)</p>
              </div>
            </div>
            <span className="bg-[#176a22]/10 text-[#176a22] px-2.5 py-1 rounded-lg font-bold text-[11px]">
              Tiếng Việt
            </span>
          </div>

          {/* Verified Business Status */}
          <div className="p-3 bg-stone-50 rounded-2xl border border-stone-200 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-[#176a22]" />
              <div>
                <p className="font-bold text-[#181d16]">Trạng Thái Xác Thực Doanh Nghiệp</p>
                <p className="text-[11px] text-[#707a6c]">Đã kiểm định mã số thuế & Giấy phép B2B</p>
              </div>
            </div>
            <span className="bg-[#176a22] text-white px-2.5 py-1 rounded-lg font-bold text-[10px] uppercase">
              Xác Thực
            </span>
          </div>

          <button
            onClick={onClose}
            className="w-full mt-2 bg-[#176a22] hover:bg-[#358439] text-white py-2.5 rounded-xl font-bold text-xs shadow-xs"
          >
            Lưu & Đóng
          </button>
        </div>
      </div>
    </div>
  );
};
