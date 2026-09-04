-- 0002_modules — schema for the three MVP modules: Access Pass, Drops, Tips.
-- Mirrors apps/web/modules/contracts.ts. Read/write paths open with the
-- founding beta; until then no role has row access (see RLS note below).

-- ── Creators ──────────────────────────────────────────────────────────
create table if not exists public.creators (
  id           uuid primary key default gen_random_uuid(),
  user_id      text not null,                -- Stytch user id
  handle       citext not null,
  display_name text not null,
  created_at   timestamptz not null default now(),

  constraint creators_user_unique   unique (user_id),
  constraint creators_handle_unique unique (handle),
  constraint creators_handle_shape  check (handle ~ '^[a-z0-9_]{1,24}$')
);

comment on table public.creators is
  'Creators provisioned at founding onboarding. handle mirrors the waitlist reservation.';

-- ── Access Pass — the foundation ──────────────────────────────────────
create table if not exists public.access_pass_tiers (
  id               uuid primary key default gen_random_uuid(),
  creator_id       uuid not null references public.creators(id) on delete cascade,
  name             text not null,
  price_minor      integer not null check (price_minor > 0),
  currency         text not null check (currency in ('GBP', 'USD', 'EUR')),
  billing_interval text not null check (billing_interval in ('month', 'year')),
  active           boolean not null default true,
  created_at       timestamptz not null default now()
);

create index if not exists access_pass_tiers_creator_idx
  on public.access_pass_tiers (creator_id);

create table if not exists public.memberships (
  id          uuid primary key default gen_random_uuid(),
  tier_id     uuid not null references public.access_pass_tiers(id) on delete cascade,
  fan_user_id text not null,                 -- Stytch user id
  status      text not null default 'active'
              check (status in ('active', 'past_due', 'canceled')),
  started_at  timestamptz not null default now(),
  renews_at   timestamptz,

  constraint memberships_unique unique (tier_id, fan_user_id)
);

create index if not exists memberships_fan_idx on public.memberships (fan_user_id);

-- ── Drops — temporal layers ───────────────────────────────────────────
create table if not exists public.drops (
  id            uuid primary key default gen_random_uuid(),
  creator_id    uuid not null references public.creators(id) on delete cascade,
  title         text not null,
  description   text not null default '',
  price_minor   integer not null check (price_minor > 0),
  currency      text not null check (currency in ('GBP', 'USD', 'EUR')),
  status        text not null default 'draft'
                check (status in ('draft', 'scheduled', 'live', 'closed', 'archived')),
  opens_at      timestamptz,
  closes_at     timestamptz,
  edition_limit integer check (edition_limit is null or edition_limit > 0),
  sold_count    integer not null default 0 check (sold_count >= 0),
  created_at    timestamptz not null default now(),

  constraint drops_window_order check (
    opens_at is null or closes_at is null or closes_at > opens_at
  ),
  constraint drops_sold_within_edition check (
    edition_limit is null or sold_count <= edition_limit
  )
);

create index if not exists drops_creator_status_idx
  on public.drops (creator_id, status);

comment on constraint drops_sold_within_edition on public.drops is
  'Scarcity is real: a run can never oversell its edition.';

-- ── Tips — energy flow (high-risk rails only) ─────────────────────────
create table if not exists public.tips (
  id           uuid primary key default gen_random_uuid(),
  creator_id   uuid not null references public.creators(id) on delete cascade,
  fan_user_id  text,                          -- null = anonymous tip
  amount_minor integer not null check (amount_minor > 0),
  currency     text not null check (currency in ('GBP', 'USD', 'EUR')),
  processor    text not null check (processor in ('ccbill', 'segpay')),
  status       text not null default 'pending'
               check (status in ('pending', 'settled', 'failed', 'refunded')),
  created_at   timestamptz not null default now()
);

create index if not exists tips_creator_created_idx
  on public.tips (creator_id, created_at desc);

-- ── RLS ───────────────────────────────────────────────────────────────
-- Enabled everywhere with NO policies on purpose: the anon key can touch
-- nothing in the module schema. Creator- and fan-scoped policies land
-- with the Stytch JWT → Postgres claim mapping at beta onboarding;
-- until then, only the service role (trusted server contexts) can read.
alter table public.creators          enable row level security;
alter table public.access_pass_tiers enable row level security;
alter table public.memberships       enable row level security;
alter table public.drops             enable row level security;
alter table public.tips              enable row level security;
