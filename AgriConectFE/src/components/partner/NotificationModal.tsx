import React from 'react';
import { X, Bell, Truck, CheckCircle2, TrendingUp, Sparkles } from 'lucide-react';

interface NotificationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NotificationModal: React.FC<NotificationModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  const notifications = [
    {
      id: '1',
      title: 'Đơn hàng AGRI-882391 đang vận chuyển',
      desc: 'Lô 1,000kg Bắp cải VietGAP đã xuất kho Đà Lạt và đang trên tuyến QL20.',
      time: '10 phút trước',
      icon: Truck,
      color: 'text-[#486644] bg-[#486644]/10',
    },
    {
      id: '2',
      title: 'Chiến dịch Mua Chung Thanh Long đạt 84%',
      desc: 'Còn 800kg nữa để đạt hạn mức chiết khấu 20% cho đại lý.',
      time: '1 giờ trước',
      icon: TrendingUp,
      color: 'text-[#176a22] bg-[#176a22]/10',
    },
    {
      id: '3',
      title: 'Xác nhận hợp đồng Dứa Nữ Hoàng',
      desc: 'Hợp đồng tương lai vụ thu hoạch Quý III/2026 đã được kiểm duyệt pháp lý.',
      time: '3 giờ trước',
      icon: CheckCircle2,
      color: 'text-[#9d3c5f] bg-[#9d3c5f]/10',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
      <div className="bg-white rounded-3xl max-w-md w-full p-5 shadow-2xl border border-[#bfcaba] relative">
        <div className="flex justify-between items-center mb-4 pb-2 border-b border-stone-200">
          <div className="flex items-center gap-2 text-[#176a22]">
            <Bell className="w-5 h-5" />
            <h3 className="font-bold text-lg text-[#181d16]">
              Thông Báo Thị Trường Sỉ
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-stone-400 hover:text-stone-700"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-3">
          {notifications.map((n) => {
            const Icon = n.icon;
            return (
              <div
                key={n.id}
                className="p-3 bg-[#f7fbf0] border border-[#bfcaba]/30 rounded-2xl flex gap-3 items-start"
              >
                <div
                  className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${n.color}`}
                >
                  <Icon className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-baseline">
                    <h5 className="font-bold text-xs text-[#181d16] truncate">
                      {n.title}
                    </h5>
                    <span className="text-[10px] text-[#707a6c] shrink-0">
                      {n.time}
                    </span>
                  </div>
                  <p className="text-xs text-[#40493d] mt-1 leading-snug">
                    {n.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        <button
          onClick={onClose}
          className="w-full mt-4 bg-[#176a22] hover:bg-[#358439] text-white py-2.5 rounded-xl font-bold text-xs shadow-xs"
        >
          Đóng
        </button>
      </div>
    </div>
  );
};
