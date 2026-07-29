'use client';

import React, { useState, useEffect } from 'react';
import api from '@/lib/axios';
import { TabType, Product, MarketPrice, NoticeItem, Order, FarmPlot, HarvestEvent, InventoryItem } from '../supplier/types';

import { Sidebar } from '../supplier/Sidebar';
import { Header } from '../supplier/Header';
import { DashboardView } from '../supplier/DashboardView';
import { FarmManagementView } from '../supplier/FarmManagementView';
import { ForwardContractsView } from '../supplier/ForwardContractsView';
import { GroupBuysManagementView } from '../supplier/GroupBuysManagementView';
import { ProductCatalogView } from '../supplier/ProductCatalogView';
import { OrderTrackingView } from '../supplier/OrderTrackingView';
import { InventoryView } from '../supplier/InventoryView';
import { AnalyticsView } from '../supplier/AnalyticsView';
import { SupportSettingsView } from '../supplier/SupportSettingsView';
import { AiChatPageView } from '../supplier/AiChatPageView';
import { AiChatWidget } from '../supplier/AiChatWidget';
import { Bot, Sparkles } from 'lucide-react';

import { AddProductModal } from '../supplier/AddProductModal';
import { AddInventoryModal } from '../supplier/AddInventoryModal';
import { UpdateSeasonModal } from '../supplier/UpdateSeasonModal';
import { MarketRatesModal } from '../supplier/MarketRatesModal';
import { OrderDetailModal } from '../supplier/OrderDetailModal';
import { NotificationsDrawer } from '../supplier/NotificationsDrawer';

import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';

