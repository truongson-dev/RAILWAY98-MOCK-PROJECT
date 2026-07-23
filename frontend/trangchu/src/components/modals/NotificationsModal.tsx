import React, { useState } from 'react';
import { X, Bell, ShieldCheck, Box, Truck, CheckCheck, FileText, ArrowRight, Sparkles } from 'lucide-react';

export interface AppNotification {
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
    id: 'n1',
    title: 'Xác Nhận Đặt Cọc Escrow 67%',
    message: 'Công ty CP Tập Đoàn Chế Biến Thực Phẩm VinAgri đã hoàn tất chuyển cọc 67% (837.500.000 VNĐ) vào tài khoản Tạm Khóa Escrow cho đơn hàng 50 Tấn Thanh Long.',
    time: '10 phút trước',
    type: 'escrow',
    isRead: false,
    actionType: 'openEscrow',
  },
  {
    id: 'n2',
    title: 'Lô Hàng Mới Lên Sàn B2B',
    message: 'HTX Nông Nghiệp Tiền Giang vừa niêm yết 45 Tấn Thanh Long Ruột Đỏ GlobalGAP (Mã QR: LOT-TL-2026-009) giá 25.000 đ/kg.',
    time: '35 phút trước',
    type: 'product',
    isRead: false,
    actionType: 'openQr',
    actionData: 'LOT-TL-2026-009',
  },
  {
    id: 'n3',
    title: 'Cảm Biến IoT Cold-Chain Báo Cáo',
    message: 'Container BKS 63C-129.88 đang vận chuyển sầu riêng Đắk Lắk: Nhiệt độ ổn định ở 4.2°C, độ ẩm 85%. Dòng xe đang di chuyển trên cao tốc Trung Lương.',
    time: '2 giờ trước',
    type: 'logistics',
    isRead: true,
  },
  {
    id: 'n4',
    title: 'Kiểm Định Chất Lượng Đạt Chuẩn',
    message: 'Trung Tâm Vinacontrol vừa cấp chứng nhận MRL EU cho lô hàng Sầu Riêng Ri6 Đắk Lắk (LOT-SR-2026-014). Sẵn sàng xuất khẩu.',
    time: '5 giờ trước',
    type: 'certification',
    isRead: true,
    actionType: 'openMarketplace',
  },
  {
    id: 'n5',
    title: 'Phê Duyệt Hạn Mức Tín Dụng B2B',
    message: 'Ngân hàng đối tác BIDV đã chấp thuận tài trợ vốn lưu động nông sản 2.000.000.000 VNĐ cho tài khoản doanh nghiệp của bạn.',
    time: '1 ngày trước',
    type: 'escrow',
    isRead: true,
  },
];

interface NotificationsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenEscrow: () => void;
  onOpenQr: (batchCode: string) => void;
  onOpenMarketplace: () => void;
  unreadCount: number;
  setUnreadCount: (count: number) => void;
}

