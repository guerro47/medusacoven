import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { getSession, SESSION_COOKIE } from '@/lib/stytch';
import { isAgeVerified } from '@/lib/age-gate';

/**
 * Post-auth modular monolith shell. Everything in this group is gated:
 * age verification + an authenticated Stytch session, checked
 * server-side on every request (middleware adds a cheap first line of
 * defense; this is the authoritative check).
 */
export default async function AppLayout({ children }: { children: React.ReactNode }) {
  if (!(await isAgeVerified())) redirect('/');

  const cookieStore = await cookies();
  const session = await getSession(cookieStore.get(SESSION_COOKIE)?.value);
  if (!session) redirect('/login');

  return <main className="relative z-10 mx-auto w-full max-w-6xl px-6 pb-24 pt-16 sm:px-10">{children}</main>;
}
