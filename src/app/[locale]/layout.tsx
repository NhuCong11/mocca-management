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
import { fonts } from '@/styles/fonts';

import StoreProvider from '@/contexts/StoreProvider';
import LayoutProvider from '@/contexts/LayoutProvider';

export async function generateMetadata(): Promise<Metadata> {
  const messages = await getMessages();

  const title =
    typeof messages['title'] === 'string' ? messages['title'] : 'Mocca Cafe | Ứng dụng đặt mua Cafe đa dạng';
  const description =
    typeof messages['description'] === 'string'
      ? messages['description']
      : 'Ứng dụng đặt mua Cafe đa dạng được tạo bởi Công';

  return {
    title,
    description,
  };
}

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
            <StoreProvider>
              <LayoutProvider>{children}</LayoutProvider>
            </StoreProvider>
          </NextIntlClientProvider>
        </MantineProvider>
      </body>
    </html>
  );
}
