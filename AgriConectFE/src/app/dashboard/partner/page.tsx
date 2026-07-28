import type { Metadata } from 'next';
import PartnerApp from '@/components/pages/PartnerApp';

export const metadata: Metadata = {
  title: 'Đối Tác Thu Mua — AgriConnect',
};

export default function PartnerPage() {
  return <PartnerApp />;
}
