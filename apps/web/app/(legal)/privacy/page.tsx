import type { Metadata } from 'next';
import { LegalArticle } from '@/components/marketing/LegalArticle';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'How MedusaElite handles personal data under UK GDPR and PECR.',
};

export default function PrivacyPage() {
  return (
    <LegalArticle title="Privacy Policy" version="1.0" effectiveDate="12 August 2026">
      <section>
        <h2>Who we are</h2>
        <p>
          MedusaElite (&ldquo;we&rdquo;, &ldquo;us&rdquo;) operates the pre-launch site at{' '}
          <a href="https://medusacoven.vercel.app">medusacoven.vercel.app</a>. We are the data
          controller for the personal data described in this policy. This policy is written
          against the <b>UK GDPR</b> and the <b>Privacy and Electronic Communications Regulations
          (PECR)</b>.
        </p>
      </section>

      <section>
        <h2>What we collect, and why</h2>
        <p>During pre-launch this site collects exactly one category of personal data:</p>
        <ul>
          <li>
            <b>Waitlist data</b> — your email address and, optionally, the creator handle you want
            to reserve. Purpose: to contact you before doors open and to hold your handle for you.
            Lawful basis: <b>consent</b> (you submit the form yourself; nothing is pre-ticked).
          </li>
        </ul>
        <p>
          We do not run analytics, advertising pixels, or cross-site tracking on this site. We do
          not buy, sell, or enrich personal data. We do not track intellectual-property usage or
          device fingerprints without consent — and no such consented tracking exists today.
        </p>
      </section>

      <section>
        <h2>Cookies</h2>
        <p>
          We set only strictly-necessary cookies (age verification, cookie-notice acknowledgement,
          and — once the app opens — an authentication session). Details, names and lifetimes are
          in the <a href="/cookies">Cookie Policy</a>. Strictly-necessary cookies are exempt from
          PECR consent requirements; we still tell you about them.
        </p>
      </section>

      <section>
        <h2>Where your data lives</h2>
        <p>
          Waitlist entries are stored in a Supabase (PostgreSQL) database with insert-only access
          from this website: the public site can add your entry but can never read the list back.
          Reads are restricted to authenticated administrative access.
        </p>
      </section>

      <section>
        <h2>How long we keep it</h2>
        <p>
          Waitlist data is kept until launch onboarding completes, or until you ask us to delete
          it, whichever comes first. If the launch is abandoned, the list is deleted.
        </p>
      </section>

      <section>
        <h2>Your rights</h2>
        <p>
          Under UK GDPR you can ask us for access, rectification, erasure, restriction, and
          portability of your data, and you can withdraw consent at any time (which removes you
          from the waitlist). You also have the right to complain to the{' '}
          <a href="https://ico.org.uk">Information Commissioner&rsquo;s Office</a>.
        </p>
      </section>

      <section>
        <h2>Changes</h2>
        <p>
          This is version 1.0, covering the pre-launch surface only. When the platform itself
          launches (payments, content, messaging), this policy will be replaced by a new
          version-stamped document before any new processing begins.
        </p>
      </section>
    </LegalArticle>
  );
}
