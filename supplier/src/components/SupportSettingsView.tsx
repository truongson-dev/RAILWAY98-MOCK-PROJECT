import React, { useState } from 'react';
import { HelpCircle, Settings, User, ShieldCheck, Mail, Phone, MapPin, Send, Save } from 'lucide-react';

interface SupportSettingsViewProps {
  mode: 'support' | 'settings';
}

export const SupportSettingsView: React.FC<SupportSettingsViewProps> = ({ mode }) => {
  const [farmName, setFarmName] = useState('Trang Trại Agri-Hùng (Chợ Mới)');
  const [ownerName, setOwnerName] = useState('Lê Văn Hùng');
  const [phone, setPhone] = useState('0918 789 999');
  const [address, setAddress] = useState('Xã Mỹ Luông, Huyện Chợ Mới, Tỉnh An Giang');
  const [cert, setCert] = useState('VietGAP & GlobalGAP Mã số: VGAP-AG-2026-088');

  const [supportMessage, setSupportMessage] = useState('');

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Đã lưu thông tin trang trại và cấu hình tài khoản thành công!');
  };

  const handleSendSupport = (e: React.FormEvent) => {
    e.preventDefault();
    if (!supportMessage.trim()) return;
    alert('Cảm ơn ông Hùng! Yêu cầu hỗ trợ đã được gửi tới đội ngũ Nông nghiệp AgriConnect.');
    setSupportMessage('');
  };

  if (mode === 'support') {
    return (
      <div className="space-y-6 max-w-3xl pb-12">
        <div className="bg-white p-6 rounded-2xl border border-[#e0e4d9]">
          <h2 className="text-xl font-bold text-[#181d16] flex items-center gap-2 mb-1">
            <HelpCircle size={24} className="text-[#176a22]" />
            Trung Tâm Hỗ Trợ Khách Hàng & Kỹ Thuật Nông Nghiệp
          </h2>
          <p className="text-sm text-[#5e6958]">
            Đội ngũ kĩ sư nông nghiệp và bộ phận chăm sóc khách hàng luôn sẵn sàng hỗ trợ ông Hùng 24/7.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-[#f7fbf0] p-5 rounded-2xl border border-[#e0e4d9]">
            <Phone size={20} className="text-[#176a22] mb-2" />
            <h4 className="font-bold text-[#181d16] text-sm">Tổng đài hỗ trợ thương lái</h4>
            <p className="text-base font-extrabold text-[#176a22]">1800 6888 (Miễn phí)</p>
            <p className="text-xs text-[#5e6958] mt-1">Giờ làm việc: 06:00 - 21:00 hàng ngày</p>
          </div>

          <div className="bg-[#f7fbf0] p-5 rounded-2xl border border-[#e0e4d9]">
            <Mail size={20} className="text-[#176a22] mb-2" />
            <h4 className="font-bold text-[#181d16] text-sm">Email bộ phận kiểm định VietGAP</h4>
            <p className="text-sm font-bold text-[#181d16]">hotro@agri-enterprise.vn</p>
            <p className="text-xs text-[#5e6958] mt-1">Phản hồi trong vòng 2 giờ</p>
          </div>
        </div>

        <form onSubmit={handleSendSupport} className="bg-white p-6 rounded-2xl border border-[#e0e4d9] space-y-4">
          <h3 className="font-bold text-[#181d16] text-base">Gửi câu hỏi / Yêu cầu tư vấn kỹ thuật</h3>
          <div>
            <textarea
              rows={4}
              required
              value={supportMessage}
              onChange={(e) => setSupportMessage(e.target.value)}
              placeholder="Nhập nội dung thắc mắc về kỹ thuật bón phân, vận chuyển hoặc xuất hóa đơn..."
              className="w-full p-3.5 bg-[#f7fbf0] border border-[#bfcaba] focus:border-[#176a22] rounded-xl text-sm outline-none"
            />
          </div>
          <button
            type="submit"
            className="px-6 py-2.5 bg-[#176a22] hover:bg-[#12541b] text-white rounded-xl text-sm font-semibold flex items-center gap-2"
          >
            <Send size={16} /> Gửi yêu cầu
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-3xl pb-12">
      <div className="bg-white p-6 rounded-2xl border border-[#e0e4d9]">
        <h2 className="text-xl font-bold text-[#181d16] flex items-center gap-2 mb-1">
          <Settings size={24} className="text-[#176a22]" />
          Cài Đặt Thông Tin Nhà Cung Cấp & Trang Trại
        </h2>
        <p className="text-sm text-[#5e6958]">
          Cập nhật hồ sơ trang trại, thông tin chứng nhận VietGAP và địa chỉ giao nhận nông sản.
        </p>
      </div>

      <form onSubmit={handleSaveSettings} className="bg-white p-6 rounded-2xl border border-[#e0e4d9] space-y-4">
        <div>
          <label className="block text-xs font-bold text-[#181d16] mb-1">Tên trang trại / Cơ sở kinh doanh</label>
          <input
            type="text"
            value={farmName}
            onChange={(e) => setFarmName(e.target.value)}
            className="w-full px-3.5 py-2.5 bg-[#f7fbf0] border border-[#bfcaba] focus:border-[#176a22] rounded-xl text-sm outline-none"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-[#181d16] mb-1">Họ và tên chủ trang trại</label>
            <input
              type="text"
              value={ownerName}
              onChange={(e) => setOwnerName(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-[#f7fbf0] border border-[#bfcaba] focus:border-[#176a22] rounded-xl text-sm outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-[#181d16] mb-1">Số điện thoại liên hệ</label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-[#f7fbf0] border border-[#bfcaba] focus:border-[#176a22] rounded-xl text-sm outline-none"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-[#181d16] mb-1">Địa chỉ trang trại / Điểm tập kết nông sản</label>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="w-full px-3.5 py-2.5 bg-[#f7fbf0] border border-[#bfcaba] focus:border-[#176a22] rounded-xl text-sm outline-none"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-[#181d16] mb-1">Mã số chứng nhận VietGAP / GlobalGAP</label>
          <input
            type="text"
            value={cert}
            onChange={(e) => setCert(e.target.value)}
            className="w-full px-3.5 py-2.5 bg-[#f7fbf0] border border-[#bfcaba] focus:border-[#176a22] rounded-xl text-sm outline-none"
          />
        </div>

        <div className="pt-2 flex justify-end">
          <button
            type="submit"
            className="px-6 py-2.5 bg-[#176a22] hover:bg-[#12541b] text-white rounded-xl text-sm font-semibold flex items-center gap-2"
          >
            <Save size={16} /> Lưu cài đặt
          </button>
        </div>
      </form>
    </div>
  );
};
