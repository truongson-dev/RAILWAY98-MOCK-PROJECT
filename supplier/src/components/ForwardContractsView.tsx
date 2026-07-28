import React, { useState } from 'react';
import { 
  Handshake, 
  Plus, 
  ShieldCheck, 
  Building2, 
  FileCheck, 
  Clock, 
  TrendingUp, 
  DollarSign, 
  Scale, 
  Search, 
  Filter, 
  CheckCircle2, 
  XCircle, 
  PhoneCall, 
  FileText, 
  ChevronRight,
  ChevronLeft,
  Send,
  Calendar,
  Sparkles,
  Info,
  Lock,
  Sprout,
  BarChart3,
  CalendarDays,
  Edit2,
  AlertTriangle,
  Upload,
  Trash2,
  Camera,
  ArrowRight,
  Check
} from 'lucide-react';
import { ForwardContractRequest } from '../types';

export interface CultivationStage {
  id: string;
  name: string;
  status: 'completed' | 'in_progress' | 'pending';
  progressPercent: number;
  notes: string;
  expectedEndDate: string;
}

export interface ContractCultivationData {
  overallProgress: number;
  stages: CultivationStage[];
  proofImages: string[];
}

interface ForwardContractsViewProps {
  onOpenUpdateSeasonModal: () => void;
  triggerToast?: (msg: string) => void;
}

interface CropPlanItem {
  id: string;
  cropName: string;
  plotName: string;
  areaHa: number;
  stageName: string;
  progressPercent: number;
  harvestWindow: string;
  expectedYield: string;
  status: 'Đang chăm sóc' | 'Sắp thu hoạch' | 'Đang phát triển';
  statusColor: 'green' | 'pink' | 'gray';
  imageUrl: string;
  startDate: string;
  endDate: string;
  barColor: string;
  monthCategory: string;
  daysRemaining: number;
}

