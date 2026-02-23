import { auth } from '@/lib/auth';
import { NextResponse } from 'next/server';

export default auth((req) => {
  const { nextUrl, auth: session } = req;
  const pathname = nextUrl.pathname;

  // ── Admin routes ──
  if (pathname.startsWith('/admin')) {
    if (!session?.user) {
      return NextResponse.redirect(new URL('/login', nextUrl));
    }
    if (session.user.role !== 'admin') {
      return NextResponse.redirect(new URL('/', nextUrl));
    }
  }

  // ── Seller routes ──
  if (pathname.startsWith('/seller')) {
    if (!session?.user) {
      return NextResponse.redirect(new URL('/login', nextUrl));
    }
    if (session.user.role !== 'seller' && session.user.role !== 'admin') {
      return NextResponse.redirect(new URL('/', nextUrl));
    }
  }

  return NextResponse.next();
});

export const config = {
  matcher: ['/admin/:path*', '/seller/:path*'],
};
