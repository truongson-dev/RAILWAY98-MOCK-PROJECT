import React, { useState } from 'react';
import { FarmPlot } from './types';
import { 
  Sprout, 
  Plus, 
  Calendar, 
  TrendingUp, 
  BarChart3, 
  Filter, 
  Edit2, 
  Trash2,
  Sparkles, 
  Thermometer, 
  Check, 
  Clock, 
  AlertTriangle, 
  CloudSun, 
  X, 
  ChevronRight, 
  ChevronLeft,
  Info,
  CheckCircle2,
  ShieldCheck,
  Building2,
  DollarSign,
  Search,
  Scale,
  Tag,
  Eye,
  Layers,
  ArrowUpDown,
  MoreVertical,
  SlidersHorizontal,
  PackagePlus,
  RefreshCw
} from 'lucide-react';

import { createProduct, fetchSupplierProducts } from '@/services/supplier.service';

export interface FarmProduct {
  id: string;
  name: string;
  plotName: string;
  category: string;
  areaHa: number;
  expectedYieldTons: number;
  priceVndPerKg: number;
  status: 'Đang chăm sóc' | 'Sắp thu hoạch' | 'Đang thu hoạch' | 'Tạm ngưng';
  certifications: string[];
  imageUrl: string;
  stage: string;
  progressPercent: number;
  harvestDate: string;
  description: string;
  createdAt: string;
}

interface ActivityLog {
  id: string;
  title: string;
  details: string;
  time: string;
  type: 'action' | 'warning' | 'completed';
}

interface FarmManagementViewProps {
  farmPlots: FarmPlot[];
  onOpenUpdateSeasonModal: () => void;
  onOpenAddProductModal?: () => void;
  triggerToast?: (msg: string) => void;
}

