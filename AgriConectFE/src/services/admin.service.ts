const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8080';

const getAuthToken = () => {
  if (typeof window === 'undefined') return null;
  
  // Try 'agri_token' first
  let token = localStorage.getItem('agri_token');
  if (token) return token;
  
  // Try 'token' next
  token = localStorage.getItem('token');
  if (token) return token;
  
  // Try 'agriconnect-auth' JSON
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

export interface CategoryDTO {
  id: number;
  name: string;
  nameEn: string;
  description: string;
  code: string;
  status: string;
  createdAt: string;
}

export interface ProductDTO {
  id: number;
  name: string;
  code: string;
  price: number;
  unit: string;
  stockQuantity: number;
  grade: string;
  origin: string;
  status: string;
  supplierName: string;
  categoryName: string;
  categoryId: number;
}

// Categories
export async function getCategories(): Promise<CategoryDTO[]> {
  const res = await apiCall('/api/categories');
  return res.data || [];
}

export async function createCategory(data: any): Promise<CategoryDTO> {
  const res = await apiCall('/api/admin/categories', {
    method: 'POST',
    body: JSON.stringify(data),
  });
  return res.data;
}

export async function updateCategory(id: number, data: any): Promise<CategoryDTO> {
  const res = await apiCall(`/api/admin/categories/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
  return res.data;
}

export async function deleteCategory(id: number): Promise<void> {
  await apiCall(`/api/admin/categories/${id}`, {
    method: 'DELETE',
  });
}

// Products
export async function getProducts(page = 0, size = 100): Promise<{ content: ProductDTO[], totalElements: number }> {
  const res = await apiCall(`/api/products?page=${page}&size=${size}`);
  return res.data;
}

export async function deleteProduct(id: number): Promise<void> {
  await apiCall(`/api/admin/${id}`, {
    method: 'DELETE',
  });
}


// Accounts
export interface AccountDTO {
  id: number;
  email: string;
  fullName: string;
  phone: string;
  province: string;
  address: string;
  avatar: string;
  role: string;
  status: string;
  createdAt: string;
}

export async function getAccounts(role?: string): Promise<AccountDTO[]> {
  try {
    let url = '/api/admin/accounts';
    if (role) {
      url += '?role=' + role;
    }
    const res = await apiCall(url);
    if (res && res.data && res.data.content) {
      return res.data.content;
    }
    return [];
  } catch (e) {
    console.error('getAccounts error:', e);
    return [];
  }
}

export async function updateAccountStatus(id: number, status: string): Promise<void> {
  await apiCall('/api/admin/accounts/' + id + '/status', {
    method: 'PUT',
    body: JSON.stringify({ status })
  });
}
