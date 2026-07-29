import React from 'react';
import { Sidebar } from '@/components/shared/Sidebar';
import { Users, AlertTriangle, BarChart2, ShieldCheck, Package } from 'lucide-react';
import { ROUTES } from '@/config/routes';
import { ProductsApprovalView } from '@/components/admin/ProductsApprovalView';

const SIDEBAR_ITEMS = [
  { href: ROUTES.ADMIN_ROLES, label: 'Quản lý vai trò', icon: <Users className="w-5 h-5" /> },
  { href: ROUTES.ADMIN_DISPUTES, label: 'Tranh chấp', icon: <AlertTriangle className="w-5 h-5" /> },
  { href: ROUTES.ADMIN_PRODUCTS, label: 'Duyệt sản phẩm', icon: <Package className="w-5 h-5" /> },
  { href: ROUTES.ADMIN, label: 'Tổng quan', icon: <BarChart2 className="w-5 h-5" /> },
];

export default function AdminProductsPage() {
  return (
    <div className="flex min-h-screen w-full bg-[#f8faf6]">
      <Sidebar items={SIDEBAR_ITEMS} title="Quản Trị" />
      <div className="flex-1 p-8">
        <div className="max-w-5xl mx-auto">
          <ProductsApprovalView />
        </div>
      </div>
    </div>
  );
}
