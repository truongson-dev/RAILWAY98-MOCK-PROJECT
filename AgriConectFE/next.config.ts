import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    // Cho phép tải ảnh từ các domain bên ngoài
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'api.qrserver.com' },
      // Ảnh nông sản từ Google (dùng cho sản phẩm, banner)
      { protocol: 'https', hostname: 'lh3.googleusercontent.com' },
    ],
  },
};

export default nextConfig;
