import type { Metadata } from 'next';
import { ModuleDetail } from '@/components/marketing/ModuleDetail';
import { getMvpModule } from '@/lib/modules';

export const metadata: Metadata = {
  title: 'Drops',
  description: 'Timed releases that rise, sell, and archive on your schedule.',
};

export default function DropsPage() {
  return <ModuleDetail module={getMvpModule('drops')!} />;
}
