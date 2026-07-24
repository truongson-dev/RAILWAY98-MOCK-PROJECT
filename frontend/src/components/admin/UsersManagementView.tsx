'use client';
// Đây là component thuộc giao diện Admin
import React, { useState, useMemo } from 'react';
import { 
  Search, Plus, Star, Filter, ChevronLeft, ChevronRight, SlidersHorizontal,
  Eye, Ban, CheckCircle2, Shield, Edit3, Trash2, X, Building, Truck, Award,
  AlertTriangle, RefreshCw, FileText, Lock, Unlock, ShieldAlert
} from 'lucide-react';
import { SUPPLIERS_LIST, PARTNERS_LIST, LOGISTICS_LIST } from '@/data/admin.mockData';
import { SupplierItem, PartnerItem, LogisticsItem } from '@/types/admin.types';

interface UsersManagementViewProps {
  subTab?: 'suppliers' | 'partners' | 'logistics' | 'permissions';
}

// Component: UsersManagementView - Giao diện quản lý/hiển thị cho Admin
export const UsersManagementView: React.FC<UsersManagementViewProps> = ({ subTab = 'suppliers' }) => {
  const [activeSub, setActiveSub] = useState<'suppliers' | 'partners' | 'logistics'>(
    subTab === 'permissions' ? 'suppliers' : subTab
  );

  // Data states
  const [suppliers, setSuppliers] = useState<SupplierItem[]>(SUPPLIERS_LIST);
  const [partners, setPartners] = useState<PartnerItem[]>(PARTNERS_LIST);
  const [logistics, setLogistics] = useState<LogisticsItem[]>(LOGISTICS_LIST);

  // Filter & Search states
  const [searchQuery, setSearchQuery] = useState('');
  const [regionFilter, setRegionFilter] = useState('all');
  const [certFilter, setCertFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortBy, setSortBy] = useState<'rating' | 'name' | 'newest'>('newest');

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(6);

  // Detail / Admin Action Modal State
  const [selectedItem, setSelectedItem] = useState<SupplierItem | PartnerItem | LogisticsItem | null>(null);
  const [editLimitInput, setEditLimitInput] = useState('');
  const [addCertInput, setAddCertInput] = useState('');
  const [adminNoteInput, setAdminNoteInput] = useState('');
  const [showAdminNoteSuccess, setShowAdminNoteSuccess] = useState(false);

  // Switch Subtab
  const handleTabChange = (tab: 'suppliers' | 'partners' | 'logistics') => {
    setActiveSub(tab);
    setSearchQuery('');
    setRegionFilter('all');
    setCertFilter('all');
    setStatusFilter('all');
    setSortBy('newest');
    setCurrentPage(1);
    setSelectedItem(null);
  };

  // Open Detail Modal
  const handleOpenDetail = (item: SupplierItem | PartnerItem | LogisticsItem) => {
    setSelectedItem(item);
    setEditLimitInput(
      'fleetCapacity' in item ? (item as LogisticsItem).fleetCapacity : item.creditLimit || ''
    );
    setAddCertInput('');
    setAdminNoteInput('');
    setShowAdminNoteSuccess(false);
  };

  // Status Toggle Handler
  const handleToggleStatus = (itemId: string, targetStatus?: 'active' | 'suspended' | 'pending') => {
    const updateStatus = (current: 'active' | 'suspended' | 'pending') => {
      if (targetStatus) return targetStatus;
      return current === 'active' ? 'suspended' : 'active';
    };

    if (activeSub === 'suppliers') {
      setSuppliers(prev => prev.map(item => item.id === itemId ? { ...item, status: updateStatus(item.status) } : item));
    } else if (activeSub === 'partners') {
      setPartners(prev => prev.map(item => item.id === itemId ? { ...item, status: updateStatus(item.status) } : item));
    } else {
      setLogistics(prev => prev.map(item => item.id === itemId ? { ...item, status: updateStatus(item.status) } : item));
    }

    if (selectedItem && selectedItem.id === itemId) {
      setSelectedItem(prev => prev ? { ...prev, status: updateStatus(prev.status) } : null);
    }
  };

  // Update Limit or Capacity
  const handleUpdateLimit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedItem || !editLimitInput.trim()) return;

    if (activeSub === 'suppliers') {
      setSuppliers(prev => prev.map(item => item.id === selectedItem.id ? { ...item, creditLimit: editLimitInput } : item));
      setSelectedItem(prev => prev ? { ...prev, creditLimit: editLimitInput } : null);
    } else if (activeSub === 'partners') {
      setPartners(prev => prev.map(item => item.id === selectedItem.id ? { ...item, creditLimit: editLimitInput } : item));
      setSelectedItem(prev => prev ? { ...prev, creditLimit: editLimitInput } : null);
    } else {
      setLogistics(prev => prev.map(item => item.id === selectedItem.id ? { ...item, fleetCapacity: editLimitInput } : item));
      setSelectedItem(prev => prev ? { ...(prev as LogisticsItem), fleetCapacity: editLimitInput } : null);
    }
  };

  // Add Certification
  const handleAddCert = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedItem || !addCertInput.trim()) return;
    const cert = addCertInput.trim();

    if (selectedItem.certifications.includes(cert)) return;

    const newCerts = [...selectedItem.certifications, cert];

    if (activeSub === 'suppliers') {
      setSuppliers(prev => prev.map(item => item.id === selectedItem.id ? { ...item, certifications: newCerts } : item));
    } else if (activeSub === 'partners') {
      setPartners(prev => prev.map(item => item.id === selectedItem.id ? { ...item, certifications: newCerts } : item));
    } else {
      setLogistics(prev => prev.map(item => item.id === selectedItem.id ? { ...item, certifications: newCerts } : item));
    }

    setSelectedItem(prev => prev ? { ...prev, certifications: newCerts } : null);
    setAddCertInput('');
  };

  // Delete User / Entity
  const handleDeleteItem = (itemId: string) => {
    if (!window.confirm('Bạn có chắc chắn muốn xóa đối tượng người dùng này khỏi hệ thống không?')) return;

    if (activeSub === 'suppliers') {
      setSuppliers(prev => prev.filter(i => i.id !== itemId));
    } else if (activeSub === 'partners') {
      setPartners(prev => prev.filter(i => i.id !== itemId));
    } else {
      setLogistics(prev => prev.filter(i => i.id !== itemId));
    }

    if (selectedItem?.id === itemId) {
      setSelectedItem(null);
    }
  };

  // Active dataset reference
  const currentDataset = useMemo(() => {
    if (activeSub === 'suppliers') return suppliers;
    if (activeSub === 'partners') return partners;
    return logistics;
  }, [activeSub, suppliers, partners, logistics]);

  // Filtered & Sorted Current Dataset
  const filteredItems = useMemo(() => {
    return currentDataset
      .filter((item) => {
        // Search query filter
        const matchesSearch =
          item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.region.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.products.some((p) => p.toLowerCase().includes(searchQuery.toLowerCase()));

        // Region filter
        const matchesRegion = regionFilter === 'all' || item.region === regionFilter;

        // Cert filter
        const matchesCert =
          certFilter === 'all' || item.certifications.includes(certFilter);

        // Status filter
        const matchesStatus = statusFilter === 'all' || item.status === statusFilter;

        return matchesSearch && matchesRegion && matchesCert && matchesStatus;
      })
      .sort((a, b) => {
        if (sortBy === 'rating') return b.rating - a.rating;
        if (sortBy === 'name') return a.name.localeCompare(b.name);
        return 0; // newest keeps array order
      });
  }, [currentDataset, searchQuery, regionFilter, certFilter, statusFilter, sortBy]);

  // Pagination Math
  const totalItems = filteredItems.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / itemsPerPage));
  const validCurrentPage = Math.min(currentPage, totalPages);

  const paginatedItems = useMemo(() => {
    const startIdx = (validCurrentPage - 1) * itemsPerPage;
    return filteredItems.slice(startIdx, startIdx + itemsPerPage);
  }, [filteredItems, validCurrentPage, itemsPerPage]);

  const startItemNum = totalItems === 0 ? 0 : (validCurrentPage - 1) * itemsPerPage + 1;
  const endItemNum = Math.min(validCurrentPage * itemsPerPage, totalItems);

  // Tab configurations
  const tabConfigs = {
    suppliers: {
      title: 'Nhà Cung Cấp',
      countLabel: `(${suppliers.length})`,
      searchPlaceholder: 'Tìm nhà cung cấp, vùng trồng, sản phẩm...',
      addLabel: 'Thêm Nhà Cung Cấp',
      productsLabel: 'Sản phẩm chính',
      limitLabel: 'Hạn mức Tín dụng',
      volumeLabel: 'Sản lượng',
      emptyText: 'Không tìm thấy nhà cung cấp nào phù hợp'
    },
    partners: {
      title: 'Đối Tác Thu Mua',
      countLabel: `(${partners.length})`,
      searchPlaceholder: 'Tìm đối tác thu mua, thị trường, nông sản...',
      addLabel: 'Thêm Đối Tác Thu Mua',
      productsLabel: 'Nông sản thu mua',
      limitLabel: 'Ký quỹ Escrow',
      volumeLabel: 'Sản lượng thu mua',
      emptyText: 'Không tìm thấy đối tác thu mua nào phù hợp'
    },
    logistics: {
      title: 'Đơn Vị Vận Chuyển',
      countLabel: `(${logistics.length})`,
      searchPlaceholder: 'Tìm đơn vị vận chuyển, tuyến đường, dịch vụ...',
      addLabel: 'Thêm Đơn Vị Vận Chuyển',
      productsLabel: 'Dịch vụ vận tải',
      limitLabel: 'Năng lực vận tải',
      volumeLabel: 'Tần suất vận chuyển',
      emptyText: 'Không tìm thấy đơn vị vận chuyển nào phù hợp'
    }
  };

  const config = tabConfigs[activeSub];

  return (
    <div className="p-6 md:p-8 space-y-6 bg-[#f7fbf0] min-h-full">
      {/* Top Title & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-[#181d16]">Quản Lý Hệ Thống Người Dùng</h2>
          <p className="text-sm text-[#40493d] mt-1">
            Quản lý nhà cung cấp nông sản, đối tác thu mua, đơn vị vận chuyển lạnh và phân quyền admin
          </p>
        </div>
      </div>

      {/* Sub Tabs */}
      <div className="flex border-b border-[#e0e4d9] space-x-6 text-sm font-semibold text-[#707a6c]">
        <button
          onClick={() => handleTabChange('suppliers')}
          className={`pb-3 border-b-2 cursor-pointer transition-all ${activeSub === 'suppliers' ? 'border-[#176a22] text-[#176a22]' : 'border-transparent hover:text-[#181d16]'}`}
        >
          Nhà Cung Cấp {tabConfigs.suppliers.countLabel}
        </button>
        <button
          onClick={() => handleTabChange('partners')}
          className={`pb-3 border-b-2 cursor-pointer transition-all ${activeSub === 'partners' ? 'border-[#176a22] text-[#176a22]' : 'border-transparent hover:text-[#181d16]'}`}
        >
          Đối Tác Thu Mua {tabConfigs.partners.countLabel}
        </button>
        <button
          onClick={() => handleTabChange('logistics')}
          className={`pb-3 border-b-2 cursor-pointer transition-all ${activeSub === 'logistics' ? 'border-[#176a22] text-[#176a22]' : 'border-transparent hover:text-[#181d16]'}`}
        >
          Đơn Vị Vận Chuyển {tabConfigs.logistics.countLabel}
        </button>
      </div>

      {/* Main Content Area */}
      <div className="space-y-4">
        {/* Search, Filter & Sorting Bar */}
        <div className="bg-white p-4 rounded-xl border border-[#e0e4d9] flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#707a6c]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              placeholder={config.searchPlaceholder}
              className="w-full pl-9 pr-4 py-2 text-xs bg-[#f7fbf0] border border-[#bfcaba] rounded-lg text-[#181d16] focus:outline-none focus:ring-2 focus:ring-[#176a22]"
            />
          </div>

          {/* Filters */}
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <div className="flex items-center space-x-1.5 text-[#707a6c] mr-1">
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span className="font-medium">Lọc theo:</span>
            </div>

            {/* Trạng thái */}
            <select
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="px-3 py-1.5 bg-[#f7fbf0] border border-[#bfcaba] rounded-lg text-[#181d16] focus:outline-none cursor-pointer font-medium"
            >
              <option value="all">Tất cả Trạng thái</option>
              <option value="active">Hoạt động</option>
              <option value="suspended">Tạm ngưng</option>
              <option value="pending">Chờ duyệt</option>
            </select>

            {/* Vùng hoạt động */}
            <select
              value={regionFilter}
              onChange={(e) => {
                setRegionFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="px-3 py-1.5 bg-[#f7fbf0] border border-[#bfcaba] rounded-lg text-[#181d16] focus:outline-none cursor-pointer font-medium"
            >
              <option value="all">Tất cả Khu vực / Vùng trồng</option>
              <option value="Lâm Đồng">Lâm Đồng</option>
              <option value="Đắc Lắk">Đắc Lắk</option>
              <option value="An Giang">An Giang</option>
              <option value="Đồng Nai">Đồng Nai</option>
              <option value="Tiền Giang">Tiền Giang</option>
              <option value="Bến Tre">Bến Tre</option>
              <option value="Cần Thơ">Cần Thơ</option>
            </select>

            {/* Chứng nhận / Tiêu chuẩn */}
            <select
              value={certFilter}
              onChange={(e) => {
                setCertFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="px-3 py-1.5 bg-[#f7fbf0] border border-[#bfcaba] rounded-lg text-[#181d16] focus:outline-none cursor-pointer font-medium"
            >
              <option value="all">Tất cả Chứng nhận / Tiêu chuẩn</option>
              <option value="VietGAP">VietGAP</option>
              <option value="GlobalGAP">GlobalGAP</option>
              <option value="Organic EU">Organic EU</option>
              <option value="HACCP">HACCP</option>
              <option value="ISO 22000">ISO 22000</option>
              <option value="Escrow VIP">Escrow VIP</option>
              <option value="GPS Realtime">GPS Realtime</option>
              <option value="FDA Cleared">FDA Cleared</option>
            </select>

            {/* Sắp xếp */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'rating' | 'name' | 'newest')}
              className="px-3 py-1.5 bg-[#f7fbf0] border border-[#bfcaba] rounded-lg text-[#181d16] focus:outline-none cursor-pointer font-medium"
            >
              <option value="newest">Mới nhất</option>
              <option value="rating">Đánh giá cao nhất</option>
              <option value="name">Tên A-Z</option>
            </select>
          </div>
        </div>



        {/* Cards Grid */}
        {paginatedItems.length === 0 ? (
          <div className="bg-white p-12 rounded-xl border border-[#e0e4d9] text-center text-xs text-[#707a6c] space-y-2">
            <Filter className="w-8 h-8 mx-auto text-[#bfcaba]" />
            <p className="font-semibold text-sm text-[#181d16]">{config.emptyText}</p>
            <p>Thử điều kiện lọc hoặc từ khóa tìm kiếm khác</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {paginatedItems.map((item) => {
              const isLogistics = 'fleetCapacity' in item;
              const isSuspended = item.status === 'suspended';
              const isPending = item.status === 'pending';

              return (
                <div 
                  key={item.id} 
                  className={`bg-white rounded-xl p-5 border transition-all space-y-3 flex flex-col justify-between ${
                    isSuspended ? 'border-amber-300 bg-amber-50/20 shadow-2xs' : 'border-[#e0e4d9] shadow-2xs hover:shadow-sm'
                  }`}
                >
                  <div className="space-y-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center space-x-2">
                          <span className="text-[10px] font-mono font-bold text-[#707a6c] bg-[#f1f5ea] px-2 py-0.5 rounded">
                            {item.code}
                          </span>
                          {isSuspended && (
                            <span className="text-[10px] font-bold text-amber-700 bg-amber-100 px-1.5 py-0.5 rounded">
                              TẠM NGƯNG
                            </span>
                          )}
                        </div>
                        <h4 className="text-sm font-bold text-[#181d16] mt-1 hover:text-[#176a22] transition-colors cursor-pointer" onClick={() => handleOpenDetail(item)}>
                          {item.name}
                        </h4>
                        <p className="text-xs text-[#40493d]">{item.region} • {item.type}</p>
                      </div>
                      <div className="flex items-center space-x-1 text-xs font-bold text-[#d97706] bg-[#ffedd5] px-2 py-0.5 rounded-full shrink-0">
                        <Star className="w-3 h-3 fill-current" />
                        <span>{item.rating}</span>
                      </div>
                    </div>

                    <div className="space-y-1.5 text-xs text-[#40493d]">
                      <p><strong>{config.productsLabel}:</strong> {item.products.join(', ')}</p>
                      <p>
                        <strong>{config.limitLabel}:</strong>{' '}
                        <span className="text-[#176a22] font-bold">
                          {isLogistics ? (item as LogisticsItem).fleetCapacity : item.creditLimit}
                        </span>
                      </p>
                      <p><strong>{config.volumeLabel}:</strong> {item.totalVolume}</p>
                    </div>
                  </div>

                  <div className="space-y-3 pt-2 border-t border-[#e0e4d9]">
                    <div className="flex items-center justify-between">
                      <div className="flex flex-wrap gap-1">
                        {item.certifications.map((cert) => (
                          <span key={cert} className="text-[10px] font-semibold bg-[#a3f69c]/30 text-[#003808] px-2 py-0.5 rounded-full">
                            {cert}
                          </span>
                        ))}
                      </div>

                      <span className={`text-xs font-semibold px-2 py-0.5 rounded-md shrink-0 ${
                        isSuspended 
                          ? 'text-amber-800 bg-amber-100' 
                          : isPending 
                          ? 'text-yellow-800 bg-yellow-100' 
                          : 'text-[#176a22] bg-[#a3f69c]/40'
                      }`}>
                        {isSuspended ? 'Tạm ngưng' : isPending ? 'Chờ duyệt' : 'Hoạt động'}
                      </span>
                    </div>

                    {/* Quick Admin Actions Bar */}
                    <div className="pt-2 border-t border-dashed border-[#e0e4d9] flex items-center justify-between gap-1 text-xs">
                      <button
                        onClick={() => handleOpenDetail(item)}
                        className="px-2.5 py-1.5 bg-[#f7fbf0] hover:bg-[#e0e4d9] text-[#181d16] font-semibold rounded-lg flex items-center space-x-1 transition-colors cursor-pointer"
                      >
                        <Eye className="w-3.5 h-3.5 text-[#176a22]" />
                        <span>Xem Chi Tiết</span>
                      </button>

                      <div className="flex items-center space-x-1">
                        <button
                          onClick={() => handleToggleStatus(item.id)}
                          className={`px-2.5 py-1.5 font-semibold rounded-lg flex items-center space-x-1 transition-colors cursor-pointer ${
                            isSuspended
                              ? 'bg-emerald-50 hover:bg-emerald-100 text-emerald-700'
                              : 'bg-amber-50 hover:bg-amber-100 text-amber-700'
                          }`}
                          title={isSuspended ? "Kích hoạt lại tài khoản" : "Tạm ngưng tài khoản này"}
                        >
                          {isSuspended ? (
                            <>
                              <Unlock className="w-3.5 h-3.5" />
                              <span>Mở Khóa</span>
                            </>
                          ) : (
                            <>
                              <Ban className="w-3.5 h-3.5" />
                              <span>Tạm Ngưng</span>
                            </>
                          )}
                        </button>

                        <button
                          onClick={() => handleDeleteItem(item.id)}
                          className="p-1.5 hover:bg-red-50 text-red-600 rounded-lg transition-colors cursor-pointer"
                          title="Xóa đối tượng khỏi hệ thống"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Pagination Controls Bar */}
        <div className="bg-white p-4 rounded-xl border border-[#e0e4d9] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#40493d]">
          <div className="flex items-center space-x-3">
            <span>
              Hiển thị <strong>{startItemNum}</strong> - <strong>{endItemNum}</strong> trên tổng số <strong>{totalItems}</strong> doanh nghiệp
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

          {/* Pagination buttons */}
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
      </div>

      {/* Modal Detail & Admin Control */}
      {selectedItem && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full border border-[#e0e4d9] p-6 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-start justify-between border-b border-[#e0e4d9] pb-4">
              <div>
                <div className="flex items-center space-x-2">
                  <span className="text-xs font-mono font-bold text-[#707a6c] bg-[#f1f5ea] px-2.5 py-0.5 rounded">
                    {selectedItem.code}
                  </span>
                  <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-md ${
                    selectedItem.status === 'suspended'
                      ? 'text-amber-800 bg-amber-100'
                      : selectedItem.status === 'pending'
                      ? 'text-yellow-800 bg-yellow-100'
                      : 'text-[#176a22] bg-[#a3f69c]/40'
                  }`}>
                    {selectedItem.status === 'suspended' ? 'Tạm Ngưng Hoạt Động' : selectedItem.status === 'pending' ? 'Chờ Xác Minh' : 'Đang Hoạt Động'}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-[#181d16] mt-1.5">{selectedItem.name}</h3>
                <p className="text-xs text-[#40493d]">Loại hình: {selectedItem.type} • Khu vực: {selectedItem.region}</p>
              </div>

              <button
                onClick={() => setSelectedItem(null)}
                className="p-1.5 text-[#707a6c] hover:text-[#181d16] hover:bg-[#f7fbf0] rounded-xl transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Entity Information Overview */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div className="p-3 bg-[#f7fbf0] rounded-xl border border-[#e0e4d9]">
                <p className="text-[#707a6c] font-medium">{config.productsLabel}</p>
                <p className="font-bold text-[#181d16] mt-1">{selectedItem.products.join(', ')}</p>
              </div>
              <div className="p-3 bg-[#f7fbf0] rounded-xl border border-[#e0e4d9]">
                <p className="text-[#707a6c] font-medium">{config.limitLabel}</p>
                <p className="font-bold text-[#176a22] mt-1">
                  {'fleetCapacity' in selectedItem ? (selectedItem as LogisticsItem).fleetCapacity : selectedItem.creditLimit}
                </p>
              </div>
              <div className="p-3 bg-[#f7fbf0] rounded-xl border border-[#e0e4d9]">
                <p className="text-[#707a6c] font-medium">Đánh Giá Uy Tín</p>
                <div className="flex items-center space-x-1 font-bold text-[#d97706] mt-1">
                  <Star className="w-4 h-4 fill-current" />
                  <span>{selectedItem.rating} / 5.0</span>
                </div>
              </div>
            </div>

            {/* Certifications Badge & Addition */}
            <div className="space-y-2 text-xs">
              <label className="font-bold text-[#181d16] flex items-center justify-between">
                <span>Danh Sách Chứng Nhận / Tiêu Chuẩn Hiện Có:</span>
              </label>
              <div className="flex flex-wrap gap-2 p-3 bg-gray-50 rounded-xl border border-[#e0e4d9]">
                {selectedItem.certifications.map((cert) => (
                  <span key={cert} className="px-3 py-1 bg-[#a3f69c]/30 text-[#003808] font-bold rounded-full flex items-center space-x-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#176a22]" />
                    <span>{cert}</span>
                  </span>
                ))}
              </div>

              {/* Add certification form */}
              <form onSubmit={handleAddCert} className="flex gap-2 pt-1">
                <input
                  type="text"
                  value={addCertInput}
                  onChange={(e) => setAddCertInput(e.target.value)}
                  placeholder="Thêm chứng nhận mới (Ví dụ: Organic USDA, BRCGS)..."
                  className="flex-1 px-3 py-2 bg-[#f7fbf0] border border-[#bfcaba] rounded-xl text-xs text-[#181d16]"
                />
                <button
                  type="submit"
                  className="px-3 py-2 bg-[#176a22] text-white font-semibold rounded-xl text-xs hover:bg-[#13561b] transition-colors cursor-pointer"
                >
                  Thêm Chứng Nhận
                </button>
              </form>
            </div>

            {/* Admin Control Panel Section */}
            <div className="bg-[#f7fbf0] p-4 rounded-xl border border-[#bfcaba] space-y-4 text-xs">
              <div className="flex items-center space-x-2 border-b border-[#e0e4d9] pb-2">
                <Shield className="w-4 h-4 text-[#176a22]" />
                <h4 className="font-bold text-sm text-[#181d16]">Bảng Thao Tác Quản Trị Viên (Admin Actions)</h4>
              </div>

              {/* Status Action Buttons */}
              <div>
                <label className="block font-semibold text-[#181d16] mb-2">Thay đổi Trạng thái Tài khoản:</label>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => handleToggleStatus(selectedItem.id, 'active')}
                    disabled={selectedItem.status === 'active'}
                    className={`px-3 py-2 rounded-xl font-semibold flex items-center space-x-1.5 transition-colors cursor-pointer ${
                      selectedItem.status === 'active'
                        ? 'bg-emerald-600 text-white cursor-default'
                        : 'bg-white border border-[#bfcaba] text-emerald-700 hover:bg-emerald-50'
                    }`}
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Kích Hoạt (Hoạt Động)</span>
                  </button>

                  <button
                    onClick={() => handleToggleStatus(selectedItem.id, 'suspended')}
                    disabled={selectedItem.status === 'suspended'}
                    className={`px-3 py-2 rounded-xl font-semibold flex items-center space-x-1.5 transition-colors cursor-pointer ${
                      selectedItem.status === 'suspended'
                        ? 'bg-amber-600 text-white cursor-default'
                        : 'bg-white border border-[#bfcaba] text-amber-700 hover:bg-amber-50'
                    }`}
                  >
                    <Ban className="w-4 h-4" />
                    <span>Tạm Ngưng Hoạt Động</span>
                  </button>

                  <button
                    onClick={() => handleToggleStatus(selectedItem.id, 'pending')}
                    disabled={selectedItem.status === 'pending'}
                    className={`px-3 py-2 rounded-xl font-semibold flex items-center space-x-1.5 transition-colors cursor-pointer ${
                      selectedItem.status === 'pending'
                        ? 'bg-yellow-600 text-white cursor-default'
                        : 'bg-white border border-[#bfcaba] text-yellow-700 hover:bg-yellow-50'
                    }`}
                  >
                    <AlertTriangle className="w-4 h-4" />
                    <span>Đặt Về Chờ Duyệt KYC</span>
                  </button>
                </div>
              </div>

              {/* Adjust limit / Capacity Form */}
              <form onSubmit={handleUpdateLimit} className="space-y-2">
                <label className="block font-semibold text-[#181d16]">
                  Cập nhật {config.limitLabel}:
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={editLimitInput}
                    onChange={(e) => setEditLimitInput(e.target.value)}
                    placeholder="Ví dụ: 15.0 tỷ VNĐ"
                    className="flex-1 px-3 py-2 bg-white border border-[#bfcaba] rounded-xl text-xs text-[#181d16]"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-[#176a22] text-white font-semibold rounded-xl hover:bg-[#13561b] transition-colors cursor-pointer"
                  >
                    Lưu Hạn Mức
                  </button>
                </div>
              </form>

              {/* Admin Note Input */}
              <div className="space-y-2">
                <label className="block font-semibold text-[#181d16]">Ghi chú kiểm toán của Admin:</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={adminNoteInput}
                    onChange={(e) => setAdminNoteInput(e.target.value)}
                    placeholder="Nhập ghi chú kiểm tra định kỳ, bảo chứng ngân hàng..."
                    className="flex-1 px-3 py-2 bg-white border border-[#bfcaba] rounded-xl text-xs text-[#181d16]"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      if (adminNoteInput.trim()) {
                        setShowAdminNoteSuccess(true);
                        setTimeout(() => setShowAdminNoteSuccess(false), 3000);
                      }
                    }}
                    className="px-3 py-2 bg-[#40493d] text-white font-semibold rounded-xl text-xs hover:bg-[#181d16] transition-colors cursor-pointer"
                  >
                    Lưu Ghi Chú
                  </button>
                </div>
                {showAdminNoteSuccess && (
                  <p className="text-emerald-700 font-bold text-xs flex items-center space-x-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Đã lưu nhật ký kiểm toán Admin thành công!</span>
                  </p>
                )}
              </div>
            </div>

            {/* Modal Bottom Buttons */}
            <div className="flex items-center justify-between pt-2 border-t border-[#e0e4d9]">
              <button
                onClick={() => handleDeleteItem(selectedItem.id)}
                className="px-4 py-2 bg-red-50 hover:bg-red-100 text-red-700 text-xs font-semibold rounded-xl flex items-center space-x-1.5 transition-colors cursor-pointer"
              >
                <Trash2 className="w-4 h-4" />
                <span>Xóa Tài Khoản Này</span>
              </button>

              <button
                onClick={() => setSelectedItem(null)}
                className="px-5 py-2 bg-[#176a22] text-white text-xs font-semibold rounded-xl hover:bg-[#13561b] transition-colors cursor-pointer"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

