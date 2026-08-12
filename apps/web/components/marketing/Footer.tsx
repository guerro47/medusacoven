import Link from 'next/link';

const legalLinks = [
  { href: '/privacy', label: 'Privacy' },
  { href: '/terms', label: 'Terms' },
  { href: '/acceptable-use', label: 'Acceptable Use' },
  { href: '/cookies', label: 'Cookies' },
] as const;

export function Footer() {
  return (
    <footer className="relative z-10 border-t border-gold-line/60">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center gap-5 px-6 py-10 sm:px-10">
        <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-[0.74rem] uppercase tracking-[0.14em] text-bone-faint">
          <span className="rounded-full border border-gold-line px-3 py-1 text-bone-muted">18+</span>
          <span className="text-gold-dim">•</span>
          <span>© 2026 MedusaElite</span>
          <span className="text-gold-dim">•</span>
          <span>Creators own everything</span>
        </div>
        <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
          {legalLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="text-[0.72rem] uppercase tracking-[0.18em] text-bone-muted transition-colors duration-(--duration-micro) hover:text-gold-hi"
            >
              {label}
            </Link>
          ))}
        </nav>
        <p className="max-w-xl text-center text-[0.72rem] leading-relaxed text-bone-faint">
          MedusaElite is pre-launch. Access Pass, Drops and Tips ship with the founding-creator
          launch; everything else on this site is roadmap, marked accordingly.
        </p>
      </div>
    </footer>
  );
}
