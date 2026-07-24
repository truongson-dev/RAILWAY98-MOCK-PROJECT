'use client';
// Đây là component thuộc giao diện Admin
import React, { useState } from 'react';
import { X, Download, FileSpreadsheet, FileText, CheckCircle2, Calendar, Filter } from 'lucide-react';

interface ExportReportModalProps {
  onClose: () => void;
}

// Component: ExportReportModal - Giao diện quản lý/hiển thị cho Admin
export const ExportReportModal: React.FC<ExportReportModalProps> = ({ onClose }) => {
  const [reportType, setReportType] = useState('transactions');
  const [format, setFormat] = useState<'excel' | 'pdf' | 'csv'>('excel');
  const [dateRange, setDateRange] = useState('month');
  const [isExporting, setIsExporting] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const handleExport = () => {
    setIsExporting(true);
    setTimeout(() => {
      setIsExporting(false);
      setDownloadSuccess(true);
      setTimeout(() => {
        onClose();
      }, 1200);
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl max-w-lg w-full border border-[#e0e4d9] shadow-xl overflow-hidden">
        <div className="p-5 bg-[#f7fbf0] border-b border-[#e0e4d9] flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#176a22] text-white flex items-center justify-center">
              <Download className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-[#181d16]">Xuất Báo Cáo Hệ Thống</h3>
              <p className="text-xs text-[#707a6c]">Kết xuất dữ liệu tổng quan AgriConnect</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-[#707a6c] hover:bg-[#e0e4d9] rounded-full transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-4">
          {/* Report Type */}
          <div>
            <label className="block text-xs font-semibold text-[#181d16] mb-1.5">
              Loại báo cáo cần xuất:
            </label>
            <select
              value={reportType}
              onChange={(e) => setReportType(e.target.value)}
              className="w-full p-2.5 text-xs bg-white border border-[#bfcaba] rounded-xl text-[#181d16] focus:outline-none focus:ring-2 focus:ring-[#176a22]"
            >
              <option value="transactions">Báo cáo tổng giá trị giao dịch & Escrow (12.8 tỷ VNĐ)</option>
              <option value="users">Báo cáo thống kê người dùng & Hồ sơ KYC</option>
              <option value="contracts">Báo cáo hợp đồng & hạn mức tín dụng doanh nghiệp</option>
              <option value="ai-risk">Báo cáo tổng hợp cảnh báo rủi ro AI chuỗi cung ứng</option>
            </select>
          </div>

          {/* Date Range */}
          <div>
            <label className="block text-xs font-semibold text-[#181d16] mb-1.5">
              Khoảng thời gian:
            </label>
            <div className="grid grid-cols-3 gap-2 text-xs">
              <button
                type="button"
                onClick={() => setDateRange('week')}
                className={`py-2 px-3 rounded-lg border font-medium cursor-pointer ${dateRange === 'week' ? 'bg-[#a3f69c]/30 border-[#176a22] text-[#003808]' : 'bg-white border-[#bfcaba] text-[#40493d]'}`}
              >
                7 ngày qua
              </button>
              <button
                type="button"
                onClick={() => setDateRange('month')}
                className={`py-2 px-3 rounded-lg border font-medium cursor-pointer ${dateRange === 'month' ? 'bg-[#a3f69c]/30 border-[#176a22] text-[#003808]' : 'bg-white border-[#bfcaba] text-[#40493d]'}`}
              >
                30 ngày qua
              </button>
              <button
                type="button"
                onClick={() => setDateRange('year')}
                className={`py-2 px-3 rounded-lg border font-medium cursor-pointer ${dateRange === 'year' ? 'bg-[#a3f69c]/30 border-[#176a22] text-[#003808]' : 'bg-white border-[#bfcaba] text-[#40493d]'}`}
              >
                Năm 2026
              </button>
            </div>
          </div>

          {/* Format */}
          <div>
            <label className="block text-xs font-semibold text-[#181d16] mb-1.5">
              Định dạng tệp:
            </label>
            <div className="grid grid-cols-3 gap-2 text-xs">
              <button
                type="button"
                onClick={() => setFormat('excel')}
                className={`p-3 rounded-xl border flex flex-col items-center justify-center space-y-1 cursor-pointer ${format === 'excel' ? 'bg-[#a3f69c]/30 border-[#176a22] text-[#003808]' : 'bg-white border-[#bfcaba] text-[#40493d]'}`}
              >
                <FileSpreadsheet className="w-5 h-5 text-[#176a22]" />
                <span className="font-semibold">Excel (.xlsx)</span>
              </button>
              <button
                type="button"
                onClick={() => setFormat('pdf')}
                className={`p-3 rounded-xl border flex flex-col items-center justify-center space-y-1 cursor-pointer ${format === 'pdf' ? 'bg-[#a3f69c]/30 border-[#176a22] text-[#003808]' : 'bg-white border-[#bfcaba] text-[#40493d]'}`}
              >
                <FileText className="w-5 h-5 text-[#ba1a1a]" />
                <span className="font-semibold">PDF Báo cáo</span>
              </button>
              <button
                type="button"
                onClick={() => setFormat('csv')}
                className={`p-3 rounded-xl border flex flex-col items-center justify-center space-y-1 cursor-pointer ${format === 'csv' ? 'bg-[#a3f69c]/30 border-[#176a22] text-[#003808]' : 'bg-white border-[#bfcaba] text-[#40493d]'}`}
              >
                <FileText className="w-5 h-5 text-[#0284c7]" />
                <span className="font-semibold">CSV Dữ liệu</span>
              </button>
            </div>
          </div>

          {downloadSuccess && (
            <div className="p-3 bg-[#a3f69c]/40 border border-[#176a22] rounded-xl text-xs text-[#003808] flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-[#176a22]" />
              <span>Đã tải báo cáo xuống thành công!</span>
            </div>
          )}
        </div>

        <div className="p-4 bg-[#f7fbf0] border-t border-[#e0e4d9] flex items-center justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-[#40493d] hover:bg-[#e0e4d9] rounded-xl transition-colors cursor-pointer"
          >
            Hủy
          </button>
          <button
            onClick={handleExport}
            disabled={isExporting}
            className="px-5 py-2 text-xs font-semibold bg-[#176a22] hover:bg-[#13561b] text-white rounded-xl shadow-xs transition-colors cursor-pointer flex items-center space-x-1.5"
          >
            <Download className="w-4 h-4" />
            <span>{isExporting ? 'Đang tạo báo cáo...' : 'Tải xuống Báo Cáo'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
