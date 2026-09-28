import sys

path = 'AgriConectFE/src/components/supplier/SupportSettingsView.tsx'
with open(path, 'r', encoding='utf-8') as f:
    content = f.read()

imports = '''import React, { useState } from 'react';
import { HelpCircle, Settings, User, ShieldCheck, Mail, Phone, MapPin, Send, Save, Lock } from 'lucide-react';
import { useAuthStore } from '@/store/authStore';

const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8080';'''

old_imports = "import React, { useState } from 'react';\nimport { HelpCircle, Settings, User, ShieldCheck, Mail, Phone, MapPin, Send, Save } from 'lucide-react';"

if old_imports in content:
    content = content.replace(old_imports, imports)

state_additions = '''  const [cert, setCert] = useState('VietGAP & GlobalGAP Mã số: VGAP-AG-2026-088');

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
  };'''

old_state = "  const [cert, setCert] = useState('VietGAP & GlobalGAP Mã số: VGAP-AG-2026-088');"
if old_state in content:
    content = content.replace(old_state, state_additions)

ui_additions = '''        <div className="pt-2 flex justify-end">
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
      </div>'''

old_ui = '''        <div className="pt-2 flex justify-end">
          <button
            type="submit"
            className="px-6 py-2.5 bg-[#176a22] hover:bg-[#12541b] text-white rounded-xl text-sm font-semibold flex items-center gap-2"
          >
            <Save size={16} /> Lưu cài đặt
          </button>
        </div>
      </form>'''

if old_ui in content:
    content = content.replace(old_ui, ui_additions)

with open(path, 'w', encoding='utf-8') as f:
    f.write(content)

print("Script executed.")
