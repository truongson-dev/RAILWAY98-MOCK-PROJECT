import React, { useState, useEffect } from 'react';
import { Product } from './types';
import { Package, Plus, Search, Edit, Eye, EyeOff, ShieldCheck, ChevronLeft, ChevronRight } from 'lucide-react';

interface ProductCatalogViewProps {
  products: Product[];
  onOpenAddProductModal: () => void;
  onSelectProductToEdit: (product: Product) => void;
  onToggleProductStatus: (productId: string) => void;
}

export const ProductCatalogView: React.FC<ProductCatalogViewProps> = ({
  products,
  onOpenAddProductModal,
  onSelectProductToEdit,
  onToggleProductStatus
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('Tất cả');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  const categories = ['Tất cả', 'Trái cây', 'Lúa gạo', 'Nông sản khô', 'Rau củ'];

  const filteredProducts = products.filter((p) => {
    const matchesCat = selectedCategory === 'Tất cả' || p.category === selectedCategory;
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          p.origin.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCat && matchesSearch;
  });

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, searchTerm]);

  const totalItems = filteredProducts.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage) || 1;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedProducts = filteredProducts.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-2xl border border-[#e0e4d9]">
        <div>
          <h2 className="text-xl font-bold text-[#181d16] flex items-center gap-2">
            <Package size={24} className="text-[#176a22]" />
            Danh Mục Nông Sản Niêm Yết ({products.length})
          </h2>
          <p className="text-sm text-[#5e6958]">
            Quản lý báo giá, số lượng tồn kho và chứng nhận VietGAP cho đối tác thu mua.
          </p>
        </div>

        <button
          onClick={onOpenAddProductModal}
          className="bg-[#176a22] hover:bg-[#12541b] text-white px-5 py-2.5 rounded-xl font-semibold text-sm flex items-center gap-2 shadow-xs"
        >
          <Plus size={18} />
          Thêm nông sản mới
        </button>
      </div>

      {/* Filter Tabs & Search */}
      <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-4">
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 sm:pb-0">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-bold shrink-0 transition-colors ${
                selectedCategory === cat
                  ? 'bg-[#176a22] text-white'
                  : 'bg-white text-[#3e483a] hover:bg-[#f1f5ea] border border-[#e0e4d9]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="relative min-w-[240px]">
          <Search size={16} className="absolute left-3.5 top-3 text-[#5e6958]" />
          <input
            type="text"
            placeholder="Tìm nông sản, vùng trồng..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-white border border-[#bfcaba] focus:border-[#176a22] text-sm rounded-xl outline-none"
          />
        </div>
      </div>

      {/* Product Cards Grid */}
      {filteredProducts.length === 0 ? (
        <div className="bg-white rounded-2xl border border-[#e0e4d9] p-12 text-center space-y-3">
          <Package size={40} className="mx-auto text-[#5e6958]/50" />
          <p className="font-bold text-[#181d16] text-sm">Chưa có nông sản nào phù hợp với danh mục/bộ lọc này</p>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {paginatedProducts.map((prod) => (
              <div
                key={prod.id}
                className="bg-white rounded-2xl border border-[#e0e4d9] shadow-xs overflow-hidden flex flex-col justify-between hover:shadow-md transition-all"
              >
                <div>
                  <div className="relative h-48 w-full overflow-hidden bg-gray-100">
                    <img
                      src={prod.imageUrl}
                      alt={prod.name}
                      className="w-full h-full object-cover"
                    />
                    <span className="absolute top-3 right-3 bg-black/75 text-white text-xs font-bold px-3 py-1 rounded-full">
                      {prod.stockText}
                    </span>

                    <span className="absolute top-3 left-3 bg-[#dbe6cf] text-[#176a22] text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-md">
                      {prod.category}
                    </span>
                  </div>

                  <div className="p-5 space-y-3">
                    <div className="flex justify-between items-start gap-2">
                      <div>
                        <h3 className="font-bold text-[#181d16] text-base">{prod.name}</h3>
                        <p className="text-xs text-[#5e6958]">Xuất xứ: {prod.origin}</p>
                      </div>
                      <span className="text-base font-black text-[#176a22] shrink-0">
                        {prod.price.toLocaleString('vi-VN')}đ/{prod.unit}
                      </span>
                    </div>

                    <p className="text-xs text-[#5e6958] line-clamp-2 leading-relaxed">
                      {prod.description}
                    </p>

                    {/* Certifications badges */}
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {prod.certifications.map((cert) => (
                        <span key={cert} className="inline-flex items-center gap-1 text-[10px] font-bold bg-[#e8f5e5] text-[#176a22] px-2 py-0.5 rounded-md border border-[#c2dcba]">
                          <ShieldCheck size={12} /> {cert}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="p-5 pt-0 grid grid-cols-2 gap-3">
                  <button
                    onClick={() => onSelectProductToEdit(prod)}
                    className="py-2.5 px-4 border border-[#bfcaba] text-[#181d16] rounded-xl text-xs font-bold hover:bg-[#f1f5ea] flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <Edit size={14} /> Sửa
                  </button>

                  <button
                    onClick={() => onToggleProductStatus(prod.id)}
                    className="py-2.5 px-4 bg-[#ebefe4] hover:bg-[#dfe6d4] text-[#3e483a] rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                  >
                    {prod.status === 'active' ? (
                      <>
                        <EyeOff size={14} /> Ẩn tin
                      </>
                    ) : (
                      <>
                        <Eye size={14} /> Hiện tin
                      </>
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination Controls */}
          <div className="bg-white px-5 py-4 rounded-2xl border border-[#e0e4d9] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs shadow-2xs">
            <span className="text-[#5e6958] font-medium">
              Hiển thị <span className="font-bold text-[#181d16]">{totalItems > 0 ? startIndex + 1 : 0}</span> - <span className="font-bold text-[#181d16]">{Math.min(startIndex + itemsPerPage, totalItems)}</span> trên tổng số <span className="font-bold text-[#181d16]">{totalItems}</span> nông sản
            </span>

            <div className="flex items-center gap-1.5">
              <button
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="px-3 py-1.5 rounded-xl border border-[#e0e4d9] bg-white text-[#181d16] hover:bg-[#f1f5ea] disabled:opacity-40 disabled:hover:bg-white font-bold flex items-center gap-1 transition-all cursor-pointer disabled:cursor-not-allowed"
              >
                <ChevronLeft size={16} /> Trang trước
              </button>

              <div className="flex items-center gap-1 px-2">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                  <button
                    key={pageNum}
                    onClick={() => setCurrentPage(pageNum)}
                    className={`w-8 h-8 rounded-xl font-black text-xs transition-all cursor-pointer ${
                      currentPage === pageNum
                        ? 'bg-[#176a22] text-white shadow-2xs scale-105'
                        : 'bg-[#f7fbf0] text-[#181d16] hover:bg-[#e0e4d9]'
                    }`}
                  >
                    {pageNum}
                  </button>
                ))}
              </div>

              <button
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="px-3 py-1.5 rounded-xl border border-[#e0e4d9] bg-white text-[#181d16] hover:bg-[#f1f5ea] disabled:opacity-40 disabled:hover:bg-white font-bold flex items-center gap-1 transition-all cursor-pointer disabled:cursor-not-allowed"
              >
                Trang sau <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
