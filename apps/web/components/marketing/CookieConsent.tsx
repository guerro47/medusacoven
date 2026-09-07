'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

const ACK_COOKIE = 'me_cookie_ack';

/**
 * PECR-truthful cookie notice: this site sets only strictly-necessary
 * cookies (age verification, this acknowledgement, and — post-auth — the
 * session). No analytics or tracking cookies exist to consent to, so the
 * banner informs rather than pretends to offer granular toggles.
 */
export function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const acked = document.cookie.split('; ').some((c) => c.startsWith(`${ACK_COOKIE}=1`));
    setVisible(!acked);
  }, []);

  if (!visible) return null;

  const acknowledge = () => {
    document.cookie = `${ACK_COOKIE}=1; Max-Age=31536000; Path=/; SameSite=Lax${
      window.location.protocol === 'https:' ? '; Secure' : ''
    }`;
    setVisible(false);
  };

  return (
    <div
      role="region"
      aria-label="Cookie notice"
      className="fixed inset-x-0 bottom-0 z-50 border-t border-gold-line bg-ink-deep/95 backdrop-blur-md"
    >
      <div className="mx-auto flex w-full max-w-6xl flex-col items-start gap-4 px-6 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-10">
        <p className="text-[0.82rem] leading-relaxed text-bone-muted">
          We set only <b className="font-medium text-bone">essential cookies</b> — age
          verification and your session. No advertising, no cross-site tracking.{' '}
          <Link href="/cookies" className="text-gold hover:text-gold-hi">
            Cookie policy
          </Link>
        </p>
        <button
          onClick={acknowledge}
          className="shrink-0 rounded-full border border-gold-dim px-5 py-2 text-[0.72rem] font-medium uppercase tracking-[0.22em] text-gold transition-colors duration-(--duration-micro) hover:border-gold hover:text-gold-hi"
        >
          Understood
        </button>
      </div>
    </div>
  );
}
