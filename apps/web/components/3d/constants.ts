/**
 * Cross-layer contract for the 3D scene. The waitlist form dispatches
 * this event on success; the SerpentRing listens and pulses violet→cyan,
 * then settles. The serpent gradient appears nowhere else.
 */
export const SERPENT_PULSE_EVENT = 'medusaelite:serpent-pulse';

export function dispatchCovenPulse() {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent(SERPENT_PULSE_EVENT));
  }
}
