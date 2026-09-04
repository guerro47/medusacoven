import type { HTMLAttributes } from 'react';

/**
 * Ink-elevated card with the gold structural line. Hover lift + line
 * reveal happen in CSS so cards stay server-renderable.
 */
export function Card({ className = '', ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={`group relative rounded-2xl border border-gold-line bg-ink-elevated p-6 transition-[transform,border-color,box-shadow] duration-(--duration-transition) ease-(--ease-cinematic) hover:-translate-y-1 hover:border-gold-dim hover:shadow-[0_16px_48px_-24px_rgba(212,175,55,0.35)] ${className}`}
      {...props}
    />
  );
}
