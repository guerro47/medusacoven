import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Dashboard',
  robots: { index: false },
};

/**
 * Dashboard shell — reachable only through the (app) layout's session
 * check. The Access Pass management, Drops engine and Tips checkout
 * modules mount here as the beta opens, without touching the marketing
 * surface.
 */
export default function DashboardPage() {
  return (
    <section>
      <h1 className="font-display text-2xl font-bold uppercase tracking-wide text-bone">
        Dashboard
      </h1>
      <p className="mt-3 max-w-xl text-sm font-light leading-relaxed text-bone-muted">
        Module surfaces (Access Pass management · Drops engine · Tips) mount here during the
        founding beta.
      </p>
    </section>
  );
}
