'use client';
// Đây là component thuộc giao diện Admin
import React, { useState } from 'react';
import { Search, Bell, Settings, CheckCircle2, X, LogOut } from 'lucide-react';

interface HeaderProps {
  onSearch?: (query: string) => void;
  onOpenSettings?: () => void;
  onOpenNotifications?: () => void;
  onLogout?: () => void;
}

// Component: Header - Giao diện quản lý/hiển thị cho Admin
export const Header: React.FC<HeaderProps> = ({
  onSearch,
  onOpenSettings,
  onOpenNotifications,
  onLogout
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showNotifications, setShowNotifications] = useState(false);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    if (onSearch) {
      onSearch(e.target.value);
    }
  };

  return (
    <header className="h-16 bg-[#f7fbf0] border-b border-[#e0e4d9] px-6 md:px-8 flex items-center justify-between sticky top-0 z-20">
      {/* Quick Search */}
      <div className="relative w-80 md:w-96">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#707a6c]" />
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Tìm kiếm nhanh..."
          className="w-full pl-9 pr-4 py-1.5 text-sm bg-white border border-[#bfcaba] rounded-lg text-[#181d16] placeholder-[#707a6c] focus:outline-none focus:ring-2 focus:ring-[#176a22] focus:border-transparent transition-all"
        />
        {searchQuery && (
          <button
            onClick={() => {
              setSearchQuery('');
              if (onSearch) onSearch('');
            }}
            className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#707a6c] hover:text-[#181d16]"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {/* Header Actions */}
      <div className="flex items-center space-x-4">
        {/* System Status Pill */}
        <div className="flex items-center space-x-1.5 bg-white border border-[#bfcaba] px-3 py-1 rounded-full text-xs font-medium text-[#181d16] shadow-2xs">
          <CheckCircle2 className="w-3.5 h-3.5 text-[#176a22]" />
          <span>Hệ thống ổn định</span>
        </div>

        {/* Notifications Button */}
        <div className="relative">
          <button
            onClick={() => {
              setShowNotifications(!showNotifications);
              if (onOpenNotifications) onOpenNotifications();
            }}
            className="p-2 text-[#40493d] hover:bg-[#e0e4d9]/50 rounded-full transition-colors relative cursor-pointer"
            title="Thông báo hệ thống"
          >
            <Bell className="w-5 h-5" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-[#ba1a1a] rounded-full ring-2 ring-[#f7fbf0]" />
          </button>

          {/* Notifications Dropdown */}
          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 bg-white border border-[#bfcaba] rounded-xl shadow-lg p-4 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
              <div className="flex items-center justify-between pb-2 border-b border-[#e0e4d9] mb-3">
                <h4 className="text-sm font-semibold text-[#181d16]">Thông báo mới</h4>
                <span className="text-xs font-medium text-[#176a22] bg-[#a3f69c]/30 px-2 py-0.5 rounded-full">
                  3 chưa đọc
                </span>
              </div>
              <div className="space-y-3 text-xs">
                <div className="p-2 rounded-lg bg-[#f1f5ea] border border-[#e0e4d9]">
                  <p className="font-semibold text-[#181d16]">Hồ sơ KYC mới cần duyệt</p>
                  <p className="text-[#40493d] mt-0.5">Nông trại Sen Vàng đã gửi hồ sơ chứng nhận VietGAP.</p>
                  <span className="text-[10px] text-[#707a6c] mt-1 block">10 phút trước</span>
                </div>
                <div className="p-2 rounded-lg bg-white border border-[#e0e4d9]">
                  <p className="font-semibold text-[#181d16]">Cảnh báo số dư Escrow</p>
                  <p className="text-[#40493d] mt-0.5">Hợp đồng #HD-2026-8842 đã khóa tiền thành công.</p>
                  <span className="text-[10px] text-[#707a6c] mt-1 block">40 phút trước</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Settings Button */}
        <button
          onClick={onOpenSettings}
          className="p-2 text-[#40493d] hover:bg-[#e0e4d9]/50 rounded-full transition-colors cursor-pointer"
          title="Cài đặt hệ thống"
        >
          <Settings className="w-5 h-5" />
        </button>

        {/* Admin Profile */}
        <div className="flex items-center space-x-3 pl-2 border-l border-[#e0e4d9]">
          <img
            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=120"
            alt="Quản trị viên"
            className="w-9 h-9 rounded-full object-cover border-2 border-[#176a22]"
          />
          <div className="hidden sm:block text-left text-xs">
            <p className="font-semibold text-[#181d16] leading-none">Quản trị viên Cấp Cao</p>
            <p className="text-[#707a6c] mt-0.5 text-[11px]">admin@agriconnect.vn</p>
          </div>
          
          {/* Logout Button */}
          <button
            onClick={() => {
              if (onLogout) onLogout();
              else window.location.href = '/';
            }}
            className="p-2 ml-2 text-[#ba1a1a] hover:bg-[#ffdad6] rounded-full transition-colors cursor-pointer flex items-center justify-center"
            title="Đăng xuất"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
};
