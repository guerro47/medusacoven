import type { Metadata } from 'next';
import { ModuleDetail } from '@/components/marketing/ModuleDetail';
import { getMvpModule } from '@/lib/modules';

export const metadata: Metadata = {
  title: 'Tips',
  description: 'Direct fan appreciation on high-risk rails built for this industry.',
};

export default function TipsPage() {
  return <ModuleDetail module={getMvpModule('tips')!} />;
}