export const FarmManagementView: React.FC<FarmManagementViewProps> = ({
  farmPlots,
  onOpenUpdateSeasonModal,
  triggerToast
}) => {
  // Initial Farm Products State for CRUD
  const [products, setProducts] = useState<FarmProduct[]>([]);
  const [isLoadingProducts, setIsLoadingProducts] = useState(true);

  React.useEffect(() => {
    let mounted = true;
    fetchSupplierProducts().then((data) => {
      if (!mounted) return;
      // Map ApiProduct to FarmProduct
      const mapped: FarmProduct[] = data.map(item => ({
        id: String(item.id),
        name: item.name,
        plotName: item.location || 'N/A',
        category: 'Nông Sản', // Since category is not fully fetched yet
        areaHa: 0,
        expectedYieldTons: 0,
        priceVndPerKg: item.price,
        status: 'Đang chăm sóc',
        certifications: [],
        imageUrl: item.imageUrls?.[0] || 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=400&q=80',
        stage: 'N/A',
        progressPercent: 50,
        harvestDate: item.harvestDate || 'N/A',
        description: item.description || '',
        createdAt: new Date().toISOString()
      }));
      setProducts(mapped);
      setIsLoadingProducts(false);
    });
    return () => { mounted = false; };
  }, []);


  // Search & Filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  // Modal State for Add / Edit Product
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [editingProductId, setEditingProductId] = useState<string | null>(null);

  // Form Fields
  const [formName, setFormName] = useState('');
  const [formPlotName, setFormPlotName] = useState('Lô A2 - 2.5 Hecta');
  const [formCategory, setFormCategory] = useState('Trái cây ăn quả');
  const [formAreaHa, setFormAreaHa] = useState<number>(2.0);
  const [formYieldTons, setFormYieldTons] = useState<number>(5.0);
  const [formPriceVnd, setFormPriceVnd] = useState<number>(50000);
  const [formStatus, setFormStatus] = useState<'Đang chăm sóc' | 'Sắp thu hoạch' | 'Đang thu hoạch' | 'Tạm ngưng'>('Đang chăm sóc');
  const [formCertifications, setFormCertifications] = useState<string[]>(['VietGAP']);
  const [formImageUrl, setFormImageUrl] = useState('');
  const [formStage, setFormStage] = useState('Đang chăm sóc bón phân');
  const [formProgress, setFormProgress] = useState<number>(50);
  const [formHarvestDate, setFormHarvestDate] = useState('2026-11-30');
  const [formDescription, setFormDescription] = useState('');

  // Delete modal confirmation
  const [deletingProduct, setDeletingProduct] = useState<FarmProduct | null>(null);

  // Activity logs
  const [activityLogs, setActivityLogs] = useState<ActivityLog[]>([
    {
      id: 'log-1',
      title: 'Thêm mới sản phẩm Nông trại',
      details: 'Đã niêm yết "Sầu Riêng Ri6 VietGAP" quy mô 5.0 Tấn lên hệ thống',
      time: '10 phút trước',
      type: 'action'
    },
    {
      id: 'log-2',
      title: 'Cập nhật giá bán sản phẩm',
      details: 'Chỉnh sửa giá Cà Phê Robusta lên 118.000 VNĐ/kg theo biến động thị trường',
      time: '1 giờ trước',
      type: 'completed'
    },
    {
      id: 'log-3',
      title: 'Cảnh báo thời tiết vùng canh tác',
      details: 'Dự báo mưa rào tại Lô A2 & Lô B1. Khuyên nông dân hoãn phun thuốc 24h',
      time: '3 giờ trước',
      type: 'warning'
    }
  ]);

  // Open modal for Creating new product
  const handleOpenCreateModal = () => {
    setEditingProductId(null);
    setFormName('');
    setFormPlotName('Lô A2 - 2.5 Hecta');
    setFormCategory('Trái cây ăn quả');
    setFormAreaHa(2.5);
    setFormYieldTons(5.0);
    setFormPriceVnd(65000);
    setFormStatus('Đang chăm sóc');
    setFormCertifications(['VietGAP']);
    setFormImageUrl('https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=400&q=80');
    setFormStage('Gieo trồng & Chăm sóc ban đầu');
    setFormProgress(40);
    setFormHarvestDate('2026-11-20');
    setFormDescription('Sản phẩm nông sản sinh học đạt tiêu chuẩn an toàn thực phẩm.');
    setIsProductModalOpen(true);
  };

  // Open modal for Editing existing product
  const handleOpenEditModal = (prod: FarmProduct) => {
    setEditingProductId(prod.id);
    setFormName(prod.name);
    setFormPlotName(prod.plotName);
    setFormCategory(prod.category);
    setFormAreaHa(prod.areaHa);
    setFormYieldTons(prod.expectedYieldTons);
    setFormPriceVnd(prod.priceVndPerKg);
    setFormStatus(prod.status);
    setFormCertifications([...prod.certifications]);
    setFormImageUrl(prod.imageUrl);
    setFormStage(prod.stage);
    setFormProgress(prod.progressPercent);
    setFormHarvestDate(prod.harvestDate);
    setFormDescription(prod.description);
    setIsProductModalOpen(true);
  };

  // Save product (Create or Update)
  const handleSaveProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim()) return;

    let categoryIdToSave = 1; // Default to 'Trái cây ăn quả'
    if (formCategory === 'Cây công nghiệp') categoryIdToSave = 2;
    if (formCategory === 'Lúa gạo & Lương thực') categoryIdToSave = 3;
    if (formCategory === 'Rau củ quả sạch') categoryIdToSave = 4;

    if (editingProductId) {
      // UPDATE (Not fully supported by supplier service yet in this plan, but update local state)
      // TODO: Call update API
      setProducts(prev => prev.map(p => {
        if (p.id === editingProductId) {
          return {
            ...p,
            name: formName,
            plotName: formPlotName,
            category: formCategory,
            areaHa: formAreaHa,
            expectedYieldTons: formYieldTons,
            priceVndPerKg: formPriceVnd,
            status: formStatus,
            certifications: formCertifications,
            imageUrl: formImageUrl || 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=400&q=80',
            stage: formStage,
            progressPercent: formProgress,
            harvestDate: formHarvestDate,
            description: formDescription
          };
        }
        return p;
      }));

      // Log activity
      const newLog: ActivityLog = {
        id: `log-${Date.now()}`,
        title: 'Cập nhật thông tin sản phẩm',
        details: `Đã chỉnh sửa sản phẩm "${formName}" thành công.`,
        time: 'Vừa xong',
        type: 'completed'
      };
      setActivityLogs(prev => [newLog, ...prev]);

      if (triggerToast) triggerToast(`Đã cập nhật sản phẩm "${formName}" thành công!`);
      setIsProductModalOpen(false);
    } else {
      // CREATE
      const payload = {
        name: formName,
        description: formDescription,
        price: formPriceVnd,
        unit: 'kg',
        minOrderKg: 50, // default
        location: formPlotName,
        harvestDate: formHarvestDate,
        categoryId: categoryIdToSave,
        imageUrls: [formImageUrl || 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=400&q=80']
      };

      const result = await createProduct(payload);
      if (result) {
        // Log activity
        const newLog: ActivityLog = {
          id: `log-${Date.now()}`,
          title: 'Thêm mới sản phẩm Nông trại',
          details: `Đã thêm sản phẩm "${formName}" (Quy mô: ${formYieldTons} Tấn)`,
          time: 'Vừa xong',
          type: 'action'
        };
        setActivityLogs(prev => [newLog, ...prev]);

        if (triggerToast) triggerToast(`Thêm sản phẩm nông sản "${formName}" thành công!`);
        
        // Refresh products
        const updatedList = await fetchSupplierProducts();
        setProducts(updatedList.map(item => ({
          id: String(item.id),
          name: item.name,
          plotName: item.location || 'N/A',
          category: 'Nông Sản',
          areaHa: 0,
          expectedYieldTons: 0,
          priceVndPerKg: item.price,
          status: 'Đang chăm sóc',
          certifications: [],
          imageUrl: item.imageUrls?.[0] || 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=400&q=80',
          stage: 'N/A',
          progressPercent: 50,
          harvestDate: item.harvestDate || 'N/A',
          description: item.description || '',
          createdAt: new Date().toISOString()
        })));
      } else {
        if (triggerToast) triggerToast(`Thất bại: Không thể tạo sản phẩm`);
      }
      setIsProductModalOpen(false);
    }
  };

  // Delete product
  const handleConfirmDeleteProduct = () => {
    if (!deletingProduct) return;
    const prodName = deletingProduct.name;
    setProducts(prev => prev.filter(p => p.id !== deletingProduct.id));
    
    // Log
    const newLog: ActivityLog = {
      id: `log-${Date.now()}`,
      title: 'Xóa sản phẩm khỏi Nông trại',
      details: `Đã xóa "${prodName}" khỏi danh sách quản lý.`,
      time: 'Vừa xong',
      type: 'warning'
    };
    setActivityLogs(prev => [newLog, ...prev]);

    if (triggerToast) triggerToast(`Đã xóa sản phẩm "${prodName}" thành công!`);
    setDeletingProduct(null);
  };

  // Fast toggle certification check
  const toggleCertification = (cert: string) => {
    if (formCertifications.includes(cert)) {
      setFormCertifications(prev => prev.filter(c => c !== cert));
    } else {
      setFormCertifications(prev => [...prev, cert]);
    }
  };

  // Filter products logic
  const filteredProducts = products.filter(p => {
    if (categoryFilter !== 'all' && p.category !== categoryFilter) return false;
    if (statusFilter !== 'all' && p.status !== statusFilter) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        p.name.toLowerCase().includes(q) ||
        p.plotName.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q)
      );
    }
    return true;
  });

  // Pagination calculations
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage) || 1;
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Calculate stats
  const totalProductsCount = products.length;
  const totalYieldTons = products.reduce((acc, p) => acc + p.expectedYieldTons, 0);
  const avgPriceVnd = products.length 
    ? Math.round(products.reduce((acc, p) => acc + p.priceVndPerKg, 0) / products.length)
    : 0;
  const certifiedProductsCount = products.filter(p => p.certifications.length > 0).length;

  return (
    <div className="space-y-6 animate-in fade-in duration-200 pb-12">
      
      {/* TOP HEADER */}
      <div className="bg-white rounded-2xl border border-[#e0e4d9] p-6 shadow-2xs flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="p-2.5 bg-[#c9ecc1] text-[#176a22] rounded-xl shadow-2xs">
              <Sprout size={26} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-extrabold text-[#181d16] tracking-tight">
                  Quản Lý Sản Phẩm Nông Trại
                </h1>
              </div>
              <p className="text-xs text-[#5e6958] font-medium mt-0.5">
                Quản lý toàn bộ danh mục cây trồng, sản lượng niêm yết, giá bán & chứng nhận VietGAP / OCOP
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={() => {
              if (onOpenAddProductModal) onOpenAddProductModal();
            }}
            className="px-4 py-2.5 bg-[#176a22] hover:bg-[#12541b] active:bg-[#0e4315] text-white font-extrabold text-xs rounded-xl transition-all cursor-pointer flex items-center gap-2 shadow-xs border border-[#a3f69c]/30"
          >
            <PackagePlus size={18} strokeWidth={2.5} />
            <span>Thêm Sản Phẩm Mới</span>
          </button>
        </div>
      </div>

      {/* KPI METRICS OVERVIEW */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-2xl border border-[#e0e4d9] shadow-2xs space-y-1">
          <div className="flex items-center justify-between text-xs text-[#5e6958] font-bold">
            <span>Tổng Sản Phẩm Nông Trại</span>
            <Layers size={18} className="text-[#176a22]" />
          </div>
          <div className="text-2xl font-black text-[#181d16]">
            {totalProductsCount} <span className="text-xs font-semibold text-[#5e6958]">Loại</span>
          </div>
          <p className="text-[11px] text-[#176a22] font-semibold flex items-center gap-1">
            <CheckCircle2 size={12} /> Dữ liệu đã đồng bộ ứng dụng
          </p>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-[#e0e4d9] shadow-2xs space-y-1">
          <div className="flex items-center justify-between text-xs text-[#5e6958] font-bold">
            <span>Tổng Sản Lượng Thu Hoạch</span>
            <Scale size={18} className="text-[#176a22]" />
          </div>
          <div className="text-2xl font-black text-[#181d16]">
            {totalYieldTons.toFixed(1)} <span className="text-xs font-semibold text-[#5e6958]">Tấn</span>
          </div>
          <p className="text-[11px] text-[#5e6958]">
            Ước tính cung ứng cho các hợp đồng bao tiêu
          </p>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-[#e0e4d9] shadow-2xs space-y-1">
          <div className="flex items-center justify-between text-xs text-[#5e6958] font-bold">
            <span>Giá Bán Niêm Yết TB</span>
            <DollarSign size={18} className="text-[#176a22]" />
          </div>
          <div className="text-2xl font-black text-[#176a22]">
            {avgPriceVnd.toLocaleString('vi-VN')} <span className="text-xs font-semibold text-[#5e6958]">đ/kg</span>
          </div>
          <p className="text-[11px] text-[#5e6958]">
            Đạt mức biên lợi nhuận cao mùa vụ này
          </p>
        </div>

        <div className="bg-[#f2f8ed] p-4 rounded-2xl border border-[#a3f69c] shadow-2xs space-y-1">
          <div className="flex items-center justify-between text-xs text-[#176a22] font-bold">
            <span>Đạt Tiêu Chuẩn Quốc Tế</span>
            <ShieldCheck size={18} className="text-[#176a22]" />
          </div>
          <div className="text-2xl font-black text-[#176a22]">
            {certifiedProductsCount} / {totalProductsCount} <span className="text-xs font-semibold text-[#176a22]">Sản phẩm</span>
          </div>
          <p className="text-[11px] text-[#176a22] font-extrabold flex items-center gap-1">
            <Sparkles size={13} /> VietGAP, OCOP 4 sao, Organic
          </p>
        </div>
      </div>

      {/* SEARCH, FILTER & ACTION BAR */}
      <div className="bg-white rounded-2xl border border-[#e0e4d9] p-4 shadow-2xs space-y-4">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
          
          {/* Search Box */}
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#5e6958]" size={18} />
            <input
              type="text"
              placeholder="Tìm kiếm tên nông sản, lô vườn canh tác, phân loại..."
              value={searchQuery}
              onChange={e => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full pl-10 pr-4 py-2 bg-[#f4f6f0] border border-[#e0e4d9] rounded-xl text-xs font-semibold text-[#181d16] focus:outline-none focus:border-[#176a22] transition-all"
            />
          </div>

          {/* Filters */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0">
            {/* Category Filter */}
            <div className="flex items-center gap-1.5 bg-[#f4f6f0] px-3 py-1.5 rounded-xl border border-[#e0e4d9] text-xs font-bold text-[#181d16]">
              <Filter size={14} className="text-[#176a22]" />
              <span>Loại:</span>
              <select
                value={categoryFilter}
                onChange={e => {
                  setCategoryFilter(e.target.value);
                  setCurrentPage(1);
                }}
                className="bg-transparent font-extrabold text-[#176a22] focus:outline-none cursor-pointer"
              >
                <option value="all">Tất cả loại</option>
                <option value="Trái cây ăn quả">Trái cây ăn quả</option>
                <option value="Cây công nghiệp">Cây công nghiệp</option>
                <option value="Lúa gạo & Lương thực">Lúa gạo & Lương thực</option>
              </select>
            </div>

            {/* Status Filter */}
            <div className="flex items-center gap-1.5 bg-[#f4f6f0] px-3 py-1.5 rounded-xl border border-[#e0e4d9] text-xs font-bold text-[#181d16]">
              <span>Trạng thái:</span>
              <select
                value={statusFilter}
                onChange={e => {
                  setStatusFilter(e.target.value);
                  setCurrentPage(1);
                }}
                className="bg-transparent font-extrabold text-[#176a22] focus:outline-none cursor-pointer"
              >
                <option value="all">Tất cả trạng thái</option>
                <option value="Đang chăm sóc">Đang chăm sóc</option>
                <option value="Sắp thu hoạch">Sắp thu hoạch</option>
                <option value="Đang thu hoạch">Đang thu hoạch</option>
                <option value="Tạm ngưng">Tạm ngưng</option>
              </select>
            </div>

            {/* Clear Filter */}
            {(categoryFilter !== 'all' || statusFilter !== 'all' || searchQuery) && (
              <button
                onClick={() => {
                  setCategoryFilter('all');
                  setStatusFilter('all');
                  setSearchQuery('');
                  setCurrentPage(1);
                }}
                className="px-3 py-1.5 bg-[#fce8e8] text-[#901c1c] text-xs font-bold rounded-xl hover:bg-[#f8d7d7] transition-all cursor-pointer flex items-center gap-1"
              >
                <X size={14} /> Xóa bộ lọc
              </button>
            )}
          </div>
        </div>
      </div>

      {/* PRODUCTS GRID LIST (CRUD UI) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {paginatedProducts.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-2xl border border-[#e0e4d9] overflow-hidden shadow-2xs hover:shadow-md transition-all flex flex-col group"
          >
            {/* Product Image & Badges */}
            <div className="relative h-44 overflow-hidden bg-[#f4f6f0]">
              <img
                src={product.imageUrl}
                alt={product.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              
              {/* Category Badge */}
              <span className="absolute top-3 left-3 px-2.5 py-1 bg-black/60 backdrop-blur-md text-white font-extrabold text-[10px] rounded-lg tracking-wide border border-white/20">
                {product.category}
              </span>

              {/* Status Badge */}
              <span className={`absolute top-3 right-3 px-2.5 py-1 font-extrabold text-[10px] rounded-lg shadow-2xs ${
                product.status === 'Sắp thu hoạch'
                  ? 'bg-[#ffe4e6] text-[#9f1239] border border-[#fecdd3]'
                  : product.status === 'Đang thu hoạch'
                  ? 'bg-[#dcfce7] text-[#15803d] border border-[#bbf7d0]'
                  : 'bg-[#e2e8f0] text-[#334155] border border-[#cbd5e1]'
              }`}>
                {product.status}
              </span>

              {/* Title & Plot on image */}
              <div className="absolute bottom-3 left-3 right-3 text-white">
                <h3 className="text-base font-extrabold tracking-tight drop-shadow-sm leading-snug">
                  {product.name}
                </h3>
                <p className="text-xs text-white/90 font-medium flex items-center gap-1 mt-0.5">
                  <Sprout size={13} className="text-[#a3f69c]" />
                  {product.plotName}
                </p>
              </div>
            </div>

            {/* Product Details Body */}
            <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
              <div className="space-y-2.5">
                {/* Certifications Tags */}
                <div className="flex flex-wrap items-center gap-1.5">
                  {product.certifications.map((cert, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 bg-[#f2f8ed] text-[#176a22] font-black text-[10px] rounded-md border border-[#c9ecc1] flex items-center gap-1"
                    >
                      <CheckCircle2 size={11} /> {cert}
                    </span>
                  ))}
                </div>

                {/* Description */}
                <p className="text-xs text-[#5e6958] font-normal line-clamp-2 leading-relaxed">
                  {product.description}
                </p>

                {/* Specs Box */}
                <div className="grid grid-cols-2 gap-2 bg-[#f8faf6] p-2.5 rounded-xl border border-[#e0e4d9] text-xs">
                  <div>
                    <span className="text-[10px] text-[#5e6958] font-bold block">SẢN LƯỢNG DỰ KIẾN</span>
                    <span className="font-extrabold text-[#181d16]">{product.expectedYieldTons} Tấn</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-[#5e6958] font-bold block">GIÁ NIÊM YẾT</span>
                    <span className="font-extrabold text-[#176a22]">{product.priceVndPerKg.toLocaleString('vi-VN')} đ/kg</span>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-[11px] font-bold">
                    <span className="text-[#5e6958]">{product.stage}</span>
                    <span className="text-[#176a22]">{product.progressPercent}%</span>
                  </div>
                  <div className="w-full h-2 bg-[#e0e4d9] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#176a22] rounded-full transition-all"
                      style={{ width: `${product.progressPercent}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* CARD ACTIONS: UPDATE & DELETE */}
              <div className="pt-3 border-t border-[#e0e4d9] flex items-center justify-between gap-2">
                <span className="text-[10px] text-[#5e6958] font-bold flex items-center gap-1">
                  <Calendar size={12} /> DĐ Thu hoạch: {product.harvestDate}
                </span>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => handleOpenEditModal(product)}
                    className="p-2 bg-[#ebefe4] hover:bg-[#e0e8d6] text-[#176a22] font-bold text-xs rounded-xl transition-all cursor-pointer flex items-center gap-1.5 border border-[#c9ecc1]"
                    title="Chỉnh sửa sản phẩm"
                  >
                    <Edit2 size={14} />
                    <span>Sửa</span>
                  </button>

                  <button
                    onClick={() => setDeletingProduct(product)}
                    className="p-2 bg-[#fce8e8] hover:bg-[#f8d7d7] text-[#901c1c] font-bold text-xs rounded-xl transition-all cursor-pointer flex items-center gap-1 border border-[#fecdd3]"
                    title="Xóa sản phẩm"
                  >
                    <Trash2 size={14} />
                    <span>Xóa</span>
                  </button>
                </div>
              </div>

            </div>
          </div>
        ))}
      </div>

      {/* PAGINATION CONTROLS */}
      {filteredProducts.length > 0 && totalPages > 1 && (
        <div className="bg-white rounded-2xl border border-[#e0e4d9] p-4 shadow-2xs flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-semibold text-[#5e6958]">
          <div>
            Hiển thị <span className="font-extrabold text-[#181d16]">{(currentPage - 1) * itemsPerPage + 1}</span> - <span className="font-extrabold text-[#181d16]">{Math.min(currentPage * itemsPerPage, filteredProducts.length)}</span> trên <span className="font-extrabold text-[#181d16]">{filteredProducts.length}</span> sản phẩm
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

      {/* EMPTY STATE */}
      {filteredProducts.length === 0 && (
        <div className="bg-white rounded-2xl border border-[#e0e4d9] p-12 text-center space-y-3">
          <div className="w-12 h-12 bg-[#ebefe4] text-[#176a22] rounded-full flex items-center justify-center mx-auto">
            <Search size={24} />
          </div>
          <h3 className="text-base font-extrabold text-[#181d16]">Không tìm thấy sản phẩm nông sản phù hợp</h3>
          <p className="text-xs text-[#5e6958] max-w-md mx-auto">
            Thử thay đổi từ khóa tìm kiếm hoặc chọn bộ lọc phân loại khác.
          </p>
          <button
            onClick={() => {
              setCategoryFilter('all');
              setStatusFilter('all');
              setSearchQuery('');
            }}
            className="px-4 py-2 bg-[#176a22] text-white text-xs font-extrabold rounded-xl hover:bg-[#12541b] transition-all cursor-pointer"
          >
            Đặt Lại Bộ Lọc
          </button>
        </div>
      )}

      {/* FARM ACTIVITY LOGS */}
      <div className="bg-white rounded-2xl border border-[#e0e4d9] p-6 shadow-2xs space-y-4">
        <div className="flex items-center justify-between border-b border-[#e0e4d9] pb-3">
          <div className="flex items-center gap-2">
            <Clock size={18} className="text-[#176a22]" />
            <h3 className="text-sm font-extrabold text-[#181d16]">
              Nhật Ký Thao Tác Nông Trại
            </h3>
          </div>
          <span className="text-xs text-[#5e6958] font-semibold">Tự động lưu vết hệ thống</span>
        </div>

        <div className="space-y-3">
          {activityLogs.map((log) => (
            <div
              key={log.id}
              className="p-3 bg-[#f8faf6] rounded-xl border border-[#e0e4d9] flex items-start justify-between gap-3 text-xs"
            >
              <div className="flex items-start gap-2.5">
                <div className={`p-1.5 rounded-lg shrink-0 mt-0.5 ${
                  log.type === 'action' ? 'bg-[#c9ecc1] text-[#176a22]' :
                  log.type === 'warning' ? 'bg-[#fef3c7] text-[#d97706]' :
                  'bg-[#dcfce7] text-[#166534]'
                }`}>
                  {log.type === 'warning' ? <AlertTriangle size={14} /> : <CheckCircle2 size={14} />}
                </div>
                <div>
                  <h4 className="font-extrabold text-[#181d16]">{log.title}</h4>
                  <p className="text-[#5e6958] font-normal mt-0.5">{log.details}</p>
                </div>
              </div>
              <span className="text-[10px] text-[#5e6958] font-semibold whitespace-nowrap">{log.time}</span>
            </div>
          ))}
        </div>
      </div>

      {/* CREATE / EDIT PRODUCT MODAL */}
      {isProductModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl max-w-xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-[#e0e4d9] p-6 space-y-5">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-[#e0e4d9] pb-4">
              <div className="flex items-center gap-2.5">
                <div className="p-2 bg-[#c9ecc1] text-[#176a22] rounded-xl">
                  <Sprout size={20} />
                </div>
                <div>
                  <h2 className="text-lg font-extrabold text-[#181d16]">
                    {editingProductId ? 'Chỉnh Sửa Sản Phẩm Nông Sản' : 'Thêm Sản Phẩm Nông Trại Mới'}
                  </h2>
                  <p className="text-xs text-[#5e6958]">
                    Cập nhật thông tin chi tiết vào danh mục để niêm yết bán & ký hợp đồng
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsProductModalOpen(false)}
                className="p-2 hover:bg-[#f4f6f0] text-[#5e6958] hover:text-[#181d16] rounded-xl transition-all cursor-pointer"
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleSaveProduct} className="space-y-4 text-xs font-semibold">
              
              {/* Product Name & Plot */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[#181d16] font-bold">Tên Sản Phẩm *</label>
                  <input
                    type="text"
                    required
                    placeholder="VD: Sầu Riêng Ri6 VietGAP"
                    value={formName}
                    onChange={e => setFormName(e.target.value)}
                    className="w-full p-2.5 bg-[#f4f6f0] border border-[#e0e4d9] rounded-xl font-medium focus:outline-none focus:border-[#176a22]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[#181d16] font-bold">Lô / Vườn Canh Tác *</label>
                  <select
                    value={formPlotName}
                    onChange={e => setFormPlotName(e.target.value)}
                    className="w-full p-2.5 bg-[#f4f6f0] border border-[#e0e4d9] rounded-xl font-extrabold text-[#176a22] focus:outline-none"
                  >
                    <option value="Lô A2 - 2.5 Hecta">Lô A2 - 2.5 Hecta (Sầu Riêng)</option>
                    <option value="Lô B1 - 5.0 Hecta">Lô B1 - 5.0 Hecta (Cà Phê)</option>
                    <option value="Vườn Xoài C1 - 1.8 Hecta">Vườn Xoài C1 - 1.8 Hecta</option>
                    <option value="Lô C2 - 3.2 Hecta">Lô C2 - 3.2 Hecta (Bưởi Da Xanh)</option>
                    <option value="Ruộng Lúa Tôm D1 - 4.0 Hecta">Ruộng Lúa Tôm D1 - 4.0 Hecta</option>
                  </select>
                </div>
              </div>

              {/* Category & Status */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[#181d16] font-bold">Phân Loại Nông Sản</label>
                  <select
                    value={formCategory}
                    onChange={e => setFormCategory(e.target.value)}
                    className="w-full p-2.5 bg-[#f4f6f0] border border-[#e0e4d9] rounded-xl font-medium focus:outline-none"
                  >
                    <option value="Trái cây ăn quả">Trái cây ăn quả</option>
                    <option value="Cây công nghiệp">Cây công nghiệp</option>
                    <option value="Lúa gạo & Lương thực">Lúa gạo & Lương thực</option>
                    <option value="Rau củ quả sạch">Rau củ quả sạch</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-[#181d16] font-bold">Trạng Thái Canh Tác</label>
                  <select
                    value={formStatus}
                    onChange={e => setFormStatus(e.target.value as any)}
                    className="w-full p-2.5 bg-[#f4f6f0] border border-[#e0e4d9] rounded-xl font-medium focus:outline-none"
                  >
                    <option value="Đang chăm sóc">Đang chăm sóc</option>
                    <option value="Sắp thu hoạch">Sắp thu hoạch</option>
                    <option value="Đang thu hoạch">Đang thu hoạch</option>
                    <option value="Tạm ngưng">Tạm ngưng</option>
                  </select>
                </div>
              </div>

              {/* Yield, Price, Area */}
              <div className="grid grid-cols-3 gap-3">
                <div className="space-y-1">
                  <label className="text-[#181d16] font-bold">Diện Tích (Ha)</label>
                  <input
                    type="number"
                    step="0.1"
                    required
                    value={formAreaHa}
                    onChange={e => setFormAreaHa(Number(e.target.value))}
                    className="w-full p-2.5 bg-[#f4f6f0] border border-[#e0e4d9] rounded-xl font-medium focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[#181d16] font-bold">Sản Lượng (Tấn)</label>
                  <input
                    type="number"
                    step="0.1"
                    required
                    value={formYieldTons}
                    onChange={e => setFormYieldTons(Number(e.target.value))}
                    className="w-full p-2.5 bg-[#f4f6f0] border border-[#e0e4d9] rounded-xl font-medium focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[#181d16] font-bold">Giá Bán (VNĐ/kg)</label>
                  <input
                    type="number"
                    step="1000"
                    required
                    value={formPriceVnd}
                    onChange={e => setFormPriceVnd(Number(e.target.value))}
                    className="w-full p-2.5 bg-[#f4f6f0] border border-[#e0e4d9] rounded-xl font-extrabold text-[#176a22] focus:outline-none"
                  />
                </div>
              </div>

              {/* Harvest Date */}
              <div className="space-y-1">
                <label className="text-[#181d16] font-bold">Dự Kiến Thu Hoạch</label>
                <input
                  type="date"
                  value={formHarvestDate}
                  onChange={e => setFormHarvestDate(e.target.value)}
                  className="w-full p-2.5 bg-[#f4f6f0] border border-[#e0e4d9] rounded-xl font-medium focus:outline-none"
                />
              </div>

              {/* Certifications Checkboxes */}
              <div className="space-y-1.5">
                <label className="text-[#181d16] font-bold">Chứng Nhận Tiêu Chuẩn</label>
                <div className="flex flex-wrap gap-2 pt-1">
                  {['VietGAP', 'GlobalGAP', 'Organic', 'OCOP 4 sao', '4C Coffee', 'HACCP'].map((cert) => (
                    <button
                      type="button"
                      key={cert}
                      onClick={() => toggleCertification(cert)}
                      className={`px-3 py-1.5 rounded-xl border text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                        formCertifications.includes(cert)
                          ? 'bg-[#176a22] text-white border-[#176a22]'
                          : 'bg-[#f4f6f0] text-[#5e6958] border-[#e0e4d9] hover:border-[#176a22]'
                      }`}
                    >
                      <CheckCircle2 size={13} />
                      {cert}
                    </button>
                  ))}
                </div>
              </div>

              {/* Image URL */}
              <div className="space-y-1">
                <label className="text-[#181d16] font-bold">Link Hình Ảnh Nông Sản</label>
                <input
                  type="url"
                  placeholder="https://..."
                  value={formImageUrl}
                  onChange={e => setFormImageUrl(e.target.value)}
                  className="w-full p-2.5 bg-[#f4f6f0] border border-[#e0e4d9] rounded-xl font-medium focus:outline-none"
                />
              </div>

              {/* Description */}
              <div className="space-y-1">
                <label className="text-[#181d16] font-bold">Mô Tả Chi Tiết & Quy Trình</label>
                <textarea
                  rows={2}
                  value={formDescription}
                  onChange={e => setFormDescription(e.target.value)}
                  placeholder="Ghi chú về chất lượng, thổ nhưỡng, quy trình canh tác sinh học..."
                  className="w-full p-2.5 bg-[#f4f6f0] border border-[#e0e4d9] rounded-xl font-medium focus:outline-none resize-none"
                />
              </div>

              {/* Modal Actions */}
              <div className="pt-3 border-t border-[#e0e4d9] flex items-center justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setIsProductModalOpen(false)}
                  className="px-4 py-2.5 bg-[#f4f6f0] hover:bg-[#e0e4d9] text-[#181d16] font-bold rounded-xl transition-all cursor-pointer"
                >
                  Hủy Bỏ
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-[#176a22] hover:bg-[#12541b] text-white font-extrabold rounded-xl transition-all cursor-pointer shadow-xs"
                >
                  {editingProductId ? 'Lưu Thay Đổi' : 'Lưu & Thêm Sản Phẩm'}
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

      {/* DELETE CONFIRMATION MODAL */}
      {deletingProduct && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl border border-[#e0e4d9] p-6 space-y-4">
            <div className="flex items-center gap-3 text-[#901c1c]">
              <div className="p-3 bg-[#fce8e8] rounded-2xl">
                <Trash2 size={24} />
              </div>
              <div>
                <h3 className="text-base font-extrabold text-[#181d16]">Xác Nhận Xóa Sản Phẩm?</h3>
                <p className="text-xs text-[#5e6958]">Hành động này không thể hoàn tác.</p>
              </div>
            </div>

            <p className="text-xs text-[#181d16] leading-relaxed bg-[#f8faf6] p-3 rounded-xl border border-[#e0e4d9]">
              Bạn có chắc chắn muốn xóa sản phẩm <strong className="text-[#901c1c]">"{deletingProduct.name}"</strong> khỏi danh sách quản lý nông trại?
            </p>

            <div className="flex items-center justify-end gap-2.5 pt-2">
              <button
                onClick={() => setDeletingProduct(null)}
                className="px-4 py-2 bg-[#f4f6f0] hover:bg-[#e0e4d9] text-[#181d16] font-bold text-xs rounded-xl transition-all cursor-pointer"
              >
                Hủy Bỏ
              </button>
              <button
                onClick={handleConfirmDeleteProduct}
                className="px-4 py-2 bg-[#901c1c] hover:bg-[#731515] text-white font-extrabold text-xs rounded-xl transition-all cursor-pointer shadow-xs"
              >
                Xác Nhận Xóa
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
