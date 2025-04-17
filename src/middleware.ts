import createMiddleware from 'next-intl/middleware';
import { NextRequest } from 'next/server';
import { convertPathName, privateRoutes } from './config/routes';
import { defaultLocale, locales } from './i18n/config';

export default async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const handleI18nRouting = createMiddleware({
    locales: locales,
    defaultLocale: defaultLocale,
  });
  const response = handleI18nRouting(request);
  const token = request.cookies.get('accessToken')?.value;
  const currentLocale = locales.find((locale) => pathname.startsWith(`/${locale}`)) || defaultLocale;

  response.headers.set('x-default-locale', defaultLocale);

  if (privateRoutes.includes(pathname)) {
    const url = new URL(`/${currentLocale}/errors/403`, request.url);
    response.headers.set('x-middleware-rewrite', url.toString());
  }

  if (!token && convertPathName(['']).includes(pathname)) {
    const url = new URL(`/${currentLocale}/auth/signin`, request.url);
    response.headers.set('x-middleware-rewrite', url.toString());
  }

  // Check for admin role and restrict access to /products and /orders
  const userRoleCookie = request.cookies.get('userRole')?.value;
  const restrictedRoutes = ['/products', '/orders'];
  const isRestrictedRoute = restrictedRoutes.some((route) => pathname.includes(route));

  if (userRoleCookie === 'admin' && isRestrictedRoute) {
    const url = new URL(`/${currentLocale}/errors/403`, request.url);
    response.headers.set('x-middleware-rewrite', url.toString());
  }

  // Check for shop role and restrict access to /users, /contacts, and /categories
  const shopRestrictedRoutes = ['/users', '/contacts', '/categories'];
  const isShopRestrictedRoute = shopRestrictedRoutes.some((route) => pathname.includes(route));

  if (userRoleCookie === 'shop' && isShopRestrictedRoute) {
    const url = new URL(`/${currentLocale}/errors/403`, request.url);
    response.headers.set('x-middleware-rewrite', url.toString());
  }

  return response;
}

export const config = {
  matcher: ['/', '/(vi|en|zh|ko)/:path*'],
};
