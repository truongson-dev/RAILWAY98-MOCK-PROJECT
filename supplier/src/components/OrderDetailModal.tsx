import React, { useState } from 'react';
import { 
  X, 
  Truck, 
  CheckCircle2, 
  Clock, 
  MapPin, 
  Phone, 
  User, 
  DollarSign, 
  Printer,
  Calendar,
  PlusCircle,
  FileText,
  ShieldAlert,
  ShieldCheck,
  Camera,
  Upload,
  Send,
  Sparkles,
  AlertTriangle,
  Download,
  Package,
  Building2,
  BadgeCheck,
  ChevronRight,
  ExternalLink,
  RefreshCw,
  FileSpreadsheet
} from 'lucide-react';
import { Order } from '../types';

interface OrderDetailModalProps {
  order: Order | null;
  onClose: () => void;
  onUpdateStatus: (orderId: string, status: Order['status']) => void;
}

interface MilestoneStep {
  id: number;
  title: string;
  description: string;
  status: 'completed' | 'in_progress' | 'pending';
  completedDate?: string;
  dueDate?: string;
  progressPercent?: number;
}

export const OrderDetailModal: React.FC<OrderDetailModalProps> = ({
  order,
  onClose,
  onUpdateStatus
}) => {
  if (!order) return null;

  // Local state for interactive features
  const [currentStatus, setCurrentStatus] = useState<Order['status']>(order.status);
  
  // Milestone Stages State
  const [milestones, setMilestones] = useState<MilestoneStep[]>([
    {
      id: 1,
      title: '1. Đặt hàng & Đặt cọc (20%)',
      description: 'Đã xác nhận đơn hàng & thanh toán cọc qua ví AgriPay Escrow. Hợp đồng chính thức có hiệu lực.',
      status: 'completed',
      completedDate: order.createdAt || '15/08/2026'
    },
    {
      id: 2,
      title: '2. Thu hoạch & Kiểm định Chất lượng QC',
      description: 'Tiến hành thu hoạch tại vườn, dán tem truy xuất nguồn gốc QR và kiểm định dư lượng BVTV.',
      status: currentStatus === 'new' ? 'in_progress' : 'completed',
      completedDate: currentStatus !== 'new' ? '18/08/2026' : undefined,
      dueDate: '20/08/2026',
      progressPercent: currentStatus === 'new' ? 70 : 100
    },
    {
      id: 3,
      title: '3. Đóng gói & Bàn giao Vận chuyển',
      description: 'Phân loại nông sản loại 1, đóng thùng xốp mát mát và chuyển giao xe tải lạnh chuyên dụng.',
      status: currentStatus === 'shipping' || currentStatus === 'completed' ? 'completed' : currentStatus === 'processing' ? 'in_progress' : 'pending',
      completedDate: currentStatus === 'shipping' || currentStatus === 'completed' ? '22/08/2026' : undefined,
      dueDate: '23/08/2026',
      progressPercent: currentStatus === 'processing' ? 50 : currentStatus === 'shipping' || currentStatus === 'completed' ? 100 : 0
    },
    {
      id: 4,
      title: '4. Vận chuyển & Giao hàng tận kho',
      description: 'Xe lạnh di chuyển theo hành trình GPS. Giám sát nhiệt độ thùng xe 5°C - 8°C suốt tuyến.',
      status: currentStatus === 'completed' ? 'completed' : currentStatus === 'shipping' ? 'in_progress' : 'pending',
      completedDate: currentStatus === 'completed' ? '25/08/2026' : undefined,
      dueDate: order.deliveryDate || '25/08/2026',
      progressPercent: currentStatus === 'shipping' ? 80 : currentStatus === 'completed' ? 100 : 0
    },
    {
      id: 5,
      title: '5. Nghiệm thu & Quyết toán (80%)',
      description: 'Khách hàng đối soát chất lượng tại kho, ký biên bản bàn giao và giải ngân số tiền còn lại.',
      status: currentStatus === 'completed' ? 'completed' : 'pending'
    }
  ]);

  // Evidence Photos State
  const [photos, setPhotos] = useState<string[]>([
    'https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1586771107445-d3ca888129ff?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=600&q=80'
  ]);

  // Sub-modal for "+ Cập nhật Tiến độ"
  const [showProgressModal, setShowProgressModal] = useState(false);
  const [selectedStageId, setSelectedStageId] = useState<number>(3);
  const [updatePercent, setUpdatePercent] = useState<number>(65);
  const [updateNotes, setUpdateNotes] = useState<string>('Đã kiểm tra bao bì thùng xốp, duy trì độ lạnh 6°C chuẩn xuất khẩu.');
  const [updateEstDate, setUpdateEstDate] = useState<string>('2026-08-25');
  const [noticeMessage, setNoticeMessage] = useState<string | null>(null);

  const handleStatusChange = (newStatus: Order['status']) => {
    setCurrentStatus(newStatus);
    onUpdateStatus(order.id, newStatus);
    setNoticeMessage(`Đã cập nhật trạng thái đơn hàng thành "${getStatusText(newStatus)}"!`);
    setTimeout(() => setNoticeMessage(null), 4000);
  };

  const handleSaveProgress = (e: React.FormEvent) => {
    e.preventDefault();
    setMilestones(prev =>
      prev.map(m => {
        if (m.id === selectedStageId) {
          return {
            ...m,
            progressPercent: updatePercent,
            description: updateNotes || m.description,
            dueDate: updateEstDate ? `${updateEstDate.split('-')[2]}/${updateEstDate.split('-')[1]}/${updateEstDate.split('-')[0]}` : m.dueDate
          };
        }
        return m;
      })
    );

    setNoticeMessage('Đã cập nhật tiến độ & thông báo tới người mua thành công!');
    setShowProgressModal(false);
    setTimeout(() => setNoticeMessage(null), 4000);
  };

  const handleSimulatedPhotoUpload = () => {
    const newSamplePhoto = 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&w=600&q=80';
    setPhotos(prev => [newSamplePhoto, ...prev]);
    setNoticeMessage('Đã tải lên 1 ảnh minh chứng thực địa mới!');
    setTimeout(() => setNoticeMessage(null), 3000);
  };

  const contractCode = order.orderCode.startsWith('#') ? order.orderCode : `#${order.orderCode}`;
  const depositAmount = Math.round(order.totalPrice * 0.2);
  const remainingAmount = order.totalPrice - depositAmount;

  function getStatusText(status: Order['status']) {
    switch (status) {
      case 'new': return 'Đơn Mới';
      case 'processing': return 'Đang Xử Lý';
      case 'shipping': return 'Đang Giao Hàng';
      case 'completed': return 'Hoàn Thành';
      case 'cancelled': return 'Đã Hủy';
    }
  }

  function getStatusBadgeClass(status: Order['status']) {
    switch (status) {
      case 'new': return 'bg-[#c9ecc1] text-[#176a22] border-[#a3f69c]';
      case 'processing': return 'bg-[#ffd9e2] text-[#9d3c5f] border-[#f4b6c7]';
      case 'shipping': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'completed': return 'bg-emerald-100 text-emerald-800 border-emerald-300';
      case 'cancelled': return 'bg-red-100 text-red-800 border-red-200';
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-2 sm:p-4 overflow-y-auto">
      <div className="bg-[#f7fbf0] w-full max-w-6xl rounded-2xl shadow-2xl border border-[#bfcaba] overflow-hidden my-auto max-h-[94vh] flex flex-col animate-in fade-in zoom-in-95 duration-200">
        
        {/* Top Header Bar */}
        <div className="bg-white px-6 py-4 border-b border-[#e0e4d9] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shrink-0 sticky top-0 z-20">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#176a22] text-white flex items-center justify-center font-black text-base shadow-xs shrink-0">
              <Package size={22} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-black text-lg text-[#181d16]">{contractCode}</span>
                <span className={`px-3 py-0.5 text-xs font-bold rounded-full border ${getStatusBadgeClass(currentStatus)}`}>
                  {getStatusText(currentStatus)}
                </span>
              </div>
              <p className="text-xs text-[#5e6958] mt-0.5">
                Nông sản: <span className="font-bold text-[#181d16]">{order.productName}</span> ({order.quantity}) • Khách hàng: <span className="font-bold text-[#181d16]">{order.customerName}</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 self-end sm:self-center flex-wrap">
            {/* Status Switcher Dropdown */}
            <select
              value={currentStatus}
              onChange={(e) => handleStatusChange(e.target.value as Order['status'])}
              className="h-9 px-3 bg-[#f1f5ea] border border-[#707a6c]/40 rounded-xl text-xs font-bold text-[#181d16] focus:ring-2 focus:ring-[#176a22] outline-none cursor-pointer"
            >
              <option value="new">Chuyển: Đơn mới</option>
              <option value="processing">Chuyển: Đang xử lý</option>
              <option value="shipping">Chuyển: Đang giao hàng</option>
              <option value="completed">Chuyển: Hoàn thành</option>
              <option value="cancelled">Chuyển: Đã hủy</option>
            </select>

            <button
              onClick={() => alert(`Đang tải file Hợp đồng & Hóa đơn VAT PDF (${contractCode})`)}
              className="h-9 px-3 border border-[#bfcaba] text-[#3e483a] hover:bg-[#f1f5ea] rounded-xl font-bold text-xs transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <Download size={14} />
              Tải PDF
            </button>

            <button
              onClick={() => setShowProgressModal(true)}
              className="h-9 px-3.5 bg-[#176a22] hover:bg-[#12541b] text-white rounded-xl font-bold text-xs transition-colors shadow-xs flex items-center gap-1.5 cursor-pointer"
            >
              <PlusCircle size={15} />
              + Tiến độ
            </button>

            <button 
              onClick={onClose} 
              className="p-2 text-[#5e6958] hover:text-[#ba1a1a] hover:bg-[#e0e4d9] rounded-xl transition-colors cursor-pointer"
              aria-label="Đóng"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Notice Banner */}
        {noticeMessage && (
          <div className="bg-[#358439] text-white px-6 py-2.5 text-xs font-semibold flex items-center justify-between animate-in slide-in-from-top duration-300">
            <span className="flex items-center gap-2">
              <CheckCircle2 size={16} className="text-[#a3f69c]" />
              {noticeMessage}
            </span>
            <button onClick={() => setNoticeMessage(null)} className="hover:opacity-80 cursor-pointer">
              <X size={14} />
            </button>
          </div>
        )}

        {/* Main Body Content */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-6 flex-1">
          
          {/* Top Quick Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white p-4 rounded-xl border border-[#bfcaba]/30 shadow-2xs space-y-1">
              <span className="text-[11px] font-bold text-[#707a6c] uppercase tracking-wider">Tổng Giá Trị Đơn</span>
              <p className="text-xl font-black text-[#176a22]">{order.totalPrice.toLocaleString('vi-VN')} VNĐ</p>
              <span className="text-[11px] text-[#5e6958] block">Thanh toán: {order.paymentMethod || 'Ví AgriPay Escrow'}</span>
            </div>

            <div className="bg-white p-4 rounded-xl border border-[#bfcaba]/30 shadow-2xs space-y-1">
              <span className="text-[11px] font-bold text-[#707a6c] uppercase tracking-wider">Tiền Đặt Cọc (20%)</span>
              <p className="text-xl font-black text-[#181d16]">{depositAmount.toLocaleString('vi-VN')} VNĐ</p>
              <span className="text-[11px] text-[#176a22] font-semibold flex items-center gap-1">
                <CheckCircle2 size={12} /> Đã tạm giữ an toàn
              </span>
            </div>

            <div className="bg-white p-4 rounded-xl border border-[#bfcaba]/30 shadow-2xs space-y-1">
              <span className="text-[11px] font-bold text-[#707a6c] uppercase tracking-wider">Còn Lại Quyết Toán (80%)</span>
              <p className="text-xl font-black text-[#40493d]">{remainingAmount.toLocaleString('vi-VN')} VNĐ</p>
              <span className="text-[11px] text-[#707a6c]">Thanh toán sau khi nhận hàng</span>
            </div>

            <div className="bg-white p-4 rounded-xl border border-[#bfcaba]/30 shadow-2xs space-y-1">
              <span className="text-[11px] font-bold text-[#707a6c] uppercase tracking-wider">Thời Gian Giao Hàng</span>
              <p className="text-base font-bold text-[#181d16]">{order.deliveryDate || '25/08/2026'}</p>
              <span className="text-[11px] text-[#5e6958]">Địa điểm: Kho đối tác</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* LEFT COLUMN (7 Cols): Order details & Timeline */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Buyer & Logistics Card */}
              <div className="bg-white rounded-2xl border border-[#bfcaba]/30 p-5 shadow-xs space-y-4">
                <div className="flex items-center justify-between border-b border-[#e0e4d9] pb-3">
                  <h4 className="font-bold text-base text-[#181d16] flex items-center gap-2">
                    <User size={18} className="text-[#176a22]" />
                    Thông Tin Khách Hàng & Giao Hàng
                  </h4>
                  <span className="text-xs bg-[#c9ecc1] text-[#176a22] font-bold px-2.5 py-0.5 rounded-full">
                    Đã Xác Minh Doanh Nghiệp
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div className="space-y-2">
                    <div>
                      <span className="text-[#707a6c] block">Tên người mua / Doanh nghiệp:</span>
                      <span className="font-bold text-sm text-[#181d16]">{order.customerName}</span>
                    </div>
                    <div>
                      <span className="text-[#707a6c] block">Số điện thoại liên hệ:</span>
                      <span className="font-semibold text-[#181d16] flex items-center gap-1.5 mt-0.5">
                        <Phone size={13} className="text-[#176a22]" />
                        {order.customerPhone || '0908 123 456'}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div>
                      <span className="text-[#707a6c] block">Địa chỉ giao hàng / Kho nhận:</span>
                      <span className="font-semibold text-[#181d16] flex items-start gap-1.5 mt-0.5">
                        <MapPin size={14} className="text-[#176a22] shrink-0 mt-0.5" />
                        {order.customerAddress || 'Kho Trung Chuyển Nông Sản, Tiền Giang'}
                      </span>
                    </div>
                    <div>
                      <span className="text-[#707a6c] block">Đơn vị vận chuyển:</span>
                      <span className="font-bold text-[#176a22] flex items-center gap-1.5 mt-0.5">
                        <Truck size={14} />
                        AgriLogistics Chuyên Dụng (Xe lạnh #51C-882.19)
                      </span>
                    </div>
                  </div>
                </div>

                {order.notes && (
                  <div className="p-3 bg-[#f1f5ea] rounded-xl border border-[#e0e4d9] text-xs space-y-0.5">
                    <span className="font-bold text-[#181d16]">Ghi chú từ người mua:</span>
                    <p className="text-[#40493d] italic">"{order.notes}"</p>
                  </div>
                )}
              </div>

              {/* Lộ Trình Thực Hiện Timeline */}
              <div className="bg-white rounded-2xl border border-[#bfcaba]/30 p-5 shadow-xs space-y-5">
                <div className="flex items-center justify-between border-b border-[#e0e4d9] pb-3">
                  <h4 className="font-bold text-base text-[#181d16] flex items-center gap-2">
                    <Calendar size={18} className="text-[#176a22]" />
                    Lộ Trình & Tiến Độ Đơn Hàng
                  </h4>
                  <span className="px-3 py-1 bg-[#c9ecc1] text-[#176a22] font-extrabold text-xs rounded-full">
                    {currentStatus === 'completed' ? 'Hoàn tất 100%' : 'Đang xử lý theo kế hoạch'}
                  </span>
                </div>

                {/* Vertical Timeline */}
                <div className="space-y-4 relative before:absolute before:left-4 before:top-2 before:bottom-2 before:w-0.5 before:bg-[#e0e4d9]">
                  {milestones.map((m) => {
                    if (m.status === 'completed') {
                      return (
                        <div key={m.id} className="relative pl-10 space-y-1">
                          <div className="absolute left-0 top-0.5 w-8 h-8 rounded-full bg-[#176a22] text-white flex items-center justify-center font-bold shadow-xs z-10">
                            <CheckCircle2 size={18} />
                          </div>
                          <div className="flex justify-between items-center">
                            <h5 className="font-bold text-sm text-[#181d16]">{m.title}</h5>
                            {m.completedDate && <span className="text-[11px] text-[#5e6958] font-medium">Hoàn thành: {m.completedDate}</span>}
                          </div>
                          <p className="text-xs text-[#5e6958] leading-relaxed">{m.description}</p>
                        </div>
                      );
                    } else if (m.status === 'in_progress') {
                      return (
                        <div key={m.id} className="relative pl-10 space-y-2">
                          <div className="absolute left-0 top-0.5 w-8 h-8 rounded-full bg-[#358439] text-white flex items-center justify-center font-bold shadow-xs z-10 animate-pulse">
                            <Sparkles size={16} />
                          </div>
                          <div className="p-4 bg-[#f1f5ea] rounded-xl border border-[#a3f69c] space-y-2">
                            <div className="flex justify-between items-center">
                              <h5 className="font-bold text-sm text-[#176a22]">{m.title}</h5>
                              <span className="text-xs font-bold text-[#176a22] bg-[#c9ecc1] px-2.5 py-0.5 rounded-full">
                                Đang diễn ra ({m.progressPercent}%)
                              </span>
                            </div>

                            {/* Progress bar */}
                            <div className="w-full bg-white rounded-full h-2.5 overflow-hidden border border-[#bfcaba]/40">
                              <div 
                                className="bg-[#176a22] h-2.5 rounded-full transition-all duration-500" 
                                style={{ width: `${m.progressPercent}%` }}
                              />
                            </div>

                            <p className="text-xs text-[#5e6958] leading-relaxed pt-1">{m.description}</p>

                            <div className="flex justify-between items-center text-[11px] text-[#176a22] font-semibold pt-1 border-t border-[#bfcaba]/30">
                              <span>📅 Dự kiến kết thúc: {m.dueDate}</span>
                              <button
                                onClick={() => {
                                  setSelectedStageId(m.id);
                                  setUpdatePercent(m.progressPercent || 65);
                                  setShowProgressModal(true);
                                }}
                                className="hover:underline font-bold text-xs text-[#176a22] cursor-pointer"
                              >
                                Cập nhật bước này →
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    } else {
                      return (
                        <div key={m.id} className="relative pl-10 space-y-1 opacity-70">
                          <div className="absolute left-0 top-0.5 w-8 h-8 rounded-full bg-[#ebefe4] text-[#707a6c] flex items-center justify-center font-bold border border-[#bfcaba] z-10">
                            <Clock size={16} />
                          </div>
                          <div className="flex justify-between items-center">
                            <h5 className="font-semibold text-sm text-[#40493d]">{m.title}</h5>
                            {m.dueDate && <span className="text-[11px] text-[#707a6c]">Dự kiến: {m.dueDate}</span>}
                          </div>
                          <p className="text-xs text-[#707a6c] leading-relaxed">{m.description}</p>
                        </div>
                      );
                    }
                  })}
                </div>
              </div>

            </div>

            {/* RIGHT COLUMN (5 Cols): Evidence photos, Terms, Logs */}
            <div className="lg:col-span-5 space-y-6">
              
              {/* Evidence Photo Library Card */}
              <div className="bg-white rounded-2xl border border-[#bfcaba]/30 p-5 shadow-xs space-y-3">
                <div className="flex items-center justify-between border-b border-[#e0e4d9] pb-3">
                  <div className="flex items-center gap-2">
                    <Camera size={18} className="text-[#176a22]" />
                    <h4 className="font-bold text-base text-[#181d16]">Ảnh Thực Địa & Đóng Gói</h4>
                    <span className="text-xs text-[#5e6958] bg-[#f1f5ea] px-2.5 py-0.5 rounded-full font-semibold">
                      {photos.length} ảnh
                    </span>
                  </div>
                  <button 
                    onClick={handleSimulatedPhotoUpload}
                    className="text-xs font-bold text-[#176a22] hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <Upload size={14} />
                    Tải ảnh
                  </button>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  {photos.map((src, index) => (
                    <div key={index} className="aspect-square rounded-xl overflow-hidden border border-[#bfcaba]/40 group relative shadow-2xs">
                      <img 
                        src={src} 
                        alt={`Minh chứng ${index + 1}`} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                      />
                      <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-[10px] font-bold">
                        Ảnh {index + 1}
                      </div>
                    </div>
                  ))}

                  <button
                    onClick={handleSimulatedPhotoUpload}
                    className="aspect-square rounded-xl border-2 border-dashed border-[#176a22]/40 hover:border-[#176a22] bg-[#f1f5ea] flex flex-col items-center justify-center p-2 text-[#176a22] cursor-pointer hover:bg-[#e8f2e4] transition-colors"
                  >
                    <Upload size={18} />
                    <span className="text-[10px] font-bold mt-1 text-center">+ Thêm ảnh</span>
                  </button>
                </div>
              </div>

              {/* Penalty & Contract Terms Box */}
              <div className="bg-[#ba1a1a] text-white rounded-2xl p-5 shadow-xs space-y-3">
                <div className="flex items-center gap-2 border-b border-white/20 pb-2">
                  <AlertTriangle size={18} className="text-white" />
                  <h4 className="font-bold text-xs tracking-wide uppercase">Điều Khoản Cam Kết & Phạt</h4>
                </div>

                <div className="space-y-2 text-xs leading-relaxed">
                  <div>
                    <p className="font-black text-white uppercase tracking-wider text-[11px]">
                      Trễ Tiến Độ Giao Hàng
                    </p>
                    <p className="text-white/90 text-[11px]">
                      Phạt 1% giá trị hợp đồng/ngày chậm trễ (không quá 15%).
                    </p>
                  </div>

                  <div>
                    <p className="font-black text-white uppercase tracking-wider text-[11px]">
                      Chất Lượng / Tiêu Chuẩn
                    </p>
                    <p className="text-white/90 text-[11px]">
                      Đảm bảo chuẩn VietGAP, hoàn tiền cọc nếu sai tiêu chuẩn thỏa thuận.
                    </p>
                  </div>
                </div>
              </div>

              {/* AgriSure Guarantee Badge */}
              <div className="bg-white rounded-2xl border border-[#bfcaba]/30 p-4 shadow-xs space-y-3">
                <div className="p-3 bg-[#f1f5ea] rounded-xl border border-[#a3f69c] flex items-center gap-3">
                  <div className="p-2.5 bg-[#c9ecc1] text-[#176a22] rounded-lg shrink-0 font-bold">
                    <ShieldCheck size={22} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-[#176a22]">Bảo Lãnh AgriSure Escrow</p>
                    <p className="text-[11px] text-[#5e6958]">
                      Tiền tạm ứng 20% được bảo vệ an toàn cho cả hai bên cho tới khi giao hàng thành công.
                    </p>
                  </div>
                </div>
              </div>

            </div>

          </div>
        </div>

        {/* Modal Footer */}
        <div className="bg-white px-6 py-3.5 border-t border-[#e0e4d9] flex justify-between items-center shrink-0">
          <button
            onClick={() => alert(`Đang xuất phiếu giao hàng & phiếu xuất kho cho đơn ${contractCode}`)}
            className="px-4 py-2 border border-[#bfcaba] bg-white hover:bg-[#f1f5ea] text-[#181d16] rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer"
          >
            <Printer size={15} /> In phiếu xuất kho & vận đơn
          </button>
          
          <button
            onClick={onClose}
            className="px-6 py-2 bg-[#176a22] text-white rounded-xl text-xs font-bold hover:bg-[#12541b] cursor-pointer shadow-2xs"
          >
            Đóng
          </button>
        </div>

      </div>

      {/* Sub-Modal: "+ Cập nhật Tiến độ" */}
      {showProgressModal && (
        <div className="fixed inset-0 z-60 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-[#bfcaba] space-y-4 animate-in zoom-in-95 duration-150">
            <div className="flex justify-between items-center border-b border-[#e0e4d9] pb-3">
              <h3 className="font-bold text-base text-[#181d16] flex items-center gap-2">
                <PlusCircle className="text-[#176a22]" size={20} />
                Cập Nhật Tiến Độ Cho Người Mua
              </h3>
              <button onClick={() => setShowProgressModal(false)} className="text-[#5e6958] hover:text-[#ba1a1a] cursor-pointer">
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSaveProgress} className="space-y-4">
              {/* Select Stage */}
              <div className="space-y-1">
                <label className="block text-xs font-bold text-[#181d16]">Chọn Giai Đoạn Đơn Hàng:</label>
                <select
                  value={selectedStageId}
                  onChange={(e) => {
                    const id = Number(e.target.value);
                    setSelectedStageId(id);
                    const found = milestones.find(m => m.id === id);
                    if (found && found.progressPercent) setUpdatePercent(found.progressPercent);
                  }}
                  className="w-full h-10 px-3 bg-[#f1f5ea] border border-[#707a6c]/40 rounded-xl text-xs text-[#181d16] outline-none font-medium focus:ring-2 focus:ring-[#176a22]"
                >
                  {milestones.map((m) => (
                    <option key={m.id} value={m.id}>
                      {m.title}
                    </option>
                  ))}
                </select>
              </div>

              {/* Progress Slider */}
              <div className="space-y-2 bg-[#f1f5ea] p-3.5 rounded-xl border border-[#e0e4d9]">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-bold text-[#181d16]">Mức độ hoàn thành giai đoạn:</span>
                  <span className="font-black text-[#176a22] text-sm">{updatePercent}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={updatePercent}
                  onChange={(e) => setUpdatePercent(Number(e.target.value))}
                  className="w-full accent-[#176a22] cursor-pointer"
                />
              </div>

              {/* Estimated Completion Date */}
              <div className="space-y-1">
                <label className="block text-xs font-bold text-[#181d16]">Dự kiến hoàn thành bước này:</label>
                <input
                  type="date"
                  value={updateEstDate}
                  onChange={(e) => setUpdateEstDate(e.target.value)}
                  className="w-full h-10 px-3 bg-[#f1f5ea] border border-[#707a6c]/40 rounded-xl text-xs text-[#181d16] outline-none focus:ring-2 focus:ring-[#176a22]"
                />
              </div>

              {/* Status Note for Buyer */}
              <div className="space-y-1">
                <label className="block text-xs font-bold text-[#181d16]">Ghi chú cho khách hàng / đối tác:</label>
                <textarea
                  rows={3}
                  value={updateNotes}
                  onChange={(e) => setUpdateNotes(e.target.value)}
                  placeholder="Nhập ghi chú vận chuyển, đóng gói, kiểm định..."
                  className="w-full p-3 bg-[#f7fbf0] border border-[#707a6c]/40 rounded-xl text-xs text-[#181d16] focus:ring-2 focus:ring-[#176a22] outline-none"
                />
              </div>

              {/* Attachment upload simulator */}
              <div 
                onClick={handleSimulatedPhotoUpload}
                className="p-3 border-2 border-dashed border-[#176a22]/40 rounded-xl text-center bg-[#f1f5ea] hover:bg-[#e8f2e4] cursor-pointer transition-colors"
              >
                <Camera size={20} className="mx-auto text-[#176a22]" />
                <p className="text-xs font-bold text-[#176a22] mt-1">+ Tải thêm ảnh minh chứng thực địa</p>
                <p className="text-[10px] text-[#5e6958]">Người mua sẽ nhận thông báo xem ảnh lập tức</p>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowProgressModal(false)}
                  className="px-4 py-2 border border-[#707a6c] text-[#40493d] rounded-xl text-xs font-semibold hover:bg-[#f1f5ea] cursor-pointer"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#176a22] text-white rounded-xl text-xs font-bold hover:bg-[#12541b] flex items-center gap-1.5 shadow-xs cursor-pointer"
                >
                  <Send size={14} />
                  Lưu & Thông Báo Khách Hàng
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
