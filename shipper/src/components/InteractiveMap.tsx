import React, { useState } from 'react';
import { Truck, Plus, Minus, Navigation, Thermometer, MapPin, Activity, Radio } from 'lucide-react';
import { Vehicle } from '../types';

interface InteractiveMapProps {
  vehicles: Vehicle[];
  onSelectVehicle?: (veh: Vehicle) => void;
}

export const InteractiveMap: React.FC<InteractiveMapProps> = ({
  vehicles,
  onSelectVehicle
}) => {
  const [selectedCity, setSelectedCity] = useState('TP. Hồ Chí Minh');
  const [zoomLevel, setZoomLevel] = useState(1);
  const [activeVehiclePin, setActiveVehiclePin] = useState<Vehicle | null>(vehicles[0] || null);

  const activeShipmentsCount = vehicles.filter(v => v.status === 'active').length;

  const handleZoomIn = () => {
    setZoomLevel(prev => Math.min(+(prev + 0.15).toFixed(2), 2.5));
  };

  const handleZoomOut = () => {
    setZoomLevel(prev => Math.max(+(prev - 0.15).toFixed(2), 1));
  };

  // Persistent coordinates mapping per vehicle ID or Plate so pins maintain position on map
  const PREDEFINED_PIN_POSITIONS: Record<string, { top: string; left: string }> = {
    'v1': { top: '77.8%', left: '77.2%' },
    'v2': { top: '21.5%', left: '37.2%' },
    'v3': { top: '65.5%', left: '51.2%' },
    'v4': { top: '16.5%', left: '77.0%' },
    'v5': { top: '42.0%', left: '48.0%' },
    'v6': { top: '55.0%', left: '62.0%' },
    'v7': { top: '32.0%', left: '28.0%' },
    'v8': { top: '48.0%', left: '72.0%' },
    'veh-2': { top: '16.5%', left: '77.0%' },
    'veh-9': { top: '65.5%', left: '51.2%' },
    'veh-10': { top: '21.5%', left: '37.2%' },
    'veh-11': { top: '77.8%', left: '77.2%' },
    '51H-123.45': { top: '65.5%', left: '51.2%' },
    '29C-987.65': { top: '21.5%', left: '37.2%' },
    '60C-223.11': { top: '77.8%', left: '77.2%' },
    '51D-004.92': { top: '16.5%', left: '77.0%' },
    '60C-224.11': { top: '42.0%', left: '48.0%' },
    '51D-005.92': { top: '55.0%', left: '62.0%' },
    'UV-1122-WQ': { top: '32.0%', left: '28.0%' },
    '50E-111.90': { top: '48.0%', left: '72.0%' },
  };

  const getVehicleMapPos = (vehicle: Vehicle): { top: string; left: string } => {
    if (PREDEFINED_PIN_POSITIONS[vehicle.id]) {
      return PREDEFINED_PIN_POSITIONS[vehicle.id];
    }
    if (vehicle.plateNumber && PREDEFINED_PIN_POSITIONS[vehicle.plateNumber]) {
      return PREDEFINED_PIN_POSITIONS[vehicle.plateNumber];
    }
    // Hashed coordinates for dynamically added vehicles to maintain random fixed positions
    let hash = 0;
    const key = (vehicle.id || '') + (vehicle.plateNumber || '');
    for (let i = 0; i < key.length; i++) {
      hash = (hash << 5) - hash + key.charCodeAt(i);
      hash |= 0;
    }
    const positiveHash = Math.abs(hash);
    const topPercent = 20 + (positiveHash % 58); // 20% - 78%
    const leftPercent = 22 + ((positiveHash >> 4) % 54); // 22% - 76%
    return { top: `${topPercent}%`, left: `${leftPercent}%` };
  };

  const activeVehiclesList = vehicles.filter(v => v.status === 'active');

  return (
    <div className="bg-white border border-[#bfcaba] rounded-xl shadow-sm overflow-hidden flex flex-col h-[520px] lg:h-[620px] relative">
      {/* Map Header */}
      <div className="px-5 py-4 border-b border-[#bfcaba] flex justify-between items-center bg-white z-10">
        <h3 className="font-bold text-[#181d16] flex items-center gap-2">
          <Navigation className="w-5 h-5 text-[#176a22]" />
          Bản đồ hoạt động trực tuyến
        </h3>
        <div className="flex gap-2">
          {['TP. Hồ Chí Minh', 'Lâm Đồng - Đà Lạt', 'Cần Thơ - Miền Tây', 'Hà Nội'].map((city) => (
            <button
              key={city}
              onClick={() => setSelectedCity(city)}
              className={`px-3 py-1.5 text-xs sm:text-sm font-semibold rounded-md transition-colors ${
                selectedCity === city
                  ? 'bg-[#176a22] text-white shadow-xs'
                  : 'bg-[#e5eadf] text-[#181d16] hover:bg-[#ebefe4]'
              }`}
            >
              {city}
            </button>
          ))}
        </div>
      </div>

      {/* Map Viewport Area */}
      <div className="flex-1 relative bg-[#d7dcd1] overflow-hidden select-none">
        {/* Overlay Status Badge Top-Left */}
        <div className="absolute top-4 left-4 z-20 bg-white/95 backdrop-blur-md p-4 rounded-xl shadow-xl border border-[#bfcaba] min-w-[200px]">
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-ping" />
            <span className="w-2.5 h-2.5 bg-emerald-600 rounded-full -ml-4" />
            <span className="text-xs font-bold uppercase tracking-wider text-[#40493d]">
              ĐANG HOẠT ĐỘNG
            </span>
          </div>
          <div className="text-2xl font-black text-[#181d16]">
            {activeShipmentsCount} Chuyến hàng
          </div>
          <div className="text-[11px] text-[#40493d] mt-1 flex items-center gap-1 font-medium">
            <Radio className="w-3 h-3 text-emerald-600 animate-pulse" />
            Cập nhật: Vừa xong ({selectedCity})
          </div>
        </div>

        {/* Map Background Satellite Graphic */}
        <div 
          className="w-full h-full transition-transform duration-300 origin-center relative"
          style={{ transform: `scale(${zoomLevel})` }}
        >
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAV8sVZbOq0lJeNyGEj8gsLertTglv9W1AT-fhsj8_y-wbj7O9iWwzDfVNu9rbk6FkD3O8qcWM0sFzI0Q5gAGf3maEqaR7uTkYZlNXWMzwnbJv24Dda8LkbgckOtY61Wp9RPRdpYEV7DNOGLEyy1ojTLUekO8TNDw6JPJVpcQM1KzoXrB-0tzAQ_Ni-FnlImT-jl1kLYuc5EZns1Si3RxJiRb50wkm40VxSZWgEEJmZbpUX-TySePEC"
            alt="Ho Chi Minh City Logistics Tracking Map"
            className="w-full h-full object-fill filter brightness-[0.98] contrast-[1.02]"
          />

          {/* Map Truck Pins */}
          {activeVehiclesList.map((vehicle) => {
            const pos = getVehicleMapPos(vehicle);
            const isSelected = activeVehiclePin?.id === vehicle.id;

            return (
              <div
                key={vehicle.id}
                onClick={() => {
                  setActiveVehiclePin(vehicle);
                  if (onSelectVehicle) onSelectVehicle(vehicle);
                }}
                style={{ top: pos.top, left: pos.left }}
                className={`absolute -translate-x-1/2 -translate-y-full cursor-pointer transition-all z-20 group ${
                  isSelected ? 'scale-125' : 'hover:scale-110'
                }`}
              >
                {/* Pulsing ring around vehicle */}
                <span className="absolute -inset-2 bg-emerald-500/30 rounded-full animate-ping pointer-events-none" />
                
                {/* Truck Marker Bubble */}
                <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full shadow-2xl border-2 transition-all ${
                  isSelected 
                    ? 'bg-[#176a22] text-white border-white ring-4 ring-[#176a22]/30' 
                    : 'bg-emerald-600 text-white border-white hover:bg-[#176a22]'
                }`}>
                  <Truck className="w-4 h-4 animate-bounce" />
                  <span className="text-xs font-bold whitespace-nowrap">
                    {vehicle.plateNumber}
                  </span>
                </div>

                {/* Pin Tail Arrow pointing down */}
                <div className={`w-3 h-3 rotate-45 mx-auto -mt-2 border-r-2 border-b-2 border-white transition-colors relative z-10 ${
                  isSelected ? 'bg-[#176a22]' : 'bg-emerald-600'
                }`} />
              </div>
            );
          })}
        </div>

        {/* Zoom Controls Bottom Right */}
        <div className="absolute right-4 bottom-4 z-20 flex flex-col gap-2">
          <button
            onClick={handleZoomIn}
            disabled={zoomLevel >= 2}
            className="w-10 h-10 bg-white rounded-lg shadow-lg border border-[#bfcaba] flex items-center justify-center text-[#181d16] hover:bg-[#f1f5ea] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            title="Phóng to"
          >
            <Plus className="w-5 h-5" />
          </button>
          <button
            onClick={handleZoomOut}
            disabled={zoomLevel <= 1}
            className="w-10 h-10 bg-white rounded-lg shadow-lg border border-[#bfcaba] flex items-center justify-center text-[#181d16] hover:bg-[#f1f5ea] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            title="Thu nhỏ"
          >
            <Minus className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};
