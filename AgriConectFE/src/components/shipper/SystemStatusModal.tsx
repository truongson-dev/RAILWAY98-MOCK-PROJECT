import React from 'react';
import { Activity, CheckCircle2, Server, Wifi, Radio, Shield, X } from 'lucide-react';

interface SystemStatusModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SystemStatusModal: React.FC<SystemStatusModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const services = [
    { name: 'Hệ thống định vị GPS Real-time', status: 'Hoạt động tốt', latency: '18 ms', ok: true },
    { name: 'Cảm biến nhiệt độ Thùng Lạnh IoT', status: 'Hoạt động tốt', latency: '24 ms', ok: true },
    { name: 'Cổng kết nối Nhà Vườn (AgriMarket API)', status: 'Hoạt động tốt', latency: '12 ms', ok: true },
    { name: 'Hệ thống ghép chuyến tự động AI', status: 'Hoạt động tốt', latency: '35 ms', ok: true },
    { name: 'Máy chủ dữ liệu đơn hàng Cloud', status: 'Hoạt động tốt', latency: '15 ms', ok: true },
  ];

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl border border-[#bfcaba] space-y-5">
        <div className="flex justify-between items-center border-b border-[#bfcaba] pb-3">
          <div className="flex items-center gap-2 text-[#176a22]">
            <Activity className="w-5 h-5" />
            <h3 className="font-bold text-lg text-[#181d16]">Trạng thái hệ thống AgriShipper</h3>
          </div>
          <button onClick={onClose} className="p-1 text-[#40493d] hover:bg-[#e5eadf] rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="bg-emerald-50 border border-emerald-200 p-3.5 rounded-xl flex items-center gap-3">
          <div className="w-3 h-3 bg-emerald-500 rounded-full animate-ping" />
          <span className="text-xs font-bold text-emerald-900">
            Tất cả dịch vụ hệ thống vận tải đang hoạt động ở trạng thái tối ưu (99.98% Uptime).
          </span>
        </div>

        <div className="space-y-2.5">
          {services.map((svc, i) => (
            <div key={i} className="p-3 bg-[#f7fbf0] border border-[#bfcaba] rounded-xl flex justify-between items-center text-xs">
              <div>
                <span className="font-bold text-[#181d16] block">{svc.name}</span>
                <span className="text-[10px] text-[#40493d]">Độ trễ: {svc.latency}</span>
              </div>
              <span className="px-2.5 py-1 bg-emerald-100 text-emerald-800 font-bold rounded-full flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> {svc.status}
              </span>
            </div>
          ))}
        </div>

        <div className="pt-2 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-[#176a22] text-white rounded-lg font-bold text-sm hover:bg-[#12541a]"
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
};
