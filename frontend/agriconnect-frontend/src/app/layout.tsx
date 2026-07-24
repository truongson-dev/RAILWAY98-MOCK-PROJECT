import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata: Metadata = {
  title: 'AgriConnect — Sàn Giao Dịch Nông Sản B2B Việt Nam',
  description:
    'Hệ sinh thái thương mại nông nghiệp thông minh, kết nối nhà vườn, doanh nghiệp thu mua và đơn vị vận tải trên một nền tảng duy nhất.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi" className={inter.variable}>
      <body className="min-h-screen">{children}</body>
    </html>
  );
}
