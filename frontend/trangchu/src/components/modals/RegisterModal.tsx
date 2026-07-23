import React, { useState, useEffect, useRef } from 'react';
import {
  X, Mail, Lock, Check, ArrowRight, ArrowLeft, Upload, FileText,
  Key, Sparkles, Building2, Truck, Tractor, ShieldCheck, Briefcase,
  CheckCircle2, ShieldAlert, CloudUpload, FileCheck, Snowflake, Package,
  Verified, LifeBuoy, Trash2
} from 'lucide-react';

// ─── Types ────────────────────────────────────────────────────────────────────
type AuthTab = 'login' | 'register';
type BusinessRole = 'supplier' | 'buyer' | 'logistics';
type RegisterStep = 'role-select' | 'details';

interface UserProfile {
  id: string;
  name: string;
  companyName: string;
  email: string;
  phone: string;
  taxId: string;
  role: BusinessRole;
  verified: boolean;
  province: string;
  hasDigitalSignature?: boolean;
}

// ─── Props ────────────────────────────────────────────────────────────────────
interface RegisterModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultRole?: 'farmer' | 'buyer' | 'carrier';
  initialTab?: 'login' | 'register';
}

// ─── ForgotPasswordModal ──────────────────────────────────────────────────────
const ForgotPasswordModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
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
            <p className="text-sm text-[#40493d] mb-6">Nhập email doanh nghiệp của bạn. Chúng tôi sẽ gửi liên kết tạo lại mật khẩu mới.</p>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#181d16] mb-1">Email đăng ký doanh nghiệp</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#707a6c]" />
                  <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@company.com"
                    className="w-full pl-9 pr-4 py-2.5 bg-[#f1f5ea] border border-[#d7dcd1] rounded-xl text-sm text-[#181d16] focus:outline-none focus:ring-2 focus:ring-[#176a22] focus:bg-white" />
                </div>
              </div>
              <button type="submit" disabled={loading}
                className="w-full py-3 px-4 bg-[#176a22] hover:bg-[#12551a] text-white font-semibold text-sm rounded-xl transition-all shadow-md flex justify-center items-center">
                {loading ? <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" /> : 'Gửi yêu cầu khôi phục'}
              </button>
            </form>
          </div>
        ) : (
          <div className="text-center py-4">
            <div className="w-12 h-12 rounded-full bg-emerald-100 text-[#176a22] flex items-center justify-center mx-auto mb-4">
              <Check className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-[#181d16] mb-2">Đã gửi hướng dẫn!</h3>
            <p className="text-sm text-[#40493d] mb-6">Chúng tôi đã gửi email khôi phục đến <strong className="text-[#181d16]">{email}</strong>.</p>
            <button onClick={onClose} className="w-full py-2.5 px-4 bg-[#176a22] text-white font-semibold text-sm rounded-xl hover:bg-[#12551a] transition-all">Đóng</button>
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
    if (!email || !email.includes('@')) { setError('Vui lòng nhập địa chỉ email hợp lệ.'); return; }
    if (!password || password.length < 6) { setError('Mật khẩu phải từ 6 ký tự trở lên.'); return; }
    setLoading(true);
    setTimeout(() => { setLoading(false); onLoginSuccess(email); }, 600);
  };

  return (
    <div className="w-full flex flex-col">
      {/* Tab Toggle */}
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
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="name@company.com" required
              className="w-full pl-10 pr-4 py-3 bg-[#f1f5ea] border border-[#d7dcd1] rounded-xl text-sm text-[#181d16] placeholder-[#818d7c] focus:outline-none focus:ring-2 focus:ring-[#176a22] focus:bg-white transition-all" />
          </div>
        </div>
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="block text-sm font-medium text-[#181d16]">Mật khẩu</label>
            <button type="button" onClick={onForgotPassword} className="text-xs font-semibold text-[#176a22] hover:underline">Quên mật khẩu?</button>
          </div>
          <div className="relative">
            <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-[#707a6c]" />
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="........" required
              className="w-full pl-10 pr-4 py-3 bg-[#f1f5ea] border border-[#d7dcd1] rounded-xl text-sm text-[#181d16] focus:outline-none focus:ring-2 focus:ring-[#176a22] focus:bg-white transition-all" />
          </div>
        </div>
        <div className="flex items-center space-x-2.5 pt-1">
          <input type="checkbox" id="remember-modal" checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)}
            className="w-4 h-4 rounded text-[#176a22] focus:ring-[#176a22] border-[#bfcaba]" />
          <label htmlFor="remember-modal" className="text-sm text-[#40493d] cursor-pointer">Ghi nhớ đăng nhập</label>
        </div>
        <button type="submit" disabled={loading}
          className="w-full py-3.5 px-4 bg-[#176a22] hover:bg-[#12551a] text-white font-semibold text-sm rounded-xl shadow-md transition-all flex items-center justify-center space-x-2 disabled:opacity-70">
          {loading ? <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" /> : <span>Đăng nhập</span>}
        </button>
      </form>

      {/* Divider */}
      <div className="relative my-5">
        <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-[#d7dcd1]" /></div>
        <div className="relative flex justify-center text-xs"><span className="bg-white px-3 text-[#707a6c] font-medium">Hoặc tiếp tục với</span></div>
      </div>

      {/* Social Buttons */}
      <div className="grid grid-cols-2 gap-3">
        <button type="button" onClick={() => onLoginSuccess('google.user@agri.com')}
          className="flex items-center justify-center space-x-2.5 py-2.5 px-4 border border-[#d7dcd1] bg-white rounded-xl text-sm font-medium text-[#181d16] hover:bg-[#f1f5ea] transition-colors">
          <svg className="w-4 h-4" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
          </svg>
          <span>Google</span>
        </button>
        <button type="button" onClick={() => onLoginSuccess('facebook.user@agri.com')}
          className="flex items-center justify-center space-x-2.5 py-2.5 px-4 border border-[#d7dcd1] bg-white rounded-xl text-sm font-medium text-[#181d16] hover:bg-[#f1f5ea] transition-colors">
          <svg className="w-4 h-4 text-[#1877F2]" fill="currentColor" viewBox="0 0 24 24">
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
          </svg>
          <span>Facebook</span>
        </button>
      </div>

      <div className="mt-6 text-center text-sm text-[#40493d]">
        Chưa có tài khoản?{' '}
        <button type="button" onClick={() => onSwitchTab('register')} className="font-bold text-[#176a22] hover:underline cursor-pointer">Đăng ký ngay</button>
      </div>
    </div>
  );
};

// ─── RegisterRoleSelect ───────────────────────────────────────────────────────
const RegisterRoleSelect: React.FC<{
  onSwitchTab: (tab: AuthTab) => void;
  onSelectRole: (role: BusinessRole) => void;
}> = ({ onSwitchTab, onSelectRole }) => {
  const [selectedRole, setSelectedRole] = useState<BusinessRole>('supplier');

  return (
    <div className="w-full flex flex-col">
      {/* Tab Toggle */}
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
        <h2 className="text-xl font-bold text-[#181d16] tracking-tight mb-1">Bắt đầu trải nghiệm của bạn</h2>
        <p className="text-sm text-[#40493d]">Chọn loại hình doanh nghiệp để tiếp tục đăng ký.</p>
      </div>

      <div className="space-y-3 mb-6">
        {[
          { role: 'supplier' as BusinessRole, icon: <Tractor className="w-6 h-6" />, label: 'Nhà cung cấp', desc: 'Cam kết chất lượng & Chữ ký số' },
          { role: 'buyer' as BusinessRole, icon: <Briefcase className="w-6 h-6" />, label: 'Đối tác mua hàng', desc: 'Xác minh thông tin doanh nghiệp' },
          { role: 'logistics' as BusinessRole, icon: <Truck className="w-6 h-6" />, label: 'Đơn vị vận chuyển', desc: 'Hợp đồng đăng ký vận tải' },
        ].map(({ role, icon, label, desc }) => (
          <div key={role} onClick={() => setSelectedRole(role)}
            className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex items-center space-x-4 ${selectedRole === role ? 'bg-[#d8f5d0] border-[#176a22] shadow-sm' : 'bg-[#f1f5ea] border-transparent hover:border-[#bfcaba]'}`}>
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors ${selectedRole === role ? 'bg-[#176a22] text-white' : 'bg-[#38873b] text-white'}`}>
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

// ─── RegisterFormDetails ──────────────────────────────────────────────────────
const RegisterFormDetails: React.FC<{
  role: BusinessRole;
  onBack: () => void;
  onRegisterSuccess: (user: UserProfile) => void;
  onSwitchTab: (tab: AuthTab) => void;
}> = ({ role, onBack, onRegisterSuccess, onSwitchTab }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [isSigned, setIsSigned] = useState(false);

  // Logistics state
  const [logisticsForm, setLogisticsForm] = useState({
    companyName: 'Công ty TNHH Vận tải Toàn Cầu Agri', taxId: '0101234567',
    representative: 'Nguyễn Văn A', phone: '+84 900 000 000',
    address: 'Số 12, Đường số 5, KCN Tân Bình, TPHCM',
    dryTrucks: 5, coldTrucks: 3, containerTrucks: 2, hasColdChainCert: true,
    signatureType: 'Sử dụng Chữ ký số USB Token',
  });
  const [logisticsLicenses, setLogisticsLicenses] = useState<string[]>(['Giay_phep_kinh_doanh_van_tai_2024.pdf']);

  // Buyer state
  const [buyerForm, setBuyerForm] = useState({
    companyName: 'Công ty TNHH AgriTrade Việt Nam', taxId: '0123456789',
    address: 'Tầng 15, Bitexco Financial Tower, Quận 1, TP.HCM',
    representative: 'Nguyễn Văn A', businessSector: 'Xuất khẩu nông sản',
    creditLimit: 2000, paymentTerm: 'T+15 ngày', termsAgreed: true,
  });
  const [buyerFiles, setBuyerFiles] = useState<{ [k: string]: string }>({ gpkd: '', bctc: '', profile: '', cccd: '' });

  // Supplier state
  const [supplierForm, setSupplierForm] = useState({
    companyName: 'HTX Nông nghiệp Công nghệ cao', taxId: '0123456789',
    representative: 'Nguyễn Văn Nam', phone: '0908 123 456',
    address: 'Xã Mỹ Hạnh Đông, Thị xã Cai Lậy, Tiền Giang',
    areaM2: '15000', yieldTons: '180', primaryCategory: 'Rau ăn lá',
  });
  const [certs, setCerts] = useState({ vietgap: true, globalgap: false, organic: true });
  const [uploadedFiles, setUploadedFiles] = useState<string[]>(['Chung_nhan_VietGAP_2024.pdf']);
  const [farmPhotos, setFarmPhotos] = useState<string[]>([
    'https://images.unsplash.com/photo-1595838768007-427f716c5ef8?auto=format&fit=crop&w=400&q=80',
    'https://images.unsplash.com/photo-1574943320219-553eb213f72d?auto=format&fit=crop&w=400&q=80',
  ]);
  const [termsAgreed, setTermsAgreed] = useState(true);

  useEffect(() => {
    if (currentStep === 3 && canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        const rect = canvas.getBoundingClientRect();
        canvas.width = rect.width; canvas.height = rect.height;
        ctx.lineWidth = 2.5; ctx.lineCap = 'round'; ctx.strokeStyle = '#176a22';
      }
    }
  }, [currentStep, role]);

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    setIsDrawing(true); setIsSigned(true);
    const canvas = canvasRef.current; if (!canvas) return;
    const ctx = canvas.getContext('2d'); if (!ctx) return;
    const rect = canvas.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    ctx.beginPath(); ctx.moveTo(clientX - rect.left, clientY - rect.top);
  };
  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current; if (!canvas) return;
    const ctx = canvas.getContext('2d'); if (!ctx) return;
    const rect = canvas.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    ctx.lineTo(clientX - rect.left, clientY - rect.top); ctx.stroke();
  };
  const stopDrawing = () => setIsDrawing(false);
  const clearSignature = () => {
    const canvas = canvasRef.current; if (!canvas) return;
    const ctx = canvas.getContext('2d'); if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height); setIsSigned(false);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, isLogistics = false) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files).map((f: File) => f.name);
      if (isLogistics) setLogisticsLicenses(prev => [...prev, ...newFiles]);
      else setUploadedFiles(prev => [...prev, ...newFiles]);
    }
  };

  const completeRegistration = () => {
    const isLog = role === 'logistics', isBuy = role === 'buyer';
    const name = isLog ? logisticsForm.representative : isBuy ? buyerForm.representative : supplierForm.representative;
    const company = isLog ? logisticsForm.companyName : isBuy ? buyerForm.companyName : supplierForm.companyName;
    const phone = isLog ? logisticsForm.phone : isBuy ? '0908 888 999' : supplierForm.phone;
    const tax = isLog ? logisticsForm.taxId : isBuy ? buyerForm.taxId : supplierForm.taxId;
    onRegisterSuccess({ id: `user-${Date.now()}`, name, companyName: company, email: `${phone.replace(/\s+/g, '')}@agriconnect.vn`, phone, taxId: tax, role, verified: true, province: 'TP. Hồ Chí Minh', hasDigitalSignature: true });
  };

  // Stepper helper
  const StepIndicator = ({ steps, labels }: { steps: number; labels: string[] }) => (
    <div className="relative flex justify-between items-center mb-6">
      <div className="absolute top-5 left-0 w-full h-1 bg-[#bfcaba] -z-0 -translate-y-1/2 rounded-full" />
      <div className="absolute top-5 left-0 h-1 bg-[#176a22] -z-0 -translate-y-1/2 transition-all duration-500 rounded-full"
        style={{ width: `${((currentStep - 1) / (steps - 1)) * 100}%` }} />
      {labels.map((label, i) => (
        <div key={i} className="flex flex-col items-center gap-1 bg-white px-2 z-10">
          <div className={`w-9 h-9 rounded-full flex items-center justify-center border-2 font-bold text-xs transition-all ${currentStep > i + 1 ? 'border-[#176a22] bg-[#176a22] text-white' : currentStep === i + 1 ? 'border-[#176a22] bg-[#176a22] text-white' : 'border-[#bfcaba] bg-[#ebefe4] text-[#707a6c]'}`}>
            {currentStep > i + 1 ? <Check className="w-4 h-4" /> : i + 1}
          </div>
          <span className={`text-[10px] font-semibold text-center ${currentStep === i + 1 ? 'text-[#176a22]' : 'text-[#707a6c]'}`}>{label}</span>
        </div>
      ))}
    </div>
  );

  // ── LOGISTICS ──
  if (role === 'logistics') return (
    <div className="w-full">
      <StepIndicator steps={3} labels={['Pháp nhân', 'Đội xe', 'Hợp đồng']} />
      <div className="bg-white rounded-xl border border-[#bfcaba] overflow-hidden">
        {/* Step 1 */}
        {currentStep === 1 && (
          <div className="p-5 space-y-4">
            <h3 className="font-bold text-lg text-[#181d16] border-b border-[#e0e4d9] pb-2">Thông tin Pháp lý</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { label: 'Tên doanh nghiệp vận tải', key: 'companyName', placeholder: 'Công ty TNHH Vận tải...' },
                { label: 'Mã số thuế', key: 'taxId', placeholder: '0101234567' },
                { label: 'Người đại diện pháp luật', key: 'representative', placeholder: 'Nguyễn Văn A' },
                { label: 'Số điện thoại', key: 'phone', placeholder: '+84 900 000 000' },
              ].map(({ label, key, placeholder }) => (
                <div key={key} className="space-y-1">
                  <label className="text-xs font-bold text-[#181d16]">{label} <span className="text-red-500">*</span></label>
                  <input type="text" value={(logisticsForm as any)[key]} onChange={(e) => setLogisticsForm({ ...logisticsForm, [key]: e.target.value })}
                    placeholder={placeholder} className="w-full h-10 px-3 border border-[#707a6c] rounded-lg focus:ring-2 focus:ring-[#176a22] text-sm bg-white" />
                </div>
              ))}
              <div className="sm:col-span-2 space-y-1">
                <label className="text-xs font-bold text-[#181d16]">Địa chỉ trụ sở <span className="text-red-500">*</span></label>
                <input type="text" value={logisticsForm.address} onChange={(e) => setLogisticsForm({ ...logisticsForm, address: e.target.value })}
                  placeholder="Số nhà, đường, phường/xã..." className="w-full h-10 px-3 border border-[#707a6c] rounded-lg focus:ring-2 focus:ring-[#176a22] text-sm bg-white" />
              </div>
            </div>
            <div className="bg-[#f1f5ea] p-4 rounded-xl border border-dashed border-[#707a6c]">
              <p className="text-xs font-bold text-[#181d16] mb-2 flex items-center gap-1"><CloudUpload className="w-4 h-4 text-[#176a22]" /> Giấy phép kinh doanh vận tải</p>
              <label className="flex flex-col items-center justify-center w-full h-20 border-2 border-dashed border-[#bfcaba] rounded-xl hover:bg-[#ebefe4] cursor-pointer bg-white">
                <Upload className="w-6 h-6 text-[#707a6c] mb-1" />
                <p className="text-xs font-semibold text-[#181d16]">Nhấp để tải lên</p>
                <input type="file" multiple accept=".pdf,.png,.jpg,.jpeg" onChange={(e) => handleFileUpload(e, true)} className="hidden" />
              </label>
              {logisticsLicenses.map((lic, i) => (
                <div key={i} className="flex items-center justify-between p-2 bg-white rounded-lg border border-[#e0e4d9] mt-2 text-xs">
                  <div className="flex items-center gap-2"><FileText className="w-4 h-4 text-[#176a22]" /><span className="truncate">{lic}</span></div>
                  <button type="button" onClick={() => setLogisticsLicenses(prev => prev.filter((_, idx) => idx !== i))} className="text-red-500 hover:text-red-700 p-1"><X className="w-4 h-4" /></button>
                </div>
              ))}
            </div>
          </div>
        )}
        {/* Step 2 */}
        {currentStep === 2 && (
          <div className="p-5 space-y-4">
            <h3 className="font-bold text-lg text-[#181d16] border-b border-[#e0e4d9] pb-2">Năng lực Đội xe & Cold Chain</h3>
            <div className="grid grid-cols-3 gap-3">
              {[
                { icon: <Truck className="w-5 h-5" />, key: 'dryTrucks', label: 'Xe tải thùng kín', desc: 'Đồ khô, lúa gạo', highlight: false },
                { icon: <Snowflake className="w-5 h-5" />, key: 'coldTrucks', label: 'Xe đông lạnh', desc: 'Rau quả, thịt tươi', highlight: true },
                { icon: <Package className="w-5 h-5" />, key: 'containerTrucks', label: 'Xe Container', desc: 'Xuất khẩu lớn', highlight: false },
              ].map(({ icon, key, label, desc, highlight }) => (
                <div key={key} className={`p-4 rounded-xl border ${highlight ? 'border-2 border-[#176a22] bg-[#c9ecc1]/20' : 'border-[#bfcaba] bg-white'}`}>
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center mb-2 ${highlight ? 'bg-[#176a22] text-white' : 'bg-[#f1f5ea] text-[#176a22]'}`}>{icon}</div>
                  <input type="number" min="0" value={(logisticsForm as any)[key]}
                    onChange={(e) => setLogisticsForm({ ...logisticsForm, [key]: parseInt(e.target.value) || 0 })}
                    className={`w-full h-9 border rounded-lg text-center font-bold text-sm mb-2 focus:ring-2 focus:ring-[#176a22] ${highlight ? 'border-[#176a22]' : 'border-[#707a6c]'}`} />
                  <p className="font-bold text-xs text-[#181d16]">{label}</p>
                  <p className="text-[10px] text-[#707a6c]">{desc}</p>
                </div>
              ))}
            </div>
            <label className="flex items-center gap-3 p-3 border border-[#bfcaba] rounded-xl cursor-pointer hover:bg-[#ebefe4] bg-white">
              <input type="checkbox" checked={logisticsForm.hasColdChainCert}
                onChange={(e) => setLogisticsForm({ ...logisticsForm, hasColdChainCert: e.target.checked })}
                className="w-4 h-4 text-[#176a22] rounded" />
              <div>
                <span className="font-bold text-sm text-[#181d16] block">Chứng chỉ Cold Chain (ISO/HACCP)</span>
                <span className="text-xs text-[#40493d]">Bảo quản lạnh tiêu chuẩn quốc tế.</span>
              </div>
              <Verified className="w-5 h-5 text-[#176a22] shrink-0 ml-auto" />
            </label>
          </div>
        )}
        {/* Step 3 */}
        {currentStep === 3 && (
          <div className="p-5 space-y-4">
            <h3 className="font-bold text-lg text-[#181d16] border-b border-[#e0e4d9] pb-2">Hợp đồng & Chữ ký số</h3>
            <div className="h-40 overflow-y-auto p-3 border border-[#bfcaba] bg-white rounded-xl text-xs text-[#40493d] leading-relaxed space-y-2">
              <p className="font-bold text-sm uppercase">Điều khoản Dịch vụ AgriLogistics</p>
              <p>1. Đảm bảo hàng hóa được giao đúng thời hạn, đúng địa điểm và duy trì chất lượng cam kết.</p>
              <p>2. Cold Chain: Nhiệt độ thùng xe phải duy trì trong ngưỡng ±2°C so với yêu cầu đơn hàng.</p>
              <p>3. Bảo hiểm: AgriLogistics hỗ trợ 50% phí bảo hiểm cho đơn hàng trên 500 triệu VNĐ.</p>
              <p>4. Thanh toán: Phí vận chuyển quyết toán vào Thứ 6 hàng tuần sau khi xác nhận hoàn thành.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-bold text-[#181d16]">Loại chữ ký số</label>
                <select value={logisticsForm.signatureType} onChange={(e) => setLogisticsForm({ ...logisticsForm, signatureType: e.target.value })}
                  className="w-full h-10 px-3 border border-[#707a6c] rounded-xl focus:ring-2 focus:ring-[#176a22] text-xs font-semibold bg-white">
                  <option value="Sử dụng Chữ ký số USB Token">Chữ ký số USB Token (Viettel/VNPT CA)</option>
                  <option value="Sử dụng Smart OTP (Mobile App)">Smart OTP (Mobile App)</option>
                  <option value="Ký tay điện tử (Xác thực khuôn mặt)">Ký tay điện tử (eKYC)</option>
                </select>
                <div className="p-2 bg-[#f1f5ea] rounded-lg border border-[#bfcaba] text-xs text-[#40493d] flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-[#176a22]" /><span>{logisticsForm.signatureType} sẵn sàng.</span>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-[#181d16]">Ký tên điện tử</label>
                <div className="h-28 bg-[#f1f5ea] rounded-xl border-2 border-dashed border-[#bfcaba] relative overflow-hidden">
                  {!isSigned && <div className="absolute inset-0 flex items-center justify-center text-[#707a6c] pointer-events-none text-xs">Dùng chuột để ký</div>}
                  <canvas ref={canvasRef} onMouseDown={startDrawing} onMouseMove={draw} onMouseUp={stopDrawing} onMouseLeave={stopDrawing}
                    onTouchStart={startDrawing} onTouchMove={draw} onTouchEnd={stopDrawing}
                    className="absolute inset-0 w-full h-full cursor-crosshair z-10 touch-none" />
                </div>
                {isSigned && <button type="button" onClick={clearSignature} className="text-xs text-[#176a22] font-semibold hover:underline">Xóa và ký lại</button>}
              </div>
            </div>
          </div>
        )}
        {/* Footer nav */}
        <div className="px-5 py-3 bg-[#f7fbf0] border-t border-[#bfcaba] flex items-center justify-between">
          <button type="button" onClick={() => currentStep > 1 ? setCurrentStep(p => p - 1) : onBack()}
            className={`px-4 py-2 border border-[#707a6c] rounded-full text-xs font-bold text-[#181d16] hover:bg-[#e5eadf] transition-all flex items-center gap-1 ${currentStep === 1 ? 'invisible' : ''}`}>
            <ArrowLeft className="w-3 h-3" /> Quay lại
          </button>
          <div className="flex gap-2">
            {currentStep < 3
              ? <button type="button" onClick={() => setCurrentStep(p => p + 1)}
                  className="px-5 py-2 bg-[#176a22] text-white rounded-full font-bold text-xs hover:bg-[#12551a] transition-all flex items-center gap-1">
                  Tiếp theo <ArrowRight className="w-3 h-3" />
                </button>
              : <button type="button" onClick={() => setShowSuccessModal(true)}
                  className="px-5 py-2 bg-[#176a22] text-white rounded-full font-bold text-xs hover:bg-[#12551a] transition-all flex items-center gap-1">
                  Hoàn tất & Ký <ShieldCheck className="w-3 h-3" />
                </button>
            }
          </div>
        </div>
      </div>
      {showSuccessModal && (
        <div className="fixed inset-0 z-[80] bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-8 max-w-sm w-full text-center shadow-2xl border border-[#e0e4d9] space-y-4">
            <div className="w-16 h-16 bg-[#176a22] text-white rounded-full flex items-center justify-center mx-auto"><CheckCircle2 className="w-10 h-10" /></div>
            <h2 className="text-xl font-bold text-[#176a22]">Đăng ký Thành công!</h2>
            <p className="text-sm text-[#40493d]">Hồ sơ đang được kiểm duyệt. Kết quả sẽ gửi qua email trong 24h.</p>
            <button type="button" onClick={completeRegistration}
              className="w-full py-3 bg-[#176a22] text-white rounded-full font-bold text-sm hover:bg-[#12551a] transition-all">
              Đi tới Bảng điều khiển
            </button>
          </div>
        </div>
      )}
    </div>
  );

  // ── BUYER ──
  if (role === 'buyer') return (
    <div className="w-full">
      <StepIndicator steps={3} labels={['Thông tin & MST', 'Hồ sơ Pháp lý', 'Hạn mức & Xác minh']} />
      <div className="bg-white rounded-xl border border-[#bfcaba] overflow-hidden">
        {currentStep === 1 && (
          <div className="p-5 space-y-4">
            <h3 className="font-bold text-lg text-[#181d16] border-b border-[#e0e4d9] pb-2 flex items-center gap-2"><Building2 className="w-5 h-5 text-[#176a22]" />Thông tin doanh nghiệp</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { label: 'Tên pháp nhân đầy đủ', key: 'companyName', placeholder: 'Công ty TNHH AgriTrade...' },
                { label: 'Mã số thuế', key: 'taxId', placeholder: '0123456789' },
                { label: 'Người đại diện pháp luật', key: 'representative', placeholder: 'Nguyễn Văn A' },
              ].map(({ label, key, placeholder }) => (
                <div key={key} className="space-y-1">
                  <label className="text-xs font-semibold text-[#40493d]">{label}</label>
                  <input type="text" value={(buyerForm as any)[key]} onChange={(e) => setBuyerForm({ ...buyerForm, [key]: e.target.value })}
                    placeholder={placeholder} className="w-full h-10 px-3 border border-[#707a6c] rounded-lg focus:ring-2 focus:ring-[#176a22] text-sm bg-[#f7fbf0]" />
                </div>
              ))}
              <div className="space-y-1">
                <label className="text-xs font-semibold text-[#40493d]">Lĩnh vực kinh doanh</label>
                <select value={buyerForm.businessSector} onChange={(e) => setBuyerForm({ ...buyerForm, businessSector: e.target.value })}
                  className="w-full h-10 px-3 border border-[#707a6c] rounded-lg focus:ring-2 focus:ring-[#176a22] text-sm bg-[#f7fbf0]">
                  <option>Xuất khẩu nông sản</option><option>Chế biến thực phẩm</option>
                  <option>Phân phối bán lẻ</option><option>Khác</option>
                </select>
              </div>
              <div className="sm:col-span-2 space-y-1">
                <label className="text-xs font-semibold text-[#40493d]">Địa chỉ trụ sở chính</label>
                <input type="text" value={buyerForm.address} onChange={(e) => setBuyerForm({ ...buyerForm, address: e.target.value })}
                  placeholder="Tầng 15, Bitexco..." className="w-full h-10 px-3 border border-[#707a6c] rounded-lg focus:ring-2 focus:ring-[#176a22] text-sm bg-[#f7fbf0]" />
              </div>
            </div>
            <div className="flex justify-end pt-2">
              <button type="button" onClick={() => setCurrentStep(2)}
                className="bg-[#176a22] text-white px-6 py-2.5 rounded-lg font-semibold text-sm flex items-center gap-2 hover:bg-[#12551a] transition-all shadow-sm">
                Tiếp tục hồ sơ pháp lý <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
        {currentStep === 2 && (
          <div className="p-5 space-y-4">
            <h3 className="font-bold text-lg text-[#181d16] border-b border-[#e0e4d9] pb-2 flex items-center gap-2"><FileText className="w-5 h-5 text-[#176a22]" />Hồ sơ năng lực & Pháp lý</h3>
            <div className="grid grid-cols-2 gap-3">
              {[
                { key: 'gpkd', icon: <CloudUpload className="w-8 h-8" />, label: 'Giấy phép ĐKKD', desc: 'PDF, JPG (Max 5MB)' },
                { key: 'bctc', icon: <Building2 className="w-8 h-8" />, label: 'Báo cáo Tài chính', desc: 'Bản scan có mộc treo' },
                { key: 'profile', icon: <FileCheck className="w-8 h-8" />, label: 'Hồ sơ Năng lực', desc: 'Company Profile' },
                { key: 'cccd', icon: <Key className="w-8 h-8" />, label: 'CCCD Đại diện', desc: 'Mặt trước & sau' },
              ].map(({ key, icon, label, desc }) => (
                <label key={key} className="border-2 border-dashed border-[#bfcaba] rounded-xl p-4 flex flex-col items-center bg-[#f1f5ea] hover:bg-[#e5eadf] cursor-pointer text-center">
                  <div className="text-[#40493d] mb-1">{icon}</div>
                  <span className="font-semibold text-xs text-[#181d16]">{label}</span>
                  <span className="text-[10px] text-[#40493d] mt-0.5">{desc}</span>
                  {buyerFiles[key]
                    ? <span className="mt-1.5 text-[10px] font-semibold text-[#176a22] bg-[#c9ecc1] px-2 py-0.5 rounded-full flex items-center gap-1"><CheckCircle2 className="w-3 h-3" />{buyerFiles[key]}</span>
                    : <span className="mt-1.5 text-[10px] text-[#707a6c] italic">Nhấp để chọn tệp</span>
                  }
                  <input type="file" accept=".pdf,.jpg,.jpeg,.png" className="hidden"
                    onChange={(e) => { if (e.target.files?.[0]) setBuyerFiles(p => ({ ...p, [key]: e.target.files![0].name })); }} />
                </label>
              ))}
            </div>
            <div className="flex justify-between pt-2">
              <button type="button" onClick={() => setCurrentStep(1)} className="border border-[#176a22] text-[#176a22] px-5 py-2.5 rounded-lg font-semibold text-sm flex items-center gap-2 hover:bg-[#f7fbf0]">
                <ArrowLeft className="w-4 h-4" /> Quay lại
              </button>
              <button type="button" onClick={() => setCurrentStep(3)} className="bg-[#176a22] text-white px-6 py-2.5 rounded-lg font-semibold text-sm flex items-center gap-2 hover:bg-[#12551a]">
                Thiết lập hạn mức <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
        {currentStep === 3 && (
          <div className="p-5 space-y-4">
            <h3 className="font-bold text-lg text-[#181d16] border-b border-[#e0e4d9] pb-2 flex items-center gap-2"><ShieldCheck className="w-5 h-5 text-[#176a22]" />Hạn mức tín dụng & Xác minh</h3>
            <div className="bg-[#358439]/10 p-3 rounded-xl border border-[#358439]/20 text-sm text-[#181d16]">
              Hạn mức tín dụng đề xuất: <strong className="text-[#176a22]">2.000.000.000 VNĐ</strong>
            </div>
            <div className="space-y-3">
              <label className="text-xs font-semibold text-[#40493d]">Hạn mức mong muốn: <span className="font-bold text-[#176a22]">{buyerForm.creditLimit < 1000 ? `${buyerForm.creditLimit}tr` : `${buyerForm.creditLimit / 1000}tỷ`} VNĐ</span></label>
              <input type="range" min={100} max={5000} step={100} value={buyerForm.creditLimit}
                onChange={(e) => setBuyerForm({ ...buyerForm, creditLimit: Number(e.target.value) })}
                className="w-full accent-[#176a22] h-2 bg-[#bfcaba] rounded-lg appearance-none cursor-pointer" />
              <div className="flex justify-between text-xs font-medium text-[#40493d]"><span>100tr</span><span>5 tỷ</span></div>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-semibold text-[#40493d]">Thời hạn thanh toán</label>
              <div className="grid grid-cols-3 gap-2">
                {['T+15 ngày', 'T+30 ngày', 'T+45 ngày'].map(term => (
                  <label key={term} className={`border-2 p-3 rounded-xl text-center cursor-pointer text-xs font-semibold transition-all ${buyerForm.paymentTerm === term ? 'border-[#176a22] bg-[#f7fbf0] text-[#176a22]' : 'border-[#bfcaba] text-[#40493d] hover:border-[#176a22]'}`}>
                    <input type="radio" name="buyerTerm" value={term} checked={buyerForm.paymentTerm === term} onChange={() => setBuyerForm({ ...buyerForm, paymentTerm: term })} className="hidden" />
                    {term}
                  </label>
                ))}
              </div>
            </div>
            <label className="flex items-start gap-2 cursor-pointer">
              <input type="checkbox" checked={buyerForm.termsAgreed} onChange={(e) => setBuyerForm({ ...buyerForm, termsAgreed: e.target.checked })} className="mt-0.5 w-4 h-4 accent-[#176a22]" />
              <span className="text-xs text-[#40493d]">Tôi đồng ý với <a href="#" onClick={e => e.preventDefault()} className="text-[#176a22] underline font-semibold">Điều khoản Bảo mật ISO 27001</a> của AgriLogistics.</span>
            </label>
            <div className="flex justify-between pt-2">
              <button type="button" onClick={() => setCurrentStep(2)} className="border border-[#176a22] text-[#176a22] px-5 py-2.5 rounded-lg font-semibold text-sm flex items-center gap-2 hover:bg-[#f7fbf0]">
                <ArrowLeft className="w-4 h-4" /> Quay lại
              </button>
              <button type="button" disabled={!buyerForm.termsAgreed} onClick={() => setShowSuccessModal(true)}
                className={`px-6 py-2.5 rounded-lg font-semibold text-sm flex items-center gap-2 shadow-sm transition-all ${buyerForm.termsAgreed ? 'bg-[#176a22] text-white hover:bg-[#12551a]' : 'bg-[#bfcaba] text-white cursor-not-allowed'}`}>
                Xác nhận & Gửi hồ sơ <ShieldCheck className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
      {showSuccessModal && (
        <div className="fixed inset-0 z-[80] bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-8 max-w-sm w-full text-center shadow-2xl space-y-4">
            <div className="w-16 h-16 bg-[#176a22] text-white rounded-full flex items-center justify-center mx-auto"><CheckCircle2 className="w-10 h-10" /></div>
            <h2 className="text-xl font-bold text-[#176a22]">Đăng ký Thành công!</h2>
            <p className="text-sm text-[#40493d]">Hồ sơ đang được kiểm duyệt. Kết quả sẽ gửi qua email trong 24h.</p>
            <button type="button" onClick={completeRegistration} className="w-full py-3 bg-[#176a22] text-white rounded-full font-bold text-sm hover:bg-[#12551a] transition-all">Hoàn tất</button>
          </div>
        </div>
      )}
    </div>
  );

  // ── SUPPLIER ──
  return (
    <div className="w-full">
      <StepIndicator steps={3} labels={['Thông tin', 'Chứng nhận', 'Hình ảnh & Ký']} />
      <div className="bg-white rounded-xl border border-[#bfcaba] overflow-hidden">
        {currentStep === 1 && (
          <div className="p-5 space-y-4">
            <h3 className="font-bold text-lg text-[#181d16] border-b border-[#e0e4d9] pb-2">Thông tin HTX / Nhà vườn</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { label: 'Tên HTX / Doanh nghiệp', key: 'companyName', placeholder: 'HTX Nông nghiệp Công nghệ cao' },
                { label: 'Mã số thuế', key: 'taxId', placeholder: '0123456789' },
                { label: 'Người đại diện', key: 'representative', placeholder: 'Nguyễn Văn Nam' },
                { label: 'Số điện thoại', key: 'phone', placeholder: '0908 123 456' },
              ].map(({ label, key, placeholder }) => (
                <div key={key} className="space-y-1">
                  <label className="text-xs font-semibold text-[#40493d]">{label} <span className="text-red-500">*</span></label>
                  <input type="text" value={(supplierForm as any)[key]} onChange={(e) => setSupplierForm({ ...supplierForm, [key]: e.target.value })}
                    placeholder={placeholder} className="w-full h-10 px-3 border border-[#707a6c] rounded-lg focus:ring-2 focus:ring-[#176a22] text-sm bg-[#f7fbf0]" />
                </div>
              ))}
              <div className="sm:col-span-2 space-y-1">
                <label className="text-xs font-semibold text-[#40493d]">Địa chỉ vùng trồng <span className="text-red-500">*</span></label>
                <input type="text" value={supplierForm.address} onChange={(e) => setSupplierForm({ ...supplierForm, address: e.target.value })}
                  placeholder="Xã, Huyện, Tỉnh..." className="w-full h-10 px-3 border border-[#707a6c] rounded-lg focus:ring-2 focus:ring-[#176a22] text-sm bg-[#f7fbf0]" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-semibold text-[#40493d]">Diện tích (m²)</label>
                <input type="text" value={supplierForm.areaM2} onChange={(e) => setSupplierForm({ ...supplierForm, areaM2: e.target.value })}
                  placeholder="15000" className="w-full h-10 px-3 border border-[#707a6c] rounded-lg focus:ring-2 focus:ring-[#176a22] text-sm bg-[#f7fbf0]" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-semibold text-[#40493d]">Sản lượng ước tính (tấn/năm)</label>
                <input type="text" value={supplierForm.yieldTons} onChange={(e) => setSupplierForm({ ...supplierForm, yieldTons: e.target.value })}
                  placeholder="180" className="w-full h-10 px-3 border border-[#707a6c] rounded-lg focus:ring-2 focus:ring-[#176a22] text-sm bg-[#f7fbf0]" />
              </div>
            </div>
            <div className="flex justify-end pt-2">
              <button type="button" onClick={() => setCurrentStep(2)} className="bg-[#176a22] text-white px-6 py-2.5 rounded-lg font-semibold text-sm flex items-center gap-2 hover:bg-[#12551a]">
                Tiếp theo <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
        {currentStep === 2 && (
          <div className="p-5 space-y-4">
            <h3 className="font-bold text-lg text-[#181d16] border-b border-[#e0e4d9] pb-2">Chứng nhận & Tiêu chuẩn</h3>
            <div className="grid grid-cols-3 gap-2">
              {[
                { key: 'vietgap', label: 'VietGAP' }, { key: 'globalgap', label: 'GlobalGAP' }, { key: 'organic', label: 'Organic' },
              ].map(({ key, label }) => (
                <label key={key} className={`border-2 p-3 rounded-xl cursor-pointer text-center transition-all ${(certs as any)[key] ? 'border-[#176a22] bg-[#d8f5d0]' : 'border-[#bfcaba] hover:border-[#176a22]'}`}>
                  <input type="checkbox" checked={(certs as any)[key]} onChange={(e) => setCerts({ ...certs, [key]: e.target.checked })} className="hidden" />
                  <span className="text-xs font-bold text-[#181d16]">{label}</span>
                </label>
              ))}
            </div>
            <div className="bg-[#f1f5ea] p-4 rounded-xl border border-dashed border-[#707a6c]">
              <p className="text-xs font-bold text-[#181d16] mb-2 flex items-center gap-1"><CloudUpload className="w-4 h-4 text-[#176a22]" /> Tải lên chứng nhận (PDF/JPG)</p>
              <label className="flex flex-col items-center justify-center w-full h-16 border-2 border-dashed border-[#bfcaba] rounded-xl hover:bg-[#ebefe4] cursor-pointer bg-white">
                <Upload className="w-5 h-5 text-[#707a6c]" />
                <p className="text-xs text-[#181d16]">Nhấp để tải lên</p>
                <input type="file" multiple accept=".pdf,.png,.jpg,.jpeg" onChange={(e) => handleFileUpload(e)} className="hidden" />
              </label>
              {uploadedFiles.map((f, i) => (
                <div key={i} className="flex items-center justify-between p-2 bg-white rounded-lg border border-[#e0e4d9] mt-2 text-xs">
                  <div className="flex items-center gap-2"><FileText className="w-3 h-3 text-[#176a22]" /><span className="truncate">{f}</span></div>
                  <button type="button" onClick={() => setUploadedFiles(prev => prev.filter((_, idx) => idx !== i))} className="text-red-500 p-1"><X className="w-3 h-3" /></button>
                </div>
              ))}
            </div>
            <div className="flex justify-between pt-2">
              <button type="button" onClick={() => setCurrentStep(1)} className="border border-[#176a22] text-[#176a22] px-5 py-2.5 rounded-lg font-semibold text-sm flex items-center gap-2 hover:bg-[#f7fbf0]">
                <ArrowLeft className="w-4 h-4" /> Quay lại
              </button>
              <button type="button" onClick={() => setCurrentStep(3)} className="bg-[#176a22] text-white px-6 py-2.5 rounded-lg font-semibold text-sm flex items-center gap-2 hover:bg-[#12551a]">
                Tiếp theo <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
        {currentStep === 3 && (
          <div className="p-5 space-y-4">
            <h3 className="font-bold text-lg text-[#181d16] border-b border-[#e0e4d9] pb-2">Hình ảnh Vùng trồng & Cam kết</h3>
            <div className="grid grid-cols-2 gap-2">
              {farmPhotos.map((url, i) => (
                <div key={i} className="relative group">
                  <img src={url} alt="farm" className="w-full h-24 object-cover rounded-xl border border-[#bfcaba]" />
                  <button type="button" onClick={() => setFarmPhotos(prev => prev.filter((_, idx) => idx !== i))}
                    className="absolute top-1 right-1 w-6 h-6 bg-white/80 rounded-full flex items-center justify-center text-red-500 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Trash2 className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>
            <label className="flex items-start gap-2 cursor-pointer">
              <input type="checkbox" checked={termsAgreed} onChange={(e) => setTermsAgreed(e.target.checked)} className="mt-0.5 w-4 h-4 accent-[#176a22]" />
              <span className="text-xs text-[#40493d]">Tôi cam kết thông tin chính xác và đồng ý với <a href="#" onClick={e => e.preventDefault()} className="text-[#176a22] underline font-semibold">Điều khoản Dịch vụ</a> AgriConnect.</span>
            </label>
            <div className="flex justify-between pt-2">
              <button type="button" onClick={() => setCurrentStep(2)} className="border border-[#176a22] text-[#176a22] px-5 py-2.5 rounded-lg font-semibold text-sm flex items-center gap-2 hover:bg-[#f7fbf0]">
                <ArrowLeft className="w-4 h-4" /> Quay lại
              </button>
              <button type="button" disabled={!termsAgreed} onClick={() => setShowSuccessModal(true)}
                className={`px-6 py-2.5 rounded-lg font-semibold text-sm flex items-center gap-2 shadow-sm transition-all ${termsAgreed ? 'bg-[#176a22] text-white hover:bg-[#12551a]' : 'bg-[#bfcaba] text-white cursor-not-allowed'}`}>
                Xác nhận & Gửi hồ sơ <ShieldCheck className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
      {showSuccessModal && (
        <div className="fixed inset-0 z-[80] bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-8 max-w-sm w-full text-center shadow-2xl space-y-4">
            <div className="w-16 h-16 bg-[#176a22] text-white rounded-full flex items-center justify-center mx-auto"><CheckCircle2 className="w-10 h-10" /></div>
            <h2 className="text-xl font-bold text-[#176a22]">Đăng ký Thành công!</h2>
            <p className="text-sm text-[#40493d]">Hồ sơ đang được kiểm duyệt trong 24h làm việc.</p>
            <button type="button" onClick={completeRegistration} className="w-full py-3 bg-[#176a22] text-white rounded-full font-bold text-sm hover:bg-[#12551a] transition-all">Hoàn tất</button>
          </div>
        </div>
      )}
    </div>
  );
};

// ─── Main RegisterModal ───────────────────────────────────────────────────────
export const RegisterModal: React.FC<RegisterModalProps> = ({
  isOpen,
  onClose,
  defaultRole = 'farmer',
  initialTab = 'register',
}) => {
  const [authTab, setAuthTab] = useState<AuthTab>(initialTab);
  const [registerStep, setRegisterStep] = useState<RegisterStep>('role-select');
  const [selectedRole, setSelectedRole] = useState<BusinessRole>('supplier');
  const [isForgotPasswordOpen, setIsForgotPasswordOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);

  // Sync when reopened
  useEffect(() => {
    if (isOpen) {
      setAuthTab(initialTab);
      setRegisterStep('role-select');
      setCurrentUser(null);
      setIsForgotPasswordOpen(false);
      // Map defaultRole to BusinessRole
      if (defaultRole === 'carrier') setSelectedRole('logistics');
      else if (defaultRole === 'buyer') setSelectedRole('buyer');
      else setSelectedRole('supplier');
    }
  }, [isOpen, initialTab, defaultRole]);

  const handleSwitchTab = (tab: AuthTab) => {
    setAuthTab(tab);
    if (tab === 'register') setRegisterStep('role-select');
  };

  const handleSelectRole = (role: BusinessRole) => {
    setSelectedRole(role);
    setRegisterStep('details');
  };

  const handleLoginSuccess = (email: string) => {
    setCurrentUser({
      id: 'user-' + Date.now(), name: email.split('@')[0] || 'Người dùng',
      companyName: 'Công ty TNHH AgriTrade Việt Nam', email, phone: '0908 123 456',
      taxId: '0312345678', role: 'buyer', verified: true, province: 'TP. Hồ Chí Minh', hasDigitalSignature: true,
    });
  };

  if (!isOpen) return null;

  // Determine if details form needs full-width layout
  const isDetailsStep = authTab === 'register' && registerStep === 'details';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className={`bg-[#f7fbf0] w-full rounded-3xl shadow-2xl border border-[#e0e4d9] flex flex-col overflow-hidden transition-all duration-300 ${isDetailsStep ? 'max-w-3xl max-h-[95vh]' : 'max-w-xl max-h-[92vh]'}`}>

        {/* Header */}
        <div className="px-6 py-4 bg-[#f1f5ea] border-b border-[#e0e4d9] flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#176a22] text-white flex items-center justify-center shadow-sm">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <span className="text-xl font-bold tracking-tight text-[#176a22]">AgriConnect</span>
          </div>
          <button onClick={() => { setCurrentUser(null); onClose(); }}
            className="p-2 text-[#707a6c] hover:text-[#181d16] hover:bg-white rounded-full transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto">
          {/* SUCCESS / LOGGED IN STATE */}
          {currentUser ? (
            <div className="py-6 text-center space-y-4">
              <div className="w-16 h-16 bg-[#c9ecc1] text-[#176a22] rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h3 className="text-xl font-bold text-[#181d16]">Xác thực thành công!</h3>
              <p className="text-sm text-[#40493d]">Bạn đã đăng nhập vào hệ thống AgriConnect.</p>
              <div className="bg-white rounded-xl p-4 border border-[#e0e4d9] text-left space-y-2.5 text-sm">
                <div className="flex justify-between"><span className="text-[#40493d]">Đại diện:</span><span className="font-bold">{currentUser.name}</span></div>
                <div className="flex justify-between"><span className="text-[#40493d]">Doanh nghiệp:</span><span className="font-bold">{currentUser.companyName}</span></div>
                <div className="flex justify-between"><span className="text-[#40493d]">Email:</span><span className="font-semibold text-[#176a22]">{currentUser.email}</span></div>
                <div className="flex justify-between"><span className="text-[#40493d]">MST:</span><span className="font-mono">{currentUser.taxId}</span></div>
                <div className="flex justify-between items-center">
                  <span className="text-[#40493d]">Vai trò:</span>
                  <span className="bg-[#176a22] text-white text-xs font-bold px-3 py-1 rounded-full uppercase">
                    {currentUser.role === 'buyer' ? 'Đối tác Mua hàng' : currentUser.role === 'supplier' ? 'Nhà cung cấp' : 'Đối tác Logistics'}
                  </span>
                </div>
              </div>
              <button onClick={() => { setCurrentUser(null); onClose(); }}
                className="w-full py-3 bg-[#176a22] hover:bg-[#12551a] text-white font-bold text-sm rounded-xl transition-all shadow-sm">
                Vào Bảng điều khiển
              </button>
            </div>

          ) : authTab === 'login' ? (
            <LoginForm
              onSwitchTab={handleSwitchTab}
              onLoginSuccess={handleLoginSuccess}
              onForgotPassword={() => setIsForgotPasswordOpen(true)}
            />

          ) : registerStep === 'role-select' ? (
            <RegisterRoleSelect
              onSwitchTab={handleSwitchTab}
              onSelectRole={handleSelectRole}
            />

          ) : (
            <RegisterFormDetails
              role={selectedRole}
              onBack={() => setRegisterStep('role-select')}
              onRegisterSuccess={setCurrentUser}
              onSwitchTab={handleSwitchTab}
            />
          )}
        </div>

        {/* Footer */}
        {!currentUser && (
          <div className="px-6 py-3 bg-[#f1f5ea] border-t border-[#e0e4d9] text-center text-[11px] text-[#707a6c] shrink-0">
            Bằng cách tiếp tục, bạn đồng ý với{' '}
            <a href="#" onClick={e => e.preventDefault()} className="underline hover:text-[#181d16]">Điều khoản Dịch vụ</a>
            {' '}và{' '}
            <a href="#" onClick={e => e.preventDefault()} className="underline hover:text-[#181d16]">Chính sách Bảo mật</a> của chúng tôi.
          </div>
        )}
      </div>

      <ForgotPasswordModal isOpen={isForgotPasswordOpen} onClose={() => setIsForgotPasswordOpen(false)} />
    </div>
  );
};
