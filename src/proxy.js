import { NextResponse } from 'next/server';
import { getToken } from "next-auth/jwt";

// Changed 'middleware' to 'proxy'
export async function proxy(request) {
  const pathname = request.nextUrl.pathname;

  // 1. Define paths that SHOULD be protected
  const isProtectedPath = 
    pathname.startsWith('/add-kit') || 
    pathname.startsWith('/manage-kit') ||
    pathname.startsWith('/my-purchase');

  // 2. Check for NextAuth Token
  const session = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  // 3. Redirect logic
  if (isProtectedPath && !session) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('redirect', pathname + request.nextUrl.search);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/add-kit/:path*',
    '/manage-kit/:path*',
    '/my-purchase/:path*',
    '/my-review/:path*',
  ],
};