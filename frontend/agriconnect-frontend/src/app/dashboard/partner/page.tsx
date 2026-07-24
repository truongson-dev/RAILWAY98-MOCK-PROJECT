import type { Metadata } from 'next';
import { PartnerDashboard } from '@/components/pages/PartnerDashboard';

export const metadata: Metadata = {
  title: 'Đối Tác Thu Mua — AgriConnect',
};

export default function PartnerPage() {
  return <PartnerDashboard />;
}
