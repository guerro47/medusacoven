'use client';

import dynamic from 'next/dynamic';

/**
 * Client boundary for the R3F canvas. The scene is code-split and never
 * server-rendered; while it streams in, the ink void + vignette stand in
 * so there is no layout shift (the canvas is absolutely positioned).
 */
const HeroScene = dynamic(() => import('./HeroScene'), {
  ssr: false,
  loading: () => null,
});

export function HeroSceneLazy() {
  return (
    <div className="pointer-events-none absolute inset-0 z-0" aria-hidden="true">
      <HeroScene />
    </div>
  );
}
