import React from 'react';
import { Award, Shield, CheckCircle, Leaf, Globe } from 'lucide-react';

const PARTNERS = [
  { name: 'VietGAP Certified', icon: Leaf },
  { name: 'GlobalGAP Verified', icon: Globe },
  { name: 'ISO 22000 Food Safety', icon: Shield },
  { name: 'HACCP Standard', icon: Award },
  { name: 'USDA Organic', icon: CheckCircle },
];

export const PartnersSection: React.FC = () => (
  <section id="chung-nhan" className="py-12 bg-[#f7fbf0] border-t border-[#e0e4d9]">
    <div className="max-w-7xl mx-auto px-4 lg:px-12 text-center space-y-8">
      <h4 className="text-xs sm:text-sm font-bold uppercase tracking-widest text-[#707a6c]">
        ĐỐI TÁC & CHỨNG NHẬN CHIẾN LƯỢC
      </h4>

      <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-12 opacity-80">
        {PARTNERS.map(({ name, icon: Icon }) => (
          <div
            key={name}
            className="flex items-center gap-2 px-4 py-2 bg-[#ebefe4] border border-[#e0e4d9] rounded-xl text-[#40493d] font-semibold text-xs sm:text-sm grayscale hover:grayscale-0 hover:border-[#176a22] transition-all"
          >
            <Icon className="w-5 h-5 text-[#176a22]" />
            <span>{name}</span>
          </div>
        ))}
      </div>
    </div>
  </section>
);
