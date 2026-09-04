import 'server-only';
import { cache } from 'react';
import { cookies } from 'next/headers';
import * as stytch from 'stytch';

/**
 * M0 Gateway — Stytch auth scaffold.
 *
 * This replaces every legacy client-side auth path (there is no
 * localStorage auth anywhere in this codebase, and CI keeps it that way).
 * The session model will carry role (creator / fan / agency) and module
 * entitlements once the app beta opens.
 *
 * Until STYTCH_* env vars are set, the auth shell renders in
 * "beta pending" mode and the (app) group redirects to /login.
 */

export const SESSION_COOKIE = 'me_session';

export type Role = 'creator' | 'fan' | 'agency';

export interface SessionClaims {
  userId: string;
  role: Role;
  /** Module entitlements, e.g. ['access-pass', 'drops', 'tips'] */
  entitlements: string[];
}

let client: stytch.Client | null = null;

export function isStytchConfigured(): boolean {
  return Boolean(process.env.STYTCH_PROJECT_ID && process.env.STYTCH_SECRET);
}

export function getStytch(): stytch.Client | null {
  if (!isStytchConfigured()) return null;
  if (!client) {
    client = new stytch.Client({
      project_id: process.env.STYTCH_PROJECT_ID!,
      secret: process.env.STYTCH_SECRET!,
    });
  }
  return client;
}

/**
 * Read + authenticate the session from the me_session cookie, memoized
 * per request (React cache) so the (app) layout and module pages share
 * one Stytch round-trip.
 */
export const getSessionFromCookies = cache(async (): Promise<SessionClaims | null> => {
  const cookieStore = await cookies();
  return getSession(cookieStore.get(SESSION_COOKIE)?.value);
});

/**
 * Authenticate the session token from the me_session cookie.
 * Returns null when unauthenticated or when Stytch is not yet configured.
 */
export async function getSession(sessionToken: string | undefined): Promise<SessionClaims | null> {
  const api = getStytch();
  if (!api || !sessionToken) return null;

  try {
    const res = await api.sessions.authenticate({ session_token: sessionToken });
    const custom = (res.session.custom_claims ?? {}) as Partial<SessionClaims>;
    return {
      userId: res.session.user_id,
      role: custom.role ?? 'fan',
      entitlements: custom.entitlements ?? [],
    };
  } catch {
    return null;
  }
}
