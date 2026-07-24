'use client';
// Đây là component thuộc giao diện Admin
import React, { useState, useMemo } from 'react';
import {
  Package,
  FolderPlus,
  Plus,
  Search,
  Filter,
  CheckCircle2,
  Tag,
  Award,
  Layers,
  ChevronRight,
  ChevronLeft,
  Edit2,
  Trash2,
  ExternalLink,
  Sprout,
  Apple,
  Wheat,
  Coffee,
  Carrot,
  Fish,
  AlertCircle,
  X,
  Eye,
  BarChart2
} from 'lucide-react';

export interface ProductCategory {
  id: string;
  code: string;
  name: string;
  description: string;
  iconType: 'fruit' | 'grain' | 'coffee' | 'veg' | 'seafood' | 'sprout';
  certifications: string[];
  status: 'active' | 'inactive';
  createdAt: string;
}

export interface ProductItem {
  id: string;
  code: string;
  name: string;
  categoryId: string;
  categoryName: string;
  price: string;
  unit: string;
  origin: string;
  grade: string;
  certifications: string[];
  stockVolume: string;
  supplierName: string;
  status: 'active' | 'out_of_stock' | 'draft';
}

const INITIAL_CATEGORIES: ProductCategory[] = [
  {
    id: 'cat-1',
    code: 'DM-TRAICAY',
    name: 'Trái Cây Xuất Khẩu',
    description: 'Sầu riêng Ri6, Xoài Cát Hòa Lộc, Bưởi Da Xanh, Thanh Long tiêu chuẩn xuất khẩu Châu Âu & Trung Quốc',
    iconType: 'fruit',
    certifications: ['VietGAP', 'GlobalGAP', 'Mã vùng trồng'],
    status: 'active',
    createdAt: '2026-01-10'
  },
  {
    id: 'cat-2',
    code: 'DM-CAPHE',
    name: 'Cà Phê & Hạt Nông Sản',
    description: 'Cà phê Arabica Cầu Đất, Robusta Tây Nguyên, Hạt điều rang muối, Hạt tiêu đen Chư Sê',
    iconType: 'coffee',
    certifications: ['Rainforest', '4C Certified', 'Organic EU'],
    status: 'active',
    createdAt: '2026-01-15'
  },
  {
    id: 'cat-3',
    code: 'DM-RAUCU',
    name: 'Rau Củ Ôn Đới Đà Lạt',
    description: 'Dâu tây organic, Ớt chuông nhiều màu, Cà chua cherry, Dưa lưới Huỳnh Long trồng xơ dừa',
    iconType: 'veg',
    certifications: ['VietGAP', 'Organic USDA', 'HACCP'],
    status: 'active',
    createdAt: '2026-02-01'
  },
  {
    id: 'cat-4',
    code: 'DM-LUAGAO',
    name: 'Lúa Gạo & Lương Thực',
    description: 'Lúa gạo ST25 Thượng hạng, Gạo Jasmine 85, Nếp nương Tây Bắc, Ngô hạt xuất khẩu',
    iconType: 'grain',
    certifications: ['HACCP', 'ISO 22000', 'Escrow VIP'],
    status: 'active',
    createdAt: '2026-02-12'
  },
  {
    id: 'cat-5',
    code: 'DM-THUYSAN',
    name: 'Thủy Hải Sản Lạnh',
    description: 'Tôm sú Cà Mau, Cá tra basa phi lê đông lạnh, Nghêu Bến Tre xuất khẩu',
    iconType: 'seafood',
    certifications: ['ASC', 'GlobalGAP', 'Halal'],
    status: 'active',
    createdAt: '2026-03-05'
  }
];

