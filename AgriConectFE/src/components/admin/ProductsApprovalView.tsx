'use client';

import React, { useEffect, useState } from 'react';
import { Package, Check, X as XIcon, Search, AlertTriangle, ShieldCheck } from 'lucide-react';
import api from '@/lib/api';

interface ApiProduct {
  id: number;
  name: string;
  description: string;
  price: number;
  unit: string;
  minOrderKg: number;
  location: string;
  status: string;
  imageUrls: string[];
  harvestDate?: string;
  category: {
    id: number;
    name: string;
  };
  seller: {
    id: number;
    fullName: string;
  };
}

export const ProductsApprovalView: React.FC = () => {
  const [products, setProducts] = useState<ApiProduct[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchPendingProducts = async () => {
    try {
      const res = await api.get('/admin/products/pending');
      setProducts(res.data?.data?.content || []);
    } catch (error) {
      console.error('Failed to fetch pending products', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPendingProducts();
  }, []);

  const handleApprove = async (id: number) => {
    try {
      await api.patch(`/admin/products/${id}/approve`);
      setProducts(prev => prev.filter(p => p.id !== id));
      alert('Đã duyệt sản phẩm thành công!');
    } catch (error) {
      console.error('Lỗi khi duyệt', error);
      alert('Có lỗi xảy ra khi duyệt sản phẩm.');
    }
  };

  const handleReject = async (id: number) => {
    if (!confirm('Bạn có chắc chắn muốn từ chối sản phẩm này?')) return;
    try {
      await api.patch(`/admin/products/${id}/reject`);
      setProducts(prev => prev.filter(p => p.id !== id));
      alert('Đã từ chối sản phẩm!');
    } catch (error) {
      console.error('Lỗi khi từ chối', error);
      alert('Có lỗi xảy ra khi từ chối sản phẩm.');
    }
  };

  if (loading) {
    return <div className="p-8 text-center text-[#5e6958]">Đang tải...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 bg-white p-6 rounded-2xl border border-[#e0e4d9]">
        <div className="w-10 h-10 rounded-xl bg-[#fef3c7] text-[#b45309] flex items-center justify-center">
          <AlertTriangle className="w-5 h-5" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-[#181d16]">Duyệt Sản Phẩm Mới</h1>
          <p className="text-sm text-[#5e6958]">Các sản phẩm nông dân/HTX vừa đăng chờ được kiểm duyệt trước khi hiển thị cho đối tác.</p>
        </div>
      </div>

      {products.length === 0 ? (
        <div className="bg-white rounded-2xl border border-[#e0e4d9] p-12 text-center space-y-3">
          <ShieldCheck size={48} className="mx-auto text-[#a3f69c]" />
          <h3 className="font-bold text-[#181d16] text-lg">Không có sản phẩm nào cần duyệt</h3>
          <p className="text-sm text-[#5e6958]">Mọi thứ đã được xử lý xong!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map(prod => (
            <div key={prod.id} className="bg-white rounded-2xl border border-[#e0e4d9] shadow-xs overflow-hidden flex flex-col">
              <div className="relative h-48 bg-gray-100">
                <img src={prod.imageUrls?.[0] || 'https://via.placeholder.com/400'} alt={prod.name} className="w-full h-full object-cover" />
                <span className="absolute top-3 left-3 bg-[#dbe6cf] text-[#176a22] text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-md">
                  {prod.category?.name || 'Nông sản'}
                </span>
              </div>
              <div className="p-5 space-y-3 flex-1">
                <div>
                  <h3 className="font-bold text-[#181d16] text-base">{prod.name}</h3>
                  <p className="text-xs text-[#5e6958] font-medium mt-1">Nông dân/HTX: {prod.seller?.fullName || 'Ẩn danh'}</p>
                </div>
                <div className="text-sm font-black text-[#176a22]">
                  {prod.price.toLocaleString('vi-VN')} đ/{prod.unit}
                </div>
                <p className="text-xs text-[#5e6958] line-clamp-2">
                  {prod.description}
                </p>
                <div className="text-xs font-semibold text-[#181d16] bg-[#f4f6f0] p-2 rounded-lg">
                  Vùng trồng: {prod.location}
                </div>
              </div>
              <div className="p-4 border-t border-[#e0e4d9] grid grid-cols-2 gap-3">
                <button
                  onClick={() => handleReject(prod.id)}
                  className="py-2.5 bg-[#fce8e8] text-[#901c1c] rounded-xl text-sm font-bold flex items-center justify-center gap-1.5 hover:bg-[#f8d7d7]"
                >
                  <XIcon size={16} /> Từ chối
                </button>
                <button
                  onClick={() => handleApprove(prod.id)}
                  className="py-2.5 bg-[#176a22] text-white rounded-xl text-sm font-bold flex items-center justify-center gap-1.5 hover:bg-[#12541b]"
                >
                  <Check size={16} /> Duyệt ngay
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
