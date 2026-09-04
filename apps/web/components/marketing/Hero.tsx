import { HeroSceneLazy } from '@/components/3d/HeroSceneLazy';
import { WaitlistForm } from './WaitlistForm';

export function Hero() {
  return (
    <section className="relative flex min-h-svh flex-col items-center justify-center overflow-hidden px-6 pb-16 pt-28 text-center sm:px-10">
      <HeroSceneLazy />

      <div className="relative z-10 flex flex-col items-center">
        <h1 className="rise rise-d1 font-display text-[clamp(2.1rem,7.2vw,4.9rem)] font-extrabold uppercase leading-[1.02] tracking-[0.015em] text-bone">
          <span className="block">Your Fans. Your Data.</span>
          <span className="gold-sheen block">Your Empire.</span>
        </h1>

        <p className="rise rise-d2 mt-6 max-w-lg text-[clamp(0.95rem,1.6vw,1.08rem)] font-light leading-relaxed text-bone-muted">
          The monetization operating system for creators.{' '}
          <strong className="font-medium text-bone">
            Own your fan graph. Export everything. Leave anytime.
          </strong>{' '}
          Founding creators onboard Q4&nbsp;2026.
        </p>

        <div className="rise rise-d3 w-full max-w-lg">
          <WaitlistForm />
        </div>
      </div>
    </section>
  );
}
