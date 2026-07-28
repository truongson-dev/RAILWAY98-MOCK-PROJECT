import React, { useState, useEffect } from 'react';
import { 
  X, 
  Upload, 
  Sparkles, 
  Mic, 
  Check, 
  ArrowLeft, 
  ArrowRight, 
  Info, 
  CheckCircle2, 
  MapPin, 
  Package, 
  ShieldCheck, 
  ShoppingBag,
  Volume2,
  Zap,
  RotateCcw,
  FileText,
  Trash2,
  Paperclip
} from 'lucide-react';
import { Product } from '../types';

interface AddProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddProduct: (product: Omit<Product, 'id'>) => void;
  editingProduct?: Product | null;
}

const PRESET_IMAGES = [
  { label: 'Cam Sành', url: 'https://images.unsplash.com/photo-1611080626919-7cf5a9dbab5b?auto=format&fit=crop&w=800&q=80' },
  { label: 'Sầu Riêng', url: 'https://images.unsplash.com/photo-1588615419955-5231362e6978?auto=format&fit=crop&w=800&q=80' },
  { label: 'Gạo / Lúa', url: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=800&q=80' },
  { label: 'Rau Củ Quả', url: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80' },
  { label: 'Xoài Cát', url: 'https://images.unsplash.com/photo-1553279768-865429fa0078?auto=format&fit=crop&w=800&q=80' },
  { label: 'Cà Phê / Hạt', url: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80' }
];

const SAMPLE_VOICE_PROMPTS = [
  "Tôi có 5 tấn Sầu Riêng Ri6 An Giang, giá 85.000đ/kg, chuẩn GlobalGAP, thu hoạch tuần sau",
  "Thêm 1200kg Cam Sành Tiền Giang giá 25.000 đồng một ký, tiêu chuẩn VietGAP",
  "Bán 2 tấn Gạo ST25 Sóc Trăng giá 32.000đ/kg chuẩn Hữu cơ sạch",
  "Cần đăng 800kg Xoài Cát Hòa Lộc Đồng Tháp giá 45.000 VNĐ/kg"
];

export const AddProductModal: React.FC<AddProductModalProps> = ({
  isOpen,
  onClose,
  onAddProduct,
  editingProduct
}) => {
  const [currentStep, setCurrentStep] = useState<number>(1);

  // Form Fields
  const [name, setName] = useState('');
  const [category, setCategory] = useState('Trái cây');
  const [price, setPrice] = useState('35000');
  const [unit, setUnit] = useState('kg');
  const [stockKg, setStockKg] = useState('500');
  const [origin, setOrigin] = useState('Tiền Giang');
  const [harvestDate, setHarvestDate] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState(PRESET_IMAGES[0].url);
  const [certifications, setCertifications] = useState<string[]>(['VietGAP']);
  
  // Certificate of Origin Files State
  interface OriginCertFile {
    id: string;
    name: string;
    size: string;
    type: string;
    uploadedAt: string;
    verified: boolean;
  }

  const [certificateFiles, setCertificateFiles] = useState<OriginCertFile[]>([
    {
      id: 'cert-1',
      name: 'Giay_Chung_Nhan_VietGAP_2024_TienGiang.pdf',
      size: '1.4 MB',
      type: 'pdf',
      uploadedAt: '25/07/2026',
      verified: true
    }
  ]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const newFiles = Array.from(files).map((file: File, idx: number) => ({
      id: `cert-${Date.now()}-${idx}`,
      name: file.name,
      size: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
      type: file.type.includes('pdf') ? 'pdf' : 'image',
      uploadedAt: new Date().toLocaleDateString('vi-VN'),
      verified: true
    }));

    setCertificateFiles(prev => [...prev, ...newFiles]);
    setAiSuccessFeedback(`Đã tải lên thành công ${newFiles.length} chứng nhận nguồn gốc!`);
    setTimeout(() => setAiSuccessFeedback(''), 3000);
  };

  const handleRemoveCertificate = (id: string) => {
    setCertificateFiles(prev => prev.filter(item => item.id !== id));
  };

  const handleAddSampleCertificate = (typeLabel: string) => {
    const sample = {
      id: `cert-${Date.now()}`,
      name: `Ho_So_Xac_Minh_${typeLabel.replace(/\s+/g, '_')}_2026.pdf`,
      size: '1.8 MB',
      type: 'pdf',
      uploadedAt: new Date().toLocaleDateString('vi-VN'),
      verified: true
    };
    setCertificateFiles(prev => [...prev, sample]);
    setAiSuccessFeedback(`Đã thêm ${typeLabel} vào hồ sơ nguồn gốc!`);
    setTimeout(() => setAiSuccessFeedback(''), 3000);
  };

  // AI Voice & Voice Prompt States
  const [isAiVoiceModalOpen, setIsAiVoiceModalOpen] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [voiceTextPrompt, setVoiceTextPrompt] = useState('');
  const [aiAnalysisResult, setAiAnalysisResult] = useState<any | null>(null);
  const [aiSuccessFeedback, setAiSuccessFeedback] = useState('');

  // Sync state when modal opens or editingProduct changes
  useEffect(() => {
    if (editingProduct) {
      setName(editingProduct.name);
      setCategory(editingProduct.category);
      setPrice(editingProduct.price.toString());
      setUnit(editingProduct.unit);
      setStockKg(editingProduct.stockKg.toString());
      setOrigin(editingProduct.origin);
      setDescription(editingProduct.description);
      setImageUrl(editingProduct.imageUrl);
      setCertifications(editingProduct.certifications || ['VietGAP']);
      setHarvestDate(editingProduct.harvestDate || '');
    } else {
      setName('Cam Sành Tiền Giang');
      setCategory('Trái cây');
      setPrice('25000');
      setUnit('kg');
      setStockKg('1200');
      setOrigin('Tiền Giang');
      setDescription('Cam Sành mọng nước, mỏng vỏ, ngọt đậm tự nhiên, được trồng theo mô hình chuẩn VietGAP an toàn tuyệt đối.');
      setImageUrl(PRESET_IMAGES[0].url);
      setCertifications(['VietGAP']);
      setHarvestDate('');
    }
    setCurrentStep(1);
    setAiSuccessFeedback('');
  }, [editingProduct, isOpen]);

  if (!isOpen) return null;

  // Toggle certification check
  const handleToggleCert = (cert: string) => {
    if (certifications.includes(cert)) {
      setCertifications(certifications.filter(c => c !== cert));
    } else {
      setCertifications([...certifications, cert]);
    }
  };

  // Submit Handler
  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!name.trim()) return;

    const stockNum = parseFloat(stockKg) || 0;
    let stockText = `Còn ${stockNum}kg`;
    if (stockNum >= 1000) {
      stockText = `Còn ${(stockNum / 1000).toFixed(1).replace('.0', '')} tấn`;
    }

    onAddProduct({
      name,
      category,
      price: parseFloat(price) || 0,
      unit,
      stockKg: stockNum,
      stockText,
      description: description || `Sản phẩm ${name} tươi ngon chất lượng cao từ trang trại ${origin}.`,
      imageUrl: imageUrl || PRESET_IMAGES[0].url,
      status: 'active',
      origin: origin || 'Việt Nam',
      certifications: certifications.length > 0 ? certifications : ['VietGAP'],
      harvestDate
    });

    onClose();
  };

  // AI Description Generator Button
  const handleAiSuggestDescription = () => {
    const certText = certifications.length > 0 ? certifications.join(' & ') : 'VietGAP';
    const generated = `Nông sản ${name || 'sạch'} hảo hạng thu hoạch tại ${origin || 'trang trại'}. Sản phẩm đạt chứng nhận ${certText}, quy trình canh tác an toàn, quả ngọt ngon đậm đà, không tồn dư hóa chất. Thích hợp cho thu mua số lượng lớn xuất khẩu hoặc siêu thị.`;
    setDescription(generated);
    setAiSuccessFeedback('Đã khởi tạo mô tả bằng AI thành công!');
    setTimeout(() => setAiSuccessFeedback(''), 3000);
  };

  // Simulate Voice AI Voice Assistant Processing
  const handleProcessVoiceInput = (promptText: string) => {
    setIsListening(true);
    setVoiceTextPrompt(promptText);

    setTimeout(() => {
      // Analyze text with simulated NLP rule extraction
      let parsedName = "Cam Sành Tiền Giang";
      let parsedCategory = "Trái cây";
      let parsedPrice = "25000";
      let parsedUnit = "kg";
      let parsedStock = "1000";
      let parsedOrigin = "Tiền Giang";
      let parsedCerts = ["VietGAP"];

      const lower = promptText.toLowerCase();

      if (lower.includes("sầu riêng")) {
        parsedName = "Sầu Riêng Ri6 An Giang";
        parsedCategory = "Trái cây";
        parsedPrice = "85000";
        parsedStock = "5000";
        parsedOrigin = "An Giang";
        parsedCerts = ["GlobalGAP", "VietGAP"];
        setImageUrl(PRESET_IMAGES[1].url);
      } else if (lower.includes("gạo") || lower.includes("st25")) {
        parsedName = "Gạo ST25 Sóc Trăng";
        parsedCategory = "Lúa gạo";
        parsedPrice = "32000";
        parsedStock = "2000";
        parsedOrigin = "Sóc Trăng";
        parsedCerts = ["Hữu cơ", "VietGAP"];
        setImageUrl(PRESET_IMAGES[2].url);
      } else if (lower.includes("xoài")) {
        parsedName = "Xoài Cát Hòa Lộc";
        parsedCategory = "Trái cây";
        parsedPrice = "45000";
        parsedStock = "800";
        parsedOrigin = "Đồng Tháp";
        parsedCerts = ["VietGAP"];
        setImageUrl(PRESET_IMAGES[4].url);
      } else if (lower.includes("cam")) {
        parsedName = "Cam Sành Tiền Giang";
        parsedCategory = "Trái cây";
        parsedPrice = "25000";
        parsedStock = "1200";
        parsedOrigin = "Tiền Giang";
        parsedCerts = ["VietGAP"];
        setImageUrl(PRESET_IMAGES[0].url);
      }

      // Price extraction attempt
      const priceMatch = promptText.match(/(\d+)[\.\,\s]*(ngàn|k|000|đồng|đ)/i);
      if (priceMatch) {
        let val = parseInt(priceMatch[1], 10);
        if (val < 1000) val = val * 1000;
        parsedPrice = val.toString();
      }

      // Stock extraction
      const stockMatch = promptText.match(/(\d+)\s*(tấn|kg|ký)/i);
      if (stockMatch) {
        let num = parseInt(stockMatch[1], 10);
        if (stockMatch[2].toLowerCase() === 'tấn') {
          num = num * 1000;
        }
        parsedStock = num.toString();
      }

      if (lower.includes("globalgap")) parsedCerts.push("GlobalGAP");
      if (lower.includes("hữu cơ") || lower.includes("organic")) parsedCerts.push("Hữu cơ");

      const result = {
        name: parsedName,
        category: parsedCategory,
        price: parsedPrice,
        unit: parsedUnit,
        stockKg: parsedStock,
        origin: parsedOrigin,
        certifications: Array.from(new Set(parsedCerts)),
        description: `Sản phẩm ${parsedName} thu hoạch tươi từ vùng trồng ${parsedOrigin}. Đạt chứng chỉ ${parsedCerts.join(', ')}, đáp ứng đầy đủ tiêu chuẩn thu mua khắt khe của thương lái và doanh nghiệp.`
      };

      setAiAnalysisResult(result);
      setIsListening(false);
    }, 1200);
  };

  const handleApplyAiResult = () => {
    if (!aiAnalysisResult) return;
    setName(aiAnalysisResult.name);
    setCategory(aiAnalysisResult.category);
    setPrice(aiAnalysisResult.price);
    setUnit(aiAnalysisResult.unit);
    setStockKg(aiAnalysisResult.stockKg);
    setOrigin(aiAnalysisResult.origin);
    setCertifications(aiAnalysisResult.certifications);
    setDescription(aiAnalysisResult.description);

    setIsAiVoiceModalOpen(false);
    setAiAnalysisResult(null);
    setVoiceTextPrompt('');
    setAiSuccessFeedback('AI đã điền đầy đủ thông tin nông sản vào form!');
    setTimeout(() => setAiSuccessFeedback(''), 4000);
  };

  const formattedPrice = (parseFloat(price) || 0).toLocaleString('vi-VN');
  const stockNum = parseFloat(stockKg) || 0;
  const formattedStockText = stockNum >= 1000 ? `${(stockNum / 1000).toFixed(1).replace('.0', '')} tấn` : `${stockNum} kg`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-3 sm:p-5 overflow-y-auto">
      <div className="bg-[#f7fbf0] w-full max-w-5xl rounded-2xl shadow-2xl border border-[#e0e4d9] overflow-hidden my-4 flex flex-col max-h-[92vh] animate-in fade-in zoom-in-95 duration-200">
        
        {/* Top Header */}
        <div className="bg-white px-6 py-4 border-b border-[#e0e4d9] flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#176a22]/10 text-[#176a22] flex items-center justify-center font-bold">
              <Package size={22} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-[#176a22] flex items-center gap-2">
                {editingProduct ? 'Sửa Thông Tin Nông Sản' : 'Thêm Nông Sản Mới Lên Sàn AgriConnect'}
              </h2>
              <p className="text-xs text-[#5e6958] mt-0.5">
                Đăng tải nông sản trực tiếp đến thương lái & hệ thống chuỗi siêu thị đối tác.
              </p>
            </div>
          </div>

          <button 
            onClick={onClose}
            className="p-2 text-[#5e6958] hover:text-[#ba1a1a] rounded-xl hover:bg-[#ebefe4] transition-colors cursor-pointer"
            aria-label="Đóng"
          >
            <X size={20} />
          </button>
        </div>

        {/* Multi-step Progress Bar Stepper (3 Steps) */}
        <div className="bg-[#ebefe4] px-6 py-3.5 border-b border-[#e0e4d9] flex items-center justify-between shrink-0 relative overflow-x-auto">
          <div className="absolute h-[2px] bg-[#c0cabc] left-28 right-28 top-1/2 -translate-y-1/2 z-0 hidden sm:block" />
          
          {/* Step 1 Indicator */}
          <button 
            type="button"
            onClick={() => setCurrentStep(1)}
            className={`flex items-center gap-2.5 z-10 text-xs font-bold px-4 py-2 rounded-full transition-all cursor-pointer ${
              currentStep === 1 
                ? 'bg-[#176a22] text-white shadow-sm ring-2 ring-[#176a22]/30' 
                : currentStep > 1 
                ? 'bg-[#358439] text-white' 
                : 'bg-white text-[#40493d] border border-[#bfcaba] hover:bg-[#f7fbf0]'
            }`}
          >
            <span className={`w-5 h-5 rounded-full flex items-center justify-center font-bold text-[11px] ${
              currentStep === 1 ? 'bg-white/25 text-white' : currentStep > 1 ? 'bg-white/30 text-white' : 'bg-[#e0e4d9] text-[#5e6958]'
            }`}>
              {currentStep > 1 ? <Check size={12} /> : '1'}
            </span>
            <span>1. Thông tin cơ bản</span>
          </button>

          {/* Step 2 Indicator */}
          <button 
            type="button"
            onClick={() => setCurrentStep(2)}
            className={`flex items-center gap-2.5 z-10 text-xs font-bold px-4 py-2 rounded-full transition-all cursor-pointer ${
              currentStep === 2 
                ? 'bg-[#176a22] text-white shadow-sm ring-2 ring-[#176a22]/30' 
                : currentStep > 2 
                ? 'bg-[#358439] text-white' 
                : 'bg-white text-[#40493d] border border-[#bfcaba] hover:bg-[#f7fbf0]'
            }`}
          >
            <span className={`w-5 h-5 rounded-full flex items-center justify-center font-bold text-[11px] ${
              currentStep === 2 ? 'bg-white/25 text-white' : currentStep > 2 ? 'bg-white/30 text-white' : 'bg-[#e0e4d9] text-[#5e6958]'
            }`}>
              {currentStep > 2 ? <Check size={12} /> : '2'}
            </span>
            <span>2. Giá & Kho hàng</span>
          </button>

          {/* Step 3 Indicator */}
          <button 
            type="button"
            onClick={() => setCurrentStep(3)}
            className={`flex items-center gap-2.5 z-10 text-xs font-bold px-4 py-2 rounded-full transition-all cursor-pointer ${
              currentStep === 3 
                ? 'bg-[#176a22] text-white shadow-sm ring-2 ring-[#176a22]/30' 
                : 'bg-white text-[#40493d] border border-[#bfcaba] hover:bg-[#f7fbf0]'
            }`}
          >
            <span className={`w-5 h-5 rounded-full flex items-center justify-center font-bold text-[11px] ${
              currentStep === 3 ? 'bg-white/25 text-white' : 'bg-[#e0e4d9] text-[#5e6958]'
            }`}>
              3
            </span>
            <span>3. Chứng nhận & Ảnh</span>
          </button>
        </div>

        {/* Success Alert Banner */}
        {aiSuccessFeedback && (
          <div className="bg-[#c9ecc1] px-6 py-2.5 text-[#176a22] text-xs font-bold flex items-center justify-between border-b border-[#358439]/20 animate-in slide-in-from-top duration-300">
            <span className="flex items-center gap-2">
              <CheckCircle2 size={16} />
              {aiSuccessFeedback}
            </span>
            <button onClick={() => setAiSuccessFeedback('')} className="text-[#176a22] hover:opacity-80">
              <X size={14} />
            </button>
          </div>
        )}

        {/* Main Content Area: Split 2 columns (Form on left, Marketplace Live Preview on right) */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Left Column: Form Inputs (7 cols) */}
          <div className="lg:col-span-7 bg-white p-5 sm:p-6 rounded-2xl border border-[#e0e4d9] shadow-xs flex flex-col justify-between space-y-5">
            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* STEP 1: Basic Information */}
              {currentStep === 1 && (
                <div className="space-y-4 animate-in fade-in duration-200">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-2 border-b border-[#e0e4d9]">
                    <div>
                      <h3 className="font-bold text-[#181d16] text-base">1. Thông tin cơ bản</h3>
                      <p className="text-xs text-[#5e6958]">Điền tên nông sản và chọn danh mục phù hợp.</p>
                    </div>

                    {/* AI Voice Assistant Trigger Button */}
                    <button
                      type="button"
                      onClick={() => setIsAiVoiceModalOpen(true)}
                      className="px-3.5 py-2 bg-[#176a22] hover:bg-[#12541b] text-white rounded-xl text-xs font-bold flex items-center gap-2 shadow-xs transition-all animate-pulse"
                    >
                      <Mic size={15} className="text-[#a3f69c]" />
                      <span>Đăng bằng giọng nói AI</span>
                      <Sparkles size={14} className="text-[#a3f69c]" />
                    </button>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#181d16] mb-1">
                      Tên sản phẩm / Nông sản *
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Ví dụ: Cam Sành Tiền Giang, Sầu Riêng Ri6..."
                      className="w-full px-3.5 py-2.5 bg-[#f7fbf0] border border-[#bfcaba] focus:border-[#176a22] focus:bg-white rounded-xl text-sm font-semibold text-[#181d16] outline-none transition-all"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-[#181d16] mb-1">Danh mục *</label>
                      <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="w-full px-3.5 py-2.5 bg-[#f7fbf0] border border-[#bfcaba] focus:border-[#176a22] focus:bg-white rounded-xl text-sm font-medium text-[#181d16] outline-none"
                      >
                        <option value="Trái cây">Trái cây</option>
                        <option value="Lúa gạo">Lúa gạo</option>
                        <option value="Rau củ">Rau củ</option>
                        <option value="Nông sản khô">Nông sản khô</option>
                        <option value="Thủy sản">Thủy sản</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#181d16] mb-1">Xuất xứ / Vùng trồng *</label>
                      <input
                        type="text"
                        value={origin}
                        onChange={(e) => setOrigin(e.target.value)}
                        placeholder="Ví dụ: Tiền Giang, An Giang, Đắk Lắk"
                        className="w-full px-3.5 py-2.5 bg-[#f7fbf0] border border-[#bfcaba] focus:border-[#176a22] focus:bg-white rounded-xl text-sm font-medium text-[#181d16] outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="block text-xs font-bold text-[#181d16]">Mô tả ngắn cho thương lái *</label>
                      <button
                        type="button"
                        onClick={handleAiSuggestDescription}
                        className="text-xs text-[#176a22] font-bold hover:underline flex items-center gap-1 bg-[#f1f5ea] px-2.5 py-1 rounded-lg border border-[#358439]/20"
                      >
                        <Sparkles size={13} className="text-[#176a22]" />
                        <span>Gợi ý mô tả AI</span>
                      </button>
                    </div>
                    <textarea
                      rows={3}
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Nhập đặc điểm nổi bật, độ tươi ngọt, quy trình chăm sóc..."
                      className="w-full p-3 bg-[#f7fbf0] border border-[#bfcaba] focus:border-[#176a22] focus:bg-white rounded-xl text-sm text-[#181d16] outline-none"
                    />
                  </div>
                </div>
              )}

              {/* STEP 2: Price & Inventory */}
              {currentStep === 2 && (
                <div className="space-y-4 animate-in fade-in duration-200">
                  <div className="pb-2 border-b border-[#e0e4d9]">
                    <h3 className="font-bold text-[#181d16] text-base">2. Giá & Kho hàng</h3>
                    <p className="text-xs text-[#5e6958]">Thiết lập mức giá thu mua và sản lượng ước tính.</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-[#181d16] mb-1">Đơn giá bán (VNĐ) *</label>
                      <input
                        type="number"
                        required
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        placeholder="Ví dụ: 25000"
                        className="w-full px-3.5 py-2.5 bg-[#f7fbf0] border border-[#bfcaba] focus:border-[#176a22] focus:bg-white rounded-xl text-sm font-bold text-[#176a22] outline-none"
                      />
                      <p className="text-[11px] text-[#5e6958] mt-1">
                        Hiển thị: <strong className="text-[#176a22]">{formattedPrice} VNĐ / {unit}</strong>
                      </p>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#181d16] mb-1">Đơn vị tính *</label>
                      <select
                        value={unit}
                        onChange={(e) => setUnit(e.target.value)}
                        className="w-full px-3.5 py-2.5 bg-[#f7fbf0] border border-[#bfcaba] focus:border-[#176a22] focus:bg-white rounded-xl text-sm font-medium text-[#181d16] outline-none"
                      >
                        <option value="kg">kg (Kilôgam)</option>
                        <option value="tấn">tấn</option>
                        <option value="thùng">thùng</option>
                        <option value="bao">bao / bao tải</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-[#181d16] mb-1">Số lượng sẵn có (kg) *</label>
                      <input
                        type="number"
                        required
                        value={stockKg}
                        onChange={(e) => setStockKg(e.target.value)}
                        placeholder="Ví dụ: 1200"
                        className="w-full px-3.5 py-2.5 bg-[#f7fbf0] border border-[#bfcaba] focus:border-[#176a22] focus:bg-white rounded-xl text-sm font-semibold text-[#181d16] outline-none"
                      />
                      <p className="text-[11px] text-[#5e6958] mt-1">
                        Quy đổi: <strong className="text-[#181d16]">{formattedStockText}</strong>
                      </p>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#181d16] mb-1">Ngày dự kiến thu hoạch</label>
                      <input
                        type="date"
                        value={harvestDate}
                        onChange={(e) => setHarvestDate(e.target.value)}
                        className="w-full px-3.5 py-2.5 bg-[#f7fbf0] border border-[#bfcaba] focus:border-[#176a22] focus:bg-white rounded-xl text-sm text-[#181d16] outline-none"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 3: Certification & Images */}
              {currentStep === 3 && (
                <div className="space-y-4 animate-in fade-in duration-200">
                  <div className="pb-2 border-b border-[#e0e4d9]">
                    <h3 className="font-bold text-[#181d16] text-base">3. Chứng nhận & Nguồn gốc</h3>
                    <p className="text-xs text-[#5e6958]">Chọn mẫu ảnh nông sản tươi và chọn chứng chỉ uy tín.</p>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#181d16] mb-2">
                      Chọn hình ảnh mẫu đẹp mắt hoặc dán URL ảnh
                    </label>
                    <div className="grid grid-cols-3 gap-2 mb-3">
                      {PRESET_IMAGES.map((img, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => setImageUrl(img.url)}
                          className={`p-1.5 rounded-xl border text-left transition-all overflow-hidden flex flex-col items-center gap-1 ${
                            imageUrl === img.url 
                              ? 'border-[#176a22] bg-[#f1f5ea] ring-2 ring-[#176a22]/30' 
                              : 'border-[#bfcaba] bg-white hover:bg-[#f7fbf0]'
                          }`}
                        >
                          <img src={img.url} alt={img.label} className="w-full h-12 object-cover rounded-lg" />
                          <span className="text-[11px] font-semibold text-[#181d16] truncate">{img.label}</span>
                        </button>
                      ))}
                    </div>

                    <div className="flex gap-2">
                      <input
                        type="url"
                        value={imageUrl}
                        onChange={(e) => setImageUrl(e.target.value)}
                        placeholder="https://..."
                        className="flex-1 px-3 py-2 bg-[#f7fbf0] border border-[#bfcaba] focus:border-[#176a22] rounded-xl text-xs text-[#181d16] outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#181d16] mb-2">Chứng chỉ nông nghiệp chất lượng</label>
                    <div className="grid grid-cols-3 gap-2">
                      {['VietGAP', 'GlobalGAP', 'Hữu cơ'].map((cert) => {
                        const isChecked = certifications.includes(cert);
                        return (
                          <button
                            key={cert}
                            type="button"
                            onClick={() => handleToggleCert(cert)}
                            className={`p-3 rounded-xl border text-xs font-bold flex items-center justify-between transition-all cursor-pointer ${
                              isChecked
                                ? 'bg-[#176a22] text-white border-[#176a22]'
                                : 'bg-[#f7fbf0] text-[#181d16] border-[#bfcaba] hover:bg-[#e0e4d9]'
                            }`}
                          >
                            <span>{cert}</span>
                            {isChecked && <Check size={14} />}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Section: Upload Chứng nhận nguồn gốc / Mã số vùng trồng */}
                  <div className="space-y-2 pt-2 border-t border-[#e0e4d9]">
                    <div className="flex justify-between items-center">
                      <label className="block text-xs font-bold text-[#181d16] flex items-center gap-1.5">
                        <Paperclip size={15} className="text-[#176a22]" />
                        <span>Tải lên chứng nhận nguồn gốc & Mã số vùng trồng</span>
                      </label>
                      <span className="text-[10px] text-[#5e6958]">PDF, PNG, JPG (Tối đa 10MB)</span>
                    </div>

                    {/* File Upload Drop Area */}
                    <div className="relative border-2 border-dashed border-[#176a22]/40 hover:border-[#176a22] bg-[#f7fbf0] hover:bg-[#f1f5ea] rounded-2xl p-4 text-center transition-all cursor-pointer group">
                      <input
                        type="file"
                        multiple
                        accept="image/*,.pdf"
                        onChange={handleFileUpload}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                      />
                      <div className="flex flex-col items-center justify-center gap-1.5">
                        <div className="w-10 h-10 rounded-full bg-[#176a22]/10 flex items-center justify-center text-[#176a22] group-hover:scale-110 transition-transform">
                          <Upload size={20} />
                        </div>
                        <p className="text-xs font-bold text-[#181d16]">
                          Kéo thả tài liệu chứng nhận vào đây hoặc <span className="text-[#176a22] underline">Chọn file từ máy</span>
                        </p>
                        <p className="text-[11px] text-[#5e6958]">
                          Giấy chứng nhận VietGAP, GlobalGAP, Mã số vùng trồng (MSVT), Xét nghiệm tồn dư BVTV
                        </p>
                      </div>
                    </div>

                    {/* Quick Add Sample Certificate Buttons */}
                    <div className="flex flex-wrap items-center gap-1.5 pt-1">
                      <span className="text-[11px] text-[#5e6958] font-semibold">Tải mẫu nhanh:</span>
                      <button
                        type="button"
                        onClick={() => handleAddSampleCertificate('VietGAP')}
                        className="text-[11px] bg-[#e0e4d9] hover:bg-[#358439] hover:text-white text-[#181d16] font-bold px-2.5 py-1 rounded-lg transition-colors cursor-pointer"
                      >
                        + Mẫu VietGAP
                      </button>
                      <button
                        type="button"
                        onClick={() => handleAddSampleCertificate('Mã Số Vùng Trồng MSVT')}
                        className="text-[11px] bg-[#e0e4d9] hover:bg-[#358439] hover:text-white text-[#181d16] font-bold px-2.5 py-1 rounded-lg transition-colors cursor-pointer"
                      >
                        + Mẫu Mã Số Vùng Trồng
                      </button>
                    </div>

                    {/* List of Uploaded Certificate Files */}
                    {certificateFiles.length > 0 && (
                      <div className="space-y-1.5 pt-1">
                        <span className="text-[11px] font-bold text-[#181d16] block">
                          Tài liệu chứng nhận đã đính kèm ({certificateFiles.length}):
                        </span>
                        <div className="space-y-1.5 max-h-36 overflow-y-auto pr-1">
                          {certificateFiles.map((file) => (
                            <div
                              key={file.id}
                              className="flex items-center justify-between p-2.5 bg-white border border-[#d0d6c7] rounded-xl shadow-2xs hover:border-[#176a22] transition-all"
                            >
                              <div className="flex items-center gap-2.5 min-w-0 pr-2">
                                <div className="p-2 bg-[#f1f5ea] text-[#176a22] rounded-lg shrink-0">
                                  <FileText size={16} />
                                </div>
                                <div className="min-w-0">
                                  <p className="text-xs font-bold text-[#181d16] truncate leading-tight">
                                    {file.name}
                                  </p>
                                  <div className="flex items-center gap-2 mt-0.5 text-[10px] text-[#5e6958]">
                                    <span>{file.size}</span>
                                    <span>•</span>
                                    <span>{file.uploadedAt}</span>
                                    <span className="bg-[#c9ecc1] text-[#176a22] font-black px-1.5 py-0.2 rounded-full flex items-center gap-0.5">
                                      <CheckCircle2 size={10} /> Đã xác thực AI
                                    </span>
                                  </div>
                                </div>
                              </div>

                              <button
                                type="button"
                                onClick={() => handleRemoveCertificate(file.id)}
                                className="p-1.5 text-[#5e6958] hover:text-[#ba1a1a] rounded-lg hover:bg-[#f1f5ea] cursor-pointer transition-colors"
                                title="Xóa tài liệu"
                              >
                                <Trash2 size={15} />
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </form>

            {/* Stepper Navigation Buttons */}
            <div className="pt-4 border-t border-[#e0e4d9] flex items-center justify-between">
              {currentStep > 1 ? (
                <button
                  type="button"
                  onClick={() => setCurrentStep(prev => prev - 1)}
                  className="px-4 py-2 border border-[#bfcaba] text-[#181d16] rounded-xl text-xs font-bold hover:bg-[#f1f5ea] flex items-center gap-1.5 transition-colors"
                >
                  <ArrowLeft size={16} /> Quay lại
                </button>
              ) : (
                <div />
              )}

              <div className="flex items-center gap-2">
                {currentStep < 3 ? (
                  <button
                    type="button"
                    onClick={() => setCurrentStep(prev => prev + 1)}
                    className="px-5 py-2.5 bg-[#176a22] hover:bg-[#12541b] text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-xs transition-all"
                  >
                    <span>Tiếp tục</span>
                    <ArrowRight size={16} />
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => handleSubmit()}
                    className="px-6 py-2.5 bg-[#358439] hover:bg-[#176a22] text-white rounded-xl text-xs font-extrabold flex items-center gap-2 shadow-md transition-all cursor-pointer"
                  >
                    <CheckCircle2 size={16} />
                    <span>{editingProduct ? 'Cập Nhật Nông Sản' : 'Đăng Bán Sản Phẩm'}</span>
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Right Column: Marketplace Live Preview Card (5 cols) */}
          <div className="lg:col-span-5 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[#5e6958] uppercase tracking-wider flex items-center gap-1">
                <ShoppingBag size={14} className="text-[#176a22]" />
                Xem trước bài đăng trên sàn
              </span>
              <span className="text-[10px] bg-[#c9ecc1] text-[#176a22] px-2 py-0.5 rounded-full font-bold">
                Trực tiếp
              </span>
            </div>

            {/* Product Card Preview Container */}
            <div className="bg-white rounded-2xl border border-[#e0e4d9] shadow-md overflow-hidden transition-all duration-300">
              {/* Product Card Header Image */}
              <div className="relative h-48 sm:h-52 w-full overflow-hidden bg-[#e0e4d9]">
                <img 
                  src={imageUrl || PRESET_IMAGES[0].url} 
                  alt={name || "Mẫu nông sản"} 
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                
                {/* Badges Overlay */}
                <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                  <span className="bg-[#bc5478] text-white px-2.5 py-0.5 rounded-full text-[11px] font-bold shadow-xs">
                    Mới
                  </span>
                  {certifications.map((cert) => (
                    <span key={cert} className="bg-[#176a22] text-white px-2.5 py-0.5 rounded-full text-[11px] font-bold shadow-xs flex items-center gap-1">
                      <ShieldCheck size={12} /> {cert}
                    </span>
                  ))}
                </div>
              </div>

              {/* Card Body */}
              <div className="p-4 space-y-3">
                <div className="flex justify-between items-start gap-2">
                  <div>
                    <span className="text-[11px] font-bold text-[#176a22] uppercase tracking-wider">
                      {category}
                    </span>
                    <h4 className="text-base font-extrabold text-[#181d16] leading-tight mt-0.5">
                      {name || "Tên nông sản của bạn"}
                    </h4>
                  </div>
                  <div className="text-right shrink-0">
                    <div className="text-base font-black text-[#176a22]">
                      {formattedPrice} VNĐ
                    </div>
                    <div className="text-[11px] text-[#5e6958]">
                      / {unit}
                    </div>
                  </div>
                </div>

                <p className="text-xs text-[#5e6958] line-clamp-3 bg-[#f7fbf0] p-2.5 rounded-xl border border-[#e0e4d9] italic">
                  "{description || 'Mô tả nông sản sẽ xuất hiện tại đây giúp thương lái dễ dàng tìm kiếm và đánh giá chất lượng sản phẩm.'}"
                </p>

                <div className="pt-2 border-t border-[#e0e4d9] flex items-center justify-between text-xs text-[#5e6958]">
                  <div className="flex items-center gap-1 font-semibold text-[#181d16]">
                    <Package size={14} className="text-[#176a22]" />
                    <span>{formattedStockText}</span>
                  </div>

                  <div className="flex items-center gap-1">
                    <MapPin size={14} className="text-[#176a22]" />
                    <span>{origin || 'Việt Nam'}</span>
                  </div>
                </div>

                {certificateFiles.length > 0 && (
                  <div className="bg-[#f1f5ea] p-2 rounded-xl border border-[#358439]/30 flex items-center gap-2 text-[11px] text-[#176a22] font-bold">
                    <FileText size={14} className="shrink-0" />
                    <span className="truncate">Hồ sơ nguồn gốc: {certificateFiles.map(f => f.name).join(', ')}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Verification Note */}
            <div className="bg-[#f1f5ea] p-3 rounded-xl border border-[#d0d6c7] flex items-start gap-2 text-xs text-[#40493d]">
              <Info size={16} className="text-[#176a22] shrink-0 mt-0.5" />
              <p>
                Sản phẩm sẽ được đội ngũ <strong>AgriConnect</strong> ưu tiên duyệt và công khai tới <strong>500+ thương lái</strong> trong vòng 24 giờ.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive AI Voice & Prompt Assistant Modal */}
      {isAiVoiceModalOpen && (
        <div className="fixed inset-0 z-60 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
          <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl border border-[#e0e4d9] overflow-hidden animate-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="bg-[#176a22] p-4 text-white flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                  <Sparkles size={18} className="text-[#a3f69c]" />
                </div>
                <div>
                  <h3 className="font-bold text-sm">Trợ lý AI Đăng Nông Sản Bằng Giọng Nói</h3>
                  <p className="text-[11px] opacity-80">Nói hoặc dán câu miêu tả nông sản để AI tự điền form</p>
                </div>
              </div>

              <button 
                onClick={() => setIsAiVoiceModalOpen(false)}
                className="text-white/80 hover:text-white p-1"
              >
                <X size={18} />
              </button>
            </div>

            <div className="p-5 space-y-4">
              {/* Listening Animation / Voice Input Status */}
              <div className="bg-[#f7fbf0] p-4 rounded-xl border border-[#bfcaba] text-center space-y-3">
                <div className="flex items-center justify-center gap-1.5 h-8">
                  <span className={`w-1.5 bg-[#176a22] rounded-full transition-all ${isListening ? 'h-8 animate-bounce' : 'h-3'}`} />
                  <span className={`w-1.5 bg-[#176a22] rounded-full transition-all ${isListening ? 'h-6 animate-bounce delay-75' : 'h-4'}`} />
                  <span className={`w-1.5 bg-[#176a22] rounded-full transition-all ${isListening ? 'h-10 animate-bounce delay-150' : 'h-2'}`} />
                  <span className={`w-1.5 bg-[#176a22] rounded-full transition-all ${isListening ? 'h-5 animate-bounce delay-100' : 'h-4'}`} />
                </div>

                <p className="text-xs font-semibold text-[#181d16] italic">
                  {isListening ? "Đang phân tích giọng nói..." : voiceTextPrompt ? `"${voiceTextPrompt}"` : "Chọn mẫu câu giọng nói hoặc tự nhập câu bên dưới:"}
                </p>
              </div>

              {/* Sample Voice Prompts for Farmers */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-[#181d16] flex items-center gap-1">
                  <Volume2 size={13} className="text-[#176a22]" />
                  <span>Bấm thử mẫu giọng nói của bà con nông dân:</span>
                </label>
                <div className="space-y-1.5 max-h-36 overflow-y-auto pr-1">
                  {SAMPLE_VOICE_PROMPTS.map((sample, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handleProcessVoiceInput(sample)}
                      className="w-full text-left p-2.5 rounded-xl border border-[#e0e4d9] bg-white hover:bg-[#f1f5ea] hover:border-[#176a22] text-xs text-[#181d16] transition-all flex items-center justify-between group"
                    >
                      <span className="truncate pr-2 font-medium">"{sample}"</span>
                      <Zap size={13} className="text-[#176a22] opacity-0 group-hover:opacity-100 shrink-0" />
                    </button>
                  ))}
                </div>
              </div>

              {/* Text Prompt Input */}
              <div>
                <label className="block text-xs font-bold text-[#181d16] mb-1">
                  Hoặc tự nhập câu giọng nói của bạn:
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={voiceTextPrompt}
                    onChange={(e) => setVoiceTextPrompt(e.target.value)}
                    placeholder="VD: Bán 1 tấn Cam Sành Tiền Giang giá 25000/kg VietGAP..."
                    className="flex-1 p-2.5 bg-[#f7fbf0] border border-[#bfcaba] focus:border-[#176a22] rounded-xl text-xs outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => handleProcessVoiceInput(voiceTextPrompt || SAMPLE_VOICE_PROMPTS[0])}
                    className="px-3.5 py-2.5 bg-[#176a22] text-white rounded-xl text-xs font-bold shrink-0 hover:bg-[#12541b]"
                  >
                    Phân tích
                  </button>
                </div>
              </div>

              {/* AI Parsed Results Preview */}
              {aiAnalysisResult && (
                <div className="bg-[#f1f5ea] p-3.5 rounded-xl border border-[#358439]/30 space-y-2 animate-in fade-in duration-200">
                  <div className="flex items-center justify-between text-xs text-[#176a22] font-bold">
                    <span>Kết quả AI trích xuất thành công:</span>
                    <CheckCircle2 size={16} />
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-xs text-[#181d16]">
                    <div>Tên: <strong>{aiAnalysisResult.name}</strong></div>
                    <div>Giá: <strong>{(parseInt(aiAnalysisResult.price)).toLocaleString()} VNĐ/{aiAnalysisResult.unit}</strong></div>
                    <div>Sản lượng: <strong>{aiAnalysisResult.stockKg} kg</strong></div>
                    <div>Xuất xứ: <strong>{aiAnalysisResult.origin}</strong></div>
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className="pt-2 flex gap-2">
                <button
                  type="button"
                  onClick={() => setIsAiVoiceModalOpen(false)}
                  className="flex-1 py-2 border border-[#bfcaba] text-[#5e6958] rounded-xl text-xs font-semibold hover:bg-[#f1f5ea]"
                >
                  Đóng
                </button>
                <button
                  type="button"
                  disabled={!aiAnalysisResult}
                  onClick={handleApplyAiResult}
                  className={`flex-1 py-2 text-white rounded-xl text-xs font-bold shadow-xs transition-all flex items-center justify-center gap-1.5 ${
                    aiAnalysisResult ? 'bg-[#176a22] hover:bg-[#12541b]' : 'bg-[#bfcaba] cursor-not-allowed'
                  }`}
                >
                  <Sparkles size={14} />
                  <span>Áp dụng vào Form</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
