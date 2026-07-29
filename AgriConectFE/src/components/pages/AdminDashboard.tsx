'use client';

import React from 'react';
import { Sidebar } from '@/components/shared/Sidebar';
import { Users, AlertTriangle, BarChart2, ShieldCheck, Package } from 'lucide-react';
import { ROUTES } from '@/config/routes';

const SIDEBAR_ITEMS = [
  { href: ROUTES.ADMIN_ROLES, label: 'Quản lý vai trò', icon: <Users className="w-5 h-5" /> },
  { href: ROUTES.ADMIN_DISPUTES, label: 'Tranh chấp', icon: <AlertTriangle className="w-5 h-5" /> },
  { href: ROUTES.ADMIN_PRODUCTS, label: 'Duyệt sản phẩm', icon: <Package className="w-5 h-5" /> },
  { href: ROUTES.ADMIN, label: 'Tổng quan', icon: <BarChart2 className="w-5 h-5" /> },
];

export const AdminDashboard: React.FC = () => {
  return (
    <div className="flex min-h-screen w-full">
      <Sidebar items={SIDEBAR_ITEMS} title="Quản Trị" />
      <div className="flex-1 p-8">
        <div className="max-w-5xl mx-auto space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#176a22] text-white flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-[#181d16]">Admin Dashboard</h1>
              <p className="text-sm text-[#40493d]">Quản lý toàn hệ thống — vai trò, xác minh, tranh chấp</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { label: 'Tổng tài khoản', value: '10,842', change: '+284 tuần này' },
              { label: 'Đang chờ xét duyệt', value: '23', change: '8 cần xử lý gấp' },
              { label: 'Tranh chấp mở', value: '4', change: '2 đã có biên bản' },
            ].map((s) => (
              <div key={s.label} className="bg-white border border-[#e0e4d9] rounded-2xl p-5">
                <p className="text-xs text-[#707a6c] font-medium">{s.label}</p>
                <p className="text-2xl font-bold text-[#181d16] mt-1">{s.value}</p>
                <p className="text-xs text-[#176a22] font-semibold mt-1">{s.change}</p>
              </div>
            ))}
          </div>

          <div className="bg-white border border-[#e0e4d9] rounded-2xl p-6 text-center text-sm text-[#707a6c]">
            Bảng quản trị chi tiết đang được phát triển.
          </div>
        </div>
      </div>
    </div>
  );
};
