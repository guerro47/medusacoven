'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { SiteSearch } from './SiteSearch';

const links = [
  { href: '/access-pass', label: 'Access Pass' },
  { href: '/drops', label: 'Drops' },
  { href: '/tips', label: 'Tips' },
  { href: '/roadmap', label: 'Roadmap' },
] as const;

export function Nav() {
  const pathname = usePathname();

  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-gold-line/60 bg-ink/80 backdrop-blur-md">
      <nav className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-5 sm:px-10">
        <Link
          href="/"
          className="font-display text-[15px] font-extrabold uppercase tracking-[0.34em] text-bone"
        >
          MEDUSA<span className="text-gold">ELITE</span>
        </Link>

        <div className="hidden items-center gap-8 sm:flex">
          {links.map(({ href, label }) => {
            const active = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                className={`text-[0.72rem] font-medium uppercase tracking-[0.24em] transition-colors duration-(--duration-micro) ${
                  active ? 'text-gold' : 'text-bone-muted hover:text-bone'
                }`}
                aria-current={active ? 'page' : undefined}
              >
                {label}
              </Link>
            );
          })}
        </div>

        <div className="flex items-center gap-3">
          <SiteSearch />
          <Link
            href="/#waitlist"
            className="rounded-full border border-gold-dim px-4 py-2 text-[0.68rem] font-medium uppercase tracking-[0.22em] text-gold transition-colors duration-(--duration-micro) hover:border-gold hover:text-gold-hi"
          >
            Join waitlist
          </Link>
        </div>
      </nav>
    </header>
  );
}
