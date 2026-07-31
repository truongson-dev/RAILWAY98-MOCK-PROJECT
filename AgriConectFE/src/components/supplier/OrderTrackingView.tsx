import React, { useState, useEffect } from 'react';
import { Order } from './types';
import { Truck, Search, Eye, ChevronLeft, ChevronRight } from 'lucide-react';

interface OrderTrackingViewProps {
  orders: Order[];
  onSelectOrder: (order: Order) => void;
  onConfirmOrder?: (orderId: string) => void;
}

export const OrderTrackingView: React.FC<OrderTrackingViewProps> = ({
  orders,
  onSelectOrder,
  onConfirmOrder
}) => {
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  const filteredOrders = orders.filter((o) => {
    const matchesStatus = statusFilter === 'all' || 
    (statusFilter === 'PENDING' && (o.status === 'PENDING' || o.status === 'new')) || 
    (statusFilter === 'PROCESSING' && (o.status === 'PROCESSING' || o.status === 'CONFIRMED' || o.status === 'processing')) || 
    (statusFilter === 'SHIPPING' && (o.status === 'SHIPPING' || o.status === 'shipping')) || 
    (statusFilter === 'DELIVERED' && (o.status === 'DELIVERED' || o.status === 'completed')) || 
    o.status === statusFilter;
    const matchesSearch = o.orderCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          (o.customerName || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
                          ((o.items && o.items[0]?.productName) || o.productName || '').toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  useEffect(() => {
    setCurrentPage(1);
  }, [statusFilter, searchQuery]);

  const totalItems = filteredOrders.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage) || 1;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedOrders = filteredOrders.slice(startIndex, startIndex + itemsPerPage);

  const getStatusBadge = (status: Order['status']) => {
    switch (status) {
      case 'PENDING':
      case 'new':
        return <span className="px-2.5 py-1 bg-[#dbe6cf] text-[#176a22] font-bold text-xs rounded-full">Đơn mới (Chờ duyệt)</span>;
      case 'CONFIRMED':
      case 'PROCESSING':
      case 'processing':
        return <span className="px-2.5 py-1 bg-[#ffd9e2] text-[#9d3c5f] font-bold text-xs rounded-full">Đang xử lý</span>;
      case 'SHIPPING':
      case 'shipping':
        return <span className="px-2.5 py-1 bg-blue-100 text-blue-800 font-bold text-xs rounded-full">Đang giao</span>;
      case 'DELIVERED':
      case 'completed':
        return <span className="px-2.5 py-1 bg-green-100 text-green-800 font-bold text-xs rounded-full">Hoàn thành</span>;
      case 'CANCELLED':
      case 'cancelled':
        return <span className="px-2.5 py-1 bg-red-100 text-red-800 font-bold text-xs rounded-full">Đã hủy</span>;
      default:
        return <span className="px-2.5 py-1 bg-gray-100 text-gray-800 font-bold text-xs rounded-full">{status}</span>;
    }
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl border border-[#e0e4d9] flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-xl font-bold text-[#181d16] flex items-center gap-2">
            <Truck size={24} className="text-[#176a22]" />
            Theo Dõi Đơn Hàng & Vận Chuyển ({orders.length})
          </h2>
          <p className="text-sm text-[#5e6958]">
            Quản lý hợp đồng thu mua, lệnh xuất kho và vận đơn trực tiếp cho siêu thị & đối tác.
          </p>
        </div>
      </div>

      {/* Filter and Search */}
      <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-4">
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 sm:pb-0">
          <button
            onClick={() => setStatusFilter('all')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-colors ${
              statusFilter === 'all' ? 'bg-[#176a22] text-white' : 'bg-white text-[#3e483a] border border-[#e0e4d9]'
            }`}
          >
            Tất cả
          </button>
          <button
            onClick={() => setStatusFilter('new')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-colors ${
              statusFilter === 'new' ? 'bg-[#176a22] text-white' : 'bg-white text-[#3e483a] border border-[#e0e4d9]'
            }`}
          >
            Mới (12)
          </button>
          <button
            onClick={() => setStatusFilter('processing')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-colors ${
              statusFilter === 'processing' ? 'bg-[#176a22] text-white' : 'bg-white text-[#3e483a] border border-[#e0e4d9]'
            }`}
          >
            Đang xử lý (28)
          </button>
          <button
            onClick={() => setStatusFilter('shipping')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-colors ${
              statusFilter === 'shipping' ? 'bg-[#176a22] text-white' : 'bg-white text-[#3e483a] border border-[#e0e4d9]'
            }`}
          >
            Đang giao
          </button>
          <button
            onClick={() => setStatusFilter('completed')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-colors ${
              statusFilter === 'completed' ? 'bg-[#176a22] text-white' : 'bg-white text-[#3e483a] border border-[#e0e4d9]'
            }`}
          >
            Hoàn thành
          </button>
        </div>

        <div className="relative min-w-[240px]">
          <Search size={16} className="absolute left-3.5 top-3 text-[#5e6958]" />
          <input
            type="text"
            placeholder="Tìm mã đơn, tên đối tác..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-white border border-[#bfcaba] focus:border-[#176a22] text-sm rounded-xl outline-none"
          />
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-2xl border border-[#e0e4d9] overflow-hidden shadow-xs space-y-0">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#f1f5ea] text-[11px] uppercase tracking-wider text-[#5e6958] border-b border-[#e0e4d9]">
                <th className="py-3.5 px-4 font-bold">Mã đơn hàng</th>
                <th className="py-3.5 px-4 font-bold">Khách hàng / Đối tác</th>
                <th className="py-3.5 px-4 font-bold">Nông sản đặt</th>
                <th className="py-3.5 px-4 font-bold text-right">Tổng giá trị</th>
                <th className="py-3.5 px-4 font-bold">Trạng thái</th>
                <th className="py-3.5 px-4 font-bold">Thời gian</th>
                <th className="py-3.5 px-4 font-bold text-center">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#e0e4d9] text-sm">
              {filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-[#5e6958] font-bold text-xs">
                    Không tìm thấy đơn hàng nào phù hợp
                  </td>
                </tr>
              ) : (
                paginatedOrders.map((ord) => {
                  const productName = ord.productName || (ord.items && ord.items.length > 0 ? (ord.items[0].productName || `Sản phẩm #${ord.items[0].productId}`) : 'N/A');
                  const quantity = ord.quantity || (ord.items ? ord.items.reduce((sum: number, i: any) => sum + i.quantity, 0) : 0);
                  const totalAmount = ord.totalAmount || ord.totalPrice || (ord.items ? ord.items.reduce((sum: number, i: any) => sum + (i.price * i.quantity), 0) : 0);
                  const customerName = ord.customerName || ord.buyerName || (ord.buyerId ? `Khách hàng #${ord.buyerId}` : 'Khách hàng ẩn danh');
                  const orderCode = ord.orderCode || `ORD-${String(ord.id).padStart(5, '0')}`;
                  const orderDate = ord.createdAt || ord.updatedAt ? new Date(ord.createdAt || ord.updatedAt).toLocaleDateString('vi-VN') : 'Hôm nay';

                  return (
                  <tr key={ord.id} className="hover:bg-[#f7fbf0] transition-colors">
                    <td className="py-3.5 px-4 font-extrabold text-[#176a22]">{orderCode}</td>
                    <td className="py-3.5 px-4 font-semibold text-[#181d16]">{customerName}</td>
                    <td className="py-3.5 px-4">
                      <span className="font-bold text-[#181d16]">{productName}</span>
                      <span className="text-xs text-[#5e6958] block">SL: {quantity}</span>
                    </td>
                    <td className="py-3.5 px-4 text-right font-black text-[#181d16]">
                      {totalAmount.toLocaleString('vi-VN')} đ
                    </td>
                    <td className="py-3.5 px-4">{getStatusBadge(ord.status)}</td>
                    <td className="py-3.5 px-4 text-xs text-[#5e6958]">{orderDate}</td>
                    <td className="py-3.5 px-4 text-center">
                      {(ord.status === 'PENDING' || ord.status === 'new') && onConfirmOrder ? (
                        <button
                          onClick={() => onConfirmOrder(String(ord.id))}
                          className="p-2 bg-[#176a22] hover:bg-[#12541b] text-white rounded-lg transition-colors inline-flex items-center gap-1 font-semibold text-xs cursor-pointer shadow-xs"
                        >
                          Xác nhận
                        </button>
                      ) : (
                        <button
                          onClick={() => onSelectOrder(ord)}
                          className="p-2 bg-[#f1f5ea] hover:bg-[#e0e8d6] text-[#176a22] rounded-lg transition-colors inline-flex items-center gap-1 font-semibold text-xs cursor-pointer"
                        >
                          <Eye size={16} /> Xem
                        </button>
                      )}
                    </td>
                  </tr>
                )})
              )}
            </tbody>
          </table>
        </div>

        {/* Table Pagination Bar */}
        <div className="bg-[#f7fbf0] px-5 py-3.5 border-t border-[#e0e4d9] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <span className="text-[#5e6958] font-medium">
            Hiển thị <span className="font-bold text-[#181d16]">{totalItems > 0 ? startIndex + 1 : 0}</span> - <span className="font-bold text-[#181d16]">{Math.min(startIndex + itemsPerPage, totalItems)}</span> trên tổng số <span className="font-bold text-[#181d16]">{totalItems}</span> đơn hàng
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
                  className={`w-7 h-7 rounded-lg font-black text-xs transition-all cursor-pointer ${
                    currentPage === pageNum
                      ? 'bg-[#176a22] text-white shadow-2xs scale-105'
                      : 'bg-white text-[#181d16] hover:bg-[#e0e4d9] border border-[#e0e4d9]'
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
    </div>
  );
};
