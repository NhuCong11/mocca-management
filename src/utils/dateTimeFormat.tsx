'use client';
import { useState, useEffect } from 'react';
import { Group, Text } from '@mantine/core';
import { IconTimezone } from '@tabler/icons-react';

const formatDateTime = (lang: string) => {
  const now = new Date();
  return new Intl.DateTimeFormat(lang, {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }).format(now);
};

export default function DateTimeDisplay({ lang }: { lang: string }) {
  const [dateTime, setDateTime] = useState(formatDateTime(lang));

  useEffect(() => {
    const interval = setInterval(() => {
      setDateTime(formatDateTime(lang));
    }, 10000);

    return () => clearInterval(interval);
  }, [lang]);

  return (
    <Group>
      <IconTimezone size={20} color="var(--primary-bg)" />
      <Text size="xl" c="var(--coffee-color)">
        {dateTime}
      </Text>
    </Group>
  );
}