export const NotificationsModal: React.FC<NotificationsModalProps> = ({
  isOpen,
  onClose,
  onOpenEscrow,
  onOpenQr,
  onOpenMarketplace,
  unreadCount,
  setUnreadCount,
}) => {
  const [notifications, setNotifications] = useState<AppNotification[]>(INITIAL_NOTIFICATIONS);
  const [activeTab, setActiveTab] = useState<'all' | 'escrow' | 'product' | 'logistics'>('all');

  if (!isOpen) return null;

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
    setUnreadCount(0);
  };

  const handleNotificationClick = (item: AppNotification) => {
    // Mark item read
    if (!item.isRead) {
      setNotifications((prev) =>
        prev.map((n) => (n.id === item.id ? { ...n, isRead: true } : n))
      );
      setUnreadCount(Math.max(0, unreadCount - 1));
    }

    // Perform specific action
    onClose();
    if (item.actionType === 'openEscrow') {
      onOpenEscrow();
    } else if (item.actionType === 'openQr') {
      onOpenQr(item.actionData || 'LOT-TL-2026-009');
    } else if (item.actionType === 'openMarketplace') {
      onOpenMarketplace();
    }
  };

  const filteredList = notifications.filter((n) => {
    if (activeTab === 'all') return true;
    return n.type === activeTab;
  });

  const getIcon = (type: AppNotification['type']) => {
    switch (type) {
      case 'escrow':
        return <ShieldCheck className="w-5 h-5 text-[#176a22]" />;
      case 'product':
        return <Box className="w-5 h-5 text-[#176a22]" />;
      case 'logistics':
        return <Truck className="w-5 h-5 text-blue-600" />;
      case 'certification':
        return <FileText className="w-5 h-5 text-amber-600" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-[#f7fbf0] w-full max-w-2xl rounded-3xl shadow-2xl border border-[#e0e4d9] max-h-[88vh] flex flex-col overflow-hidden">
        
        {/* Header */}
        <div className="px-6 py-5 bg-[#f1f5ea] border-b border-[#e0e4d9] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#176a22] text-white flex items-center justify-center shadow-xs relative">
              <Bell className="w-5 h-5" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center ring-2 ring-[#f1f5ea]">
                  {unreadCount}
                </span>
              )}
            </div>
            <div>
              <h2 className="text-lg font-bold text-[#181d16] font-sans">
                Trung Tâm Thông Báo AgriConnect
              </h2>
              <p className="text-xs text-[#40493d]">
                Cập nhật giao dịch B2B, hợp đồng Escrow & nhật ký Logistics IoT
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {unreadCount > 0 && (
              <button
                onClick={markAllAsRead}
                className="hidden sm:flex items-center gap-1 px-3 py-1.5 bg-white border border-[#bfcaba] text-[#176a22] text-xs font-semibold rounded-xl hover:bg-[#176a22] hover:text-white transition-colors"
                title="Đánh dấu tất cả đã đọc"
              >
                <CheckCheck className="w-3.5 h-3.5" />
                <span>Đã đọc tất cả</span>
              </button>
            )}

            <button
              onClick={onClose}
              className="p-2 text-[#707a6c] hover:text-[#181d16] hover:bg-white rounded-full transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="px-6 py-3 bg-[#f7fbf0] border-b border-[#e0e4d9] flex items-center gap-2 overflow-x-auto text-xs">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-3.5 py-1.5 rounded-full font-semibold transition-all whitespace-nowrap ${
              activeTab === 'all'
                ? 'bg-[#176a22] text-white shadow-xs'
                : 'bg-white border border-[#bfcaba] text-[#40493d] hover:border-[#176a22]'
            }`}
          >
            Tất cả ({notifications.length})
          </button>
          <button
            onClick={() => setActiveTab('escrow')}
            className={`px-3.5 py-1.5 rounded-full font-semibold transition-all whitespace-nowrap ${
              activeTab === 'escrow'
                ? 'bg-[#176a22] text-white shadow-xs'
                : 'bg-white border border-[#bfcaba] text-[#40493d] hover:border-[#176a22]'
            }`}
          >
            Escrow & Tín Dụng
          </button>
          <button
            onClick={() => setActiveTab('product')}
            className={`px-3.5 py-1.5 rounded-full font-semibold transition-all whitespace-nowrap ${
              activeTab === 'product'
                ? 'bg-[#176a22] text-white shadow-xs'
                : 'bg-white border border-[#bfcaba] text-[#40493d] hover:border-[#176a22]'
            }`}
          >
            Sàn B2B & Lô Hàng
          </button>
          <button
            onClick={() => setActiveTab('logistics')}
            className={`px-3.5 py-1.5 rounded-full font-semibold transition-all whitespace-nowrap ${
              activeTab === 'logistics'
                ? 'bg-[#176a22] text-white shadow-xs'
                : 'bg-white border border-[#bfcaba] text-[#40493d] hover:border-[#176a22]'
            }`}
          >
            IoT & Vận Tải
          </button>
        </div>

        {/* List of Notifications */}
        <div className="p-6 overflow-y-auto space-y-3">
          {filteredList.map((item) => (
            <div
              key={item.id}
              onClick={() => handleNotificationClick(item)}
              className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-start gap-4 ${
                item.isRead
                  ? 'bg-white border-[#e0e4d9] hover:border-[#176a22]/50'
                  : 'bg-emerald-50/70 border-emerald-300 shadow-2xs hover:bg-emerald-50'
              }`}
            >
              {/* Type Icon */}
              <div className="w-10 h-10 rounded-xl bg-[#ebefe4] border border-[#e0e4d9] flex items-center justify-center shrink-0">
                {getIcon(item.type)}
              </div>

              {/* Content */}
              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between gap-2">
                  <h4 className="font-bold text-sm text-[#181d16] flex items-center gap-2">
                    {item.title}
                    {!item.isRead && (
                      <span className="w-2 h-2 rounded-full bg-[#176a22] inline-block" />
                    )}
                  </h4>
                  <span className="text-[11px] text-[#707a6c] whitespace-nowrap font-medium">
                    {item.time}
                  </span>
                </div>

                <p className="text-xs text-[#40493d] leading-relaxed">
                  {item.message}
                </p>

                {item.actionType && (
                  <div className="pt-2 flex items-center gap-1 text-xs font-bold text-[#176a22] hover:underline">
                    <span>
                      {item.actionType === 'openEscrow' && 'Chi tiết Hợp Đồng Escrow'}
                      {item.actionType === 'openQr' && 'Xem Nhật Ký QR Lô Hàng'}
                      {item.actionType === 'openMarketplace' && 'Mở Sàn Giao Dịch B2B'}
                    </span>
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
          <button
            onClick={markAllAsRead}
            className="sm:hidden text-[#176a22] font-bold"
          >
            Đánh dấu đã đọc
          </button>
        </div>

      </div>
    </div>
  );
};
