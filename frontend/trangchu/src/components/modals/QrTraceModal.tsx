import React from 'react';
import { X, QrCode, CheckCircle2, ShieldCheck, MapPin, Calendar, Thermometer, UserCheck, Download } from 'lucide-react';
import { MOCK_TRACE_BATCH } from '../../data/mockData';

interface QrTraceModalProps {
  isOpen: boolean;
  onClose: () => void;
  batchCode?: string;
}

export const QrTraceModal: React.FC<QrTraceModalProps> = ({
  isOpen,
  onClose,
  batchCode = 'LOT-TL-2026-009',
}) => {
  if (!isOpen) return null;

  const batch = MOCK_TRACE_BATCH;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-[#f7fbf0] w-full max-w-3xl rounded-3xl shadow-2xl border border-[#e0e4d9] max-h-[90vh] flex flex-col overflow-hidden">
        
        {/* Header */}
        <div className="px-6 py-5 bg-[#176a22] text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center">
              <QrCode className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold font-sans">
                Hồ Sơ Truy Xuất Nguồn Gốc QR (AgriPassport)
              </h2>
              <p className="text-xs text-emerald-100">
                Mã định danh duy nhất: <strong className="font-mono text-white">{batchCode}</strong>
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-full transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-6">
          
          {/* Top Banner: Product & QR Code Image */}
          <div className="bg-white border border-[#e0e4d9] rounded-2xl p-5 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-2xs">
            <div className="space-y-3 flex-1">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#e0e4d9] text-[#176a22] text-xs font-bold rounded-md">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>CHỨNG NHẬN ĐẠT CHUẨN XUẤT KHẨU</span>
              </div>
              <h3 className="text-xl font-bold text-[#181d16] font-sans">
                {batch.productName}
              </h3>
              <p className="text-xs text-[#40493d] flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-[#176a22]" />
                {batch.location}
              </p>
              <div className="flex items-center gap-2 pt-1">
                {batch.certifications.map((c, idx) => (
                  <span key={idx} className="px-2.5 py-0.5 bg-[#f1f5ea] border border-[#bfcaba] text-[#176a22] text-xs font-semibold rounded-md">
                    {c}
                  </span>
                ))}
              </div>
            </div>

            {/* QR Visual */}
            <div className="p-3 bg-white border border-[#e0e4d9] rounded-2xl flex flex-col items-center justify-center shrink-0 shadow-xs">
              <img src={batch.qrImage} alt="QR Code" className="w-28 h-28 object-contain" />
              <span className="text-[10px] text-[#707a6c] font-mono mt-1 font-semibold">
                Quét kiểm tra trực tiếp
              </span>
            </div>
          </div>

          {/* Timeline & Cultivation Log */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Left: Harvest & Coldchain */}
            <div className="bg-white border border-[#e0e4d9] rounded-2xl p-5 space-y-4">
              <h4 className="text-sm font-bold text-[#181d16] flex items-center gap-2 border-b border-[#f1f5ea] pb-2 font-sans">
                <Calendar className="w-4 h-4 text-[#176a22]" />
                Nhật Ký Thu Hoạch & Bảo Quản
              </h4>

              <div className="space-y-2.5 text-xs text-[#40493d]">
                <div className="flex justify-between py-1 border-b border-gray-100">
                  <span className="text-[#707a6c]">Thời gian thu hoạch:</span>
                  <span className="font-semibold text-[#181d16]">{batch.harvestDate}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-gray-100">
                  <span className="text-[#707a6c]">Thời gian đóng gói:</span>
                  <span className="font-semibold text-[#181d16]">{batch.packagingDate}</span>
                </div>
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

            {/* Right: Fertilizer & Pest Control */}
            <div className="bg-white border border-[#e0e4d9] rounded-2xl p-5 space-y-4">
              <h4 className="text-sm font-bold text-[#181d16] flex items-center gap-2 border-b border-[#f1f5ea] pb-2 font-sans">
                <ShieldCheck className="w-4 h-4 text-[#176a22]" />
                Nhật Ký Phân Bón & Bảo Vệ Thực Vật
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

          {/* Footer Action */}
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

      </div>
    </div>
  );
};
