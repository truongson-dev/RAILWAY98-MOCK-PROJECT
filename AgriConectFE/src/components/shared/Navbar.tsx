'use client';

import React from 'react';
import { Search, Sprout, Bell } from 'lucide-react';
import Link from 'next/link';
import { useUIStore } from '@/store/uiStore';

export const Navbar: React.FC = () => {
  const {
    openMarketplace,
    openNotifications,
    unreadCount,
  } = useUIStore();

  return (
    <header className="sticky top-0 z-40 bg-[#f7fbf0]/90 backdrop-blur-md border-b border-[#e0e4d9]/60 px-4 lg:px-12 py-3.5 transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Brand Logo */}
        <a href="/" className="flex items-center gap-2 group">
          <div className="w-9 h-9 rounded-xl bg-[#176a22] flex items-center justify-center text-white shadow-sm group-hover:scale-105 transition-transform">
            <Sprout className="w-5 h-5" />
          </div>
          <span className="text-xl font-bold tracking-tight text-[#181d16]">
            Agri<span className="text-[#176a22]">Connect</span>
          </span>
        </a>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-[#40493d]">
          <button onClick={openMarketplace} className="hover:text-[#176a22] transition-colors">
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
            onClick={openMarketplace}
            className="p-2 text-[#40493d] hover:text-[#176a22] hover:bg-[#e0e4d9]/50 rounded-full transition-colors"
            title="Tìm kiếm nông sản"
            aria-label="Tìm kiếm"
          >
            <Search className="w-5 h-5" />
          </button>

          <button
            onClick={openNotifications}
            className="p-2 text-[#40493d] hover:text-[#176a22] hover:bg-[#e0e4d9]/50 rounded-full transition-colors relative"
            title="Thông báo"
            aria-label="Thông báo"
          >
            <Bell className="w-5 h-5" />
            {unreadCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center ring-2 ring-[#f7fbf0]">
                {unreadCount}
              </span>
            )}
          </button>

          <div className="h-4 w-px bg-[#bfcaba]/60 mx-1 hidden sm:block" />

          <Link
            href="/auth/login"
            className="hidden sm:inline-block px-4 py-2 text-sm font-semibold text-[#181d16] hover:text-[#176a22] transition-colors cursor-pointer"
          >
            Đăng nhập
          </Link>

          <Link
            href="/auth/register"
            className="px-5 py-2 text-sm font-semibold text-white bg-[#176a22] hover:bg-[#12531a] active:scale-95 rounded-full transition-all shadow-sm cursor-pointer"
          >
            Đăng ký
          </Link>
        </div>
      </div>
    </header>
  );
};
