import type { ReactNode } from 'react';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';

/**
 * Honest state surfaces for module pages. No fabricated metrics, ever:
 * a module either shows real rows or says exactly why it can't.
 */

export function ModulePageHeader({
  title,
  tagline,
  children,
}: {
  title: string;
  tagline: string;
  children?: ReactNode;
}) {
  return (
    <header className="mb-10">
      <div className="flex items-center gap-4">
        <h1 className="font-display text-2xl font-bold uppercase tracking-wide text-bone">
          {title}
        </h1>
        <Badge tone="muted">Founding beta</Badge>
      </div>
      <p className="mt-2 max-w-xl text-sm font-light leading-relaxed text-bone-muted">{tagline}</p>
      {children}
    </header>
  );
}

export function BackendPending() {
  return (
    <Card className="max-w-xl hover:translate-y-0">
      <h2 className="font-display text-sm font-bold uppercase tracking-[0.14em] text-gold">
        Data backend not connected
      </h2>
      <p className="mt-3 text-sm font-light leading-relaxed text-bone-muted">
        This environment has no Supabase credentials, so module data can&rsquo;t load. Apply the
        migrations in <code className="font-mono text-[0.82rem] text-bone">supabase/migrations/</code>{' '}
        and set the environment variables from{' '}
        <code className="font-mono text-[0.82rem] text-bone">apps/web/.env.example</code>.
      </p>
    </Card>
  );
}

export function OnboardingPending() {
  return (
    <Card className="max-w-xl hover:translate-y-0">
      <h2 className="font-display text-sm font-bold uppercase tracking-[0.14em] text-gold">
        Creator profile pending
      </h2>
      <p className="mt-3 text-sm font-light leading-relaxed text-bone-muted">
        Your account is authenticated but not yet provisioned as a creator. Provisioning happens
        during founding onboarding — identity verification, handle confirmation, and the platform
        agreement — before any module goes live.
      </p>
    </Card>
  );
}

export function EmptyState({ title, body }: { title: string; body: string }) {
  return (
    <Card className="max-w-xl hover:translate-y-0">
      <h2 className="font-display text-sm font-bold uppercase tracking-[0.14em] text-bone">
        {title}
      </h2>
      <p className="mt-3 text-sm font-light leading-relaxed text-bone-muted">{body}</p>
    </Card>
  );
}
