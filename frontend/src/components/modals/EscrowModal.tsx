'use client';

import React, { useState } from 'react';
import { ShieldCheck, Lock, CheckCircle2, DollarSign, Clock, ArrowRight } from 'lucide-react';
import { Modal } from '@/components/ui/Modal';
import { MOCK_ESCROW } from '@/data/mockData';
import { useUIStore } from '@/store/uiStore';
import { formatNumber } from '@/utils/currency';

export const EscrowModal: React.FC = () => {
  const { isEscrowModalOpen, closeEscrowModal, selectedEscrowProduct } = useUIStore();
  const [contractState, setContractState] = useState(MOCK_ESCROW);
  const [showSuccessToast, setShowSuccessToast] = useState(false);

  const currentProduct = selectedEscrowProduct
    ? {
        name: `${selectedEscrowProduct.availableQuantityTons} Tấn ${selectedEscrowProduct.name}`,
        value: selectedEscrowProduct.pricePerKg * selectedEscrowProduct.availableQuantityTons * 1000,
      }
    : { name: contractState.productName, value: contractState.totalValueVND };

  const handleSimulateDeposit = () => {
    setContractState((prev) => ({
      ...prev,
      status: 'Đã giải ngân 100%',
      progressPercent: 100,
      milestones: prev.milestones.map((m) => ({ ...m, completed: true, date: 'Hoàn tất hôm nay' })),
    }));
    setShowSuccessToast(true);
    setTimeout(() => setShowSuccessToast(false), 4000);
  };

  return (
    <Modal
      isOpen={isEscrowModalOpen}
      onClose={closeEscrowModal}
      title="Hợp Đồng Thanh Toán Tạm Khóa Escrow"
      subtitle={`Mã HĐ: ${contractState.id}`}
      headerIcon={<ShieldCheck className="w-5 h-5 text-white" />}
      headerVariant="dark"
      maxWidth="max-w-3xl"
    >
      <div className="p-6 space-y-6">
        {showSuccessToast && (
          <div className="p-4 bg-emerald-100 border border-emerald-300 text-emerald-900 rounded-2xl flex items-center gap-3 text-sm font-semibold">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
            <span>Thành công! Tiền ký quỹ Escrow đã được giải ngân 100% cho Nông trại!</span>
          </div>
        )}

        {/* Deal overview */}
        <div className="bg-white border border-[#e0e4d9] rounded-2xl p-5 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#f1f5ea] pb-4">
            <div>
              <span className="text-xs text-[#707a6c] font-medium block">Sản phẩm B2B:</span>
              <h3 className="text-lg font-bold text-[#181d16]">{currentProduct.name}</h3>
            </div>
            <div className="text-left sm:text-right">
              <span className="text-xs text-[#707a6c] font-medium block">Tổng giá trị:</span>
              <span className="text-xl font-bold text-[#176a22]">
                {formatNumber(currentProduct.value)} VNĐ
              </span>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="p-3 bg-[#f1f5ea] rounded-xl border border-[#e0e4d9]">
              <span className="text-[#707a6c] block">Bên mua:</span>
              <strong className="text-[#181d16] text-sm block mt-0.5">{contractState.buyerName}</strong>
            </div>
            <div className="p-3 bg-[#f1f5ea] rounded-xl border border-[#e0e4d9]">
              <span className="text-[#707a6c] block">Bên bán:</span>
              <strong className="text-[#181d16] text-sm block mt-0.5">{contractState.sellerName}</strong>
            </div>
          </div>
        </div>

        {/* Progress bar */}
        <div className="bg-[#176a22] text-white p-6 rounded-2xl space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Lock className="w-5 h-5 text-emerald-300" />
              <span className="font-bold text-sm">Trạng Thái Tạm Khóa Escrow</span>
            </div>
            <span className="px-3 py-1 bg-white/20 text-white text-xs font-bold rounded-full">
              {contractState.status}
            </span>
          </div>
          <div className="space-y-1.5">
            <div className="w-full bg-white/20 h-3 rounded-full overflow-hidden">
              <div
                className="bg-white h-full rounded-full transition-all duration-700"
                style={{ width: `${contractState.progressPercent}%` }}
              />
            </div>
            <div className="flex justify-between text-xs text-white/80 font-mono">
              <span>0% Đặt cọc</span>
              <span>Tiến độ: {contractState.progressPercent}%</span>
              <span>100% Giải ngân</span>
            </div>
          </div>
        </div>

        {/* Milestones */}
        <div className="bg-white border border-[#e0e4d9] rounded-2xl p-5 space-y-4">
          <h4 className="text-sm font-bold text-[#181d16] flex items-center gap-2">
            <Clock className="w-4 h-4 text-[#176a22]" />
            Các Cột Mốc Giải Ngân Tự Động
          </h4>
          <div className="space-y-3">
            {contractState.milestones.map((m, idx) => (
              <div
                key={idx}
                className={`p-3 rounded-xl border flex items-center justify-between gap-3 text-xs ${
                  m.completed
                    ? 'bg-emerald-50/60 border-emerald-200 text-emerald-950'
                    : 'bg-gray-50 border-gray-200 text-gray-600'
                }`}
              >
                <div className="flex items-center gap-3">
                  <CheckCircle2
                    className={`w-5 h-5 shrink-0 ${m.completed ? 'text-[#176a22]' : 'text-gray-300'}`}
                  />
                  <span className="font-semibold">{m.title}</span>
                </div>
                <span className="text-[11px] font-mono text-gray-500 shrink-0">{m.date}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Footer action */}
        <div className="pt-2 flex items-center justify-between">
          <p className="text-xs text-[#707a6c] max-w-sm">
            Tiền được tạm giữ an toàn tại Ngân hàng đối tác Vietcombank / BIDV.
          </p>
          <button
            onClick={handleSimulateDeposit}
            className="py-3 px-6 bg-[#176a22] hover:bg-[#12531a] active:scale-95 text-white font-semibold text-xs rounded-xl flex items-center gap-2 transition-all shadow-sm"
          >
            <DollarSign className="w-4 h-4" />
            <span>Thử nghiệm Giải Ngân 100%</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </Modal>
  );
};
