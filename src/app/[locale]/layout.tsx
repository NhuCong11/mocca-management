import type { Metadata } from 'next';
import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';
import '@mantine/charts/styles.css';
import './globals.css';

import { notFound } from 'next/navigation';
import { getMessages } from 'next-intl/server';
import { NextIntlClientProvider } from 'next-intl';
import { MantineProvider } from '@mantine/core';

import { Locale } from '@/i18n/config';
import { routing } from '@/i18n/routing';
import { theme } from '@/styles/mantine';
import StoreProvider from '@/contexts/StoreProvider';
import { fonts } from '@/styles/fonts';

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const resolvedParams = await params;
  const { locale } = resolvedParams;

  if (!routing.locales.includes(locale as Locale)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body className={`${fonts.inter} antialiased`}>
        <MantineProvider theme={theme}>
          <NextIntlClientProvider messages={messages}>
            <StoreProvider>{children}</StoreProvider>
          </NextIntlClientProvider>
        </MantineProvider>
      </body>
    </html>
  );
}
