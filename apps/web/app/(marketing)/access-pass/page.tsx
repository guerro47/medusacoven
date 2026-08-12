import type { Metadata } from 'next';
import { ModuleDetail } from '@/components/marketing/ModuleDetail';
import { getMvpModule } from '@/lib/modules';

export const metadata: Metadata = {
  title: 'Access Pass',
  description: 'Recurring membership fans hold directly with you. Your fan graph, exportable and yours.',
};

export default function AccessPassPage() {
  return <ModuleDetail module={getMvpModule('access-pass')!} />;
}
