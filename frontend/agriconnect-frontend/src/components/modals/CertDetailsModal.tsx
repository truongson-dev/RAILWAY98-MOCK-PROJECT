'use client';

import React from 'react';
import { ShieldCheck, CheckCircle2, FileCheck } from 'lucide-react';
import { Modal } from '@/components/ui/Modal';
import { useUIStore } from '@/store/uiStore';

export const CertDetailsModal: React.FC = () => {
  const { isCertModalOpen, closeCertModal } = useUIStore();

  return (
    <Modal
      isOpen={isCertModalOpen}
      onClose={closeCertModal}
      title="Tiêu Chuẩn Kiểm Định Chất Lượng 3 Lớp"
      subtitle="VietGAP, GlobalGAP & Tiêu chuẩn xuất khẩu chính ngạch"
      headerIcon={<ShieldCheck className="w-5 h-5 text-white" />}
      headerVariant="dark"
      maxWidth="max-w-2xl"
    >
      <div className="p-6 space-y-6">
        {/* VietGAP */}
        <div className="bg-white border border-[#e0e4d9] rounded-2xl p-5 space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#ebefe4] flex items-center justify-center text-lg">🌱</div>
            <div>
              <h3 className="font-bold text-base text-[#181d16]">
                Tiêu Chuẩn VietGAP
              </h3>
              <p className="text-xs text-[#707a6c]">
                Được chứng nhận bởi Bộ Nông Nghiệp & Phát Triển Nông Thôn
              </p>
            </div>
          </div>
          <ul className="text-xs text-[#40493d] space-y-1.5 pl-2">
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#176a22]" />
              Kiểm soát dư lượng hóa chất BVTV dưới ngưỡng MRL cho phép.
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#176a22]" />
              Nguồn nước tưới và đất trồng đạt xét nghiệm vi sinh.
            </li>
          </ul>
        </div>

        {/* GlobalGAP */}
        <div className="bg-white border border-[#e0e4d9] rounded-2xl p-5 space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#ebefe4] flex items-center justify-center text-lg">🌐</div>
            <div>
              <h3 className="font-bold text-base text-[#181d16]">
                Tiêu Chuẩn GlobalGAP
              </h3>
              <p className="text-xs text-[#707a6c]">
                Đáp ứng tiêu chuẩn xuất khẩu sang EU, Mỹ, Nhật Bản
              </p>
            </div>
          </div>
          <ul className="text-xs text-[#40493d] space-y-1.5 pl-2">
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              Mã số vùng trồng (Puckcode) xuất khẩu được cấp phép.
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              Minh bạch toàn bộ nhật ký bón phân và thu hoạch theo thời gian thực.
            </li>
          </ul>
        </div>

        {/* Verification note */}
        <div className="p-4 bg-[#f1f5ea] border border-[#e0e4d9] rounded-2xl flex items-center gap-3">
          <FileCheck className="w-6 h-6 text-[#176a22] shrink-0" />
          <p className="text-xs text-[#40493d]">
            Tất cả giấy chứng nhận đều được đối soát tự động định kỳ với cơ sở dữ liệu
            của Cục Trồng Trọt và tổ chức giám định độc lập Vinacontrol.
          </p>
        </div>
      </div>
    </Modal>
  );
};
