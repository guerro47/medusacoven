import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';

const pillars = [
  {
    title: 'Own your fan graph',
    body: 'Your subscribers, their emails, your relationship history — held by you, not rented from a feed algorithm.',
  },
  {
    title: 'Export everything',
    body: 'Full data export is a first-class feature, not a support ticket. Members, revenue history, content metadata.',
  },
  {
    title: 'Leave anytime',
    body: 'No lock-in by design. If we stop earning your business, you walk out with the whole graph.',
  },
] as const;

export function ValueProp() {
  return (
    <section className="relative z-10 border-t border-gold-line/60 py-24">
      <Container>
        <SectionHeading
          eyebrow="Why MedusaElite"
          title="Own your fan graph"
          lede="Platforms rent you an audience and can repossess it overnight. MedusaElite is built the other way up: the fan graph belongs to the creator."
        />
        <div className="grid gap-6 sm:grid-cols-3">
          {pillars.map((p) => (
            <div key={p.title} className="border-l border-gold-line pl-5">
              <h3 className="font-display text-sm font-bold uppercase tracking-[0.14em] text-gold">
                {p.title}
              </h3>
              <p className="mt-3 text-sm font-light leading-relaxed text-bone-muted">{p.body}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
