'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
  X, Sprout, Building2, Truck, CheckCircle2, ArrowRight, Lock, Mail, Phone,
  MapPin, User, LogIn, ShieldCheck, Award, Scale, FileText,
  Key, Smartphone, Upload, FileCheck, Trash2, Paperclip, Check,
} from 'lucide-react';
import { Modal } from '@/components/ui/Modal';
import { useUIStore } from '@/store/uiStore';
import { useAuthStore } from '@/store/authStore';
import { useRouter } from 'next/navigation';
import type { UserProfile } from '@/types/account.type';

// ─── Constants ────────────────────────────────────────────────────────────────
const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8080';

type LocalRole = 'farmer' | 'buyer' | 'carrier';

const roleMap: Record<LocalRole, { beRole: string; feRole: UserProfile['role'] }> = {
  farmer:  { beRole: 'SUPPLIER', feRole: 'Supplier' },
  buyer:   { beRole: 'PARTNER',  feRole: 'Partner'  },
  carrier: { beRole: 'SHIPPER',  feRole: 'Shipper'  },
};

const getRoleLabel = (r: LocalRole): string => {
  if (r === 'farmer')  return 'Nhà Vườn / HTX Nông Nghiệp';
  if (r === 'buyer')   return 'Doanh Nghiệp Thu Mua B2B';
  return 'Đối Tác Vận Tải Logistics Lạnh';
};

// ─── Helper Types ─────────────────────────────────────────────────────────────
interface FileEntry { id: string; name: string; size: string; }
interface PhotoEntry { id: string; name: string; url: string; }

// ─── Field ────────────────────────────────────────────────────────────────────
interface FieldProps {
  label: string;
  icon: React.ReactNode;
  type?: string;
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
  required?: boolean;
}

