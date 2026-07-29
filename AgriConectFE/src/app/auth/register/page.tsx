'use client';

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Sprout, ArrowLeft, ShieldCheck, Zap, User, Lock, Mail, Phone,
  MapPin, Building2, Truck, Tractor, Award, Scale, FileText,
  Upload, Paperclip, Check, Key, Smartphone, Trash2, FileCheck,
  CheckCircle2, ArrowRight
} from 'lucide-react';

const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8080';

// Định nghĩa vai trò tương ứng với Backend
type LocalRole = 'farmer' | 'buyer' | 'carrier';

const roleMap: Record<LocalRole, { beRole: string; feRole: string }> = {
  farmer:  { beRole: 'SUPPLIER', feRole: 'Supplier' },
  buyer:   { beRole: 'PARTNER',  feRole: 'Partner'  },
  carrier: { beRole: 'SHIPPER',  feRole: 'Shipper'  },
};

interface FileEntry { id: string; name: string; size: string; }

const GoogleIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5 mr-3">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
  </svg>
);

const makeFileEntry = (f: File): FileEntry => ({
  id: Math.random().toString(36).substr(2, 9),
  name: f.name,
  size: (f.size / 1024).toFixed(1) + ' KB',
});

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

const FileList: React.FC<{ files: FileEntry[]; onRemove: (id: string) => void }> = ({ files, onRemove }) => (
  <div className="space-y-1.5 mt-2">
    {files.map((file) => (
      <div key={file.id} className="flex items-center justify-between p-2.5 bg-[#f1f5ea] border border-[#e0e4d9] rounded-xl text-xs">
        <div className="flex items-center gap-2 text-[#40493d] min-w-0">
          <FileText className="w-4 h-4 text-[#176a22] shrink-0" />
          <span className="truncate font-medium">{file.name}</span>
          <span className="text-[10px] text-[#707a6c] shrink-0">({file.size})</span>
        </div>
        <button type="button" onClick={() => onRemove(file.id)} className="p-1 hover:bg-[#bfcaba]/30 rounded-lg text-red-600 transition-colors cursor-pointer">
          <Trash2 className="w-3.5 h-3.5" />
        </button>
      </div>
    ))}
  </div>
);