export const ForwardContractsView: React.FC<ForwardContractsViewProps> = ({
  onOpenUpdateSeasonModal,
  triggerToast
}) => {
  const [activeMainTab, setActiveMainTab] = useState<'contracts' | 'plans' | 'timeline'>('contracts');
  const [activeStatusTab, setActiveStatusTab] = useState<'all' | 'pending' | 'accepted' | 'completed' | 'rejected'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCropFilter, setSelectedCropFilter] = useState('all');

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  // Crop plans for Kế hoạch chi tiết
  const [cropPlans, setCropPlans] = useState<CropPlanItem[]>([
    {
      id: 'crop-1',
      cropName: 'Sầu riêng Ri6 VietGAP',
      plotName: 'Lô A2 - 2.5 Hecta',
      areaHa: 2.5,
      stageName: 'CHĂM SÓC TRÁI',
      progressPercent: 75,
      harvestWindow: '15/10 - 20/10/2026',
      expectedYield: 'Quy mô: 5.0 Tấn',
      status: 'Đang chăm sóc',
      statusColor: 'green',
      imageUrl: 'https://images.unsplash.com/photo-1586771107445-d3ca888129ff?auto=format&fit=crop&w=200&q=80',
      startDate: '2026-10-15',
      endDate: '2026-10-20',
      barColor: 'bg-[#176a22]',
      monthCategory: 'Tháng 10',
      daysRemaining: 28
    },
    {
      id: 'crop-2',
      cropName: 'Cà phê Robusta Chín Cây',
      plotName: 'Lô B1 - 5.0 Hecta',
      areaHa: 5.0,
      stageName: 'CHÍN RỘ',
      progressPercent: 95,
      harvestWindow: '12/11 - 18/11/2026',
      expectedYield: 'Quy mô: 12.0 Tấn',
      status: 'Sắp thu hoạch',
      statusColor: 'pink',
      imageUrl: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=200&q=80',
      startDate: '2026-11-12',
      endDate: '2026-11-18',
      barColor: 'bg-[#8d2a4c]',
      monthCategory: 'Tháng 11',
      daysRemaining: 14
    },
    {
      id: 'crop-3',
      cropName: 'Xoài Cát Hòa Lộc',
      plotName: 'Vườn Xoài C1 - 1.8 Hecta',
      areaHa: 1.8,
      stageName: 'TẠO TÁN & DƯỠNG TRÁI',
      progressPercent: 60,
      harvestWindow: '05/09 - 15/09/2026',
      expectedYield: 'Quy mô: 4.5 Tấn',
      status: 'Đang chăm sóc',
      statusColor: 'green',
      imageUrl: 'https://images.unsplash.com/photo-1553279768-865429fa0078?auto=format&fit=crop&w=200&q=80',
      startDate: '2026-09-05',
      endDate: '2026-09-15',
      barColor: 'bg-[#176a22]',
      monthCategory: 'Tháng 09',
      daysRemaining: 40
    },
    {
      id: 'crop-4',
      cropName: 'Bưởi Da Xanh Bến Tre',
      plotName: 'Lô C2 - 3.2 Hecta',
      areaHa: 3.2,
      stageName: 'GIEO TRỒNG & DƯỠNG',
      progressPercent: 35,
      harvestWindow: '01/12 - 10/12/2026',
      expectedYield: 'Quy mô: 8.0 Tấn',
      status: 'Đang phát triển',
      statusColor: 'gray',
      imageUrl: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=200&q=80',
      startDate: '2026-12-01',
      endDate: '2026-12-10',
      barColor: 'bg-[#176a22]',
      monthCategory: 'Tháng 12',
      daysRemaining: 75
    },
    {
      id: 'crop-5',
      cropName: 'Gạo ST25 Chuẩn Lúa Tôm',
      plotName: 'Ruộng Lúa Tôm D1 - 4.0 Hecta',
      areaHa: 4.0,
      stageName: 'TRỖ BÔNG & CHÍN VÀNG',
      progressPercent: 88,
      harvestWindow: '25/08 - 30/08/2026',
      expectedYield: 'Quy mô: 15.0 Tấn',
      status: 'Sắp thu hoạch',
      statusColor: 'pink',
      imageUrl: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=200&q=80',
      startDate: '2026-08-25',
      endDate: '2026-08-30',
      barColor: 'bg-[#8d2a4c]',
      monthCategory: 'Tháng 08',
      daysRemaining: 8
    }
  ]);

  // Initial Contracts Data
  const [contracts, setContracts] = useState<ForwardContractRequest[]>([
    {
      id: 'fc-101',
      cropPlanId: 'crop-1',
      cropName: 'Sầu Riêng Ri6 VietGAP',
      plotName: 'Lô A2 - 2.5 Hecta',
      buyerName: 'Trần Văn Minh',
      buyerCompany: 'VinaFood Export Co., Ltd',
      buyerPhone: '0912 345 678',
      requestedQuantityTons: 5.0,
      proposedPriceVnd: 88000,
      depositPercent: 20,
      expectedDeliveryDate: '2026-10-15',
      notes: 'Thương lượng ký bao tiêu toàn bộ 5.0 Tấn Sầu riêng Ri6 vụ thu hoạch tới. Đã nạp 88 triệu cọc vào ví Escrow.',
      status: 'accepted',
      createdAt: '20 phút trước',
      certifications: ['VietGAP', 'OCOP 4 sao']
    },
    {
      id: 'fc-102',
      cropPlanId: 'crop-2',
      cropName: 'Cà Phê Robusta Chín Cây',
      plotName: 'Lô B1 - 5.0 Hecta',
      buyerName: 'Lê Hoàng Hải',
      buyerCompany: 'Global Beans Sourcing',
      buyerPhone: '0903 888 999',
      requestedQuantityTons: 12.0,
      proposedPriceVnd: 118000,
      depositPercent: 25,
      expectedDeliveryDate: '2026-11-20',
      notes: 'Yêu cầu độ chín quả > 95%. Đề xuất cọc 25% giá trị hợp đồng ngay khi hai bên xác nhận.',
      status: 'pending',
      createdAt: '1 giờ trước',
      certifications: ['GlobalGAP', 'Rainforest Alliance']
    },
    {
      id: 'fc-103',
      cropPlanId: 'crop-3',
      cropName: 'Xoài Cát Hòa Lộc',
      plotName: 'Vườn Xoài C1 - 1.8 Hecta',
      buyerName: 'Nguyễn Thị Bích',
      buyerCompany: 'Công Ty Nông Sản Siêu Thị Co.op',
      buyerPhone: '0987 654 321',
      requestedQuantityTons: 4.5,
      proposedPriceVnd: 62000,
      depositPercent: 20,
      expectedDeliveryDate: '2026-09-05',
      notes: 'Bao tiêu cung ứng hệ thống siêu thị miền Nam. Yêu cầu có mã vùng trồng xuất khẩu.',
      status: 'accepted',
      createdAt: '3 giờ trước',
      certifications: ['VietGAP']
    },
    {
      id: 'fc-104',
      cropPlanId: 'crop-4',
      cropName: 'Bưởi Da Xanh Bến Tre',
      plotName: 'Lô C2 - 3.2 Hecta',
      buyerName: 'Phạm Quốc Cường',
      buyerCompany: 'Mekong Agri Export',
      buyerPhone: '0934 112 233',
      requestedQuantityTons: 8.0,
      proposedPriceVnd: 45000,
      depositPercent: 15,
      expectedDeliveryDate: '2026-12-01',
      notes: 'Đặt mua làm quà biếu đợt Tết. Hàng chuẩn size từ 1.2kg - 1.8kg.',
      status: 'pending',
      createdAt: '5 giờ trước',
      certifications: ['VietGAP', 'Organic']
    },
    {
      id: 'fc-105',
      cropPlanId: 'crop-5',
      cropName: 'Gạo ST25 Chuẩn Lúa Tôm',
      plotName: 'Ruộng Lúa Tôm D1 - 4.0 Hecta',
      buyerName: 'Đặng Thái Hòa',
      buyerCompany: 'Tập Đoàn Lúa Gạo Việt',
      buyerPhone: '0918 777 666',
      requestedQuantityTons: 15.0,
      proposedPriceVnd: 32000,
      depositPercent: 30,
      expectedDeliveryDate: '2026-08-30',
      notes: 'Đã hoàn tất thanh toán cọc 30% và nghiệm thu vụ lúa đạt chuẩn hữu cơ.',
      status: 'completed',
      createdAt: '2 ngày trước',
      certifications: ['Organic', 'HACCP']
    }
  ]);

  // Modal State: Create Proposal
  const [isNewProposalModalOpen, setIsNewProposalModalOpen] = useState(false);
  const [cropNameInput, setCropNameInput] = useState('Sầu Riêng Ri6 VietGAP');
  const [plotNameInput, setPlotNameInput] = useState('Lô A2 - 2.5 Hecta');
  const [buyerNameInput, setBuyerNameInput] = useState('Nguyễn Văn Tuấn');
  const [buyerCompanyInput, setBuyerCompanyInput] = useState('Hệ Thống Bách Hóa Xanh');
  const [buyerPhoneInput, setBuyerPhoneInput] = useState('0909 123 456');
  const [quantityTonsInput, setQuantityTonsInput] = useState<number>(6.0);
  const [priceVndInput, setPriceVndInput] = useState<string>('90.000');
  const [depositPercentInput, setDepositPercentInput] = useState<number>(20);
  const [deliveryDateInput, setDeliveryDateInput] = useState<string>('2026-10-30');
  const [notesInput, setNotesInput] = useState<string>('Thương lượng hợp đồng bao tiêu thu hoạch vụ tới, thanh toán 20% tiền cọc qua ví Escrow.');

  // Notification & Roadmap Modals
  const [selectedContractDetail, setSelectedContractDetail] = useState<ForwardContractRequest | null>(null);

  // Initial Cultivation Roadmaps per contract ID
  const defaultRoadmaps: Record<string, ContractCultivationData> = {
    'fc-101': {
      overallProgress: 35,
      stages: [
        {
          id: 'st-1',
          name: 'Đặt cọc, Gieo trồng & Chăm sóc VietGAP (Đã gộp 3 bước)',
          status: 'in_progress',
          progressPercent: 75,
          notes: 'Hoàn tất cọc 20%, gieo sạ mạ non và chăm sóc dinh dưỡng đợt 1 & 2 theo chuẩn VietGAP.',
          expectedEndDate: '2026-10-25'
        },
        {
          id: 'st-2',
          name: 'Kiểm tra chất lượng & Quyết toán (80%)',
          status: 'pending',
          progressPercent: 0,
          notes: 'Đánh giá sản lượng thực tế, kiểm định tồn dư thuốc BVTV và giải ngân 80% hợp đồng.',
          expectedEndDate: '2026-11-10'
        },
        {
          id: 'st-3',
          name: 'Thu hoạch, Vận chuyển & Bàn giao',
          status: 'pending',
          progressPercent: 0,
          notes: 'Thu hoạch nông sản tập trung, đóng gói và vận chuyển bàn giao tới kho đối tác.',
          expectedEndDate: '2026-11-25'
        }
      ],
      proofImages: [
        'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=400&q=80',
        'https://images.unsplash.com/photo-1586771107445-d3ca888129ff?auto=format&fit=crop&w=400&q=80',
        'https://images.unsplash.com/photo-1592417817098-8f3d6ef23a81?auto=format&fit=crop&w=400&q=80'
      ]
    },
    'fc-102': {
      overallProgress: 20,
      stages: [
        {
          id: 'st-1',
          name: 'Tưới nước & Bón phân đợt 1 VietGAP',
          status: 'in_progress',
          progressPercent: 60,
          notes: 'Tiến hành tỉa cành, làm cỏ và tưới nước giữ ẩm định kỳ cho vườn cà phê.',
          expectedEndDate: '2026-11-01'
        },
        {
          id: 'st-2',
          name: 'Sơ chế & Kiểm định độ chín quả (80%)',
          status: 'pending',
          progressPercent: 0,
          notes: 'Kiểm tra tỷ lệ chín trên 95% trước khi bắt đầu hái chọn lọc.',
          expectedEndDate: '2026-11-15'
        },
        {
          id: 'st-3',
          name: 'Phơi sấy & Bàn giao kho đối tác',
          status: 'pending',
          progressPercent: 0,
          notes: 'Phơi trên giàn cao đạt độ ẩm < 12.5% trước khi đóng bao xuất kho.',
          expectedEndDate: '2026-11-30'
        }
      ],
      proofImages: [
        'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=400&q=80',
        'https://images.unsplash.com/photo-1586771107445-d3ca888129ff?auto=format&fit=crop&w=400&q=80'
      ]
    },
    'fc-103': {
      overallProgress: 60,
      stages: [
        {
          id: 'st-1',
          name: 'Bao trái xoài & Quản lý sâu bệnh',
          status: 'completed',
          progressPercent: 100,
          notes: 'Hoàn thành bọc 100% trái bằng túi chuyên dụng chống ruồi vàng.',
          expectedEndDate: '2026-08-20'
        },
        {
          id: 'st-2',
          name: 'Tích đường & Kiểm tra kích thước trái',
          status: 'in_progress',
          progressPercent: 80,
          notes: 'Trái đạt trọng lượng trung bình 450g - 550g, màu da đẹp.',
          expectedEndDate: '2026-09-01'
        },
        {
          id: 'st-3',
          name: 'Thu hoạch & Đóng gói siêu thị',
          status: 'pending',
          progressPercent: 0,
          notes: 'Hái thủ công bằng sào, dán tem OCOP / VietGAP.',
          expectedEndDate: '2026-09-10'
        }
      ],
      proofImages: [
        'https://images.unsplash.com/photo-1553279768-865429fa0078?auto=format&fit=crop&w=400&q=80',
        'https://images.unsplash.com/photo-1592417817098-8f3d6ef23a81?auto=format&fit=crop&w=400&q=80'
      ]
    },
    'fc-104': {
      overallProgress: 15,
      stages: [
        {
          id: 'st-1',
          name: 'Dưỡng trái & Phòng chống thâm quả',
          status: 'in_progress',
          progressPercent: 45,
          notes: 'Đang phun vi lượng bổ sung canxi giúp vỏ bưởi bóng mượt.',
          expectedEndDate: '2026-11-15'
        },
        {
          id: 'st-2',
          name: 'Kiểm tra độ ngọt Brix & Chất lượng',
          status: 'pending',
          progressPercent: 0,
          notes: 'Đo độ ngọt Brix đạt tiêu chuẩn quà biếu từ 11.5 - 12.5.',
          expectedEndDate: '2026-11-25'
        },
        {
          id: 'st-3',
          name: 'Thu hoạch & Dán tem Tết',
          status: 'pending',
          progressPercent: 0,
          notes: 'Đóng hộp quà tặng cao cấp giao đối tác.',
          expectedEndDate: '2026-12-05'
        }
      ],
      proofImages: [
        'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=400&q=80'
      ]
    },
    'fc-105': {
      overallProgress: 100,
      stages: [
        {
          id: 'st-1',
          name: 'Gieo sạ lúa tôm & Chăm sóc sinh học',
          status: 'completed',
          progressPercent: 100,
          notes: 'Lúa phát triển xanh tốt trên nền đất nuôi tôm hữu cơ.',
          expectedEndDate: '2026-07-20'
        },
        {
          id: 'st-2',
          name: 'Trỗ bông & Chín vàng đồng',
          status: 'completed',
          progressPercent: 100,
          notes: 'Lúa chín đều 98%, bông dài hạt mẩy.',
          expectedEndDate: '2026-08-15'
        },
        {
          id: 'st-3',
          name: 'Gặt đập liên hợp & Bàn giao kho',
          status: 'completed',
          progressPercent: 100,
          notes: 'Đã hoàn tất bàn giao 15.0 tấn lúa tươi tại ruộng.',
          expectedEndDate: '2026-08-30'
        }
      ],
      proofImages: [
        'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=400&q=80'
      ]
    }
  };

  const [cultivationRoadmaps, setCultivationRoadmaps] = useState<Record<string, ContractCultivationData>>(defaultRoadmaps);
  const [selectedContractRoadmap, setSelectedContractRoadmap] = useState<ForwardContractRequest | null>(null);

  // Editing Stage state
  const [editingStage, setEditingStage] = useState<{
    contractId: string;
    stageId: string;
    name: string;
    status: 'completed' | 'in_progress' | 'pending';
    progressPercent: number;
    notes: string;
    expectedEndDate: string;
  } | null>(null);

  // Helper to get or generate roadmap
  const getContractRoadmap = (contractId: string): ContractCultivationData => {
    if (cultivationRoadmaps[contractId]) {
      return cultivationRoadmaps[contractId];
    }
    return {
      overallProgress: 10,
      stages: [
        {
          id: 'st-1',
          name: 'Đặt cọc & Bắt đầu chăm sóc vụ mới',
          status: 'in_progress',
          progressPercent: 30,
          notes: 'Đang theo dõi quy trình sinh trưởng và lập nhật ký nông hộ.',
          expectedEndDate: '2026-10-30'
        },
        {
          id: 'st-2',
          name: 'Nghiệm thu chất lượng & Giải ngân đợt 2',
          status: 'pending',
          progressPercent: 0,
          notes: 'Kiểm tra tồn dư thuốc BVTV và chất lượng nông sản trước khi thu hoạch.',
          expectedEndDate: '2026-11-15'
        },
        {
          id: 'st-3',
          name: 'Thu hoạch & Vận chuyển bàn giao',
          status: 'pending',
          progressPercent: 0,
          notes: 'Giao hàng đúng sản lượng và tiêu chuẩn quy định.',
          expectedEndDate: '2026-11-30'
        }
      ],
      proofImages: [
        'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=400&q=80'
      ]
    };
  };

  // Save stage update handler
  const handleSaveStageUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingStage) return;

    const { contractId, stageId, status, progressPercent, notes, expectedEndDate } = editingStage;
    const currentRoadmap = getContractRoadmap(contractId);

    const updatedStages = currentRoadmap.stages.map(st => {
      if (st.id === stageId) {
        return {
          ...st,
          status,
          progressPercent,
          notes,
          expectedEndDate
        };
      }
      return st;
    });

    // Calculate overall progress percentage
    let totalPct = 0;
    updatedStages.forEach(st => {
      if (st.status === 'completed') totalPct += 100;
      else if (st.status === 'in_progress') totalPct += st.progressPercent;
    });
    const calculatedOverall = Math.round(totalPct / updatedStages.length);

    setCultivationRoadmaps(prev => ({
      ...prev,
      [contractId]: {
        ...currentRoadmap,
        overallProgress: calculatedOverall,
        stages: updatedStages
      }
    }));

    setEditingStage(null);
    if (triggerToast) triggerToast('Đã cập nhật tiến độ giai đoạn canh tác thành công!');
  };

  // Upload photo handler
  const handleFileUpload = (contractId: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (uploadEvent) => {
        const imageUrl = uploadEvent.target?.result as string;
        if (imageUrl) {
          const currentRoadmap = getContractRoadmap(contractId);
          setCultivationRoadmaps(prev => ({
            ...prev,
            [contractId]: {
              ...currentRoadmap,
              proofImages: [imageUrl, ...currentRoadmap.proofImages]
            }
          }));
          if (triggerToast) triggerToast('Đã tải lên hình ảnh minh chứng thực địa mới!');
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Delete proof image
  const handleDeleteImage = (contractId: string, imgIdx: number) => {
    const currentRoadmap = getContractRoadmap(contractId);
    const updatedImages = currentRoadmap.proofImages.filter((_, idx) => idx !== imgIdx);
    setCultivationRoadmaps(prev => ({
      ...prev,
      [contractId]: {
        ...currentRoadmap,
        proofImages: updatedImages
      }
    }));
    if (triggerToast) triggerToast('Đã xóa hình ảnh minh chứng!');
  };

  const handleUpdateStatus = (id: string, newStatus: 'accepted' | 'rejected') => {
    setContracts(prev => prev.map(c => c.id === id ? { ...c, status: newStatus } : c));
    const msg = newStatus === 'accepted' ? 'Đã chấp nhận Hợp Đồng Tương Lai & Khóa Tiền Cọc Escrow!' : 'Đã từ chối đề xuất thương lượng!';
    if (triggerToast) triggerToast(msg);
  };

  const handleCreateNewProposal = (e: React.FormEvent) => {
    e.preventDefault();
    const priceNum = parseInt(priceVndInput.replace(/\D/g, ''), 10) || 85000;
    const newContract: ForwardContractRequest = {
      id: `fc-${Date.now()}`,
      cropPlanId: `crop-${Date.now()}`,
      cropName: cropNameInput,
      plotName: plotNameInput,
      buyerName: buyerNameInput,
      buyerCompany: buyerCompanyInput,
      buyerPhone: buyerPhoneInput,
      requestedQuantityTons: Number(quantityTonsInput) || 3,
      proposedPriceVnd: priceNum,
      depositPercent: Number(depositPercentInput) || 20,
      expectedDeliveryDate: deliveryDateInput || '2026-10-15',
      notes: notesInput,
      status: 'pending',
      createdAt: 'Vừa xong',
      certifications: ['VietGAP']
    };

    setContracts(prev => [newContract, ...prev]);
    setIsNewProposalModalOpen(false);
    if (triggerToast) triggerToast(`Đã tạo đề xuất Hợp đồng Tương lai cho "${cropNameInput}" thành công!`);
  };

  // Filter Logic
  const filteredContracts = contracts.filter(c => {
    if (activeStatusTab !== 'all' && c.status !== activeStatusTab) return false;
    if (selectedCropFilter !== 'all' && !c.cropName.toLowerCase().includes(selectedCropFilter.toLowerCase())) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        c.cropName.toLowerCase().includes(q) ||
        c.buyerCompany.toLowerCase().includes(q) ||
        c.buyerName.toLowerCase().includes(q) ||
        c.plotName.toLowerCase().includes(q)
      );
    }
    return true;
  });

  // Pagination calculations
  const totalPages = Math.ceil(filteredContracts.length / itemsPerPage) || 1;
  const paginatedContracts = filteredContracts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // KPI calculations
  const totalContractsCount = contracts.length;
  const totalTons = contracts.reduce((acc, c) => acc + c.requestedQuantityTons, 0);
  const totalValueVnd = contracts.reduce((acc, c) => acc + (c.requestedQuantityTons * 1000 * c.proposedPriceVnd), 0);
  const totalEscrowDepositVnd = contracts
    .filter(c => c.status === 'accepted' || c.status === 'completed')
    .reduce((acc, c) => acc + ((c.requestedQuantityTons * 1000 * c.proposedPriceVnd) * (c.depositPercent / 100)), 0);

  return (
    <div className="space-y-6 animate-in fade-in duration-200 pb-12">
      
      {/* HEADER BAR */}
      <div className="bg-white rounded-2xl border border-[#e0e4d9] p-6 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="p-2.5 bg-[#c9ecc1] text-[#176a22] rounded-xl shadow-2xs">
              <Handshake size={26} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-extrabold text-[#181d16] tracking-tight">
                  Quản Lý Hợp Đồng Tương Lai (Forward Contracts)
                </h1>
                <span className="px-2.5 py-0.5 bg-[#176a22] text-white font-black text-xs rounded-full">
                  Bao Tiêu Vụ Mùa
                </span>
              </div>
              <p className="text-xs text-[#5e6958] font-medium mt-0.5">
                Chốt sản lượng & giá bao tiêu trước khi thu hoạch • Bảo chứng tiền cọc qua ví Escrow AgriConnect
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={onOpenUpdateSeasonModal}
            className="px-4 py-2.5 bg-[#176a22] hover:bg-[#12541b] active:bg-[#0e4315] text-white font-bold text-xs sm:text-sm rounded-xl transition-colors cursor-pointer flex items-center gap-2 shadow-2xs"
          >
            <Calendar size={17} />
            <span>Đăng Lịch Sản Xuất</span>
          </button>
        </div>
      </div>

      {/* TAB 1: CONTRACTS VIEW */}
      <div className="space-y-6">
          {/* SEARCH & TAB FILTERS */}
          <div className="bg-white rounded-2xl border border-[#e0e4d9] p-4 shadow-2xs space-y-4">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
              
              {/* Status Tabs */}
              <div className="flex items-center gap-1 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
                {[
                  { id: 'all', label: 'Tất cả', count: contracts.length },
                  { id: 'pending', label: 'Chờ Phản Hồi', count: contracts.filter(c => c.status === 'pending').length },
                  { id: 'accepted', label: 'Đã Ký Chốt', count: contracts.filter(c => c.status === 'accepted').length },
                  { id: 'completed', label: 'Đã Hoàn Tất', count: contracts.filter(c => c.status === 'completed').length },
                  { id: 'rejected', label: 'Đã Từ Chối', count: contracts.filter(c => c.status === 'rejected').length },
                ].map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => {
                      setActiveStatusTab(tab.id as any);
                      setCurrentPage(1);
                    }}
                    className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
                      activeStatusTab === tab.id
                        ? 'bg-[#176a22] text-white shadow-2xs'
                        : 'bg-[#f1f5ea] text-[#5e6958] hover:bg-[#e0e8d6] hover:text-[#181d16]'
                    }`}
                  >
                    <span>{tab.label}</span>
                    <span className={`px-1.5 py-0.2 rounded-full text-[10px] ${
                      activeStatusTab === tab.id ? 'bg-white/20 text-white' : 'bg-[#e0e4d9] text-[#40493d]'
                    }`}>
                      {tab.count}
                    </span>
                  </button>
                ))}
              </div>

              {/* Search Bar */}
              <div className="relative min-w-[240px]">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#5e6958]" size={16} />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setCurrentPage(1);
                  }}
                  placeholder="Tìm theo nông sản, công ty, thương lái..."
                  className="w-full h-9 pl-9 pr-3.5 bg-[#f8faf5] border border-[#d0d6c7] rounded-xl text-xs focus:ring-2 focus:ring-[#176a22] focus:bg-white outline-none"
                />
              </div>

            </div>
          </div>
        </div>

      {/* CONTRACT CARDS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredContracts.length === 0 ? (
          <div className="col-span-full bg-white rounded-2xl border border-[#e0e4d9] p-12 text-center space-y-3">
            <Handshake size={40} className="mx-auto text-[#a3f69c]" />
            <h3 className="font-extrabold text-base text-[#181d16]">Không tìm thấy hợp đồng tương lai phù hợp</h3>
            <p className="text-xs text-[#5e6958]">Thử thay đổi từ khóa tìm kiếm hoặc bấm nút "Tạo Đề Xuất Bao Tiêu" để bắt đầu thương lượng mới.</p>
          </div>
        ) : (
          paginatedContracts.map((contract) => {
            const totalValue = contract.requestedQuantityTons * 1000 * contract.proposedPriceVnd;
            const depositAmount = totalValue * (contract.depositPercent / 100);
            const contractRoadmap = getContractRoadmap(contract.id);

            return (
              <div 
                key={contract.id} 
                className="bg-white rounded-2xl border border-[#e0e4d9] p-5 shadow-2xs hover:border-[#a3f69c] transition-all space-y-4 relative flex flex-col justify-between group"
              >
                {/* Card Top Header */}
                <div className="space-y-2">
                  <div className="flex items-start justify-between gap-2 border-b border-[#e0e4d9] pb-3">
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <button
                          onClick={() => setSelectedContractRoadmap(contract)}
                          className="font-extrabold text-base text-[#181d16] hover:text-[#176a22] transition-colors text-left cursor-pointer"
                        >
                          {contract.cropName}
                        </button>
                        <span className="text-[11px] font-semibold text-[#5e6958] bg-[#ebefe4] px-2.5 py-0.5 rounded-lg border border-[#e0e4d9]">
                          {contract.plotName}
                        </span>
                      </div>

                      {/* Certifications badges */}
                      {contract.certifications && contract.certifications.length > 0 && (
                        <div className="flex items-center gap-1.5 mt-1.5">
                          {contract.certifications.map(cert => (
                            <span key={cert} className="px-2 py-0.5 bg-[#c9ecc1] text-[#176a22] font-extrabold text-[10px] rounded-md border border-[#a3f69c]">
                              {cert}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    <span className={`px-3 py-1 rounded-full text-xs font-extrabold whitespace-nowrap ${
                      contract.status === 'accepted' 
                        ? 'bg-[#c9ecc1] text-[#176a22] border border-[#a3f69c]'
                        : contract.status === 'completed'
                        ? 'bg-[#e0f2fe] text-[#0369a1] border border-[#bae6fd]'
                        : contract.status === 'rejected'
                        ? 'bg-[#ffd9d9] text-[#ba1a1a] border border-[#ffb4b4]'
                        : 'bg-[#ffedb3] text-[#855400] border border-[#fde047]'
                    }`}>
                      {contract.status === 'accepted' ? 'Đã Chốt - Đang Canh Tác' :
                       contract.status === 'completed' ? 'Đã Hoàn Tất Giao Mùa' :
                       contract.status === 'rejected' ? 'Đã Từ Chối' : 'Chờ Nông Dân Phản Hồi'}
                    </span>
                  </div>

                  {/* Cultivation Progress Indicator Bar */}
                  <div 
                    onClick={() => setSelectedContractRoadmap(contract)}
                    className="bg-[#f0f6ea] hover:bg-[#e4f0dc] p-2.5 rounded-xl border border-[#c9ecc1] transition-all cursor-pointer space-y-1"
                  >
                    <div className="flex justify-between items-center text-xs font-bold">
                      <span className="text-[#176a22] flex items-center gap-1">
                        <Sprout size={14} /> Tiến độ trồng trọt:
                      </span>
                      <span className="text-[#176a22] font-black">{contractRoadmap.overallProgress}%</span>
                    </div>
                    <div className="w-full h-1.5 bg-[#e0e4d9] rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-[#176a22] rounded-full transition-all"
                        style={{ width: `${contractRoadmap.overallProgress}%` }}
                      />
                    </div>
                  </div>

                  {/* Buyer details */}
                  <div className="bg-[#f8faf5] p-3 rounded-xl border border-[#e0e4d9] flex items-center justify-between text-xs">
                    <div className="space-y-0.5">
                      <div className="font-extrabold text-[#181d16] flex items-center gap-1.5">
                        <Building2 size={15} className="text-[#176a22]" />
                        <span>{contract.buyerCompany}</span>
                      </div>
                      <div className="text-[#5e6958] text-[11px]">
                        Đại diện: <strong className="text-[#40493d]">{contract.buyerName}</strong> &bull; SĐT: <strong className="text-[#176a22]">{contract.buyerPhone}</strong>
                      </div>
                    </div>

                    <a 
                      href={`tel:${contract.buyerPhone}`}
                      className="p-2 bg-white text-[#176a22] hover:bg-[#c9ecc1] rounded-lg border border-[#d0d6c7] transition-all cursor-pointer shadow-2xs"
                      title="Gọi điện trao đổi"
                    >
                      <PhoneCall size={16} />
                    </a>
                  </div>

                  {/* Contract Pricing Grid */}
                  <div className="grid grid-cols-3 gap-2 bg-[#f0f6ea] p-3 rounded-xl border border-[#c9ecc1]/60 text-xs">
                    <div>
                      <div className="text-[10px] text-[#5e6958] font-bold">Sản lượng bao tiêu</div>
                      <div className="font-black text-sm text-[#181d16] mt-0.5">{contract.requestedQuantityTons} Tấn</div>
                    </div>
                    <div>
                      <div className="text-[10px] text-[#5e6958] font-bold">Giá chốt cố định</div>
                      <div className="font-black text-sm text-[#176a22] mt-0.5">{contract.proposedPriceVnd.toLocaleString('vi-VN')} đ/kg</div>
                    </div>
                    <div>
                      <div className="text-[10px] text-[#5e6958] font-bold">Đặt cọc Escrow ({contract.depositPercent}%)</div>
                      <div className="font-black text-sm text-[#176a22] mt-0.5">{(depositAmount / 1000000).toFixed(1)} Tr VNĐ</div>
                    </div>
                  </div>

                  {/* Total Contract Value & Date */}
                  <div className="flex items-center justify-between text-xs px-1 text-[#40493d]">
                    <span>Tổng giá trị HĐ: <strong className="text-[#176a22] font-extrabold">{(totalValue / 1000000).toLocaleString('vi-VN')} Triệu VNĐ</strong></span>
                    <span className="flex items-center gap-1 text-[#5e6958]">
                      <Calendar size={13} /> Dự kiến thu hoạch: <strong className="text-[#181d16]">{contract.expectedDeliveryDate}</strong>
                    </span>
                  </div>

                  {/* Notes */}
                  <p className="text-xs text-[#5e6958] italic bg-[#ebefe4]/60 p-2.5 rounded-xl border border-[#e0e4d9]/60 leading-relaxed">
                    "{contract.notes}"
                  </p>
                </div>

                {/* Card Actions Bottom Bar */}
                <div className="pt-3 border-t border-[#e0e4d9] flex items-center justify-end gap-2">
                  <div className="flex items-center gap-2">
                    {contract.status === 'pending' && (
                      <>
                        <button
                          onClick={() => handleUpdateStatus(contract.id, 'rejected')}
                          className="px-3 py-1.5 text-[#ba1a1a] hover:bg-[#ffd9d9] rounded-xl font-bold transition-all cursor-pointer text-xs border border-transparent hover:border-[#ffb4b4]"
                        >
                          Từ Chối
                        </button>
                        <button
                          onClick={() => handleUpdateStatus(contract.id, 'accepted')}
                          className="px-3.5 py-1.5 bg-[#176a22] hover:bg-[#12541b] text-white rounded-xl font-extrabold transition-all cursor-pointer text-xs shadow-2xs flex items-center gap-1.5"
                        >
                          <FileCheck size={15} /> Chấp Nhận & Khóa Cọc
                        </button>
                      </>
                    )}

                    {contract.status === 'accepted' && (
                      <span className="text-xs font-black text-[#176a22] flex items-center gap-1 bg-[#c9ecc1] px-3 py-1 rounded-lg">
                        <ShieldCheck size={15} /> Đã Bảo Chứng Escrow
                      </span>
                    )}

                    {contract.status === 'completed' && (
                      <span className="text-xs font-bold text-[#0369a1] flex items-center gap-1 bg-[#e0f2fe] px-3 py-1 rounded-lg">
                        <CheckCircle2 size={15} /> Đã Bàn Giao Xong
                      </span>
                    )}
                  </div>
                </div>

              </div>
            );
          })
        )}
      </div>

      {/* PAGINATION CONTROLS FOR CONTRACTS */}
      {filteredContracts.length > 0 && totalPages > 1 && (
        <div className="bg-white rounded-2xl border border-[#e0e4d9] p-4 shadow-2xs flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-semibold text-[#5e6958]">
          <div>
            Hiển thị <span className="font-extrabold text-[#181d16]">{(currentPage - 1) * itemsPerPage + 1}</span> - <span className="font-extrabold text-[#181d16]">{Math.min(currentPage * itemsPerPage, filteredContracts.length)}</span> trên <span className="font-extrabold text-[#181d16]">{filteredContracts.length}</span> hợp đồng
          </div>
          <div className="flex items-center gap-1.5">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
              className="px-3 py-1.5 bg-[#f4f6f0] hover:bg-[#e0e4d9] disabled:opacity-40 disabled:hover:bg-[#f4f6f0] text-[#181d16] rounded-xl transition-all cursor-pointer disabled:cursor-not-allowed flex items-center gap-1 font-bold"
            >
              <ChevronLeft size={16} /> Trang trước
            </button>
            <div className="flex items-center gap-1 px-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`w-8 h-8 rounded-xl font-extrabold transition-all cursor-pointer ${
                    currentPage === page
                      ? 'bg-[#176a22] text-white shadow-2xs'
                      : 'bg-[#f4f6f0] text-[#5e6958] hover:bg-[#e0e4d9]'
                  }`}
                >
                  {page}
                </button>
              ))}
            </div>
            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
              className="px-3 py-1.5 bg-[#f4f6f0] hover:bg-[#e0e4d9] disabled:opacity-40 disabled:hover:bg-[#f4f6f0] text-[#181d16] rounded-xl transition-all cursor-pointer disabled:cursor-not-allowed flex items-center gap-1 font-bold"
            >
              Trang sau <ChevronRight size={16} />
            </button>
          </div>
        </div>
      )}

      {/* MODAL: TẠO ĐỀ XUẤT HỢP ĐỒNG MỚI */}
      {isNewProposalModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-[#e0e4d9] space-y-4 animate-in zoom-in-95 duration-150">
            
            <div className="flex justify-between items-center border-b border-[#e0e4d9] pb-3">
              <div className="flex items-center gap-2 text-[#176a22]">
                <Handshake size={24} />
                <h3 className="font-extrabold text-base text-[#181d16]">
                  Tạo Đề Xuất Hợp Đồng Bao Tiêu Tương Lai
                </h3>
              </div>
              <button 
                onClick={() => setIsNewProposalModalOpen(false)} 
                className="text-[#5e6958] hover:text-[#ba1a1a] cursor-pointer p-1 rounded-lg hover:bg-[#f1f5ea]"
              >
                <XCircle size={20} />
              </button>
            </div>

            <form onSubmit={handleCreateNewProposal} className="space-y-3 text-xs text-[#181d16]">
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-bold text-[#40493d]">Loại Nông Sản</label>
                  <input
                    type="text"
                    required
                    value={cropNameInput}
                    onChange={(e) => setCropNameInput(e.target.value)}
                    placeholder="Sầu Riêng Ri6 VietGAP"
                    className="w-full h-10 px-3 bg-[#f8faf5] border border-[#d0d6c7] rounded-xl outline-none focus:ring-2 focus:ring-[#176a22]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-[#40493d]">Vườn / Lô Đất Canh Tác</label>
                  <input
                    type="text"
                    required
                    value={plotNameInput}
                    onChange={(e) => setPlotNameInput(e.target.value)}
                    placeholder="Lô A2 - 2.5 Hecta"
                    className="w-full h-10 px-3 bg-[#f8faf5] border border-[#d0d6c7] rounded-xl outline-none focus:ring-2 focus:ring-[#176a22]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-bold text-[#40493d]">Công Ty / Thương Lái Mua</label>
                  <input
                    type="text"
                    required
                    value={buyerCompanyInput}
                    onChange={(e) => setBuyerCompanyInput(e.target.value)}
                    placeholder="Hệ Thống Siêu Thị Co.opMart"
                    className="w-full h-10 px-3 bg-[#f8faf5] border border-[#d0d6c7] rounded-xl outline-none focus:ring-2 focus:ring-[#176a22]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-[#40493d]">Số Điện Thoại Liên Hệ</label>
                  <input
                    type="text"
                    required
                    value={buyerPhoneInput}
                    onChange={(e) => setBuyerPhoneInput(e.target.value)}
                    placeholder="0912 345 678"
                    className="w-full h-10 px-3 bg-[#f8faf5] border border-[#d0d6c7] rounded-xl outline-none focus:ring-2 focus:ring-[#176a22]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div className="space-y-1">
                  <label className="font-bold text-[#40493d]">Sản Lượng (Tấn)</label>
                  <input
                    type="number"
                    step="0.1"
                    required
                    value={quantityTonsInput}
                    onChange={(e) => setQuantityTonsInput(Number(e.target.value))}
                    className="w-full h-10 px-3 bg-[#f8faf5] border border-[#d0d6c7] rounded-xl outline-none focus:ring-2 focus:ring-[#176a22]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-[#40493d]">Giá Chốt (VNĐ/kg)</label>
                  <input
                    type="text"
                    required
                    value={priceVndInput}
                    onChange={(e) => setPriceVndInput(e.target.value)}
                    placeholder="85.000"
                    className="w-full h-10 px-3 bg-[#f8faf5] border border-[#d0d6c7] rounded-xl outline-none focus:ring-2 focus:ring-[#176a22]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-[#40493d]">Tiền Cọc (%)</label>
                  <input
                    type="number"
                    required
                    value={depositPercentInput}
                    onChange={(e) => setDepositPercentInput(Number(e.target.value))}
                    className="w-full h-10 px-3 bg-[#f8faf5] border border-[#d0d6c7] rounded-xl outline-none focus:ring-2 focus:ring-[#176a22]"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-[#40493d]">Ngày Dự Kiến Thu Hoạch & Giao Hàng</label>
                <input
                  type="date"
                  required
                  value={deliveryDateInput}
                  onChange={(e) => setDeliveryDateInput(e.target.value)}
                  className="w-full h-10 px-3 bg-[#f8faf5] border border-[#d0d6c7] rounded-xl outline-none focus:ring-2 focus:ring-[#176a22]"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-[#40493d]">Ghi Chú Điều Khoản Mua Bán</label>
                <textarea
                  rows={2}
                  value={notesInput}
                  onChange={(e) => setNotesInput(e.target.value)}
                  className="w-full p-2.5 bg-[#f8faf5] border border-[#d0d6c7] rounded-xl outline-none focus:ring-2 focus:ring-[#176a22]"
                />
              </div>

              <div className="flex gap-3 pt-3 border-t border-[#e0e4d9]">
                <button
                  type="button"
                  onClick={() => setIsNewProposalModalOpen(false)}
                  className="flex-1 py-2.5 bg-white border border-[#d0d6c7] hover:bg-[#f1f5ea] text-[#40493d] rounded-xl font-bold text-xs cursor-pointer"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 bg-[#176a22] hover:bg-[#12541b] text-white rounded-xl font-extrabold text-xs shadow-xs cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <Send size={15} />
                  <span>Gửi Đề Xuất Hợp Đồng</span>
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

      {/* MODAL: CHI TIẾT HỢP ĐỒNG */}
      {selectedContractDetail && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-xl w-full p-6 shadow-2xl border border-[#e0e4d9] space-y-4 animate-in zoom-in-95 duration-150">
            
            <div className="flex justify-between items-center border-b border-[#e0e4d9] pb-3">
              <div className="flex items-center gap-2 text-[#176a22]">
                <FileText size={22} />
                <h3 className="font-extrabold text-base text-[#181d16]">
                  Chi Tiết Hợp Đồng Bao Tiêu Tương Lai #{selectedContractDetail.id}
                </h3>
              </div>
              <button 
                onClick={() => setSelectedContractDetail(null)} 
                className="text-[#5e6958] hover:text-[#ba1a1a] cursor-pointer p-1 rounded-lg hover:bg-[#f1f5ea]"
              >
                <XCircle size={20} />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="bg-[#f0f6ea] p-4 rounded-xl border border-[#c9ecc1] space-y-2">
                <div className="flex justify-between font-extrabold text-[#181d16] text-sm">
                  <span>{selectedContractDetail.cropName}</span>
                  <span className="text-[#176a22]">{(selectedContractDetail.requestedQuantityTons * 1000 * selectedContractDetail.proposedPriceVnd / 1000000).toLocaleString()} Tr VNĐ</span>
                </div>
                <div className="text-[#5e6958]">Canh tác tại: <strong>{selectedContractDetail.plotName}</strong></div>
              </div>

              <div className="grid grid-cols-2 gap-3 bg-[#f8faf5] p-3 rounded-xl border border-[#e0e4d9]">
                <div>
                  <div className="text-[#5e6958] font-bold">Bên Mua (Thương lái / Doanh nghiệp):</div>
                  <div className="font-extrabold text-[#181d16] mt-0.5">{selectedContractDetail.buyerCompany}</div>
                  <div className="text-[#5e6958]">{selectedContractDetail.buyerName} - {selectedContractDetail.buyerPhone}</div>
                </div>

                <div>
                  <div className="text-[#5e6958] font-bold">Tiền Đặt Cọc Escrow ({selectedContractDetail.depositPercent}%):</div>
                  <div className="font-extrabold text-[#176a22] mt-0.5">
                    {((selectedContractDetail.requestedQuantityTons * 1000 * selectedContractDetail.proposedPriceVnd * (selectedContractDetail.depositPercent / 100)) / 1000000).toFixed(1)} Triệu VNĐ
                  </div>
                  <div className="text-[#176a22] font-semibold flex items-center gap-1 text-[11px]">
                    <ShieldCheck size={13} /> Bảo vệ 100% rủi ro hủy kèo
                  </div>
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-[#40493d]">Ghi chú điều khoản:</label>
                <div className="p-3 bg-[#ebefe4] rounded-xl text-[#181d16]">
                  {selectedContractDetail.notes}
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-[#e0e4d9]">
              <button
                onClick={() => {
                  if (triggerToast) triggerToast('Đã tải Hợp Đồng Bao Tiêu bản PDF thành công!');
                  setSelectedContractDetail(null);
                }}
                className="px-4 py-2 bg-[#176a22] hover:bg-[#12541b] text-white rounded-xl font-bold text-xs cursor-pointer shadow-xs"
              >
                Tải Xuất Hợp Đồng PDF
              </button>
            </div>

          </div>
        </div>
      )}

      {/* MODAL: LỘ TRÌNH NÔNG VỤ & QUÁ TRÌNH TRỒNG TRỌT (CẤU TRÚC THEO ẢNH MẪU) */}
      {selectedContractRoadmap && (() => {
        const currentRoadmap = getContractRoadmap(selectedContractRoadmap.id);
        const contractValue = selectedContractRoadmap.requestedQuantityTons * 1000 * selectedContractRoadmap.proposedPriceVnd;
        const depositValue = contractValue * (selectedContractRoadmap.depositPercent / 100);
        const remainingValue = contractValue - depositValue;

        return (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5">
            <div className="bg-[#f8faf6] rounded-3xl max-w-5xl w-full max-h-[92vh] overflow-y-auto p-5 sm:p-7 shadow-2xl border border-[#e0e4d9] space-y-6 animate-in zoom-in-95 duration-150">
              
              {/* MODAL HEADER */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#e0e4d9] pb-4 bg-white -mx-5 -mt-5 p-5 sm:-mx-7 sm:-mt-7 sm:p-7 rounded-t-3xl shadow-2xs">
                <div>
                  <div className="text-xs font-bold text-[#176a22] flex items-center gap-1.5">
                    <Sprout size={16} />
                    <span>Hợp đồng #{selectedContractRoadmap.id}</span>
                    <span className="text-[#5e6958]">&bull; {selectedContractRoadmap.plotName}</span>
                  </div>
                  <h2 className="font-black text-lg sm:text-xl text-[#181d16] mt-0.5">
                    Lộ Trình Nông Vụ {selectedContractRoadmap.cropName}
                  </h2>
                </div>

                <div className="flex items-center gap-3">
                  <div className="bg-[#eaf5e7] text-[#176a22] border border-[#c9ecc1] px-3.5 py-1.5 rounded-full font-black text-xs sm:text-sm flex items-center gap-1.5 shadow-2xs">
                    <Sparkles size={16} />
                    <span>Tiến độ: {currentRoadmap.overallProgress}%</span>
                  </div>
                  <button
                    onClick={() => setSelectedContractRoadmap(null)}
                    className="p-2 text-[#5e6958] hover:text-[#ba1a1a] bg-[#f4f6f0] hover:bg-[#ffd9d9] rounded-xl transition-all cursor-pointer"
                    title="Đóng"
                  >
                    <XCircle size={22} />
                  </button>
                </div>
              </div>

              {/* MODAL BODY (2-COLUMN GRID) */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                
                {/* LEFT MAIN COLUMN: STAGES & GALLERY */}
                <div className="lg:col-span-7 space-y-6">
                  
                  {/* CÁC GIAI ĐOẠN CANH TÁC */}
                  <div className="bg-white rounded-2xl border border-[#e0e4d9] p-5 shadow-2xs space-y-4">
                    <div className="flex items-center justify-between border-b border-[#e0e4d9] pb-3">
                      <h3 className="font-extrabold text-sm text-[#181d16] flex items-center gap-2">
                        <Calendar size={18} className="text-[#176a22]" /> 
                        Tiến Độ Thực Địa Các Giai Đoạn
                      </h3>
                      <span className="text-[11px] text-[#5e6958] font-medium">Bấm "Cập nhật" để ghi nhật ký</span>
                    </div>

                    <div className="space-y-4 relative before:absolute before:top-4 before:bottom-4 before:left-4 before:w-0.5 before:bg-[#e0e4d9]">
                      {currentRoadmap.stages.map((st, idx) => {
                        const isDone = st.status === 'completed';
                        const isInProgress = st.status === 'in_progress';

                        return (
                          <div key={st.id} className="relative pl-10 space-y-2">
                            {/* Timeline Node Icon */}
                            <div className={`absolute left-0 top-1 w-8 h-8 rounded-full flex items-center justify-center font-extrabold text-xs transition-all border ${
                              isDone 
                                ? 'bg-[#176a22] text-white border-[#176a22]' 
                                : isInProgress 
                                ? 'bg-[#c9ecc1] text-[#176a22] border-[#a3f69c] ring-4 ring-[#c9ecc1]/40' 
                                : 'bg-[#f4f6f0] text-[#5e6958] border-[#e0e4d9]'
                            }`}>
                              {isDone ? <Check size={16} /> : (idx + 1)}
                            </div>

                            {/* Stage Details Card */}
                            <div className={`p-4 rounded-2xl border transition-all ${
                              isInProgress 
                                ? 'bg-[#f0f6ea] border-[#c9ecc1] shadow-2xs' 
                                : 'bg-[#f8faf5] border-[#e0e4d9]'
                            }`}>
                              <div className="flex items-start justify-between gap-2">
                                <h4 className="font-extrabold text-sm text-[#181d16] leading-snug">
                                  {st.name}
                                </h4>
                                <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-black whitespace-nowrap ${
                                  isDone ? 'bg-[#c9ecc1] text-[#176a22] border border-[#a3f69c]' :
                                  isInProgress ? 'bg-[#dcfce7] text-[#15803d] border border-[#bbf7d0]' :
                                  'bg-[#e2e8f0] text-[#475569]'
                                }`}>
                                  {isDone ? 'Đã hoàn thành' : isInProgress ? 'Đang diễn ra' : 'Chưa bắt đầu'}
                                </span>
                              </div>

                              {/* Sub progress bar */}
                              <div className="mt-2 space-y-1">
                                <div className="flex justify-between text-[11px] font-bold">
                                  <span className="text-[#5e6958]">Tiến độ hiện tại: <strong className="text-[#176a22]">{st.progressPercent}%</strong> giai đoạn</span>
                                </div>
                                <div className="w-full h-2 bg-[#e0e4d9] rounded-full overflow-hidden">
                                  <div 
                                    className={`h-full rounded-full transition-all ${isDone ? 'bg-[#176a22]' : 'bg-[#22c55e]'}`}
                                    style={{ width: `${st.progressPercent}%` }}
                                  />
                                </div>
                              </div>

                              {/* Log Notes */}
                              <p className="mt-2.5 text-xs text-[#5e6958] leading-relaxed font-normal bg-white/80 p-2.5 rounded-xl border border-[#e0e4d9]/60">
                                {st.notes}
                              </p>

                              {/* Dates & Action button */}
                              <div className="mt-3 pt-2.5 border-t border-[#e0e4d9]/70 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                                <span className="text-[#5e6958] font-medium flex items-center gap-1 text-[11px]">
                                  <Calendar size={13} /> Dự kiến kết thúc: <strong className="text-[#181d16]">{st.expectedEndDate}</strong>
                                </span>

                                <button
                                  onClick={() => setEditingStage({
                                    contractId: selectedContractRoadmap.id,
                                    stageId: st.id,
                                    name: st.name,
                                    status: st.status,
                                    progressPercent: st.progressPercent,
                                    notes: st.notes,
                                    expectedEndDate: st.expectedEndDate
                                  })}
                                  className="font-extrabold text-[#176a22] hover:text-[#12541b] flex items-center gap-1 text-xs cursor-pointer hover:underline self-end sm:self-auto bg-white px-2.5 py-1 rounded-lg border border-[#c9ecc1]"
                                >
                                  <span>Cập nhật giai đoạn này</span>
                                  <ArrowRight size={14} />
                                </button>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* THƯ VIỆN MINH CHỨNG THỰC ĐỊA */}
                  <div className="bg-white rounded-2xl border border-[#e0e4d9] p-5 shadow-2xs space-y-3">
                    <div className="flex items-center justify-between border-b border-[#e0e4d9] pb-3">
                      <div className="flex items-center gap-2">
                        <Camera size={18} className="text-[#176a22]" />
                        <h3 className="font-extrabold text-sm text-[#181d16]">Thư viện Minh chứng thực địa</h3>
                        <span className="px-2.5 py-0.5 bg-[#ebefe4] text-[#5e6958] font-bold text-[11px] rounded-md border border-[#e0e4d9]">
                          {currentRoadmap.proofImages.length} hình ảnh
                        </span>
                      </div>

                      <label className="px-3 py-1.5 bg-[#f0f6ea] hover:bg-[#c9ecc1] text-[#176a22] font-extrabold text-xs rounded-xl transition-all cursor-pointer flex items-center gap-1.5 border border-[#c9ecc1] shadow-2xs">
                        <Upload size={14} />
                        <span>Tải ảnh lên</span>
                        <input 
                          type="file" 
                          accept="image/*" 
                          className="hidden" 
                          onChange={(e) => handleFileUpload(selectedContractRoadmap.id, e)}
                        />
                      </label>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      {currentRoadmap.proofImages.map((img, idx) => (
                        <div key={idx} className="relative aspect-square rounded-2xl overflow-hidden border border-[#e0e4d9] group bg-[#f4f6f0]">
                          <img src={img} alt={`Proof ${idx + 1}`} className="w-full h-full object-cover group-hover:scale-105 transition-all duration-200" />
                          <button
                            onClick={() => handleDeleteImage(selectedContractRoadmap.id, idx)}
                            className="absolute top-1.5 right-1.5 p-1.5 bg-black/70 hover:bg-[#ba1a1a] text-white rounded-lg transition-all opacity-0 group-hover:opacity-100 cursor-pointer"
                            title="Xóa hình ảnh"
                          >
                            <Trash2 size={13} />
                          </button>
                        </div>
                      ))}

                      {/* Upload box */}
                      <label className="aspect-square rounded-2xl border-2 border-dashed border-[#a3f69c] bg-[#f0f6ea]/60 hover:bg-[#f0f6ea] transition-all cursor-pointer flex flex-col items-center justify-center p-3 text-center text-[#176a22] space-y-1">
                        <Upload size={22} />
                        <span className="font-extrabold text-[11px]">Tải lên ảnh mới</span>
                        <input 
                          type="file" 
                          accept="image/*" 
                          className="hidden" 
                          onChange={(e) => handleFileUpload(selectedContractRoadmap.id, e)}
                        />
                      </label>
                    </div>
                  </div>

                </div>

                {/* RIGHT SIDEBAR: PENALTY CLAUSES & FINANCIALS */}
                <div className="lg:col-span-5 space-y-5">
                  
                  {/* ĐIỀU KHOẢN VI PHẠM & PHẠT (MÀU ĐỎ NỔI BẬT THEO ẢNH) */}
                  <div className="bg-[#8b1818] text-white p-5 rounded-2xl shadow-md space-y-3.5 border border-[#711616]">
                    <div className="flex items-center gap-2 border-b border-white/20 pb-2.5">
                      <AlertTriangle size={20} className="text-[#fecdd3]" />
                      <h3 className="font-black text-sm tracking-tight uppercase text-white">
                        ĐIỀU KHOẢN VI PHẠM & PHẠT
                      </h3>
                    </div>

                    <div className="space-y-3 text-xs leading-relaxed">
                      <div className="space-y-0.5">
                        <div className="font-extrabold text-white text-[11px] uppercase tracking-wider">TRỄ TIẾN ĐỘ GIAO HÀNG</div>
                        <p className="text-white/90 text-[11px]">
                          Phạt 1% giá trị hợp đồng cho mỗi ngày chậm trễ (không quá 15%).
                        </p>
                      </div>

                      <div className="space-y-0.5">
                        <div className="font-extrabold text-white text-[11px] uppercase tracking-wider">SAI LỆCH CHẤT LƯỢNG / DƯ LƯỢNG BVTV</div>
                        <p className="text-white/90 text-[11px]">
                          Hủy hợp đồng & phạt 20% tiền cọc nếu phát hiện dư lượng hóa chất cấm.
                        </p>
                      </div>

                      <div className="space-y-0.5">
                        <div className="font-extrabold text-white text-[11px] uppercase tracking-wider">HỦY HỢP ĐỒNG ĐƠN PHƯƠNG</div>
                        <p className="text-white/90 text-[11px]">
                          Bồi thường 150% giá trị tiền đặt cọc đã nhận.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* THÔNG TIN TÀI CHÍNH HỢP ĐỒNG */}
                  <div className="bg-white rounded-2xl border border-[#e0e4d9] p-5 shadow-2xs space-y-4">
                    <h3 className="font-extrabold text-sm text-[#181d16] border-b border-[#e0e4d9] pb-3">
                      Thông Tin Tài Chính Hợp Đồng
                    </h3>

                    <div className="space-y-3 text-xs">
                      <div className="flex items-center justify-between">
                        <span className="text-[#5e6958] font-medium">Tổng giá trị bao tiêu:</span>
                        <span className="font-black text-sm text-[#181d16]">
                          {contractValue.toLocaleString('vi-VN')} VNĐ
                        </span>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-[#5e6958] font-medium">Đã tạm ứng đặt cọc ({selectedContractRoadmap.depositPercent}%):</span>
                        <span className="font-extrabold text-[#176a22]">
                          {depositValue.toLocaleString('vi-VN')} VNĐ
                        </span>
                      </div>

                      <div className="flex items-center justify-between border-t border-[#e0e4d9] pt-2.5">
                        <span className="text-[#5e6958] font-medium">Còn lại dự kiến ({100 - selectedContractRoadmap.depositPercent}%):</span>
                        <span className="font-black text-sm text-[#176a22]">
                          {remainingValue.toLocaleString('vi-VN')} VNĐ
                        </span>
                      </div>
                    </div>

                    {/* BẢO LÃNH AGRISURE */}
                    <div className="bg-[#f0f6ea] border border-[#c9ecc1] p-3.5 rounded-2xl flex items-start gap-3 text-xs text-[#176a22]">
                      <div className="p-2 bg-[#c9ecc1] rounded-xl shrink-0 text-[#176a22]">
                        <ShieldCheck size={20} />
                      </div>
                      <div className="space-y-0.5">
                        <div className="font-extrabold text-sm">Bảo Lãnh AgriSure</div>
                        <p className="text-[11px] text-[#5e6958] leading-snug">
                          Đã kích hoạt bảo hiểm rủi ro thiên tai & dịch bệnh cho nông dân.
                        </p>
                      </div>
                    </div>
                  </div>

                </div>

              </div>

            </div>
          </div>
        );
      })()}

      {/* MODAL EDITING A SPECIFIC CULTIVATION STAGE */}
      {editingStage && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-[#e0e4d9] space-y-4 animate-in zoom-in-95 duration-150">
            <div className="flex justify-between items-center border-b border-[#e0e4d9] pb-3">
              <div className="flex items-center gap-2 text-[#176a22]">
                <Edit2 size={20} />
                <h3 className="font-extrabold text-base text-[#181d16]">
                  Cập Nhật Tiến Độ Giai Đoạn
                </h3>
              </div>
              <button 
                onClick={() => setEditingStage(null)} 
                className="text-[#5e6958] hover:text-[#ba1a1a] cursor-pointer p-1 rounded-lg hover:bg-[#f1f5ea]"
              >
                <XCircle size={20} />
              </button>
            </div>

            <form onSubmit={handleSaveStageUpdate} className="space-y-4 text-xs">
              <div className="space-y-1">
                <label className="font-bold text-[#40493d]">Tên Giai Đoạn</label>
                <input
                  type="text"
                  disabled
                  value={editingStage.name}
                  className="w-full h-10 px-3 bg-[#f4f6f0] border border-[#d0d6c7] rounded-xl text-[#5e6958] font-bold"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-bold text-[#40493d]">Trạng Thái</label>
                  <select
                    value={editingStage.status}
                    onChange={(e) => setEditingStage(prev => prev ? { ...prev, status: e.target.value as any } : null)}
                    className="w-full h-10 px-3 bg-[#f8faf5] border border-[#d0d6c7] rounded-xl font-extrabold outline-none focus:ring-2 focus:ring-[#176a22]"
                  >
                    <option value="in_progress">Đang diễn ra</option>
                    <option value="completed">Đã hoàn thành</option>
                    <option value="pending">Chưa bắt đầu</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-[#40493d]">Hạn Dự Kiến Kết Thúc</label>
                  <input
                    type="date"
                    required
                    value={editingStage.expectedEndDate}
                    onChange={(e) => setEditingStage(prev => prev ? { ...prev, expectedEndDate: e.target.value } : null)}
                    className="w-full h-10 px-3 bg-[#f8faf5] border border-[#d0d6c7] rounded-xl outline-none focus:ring-2 focus:ring-[#176a22]"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between font-bold text-[#40493d]">
                  <span>Tiến Độ Thực Địa (%)</span>
                  <span className="text-[#176a22] font-black">{editingStage.progressPercent}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  step="5"
                  value={editingStage.progressPercent}
                  onChange={(e) => setEditingStage(prev => prev ? { ...prev, progressPercent: Number(e.target.value) } : null)}
                  className="w-full accent-[#176a22] cursor-pointer"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-[#40493d]">Nhật Ký & Ghi Chú Chi Tiết</label>
                <textarea
                  rows={3}
                  required
                  value={editingStage.notes}
                  onChange={(e) => setEditingStage(prev => prev ? { ...prev, notes: e.target.value } : null)}
                  placeholder="Nhập ghi chú chi tiết công việc chăm sóc, sử dụng phân bón hay tiến độ..."
                  className="w-full p-2.5 bg-[#f8faf5] border border-[#d0d6c7] rounded-xl outline-none focus:ring-2 focus:ring-[#176a22]"
                />
              </div>

              <div className="flex gap-3 pt-3 border-t border-[#e0e4d9]">
                <button
                  type="button"
                  onClick={() => setEditingStage(null)}
                  className="flex-1 py-2.5 bg-white border border-[#d0d6c7] hover:bg-[#f1f5ea] text-[#40493d] rounded-xl font-bold text-xs cursor-pointer"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 bg-[#176a22] hover:bg-[#12541b] text-white rounded-xl font-extrabold text-xs shadow-xs cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <Check size={15} />
                  <span>Lưu Cập Nhật</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
