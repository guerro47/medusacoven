/**
 * Single source of truth for module claims on the marketing surface.
 * Every module is either part of the founding MVP (Access Pass · Drops ·
 * Tips — ships at launch) or explicitly roadmap ("Coming Soon").
 * Nothing here may claim to be live before doors open.
 */

export type ModuleStatus = 'mvp' | 'coming-soon';

export interface ModuleInfo {
  slug: string;
  name: string;
  status: ModuleStatus;
  tagline: string;
  description: string;
  details: string[];
}

export const MVP_MODULES: ModuleInfo[] = [
  {
    slug: 'access-pass',
    name: 'Access Pass',
    status: 'mvp',
    tagline: 'The foundation of your empire.',
    description:
      'Recurring membership that fans hold directly with you. Your subscriber list is your fan graph — exportable, portable, yours.',
    details: [
      'Fans subscribe to you, not to a platform feed.',
      'Full export of your member list, anytime. Leave with everything.',
      'Tiering and entitlements are carried in the session model from day one.',
    ],
  },
  {
    slug: 'drops',
    name: 'Drops',
    status: 'mvp',
    tagline: 'Temporal layers of value.',
    description:
      'Timed releases — content, bundles, limited runs — that rise, sell, and archive on your schedule.',
    details: [
      'Scheduled or instant release windows.',
      'Per-drop pricing independent of the Access Pass.',
      'Scarcity is real: when a run closes, it closes.',
    ],
  },
  {
    slug: 'tips',
    name: 'Tips',
    status: 'mvp',
    tagline: 'Energy flows upward.',
    description:
      'Direct appreciation from fans, settled on high-risk rails built for this industry — CCBill / Segpay, never processors that drop adult creators.',
    details: [
      'One-tap tipping on your profile and inside drops.',
      'High-risk payment rails only. No processor that can rug-pull adult creators.',
      'Payout schedule published before launch — verified fee math, no invented percentages.',
    ],
  },
];

export const ROADMAP_MODULES: ModuleInfo[] = [
  {
    slug: 'coven',
    name: 'The Coven',
    status: 'coming-soon',
    tagline: 'Your inner circle.',
    description:
      'An invitation-only tier above the Access Pass for your closest supporters — the only surface that wears the serpent gradient.',
    details: [],
  },
  {
    slug: 'analytics',
    name: 'Fan-Graph Analytics',
    status: 'coming-soon',
    tagline: 'See the whole graph.',
    description: 'Cohorts, churn and lifetime value over data you can export in full at any time.',
    details: [],
  },
  {
    slug: 'agency',
    name: 'Agency Console',
    status: 'coming-soon',
    tagline: 'Rosters, managed right.',
    description: 'Multi-creator management with scoped roles and auditable access.',
    details: [],
  },
  {
    slug: 'marketplace',
    name: 'Module Marketplace',
    status: 'coming-soon',
    tagline: 'Extend the OS.',
    description: 'Third-party modules that plug into your empire without owning your data.',
    details: [],
  },
];

export function getMvpModule(slug: string): ModuleInfo | undefined {
  return MVP_MODULES.find((m) => m.slug === slug);
}
