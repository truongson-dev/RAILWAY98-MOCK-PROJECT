'use client';
// Đây là component thuộc giao diện Admin
import React, { useState } from 'react';
import { X, CheckCircle2, AlertTriangle, FileCheck, Shield, Phone, Mail, MapPin, Building, AlertCircle } from 'lucide-react';
import { KycRecord } from '@/types/admin.types';

interface KycModalProps {
  kyc: KycRecord | null;
  onClose: () => void;
  onApprove: (id: string) => void;
  onRequestInfo: (id: string, note: string) => void;
  onReject: (id: string) => void;
}

// Component: KycModal - Giao diện quản lý/hiển thị cho Admin
export const KycModal: React.FC<KycModalProps> = ({
  kyc,
  onClose,
  onApprove,
  onRequestInfo,
  onReject
}) => {
  if (!kyc) return null;

  const [noteText, setNoteText] = useState(kyc.missingDocNote || '');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleAction = (action: 'approve' | 'request' | 'reject') => {
    setIsSubmitting(true);
    setTimeout(() => {
      if (action === 'approve') onApprove(kyc.id);
      if (action === 'request') onRequestInfo(kyc.id, noteText);
      if (action === 'reject') onReject(kyc.id);
      setIsSubmitting(false);
      onClose();
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl max-w-2xl w-full border border-[#e0e4d9] shadow-xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="p-6 bg-[#f7fbf0] border-b border-[#e0e4d9] flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-[#176a22] text-white flex items-center justify-center font-bold text-lg shadow-xs">
              <Shield className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="text-lg font-bold text-[#181d16]">{kyc.name}</h3>
                <span className="text-xs px-2 py-0.5 rounded-full font-medium bg-[#a3f69c]/40 text-[#003808]">
                  {kyc.type === 'supplier' ? 'Nhà cung cấp' : kyc.type === 'partner' ? 'Đối tác' : 'Vận chuyển'}
                </span>
              </div>
              <p className="text-xs text-[#707a6c] mt-0.5">{kyc.category}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-[#707a6c] hover:bg-[#e0e4d9] rounded-full transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 space-y-6 overflow-y-auto">
          {/* Details Grid */}
          <div className="grid grid-cols-2 gap-4 text-xs bg-[#f1f5ea] p-4 rounded-xl border border-[#e0e4d9]">
            <div className="flex items-center space-x-2 text-[#40493d]">
              <Building className="w-4 h-4 text-[#707a6c]" />
              <span>Mã số thuế: <strong className="text-[#181d16]">{kyc.taxCode}</strong></span>
            </div>
            <div className="flex items-center space-x-2 text-[#40493d]">
              <MapPin className="w-4 h-4 text-[#707a6c]" />
              <span>Địa chỉ: <strong className="text-[#181d16]">{kyc.location}</strong></span>
            </div>
            <div className="flex items-center space-x-2 text-[#40493d]">
              <Phone className="w-4 h-4 text-[#707a6c]" />
              <span>SĐT đại diện: <strong className="text-[#181d16]">{kyc.phone}</strong></span>
            </div>
            <div className="flex items-center space-x-2 text-[#40493d]">
              <Mail className="w-4 h-4 text-[#707a6c]" />
              <span>Email: <strong className="text-[#181d16]">{kyc.email}</strong></span>
            </div>
          </div>

          {/* Document Verification Checklist */}
          <div>
            <h4 className="text-sm font-bold text-[#181d16] mb-3 flex items-center space-x-2">
              <FileCheck className="w-4 h-4 text-[#176a22]" />
              <span>Giấy tờ & Chứng nhận đính kèm</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className={`p-3 rounded-lg border flex items-center justify-between ${kyc.documents.businessLicense ? 'bg-[#a3f69c]/20 border-[#176a22]/30 text-[#003808]' : 'bg-[#ffdad6]/30 border-[#ba1a1a]/30 text-[#93000a]'}`}>
                <span>Giấy phép ĐKKD</span>
                {kyc.documents.businessLicense ? <CheckCircle2 className="w-4 h-4 text-[#176a22]" /> : <AlertCircle className="w-4 h-4 text-[#ba1a1a]" />}
              </div>
              <div className={`p-3 rounded-lg border flex items-center justify-between ${kyc.documents.idCard ? 'bg-[#a3f69c]/20 border-[#176a22]/30 text-[#003808]' : 'bg-[#ffdad6]/30 border-[#ba1a1a]/30 text-[#93000a]'}`}>
                <span>CCCD / CMND Đại diện</span>
                {kyc.documents.idCard ? <CheckCircle2 className="w-4 h-4 text-[#176a22]" /> : <AlertCircle className="w-4 h-4 text-[#ba1a1a]" />}
              </div>
              <div className={`p-3 rounded-lg border flex items-center justify-between ${kyc.documents.vietGapCert ? 'bg-[#a3f69c]/20 border-[#176a22]/30 text-[#003808]' : 'bg-[#f1f5ea] border-[#e0e4d9] text-[#707a6c]'}`}>
                <span>Chứng nhận VietGAP / Organic</span>
                {kyc.documents.vietGapCert ? <CheckCircle2 className="w-4 h-4 text-[#176a22]" /> : <span className="text-[10px]">Chưa bổ sung</span>}
              </div>
              <div className={`p-3 rounded-lg border flex items-center justify-between ${kyc.documents.landCertificate ? 'bg-[#a3f69c]/20 border-[#176a22]/30 text-[#003808]' : 'bg-[#f1f5ea] border-[#e0e4d9] text-[#707a6c]'}`}>
                <span>Giấy chứng nhận quyền sử dụng đất</span>
                {kyc.documents.landCertificate ? <CheckCircle2 className="w-4 h-4 text-[#176a22]" /> : <span className="text-[10px]">Chưa bổ sung</span>}
              </div>
            </div>
          </div>

          {/* Note Input */}
          <div>
            <label className="block text-xs font-semibold text-[#181d16] mb-1.5">
              Ghi chú xác minh / Yêu cầu bổ sung cho doanh nghiệp:
            </label>
            <textarea
              value={noteText}
              onChange={(e) => setNoteText(e.target.value)}
              placeholder="Nhập yêu cầu bổ sung chứng nhận hoặc ghi chú cho thẩm định viên..."
              rows={3}
              className="w-full p-3 text-xs bg-white border border-[#bfcaba] rounded-xl text-[#181d16] placeholder-[#707a6c] focus:outline-none focus:ring-2 focus:ring-[#176a22]"
            />
          </div>
        </div>

        {/* Modal Actions */}
        <div className="p-4 bg-[#f7fbf0] border-t border-[#e0e4d9] flex items-center justify-between">
          <button
            onClick={() => handleAction('reject')}
            disabled={isSubmitting}
            className="px-4 py-2 text-xs font-semibold text-[#ba1a1a] hover:bg-[#ffdad6] rounded-xl transition-colors cursor-pointer"
          >
            Từ chối hồ sơ
          </button>
          <div className="flex items-center space-x-3">
            <button
              onClick={() => handleAction('request')}
              disabled={isSubmitting}
              className="px-4 py-2 text-xs font-semibold bg-white border border-[#bfcaba] text-[#181d16] hover:bg-[#e0e4d9] rounded-xl transition-colors cursor-pointer"
            >
              Yêu cầu bổ sung
            </button>
            <button
              onClick={() => handleAction('approve')}
              disabled={isSubmitting}
              className="px-5 py-2 text-xs font-semibold bg-[#176a22] hover:bg-[#13561b] text-white rounded-xl shadow-xs transition-colors cursor-pointer flex items-center space-x-1.5"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Phê duyệt hồ sơ</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
