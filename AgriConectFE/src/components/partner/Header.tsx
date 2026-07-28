import React from 'react';
import { Search, Bell, Settings, ShoppingCart } from 'lucide-react';

interface HeaderProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  cartCount: number;
  onOpenCart: () => void;
  currency: 'VND' | 'USD';
  onToggleCurrency: () => void;
  onOpenNotifications: () => void;
  onOpenSettings: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  searchQuery,
  onSearchChange,
  cartCount,
  onOpenCart,
  currency,
  onToggleCurrency,
  onOpenNotifications,
  onOpenSettings,
}) => {
  return (
    <header className="fixed top-0 right-0 left-0 md:left-[260px] h-16 bg-[#f7fbf0] z-40 border-b border-[#bfcaba]/30 px-4 md:px-6 flex justify-between items-center transition-all">
      {/* Search Bar */}
      <div className="flex-1 max-w-xl">
        <div className="relative group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#707a6c] group-focus-within:text-[#176a22] transition-colors" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Tìm kiếm sản phẩm nông sản bán buôn..."
            className="w-full pl-10 pr-4 py-2 bg-[#e0e4d9]/50 border border-[#bfcaba] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#176a22]/20 focus:border-[#176a22] transition-all text-sm text-[#181d16] placeholder-[#40493d]/60"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#707a6c] hover:text-[#181d16]"
            >
              Xóa
            </button>
          )}
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2 md:gap-3 ml-4">
        {/* Notifications */}
        <button
          onClick={onOpenNotifications}
          className="p-2 text-[#40493d] hover:bg-[#ebefe4] rounded-full transition-colors relative"
          title="Thông báo"
        >
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#ba1a1a] rounded-full ring-2 ring-[#f7fbf0]"></span>
        </button>

        {/* Settings */}
        <button
          onClick={onOpenSettings}
          className="p-2 text-[#40493d] hover:bg-[#ebefe4] rounded-full transition-colors"
          title="Cài đặt"
        >
          <Settings className="w-5 h-5" />
        </button>

        <div className="h-6 w-[1px] bg-[#bfcaba] mx-1"></div>

        {/* Cart Button */}
        <button
          onClick={onOpenCart}
          className="flex items-center gap-2 bg-[#176a22] text-white px-3.5 py-2 rounded-lg font-medium text-sm hover:bg-[#358439] active:scale-95 transition-all shadow-sm"
        >
          <ShoppingCart className="w-4 h-4" />
          <span className="hidden sm:inline">Giỏ hàng</span>
          <span className="bg-white/20 text-white text-xs px-2 py-0.5 rounded-full font-bold">
            {cartCount}
          </span>
        </button>
      </div>
    </header>
  );
};
