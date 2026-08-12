'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { confirmAge } from '@/actions/age-gate';
import { Button } from '@/components/ui/Button';

/**
 * Age gate over the marketing surface. Verification is a secure HttpOnly
 * cookie set by a server action — never localStorage. Rendered only when
 * the server says the visitor is unverified.
 */
export function AgeGate() {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [leaving, setLeaving] = useState(false);

  const enter = () => {
    startTransition(async () => {
      await confirmAge();
      router.refresh();
    });
  };

  const leave = () => {
    setLeaving(true);
    window.location.href = 'https://www.google.com';
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="age-gate-title"
      className="fixed inset-0 z-[60] flex items-center justify-center bg-ink-deep/95 px-6 backdrop-blur-sm"
    >
      <div className="w-full max-w-md rounded-2xl border border-gold-line bg-ink-elevated p-8 text-center shadow-[0_24px_80px_-32px_rgba(212,175,55,0.25)]">
        <p className="font-display text-[13px] font-extrabold uppercase tracking-[0.34em] text-bone">
          MEDUSA<span className="text-gold">ELITE</span>
        </p>
        <h1 id="age-gate-title" className="mt-6 font-display text-xl font-bold uppercase tracking-wide text-bone">
          Adults only
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-bone-muted">
          MedusaElite is a monetization platform for adult-content creators. You must be 18 or
          older (or the age of majority where you live) to continue.
        </p>
        <div className="mt-7 flex flex-col gap-3">
          <Button onClick={enter} disabled={pending}>
            {pending ? 'Entering…' : 'I am 18 or older — Enter'}
          </Button>
          <Button variant="ghost" onClick={leave} disabled={leaving}>
            Leave
          </Button>
        </div>
        <p className="mt-5 text-[0.7rem] leading-relaxed text-bone-faint">
          Entering sets one essential cookie to remember this choice for a year. See our{' '}
          <a href="/cookies" className="text-gold hover:text-gold-hi">
            cookie policy
          </a>
          .
        </p>
      </div>
    </div>
  );
}
