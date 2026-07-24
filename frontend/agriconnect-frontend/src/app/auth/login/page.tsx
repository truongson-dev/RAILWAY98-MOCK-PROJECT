import type { Metadata } from 'next';
import Link from 'next/link';
import { Sprout } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Đăng nhập — AgriConnect',
};

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-[#f7fbf0] flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        {/* Brand */}
        <div className="text-center space-y-2">
          <Link href="/" className="inline-flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-[#176a22] flex items-center justify-center text-white">
              <Sprout className="w-6 h-6" />
            </div>
            <span className="text-2xl font-bold text-[#181d16]">
              Agri<span className="text-[#176a22]">Connect</span>
            </span>
          </Link>
          <p className="text-sm text-[#40493d]">Đăng nhập vào tài khoản doanh nghiệp của bạn</p>
        </div>

        {/* Card */}
        <div className="bg-white border border-[#e0e4d9] rounded-3xl p-8 shadow-sm">
          <p className="text-center text-sm text-[#707a6c] mb-6">
            Sử dụng form đăng nhập trong modal để đăng nhập.
            <br />
            <Link href="/" className="font-semibold text-[#176a22] hover:underline">
              ← Quay lại trang chủ
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
