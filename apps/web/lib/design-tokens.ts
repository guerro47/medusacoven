/**
 * MedusaElite design tokens — single source of truth.
 * Mirrored in styles/globals.css (@theme) for Tailwind utilities.
 *
 * Deep ink void as primary surface, bone for text and structure,
 * gold as the single accent of value and power. The serpent gradient
 * (violet→cyan) is reserved exclusively for the Coven inner-circle
 * feature and live-state indicators.
 */
export const tokens = {
  colors: {
    ink: '#0A0A0A',
    inkDeep: '#000000',
    inkElevated: '#111009',
    bone: '#EDE6D6',
    boneMuted: 'rgba(237, 230, 214, 0.52)',
    gold: '#D4AF37',
    goldHi: '#F0D68A',
    goldDim: 'rgba(212, 175, 55, 0.28)',
    goldLine: 'rgba(212, 175, 55, 0.16)',
    serpentFrom: '#7C3AED',
    serpentTo: '#22D3EE',
  },
  fonts: {
    display: 'var(--font-syne)',
    body: 'var(--font-dm-sans)',
    mono: 'var(--font-space-mono)',
  },
  /** 4px base scale */
  spacing: [4, 8, 12, 16, 24, 32, 48, 64, 96, 128],
  motion: {
    micro: 180,
    transition: 320,
    cinematic: 640,
    ease: 'cubic-bezier(0.16, 1, 0.3, 1)',
  },
} as const;

export type Tokens = typeof tokens;
