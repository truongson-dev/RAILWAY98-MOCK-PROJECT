import type { Metadata } from 'next';
import Link from 'next/link';
import { Sprout } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Đăng ký — AgriConnect',
};

export default function RegisterPage() {
  return (
    <main className="min-h-screen bg-[#f7fbf0] flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center space-y-2">
          <Link href="/" className="inline-flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-[#176a22] flex items-center justify-center text-white">
              <Sprout className="w-6 h-6" />
            </div>
            <span className="text-2xl font-bold text-[#181d16]">
              Agri<span className="text-[#176a22]">Connect</span>
            </span>
          </Link>
          <p className="text-sm text-[#40493d]">Tạo tài khoản doanh nghiệp mới</p>
        </div>

        <div className="bg-white border border-[#e0e4d9] rounded-3xl p-8 shadow-sm text-center">
          <p className="text-sm text-[#707a6c] mb-4">
            Đăng ký nhanh qua form modal tại trang chủ.
          </p>
          <Link
            href="/"
            className="inline-block px-6 py-3 bg-[#176a22] text-white font-semibold rounded-xl hover:bg-[#12531a] transition-all"
          >
            ← Quay lại trang chủ & Đăng ký
          </Link>
        </div>
      </div>
    </main>
  );
}
