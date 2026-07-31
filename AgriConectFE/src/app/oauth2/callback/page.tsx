'use client';

import { useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';

function OAuth2CallbackContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const setAuth = useAuthStore((state) => state.setAuth);

  useEffect(() => {
    const token = searchParams.get('token');
    const refreshToken = searchParams.get('refreshToken');

    if (token) {
      try {
        const payloadBase64 = token.split('.')[1];
        let b64 = payloadBase64.replace(/-/g, '+').replace(/_/g, '/');
        while (b64.length % 4 !== 0) { b64 += '='; }
        
        const payloadJson = decodeURIComponent(escape(window.atob(b64)));
        const payload = JSON.parse(payloadJson);
        const role = payload.role as string;
        
        setAuth(
          {
            id: payload.id || 0,
            email: payload.sub || '',
            role: role,
            fullName: payload.fullName || payload.name || payload.sub,
          },
          token
        );
        
        localStorage.setItem('agri_token', token);
        if (refreshToken) {
          localStorage.setItem('agri_refresh_token', refreshToken);
        }

        if (role === 'ADMIN') {
          router.push('/admin');
        } else if (role) {
          router.push(`/dashboard/${role.toLowerCase()}`);
        } else {
          router.push('/');
        }
      } catch (e) {
        console.error('Error parsing token:', e);
        router.push('/auth/login?error=invalid_token');
      }
    } else {
      router.push('/auth/login?error=missing_token');
    }
  }, [router, searchParams, setAuth]);

  return (
    <div className="flex h-screen w-full items-center justify-center">
      <div className="text-center">
        <h2 className="text-xl font-semibold mb-2">Đang xác thực...</h2>
        <p className="text-gray-500">Vui lòng đợi trong giây lát</p>
      </div>
    </div>
  );
}

export default function OAuth2CallbackPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center">Đang tải...</div>}>
      <OAuth2CallbackContent />
    </Suspense>
  );
}