export default function RegisterPage() {
  const router = useRouter();

  // ─── Các State cho Luồng Đăng Ký Đa Bước ────────────────────────────────
  const [role, setRole] = useState<LocalRole>('farmer'); // Vai trò (farmer, buyer, carrier)
  const [currentStep, setCurrentStep] = useState(1); // Bước hiện tại: 1, 2, 3
  const [subStep, setSubStep] = useState<'form' | 'verify' | 'success'>('form'); // Luồng phụ (nhập form -> otp -> thành công)
  const [registeredEmail, setRegisteredEmail] = useState('');
  const [otpCode, setOtpCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // ─── STATE CHO TỪNG LOẠI HỒ SƠ ──────────────────────────────────────────
  
  // 1. Hồ sơ Nhà Vườn (Farmer/Supplier)
  const [farmerForm, setFarmerForm] = useState({
    unitName: '', taxId: '', farmAddress: '', repName: '', phone: '', email: '',
    username: '', password: '',
    certifications: [] as string[],
    certFiles: [] as FileEntry[],
    totalAreaM2: '', annualVolumeTons: '', mainCropList: '',
  });

  // 2. Hồ sơ Doanh Nghiệp (Buyer/Partner)
  const [buyerForm, setBuyerForm] = useState({
    companyName: '', taxId: '', address: '', repName: '', phone: '', email: '',
    username: '', password: '',
    businessSectors: [] as string[],
    businessLicenseFiles: [] as FileEntry[],
    financialReportFiles:  [] as FileEntry[],
  });

  // 3. Hồ sơ Đơn vị vận chuyển (Carrier/Shipper)
  const [carrierForm, setCarrierForm] = useState({
    companyName: '', taxId: '', repName: '', phone: '', address: '',
    username: '', password: '',
    transportLicenseFiles: [] as FileEntry[],
    fleetClosedTrucks: 0, fleetRefrigeratedTrucks: 0, fleetContainerTrucks: 0,
    hasColdChainCert: false,
    vehicleType: 'Xe tải lạnh',
  });

  // ─── STATE CHO CHỮ KÝ SỐ (Canvas Drawing) ─────────────────────────────────
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [hasSignature, setHasSignature] = useState(false);
  const [sigMethod, setSigMethod] = useState<'usb' | 'otp'>('usb');
  const [agreedTerms, setAgreedTerms] = useState(false);

  // ─── XỬ LÝ VẼ CANVAS CHỮ KÝ ──────────────────────────────────────────────
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
    ctx.strokeStyle = '#176a22'; ctx.lineWidth = 3;
    ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.stroke();
  };

  const stopDrawing = () => setIsDrawing(false);

  const clearSignature = () => {
    const canvas = canvasRef.current; if (!canvas) return;
    canvas.getContext('2d')?.clearRect(0, 0, canvas.width, canvas.height);
    setHasSignature(false);
  };

  // Helper tạo cấu trúc file giả lập khi upload
  const makeFileEntry = (file: File): FileEntry => ({
    id: Date.now().toString() + Math.random(),
    name: file.name,
    size: `${(file.size / 1048576).toFixed(1)} MB`,
  });

  // ─── NÚT TIẾP TỤC / QUAY LẠI CỦA WIZARD ────────────────────────────────────
  const nextStep = () => {
    setError('');
    // Kiểm tra nhanh tính hợp lệ trước khi qua bước tiếp theo
    if (currentStep === 1) {
      // Xác minh sơ bộ các trường bắt buộc của Bước 1
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (role === 'farmer') {
        if (!farmerForm.unitName || !farmerForm.taxId || !farmerForm.repName || !farmerForm.phone || !farmerForm.email) {
          setError('Vui lòng điền đầy đủ các thông tin bắt buộc.');
          return;
        }
        if (!emailPattern.test(farmerForm.email)) {
          setError('Email không đúng định dạng.');
          return;
        }
      } else if (role === 'buyer') {
        if (!buyerForm.companyName || !buyerForm.taxId || !buyerForm.repName || !buyerForm.phone || !buyerForm.email) {
          setError('Vui lòng điền đầy đủ các thông tin bắt buộc.');
          return;
        }
        if (!emailPattern.test(buyerForm.email)) {
          setError('Email không đúng định dạng.');
          return;
        }
      } else {
        if (!carrierForm.companyName || !carrierForm.taxId || !carrierForm.repName || !carrierForm.phone) {
          setError('Vui lòng điền đầy đủ các thông tin bắt buộc.');
          return;
        }
      }
    }
    setCurrentStep((prev) => prev + 1);
  };

  const prevStep = () => {
    setError('');
    setCurrentStep((prev) => prev - 1);
  };

  // ─── GỬI FORM ĐĂNG KÝ LÊN BACKEND ─────────────────────────────────────────
  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreedTerms) {
      setError('Bạn phải đồng ý với cam kết chất lượng để tiếp tục.');
      return;
    }
    if (!hasSignature && sigMethod === 'usb') {
      setError('Vui lòng ký xác nhận trên khung chữ ký.');
      return;
    }

    setError('');
    setLoading(true);

    try {
      const { beRole } = roleMap[role];
      let body: Record<string, unknown> = { role: beRole };

      // Thu thập thông tin tương ứng từng vai trò
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
          farmArea:  farmerForm.totalAreaM2 ? Number(farmerForm.totalAreaM2) : null,
          farmAddress: farmerForm.farmAddress,
          certificate: farmerForm.certifications.join(', ') + (farmerForm.certFiles.length > 0 ? ' (Tệp đính kèm: ' + farmerForm.certFiles.map(f => f.name).join(', ') + ')' : ''),
          province:  farmerForm.farmAddress ? farmerForm.farmAddress.split(',').pop()?.trim() : '',
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
          taxCode:     buyerForm.taxId,
          businessType: buyerForm.businessSectors.join(', '),
          businessLicense: buyerForm.businessLicenseFiles.map(f => f.name).join(', ') + (buyerForm.financialReportFiles.length > 0 ? ' (Tệp tài chính: ' + buyerForm.financialReportFiles.map(f => f.name).join(', ') + ')' : ''),
          province:    buyerForm.address ? buyerForm.address.split(',').pop()?.trim() : '',
        };
      } else {
        body = {
          ...body,
          username:    carrierForm.username,
          password:    carrierForm.password,
          email:       `${carrierForm.username}@agriconnect-shipper.vn`, // Shipper mặc định tạo email ảo nếu thiếu
          phone:       carrierForm.phone,
          address:     carrierForm.address,
          fullName:    carrierForm.repName,
          vehicleType: 'Xe tải lạnh',
          licenseNumber: carrierForm.transportLicenseFiles.map(f => f.name).join(', '),
          province:    carrierForm.address ? carrierForm.address.split(',').pop()?.trim() : '',
        };
      }

      // Gửi yêu cầu đăng ký lên API Spring Boot
      const res = await fetch(`${API_BASE}/api/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        const textError = await res.text();
        throw new Error(textError || 'Lỗi trong quá trình đăng ký. Tài khoản hoặc email có thể đã được sử dụng.');
      }

      setRegisteredEmail((body.email as string) || '');
      setSubStep('verify'); // Chuyển sang màn hình xác thực OTP

    } catch (err) {
      setError(err instanceof Error ? err.message : 'Đã xảy ra lỗi hệ thống.');
    } finally {
      setLoading(false);
    }
  };

  // ─── LUỒNG XÁC THỰC MÃ OTP EMAIL ──────────────────────────────────────────
  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch(`${API_BASE}/api/auth/verify-email`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: registeredEmail, otpCode: otpCode }),
      });

      if (!res.ok) {
        throw new Error('Mã OTP không đúng hoặc đã hết hạn.');
      }

      setSubStep('success'); // Hiển thị màn hình thành công

    } catch (err) {
      setError(err instanceof Error ? err.message : 'Lỗi xác thực.');
    } finally {
      setLoading(false);
    }
  };

  // ─── ĐĂNG KÝ NHANH QUA GOOGLE (OAuth2) ────────────────────────────────────
  const handleGoogleRegister = () => {
    // Đăng ký qua OAuth2 Google cũng chuyển hướng về endpoint backend giống login.
    // Sau khi Google verify thành công, hệ thống sẽ thực hiện luồng onboarding để gán vai trò.
    window.location.href = `${API_BASE}/oauth2/authorization/google`;
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#f7fbf0] via-[#eef6e1] to-[#e4f1d2] flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background blobs */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-[#d1e8b2] rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob"></div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#c4e39c] rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-2000"></div>

      <div className="w-full max-w-[1100px] bg-white/95 backdrop-blur-xl border border-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.06)] overflow-hidden flex flex-col relative z-10">
        
        {/* Header tiến trình đăng ký (Progress Bar) */}
        {subStep === 'form' && (
          <div className="bg-[#f0f5e8] border-b border-[#e0e4d9] px-8 py-5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Sprout className="w-6 h-6 text-[#176a22]" />
              <span className="font-bold text-[#181d16] text-lg">Đăng Ký Thành Viên Hệ Sinh Thái</span>
            </div>
            
            {/* Thanh tiến trình 3 bước */}
            <div className="flex items-center gap-4 text-xs font-semibold">
              <div className={`flex items-center gap-1.5 ${currentStep >= 1 ? 'text-[#176a22]' : 'text-[#707a6c]'}`}>
                <span className={`w-5 h-5 rounded-full flex items-center justify-center ${currentStep >= 1 ? 'bg-[#176a22] text-white' : 'bg-[#e0e4d9]'}`}>1</span>
                <span>Cơ bản & Xác thực</span>
              </div>
              <div className="w-8 h-px bg-[#bfcaba]"></div>
              <div className={`flex items-center gap-1.5 ${currentStep >= 2 ? 'text-[#176a22]' : 'text-[#707a6c]'}`}>
                <span className={`w-5 h-5 rounded-full flex items-center justify-center ${currentStep >= 2 ? 'bg-[#176a22] text-white' : 'bg-[#e0e4d9]'}`}>2</span>
                <span>Hồ sơ năng lực</span>
              </div>
              <div className="w-8 h-px bg-[#bfcaba]"></div>
              <div className={`flex items-center gap-1.5 ${currentStep >= 3 ? 'text-[#176a22]' : 'text-[#707a6c]'}`}>
                <span className={`w-5 h-5 rounded-full flex items-center justify-center ${currentStep >= 3 ? 'bg-[#176a22] text-white' : 'bg-[#e0e4d9]'}`}>3</span>
                <span>Cam kết & Ký</span>
              </div>
            </div>
          </div>
        )}

        <div className="flex flex-col md:flex-row min-h-[500px]">
          
          {/* PHẦN CHÍNH - NHẬP FORM HOẶC LUỒNG OTP */}
          <div className="w-full md:w-[65%] p-8 flex flex-col justify-between">
            
            {/* 1. Màn hình xác thực OTP qua Email */}
            {subStep === 'verify' ? (
              <div className="py-8 text-center space-y-5 max-w-md mx-auto my-auto animate-in fade-in duration-300">
                <div className="w-16 h-16 rounded-full bg-emerald-100 border border-emerald-300 text-[#176a22] flex items-center justify-center mx-auto shadow-xs">
                  <Mail className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-[#181d16]">Xác Thực Email Của Bạn</h3>
                <p className="text-sm text-[#40493d] leading-relaxed">
                  Vui lòng nhập mã OTP 6 số đã được gửi đến địa chỉ email:
                  <br/><strong className="text-[#176a22]">{registeredEmail}</strong>
                </p>
                <form onSubmit={handleVerifyOtp} className="space-y-4 pt-2">
                  {error && <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl">{error}</div>}
                  <input
                    type="text"
                    maxLength={6}
                    placeholder="123456"
                    value={otpCode}
                    onChange={(e) => setOtpCode(e.target.value)}
                    className="w-full px-4 py-3 text-center text-xl tracking-[0.5em] font-bold bg-white border border-[#bfcaba] rounded-xl focus:ring-2 focus:ring-[#176a22] outline-none"
                    required
                  />
                  <button
                    type="submit"
                    disabled={loading || otpCode.length < 6}
                    className="w-full py-3.5 bg-[#176a22] hover:bg-[#12531a] text-white font-bold text-sm rounded-xl flex items-center justify-center gap-2 disabled:opacity-70 transition-all cursor-pointer shadow-md"
                  >
                    {loading ? <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" /> : 'Xác Thực Ngay'}
                  </button>
                </form>
              </div>

            // 2. Màn hình thông báo Đăng ký thành công
            ) : subStep === 'success' ? (
              <div className="py-8 text-center space-y-4 max-w-md mx-auto my-auto animate-in fade-in duration-300">
                <div className="w-16 h-16 rounded-full bg-emerald-100 border border-emerald-300 text-[#176a22] flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-bold text-[#181d16]">Đăng Ký Thành Công!</h3>
                <p className="text-sm text-[#40493d] leading-relaxed">
                  Tài khoản của bạn đã được xác thực thành công. Bạn hiện tại đã có thể đăng nhập vào hệ thống bằng tài khoản vừa tạo.
                </p>
                <Link
                  href="/auth/login"
                  className="inline-block px-8 py-3 bg-[#176a22] hover:bg-[#12531a] text-white text-sm font-bold rounded-xl shadow-md transition-all mt-4"
                >
                  Đi Đến Trang Đăng Nhập
                </Link>
              </div>

            // 3. Form chính (Wizard)
            ) : (
              <form onSubmit={handleRegisterSubmit} className="space-y-6">
                
                {/* HIỂN THỊ LỖI NẾU CÓ */}
                {error && (
                  <div className="p-3.5 bg-red-50 border border-red-200 text-red-800 text-xs rounded-xl">
                    {error}
                  </div>
                )}

                {/* ─── BƯỚC 1: THÔNG TIN CƠ BẢN ─── */}
                {currentStep === 1 && (
                  <div className="space-y-5 animate-in fade-in duration-200">
                    <div>
                      <label className="block text-xs font-bold text-[#40493d] mb-2">Chọn vai trò đăng ký:</label>
                      <div className="grid grid-cols-3 gap-3">
                        {([
                          ['farmer', <Tractor key="t" className="w-4 h-4" />, 'Nhà Vườn / HTX'],
                          ['buyer', <Building2 key="b" className="w-4 h-4" />, 'Doanh Nghiệp B2B'],
                          ['carrier', <Truck key="tr" className="w-4 h-4" />, 'Đơn vị Vận Tải'],
                        ] as [LocalRole, React.ReactNode, string][]).map(([r, icon, lbl]) => (
                          <button
                            key={r}
                            type="button"
                            onClick={() => setRole(r)}
                            className={`p-3 rounded-2xl border text-xs font-semibold flex flex-col items-center gap-2 transition-all cursor-pointer ${
                              role === r
                                ? 'bg-[#176a22] text-white border-[#176a22] shadow-sm'
                                : 'bg-white text-[#40493d] border-[#bfcaba] hover:border-[#176a22]'
                            }`}
                          >
                            {icon}
                            <span>{lbl}</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-3.5">
                      <h3 className="text-sm font-bold text-[#181d16] border-b border-[#e0e4d9] pb-1.5 flex items-center gap-2">
                        <User className="w-4 h-4 text-[#176a22]" /> Thông tin liên hệ cơ bản
                      </h3>
                      
                      <div className="grid grid-cols-2 gap-3.5">
                        <div>
                          <label className="block text-[#40493d] font-bold mb-1 text-[11px]">Tên đơn vị / doanh nghiệp *</label>
                          <input
                            type="text"
                            required
                            placeholder={role === 'farmer' ? 'HTX Nông Nghiệp...' : role === 'buyer' ? 'Công ty TNHH...' : 'Công ty Logistics...'}
                            value={role === 'farmer' ? farmerForm.unitName : role === 'buyer' ? buyerForm.companyName : carrierForm.companyName}
                            onChange={(e) => {
                              if (role === 'farmer') setFarmerForm({ ...farmerForm, unitName: e.target.value });
                              else if (role === 'buyer') setBuyerForm({ ...buyerForm, companyName: e.target.value });
                              else setCarrierForm({ ...carrierForm, companyName: e.target.value });
                            }}
                            className="w-full px-3.5 py-2.5 bg-white border border-[#bfcaba] rounded-xl text-sm focus:ring-2 focus:ring-[#176a22]/20 focus:border-[#176a22] outline-none"
                          />
                        </div>
                        <div>
                          <label className="block text-[#40493d] font-bold mb-1 text-[11px]">Mã số thuế / CCCD *</label>
                          <input
                            type="text"
                            required
                            placeholder="0123456789"
                            value={role === 'farmer' ? farmerForm.taxId : role === 'buyer' ? buyerForm.taxId : carrierForm.taxId}
                            onChange={(e) => {
                              if (role === 'farmer') setFarmerForm({ ...farmerForm, taxId: e.target.value });
                              else if (role === 'buyer') setBuyerForm({ ...buyerForm, taxId: e.target.value });
                              else setCarrierForm({ ...carrierForm, taxId: e.target.value });
                            }}
                            className="w-full px-3.5 py-2.5 bg-white border border-[#bfcaba] rounded-xl text-sm focus:ring-2 focus:ring-[#176a22]/20 focus:border-[#176a22] outline-none"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-3.5">
                        <div>
                          <label className="block text-[#40493d] font-bold mb-1 text-[11px]">Người đại diện pháp luật *</label>
                          <input
                            type="text"
                            required
                            placeholder="Nguyễn Văn A"
                            value={role === 'farmer' ? farmerForm.repName : role === 'buyer' ? buyerForm.repName : carrierForm.repName}
                            onChange={(e) => {
                              if (role === 'farmer') setFarmerForm({ ...farmerForm, repName: e.target.value });
                              else if (role === 'buyer') setBuyerForm({ ...buyerForm, repName: e.target.value });
                              else setCarrierForm({ ...carrierForm, repName: e.target.value });
                            }}
                            className="w-full px-3.5 py-2.5 bg-white border border-[#bfcaba] rounded-xl text-sm focus:ring-2 focus:ring-[#176a22]/20 focus:border-[#176a22] outline-none"
                          />
                        </div>
                        <div>
                          <label className="block text-[#40493d] font-bold mb-1 text-[11px]">Số điện thoại liên hệ *</label>
                          <input
                            type="tel"
                            required
                            placeholder="0901234567"
                            value={role === 'farmer' ? farmerForm.phone : role === 'buyer' ? buyerForm.phone : carrierForm.phone}
                            onChange={(e) => {
                              if (role === 'farmer') setFarmerForm({ ...farmerForm, phone: e.target.value });
                              else if (role === 'buyer') setBuyerForm({ ...buyerForm, phone: e.target.value });
                              else setCarrierForm({ ...carrierForm, phone: e.target.value });
                            }}
                            className="w-full px-3.5 py-2.5 bg-white border border-[#bfcaba] rounded-xl text-sm focus:ring-2 focus:ring-[#176a22]/20 focus:border-[#176a22] outline-none"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-[#40493d] font-bold mb-1 text-[11px]">Địa chỉ trụ sở / Trang trại *</label>
                        <input
                          type="text"
                          required
                          placeholder="Số nhà, Đường, Phường/Xã, Quận/Huyện, Tỉnh/Thành phố"
                          value={role === 'farmer' ? farmerForm.farmAddress : role === 'buyer' ? buyerForm.address : carrierForm.address}
                          onChange={(e) => {
                            if (role === 'farmer') setFarmerForm({ ...farmerForm, farmAddress: e.target.value });
                            else if (role === 'buyer') setBuyerForm({ ...buyerForm, address: e.target.value });
                            else setCarrierForm({ ...carrierForm, address: e.target.value });
                          }}
                          className="w-full px-3.5 py-2.5 bg-white border border-[#bfcaba] rounded-xl text-sm focus:ring-2 focus:ring-[#176a22]/20 focus:border-[#176a22] outline-none"
                        />
                      </div>

                      {role !== 'carrier' && (
                        <div>
                          <label className="block text-[#40493d] font-bold mb-1 text-[11px]">Email liên hệ *</label>
                          <input
                            type="email"
                            required
                            placeholder="doanhnghiep@domain.vn"
                            value={role === 'farmer' ? farmerForm.email : buyerForm.email}
                            onChange={(e) => {
                              if (role === 'farmer') setFarmerForm({ ...farmerForm, email: e.target.value });
                              else setBuyerForm({ ...buyerForm, email: e.target.value });
                            }}
                            className="w-full px-3.5 py-2.5 bg-white border border-[#bfcaba] rounded-xl text-sm focus:ring-2 focus:ring-[#176a22]/20 focus:border-[#176a22] outline-none"
                          />
                        </div>
                      )}
                    </div>

                    <div className="flex justify-end pt-4">
                      <button
                        type="button"
                        onClick={nextStep}
                        className="py-3 px-6 bg-[#176a22] hover:bg-[#12531a] text-white font-bold rounded-xl text-xs flex items-center gap-1.5 transition-all shadow-md"
                      >
                        <span>Tiếp tục bước 2</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}

                {/* ─── BƯỚC 2: HỒ SƠ NĂNG LỰC SẢN XUẤT ─── */}
                {currentStep === 2 && (
                  <div className="space-y-5 animate-in fade-in duration-200">
                    
                    {/* HỒ SƠ CHO FARMER */}
                    {role === 'farmer' && (
                      <div className="space-y-4">
                        <h3 className="text-sm font-bold text-[#181d16] border-b border-[#e0e4d9] pb-1.5 flex items-center gap-2">
                          <Scale className="w-4 h-4 text-[#176a22]" /> Hồ sơ năng lực sản xuất
                        </h3>

                        <div className="grid grid-cols-2 gap-3.5">
                          <div>
                            <label className="block text-[#40493d] font-bold mb-1 text-[11px]">Tổng diện tích canh tác (m²)</label>
                            <input
                              type="number"
                              placeholder="Ví dụ: 5000"
                              value={farmerForm.totalAreaM2}
                              onChange={(e) => setFarmerForm({ ...farmerForm, totalAreaM2: e.target.value })}
                              className="w-full px-3.5 py-2.5 bg-white border border-[#bfcaba] rounded-xl text-sm focus:ring-2 focus:ring-[#176a22]/20 focus:border-[#176a22] outline-none"
                            />
                          </div>
                          <div>
                            <label className="block text-[#40493d] font-bold mb-1 text-[11px]">Sản lượng dự kiến hàng năm (Tấn)</label>
                            <input
                              type="number"
                              placeholder="Ví dụ: 120"
                              value={farmerForm.annualVolumeTons}
                              onChange={(e) => setFarmerForm({ ...farmerForm, annualVolumeTons: e.target.value })}
                              className="w-full px-3.5 py-2.5 bg-white border border-[#bfcaba] rounded-xl text-sm focus:ring-2 focus:ring-[#176a22]/20 focus:border-[#176a22] outline-none"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-[#40493d] font-bold mb-1 text-[11px]">Danh mục sản phẩm chủ lực</label>
                          <input
                            type="text"
                            placeholder="Rau ăn lá, Thanh Long, Sầu Riêng..."
                            value={farmerForm.mainCropList}
                            onChange={(e) => setFarmerForm({ ...farmerForm, mainCropList: e.target.value })}
                            className="w-full px-3.5 py-2.5 bg-white border border-[#bfcaba] rounded-xl text-sm focus:ring-2 focus:ring-[#176a22]/20 focus:border-[#176a22] outline-none"
                          />
                        </div>

                        <div>
                          <p className="block text-[#40493d] font-bold mb-2 text-[11px]">Chứng nhận tiêu chuẩn đã đạt được</p>
                          <div className="flex flex-wrap gap-2 mb-3">
                            {['VietGAP', 'GlobalGAP', 'Hữu cơ (Organic)', 'Mã Số Vùng Trồng'].map((cert) => {
                              const active = farmerForm.certifications.includes(cert);
                              return (
                                <button
                                  key={cert}
                                  type="button"
                                  onClick={() => setFarmerForm((p) => ({
                                    ...p,
                                    certifications: active ? p.certifications.filter((c) => c !== cert) : [...p.certifications, cert],
                                  }))}
                                  className={`px-3 py-1.5 rounded-xl border text-xs font-semibold flex items-center gap-1 transition-all ${
                                    active ? 'bg-[#176a22] text-white border-[#176a22]' : 'bg-white text-[#40493d] border-[#bfcaba]'
                                  }`}
                                >
                                  <span>{cert}</span>
                                  {active && <Check className="w-3 h-3" />}
                                </button>
                              );
                            })}
                          </div>
                        </div>

                        <div className="mt-3">
                          <label className="block text-[#40493d] font-bold mb-1.5 text-[11px]">Đính kèm tệp chứng nhận (VietGAP, GlobalGAP, ...)</label>
                          <UploadBox
                            label="Tải lên tệp chứng nhận (PDF, JPG, PNG)"
                            accept=".pdf,.jpg,.jpeg,.png"
                            onUpload={(f) => setFarmerForm((p) => ({ ...p, certFiles: [...p.certFiles, makeFileEntry(f)] }))}
                          />
                          <FileList
                            files={farmerForm.certFiles}
                            onRemove={(id) => setFarmerForm((p) => ({ ...p, certFiles: p.certFiles.filter(f => f.id !== id) }))}
                          />
                        </div>
                      </div>
                    )}

                    {/* HỒ SƠ CHO BUYER */}
                    {role === 'buyer' && (
                      <div className="space-y-4">
                        <h3 className="text-sm font-bold text-[#181d16] border-b border-[#e0e4d9] pb-1.5 flex items-center gap-2">
                          <Award className="w-4 h-4 text-[#176a22]" /> Hồ sơ năng lực doanh nghiệp
                        </h3>

                        <div>
                          <p className="block text-[#40493d] font-bold mb-2 text-[11px]">Lĩnh vực thu mua chủ lực</p>
                          <div className="flex flex-wrap gap-2">
                            {['Xuất khẩu nông sản', 'Siêu thị & Bán lẻ', 'Nhà máy chế biến', 'Phân phối sỉ'].map((sector) => {
                              const active = buyerForm.businessSectors.includes(sector);
                              return (
                                <button
                                  key={sector}
                                  type="button"
                                  onClick={() => setBuyerForm((p) => ({
                                    ...p,
                                    businessSectors: active ? p.businessSectors.filter((s) => s !== sector) : [...p.businessSectors, sector],
                                  }))}
                                  className={`px-3 py-1.5 rounded-xl border text-xs font-semibold flex items-center gap-1 transition-all ${
                                    active ? 'bg-[#176a22] text-white border-[#176a22]' : 'bg-white text-[#40493d] border-[#bfcaba]'
                                  }`}
                                >
                                  <span>{sector}</span>
                                  {active && <Check className="w-3 h-3" />}
                                </button>
                              );
                            })}
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-3.5">
                          <div>
                            <label className="block text-[#40493d] font-bold mb-1.5 text-[11px]">Giấy phép kinh doanh (GPKD) *</label>
                            <UploadBox
                              label="Tải lên GPKD (PDF, JPG, PNG)"
                              accept=".pdf,.jpg,.jpeg,.png"
                              onUpload={(f) => setBuyerForm((p) => ({ ...p, businessLicenseFiles: [...p.businessLicenseFiles, makeFileEntry(f)] }))}
                            />
                            <FileList
                              files={buyerForm.businessLicenseFiles}
                              onRemove={(id) => setBuyerForm((p) => ({ ...p, businessLicenseFiles: p.businessLicenseFiles.filter(f => f.id !== id) }))}
                            />
                          </div>
                          <div>
                            <label className="block text-[#40493d] font-bold mb-1.5 text-[11px]">Báo cáo tài chính / Hồ sơ năng lực</label>
                            <UploadBox
                              label="Tải lên Báo cáo (PDF, JPG)"
                              accept=".pdf,.jpg,.jpeg,.png"
                              onUpload={(f) => setBuyerForm((p) => ({ ...p, financialReportFiles: [...p.financialReportFiles, makeFileEntry(f)] }))}
                            />
                            <FileList
                              files={buyerForm.financialReportFiles}
                              onRemove={(id) => setBuyerForm((p) => ({ ...p, financialReportFiles: p.financialReportFiles.filter(f => f.id !== id) }))}
                            />
                          </div>
                        </div>

                        <div className="bg-[#f0f5e8] border border-[#c8d8be] rounded-2xl p-4 text-xs space-y-2">
                          <p className="font-bold text-[#176a22]">Thông tin hỗ trợ B2B:</p>
                          <ul className="list-disc pl-4 space-y-1 text-[#40493d]">
                            <li>Hạn mức công nợ dự kiến: 2 tỷ VNĐ</li>
                            <li>Thời hạn thanh toán: T+30 ngày</li>
                          </ul>
                        </div>
                      </div>
                    )}

                    {/* HỒ SƠ CHO CARRIER */}
                    {role === 'carrier' && (
                      <div className="space-y-4">
                        <h3 className="text-sm font-bold text-[#181d16] border-b border-[#e0e4d9] pb-1.5 flex items-center gap-2">
                          <Truck className="w-4 h-4 text-[#176a22]" /> Năng lực đội xe & thiết bị vận tải
                        </h3>

                        <div className="grid grid-cols-2 gap-3.5">
                          <div>
                            <label className="block text-[#40493d] font-bold mb-1 text-[11px]">Loại phương tiện chính *</label>
                            <input
                              type="text"
                              required
                              placeholder="Xe tải lạnh 5 tấn, Container..."
                              value={carrierForm.vehicleType}
                              onChange={(e) => setCarrierForm({ ...carrierForm, vehicleType: e.target.value })}
                              className="w-full px-3.5 py-2.5 bg-white border border-[#bfcaba] rounded-xl text-sm focus:ring-2 focus:ring-[#176a22]/20 focus:border-[#176a22] outline-none"
                            />
                          </div>
                          <div>
                            <label className="block text-[#40493d] font-bold mb-1 text-[11px]">Số lượng phương tiện lạnh sở hữu</label>
                            <input
                              type="number"
                              min={0}
                              value={carrierForm.fleetRefrigeratedTrucks}
                              onChange={(e) => setCarrierForm({ ...carrierForm, fleetRefrigeratedTrucks: Number(e.target.value) })}
                              className="w-full px-3.5 py-2.5 bg-white border border-[#bfcaba] rounded-xl text-sm focus:ring-2 focus:ring-[#176a22]/20 focus:border-[#176a22] outline-none"
                            />
                          </div>
                        </div>

                        <label className="flex items-center gap-2.5 cursor-pointer pt-2">
                          <input
                            type="checkbox"
                            checked={carrierForm.hasColdChainCert}
                            onChange={(e) => setCarrierForm({ ...carrierForm, hasColdChainCert: e.target.checked })}
                            className="rounded accent-[#176a22] w-4 h-4"
                          />
                          <span className="text-xs font-bold text-[#181d16]">Sở hữu hệ thống vận tải chuỗi lạnh đạt chuẩn ISO 22000 (Cold-chain)</span>
                        </label>

                        <div className="mt-3">
                          <label className="block text-[#40493d] font-bold mb-1.5 text-[11px]">Giấy phép kinh doanh vận tải lạnh *</label>
                          <UploadBox
                            label="Tải lên Giấy phép vận tải (PDF, JPG)"
                            accept=".pdf,.jpg,.jpeg,.png"
                            onUpload={(f) => setCarrierForm((p) => ({ ...p, transportLicenseFiles: [...p.transportLicenseFiles, makeFileEntry(f)] }))}
                          />
                          <FileList
                            files={carrierForm.transportLicenseFiles}
                            onRemove={(id) => setCarrierForm((p) => ({ ...p, transportLicenseFiles: p.transportLicenseFiles.filter(f => f.id !== id) }))}
                          />
                        </div>
                      </div>
                    )}

                    {/* MỤC THÔNG TIN TÀI KHOẢN TRUY CẬP */}
                    <div className="space-y-3.5 pt-4 border-t border-[#e0e4d9]">
                      <h4 className="text-xs font-bold text-[#181d16]">Tạo tài khoản truy cập hệ thống</h4>
                      <div className="grid grid-cols-2 gap-3.5">
                        <div>
                          <label className="block text-[#40493d] font-bold mb-1 text-[11px]">Tên đăng nhập *</label>
                          <input
                            type="text"
                            required
                            placeholder="username"
                            value={role === 'farmer' ? farmerForm.username : role === 'buyer' ? buyerForm.username : carrierForm.username}
                            onChange={(e) => {
                              if (role === 'farmer') setFarmerForm({ ...farmerForm, username: e.target.value });
                              else if (role === 'buyer') setBuyerForm({ ...buyerForm, username: e.target.value });
                              else setCarrierForm({ ...carrierForm, username: e.target.value });
                            }}
                            className="w-full px-3.5 py-2.5 bg-white border border-[#bfcaba] rounded-xl text-sm focus:ring-2 focus:ring-[#176a22]/20 focus:border-[#176a22] outline-none"
                          />
                        </div>
                        <div>
                          <label className="block text-[#40493d] font-bold mb-1 text-[11px]">Mật khẩu *</label>
                          <input
                            type="password"
                            required
                            placeholder="Tối thiểu 6 ký tự"
                            value={role === 'farmer' ? farmerForm.password : role === 'buyer' ? buyerForm.password : carrierForm.password}
                            onChange={(e) => {
                              if (role === 'farmer') setFarmerForm({ ...farmerForm, password: e.target.value });
                              else if (role === 'buyer') setBuyerForm({ ...buyerForm, password: e.target.value });
                              else setCarrierForm({ ...carrierForm, password: e.target.value });
                            }}
                            className="w-full px-3.5 py-2.5 bg-white border border-[#bfcaba] rounded-xl text-sm focus:ring-2 focus:ring-[#176a22]/20 focus:border-[#176a22] outline-none"
                          />
                        </div>
                      </div>
                    </div>

                    {/* ĐIỀU HƯỚNG BƯỚC WIZARD */}
                    <div className="flex justify-between pt-4 border-t border-[#e0e4d9]/60">
                      <button
                        type="button"
                        onClick={prevStep}
                        className="py-3 px-6 border border-[#bfcaba] hover:bg-[#f7fbf0] text-[#40493d] font-bold rounded-xl text-xs transition-all"
                      >
                        Quay lại bước 1
                      </button>
                      <button
                        type="button"
                        onClick={nextStep}
                        className="py-3 px-6 bg-[#176a22] hover:bg-[#12531a] text-white font-bold rounded-xl text-xs flex items-center gap-1.5 transition-all shadow-md"
                      >
                        <span>Tiếp tục bước 3</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}

                {/* ─── BƯỚC 3: KÝ CAM KẾT VÀ HOÀN TẤT HỒ SƠ ─── */}
                {currentStep === 3 && (
                  <div className="space-y-5 animate-in fade-in duration-200">
                    <h3 className="text-sm font-bold text-[#181d16] border-b border-[#e0e4d9] pb-1.5">
                      Ký cam kết chất lượng &amp; Chữ ký số điện tử
                    </h3>

                    {/* Nội dung điều khoản cam kết dựa theo vai trò */}
                    <div className="bg-[#f0f5e8]/80 border border-[#c8d8be] rounded-2xl p-4 text-xs text-[#3a4437] space-y-2.5">
                      <p className="font-bold text-[#176a22]">ĐIỀU KHOẢN CAM KẾT CHẤT LƯỢNG NÔNG SẢN:</p>
                      {role === 'farmer' && (
                        <ol className="list-decimal pl-4 space-y-1.5">
                          <li>Cam kết tất cả nông sản đưa lên hệ thống tuân thủ nghiêm ngặt quy định an toàn thực phẩm.</li>
                          <li>Không sử dụng hóa chất và thuốc bảo vệ thực vật ngoài danh mục cấp phép của Bộ Nông Nghiệp.</li>
                          <li>Sẵn sàng cung cấp mã QR và chứng nhận truy xuất nguồn gốc khi có yêu cầu.</li>
                        </ol>
                      )}
                      {role === 'buyer' && (
                        <ol className="list-decimal pl-4 space-y-1.5">
                          <li>Cam kết thanh toán đúng hạn cho nông hộ và đối tác vận tải theo hợp đồng B2B.</li>
                          <li>Bảo mật thông tin giá cả, nguồn cung nông sản nội bộ của hệ thống.</li>
                          <li>Tuân thủ các điều kiện bốc dỡ hàng và kho bãi tiêu chuẩn.</li>
                        </ol>
                      )}
                      {role === 'carrier' && (
                        <ol className="list-decimal pl-4 space-y-1.5">
                          <li>Cam kết giữ vững dải nhiệt độ lạnh được thiết lập suốt hành trình vận chuyển (chuỗi cung ứng lạnh).</li>
                          <li>Đảm bảo giao nhận nông sản đúng thời gian cam kết trên hệ thống.</li>
                          <li>Cung cấp đầy đủ báo cáo hành trình qua định vị GPS của hệ thống.</li>
                        </ol>
                      )}
                    </div>

                    {/* Checkbox Đồng ý */}
                    <label className="flex items-start gap-2.5 cursor-pointer select-none">
                      <input
                        type="checkbox"
                        checked={agreedTerms}
                        onChange={(e) => setAgreedTerms(e.target.checked)}
                        className="mt-0.5 rounded accent-[#176a22] w-4 h-4 shrink-0"
                      />
                      <span className="text-xs font-bold text-[#181d16]">
                        Tôi đã đọc kỹ và hoàn toàn đồng ý với tất cả điều khoản cam kết nêu trên.
                      </span>
                    </label>

                    {/* Phương thức ký số */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                      <div className="space-y-2">
                        <label className="block text-xs font-bold text-[#40493d]">Phương thức ký điện tử</label>
                        <div className="grid grid-cols-2 gap-2">
                          {(['usb', 'otp'] as const).map((m) => (
                            <button
                              key={m}
                              type="button"
                              onClick={() => setSigMethod(m)}
                              className={`p-3 rounded-2xl border flex items-center justify-center gap-2 font-bold text-xs transition-all cursor-pointer ${
                                sigMethod === m
                                  ? 'bg-[#eef5e6] border-[#176a22] text-[#176a22]'
                                  : 'bg-white border-[#bfcaba] text-[#40493d]'
                              }`}
                            >
                              {m === 'usb' ? <Key className="w-4 h-4" /> : <Smartphone className="w-4 h-4" />}
                              <span>{m === 'usb' ? 'Chữ ký vẽ' : 'Smart OTP'}</span>
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Khung chữ ký vẽ Canvas */}
                      {sigMethod === 'usb' ? (
                        <div className="bg-[#f0f5e8]/70 border border-[#c8d8be] rounded-2xl p-3 space-y-2 animate-in fade-in duration-300">
                          <div className="relative bg-white border border-[#bfcaba] rounded-xl h-24 overflow-hidden">
                            <canvas
                              ref={canvasRef}
                              width={300}
                              height={96}
                              className="w-full h-full cursor-crosshair touch-none"
                              onMouseDown={startDrawing}
                              onMouseMove={draw}
                              onMouseUp={stopDrawing}
                              onMouseLeave={stopDrawing}
                              onTouchStart={startDrawing}
                              onTouchMove={draw}
                              onTouchEnd={stopDrawing}
                            />
                            {!hasSignature && (
                              <span className="absolute inset-0 flex items-center justify-center text-xs text-[#808c7c] pointer-events-none">
                                Vẽ chữ ký của bạn tại đây
                              </span>
                            )}
                          </div>
                          <button
                            type="button"
                            onClick={clearSignature}
                            className="w-full py-1.5 bg-white hover:bg-emerald-50 border border-[#bfcaba] rounded-lg text-xs font-bold text-[#40493d] transition-colors"
                          >
                            Xóa chữ ký vẽ lại
                          </button>
                        </div>
                      ) : (
                        <div className="bg-[#f0f5e8]/70 border border-[#c8d8be] rounded-2xl p-4 text-xs flex items-center text-[#40493d] animate-in fade-in duration-300">
                          <p>Mã Smart OTP ký số sẽ tự động được gửi qua tin nhắn điện thoại SMS khi hoàn tất bước này.</p>
                        </div>
                      )}
                    </div>

                    {/* ĐIỀU HƯỚNG WIZARD HỒ SƠ */}
                    <div className="flex justify-between pt-4 border-t border-[#e0e4d9]/60">
                      <button
                        type="button"
                        onClick={prevStep}
                        className="py-3 px-6 border border-[#bfcaba] hover:bg-[#f7fbf0] text-[#40493d] font-bold rounded-xl text-xs transition-all"
                      >
                        Quay lại bước 2
                      </button>
                      
                      <button
                        type="submit"
                        disabled={loading || !agreedTerms}
                        className="py-3 px-6 bg-[#176a22] hover:bg-[#12531a] disabled:opacity-60 text-white font-bold rounded-xl text-xs flex items-center gap-1.5 transition-all shadow-md"
                      >
                        {loading ? (
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        ) : (
                          <>
                            <span>Gửi hồ sơ đăng ký</span>
                            <ArrowRight className="w-4 h-4" />
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                )}
              </form>
            )}
          </div>

          {/* CỘT PHẢI - Google OAuth2 Đăng ký & Giới thiệu tính năng */}
          <div className="w-full md:w-[35%] bg-[#176a22] p-10 text-white flex flex-col justify-center relative overflow-hidden">
            <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '24px 24px' }}></div>
            
            <div className="relative z-10 space-y-6 text-center">
              <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center backdrop-blur-md mx-auto mb-4">
                <Sprout className="w-7 h-7 text-white" />
              </div>
              
              <h3 className="text-xl font-bold">Đăng ký nhanh chóng</h3>
              <p className="text-white/80 leading-relaxed text-xs">
                Nếu bạn muốn khởi tạo tài khoản nhanh qua Google, hãy bấm nút đăng ký Google dưới đây. 
                <br/>
                <span className="text-[#a4d775] font-semibold mt-1 block">Hệ thống sẽ dẫn bạn đến bước bổ sung thông tin hồ sơ (Onboarding) ngay sau đó.</span>
              </p>

              <button
                onClick={handleGoogleRegister}
                className="w-full flex items-center justify-center px-4 py-3.5 bg-white rounded-xl text-[#181d16] font-bold text-sm hover:bg-[#f7fbf0] transition-all transform active:scale-95 duration-200 shadow-md"
              >
                <GoogleIcon />
                <span>Đăng ký với Google</span>
              </button>

              <div className="mt-8 text-xs text-white/70">
                Đã có tài khoản thành viên?{' '}
                <Link href="/auth/login" className="text-white font-bold hover:underline">
                  Đăng nhập tại đây
                </Link>
              </div>
            </div>
          </div>

        </div>

      </div>
    </main>
  );
}
