'use client';

// ─── Auth Store (Zustand + persist) ───────────────────────────────────────────
// Lưu trữ thông tin xác thực của người dùng đã đăng nhập.
//
// Tính năng `persist`: tự động lưu vào localStorage với key 'agriconnect-auth'
// → Người dùng không cần đăng nhập lại khi F5 hoặc mở tab mới.
//
// Cách dùng:
//   const { user, isAuthenticated, setAuth, clearAuth } = useAuthStore();
//
// Khi backend trả về token sau login:
//   setAuth(userObject, jwtToken)
//
// Khi logout:
//   clearAuth()  → xóa token khỏi localStorage

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { UserProfile } from '@/types/account.type';

interface AuthState {
  /** Thông tin người dùng đang đăng nhập, null nếu chưa đăng nhập */
  user: UserProfile | null;

  /** JWT token từ backend, dùng để gắn vào header Authorization */
  token: string | null;

  /** Shortcut kiểm tra trạng thái đăng nhập */
  isAuthenticated: boolean;

  /** Gọi sau khi login/register thành công để lưu user + token */
  setAuth: (user: UserProfile, token: string) => void;

  /** Gọi khi logout để xóa sạch thông tin xác thực */
  clearAuth: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,

      setAuth: (user, token) =>
        set({ user, token, isAuthenticated: true }),

      clearAuth: () =>
        set({ user: null, token: null, isAuthenticated: false }),
    }),
    {
      // Key trong localStorage — đổi tên này nếu muốn reset session của tất cả user
      name: 'agriconnect-auth',
    },
  ),
);
