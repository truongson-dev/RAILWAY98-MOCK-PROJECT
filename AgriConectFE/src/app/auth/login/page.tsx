'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Sprout, ArrowLeft, ShieldCheck, Zap, User, Lock, ArrowRight } from 'lucide-react';
import { useAuthStore } from '@/store/authStore'; // Store quản lý authentication của hệ thống
import type { UserProfile } from '@/types/account.type';

// ─── SVG Icon Google ────────────────────────────────────────────────────────
const GoogleIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5 mr-3">
    <path
      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      fill="#4285F4"
    />
    <path
      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      fill="#34A853"
    />
    <path
      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
      fill="#FBBC05"
    />
    <path
      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      fill="#EA4335"
    />
  </svg>
);

const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8080';

// Định nghĩa vai trò đăng nhập
type LoginRole = 'SUPPLIER' | 'PARTNER' | 'SHIPPER';

export default function LoginPage() {
  const router = useRouter();
  const { setAuth } = useAuthStore(); // Hàm lưu session đăng nhập vào global state / localStorage

  // ─── State Quản lý Form ──────────────────────────────────────────────────
  const [selectedRole, setSelectedRole] = useState<LoginRole>('SUPPLIER'); // Mặc định là Nhà cung cấp
  const [account, setAccount] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  // ─── Hàm Xử lý Đăng nhập Thủ công ───────────────────────────────────────
  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // 1. Gọi API đăng nhập từ Backend Spring Boot
      const res = await fetch(`${API_BASE}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: account, password: password }),
      });

      if (!res.ok) {
        throw new Error('Đăng nhập thất bại. Vui lòng kiểm tra lại email/mật khẩu hoặc trạng thái tài khoản.');
      }

      const responseData = await res.json();
      const authData = responseData.data; // Lấy dữ liệu được bọc trong ApiResponse

      // 2. Chuyển đổi Role từ Backend (enum) sang Role hiển thị ở Frontend
      const feRole: UserProfile['role'] =
        authData?.role === 'ADMIN'     ? 'Admin'
        : authData?.role === 'SUPPLIER' ? 'Supplier'
        : authData?.role === 'SHIPPER'  ? 'Shipper'
        : 'Partner';

      const user: UserProfile = {
        id:          String(authData?.userId ?? ''),
        name:        authData?.fullName ?? account,
        companyName: authData?.companyName ?? '',
        email:       authData?.email  ?? '',
        phone:       authData?.phone  ?? '',
        taxId:       authData?.taxId  ?? '',
        role:        feRole,
        verified:    authData?.status === 'ACTIVE',
        province:    authData?.province ?? '',
      };

      const jwtToken = authData?.accessToken;

      // 3. Lưu thông tin User & Token vào Store
      setAuth(user, jwtToken);
      setIsSuccess(true);

      // 4. Redirect người dùng về trang Dashboard tương ứng sau khi đăng nhập thành công
      setTimeout(() => {
        if (feRole === 'Admin')         router.push('/admin');
        else if (feRole === 'Partner')  router.push('/dashboard/partner');
        else if (feRole === 'Shipper')  router.push('/dashboard/shipper');
        else                            router.push('/dashboard/supplier');
      }, 1000);

    } catch (err) {
      setError(err instanceof Error ? err.message : 'Đã có lỗi kết nối xảy ra.');
    } finally {
      setLoading(false);
    }
  };

  // ─── Luồng Đăng nhập bằng Google (OAuth2) ──────────────────────────────
  const handleGoogleLogin = () => {
    // Chuyển hướng trình duyệt trực tiếp sang endpoint OAuth2 của Backend.
    // Sau khi xác thực xong với Google, Backend sẽ tự động xử lý và chuyển hướng (redirect)
    // người dùng kèm token về route callback của Frontend.
    window.location.href = `${API_BASE}/oauth2/authorization/google`;
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#f7fbf0] via-[#eef6e1] to-[#e4f1d2] flex items-center justify-center p-6 relative overflow-hidden">
      {/* Các khối tròn mờ làm hình nền chuyển động nghệ thuật */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-[#d1e8b2] rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob"></div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#c4e39c] rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-2000"></div>

      <div className="w-full max-w-[1000px] bg-white/80 backdrop-blur-xl border border-white/50 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden flex flex-col md:flex-row relative z-10">
        
        {/* CỘT TRÁI - Thông tin thương hiệu (AgriConnect) */}
        <div className="md:w-1/2 bg-[#176a22] p-12 text-white flex flex-col justify-between relative overflow-hidden">
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '24px 24px' }}></div>
          
          <div className="relative z-10">
            <Link href="/" className="inline-flex items-center gap-2 mb-12 hover:opacity-80 transition-opacity">
              <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center backdrop-blur-md">
                <Sprout className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold tracking-tight">
                Agri<span className="text-[#a4d775]">Connect</span>
              </span>
            </Link>

            <h1 className="text-4xl font-bold leading-tight mb-6">
              Nền tảng giao dịch <br /> nông sản B2B số 1
            </h1>
            <p className="text-white/80 text-lg mb-8 leading-relaxed">
              Kết nối trực tiếp nhà nông và doanh nghiệp, đảm bảo nguồn gốc, chất lượng và tối ưu lợi nhuận cho cả hai bên.
            </p>
          </div>

          <div className="space-y-4 relative z-10">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                <ShieldCheck className="w-4 h-4 text-[#a4d775]" />
              </div>
              <span className="text-sm text-white/90">Giao dịch an toàn & minh bạch</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                <Zap className="w-4 h-4 text-[#a4d775]" />
              </div>
              <span className="text-sm text-white/90">Kết nối nhanh chóng bằng AI</span>
            </div>
          </div>
        </div>

        {/* CỘT PHẢI - Form Đăng Nhập Thủ công & OAuth2 */}
        <div className="md:w-1/2 p-10 flex flex-col justify-center">
          <Link href="/" className="inline-flex items-center text-sm font-medium text-[#707a6c] hover:text-[#176a22] transition-colors mb-6 w-fit">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Quay lại trang chủ
          </Link>

          <div className="max-w-sm w-full mx-auto">
            <h2 className="text-2xl font-bold text-[#181d16] mb-1">Chào mừng trở lại</h2>
            <p className="text-sm text-[#707a6c] mb-6">Đăng nhập vào hệ sinh thái nông nghiệp của bạn.</p>

            {/* Thông báo đăng nhập thành công */}
            {isSuccess && (
              <div className="p-4 mb-4 bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm rounded-2xl flex items-center gap-2 animate-pulse">
                <ShieldCheck className="w-5 h-5 shrink-0" />
                <span>Đăng nhập thành công! Đang chuyển hướng...</span>
              </div>
            )}

            {/* Thông báo lỗi nếu xảy ra */}
            {error && (
              <div className="p-4 mb-4 bg-red-50 border border-red-200 text-red-800 text-sm rounded-2xl">
                {error}
              </div>
            )}

            <form onSubmit={handleLoginSubmit} className="space-y-4">
              
              {/* Chọn vai trò đăng nhập */}
              <div>
                <label className="block text-xs font-bold text-[#40493d] mb-2">Đăng nhập theo vai trò:</label>
                <div className="grid grid-cols-3 gap-2">
                  {(['SUPPLIER', 'PARTNER', 'SHIPPER'] as LoginRole[]).map((r) => {
                    const label = r === 'SUPPLIER' ? 'Nhà Vườn' : r === 'PARTNER' ? 'Thu Mua' : 'Vận Tải';
                    return (
                      <button
                        key={r}
                        type="button"
                        onClick={() => setSelectedRole(r)}
                        className={`py-2 px-3 rounded-xl border text-xs font-bold transition-all ${
                          selectedRole === r
                            ? 'bg-[#176a22] text-white border-[#176a22] shadow-sm'
                            : 'bg-white text-[#40493d] border-[#e0e4d9] hover:border-[#176a22]'
                        }`}
                      >
                        {label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Tài khoản / Email */}
              <div>
                <label className="block text-xs font-bold text-[#40493d] mb-1">Tài khoản hoặc Email *</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#707a6c]"><User className="w-4 h-4" /></span>
                  <input
                    type="text"
                    required
                    placeholder="email@example.com"
                    value={account}
                    onChange={(e) => setAccount(e.target.value)}
                    className="w-full pl-9 pr-4 py-2.5 bg-white border border-[#e0e4d9] rounded-xl text-sm focus:ring-2 focus:ring-[#176a22]/20 focus:border-[#176a22] outline-none transition-all"
                  />
                </div>
              </div>

              {/* Mật khẩu */}
              <div>
                <label className="block text-xs font-bold text-[#40493d] mb-1">Mật khẩu *</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#707a6c]"><Lock className="w-4 h-4" /></span>
                  <input
                    type="password"
                    required
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-9 pr-4 py-2.5 bg-white border border-[#e0e4d9] rounded-xl text-sm focus:ring-2 focus:ring-[#176a22]/20 focus:border-[#176a22] outline-none transition-all"
                  />
                </div>
              </div>

              {/* Ghi nhớ & Quên mật khẩu */}
              <div className="flex items-center justify-between text-xs pt-1">
                <label className="flex items-center gap-2 cursor-pointer text-[#40493d]">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="rounded accent-[#176a22] w-4 h-4"
                  />
                  Ghi nhớ đăng nhập
                </label>
                <a href="#" className="font-bold text-[#176a22] hover:underline">Quên mật khẩu?</a>
              </div>

              {/* Nút đăng nhập */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-[#176a22] hover:bg-[#12531a] text-white font-bold rounded-xl flex items-center justify-center gap-2 disabled:opacity-70 transition-all shadow-sm active:scale-95 duration-200 mt-2"
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <span>Xác Nhận Đăng Nhập</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>

            {/* Nút phân cách HOẶC */}
            <div className="relative my-6 text-center">
              <span className="absolute inset-x-0 top-1/2 h-px bg-[#e0e4d9]"></span>
              <span className="relative bg-white px-3 text-xs text-[#707a6c]">HOẶC</span>
            </div>

            {/* Đăng nhập bằng Google */}
            <button
              onClick={handleGoogleLogin}
              className="w-full flex items-center justify-center px-4 py-3 bg-white border-2 border-[#e0e4d9] rounded-xl text-[#181d16] font-bold text-sm hover:border-[#176a22] hover:bg-[#f7fbf0] transition-all transform active:scale-95 duration-200"
            >
              <GoogleIcon />
              <span>Đăng nhập với Google</span>
            </button>

            <div className="mt-8 text-center text-xs text-[#707a6c]">
              Chưa có tài khoản?{' '}
              <Link href="/auth/register" className="font-bold text-[#176a22] hover:underline">
                Đăng ký ngay
              </Link>
            </div>

          </div>
        </div>

      </div>
    </main>
  );
}
