'use client';

// ─── useAuth Hook ──────────────────────────────────────────────────────────────
// Hook tập trung xử lý logic đăng nhập / đăng ký / đăng xuất.
//
// Tại sao dùng hook thay vì gọi service trực tiếp?
//   → Hook tự động cập nhật authStore sau khi login/register thành công.
//   → Component không cần biết đến authStore hay service — chỉ cần gọi hook.
//
// Cách dùng trong component:
//   const { user, isAuthenticated, login, logout } = useAuth();

import { useAuthStore } from '@/store/authStore';
import { login as loginService, register as registerService } from '@/services/auth.service';
import type { LoginPayload, RegisterPayload } from '@/services/auth.service';

export function useAuth() {
  const { user, token, isAuthenticated, setAuth, clearAuth } = useAuthStore();

  /**
   * Đăng nhập bằng email + mật khẩu.
   * Tự động lưu token và thông tin user vào authStore (và localStorage).
   * Ném lỗi nếu server trả về thất bại — component cần try/catch.
   */
  const login = async (payload: LoginPayload) => {
    const { user: u, token: t } = await loginService(payload);
    setAuth(u, t);
    return u;
  };

  /**
   * Đăng ký tài khoản mới.
   * Backend trả về token ngay sau đăng ký (không cần đăng nhập lại).
   */
  const register = async (payload: RegisterPayload) => {
    const { user: u, token: t } = await registerService(payload);
    setAuth(u, t);
    return u;
  };

  /**
   * Đăng xuất: xóa token khỏi store và localStorage.
   * Redirect về trang chủ nên được xử lý ở component gọi hàm này.
   */
  const logout = () => clearAuth();

  return { user, token, isAuthenticated, login, register, logout };
}
