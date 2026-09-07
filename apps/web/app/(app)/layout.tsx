import { redirect } from 'next/navigation';
import { DashboardShell } from '@/components/modules/DashboardShell';
import { getSessionFromCookies } from '@/lib/stytch';
import { isAgeVerified } from '@/lib/age-gate';

/**
 * Post-auth modular monolith shell. Everything in this group is gated:
 * age verification + an authenticated Stytch session, checked
 * server-side on every request (middleware adds a cheap first line of
 * defense; this is the authoritative check).
 */
export default async function AppLayout({ children }: { children: React.ReactNode }) {
  if (!(await isAgeVerified())) redirect('/');

  const session = await getSessionFromCookies();
  if (!session) redirect('/login');

  return (
    <DashboardShell role={session.role} entitlements={session.entitlements}>
      {children}
    </DashboardShell>
  );
}
