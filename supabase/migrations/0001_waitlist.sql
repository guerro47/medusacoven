-- 0001_waitlist — Phase 0 conversion path: waitlist + handle reservation.
-- Insert-only: the anon role can add a row, never read, update, or delete.

create extension if not exists citext;
create extension if not exists pgcrypto;

create table if not exists public.waitlist (
  id         uuid primary key default gen_random_uuid(),
  email      citext not null,
  handle     citext,
  source     text   not null default 'marketing',
  created_at timestamptz not null default now(),

  constraint waitlist_email_unique unique (email),
  constraint waitlist_handle_unique unique (handle),
  constraint waitlist_email_shape  check (email ~* '^[^\s@]+@[^\s@]+\.[^\s@]+$'),
  constraint waitlist_handle_shape check (handle is null or handle ~ '^[a-z0-9_]{1,24}$')
);

comment on table public.waitlist is
  'Pre-launch waitlist + founding-creator handle reservations. Insert-only via RLS.';

alter table public.waitlist enable row level security;

-- Anonymous visitors may join the waitlist. Nothing else.
create policy waitlist_insert_only
  on public.waitlist
  for insert
  to anon
  with check (true);

-- No select/update/delete policies on purpose: reads happen only through
-- the service role in trusted server contexts (ops dashboards, exports).