const INITIAL_PRODUCTS: ProductItem[] = [
  {
    id: 'prod-1',
    code: 'SP-8801',
    name: 'Sầu Riêng Ri6 Hàng Loại 1',
    categoryId: 'cat-1',
    categoryName: 'Trái Cây Xuất Khẩu',
    price: '85,000đ',
    unit: 'kg',
    origin: 'Krông Pắc, Đắk Lắk',
    grade: 'Xuất Khẩu Loại A',
    certifications: ['VietGAP', 'GlobalGAP'],
    stockVolume: '150 Tấn',
    supplierName: 'HTX Sầu Riêng Krông Pắc',
    status: 'active'
  },
  {
    id: 'prod-2',
    code: 'SP-8802',
    name: 'Xoài Cát Hòa Lộc Bao Trái',
    categoryId: 'cat-1',
    categoryName: 'Trái Cây Xuất Khẩu',
    price: '62,000đ',
    unit: 'kg',
    origin: 'Cái Bè, Tiền Giang',
    grade: 'Hạng A VIP',
    certifications: ['VietGAP'],
    stockVolume: '80 Tấn',
    supplierName: 'Nông Nghiệp Xanh Tiền Giang',
    status: 'active'
  },
  {
    id: 'prod-3',
    code: 'SP-8803',
    name: 'Bưởi Da Xanh Ruột Hồng',
    categoryId: 'cat-1',
    categoryName: 'Trái Cây Xuất Khẩu',
    price: '45,000đ',
    unit: 'kg',
    origin: 'Chợ Lách, Bến Tre',
    grade: 'Hạng A (1.2-1.8kg)',
    certifications: ['VietGAP', 'OCOP 4 Sao'],
    stockVolume: '120 Tấn',
    supplierName: 'HTX Bưởi Da Xanh Chợ Lách',
    status: 'active'
  },
  {
    id: 'prod-4',
    code: 'SP-8804',
    name: 'Thanh Long Ruột Đỏ Xuất Khẩu',
    categoryId: 'cat-1',
    categoryName: 'Trái Cây Xuất Khẩu',
    price: '28,000đ',
    unit: 'kg',
    origin: 'Chợ Gạo, Tiền Giang',
    grade: 'Tiêu chuẩn FDA',
    certifications: ['GlobalGAP'],
    stockVolume: '200 Tấn',
    supplierName: 'VinFruit Trading',
    status: 'active'
  },
  {
    id: 'prod-5',
    code: 'SP-9901',
    name: 'Cà Phê Arabica Cầu Đất Nhân Xô',
    categoryId: 'cat-2',
    categoryName: 'Cà Phê & Hạt Nông Sản',
    price: '115,000đ',
    unit: 'kg',
    origin: 'Đà Lạt, Lâm Đồng',
    grade: 'Sàng 18 Tiêu chuẩn',
    certifications: ['Rainforest', 'Organic EU'],
    stockVolume: '450 Tấn',
    supplierName: 'Nông trại Sen Vàng',
    status: 'active'
  },
  {
    id: 'prod-6',
    code: 'SP-9902',
    name: 'Cà Phê Robusta Chư Sê',
    categoryId: 'cat-2',
    categoryName: 'Cà Phê & Hạt Nông Sản',
    price: '92,000đ',
    unit: 'kg',
    origin: 'Chư Sê, Gia Lai',
    grade: 'Sàng 16 Xuất Khẩu',
    certifications: ['4C Certified'],
    stockVolume: '800 Tấn',
    supplierName: 'Nông Trường Cà Phê Chư Sê',
    status: 'active'
  },
  {
    id: 'prod-7',
    code: 'SP-9903',
    name: 'Hạt Điều Rang Muối Bình Phước',
    categoryId: 'cat-2',
    categoryName: 'Cà Phê & Hạt Nông Sản',
    price: '240,000đ',
    unit: 'kg',
    origin: 'Bình Phước',
    grade: 'W240 Nguyên Hạt',
    certifications: ['HACCP', 'ISO 22000'],
    stockVolume: '60 Tấn',
    supplierName: 'EuroAgri Import GmbH',
    status: 'active'
  },
  {
    id: 'prod-8',
    code: 'SP-7701',
    name: 'Dâu Tây Organic Đà Lạt',
    categoryId: 'cat-3',
    categoryName: 'Rau Củ Ôn Đới Đà Lạt',
    price: '180,000đ',
    unit: 'kg',
    origin: 'Lạc Dương, Lâm Đồng',
    grade: 'Giống Nhật Hữu Cơ',
    certifications: ['Organic USDA', 'VietGAP'],
    stockVolume: '15 Tấn',
    supplierName: 'Nông trại Sen Vàng',
    status: 'active'
  },
  {
    id: 'prod-9',
    code: 'SP-7702',
    name: 'Ớt Chuông Đà Lạt Ngọt',
    categoryId: 'cat-3',
    categoryName: 'Rau Củ Ôn Đới Đà Lạt',
    price: '42,000đ',
    unit: 'kg',
    origin: 'Đà Lạt, Lâm Đồng',
    grade: 'Loại 1 (Màu Đỏ/Vàng)',
    certifications: ['VietGAP'],
    stockVolume: '35 Tấn',
    supplierName: 'Rau Sạch An Toàn Xuân Lộc',
    status: 'active'
  },
  {
    id: 'prod-10',
    code: 'SP-6601',
    name: 'Lúa Gạo ST25 Thượng Hạng',
    categoryId: 'cat-4',
    categoryName: 'Lúa Gạo & Lương Thực',
    price: '26,000đ',
    unit: 'kg',
    origin: 'Thoại Sơn, An Giang',
    grade: 'Gạo Sạch Hạt Dài',
    certifications: ['HACCP', 'ISO 22000'],
    stockVolume: '5,000 Tấn',
    supplierName: 'Mekong Rice Export Co.',
    status: 'active'
  },
  {
    id: 'prod-11',
    code: 'SP-6602',
    name: 'Gạo Thơm Jasmine 85',
    categoryId: 'cat-4',
    categoryName: 'Lúa Gạo & Lương Thực',
    price: '18,500đ',
    unit: 'kg',
    origin: 'Thốt Nốt, Cần Thơ',
    grade: 'Chuẩn 5% Tấm',
    certifications: ['ISO 22000'],
    stockVolume: '3,200 Tấn',
    supplierName: 'Global Grains Corp',
    status: 'active'
  },
  {
    id: 'prod-12',
    code: 'SP-5501',
    name: 'Tôm Sú Cà Mau Đông Lạnh',
    categoryId: 'cat-5',
    categoryName: 'Thủy Hải Sản Lạnh',
    price: '280,000đ',
    unit: 'kg',
    origin: 'Năm Căn, Cà Mau',
    grade: 'Size 15-20 con/kg',
    certifications: ['ASC', 'GlobalGAP'],
    stockVolume: '40 Tấn',
    supplierName: 'Singapore Agro Trading',
    status: 'active'
  }
];

