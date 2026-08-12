import 'server-only';
import { createClient, type SupabaseClient } from '@supabase/supabase-js';

/**
 * Server-side Supabase client for the anon role. Pre-launch it touches a
 * single table: public.waitlist, guarded by insert-only RLS
 * (supabase/migrations/0001_waitlist.sql).
 *
 * Returns null when the environment is not configured so callers can fail
 * honestly instead of faking success.
 */
export function getSupabase(): SupabaseClient | null {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !anonKey) return null;

  return createClient(url, anonKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}
