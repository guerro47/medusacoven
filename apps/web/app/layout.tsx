import type { Metadata, Viewport } from 'next';
import { DM_Sans, Space_Mono, Syne } from 'next/font/google';
import '@/styles/globals.css';

const syne = Syne({
  subsets: ['latin'],
  weight: ['500', '700', '800'],
  variable: '--font-syne',
  display: 'swap',
});

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-dm-sans',
  display: 'swap',
});

const spaceMono = Space_Mono({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-space-mono',
  display: 'swap',
});

// Canonical domain only — never per-deployment URLs in public links.
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://medusacoven.vercel.app';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'MEDUSAELITE — Your Fans. Your Data. Your Empire.',
    template: '%s — MEDUSAELITE',
  },
  description:
    'The monetization operating system for creators. Own your fan graph. Founding creators onboard Q4 2026.',
  alternates: { canonical: '/' },
  openGraph: {
    siteName: 'MedusaElite',
    type: 'website',
    url: SITE_URL,
  },
};

export const viewport: Viewport = {
  themeColor: '#0A0A0A',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${syne.variable} ${dmSans.variable} ${spaceMono.variable}`}>
      <body>
        <div className="vignette" aria-hidden="true" />
        <div className="grain" aria-hidden="true" />
        {children}
      </body>
    </html>
  );
}
