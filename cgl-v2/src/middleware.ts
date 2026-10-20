import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { locales, defaultLocale, Locale } from '@/lib/i18n';

function detectDeviceLocale(request: NextRequest): Locale {
  // 1. Check user cookie first if previously set
  const cookieLang = request.cookies.get('cgl_lang')?.value;
  if (cookieLang === 'ar' || cookieLang === 'en') {
    return cookieLang;
  }

  // 2. Detect from client device Accept-Language header
  const acceptLanguage = request.headers.get('accept-language') || '';
  const primaryLang = acceptLanguage.split(',')[0].trim().toLowerCase();

  if (primaryLang.startsWith('ar')) {
    return 'ar';
  }
  if (primaryLang.startsWith('en')) {
    return 'en';
  }
  if (acceptLanguage.toLowerCase().includes('ar')) {
    return 'ar';
  }

  return defaultLocale;
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check if the pathname is missing a locale
  const pathnameIsMissingLocale = locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  );

  // If missing locale (/ or any path without /ar or /en)
  if (pathnameIsMissingLocale) {
    const targetLocale = detectDeviceLocale(request);
    const response = NextResponse.redirect(
      new URL(`/${targetLocale}${pathname === '/' ? '' : pathname}`, request.url)
    );
    if (!request.cookies.get('cgl_lang')) {
      response.cookies.set('cgl_lang', targetLocale, { path: '/', maxAge: 60 * 60 * 24 * 365, sameSite: 'lax' });
    }
    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // Skip internal Next.js paths, public assets, and metadata files
    '/((?!api|_next/static|_next/image|assets|uploads|favicon.ico|icon.png|apple-icon.png|opengraph-image.png|twitter-image.png|og-image.jpg|.*\\..*).*)',
  ],
};
