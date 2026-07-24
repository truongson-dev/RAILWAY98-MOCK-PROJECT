'use client';

import React from 'react';
import { Sidebar } from '@/components/shared/Sidebar';
import { Package, BarChart2, Tractor, FileText } from 'lucide-react';
import { ROUTES } from '@/config/routes';

const SIDEBAR_ITEMS = [
  { href: ROUTES.SUPPLIER_PRODUCTS, label: 'Sản phẩm', icon: <Package className="w-5 h-5" /> },
  { href: ROUTES.SUPPLIER_LOGS, label: 'Nhật ký sản xuất', icon: <FileText className="w-5 h-5" /> },
  { href: ROUTES.SUPPLIER, label: 'Tổng quan', icon: <BarChart2 className="w-5 h-5" /> },
];

export const SupplierDashboard: React.FC = () => {
  return (
    <div className="flex min-h-screen w-full">
      <Sidebar items={SIDEBAR_ITEMS} title="Nhà Cung Cấp" />
      <div className="flex-1 p-8">
        <div className="max-w-5xl mx-auto space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#176a22] text-white flex items-center justify-center">
              <Tractor className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-[#181d16]">Dashboard Nhà Cung Cấp</h1>
              <p className="text-sm text-[#40493d]">Quản lý sản phẩm, nhật ký canh tác và đơn hàng</p>
            </div>
          </div>

          {/* Stats cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { label: 'Sản phẩm niêm yết', value: '12', change: '+2 tháng này' },
              { label: 'Đơn hàng đang xử lý', value: '5', change: '2 chờ xác nhận' },
              { label: 'Doanh thu tháng 7', value: '580M VNĐ', change: '+18% so với T6' },
            ].map((s) => (
              <div key={s.label} className="bg-white border border-[#e0e4d9] rounded-2xl p-5">
                <p className="text-xs text-[#707a6c] font-medium">{s.label}</p>
                <p className="text-2xl font-bold text-[#181d16] mt-1">{s.value}</p>
                <p className="text-xs text-[#176a22] font-semibold mt-1">{s.change}</p>
              </div>
            ))}
          </div>

          <div className="bg-white border border-[#e0e4d9] rounded-2xl p-6 text-center text-sm text-[#707a6c]">
            Trang quản lý chi tiết đang được phát triển.
          </div>
        </div>
      </div>
    </div>
  );
};
