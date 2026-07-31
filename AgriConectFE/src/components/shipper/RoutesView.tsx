import React, { useState } from 'react';
import { DriverCallModal } from './DriverCallModal';
import { 
  MapPin, 
  Navigation, 
  Clock, 
  Truck, 
  Plus, 
  Phone, 
  User, 
  Check, 
  AlertTriangle,
  Radio,
  Star,
  FileText,
  X,
  CheckCircle2,
  Minus,
  Maximize2,
  RotateCcw,
  ShieldCheck,
  Fuel
} from 'lucide-react';
import { TransportRoute, Vehicle } from './types';


interface RoutesViewProps {
  routes: TransportRoute[];
  vehicles?: Vehicle[];
  onAddRoute: (newRoute: TransportRoute) => void;
  onOpenAssignOrderModal?: (driverName: string, vehiclePlate?: string) => void;
}

export const RoutesView: React.FC<RoutesViewProps> = ({ routes, vehicles, onAddRoute, onOpenAssignOrderModal }) => {
  const [selectedRoute, setSelectedRoute] = useState<TransportRoute | null>(routes[0] || null);

  React.useEffect(() => {
    if (routes.length > 0) {
      setSelectedRoute(prev => {
        if (!prev || !routes.some(r => r.id === prev.id)) {
          return routes[0];
        }
        const updated = routes.find(r => r.id === prev.id);
        return updated || prev;
      });
    } else {
      setSelectedRoute(null);
    }
  }, [routes]);

  const getVehicleNameByPlate = (plateNumber: string) => {
    const allVehicles = vehicles && vehicles.length > 0 ? vehicles : [];
    const match = allVehicles.find(v => v.plateNumber.toUpperCase() === (plateNumber || '').toUpperCase());
    if (match) {
      return match.subtitle ? `${match.type} • ${match.subtitle}` : match.type;
    }
    return 'Xe Vận Chuyển Nông Sản';
  };
  const [showAddModal, setShowAddModal] = useState(false);
  const [showLogModal, setShowLogModal] = useState(false);
  const [showCallModal, setShowCallModal] = useState(false);
  
  // Map controls state
  const [selectedCity, setSelectedCity] = useState('TP. Hồ Chí Minh');
  const [zoomLevel, setZoomLevel] = useState(1);

  // New route form state
  const [routeCode, setRouteCode] = useState('ROUTE-DALAT-HCM');
  const [driverName, setDriverName] = useState('Trần Văn Mạnh');
  const [vehiclePlate, setVehiclePlate] = useState('51C-882.91');
  const [origin, setOrigin] = useState('Hợp Tác Xá Rau Tươi Đà Lạt');
  const [destination, setDestination] = useState('Kho Trung Chuyển Bình Điền');
  const [distanceKm, setDistanceKm] = useState(308);

  const handleCreateRoute = (e: React.FormEvent) => {
    e.preventDefault();
    const createdRoute: TransportRoute = {
      id: `route-${Date.now()}`,
      routeCode,
      driverName,
      driverAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      vehiclePlate,
      origin,
      destination,
      distanceKm,
      estimatedHours: +(distanceKm / 50).toFixed(1),
      status: 'active',
      progressPercentage: 10,
      stops: [
        { id: 's-1', name: origin, type: 'pickup', address: origin, scheduledTime: '06:00 AM', status: 'completed', contactPerson: 'Nhà vườn Đà Lạt', phone: '0912 345 678' },
        { id: 's-2', name: 'Trạm kiểm định nông sản Dầu Giây', type: 'transit', address: 'Dầu Giây, Đồng Nai', scheduledTime: '10:30 AM', status: 'in_progress', contactPerson: 'Trạm kiểm định', phone: '0908 111 222' },
        { id: 's-3', name: destination, type: 'delivery', address: destination, scheduledTime: '01:00 PM', status: 'pending', contactPerson: 'Quản kho Bình Điền', phone: '0989 999 888' },
      ]
    };
    onAddRoute(createdRoute);
    setSelectedRoute(createdRoute);
    setShowAddModal(false);
  };

  const handleZoomIn = () => setZoomLevel(prev => Math.min(+(prev + 0.15).toFixed(2), 2.5));
  const handleZoomOut = () => setZoomLevel(prev => Math.max(+(prev - 0.15).toFixed(2), 1));
  const handleResetZoom = () => setZoomLevel(1);

  if (!selectedRoute) return null;

  // Calculated distance stats & stops
  const pickupStop = selectedRoute.stops?.find(s => s.type === 'pickup') || selectedRoute.stops?.[0];
  const deliveryStop = selectedRoute.stops?.find(s => s.type === 'delivery') || selectedRoute.stops?.[selectedRoute.stops.length - 1];

  const completedKm = Math.round((selectedRoute.distanceKm * selectedRoute.progressPercentage) / 100);
  const remainingKm = Math.max(0, selectedRoute.distanceKm - completedKm);

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-[#181d16]">Quản lý Lộ trình Vận chuyển Chi tiết</h2>
          <p className="text-sm text-[#40493d] mt-0.5">Giám sát xe tải lạnh, theo dõi tiến độ thời gian thực & tuyến đường giao nông sản.</p>
        </div>
      </div>

      {/* Main Content Layout: Interactive Map + Right Management Panel */}
      <div className="flex flex-col lg:flex-row gap-6 items-stretch">
        
        {/* Left Interactive Map View */}
        <div className="flex-1 bg-white border border-[#bfcaba] rounded-2xl shadow-xs overflow-hidden flex flex-col min-h-[580px] lg:min-h-[680px] relative">
          
          {/* Map Top Filter Bar */}
          <div className="px-5 py-3.5 border-b border-[#bfcaba] flex flex-wrap justify-between items-center bg-white z-10 gap-3">
            <div className="flex items-center gap-2">
              <Navigation className="w-5 h-5 text-[#176a22]" />
              <span className="font-bold text-[#181d16] text-sm sm:text-base">Bản đồ định vị GPS hành trình</span>
              <span className="bg-[#e6f4ea] text-[#00893d] border border-[#a5d6a7] text-[11px] font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1">
                <Radio className="w-3 h-3 animate-pulse" /> Trực tuyến
              </span>
            </div>

            {/* City Tabs & Zoom */}
            <div className="flex items-center gap-2">
              <div className="flex gap-1.5 bg-[#f1f5ea] p-1 rounded-xl border border-[#bfcaba]">
                {['TP. Hồ Chí Minh', 'Lâm Đồng - Đà Lạt', 'Cần Thơ - Miền Tây', 'Hà Nội'].map((city) => (
                  <button
                    key={city}
                    onClick={() => setSelectedCity(city)}
                    className={`px-3 py-1 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                      selectedCity === city
                        ? 'bg-[#176a22] text-white shadow-xs'
                        : 'text-[#40493d] hover:bg-[#e0e4d9]'
                    }`}
                  >
                    {city}
                  </button>
                ))}
              </div>

              {/* Map Zoom Controls */}
              <div className="flex items-center gap-1.5 bg-[#f1f5ea] border border-[#bfcaba] rounded-xl p-1">
                <button 
                  onClick={handleZoomOut}
                  disabled={zoomLevel <= 1}
                  className="p-1 hover:bg-[#e0e4d9] rounded-lg text-[#181d16] transition-colors cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
                  title="Thu nhỏ"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="text-xs font-bold text-[#176a22] min-w-[36px] text-center font-mono">
                  {Math.round(zoomLevel * 100)}%
                </span>
                <button 
                  onClick={handleZoomIn}
                  disabled={zoomLevel >= 2.5}
                  className="p-1 hover:bg-[#e0e4d9] rounded-lg text-[#181d16] transition-colors cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
                  title="Phóng to"
                >
                  <Plus className="w-4 h-4" />
                </button>
                <button
                  onClick={handleResetZoom}
                  className="px-2 py-1 bg-[#176a22] text-white rounded-lg text-[11px] font-bold hover:bg-[#12541a] transition-all flex items-center gap-1 cursor-pointer ml-1"
                  title="Xem toàn cảnh lộ trình"
                >
                  <Maximize2 className="w-3 h-3" />
                  <span className="hidden md:inline">Toàn cảnh</span>
                </button>
              </div>
            </div>
          </div>

          {/* Map Viewport Area */}
          <div className="flex-1 relative bg-[#eef3e9] overflow-hidden select-none min-h-[500px] lg:min-h-[620px]">
            {/* Map Satellite Image Background */}
            <div 
              className="w-full h-full transition-transform duration-300 origin-center absolute inset-0"
              style={{ transform: `scale(${zoomLevel})` }}
            >
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuD9JC112foxzE7ueMW2dzhff84pq7FPkZWbx1U358RIsp8loD2bAXEipamTeNIOikguGf3EmuUj7lwn9gHaoXaVbtmTYTC9arCEGTOx-CF4mKwiNL115uWoSRiZKGszZdFg_jt45-HEYX-Uy-Q3GlJgyR4AlMqYL_s3zcRtpwdCQ6fyrvAOGkZ3roiZyDjEbZ2S4DvyQ-t40Y5RJ9N3ypNzh1Vs0ib7zy6Q-bbtN3c_r6fgrjNopzlbSw3sxxF3d6g1DTJ6bY5wuzo"
                alt="Map View"
                className="w-full h-full object-fill filter brightness-[0.98] contrast-[1.03]"
              />
            </div>

            {/* Bottom-Right Legend Box ("Chú thích lộ trình") */}
            <div className="absolute bottom-5 right-5 bg-white/95 backdrop-blur-md p-4 rounded-xl shadow-xl border border-[#bfcaba] w-64 z-20 space-y-2.5">
              <h3 className="font-bold text-xs text-[#181d16] uppercase tracking-wider border-b border-[#bfcaba] pb-1.5">
                Chú thích lộ trình
              </h3>
              <div className="space-y-2 text-xs font-medium text-[#181d16]">
                <div className="flex items-center gap-3">
                  <span className="w-8 h-1.5 rounded-full bg-red-500 shrink-0" />
                  <span>Kẹt xe / Cảnh báo</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-8 h-1.5 rounded-full bg-[#176a22] shrink-0" />
                  <span>Đã đi qua</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-8 h-1.5 rounded-full bg-blue-500 shrink-0" />
                  <span>Dự kiến</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-[#176a22] rounded-md flex items-center justify-center text-white shrink-0">
                    <Truck className="w-3.5 h-3.5" />
                  </div>
                  <span className="font-bold text-[#176a22]">Vị trí hiện tại</span>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Right Route Panel & Vehicles Sidebar */}
        <div className="w-full lg:w-[280px] shrink-0 bg-white border border-[#bfcaba] rounded-2xl p-3 shadow-xs flex flex-col space-y-3">
          
          {/* 1. Header Vehicle Info */}
          <div className="pb-2.5 border-b border-[#bfcaba]">
            <div className="flex justify-between items-start gap-2">
              <div>
                <h2 className="text-base font-bold text-[#176a22] whitespace-nowrap">Xe {selectedRoute.vehiclePlate}</h2>
                <p className="text-[11px] text-[#40493d] font-semibold">{getVehicleNameByPlate(selectedRoute.vehiclePlate)}</p>
              </div>
              <div className="flex flex-col items-end gap-1 shrink-0">
                <span className="bg-[#e6f4ea] text-[#00893d] border border-[#a5d6a7] px-2 py-0.5 rounded-full text-[10px] font-bold flex items-center gap-1 shrink-0 whitespace-nowrap">
                  <span className="w-1.5 h-1.5 bg-[#00893d] rounded-full animate-pulse" />
                  Đang di chuyển
                </span>
                {selectedRoute.orderCode && (
                  <span className="bg-[#e6f4ea] text-[#176a22] border border-[#a5d6a7] px-2 py-0.5 rounded text-[10px] font-mono font-bold shrink-0 whitespace-nowrap">
                    {selectedRoute.orderCode}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* 2. Driver Info Card */}
          <div className="flex items-center justify-between bg-[#f7fbf0] p-3 rounded-xl border border-[#d8e2d4] gap-2">
            <div className="flex items-center gap-2 min-w-0">
              {selectedRoute.driverAvatar || getDriverAvatarByName(selectedRoute.driverName) ? (
                <img
                  src={selectedRoute.driverAvatar || getDriverAvatarByName(selectedRoute.driverName)}
                  alt={selectedRoute.driverName}
                  className="w-10 h-10 rounded-full object-cover border border-[#bfcaba] shrink-0"
                />
              ) : (
                <div className="w-10 h-10 rounded-full bg-[#176a22]/10 text-[#176a22] font-black flex items-center justify-center text-sm border border-[#176a22]/20 shrink-0">
                  <User className="w-5 h-5" />
                </div>
              )}
              <div className="space-y-0.5 truncate">
                <p className="font-bold text-xs text-[#181d16] truncate">{selectedRoute.driverName}</p>
                <div className="flex items-center gap-1 text-[10px] text-[#40493d]">
                  <Star className="w-3 h-3 text-amber-500 fill-amber-500 shrink-0" />
                  <span className="font-bold text-[#181d16]">4.9</span>
                  <span className="truncate">• 2,345 đơn</span>
                </div>
              </div>
            </div>

            <button 
              onClick={() => setShowCallModal(true)}
              className="w-8 h-8 rounded-full border border-[#bfcaba] bg-white flex items-center justify-center text-[#176a22] hover:bg-[#176a22] hover:text-white transition-all shadow-2xs cursor-pointer shrink-0"
              title="Gọi tài xế"
            >
              <Phone className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* 3. Origin & Destination Waypoints */}
          <div className="space-y-3 bg-[#f7fbf0] p-3.5 rounded-xl border border-[#d8e2d4]">
            <div className="flex gap-3 relative">
              <div className="flex flex-col items-center">
                <div className="w-6 h-6 rounded-full bg-[#176a22] flex items-center justify-center text-white z-10 shrink-0">
                  <MapPin className="w-3.5 h-3.5" />
                </div>
                <div className="w-0.5 h-full bg-[#bfcaba] absolute top-6" />
              </div>
              <div className="space-y-0.5 min-w-0 flex-1">
                <p className="text-[10px] font-bold text-[#63705d] uppercase tracking-wider">Điểm lấy hàng</p>
                <p className="font-bold text-xs text-[#181d16]">{selectedRoute.origin}</p>
                <p className="text-[11px] text-[#40493d]">{pickupStop?.address || selectedRoute.origin}</p>
              </div>
            </div>

            <div className="flex gap-3 relative pt-1">
              <div className="flex flex-col items-center">
                <div className="w-6 h-6 rounded-full bg-red-600 flex items-center justify-center text-white z-10 shrink-0">
                  <MapPin className="w-3.5 h-3.5" />
                </div>
              </div>
              <div className="space-y-0.5">
                <p className="text-[10px] font-bold text-[#63705d] uppercase tracking-wider">Điểm giao hàng</p>
                <p className="font-bold text-xs text-[#181d16]">{selectedRoute.destination}</p>
                <p className="text-[11px] text-[#40493d]">{deliveryStop?.address || selectedRoute.destination}</p>
              </div>
            </div>
          </div>

          {/* 4. Journey Progress Box (Tiến độ hành trình) */}
          <div className="bg-[#f1f5ea] p-4 rounded-xl border border-[#bfcaba] space-y-3">
            <div className="flex justify-between items-start">
              <div className="space-y-0.5">
                <h4 className="font-bold text-xs text-[#181d16] uppercase tracking-wider">Tiến độ hành trình</h4>
                <p className="text-[10px] text-[#63705d] uppercase font-bold">ESTIMATED TIME (ETA): {deliveryStop?.scheduledTime || '02:45 PM'}</p>
              </div>
              <span className="text-2xl font-black text-[#176a22]">{selectedRoute.progressPercentage}%</span>
            </div>

            <div className="w-full bg-[#e0e4d9] h-2.5 rounded-full overflow-hidden">
              <div 
                className="bg-[#176a22] h-full rounded-full transition-all duration-500"
                style={{ width: `${selectedRoute.progressPercentage}%` }}
              />
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="bg-white p-2.5 rounded-lg border border-[#bfcaba]">
                <p className="text-[10px] uppercase font-bold text-[#63705d]">ĐÃ ĐI</p>
                <p className="font-black text-[#176a22] text-base">{completedKm} km</p>
              </div>
              <div className="bg-white p-2.5 rounded-lg border border-[#bfcaba]">
                <p className="text-[10px] uppercase font-bold text-[#63705d]">CÒN LẠI</p>
                <p className="font-black text-[#40493d] text-base">{remainingKm} km</p>
              </div>
              <div className="bg-white p-2.5 rounded-lg border border-[#bfcaba]">
                <p className="text-[10px] uppercase font-bold text-[#63705d]">TỐI ƯU</p>
                <p className="font-black text-[#181d16] text-base">{selectedRoute.distanceKm} km</p>
              </div>
              <div className="bg-white p-2.5 rounded-lg border border-[#bfcaba]">
                <p className="text-[10px] uppercase font-bold text-[#63705d]">MỨC TIÊU THỤ</p>
                <p className="font-black text-[#181d16] text-base">4.2L/100km</p>
              </div>
            </div>
          </div>

          {/* 5. Button "Xem chi tiết Log vận chuyển" -> Opens Modal */}
          <button
            onClick={() => setShowLogModal(true)}
            className="w-full py-3 bg-white border-2 border-[#176a22] text-[#176a22] rounded-xl font-bold text-xs hover:bg-[#176a22] hover:text-white transition-all flex items-center justify-center gap-2 cursor-pointer shadow-2xs"
          >
            <FileText className="w-4 h-4" />
            <span>Xem chi tiết Log vận chuyển</span>
          </button>

          {/* 6. Traffic Warning Alert */}
          <div className="bg-red-50 p-3.5 rounded-xl border border-red-200 flex gap-3 text-red-900">
            <AlertTriangle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
            <div className="space-y-0.5">
              <p className="font-bold text-xs text-red-800">Cảnh báo kẹt xe</p>
              <p className="text-[11px] text-red-700 leading-snug">
                Phát hiện mật độ giao thông cao trên cầu Sài Gòn. Đề xuất lộ trình thay thế qua hầm Thủ Thiêm.
              </p>
            </div>
          </div>

          {/* 7. DANH SÁCH LỘ TRÌNH ĐANG CHẠY */}
          <div className="space-y-3 pt-2 border-t border-[#bfcaba]">
            <h3 className="text-xs font-bold text-[#176a22] uppercase tracking-wider">
              Danh sách lộ trình đang chạy ({routes.length})
            </h3>

            <div className="space-y-2.5 max-h-[320px] overflow-y-auto pr-1">
              {routes.map((route) => {
                const isSelected = selectedRoute.id === route.id;
                return (
                  <div
                    key={route.id}
                    onClick={() => setSelectedRoute(route)}
                    className={`p-3.5 rounded-xl border transition-all cursor-pointer ${
                      isSelected
                        ? 'border-[#176a22] bg-[#f7fbf0] ring-2 ring-[#176a22]/20 shadow-2xs'
                        : 'border-[#bfcaba] hover:border-[#176a22]/50 hover:bg-[#f1f5ea]'
                    }`}
                  >
                    <div className="mb-1">
                      <span className="font-bold text-xs text-[#176a22] whitespace-nowrap">{route.routeCode}</span>
                    </div>

                    <div className="flex items-center gap-1.5 mb-2 flex-wrap">
                      <span className="px-1.5 py-0.5 bg-emerald-100 text-emerald-800 text-[9px] font-bold rounded-full uppercase whitespace-nowrap">
                        {route.status === 'active' ? 'Đang di chuyển' : 'Đã lập lịch'}
                      </span>
                      {route.orderCode && (
                        <span className="px-1.5 py-0.5 bg-[#e6f4ea] text-[#176a22] border border-[#a5d6a7] text-[9px] font-mono font-bold rounded-full whitespace-nowrap">
                          {route.orderCode}
                        </span>
                      )}
                    </div>

                    <div className="text-xs space-y-1 text-[#40493d]">
                      <div className="flex items-center gap-1.5 font-bold text-[#181d16] text-[11px]">
                        <MapPin className="w-3 h-3 text-[#176a22] shrink-0" />
                        <span className="truncate">{route.origin} → {route.destination}</span>
                      </div>
                      <div className="flex justify-between text-[10px] text-[#63705d] pt-1">
                        <span>Tài xế: <strong>{route.driverName}</strong></span>
                        <span>Biển số: <strong>{route.vehiclePlate}</strong></span>
                      </div>
                    </div>

                    {/* Progress bar inside card */}
                    <div className="mt-2 pt-1 border-t border-[#d8e2d4]">
                      <div className="flex justify-between text-[10px] font-semibold text-[#40493d] mb-1">
                        <span>Tiến độ</span>
                        <span>{route.progressPercentage}%</span>
                      </div>
                      <div className="w-full bg-[#e0e4d9] h-1.5 rounded-full overflow-hidden">
                        <div 
                          className="bg-[#176a22] h-full rounded-full transition-all duration-300"
                          style={{ width: `${route.progressPercentage}%` }}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 8. XE ĐANG CHỜ PHÂN CÔNG */}
          <div className="space-y-3 pt-3 border-t border-[#bfcaba]">
            <h3 className="text-xs font-bold text-[#176a22] uppercase tracking-wider">
              XE ĐANG CHỜ PHÂN CÔNG ({((vehicles || []).filter(v => v.status === 'idle')).length})
            </h3>
            <div className="space-y-2.5">
              {((vehicles || []).filter(v => v.status === 'idle')).length === 0 ? (
                <div className="p-3 bg-[#f2f6eb] border border-[#d0dcd0] rounded-2xl text-xs text-[#525e4e] text-center font-medium">
                  Hiện không có xe nào đang chờ phân công
                </div>
              ) : (
                ((vehicles || []).filter(v => v.status === 'idle')).slice(0, 4).map(veh => {
                  const dName = veh.driverName && veh.driverName !== 'Chưa phân công' ? veh.driverName.replace(/\.$/, '').trim() : 'Lê Văn S';
                  return (
                    <div key={veh.id} className="p-3 bg-[#f2f6eb] border border-[#d0dcd0] rounded-2xl flex justify-between items-center hover:bg-[#eaf1e3] transition-colors">
                      <div className="space-y-0.5">
                        <p className="text-sm font-bold text-[#176a22]">{veh.plateNumber} ({veh.type || 'Xe bãi'})</p>
                        <p className="text-xs text-[#525e4e]">Tài xế: {dName}</p>
                      </div>
                      <button 
                        onClick={() => {
                          if (onOpenAssignOrderModal) {
                            onOpenAssignOrderModal(dName, veh.plateNumber);
                          } else {
                            setShowAddModal(true);
                          }
                        }}
                        className="bg-[#146c2e] hover:bg-[#0e4f21] text-white px-4 py-1.5 rounded-full text-xs font-bold transition-all shadow-2xs cursor-pointer tracking-wide"
                      >
                        GÁN ĐƠN
                      </button>
                    </div>
                  );
                })
              )}
            </div>
          </div>

          {/* 9. XE ĐÃ GIAO XONG GẦN ĐÂY */}
          <div className="space-y-3 pt-3 border-t border-[#bfcaba]">
            <h3 className="text-xs font-bold text-[#176a22] uppercase tracking-wider">
              XE ĐÃ GIAO XONG GẦN ĐÂY
            </h3>
            <div className="space-y-2">
              <div className="p-2.5 bg-[#f7fbf0] border border-[#d8e2d4] rounded-xl flex justify-between items-center">
                <div className="space-y-0.5">
                  <p className="text-xs font-bold text-[#176a22]">63H-882.34</p>
                  <p className="text-[10px] text-[#63705d]">Giao thành công: 10:45 AM</p>
                </div>
                <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full">
                  HOÀN TẤT
                </span>
              </div>

              <div className="p-2.5 bg-[#f7fbf0] border border-[#d8e2d4] rounded-xl flex justify-between items-center">
                <div className="space-y-0.5">
                  <p className="text-xs font-bold text-[#176a22]">50E-111.90</p>
                  <p className="text-[10px] text-[#63705d]">Giao thành công: 09:12 AM</p>
                </div>
                <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full">
                  HOÀN TẤT
                </span>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* POPUP MODAL: Detailed Stops & Transport Log */}
      {showLogModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 shadow-2xl border border-[#bfcaba] space-y-5 relative max-h-[90vh] overflow-y-auto">
            <button 
              onClick={() => setShowLogModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 p-1.5 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Header */}
            <div className="border-b border-[#bfcaba] pb-4 space-y-1">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs font-bold text-[#176a22] uppercase tracking-wider bg-[#e6f4ea] px-2.5 py-0.5 rounded-full border border-[#a5d6a7]">
                  Log Vận Chuyển Chi Tiết
                </span>
                {selectedRoute.orderCode && (
                  <span className="text-xs font-bold font-mono text-[#176a22] bg-[#e6f4ea] px-2.5 py-0.5 rounded-full border border-[#a5d6a7]">
                    Mã đơn: {selectedRoute.orderCode}
                  </span>
                )}
                <span className="text-xs text-[#63705d] font-bold">Biển số: {selectedRoute.vehiclePlate}</span>
              </div>
              <h3 className="text-xl font-black text-[#181d16]">
                {selectedRoute.routeCode}: {selectedRoute.origin} → {selectedRoute.destination}
              </h3>
              <p className="text-xs text-[#40493d]">
                Tài xế phụ trách: <strong>{selectedRoute.driverName}</strong> • Khoảng cách: <strong>{selectedRoute.distanceKm} km</strong> • Dự kiến: <strong>~{selectedRoute.estimatedHours} giờ</strong>
              </p>
            </div>

            {/* Timeline of Stops */}
            <div className="space-y-4">
              <h4 className="font-bold text-sm text-[#181d16] flex items-center gap-2">
                <Navigation className="w-4 h-4 text-[#176a22]" />
                Các điểm dừng & Lịch trình Giao nhận Nông sản:
              </h4>

              <div className="relative pl-6 space-y-6 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-[#bfcaba]">
                {selectedRoute.stops.map((stop) => {
                  const isDone = stop.status === 'completed';
                  const isInProgress = stop.status === 'in_progress';
                  return (
                    <div key={stop.id} className="relative flex items-start gap-4">
                      {/* Circle Icon Marker */}
                      <div className={`absolute -left-6 top-1 w-5 h-5 rounded-full flex items-center justify-center text-white ring-4 ring-white ${
                        isDone ? 'bg-emerald-600' : isInProgress ? 'bg-amber-500 animate-pulse' : 'bg-slate-300'
                      }`}>
                        {isDone ? <Check className="w-3 h-3" /> : <Clock className="w-3 h-3" />}
                      </div>

                      {/* Stop Detail Card */}
                      <div className="flex-1 bg-[#f7fbf0] border border-[#d8e2d4] p-4 rounded-xl shadow-2xs space-y-2">
                        <div className="flex justify-between items-start">
                          <div>
                            <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-md ${
                              stop.type === 'pickup' ? 'bg-blue-100 text-blue-800' :
                              stop.type === 'transit' ? 'bg-purple-100 text-purple-800' : 'bg-emerald-100 text-emerald-800'
                            }`}>
                              {stop.type === 'pickup' ? 'Điểm Lấy Hàng' : stop.type === 'transit' ? 'Điểm Cân / Kiểm Định' : 'Điểm Giao Hàng'}
                            </span>
                            <h5 className="font-bold text-base text-[#181d16] mt-1">{stop.name}</h5>
                          </div>
                          <span className="text-xs font-bold text-[#176a22] bg-white px-2.5 py-1 rounded-lg border border-[#bfcaba]">
                            {stop.scheduledTime}
                          </span>
                        </div>

                        <p className="text-xs text-[#40493d]">{stop.address}</p>

                        {stop.contactPerson && (
                          <div className="pt-2 border-t border-[#d8e2d4] flex flex-wrap justify-between text-xs text-[#40493d]">
                            <span className="flex items-center gap-1 font-medium">
                              <User className="w-3.5 h-3.5 text-[#176a22]" /> Nguời liên hệ: <strong>{stop.contactPerson}</strong>
                            </span>
                            {stop.phone && (
                              <span className="flex items-center gap-1 font-bold text-[#176a22]">
                                <Phone className="w-3.5 h-3.5" /> {stop.phone}
                              </span>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Modal Footer */}
            <div className="pt-3 border-t border-[#bfcaba] flex justify-end">
              <button
                onClick={() => setShowLogModal(false)}
                className="px-5 py-2.5 bg-[#176a22] hover:bg-[#12541a] text-white font-bold text-xs rounded-xl shadow-xs transition-colors cursor-pointer"
              >
                Đóng Cửa Sổ
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Add New Route */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 max-w-lg w-full shadow-2xl border border-[#bfcaba] relative space-y-4">
            <button 
              onClick={() => setShowAddModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 p-1 rounded-lg hover:bg-gray-100"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="font-bold text-lg text-[#181d16]">Tạo Lộ Trình Vận Chuyển Mới</h3>
            
            <form onSubmit={handleCreateRoute} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-[#40493d] mb-1">Mã Lộ Trình</label>
                <input
                  type="text"
                  value={routeCode}
                  onChange={(e) => setRouteCode(e.target.value)}
                  required
                  className="w-full px-3 py-2 border border-[#bfcaba] rounded-xl text-sm outline-none focus:border-[#176a22]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-[#40493d] mb-1">Tài Xế Phụ Trách</label>
                  <input
                    type="text"
                    value={driverName}
                    onChange={(e) => setDriverName(e.target.value)}
                    required
                    className="w-full px-3 py-2 border border-[#bfcaba] rounded-xl text-sm outline-none focus:border-[#176a22]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#40493d] mb-1">Biển Số Xe</label>
                  <input
                    type="text"
                    value={vehiclePlate}
                    onChange={(e) => setVehiclePlate(e.target.value)}
                    required
                    className="w-full px-3 py-2 border border-[#bfcaba] rounded-xl text-sm outline-none focus:border-[#176a22]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#40493d] mb-1">Điểm Xuất Phát (Nhà Vườn / Kho)</label>
                <input
                  type="text"
                  value={origin}
                  onChange={(e) => setOrigin(e.target.value)}
                  required
                  className="w-full px-3 py-2 border border-[#bfcaba] rounded-xl text-sm outline-none focus:border-[#176a22]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#40493d] mb-1">Điểm Đích (Siêu Thị / Chợ)</label>
                <input
                  type="text"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  required
                  className="w-full px-3 py-2 border border-[#bfcaba] rounded-xl text-sm outline-none focus:border-[#176a22]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#40493d] mb-1">Khoảng Cách (KM)</label>
                <input
                  type="number"
                  value={distanceKm}
                  onChange={(e) => setDistanceKm(+e.target.value)}
                  required
                  min={1}
                  className="w-full px-3 py-2 border border-[#bfcaba] rounded-xl text-sm outline-none focus:border-[#176a22]"
                />
              </div>

              <div className="flex justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 border border-[#bfcaba] text-[#40493d] rounded-xl text-xs font-bold hover:bg-gray-50"
                >
                  Hủy Bỏ
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#176a22] text-white rounded-xl text-xs font-bold hover:bg-[#12541a] shadow-xs"
                >
                  Tạo Lộ Trình
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Driver Call Modal */}
      <DriverCallModal
        isOpen={showCallModal}
        onClose={() => setShowCallModal(false)}
        driverName={selectedRoute.driverName}
        driverAvatar={selectedRoute.driverAvatar}
        vehiclePlate={selectedRoute.vehiclePlate}
      />

    </div>
  );
};
