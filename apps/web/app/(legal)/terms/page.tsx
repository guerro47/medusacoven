import type { Metadata } from 'next';
import { LegalArticle } from '@/components/marketing/LegalArticle';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'The single canonical, version-stamped terms for the MedusaElite pre-launch surface.',
};

export default function TermsPage() {
  return (
    <LegalArticle title="Terms of Service" version="1.0" effectiveDate="12 August 2026">
      <section>
        <h2>Scope</h2>
        <p>
          These are the <b>single canonical terms</b> for the MedusaElite pre-launch website. They
          cover the waitlist and this marketing surface only. The creator platform itself (Access
          Pass, Drops, Tips) is not yet live; platform terms — including the commission and payout
          schedule — will be published as a new version-stamped document before onboarding begins,
          with fee math verified on a fee-on-net basis before it appears anywhere.
        </p>
      </section>

      <section>
        <h2>Eligibility</h2>
        <p>
          You must be at least 18 years old (or the age of majority in your jurisdiction,
          whichever is higher) to use this site or join the waitlist. See the{' '}
          <a href="/acceptable-use">Acceptable Use &amp; 18+ Notice</a>.
        </p>
      </section>

      <section>
        <h2>The waitlist and handle reservation</h2>
        <ul>
          <li>Joining the waitlist is free and creates no obligation on either side.</li>
          <li>
            Handle reservation is a <b>priority claim</b>, not a guarantee: handles are allocated
            at onboarding in waitlist order, subject to the Acceptable Use policy and lawful-name
            checks.
          </li>
          <li>We may decline or reclaim handles that impersonate others or break the law.</li>
          <li>You can leave the waitlist at any time by asking us to delete your entry.</li>
        </ul>
      </section>

      <section>
        <h2>No forward-looking promises</h2>
        <p>
          Launch windows (including &ldquo;Q4 2026&rdquo;), the roadmap page, and module
          descriptions are statements of current intent, not contractual commitments. Anything
          marked <b>Coming Soon</b> is exactly that.
        </p>
      </section>

      <section>
        <h2>Liability</h2>
        <p>
          The pre-launch site is provided &ldquo;as is&rdquo;. To the maximum extent permitted by
          law we exclude liability arising from your use of this informational site, except for
          liability that cannot lawfully be excluded (including death or personal injury caused by
          negligence, and fraud).
        </p>
      </section>

      <section>
        <h2>Governing law</h2>
        <p>
          These terms are governed by the laws of England and Wales, and the courts of England and
          Wales have exclusive jurisdiction.
        </p>
      </section>

      <section>
        <h2>Versioning</h2>
        <p>
          This document is version-stamped and is the only operative version. Superseded versions
          will remain archived and linked from this page when the terms change.
        </p>
      </section>
    </LegalArticle>
  );
}
