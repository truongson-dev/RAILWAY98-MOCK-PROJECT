import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { StatsBanner } from './components/StatsBanner';
import { TechSolutionsSection } from './components/TechSolutionsSection';
import { RoleSection } from './components/RoleSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { PartnersSection } from './components/PartnersSection';
import { Footer } from './components/Footer';
import { MarketplaceModal } from './components/modals/MarketplaceModal';
import { QrTraceModal } from './components/modals/QrTraceModal';
import { EscrowModal } from './components/modals/EscrowModal';
import { RegisterModal } from './components/modals/RegisterModal';
import { CertDetailsModal } from './components/modals/CertDetailsModal';
import { NotificationsModal } from './components/modals/NotificationsModal';
import { AiAssistant } from './components/AiAssistant';
import { AgProduct, UserRole } from './types';

export default function App() {
  // Modal states
  const [isMarketplaceOpen, setIsMarketplaceOpen] = useState(false);
  const [isQrModalOpen, setIsQrModalOpen] = useState(false);
  const [selectedBatchCode, setSelectedBatchCode] = useState('LOT-TL-2026-009');
  const [isEscrowModalOpen, setIsEscrowModalOpen] = useState(false);
  const [selectedEscrowProduct, setSelectedEscrowProduct] = useState<AgProduct | null>(null);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [registerRole, setRegisterRole] = useState<UserRole>('farmer');
  const [authInitialTab, setAuthInitialTab] = useState<'login' | 'register'>('register');
  const [isCertModalOpen, setIsCertModalOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(2);

  const handleOpenRegisterWithRole = (role: UserRole = 'farmer', tab: 'login' | 'register' = 'register') => {
    setRegisterRole(role);
    setAuthInitialTab(tab);
    setIsRegisterModalOpen(true);
  };

  const handleOpenQrWithBatch = (code: string) => {
    setSelectedBatchCode(code);
    setIsQrModalOpen(true);
  };

  const handleOpenEscrowWithProduct = (product: AgProduct) => {
    setSelectedEscrowProduct(product);
    setIsEscrowModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#f7fbf0] text-[#181d16] font-sans antialiased selection:bg-[#176a22] selection:text-white flex flex-col justify-between">
      
      {/* Global Navbar */}
      <Navbar
        onOpenMarketplace={() => setIsMarketplaceOpen(true)}
        onOpenRegister={handleOpenRegisterWithRole}
        onOpenNotifications={() => setIsNotificationsOpen(true)}
        unreadCount={unreadCount}
      />

      {/* Main Page Layout */}
      <main className="flex-1">
        {/* 1. Hero Section */}
        <HeroSection
          onStartNow={() => setIsMarketplaceOpen(true)}
          onViewProduct={() => {
            setSelectedBatchCode('LOT-TL-2026-009');
            setIsQrModalOpen(true);
          }}
          onViewTestimonials={() => {
            const section = document.querySelector('section:has(h2)');
            if (section) {
              window.scrollTo({ top: 1800, behavior: 'smooth' });
            }
          }}
        />

        {/* 2. Key Stats Banner */}
        <StatsBanner />

        {/* 3. Tech Solutions Grid (QR, Smart Logistics, Certs) */}
        <TechSolutionsSection
          onOpenQrModal={() => handleOpenQrWithBatch('LOT-TL-2026-009')}
          onOpenLogisticsModal={() => {
            alert('Cảm biến IoT Cold-Chain Log:\n- Xe tải container B2B: BKS 63C-129.88\n- Nhiệt độ thùng đông: 4.2°C (Chuẩn 3.5°C - 5.0°C)\n- Vị trí: Đường cao tốc Trung Lương - TP.HCM');
          }}
          onOpenCertModal={() => setIsCertModalOpen(true)}
        />

        {/* 4. Role in Ecosystem Cards */}
        <RoleSection onRegisterRole={handleOpenRegisterWithRole} />

        {/* 5. Customer Testimonials & Reviews */}
        <TestimonialsSection />

        {/* 6. Strategic Partners & Certifications */}
        <PartnersSection />
      </main>

      {/* Footer */}
      <Footer onOpenCertModal={() => setIsCertModalOpen(true)} />

      {/* Modals & Extensions */}
      <MarketplaceModal
        isOpen={isMarketplaceOpen}
        onClose={() => setIsMarketplaceOpen(false)}
        onSelectProductForQr={handleOpenQrWithBatch}
      />

      <QrTraceModal
        isOpen={isQrModalOpen}
        onClose={() => setIsQrModalOpen(false)}
        batchCode={selectedBatchCode}
      />

      <EscrowModal
        isOpen={isEscrowModalOpen}
        onClose={() => setIsEscrowModalOpen(false)}
        selectedProduct={selectedEscrowProduct}
      />

      <RegisterModal
        isOpen={isRegisterModalOpen}
        onClose={() => setIsRegisterModalOpen(false)}
        defaultRole={registerRole}
        initialTab={authInitialTab}
      />

      <CertDetailsModal
        isOpen={isCertModalOpen}
        onClose={() => setIsCertModalOpen(false)}
      />

      <NotificationsModal
        isOpen={isNotificationsOpen}
        onClose={() => setIsNotificationsOpen(false)}
        onOpenEscrow={() => handleOpenQrWithBatch('LOT-TL-2026-009')}
        onOpenQr={(code) => {
          setSelectedBatchCode(code);
          setIsQrModalOpen(true);
        }}
        onOpenMarketplace={() => setIsMarketplaceOpen(true)}
        unreadCount={unreadCount}
        setUnreadCount={setUnreadCount}
      />

      {/* Floating AI Assistant Chat Widget */}
      <AiAssistant />

    </div>
  );
}
