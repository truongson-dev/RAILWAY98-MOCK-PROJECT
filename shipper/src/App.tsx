import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { DashboardView } from './components/DashboardView';
import { RoutesView } from './components/RoutesView';
import { HistoryView } from './components/HistoryView';
import { FleetView } from './components/FleetView';
import { ShipmentTrackingView } from './components/ShipmentTrackingView';
import { ShipmentsListView } from './components/ShipmentsListView';
import { UserProfileCVView } from './components/UserProfileCVView';
import { AgriChatWidget } from './components/AgriChatWidget';
import { SystemStatusModal } from './components/SystemStatusModal';
import { AssignOrderModal, AssignableOrder } from './components/AssignOrderModal';
import { 
  INITIAL_ORDERS, 
  INITIAL_VEHICLES, 
  INITIAL_ROUTES, 
  INITIAL_NOTIFICATIONS,
  getDriverAvatarByName 
} from './data/mockData';
import { NavigationTab, OrderItem, Vehicle, TransportRoute, NotificationItem } from './types';
import { CheckCircle2, AlertCircle } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<NavigationTab>('dashboard');
  const [isProfileView, setIsProfileView] = useState(false);
  const [orders, setOrders] = useState<OrderItem[]>(INITIAL_ORDERS);
  const [vehicles, setVehicles] = useState<Vehicle[]>(INITIAL_VEHICLES);
  const [routes, setRoutes] = useState<TransportRoute[]>(INITIAL_ROUTES);
  const [notifications, setNotifications] = useState<NotificationItem[]>(INITIAL_NOTIFICATIONS);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [isSystemStatusOpen, setIsSystemStatusOpen] = useState(false);
  const [isOpenMobile, setIsOpenMobile] = useState(false);
  
  // Assign Order Modal state & Global busy driver state
  const [assignedOrderCodes, setAssignedOrderCodes] = useState<string[]>([]);
  const [busyDriverNames, setBusyDriverNames] = useState<string[]>([]);

  const handleAssignDriver = (driverName: string, vehiclePlate?: string) => {
    if (!driverName) return;
    const cleanName = driverName.trim();
    setBusyDriverNames(prev => Array.from(new Set([...prev, cleanName])));

    // Sync vehicle status to 'busy' for assigned order
    setVehicles(prevVehs => {
      return prevVehs.map(v => {
        const normDriver = (v.driverName || '').toLowerCase().trim();
        const normPlate = (v.plateNumber || '').toUpperCase().replace(/[^A-Z0-9]/g, '');
        const searchPlate = (vehiclePlate || '').toUpperCase().replace(/[^A-Z0-9]/g, '');
        const matchesPlate = Boolean(searchPlate && normPlate === searchPlate);
        const matchesDriver = Boolean(normDriver && (normDriver === cleanName.toLowerCase() || normDriver.includes(cleanName.toLowerCase())));

        if (matchesPlate || matchesDriver) {
          return {
            ...v,
            status: 'busy' as const
          };
        }
        return v;
      });
    });
  };

  const [assignModalInfo, setAssignModalInfo] = useState<{
    isOpen: boolean;
    driverName: string;
    vehiclePlate?: string;
  } | null>(null);

  const handleOpenAssignOrderModal = (driverName: string, vehiclePlate?: string) => {
    setActiveTab('shipments');
    setAssignModalInfo({
      isOpen: true,
      driverName: driverName || 'Lê Văn A',
      vehiclePlate
    });
  };

  const handleConfirmAssignOrder = (selectedOrders: AssignableOrder[], driverName: string, vehiclePlate?: string) => {
    const orderCodesList = selectedOrders.map(o => o.orderCode);
    const orderCodes = orderCodesList.join(', ');
    showToast(`Đã chỉ định ${selectedOrders.length} đơn hàng (${orderCodes}) cho tài xế ${driverName}!`);

    setAssignedOrderCodes(prev => Array.from(new Set([...prev, ...orderCodesList])));
    handleAssignDriver(driverName, vehiclePlate);

    // Sync driver & vehicle status to 'active' (Đang di chuyển)
    setVehicles(prevVehs => {
      return prevVehs.map(v => {
        const matchesPlate = vehiclePlate && v.plateNumber.toUpperCase().trim() === vehiclePlate.toUpperCase().trim();
        const matchesDriver = v.driverName && v.driverName.toLowerCase().includes(driverName.toLowerCase());
        if (matchesPlate || matchesDriver) {
          return {
            ...v,
            status: 'active',
            orderCode: selectedOrders[0]?.orderCode || v.orderCode || '#AG-5012'
          };
        }
        return v;
      });
    });

    // Add or Update Route
    setRoutes(prevRoutes => {
      const existingRouteIndex = prevRoutes.findIndex(r => 
        r.driverName.toLowerCase().includes(driverName.toLowerCase()) || 
        (vehiclePlate && r.vehiclePlate.toUpperCase() === vehiclePlate.toUpperCase())
      );

      const firstOrder = selectedOrders[0];
      const targetPlate = vehiclePlate || '60C-224.11';
      
      if (existingRouteIndex >= 0) {
        return prevRoutes.map((r, idx) => {
          if (idx === existingRouteIndex) {
            return {
              ...r,
              status: 'active',
              orderCode: firstOrder ? firstOrder.orderCode : r.orderCode,
              origin: firstOrder ? firstOrder.pickupLocation : r.origin,
              destination: firstOrder ? firstOrder.deliveryLocation : r.destination,
              progressPercentage: 0,
              stops: [
                {
                  id: `s-${Date.now()}-1`,
                  name: firstOrder ? firstOrder.pickupLocation : r.origin,
                  type: 'pickup',
                  address: firstOrder ? firstOrder.pickupLocation : r.origin,
                  scheduledTime: '08:00 AM',
                  status: 'pending',
                  contactPerson: 'Quản kho / Nhà vườn',
                  phone: '0909 123 456'
                },
                {
                  id: `s-${Date.now()}-2`,
                  name: firstOrder ? firstOrder.deliveryLocation : r.destination,
                  type: 'delivery',
                  address: firstOrder ? firstOrder.deliveryLocation : r.destination,
                  scheduledTime: '09:30 AM',
                  status: 'pending',
                  contactPerson: 'Đại diện nhận hàng',
                  phone: '0988 777 666'
                }
              ]
            };
          }
          return r;
        });
      } else {
        const newRoute: TransportRoute = {
          id: `route-${Date.now()}`,
          routeCode: `ROUTE-${targetPlate.replace(/[^A-Z0-9]/gi, '')}`,
          orderCode: firstOrder ? firstOrder.orderCode : '#ORD-7830',
          vehiclePlate: targetPlate,
          driverName: driverName,
          driverAvatar: getDriverAvatarByName(driverName),
          origin: firstOrder ? firstOrder.pickupLocation : 'Chợ Đầu Mối Bình Điền',
          destination: firstOrder ? firstOrder.deliveryLocation : 'Nhà hàng Sen Việt Q1',
          distanceKm: 28,
          estimatedHours: 1.2,
          status: 'active',
          progressPercentage: 0,
          stops: [
            {
              id: `s-${Date.now()}-1`,
              name: firstOrder ? firstOrder.pickupLocation : 'Chợ Đầu Mối Bình Điền',
              type: 'pickup',
              address: firstOrder ? firstOrder.pickupLocation : 'Chợ Đầu Mối Bình Điền',
              scheduledTime: '08:00 AM',
              status: 'pending',
              contactPerson: 'Quản kho / Nhà vườn',
              phone: '0909 123 456'
            },
            {
              id: `s-${Date.now()}-2`,
              name: firstOrder ? firstOrder.deliveryLocation : 'Nhà hàng Sen Việt Q1',
              type: 'delivery',
              address: firstOrder ? firstOrder.deliveryLocation : 'Nhà hàng Sen Việt Q1',
              scheduledTime: '09:30 AM',
              status: 'pending',
              contactPerson: 'Đại diện nhận hàng',
              phone: '0988 777 666'
            }
          ]
        };
        return [newRoute, ...prevRoutes];
      }
    });

    setAssignModalInfo(null);
  };

  const handleConfirmAssignOrderFromTracking = (
    driverName: string,
    vehiclePlate: string,
    orderCode: string,
    pickup: string,
    delivery: string,
    cargoType: string,
    weight: string,
    revenue: string
  ) => {
    const singleOrder: AssignableOrder = {
      id: orderCode.toLowerCase().replace('#', ''),
      orderCode,
      weight,
      pickupLocation: pickup,
      deliveryLocation: delivery,
      cargoType,
      expectedRevenue: revenue
    };
    handleConfirmAssignOrder([singleOrder], driverName, vehiclePlate);
  };

  // Toast notification state
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  // Handlers
  const [initialAssigningOrderCode, setInitialAssigningOrderCode] = useState<string | null>(null);

  const handleAcceptOrder = (orderId: string) => {
    setOrders(prev => prev.map(o => {
      if (o.id === orderId) {
        showToast(`Đã chấp nhận đơn hàng ${o.orderCode}! Đang xếp xe bốc hàng.`);
        setAssignedOrderCodes(codes => Array.from(new Set([...codes, o.orderCode])));
        return { ...o, status: 'in_transit' };
      }
      return o;
    }));
  };

  const handleAcceptOrderFromDashboard = (orderId: string, orderCode?: string) => {
    const targetOrder = orders.find(o => o.id === orderId);
    const code = orderCode || targetOrder?.orderCode || `#ORD-${orderId}`;
    handleAcceptOrder(orderId);
    setInitialAssigningOrderCode(code);
    setActiveTab('shipments');
  };

  const handleRejectOrder = (orderId: string) => {
    setOrders(prev => prev.map(o => {
      if (o.id === orderId) {
        showToast(`Đã từ chối đơn hàng ${o.orderCode}.`);
        return { ...o, status: 'rejected' };
      }
      return o;
    }));
  };

  const handleAddVehicle = (newVeh: Vehicle) => {
    const avatarUrl = newVeh.driverAvatar || getDriverAvatarByName(newVeh.driverName);
    const vehicleWithAvatar = { ...newVeh, driverAvatar: avatarUrl };

    setVehicles(prev => [vehicleWithAvatar, ...prev]);

    // When adding a vehicle with status 'active' (đang vận chuyển), sync with Routes & Orders
    if (newVeh.status === 'active') {
      const targetPlate = (newVeh.plateNumber || '').trim();
      const originName = newVeh.origin || 'Kho Tổng Agri Mart - Đà Lạt';
      const originAddr = newVeh.originAddress || 'Kho Tổng Agri Mart, Phường 9, TP. Đà Lạt, Lâm Đồng';
      const destName = newVeh.destination || 'Chợ Đầu Mối Bình Điền - HCM';
      const destAddr = newVeh.destinationAddress || 'Đại lộ Nguyễn Văn Linh, Phường 7, Quận 8, TP.HCM';
      const orderCodeVal = newVeh.orderCode || `#AG-${Math.floor(5000 + Math.random() * 1000)}`;
      const distance = newVeh.distanceKm || 308;
      const estHours = +(distance / 50).toFixed(1);

      setRoutes(prev => {
        const exists = prev.some(r => (r.vehiclePlate || '').toUpperCase().trim() === targetPlate.toUpperCase());
        if (!exists) {
          const newRoute: TransportRoute = {
            id: `route-${Date.now()}`,
            routeCode: `ROUTE-${targetPlate.replace(/[^A-Z0-9]/gi, '')}`,
            orderCode: orderCodeVal,
            vehiclePlate: newVeh.plateNumber,
            driverName: newVeh.driverName && newVeh.driverName !== 'Chưa phân công' ? newVeh.driverName : 'Nguyễn Văn A',
            driverAvatar: avatarUrl,
            origin: originName,
            destination: destName,
            distanceKm: distance,
            estimatedHours: estHours,
            status: 'active',
            progressPercentage: 0, // Reset to 0% as newly started/edited
            stops: [
              {
                id: `s-${Date.now()}-1`,
                name: originName,
                type: 'pickup',
                address: originAddr,
                scheduledTime: '05:00 AM',
                status: 'completed',
                contactPerson: 'Anh Bình (Quản kho)',
                phone: '0903 123 456'
              },
              {
                id: `s-${Date.now()}-2`,
                name: 'Trạm Kiểm Định Dầu Giây',
                type: 'transit',
                address: 'Trạm Kiểm Định Nông Sản, Dầu Giây, Đồng Nai',
                scheduledTime: '09:30 AM',
                status: 'pending',
                contactPerson: 'Kỹ thuật viên Trạm Cân',
                phone: '0918 222 333'
              },
              {
                id: `s-${Date.now()}-3`,
                name: destName,
                type: 'delivery',
                address: destAddr,
                scheduledTime: '11:15 AM',
                status: 'pending',
                contactPerson: 'Chị Mai (Nhận hàng)',
                phone: '0988 777 666'
              }
            ]
          };
          return [newRoute, ...prev];
        }
        return prev;
      });

      setOrders(prev => {
        const exists = prev.some(o => (o.vehiclePlate || '').toUpperCase().trim() === targetPlate.toUpperCase());
        if (!exists) {
          const newOrder: OrderItem = {
            id: `ord-${Date.now()}`,
            orderCode: orderCodeVal,
            pickupLocation: originName,
            deliveryLocation: destName,
            expectedRevenue: 1850000,
            revenueFormatted: '1.850.000 ₫',
            status: 'in_transit',
            productType: newVeh.cargoType || 'Rau củ quả tươi',
            weight: newVeh.capacity || '5.0 Tấn',
            vehiclePlate: newVeh.plateNumber,
            driverName: newVeh.driverName && newVeh.driverName !== 'Chưa phân công' ? newVeh.driverName : 'Nguyễn Văn A',
            createdAt: new Date().toISOString()
          };
          return [newOrder, ...prev];
        }
        return prev;
      });
    }

    showToast(`Đã thêm xe ${newVeh.plateNumber} (${newVeh.type}) vào đội xe.`);
  };

  const handleUpdateVehicle = (updatedVeh: Vehicle) => {
    const avatarUrl = updatedVeh.driverAvatar || getDriverAvatarByName(updatedVeh.driverName);
    const vehicleWithAvatar = { ...updatedVeh, driverAvatar: avatarUrl };

    setVehicles(prev => prev.map(v => v.id === updatedVeh.id ? vehicleWithAvatar : v));
    const targetPlate = (updatedVeh.plateNumber || '').toUpperCase().trim();

    // When changing status to 'active' (đang vận chuyển), sync with Routes & Shipment Tracking
    if (updatedVeh.status === 'active') {
      const originName = updatedVeh.origin || 'Kho Tổng Agri Mart - Đà Lạt';
      const originAddr = updatedVeh.originAddress || 'Kho Tổng Agri Mart, Phường 9, TP. Đà Lạt, Lâm Đồng';
      const destName = updatedVeh.destination || 'Chợ Đầu Mối Bình Điền - HCM';
      const destAddr = updatedVeh.destinationAddress || 'Đại lộ Nguyễn Văn Linh, Phường 7, Quận 8, TP.HCM';
      const orderCodeVal = updatedVeh.orderCode || `#AG-${Math.floor(5000 + Math.random() * 1000)}`;
      const distance = updatedVeh.distanceKm || 308;
      const estHours = +(distance / 50).toFixed(1);

      setRoutes(prev => {
        const existingRouteIndex = prev.findIndex(r => (r.vehiclePlate || '').toUpperCase().trim() === targetPlate);
        const updatedRoute: TransportRoute = {
          id: existingRouteIndex >= 0 ? prev[existingRouteIndex].id : `route-${Date.now()}`,
          routeCode: `ROUTE-${targetPlate.replace(/[^A-Z0-9]/gi, '')}`,
          orderCode: orderCodeVal,
          vehiclePlate: updatedVeh.plateNumber,
          driverName: updatedVeh.driverName && updatedVeh.driverName !== 'Chưa phân công' ? updatedVeh.driverName : 'Nguyễn Văn A',
          driverAvatar: avatarUrl,
          origin: originName,
          destination: destName,
          distanceKm: distance,
          estimatedHours: estHours,
          status: 'active',
          progressPercentage: 0, // Reset to 0% when newly modified / set to active
          stops: [
            {
              id: `s-${Date.now()}-1`,
              name: originName,
              type: 'pickup',
              address: originAddr,
              scheduledTime: '05:00 AM',
              status: 'completed',
              contactPerson: 'Anh Bình (Quản kho)',
              phone: '0903 123 456'
            },
            {
              id: `s-${Date.now()}-2`,
              name: 'Trạm Kiểm Định Dầu Giây',
              type: 'transit',
              address: 'Trạm Kiểm Định Nông Sản, Dầu Giây, Đồng Nai',
              scheduledTime: '09:30 AM',
              status: 'pending',
              contactPerson: 'Kỹ thuật viên Trạm Cân',
              phone: '0918 222 333'
            },
            {
              id: `s-${Date.now()}-3`,
              name: destName,
              type: 'delivery',
              address: destAddr,
              scheduledTime: '11:15 AM',
              status: 'pending',
              contactPerson: 'Chị Mai (Nhận hàng)',
              phone: '0988 777 666'
            }
          ]
        };

        if (existingRouteIndex >= 0) {
          const next = [...prev];
          next[existingRouteIndex] = updatedRoute;
          return next;
        } else {
          return [updatedRoute, ...prev];
        }
      });

      setOrders(prev => {
        const hasActiveOrder = prev.some(o => (o.vehiclePlate || '').toUpperCase().trim() === targetPlate && o.status === 'in_transit');
        if (!hasActiveOrder) {
          const newOrder: OrderItem = {
            id: `ord-${Date.now()}`,
            orderCode: orderCodeVal,
            pickupLocation: originName,
            deliveryLocation: destName,
            expectedRevenue: 1850000,
            revenueFormatted: '1.850.000 ₫',
            status: 'in_transit',
            productType: updatedVeh.cargoType || 'Rau củ quả tươi',
            weight: updatedVeh.capacity || '5.0 Tấn',
            vehiclePlate: updatedVeh.plateNumber,
            driverName: updatedVeh.driverName && updatedVeh.driverName !== 'Chưa phân công' ? updatedVeh.driverName : 'Nguyễn Văn A',
            createdAt: new Date().toISOString()
          };
          return [newOrder, ...prev];
        }
        return prev.map(o => (o.vehiclePlate || '').toUpperCase().trim() === targetPlate ? {
          ...o,
          status: 'in_transit',
          driverName: updatedVeh.driverName,
          orderCode: orderCodeVal
        } : o);
      });
    } else {
      // If vehicle status changed away from active
      setRoutes(prev => prev.map(r => (r.vehiclePlate || '').toUpperCase().trim() === targetPlate ? { ...r, status: 'completed' } : r));
      setOrders(prev => prev.map(o => {
        if ((o.vehiclePlate || '').toUpperCase().trim() === targetPlate && o.status === 'in_transit') {
          return { ...o, status: 'pending', vehiclePlate: undefined };
        }
        return o;
      }));
    }

    showToast(`Đã cập nhật thông tin xe ${updatedVeh.plateNumber}.`);
  };

  const handleDeleteVehicles = (vehicleIdsToDelete: string[]) => {
    const deletedVehicles = vehicles.filter(v => vehicleIdsToDelete.includes(v.id));
    const deletedPlates = deletedVehicles.map(v => (v.plateNumber || '').toUpperCase().trim());
    
    setVehicles(prev => prev.filter(v => !vehicleIdsToDelete.includes(v.id)));
    
    if (deletedPlates.length > 0) {
      // Remove corresponding active transport routes
      setRoutes(prev => prev.filter(r => !deletedPlates.includes((r.vehiclePlate || '').toUpperCase().trim())));
      
      // Update/remove corresponding orders so they no longer show in transit
      setOrders(prev => prev.filter(o => {
        const oPlate = (o.vehiclePlate || '').toUpperCase().trim();
        return !deletedPlates.includes(oPlate);
      }));
    }
    
    showToast(`Đã xóa ${vehicleIdsToDelete.length} phương tiện khỏi hệ thống.`);
  };

  const handleAddRoute = (newRoute: TransportRoute) => {
    setRoutes(prev => [newRoute, ...prev]);
    showToast(`Đã tạo lộ trình mới: ${newRoute.routeCode}!`);
  };

  const handleMarkNotifRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const handleLogout = () => {
    showToast('Đã đăng xuất khỏi tài khoản AgriShipper.');
  };

  const pendingCount = orders.filter(o => o.status === 'pending').length;

  // Render standalone Profile CV view without left sidebar if active
  if (isProfileView) {
    return (
      <>
        {toastMessage && (
          <div className="fixed top-4 right-4 z-50 bg-[#176a22] text-white px-5 py-3 rounded-xl shadow-2xl flex items-center gap-3 border border-white/20 animate-in fade-in slide-in-from-top-3 duration-200">
            <CheckCircle2 className="w-5 h-5 text-emerald-300" />
            <span className="text-sm font-bold">{toastMessage}</span>
          </div>
        )}
        <UserProfileCVView onBack={() => setIsProfileView(false)} />
      </>
    );
  }

  return (
    <div className="bg-[#f7fbf0] text-[#181d16] antialiased min-h-screen flex flex-col md:flex-row font-sans">
      {/* Toast Popup Notification */}
      {toastMessage && (
        <div className="fixed top-4 right-4 z-50 bg-[#176a22] text-white px-5 py-3 rounded-xl shadow-2xl flex items-center gap-3 border border-white/20 animate-in fade-in slide-in-from-top-3 duration-200">
          <CheckCircle2 className="w-5 h-5 text-emerald-300" />
          <span className="text-sm font-bold">{toastMessage}</span>
        </div>
      )}

      {/* Left Sidebar */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenSystemStatus={() => setIsSystemStatusOpen(true)}
        onLogout={handleLogout}
        isOpenMobile={isOpenMobile}
        setIsOpenMobile={setIsOpenMobile}
        pendingCount={pendingCount}
      />

      {/* Main Container */}
      <main className="flex-1 flex flex-col min-w-0 min-h-screen overflow-x-hidden">
        {/* Header */}
        <Header
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          notifications={notifications}
          onMarkNotificationRead={handleMarkNotifRead}
          onOpenMobileMenu={() => setIsOpenMobile(true)}
          onNavigateTab={(tab) => setActiveTab(tab)}
          onOpenProfile={() => setIsProfileView(true)}
        />

        {/* View Content Body */}
        <div className="flex-1 p-4 sm:p-6 space-y-6">
          <div className={activeTab === 'dashboard' ? 'block' : 'hidden'}>
            <DashboardView
              orders={orders}
              vehicles={vehicles}
              onAcceptOrder={handleAcceptOrderFromDashboard}
              onRejectOrder={handleRejectOrder}
              onNavigateTab={(tab) => setActiveTab(tab)}
              onOpenAssignOrderModal={handleOpenAssignOrderModal}
            />
          </div>

          <div className={activeTab === 'routes' ? 'block' : 'hidden'}>
            <RoutesView
              routes={routes}
              vehicles={vehicles}
              onAddRoute={handleAddRoute}
              onOpenAssignOrderModal={handleOpenAssignOrderModal}
            />
          </div>

          <div className={activeTab === 'history' ? 'block' : 'hidden'}>
            <HistoryView
              orders={orders}
            />
          </div>

          <div className={activeTab === 'fleet' ? 'block' : 'hidden'}>
            <FleetView
              vehicles={vehicles}
              routes={routes}
              busyDriverNames={busyDriverNames}
              onAddVehicle={handleAddVehicle}
              onUpdateVehicle={handleUpdateVehicle}
              onDeleteVehicles={handleDeleteVehicles}
              onNavigateTab={(tab) => setActiveTab(tab)}
              onOpenAssignOrderModal={handleOpenAssignOrderModal}
              showToast={showToast}
            />
          </div>

          <div className={activeTab === 'shipments' ? 'block' : 'hidden'}>
            <ShipmentTrackingView
              orders={orders}
              vehicles={vehicles}
              assignedOrderCodes={assignedOrderCodes}
              busyDriverNames={busyDriverNames}
              initialAssigningOrderCode={initialAssigningOrderCode}
              onClearInitialAssigningOrderCode={() => setInitialAssigningOrderCode(null)}
              onOpenAssignOrderModal={handleOpenAssignOrderModal}
              onConfirmAssignOrderFromTracking={handleConfirmAssignOrderFromTracking}
            />
          </div>

          <div className={activeTab === 'shipments_list' ? 'block' : 'hidden'}>
            <ShipmentsListView
              orders={orders}
              vehicles={vehicles}
              assignedOrderCodes={assignedOrderCodes}
              busyDriverNames={busyDriverNames}
              onAssignDriver={handleAssignDriver}
              onNavigateTab={(tab) => setActiveTab(tab)}
              onOpenAssignOrderCode={(code) => {
                setInitialAssigningOrderCode(code);
                setActiveTab('shipments');
              }}
              onAcceptOrder={handleAcceptOrder}
              onRejectOrder={handleRejectOrder}
              showToast={showToast}
            />
          </div>
        </div>

        {/* Footer */}
        <Footer />
      </main>

      {/* AgriChat Floating Support Drawer */}
      <AgriChatWidget />

      {/* System Status Drawer Modal */}
      <SystemStatusModal
        isOpen={isSystemStatusOpen}
        onClose={() => setIsSystemStatusOpen(false)}
      />

      {/* Assign Order Popup Modal */}
      {assignModalInfo && (
        <AssignOrderModal
          isOpen={assignModalInfo.isOpen}
          driverName={assignModalInfo.driverName}
          vehiclePlate={assignModalInfo.vehiclePlate}
          assignedOrderCodes={assignedOrderCodes}
          onClose={() => setAssignModalInfo(null)}
          onConfirmAssign={handleConfirmAssignOrder}
        />
      )}
    </div>
  );
}
