import type { ButtonHTMLAttributes } from 'react';

type Variant = 'primary' | 'secondary' | 'ghost';

const base =
  'inline-flex items-center justify-center rounded-[14px] px-6 py-4 font-display font-bold uppercase tracking-[0.14em] text-[0.86rem] cursor-pointer transition-[background-position,transform,box-shadow,border-color,color] duration-(--duration-transition) ease-(--ease-cinematic) disabled:opacity-60 disabled:cursor-default disabled:transform-none';

const variants: Record<Variant, string> = {
  primary:
    'border-0 text-ink bg-linear-120 from-gold via-gold-hi via-55% to-gold bg-size-[200%_100%] bg-position-[0%_0] hover:bg-position-[100%_0] hover:-translate-y-px hover:shadow-[0_8px_32px_-8px_rgba(212,175,55,0.45)] active:scale-[0.98]',
  secondary:
    'bg-transparent text-bone border border-bone-muted hover:border-gold hover:text-gold-hi',
  ghost: 'bg-transparent border-0 text-bone-muted hover:text-gold-hi',
};

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
}

export function Button({ variant = 'primary', className = '', ...props }: ButtonProps) {
  return <button className={`${base} ${variants[variant]} ${className}`} {...props} />;
}
