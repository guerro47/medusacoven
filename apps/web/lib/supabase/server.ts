import 'server-only';
import { createClient, type SupabaseClient } from '@supabase/supabase-js';
import { publicConfig } from '@/lib/public-config';

/**
 * Server-side Supabase client for the anon role, using the publishable
 * credentials from lib/public-config.ts (env vars override). RLS is the
 * security boundary: public.waitlist is insert-only for anon
 * (0001_waitlist), and the module tables grant anon nothing
 * (0002_modules).
 *
 * Returns null only if configuration is explicitly blanked, so callers
 * can fail honestly instead of faking success.
 */
export function getSupabase(): SupabaseClient | null {
  const { supabaseUrl, supabaseAnonKey } = publicConfig;
  if (!supabaseUrl || !supabaseAnonKey) return null;

  return createClient(supabaseUrl, supabaseAnonKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}
