import React from 'react';
import {
  Store,
  Users,
  FileText,
  ShoppingBag,
  Bot,
  LogOut,
  Sparkles,
  Check,
  CreditCard,
} from 'lucide-react';
import { CategoryType, FilterState } from './types';

const USER_AVATAR = 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&auto=format&fit=crop';

interface SidebarProps {
  activeTab: 'marketplace' | 'groupbuying' | 'futurecontracts' | 'credit' | 'orders' | 'aiassistant';
  onSelectTab: (tab: 'marketplace' | 'groupbuying' | 'futurecontracts' | 'credit' | 'orders' | 'aiassistant') => void;
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
  isOpenMobile: boolean;
  onCloseMobile: () => void;
  onLogout: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  onSelectTab,
  filters,
  onFilterChange,
  isOpenMobile,
  onCloseMobile,
  onLogout,
}) => {
  const toggleCategory = (cat: CategoryType) => {
    const exists = filters.categories.includes(cat);
    const updated = exists
      ? filters.categories.filter((c) => c !== cat)
      : [...filters.categories, cat];
    onFilterChange({ ...filters, categories: updated });
  };

  const navItems = [
    { id: 'marketplace', label: 'Sàn giao dịch', icon: Store, badge: null },
    { id: 'groupbuying', label: 'Mua chung Sỉ', icon: Users, badge: null },
    { id: 'futurecontracts', label: 'Hợp đồng Tương lai', icon: FileText, badge: null },
    { id: 'credit', label: 'Tín dụng Partner', icon: CreditCard, badge: '500Tr' },
    { id: 'orders', label: 'Đơn hàng', icon: ShoppingBag, badge: '3' },
    { id: 'aiassistant', label: 'Trợ lý AI', icon: Bot, badge: 'Gemini' },
  ] as const;

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpenMobile && (
        <div
          onClick={onCloseMobile}
          className="fixed inset-0 bg-black/40 z-40 md:hidden backdrop-blur-xs"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`w-[260px] h-screen fixed left-0 top-0 bg-[#f1f5ea] border-r border-[#bfcaba] flex flex-col p-4 z-50 transition-transform duration-300 ${
          isOpenMobile ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        {/* Brand Header */}
        <div className="mb-6 px-2">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#176a22] flex items-center justify-center text-white font-black text-lg">
              A
            </div>
            <div>
              <h1 className="text-2xl font-bold text-[#176a22] leading-tight tracking-tight">
                AgriConnect
              </h1>
              <p className="text-xs text-[#40493d]/80 font-medium">
                Sàn Nông Sản Bán Buôn
              </p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1 overflow-y-auto hide-scrollbar pr-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  onSelectTab(item.id);
                  onCloseMobile();
                }}
                className={`w-full flex items-center justify-between gap-3 px-3.5 py-2.5 rounded-xl font-medium text-sm transition-all duration-200 ${
                  isActive
                    ? 'bg-[#358439] text-white shadow-xs font-semibold'
                    : 'text-[#40493d] hover:bg-[#e5eadf] hover:text-[#181d16]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className="w-5 h-5 shrink-0" />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span
                    className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold uppercase tracking-wider ${
                      isActive
                        ? 'bg-white/20 text-white'
                        : item.id === 'aiassistant'
                        ? 'bg-[#9d3c5f]/15 text-[#9d3c5f]'
                        : 'bg-[#176a22]/10 text-[#176a22]'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}

          {/* Filters Section */}
          <div className="pt-6 pb-2 px-3">
            <span className="text-xs font-bold text-[#707a6c] uppercase tracking-wider">
              Bộ lọc Danh mục
            </span>
          </div>

          <div className="px-3 space-y-2.5">
            <label className="flex items-center gap-3 cursor-pointer group select-none">
              <input
                type="checkbox"
                checked={filters.categories.includes('Vegetables')}
                onChange={() => toggleCategory('Vegetables')}
                className="rounded border-[#707a6c] text-[#176a22] focus:ring-[#176a22] h-4 w-4 accent-[#176a22]"
              />
              <span className="text-sm text-[#40493d] group-hover:text-[#176a22] transition-colors">
                Rau củ
              </span>
            </label>

            <label className="flex items-center gap-3 cursor-pointer group select-none">
              <input
                type="checkbox"
                checked={filters.categories.includes('Fruits')}
                onChange={() => toggleCategory('Fruits')}
                className="rounded border-[#707a6c] text-[#176a22] focus:ring-[#176a22] h-4 w-4 accent-[#176a22]"
              />
              <span className="text-sm text-[#40493d] group-hover:text-[#176a22] transition-colors">
                Trái cây
              </span>
            </label>

            <label className="flex items-center gap-3 cursor-pointer group select-none">
              <input
                type="checkbox"
                checked={filters.categories.includes('Grains')}
                onChange={() => toggleCategory('Grains')}
                className="rounded border-[#707a6c] text-[#176a22] focus:ring-[#176a22] h-4 w-4 accent-[#176a22]"
              />
              <span className="text-sm text-[#40493d] group-hover:text-[#176a22] transition-colors">
                Hạt & Ngũ cốc
              </span>
            </label>

            <label className="flex items-center gap-3 cursor-pointer group select-none">
              <input
                type="checkbox"
                checked={filters.categories.includes('Roots')}
                onChange={() => toggleCategory('Roots')}
                className="rounded border-[#707a6c] text-[#176a22] focus:ring-[#176a22] h-4 w-4 accent-[#176a22]"
              />
              <span className="text-sm text-[#40493d] group-hover:text-[#176a22] transition-colors">
                Củ & Nông sản củ
              </span>
            </label>
          </div>

          {/* Quality Filters */}
          <div className="pt-4 pb-2 px-3">
            <span className="text-xs font-bold text-[#707a6c] uppercase tracking-wider">
              Tiêu chuẩn Chất lượng
            </span>
          </div>

          <div className="px-3 space-y-2">
            <button
              onClick={() =>
                onFilterChange({ ...filters, vietgapOnly: !filters.vietgapOnly })
              }
              className={`w-full text-left text-xs px-2.5 py-1.5 rounded-lg font-semibold flex items-center justify-between border transition-all ${
                filters.vietgapOnly
                  ? 'bg-[#176a22] text-white border-[#176a22]'
                  : 'bg-white/60 text-[#40493d] border-[#bfcaba] hover:bg-white'
              }`}
            >
              <span>Chuẩn VietGAP</span>
              {filters.vietgapOnly && <Check className="w-3.5 h-3.5" />}
            </button>

            <button
              onClick={() =>
                onFilterChange({ ...filters, organicOnly: !filters.organicOnly })
              }
              className={`w-full text-left text-xs px-2.5 py-1.5 rounded-lg font-semibold flex items-center justify-between border transition-all ${
                filters.organicOnly
                  ? 'bg-[#176a22] text-white border-[#176a22]'
                  : 'bg-white/60 text-[#40493d] border-[#bfcaba] hover:bg-white'
              }`}
            >
              <span>Chuẩn Hữu Cơ (Organic)</span>
              {filters.organicOnly && <Check className="w-3.5 h-3.5" />}
            </button>

            <button
              onClick={() =>
                onFilterChange({
                  ...filters,
                  exportGradeOnly: !filters.exportGradeOnly,
                })
              }
              className={`w-full text-left text-xs px-2.5 py-1.5 rounded-lg font-semibold flex items-center justify-between border transition-all ${
                filters.exportGradeOnly
                  ? 'bg-[#176a22] text-white border-[#176a22]'
                  : 'bg-white/60 text-[#40493d] border-[#bfcaba] hover:bg-white'
              }`}
            >
              <span>Chuẩn Xuất Khẩu</span>
              {filters.exportGradeOnly && <Check className="w-3.5 h-3.5" />}
            </button>
          </div>
        </nav>

        {/* User Partner Portal Section at Bottom */}
        <div className="mt-auto pt-3 border-t border-[#bfcaba] flex items-center gap-3 px-2">
          <div className="w-10 h-10 rounded-full bg-[#c9ecc1] flex items-center justify-center overflow-hidden shrink-0 border border-[#176a22]/30">
            <img
              src={USER_AVATAR}
              alt="Cổng đối tác"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-bold text-[#181d16] truncate">
              Cổng đối tác
            </p>
            <p className="text-xs text-[#40493d] truncate">Hạng Tiêu chuẩn</p>
          </div>
          <button
            onClick={onLogout}
            className="p-1.5 text-[#40493d] hover:text-[#176a22] hover:bg-[#e5eadf] rounded-lg transition-colors"
            title="Đăng xuất / Chuyển tài khoản"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </aside>
    </>
  );
};
