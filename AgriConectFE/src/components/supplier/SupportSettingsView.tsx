import React, { useState } from 'react';
import { HelpCircle, Settings, User, ShieldCheck, Mail, Phone, MapPin, Send, Save, Lock } from 'lucide-react';
import { useAuthStore } from '@/store/authStore';

const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8080';

interface SupportSettingsViewProps {
  mode: 'support' | 'settings';
}

export const SupportSettingsView: React.FC<SupportSettingsViewProps> = ({ mode }) => {
  const [farmName, setFarmName] = useState('Trang Trại Agri-Hùng (Chợ Mới)');
  const [ownerName, setOwnerName] = useState('Lê Văn Hùng');
  const [phone, setPhone] = useState('0918 789 999');
  const [address, setAddress] = useState('Xã Mỹ Luông, Huyện Chợ Mới, Tỉnh An Giang');
  const [cert, setCert] = useState('VietGAP & GlobalGAP Mã số: VGAP-AG-2026-088');

  // Đổi mật khẩu
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passError, setPassError] = useState('');
  const [passSuccess, setPassSuccess] = useState('');
  const [isChangingPass, setIsChangingPass] = useState(false);
  const { token, clearAuth } = useAuthStore();

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setPassError('');
    setPassSuccess('');
    if (newPassword !== confirmPassword) {
      setPassError('Mật khẩu mới và xác nhận không khớp.');
      return;
    }
    try {
      setIsChangingPass(true);
      const res = await fetch(${API_BASE}/api/auth/change-password, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: Bearer 
        },
        body: JSON.stringify({ oldPassword, newPassword, confirmPassword })
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || 'Đổi mật khẩu thất bại');
      }
      setPassSuccess('Đổi mật khẩu thành công! Vui lòng đăng nhập lại với mật khẩu mới.');
      setOldPassword('');
      setNewPassword('');
      setConfirmPassword('');
      setTimeout(() => {
        clearAuth();
        window.location.href = '/auth/login';
      }, 3000);
    } catch (err: any) {
      setPassError(err.message);
    } finally {
      setIsChangingPass(false);
    }
  };

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

      {/* THÊM FORM ĐỔI MẬT KHẨU */}
      <div className="bg-white p-6 rounded-2xl border border-[#e0e4d9]">
        <h2 className="text-xl font-bold text-[#181d16] flex items-center gap-2 mb-4 pb-2 border-b border-[#e0e4d9]">
          <Lock size={24} className="text-[#176a22]" />
          Đổi mật khẩu bảo mật
        </h2>
        
        {passError && <div className="p-3 mb-4 bg-red-50 text-red-700 text-sm rounded-xl border border-red-200">{passError}</div>}
        {passSuccess && <div className="p-3 mb-4 bg-green-50 text-[#176a22] text-sm rounded-xl border border-green-200 font-bold">{passSuccess}</div>}

        <form onSubmit={handleChangePassword} className="space-y-4 max-w-md">
          <div>
            <label className="block text-xs font-bold text-[#181d16] mb-1">Mật khẩu hiện tại</label>
            <input
              type="password"
              required
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-[#f7fbf0] border border-[#bfcaba] focus:border-[#176a22] rounded-xl text-sm outline-none"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-[#181d16] mb-1">Mật khẩu mới</label>
            <input
              type="password"
              required
              minLength={8}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-[#f7fbf0] border border-[#bfcaba] focus:border-[#176a22] rounded-xl text-sm outline-none"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-[#181d16] mb-1">Xác nhận mật khẩu mới</label>
            <input
              type="password"
              required
              minLength={8}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-[#f7fbf0] border border-[#bfcaba] focus:border-[#176a22] rounded-xl text-sm outline-none"
            />
          </div>
          <div className="pt-2">
            <button
              type="submit"
              disabled={isChangingPass}
              className="px-6 py-2.5 bg-[#176a22] hover:bg-[#12541b] disabled:opacity-50 text-white rounded-xl text-sm font-semibold flex items-center gap-2"
            >
              {isChangingPass ? 'Đang xử lý...' : 'Cập nhật mật khẩu'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
