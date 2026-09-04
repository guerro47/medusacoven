import { Hero } from '@/components/marketing/Hero';
import { LiveModules, RoadmapSection } from '@/components/marketing/ModuleGrid';
import { ValueProp } from '@/components/marketing/ValueProp';

export default function HomePage() {
  return (
    <>
      <Hero />
      <ValueProp />
      <LiveModules />
      <RoadmapSection />
    </>
  );
}
