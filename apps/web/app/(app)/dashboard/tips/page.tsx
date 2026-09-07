import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import {
  BackendPending,
  EmptyState,
  ModulePageHeader,
  OnboardingPending,
} from '@/components/modules/ModuleStates';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { formatMoney } from '@/modules/contracts';
import { getModuleRepositories } from '@/modules/repositories';
import { getSessionFromCookies } from '@/lib/stytch';
import { isProcessorConfigured } from '@/lib/high-risk-payments';

export const metadata: Metadata = {
  title: 'Tips · Dashboard',
  robots: { index: false },
};

export default async function TipsModulePage() {
  const session = await getSessionFromCookies();
  if (!session) redirect('/login');

  const railsReady = isProcessorConfigured('ccbill') || isProcessorConfigured('segpay');
  const header = (
    <ModulePageHeader
      title="Tips"
      tagline="Direct appreciation from fans, settled on high-risk rails built for this industry."
    >
      <p className="mt-4 text-[0.72rem] uppercase tracking-[0.2em] text-bone-faint">
        Payment rails: CCBill / Segpay ·{' '}
        <span className={railsReady ? 'text-gold' : ''}>
          {railsReady ? 'configured' : 'not yet configured'}
        </span>
      </p>
    </ModulePageHeader>
  );

  const repos = getModuleRepositories();
  if (!repos) {
    return (
      <section>
        {header}
        <BackendPending />
      </section>
    );
  }

  const creator = await repos.creators.findByUserId(session.userId);
  if (!creator) {
    return (
      <section>
        {header}
        <OnboardingPending />
      </section>
    );
  }

  const tips = await repos.tips.listRecent(creator.id, 25);

  return (
    <section>
      {header}
      {tips.length === 0 ? (
        <EmptyState
          title="No tips yet"
          body="Tip checkout flips on when a high-risk rail is configured and the founding beta opens. Settled amounts appear here as they land."
        />
      ) : (
        <ul className="flex flex-col gap-3">
          {tips.map((tip) => (
            <li key={tip.id}>
              <Card className="flex items-center justify-between gap-4 py-4 hover:translate-y-0">
                <span className="text-sm text-bone">
                  {formatMoney(tip.amountMinor, tip.currency)}
                  <span className="ml-3 text-bone-faint">
                    {tip.fanUserId ? 'from a fan' : 'anonymous'} · {tip.processor}
                  </span>
                </span>
                <Badge tone={tip.status === 'settled' ? 'gold' : 'muted'}>{tip.status}</Badge>
              </Card>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
