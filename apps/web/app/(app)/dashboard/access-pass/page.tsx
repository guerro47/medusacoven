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

export const metadata: Metadata = {
  title: 'Access Pass · Dashboard',
  robots: { index: false },
};

export default async function AccessPassModulePage() {
  const session = await getSessionFromCookies();
  if (!session) redirect('/login');

  const header = (
    <ModulePageHeader
      title="Access Pass"
      tagline="Your membership foundation: tiers, members, and the fan graph they form — exportable, always."
    />
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

  const [tiers, memberships] = await Promise.all([
    repos.accessPass.listTiers(creator.id),
    repos.accessPass.listMemberships(creator.id),
  ]);
  const activeMembers = memberships.filter((m) => m.status === 'active').length;

  return (
    <section>
      {header}
      {tiers.length === 0 ? (
        <EmptyState
          title="No tiers yet"
          body="Tier creation opens with the Access Pass engine. Your first tier becomes the foundation every other module stands on."
        />
      ) : (
        <>
          <p className="mb-6 text-sm text-bone-muted">
            {activeMembers} active {activeMembers === 1 ? 'member' : 'members'} across{' '}
            {tiers.length} {tiers.length === 1 ? 'tier' : 'tiers'}.
          </p>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {tiers.map((tier) => (
              <Card key={tier.id} className="hover:translate-y-0">
                <div className="flex items-center justify-between">
                  <h2 className="font-display text-base font-bold uppercase tracking-wide text-bone">
                    {tier.name}
                  </h2>
                  <Badge tone={tier.active ? 'gold' : 'muted'}>
                    {tier.active ? 'Active' : 'Retired'}
                  </Badge>
                </div>
                <p className="mt-3 text-sm text-bone-muted">
                  {formatMoney(tier.priceMinor, tier.currency)} / {tier.interval}
                </p>
              </Card>
            ))}
          </div>
        </>
      )}
    </section>
  );
}
