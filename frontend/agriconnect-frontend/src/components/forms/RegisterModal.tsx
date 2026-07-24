'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
  X, Mail, Lock, Check, ArrowRight, ArrowLeft, Upload, FileText,
  Sparkles, Building2, Truck, Tractor, ShieldCheck, Briefcase,
  CheckCircle2, ShieldAlert, CloudUpload, FileCheck, Snowflake, Package,
  Verified, Trash2,
} from 'lucide-react';
import { Modal } from '@/components/ui/Modal';
import { useUIStore } from '@/store/uiStore';
import { useRouter } from 'next/navigation';
import type { BusinessRole, AuthTab, UserProfile } from '@/types/account.type';

// ─── Forgot Password sub-modal ────────────────────────────────────────────────
const ForgotPasswordModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({
  isOpen, onClose,
}) => {
  const [email, setEmail] = useState('name@company.com');
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => { setLoading(false); setSent(true); }, 600);
  };

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl relative border border-[#e0e4d9]">
        <button onClick={onClose} className="absolute top-4 right-4 text-[#707a6c] hover:text-[#181d16] p-1">
          <X className="w-5 h-5" />
        </button>
        {!sent ? (
          <div>
            <div className="w-12 h-12 rounded-xl bg-[#d8f5d0] text-[#176a22] flex items-center justify-center mb-4">
              <ShieldAlert className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-[#181d16] mb-1">Khôi phục mật khẩu AgriConnect</h3>
            <p className="text-sm text-[#40493d] mb-6">
              Nhập email doanh nghiệp. Chúng tôi sẽ gửi liên kết tạo lại mật khẩu.
            </p>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#181d16] mb-1">
                  Email đăng ký doanh nghiệp
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#707a6c]" />
                  <input
                    type="email" required value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-9 pr-4 py-2.5 bg-[#f1f5ea] border border-[#d7dcd1] rounded-xl text-sm text-[#181d16] focus:outline-none focus:ring-2 focus:ring-[#176a22] focus:bg-white"
                  />
                </div>
              </div>
              <button
                type="submit" disabled={loading}
                className="w-full py-3 px-4 bg-[#176a22] hover:bg-[#12551a] text-white font-semibold text-sm rounded-xl transition-all shadow-md flex justify-center items-center"
              >
                {loading
                  ? <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  : 'Gửi yêu cầu khôi phục'}
              </button>
            </form>
          </div>
        ) : (
          <div className="text-center py-4">
            <div className="w-12 h-12 rounded-full bg-emerald-100 text-[#176a22] flex items-center justify-center mx-auto mb-4">
              <Check className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-[#181d16] mb-2">Đã gửi hướng dẫn!</h3>
            <p className="text-sm text-[#40493d] mb-6">
              Đã gửi email khôi phục đến <strong>{email}</strong>.
            </p>
            <button onClick={onClose}
              className="w-full py-2.5 px-4 bg-[#176a22] text-white font-semibold text-sm rounded-xl hover:bg-[#12551a] transition-all">
              Đóng
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

// ─── LoginForm ────────────────────────────────────────────────────────────────
const LoginForm: React.FC<{
  onSwitchTab: (tab: AuthTab) => void;
  onLoginSuccess: (email: string) => void;
  onForgotPassword: () => void;
}> = ({ onSwitchTab, onLoginSuccess, onForgotPassword }) => {
  const [email, setEmail] = useState('name@company.com');
  const [password, setPassword] = useState('password123');
  const [rememberMe, setRememberMe] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!email.includes('@')) { setError('Vui lòng nhập địa chỉ email hợp lệ.'); return; }
    if (password.length < 6) { setError('Mật khẩu phải từ 6 ký tự trở lên.'); return; }
    setLoading(true);
    setTimeout(() => { setLoading(false); onLoginSuccess(email); }, 600);
  };

  return (
    <div className="w-full flex flex-col">
      <div className="bg-[#ebefe4] p-1 rounded-xl flex items-center mb-6">
        <button type="button" onClick={() => onSwitchTab('login')}
          className="flex-1 py-2.5 px-4 rounded-lg font-medium text-sm transition-all text-[#181d16] bg-white shadow-sm text-center">
          Đăng nhập
        </button>
        <button type="button" onClick={() => onSwitchTab('register')}
          className="flex-1 py-2.5 px-4 rounded-lg font-medium text-sm transition-all text-[#556050] hover:text-[#181d16] text-center">
          Đăng ký
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl flex items-start space-x-2">
            <span className="font-semibold">!</span><span>{error}</span>
          </div>
        )}
        <div>
          <label className="block text-sm font-medium text-[#181d16] mb-1.5">Email</label>
          <div className="relative">
            <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-[#707a6c]" />
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required
              className="w-full pl-10 pr-4 py-3 bg-[#f1f5ea] border border-[#d7dcd1] rounded-xl text-sm text-[#181d16] placeholder-[#818d7c] focus:outline-none focus:ring-2 focus:ring-[#176a22] focus:bg-white transition-all" />
          </div>
        </div>
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="block text-sm font-medium text-[#181d16]">Mật khẩu</label>
            <button type="button" onClick={onForgotPassword}
              className="text-xs font-semibold text-[#176a22] hover:underline">
              Quên mật khẩu?
            </button>
          </div>
          <div className="relative">
            <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-[#707a6c]" />
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required
              className="w-full pl-10 pr-4 py-3 bg-[#f1f5ea] border border-[#d7dcd1] rounded-xl text-sm text-[#181d16] focus:outline-none focus:ring-2 focus:ring-[#176a22] focus:bg-white transition-all" />
          </div>
        </div>
        <div className="flex items-center space-x-2.5 pt-1">
          <input type="checkbox" id="remember-modal" checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
            className="w-4 h-4 rounded text-[#176a22] focus:ring-[#176a22] border-[#bfcaba]" />
          <label htmlFor="remember-modal" className="text-sm text-[#40493d] cursor-pointer">
            Ghi nhớ đăng nhập
          </label>
        </div>
        <button type="submit" disabled={loading}
          className="w-full py-3.5 px-4 bg-[#176a22] hover:bg-[#12551a] text-white font-semibold text-sm rounded-xl shadow-md transition-all flex items-center justify-center space-x-2 disabled:opacity-70">
          {loading
            ? <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            : <span>Đăng nhập</span>}
        </button>
      </form>

      <div className="relative my-5">
        <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-[#d7dcd1]" /></div>
        <div className="relative flex justify-center text-xs">
          <span className="bg-white px-3 text-[#707a6c] font-medium">Hoặc tiếp tục với</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {[
          { label: 'Google', email: 'google@agri.com' },
          { label: 'Facebook', email: 'facebook@agri.com' },
        ].map(({ label, email: e }) => (
          <button key={label} type="button" onClick={() => onLoginSuccess(e)}
            className="flex items-center justify-center space-x-2.5 py-2.5 px-4 border border-[#d7dcd1] bg-white rounded-xl text-sm font-medium text-[#181d16] hover:bg-[#f1f5ea] transition-colors">
            <span>{label}</span>
          </button>
        ))}
      </div>

      <div className="mt-6 text-center text-sm text-[#40493d]">
        Chưa có tài khoản?{' '}
        <button type="button" onClick={() => onSwitchTab('register')}
          className="font-bold text-[#176a22] hover:underline cursor-pointer">
          Đăng ký ngay
        </button>
      </div>
    </div>
  );
};

// ─── RegisterRoleSelect ───────────────────────────────────────────────────────
const RegisterRoleSelect: React.FC<{
  onSwitchTab: (tab: AuthTab) => void;
  onSelectRole: (role: BusinessRole) => void;
}> = ({ onSwitchTab, onSelectRole }) => {
  const [selectedRole, setSelectedRole] = useState<BusinessRole>('Supplier');

  const roles = [
    { role: 'Supplier' as BusinessRole, icon: <Tractor className="w-6 h-6" />, label: 'Nhà cung cấp', desc: 'Cam kết chất lượng & Chữ ký số' },
    { role: 'Partner' as BusinessRole, icon: <Briefcase className="w-6 h-6" />, label: 'Đối tác mua hàng', desc: 'Xác minh thông tin doanh nghiệp' },
    { role: 'Shipper' as BusinessRole, icon: <Truck className="w-6 h-6" />, label: 'Đơn vị vận chuyển', desc: 'Hợp đồng đăng ký vận tải' },
  ];

  return (
    <div className="w-full flex flex-col">
      <div className="bg-[#ebefe4] p-1 rounded-xl flex items-center mb-6">
        <button type="button" onClick={() => onSwitchTab('login')}
          className="flex-1 py-2.5 px-4 rounded-lg font-medium text-sm transition-all text-[#556050] hover:text-[#181d16] text-center">
          Đăng nhập
        </button>
        <button type="button" onClick={() => onSwitchTab('register')}
          className="flex-1 py-2.5 px-4 rounded-lg font-medium text-sm transition-all text-[#181d16] bg-white shadow-sm text-center">
          Đăng ký
        </button>
      </div>

      <div className="mb-5">
        <h2 className="text-xl font-bold text-[#181d16] tracking-tight mb-1">Bắt đầu trải nghiệm</h2>
        <p className="text-sm text-[#40493d]">Chọn loại hình doanh nghiệp để tiếp tục đăng ký.</p>
      </div>

      <div className="space-y-3 mb-6">
        {roles.map(({ role, icon, label, desc }) => (
          <div key={role} onClick={() => setSelectedRole(role)}
            className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex items-center space-x-4 ${
              selectedRole === role
                ? 'bg-[#d8f5d0] border-[#176a22] shadow-sm'
                : 'bg-[#f1f5ea] border-transparent hover:border-[#bfcaba]'
            }`}>
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors ${
              selectedRole === role ? 'bg-[#176a22] text-white' : 'bg-[#38873b] text-white'
            }`}>
              {icon}
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-[#181d16] text-base">{label}</h3>
              <p className="text-xs text-[#40493d] mt-0.5 font-medium">{desc}</p>
            </div>
          </div>
        ))}
      </div>

      <button type="button" onClick={() => onSelectRole(selectedRole)}
        className="w-full py-3.5 px-4 bg-[#176a22] hover:bg-[#12551a] text-white font-semibold text-sm rounded-xl shadow-md transition-all flex items-center justify-center space-x-2">
        <span>Tiếp tục đăng ký</span>
        <ArrowRight className="w-4 h-4" />
      </button>
    </div>
  );
};

// ─── SuccessPanel ─────────────────────────────────────────────────────────────
const SuccessPanel: React.FC<{ user: UserProfile; onClose: () => void }> = ({
  user, onClose,
}) => (
  <div className="text-center space-y-5 py-8 px-4">
    <div className="w-16 h-16 rounded-full bg-[#d8f5d0] text-[#176a22] flex items-center justify-center mx-auto">
      <CheckCircle2 className="w-8 h-8" />
    </div>
    <div>
      <h3 className="text-2xl font-bold text-[#181d16]">Đăng ký thành công!</h3>
      <p className="text-sm text-[#40493d] mt-2">
        Tài khoản <strong>{user.companyName}</strong> đã được tạo và đang chờ xét duyệt.
      </p>
    </div>
    <button onClick={onClose}
      className="px-8 py-3 bg-[#176a22] text-white font-semibold rounded-xl hover:bg-[#12551a] transition-all">
      Bắt đầu sử dụng AgriConnect
    </button>
  </div>
);

// ─── RegisterModal (main export) ──────────────────────────────────────────────
export const RegisterModal: React.FC = () => {
  const { isRegisterModalOpen, closeRegisterModal, authInitialTab } = useUIStore();

  const [activeTab, setActiveTab] = useState<AuthTab>(authInitialTab ?? 'register');
  const [registerStep, setRegisterStep] = useState<'role-select' | 'details'>('role-select');
  const [selectedRole, setSelectedRole] = useState<BusinessRole>('Supplier');
  const [loggedInUser, setLoggedInUser] = useState<UserProfile | null>(null);
  const [isForgotOpen, setIsForgotOpen] = useState(false);

  // Sync tab from store when modal opens
  useEffect(() => {
    if (isRegisterModalOpen) {
      setActiveTab(authInitialTab ?? 'register');
      setRegisterStep('role-select');
      setLoggedInUser(null);
    }
  }, [isRegisterModalOpen, authInitialTab]);

  const router = useRouter();

  const handleLoginSuccess = (email: string) => {
    if (email.toLowerCase() === 'admin@gmail.com') {
      closeRegisterModal();
      router.push('/admin');
      return;
    }
    setLoggedInUser({
      id: `user-${Date.now()}`, name: 'Người Dùng', companyName: 'AgriConnect User',
      email, phone: '', taxId: '', role: 'Partner', verified: true, province: 'TP.HCM',
    });
  };

  const handleRegisterSuccess = (user: UserProfile) => setLoggedInUser(user);

  return (
    <>
      <Modal
        isOpen={isRegisterModalOpen}
        onClose={closeRegisterModal}
        maxWidth="max-w-lg"
      >
        <div className="p-6">
          {loggedInUser ? (
            <SuccessPanel user={loggedInUser} onClose={closeRegisterModal} />
          ) : activeTab === 'login' ? (
            <LoginForm
              onSwitchTab={setActiveTab}
              onLoginSuccess={handleLoginSuccess}
              onForgotPassword={() => setIsForgotOpen(true)}
            />
          ) : registerStep === 'role-select' ? (
            <RegisterRoleSelect
              onSwitchTab={setActiveTab}
              onSelectRole={(role) => {
                setSelectedRole(role);
                setRegisterStep('details');
              }}
            />
          ) : (
            <div className="space-y-4">
              <button
                onClick={() => setRegisterStep('role-select')}
                className="flex items-center gap-2 text-sm text-[#176a22] font-semibold hover:underline"
              >
                <ArrowLeft className="w-4 h-4" /> Quay lại chọn vai trò
              </button>
              <p className="text-sm text-[#40493d]">
                Đang đăng ký vai trò:{' '}
                <strong className="text-[#181d16] capitalize">{selectedRole}</strong>
              </p>
              <button
                onClick={() => handleRegisterSuccess({
                  id: `user-${Date.now()}`, name: 'Doanh Nghiệp Demo',
                  companyName: 'AgriConnect Demo Co.', email: 'demo@agriconnect.vn',
                  phone: '0908123456', taxId: '0123456789',
                  role: selectedRole, verified: true, province: 'TP.HCM',
                  hasDigitalSignature: true,
                })}
                className="w-full py-3.5 bg-[#176a22] text-white font-semibold rounded-xl hover:bg-[#12551a] transition-all"
              >
                Hoàn tất đăng ký
              </button>
            </div>
          )}
        </div>
      </Modal>

      <ForgotPasswordModal isOpen={isForgotOpen} onClose={() => setIsForgotOpen(false)} />
    </>
  );
};