export const SupplierDashboard: React.FC = () => {
  const [currentTab, setCurrentTab] = useState<TabType>('dashboard');
  const [searchQuery, setSearchQuery] = useState('');
  
  const { logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push('/auth/login');
  };

  // Main Data States
  const [products, setProducts] = useState<any[]>([]);
  const [marketPrices] = useState<MarketPrice[]>([]);
  const [notices, setNotices] = useState<NoticeItem[]>([]);
  const [orders, setOrders] = useState<any[]>([]);
  const [farmPlots] = useState<FarmPlot[]>([]);
  const [harvestEvents] = useState<HarvestEvent[]>([]);
  const [inventory, setInventory] = useState<InventoryItem[]>([]);

  useEffect(() => {
    // Fetch products
    api.get('/products').then((res) => {
      setProducts(res.data.data?.content || []);
    }).catch(console.error);

    // Fetch orders
    api.get('/supplier/orders').then((res) => {
      setOrders(res.data.data?.content || []);
    }).catch(console.error);
  }, []);

  // Modal States
  const [isAddProductOpen, setIsAddProductOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isAddInventoryOpen, setIsAddInventoryOpen] = useState(false);
  const [isUpdateSeasonOpen, setIsUpdateSeasonOpen] = useState(false);
  const [isMarketRatesOpen, setIsMarketRatesOpen] = useState(false);
  const [selectedOrderForDetail, setSelectedOrderForDetail] = useState<Order | null>(null);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [isAiChatWidgetOpen, setIsAiChatWidgetOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Note: localStorage sync removed as requested to use API backend

  // Handlers for Inventory
  const handleAddInventory = (newItemData: Omit<InventoryItem, 'id'>) => {
    const newItem: InventoryItem = {
      ...newItemData,
      id: `inv-${Date.now()}`
    };
    setInventory(prev => [newItem, ...prev]);
  };

  const handleDeleteInventory = (id: string) => {
    setInventory(prev => prev.filter(item => item.id !== id));
  };

  // Handlers for Products
  const handleAddOrUpdateProduct = (productData: Omit<Product, 'id'>) => {
    if (editingProduct) {
      setProducts(prev => prev.map(p => p.id === editingProduct.id ? { ...productData, id: editingProduct.id } : p));
      setEditingProduct(null);
    } else {
      const newProd: Product = {
        ...productData,
        id: `prod-${Date.now()}`
      };
      setProducts(prev => [newProd, ...prev]);
    }
  };

  const handleSelectProductToEdit = (product: Product) => {
    setEditingProduct(product);
    setIsAddProductOpen(true);
  };

  const handleToggleProductStatus = (productId: string) => {
    setProducts(prev => prev.map(p => {
      if (p.id === productId) {
        return {
          ...p,
          status: p.status === 'active' ? 'hidden' : 'active'
        };
      }
      return p;
    }));
  };

  // Handlers for Orders
  const handleUpdateOrderStatus = (orderId: string, newStatus: Order['status']) => {
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status: newStatus } : o));
    if (selectedOrderForDetail && selectedOrderForDetail.id === orderId) {
      setSelectedOrderForDetail(prev => prev ? { ...prev, status: newStatus } : null);
    }
  };

  const handleMarkAllNoticesRead = () => {
    setNotices(prev => prev.map(n => ({ ...n, isRead: true })));
  };

  const unreadNotifCount = notices.filter(n => !n.isRead).length;

  return (
    <div className="min-h-screen w-full bg-[#f7fbf0] flex text-[#181d16] font-sans">
      {/* Sidebar Navigation */}
      <Sidebar
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        onOpenAddProductModal={() => {
          setEditingProduct(null);
          setIsAddProductOpen(true);
        }}
        isOpenMobile={isMobileSidebarOpen}
        setIsOpenMobile={setIsMobileSidebarOpen}
        onLogout={handleLogout}
      />

      {/* Main Layout Content Area */}
      <div className="flex-1 lg:pl-[260px] flex flex-col min-w-0">
        {/* Header Navbar */}
        <Header
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          onOpenNotifications={() => setIsNotificationsOpen(true)}
          unreadNotifCount={unreadNotifCount}
          onOpenMobileSidebar={() => setIsMobileSidebarOpen(true)}
          onOpenAiChat={() => setIsAiChatWidgetOpen(true)}
        />

        {/* Dynamic Page Views */}
        <main className="flex-1 px-4 sm:px-6 lg:px-8 py-6 max-w-7xl w-full mx-auto">
          {currentTab === 'dashboard' && (
            <DashboardView
              products={products}
              marketPrices={marketPrices}
              notices={notices}
              harvestEvents={harvestEvents}
              onOpenAddProductModal={() => {
                setEditingProduct(null);
                setIsAddProductOpen(true);
              }}
              onOpenUpdateSeasonModal={() => setIsUpdateSeasonOpen(true)}
              onOpenMarketRatesModal={() => setIsMarketRatesOpen(true)}
              onSelectProductToEdit={handleSelectProductToEdit}
              onToggleProductStatus={handleToggleProductStatus}
              onNavigateToTab={(tab) => setCurrentTab(tab)}
            />
          )}

          {currentTab === 'farm-management' && (
            <FarmManagementView
              farmPlots={farmPlots}
              onOpenUpdateSeasonModal={() => setIsUpdateSeasonOpen(true)}
              onOpenAddProductModal={() => {
                setEditingProduct(null);
                setIsAddProductOpen(true);
              }}
              triggerToast={triggerToast}
            />
          )}

          {currentTab === 'forward-contracts' && (
            <ForwardContractsView
              onOpenUpdateSeasonModal={() => setIsUpdateSeasonOpen(true)}
              triggerToast={triggerToast}
            />
          )}

          {currentTab === 'group-buys' && (
            <GroupBuysManagementView
              triggerToast={triggerToast}
            />
          )}

          {currentTab === 'product-catalog' && (
            <ProductCatalogView
              products={products}
              onOpenAddProductModal={() => {
                setEditingProduct(null);
                setIsAddProductOpen(true);
              }}
              onSelectProductToEdit={handleSelectProductToEdit}
              onToggleProductStatus={handleToggleProductStatus}
            />
          )}

          {currentTab === 'order-tracking' && (
            <OrderTrackingView
              orders={orders}
              onSelectOrder={(ord) => setSelectedOrderForDetail(ord)}
            />
          )}

          {currentTab === 'inventory' && (
            <InventoryView 
              inventory={inventory} 
              onOpenAddInventoryModal={() => setIsAddInventoryOpen(true)}
              onDeleteInventory={handleDeleteInventory}
            />
          )}

          {currentTab === 'analytics' && (
            <AnalyticsView />
          )}

          {currentTab === 'ai-chat' && (
            <AiChatPageView />
          )}

          {currentTab === 'support' && (
            <SupportSettingsView mode="support" />
          )}

          {currentTab === 'settings' && (
            <SupportSettingsView mode="settings" />
          )}
        </main>
      </div>

      {/* Floating Action Button (FAB) for AI Chat Widget */}
      {!isAiChatWidgetOpen && (
        <button
          id="floating-ai-chat-fab"
          onClick={() => setIsAiChatWidgetOpen(true)}
          className="fixed bottom-6 right-6 z-40 bg-[#176a22] hover:bg-[#12541b] active:bg-[#0e4315] text-white px-4 py-3.5 rounded-full shadow-2xl flex items-center gap-2.5 transition-all transform hover:scale-105 cursor-pointer border border-[#c9ecc1]/30"
          title="Hỏi Trợ lý AI AgriConnect"
        >
          <div className="relative">
            <Bot size={24} className="text-[#a3f69c]" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-[#40e0d0] rounded-full animate-ping" />
          </div>
          <span className="font-extrabold text-xs tracking-wide hidden sm:inline">Hỏi Trợ lý AI</span>
          <Sparkles size={14} className="text-[#a3f69c]" />
        </button>
      )}

      {/* Floating AI Chat Widget Overlay */}
      <AiChatWidget
        isOpen={isAiChatWidgetOpen}
        onClose={() => setIsAiChatWidgetOpen(false)}
      />

      {/* Modals & Overlay Drawers */}
      <AddProductModal
        isOpen={isAddProductOpen}
        onClose={() => {
          setIsAddProductOpen(false);
          setEditingProduct(null);
        }}
        onAddProduct={handleAddOrUpdateProduct}
        editingProduct={editingProduct}
      />

      <AddInventoryModal
        isOpen={isAddInventoryOpen}
        onClose={() => setIsAddInventoryOpen(false)}
        onAddInventory={handleAddInventory}
      />

      <UpdateSeasonModal
        isOpen={isUpdateSeasonOpen}
        onClose={() => setIsUpdateSeasonOpen(false)}
        onSaveSeason={(seasonData) => {
          console.log('Saved season data:', seasonData);
        }}
      />

      <MarketRatesModal
        isOpen={isMarketRatesOpen}
        onClose={() => setIsMarketRatesOpen(false)}
        marketPrices={marketPrices}
      />

      <OrderDetailModal
        order={selectedOrderForDetail}
        onClose={() => setSelectedOrderForDetail(null)}
        onUpdateStatus={handleUpdateOrderStatus}
      />

      <NotificationsDrawer
        isOpen={isNotificationsOpen}
        onClose={() => setIsNotificationsOpen(false)}
        notices={notices}
        onMarkAllRead={handleMarkAllNoticesRead}
      />

      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#176a22] text-white px-4 py-3 rounded-xl shadow-xl font-bold text-xs flex items-center gap-2 animate-in slide-in-from-bottom-5 border border-[#a3f69c]/30">
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
};
