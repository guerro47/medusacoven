import 'server-only';
import { cookies } from 'next/headers';

export const AGE_COOKIE = 'me_age_verified';
const ONE_YEAR_SECONDS = 31536000;

/** Read the secure age-verification cookie (server components / middleware). */
export async function isAgeVerified(): Promise<boolean> {
  const cookieStore = await cookies();
  return cookieStore.get(AGE_COOKIE)?.value === '1';
}

/**
 * Set the age-verification cookie. Secure, HttpOnly, SameSite=Lax, 1 year —
 * never localStorage. Call from a server action only.
 */
export async function setAgeVerified(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.set(AGE_COOKIE, '1', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: ONE_YEAR_SECONDS,
    path: '/',
  });
}
