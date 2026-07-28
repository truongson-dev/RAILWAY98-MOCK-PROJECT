'use client';

import React from 'react';
import { CheckCircle2 } from 'lucide-react';
import Link from 'next/link';
import type { UserRole } from '@/types/account.type';

const ROLES = [
  {
    id: 'Supplier' as UserRole,
    tag: 'Nhà Cung Cấp',
    title: 'Dành cho Nhà Vườn & HTX',
    image: 'https://images.unsplash.com/photo-1574943320219-553eb213f72d?auto=format&fit=crop&q=80&w=800',
    benefits: [
      'Tiếp cận trực tiếp hàng trăm doanh nghiệp thu mua lớn.',
      'Quản lý tồn kho và kế hoạch gieo trồng thông minh.',
      'Nhận thanh toán nhanh chóng qua hệ thống ví AgriPay.',
    ],
    buttonText: 'Đăng ký bán hàng',
  },
  {
    id: 'Partner' as UserRole,
    tag: 'Doanh Nghiệp',
    title: 'Dành cho Đơn Vị Thu Mua',
    image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80&w=800',
    benefits: [
      'Nguồn cung ổn định, chất lượng được kiểm định nghiêm ngặt.',
      'Chương trình tín dụng hỗ trợ vốn thu mua nông sản.',
      'Dễ dàng theo dõi lịch trình vận chuyển trực tuyến.',
    ],
    buttonText: 'Đăng ký mua hàng',
  },
  {
    id: 'Shipper' as UserRole,
    tag: 'Vận Chuyển',
    title: 'Dành cho Đơn Vị Vận Tải',
    image: 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&q=80&w=800',
    benefits: [
      'Tối ưu hóa lộ trình bằng AI để tiết kiệm nhiên liệu.',
      'Hệ thống quản lý đơn hàng đầu-cuối chuyên nghiệp.',
      'Nâng cao thu nhập với nguồn đơn hàng dồi dào.',
    ],
    buttonText: 'Trở thành đối tác',
  },
];

export const RoleSection: React.FC = () => {
  return (
    <section id="vai-tro" className="py-16 lg:py-24 px-4 lg:px-12 bg-[#f7fbf0]">
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#181d16] tracking-tight">
            Vai Trò Của Bạn Trong Hệ Sinh Thái
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {ROLES.map((role) => (
            <div
              key={role.id as string}
              className="bg-[#f1f5ea] border border-[#e0e4d9] rounded-3xl p-5 sm:p-6 flex flex-col justify-between space-y-6 hover:shadow-lg transition-all"
            >
              <div className="space-y-5">
                <div className="relative rounded-2xl overflow-hidden h-[180px]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={role.image} alt={role.title} className="w-full h-full object-cover" />
                  <div className="absolute top-3 left-3 bg-[#176a22] text-white text-xs font-semibold px-3 py-1 rounded-md">
                    {role.tag}
                  </div>
                </div>

                <h3 className="text-xl font-bold text-[#181d16]">{role.title}</h3>

                <ul className="space-y-3">
                  {role.benefits.map((benefit, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#40493d]">
                      <CheckCircle2 className="w-4 h-4 text-[#176a22] shrink-0 mt-0.5" />
                      <span className="leading-snug">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <Link
                href="/auth/register"
                className="w-full py-3 px-4 border border-[#176a22] text-[#176a22] hover:bg-[#176a22] hover:text-white font-semibold text-sm rounded-xl transition-colors text-center inline-block"
              >
                {role.buttonText}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
