import type { HTMLAttributes } from 'react';

type Tone = 'gold' | 'muted' | 'serpent';

const tones: Record<Tone, string> = {
  gold: 'border-gold-dim text-gold',
  muted: 'border-gold-line text-bone-muted',
  serpent: 'border-transparent text-bone serpent-line',
};

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  tone?: Tone;
}

/** Small status chip. `muted` is the canonical "Coming Soon" treatment. */
export function Badge({ tone = 'gold', className = '', ...props }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full border px-3 py-1 text-[0.68rem] font-medium uppercase tracking-[0.22em] ${tones[tone]} ${className}`}
      {...props}
    />
  );
}