const Field: React.FC<FieldProps> = ({
  label, icon, type = 'text', placeholder, value, onChange, required = true,
}) => (
  <div>
    <label className="block text-[#40493d] font-bold mb-1 text-xs">
      {label} {required && '*'}
    </label>
    <div className="relative">
      <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#707a6c]">{icon}</span>
      <input
        type={type}
        required={required}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full pl-10 pr-3.5 py-2.5 bg-white border border-[#bfcaba] rounded-xl text-sm focus:ring-2 focus:ring-[#176a22] outline-none"
      />
    </div>
  </div>
);

// ─── FileList ─────────────────────────────────────────────────────────────────
interface FileListProps {
  files: FileEntry[];
  onRemove: (id: string) => void;
}

const FileList: React.FC<FileListProps> = ({ files, onRemove }) => (
  <div className="space-y-1.5">
    {files.map((f) => (
      <div key={f.id} className="bg-white border border-[#c8d8be] rounded-xl p-2.5 flex items-center justify-between">
        <div className="flex items-center gap-2 overflow-hidden">
          <FileCheck className="w-4 h-4 text-[#176a22] shrink-0" />
          <span className="text-xs font-bold text-[#181d16] truncate">{f.name}</span>
          <span className="text-[10px] text-[#707a6c]">{f.size}</span>
        </div>
        <button
          type="button"
          onClick={() => onRemove(f.id)}
          className="p-1 text-red-500 hover:bg-red-50 rounded-lg shrink-0"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    ))}
  </div>
);

// ─── UploadBox ────────────────────────────────────────────────────────────────
interface UploadBoxProps {
  label: string;
  accept: string;
  onUpload: (f: File) => void;
}

const UploadBox: React.FC<UploadBoxProps> = ({ label, accept, onUpload }) => (
  <div className="bg-white border-2 border-dashed border-[#bfcaba] hover:border-[#176a22] rounded-2xl p-4 text-center transition-all">
    <Upload className="w-5 h-5 text-[#176a22] mx-auto mb-1" />
    <p className="text-xs font-bold text-[#181d16]">{label}</p>
    <label className="mt-2 inline-flex items-center gap-2 px-4 py-1.5 bg-[#f0f5e8] hover:bg-[#176a22] text-[#176a22] hover:text-white rounded-xl text-xs font-bold transition-all cursor-pointer border border-[#c8d8be]">
      <Paperclip className="w-3.5 h-3.5" /> Chọn tệp
      <input
        type="file"
        accept={accept}
        className="hidden"
        onChange={(e) => { if (e.target.files?.[0]) onUpload(e.target.files[0]); }}
      />
    </label>
  </div>
);

// ─── RoleSelector ─────────────────────────────────────────────────────────────
interface RoleSelectorProps {
  label: string;
  role: LocalRole;
  onRoleChange: (r: LocalRole) => void;
}

const RoleSelector: React.FC<RoleSelectorProps> = ({ label, role, onRoleChange }) => (
  <div>
    <p className="text-xs font-bold text-[#40493d] mb-2">{label}</p>
    <div className="grid grid-cols-3 gap-2">
      {([
        ['farmer',  <Sprout   key="s" className="w-4 h-4" />, '1. Nhà Vườn / HTX'],
        ['buyer',   <Building2 key="b" className="w-4 h-4" />, '2. Thu Mua B2B'],
        ['carrier', <Truck    key="t" className="w-4 h-4" />, '3. Vận Tải Lạnh'],
      ] as [LocalRole, React.ReactNode, string][]).map(([r, icon, lbl]) => (
        <button
          key={r}
          type="button"
          onClick={() => onRoleChange(r)}
          className={`p-3 rounded-2xl border text-xs font-semibold flex flex-col items-center gap-1.5 transition-all cursor-pointer ${
            role === r
              ? 'bg-[#176a22] text-white border-[#176a22] shadow-xs'
              : 'bg-white text-[#40493d] border-[#bfcaba] hover:border-[#176a22]'
          }`}
        >
          {icon}
          <span>{lbl}</span>
        </button>
      ))}
    </div>
  </div>
);

// ─── SignatureSection ─────────────────────────────────────────────────────────
interface SignatureSectionProps {
  canvasRef: React.RefObject<HTMLCanvasElement | null>;
  isDrawing: boolean;
  hasSignature: boolean;
  sigMethod: 'usb' | 'otp';
  termsContent: React.ReactNode;
  agreed: boolean;
  onAgree: (v: boolean) => void;
  onSigMethodChange: (m: 'usb' | 'otp') => void;
  onStartDrawing: (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => void;
  onDraw: (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => void;
  onStopDrawing: () => void;
  onClearSignature: () => void;
}

const SignatureSection: React.FC<SignatureSectionProps> = ({
  canvasRef, hasSignature, sigMethod, termsContent, agreed, onAgree,
  onSigMethodChange, onStartDrawing, onDraw, onStopDrawing, onClearSignature,
}) => (
  <div className="pt-4 space-y-4 border-t border-[#e0e4d9]">
    <h3 className="text-base font-bold text-[#181d16]">Ký cam kết & Chữ ký số</h3>
    <div className="bg-[#f0f5e8]/80 border border-[#c8d8be] rounded-2xl p-4">{termsContent}</div>
    <label className="flex items-start gap-2.5 cursor-pointer">
      <input
        type="checkbox"
        checked={agreed}
        onChange={(e) => onAgree(e.target.checked)}
        className="mt-0.5 rounded accent-[#176a22] w-4 h-4 shrink-0"
      />
      <span className="text-xs font-bold text-[#181d16]">
        Tôi đã đọc và đồng ý với tất cả điều khoản cam kết nêu trên.
      </span>
    </label>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="space-y-2">
        <p className="text-sm font-bold text-[#181d16]">Ký số điện tử</p>
        <div className="grid grid-cols-2 gap-2">
          {(['usb', 'otp'] as const).map((m) => (
            <button
              key={m}
              type="button"
              onClick={() => onSigMethodChange(m)}
              className={`p-3 rounded-2xl border flex items-center justify-center gap-2 font-bold text-xs transition-all cursor-pointer ${
                sigMethod === m
                  ? 'bg-[#eef5e6] border-[#176a22] text-[#176a22]'
                  : 'bg-white border-[#bfcaba] text-[#40493d]'
              }`}
            >
              {m === 'usb' ? <Key className="w-4 h-4" /> : <Smartphone className="w-4 h-4" />}
              <span>{m === 'usb' ? 'USB Token' : 'Smart OTP'}</span>
            </button>
          ))}
        </div>
      </div>
      <div className="bg-[#f0f5e8]/70 border border-[#c8d8be] rounded-2xl p-3 space-y-2">
        <div className="relative bg-white border border-[#bfcaba] rounded-xl h-28 overflow-hidden">
          <canvas
            ref={canvasRef}
            width={320}
            height={110}
            className="w-full h-full cursor-crosshair touch-none"
            onMouseDown={onStartDrawing}
            onMouseMove={onDraw}
            onMouseUp={onStopDrawing}
            onMouseLeave={onStopDrawing}
            onTouchStart={onStartDrawing}
            onTouchMove={onDraw}
            onTouchEnd={onStopDrawing}
          />
          {!hasSignature && (
            <span className="absolute inset-0 flex items-center justify-center text-xs text-[#808c7c] pointer-events-none">
              Vẽ chữ ký tại đây
            </span>
          )}
        </div>
        <button
          type="button"
          onClick={onClearSignature}
          className="w-full py-2 bg-white hover:bg-emerald-50 border border-[#bfcaba] rounded-xl text-xs font-bold text-[#40493d] transition-colors"
        >
          Xóa chữ ký
        </button>
      </div>
    </div>
  </div>
);

// ─── Utility ──────────────────────────────────────────────────────────────────
const makeFileEntry = (file: File): FileEntry => ({
  id: Date.now().toString() + Math.random(),
  name: file.name,
  size: `${(file.size / 1048576).toFixed(1)} MB`,
});

// ─── RegisterModal ────────────────────────────────────────────────────────────
export const RegisterModal: React.FC = () => {
  const { isRegisterModalOpen, closeRegisterModal, authInitialTab } = useUIStore();
  const { setAuth } = useAuthStore();
  const router = useRouter();

  // ── UI state ──────────────────────────────────────────────────────────────
  const [activeTab, setActiveTab] = useState<'login' | 'register'>(authInitialTab ?? 'register');
  const [role, setRole] = useState<LocalRole>('farmer');
  const [step, setStep] = useState<'form' | 'verify' | 'success'>('form');
  const [registeredEmail, setRegisteredEmail] = useState('');
  const [otpCode, setOtpCode] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isRegisterModalOpen) {
      setActiveTab(authInitialTab ?? 'register');
      setRole('farmer');
      setStep('form');
      setRegisteredEmail('');
      setOtpCode('');
      setIsLoggedIn(false);
      setError('');
    }
  }, [isRegisterModalOpen, authInitialTab]);

  // ── Login form ────────────────────────────────────────────────────────────
  const [loginForm, setLoginForm] = useState({ account: '', password: '', remember: true });

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: loginForm.account, password: loginForm.password }),
      });
      if (!res.ok) throw new Error('Sai tên đăng nhập hoặc mật khẩu');
      const data = await res.json();
      // Dữ liệu thực tế nằm trong data.data do ApiResponse wrap
      const authData = data.data;

      const feRole: UserProfile['role'] =
        authData?.role === 'ADMIN'     ? 'Admin'
        : authData?.role === 'SUPPLIER' ? 'Supplier'
        : authData?.role === 'SHIPPER'  ? 'Shipper'
        : 'Partner';

      const user: UserProfile = {
        id:          String(authData?.userId ?? ''),
        name:        authData?.fullName ?? loginForm.account,
        companyName: authData?.companyName ?? '',
        email:       authData?.email  ?? '',
        phone:       authData?.phone  ?? '',
        taxId:       authData?.taxId  ?? '',
        role:        feRole,
        verified:    authData?.status === 'ACTIVE',
        province:    authData?.province ?? '',
      };

      const jwtToken = authData?.accessToken;

      setAuth(user, jwtToken);
      setIsLoggedIn(true);

      // Redirect sau 1.2s để user thấy màn hình success
      setTimeout(() => {
        closeRegisterModal();
        if (feRole === 'Admin')         router.push('/admin');
        else if (feRole === 'Partner')  router.push('/dashboard/partner');
        else if (feRole === 'Shipper')  router.push('/dashboard/shipper');
        else                            router.push('/dashboard/supplier');
      }, 1200);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Đã có lỗi xảy ra');
    } finally {
      setLoading(false);
    }
  };

  // ── Farmer form ────────────────────────────────────────────────────────────
  const [farmerForm, setFarmerForm] = useState({
    unitName: '', taxId: '', farmAddress: '', repName: '', phone: '', email: '',
    username: '', password: '',
    certifications: [] as string[],
    certFiles: [] as FileEntry[],
    totalAreaM2: '', annualVolumeTons: '', mainCropList: '',
    farmPhotos: [] as PhotoEntry[],
  });

  // ── Buyer form ─────────────────────────────────────────────────────────────
  const [buyerForm, setBuyerForm] = useState({
    companyName: '', taxId: '', address: '', repName: '', phone: '', email: '',
    username: '', password: '',
    businessSectors: [] as string[],
    businessLicenseFiles: [] as FileEntry[],
    financialReportFiles:  [] as FileEntry[],
    companyProfileFiles:   [] as FileEntry[],
    idCardFiles:           [] as FileEntry[],
    desiredCreditLimit: '2 tỷ VNĐ',
    paymentTerm: 'T+30 ngày',
    agreedIsoTerms: true,
  });

  // ── Carrier form ───────────────────────────────────────────────────────────
  const [carrierForm, setCarrierForm] = useState({
    companyName: '', taxId: '', repName: '', phone: '', address: '',
    username: '', password: '',
    transportLicenseFiles: [] as FileEntry[],
    fleetClosedTrucks: 0, fleetRefrigeratedTrucks: 0, fleetContainerTrucks: 0,
    hasColdChainCert: false,
    agreedCarrierTerms: true,
  });

  // ── Signature state ────────────────────────────────────────────────────────
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [hasSignature, setHasSignature] = useState(false);
  const [sigMethod, setSigMethod] = useState<'usb' | 'otp'>('usb');
  const [agreedTerms, setAgreedTerms] = useState(true);

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current; if (!canvas) return;
    const ctx = canvas.getContext('2d'); if (!ctx) return;
    setIsDrawing(true); setHasSignature(true);
    const rect = canvas.getBoundingClientRect();
    const cx = 'touches' in e ? e.touches[0].clientX : (e as React.MouseEvent).clientX;
    const cy = 'touches' in e ? e.touches[0].clientY : (e as React.MouseEvent).clientY;
    ctx.beginPath(); ctx.moveTo(cx - rect.left, cy - rect.top);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current; if (!canvas) return;
    const ctx = canvas.getContext('2d'); if (!ctx) return;
    const rect = canvas.getBoundingClientRect();
    const cx = 'touches' in e ? e.touches[0].clientX : (e as React.MouseEvent).clientX;
    const cy = 'touches' in e ? e.touches[0].clientY : (e as React.MouseEvent).clientY;
    ctx.lineTo(cx - rect.left, cy - rect.top);
    ctx.strokeStyle = '#176a22'; ctx.lineWidth = 2.5;
    ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.stroke();
  };

  const stopDrawing = () => setIsDrawing(false);

  const clearSignature = () => {
    const canvas = canvasRef.current; if (!canvas) return;
    canvas.getContext('2d')?.clearRect(0, 0, canvas.width, canvas.height);
    setHasSignature(false);
  };

  // ── Register submit ────────────────────────────────────────────────────────
  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(''); setLoading(true);
    try {
      const { beRole } = roleMap[role];
      let body: Record<string, unknown> = { role: beRole };

      if (role === 'farmer') {
        body = {
          ...body,
          username:  farmerForm.username,
          password:  farmerForm.password,
          email:     farmerForm.email,
          phone:     farmerForm.phone,
          address:   farmerForm.farmAddress,
          fullName:  farmerForm.repName,
          farmName:  farmerForm.unitName,
        };
      } else if (role === 'buyer') {
        body = {
          ...body,
          username:    buyerForm.username,
          password:    buyerForm.password,
          email:       buyerForm.email,
          phone:       buyerForm.phone,
          address:     buyerForm.address,
          fullName:    buyerForm.repName,
          companyName: buyerForm.companyName,
        };
      } else {
        body = {
          ...body,
          username:    carrierForm.username,
          password:    carrierForm.password,
          email:       '',
          phone:       carrierForm.phone,
          address:     carrierForm.address,
          fullName:    carrierForm.repName,
          vehicleType: 'Xe tải',
        };
      }

      const res = await fetch(`${API_BASE}/api/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      if (!res.ok) {
        const txt = await res.text();
        throw new Error(txt || 'Đăng ký thất bại');
      }
      setRegisteredEmail((body.email as string) || '');
      setStep('verify');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Đã có lỗi xảy ra');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(''); setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/api/auth/verify-email`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: registeredEmail, otpCode: otpCode }),
      });
      if (!res.ok) {
        const txt = await res.text();
        throw new Error(txt || 'Xác thực thất bại');
      }
      setStep('success');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Đã có lỗi xảy ra');
    } finally {
      setLoading(false);
    }
  };

  // ─── Render ────────────────────────────────────────────────────────────────
  return (
    <Modal isOpen={isRegisterModalOpen} onClose={closeRegisterModal} maxWidth="max-w-3xl">
      {/* Custom header (replaces Modal's built-in header) */}
      <div className="px-6 py-4 bg-[#f1f5ea] border-b border-[#e0e4d9] flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-[#176a22] text-white flex items-center justify-center shadow-xs">
            <Sprout className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-[#181d16] font-sans">
              {activeTab === 'login' ? 'Đăng Nhập Cổng AgriConnect' : 'Đăng Ký Tài Khoản B2B'}
            </h2>
            <p className="text-xs text-[#707a6c]">
              Hệ sinh thái giao dịch nông sản chuẩn xuất khẩu &amp; Logistics IoT
            </p>
          </div>
        </div>
        <button
          onClick={closeRegisterModal}
          className="p-2 text-[#707a6c] hover:text-[#181d16] hover:bg-white rounded-full transition-colors"
          aria-label="Đóng"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      {/* Tab switcher */}
      {step === 'form' && !isLoggedIn && (
        <div className="px-6 pt-3 pb-2 bg-[#f7fbf0] border-b border-[#e0e4d9] flex gap-2">
          {(['login', 'register'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer ${
                activeTab === tab
                  ? 'bg-[#176a22] text-white shadow-xs'
                  : 'bg-white border border-[#bfcaba] text-[#40493d] hover:border-[#176a22]'
              }`}
            >
              {tab === 'login' ? <LogIn className="w-4 h-4" /> : <Sprout className="w-4 h-4" />}
              {tab === 'login' ? 'Đăng Nhập' : 'Đăng Ký Mới'}
            </button>
          ))}
        </div>
      )}

      {/* Body */}
      <div className="p-6 overflow-y-auto max-h-[70vh] space-y-5">

        {/* ── Login success ── */}
        {isLoggedIn ? (
          <div className="py-8 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-100 border border-emerald-300 text-[#176a22] flex items-center justify-center mx-auto shadow-xs">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h3 className="text-xl font-bold text-[#181d16]">Đăng Nhập Thành Công!</h3>
            <p className="text-sm text-[#40493d]">Đang chuyển hướng đến bảng điều khiển...</p>
          </div>

        ) : step === 'verify' ? (
          /* ── OTP Verify ── */
          <div className="py-8 text-center space-y-5 max-w-md mx-auto">
            <div className="w-16 h-16 rounded-full bg-emerald-100 border border-emerald-300 text-[#176a22] flex items-center justify-center mx-auto shadow-xs">
              <Mail className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-[#181d16]">Xác Thực Email</h3>
            <p className="text-sm text-[#40493d] leading-relaxed">
              Vui lòng nhập mã OTP 6 số đã được gửi đến email 
              <br/><strong className="text-[#176a22]">{registeredEmail}</strong>
            </p>
            <form onSubmit={handleVerifyOtp} className="space-y-4 pt-2">
              {error && (
                <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl">{error}</div>
              )}
              <input
                type="text"
                maxLength={6}
                placeholder="Nhập mã OTP (VD: 123456)"
                value={otpCode}
                onChange={(e) => setOtpCode(e.target.value)}
                className="w-full px-4 py-3 text-center text-lg tracking-[0.5em] font-bold bg-white border border-[#bfcaba] rounded-xl focus:ring-2 focus:ring-[#176a22] outline-none"
                required
              />
              <button
                type="submit"
                disabled={loading || otpCode.length < 6}
                className="w-full py-3 bg-[#176a22] hover:bg-[#12531a] text-white font-bold text-sm rounded-xl flex items-center justify-center gap-2 disabled:opacity-70 transition-all shadow-sm cursor-pointer"
              >
                {loading ? <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" /> : 'Xác Thực Tài Khoản'}
              </button>
            </form>
          </div>

        ) : step === 'success' ? (
          /* ── Register success ── */
          <div className="py-8 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-100 border border-emerald-300 text-[#176a22] flex items-center justify-center mx-auto shadow-xs">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h3 className="text-xl font-bold text-[#181d16]">Đăng Ký Hoàn Tất!</h3>
            <p className="text-sm text-[#40493d] max-w-md mx-auto leading-relaxed">
              Tài khoản của bạn đã được xác thực thành công. <br/>
              Bạn có thể tiến hành <strong>Đăng nhập</strong> ngay bây giờ.
            </p>
            <button
              onClick={() => { setStep('form'); setActiveTab('login'); }}
              className="px-8 py-3 bg-[#176a22] hover:bg-[#12531a] text-white text-xs font-bold rounded-xl shadow-xs transition-all cursor-pointer"
            >
              Chuyển Đến Đăng Nhập
            </button>
          </div>

        ) : activeTab === 'login' ? (
          /* ── LOGIN FORM ── */
          <form onSubmit={handleLoginSubmit} className="space-y-5">
            <RoleSelector label="Đăng nhập theo vai trò:" role={role} onRoleChange={setRole} />
            {error && (
              <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl">{error}</div>
            )}
            <div className="space-y-3.5 text-xs">
              <Field
                label="Email hoặc Tên đăng nhập"
                icon={<User className="w-4 h-4" />}
                placeholder="username hoặc email@domain.vn"
                value={loginForm.account}
                onChange={(v) => setLoginForm({ ...loginForm, account: v })}
              />
              <Field
                label="Mật Khẩu"
                icon={<Lock className="w-4 h-4" />}
                type="password"
                placeholder="••••••••"
                value={loginForm.password}
                onChange={(v) => setLoginForm({ ...loginForm, password: v })}
              />
              <div className="flex items-center justify-between pt-1">
                <label className="flex items-center gap-2 text-xs text-[#40493d] cursor-pointer">
                  <input
                    type="checkbox"
                    checked={loginForm.remember}
                    onChange={(e) => setLoginForm({ ...loginForm, remember: e.target.checked })}
                    className="rounded accent-[#176a22] w-4 h-4"
                  />
                  Ghi nhớ đăng nhập
                </label>
                <span className="text-xs font-bold text-[#176a22] hover:underline cursor-pointer">
                  Quên mật khẩu?
                </span>
              </div>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-[#176a22] hover:bg-[#12531a] text-white font-bold text-sm rounded-xl flex items-center justify-center gap-2 disabled:opacity-70 transition-all shadow-sm cursor-pointer"
            >
              {loading
                ? <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                : <><span>Xác Nhận Đăng Nhập</span><ArrowRight className="w-4 h-4" /></>
              }
            </button>
            <p className="text-center text-xs text-[#707a6c]">
              Chưa có tài khoản?{' '}
              <button
                type="button"
                onClick={() => setActiveTab('register')}
                className="font-bold text-[#176a22] hover:underline cursor-pointer"
              >
                Đăng ký ngay
              </button>
            </p>
          </form>

        ) : (
          /* ── REGISTER FORM ── */
          <form onSubmit={handleRegisterSubmit} className="space-y-5">
            <RoleSelector label="Chọn vai trò đăng ký:" role={role} onRoleChange={setRole} />
            {error && (
              <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl">{error}</div>
            )}

            {/* ── FARMER FORM ── */}
            {role === 'farmer' && (
              <div className="space-y-6 text-xs">
                <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-2xl text-emerald-900 flex items-center gap-2.5">
                  <Sprout className="w-5 h-5 text-[#176a22] shrink-0" />
                  <span>Dành cho Chủ vườn, Nông hộ &amp; Hợp tác xã niêm yết nông sản B2B.</span>
                </div>

                {/* Section: Unit info */}
                <div className="space-y-3">
                  <h3 className="text-sm font-bold text-[#181d16] flex items-center gap-2 border-b border-[#e0e4d9] pb-2">
                    <Building2 className="w-4 h-4 text-[#176a22]" />Thông tin đơn vị sản xuất
                  </h3>
                  <Field label="Tên đơn vị sản xuất" icon={<Building2 className="w-4 h-4" />}
                    placeholder="HTX Nông nghiệp Công nghệ cao"
                    value={farmerForm.unitName} onChange={(v) => setFarmerForm({ ...farmerForm, unitName: v })} />
                  <div className="grid grid-cols-2 gap-3">
                    <Field label="Mã số thuế / CCCD" icon={<ShieldCheck className="w-4 h-4" />}
                      placeholder="0123456789"
                      value={farmerForm.taxId} onChange={(v) => setFarmerForm({ ...farmerForm, taxId: v })} />
                    <Field label="Người đại diện" icon={<User className="w-4 h-4" />}
                      placeholder="Nguyễn Văn Nam"
                      value={farmerForm.repName} onChange={(v) => setFarmerForm({ ...farmerForm, repName: v })} />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <Field label="Địa chỉ trang trại" icon={<MapPin className="w-4 h-4" />}
                      placeholder="Xã Mỹ Hạnh, Tiền Giang"
                      value={farmerForm.farmAddress} onChange={(v) => setFarmerForm({ ...farmerForm, farmAddress: v })} />
                    <Field label="Số điện thoại" icon={<Phone className="w-4 h-4" />} type="tel"
                      placeholder="0908 123 456"
                      value={farmerForm.phone} onChange={(v) => setFarmerForm({ ...farmerForm, phone: v })} />
                  </div>
                  <Field label="Email" icon={<Mail className="w-4 h-4" />} type="email"
                    placeholder="htx@nongsan.vn"
                    value={farmerForm.email} onChange={(v) => setFarmerForm({ ...farmerForm, email: v })} />
                </div>

                {/* Section: Certifications */}
                <div className="space-y-3">
                  <h3 className="text-sm font-bold text-[#181d16] flex items-center gap-2 border-b border-[#e0e4d9] pb-2">
                    <Award className="w-4 h-4 text-[#176a22]" />Chứng nhận tiêu chuẩn
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {['VietGAP', 'GlobalGAP', 'Hữu cơ (Organic)', 'Mã Số Vùng Trồng', 'MRL EU'].map((cert) => {
                      const active = farmerForm.certifications.includes(cert);
                      return (
                        <button key={cert} type="button"
                          onClick={() => setFarmerForm((p) => ({
                            ...p,
                            certifications: active ? p.certifications.filter((c) => c !== cert) : [...p.certifications, cert],
                          }))}
                          className={`px-3 py-1.5 rounded-xl border text-xs font-semibold flex items-center gap-1 transition-all cursor-pointer ${
                            active ? 'bg-[#176a22] text-white border-[#176a22]' : 'bg-white text-[#40493d] border-[#bfcaba]'
                          }`}
                        >
                          <Award className="w-3.5 h-3.5" />{cert}{active && <Check className="w-3.5 h-3.5" />}
                        </button>
                      );
                    })}
                  </div>
                  <UploadBox label="Tải lên chứng nhận (PDF, JPG)" accept=".pdf,.jpg,.jpeg,.png"
                    onUpload={(f) => setFarmerForm((p) => ({ ...p, certFiles: [...p.certFiles, makeFileEntry(f)] }))} />
                  <FileList files={farmerForm.certFiles}
                    onRemove={(id) => setFarmerForm((p) => ({ ...p, certFiles: p.certFiles.filter((f) => f.id !== id) }))} />
                </div>

                {/* Section: Capacity */}
                <div className="space-y-3">
                  <h3 className="text-sm font-bold text-[#181d16] flex items-center gap-2 border-b border-[#e0e4d9] pb-2">
                    <Scale className="w-4 h-4 text-[#176a22]" />Năng lực sản xuất
                  </h3>
                  <div className="grid grid-cols-2 gap-3">
                    <Field label="Diện tích (m²)" icon={<Scale className="w-4 h-4" />} type="number"
                      placeholder="15000" value={farmerForm.totalAreaM2}
                      onChange={(v) => setFarmerForm({ ...farmerForm, totalAreaM2: v })} />
                    <Field label="Sản lượng/năm (Tấn)" icon={<Sprout className="w-4 h-4" />} type="number"
                      placeholder="180" value={farmerForm.annualVolumeTons}
                      onChange={(v) => setFarmerForm({ ...farmerForm, annualVolumeTons: v })} />
                  </div>
                  <Field label="Sản phẩm chủ lực" icon={<FileText className="w-4 h-4" />}
                    placeholder="Thanh Long, Sầu Riêng, Xoài..." value={farmerForm.mainCropList}
                    onChange={(v) => setFarmerForm({ ...farmerForm, mainCropList: v })} />
                </div>

                {/* Section: Account */}
                <div className="grid grid-cols-2 gap-3">
                  <Field label="Tên đăng nhập" icon={<User className="w-4 h-4" />}
                    placeholder="username" value={farmerForm.username}
                    onChange={(v) => setFarmerForm({ ...farmerForm, username: v })} />
                  <Field label="Mật khẩu" icon={<Lock className="w-4 h-4" />} type="password"
                    placeholder="Tối thiểu 6 ký tự" value={farmerForm.password}
                    onChange={(v) => setFarmerForm({ ...farmerForm, password: v })} />
                </div>

                <SignatureSection
                  canvasRef={canvasRef} isDrawing={isDrawing} hasSignature={hasSignature}
                  sigMethod={sigMethod} agreed={agreedTerms} onAgree={setAgreedTerms}
                  onSigMethodChange={setSigMethod}
                  onStartDrawing={startDrawing} onDraw={draw} onStopDrawing={stopDrawing}
                  onClearSignature={clearSignature}
                  termsContent={
                    <ol className="list-decimal pl-4 text-xs text-[#3a4437] space-y-2">
                      <li>Cam kết tất cả sản phẩm tuân thủ quy định an toàn thực phẩm.</li>
                      <li>Không sử dụng thuốc bảo vệ thực vật ngoài danh mục cho phép.</li>
                      <li>Minh bạch thông tin truy xuất nguồn gốc qua mã QR code.</li>
                    </ol>
                  }
                />
              </div>
            )}

            {/* ── BUYER FORM ── */}
            {role === 'buyer' && (
              <div className="space-y-6 text-xs">
                <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-2xl text-emerald-900 flex items-center gap-2.5">
                  <Building2 className="w-5 h-5 text-[#176a22] shrink-0" />
                  <span>Dành cho Doanh nghiệp xuất nhập khẩu, Siêu thị &amp; Tập đoàn chế biến thực phẩm B2B.</span>
                </div>

                {/* Section: Company info */}
                <div className="space-y-3">
                  <h3 className="text-sm font-bold text-[#181d16] flex items-center gap-2 border-b border-[#e0e4d9] pb-2">
                    <Building2 className="w-4 h-4 text-[#176a22]" />Thông tin doanh nghiệp
                  </h3>
                  <Field label="Tên pháp nhân đầy đủ" icon={<Building2 className="w-4 h-4" />}
                    placeholder="Công ty TNHH AgriTrade Việt Nam"
                    value={buyerForm.companyName} onChange={(v) => setBuyerForm({ ...buyerForm, companyName: v })} />
                  <div className="grid grid-cols-2 gap-3">
                    <Field label="Mã số thuế" icon={<ShieldCheck className="w-4 h-4" />}
                      placeholder="0123456789"
                      value={buyerForm.taxId} onChange={(v) => setBuyerForm({ ...buyerForm, taxId: v })} />
                    <Field label="Người đại diện pháp luật" icon={<User className="w-4 h-4" />}
                      placeholder="Nguyễn Văn A"
                      value={buyerForm.repName} onChange={(v) => setBuyerForm({ ...buyerForm, repName: v })} />
                  </div>
                  <Field label="Địa chỉ trụ sở" icon={<MapPin className="w-4 h-4" />}
                    placeholder="Tầng 15, Bitexco, Quận 1, TP.HCM"
                    value={buyerForm.address} onChange={(v) => setBuyerForm({ ...buyerForm, address: v })} />
                  <div className="grid grid-cols-2 gap-3">
                    <Field label="Số điện thoại" icon={<Phone className="w-4 h-4" />} type="tel"
                      placeholder="0908 999 888"
                      value={buyerForm.phone} onChange={(v) => setBuyerForm({ ...buyerForm, phone: v })} />
                    <Field label="Email doanh nghiệp" icon={<Mail className="w-4 h-4" />} type="email"
                      placeholder="contact@agritrade.vn"
                      value={buyerForm.email} onChange={(v) => setBuyerForm({ ...buyerForm, email: v })} />
                  </div>
                  {/* Business sectors */}
                  <div>
                    <p className="font-bold text-[#40493d] mb-1.5">Lĩnh vực kinh doanh</p>
                    <div className="flex flex-wrap gap-2">
                      {['Xuất khẩu nông sản', 'Siêu thị & Bán lẻ', 'Nhà máy chế biến', 'Phân phối sỉ', 'Nhà hàng & Khách sạn'].map((s) => {
                        const active = buyerForm.businessSectors.includes(s);
                        return (
                          <button key={s} type="button"
                            onClick={() => setBuyerForm((p) => ({
                              ...p,
                              businessSectors: active ? p.businessSectors.filter((x) => x !== s) : [...p.businessSectors, s],
                            }))}
                            className={`px-3 py-1.5 rounded-xl border text-xs font-semibold flex items-center gap-1 transition-all cursor-pointer ${
                              active ? 'bg-[#176a22] text-white border-[#176a22]' : 'bg-white text-[#40493d] border-[#bfcaba]'
                            }`}
                          >
                            {s}{active && <Check className="w-3.5 h-3.5" />}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Section: Legal documents */}
                <div className="space-y-3">
                  <h3 className="text-sm font-bold text-[#181d16] flex items-center gap-2 border-b border-[#e0e4d9] pb-2">
                    <FileText className="w-4 h-4 text-[#176a22]" />Hồ sơ pháp lý
                  </h3>
                  {([
                    ['Giấy phép kinh doanh', 'businessLicenseFiles'],
                    ['Báo cáo tài chính 2 năm', 'financialReportFiles'],
                    ['Company profile', 'companyProfileFiles'],
                    ['CCCD người đại diện', 'idCardFiles'],
                  ] as [string, keyof typeof buyerForm][]).map(([lbl, key]) => (
                    <div key={key} className="space-y-1.5">
                      <UploadBox label={`Tải lên: ${lbl}`} accept=".pdf,.jpg,.jpeg,.png"
                        onUpload={(f) => setBuyerForm((p) => ({ ...p, [key]: [...(p[key] as FileEntry[]), makeFileEntry(f)] }))} />
                      <FileList files={buyerForm[key] as FileEntry[]}
                        onRemove={(id) => setBuyerForm((p) => ({ ...p, [key]: (p[key] as FileEntry[]).filter((f) => f.id !== id) }))} />
                    </div>
                  ))}
                </div>

                {/* Account */}
                <div className="grid grid-cols-2 gap-3">
                  <Field label="Tên đăng nhập" icon={<User className="w-4 h-4" />}
                    placeholder="username" value={buyerForm.username}
                    onChange={(v) => setBuyerForm({ ...buyerForm, username: v })} />
                  <Field label="Mật khẩu" icon={<Lock className="w-4 h-4" />} type="password"
                    placeholder="Tối thiểu 6 ký tự" value={buyerForm.password}
                    onChange={(v) => setBuyerForm({ ...buyerForm, password: v })} />
                </div>

                <SignatureSection
                  canvasRef={canvasRef} isDrawing={isDrawing} hasSignature={hasSignature}
                  sigMethod={sigMethod} agreed={agreedTerms} onAgree={setAgreedTerms}
                  onSigMethodChange={setSigMethod}
                  onStartDrawing={startDrawing} onDraw={draw} onStopDrawing={stopDrawing}
                  onClearSignature={clearSignature}
                  termsContent={
                    <ol className="list-decimal pl-4 text-xs text-[#3a4437] space-y-2">
                      <li>Cam kết thanh toán đúng hạn theo điều khoản hợp đồng B2B AgriConnect.</li>
                      <li>Không chia sẻ thông tin giá cả và nguồn cung cho bên thứ ba.</li>
                      <li>Tuân thủ quy định kiểm dịch thực vật khi xuất nhập khẩu.</li>
                    </ol>
                  }
                />
              </div>
            )}

            {/* ── CARRIER FORM ── */}
            {role === 'carrier' && (
              <div className="space-y-6 text-xs">
                <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-2xl text-emerald-900 flex items-center gap-2.5">
                  <Truck className="w-5 h-5 text-[#176a22] shrink-0" />
                  <span>Dành cho Doanh nghiệp logistics, vận tải lạnh &amp; cold-chain phục vụ nông sản xuất khẩu.</span>
                </div>

                {/* Section: Company info */}
                <div className="space-y-3">
                  <h3 className="text-sm font-bold text-[#181d16] flex items-center gap-2 border-b border-[#e0e4d9] pb-2">
                    <Truck className="w-4 h-4 text-[#176a22]" />Thông tin doanh nghiệp vận tải
                  </h3>
                  <Field label="Tên công ty vận tải" icon={<Building2 className="w-4 h-4" />}
                    placeholder="Công ty TNHH Vận tải Toàn Cầu Agri"
                    value={carrierForm.companyName} onChange={(v) => setCarrierForm({ ...carrierForm, companyName: v })} />
                  <div className="grid grid-cols-2 gap-3">
                    <Field label="Mã số thuế" icon={<ShieldCheck className="w-4 h-4" />}
                      placeholder="0101234567"
                      value={carrierForm.taxId} onChange={(v) => setCarrierForm({ ...carrierForm, taxId: v })} />
                    <Field label="Người đại diện" icon={<User className="w-4 h-4" />}
                      placeholder="Nguyễn Văn A"
                      value={carrierForm.repName} onChange={(v) => setCarrierForm({ ...carrierForm, repName: v })} />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <Field label="Số điện thoại" icon={<Phone className="w-4 h-4" />} type="tel"
                      placeholder="+84 900 000 000"
                      value={carrierForm.phone} onChange={(v) => setCarrierForm({ ...carrierForm, phone: v })} />
                    <Field label="Địa chỉ trụ sở" icon={<MapPin className="w-4 h-4" />}
                      placeholder="KCN Tân Bình, TP.HCM"
                      value={carrierForm.address} onChange={(v) => setCarrierForm({ ...carrierForm, address: v })} />
                  </div>
                </div>

                {/* Section: License */}
                <div className="space-y-3">
                  <h3 className="text-sm font-bold text-[#181d16] flex items-center gap-2 border-b border-[#e0e4d9] pb-2">
                    <FileText className="w-4 h-4 text-[#176a22]" />Giấy phép kinh doanh vận tải
                  </h3>
                  <UploadBox label="Tải lên giấy phép vận tải (PDF)" accept=".pdf,.jpg,.jpeg,.png"
                    onUpload={(f) => setCarrierForm((p) => ({ ...p, transportLicenseFiles: [...p.transportLicenseFiles, makeFileEntry(f)] }))} />
                  <FileList files={carrierForm.transportLicenseFiles}
                    onRemove={(id) => setCarrierForm((p) => ({ ...p, transportLicenseFiles: p.transportLicenseFiles.filter((f) => f.id !== id) }))} />
                </div>

                {/* Section: Fleet */}
                <div className="space-y-3">
                  <h3 className="text-sm font-bold text-[#181d16] flex items-center gap-2 border-b border-[#e0e4d9] pb-2">
                    <Truck className="w-4 h-4 text-[#176a22]" />Quy mô đội xe
                  </h3>
                  <div className="grid grid-cols-3 gap-3">
                    {([
                      ['Xe tải thùng kín', 'fleetClosedTrucks'],
                      ['Xe lạnh', 'fleetRefrigeratedTrucks'],
                      ['Xe container', 'fleetContainerTrucks'],
                    ] as [string, 'fleetClosedTrucks' | 'fleetRefrigeratedTrucks' | 'fleetContainerTrucks'][]).map(([lbl, key]) => (
                      <div key={key}>
                        <label className="block text-[#40493d] font-bold mb-1">{lbl}</label>
                        <input type="number" min={0}
                          value={carrierForm[key]}
                          onChange={(e) => setCarrierForm({ ...carrierForm, [key]: Number(e.target.value) })}
                          className="w-full px-3.5 py-2.5 bg-white border border-[#bfcaba] rounded-xl text-sm focus:ring-2 focus:ring-[#176a22] outline-none"
                        />
                      </div>
                    ))}
                  </div>
                  <label className="flex items-center gap-2.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={carrierForm.hasColdChainCert}
                      onChange={(e) => setCarrierForm({ ...carrierForm, hasColdChainCert: e.target.checked })}
                      className="rounded accent-[#176a22] w-4 h-4"
                    />
                    <span className="text-xs font-bold text-[#181d16]">Có chứng nhận Cold-Chain ISO 22000</span>
                  </label>
                </div>

                {/* Account */}
                <div className="grid grid-cols-2 gap-3">
                  <Field label="Tên đăng nhập" icon={<User className="w-4 h-4" />}
                    placeholder="username" value={carrierForm.username}
                    onChange={(v) => setCarrierForm({ ...carrierForm, username: v })} />
                  <Field label="Mật khẩu" icon={<Lock className="w-4 h-4" />} type="password"
                    placeholder="Tối thiểu 6 ký tự" value={carrierForm.password}
                    onChange={(v) => setCarrierForm({ ...carrierForm, password: v })} />
                </div>

                <SignatureSection
                  canvasRef={canvasRef} isDrawing={isDrawing} hasSignature={hasSignature}
                  sigMethod={sigMethod} agreed={agreedTerms} onAgree={setAgreedTerms}
                  onSigMethodChange={setSigMethod}
                  onStartDrawing={startDrawing} onDraw={draw} onStopDrawing={stopDrawing}
                  onClearSignature={clearSignature}
                  termsContent={
                    <ol className="list-decimal pl-4 text-xs text-[#3a4437] space-y-2">
                      <li>Cam kết đảm bảo nhiệt độ chuỗi lạnh theo yêu cầu hàng hóa.</li>
                      <li>Tuân thủ thời gian giao nhận đã thỏa thuận trong hợp đồng vận chuyển.</li>
                      <li>Cung cấp đầy đủ chứng từ vận chuyển theo quy định của AgriConnect.</li>
                    </ol>
                  }
                />
              </div>
            )}

            {/* Submit button */}
            <button
              type="submit"
              disabled={loading || !agreedTerms}
              className="w-full py-3 bg-[#176a22] hover:bg-[#12531a] text-white font-bold text-sm rounded-xl flex items-center justify-center gap-2 disabled:opacity-60 transition-all shadow-sm cursor-pointer"
            >
              {loading
                ? <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                : <><span>Gửi Hồ Sơ Đăng Ký</span><ArrowRight className="w-4 h-4" /></>
              }
            </button>
            <p className="text-center text-xs text-[#707a6c]">
              Đã có tài khoản?{' '}
              <button
                type="button"
                onClick={() => setActiveTab('login')}
                className="font-bold text-[#176a22] hover:underline cursor-pointer"
              >
                Đăng nhập ngay
              </button>
            </p>
          </form>
        )}
      </div>
    </Modal>
  );
};

export default RegisterModal;
