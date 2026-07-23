import React from 'react';
import { CheckCircle2 } from 'lucide-react';
import { IMAGES } from '../data/imagePaths';

interface RoleSectionProps {
  onRegisterRole: (role: 'farmer' | 'buyer' | 'carrier') => void;
}

export const RoleSection: React.FC<RoleSectionProps> = ({ onRegisterRole }) => {
  const roles = [
    {
      id: 'farmer' as const,
      tag: 'Nhà Cung Cấp',
      title: 'Dành cho Nhà Vườn & HTX',
      image: IMAGES.greenhouseFarm,
      benefits: [
        'Tiếp cận trực tiếp hàng trăm doanh nghiệp thu mua lớn.',
        'Quản lý tồn kho và kế hoạch gieo trồng thông minh.',
        'Nhận thanh toán nhanh chóng qua hệ thống ví AgriPay.',
      ],
      buttonText: 'Đăng ký bán hàng',
    },
    {
      id: 'buyer' as const,
      tag: 'Doanh Nghiệp',
      title: 'Dành cho Đơn Vị Thu Mua',
      image: IMAGES.b2bOffice,
      benefits: [
        'Nguồn cung ổn định, chất lượng được kiểm định nghiêm ngặt.',
        'Chương trình tín dụng hỗ trợ vốn thu mua nông sản.',
        'Dễ dàng theo dõi lịch trình vận chuyển trực tuyến.',
      ],
      buttonText: 'Đăng ký mua hàng',
    },
    {
      id: 'carrier' as const,
      tag: 'Vận Chuyển',
      title: 'Dành cho Đơn Vị Vận Tải',
      image: IMAGES.logisticsTruck,
      benefits: [
        'Tối ưu hóa lộ trình bằng AI để tiết kiệm nhiên liệu.',
        'Hệ thống quản lý đơn hàng đầu-cuối chuyên nghiệp.',
        'Nâng cao thu nhập với nguồn đơn hàng dồi dào.',
      ],
      buttonText: 'Trở thành đối tác',
    },
  ];

  return (
    <section id="vai-tro" className="py-16 lg:py-24 px-4 lg:px-12 bg-[#f7fbf0]">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#181d16] font-sans tracking-tight">
            Vai Trò Của Bạn Trong Hệ Sinh Thái
          </h2>
        </div>

        {/* 3 Columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {roles.map((role) => (
            <div
              key={role.id}
              className="bg-[#f1f5ea] border border-[#e0e4d9] rounded-3xl p-5 sm:p-6 flex flex-col justify-between space-y-6 hover:shadow-lg transition-all"
            >
              <div className="space-y-5">
                {/* Image with Tag */}
                <div className="relative rounded-2xl overflow-hidden h-[180px]">
                  <img
                    src={role.image}
                    alt={role.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 left-3 bg-[#176a22] text-white text-xs font-semibold px-3 py-1 rounded-md shadow-xs">
                    {role.tag}
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-[#181d16] font-sans">
                  {role.title}
                </h3>

                {/* Checkpoints */}
                <ul className="space-y-3">
                  {role.benefits.map((benefit, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#40493d]">
                      <CheckCircle2 className="w-4 h-4 text-[#176a22] shrink-0 mt-0.5" />
                      <span className="leading-snug">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Button */}
              <button
                onClick={() => onRegisterRole(role.id)}
                className="w-full py-3 px-4 border border-[#176a22] text-[#176a22] hover:bg-[#176a22] hover:text-white font-semibold text-sm rounded-xl transition-colors shadow-2xs"
              >
                {role.buttonText}
              </button>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
