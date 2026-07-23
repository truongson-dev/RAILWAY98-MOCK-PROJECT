import React from 'react';
import { Search, Sprout } from 'lucide-react';

interface NavbarProps {
  onOpenMarketplace: () => void;
  onOpenRegister: (defaultRole?: 'farmer' | 'buyer' | 'carrier', tab?: 'login' | 'register') => void;
  onOpenNotifications: () => void;
  unreadCount?: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenMarketplace,
  onOpenRegister,
  onOpenNotifications,
  unreadCount = 2,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-[#f7fbf0]/90 backdrop-blur-md border-b border-[#e0e4d9]/60 px-4 lg:px-12 py-3.5 transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Brand Logo */}
        <a href="#" className="flex items-center gap-2 group">
          <div className="w-9 h-9 rounded-xl bg-[#176a22] flex items-center justify-center text-white shadow-sm group-hover:scale-105 transition-transform">
            <Sprout className="w-5 h-5" />
          </div>
          <span className="text-xl font-bold tracking-tight text-[#181d16] font-sans">
            Agri<span className="text-[#176a22]">Connect</span>
          </span>
        </a>

        {/* Navigation Links for quick access */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-[#40493d]">
          <button 
            onClick={onOpenMarketplace}
            className="hover:text-[#176a22] transition-colors"
          >
            Sàn B2B
          </button>
          <a href="#giai-phap" className="hover:text-[#176a22] transition-colors">
            Giải Pháp
          </a>
          <a href="#vai-tro" className="hover:text-[#176a22] transition-colors">
            Đối Tác Ecosystem
          </a>
          <a href="#chung-nhan" className="hover:text-[#176a22] transition-colors">
            Chứng Nhận
          </a>
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenMarketplace}
            className="p-2 text-[#40493d] hover:text-[#176a22] hover:bg-[#e0e4d9]/50 rounded-full transition-colors relative"
            title="Tìm kiếm nông sản"
          >
            <Search className="w-5 h-5" />
          </button>

          <div className="h-4 w-px bg-[#bfcaba]/60 mx-1 hidden sm:block" />

          <button
            onClick={() => onOpenRegister('farmer', 'login')}
            className="hidden sm:inline-block px-4 py-2 text-sm font-semibold text-[#181d16] hover:text-[#176a22] transition-colors cursor-pointer"
          >
            Login
          </button>

          <button
            onClick={() => onOpenRegister('buyer', 'register')}
            className="px-5 py-2 text-sm font-semibold text-white bg-[#176a22] hover:bg-[#12531a] active:scale-95 rounded-full transition-all shadow-sm cursor-pointer"
          >
            Register
          </button>
        </div>
      </div>
    </header>
  );
};
