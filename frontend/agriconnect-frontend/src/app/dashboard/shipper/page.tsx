import type { Metadata } from 'next';
import { ShipperDashboard } from '@/components/pages/ShipperDashboard';

export const metadata: Metadata = {
  title: 'Vận Chuyển & IoT — AgriConnect',
};

export default function ShipperPage() {
  return <ShipperDashboard />;
}
