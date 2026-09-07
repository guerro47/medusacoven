import { NextResponse, type NextRequest } from 'next/server';

/**
 * Cheap first line of defense for the post-auth app group: no session
 * cookie → straight to /login without rendering anything. The (app)
 * layout performs the authoritative Stytch session authentication.
 */
export function middleware(request: NextRequest) {
  const hasSession = request.cookies.has('me_session');
  if (!hasSession) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*'],
};
