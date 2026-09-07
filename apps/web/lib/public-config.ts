/**
 * PUBLIC runtime configuration — publishable values only.
 *
 * Every value in this file ships to the browser bundle by design and is
 * safe to commit: the Supabase URL and anon (publishable) key are the
 * client-side credentials Supabase documents as public — row level
 * security is the actual boundary (public.waitlist is insert-only for
 * anon; every module table grants anon nothing).
 *
 * Environment variables always override these defaults, so a key
 * rotation or project move is an env change, not a code change.
 * SECRETS NEVER GO HERE — service-role keys, Stytch secrets, and
 * processor credentials are env-only (see .env.example).
 */

// `?? default` only catches null/undefined — an env var set to an empty (or
// whitespace) string slips through and, for a URL, makes `new URL('')` throw at
// build time (metadataBase, sitemap). Treat blank as unset.
const envOr = (value: string | undefined, fallback: string) =>
  value && value.trim() !== '' ? value : fallback;

export const SITE_URL = envOr(process.env.NEXT_PUBLIC_SITE_URL, 'https://medusacoven.vercel.app');

export const publicConfig = {
  supabaseUrl: envOr(process.env.NEXT_PUBLIC_SUPABASE_URL, 'https://hjptokbnsnnrinwtufao.supabase.co'),
  supabaseAnonKey: envOr(
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    'sb_publishable_kc5nTVXeHdp8ImTkwIjZ9g_0qR5c2aF',
  ),
  siteUrl: SITE_URL,
} as const;
