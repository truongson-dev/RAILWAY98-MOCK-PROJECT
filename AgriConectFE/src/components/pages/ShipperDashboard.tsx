'use client';

import React from 'react';
import { Sidebar } from '@/components/shared/Sidebar';
import { Truck, Thermometer, BarChart2 } from 'lucide-react';
import { ROUTES } from '@/config/routes';

const SIDEBAR_ITEMS = [
  { href: ROUTES.SHIPPER_DELIVERIES, label: 'Chuyến hàng', icon: <Truck className="w-5 h-5" /> },
  { href: ROUTES.SHIPPER_IOT, label: 'Cảm biến IoT', icon: <Thermometer className="w-5 h-5" /> },
  { href: ROUTES.SHIPPER, label: 'Tổng quan', icon: <BarChart2 className="w-5 h-5" /> },
];

export const ShipperDashboard: React.FC = () => {
  return (
    <div className="flex min-h-screen w-full">
      <Sidebar items={SIDEBAR_ITEMS} title="Đơn Vị Vận Tải" />
      <div className="flex-1 p-8">
        <div className="max-w-5xl mx-auto space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#176a22] text-white flex items-center justify-center">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-[#181d16]">Dashboard Vận Tải & IoT</h1>
              <p className="text-sm text-[#40493d]">Theo dõi chuyến hàng và cảm biến cold-chain theo thời gian thực</p>
            </div>
          </div>

          {/* Live IoT mock card */}
          <div className="bg-[#176a22] text-white rounded-2xl p-6 flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-xs text-emerald-200 font-semibold uppercase tracking-wider">
                Cảm biến IoT — Live
              </p>
              <p className="text-lg font-bold">Container BKS 63C-129.88</p>
              <p className="text-sm text-emerald-100">Cao tốc Trung Lương — TP.HCM</p>
            </div>
            <div className="text-right">
              <div className="flex items-center gap-2 justify-end">
                <Thermometer className="w-5 h-5 text-blue-300" />
                <span className="text-3xl font-bold">4.2°C</span>
              </div>
              <p className="text-xs text-emerald-200 mt-1">Độ ẩm: 85% ✓ Đạt chuẩn</p>
            </div>
          </div>

          <div className="bg-white border border-[#e0e4d9] rounded-2xl p-6 text-center text-sm text-[#707a6c]">
            Bản đồ GPS và biểu đồ nhiệt độ realtime đang được phát triển.
          </div>
        </div>
      </div>
    </div>
  );
};
