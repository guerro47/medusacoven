'use server';

import { setAgeVerified } from '@/lib/age-gate';

export async function confirmAge(): Promise<{ ok: true }> {
  await setAgeVerified();
  return { ok: true };
}
