import React from 'react';
import { BarChart3, TrendingUp, DollarSign, Calendar, ArrowUpRight } from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, AreaChart, Area } from 'recharts';

export const AnalyticsView: React.FC = () => {
  const revenueData = [
    { month: 'Thg 2', revenue: 95, orders: 18 },
    { month: 'Thg 3', revenue: 110, orders: 22 },
    { month: 'Thg 4', revenue: 128, orders: 25 },
    { month: 'Thg 5', revenue: 142, orders: 30 },
    { month: 'Thg 6', revenue: 135, orders: 28 },
    { month: 'Thg 7', revenue: 154.2, orders: 35 },
  ];

  const productYieldData = [
    { crop: 'Cam Sành', yieldTons: 12.5 },
    { crop: 'Sầu riêng Ri6', yieldTons: 18.0 },
    { crop: 'Gạo ST25', yieldTons: 65.0 },
    { crop: 'Cà phê', yieldTons: 8.2 },
    { crop: 'Xoài Cát', yieldTons: 14.0 },
  ];

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl border border-[#e0e4d9] flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-xl font-bold text-[#181d16] flex items-center gap-2">
            <BarChart3 size={24} className="text-[#176a22]" />
            Báo Cáo Doanh Thu & Sản Lượng Nông Nghiệp
          </h2>
          <p className="text-sm text-[#5e6958]">
            Phân tích tốc độ tăng trưởng doanh thu, sản lượng thu hoạch và giá trị trung bình đơn hàng.
          </p>
        </div>

        <div className="bg-[#f1f5ea] px-4 py-2 rounded-xl text-xs font-bold text-[#176a22] border border-[#d0d6c7]">
          Kỳ báo cáo: Quý 2 & Quý 3 / 2026
        </div>
      </div>

      {/* Top Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-[#e0e4d9] space-y-1">
          <p className="text-xs font-bold text-[#5e6958] uppercase">Tổng Doanh Thu Năm 2026</p>
          <div className="flex items-baseline gap-2">
            <h3 className="text-2xl font-black text-[#181d16]">764.2 Triệu VNĐ</h3>
            <span className="text-xs font-bold text-[#176a22] flex items-center">
              <ArrowUpRight size={14} /> +22.4%
            </span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-[#e0e4d9] space-y-1">
          <p className="text-xs font-bold text-[#5e6958] uppercase">Sản Lượng Thu Hoạch Tất Cả Mùa</p>
          <div className="flex items-baseline gap-2">
            <h3 className="text-2xl font-black text-[#181d16]">117.7 Tấn</h3>
            <span className="text-xs font-bold text-[#176a22] flex items-center">
              <ArrowUpRight size={14} /> +18.1%
            </span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-[#e0e4d9] space-y-1">
          <p className="text-xs font-bold text-[#5e6958] uppercase">Giá Trị Đơn Hàng Trung Bình</p>
          <div className="flex items-baseline gap-2">
            <h3 className="text-2xl font-black text-[#181d16]">18.5 Triệu VNĐ</h3>
            <span className="text-xs font-bold text-[#176a22]">VietGAP / Xuất khẩu</span>
          </div>
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Area Chart */}
        <div className="bg-white p-5 rounded-2xl border border-[#e0e4d9] space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="font-bold text-[#181d16] text-base">Biểu Đồ Doanh Thu Tháng (Triệu VNĐ)</h3>
            <span className="text-xs text-[#176a22] font-semibold">Tăng trưởng ổn định</span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueData}>
                <defs>
                  <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#176a22" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#176a22" stopOpacity={0.0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e0e4d9" />
                <XAxis dataKey="month" stroke="#707a6c" fontSize={12} />
                <YAxis stroke="#707a6c" fontSize={12} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#ffffff', borderRadius: '12px', borderColor: '#e0e4d9' }}
                  formatter={(val: any) => [`${val} Triệu VNĐ`, 'Doanh thu']}
                />
                <Area type="monotone" dataKey="revenue" stroke="#176a22" strokeWidth={3} fillOpacity={1} fill="url(#colorRev)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Crop Yield Bar Chart */}
        <div className="bg-white p-5 rounded-2xl border border-[#e0e4d9] space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="font-bold text-[#181d16] text-base">Sản Lượng Thu Hoạch Theo Nông Sản (Tấn)</h3>
            <span className="text-xs text-[#5e6958] font-semibold">Năm 2026</span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={productYieldData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e0e4d9" />
                <XAxis dataKey="crop" stroke="#707a6c" fontSize={12} />
                <YAxis stroke="#707a6c" fontSize={12} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#ffffff', borderRadius: '12px', borderColor: '#e0e4d9' }}
                  formatter={(val: any) => [`${val} Tấn`, 'Sản lượng']}
                />
                <Bar dataKey="yieldTons" fill="#358439" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};
