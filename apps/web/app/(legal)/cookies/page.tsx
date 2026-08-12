import type { Metadata } from 'next';
import { LegalArticle } from '@/components/marketing/LegalArticle';

export const metadata: Metadata = {
  title: 'Cookie Policy',
  description: 'Every cookie this site sets, what it does, and how long it lives.',
};

const cookies = [
  {
    name: 'me_age_verified',
    purpose: 'Remembers that you confirmed you are 18+. Secure, HttpOnly.',
    lifetime: '1 year',
  },
  {
    name: 'me_cookie_ack',
    purpose: 'Remembers that you dismissed the cookie notice.',
    lifetime: '1 year',
  },
  {
    name: 'me_session',
    purpose: 'Authentication session for the app (only set after you log in, post-launch).',
    lifetime: 'Session-bound',
  },
] as const;

export default function CookiesPage() {
  return (
    <LegalArticle title="Cookie Policy" version="1.0" effectiveDate="12 August 2026">
      <section>
        <h2>The short version</h2>
        <p>
          This site sets <b>strictly-necessary cookies only</b>. There are no analytics cookies,
          no advertising cookies, and no third-party trackers. Under PECR, strictly-necessary
          cookies do not require consent — but you deserve the full list anyway:
        </p>
      </section>

      <section>
        <h2>Every cookie we set</h2>
        <ul>
          {cookies.map((c) => (
            <li key={c.name}>
              <b className="font-mono">{c.name}</b> — {c.purpose} Lifetime: {c.lifetime}.
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2>What we deliberately don&rsquo;t do</h2>
        <ul>
          <li>No localStorage-based authentication or verification — cookies above only.</li>
          <li>No fingerprinting, no cross-site tracking, no consentless IP-usage tracking.</li>
          <li>
            If non-essential cookies are ever introduced, this policy will be re-versioned and a
            real consent choice (not a dark pattern) will appear before any such cookie is set.
          </li>
        </ul>
      </section>
    </LegalArticle>
  );
}
