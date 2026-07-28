import React from 'react';
import { Truck, CheckCircle2 } from 'lucide-react';

interface NotificationPopoverProps {
  isOpen: boolean;
  onClose: () => void;
  onMarkAllRead?: () => void;
  onViewAllActivities?: () => void;
}

export const NotificationPopover: React.FC<NotificationPopoverProps> = ({
  isOpen,
  onClose,
  onMarkAllRead,
  onViewAllActivities
}) => {
  if (!isOpen) return null;

  const newOrders = [
    { code: '#ORD-7829', time: 'Vừa xong', pickup: 'Kho Tổng Quận 7', delivery: 'Siêu thị Mega Market Q2' },
    { code: '#ORD-7830', time: '5p trước', pickup: 'Chợ Đầu Mối Bình Điền', delivery: 'Nhà hàng Sen Việt Q1' },
    { code: '#ORD-7831', time: '12p trước', pickup: 'Trang trại AgriFarm Củ Chi', delivery: 'Kho Trung Chuyển Q12' },
  ];

  const completedOrders = [
    { name: 'Nguyễn Huệ', initials: 'NH', code: '#ORD-98770', location: 'Bãi đỗ Quy Nhơn' },
    { name: 'Phan Trần D', initials: 'PT', code: '#ORD-98760', location: 'Bãi đỗ Huế' },
  ];

  const totalCount = newOrders.length + completedOrders.length;

  return (
    <div className="absolute right-0 mt-2 w-[380px] sm:w-[420px] bg-[#f7fbf0] border border-[#bfcaba] rounded-2xl shadow-2xl z-50 overflow-hidden text-[#181d16] animate-in fade-in duration-150">
      
      {/* HEADER */}
      <div className="flex items-center justify-between px-5 py-3.5 bg-[#f7fbf0] border-b border-[#bfcaba]/70">
        <div className="flex items-center gap-2.5">
          <h3 className="font-bold text-base text-[#181d16]">
            Thông báo
          </h3>
          <span className="w-6 h-6 rounded-full bg-[#e60000] text-white text-xs font-extrabold flex items-center justify-center shadow-2xs">
            {totalCount}
          </span>
        </div>

        <button
          onClick={() => {
            if (onMarkAllRead) onMarkAllRead();
          }}
          className="text-xs font-bold text-[#176a22] hover:underline transition-all"
        >
          Đánh dấu đã đọc
        </button>
      </div>

      {/* BODY CONTENT */}
      <div className="max-h-[460px] overflow-y-auto divide-y divide-[#bfcaba]/50">
        
        {/* SECTION 1: ĐƠN HÀNG MỚI ĐƯỢC GÁN */}
        <div className="p-4 space-y-3">
          <h4 className="text-[11px] font-bold text-[#40493d] uppercase tracking-wider">
            ĐƠN HÀNG MỚI ĐƯỢC GÁN
          </h4>

          <div className="space-y-2.5">
            {/* Item 1 */}
            <div className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-[#ebefe4] transition-colors cursor-pointer group">
              <div className="w-10 h-10 rounded-full bg-[#d2f3cd] flex items-center justify-center flex-shrink-0 text-[#176a22]">
                <Truck className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0 text-xs">
                <div className="flex justify-between items-center mb-1">
                  <span className="font-extrabold text-sm text-[#181d16]">#ORD-7829</span>
                  <span className="text-[11px] text-[#40493d] font-medium">Vừa xong</span>
                </div>
                <p className="text-[#40493d] font-medium leading-normal">
                  Kho Tổng Quận 7 <span className="text-[#176a22]">→</span> Siêu thị Mega Market Q2
                </p>
              </div>
            </div>

            {/* Item 2 */}
            <div className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-[#ebefe4] transition-colors cursor-pointer group">
              <div className="w-10 h-10 rounded-full bg-[#d2f3cd] flex items-center justify-center flex-shrink-0 text-[#176a22]">
                <Truck className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0 text-xs">
                <div className="flex justify-between items-center mb-1">
                  <span className="font-extrabold text-sm text-[#181d16]">#ORD-7830</span>
                  <span className="text-[11px] text-[#40493d] font-medium">5p trước</span>
                </div>
                <p className="text-[#40493d] font-medium leading-normal">
                  Chợ Đầu Mối Bình Điền <span className="text-[#176a22]">→</span> Nhà hàng Sen Việt Q1
                </p>
              </div>
            </div>

            {/* Item 3 */}
            <div className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-[#ebefe4] transition-colors cursor-pointer group">
              <div className="w-10 h-10 rounded-full bg-[#d2f3cd] flex items-center justify-center flex-shrink-0 text-[#176a22]">
                <Truck className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0 text-xs">
                <div className="flex justify-between items-center mb-1">
                  <span className="font-extrabold text-sm text-[#181d16]">#ORD-7831</span>
                  <span className="text-[11px] text-[#40493d] font-medium">12p trước</span>
                </div>
                <p className="text-[#40493d] font-medium leading-normal">
                  Trang trại AgriFarm Củ Chi <span className="text-[#176a22]">→</span> Kho Trung Chuyển Q12
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 2: ĐƠN HÀNG ĐÃ HOÀN THÀNH */}
        <div className="p-4 space-y-3">
          <h4 className="text-[11px] font-bold text-[#40493d] uppercase tracking-wider">
            ĐƠN HÀNG ĐÃ HOÀN THÀNH
          </h4>

          <div className="space-y-3">
            {/* Item 1 */}
            <div className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-[#ebefe4] transition-colors cursor-pointer">
              <div className="w-10 h-10 rounded-full bg-[#e0e6d8] flex items-center justify-center flex-shrink-0 font-bold text-sm text-[#40493d]">
                NH
              </div>
              <div className="flex-1 min-w-0 text-xs">
                <div className="flex justify-between items-center mb-0.5">
                  <span className="font-bold text-sm text-[#181d16]">Nguyễn Huệ</span>
                  <CheckCircle2 className="w-4 h-4 text-[#176a22] flex-shrink-0 fill-[#d2f3cd]" />
                </div>
                <p className="text-[11px] font-mono text-[#40493d] mb-1">#ORD-98770</p>
                <p className="text-[#40493d] font-medium leading-relaxed">
                  Đã hoàn thành giao hàng đến Bãi đỗ Quy Nhơn.
                </p>
              </div>
            </div>

            {/* Item 2 */}
            <div className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-[#ebefe4] transition-colors cursor-pointer">
              <div className="w-10 h-10 rounded-full bg-[#e0e6d8] flex items-center justify-center flex-shrink-0 font-bold text-sm text-[#40493d]">
                PT
              </div>
              <div className="flex-1 min-w-0 text-xs">
                <div className="flex justify-between items-center mb-0.5">
                  <span className="font-bold text-sm text-[#181d16]">Phan Trần D</span>
                  <CheckCircle2 className="w-4 h-4 text-[#176a22] flex-shrink-0 fill-[#d2f3cd]" />
                </div>
                <p className="text-[11px] font-mono text-[#40493d] mb-1">#ORD-98760</p>
                <p className="text-[#40493d] font-medium leading-relaxed">
                  Đã hoàn thành giao hàng đến Bãi đỗ Huế.
                </p>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* FOOTER */}
      <div className="p-3.5 text-center bg-[#f7fbf0] border-t border-[#bfcaba]/70">
        <button
          onClick={() => {
            if (onViewAllActivities) onViewAllActivities();
            onClose();
          }}
          className="text-xs font-bold text-[#176a22] hover:text-[#12541a] transition-colors"
        >
          Xem tất cả hoạt động
        </button>
      </div>

    </div>
  );
};
