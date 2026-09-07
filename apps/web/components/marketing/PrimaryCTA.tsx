'use client';

import { Button, type ButtonProps } from '@/components/ui/Button';

/** Truthful primary CTA: the only conversion path today is the waitlist. */
export function PrimaryCTA(props: ButtonProps) {
  return (
    <Button
      onClick={() => document.getElementById('waitlist')?.scrollIntoView({ behavior: 'smooth' })}
      {...props}
    >
      Reserve your handle
    </Button>
  );
}
