'use client';
// Đây là component thuộc giao diện Admin
import React, { useState } from 'react';
import {
  Wallet,
  Users,
  FileText,
  Briefcase,
  TrendingUp,
  UserPlus,
  Calendar,
  Sparkles,
  CheckCircle2,
  Sliders,
  ChevronRight,
  ShieldAlert,
  ArrowUpRight,
  Clock,
  Building2,
  Truck,
  ExternalLink
} from 'lucide-react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import {
  METRIC_CARDS,
  REVENUE_PROFIT_CHART,
  USER_DISTRIBUTION,
  AI_RISK_ITEMS,
  RECENT_ACTIVITIES,
  INITIAL_KYC_RECORDS
} from '@/data/admin.mockData';
import { KycRecord, NavTab } from '@/types/admin.types';

interface OverviewDashboardProps {
  onSelectTab: (tab: NavTab) => void;
  onOpenKycModal: (kyc: KycRecord) => void;
  onOpenAiAnalysis: (topic: string, description: string) => void;
}

// Component: OverviewDashboard - Giao diện quản lý/hiển thị cho Admin
export const OverviewDashboard: React.FC<OverviewDashboardProps> = ({
  onSelectTab,
  onOpenKycModal,
  onOpenAiAnalysis
}) => {
  const [dateRange, setDateRange] = useState('30 ngày qua');

  return (
    <div className="p-6 md:p-8 space-y-6 bg-[#f7fbf0] min-h-full">
      {/* Page Title & Date Filter Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-[#181d16] tracking-tight">
            Tổng quan hệ thống
          </h2>
          <p className="text-sm text-[#40493d] mt-1">
            Chào mừng trở lại, Quản trị viên. Đây là tình hình hoạt động hôm nay.
          </p>
        </div>

        {/* Date Selector */}
        <div className="flex items-center space-x-2">
          <div className="relative">
            <button
              className="flex items-center space-x-2 bg-white border border-[#bfcaba] px-3.5 py-1.5 rounded-lg text-sm text-[#181d16] hover:border-[#176a22] transition-colors shadow-2xs cursor-pointer font-medium"
              onClick={() => {
                const ranges = ['7 ngày qua', '30 ngày qua', ' quý này', 'Năm 2026'];
                const nextIndex = (ranges.indexOf(dateRange) + 1) % ranges.length;
                setDateRange(ranges[nextIndex]);
              }}
            >
              <Calendar className="w-4 h-4 text-[#707a6c]" />
              <span>{dateRange}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Row 1: Top 4 Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Tổng Giá Trị Giao Dịch */}
        <div className="bg-white rounded-xl p-5 border border-[#e0e4d9] shadow-2xs hover:shadow-sm transition-shadow">
          <div className="flex items-start justify-between">
            <div className="w-10 h-10 rounded-lg bg-[#e2f6df] text-[#176a22] flex items-center justify-center">
              <Wallet className="w-5 h-5" />
            </div>
            <div className="flex items-center space-x-1 text-xs font-semibold text-[#176a22] bg-[#a3f69c]/30 px-2 py-0.5 rounded-full">
              <TrendingUp className="w-3 h-3" />
              <span>+8.2%</span>
            </div>
          </div>
          <div className="mt-4">
            <p className="text-xs font-semibold text-[#707a6c] tracking-wider uppercase">
              TỔNG GIÁ TRỊ GIAO DỊCH
            </p>
            <p className="text-2xl font-bold text-[#181d16] mt-1">
              12.8 tỷ VNĐ
            </p>
          </div>
        </div>

        {/* Card 2: Người Dùng Hoạt Động */}
        <div className="bg-white rounded-xl p-5 border border-[#e0e4d9] shadow-2xs hover:shadow-sm transition-shadow">
          <div className="flex items-start justify-between">
            <div className="w-10 h-10 rounded-lg bg-[#e0f2fe] text-[#0284c7] flex items-center justify-center">
              <Users className="w-5 h-5" />
            </div>
            <div className="flex items-center space-x-1 text-xs font-semibold text-[#0284c7] bg-[#e0f2fe] px-2 py-0.5 rounded-full">
              <UserPlus className="w-3 h-3" />
              <span>+124 mới</span>
            </div>
          </div>
          <div className="mt-4">
            <p className="text-xs font-semibold text-[#707a6c] tracking-wider uppercase">
              NGƯỜI DÙNG HOẠT ĐỘNG
            </p>
            <p className="text-2xl font-bold text-[#181d16] mt-1">
              2,450
            </p>
          </div>
        </div>

        {/* Card 3: Hợp Đồng Hiệu Lực */}
        <div className="bg-white rounded-xl p-5 border border-[#e0e4d9] shadow-2xs hover:shadow-sm transition-shadow">
          <div className="flex items-start justify-between">
            <div className="w-10 h-10 rounded-lg bg-[#ffedd5] text-[#d97706] flex items-center justify-center">
              <FileText className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4">
            <p className="text-xs font-semibold text-[#707a6c] tracking-wider uppercase">
              HỢP ĐỒNG HIỆU LỰC
            </p>
            <p className="text-2xl font-bold text-[#181d16] mt-1">
              856
            </p>
          </div>
        </div>

        {/* Card 4: Hồ Sơ Chờ Duyệt */}
        <div className="bg-white rounded-xl p-5 border border-[#e0e4d9] shadow-2xs hover:shadow-sm transition-shadow">
          <div className="flex items-start justify-between">
            <div className="w-10 h-10 rounded-lg bg-[#fee2e2] text-[#dc2626] flex items-center justify-center">
              <Briefcase className="w-5 h-5" />
            </div>
            <div className="text-[10px] font-bold text-[#ba1a1a] bg-[#ffdad6] px-2 py-0.5 rounded-md tracking-wider uppercase">
              CẦN XỬ LÝ
            </div>
          </div>
          <div className="mt-4">
            <p className="text-xs font-semibold text-[#707a6c] tracking-wider uppercase">
              HỒ SƠ CHỜ DUYỆT
            </p>
            <p className="text-2xl font-bold text-[#ba1a1a] mt-1">
              14
            </p>
          </div>
        </div>
      </div>

      {/* Row 2: Charts (Doanh Thu & Lợi Nhuận + Cơ Cấu Người Dùng) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Chart: Doanh thu & Lợi nhuận (2 cols) */}
        <div className="lg:col-span-2 bg-white rounded-xl p-6 border border-[#e0e4d9] shadow-2xs">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-base font-bold text-[#181d16]">
              Doanh thu & Lợi nhuận
            </h3>
            {/* Legend */}
            <div className="flex items-center space-x-4 text-xs font-medium text-[#40493d]">
              <div className="flex items-center space-x-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#176a22]" />
                <span>Doanh thu</span>
              </div>
              <div className="flex items-center space-x-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#87d983]" />
                <span>Lợi nhuận</span>
              </div>
            </div>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={REVENUE_PROFIT_CHART} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#176a22" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#176a22" stopOpacity={0.0} />
                  </linearGradient>
                  <linearGradient id="colorProfit" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#87d983" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#87d983" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="month" stroke="#707a6c" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#707a6c" fontSize={12} tickLine={false} axisLine={false} unit=" tỷ" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#ffffff',
                    borderColor: '#bfcaba',
                    borderRadius: '8px',
                    fontSize: '12px'
                  }}
                  formatter={(value: any) => [`${value} tỷ VNĐ`]}
                />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke="#176a22"
                  strokeWidth={2.5}
                  fillOpacity={1}
                  fill="url(#colorRevenue)"
                  name="Doanh thu"
                />
                <Area
                  type="monotone"
                  dataKey="profit"
                  stroke="#87d983"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#colorProfit)"
                  name="Lợi nhuận"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Right Chart: Cơ cấu người dùng (1 col) */}
        <div className="bg-white rounded-xl p-6 border border-[#e0e4d9] shadow-2xs flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-base font-bold text-[#181d16]">
              Cơ cấu người dùng
            </h3>
          </div>

          <div className="relative h-48 w-full flex items-center justify-center my-2">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={USER_DISTRIBUTION}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={80}
                  paddingAngle={4}
                  dataKey="percentage"
                >
                  {USER_DISTRIBUTION.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>

            {/* Center Label */}
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-xl font-bold text-[#181d16] leading-none">2.4K</span>
              <span className="text-[10px] font-semibold text-[#707a6c] tracking-wider uppercase mt-0.5">TỔNG CỘNG</span>
            </div>
          </div>

          {/* Breakdown List */}
          <div className="space-y-2 pt-2 border-t border-[#e0e4d9] text-xs">
            {USER_DISTRIBUTION.map((item) => (
              <div key={item.name} className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span
                    className="w-2.5 h-2.5 rounded-full"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-[#40493d] font-medium">{item.name}</span>
                </div>
                <span className="font-bold text-[#181d16]">{item.percentage}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Row 3: Bottom 3 Columns (Cảnh Báo AI | Hoạt Động Gần Đây | Hồ Sơ KYC Mới) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Column 1: Cảnh báo rủi ro AI */}
        <div className="bg-white rounded-xl p-6 border border-[#e0e4d9] shadow-2xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <div className="w-7 h-7 rounded-lg bg-[#ffd9e2] text-[#9d3c5f] flex items-center justify-center">
                  <Sparkles className="w-4 h-4" />
                </div>
                <h3 className="text-base font-bold text-[#181d16]">
                  Cảnh báo rủi ro AI
                </h3>
              </div>
              <button
                onClick={() => onSelectTab('ai-analytics')}
                className="text-xs font-semibold text-[#176a22] hover:underline flex items-center space-x-0.5 cursor-pointer"
              >
                <span>Xem tất cả</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="space-y-3">
              {/* Card 1: Light Red / Pink Container */}
              <div
                onClick={() => onOpenAiAnalysis(AI_RISK_ITEMS[0].title, AI_RISK_ITEMS[0].description)}
                className="p-3.5 rounded-xl bg-[#ffdad6]/40 border border-[#ffb1c7]/50 hover:border-[#9d3c5f] transition-all cursor-pointer group"
              >
                <div className="flex items-center justify-between">
                  <p className="text-xs font-bold text-[#93000a] flex items-center space-x-1">
                    <ShieldAlert className="w-3.5 h-3.5" />
                    <span>{AI_RISK_ITEMS[0].title}</span>
                  </p>
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#93000a] opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <p className="text-xs text-[#40493d] mt-1.5 leading-relaxed">
                  {AI_RISK_ITEMS[0].description}
                </p>
                <span className="text-[10px] text-[#707a6c] mt-2 block font-medium">
                  {AI_RISK_ITEMS[0].timestamp}
                </span>
              </div>

              {/* Card 2: Light Gray Container */}
              <div
                onClick={() => onOpenAiAnalysis(AI_RISK_ITEMS[1].title, AI_RISK_ITEMS[1].description)}
                className="p-3.5 rounded-xl bg-[#f1f5ea] border border-[#e0e4d9] hover:border-[#bfcaba] transition-all cursor-pointer group"
              >
                <div className="flex items-center justify-between">
                  <p className="text-xs font-bold text-[#181d16]">
                    {AI_RISK_ITEMS[1].title}
                  </p>
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#181d16] opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <p className="text-xs text-[#40493d] mt-1.5 leading-relaxed">
                  {AI_RISK_ITEMS[1].description}
                </p>
                <span className="text-[10px] text-[#707a6c] mt-2 block font-medium">
                  {AI_RISK_ITEMS[1].timestamp}
                </span>
              </div>
            </div>
          </div>

          <button
            onClick={() => onOpenAiAnalysis('Phân tích tổng quan hệ thống', 'Đánh giá rủi ro chuỗi cung ứng nông sản toàn quốc')}
            className="w-full mt-4 py-2 px-3 bg-[#e0e4d9]/50 hover:bg-[#e0e4d9] text-[#176a22] text-xs font-semibold rounded-lg flex items-center justify-center space-x-1.5 transition-colors cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Chạy phân tích AI Gemini khẩn cấp</span>
          </button>
        </div>

        {/* Column 2: Hoạt động gần đây */}
        <div className="bg-white rounded-xl p-6 border border-[#e0e4d9] shadow-2xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-bold text-[#181d16]">
                Hoạt động gần đây
              </h3>
            </div>

            <div className="space-y-4">
              {RECENT_ACTIVITIES.map((act) => (
                <div key={act.id} className="flex items-start space-x-3">
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                      act.iconType === 'check'
                        ? 'bg-[#a3f69c] text-[#005313]'
                        : act.iconType === 'settings'
                        ? 'bg-[#e0e4d9] text-[#40493d]'
                        : 'bg-[#e0f2fe] text-[#0284c7]'
                    }`}
                  >
                    {act.iconType === 'check' && <CheckCircle2 className="w-4 h-4" />}
                    {act.iconType === 'settings' && <Sliders className="w-4 h-4" />}
                    {act.iconType === 'document' && <FileText className="w-4 h-4" />}
                  </div>
                  <div>
                    <p className="text-xs font-bold text-[#181d16] leading-snug">
                      {act.title}
                    </p>
                    <p className="text-xs text-[#40493d] mt-0.5 leading-relaxed">
                      {act.subtitle}
                    </p>
                    <p className="text-[10px] text-[#707a6c] mt-1 font-medium flex items-center space-x-1">
                      <Clock className="w-3 h-3" />
                      <span>{act.timestamp}</span>
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Column 3: Hồ sơ KYC mới */}
        <div className="bg-white rounded-xl p-6 border border-[#e0e4d9] shadow-2xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-bold text-[#181d16]">
                Hồ sơ KYC mới
              </h3>
              <button
                onClick={() => onSelectTab('kyc')}
                className="text-xs font-semibold text-[#176a22] hover:underline flex items-center space-x-0.5 cursor-pointer"
              >
                <span>Xem tất cả ({INITIAL_KYC_RECORDS.length})</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="space-y-3">
              {/* Item 1: Nông trại Sen Vàng */}
              <div className="p-3.5 rounded-xl border border-[#e0e4d9] bg-[#f7fbf0] flex items-center justify-between hover:border-[#bfcaba] transition-all">
                <div className="flex items-center space-x-3">
                  <div className="w-9 h-9 rounded-lg bg-[#176a22] text-white flex items-center justify-center font-bold">
                    <Building2 className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-[#181d16]">
                      {INITIAL_KYC_RECORDS[0].name}
                    </p>
                    <p className="text-[11px] text-[#707a6c] mt-0.5">
                      {INITIAL_KYC_RECORDS[0].missingDocNote || 'Chờ duyệt'}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => onOpenKycModal(INITIAL_KYC_RECORDS[0])}
                  className="px-2.5 py-1 text-xs font-semibold bg-white border border-[#bfcaba] text-[#176a22] hover:bg-[#a3f69c]/30 rounded-lg transition-colors cursor-pointer"
                >
                  Duyệt
                </button>
              </div>

              {/* Item 2: Logistics Phía Nam */}
              <div className="p-3.5 rounded-xl border border-[#e0e4d9] bg-[#f7fbf0] flex items-center justify-between hover:border-[#bfcaba] transition-all">
                <div className="flex items-center space-x-3">
                  <div className="w-9 h-9 rounded-lg bg-[#0284c7] text-white flex items-center justify-center font-bold">
                    <Truck className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-[#181d16]">
                      {INITIAL_KYC_RECORDS[1].name}
                    </p>
                    <p className="text-[11px] text-[#ba1a1a] mt-0.5">
                      {INITIAL_KYC_RECORDS[1].missingDocNote}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => onOpenKycModal(INITIAL_KYC_RECORDS[1])}
                  className="px-2.5 py-1 text-xs font-semibold bg-white border border-[#bfcaba] text-[#181d16] hover:bg-[#e0e4d9] rounded-lg transition-colors cursor-pointer"
                >
                  Xem
                </button>
              </div>
            </div>
          </div>

          <button
            onClick={() => onSelectTab('kyc')}
            className="w-full mt-4 py-2 px-3 bg-[#176a22] text-white text-xs font-semibold rounded-lg hover:bg-[#13561b] transition-colors cursor-pointer"
          >
            Mở Danh Sách Xử Lý Hồ Sơ (14)
          </button>
        </div>
      </div>
    </div>
  );
};
