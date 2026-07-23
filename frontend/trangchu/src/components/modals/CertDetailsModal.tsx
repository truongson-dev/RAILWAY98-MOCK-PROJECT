import React from 'react';
import { X, CheckCircle2, ShieldCheck, Award, FileCheck } from 'lucide-react';

interface CertDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CertDetailsModal: React.FC<CertDetailsModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-[#f7fbf0] w-full max-w-2xl rounded-3xl shadow-2xl border border-[#e0e4d9] max-h-[90vh] flex flex-col overflow-hidden">
        
        {/* Header */}
        <div className="px-6 py-5 bg-[#176a22] text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-bold font-sans">
                Tiêu Chuẩn Kiểm Định Chất Lượng 3 Lớp
              </h2>
              <p className="text-xs text-emerald-100">
                VietGAP, GlobalGAP & Tiêu chuẩn xuất khẩu chính ngạch
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
          
          {/* VietGAP Box */}
          <div className="bg-white border border-[#e0e4d9] rounded-2xl p-5 space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#ebefe4] text-[#176a22] font-bold flex items-center justify-center">
                🌱
              </div>
              <div>
                <h3 className="font-bold text-base text-[#181d16]">Tiêu Chuẩn VietGAP (Vietnamese Good Agricultural Practices)</h3>
                <p className="text-xs text-[#707a6c]">Được chứng nhận bởi Bộ Nông Nghiệp & Phát Triển Nông Thôn</p>
              </div>
            </div>
            <ul className="text-xs text-[#40493d] space-y-1.5 pl-2">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#176a22]" /> Kiểm soát dư lượng hóa chất BVTV dưới ngưỡng MRL cho phép.
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#176a22]" /> Nguồn nước tưới và đất trồng đạt xét nghiệm vi sinh.
              </li>
            </ul>
          </div>

          {/* GlobalGAP Box */}
          <div className="bg-white border border-[#e0e4d9] rounded-2xl p-5 space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#ebefe4] text-emerald-600 font-bold flex items-center justify-center">
                🌐
              </div>
              <div>
                <h3 className="font-bold text-base text-[#181d16]">Tiêu Chuẩn GlobalGAP (Global Partnership for Good Agricultural Practice)</h3>
                <p className="text-xs text-[#707a6c]">Đáp ứng tiêu chuẩn xuất khẩu sang thị trường Châu Âu (EU), Mỹ, Nhật Bản</p>
              </div>
            </div>
            <ul className="text-xs text-[#40493d] space-y-1.5 pl-2">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Mã số vùng trồng (Puckcode) xuất khẩu được cấp phép.
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Minh bạch toàn bộ nhật ký bón phân và thu hoạch theo thời gian thực.
              </li>
            </ul>
          </div>

          {/* Verification Protocol */}
          <div className="p-4 bg-[#f1f5ea] border border-[#e0e4d9] rounded-2xl flex items-center gap-3">
            <FileCheck className="w-6 h-6 text-[#176a22] shrink-0" />
            <p className="text-xs text-[#40493d]">
              Tất cả giấy chứng nhận lưu trên AgriConnect đều được đối soát tự động định kỳ với cơ sở dữ liệu của Cục Trồng Trọt và tổ chức giám định độc lập Vinacontrol.
            </p>
          </div>

        </div>

      </div>
    </div>
  );
};
