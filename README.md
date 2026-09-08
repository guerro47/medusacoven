# medusacoven

MedusaElite — **Your Fans. Your Data. Your Empire.**

The monetization operating system for creators. This repo holds the modular,
AI-native surface: a Next.js 15 marketing site converting to waitlist today,
structurally ready to flip Access Pass / Drops / Tips live without a rebuild.

Source of truth: **Medusa_TaskPlan_v1_2026-08-07**. Phase 0 (brand, liability,
truthfulness) is the hard gate — enforced in CI, not in memory.

## Layout

```
apps/web/               Next.js 15 App Router (React 19, Tailwind 4, R3F)
├── app/(marketing)/    Hero + waitlist, module pages, roadmap
├── app/(legal)/        Privacy · Terms · Acceptable Use/18+ · Cookies (version-stamped)
├── app/(auth)/         Stytch M0 Gateway shell
├── app/(app)/          Post-auth modular monolith (session-gated)
├── components/ui/      Design-system primitives (tokens in lib/design-tokens.ts)
├── components/3d/      R3F hero: modular architecture + Serpent Ring
└── lib/                supabase · stytch · age-gate · high-risk-payments
supabase/migrations/    0001_waitlist — citext unique, insert-only RLS
scripts/check-brand.mjs Brand + liability CI gate
```

## Commands

```bash
npm install
npm run dev          # apps/web on :3000
npm run ci           # brand gate → lint → typecheck → build (same as CI)
```

## Hard rules (CI-enforced)

- **Brand**: the retired brand name and the standalone all-caps inner-circle
  string are banned ("the Coven" as a feature noun is fine).
  `scripts/check-brand.mjs` defines the exact patterns and fails the build.
- **Payments**: high-risk rails only (CCBill / Segpay), isolated in
  `apps/web/lib/high-risk-payments.ts`. Stripe/PayPal integration code is
  blocked by ESLint and the CI gate.
- **Truthfulness**: MVP modules (Access Pass · Drops · Tips) are labelled as
  launching Q4 2026; everything else is tagged Coming Soon. No placeholder
  testimonials, no fake success states — the waitlist errors honestly when
  Supabase env vars are absent.
- **Auth**: secure cookies only (age gate is HttpOnly, Stytch session model).
  No localStorage auth, ever.
- **Performance budget**: LCP < 2.0 s mobile, CLS < 0.05 (`lighthouserc.json`).

## Deploy (Vercel)

The Vercel project `medusacoven` is linked to this repository with
**Root Directory `apps/web`** (framework: Next.js, auto-detected) and
production branch `main` — every push to `main` deploys production. Do not
add a root-level vercel.json: with the Root Directory set, it either gets
ignored or (worse) doubles the output path. Publishable client config ships
in `apps/web/lib/public-config.ts`; env vars override it, and secrets
(Stytch, service role, processor credentials) are env-only per
`apps/web/.env.example`. Canonical domain: `medusacoven.vercel.app` → future
production domain; never per-deployment URLs in public links.

## Waitlist backend

Apply `supabase/migrations/0001_waitlist.sql` to the Supabase project
(`supabase db push` or the SQL editor). The anon role can only insert;
reads require the service role.

## Campaign

- `campaign/PLAYBOOK.md` — "The Coven Assembles" pre-launch viral playbook
  (phases, copy bank, ground rules).
- `campaign/og-card.html` → `campaign/og.png` — static share-card render for
  social posts (the site's own link previews come from
  `apps/web/app/opengraph-image.tsx`).
- Referral loop: visits with `?r=<handle>` credit that handle — the waitlist
  form carries it and the server action records it in `source` as
  `marketing:r=<handle>` (no schema change). The post-signup success box
  offers "Share on X" and a copy-able personal referral link.
