import type { Metadata } from 'next';
import './globals.css';

import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';
import '@mantine/charts/styles.css';

import { MantineProvider, MantineThemeOverride } from '@mantine/core';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';

import { routing } from '@/i18n/routing';
import { Locale } from '@/i18n/config';
import StoreProvider from '@/contexts/StoreProvider';

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

const theme: MantineThemeOverride = {
  primaryColor: 'green',
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
      <body>
        <MantineProvider theme={theme}>
          <NextIntlClientProvider messages={messages}>
            <StoreProvider>{children}</StoreProvider>
          </NextIntlClientProvider>
        </MantineProvider>
      </body>
    </html>
  );
}
