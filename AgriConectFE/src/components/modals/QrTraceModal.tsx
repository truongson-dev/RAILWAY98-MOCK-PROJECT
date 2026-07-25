'use client';

import React from 'react';
import { QrCode, CheckCircle2, ShieldCheck, MapPin, Calendar, Thermometer, UserCheck, Download } from 'lucide-react';
import { Modal } from '@/components/ui/Modal';
import { Badge } from '@/components/ui/Badge';
import { MOCK_TRACE_BATCH } from '@/data/mockData';
import { useUIStore } from '@/store/uiStore';

export const QrTraceModal: React.FC = () => {
  const { isQrModalOpen, closeQrModal, selectedBatchCode } = useUIStore();
  const batch = MOCK_TRACE_BATCH;

  return (
    <Modal
      isOpen={isQrModalOpen}
      onClose={closeQrModal}
      title="Hồ Sơ Truy Xuất Nguồn Gốc QR (AgriPassport)"
      subtitle={`Mã định danh duy nhất: ${selectedBatchCode}`}
      headerIcon={<QrCode className="w-5 h-5 text-white" />}
      headerVariant="dark"
      maxWidth="max-w-3xl"
    >
      <div className="p-6 space-y-6">
        {/* Product + QR image banner */}
        <div className="bg-white border border-[#e0e4d9] rounded-2xl p-5 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xs">
          <div className="space-y-3 flex-1">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#e0e4d9] text-[#176a22] text-xs font-bold rounded-md">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>CHỨNG NHẬN ĐẠT CHUẨN XUẤT KHẨU</span>
            </div>
            <h3 className="text-xl font-bold text-[#181d16]">{batch.productName}</h3>
            <p className="text-xs text-[#40493d] flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-[#176a22]" />
              {batch.location}
            </p>
            <div className="flex flex-wrap gap-2 pt-1">
              {batch.certifications.map((c, i) => (
                <Badge key={i} variant="gray">{c}</Badge>
              ))}
            </div>
          </div>
          <div className="p-3 bg-white border border-[#e0e4d9] rounded-2xl flex flex-col items-center shrink-0 shadow-xs">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={batch.qrImage} alt="QR Code" className="w-28 h-28 object-contain" />
            <span className="text-[10px] text-[#707a6c] font-mono mt-1 font-semibold">
              Quét kiểm tra trực tiếp
            </span>
          </div>
        </div>

        {/* Details grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Harvest & Cold-chain */}
          <div className="bg-white border border-[#e0e4d9] rounded-2xl p-5 space-y-4">
            <h4 className="text-sm font-bold text-[#181d16] flex items-center gap-2 border-b border-[#f1f5ea] pb-2">
              <Calendar className="w-4 h-4 text-[#176a22]" />
              Nhật Ký Thu Hoạch & Bảo Quản
            </h4>
            <div className="space-y-2.5 text-xs text-[#40493d]">
              {[
                { label: 'Thời gian thu hoạch:', value: batch.harvestDate },
                { label: 'Thời gian đóng gói:', value: batch.packagingDate },
              ].map(({ label, value }) => (
                <div key={label} className="flex justify-between py-1 border-b border-gray-100">
                  <span className="text-[#707a6c]">{label}</span>
                  <span className="font-semibold text-[#181d16]">{value}</span>
                </div>
              ))}
              <div className="flex justify-between py-1 border-b border-gray-100">
                <span className="text-[#707a6c] flex items-center gap-1">
                  <Thermometer className="w-3.5 h-3.5 text-blue-500" /> Nhiệt độ cold-chain:
                </span>
                <span className="font-semibold text-[#176a22]">{batch.coldChainTemp}</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-[#707a6c] flex items-center gap-1">
                  <UserCheck className="w-3.5 h-3.5 text-emerald-600" /> Đơn vị kiểm định:
                </span>
                <span className="font-semibold text-[#181d16]">{batch.inspector}</span>
              </div>
            </div>
          </div>

          {/* Fertilizer & Pest */}
          <div className="bg-white border border-[#e0e4d9] rounded-2xl p-5 space-y-4">
            <h4 className="text-sm font-bold text-[#181d16] flex items-center gap-2 border-b border-[#f1f5ea] pb-2">
              <ShieldCheck className="w-4 h-4 text-[#176a22]" />
              Nhật Ký Phân Bón & BVTV
            </h4>
            <div className="space-y-3">
              <div>
                <span className="text-[11px] font-semibold text-[#707a6c] block mb-1">Quy trình phân bón:</span>
                <ul className="space-y-1 text-xs text-[#40493d]">
                  {batch.fertilizerLog.map((log, i) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <span className="text-[#176a22] font-bold">•</span>
                      <span>{log}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="pt-2 border-t border-gray-100">
                <span className="text-[11px] font-semibold text-[#707a6c] block mb-1">Cách ly MRL:</span>
                <ul className="space-y-1 text-xs text-[#40493d]">
                  {batch.pestControlLog.map((log, i) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <span className="text-emerald-600 font-bold">•</span>
                      <span>{log}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Footer actions */}
        <div className="pt-2 flex items-center justify-between">
          <span className="text-xs text-[#707a6c]">
            Dữ liệu lưu trữ bất biến trên Blockchain AgriLedger
          </span>
          <button
            onClick={() => alert('Đã tải xuống Certificate Passport dưới dạng PDF!')}
            className="py-2.5 px-5 bg-[#176a22] hover:bg-[#12531a] text-white text-xs font-semibold rounded-xl flex items-center gap-2 transition-colors"
          >
            <Download className="w-4 h-4" />
            Tải Passport PDF
          </button>
        </div>
      </div>
    </Modal>
  );
};
