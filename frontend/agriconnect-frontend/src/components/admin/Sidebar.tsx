'use client';
// Đây là component thuộc giao diện Admin
import React from 'react';
import {
  Home,
  Users,
  ShieldCheck,
  Package,
  Warehouse,
  ShoppingCart,
  Truck,
  FileText,
  Landmark,
  BarChart3,
  Sparkles,
  Settings,
  Download,
  Sprout
} from 'lucide-react';
import { NavTab } from '@/types/admin.types';

interface SidebarProps {
  activeTab: NavTab;
  onSelectTab: (tab: NavTab) => void;
  onOpenExportModal: () => void;
  pendingKycCount?: number;
}

// Component: Sidebar - Giao diện quản lý/hiển thị cho Admin
export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  onSelectTab,
  onOpenExportModal,
  pendingKycCount = 14
}) => {
  const isActive = (tab: NavTab) => activeTab === tab;

  return (
    <aside className="w-[260px] min-w-[260px] bg-[#f7fbf0] border-r border-[#e0e4d9] flex flex-col justify-between h-screen sticky top-0 select-none overflow-y-auto custom-scrollbar">
      {/* Brand Header */}
      <div>
        <div className="p-6 pb-4">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg bg-[#176a22] flex items-center justify-center text-white shadow-xs">
              <Sprout className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-[#176a22] tracking-tight leading-none">
                AgriConnect
              </h1>
              <p className="text-xs text-[#707a6c] mt-1 font-medium">
                Cổng Quản Trị Viên Cấp Cao
              </p>
            </div>
          </div>
        </div>

        {/* Navigation Section */}
        <nav className="px-3 space-y-1 text-sm font-medium">
          {/* Tổng quan */}
          <button
            onClick={() => onSelectTab('overview')}
            className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-xl transition-all cursor-pointer ${
              isActive('overview')
                ? 'bg-[#a3f69c] text-[#003808] font-semibold shadow-xs'
                : 'text-[#40493d] hover:bg-[#e0e4d9]/60'
            }`}
          >
            <Home className="w-4 h-4 shrink-0" />
            <span>Tổng quan</span>
          </button>

          {/* Người dùng */}
          <button
            onClick={() => onSelectTab('users')}
            className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-xl transition-all cursor-pointer ${
              activeTab.startsWith('users')
                ? 'bg-[#a3f69c] text-[#003808] font-semibold shadow-xs'
                : 'text-[#40493d] hover:bg-[#e0e4d9]/60'
            }`}
          >
            <Users className="w-4 h-4 shrink-0" />
            <span>Người dùng</span>
          </button>

          {/* Phê duyệt hồ sơ */}
          <button
            onClick={() => onSelectTab('kyc')}
            className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl transition-all cursor-pointer ${
              isActive('kyc')
                ? 'bg-[#a3f69c] text-[#003808] font-semibold shadow-xs'
                : 'text-[#40493d] hover:bg-[#e0e4d9]/60'
            }`}
          >
            <div className="flex items-center space-x-3">
              <ShieldCheck className="w-4 h-4 shrink-0" />
              <span>Phê duyệt hồ sơ</span>
            </div>
            {pendingKycCount > 0 && (
              <span className="bg-[#ba1a1a] text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                {pendingKycCount}
              </span>
            )}
          </button>

          {/* Sản phẩm */}
          <button
            onClick={() => onSelectTab('products')}
            className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-xl transition-all cursor-pointer ${
              activeTab.startsWith('products')
                ? 'bg-[#a3f69c] text-[#003808] font-semibold shadow-xs'
                : 'text-[#40493d] hover:bg-[#e0e4d9]/60'
            }`}
          >
            <Package className="w-4 h-4 shrink-0" />
            <span>Sản phẩm</span>
          </button>

          {/* Kho & Mùa vụ */}
          <button
            onClick={() => onSelectTab('inventory')}
            className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-xl transition-all cursor-pointer ${
              isActive('inventory')
                ? 'bg-[#a3f69c] text-[#003808] font-semibold shadow-xs'
                : 'text-[#40493d] hover:bg-[#e0e4d9]/60'
            }`}
          >
            <Warehouse className="w-4 h-4 shrink-0" />
            <span>Kho & Mùa vụ</span>
          </button>

          {/* Đơn hàng */}
          <button
            onClick={() => onSelectTab('orders')}
            className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-xl transition-all cursor-pointer ${
              isActive('orders')
                ? 'bg-[#a3f69c] text-[#003808] font-semibold shadow-xs'
                : 'text-[#40493d] hover:bg-[#e0e4d9]/60'
            }`}
          >
            <ShoppingCart className="w-4 h-4 shrink-0" />
            <span>Đơn hàng</span>
          </button>

          {/* Vận chuyển */}
          <button
            onClick={() => onSelectTab('shipping')}
            className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-xl transition-all cursor-pointer ${
              isActive('shipping')
                ? 'bg-[#a3f69c] text-[#003808] font-semibold shadow-xs'
                : 'text-[#40493d] hover:bg-[#e0e4d9]/60'
            }`}
          >
            <Truck className="w-4 h-4 shrink-0" />
            <span>Vận chuyển</span>
          </button>

          {/* Hợp đồng */}
          <button
            onClick={() => onSelectTab('contracts')}
            className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-xl transition-all cursor-pointer ${
              isActive('contracts')
                ? 'bg-[#a3f69c] text-[#003808] font-semibold shadow-xs'
                : 'text-[#40493d] hover:bg-[#e0e4d9]/60'
            }`}
          >
            <FileText className="w-4 h-4 shrink-0" />
            <span>Hợp đồng</span>
          </button>


          {/* Tín dụng */}
          <button
            onClick={() => onSelectTab('credit')}
            className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-xl transition-all cursor-pointer ${
              isActive('credit')
                ? 'bg-[#a3f69c] text-[#003808] font-semibold shadow-xs'
                : 'text-[#40493d] hover:bg-[#e0e4d9]/60'
            }`}
          >
            <Landmark className="w-4 h-4 shrink-0" />
            <span>Tín dụng</span>
          </button>

          {/* AI Phân tích */}
          <button
            onClick={() => onSelectTab('ai-analytics')}
            className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-xl transition-all cursor-pointer ${
              isActive('ai-analytics')
                ? 'bg-[#a3f69c] text-[#003808] font-semibold shadow-xs'
                : 'text-[#40493d] hover:bg-[#e0e4d9]/60'
            }`}
          >
            <Sparkles className="w-4 h-4 shrink-0 text-[#176a22]" />
            <span>AI Phân tích</span>
          </button>

          {/* Hệ thống */}
          <button
            onClick={() => onSelectTab('system')}
            className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-xl transition-all cursor-pointer ${
              isActive('system')
                ? 'bg-[#a3f69c] text-[#003808] font-semibold shadow-xs'
                : 'text-[#40493d] hover:bg-[#e0e4d9]/60'
            }`}
          >
            <Settings className="w-4 h-4 shrink-0" />
            <span>Hệ thống</span>
          </button>
        </nav>
      </div>

      {/* Bottom Export Button */}
      <div className="p-4 border-t border-[#e0e4d9]">
        <button
          onClick={onOpenExportModal}
          className="w-full flex items-center justify-center space-x-2 bg-[#176a22] hover:bg-[#13561b] text-white py-2.5 px-4 rounded-xl font-medium shadow-sm transition-colors cursor-pointer text-sm"
        >
          <Download className="w-4 h-4" />
          <span>Xuất Báo Cáo</span>
        </button>
      </div>
    </aside>
  );
};
