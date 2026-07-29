import React, { useState, useEffect } from 'react';
import { 
  Users,
  Search,
  CheckCircle2,
  Clock,
  TrendingUp,
  Package,
  Plus
} from 'lucide-react';
import api from '@/lib/axios';

interface GroupBuysManagementViewProps {
  triggerToast?: (msg: string) => void;
}

export const GroupBuysManagementView: React.FC<GroupBuysManagementViewProps> = ({ triggerToast }) => {
  const [activeStatusTab, setActiveStatusTab] = useState<'all' | 'open' | 'fulfilled'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [campaigns, setCampaigns] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Fetch group buys (in a real app, this might be filtered by supplierId backend-side)
    const fetchCampaigns = async () => {
      try {
        const res = await api.get('/public/group-buys');
        if (res.data && res.data.data && res.data.data.content) {
          setCampaigns(res.data.data.content);
        } else if (res.data && Array.isArray(res.data)) {
          setCampaigns(res.data);
        }
      } catch (err) {
        console.error('Failed to fetch group buys', err);
        // Fallback or handle error
      } finally {
        setIsLoading(false);
      }
    };
    fetchCampaigns();
  }, []);

  const handleUpdateStatus = (id: string, newStatus: string) => {
    // Implement status update if supplier has permission (e.g., mark as fulfilled)
    if (triggerToast) triggerToast(`Cập nhật trạng thái thành công!`);
    setCampaigns(prev => prev.map(c => c.id === id ? { ...c, status: newStatus } : c));
  };

  const filteredCampaigns = campaigns.filter(c => {
    if (activeStatusTab !== 'all' && c.status !== activeStatusTab) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        c.product?.name?.toLowerCase().includes(q) ||
        c.product?.supplierName?.toLowerCase().includes(q) ||
        c.description?.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-200 pb-12">
      {/* HEADER BAR */}
      <div className="bg-white rounded-2xl border border-[#e0e4d9] p-6 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="p-2.5 bg-[#e0f2fe] text-[#0ea5e9] rounded-xl shadow-2xs">
              <Users size={26} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-extrabold text-[#181d16] tracking-tight">
                  Quản Lý Nhóm Gom Đơn
                </h1>
                <span className="px-2.5 py-0.5 bg-[#0ea5e9] text-white font-black text-xs rounded-full">
                  Mua Chung
                </span>
              </div>
              <p className="text-xs text-[#5e6958] font-medium mt-0.5">
                Theo dõi và xử lý các nhóm mua chung từ đối tác B2B.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* TABS & SEARCH */}
      <div className="bg-white rounded-2xl border border-[#e0e4d9] p-4 shadow-2xs space-y-4">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          <div className="flex items-center gap-1 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
            {[
              { id: 'all', label: 'Tất cả', count: campaigns.length },
              { id: 'open', label: 'Đang mở', count: campaigns.filter(c => c.status === 'open').length },
              { id: 'fulfilled', label: 'Đã hoàn tất', count: campaigns.filter(c => c.status === 'fulfilled').length },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveStatusTab(tab.id as any)}
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

          <div className="relative min-w-[240px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#5e6958]" size={16} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Tìm theo sản phẩm, mô tả..."
              className="w-full h-9 pl-9 pr-3.5 bg-[#f8faf5] border border-[#d0d6c7] rounded-xl text-xs focus:ring-2 focus:ring-[#176a22] focus:bg-white outline-none"
            />
          </div>
        </div>
      </div>

      {/* CONTENT */}
      {isLoading ? (
        <div className="text-center py-10">Đang tải dữ liệu...</div>
      ) : filteredCampaigns.length === 0 ? (
        <div className="bg-white rounded-2xl border border-[#e0e4d9] p-12 text-center space-y-3">
          <Users size={40} className="mx-auto text-[#7dd3fc]" />
          <h3 className="font-extrabold text-base text-[#181d16]">Không có nhóm gom đơn nào</h3>
          <p className="text-xs text-[#5e6958]">Chưa có đối tác nào khởi tạo nhóm mua chung cho sản phẩm của bạn.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredCampaigns.map(campaign => {
            const progress = (campaign.currentVolumeKg / campaign.targetVolumeKg) * 100;
            return (
              <div key={campaign.id} className="bg-white rounded-2xl border border-[#e0e4d9] p-5 shadow-2xs space-y-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-extrabold text-base text-[#181d16]">{campaign.product?.name || 'Sản phẩm'}</h3>
                    <p className="text-xs text-[#5e6958] mt-1">{campaign.description}</p>
                  </div>
                  <span className={`px-2 py-1 rounded text-[10px] font-bold ${
                    campaign.status === 'open' ? 'bg-[#c9ecc1] text-[#176a22]' : 'bg-[#e0f2fe] text-[#0369a1]'
                  }`}>
                    {campaign.status === 'open' ? 'Đang Mở' : 'Hoàn Tất'}
                  </span>
                </div>
                
                <div className="bg-[#f8faf5] p-3 rounded-xl border border-[#d0d6c7] space-y-2">
                  <div className="flex justify-between text-xs font-semibold">
                    <span className="text-[#5e6958]">Tiến độ Gom Đơn</span>
                    <span className="text-[#176a22]">{Math.min(progress, 100).toFixed(0)}%</span>
                  </div>
                  <div className="h-2 bg-[#e0e4d9] rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-[#176a22] transition-all duration-500" 
                      style={{ width: `${Math.min(progress, 100)}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-[11px] text-[#5e6958]">
                    <span>Đã gom: {campaign.currentVolumeKg} kg</span>
                    <span>Mục tiêu: {campaign.targetVolumeKg} kg</span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button className="flex-1 py-2 text-xs font-bold text-[#176a22] bg-[#ebefe4] rounded-lg hover:bg-[#dbe6cf]">
                    Xem chi tiết
                  </button>
                  {campaign.status === 'open' && progress >= 100 && (
                    <button 
                      onClick={() => handleUpdateStatus(campaign.id, 'fulfilled')}
                      className="flex-1 py-2 text-xs font-bold text-white bg-[#176a22] rounded-lg hover:bg-[#12541b]"
                    >
                      Duyệt Giao Hàng
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
