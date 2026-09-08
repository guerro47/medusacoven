'use client';

import { useActionState, useEffect, useState } from 'react';
import { joinWaitlist, type WaitlistResult } from '@/actions/waitlist';
import { dispatchCovenPulse } from '@/components/3d/constants';
import { Button } from '@/components/ui/Button';
import { Field } from '@/components/ui/Input';
import { publicConfig } from '@/lib/public-config';

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
  // Referral credit: arriving via someone's ?r=<handle> share link. Read from
  // location (not useSearchParams) so the static page needs no Suspense boundary.
  const [ref, setRef] = useState('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const r = new URLSearchParams(window.location.search).get('r') ?? '';
    setRef(r.replace(/[^a-zA-Z0-9_]/g, '').slice(0, 24).toLowerCase());
  }, []);

  useEffect(() => {
    if (state && 'success' in state && state.success) {
      // Serpent Ring briefly activates, then settles.
      dispatchCovenPulse();
    }
  }, [state]);

  if (state && 'success' in state && state.success) {
    const myLink = state.handle
      ? `${publicConfig.siteUrl}/?r=${state.handle}`
      : publicConfig.siteUrl;
    const shareText = state.handle
      ? `Reserved medusaelite.com/@${state.handle}. Your fans, your data, your empire — the coven is assembling.`
      : 'On the founding-creator list. Your fans, your data, your empire — the coven is assembling.';
    const shareHref = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(myLink)}`;
    const copyLink = async () => {
      try {
        await navigator.clipboard.writeText(myLink);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch {
        window.prompt('Copy your link:', myLink);
      }
    };

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
              founding-creator list. We’ll write before doors open. Every claim through your
              link moves you up the list.
            </>
          ) : (
            <>
              You’re on the founding-creator list — first claim on handles goes to the waitlist.
              We’ll write before doors open.
            </>
          )}
        </p>
        <div className="mt-5 flex flex-wrap gap-2.5">
          <a
            href={shareHref}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-gold/45 px-4 py-2 font-display text-[0.72rem] font-bold uppercase tracking-[0.12em] text-gold transition-colors hover:bg-gold hover:text-ink"
          >
            Share on X
          </a>
          <button
            type="button"
            onClick={copyLink}
            className="cursor-pointer rounded-full border border-gold/45 px-4 py-2 font-display text-[0.72rem] font-bold uppercase tracking-[0.12em] text-gold transition-colors hover:bg-gold hover:text-ink"
          >
            {copied ? 'Copied' : 'Copy my link'}
          </button>
        </div>
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
      {/* Referral credit from a shared ?r=<handle> link (see actions/waitlist.ts) */}
      <input type="hidden" name="ref" value={ref} />
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
