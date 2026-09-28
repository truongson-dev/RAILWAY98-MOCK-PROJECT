import React, { useRef, useState } from 'react';
import { Search, SlidersHorizontal, Bell, User, Menu, Bot, Sparkles, Camera } from 'lucide-react';
import { useAuthStore } from '@/store/authStore';

const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8080';

interface HeaderProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onOpenNotifications: () => void;
  unreadNotifCount: number;
  onOpenMobileSidebar: () => void;
  onOpenAiChat?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  searchQuery,
  setSearchQuery,
  onOpenNotifications,
  unreadNotifCount,
  onOpenMobileSidebar,
  onOpenAiChat
}) => {
  const { user, token, updateUser } = useAuthStore();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!['image/jpeg', 'image/png', 'image/jpg'].includes(file.type)) {
      alert('Vui lòng chọn ảnh định dạng JPG hoặc PNG');
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      alert('Kích thước ảnh không được vượt quá 5MB');
      return;
    }

    try {
      setIsUploading(true);
      const formData = new FormData();
      formData.append('file', file);

      // 1. Upload ảnh lấy URL
      const uploadRes = await fetch(${API_BASE}/api/upload/avatar, {
        method: 'POST',
        headers: {
          Authorization: Bearer 
        },
        body: formData
      });
      
      if (!uploadRes.ok) throw new Error('Upload ảnh thất bại');
      const uploadData = await uploadRes.json();
      const avatarUrl = uploadData.data.url;

      // 2. Cập nhật profile User với ảnh mới
      const profileRes = await fetch(${API_BASE}/api/user/profile, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: Bearer 
        },
        body: JSON.stringify({ avatar: avatarUrl })
      });

      if (!profileRes.ok) throw new Error('Cập nhật hồ sơ thất bại');

      // 3. Cập nhật giao diện
      updateUser({ avatar: avatarUrl });
    } catch (error) {
      alert('Lỗi cập nhật ảnh đại diện: ' + (error as Error).message);
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const displayName = user?.name || 'Lê Văn Hùng';
  const roleDisplay = user?.role === 'Supplier' ? 'CHỦ TRANG TRẠI' : 'TÀI KHOẢN';

  return (
    <header className="sticky top-0 z-30 bg-[#f7fbf0]/90 backdrop-blur-md px-4 lg:px-8 py-3.5 border-b border-[#e0e4d9] flex items-center justify-between gap-4">
      {/* Left side: Mobile Toggle & Search Bar */}
      <div className="flex items-center gap-3 flex-1 max-w-2xl">
        <button
          onClick={onOpenMobileSidebar}
          className="lg:hidden p-2 text-[#3e483a] hover:bg-[#ebefe4] rounded-lg transition-colors"
          aria-label="Open sidebar"
        >
          <Menu size={22} />
        </button>

        <div className="relative w-full">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#5e6958]">
            <Search size={18} />
          </div>
          <input
            id="global-search-input"
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Tìm kiếm đơn hàng, sản phẩm..."
            className="w-full pl-10 pr-10 py-2.5 bg-[#ebefe4] border border-transparent focus:border-[#176a22] focus:bg-white text-[#181d16] text-sm rounded-full outline-none transition-all placeholder-[#707a6c]"
          />
          <button 
            id="search-filter-btn"
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-[#5e6958] hover:text-[#176a22] transition-colors"
            title="Bộ lọc nâng cao"
          >
            <SlidersHorizontal size={17} />
          </button>
        </div>
      </div>

      {/* Right side: Notifications, Messages, User Profile */}
      <div className="flex items-center gap-2 sm:gap-3 shrink-0">
        {onOpenAiChat && (
          <button
            id="header-ai-chat-btn"
            onClick={onOpenAiChat}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-[#c9ecc1] hover:bg-[#b2e4a8] text-[#176a22] rounded-full text-xs font-bold transition-all shadow-2xs cursor-pointer"
            title="Mở Trợ lý AI"
          >
            <Bot size={17} />
            <span className="hidden md:inline">Trợ Lý AI</span>
            <Sparkles size={12} />
          </button>
        )}

        <button
          id="header-notif-btn"
          onClick={onOpenNotifications}
          className="relative p-2.5 text-[#3e483a] hover:text-[#176a22] hover:bg-[#ebefe4] rounded-full transition-colors"
          title="Thông báo"
        >
          <Bell size={20} />
          {unreadNotifCount > 0 && (
            <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-[#ba1a1a] rounded-full ring-2 ring-[#f7fbf0]" />
          )}
        </button>

        <div className="h-6 w-px bg-[#d0d6c7] mx-1 hidden sm:block" />

        {/* User Profile Info */}
        <div className="flex items-center gap-3 pl-1">
          <div className="text-right hidden sm:block">
            <h4 className="text-sm font-semibold text-[#181d16] leading-snug">
              {displayName}
            </h4>
            <p className="text-[11px] uppercase tracking-wider font-semibold text-[#5e6958]">
              {roleDisplay}
            </p>
          </div>
          
          <div 
            onClick={handleAvatarClick}
            className="relative w-10 h-10 rounded-full bg-[#358439] text-white flex items-center justify-center font-semibold text-sm shadow-xs border-2 border-white shrink-0 cursor-pointer group"
            title="Thay đổi ảnh đại diện"
          >
            {user?.avatar ? (
              <img src={API_BASE + user.avatar} alt="Avatar" className="w-full h-full rounded-full object-cover" />
            ) : (
              <User size={20} />
            )}
            
            {/* Overlay Icon for Edit */}
            <div className="absolute inset-0 bg-black/40 rounded-full opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
              <Camera size={16} />
            </div>

            {isUploading && (
              <div className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              </div>
            )}
          </div>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/jpeg,image/png,image/jpg"
            className="hidden"
          />
        </div>
      </div>
    </header>
  );
};
