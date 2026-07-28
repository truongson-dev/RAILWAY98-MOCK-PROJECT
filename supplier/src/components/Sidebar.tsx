import React from 'react';
import { 
  LayoutGrid, 
  Tractor, 
  Handshake,
  Truck, 
  Warehouse, 
  BarChart3, 
  Plus, 
  HelpCircle, 
  Settings,
  X
} from 'lucide-react';
import { TabType } from '../types';

interface SidebarProps {
  currentTab: TabType;
  setCurrentTab: (tab: TabType) => void;
  onOpenAddProductModal: () => void;
  isOpenMobile: boolean;
  setIsOpenMobile: (open: boolean) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentTab,
  setCurrentTab,
  onOpenAddProductModal,
  isOpenMobile,
  setIsOpenMobile
}) => {
  const navItems = [
    { id: 'dashboard' as TabType, label: 'Tổng quan', icon: LayoutGrid },
    { id: 'farm-management' as TabType, label: 'Quản lý Nông trại', icon: Tractor },
    { id: 'forward-contracts' as TabType, label: 'Hợp Đồng Tương Lai', icon: Handshake },
    { id: 'order-tracking' as TabType, label: 'Theo dõi Đơn hàng', icon: Truck },
    { id: 'inventory' as TabType, label: 'Quản lý Kho hàng', icon: Warehouse },
    { id: 'analytics' as TabType, label: 'Báo cáo & Phân tích', icon: BarChart3 },
  ];

  const handleSelectTab = (tab: TabType) => {
    setCurrentTab(tab);
    setIsOpenMobile(false);
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpenMobile && (
        <div 
          className="fixed inset-0 bg-black/40 z-40 lg:hidden backdrop-blur-xs transition-opacity"
          onClick={() => setIsOpenMobile(false)}
        />
      )}

      {/* Sidebar Container */}
      <aside 
        id="app-sidebar"
        className={`fixed top-0 left-0 bottom-0 z-50 w-[260px] bg-[#ebefe4] text-[#181d16] flex flex-col justify-between border-r border-[#d8decb] transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isOpenMobile ? 'translate-x-0 shadow-2xl' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="flex flex-col h-full py-6 px-4">
          {/* Header / Brand */}
          <div className="flex items-start justify-between px-3 mb-8">
            <div>
              <h1 className="text-xl font-bold text-[#176a22] tracking-tight leading-snug">
                AgriConnect
              </h1>
              <p className="text-xs text-[#525d4e] font-medium tracking-wide">
                Cổng Nhà Cung Cấp
              </p>
            </div>
            <button 
              onClick={() => setIsOpenMobile(false)}
              className="lg:hidden p-1 text-[#525d4e] hover:text-[#176a22] rounded-lg hover:bg-[#dfe6d4]"
              aria-label="Đóng menu"
            >
              <X size={20} />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1.5 flex-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  id={`nav-item-${item.id}`}
                  onClick={() => handleSelectTab(item.id)}
                  className={`relative w-full flex items-center gap-3.5 px-3.5 py-3 rounded-lg text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-[#dbe6cf] text-[#176a22] font-semibold'
                      : 'text-[#3e483a] hover:bg-[#e0e8d6] hover:text-[#181d16]'
                  }`}
                >
                  {/* Left Active Line */}
                  {isActive && (
                    <span className="absolute left-0 top-1.5 bottom-1.5 w-1 bg-[#176a22] rounded-r-full" />
                  )}
                  <Icon size={19} className={isActive ? 'text-[#176a22]' : 'text-[#576352]'} />
                  <span className="flex-1 text-left">{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Bottom Actions */}
          <div className="pt-4 border-t border-[#d8decb] space-y-3">
            {/* Add New Product CTA Button */}
            <button
              id="sidebar-add-product-btn"
              onClick={() => {
                onOpenAddProductModal();
                setIsOpenMobile(false);
              }}
              className="w-full bg-[#176a22] hover:bg-[#12541b] active:bg-[#0e4315] text-white py-3.5 px-4 rounded-xl font-semibold flex items-center justify-center gap-2 shadow-sm transition-all hover:shadow text-sm cursor-pointer"
            >
              <Plus size={20} strokeWidth={2.5} />
              <span>Thêm sản phẩm mới</span>
            </button>

            {/* Support & Settings */}
            <div className="space-y-1 pt-1">
              <button
                id="nav-item-support"
                onClick={() => handleSelectTab('support')}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  currentTab === 'support' 
                    ? 'bg-[#dbe6cf] text-[#176a22] font-semibold' 
                    : 'text-[#3e483a] hover:bg-[#e0e8d6]'
                }`}
              >
                <HelpCircle size={18} className="text-[#576352]" />
                <span>Trợ giúp & Hỗ trợ</span>
              </button>

              <button
                id="nav-item-settings"
                onClick={() => handleSelectTab('settings')}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  currentTab === 'settings' 
                    ? 'bg-[#dbe6cf] text-[#176a22] font-semibold' 
                    : 'text-[#3e483a] hover:bg-[#e0e8d6]'
                }`}
              >
                <Settings size={18} className="text-[#576352]" />
                <span>Cài đặt hệ thống</span>
              </button>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};
