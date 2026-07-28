import React from 'react';
import { 
  LayoutDashboard, 
  Map, 
  History, 
  Truck, 
  Package, 
  ListCheck, 
  Activity, 
  LogOut, 
  Tractor,
  X 
} from 'lucide-react';
import { NavigationTab } from '../types';

interface SidebarProps {
  activeTab: NavigationTab;
  setActiveTab: (tab: NavigationTab) => void;
  onOpenSystemStatus: () => void;
  onLogout: () => void;
  isOpenMobile: boolean;
  setIsOpenMobile: (open: boolean) => void;
  pendingCount: number;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  setActiveTab,
  onOpenSystemStatus,
  onLogout,
  isOpenMobile,
  setIsOpenMobile,
  pendingCount
}) => {
  const navItems: { id: NavigationTab; label: string; icon: React.ReactNode }[] = [
    { id: 'dashboard', label: 'Tổng quan', icon: <LayoutDashboard className="w-5 h-5" /> },
    { id: 'routes', label: 'Quản lý lộ trình vận chuyển', icon: <Map className="w-5 h-5" /> },
    { id: 'history', label: 'Lịch sử giao hàng', icon: <History className="w-5 h-5" /> },
    { id: 'fleet', label: 'Quản lý đội xe', icon: <Truck className="w-5 h-5" /> },
    { id: 'shipments', label: 'Vận chuyển', icon: <Package className="w-5 h-5" /> },
    { id: 'shipments_list', label: 'Danh sách đơn vận chuyển', icon: <ListCheck className="w-5 h-5" /> },
  ];

  const sidebarContent = (
    <div className="h-full flex flex-col justify-between">
      {/* Brand Header */}
      <div>
        <div className="h-20 flex items-center justify-between px-6 border-b border-dashed border-[#bfcaba]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#176a22] rounded-lg flex items-center justify-center text-white shadow-sm">
              <Tractor className="w-6 h-6" />
            </div>
            <div>
              <h1 className="font-bold text-[#176a22] leading-tight text-lg">AgriShipper</h1>
              <p className="text-[10px] text-[#40493d] uppercase tracking-tighter font-semibold">Tài xế đối tác</p>
            </div>
          </div>
          {isOpenMobile && (
            <button 
              onClick={() => setIsOpenMobile(false)}
              className="md:hidden text-[#40493d] p-1 rounded-lg hover:bg-[#e5eadf]"
            >
              <X className="w-6 h-6" />
            </button>
          )}
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 px-4 py-6 space-y-1.5 overflow-y-auto max-h-[calc(100vh-180px)]">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setIsOpenMobile(false);
                }}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-[#176a22] text-white font-semibold shadow-sm'
                    : 'text-[#40493d] hover:bg-[#e5eadf] hover:text-[#181d16]'
                }`}
              >
                <div className="flex items-center gap-3 text-left">
                  <span className={isActive ? 'text-white' : 'text-[#40493d]'}>
                    {item.icon}
                  </span>
                  <span className="leading-tight">{item.label}</span>
                </div>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Bottom Sidebar Buttons */}
      <div className="p-4 border-t border-dashed border-[#bfcaba] space-y-2 bg-[#f7fbf0]">
        <button
          onClick={onOpenSystemStatus}
          className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-[#40493d] hover:bg-[#e5eadf] transition-colors font-medium text-sm text-left"
        >
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-600"></span>
          </span>
          <Activity className="w-4 h-4 text-emerald-600 ml-1" />
          <span>Trạng thái hệ thống</span>
        </button>

        <button
          onClick={onLogout}
          className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-red-600 hover:bg-red-50 transition-colors font-medium text-sm text-left"
        >
          <LogOut className="w-4 h-4 text-red-600" />
          <span>Đăng xuất</span>
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="w-64 bg-[#f7fbf0] border-r border-[#bfcaba] flex-col flex-shrink-0 hidden md:flex z-20 h-screen sticky top-0">
        {sidebarContent}
      </aside>

      {/* Mobile Sidebar Overlay */}
      {isOpenMobile && (
        <div className="fixed inset-0 z-50 md:hidden flex">
          <div 
            className="fixed inset-0 bg-black/40 backdrop-blur-xs" 
            onClick={() => setIsOpenMobile(false)}
          />
          <aside className="relative w-72 max-w-[80vw] bg-[#f7fbf0] h-full shadow-2xl z-50 flex flex-col">
            {sidebarContent}
          </aside>
        </div>
      )}
    </>
  );
};
