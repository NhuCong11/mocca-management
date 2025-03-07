import { locales } from '@/i18n/config';

const privatePath: string[] = ['/checkout', '/auth/profile'];
const noDefaultLayoutPath: string[] = ['/auth/signin'];

export const convertPathName = (pathNames: string[]): string[] => {
  return pathNames.flatMap((route) => locales.map((locale) => `/${locale}${route}`));
};

export const privateRoutes: string[] = convertPathName(privatePath);

export const noDefaultLayoutRoutes: string[] = noDefaultLayoutPath;
