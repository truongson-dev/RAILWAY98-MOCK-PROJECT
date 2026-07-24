'use client';

// ─── Modal Base Component ──────────────────────────────────────────────────────
// Component modal tái sử dụng cho tất cả các modal trong app.
//
// Tính năng tích hợp sẵn:
//   - Đóng khi nhấn Escape (keyboard accessibility)
//   - Đóng khi click vào backdrop (vùng tối bên ngoài)
//   - Header có 2 variant: 'light' (nền sáng) và 'dark' (nền xanh #176a22)
//   - Tự động overflow scroll cho nội dung dài
//
// Cách dùng:
//   <Modal isOpen={isOpen} onClose={onClose} title="Tiêu đề" headerVariant="dark">
//     <div className="p-6">...nội dung...</div>
//   </Modal>
//
// Lưu ý: Không tự thêm padding vào Modal — để component con tự quản lý spacing

import React, { useEffect } from 'react';
import { X } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  subtitle?: string;
  headerIcon?: React.ReactNode;
  headerVariant?: 'light' | 'dark';
  maxWidth?: string;
  children: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  subtitle,
  headerIcon,
  headerVariant = 'light',
  maxWidth = 'max-w-3xl',
  children,
}) => {
  // Close on Escape key
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const headerBg =
    headerVariant === 'dark'
      ? 'bg-[#176a22] text-white'
      : 'bg-[#f1f5ea] text-[#181d16] border-b border-[#e0e4d9]';

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div
        className={`bg-[#f7fbf0] w-full ${maxWidth} rounded-3xl shadow-2xl border border-[#e0e4d9] max-h-[90vh] flex flex-col overflow-hidden`}
      >
        {/* Header */}
        {(title || headerIcon) && (
          <div className={`px-6 py-5 flex items-center justify-between ${headerBg}`}>
            <div className="flex items-center gap-3">
              {headerIcon && (
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                    headerVariant === 'dark' ? 'bg-white/15' : 'bg-[#176a22] text-white'
                  }`}
                >
                  {headerIcon}
                </div>
              )}
              {title && (
                <div>
                  <h2 className="text-lg sm:text-xl font-bold font-sans">{title}</h2>
                  {subtitle && (
                    <p
                      className={`text-xs mt-0.5 ${
                        headerVariant === 'dark' ? 'text-emerald-100' : 'text-[#40493d]'
                      }`}
                    >
                      {subtitle}
                    </p>
                  )}
                </div>
              )}
            </div>

            <button
              onClick={onClose}
              aria-label="Đóng"
              className={`p-2 rounded-full transition-colors ${
                headerVariant === 'dark'
                  ? 'text-white/80 hover:text-white hover:bg-white/10'
                  : 'text-[#707a6c] hover:text-[#181d16] hover:bg-white'
              }`}
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        )}

        {/* Body */}
        <div className="flex-1 overflow-y-auto">{children}</div>
      </div>
    </div>
  );
};
