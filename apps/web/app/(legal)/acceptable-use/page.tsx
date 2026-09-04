import type { Metadata } from 'next';
import { LegalArticle } from '@/components/marketing/LegalArticle';

export const metadata: Metadata = {
  title: 'Acceptable Use & 18+ Notice',
  description: 'Adults-only notice and the conduct rules for MedusaElite.',
};

export default function AcceptableUsePage() {
  return (
    <LegalArticle title="Acceptable Use & 18+ Notice" version="1.0" effectiveDate="12 August 2026">
      <section>
        <h2>18+ Notice</h2>
        <p>
          MedusaElite is a monetization platform for <b>adult-content creators</b>. This website
          and the future platform are for adults only. By entering you confirm you are at least 18
          years old (or the age of majority where you live, whichever is higher) and that viewing
          adult-oriented material is lawful in your jurisdiction. The age gate on this site records
          your confirmation in a secure cookie; it is not an identity check — platform-grade age
          and identity verification for creators and fans arrives with the app launch.
        </p>
      </section>

      <section>
        <h2>Absolute prohibitions</h2>
        <p>The following have no place on MedusaElite, at launch or ever:</p>
        <ul>
          <li>Any sexual content involving minors, or content presenting adults as minors.</li>
          <li>Non-consensual content of any kind, including leaked or revenge material.</li>
          <li>Content produced through trafficking, coercion, or exploitation.</li>
          <li>Recording or distribution without the documented consent of everyone depicted.</li>
          <li>Bestiality, necrophilia, or content that depicts serious bodily harm.</li>
          <li>Fraud, impersonation of other creators, or handle squatting for resale.</li>
        </ul>
      </section>

      <section>
        <h2>Creator obligations at launch</h2>
        <p>
          Before monetizing, creators will be required to pass identity verification, provide
          documented age and consent records for all depicted persons (2257-style record keeping),
          and accept the platform terms. These requirements will be detailed in the platform
          version of this policy before onboarding begins.
        </p>
      </section>

      <section>
        <h2>Enforcement</h2>
        <p>
          Violations lead to removal from the waitlist, refusal of onboarding, or — post-launch —
          account termination and reporting to the relevant authorities where the law requires it.
        </p>
      </section>
    </LegalArticle>
  );
}
