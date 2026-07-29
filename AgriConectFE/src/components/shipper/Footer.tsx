import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="mt-auto py-6 px-6 border-t border-[#bfcaba] bg-[#e0e4d9]">
      <div className="flex flex-col gap-6 pr-4 md:pr-20 max-w-7xl">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex flex-col items-center md:items-start gap-1">
            <span className="text-xl font-bold text-[#176a22]">AgriMarket B2B</span>
            <p className="text-sm text-[#40493d]">© 2024 AgriMarket B2B. Bảo lưu mọi quyền.</p>
          </div>
          <div className="flex flex-wrap justify-center gap-6">
            <a href="#support" onClick={(e) => e.preventDefault()} className="text-xs font-semibold text-[#40493d] hover:text-[#176a22] hover:underline transition-all">
              Hỗ trợ
            </a>
            <a href="#terms" onClick={(e) => e.preventDefault()} className="text-xs font-semibold text-[#40493d] hover:text-[#176a22] hover:underline transition-all">
              Điều khoản dịch vụ
            </a>
            <a href="#privacy" onClick={(e) => e.preventDefault()} className="text-xs font-semibold text-[#40493d] hover:text-[#176a22] hover:underline transition-all">
              Chính sách bảo mật
            </a>
            <a href="#certificates" onClick={(e) => e.preventDefault()} className="text-xs font-semibold text-[#40493d] hover:text-[#176a22] hover:underline transition-all">
              Chứng nhận
            </a>
          </div>
        </div>
        <div className="border-t border-[#bfcaba] pt-4 text-center md:text-left">
          <p className="text-xs text-[#40493d] opacity-80">
            Hệ thống quản lý vận tải nông sản thông minh - Kết nối trực tiếp nhà vườn và đối tác vận chuyển.
          </p>
        </div>
      </div>
    </footer>
  );
};
