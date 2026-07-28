import React from 'react';
import { X, Bell, Check, ShoppingBag, DollarSign, CloudRain, ShieldAlert } from 'lucide-react';
import { NoticeItem } from '../types';

interface NotificationsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  notices: NoticeItem[];
  onMarkAllRead: () => void;
}

export const NotificationsDrawer: React.FC<NotificationsDrawerProps> = ({
  isOpen,
  onClose,
  notices,
  onMarkAllRead
}) => {
  if (!isOpen) return null;

  const getNoticeIcon = (type: NoticeItem['type']) => {
    switch (type) {
      case 'order':
        return <ShoppingBag size={16} className="text-[#176a22]" />;
      case 'finance':
        return <DollarSign size={16} className="text-emerald-700" />;
      case 'weather':
        return <CloudRain size={16} className="text-blue-600" />;
      default:
        return <ShieldAlert size={16} className="text-amber-600" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/30 backdrop-blur-xs">
      <div className="bg-white w-full max-w-md h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-200">
        <div className="bg-[#f1f5ea] px-6 py-4 border-b border-[#e0e4d9] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bell size={20} className="text-[#176a22]" />
            <h3 className="font-bold text-[#181d16] text-base">Thông báo mới</h3>
          </div>
          <button onClick={onClose} className="p-1.5 text-[#5e6958] hover:text-[#ba1a1a] rounded-lg">
            <X size={20} />
          </button>
        </div>

        <div className="p-4 border-b border-[#e0e4d9] flex justify-between items-center bg-[#f7fbf0]">
          <span className="text-xs text-[#5e6958] font-medium">
            Tất cả thông báo ({notices.length})
          </span>
          <button
            onClick={onMarkAllRead}
            className="text-xs text-[#176a22] font-semibold hover:underline flex items-center gap-1"
          >
            <Check size={14} /> Đánh dấu đã đọc tất cả
          </button>
        </div>

        <div className="flex-1 overflow-y-auto divide-y divide-[#e0e4d9]">
          {notices.map((notif) => (
            <div 
              key={notif.id} 
              className={`p-4 hover:bg-[#f7fbf0] transition-colors ${!notif.isRead ? 'bg-[#f0f7eb]' : ''}`}
            >
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-full bg-[#e0e8d6] shrink-0 mt-0.5">
                  {getNoticeIcon(notif.type)}
                </div>
                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] uppercase font-bold tracking-wider text-[#176a22]">
                      {notif.category}
                    </span>
                    <span className="text-[11px] text-[#707a6c]">{notif.timeAgo}</span>
                  </div>
                  <h4 className="text-sm font-bold text-[#181d16] leading-snug">
                    {notif.title}
                  </h4>
                  {notif.content && (
                    <p className="text-xs text-[#5e6958] leading-relaxed">
                      {notif.content}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
