import Link from 'next/link';
import { Badge } from '@/components/ui/Badge';
import { Container } from '@/components/ui/Container';
import type { ModuleInfo } from '@/lib/modules';

/**
 * Shared template for the three MVP module pages. Claims stay scoped to
 * what ships at launch; the CTA is always the waitlist — the only
 * conversion path that exists today.
 */
export function ModuleDetail({ module: mod }: { module: ModuleInfo }) {
  return (
    <section className="relative z-10 pb-24 pt-36">
      <Container className="max-w-3xl">
        <Badge>Launch module · Q4 2026</Badge>
        <h1 className="mt-6 font-display text-4xl font-extrabold uppercase leading-tight tracking-wide text-bone sm:text-5xl">
          {mod.name}
        </h1>
        <p className="mt-3 font-display text-base font-bold uppercase tracking-[0.14em] text-gold">
          {mod.tagline}
        </p>
        <p className="mt-6 text-lg font-light leading-relaxed text-bone-muted">{mod.description}</p>

        <ul className="mt-10 space-y-5 border-l border-gold-line pl-6">
          {mod.details.map((d) => (
            <li key={d} className="text-[0.95rem] font-light leading-relaxed text-bone-muted">
              <span className="mr-3 text-gold" aria-hidden="true">
                —
              </span>
              {d}
            </li>
          ))}
        </ul>

        <div className="mt-14 rounded-2xl border border-gold-line bg-ink-elevated p-7">
          <p className="text-sm leading-relaxed text-bone-muted">
            {mod.name} opens with the founding-creator cohort. The waitlist gets first claim on
            handles and founding rates.
          </p>
          <Link
            href="/#waitlist"
            className="mt-4 inline-block rounded-full border border-gold-dim px-5 py-2.5 text-[0.72rem] font-medium uppercase tracking-[0.22em] text-gold transition-colors duration-(--duration-micro) hover:border-gold hover:text-gold-hi"
          >
            Reserve your handle
          </Link>
        </div>
      </Container>
    </section>
  );
}
