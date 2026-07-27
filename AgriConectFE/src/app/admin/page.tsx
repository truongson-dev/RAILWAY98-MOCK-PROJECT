'use client';

import React, { useState } from 'react';
import { Sidebar } from '@/components/admin/Sidebar';
import { Header } from '@/components/admin/Header';
import { OverviewDashboard } from '@/components/admin/OverviewDashboard';
import { UsersManagementView } from '@/components/admin/UsersManagementView';
import { ProductsManagementView } from '@/components/admin/ProductsManagementView';
import { InventoryManagementView } from '@/components/admin/InventoryManagementView';
import { OrdersManagementView } from '@/components/admin/OrdersManagementView';
import { ContractsManagementView } from '@/components/admin/ContractsManagementView';
import { GenericSectionView } from '@/components/admin/GenericSectionView';
import { AiAnalysisModal } from '@/components/admin/AiAnalysisModal';
import { ExportReportModal } from '@/components/admin/ExportReportModal';
import { NavTab } from '@/types/admin.types';

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<NavTab>('overview');
  const [aiModalConfig, setAiModalConfig] = useState<{ topic: string; context?: string } | null>(null);
  const [showExportModal, setShowExportModal] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  return (
    <div className="flex h-screen bg-[#f7fbf0] text-[#181d16] font-sans antialiased overflow-hidden select-none">
      {/* Sidebar */}
      <Sidebar
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        onOpenExportModal={() => setShowExportModal(true)}
      />

      {/* Vùng nội dung chính */}
      <div className="flex-1 flex flex-col h-screen overflow-y-auto custom-scrollbar">
        <Header
          onSearch={(query) => {
            if (query && activeTab === 'overview') setActiveTab('users');
          }}
          onOpenSettings={() => setActiveTab('system')}
          onOpenNotifications={() => setActiveTab('users')}
        />

        <main className="flex-1">
          {activeTab === 'overview' && (
            <OverviewDashboard
              onSelectTab={setActiveTab}
              onOpenKycModal={() => {}}
              onOpenAiAnalysis={(topic, context) => setAiModalConfig({ topic, context })}
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
                  : activeTab === 'users-pending'
                  ? 'pending'
                  : 'suppliers'
              }
            />
          )}

          {activeTab.startsWith('products') && <ProductsManagementView />}
          {activeTab === 'inventory' && <InventoryManagementView />}
          {activeTab === 'orders' && <OrdersManagementView />}
          {activeTab === 'contracts' && <ContractsManagementView />}

          {!['overview', 'inventory', 'orders', 'contracts'].includes(activeTab) &&
            !activeTab.startsWith('users') &&
            !activeTab.startsWith('products') && (
              <GenericSectionView
                tab={activeTab}
                onOpenAiModal={(topic, context) => setAiModalConfig({ topic, context })}
              />
            )}
        </main>
      </div>

      {/* Modal phân tích AI */}
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

      {/* Toast */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#176a22] text-white px-4 py-3 rounded-xl shadow-lg font-medium text-xs flex items-center space-x-2">
          <span className="w-2 h-2 bg-[#a3f69c] rounded-full" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
