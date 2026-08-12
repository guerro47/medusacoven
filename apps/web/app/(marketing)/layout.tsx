import { AgeGate } from '@/components/marketing/AgeGate';
import { CookieConsent } from '@/components/marketing/CookieConsent';
import { Footer } from '@/components/marketing/Footer';
import { Nav } from '@/components/marketing/Nav';
import { isAgeVerified } from '@/lib/age-gate';

export default async function MarketingLayout({ children }: { children: React.ReactNode }) {
  const verified = await isAgeVerified();

  return (
    <>
      <Nav />
      <main className="relative z-10">{children}</main>
      <Footer />
      {!verified ? <AgeGate /> : null}
      <CookieConsent />
    </>
  );
}
