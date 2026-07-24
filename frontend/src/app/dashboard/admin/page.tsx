import type { Metadata } from 'next';
import { AdminDashboard } from '@/components/pages/AdminDashboard';

export const metadata: Metadata = {
  title: 'Admin — AgriConnect',
};

export default function AdminPage() {
  return <AdminDashboard />;
}
