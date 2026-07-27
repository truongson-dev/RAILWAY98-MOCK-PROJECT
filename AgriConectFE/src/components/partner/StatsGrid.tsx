import React from 'react';
import { TrendingUp, Truck, ShieldCheck, History } from 'lucide-react';

interface StatsGridProps {
  activeRequests?: number;
  inTransit?: number;
  verifiedFarms?: number;
  monthlyOrders?: number;
  onSelectStat?: (statKey: string) => void;
}

export const StatsGrid: React.FC<StatsGridProps> = ({
  activeRequests = 124,
  inTransit = 18,
  verifiedFarms = 842,
  monthlyOrders = 42,
  onSelectStat,
}) => {
  const stats = [
    {
      key: 'requests',
      label: 'Yêu cầu Đang Mở',
      value: activeRequests,
      icon: TrendingUp,
      bgColor: 'bg-[#176a22]/10',
      textColor: 'text-[#176a22]',
    },
    {
      key: 'transit',
      label: 'Đang Vận Chuyển',
      value: inTransit,
      icon: Truck,
      bgColor: 'bg-[#486644]/15',
      textColor: 'text-[#486644]',
    },
    {
      key: 'farms',
      label: 'Nông Trại Xác Thực',
      value: verifiedFarms,
      icon: ShieldCheck,
      bgColor: 'bg-[#9d3c5f]/15',
      textColor: 'text-[#9d3c5f]',
    },
    {
      key: 'orders',
      label: 'Đơn Hàng Trong Tháng',
      value: monthlyOrders,
      icon: History,
      bgColor: 'bg-[#e0e4d9]',
      textColor: 'text-[#40493d]',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <div
            key={stat.key}
            onClick={() => onSelectStat?.(stat.key)}
            className="bg-white p-4 rounded-2xl shadow-xs border border-[#bfcaba]/30 flex items-center gap-4 hover:shadow-md transition-all cursor-pointer group"
          >
            <div
              className={`w-12 h-12 ${stat.bgColor} rounded-xl flex items-center justify-center ${stat.textColor} shrink-0 group-hover:scale-110 transition-transform`}
            >
              <Icon className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs font-semibold text-[#40493d]">{stat.label}</p>
              <p className="text-2xl font-bold text-[#181d16] mt-0.5">
                {stat.value}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};
