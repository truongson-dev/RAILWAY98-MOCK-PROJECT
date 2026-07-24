'use client';

import React, { useState } from 'react';
import { Bell, ShieldCheck, Box, Truck, CheckCheck, FileText, ArrowRight, Sparkles } from 'lucide-react';
import { Modal } from '@/components/ui/Modal';
import { useUIStore } from '@/store/uiStore';

interface AppNotification {
  id: string;
  title: string;
  message: string;
  time: string;
  type: 'escrow' | 'product' | 'logistics' | 'certification';
  isRead: boolean;
  actionType?: 'openEscrow' | 'openQr' | 'openMarketplace';
  actionData?: string;
}

const INITIAL_NOTIFICATIONS: AppNotification[] = [
  {
    id: 'n1', title: 'Xác Nhận Đặt Cọc Escrow 67%',
    message: 'Công ty CP Tập Đoàn Chế Biến Thực Phẩm VinAgri đã hoàn tất chuyển cọc 67% (837.500.000 VNĐ) vào tài khoản Tạm Khóa Escrow cho đơn hàng 50 Tấn Thanh Long.',
    time: '10 phút trước', type: 'escrow', isRead: false, actionType: 'openEscrow',
  },
  {
    id: 'n2', title: 'Lô Hàng Mới Lên Sàn B2B',
    message: 'HTX Nông Nghiệp Tiền Giang vừa niêm yết 45 Tấn Thanh Long Ruột Đỏ GlobalGAP (Mã QR: LOT-TL-2026-009) giá 25.000 đ/kg.',
    time: '35 phút trước', type: 'product', isRead: false, actionType: 'openQr', actionData: 'LOT-TL-2026-009',
  },
  {
    id: 'n3', title: 'Cảm Biến IoT Cold-Chain Báo Cáo',
    message: 'Container BKS 63C-129.88 đang vận chuyển sầu riêng Đắk Lắk: Nhiệt độ ổn định ở 4.2°C, độ ẩm 85%.',
    time: '2 giờ trước', type: 'logistics', isRead: true,
  },
  {
    id: 'n4', title: 'Kiểm Định Chất Lượng Đạt Chuẩn',
    message: 'Trung Tâm Vinacontrol vừa cấp chứng nhận MRL EU cho lô hàng Sầu Riêng Ri6 Đắk Lắk (LOT-SR-2026-014). Sẵn sàng xuất khẩu.',
    time: '5 giờ trước', type: 'certification', isRead: true, actionType: 'openMarketplace',
  },
  {
    id: 'n5', title: 'Phê Duyệt Hạn Mức Tín Dụng B2B',
    message: 'Ngân hàng đối tác BIDV đã chấp thuận tài trợ vốn lưu động 2.000.000.000 VNĐ cho tài khoản doanh nghiệp của bạn.',
    time: '1 ngày trước', type: 'escrow', isRead: true,
  },
];

const ICON_MAP = {
  escrow: <ShieldCheck className="w-5 h-5 text-[#176a22]" />,
  product: <Box className="w-5 h-5 text-[#176a22]" />,
  logistics: <Truck className="w-5 h-5 text-blue-600" />,
  certification: <FileText className="w-5 h-5 text-amber-600" />,
};

const ACTION_LABEL_MAP = {
  openEscrow: 'Chi tiết Hợp Đồng Escrow',
  openQr: 'Xem Nhật Ký QR Lô Hàng',
  openMarketplace: 'Mở Sàn Giao Dịch B2B',
};

