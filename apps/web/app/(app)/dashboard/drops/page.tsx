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
import { DROP_LIFECYCLE, formatMoney, type DropStatus } from '@/modules/contracts';
import { getModuleRepositories } from '@/modules/repositories';
import { getSessionFromCookies } from '@/lib/stytch';

export const metadata: Metadata = {
  title: 'Drops · Dashboard',
  robots: { index: false },
};

const STATUS_TONE: Record<DropStatus, 'gold' | 'muted' | 'serpent'> = {
  draft: 'muted',
  scheduled: 'gold',
  live: 'serpent', // live-state indicator — the one sanctioned serpent use
  closed: 'muted',
  archived: 'muted',
};

/** The canonical lifecycle, rendered as documentation of the engine. */
function LifecycleStrip({ active }: { active?: DropStatus }) {
  return (
    <ol className="mt-6 flex flex-wrap items-center gap-2" aria-label="Drop lifecycle">
      {DROP_LIFECYCLE.map((status, i) => (
        <li key={status} className="flex items-center gap-2">
          {i > 0 ? <span className="text-gold-dim" aria-hidden="true">→</span> : null}
          <span
            className={`rounded-full border px-3 py-1 text-[0.62rem] font-medium uppercase tracking-[0.2em] ${
              status === active
                ? 'border-gold text-gold'
                : 'border-gold-line text-bone-faint'
            }`}
          >
            {status}
          </span>
        </li>
      ))}
    </ol>
  );
}

export default async function DropsModulePage() {
  const session = await getSessionFromCookies();
  if (!session) redirect('/login');

  const header = (
    <ModulePageHeader
      title="Drops"
      tagline="Timed releases that rise, sell, and archive on your schedule. When a run closes, it closes."
    >
      <LifecycleStrip />
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

  const drops = await repos.drops.listByCreator(creator.id);

  return (
    <section>
      {header}
      {drops.length === 0 ? (
        <EmptyState
          title="No drops yet"
          body="The Drops engine opens with the founding beta. Every drop moves through the lifecycle above — and a closed run never reopens."
        />
      ) : (
        <ul className="flex flex-col gap-4">
          {drops.map((drop) => (
            <li key={drop.id}>
              <Card className="hover:translate-y-0">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <h2 className="font-display text-base font-bold uppercase tracking-wide text-bone">
                    {drop.title}
                  </h2>
                  <Badge tone={STATUS_TONE[drop.status]}>{drop.status}</Badge>
                </div>
                <p className="mt-2 text-sm text-bone-muted">
                  {formatMoney(drop.priceMinor, drop.currency)}
                  {drop.editionLimit !== null
                    ? ` · ${drop.soldCount}/${drop.editionLimit} sold`
                    : ` · ${drop.soldCount} sold · open edition`}
                </p>
              </Card>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
