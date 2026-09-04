'use client';

import { useActionState, useEffect } from 'react';
import { joinWaitlist, type WaitlistResult } from '@/actions/waitlist';
import { dispatchCovenPulse } from '@/components/3d/constants';
import { Button } from '@/components/ui/Button';
import { Field } from '@/components/ui/Input';

const ERROR_COPY: Record<string, string> = {
  invalid_email: 'That email doesn’t look right — check it and try again.',
  invalid_handle: 'Handles are 1–24 characters: letters, numbers, underscore.',
  already_registered: 'That email is already on the list — you’re in.',
  handle_taken: 'That handle is already reserved. Try another.',
  unavailable: 'The waitlist service isn’t reachable right now. Please try again shortly.',
  failed: 'Something went wrong on our side. Please try again.',
  bot: 'Submission blocked.',
};

export function WaitlistForm() {
  const [state, formAction, pending] = useActionState<WaitlistResult | null, FormData>(
    joinWaitlist,
    null,
  );

  useEffect(() => {
    if (state && 'success' in state && state.success) {
      // Serpent Ring briefly activates, then settles.
      dispatchCovenPulse();
    }
  }, [state]);

  if (state && 'success' in state && state.success) {
    return (
      <div
        role="status"
        className="serpent-pulse mt-10 w-full max-w-lg rounded-2xl border border-gold/40 bg-linear-to-b from-gold/10 to-gold/[0.03] px-7 py-6 text-left"
      >
        <h2 className="font-display text-lg font-bold uppercase tracking-[0.08em] text-gold">
          You’re in the Coven
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-bone-muted">
          {state.handle ? (
            <>
              <b className="font-medium text-bone">@{state.handle}</b> is reserved on the
              founding-creator list. We’ll write before doors open.
            </>
          ) : (
            <>
              You’re on the founding-creator list — first claim on handles goes to the waitlist.
              We’ll write before doors open.
            </>
          )}
        </p>
      </div>
    );
  }

  const error = state && 'error' in state ? ERROR_COPY[state.error] : null;

  return (
    <form action={formAction} id="waitlist" className="mt-10 flex w-full max-w-lg scroll-mt-28 flex-col gap-3" noValidate>
      <Field
        type="email"
        name="email"
        placeholder="you@email.com"
        autoComplete="email"
        required
        aria-label="Email address"
      />
      <Field
        type="text"
        name="handle"
        prefix="medusaelite.com/@"
        placeholder="yourname"
        autoComplete="off"
        spellCheck={false}
        maxLength={24}
        pattern="[a-zA-Z0-9_]+"
        aria-label="Reserve your handle"
        onChange={(e) => {
          e.target.value = e.target.value.replace(/[^a-zA-Z0-9_]/g, '').toLowerCase();
        }}
      />
      {/* Honeypot — hidden from real visitors, filled only by bots */}
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="absolute -left-[9999px] h-px w-px opacity-0"
      />
      <Button type="submit" disabled={pending}>
        {pending ? 'Reserving…' : 'Reserve my handle'}
      </Button>
      {error ? (
        <p role="alert" className="text-[0.82rem] text-gold-hi">
          {error}
        </p>
      ) : (
        <p className="text-[0.78rem] tracking-[0.02em] text-bone-faint">
          Waitlist gets first claim on handles &amp; founding-creator rates.
        </p>
      )}
    </form>
  );
}
