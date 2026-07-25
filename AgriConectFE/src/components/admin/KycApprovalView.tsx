'use client';
// Đây là component thuộc giao diện Admin
import React, { useState } from 'react';
import { ShieldCheck, Search, Filter, CheckCircle2, Clock, AlertTriangle, FileText, ChevronRight, ChevronLeft, Check, X, Building2 } from 'lucide-react';
import { KycRecord } from '@/types/admin.types';

interface KycApprovalViewProps {
  records: KycRecord[];
  onOpenModal: (kyc: KycRecord) => void;
}

// Component: KycApprovalView - Giao diện quản lý/hiển thị cho Admin
export const KycApprovalView: React.FC<KycApprovalViewProps> = ({ records, onOpenModal }) => {
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(5);

  const filteredRecords = records.filter((r) => {
    const matchesStatus =
      filterStatus === 'all' ||
      (filterStatus === 'pending' && (r.status === 'pending' || r.status === 'needs_info')) ||
      r.status === filterStatus;
    const matchesQuery =
      r.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.taxCode.includes(searchQuery) ||
      r.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesQuery;
  });

  const totalItems = filteredRecords.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage) || 1;
  const validCurrentPage = Math.min(currentPage, totalPages);
  const startIdx = (validCurrentPage - 1) * itemsPerPage;
  const paginatedRecords = filteredRecords.slice(startIdx, startIdx + itemsPerPage);
  const startItemNum = totalItems > 0 ? startIdx + 1 : 0;
  const endItemNum = Math.min(startIdx + itemsPerPage, totalItems);

  return (
    <div className="p-6 md:p-8 space-y-6 bg-[#f7fbf0] min-h-full">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <ShieldCheck className="w-6 h-6 text-[#176a22]" />
            <h2 className="text-2xl font-bold text-[#181d16]">Phê Duyệt Hồ Sơ Doanh Nghiệp (KYC)</h2>
          </div>
          <p className="text-sm text-[#40493d] mt-1">
            Thẩm định thông tin pháp lý, chứng nhận VietGAP / GlobalGAP và quyền sử dụng đất nông nghiệp
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <span className="text-xs font-semibold bg-[#ba1a1a] text-white px-3 py-1.5 rounded-full shadow-2xs">
            14 hồ sơ chờ xử lý
          </span>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-white p-4 rounded-xl border border-[#e0e4d9] shadow-2xs flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#707a6c]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
            placeholder="Tìm theo tên doanh nghiệp, MST, tỉnh thành..."
            className="w-full pl-9 pr-4 py-2 text-xs bg-[#f7fbf0] border border-[#bfcaba] rounded-lg text-[#181d16] focus:outline-none focus:ring-2 focus:ring-[#176a22]"
          />
        </div>

        <div className="flex items-center space-x-2 w-full sm:w-auto">
          <Filter className="w-4 h-4 text-[#707a6c]" />
          <div className="flex bg-[#f1f5ea] p-1 rounded-lg border border-[#e0e4d9] text-xs">
            <button
              onClick={() => {
                setFilterStatus('all');
                setCurrentPage(1);
              }}
              className={`px-3 py-1 rounded-md font-medium cursor-pointer transition-colors ${filterStatus === 'all' ? 'bg-white text-[#181d16] shadow-2xs' : 'text-[#707a6c]'}`}
            >
              Tất cả
            </button>
            <button
              onClick={() => {
                setFilterStatus('pending');
                setCurrentPage(1);
              }}
              className={`px-3 py-1 rounded-md font-medium cursor-pointer transition-colors ${filterStatus === 'pending' ? 'bg-white text-[#ba1a1a] shadow-2xs' : 'text-[#707a6c]'}`}
            >
              Chờ duyệt / Cần bổ sung
            </button>
            <button
              onClick={() => {
                setFilterStatus('approved');
                setCurrentPage(1);
              }}
              className={`px-3 py-1 rounded-md font-medium cursor-pointer transition-colors ${filterStatus === 'approved' ? 'bg-white text-[#176a22] shadow-2xs' : 'text-[#707a6c]'}`}
            >
              Đã duyệt
            </button>
          </div>
        </div>
      </div>

      {/* KYC Applications Table */}
      <div className="bg-white rounded-xl border border-[#e0e4d9] shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-[#f1f5ea] border-b border-[#e0e4d9] text-[#707a6c] uppercase font-semibold">
                <th className="py-3 px-4">Tên Doanh Nghiệp</th>
                <th className="py-3 px-4">Loại hình</th>
                <th className="py-3 px-4">Mã số thuế</th>
                <th className="py-3 px-4">Địa bàn hoạt động</th>
                <th className="py-3 px-4">Giấy tờ đính kèm</th>
                <th className="py-3 px-4">Trạng thái</th>
                <th className="py-3 px-4 text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#e0e4d9]">
              {paginatedRecords.map((kyc) => (
                <tr key={kyc.id} className="hover:bg-[#f7fbf0] transition-colors">
                  <td className="py-3.5 px-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 rounded-lg bg-[#176a22]/10 text-[#176a22] flex items-center justify-center font-bold">
                        <Building2 className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="font-bold text-[#181d16]">{kyc.name}</p>
                        <p className="text-[11px] text-[#707a6c]">{kyc.category}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3.5 px-4 font-medium text-[#40493d]">
                    {kyc.type === 'supplier' ? 'Nhà cung cấp' : kyc.type === 'partner' ? 'Đối tác' : 'Vận chuyển'}
                  </td>
                  <td className="py-3.5 px-4 font-mono font-medium text-[#181d16]">{kyc.taxCode}</td>
                  <td className="py-3.5 px-4 text-[#40493d]">{kyc.location}</td>
                  <td className="py-3.5 px-4">
                    <div className="flex items-center space-x-1 text-[10px]">
                      {kyc.documents.businessLicense && (
                        <span className="bg-[#a3f69c]/30 text-[#003808] px-1.5 py-0.5 rounded font-medium">ĐKKD</span>
                      )}
                      {kyc.documents.vietGapCert && (
                        <span className="bg-[#e0f2fe] text-[#0284c7] px-1.5 py-0.5 rounded font-medium">VietGAP</span>
                      )}
                      {kyc.documents.landCertificate && (
                        <span className="bg-[#ffedd5] text-[#d97706] px-1.5 py-0.5 rounded font-medium">Thổ nhưỡng</span>
                      )}
                    </div>
                  </td>
                  <td className="py-3.5 px-4">
                    {kyc.status === 'pending' && (
                      <span className="inline-flex items-center space-x-1 bg-[#ffedd5] text-[#d97706] px-2.5 py-1 rounded-full font-semibold">
                        <Clock className="w-3 h-3" />
                        <span>Chờ duyệt</span>
                      </span>
                    )}
                    {kyc.status === 'needs_info' && (
                      <span className="inline-flex items-center space-x-1 bg-[#ffdad6] text-[#ba1a1a] px-2.5 py-1 rounded-full font-semibold">
                        <AlertTriangle className="w-3 h-3" />
                        <span>Thiếu tệp</span>
                      </span>
                    )}
                    {kyc.status === 'approved' && (
                      <span className="inline-flex items-center space-x-1 bg-[#a3f69c]/40 text-[#003808] px-2.5 py-1 rounded-full font-semibold">
                        <CheckCircle2 className="w-3 h-3 text-[#176a22]" />
                        <span>Đã duyệt</span>
                      </span>
                    )}
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <button
                      onClick={() => onOpenModal(kyc)}
                      className="px-3 py-1.5 bg-[#176a22] hover:bg-[#13561b] text-white text-xs font-semibold rounded-lg shadow-2xs transition-colors cursor-pointer"
                    >
                      Thẩm định
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Bottom Pagination Bar */}
        <div className="bg-white p-4 border-t border-[#e0e4d9] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#40493d]">
          <div className="flex items-center space-x-3">
            <span>
              Hiển thị <strong>{startItemNum}</strong> - <strong>{endItemNum}</strong> trên tổng số <strong>{totalItems}</strong> hồ sơ
            </span>

            <div className="flex items-center space-x-1">
              <span className="text-[#707a6c]">Hiển thị:</span>
              <select
                value={itemsPerPage}
                onChange={(e) => {
                  setItemsPerPage(Number(e.target.value));
                  setCurrentPage(1);
                }}
                className="px-2 py-1 bg-[#f7fbf0] border border-[#bfcaba] rounded-md text-[#181d16] font-semibold focus:outline-none cursor-pointer"
              >
                <option value={5}>5 / trang</option>
                <option value={10}>10 / trang</option>
                <option value={20}>20 / trang</option>
              </select>
            </div>
          </div>

          <div className="flex items-center space-x-1">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={validCurrentPage === 1}
              className={`p-1.5 rounded-lg border transition-all cursor-pointer flex items-center ${
                validCurrentPage === 1
                  ? 'border-[#e0e4d9] text-[#bfcaba] cursor-not-allowed bg-gray-50'
                  : 'border-[#bfcaba] text-[#181d16] hover:bg-[#f7fbf0]'
              }`}
              title="Trang trước"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`w-8 h-8 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  validCurrentPage === page
                    ? 'bg-[#176a22] text-white shadow-xs'
                    : 'bg-white text-[#40493d] border border-[#e0e4d9] hover:bg-[#f7fbf0]'
                }`}
              >
                {page}
              </button>
            ))}

            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={validCurrentPage === totalPages}
              className={`p-1.5 rounded-lg border transition-all cursor-pointer flex items-center ${
                validCurrentPage === totalPages
                  ? 'border-[#e0e4d9] text-[#bfcaba] cursor-not-allowed bg-gray-50'
                  : 'border-[#bfcaba] text-[#181d16] hover:bg-[#f7fbf0]'
              }`}
              title="Trang tiếp"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
