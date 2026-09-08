'use server';

import { getSupabase } from '@/lib/supabase/server';

export type WaitlistResult =
  | { success: true; handle: string | null }
  | { success?: never; error: 'invalid_email' | 'invalid_handle' | 'already_registered' | 'handle_taken' | 'unavailable' | 'failed' | 'bot' };

const EMAIL_SHAPE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const HANDLE_SHAPE = /^[a-z0-9_]{1,24}$/;

export async function joinWaitlist(_prev: WaitlistResult | null, formData: FormData): Promise<WaitlistResult> {
  // Honeypot — real visitors never fill this field.
  const honeypot = formData.get('website');
  if (honeypot) return { error: 'bot' };

  const email = String(formData.get('email') ?? '')
    .toLowerCase()
    .trim();
  if (!EMAIL_SHAPE.test(email)) return { error: 'invalid_email' };

  const rawHandle = String(formData.get('handle') ?? '').toLowerCase().trim();
  const handle = rawHandle.length > 0 ? rawHandle : null;
  if (handle && !HANDLE_SHAPE.test(handle)) return { error: 'invalid_handle' };

  // Referral credit from a shared ?r=<handle> link. Recorded inside `source`
  // (no schema change); a malformed or self-referring value is dropped, never
  // an error — referral is a bonus, not a gate.
  const rawRef = String(formData.get('ref') ?? '').toLowerCase().trim();
  const ref = HANDLE_SHAPE.test(rawRef) && rawRef !== handle ? rawRef : null;

  const supabase = getSupabase();
  if (!supabase) {
    // No fake success, ever: if the backend isn't reachable we say so.
    return { error: 'unavailable' };
  }

  const { error } = await supabase.from('waitlist').insert({
    email,
    handle,
    source: ref ? `marketing:r=${ref}` : 'marketing',
  });

  if (error?.code === '23505') {
    return error.message.includes('handle') ? { error: 'handle_taken' } : { error: 'already_registered' };
  }
  if (error) return { error: 'failed' };

  return { success: true, handle };
}
