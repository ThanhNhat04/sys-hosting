// proxy.js
import { NextResponse } from 'next/server'

const publicRoutes = ['/login', '/register', '/forgot-password'];

export function proxy(request) {
  const { pathname } = request.nextUrl;

  const hasToken = request.cookies.get('accessToken'); 
  if (hasToken && publicRoutes.includes(pathname)) {
    return NextResponse.redirect(new URL('/profileUser', request.url));
  }

  if (!hasToken && !publicRoutes.includes(pathname)) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Áp dụng proxy cho tất cả request TRỪ:
     * - api (API routes)
     * - _next/static (file tĩnh)
     * - _next/image (ảnh tối ưu)
     * - favicon.ico, file ảnh png...
     */
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.png$).*)',
  ],
}