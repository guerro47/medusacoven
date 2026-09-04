import type { Metadata } from 'next';
import Link from 'next/link';
import { isStytchConfigured } from '@/lib/stytch';

export const metadata: Metadata = {
  title: 'Log in',
  description: 'Creator, fan and agency access to MedusaElite.',
  robots: { index: false },
};

/**
 * M0 Gateway auth shell. Honest by design: until the beta opens (and
 * Stytch is configured), this page says so instead of rendering a login
 * form that goes nowhere. The magic-link UI lands here without the
 * marketing surface changing.
 */
export default function LoginPage() {
  const configured = isStytchConfigured();

  return (
    <div className="w-full max-w-md rounded-2xl border border-gold-line bg-ink-elevated p-8 text-center">
      <p className="font-display text-[13px] font-extrabold uppercase tracking-[0.34em] text-bone">
        MEDUSA<span className="text-gold">ELITE</span>
      </p>
      <h1 className="mt-6 font-display text-xl font-bold uppercase tracking-wide text-bone">
        {configured ? 'Private beta' : 'Doors aren’t open yet'}
      </h1>
      <p className="mt-3 text-sm leading-relaxed text-bone-muted">
        {configured
          ? 'Access is limited to invited founding creators while the beta hardens. Invitations go out by email.'
          : 'Creator, fan and agency login opens with the founding launch. The waitlist gets in first.'}
      </p>
      <div className="mt-7 flex flex-col gap-3">
        <Link
          href="/#waitlist"
          className="rounded-[14px] bg-linear-120 from-gold via-gold-hi via-55% to-gold px-6 py-4 font-display text-[0.86rem] font-bold uppercase tracking-[0.14em] text-ink"
        >
          Join the waitlist
        </Link>
        <Link
          href="/"
          className="text-[0.72rem] font-medium uppercase tracking-[0.22em] text-bone-muted hover:text-gold-hi"
        >
          Back to the surface
        </Link>
      </div>
    </div>
  );
}
