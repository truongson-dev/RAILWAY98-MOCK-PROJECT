// ─── Auth Service ─────────────────────────────────────────────────────────────
// Xử lý tất cả các API call liên quan đến xác thực: đăng nhập, đăng ký, quên mật khẩu.
//
// Base URL lấy từ biến môi trường NEXT_PUBLIC_API_URL (xem .env.example).
// Trong môi trường dev local, set NEXT_PUBLIC_API_URL=http://localhost:8081
//
// Cách dùng (dùng qua hook useAuth thay vì gọi trực tiếp):
//   const { login } = useAuth();
//   await login({ email: '...', password: '...' });

import type { UserProfile, BusinessRole } from '@/types/account.type';

const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8080';

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  /** Thông tin hồ sơ doanh nghiệp (không bao gồm id và trạng thái verified) */
  profile: Omit<UserProfile, 'id' | 'verified'>;
  password: string;
}

export interface AuthResponse {
  token: string;      // JWT token — lưu vào authStore
  user: UserProfile;  // Thông tin user đầy đủ từ backend
}

/**
 * Đăng nhập bằng email + mật khẩu.
 * Ném lỗi nếu server trả về status !== 200.
 */
export async function login(payload: LoginPayload): Promise<AuthResponse> {
  const res = await fetch(`${API_BASE}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json() as Promise<AuthResponse>;
}

/**
 * Đăng ký tài khoản doanh nghiệp mới.
 * Backend sẽ gửi email xác nhận trước khi kích hoạt tài khoản.
 */
export async function register(payload: RegisterPayload): Promise<AuthResponse> {
  const res = await fetch(`${API_BASE}/api/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json() as Promise<AuthResponse>;
}

export async function verifyEmail(payload: { email: string; otp: string }): Promise<{ success: boolean }> {
  const res = await fetch(`${API_BASE}/api/auth/verify-email`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json() as Promise<{ success: boolean }>;
}

/**
 * Gửi yêu cầu đặt lại mật khẩu qua email.
 * Backend sẽ gửi link reset có hiệu lực 30 phút.
 */
export async function forgotPassword(email: string): Promise<{ success: boolean }> {
  const res = await fetch(`${API_BASE}/api/auth/forgot-password`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email }),
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json() as Promise<{ success: boolean }>;
}
