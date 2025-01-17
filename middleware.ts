import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const authToken = request.cookies.get('auth-token');
  const { pathname } = request.nextUrl;

  // Public paths that don't require authentication
  const publicPaths = ['/', '/auth/login', '/auth/register'];
  
  // If the path is public, allow access
  if (publicPaths.includes(pathname)) {
    // If user is already logged in and tries to access auth pages,
    // redirect to dashboard
    if (authToken && (pathname === '/auth/login' || pathname === '/auth/register')) {
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }
    return NextResponse.next();
  }

  // For all other paths, check if user is authenticated
  if (!authToken) {
    // Store the original URL to redirect back after login
    const url = new URL('/auth/login', request.url);
    url.searchParams.set('callbackUrl', pathname);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

// Update matcher to include all routes except homepage
export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ]
};
