export type NavigationTab = 
  | 'dashboard' 
  | 'routes' 
  | 'history' 
  | 'fleet' 
  | 'shipments' 
  | 'shipments_list';

export type OrderStatus = 'pending' | 'accepted' | 'rejected' | 'in_transit' | 'delivered' | 'cancelled';

export interface OrderItem {
  id: string;
  orderCode: string;
  pickupLocation: string;
  deliveryLocation: string;
  expectedRevenue: number;
  revenueFormatted: string;
  status: OrderStatus;
  productType: string;
  weight: string;
  driverName?: string;
  vehiclePlate?: string;
  createdAt: string;
  estimatedDeliveryTime?: string;
  temperatureTarget?: string;
}

export interface Vehicle {
  id: string;
  plateNumber: string;
  driverName: string;
  type: string; // e.g. "Xe Tải Lạnh 5 Tấn", "Xe Tải 2.5 Tấn"
  subtitle?: string;
  capacity: string;
  status: 'active' | 'idle' | 'maintenance' | 'busy';
  fuelLevel: number; // percentage 0-100
  temperature?: number; // e.g., 4.2°C
  currentLocation: string;
  lastUpdate: string;
  lat: number;
  lng: number;
  destination: string;
  issue?: string;
  serviceShop?: string;
  returnEstimate?: string;
  lastMaintenance?: string;
  driverAvatar?: string;
  mileage?: string;
  health?: string;
  eta?: string;
  // Route declaration fields when status is 'active' (đang vận chuyển)
  orderCode?: string;
  origin?: string;
  originAddress?: string;
  destinationAddress?: string;
  cargoType?: string;
  distanceKm?: number;
  operatingYard?: string;
  cargoCapacity?: string;
}

export interface Driver {
  id: string;
  fullName: string;
  phone: string;
  email?: string;
  licenseCategory: string;
  licenseNumber?: string;
  nationalId?: string;
  assignedVehicle: string;
  rating: number;
  status: 'active' | 'idle' | 'maintenance' | 'busy';
  avatar?: string;
  initials?: string;
  route?: string;
  dutyLocation?: string;
  // Route declaration fields when status is 'active' (đang di chuyển)
  orderCode?: string;
  cargoType?: string;
  origin?: string;
  originAddress?: string;
  destination?: string;
  destinationAddress?: string;
  distanceKm?: number | string;
}

export interface RouteStop {
  id: string;
  name: string;
  type: 'pickup' | 'transit' | 'delivery';
  address: string;
  scheduledTime: string;
  status: 'completed' | 'in_progress' | 'pending';
  contactPerson?: string;
  phone?: string;
}

export interface TransportRoute {
  id: string;
  routeCode: string;
  orderCode?: string;
  driverName: string;
  driverAvatar?: string;
  vehiclePlate: string;
  origin: string;
  destination: string;
  distanceKm: number;
  estimatedHours: number;
  stops: RouteStop[];
  status: 'active' | 'scheduled' | 'completed';
  progressPercentage: number;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'system' | 'ai';
  text: string;
  timestamp: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  description: string;
  time: string;
  type: 'info' | 'warning' | 'success';
  read: boolean;
}
