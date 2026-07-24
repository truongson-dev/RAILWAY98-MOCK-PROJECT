'use client';

// ─── Landing Page ──────────────────────────────────────────────────────────────
// Component tổng hợp cho trang chủ công khai (/).
// Vai trò: ghép tất cả sections và modals lại thành một trang hoàn chỉnh.
//
// Kiến trúc:
//   - Đây là Client Component vì Navbar và các modal cần tương tác (onClick, useState)
//   - Tất cả trạng thái modal được quản lý tập trung trong uiStore (Zustand)
//     → Không có prop drilling, không cần truyền callback từ đây xuống section
//   - Các section (HeroSection, StatsBanner, ...) tự gọi useUIStore() nếu cần mở modal
//
// Khi thêm section mới:
//   1. Tạo file trong src/components/sections/
//   2. Import và đặt vào <main> theo đúng thứ tự hiển thị
//
// Khi thêm modal mới:
//   1. Tạo state trong uiStore.ts
//   2. Tạo component modal trong src/components/modals/
//   3. Thêm vào phần "Global Modals" bên dưới

import React from 'react';
import { Navbar } from '@/components/shared/Navbar';
import { Footer } from '@/components/shared/Footer';
import { HeroSection } from '@/components/sections/HeroSection';
import { StatsBanner } from '@/components/sections/StatsBanner';
import { TechSolutionsSection } from '@/components/sections/TechSolutionsSection';
import { RoleSection } from '@/components/sections/RoleSection';
import { TestimonialsSection } from '@/components/sections/TestimonialsSection';
import { PartnersSection } from '@/components/sections/PartnersSection';
import { AiAssistant } from '@/components/shared/AiAssistant';

// Modals
import { MarketplaceModal } from '@/components/modals/MarketplaceModal';
import { QrTraceModal } from '@/components/modals/QrTraceModal';
import { EscrowModal } from '@/components/modals/EscrowModal';
import { RegisterModal } from '@/components/modals/RegisterModal';
import { CertDetailsModal } from '@/components/modals/CertDetailsModal';
import { NotificationsModal } from '@/components/modals/NotificationsModal';

export const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#f7fbf0] flex flex-col">
      <Navbar />

      <main className="flex-1">
        <HeroSection />
        <StatsBanner />
        <TechSolutionsSection />
        <RoleSection />
        <TestimonialsSection />
        <PartnersSection />
      </main>

      <Footer />

      {/* Global Modals */}
      <MarketplaceModal />
      <QrTraceModal />
      <EscrowModal />
      <RegisterModal />
      <CertDetailsModal />
      <NotificationsModal />

      {/* Floating AI Chat Widget */}
      <AiAssistant />
    </div>
  );
};
