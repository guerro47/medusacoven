import { Footer } from '@/components/marketing/Footer';
import { Nav } from '@/components/marketing/Nav';

/**
 * Legal pages stay outside the age gate on purpose: policies must be
 * readable before anyone is asked to verify anything.
 */
export default function LegalLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Nav />
      <main className="relative z-10 mx-auto w-full max-w-3xl px-6 pb-24 pt-36 sm:px-10">
        {children}
      </main>
      <Footer />
    </>
  );
}