// Component: ProductsManagementView - Giao diện quản lý/hiển thị cho Admin
export const ProductsManagementView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'categories' | 'products'>('categories');
  const [categories, setCategories] = useState<ProductCategory[]>(INITIAL_CATEGORIES);
  const [products, setProducts] = useState<ProductItem[]>(INITIAL_PRODUCTS);

  // Filters & Search State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<string>('all');
  const [selectedCertFilter, setSelectedCertFilter] = useState<string>('all');

  // Pagination State
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(6);

  // Modal State for New Category
  const [showAddCategoryModal, setShowAddCategoryModal] = useState(false);
  const [newCatName, setNewCatName] = useState('');
  const [newCatCode, setNewCatCode] = useState('');
  const [newCatDesc, setNewCatDesc] = useState('');
  const [newCatIcon, setNewCatIcon] = useState<'fruit' | 'grain' | 'coffee' | 'veg' | 'seafood' | 'sprout'>('fruit');
  const [newCatCerts, setNewCatCerts] = useState<string>('VietGAP, GlobalGAP');

  // Modal State for New Product
  const [showAddProductModal, setShowAddProductModal] = useState(false);
  const [newProdName, setNewProdName] = useState('');
  const [newProdCatId, setNewProdCatId] = useState(categories[0]?.id || 'cat-1');
  const [newProdPrice, setNewProdPrice] = useState('50,000đ');
  const [newProdOrigin, setNewProdOrigin] = useState('Lâm Đồng');
  const [newProdGrade, setNewProdGrade] = useState('Loại A Xuất Khẩu');
  const [newProdStock, setNewProdStock] = useState('50 Tấn');
  const [newProdSupplier, setNewProdSupplier] = useState('HTX Nông Sản Việt');

  // Toast Notification
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const triggerToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3000);
  };

  // Helper to count products per category
  const getProductCountForCategory = (catId: string) => {
    return products.filter((p) => p.categoryId === catId).length;
  };

  // Handle Add Category
  const handleCreateCategory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCatName.trim()) return;

    const certList = newCatCerts.split(',').map((c) => c.trim()).filter(Boolean);
    const generatedCode = newCatCode.trim() || `DM-${Math.floor(1000 + Math.random() * 9000)}`;

    const newCategory: ProductCategory = {
      id: `cat-${Date.now()}`,
      code: generatedCode.toUpperCase(),
      name: newCatName.trim(),
      description: newCatDesc.trim() || 'Danh mục nông sản mới được quản trị viên cập nhật',
      iconType: newCatIcon,
      certifications: certList.length > 0 ? certList : ['VietGAP'],
      status: 'active',
      createdAt: new Date().toISOString().split('T')[0]
    };

    setCategories([newCategory, ...categories]);
    setShowAddCategoryModal(false);
    setNewCatName('');
    setNewCatCode('');
    setNewCatDesc('');
    triggerToast(`Đã thêm danh mục mới: "${newCategory.name}" thành công!`);
  };

  // Handle Add Product
  const handleCreateProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProdName.trim()) return;

    const matchedCat = categories.find((c) => c.id === newProdCatId);
    const catName = matchedCat ? matchedCat.name : 'Danh mục tổng hợp';

    const newProd: ProductItem = {
      id: `prod-${Date.now()}`,
      code: `SP-${Math.floor(1000 + Math.random() * 9000)}`,
      name: newProdName.trim(),
      categoryId: newProdCatId,
      categoryName: catName,
      price: newProdPrice,
      unit: 'kg',
      origin: newProdOrigin,
      grade: newProdGrade,
      certifications: matchedCat ? matchedCat.certifications.slice(0, 2) : ['VietGAP'],
      stockVolume: newProdStock,
      supplierName: newProdSupplier,
      status: 'active'
    };

    setProducts([newProd, ...products]);
    setShowAddProductModal(false);
    setNewProdName('');
    triggerToast(`Đã thêm sản phẩm mới: "${newProd.name}" vào danh mục ${catName}!`);
  };

  // Filter Categories
  const filteredCategories = useMemo(() => {
    return categories.filter((cat) => {
      const matchesSearch =
        cat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        cat.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
        cat.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesSearch;
    });
  }, [categories, searchQuery]);

  // Filter Products
  const filteredProducts = useMemo(() => {
    return products.filter((prod) => {
      const matchesSearch =
        prod.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        prod.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
        prod.origin.toLowerCase().includes(searchQuery.toLowerCase()) ||
        prod.supplierName.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory =
        selectedCategoryFilter === 'all' || prod.categoryId === selectedCategoryFilter;

      const matchesCert =
        selectedCertFilter === 'all' ||
        prod.certifications.some((c) => c.toLowerCase().includes(selectedCertFilter.toLowerCase()));

      return matchesSearch && matchesCategory && matchesCert;
    });
  }, [products, searchQuery, selectedCategoryFilter, selectedCertFilter]);

  // Pagination for Active Tab
  const currentDataset = activeTab === 'categories' ? filteredCategories : filteredProducts;
  const totalItems = currentDataset.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage) || 1;
  const validCurrentPage = Math.min(currentPage, totalPages);
  const startIdx = (validCurrentPage - 1) * itemsPerPage;
  const paginatedDataset = currentDataset.slice(startIdx, startIdx + itemsPerPage);
  const startItemNum = totalItems > 0 ? startIdx + 1 : 0;
  const endItemNum = Math.min(startIdx + itemsPerPage, totalItems);

  const getCategoryIcon = (iconType: string) => {
    switch (iconType) {
      case 'fruit':
        return <Apple className="w-5 h-5 text-[#176a22]" />;
      case 'coffee':
        return <Coffee className="w-5 h-5 text-[#8c5211]" />;
      case 'veg':
        return <Carrot className="w-5 h-5 text-[#d97706]" />;
      case 'grain':
        return <Wheat className="w-5 h-5 text-[#b45309]" />;
      case 'seafood':
        return <Fish className="w-5 h-5 text-[#0284c7]" />;
      default:
        return <Sprout className="w-5 h-5 text-[#176a22]" />;
    }
  };

  return (
    <div className="p-6 md:p-8 space-y-6 bg-[#f7fbf0] min-h-full">
      {/* Toast Notification */}
      {toastMsg && (
        <div className="fixed top-6 right-6 z-50 bg-[#176a22] text-white px-4 py-3 rounded-xl shadow-lg text-xs font-semibold flex items-center space-x-2 animate-in fade-in slide-in-from-top-2">
          <CheckCircle2 className="w-4 h-4 text-[#a3f69c]" />
          <span>{toastMsg}</span>
        </div>
      )}

      {/* Header & Title */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-[#181d16] flex items-center space-x-2">
            <Package className="w-6 h-6 text-[#176a22]" />
            <span>Quản Lý Sản Phẩm & Danh Mục Nông Sản</span>
          </h2>
          <p className="text-sm text-[#40493d] mt-1">
            Chuẩn hóa danh mục nông sản, theo dõi số lượng mặt hàng và tiêu chuẩn chứng nhận VietGAP / GlobalGAP
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center space-x-2 self-start md:self-auto">
          {activeTab === 'categories' ? (
            <button
              onClick={() => setShowAddCategoryModal(true)}
              className="px-4 py-2.5 bg-[#176a22] hover:bg-[#13561b] text-white text-xs font-bold rounded-xl shadow-xs transition-colors cursor-pointer flex items-center space-x-1.5"
            >
              <FolderPlus className="w-4 h-4" />
              <span>Thêm Danh Mục Mới</span>
            </button>
          ) : (
            <button
              onClick={() => setShowAddProductModal(true)}
              className="px-4 py-2.5 bg-[#176a22] hover:bg-[#13561b] text-white text-xs font-bold rounded-xl shadow-xs transition-colors cursor-pointer flex items-center space-x-1.5"
            >
              <Plus className="w-4 h-4" />
              <span>Thêm Sản Phẩm Nông Sản</span>
            </button>
          )}
        </div>
      </div>

      {/* Tabs Selector: Categories vs Products */}
      <div className="flex items-center justify-between bg-white p-1.5 rounded-2xl border border-[#e0e4d9] shadow-2xs">
        <div className="flex items-center space-x-1">
          <button
            onClick={() => {
              setActiveTab('categories');
              setCurrentPage(1);
            }}
            className={`px-4 py-2.5 rounded-xl font-bold text-xs transition-all cursor-pointer flex items-center space-x-2 ${
              activeTab === 'categories'
                ? 'bg-[#a3f69c] text-[#003808] shadow-2xs'
                : 'text-[#40493d] hover:bg-[#f7fbf0]'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>Danh Mục Sản Phẩm ({categories.length})</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('products');
              setCurrentPage(1);
            }}
            className={`px-4 py-2.5 rounded-xl font-bold text-xs transition-all cursor-pointer flex items-center space-x-2 ${
              activeTab === 'products'
                ? 'bg-[#a3f69c] text-[#003808] shadow-2xs'
                : 'text-[#40493d] hover:bg-[#f7fbf0]'
            }`}
          >
            <Package className="w-4 h-4" />
            <span>Tất Cả Sản Phẩm ({products.length})</span>
          </button>
        </div>

        <div className="hidden sm:flex items-center space-x-2 text-xs text-[#707a6c] pr-3 font-medium">
          <BarChart2 className="w-4 h-4 text-[#176a22]" />
          <span>Tổng số mặt hàng đăng ký: <strong className="text-[#181d16]">{products.length}</strong></span>
        </div>
      </div>

      {/* Search & Filtering Control Bar */}
      <div className="bg-white p-4 rounded-xl border border-[#e0e4d9] shadow-2xs flex flex-col md:flex-row items-center justify-between gap-3 text-xs">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 absolute left-3 top-2.5 text-[#707a6c]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
            placeholder={
              activeTab === 'categories'
                ? 'Tìm tên danh mục, mã, mô tả...'
                : 'Tìm tên sản phẩm, mã, vùng trồng, NCC...'
            }
            className="w-full pl-9 pr-4 py-2 bg-[#f7fbf0] border border-[#bfcaba] rounded-lg text-[#181d16] focus:outline-none focus:ring-2 focus:ring-[#176a22]"
          />
        </div>

        {activeTab === 'products' && (
          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
            <div className="flex items-center space-x-1 bg-[#f7fbf0] px-3 py-1.5 rounded-lg border border-[#bfcaba]">
              <Filter className="w-3.5 h-3.5 text-[#707a6c]" />
              <span className="text-[#707a6c] font-medium">Danh mục:</span>
              <select
                value={selectedCategoryFilter}
                onChange={(e) => {
                  setSelectedCategoryFilter(e.target.value);
                  setCurrentPage(1);
                }}
                className="bg-transparent text-[#181d16] font-semibold focus:outline-none cursor-pointer"
              >
                <option value="all">Tất cả danh mục</option>
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center space-x-1 bg-[#f7fbf0] px-3 py-1.5 rounded-lg border border-[#bfcaba]">
              <Award className="w-3.5 h-3.5 text-[#707a6c]" />
              <span className="text-[#707a6c] font-medium">Chứng nhận:</span>
              <select
                value={selectedCertFilter}
                onChange={(e) => {
                  setSelectedCertFilter(e.target.value);
                  setCurrentPage(1);
                }}
                className="bg-transparent text-[#181d16] font-semibold focus:outline-none cursor-pointer"
              >
                <option value="all">Tất cả chứng nhận</option>
                <option value="VietGAP">VietGAP</option>
                <option value="GlobalGAP">GlobalGAP</option>
                <option value="Organic">Organic</option>
                <option value="Rainforest">Rainforest</option>
                <option value="ISO">ISO / HACCP</option>
              </select>
            </div>
          </div>
        )}
      </div>

      {/* VIEW CONTENT 1: CATEGORIES GRID & MANAGEMENT */}
      {activeTab === 'categories' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {paginatedDataset.map((item) => {
              const category = item as ProductCategory;
              const productCount = getProductCountForCategory(category.id);

              return (
                <div
                  key={category.id}
                  className="bg-white rounded-2xl border border-[#e0e4d9] p-5 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between space-y-4 group"
                >
                  <div className="space-y-3">
                    {/* Card Header: Icon, Code, Badge Product Count */}
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 rounded-xl bg-[#f7fbf0] border border-[#e0e4d9] flex items-center justify-center shrink-0 group-hover:bg-[#a3f69c]/20 transition-colors">
                          {getCategoryIcon(category.iconType)}
                        </div>
                        <div>
                          <span className="text-[10px] font-mono font-bold text-[#707a6c] uppercase">
                            {category.code}
                          </span>
                          <h3 className="font-bold text-[#181d16] text-base leading-snug group-hover:text-[#176a22] transition-colors">
                            {category.name}
                          </h3>
                        </div>
                      </div>

                      {/* Explicitly Requested: VIEW HOW MANY PRODUCTS BELONG TO THIS CATEGORY */}
                      <span className="bg-[#176a22] text-white text-xs font-bold px-2.5 py-1 rounded-full shadow-2xs flex items-center space-x-1 shrink-0">
                        <Package className="w-3.5 h-3.5" />
                        <span>{productCount} Sản phẩm</span>
                      </span>
                    </div>

                    <p className="text-xs text-[#40493d] line-clamp-2 leading-relaxed">
                      {category.description}
                    </p>

                    {/* Certifications tags */}
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {category.certifications.map((cert, idx) => (
                        <span
                          key={idx}
                          className="bg-[#f7fbf0] text-[#176a22] border border-[#bfcaba]/60 text-[10px] font-bold px-2 py-0.5 rounded-md flex items-center space-x-1"
                        >
                          <CheckCircle2 className="w-2.5 h-2.5 text-[#176a22]" />
                          <span>{cert}</span>
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Card Bottom: View Products Button & Actions */}
                  <div className="pt-3 border-t border-[#e0e4d9] flex items-center justify-between text-xs">
                    <button
                      onClick={() => {
                        setSelectedCategoryFilter(category.id);
                        setActiveTab('products');
                        setCurrentPage(1);
                      }}
                      className="text-[#176a22] font-bold hover:underline flex items-center space-x-1 cursor-pointer"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Xem {productCount} sản phẩm</span>
                    </button>

                    <div className="flex items-center space-x-1">
                      <span className="text-[10px] text-[#707a6c]">Tạo ngày {category.createdAt}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {filteredCategories.length === 0 && (
            <div className="bg-white p-12 rounded-2xl border border-[#e0e4d9] text-center text-xs text-[#707a6c] space-y-2">
              <FolderPlus className="w-8 h-8 text-[#bfcaba] mx-auto" />
              <p className="font-semibold text-[#181d16]">Không tìm thấy danh mục phù hợp</p>
              <p>Thử thay đổi từ khóa tìm kiếm hoặc bấm &quot;Thêm Danh Mục Mới&quot; ở trên.</p>
            </div>
          )}
        </div>
      )}

      {/* VIEW CONTENT 2: PRODUCTS TABLE / GRID */}
      {activeTab === 'products' && (
        <div className="bg-white rounded-2xl border border-[#e0e4d9] shadow-2xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-[#f1f5ea] border-b border-[#e0e4d9] text-[#707a6c] uppercase font-bold tracking-wider">
                  <th className="py-3.5 px-4">Mã & Tên Sản Phẩm</th>
                  <th className="py-3.5 px-4">Danh Mục</th>
                  <th className="py-3.5 px-4">Đơn Giá & Đơn Vị</th>
                  <th className="py-3.5 px-4">Xuất Xứ & Phân Hạng</th>
                  <th className="py-3.5 px-4">Chứng Nhận</th>
                  <th className="py-3.5 px-4">Sản Lượng Kho</th>
                  <th className="py-3.5 px-4">Nhà Cung Cấp</th>
                  <th className="py-3.5 px-4 text-right">Trạng Thái</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#e0e4d9]">
                {(paginatedDataset as ProductItem[]).map((prod) => (
                  <tr key={prod.id} className="hover:bg-[#f7fbf0] transition-colors">
                    <td className="py-3.5 px-4">
                      <div className="space-y-0.5">
                        <span className="text-[10px] font-mono font-bold text-[#176a22]">{prod.code}</span>
                        <p className="font-bold text-[#181d16] text-xs">{prod.name}</p>
                      </div>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="bg-[#f7fbf0] text-[#181d16] border border-[#bfcaba] px-2.5 py-1 rounded-lg font-semibold text-[11px]">
                        {prod.categoryName}
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="font-bold text-[#176a22] text-xs">{prod.price}</span>
                      <span className="text-[#707a6c]"> / {prod.unit}</span>
                    </td>
                    <td className="py-3.5 px-4">
                      <p className="font-semibold text-[#181d16]">{prod.origin}</p>
                      <p className="text-[10px] text-[#707a6c]">{prod.grade}</p>
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="flex flex-wrap gap-1">
                        {prod.certifications.map((c, idx) => (
                          <span
                            key={idx}
                            className="bg-[#a3f69c]/30 text-[#003808] font-bold text-[10px] px-1.5 py-0.5 rounded-md"
                          >
                            {c}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="py-3.5 px-4 font-bold text-[#181d16]">{prod.stockVolume}</td>
                    <td className="py-3.5 px-4 text-[#40493d] font-medium">{prod.supplierName}</td>
                    <td className="py-3.5 px-4 text-right">
                      <span className="bg-[#a3f69c]/40 text-[#003808] font-bold px-2.5 py-1 rounded-full text-[10px]">
                        ● Đang kinh doanh
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredProducts.length === 0 && (
            <div className="p-12 text-center text-xs text-[#707a6c] space-y-2">
              <Package className="w-8 h-8 text-[#bfcaba] mx-auto" />
              <p className="font-semibold text-[#181d16]">Không tìm thấy sản phẩm nông sản nào</p>
              <p>Thử điều chỉnh bộ lọc hoặc từ khóa tìm kiếm.</p>
            </div>
          )}
        </div>
      )}

      {/* BOTTOM PAGINATION BAR */}
      {totalItems > 0 && (
        <div className="bg-white p-4 rounded-xl border border-[#e0e4d9] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#40493d] shadow-2xs">
          <div className="flex items-center space-x-3">
            <span>
              Hiển thị <strong>{startItemNum}</strong> - <strong>{endItemNum}</strong> trong tổng số <strong>{totalItems}</strong> {activeTab === 'categories' ? 'danh mục' : 'sản phẩm'}
            </span>

            <div className="flex items-center space-x-1">
              <span className="text-[#707a6c]">Hiển thị:</span>
              <select
                value={itemsPerPage}
                onChange={(e) => {
                  setItemsPerPage(Number(e.target.value));
                  setCurrentPage(1);
                }}
                className="px-2 py-1 bg-[#f7fbf0] border border-[#bfcaba] rounded-md text-[#181d16] font-semibold focus:outline-none cursor-pointer"
              >
                <option value={6}>6 / trang</option>
                <option value={12}>12 / trang</option>
                <option value={24}>24 / trang</option>
              </select>
            </div>
          </div>

          <div className="flex items-center space-x-1">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={validCurrentPage === 1}
              className={`p-1.5 rounded-lg border transition-all cursor-pointer flex items-center ${
                validCurrentPage === 1
                  ? 'border-[#e0e4d9] text-[#bfcaba] cursor-not-allowed bg-gray-50'
                  : 'border-[#bfcaba] text-[#181d16] hover:bg-[#f7fbf0]'
              }`}
              title="Trang trước"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`w-8 h-8 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  validCurrentPage === page
                    ? 'bg-[#176a22] text-white shadow-xs'
                    : 'bg-white text-[#40493d] border border-[#e0e4d9] hover:bg-[#f7fbf0]'
                }`}
              >
                {page}
              </button>
            ))}

            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={validCurrentPage === totalPages}
              className={`p-1.5 rounded-lg border transition-all cursor-pointer flex items-center ${
                validCurrentPage === totalPages
                  ? 'border-[#e0e4d9] text-[#bfcaba] cursor-not-allowed bg-gray-50'
                  : 'border-[#bfcaba] text-[#181d16] hover:bg-[#f7fbf0]'
              }`}
              title="Trang tiếp"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* MODAL 1: ADD NEW CATEGORY (Thêm Danh Mục Mới) */}
      {showAddCategoryModal && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full border border-[#e0e4d9] p-6 shadow-xl space-y-4 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-[#e0e4d9] pb-3">
              <h3 className="text-base font-bold text-[#181d16] flex items-center space-x-2">
                <FolderPlus className="w-5 h-5 text-[#176a22]" />
                <span>Thêm Danh Mục Sản Phẩm Nông Sản Mới</span>
              </h3>
              <button
                onClick={() => setShowAddCategoryModal(false)}
                className="text-[#707a6c] hover:text-[#181d16] p-1 rounded-lg cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateCategory} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-[#181d16] mb-1">
                  Tên Danh Mục Nông Sản <span className="text-[#ba1a1a]">*</span>:
                </label>
                <input
                  type="text"
                  required
                  value={newCatName}
                  onChange={(e) => setNewCatName(e.target.value)}
                  placeholder="Ví dụ: Thủy Hải Sản Nước Ngọt, Trái Cây Sấy Hữu Cơ..."
                  className="w-full p-2.5 bg-[#f7fbf0] border border-[#bfcaba] rounded-xl text-[#181d16] font-medium focus:outline-none focus:ring-2 focus:ring-[#176a22]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-[#181d16] mb-1">Mã Danh Mục:</label>
                  <input
                    type="text"
                    value={newCatCode}
                    onChange={(e) => setNewCatCode(e.target.value)}
                    placeholder="Ví dụ: DM-HAI-SAN"
                    className="w-full p-2.5 bg-[#f7fbf0] border border-[#bfcaba] rounded-xl text-[#181d16] font-mono focus:outline-none focus:ring-2 focus:ring-[#176a22]"
                  />
                </div>

                <div>
                  <label className="block font-bold text-[#181d16] mb-1">Biểu tượng hiển thị:</label>
                  <select
                    value={newCatIcon}
                    onChange={(e) => setNewCatIcon(e.target.value as any)}
                    className="w-full p-2.5 bg-[#f7fbf0] border border-[#bfcaba] rounded-xl text-[#181d16] font-semibold focus:outline-none cursor-pointer"
                  >
                    <option value="fruit">🍎 Trái cây ăn quả</option>
                    <option value="veg">🥕 Rau củ củ quả</option>
                    <option value="coffee">☕ Cà phê & Hạt</option>
                    <option value="grain">🌾 Lúa gạo & Lương thực</option>
                    <option value="seafood">🐟 Thủy hải sản</option>
                    <option value="sprout">🌱 Nông sản tổng hợp</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold text-[#181d16] mb-1">Mô tả danh mục:</label>
                <textarea
                  rows={2}
                  value={newCatDesc}
                  onChange={(e) => setNewCatDesc(e.target.value)}
                  placeholder="Mô tả tiêu chuẩn, đặc tính các sản phẩm thuộc danh mục này..."
                  className="w-full p-2.5 bg-[#f7fbf0] border border-[#bfcaba] rounded-xl text-[#181d16] focus:outline-none focus:ring-2 focus:ring-[#176a22]"
                />
              </div>

              <div>
                <label className="block font-bold text-[#181d16] mb-1">
                  Chứng nhận tiêu chuẩn hỗ trợ (ngăn cách bằng dấu phẩy):
                </label>
                <input
                  type="text"
                  value={newCatCerts}
                  onChange={(e) => setNewCatCerts(e.target.value)}
                  placeholder="VietGAP, GlobalGAP, Organic EU, OCOP..."
                  className="w-full p-2.5 bg-[#f7fbf0] border border-[#bfcaba] rounded-xl text-[#181d16] focus:outline-none focus:ring-2 focus:ring-[#176a22]"
                />
              </div>

              <div className="pt-3 border-t border-[#e0e4d9] flex items-center justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setShowAddCategoryModal(false)}
                  className="px-4 py-2 bg-[#e0e4d9] text-[#40493d] rounded-xl font-bold cursor-pointer hover:bg-[#d0d4c9]"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#176a22] text-white rounded-xl font-bold cursor-pointer hover:bg-[#13561b] shadow-xs flex items-center space-x-1.5"
                >
                  <FolderPlus className="w-4 h-4" />
                  <span>Tạo Danh Mục</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 2: ADD NEW PRODUCT */}
      {showAddProductModal && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full border border-[#e0e4d9] p-6 shadow-xl space-y-4 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-[#e0e4d9] pb-3">
              <h3 className="text-base font-bold text-[#181d16] flex items-center space-x-2">
                <Package className="w-5 h-5 text-[#176a22]" />
                <span>Thêm Sản Phẩm Nông Sản Mới</span>
              </h3>
              <button
                onClick={() => setShowAddProductModal(false)}
                className="text-[#707a6c] hover:text-[#181d16] p-1 rounded-lg cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateProduct} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-[#181d16] mb-1">
                  Tên Sản Phẩm Nông Sản <span className="text-[#ba1a1a]">*</span>:
                </label>
                <input
                  type="text"
                  required
                  value={newProdName}
                  onChange={(e) => setNewProdName(e.target.value)}
                  placeholder="Ví dụ: Vải Thiều Lục Ngạn, Bơ Boot 7 Đắk Lắk..."
                  className="w-full p-2.5 bg-[#f7fbf0] border border-[#bfcaba] rounded-xl text-[#181d16] font-medium focus:outline-none focus:ring-2 focus:ring-[#176a22]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-[#181d16] mb-1">Danh Mục Thuộc Về:</label>
                  <select
                    value={newProdCatId}
                    onChange={(e) => setNewProdCatId(e.target.value)}
                    className="w-full p-2.5 bg-[#f7fbf0] border border-[#bfcaba] rounded-xl text-[#181d16] font-semibold focus:outline-none cursor-pointer"
                  >
                    {categories.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-[#181d16] mb-1">Giá Tham Chiếu / kg:</label>
                  <input
                    type="text"
                    value={newProdPrice}
                    onChange={(e) => setNewProdPrice(e.target.value)}
                    placeholder="Ví dụ: 75,000đ"
                    className="w-full p-2.5 bg-[#f7fbf0] border border-[#bfcaba] rounded-xl text-[#181d16] font-bold focus:outline-none focus:ring-2 focus:ring-[#176a22]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-[#181d16] mb-1">Vùng Trồng / Xuất Xứ:</label>
                  <input
                    type="text"
                    value={newProdOrigin}
                    onChange={(e) => setNewProdOrigin(e.target.value)}
                    placeholder="Lâm Đồng, Bắc Giang, An Giang..."
                    className="w-full p-2.5 bg-[#f7fbf0] border border-[#bfcaba] rounded-xl text-[#181d16] focus:outline-none focus:ring-2 focus:ring-[#176a22]"
                  />
                </div>

                <div>
                  <label className="block font-bold text-[#181d16] mb-1">Sản Lượng Tồn Kho:</label>
                  <input
                    type="text"
                    value={newProdStock}
                    onChange={(e) => setNewProdStock(e.target.value)}
                    placeholder="100 Tấn"
                    className="w-full p-2.5 bg-[#f7fbf0] border border-[#bfcaba] rounded-xl text-[#181d16] focus:outline-none focus:ring-2 focus:ring-[#176a22]"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-[#181d16] mb-1">Nhà Cung Cấp / Nông Trại:</label>
                <input
                  type="text"
                  value={newProdSupplier}
                  onChange={(e) => setNewProdSupplier(e.target.value)}
                  placeholder="HTX Nông Sản Xuất Nhập Khẩu"
                  className="w-full p-2.5 bg-[#f7fbf0] border border-[#bfcaba] rounded-xl text-[#181d16] focus:outline-none focus:ring-2 focus:ring-[#176a22]"
                />
              </div>

              <div className="pt-3 border-t border-[#e0e4d9] flex items-center justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setShowAddProductModal(false)}
                  className="px-4 py-2 bg-[#e0e4d9] text-[#40493d] rounded-xl font-bold cursor-pointer hover:bg-[#d0d4c9]"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#176a22] text-white rounded-xl font-bold cursor-pointer hover:bg-[#13561b] shadow-xs flex items-center space-x-1.5"
                >
                  <Plus className="w-4 h-4" />
                  <span>Tạo Sản Phẩm</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
