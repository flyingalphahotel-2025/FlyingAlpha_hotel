import { NextResponse } from 'next/server';
import { parse } from 'cookie';

export async function middleware(req) {
  const cookieHeader = req.headers.get('cookie');
  const cookies = parse(cookieHeader || '');
  const adminAuthToken = cookies.adminAuthToken;

  const { pathname } = req.nextUrl;

  const isAdminSignInPage = pathname === '/admin/auth';
  const isAdminSignUpPage = pathname === '/admin/auth/signUp';

  // Redirect authenticated admin users away from auth pages
  if (adminAuthToken && (isAdminSignInPage || isAdminSignUpPage)) {
    return NextResponse.redirect(new URL('/admin/dashboard', req.nextUrl.origin));
  }

  // Protect /admin/dashboard routes and redirect to admin sign-in if not authenticated
  if (pathname.startsWith('/admin/dashboard') && !adminAuthToken) {
    return NextResponse.redirect(new URL('/admin/auth', req.nextUrl.origin));
  }

  // Allow access to the requested page if all conditions pass
  return NextResponse.next();
}