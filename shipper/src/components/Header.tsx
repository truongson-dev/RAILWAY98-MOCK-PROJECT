import React, { useState } from 'react';
import { Search, Bell, Settings, Menu, SlidersHorizontal, X } from 'lucide-react';
import { NotificationItem, NavigationTab } from '../types';
import { SearchResultsOverlay } from './SearchResultsOverlay';
import { NotificationPopover } from './NotificationPopover';

interface HeaderProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  notifications: NotificationItem[];
  onMarkNotificationRead: (id: string) => void;
  onOpenMobileMenu: () => void;
  onNavigateTab: (tab: NavigationTab) => void;
  onOpenProfile?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  searchTerm,
  setSearchTerm,
  notifications,
  onMarkNotificationRead,
  onOpenMobileMenu,
  onNavigateTab,
  onOpenProfile
}) => {
  const [showNotifDropdown, setShowNotifDropdown] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [showSearchOverlay, setShowSearchOverlay] = useState(false);

  const unreadCount = notifications.filter(n => !n.read).length;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setSearchTerm(val);
    
    // Do NOT open overlay automatically while typing; close if user clears text completely
    if (val.trim().length === 0) {
      setShowSearchOverlay(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      setShowSearchOverlay(true);
    }
  };

  const handleTriggerSearch = () => {
    setShowSearchOverlay(true);
  };

  const handleSelectKeyword = (kw: string) => {
    setSearchTerm(kw);
    setShowSearchOverlay(true);
  };

  return (
    <header className="h-20 bg-[#f7fbf0] flex items-center justify-between px-4 sm:px-6 border-b border-[#bfcaba] z-30 sticky top-0 shadow-2xs">
      <div className="flex items-center flex-1 gap-3 md:gap-6">
        {/* Mobile menu toggle */}
        <button
          onClick={onOpenMobileMenu}
          className="md:hidden p-2 rounded-lg text-[#40493d] hover:bg-[#e5eadf] transition-colors"
          aria-label="Open menu"
        >
          <Menu className="w-6 h-6" />
        </button>

        {/* Global Search */}
        <div className="relative max-w-lg w-full">
          <div className="relative flex items-center">
            <Search 
              onClick={handleTriggerSearch}
              className="w-4 h-4 absolute left-3 text-[#40493d] cursor-pointer hover:text-[#176a22] transition-colors" 
            />
            <input
              type="text"
              value={searchTerm}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              placeholder="Nhập biển số xe, tên tài xế, mã đơn hàng..."
              className="w-full pl-9 pr-24 py-2 bg-white border border-[#bfcaba] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#176a22] focus:border-[#176a22] transition-shadow text-[#181d16] shadow-2xs"
            />
            {searchTerm && (
              <button
                onClick={() => {
                  setSearchTerm('');
                  setShowSearchOverlay(false);
                }}
                className="absolute right-16 p-1 text-[#40493d] hover:text-[#181d16] hover:bg-[#e5eadf] rounded-full transition-colors"
                title="Xóa từ khóa"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
            <button
              onClick={handleTriggerSearch}
              className="absolute right-2 px-3 py-1 bg-[#176a22] text-white text-xs font-semibold rounded-lg hover:bg-[#12541a] transition-colors flex items-center gap-1 shadow-2xs"
            >
              <SlidersHorizontal className="w-3 h-3" />
              Tìm
            </button>
          </div>

          {/* Quick search suggestion tags below search bar */}
          <div className="hidden lg:flex items-center gap-1.5 mt-1 text-[11px] text-[#40493d]">
            <span className="text-[10px] uppercase tracking-wider font-semibold text-[#176a22]">Gợi ý từ khóa:</span>
            {[
              { label: '29H-123.45', type: 'fleet' },
              { label: 'Nguyễn Văn A', type: 'fleet' },
              { label: '#AG-5012', type: 'orders' },
              { label: '#AG-4988', type: 'orders' },
              { label: '#AG-5011', type: 'orders' }
            ].map((kw, i) => (
              <button
                key={i}
                onClick={() => handleSelectKeyword(kw.label)}
                className="px-2 py-0.5 bg-[#e5eadf] hover:bg-[#176a22] hover:text-white rounded text-[11px] font-medium transition-colors"
              >
                {kw.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2 md:gap-4">
        {/* Search Results Overlay Component */}
        <SearchResultsOverlay
          isOpen={showSearchOverlay}
          onClose={() => setShowSearchOverlay(false)}
          searchTerm={searchTerm}
          onSelectSearchTag={(tag) => {
            setSearchTerm(tag);
            setShowSearchOverlay(true);
          }}
          onAssignTruck={(plate) => {
            alert(`Đã gán xe ${plate} thành công cho chuyến hàng mới!`);
          }}
          onCreateNewShipment={() => {
            onNavigateTab('shipments');
          }}
          onViewAllResults={() => {
            onNavigateTab('shipments_list');
          }}
        />

        {/* Notifications Button */}
        <div className="relative">
          <button
            onClick={() => setShowNotifDropdown(!showNotifDropdown)}
            className="w-10 h-10 rounded-full flex items-center justify-center text-[#40493d] hover:bg-[#e5eadf] transition-colors relative"
            title="Thông báo"
          >
            <Bell className="w-5 h-5" />
            {unreadCount > 0 && (
              <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-red-600 rounded-full border-2 border-[#f7fbf0] animate-pulse" />
            )}
          </button>

          {/* Notifications Popover */}
          <NotificationPopover
            isOpen={showNotifDropdown}
            onClose={() => setShowNotifDropdown(false)}
            onMarkAllRead={() => {
              notifications.forEach(n => onMarkNotificationRead(n.id));
              alert('Đã đánh dấu tất cả thông báo là đã đọc');
            }}
            onViewAllActivities={() => {
              onNavigateTab('shipments_list');
            }}
          />
        </div>

        {/* Settings Button */}
        <button
          onClick={() => setShowSettingsModal(!showSettingsModal)}
          className="w-10 h-10 rounded-full flex items-center justify-center text-[#40493d] hover:bg-[#e5eadf] transition-colors"
          title="Cài đặt"
        >
          <Settings className="w-5 h-5" />
        </button>

        <div className="h-8 w-px bg-[#bfcaba] mx-1 hidden sm:block" />

        {/* User Profile */}
        <div 
          onClick={onOpenProfile}
          className="flex items-center gap-3 pl-1 cursor-pointer group hover:opacity-85 transition-opacity"
          title="Xem Hồ sơ & CV Nguyễn Minh Anh"
        >
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuC5FGJTm53QiP48WIfv4cxwNJmQPgD6K1JLkIOSwyHJRB31pbVtk3s_DT6QAq5l1lEe-ViZW2rx_74AEIqmKMdUTf53t1IKch5eqI94DQ2n0A_a3dAIFjMGw7Py-uDttVLLbsfIuJOQPzo3CW9aL2ZTH2seKMB8lhK0kj9X_aZ6oTvVKg50UIiOV0Y0KoHjqoR1XDd8ILWPtVTrtTR9OzsQNZ9mjSkB7P6AFymRaynYIvmmHE3LJ3KR"
            alt="Nguyễn Minh Anh"
            className="w-9 h-9 rounded-full object-cover ring-2 ring-white shadow-sm group-hover:ring-[#176a22] transition-all"
          />
          <div className="hidden md:block">
            <span className="font-semibold text-sm text-[#181d16] block leading-snug group-hover:text-[#176a22] transition-colors">
              Nguyễn Minh Anh
            </span>
            <span className="text-[11px] text-[#40493d] block">Điều phối viên cao cấp</span>
          </div>
        </div>
      </div>

      {/* Settings Modal */}
      {showSettingsModal && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl border border-[#bfcaba]">
            <h3 className="font-bold text-lg text-[#181d16] mb-4 flex items-center gap-2">
              <Settings className="w-5 h-5 text-[#176a22]" />
              Cấu hình hệ thống AgriShipper
            </h3>
            <div className="space-y-4 text-sm text-[#181d16]">
              <div className="flex justify-between items-center p-3 bg-[#f7fbf0] rounded-xl border border-[#bfcaba]">
                <span>Tự động tối ưu hóa lộ trình</span>
                <input type="checkbox" defaultChecked className="accent-[#176a22] w-4 h-4 cursor-pointer" />
              </div>
              <div className="flex justify-between items-center p-3 bg-[#f7fbf0] rounded-xl border border-[#bfcaba]">
                <span>Cảnh báo biến động nhiệt độ thùng lạnh</span>
                <input type="checkbox" defaultChecked className="accent-[#176a22] w-4 h-4 cursor-pointer" />
              </div>
              <div className="flex justify-between items-center p-3 bg-[#f7fbf0] rounded-xl border border-[#bfcaba]">
                <span>Âm thanh thông báo chuyến hàng mới</span>
                <input type="checkbox" defaultChecked className="accent-[#176a22] w-4 h-4 cursor-pointer" />
              </div>
            </div>
            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setShowSettingsModal(false)}
                className="px-4 py-2 bg-[#176a22] text-white rounded-lg font-medium text-sm hover:bg-[#12541a] transition-colors"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
