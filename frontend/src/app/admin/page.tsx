'use client';

import React, { useState } from 'react';
import { Sidebar } from '@/components/admin/Sidebar';
import { Header } from '@/components/admin/Header';
import { OverviewDashboard } from '@/components/admin/OverviewDashboard';
import { KycApprovalView } from '@/components/admin/KycApprovalView';
import { UsersManagementView } from '@/components/admin/UsersManagementView';
import { ProductsManagementView } from '@/components/admin/ProductsManagementView';
import { InventoryManagementView } from '@/components/admin/InventoryManagementView';
import { OrdersManagementView } from '@/components/admin/OrdersManagementView';
import { ContractsManagementView } from '@/components/admin/ContractsManagementView';
import { GenericSectionView } from '@/components/admin/GenericSectionView';
import { KycModal } from '@/components/admin/KycModal';
import { AiAnalysisModal } from '@/components/admin/AiAnalysisModal';
import { ExportReportModal } from '@/components/admin/ExportReportModal';
import { INITIAL_KYC_RECORDS } from '@/data/admin.mockData';
import { NavTab, KycRecord } from '@/types/admin.types';

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<NavTab>('overview');
  const [kycRecords, setKycRecords] = useState<KycRecord[]>(INITIAL_KYC_RECORDS);
  const [selectedKycForModal, setSelectedKycForModal] = useState<KycRecord | null>(null);
  const [aiModalConfig, setAiModalConfig] = useState<{ topic: string; context?: string } | null>(null);
  const [showExportModal, setShowExportModal] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  // Các thao tác (actions) đối với hồ sơ xác minh KYC
  const handleApproveKyc = (id: string) => {
    setKycRecords((prev) =>
      prev.map((k) => (k.id === id ? { ...k, status: 'approved', missingDocNote: 'Đã phê duyệt thành công' } : k))
    );
    showToast('Đã phê duyệt hồ sơ doanh nghiệp thành công!');
  };

  const handleRequestKycInfo = (id: string, note: string) => {
    setKycRecords((prev) =>
      prev.map((k) => (k.id === id ? { ...k, status: 'needs_info', missingDocNote: note || 'Cần bổ sung giấy tờ' } : k))
    );
    showToast('Đã gửi yêu cầu bổ sung chứng nhận cho doanh nghiệp.');
  };

  const handleRejectKyc = (id: string) => {
    setKycRecords((prev) =>
      prev.map((k) => (k.id === id ? { ...k, status: 'rejected', missingDocNote: 'Đã từ chối' } : k))
    );
    showToast('Đã từ chối hồ sơ doanh nghiệp.');
  };

  const pendingCount = kycRecords.filter((k) => k.status === 'pending' || k.status === 'needs_info').length;

  return (
    <div className="flex h-screen bg-[#f7fbf0] text-[#181d16] font-sans antialiased overflow-hidden select-none">
      {/* Sidebar - Thanh điều hướng bên trái */}
      <Sidebar
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        onOpenExportModal={() => setShowExportModal(true)}
        pendingKycCount={pendingCount}
      />

      {/* Vùng nội dung chính */}
      <div className="flex-1 flex flex-col h-screen overflow-y-auto custom-scrollbar">
        {/* Header - Thanh tiêu đề ở trên */}
        <Header
          onSearch={(query) => {
            if (query && activeTab === 'overview') {
              setActiveTab('kyc');
            }
          }}
          onOpenSettings={() => setActiveTab('system')}
          onOpenNotifications={() => setActiveTab('kyc')}
        />

        {/* Dynamic View Renderer - Hiển thị nội dung tùy theo tab */}
        <main className="flex-1">
          {activeTab === 'overview' && (
            <OverviewDashboard
              onSelectTab={setActiveTab}
              onOpenKycModal={(kyc) => setSelectedKycForModal(kyc)}
              onOpenAiAnalysis={(topic, context) => setAiModalConfig({ topic, context })}
            />
          )}

          {activeTab === 'kyc' && (
            <KycApprovalView
              records={kycRecords}
              onOpenModal={(kyc) => setSelectedKycForModal(kyc)}
            />
          )}

          {activeTab.startsWith('users') && (
            <UsersManagementView
              subTab={
                activeTab === 'users-suppliers'
                  ? 'suppliers'
                  : activeTab === 'users-partners'
                  ? 'partners'
                  : activeTab === 'users-logistics'
                  ? 'logistics'
                  : activeTab === 'users-permissions'
                  ? 'permissions'
                  : 'suppliers'
              }
            />
          )}

          {activeTab.startsWith('products') && (
            <ProductsManagementView />
          )}

          {activeTab === 'inventory' && (
            <InventoryManagementView />
          )}

          {activeTab === 'orders' && (
            <OrdersManagementView />
          )}

          {activeTab === 'contracts' && (
            <ContractsManagementView />
          )}

          {!['overview', 'kyc', 'inventory', 'orders', 'contracts'].includes(activeTab) && !activeTab.startsWith('users') && !activeTab.startsWith('products') && (
            <GenericSectionView
              tab={activeTab}
              onOpenAiModal={(topic, context) => setAiModalConfig({ topic, context })}
            />
          )}
        </main>
      </div>

      {/* Modal phê duyệt KYC */}
      {selectedKycForModal && (
        <KycModal
          kyc={selectedKycForModal}
          onClose={() => setSelectedKycForModal(null)}
          onApprove={handleApproveKyc}
          onRequestInfo={handleRequestKycInfo}
          onReject={handleRejectKyc}
        />
      )}

      {/* Modal phân tích bằng AI */}
      {aiModalConfig && (
        <AiAnalysisModal
          topic={aiModalConfig.topic}
          initialContext={aiModalConfig.context}
          onClose={() => setAiModalConfig(null)}
        />
      )}

      {/* Modal xuất báo cáo */}
      {showExportModal && (
        <ExportReportModal onClose={() => setShowExportModal(false)} />
      )}

      {/* Thông báo (Toast) nổi lên */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#176a22] text-white px-4 py-3 rounded-xl shadow-lg font-medium text-xs flex items-center space-x-2 animate-in slide-in-from-bottom-3 duration-200">
          <span className="w-2 h-2 bg-[#a3f69c] rounded-full" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
