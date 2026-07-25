import type { Metadata } from 'next';
import { SupplierDashboard } from '@/components/pages/SupplierDashboard';

export const metadata: Metadata = {
  title: 'Nhà Cung Cấp — AgriConnect',
};

export default function SupplierPage() {
  return <SupplierDashboard />;
}
