'use client';

import React from 'react';
import { Sidebar } from '@/components/shared/Sidebar';
import { ShoppingBag, FileText, BarChart2, Briefcase, ShieldCheck } from 'lucide-react';
import { ROUTES } from '@/config/routes';

const SIDEBAR_ITEMS = [
  { href: ROUTES.PARTNER_ORDERS, label: 'Đơn đặt hàng', icon: <ShoppingBag className="w-5 h-5" /> },
  { href: ROUTES.PARTNER_CONTRACTS, label: 'Hợp đồng', icon: <FileText className="w-5 h-5" /> },
  { href: ROUTES.PARTNER_CAMPAIGNS, label: 'Chiến dịch thu mua', icon: <BarChart2 className="w-5 h-5" /> },
  { href: ROUTES.PARTNER, label: 'Tổng quan', icon: <BarChart2 className="w-5 h-5" /> },
];

export const PartnerDashboard: React.FC = () => {
  return (
    <div className="flex min-h-screen w-full">
      <Sidebar items={SIDEBAR_ITEMS} title="Đối Tác Thu Mua" />
      <div className="flex-1 p-8">
        <div className="max-w-5xl mx-auto space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#176a22] text-white flex items-center justify-center">
              <Briefcase className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-[#181d16]">Dashboard Đối Tác</h1>
              <p className="text-sm text-[#40493d]">Quản lý chiến dịch, hợp đồng và đơn đặt hàng</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { label: 'Hợp đồng Escrow đang chạy', value: '3', change: '1 chờ kiểm định' },
              { label: 'Nguồn hàng đã chốt T7', value: '320 Tấn', change: '+65T so với T6' },
              { label: 'Tiết kiệm chi phí trung gian', value: '12%', change: 'Kết nối trực tiếp HTX' },
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
