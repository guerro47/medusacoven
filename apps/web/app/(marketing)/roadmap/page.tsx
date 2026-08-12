import type { Metadata } from 'next';
import { RoadmapSection } from '@/components/marketing/ModuleGrid';
import { Container } from '@/components/ui/Container';

export const metadata: Metadata = {
  title: 'Roadmap',
  description: 'What ships at launch, and what comes after. No claim before its time.',
};

export default function RoadmapPage() {
  return (
    <div className="pt-24">
      <Container className="max-w-3xl pt-12">
        <p className="text-sm font-light leading-relaxed text-bone-muted">
          The founding MVP is <b className="font-medium text-bone">Access Pass · Drops · Tips</b>,
          opening with the first creator cohort in Q4 2026. Everything below is roadmap — built
          after the MVP earns its keep, in the order the plan defines.
        </p>
      </Container>
      <RoadmapSection standalone />
    </div>
  );
}
