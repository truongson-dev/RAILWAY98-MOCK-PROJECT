import React from 'react';
import { Sprout, Globe } from 'lucide-react';

interface FooterProps {
  onOpenCertModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenCertModal }) => {
  return (
    <footer className="bg-[#e0e4d9]/40 border-t border-[#e0e4d9] py-8 px-4 lg:px-12 text-[#40493d] text-xs sm:text-sm">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Left Brand & Copyright */}
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <a href="#" className="flex items-center gap-2 font-bold text-base text-[#181d16]">
            <div className="w-7 h-7 rounded-lg bg-[#176a22] flex items-center justify-center text-white">
              <Sprout className="w-4 h-4" />
            </div>
            <span>AgriConnect</span>
          </a>
          <span className="hidden sm:inline text-[#bfcaba]">|</span>
          <p>© 2026 AgriConnect. All rights reserved.</p>
        </div>

        {/* Links */}
        <div className="flex flex-wrap items-center justify-center gap-6 font-medium text-xs">
          <a href="#" className="hover:text-[#176a22] transition-colors">Support</a>
          <a href="#" className="hover:text-[#176a22] transition-colors">Terms of Service</a>
          <a href="#" className="hover:text-[#176a22] transition-colors">Privacy Policy</a>
          <button onClick={onOpenCertModal} className="hover:text-[#176a22] transition-colors">Certifications</button>
        </div>

        {/* Right Language Toggle */}
        <div className="flex items-center gap-2 text-xs font-semibold text-[#181d16]">
          <Globe className="w-4 h-4 text-[#176a22]" />
          <span>Tiếng Việt (VN)</span>
        </div>

      </div>
    </footer>
  );
};
