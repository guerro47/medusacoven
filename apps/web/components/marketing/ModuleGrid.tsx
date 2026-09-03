import Link from 'next/link';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { MVP_MODULES, ROADMAP_MODULES } from '@/lib/modules';

export function LiveModules() {
  return (
    <section className="relative z-10 border-t border-gold-line/60 py-24">
      <Container>
        <SectionHeading
          eyebrow="The MVP"
          title="Three modules at launch"
          lede="Access Pass, Drops and Tips are the founding MVP — they open with the first creator cohort in Q4 2026. Nothing on this surface pretends to be live before that."
        />
        <div className="grid gap-6 sm:grid-cols-3">
          {MVP_MODULES.map((m) => (
            <Link key={m.slug} href={`/${m.slug}`} className="group/link">
              <Card className="h-full">
                <Badge>Launch module</Badge>
                <h3 className="mt-4 font-display text-xl font-bold uppercase tracking-wide text-bone">
                  {m.name}
                </h3>
                <p className="mt-1 text-[0.82rem] font-medium text-gold-hi/80">{m.tagline}</p>
                <p className="mt-3 text-sm font-light leading-relaxed text-bone-muted">
                  {m.description}
                </p>
                <span className="mt-5 inline-block text-[0.72rem] font-medium uppercase tracking-[0.2em] text-gold transition-colors duration-(--duration-micro) group-hover/link:text-gold-hi">
                  Explore →
                </span>
              </Card>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}

export function RoadmapSection({ standalone = false }: { standalone?: boolean }) {
  return (
    <section className={`relative z-10 py-24 ${standalone ? '' : 'border-t border-gold-line/60'}`}>
      <Container>
        <SectionHeading
          id="roadmap"
          eyebrow="Roadmap"
          title="Coming Soon"
          lede="Deferred modules live here, labelled as what they are: roadmap. They ship after the MVP proves itself with founding creators."
        />
        <div className="grid gap-6 sm:grid-cols-2">
          {ROADMAP_MODULES.map((m) => {
            const isCoven = m.slug === 'coven';
            return (
              <Card key={m.slug} id={m.slug} className="h-full scroll-mt-28">
                <div className="flex items-center gap-3">
                  <Badge tone="muted">Coming Soon</Badge>
                  {isCoven ? (
                    <span
                      aria-hidden="true"
                      className="serpent-line inline-block h-px w-10 rounded-full"
                    />
                  ) : null}
                </div>
                <h3
                  className={`mt-4 font-display text-lg font-bold uppercase tracking-wide ${
                    isCoven ? 'serpent-text' : 'text-bone'
                  }`}
                >
                  {m.name}
                </h3>
                <p className="mt-1 text-[0.82rem] font-medium text-bone-muted">{m.tagline}</p>
                <p className="mt-3 text-sm font-light leading-relaxed text-bone-muted">
                  {m.description}
                </p>
              </Card>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
