'use client';

import { useEffect, useState } from 'react';
import { ReactLenis } from 'lenis/react';

/**
 * Lenis smooth scrolling for the marketing surface. Drives the scroll
 * parallax between the 3D layer and the UI layer (HeroScene reads
 * window scroll, which Lenis keeps native). Disabled entirely for
 * reduced-motion visitors.
 */
export function SmoothScroll() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    setEnabled(!window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  }, []);

  if (!enabled) return null;
  return <ReactLenis root options={{ lerp: 0.12, wheelMultiplier: 1 }} />;
}
