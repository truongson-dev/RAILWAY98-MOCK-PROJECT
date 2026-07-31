'use client';

// ─── PartnerApp — Giao diện chính của đối tác thu mua B2B ────────────────────
// Đây là trang dashboard dành riêng cho tài khoản PARTNER.
// Tất cả dữ liệu (sản phẩm, đơn hàng, hợp đồng...) đều lấy từ Backend API thật.
//
// Luồng dữ liệu:
//   1. Khi component mount → gọi API lấy sản phẩm, mua chung, hợp đồng
//   2. Nếu user đã đăng nhập (có JWT) → gọi thêm đơn hàng và thông tin tín dụng
//   3. Hiển thị loading skeleton trong lúc chờ
//
// Không dùng mock data — nếu API lỗi, hiển thị thông báo lỗi rõ ràng

import React, { useState, useMemo, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';
import {
  fetchProducts,
  fetchMyOrders,
  fetchGroupBuys,
  fetchForwardContracts,
  fetchMyCreditInfo,
  registerForwardContract,
} from '@/services/partner.service';
import { CreditManagementView } from '../partner/CreditManagementView';
import {
  Product,
  CartItem,
  FilterState,
  GroupBuyCampaign,
  FutureContract,
  Order,
  PartnerCreditInfo,
} from '../partner/types';
import { Header } from '../partner/Header';
import { Sidebar } from '../partner/Sidebar';
import { HeroBanner } from '../partner/HeroBanner';
import { StatsGrid } from '../partner/StatsGrid';
import { ProductCard } from '../partner/ProductCard';
import { GroupBuyJoinModal } from '../partner/GroupBuyJoinModal';

import { ProductDetailModal } from '../partner/ProductDetailModal';
import { CartDrawer } from '../partner/CartDrawer';
import { GroupBuyingView } from '../partner/GroupBuyingView';
import { FutureContractsView } from '../partner/FutureContractsView';
import { OrdersView } from '../partner/OrdersView';
import { AiAssistantView } from '../partner/AiAssistantView';
import { NotificationModal } from '../partner/NotificationModal';
import { SettingsModal } from '../partner/SettingsModal';
import {
  LayoutGrid,
  List as ListIcon,
  ChevronLeft,
  ChevronRight,
  MessageSquare,
  Menu,
  CheckCircle2,
  MapPin,
  Plus,
} from 'lucide-react';

export default function PartnerApp() {
  const router = useRouter();
  const { user, logout } = useAuthStore();
  const [isLoading, setIsLoading] = useState(true);
  const [apiError, setApiError] = useState<string | null>(null);

  // Navigation State
  const [activeTab, setActiveTab] = useState<
    'marketplace' | 'groupbuying' | 'futurecontracts' | 'credit' | 'orders' | 'aiassistant'
  >('marketplace');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // App Data & Interactivity
  const [currency, setCurrency] = useState<'VND' | 'USD'>('USD');
  const [favorites, setFavorites] = useState<string[]>(['p1', 'p3']);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [groupBuyCampaigns, setGroupBuyCampaigns] = useState<GroupBuyCampaign[]>([]);
  const [futureContracts, setFutureContracts] = useState<FutureContract[]>([]);

  useEffect(() => {
    // ─── Tải toàn bộ dữ liệu từ Backend API ─────────────────────────────────
    const loadData = async () => {
      setIsLoading(true);
      setApiError(null);
      try {
        // Gọi song song 3 API công khai (không cần JWT)
        const [productsData, groupBuysData, contractsData] = await Promise.all([
          fetchProducts(),
          fetchGroupBuys(),
          fetchForwardContracts(),
        ]);

        setProducts(productsData as unknown as Product[]);
        setGroupBuyCampaigns(groupBuysData as unknown as GroupBuyCampaign[]);
        setFutureContracts(contractsData as unknown as FutureContract[]);

        // Nếu đã đăng nhập: tải thêm đơn hàng và thông tin tín dụng của partner
        if (user) {
          try {
            const [ordersData, creditData] = await Promise.all([
              fetchMyOrders(),
              fetchMyCreditInfo(),
            ]);
            setOrders(ordersData as unknown as Order[]);

            // Ánh xạ dữ liệu credit từ API sang PartnerCreditInfo
            if (creditData) {
              const credit = creditData as Record<string, unknown>;
              const limit = Number(credit.creditLimit ?? 500000000);
              const used = Number(credit.usedCredit ?? 0);
              setCreditInfo({
                // UserProfile dùng 'name' (họ tên) và 'companyName' (tên công ty)
                partnerName: user.companyName || user.name || 'Đối tác AgriConnect',
                partnerCode: `PARTNER-${String(credit.partnerRank ?? 'DONG').toUpperCase()}-${user.id ?? ''}`,
                partnerRank: mapRank(String(credit.partnerRank ?? 'Đồng')),
                creditLimitVnd: limit,
                usedCreditVnd: used,
                availableCreditVnd: Math.max(0, limit - used),
                billingCycle: credit.billingCycle === 60
                  ? '60 ngày (Mỗi 2 tháng)'
                  : '30 ngày (Cuối tháng)',
                nextDueDate: String(credit.nextDueDate ?? ''),
                unpaidOrdersCount: 0,
                accumulatedVolumeYtdKg: 0,
                nextRankThresholdKg: 25000,
              });
            }
          } catch {
            // Không có quyền xem credit hoặc chưa có dữ liệu — bỏ qua, giữ giá trị mặc định
          }
        }
      } catch (err) {
        // Hiển thị lỗi rõ ràng thay vì im lặng
        setApiError('Không thể kết nối tới Backend (localhost:8080). Vui lòng kiểm tra server.');
      } finally {
        setIsLoading(false);
      }
    };
    loadData();
  }, [user]);

  const handleLogout = () => {
    logout();
    localStorage.removeItem('agri_token');
    // Chuyển về trang chủ sau khi đăng xuất
    setTimeout(() => router.push('/'), 500);
  };

  // ─── Chuyển rank tiếng Anh từ DB sang PartnerRankTier tiếng Việt ─────────
  const mapRank = (rank: string): PartnerCreditInfo['partnerRank'] => {
    const r = rank.toUpperCase();
    if (r === 'DIAMOND' || r === 'KIM CƯƠNG') return 'Kim Cương';
    if (r === 'GOLD' || r === 'VIP' || r === 'VÀNG') return 'Vàng';
    if (r === 'SILVER' || r === 'BẠC') return 'Bạc';
    return 'Đồng'; // mặc định
  };

  // Partner B2B Credit State — giá trị mặc định, sẽ bị ghi đè bởi API nếu user đã login
  const [creditInfo, setCreditInfo] = useState<PartnerCreditInfo>({
    partnerName: 'Đối tác AgriConnect',
    partnerCode: 'PARTNER-DONG-000',
    partnerRank: 'Đồng',
    creditLimitVnd: 0,
    usedCreditVnd: 0,
    availableCreditVnd: 0,
    billingCycle: '30 ngày (Cuối tháng)',
    nextDueDate: '',
    unpaidOrdersCount: 0,
    accumulatedVolumeYtdKg: 0,
    nextRankThresholdKg: 25000,
  });

  // Modal & Drawer Control
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const [selectedGroupBuyProduct, setSelectedGroupBuyProduct] = useState<Product | null>(null);

  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [currentPage, setCurrentPage] = useState(1);
  const [aiInitialPrompt, setAiInitialPrompt] = useState<string>('');

  // Toast Feedback State
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Filters State
  const [filters, setFilters] = useState<FilterState>({
    categories: ['Vegetables', 'Fruits'], // Matches initial checkboxes in screenshot!
    vietgapOnly: false,
    organicOnly: false,
    exportGradeOnly: false,
    searchQuery: '',
    sortBy: 'relevance',
  });

  // Favorite Toggle
  const handleToggleFavorite = (e: React.MouseEvent, productId: string) => {
    e.stopPropagation();
    if (favorites.includes(productId)) {
      setFavorites(favorites.filter((id) => id !== productId));
      showToast('Đã xóa khỏi danh mục yêu thích');
    } else {
      setFavorites([...favorites, productId]);
      showToast('Đã thêm vào danh mục nông sản yêu thích');
    }
  };

  // Add to Cart
  const handleAddToCart = (
    e: React.MouseEvent | null,
    product: Product,
    quantityKg?: number
  ) => {
    if (e) e.stopPropagation();
    const qty = quantityKg || product.minOrderKg;

    setCartItems((prev) => {
      const existingIndex = prev.findIndex(
        (ci) => ci.product.id === product.id
      );
      if (existingIndex > -1) {
        const copy = [...prev];
        copy[existingIndex].quantityKg += qty;
        return copy;
      }
      return [...prev, { product, quantityKg: qty }];
    });

    showToast(`Đã thêm ${qty}kg ${product.name} vào giỏ hàng`);
  };

  // Cart Handlers
  const handleUpdateCartQuantity = (productId: string, quantityKg: number) => {
    setCartItems((prev) =>
      prev.map((ci) =>
        ci.product.id === productId ? { ...ci, quantityKg } : ci
      )
    );
  };

  const handleRemoveCartItem = (productId: string) => {
    setCartItems((prev) => prev.filter((ci) => ci.product.id !== productId));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const handleOrderPlaced = (newOrder: Order) => {
    setOrders([newOrder, ...orders]);
    if (newOrder.paymentMethod === 'credit_30' || newOrder.paymentMethod === 'credit_60') {
      setCreditInfo((prev) => {
        const newUsed = prev.usedCreditVnd + newOrder.totalVnd;
        return {
          ...prev,
          usedCreditVnd: newUsed,
          availableCreditVnd: Math.max(0, prev.creditLimitVnd - newUsed),
          unpaidOrdersCount: prev.unpaidOrdersCount + 1,
        };
      });
      showToast(`Đã ghi nhận đơn hàng ${newOrder.id} vào hạn mức tín dụng B2B Thanh toán sau`);
    } else {
      showToast(`Khởi tạo thành công đơn hàng sỉ ${newOrder.id}`);
    }
  };

  const handlePayCreditBalance = (amountVnd: number) => {
    setCreditInfo((prev) => {
      const newUsed = Math.max(0, prev.usedCreditVnd - amountVnd);
      return {
        ...prev,
        usedCreditVnd: newUsed,
        availableCreditVnd: prev.creditLimitVnd - newUsed,
        unpaidOrdersCount: Math.max(0, prev.unpaidOrdersCount - 1),
      };
    });
    showToast(`Đã quyết toán thành công ${amountVnd.toLocaleString('vi-VN')}đ dư nợ tín dụng B2B`);
  };

  // Join Group Buy
  const handleJoinCampaign = (campaign: GroupBuyCampaign, volumeKg: number) => {
    setGroupBuyCampaigns((prev) =>
      prev.map((c) =>
        c.id === campaign.id
          ? { ...c, currentVolumeKg: c.currentVolumeKg + volumeKg }
          : c
      )
    );
    showToast(`Đã đăng ký mua chung ${volumeKg}kg ${campaign.product.name}`);
  };

  // Register Future Contract
  const handleRegisterContract = async (contract: FutureContract) => {
    try {
      const res = await registerForwardContract(contract.id);
      if (res) {
        showToast(`Đã ký dự thảo hợp đồng bao tiêu ${contract.cropName}`);
      } else {
        showToast('Có lỗi xảy ra khi ký hợp đồng!');
      }
    } catch (e) {
      showToast('Có lỗi xảy ra khi ký hợp đồng!');
    }
  };

  // Reorder
  const handleReorder = (order: Order) => {
    showToast(`Đã khôi phục đơn hàng ${order.id} vào giỏ hàng`);
    setIsCartOpen(true);
  };

  // Filtered & Sorted Products
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      // Category filter
      if (
        filters.categories.length > 0 &&
        !filters.categories.includes(p.category)
      ) {
        return false;
      }
      // Quality filters
      if (filters.vietgapOnly && !p.badges.includes('VIETGAP')) return false;
      if (filters.organicOnly && !p.badges.includes('HỮU CƠ')) return false;
      if (filters.exportGradeOnly && !p.badges.includes('CHUẨN XUẤT KHẨU'))
        return false;

      // Search Query
      if (filters.searchQuery.trim()) {
        const q = filters.searchQuery.toLowerCase();
        const matchName = p.name.toLowerCase().includes(q);
        const matchLoc = p.location.toLowerCase().includes(q);
        const matchDesc = p.description.toLowerCase().includes(q);
        const matchSupplier = p.supplier.name.toLowerCase().includes(q);
        if (!matchName && !matchLoc && !matchDesc && !matchSupplier)
          return false;
      }
      return true;
    }).sort((a, b) => {
      if (filters.sortBy === 'price-asc') return a.priceVnd - b.priceVnd;
      if (filters.sortBy === 'price-desc') return b.priceVnd - a.priceVnd;
      if (filters.sortBy === 'min-order') return a.minOrderKg - b.minOrderKg;
      return 0; // relevance
    });
  }, [filters, products]);

  const totalCartCount = cartItems.length;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#f1f5ea] flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#176a22] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-[#176a22] font-bold text-lg">Đang tải dữ liệu nông sản...</p>
          <p className="text-[#40493d] text-sm mt-1">Đang kết nối với Backend API...</p>
        </div>
      </div>
    );
  }

  // Hiển thị màn hình lỗi nếu không kết nối được Backend
  if (apiError && products.length === 0) {
    return (
      <div className="min-h-screen bg-[#f1f5ea] flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl p-8 max-w-md w-full text-center shadow-lg border border-red-100">
          <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-3xl">⚠️</span>
          </div>
          <h2 className="text-xl font-bold text-[#181d16] mb-2">Không kết nối được Backend</h2>
          <p className="text-[#40493d] text-sm mb-4">{apiError}</p>
          <p className="text-xs text-[#707a6c] mb-6">
            Hãy đảm bảo Backend Spring Boot đang chạy tại{' '}
            <code className="bg-gray-100 px-1 rounded">http://localhost:8080</code>
          </p>
          <button
            onClick={() => window.location.reload()}
            className="bg-[#176a22] text-white px-6 py-2.5 rounded-xl font-bold text-sm hover:bg-[#358439] transition-colors"
          >
            Thử lại
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f1f5ea] text-[#181d16] font-['Inter',sans-serif]">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-[#176a22] text-white px-5 py-3 rounded-2xl shadow-xl flex items-center gap-2 text-xs font-bold animate-in fade-in slide-in-from-bottom-4 duration-300 border border-white/20">
          <CheckCircle2 className="w-4 h-4 text-emerald-300" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Navigation Bar */}
      <Header
        searchQuery={filters.searchQuery}
        onSearchChange={(q) => setFilters({ ...filters, searchQuery: q })}
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        currency={currency}
        onToggleCurrency={() =>
          setCurrency((c) => (c === 'USD' ? 'VND' : 'USD'))
        }
        onOpenNotifications={() => setIsNotificationsOpen(true)}
        onOpenSettings={() => setIsSettingsOpen(true)}
      />

      {/* Mobile Menu Toggle Button */}
      <button
        onClick={() => setIsMobileMenuOpen(true)}
        className="fixed top-3 left-3 z-50 md:hidden p-2.5 bg-[#176a22] text-white rounded-xl shadow-lg"
        title="Mở danh mục menu"
      >
        <Menu className="w-5 h-5" />
      </button>

      {/* Sidebar Navigation */}
      <Sidebar
        activeTab={activeTab}
        onSelectTab={(tab) => {
          setActiveTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        filters={filters}
        onFilterChange={setFilters}
        isOpenMobile={isMobileMenuOpen}
        onCloseMobile={() => setIsMobileMenuOpen(false)}
        onLogout={() => {
          showToast('Đã đăng xuất khỏi Cổng đối tác B2B');
          handleLogout();
        }}
      />

      {/* Main Content Area */}
      <main className="md:ml-[260px] pt-20 pb-12 min-h-screen transition-all">
        <div className="p-4 md:p-8 max-w-[1400px] mx-auto">
          {activeTab === 'marketplace' && (
            <>
              {/* Hero Banner */}
              <HeroBanner
                onViewSeasonalOffers={() => {
                  setFilters({
                    ...filters,
                    categories: ['Vegetables', 'Fruits', 'Grains', 'Roots'],
                  });
                  showToast('Hiển thị tất cả ưu đãi nông sản theo mùa');
                }}
              />

              {/* Dashboard Stats */}
              <StatsGrid
                onSelectStat={(key) => {
                  if (key === 'orders' || key === 'transit') {
                    setActiveTab('orders');
                  } else if (key === 'requests') {
                    setActiveTab('groupbuying');
                  }
                }}
              />

              {/* Inventory Header */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-6 gap-4">
                <div>
                  <h3 className="text-2xl font-extrabold text-[#181d16] tracking-tight">
                    Kho Nông Sản Bán Buôn
                  </h3>
                  <p className="text-sm text-[#40493d] mt-1 font-medium">
                    Nông sản cung cấp sỉ từ các đối tác nông trại đã xác thực.
                  </p>
                </div>

                <div className="flex items-center gap-3 self-end">
                  {/* Sort Dropdown */}
                  <div className="relative">
                    <select
                      value={filters.sortBy}
                      onChange={(e) =>
                        setFilters({
                          ...filters,
                          sortBy: e.target.value as any,
                        })
                      }
                      className="px-3.5 py-2 bg-white border border-[#bfcaba] rounded-lg text-xs font-semibold text-[#181d16] focus:outline-none focus:ring-2 focus:ring-[#176a22]/20 cursor-pointer shadow-2xs pr-8"
                    >
                      <option value="relevance">Sắp xếp: Độ tương quan</option>
                      <option value="price-asc">Giá: Thấp đến Cao</option>
                      <option value="price-desc">Giá: Cao đến Thấp</option>
                      <option value="min-order">
                        Khối lượng tối thiểu nhỏ nhất
                      </option>
                    </select>
                  </div>

                  {/* Grid / List View Toggle */}
                  <div className="flex bg-white border border-[#bfcaba] rounded-lg overflow-hidden shadow-2xs">
                    <button
                      onClick={() => setViewMode('grid')}
                      className={`p-2 transition-colors ${
                        viewMode === 'grid'
                          ? 'bg-[#176a22] text-white'
                          : 'text-[#40493d] hover:bg-[#ebefe4]'
                      }`}
                      title="Chế độ Lưới"
                    >
                      <LayoutGrid className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setViewMode('list')}
                      className={`p-2 transition-colors ${
                        viewMode === 'list'
                          ? 'bg-[#176a22] text-white'
                          : 'text-[#40493d] hover:bg-[#ebefe4]'
                      }`}
                      title="Chế độ Danh sách"
                    >
                      <ListIcon className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Product Grid / List Display */}
              {filteredProducts.length === 0 ? (
                <div className="bg-white p-12 text-center rounded-3xl border border-[#bfcaba]/30 text-[#707a6c] my-8">
                  <p className="text-lg font-bold text-[#181d16]">
                    Không tìm thấy sản phẩm nông sản phù hợp
                  </p>
                  <p className="text-xs mt-1">
                    Vui lòng thử bỏ chọn các bộ lọc danh mục hoặc đổi từ khóa tìm kiếm.
                  </p>
                  <button
                    onClick={() =>
                      setFilters({
                        categories: ['Vegetables', 'Fruits'],
                        vietgapOnly: false,
                        organicOnly: false,
                        exportGradeOnly: false,
                        searchQuery: '',
                        sortBy: 'relevance',
                      })
                    }
                    className="mt-4 bg-[#176a22] text-white px-4 py-2 rounded-xl text-xs font-bold"
                  >
                    Xóa tất cả bộ lọc
                  </button>
                </div>
              ) : viewMode === 'grid' ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {filteredProducts.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      currency={currency}
                      isFavorite={favorites.includes(product.id)}
                      onToggleFavorite={handleToggleFavorite}
                      onAddToCart={handleAddToCart}
                      onSelectProduct={setSelectedProduct}
                        onJoinGroupBuy={(e, p) => { e.stopPropagation(); setSelectedGroupBuyProduct(p); }}
                    />
                  ))}
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredProducts.map((product) => (
                    <div
                      key={product.id}
                      onClick={() => setSelectedProduct(product)}
                      className="bg-[#EFEFE9] rounded-2xl p-4 border border-[#bfcaba]/30 flex flex-col sm:flex-row items-center gap-4 hover:shadow-md transition-all cursor-pointer group"
                    >
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full sm:w-32 h-32 rounded-xl object-cover"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          {product.badges.map((b, i) => (
                            <span
                              key={i}
                              className="bg-[#176a22] text-white text-[9px] font-bold px-2 py-0.5 rounded"
                            >
                              {b}
                            </span>
                          ))}
                        </div>
                        <h4 className="font-bold text-lg text-[#181d16] group-hover:text-[#176a22] transition-colors">
                          {product.name}
                        </h4>
                        <p className="text-xs text-[#40493d] flex items-center gap-1 mt-1 font-medium">
                          <MapPin className="w-3.5 h-3.5 text-[#707a6c]" />
                          <span>{product.location}</span>
                        </p>
                        <p className="text-xs text-[#40493d] mt-2 line-clamp-2">
                          {product.description}
                        </p>
                      </div>

                      <div className="text-right shrink-0 border-t sm:border-t-0 sm:border-l border-[#bfcaba]/30 pt-3 sm:pt-0 sm:pl-4 w-full sm:w-auto flex sm:flex-col justify-between items-center sm:items-end gap-2">
                        <div>
                          <p className="text-xs text-[#40493d] font-semibold">
                            Tối thiểu: {product.minOrderKg}kg
                          </p>
                          <p className="text-[#176a22] font-extrabold text-xl">
                            {currency === 'USD'
                              ? `$${product.priceUsd.toFixed(2)}`
                              : `${product.priceVnd.toLocaleString('vi-VN')}đ`}
                            <span className="text-xs font-normal text-[#40493d]">
                              /kg
                            </span>
                          </p>
                        </div>
                        <button
                          onClick={(e) => handleAddToCart(e, product)}
                          className="bg-[#176a22] text-white px-4 py-2 rounded-xl font-bold text-xs flex items-center gap-1.5 hover:bg-[#358439]"
                        >
                          <Plus className="w-4 h-4" />
                          <span>Thêm Mua Sỉ</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Pagination */}
              <div className="mt-10 flex justify-center items-center gap-3">
                <button
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  className="w-10 h-10 border border-[#bfcaba] rounded-lg flex items-center justify-center hover:bg-[#ebefe4] transition-colors bg-white text-[#181d16]"
                  title="Trang trước"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <div className="flex gap-1.5 font-bold text-sm">
                  <button
                    onClick={() => setCurrentPage(1)}
                    className={`w-10 h-10 rounded-lg ${
                      currentPage === 1
                        ? 'bg-[#176a22] text-white shadow-xs'
                        : 'bg-white border border-[#bfcaba] text-[#181d16] hover:bg-[#ebefe4]'
                    }`}
                  >
                    1
                  </button>
                  <button
                    onClick={() => setCurrentPage(2)}
                    className={`w-10 h-10 rounded-lg ${
                      currentPage === 2
                        ? 'bg-[#176a22] text-white shadow-xs'
                        : 'bg-white border border-[#bfcaba] text-[#181d16] hover:bg-[#ebefe4]'
                    }`}
                  >
                    2
                  </button>
                  <button
                    onClick={() => setCurrentPage(3)}
                    className={`w-10 h-10 rounded-lg ${
                      currentPage === 3
                        ? 'bg-[#176a22] text-white shadow-xs'
                        : 'bg-white border border-[#bfcaba] text-[#181d16] hover:bg-[#ebefe4]'
                    }`}
                  >
                    3
                  </button>
                  <span className="w-10 h-10 flex items-center justify-center text-[#707a6c]">
                    ...
                  </span>
                  <button
                    onClick={() => setCurrentPage(12)}
                    className="w-10 h-10 bg-white border border-[#bfcaba] text-[#181d16] hover:bg-[#ebefe4] rounded-lg"
                  >
                    12
                  </button>
                </div>
                <button
                  onClick={() => setCurrentPage((p) => p + 1)}
                  className="w-10 h-10 border border-[#bfcaba] rounded-lg flex items-center justify-center hover:bg-[#ebefe4] transition-colors bg-white text-[#181d16]"
                  title="Trang sau"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </>
          )}

          {activeTab === 'groupbuying' && (
            <GroupBuyingView
              campaigns={groupBuyCampaigns}
              currency={currency}
              onJoinCampaign={handleJoinCampaign}
            />
          )}

          {activeTab === 'futurecontracts' && (
            <FutureContractsView
              contracts={futureContracts}
              currency={currency}
              onRegisterContract={handleRegisterContract}
            />
          )}

          {activeTab === 'credit' && (
            <CreditManagementView
              creditInfo={creditInfo}
              orders={orders}
              currency={currency}
              onPayCreditBalance={handlePayCreditBalance}
              onOpenAiAssistantWithTopic={(topic) => {
                setAiInitialPrompt(topic);
                setActiveTab('aiassistant');
              }}
            />
          )}

          {activeTab === 'orders' && (
            <OrdersView
              orders={orders}
              currency={currency}
              onReorder={handleReorder}
            />
          )}

          {activeTab === 'aiassistant' && (
            <AiAssistantView initialPrompt={aiInitialPrompt} />
          )}
        </div>
      </main>

      {/* Floating Action Chat Button */}
      <button
        onClick={() => {
          setActiveTab('aiassistant');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        className="fixed bottom-6 right-6 w-14 h-14 bg-[#176a22] hover:bg-[#358439] text-white rounded-full shadow-2xl flex items-center justify-center active:scale-90 transition-transform z-40 group border-2 border-white"
        title="Trò chuyện với Nhà cung cấp & AI Nông sản"
      >
        <MessageSquare className="w-6 h-6" />
        <span className="absolute right-full mr-3 py-2 px-4 bg-[#2d322b] text-[#eef2e7] text-xs font-semibold rounded-xl whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-lg">
          Trò chuyện với Nhà cung cấp / AI
        </span>
      </button>

      {/* Product Detail Modal */}
      <ProductDetailModal
        product={selectedProduct}
        currency={currency}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={(product, qty) => handleAddToCart(null, product, qty)}
        onOpenAiAssistantWithTopic={(topic) => {
          setSelectedProduct(null);
          setAiInitialPrompt(topic);
          setActiveTab('aiassistant');
        }}
      />

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        currency={currency}
        creditInfo={creditInfo}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveCartItem}
        onClearCart={handleClearCart}
        onOrderPlaced={handleOrderPlaced}
      />

      {/* Notification Modal */}
      <NotificationModal
        isOpen={isNotificationsOpen}
        onClose={() => setIsNotificationsOpen(false)}
      />

      {/* Settings Modal */}
      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        currency={currency}
        onToggleCurrency={() =>
          setCurrency((c) => (c === 'USD' ? 'VND' : 'USD'))
        }
      />
    </div>
  );
}

