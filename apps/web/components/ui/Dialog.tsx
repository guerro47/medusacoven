'use client';

import * as DialogPrimitive from '@radix-ui/react-dialog';
import type { ComponentPropsWithoutRef, ReactNode } from 'react';

/**
 * Modal dialog on Radix. Restrained slide + opacity per the motion
 * architecture — 320ms transition token, cinematic easing, no bounce.
 */

export const Dialog = DialogPrimitive.Root;
export const DialogTrigger = DialogPrimitive.Trigger;
export const DialogClose = DialogPrimitive.Close;

const overlayClass =
  'fixed inset-0 z-[70] bg-ink-deep/80 backdrop-blur-sm ' +
  'data-[state=open]:animate-[dialog-fade-in_var(--duration-transition)_var(--ease-cinematic)] ' +
  'data-[state=closed]:animate-[dialog-fade-out_var(--duration-micro)_ease-in]';

interface DialogContentProps extends ComponentPropsWithoutRef<typeof DialogPrimitive.Content> {
  title: string;
  /** Visually hide the title (still announced to screen readers). */
  hideTitle?: boolean;
  description?: string;
  children: ReactNode;
}

export function DialogContent({
  title,
  hideTitle = false,
  description,
  children,
  className = '',
  ...props
}: DialogContentProps) {
  return (
    <DialogPrimitive.Portal>
      <DialogPrimitive.Overlay className={overlayClass} />
      <DialogPrimitive.Content
        className={
          'fixed left-1/2 top-1/2 z-[70] w-[calc(100vw-2rem)] max-w-lg -translate-x-1/2 -translate-y-1/2 ' +
          'rounded-2xl border border-gold-line bg-ink-elevated p-7 ' +
          'shadow-[0_24px_80px_-32px_rgba(212,175,55,0.25)] outline-none ' +
          'data-[state=open]:animate-[dialog-rise-in_var(--duration-transition)_var(--ease-cinematic)] ' +
          'data-[state=closed]:animate-[dialog-fade-out_var(--duration-micro)_ease-in] ' +
          className
        }
        {...props}
      >
        <DialogPrimitive.Title
          className={
            hideTitle
              ? 'sr-only'
              : 'font-display text-lg font-bold uppercase tracking-wide text-bone'
          }
        >
          {title}
        </DialogPrimitive.Title>
        {description ? (
          <DialogPrimitive.Description className="mt-2 text-sm leading-relaxed text-bone-muted">
            {description}
          </DialogPrimitive.Description>
        ) : null}
        {children}
      </DialogPrimitive.Content>
    </DialogPrimitive.Portal>
  );
}

interface SheetContentProps extends ComponentPropsWithoutRef<typeof DialogPrimitive.Content> {
  title: string;
  hideTitle?: boolean;
  /** Which edge the sheet slides from. */
  side?: 'left' | 'right';
  children: ReactNode;
}

/** Edge-anchored panel (drawer) built on the same Radix dialog behavior. */
export function SheetContent({
  title,
  hideTitle = false,
  side = 'left',
  children,
  className = '',
  ...props
}: SheetContentProps) {
  const slide =
    side === 'left'
      ? 'left-0 border-r data-[state=open]:animate-[sheet-in-left_var(--duration-transition)_var(--ease-cinematic)]'
      : 'right-0 border-l data-[state=open]:animate-[sheet-in-right_var(--duration-transition)_var(--ease-cinematic)]';

  return (
    <DialogPrimitive.Portal>
      <DialogPrimitive.Overlay className={overlayClass} />
      <DialogPrimitive.Content
        className={
          `fixed inset-y-0 z-[70] w-72 max-w-[85vw] ${slide} ` +
          'border-gold-line bg-ink-elevated p-6 outline-none ' +
          'data-[state=closed]:animate-[dialog-fade-out_var(--duration-micro)_ease-in] ' +
          className
        }
        {...props}
      >
        <DialogPrimitive.Title
          className={
            hideTitle
              ? 'sr-only'
              : 'font-display text-base font-bold uppercase tracking-wide text-bone'
          }
        >
          {title}
        </DialogPrimitive.Title>
        {children}
      </DialogPrimitive.Content>
    </DialogPrimitive.Portal>
  );
}
