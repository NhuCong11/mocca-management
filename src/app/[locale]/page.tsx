import { Link } from '@/i18n/routing';
import { useTranslations } from 'next-intl';
import { ActionIcon, Button } from '@mantine/core';
import { IconAdjustments } from '@tabler/icons-react';

export default function Home() {
  const t = useTranslations();

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <h1 data-aos="zoom-in-right">{t('title')}</h1>
        <Link href="/checkout">Checkout</Link>
        <ActionIcon size="xl" variant="filled" aria-label="Settings">
          <IconAdjustments style={{ width: '70%', height: '70%' }} stroke={1.5} />
        </ActionIcon>
        <Button size="lg">Action</Button>
      </main>
    </div>
  );
}
