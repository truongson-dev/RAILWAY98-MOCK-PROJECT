import React, { useState } from 'react';
import { 
  X, 
  CalendarPlus, 
  Sprout, 
  Mail, 
  Headphones, 
  MoreVertical, 
  Eye, 
  Upload, 
  FileSpreadsheet, 
  CheckCircle2, 
  Coffee, 
  Leaf, 
  Send,
  MessageSquare
} from 'lucide-react';

interface ScheduleItem {
  id: string;
  cropName: string;
  areaHa: number;
  harvestMonth: string;
  yieldKg: number;
  status: string;
  statusType: 'pending' | 'contacted' | 'contracted';
  certifications: string[];
}

interface ContractInquiry {
  id: string;
  company: string;
  badge: string;
  badgeType: 'gold' | 'platinum' | 'verified';
  timeAgo: string;
  isNew: boolean;
  message: string;
  logoText: string;
  bgLogo: string;
}

interface UpdateSeasonModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSaveSeason?: (data: { cropName: string; harvestMonth: string; notes: string }) => void;
}

export const UpdateSeasonModal: React.FC<UpdateSeasonModalProps> = ({
  isOpen,
  onClose,
  onSaveSeason
}) => {
  // Form State for Schedule
  const [cropType, setCropType] = useState('durian');
  const [customCropName, setCustomCropName] = useState('');
  const [plotName, setPlotName] = useState('Lô A2 - 2.5 Hecta');
  const [areaHa, setAreaHa] = useState('5.0');
  const [yieldKg, setYieldKg] = useState('25000');
  const [expectedPrice, setExpectedPrice] = useState('85.000');
  const [harvestMonth, setHarvestMonth] = useState('2026-10');
  const [scheduleNotes, setScheduleNotes] = useState('Mở nhận thương lượng hợp đồng bao tiêu cho vụ thu hoạch tới.');
  const [certs, setCerts] = useState<{ [key: string]: boolean }>({
    VietGAP: true,
    GlobalGAP: false,
    Organic: false,
    'OCOP 4 sao': true,
    HACCP: false
  });

  // Registered Schedules State
  const [schedules, setSchedules] = useState<ScheduleItem[]>([
    {
      id: 'sch-1',
      cropName: 'Sầu Riêng Ri6',
      areaHa: 5.0,
      harvestMonth: '08/2026',
      yieldKg: 25000,
      status: 'Đang Chờ Đối Tác',
      statusType: 'pending',
      certifications: ['VietGAP']
    },
    {
      id: 'sch-2',
      cropName: 'Cà Phê Arabica',
      areaHa: 12.0,
      harvestMonth: '11/2026',
      yieldKg: 18500,
      status: 'Đã Có Liên Hệ (3)',
      statusType: 'contacted',
      certifications: ['VietGAP', 'Organic']
    },
    {
      id: 'sch-3',
      cropName: 'Cam Sành Tiền Giang',
      areaHa: 3.5,
      harvestMonth: '10/2026',
      yieldKg: 15000,
      status: 'Đã Chốt Bao Tiêu',
      statusType: 'contracted',
      certifications: ['GlobalGAP']
    }
  ]);

  // Contract Inquiries State
  const [inquiries] = useState<ContractInquiry[]>([
    {
      id: 'inq-1',
      company: 'VinaFood Export Co.',
      badge: 'Đối tác Tin cậy • Cấp Bạch Kim',
      badgeType: 'platinum',
      timeAgo: 'Mới',
      isNew: true,
      message: 'Chúng tôi quan tâm đến lô Sầu Riêng Ri6 dự kiến thu hoạch vào tháng 08/2026. Mong muốn ký kết Hợp đồng Bao tiêu 10 tấn.',
      logoText: 'VF',
      bgLogo: 'bg-[#176a22] text-white'
    },
    {
      id: 'inq-2',
      company: 'Global Beans Sourcing',
      badge: '20 Hợp đồng thành công',
      badgeType: 'verified',
      timeAgo: '2 ngày trước',
      isNew: false,
      message: 'Cần báo giá và thảo luận chi tiết về tiêu chuẩn hữu cơ cho đợt Cà Phê Arabica tháng 11/2026.',
      logoText: 'GB',
      bgLogo: 'bg-[#9d3c5f] text-white'
    }
  ]);

  // Modals inside view
  const [showExcelUpload, setShowExcelUpload] = useState(false);
  const [selectedInquiry, setSelectedInquiry] = useState<ContractInquiry | null>(null);
  const [replyMessage, setReplyMessage] = useState('');
  const [showConsultModal, setShowConsultModal] = useState(false);
  const [successBanner, setSuccessBanner] = useState<string | null>(null);

  if (!isOpen) return null;

  const cropNameMap: { [key: string]: string } = {
    durian: 'Sầu Riêng Ri6',
    coffee: 'Cà Phê Arabica',
    pepper: 'Hồ Tiêu Đen',
    rice: 'Gạo ST25',
    orange: 'Cam Sành Tiền Giang',
    pomelo: 'Bưởi Da Xanh',
    mango: 'Xoài Cát Hòa Lộc',
    mangosteen: 'Măng Cụt Bến Tre',
    dragonfruit: 'Thanh Long Ruột Đỏ'
  };

  const handleSubmitSchedule = (e: React.FormEvent) => {
    e.preventDefault();
    const selectedCropName = cropType === 'custom' 
      ? (customCropName.trim() || 'Nông sản tự chọn') 
      : (cropNameMap[cropType] || 'Cây trồng mới');
      
    const activeCerts = Object.keys(certs).filter(k => certs[k]);

    // Format harvest month display e.g. "10/2026"
    const formattedMonth = harvestMonth ? `${harvestMonth.split('-')[1]}/${harvestMonth.split('-')[0]}` : '10/2026';

    const newSch: ScheduleItem = {
      id: `sch-${Date.now()}`,
      cropName: selectedCropName,
      areaHa: parseFloat(areaHa) || 1.0,
      harvestMonth: formattedMonth,
      yieldKg: parseInt(yieldKg, 10) || 5000,
      status: 'Đang Chờ Đối Tác (MỚI)',
      statusType: 'pending',
      certifications: activeCerts
    };

    setSchedules(prev => [newSch, ...prev]);

    if (onSaveSeason) {
      onSaveSeason({
        cropName: selectedCropName,
        harvestMonth: formattedMonth,
        notes: `Diện tích: ${areaHa} ha, Sản lượng: ${yieldKg} kg. Chứng chỉ: ${activeCerts.join(', ')}`
      });
    }

    setSuccessBanner(`Đã đăng lịch sản xuất thành công cho "${selectedCropName}" (${areaHa} Ha - ${yieldKg} kg)!`);
    setTimeout(() => setSuccessBanner(null), 5000);
  };

  const handleExcelSimulatedUpload = () => {
    const mockSch: ScheduleItem = {
      id: `sch-excel-${Date.now()}`,
      cropName: 'Măng Cụt Bến Tre',
      areaHa: 4.2,
      harvestMonth: '09/2026',
      yieldKg: 20000,
      status: 'Đang Chờ Đối Tác',
      statusType: 'pending',
      certifications: ['VietGAP']
    };
    setSchedules(prev => [mockSch, ...prev]);
    setShowExcelUpload(false);
    setSuccessBanner('Đã tải lên & đồng bộ 1 vụ mùa từ file Excel!');
    setTimeout(() => setSuccessBanner(null), 4000);
  };

  const handleSendReply = () => {
    if (!selectedInquiry) return;
    alert(`Đã gửi phản hồi thành công đến ${selectedInquiry.company}! Chuyên viên AgriConnect sẽ hỗ trợ làm hợp đồng.`);
    setSelectedInquiry(null);
    setReplyMessage('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-2 sm:p-4 overflow-y-auto">
      <div className="bg-[#f7fbf0] w-full max-w-6xl rounded-2xl shadow-2xl border border-[#bfcaba] overflow-hidden my-auto max-h-[92vh] flex flex-col animate-in fade-in zoom-in-95 duration-200">
        
        {/* Modal Top Nav Bar */}
        <div className="bg-white px-6 py-4 border-b border-[#e0e4d9] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shrink-0 sticky top-0 z-20">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#176a22] text-white flex items-center justify-center font-bold text-lg">
              <CalendarPlus size={22} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-[#181d16] flex items-center gap-2">
                Đăng Lịch Sản Xuất Vụ Mùa
                <span className="text-xs bg-[#c9ecc1] text-[#176a22] font-semibold px-2.5 py-0.5 rounded-full">AgriConnect Portal</span>
              </h2>
              <p className="text-xs text-[#40493d]">
                Đăng ký kế hoạch sản xuất nông vụ sắp tới để kết nối trực tiếp với đối tác thu mua & hợp đồng bao tiêu.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 self-end sm:self-center">
            <button
              onClick={() => setShowExcelUpload(true)}
              className="hidden sm:flex items-center gap-1.5 px-3.5 py-2 border border-[#176a22] text-[#176a22] hover:bg-[#176a22]/5 rounded-xl font-bold text-xs transition-colors cursor-pointer"
            >
              <FileSpreadsheet size={16} />
              Tải Lên File Excel
            </button>
            
            <button
              onClick={onClose}
              className="p-2 text-[#40493d] hover:text-[#ba1a1a] hover:bg-[#e0e4d9] rounded-xl transition-colors cursor-pointer"
              aria-label="Đóng"
            >
              <X size={22} />
            </button>
          </div>
        </div>

        {/* Success Banner Notification */}
        {successBanner && (
          <div className="bg-[#358439] text-white px-6 py-2.5 text-xs font-semibold flex items-center justify-between animate-in slide-in-from-top duration-300">
            <span className="flex items-center gap-2">
              <CheckCircle2 size={16} className="text-[#a3f69c]" />
              {successBanner}
            </span>
            <button onClick={() => setSuccessBanner(null)} className="hover:opacity-80 cursor-pointer">
              <X size={14} />
            </button>
          </div>
        )}

        {/* MAIN BODY FORM & LIST */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-6 flex-1">
          {/* Main Grid Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* LEFT COLUMN (7 Cols): Form & Table */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Form Card: Thông Tin Vụ Mùa Sắp Tới */}
              <div className="bg-white rounded-2xl border border-[#bfcaba]/30 p-5 shadow-xs space-y-4">
                <div className="flex items-center justify-between border-b border-[#e0e4d9] pb-3">
                  <div className="flex items-center gap-2 text-[#176a22]">
                    <Sprout size={20} />
                    <h3 className="font-bold text-base text-[#181d16]">Thông Tin Vụ Mùa Sắp Tới</h3>
                  </div>
                  <span className="text-[11px] text-[#707a6c] bg-[#f1f5ea] px-2.5 py-1 rounded-full font-medium">
                    Tiêu chuẩn Forward Contract
                  </span>
                </div>

                <form onSubmit={handleSubmitSchedule} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Crop Type */}
                    <div className="space-y-1">
                      <label className="block text-xs font-medium text-[#40493d] ml-0.5">
                        Loại Cây Trồng
                      </label>
                      <select
                        value={cropType}
                        onChange={(e) => setCropType(e.target.value)}
                        className="w-full h-11 px-3.5 bg-[#f1f5ea] border border-[#707a6c]/40 rounded-xl focus:ring-2 focus:ring-[#176a22] focus:bg-white outline-none text-sm font-medium text-[#181d16]"
                      >
                        <option value="durian">Sầu Riêng Ri6</option>
                        <option value="coffee">Cà Phê Arabica</option>
                        <option value="orange">Cam Sành Tiền Giang</option>
                        <option value="pepper">Hồ Tiêu Đen</option>
                        <option value="rice">Gạo ST25</option>
                        <option value="pomelo">Bưởi Da Xanh</option>
                        <option value="mango">Xoài Cát Hòa Lộc</option>
                        <option value="mangosteen">Măng Cụt Bến Tre</option>
                        <option value="dragonfruit">Thanh Long Ruột Đỏ</option>
                        <option value="custom">Nhập cây trồng khác...</option>
                      </select>
                    </div>

                    {/* Area */}
                    <div className="space-y-1">
                      <label className="block text-xs font-medium text-[#40493d] ml-0.5">
                        Diện Tích (Hectares)
                      </label>
                      <div className="relative">
                        <input
                          type="number"
                          step="0.1"
                          required
                          value={areaHa}
                          onChange={(e) => setAreaHa(e.target.value)}
                          placeholder="0.0"
                          className="w-full h-11 pl-3.5 pr-12 bg-[#f1f5ea] border border-[#707a6c]/40 rounded-xl focus:ring-2 focus:ring-[#176a22] focus:bg-white outline-none text-sm font-semibold text-[#181d16]"
                        />
                        <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-bold text-[#707a6c]">
                          ha
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Custom Crop Input if Custom selected */}
                  {cropType === 'custom' && (
                    <div className="space-y-1 animate-in fade-in duration-150">
                      <label className="block text-xs font-medium text-[#40493d] ml-0.5">
                        Tên Cây Trồng / Nông Sản Cụ Thể
                      </label>
                      <input
                        type="text"
                        required
                        value={customCropName}
                        onChange={(e) => setCustomCropName(e.target.value)}
                        placeholder="Nhập tên nông sản (Ví dụ: Nhãn Lồng Hưng Yên, Bơ 034...)"
                        className="w-full h-11 px-3.5 bg-[#f1f5ea] border border-[#707a6c]/40 rounded-xl focus:ring-2 focus:ring-[#176a22] focus:bg-white outline-none text-sm font-medium text-[#181d16]"
                      />
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Yield */}
                    <div className="space-y-1">
                      <label className="block text-xs font-medium text-[#40493d] ml-0.5">
                        Sản Lượng Dự Kiến (kg)
                      </label>
                      <div className="relative">
                        <input
                          type="number"
                          required
                          value={yieldKg}
                          onChange={(e) => setYieldKg(e.target.value)}
                          placeholder="5000"
                          className="w-full h-11 pl-3.5 pr-12 bg-[#f1f5ea] border border-[#707a6c]/40 rounded-xl focus:ring-2 focus:ring-[#176a22] focus:bg-white outline-none text-sm font-semibold text-[#181d16]"
                        />
                        <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-bold text-[#707a6c]">
                          kg
                        </span>
                      </div>
                    </div>

                    {/* Harvest Date */}
                    <div className="space-y-1">
                      <label className="block text-xs font-medium text-[#40493d] ml-0.5">
                        Thời Gian Thu Hoạch Dự Kiến
                      </label>
                      <input
                        type="month"
                        required
                        value={harvestMonth}
                        onChange={(e) => setHarvestMonth(e.target.value)}
                        className="w-full h-11 px-3.5 bg-[#f1f5ea] border border-[#707a6c]/40 rounded-xl focus:ring-2 focus:ring-[#176a22] focus:bg-white outline-none text-sm font-medium text-[#181d16]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Lô đất / Vườn */}
                    <div className="space-y-1">
                      <label className="block text-xs font-medium text-[#40493d] ml-0.5">
                        Lô Đất / Vườn Canh Tác
                      </label>
                      <input
                        type="text"
                        value={plotName}
                        onChange={(e) => setPlotName(e.target.value)}
                        placeholder="Lô A1 - 2.5 Hecta"
                        className="w-full h-11 px-3.5 bg-[#f1f5ea] border border-[#707a6c]/40 rounded-xl focus:ring-2 focus:ring-[#176a22] focus:bg-white outline-none text-sm font-medium text-[#181d16]"
                      />
                    </div>

                    {/* Giá Kỳ Vọng */}
                    <div className="space-y-1">
                      <label className="block text-xs font-medium text-[#40493d] ml-0.5">
                        Giá Kỳ Vọng (VNĐ/kg)
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          value={expectedPrice}
                          onChange={(e) => setExpectedPrice(e.target.value)}
                          placeholder="85.000"
                          className="w-full h-11 pl-3.5 pr-16 bg-[#f1f5ea] border border-[#707a6c]/40 rounded-xl focus:ring-2 focus:ring-[#176a22] focus:bg-white outline-none text-sm font-semibold text-[#181d16]"
                        />
                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[11px] font-bold text-[#707a6c]">
                          VNĐ/kg
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Quality Certificates */}
                  <div className="space-y-1.5 pt-1">
                    <label className="block text-xs font-medium text-[#40493d] ml-0.5">
                      Chứng Chỉ Chất Lượng (Tùy chọn)
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {['VietGAP', 'GlobalGAP', 'Organic', 'OCOP 4 sao', 'HACCP'].map((cert) => (
                        <label
                          key={cert}
                          className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-medium cursor-pointer transition-all ${
                            certs[cert] 
                              ? 'bg-[#c9ecc1] text-[#176a22] border border-[#a3f69c] font-bold shadow-2xs' 
                              : 'bg-[#ebefe4] text-[#40493d] border border-transparent hover:bg-[#e0e4d9]'
                          }`}
                        >
                          <input
                            type="checkbox"
                            checked={certs[cert] || false}
                            onChange={(e) => setCerts({ ...certs, [cert]: e.target.checked })}
                            className="rounded text-[#176a22] focus:ring-[#176a22] w-3.5 h-3.5"
                          />
                          <span>{cert}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Ghi chú */}
                  <div className="space-y-1">
                    <label className="block text-xs font-medium text-[#40493d] ml-0.5">
                      Ghi Chú Cho Thương Lái / Đối Tác
                    </label>
                    <textarea
                      rows={2}
                      value={scheduleNotes}
                      onChange={(e) => setScheduleNotes(e.target.value)}
                      placeholder="Mô tả chất lượng, thời gian nhận cọc, bao tiêu..."
                      className="w-full p-3 bg-[#f1f5ea] border border-[#707a6c]/40 rounded-xl focus:ring-2 focus:ring-[#176a22] focus:bg-white outline-none text-xs text-[#181d16]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 bg-[#176a22] hover:bg-[#12541b] active:bg-[#0e4315] text-white font-bold text-sm rounded-xl transition-colors cursor-pointer flex items-center justify-center gap-2 shadow-2xs"
                  >
                    <CalendarPlus size={18} />
                    <span>Đăng Lịch Sản Xuất</span>
                  </button>
                </form>
              </div>

              {/* Table Card: Lịch Đã Đăng */}
              <div className="bg-white rounded-2xl border border-[#bfcaba]/30 overflow-hidden shadow-xs">
                <div className="p-4 bg-white border-b border-[#e0e4d9] flex items-center justify-between">
                  <h3 className="font-bold text-base text-[#181d16]">Lịch Đã Đăng</h3>
                  <span className="text-xs text-[#176a22] font-bold bg-[#176a22]/10 px-3 py-1 rounded-full">
                    {schedules.length} Vụ Mùa Đang Hoạt Động
                  </span>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-[#f1f5ea] text-[11px] uppercase tracking-wider font-semibold text-[#707a6c]">
                        <th className="px-4 py-3">Cây Trồng</th>
                        <th className="px-4 py-3">Thời Gian</th>
                        <th className="px-4 py-3 text-right">Sản Lượng</th>
                        <th className="px-4 py-3">Trạng Thái</th>
                        <th className="px-4 py-3 text-right">Thao tác</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#e0e4d9]/50 text-xs text-[#181d16]">
                      {schedules.map((sch) => (
                        <tr key={sch.id} className="hover:bg-[#f7fbf0] transition-colors">
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-2.5">
                              <div className="w-8 h-8 rounded-lg bg-[#c9ecc1] flex items-center justify-center text-[#176a22] shrink-0 font-bold">
                                {sch.cropName.includes('Cà Phê') ? <Coffee size={16} /> : <Leaf size={16} />}
                              </div>
                              <div>
                                <div className="font-bold text-sm text-[#181d16]">{sch.cropName}</div>
                                <div className="text-[11px] text-[#707a6c]">{sch.areaHa} ha</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-4 py-3 font-medium text-[#40493d]">
                            {sch.harvestMonth}
                          </td>
                          <td className="px-4 py-3 font-bold text-right text-[#176a22]">
                            {sch.yieldKg.toLocaleString()} kg
                          </td>
                          <td className="px-4 py-3">
                            <span className={`px-2.5 py-1 text-[11px] font-semibold rounded-full inline-block ${
                              sch.statusType === 'contracted'
                                ? 'bg-[#c9ecc1] text-[#176a22]'
                                : sch.statusType === 'contacted'
                                ? 'bg-[#ffd9e2] text-[#9d3c5f]'
                                : 'bg-[#176a22]/10 text-[#176a22]'
                            }`}>
                              {sch.status}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-right">
                            <button 
                              onClick={() => {
                                if (confirm(`Bạn muốn xóa lịch sản xuất ${sch.cropName}?`)) {
                                  setSchedules(prev => prev.filter(s => s.id !== sch.id));
                                }
                              }}
                              className="p-1 text-[#707a6c] hover:text-[#ba1a1a] transition-colors cursor-pointer"
                            >
                              <MoreVertical size={16} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

            </div>

            {/* RIGHT COLUMN (5 Cols): Buyer Inquiries */}
            <div className="lg:col-span-5 space-y-6">
              
              {/* Contract Inquiries List Card */}
              <div className="bg-white rounded-2xl border border-[#bfcaba]/30 p-5 shadow-xs space-y-4">
                <div className="flex items-center justify-between border-b border-[#e0e4d9] pb-3">
                  <div className="flex items-center gap-2 text-[#176a22]">
                    <Mail size={20} />
                    <h3 className="font-bold text-base text-[#181d16]">Yêu Cầu Từ Người Mua</h3>
                  </div>
                  <span className="w-2.5 h-2.5 rounded-full bg-[#176a22] animate-ping" />
                </div>

                <div className="space-y-3">
                  {inquiries.map((inq) => (
                    <div 
                      key={inq.id}
                      className="p-4 bg-[#f1f5ea] rounded-xl border border-[#e0e4d9] space-y-3 hover:border-[#a3f69c] transition-colors"
                    >
                      <div className="flex justify-between items-start">
                        <div className="flex items-center gap-2.5">
                          <div className={`w-9 h-9 rounded-xl ${inq.bgLogo} flex items-center justify-center font-bold text-xs shrink-0 shadow-2xs`}>
                            {inq.logoText}
                          </div>
                          <div>
                            <h4 className="font-bold text-sm text-[#181d16]">{inq.company}</h4>
                            <p className="text-[11px] text-[#176a22] font-semibold">{inq.badge}</p>
                          </div>
                        </div>

                        {inq.isNew && (
                          <span className="px-2 py-0.5 bg-[#ffd9e2] text-[#9d3c5f] font-bold text-[10px] rounded-full">
                            {inq.timeAgo}
                          </span>
                        )}
                      </div>

                      <p className="text-xs text-[#40493d] leading-relaxed italic">
                        "{inq.message}"
                      </p>

                      <div className="flex gap-2 pt-1">
                        <button
                          onClick={() => {
                            setSelectedInquiry(inq);
                            setReplyMessage(`Kính gửi ${inq.company}, tôi đồng ý thảo luận chi tiết hợp đồng bao tiêu...`);
                          }}
                          className="flex-1 py-1.5 bg-[#176a22] hover:bg-[#12541b] text-white rounded-lg font-bold text-xs transition-colors flex items-center justify-center gap-1 cursor-pointer"
                        >
                          <Send size={12} />
                          Phản Hồi
                        </button>
                        <button 
                          onClick={() => alert(`Xem chi tiết giấy phép & uy tín của ${inq.company}`)}
                          className="px-2.5 py-1.5 border border-[#707a6c]/40 text-[#40493d] hover:bg-white rounded-lg text-xs transition-colors cursor-pointer"
                        >
                          <Eye size={14} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Help/Advisory Card */}
              <div className="bg-white rounded-2xl border border-[#bfcaba]/30 p-4 shadow-xs flex items-center gap-3">
                <div className="p-3 bg-[#c9ecc1] text-[#176a22] rounded-xl shrink-0">
                  <Headphones size={24} />
                </div>
                <div className="space-y-1">
                  <h4 className="font-bold text-xs text-[#181d16]">Cần hỗ trợ tư vấn giá?</h4>
                  <p className="text-[11px] text-[#707a6c] leading-tight">
                    Chuyên gia của AgriConnect sẽ giúp bạn định giá hợp đồng tối ưu.
                  </p>
                  <button
                    onClick={() => setShowConsultModal(true)}
                    className="text-xs font-bold text-[#176a22] hover:underline block pt-0.5 cursor-pointer"
                  >
                    Liên hệ tư vấn ngay →
                  </button>
                </div>
              </div>

            </div>

          </div>
        </div>

      </div>

      {/* Excel Upload Modal */}
      {showExcelUpload && (
        <div className="fixed inset-0 z-60 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-[#bfcaba] space-y-4">
            <div className="flex justify-between items-center border-b border-[#e0e4d9] pb-3">
              <h3 className="font-bold text-base text-[#181d16] flex items-center gap-2">
                <FileSpreadsheet className="text-[#176a22]" size={20} />
                Tải lên File Excel (.xlsx)
              </h3>
              <button onClick={() => setShowExcelUpload(false)} className="text-[#707a6c] hover:text-[#ba1a1a] cursor-pointer">
                <X size={18} />
              </button>
            </div>

            <div 
              onClick={handleExcelSimulatedUpload}
              className="border-2 border-dashed border-[#176a22]/50 hover:border-[#176a22] bg-[#f1f5ea] p-8 rounded-xl text-center cursor-pointer space-y-2 transition-colors"
            >
              <Upload className="mx-auto text-[#176a22]" size={36} />
              <p className="text-xs font-bold text-[#181d16]">Kéo thả file Excel (.xlsx) vào đây</p>
              <p className="text-[11px] text-[#707a6c]">Hoặc bấm vào đây để chọn file</p>
            </div>

            <div className="flex justify-between items-center text-xs pt-1">
              <button 
                onClick={() => alert('Đang tải file mẫu...')}
                className="text-[#176a22] font-semibold hover:underline cursor-pointer"
              >
                Tải file mẫu (.xlsx)
              </button>
              <button
                onClick={() => setShowExcelUpload(false)}
                className="px-4 py-2 border border-[#707a6c] text-[#40493d] rounded-xl font-semibold hover:bg-[#f1f5ea] cursor-pointer"
              >
                Hủy
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Reply to Buyer Modal */}
      {selectedInquiry && (
        <div className="fixed inset-0 z-60 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-[#bfcaba] space-y-4 animate-in zoom-in-95 duration-150">
            <div className="flex justify-between items-center border-b border-[#e0e4d9] pb-3">
              <h3 className="font-bold text-base text-[#181d16] flex items-center gap-2">
                <MessageSquare className="text-[#176a22]" size={20} />
                Phản hồi {selectedInquiry.company}
              </h3>
              <button onClick={() => setSelectedInquiry(null)} className="text-[#707a6c] hover:text-[#ba1a1a] cursor-pointer">
                <X size={18} />
              </button>
            </div>

            <div className="p-3 bg-[#f1f5ea] rounded-xl border border-[#e0e4d9] text-xs space-y-1">
              <p className="font-bold text-[#181d16]">Yêu cầu gốc:</p>
              <p className="text-[#40493d] italic">"{selectedInquiry.message}"</p>
            </div>

            <div className="space-y-1">
              <label className="block text-xs font-semibold text-[#181d16]">Nội dung phản hồi:</label>
              <textarea
                rows={4}
                value={replyMessage}
                onChange={(e) => setReplyMessage(e.target.value)}
                className="w-full p-3 bg-[#f7fbf0] border border-[#707a6c]/40 rounded-xl text-xs text-[#181d16] focus:ring-2 focus:ring-[#176a22] outline-none"
              />
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setSelectedInquiry(null)}
                className="px-4 py-2 border border-[#707a6c] text-[#40493d] rounded-xl text-xs font-semibold hover:bg-[#f1f5ea] cursor-pointer"
              >
                Hủy
              </button>
              <button
                onClick={handleSendReply}
                className="px-5 py-2 bg-[#176a22] text-white rounded-xl text-xs font-bold hover:bg-[#12541b] flex items-center gap-1.5 cursor-pointer"
              >
                <Send size={14} />
                Gửi phản hồi
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Expert Consultation Modal */}
      {showConsultModal && (
        <div className="fixed inset-0 z-60 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-[#bfcaba] space-y-4 animate-in zoom-in-95 duration-150">
            <div className="flex justify-between items-center border-b border-[#e0e4d9] pb-3">
              <h3 className="font-bold text-base text-[#181d16] flex items-center gap-2">
                <Headphones className="text-[#176a22]" size={20} />
                Tư vấn Định giá Hợp đồng
              </h3>
              <button onClick={() => setShowConsultModal(false)} className="text-[#707a6c] hover:text-[#ba1a1a] cursor-pointer">
                <X size={18} />
              </button>
            </div>

            <p className="text-xs text-[#40493d]">
              Để lại số điện thoại, chuyên gia AgriConnect sẽ tư vấn chỉ số biến động giá nông sản & phân tích dòng tiền bao tiêu cho bạn trong vòng 15 phút.
            </p>

            <div className="space-y-3">
              <input
                type="text"
                placeholder="Họ và tên của bạn"
                className="w-full h-10 px-3.5 bg-[#f1f5ea] border border-[#707a6c]/40 rounded-xl text-xs text-[#181d16] outline-none focus:ring-2 focus:ring-[#176a22]"
              />
              <input
                type="tel"
                placeholder="Số điện thoại liên hệ"
                className="w-full h-10 px-3.5 bg-[#f1f5ea] border border-[#707a6c]/40 rounded-xl text-xs text-[#181d16] outline-none focus:ring-2 focus:ring-[#176a22]"
              />
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setShowConsultModal(false)}
                className="px-4 py-2 border border-[#707a6c] text-[#40493d] rounded-xl text-xs font-semibold hover:bg-[#f1f5ea] cursor-pointer"
              >
                Hủy
              </button>
              <button
                onClick={() => {
                  alert('Cảm ơn bạn! Chuyên viên AgriConnect sẽ gọi tư vấn trực tiếp ngay.');
                  setShowConsultModal(false);
                }}
                className="px-5 py-2 bg-[#176a22] text-white rounded-xl text-xs font-bold hover:bg-[#12541b] cursor-pointer"
              >
                Gửi Yêu Cầu
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
