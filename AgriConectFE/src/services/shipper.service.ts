const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8080';

const getAuthToken = () => {
  if (typeof window === 'undefined') return null;
  let token = localStorage.getItem('agri_token');
  if (token) return token;
  token = localStorage.getItem('token');
  if (token) return token;
  try {
    const stored = localStorage.getItem('agriconnect-auth');
    if (stored) {
      const parsed = JSON.parse(stored);
      if (parsed?.state?.token) return parsed.state.token;
    }
  } catch (e) {}
  return null;
};

async function apiCall(endpoint: string, options: RequestInit = {}) {
  const token = getAuthToken();
  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };
  
  const url = `${API_BASE}${endpoint}`;
  const response = await fetch(url, { ...options, headers });
  
  if (!response.ok) {
    let errorText = await response.text();
    try {
        const json = JSON.parse(errorText);
        errorText = json.message || errorText;
    } catch(e) {}
    throw new Error(errorText || `API Error: ${response.status}`);
  }
  
  return response.json();
}

export interface ShipmentDTO {
  id: number;
  shipmentCode: string;
  orderId: number;
  orderCode: string;
  shipperId: number;
  shipperName?: string;
  status: string;
  pickupLocation?: string;
  deliveryLocation?: string;
  expectedRevenue?: number;
  productType?: string;
  weight?: string;
  estimatedDeliveryTime?: string;
  createdAt?: string;
}

export async function fetchShipments(): Promise<ShipmentDTO[]> {
  try {
    const res = await apiCall('/api/shipper/shipments?size=100');
    return res.data?.content || [];
  } catch (e) {
    console.error('Failed to fetch shipments', e);
    return [];
  }
}

export async function updateShipmentStatus(id: number, status: string): Promise<any> {
  const res = await apiCall(`/api/shipper/shipments/${id}/status`, {
    method: 'PUT',
    body: JSON.stringify({ status })
  });
  return res.data;
}