export const NotificationsModal: React.FC = () => {
  const {
    isNotificationsOpen, closeNotifications,
    openEscrowModal, openQrModal, openMarketplace,
    unreadCount, setUnreadCount,
  } = useUIStore();

  const [notifications, setNotifications] = useState<AppNotification[]>(INITIAL_NOTIFICATIONS);
  const [activeTab, setActiveTab] = useState<'all' | 'escrow' | 'product' | 'logistics'>('all');

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
    setUnreadCount(0);
  };

  const handleNotificationClick = (item: AppNotification) => {
    if (!item.isRead) {
      setNotifications((prev) => prev.map((n) => n.id === item.id ? { ...n, isRead: true } : n));
      setUnreadCount(Math.max(0, unreadCount - 1));
    }
    closeNotifications();
    if (item.actionType === 'openEscrow') openEscrowModal();
    else if (item.actionType === 'openQr') openQrModal(item.actionData ?? 'LOT-TL-2026-009');
    else if (item.actionType === 'openMarketplace') openMarketplace();
  };

  const filtered = notifications.filter((n) => activeTab === 'all' || n.type === activeTab);

  const TABS = [
    { key: 'all' as const, label: `Tất cả (${notifications.length})` },
    { key: 'escrow' as const, label: 'Escrow & Tín Dụng' },
    { key: 'product' as const, label: 'Sàn B2B & Lô Hàng' },
    { key: 'logistics' as const, label: 'IoT & Vận Tải' },
  ];

  return (
    <Modal
      isOpen={isNotificationsOpen}
      onClose={closeNotifications}
      title="Trung Tâm Thông Báo AgriConnect"
      subtitle="Cập nhật giao dịch B2B, hợp đồng Escrow & nhật ký Logistics IoT"
      headerIcon={
        <div className="relative">
          <Bell className="w-5 h-5" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center ring-2 ring-[#176a22]">
              {unreadCount}
            </span>
          )}
        </div>
      }
      headerVariant="light"
      maxWidth="max-w-2xl"
    >
      {/* Tab filters */}
      <div className="px-6 py-3 bg-[#f7fbf0] border-b border-[#e0e4d9] flex items-center gap-2 overflow-x-auto text-xs">
        {TABS.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`px-3.5 py-1.5 rounded-full font-semibold transition-all whitespace-nowrap ${
              activeTab === tab.key
                ? 'bg-[#176a22] text-white shadow-xs'
                : 'bg-white border border-[#bfcaba] text-[#40493d] hover:border-[#176a22]'
            }`}
          >
            {tab.label}
          </button>
        ))}
        {unreadCount > 0 && (
          <button
            onClick={markAllAsRead}
            className="ml-auto hidden sm:flex items-center gap-1 px-3 py-1.5 bg-white border border-[#bfcaba] text-[#176a22] text-xs font-semibold rounded-xl hover:bg-[#176a22] hover:text-white transition-colors shrink-0"
          >
            <CheckCheck className="w-3.5 h-3.5" />
            <span>Đã đọc tất cả</span>
          </button>
        )}
      </div>

      {/* Notifications list */}
      <div className="p-6 space-y-3">
        {filtered.map((item) => (
          <div
            key={item.id}
            onClick={() => handleNotificationClick(item)}
            className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-start gap-4 ${
              item.isRead
                ? 'bg-white border-[#e0e4d9] hover:border-[#176a22]/50'
                : 'bg-emerald-50/70 border-emerald-300 shadow-xs hover:bg-emerald-50'
            }`}
          >
            <div className="w-10 h-10 rounded-xl bg-[#ebefe4] border border-[#e0e4d9] flex items-center justify-center shrink-0">
              {ICON_MAP[item.type]}
            </div>
            <div className="flex-1 space-y-1">
              <div className="flex items-center justify-between gap-2">
                <h4 className="font-bold text-sm text-[#181d16] flex items-center gap-2">
                  {item.title}
                  {!item.isRead && <span className="w-2 h-2 rounded-full bg-[#176a22] inline-block" />}
                </h4>
                <span className="text-[11px] text-[#707a6c] whitespace-nowrap font-medium">
                  {item.time}
                </span>
              </div>
              <p className="text-xs text-[#40493d] leading-relaxed">{item.message}</p>
              {item.actionType && (
                <div className="pt-2 flex items-center gap-1 text-xs font-bold text-[#176a22]">
                  <span>{ACTION_LABEL_MAP[item.actionType]}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="px-6 py-4 bg-[#f1f5ea] border-t border-[#e0e4d9] flex items-center justify-between text-xs text-[#707a6c]">
        <span className="flex items-center gap-1">
          <Sparkles className="w-3.5 h-3.5 text-[#176a22]" />
          Thông báo tự động cập nhật từ hệ thống AgriLedger IoT
        </span>
      </div>
    </Modal>
  );
};
