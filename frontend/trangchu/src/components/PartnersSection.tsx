import React from 'react';
import { Award, Shield, CheckCircle, Leaf, Globe } from 'lucide-react';

export const PartnersSection: React.FC = () => {
  const partners = [
    { name: 'VietGAP Certified', icon: Leaf },
    { name: 'GlobalGAP Verified', icon: Globe },
    { name: 'ISO 22000 Food Safety', icon: Shield },
    { name: 'HACCP Standard', icon: Award },
    { name: 'USDA Organic', icon: CheckCircle },
  ];

  return (
    <section id="chung-nhan" className="py-12 bg-[#f7fbf0] border-t border-[#e0e4d9]">
      <div className="max-w-7xl mx-auto px-4 lg:px-12 text-center space-y-8">
        <h4 className="text-xs sm:text-sm font-bold uppercase tracking-widest text-[#707a6c] font-sans">
          ĐỐI TÁC & CHỨNG NHẬN CHIẾN LƯỢC
        </h4>

        <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-12 opacity-80">
          {partners.map((partner, index) => {
            const IconComponent = partner.icon;
            return (
              <div
                key={index}
                className="flex items-center gap-2 px-4 py-2 bg-[#ebefe4] border border-[#e0e4d9] rounded-xl text-[#40493d] font-semibold text-xs sm:text-sm grayscale hover:grayscale-0 hover:border-[#176a22] transition-all"
              >
                <IconComponent className="w-5 h-5 text-[#176a22]" />
                <span>{partner.name}</span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
