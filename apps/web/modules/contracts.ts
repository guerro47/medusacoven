/**
 * Domain contracts for the three MVP modules — Access Pass, Drops, Tips.
 *
 * This is the module layer's public surface: presentation (dashboard
 * pages, components/modules) and persistence (modules/repositories.ts)
 * both depend on these DTOs; neither leaks its own shapes across the
 * boundary. Database rows never reach a component, and React never
 * reaches the database.
 *
 * The marketing surface must not import from this layer (ESLint-enforced)
 * — it ships independently.
 */

export type Currency = 'GBP' | 'USD' | 'EUR';

/** Format minor units for display, e.g. 1250 GBP → "£12.50". */
export function formatMoney(amountMinor: number, currency: Currency): string {
  return new Intl.NumberFormat('en-GB', { style: 'currency', currency }).format(amountMinor / 100);
}

export type ModuleKey = 'access-pass' | 'drops' | 'tips';

/** A creator provisioned for the app (created at founding onboarding). */
export interface CreatorProfile {
  id: string;
  /** Stytch user id — the bridge between the session and the fan graph. */
  userId: string;
  handle: string;
  displayName: string;
  createdAt: string;
}

/* ── Access Pass — the foundation ─────────────────────────────────── */

export type BillingInterval = 'month' | 'year';

export interface AccessPassTier {
  id: string;
  creatorId: string;
  name: string;
  /** Minor units (pence/cents). Display math stays fee-on-net verified. */
  priceMinor: number;
  currency: Currency;
  interval: BillingInterval;
  active: boolean;
  createdAt: string;
}

export type MembershipStatus = 'active' | 'past_due' | 'canceled';

export interface Membership {
  id: string;
  tierId: string;
  /** Stytch user id of the fan. The fan graph is exportable, always. */
  fanUserId: string;
  status: MembershipStatus;
  startedAt: string;
  renewsAt: string | null;
}

/* ── Drops — temporal layers ──────────────────────────────────────── */

export type DropStatus = 'draft' | 'scheduled' | 'live' | 'closed' | 'archived';

/** Canonical lifecycle order, used by UI (lifecycle strip) and checks. */
export const DROP_LIFECYCLE: readonly DropStatus[] = [
  'draft',
  'scheduled',
  'live',
  'closed',
  'archived',
] as const;

/**
 * Legal state transitions. Scarcity is real: a closed run can only be
 * archived, never reopened.
 */
export const DROP_TRANSITIONS: Record<DropStatus, readonly DropStatus[]> = {
  draft: ['scheduled', 'live', 'archived'],
  scheduled: ['live', 'draft', 'archived'],
  live: ['closed'],
  closed: ['archived'],
  archived: [],
};

export function canTransitionDrop(from: DropStatus, to: DropStatus): boolean {
  return DROP_TRANSITIONS[from].includes(to);
}

export interface Drop {
  id: string;
  creatorId: string;
  title: string;
  description: string;
  priceMinor: number;
  currency: Currency;
  status: DropStatus;
  opensAt: string | null;
  closesAt: string | null;
  /** null = open edition; otherwise the run closes at this count. */
  editionLimit: number | null;
  soldCount: number;
  createdAt: string;
}

/* ── Tips — energy flow ───────────────────────────────────────────── */

/** High-risk rails only; mirrors lib/high-risk-payments.ts. */
export type TipProcessor = 'ccbill' | 'segpay';

export type TipStatus = 'pending' | 'settled' | 'failed' | 'refunded';

export interface Tip {
  id: string;
  creatorId: string;
  /** null = anonymous tip. */
  fanUserId: string | null;
  amountMinor: number;
  currency: Currency;
  processor: TipProcessor;
  status: TipStatus;
  createdAt: string;
}
