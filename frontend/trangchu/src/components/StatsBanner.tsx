import React from 'react';

export const StatsBanner: React.FC = () => {
  const stats = [
    { value: '10,000+', label: 'NÔNG DÂN & HỢP TÁC XÃ' },
    { value: '500+', label: 'DOANH NGHIỆP THU MUA' },
    { value: '1M+', label: 'TẤN NÔNG SẢN LUÂN CHUYỂN' },
  ];

  return (
    <section className="py-12 bg-[#f7fbf0] border-y border-[#e0e4d9]/80 px-4 lg:px-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-[#bfcaba]/40">
        {stats.map((stat, index) => (
          <div key={index} className="pt-6 md:pt-0 px-4 first:pt-0">
            <h3 className="text-3xl sm:text-4xl lg:text-[44px] font-bold text-[#176a22] font-sans tracking-tight">
              {stat.value}
            </h3>
            <p className="mt-2 text-xs sm:text-sm font-semibold tracking-wider text-[#40493d] uppercase font-sans">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};
