'use client';
import { useTranslations } from 'next-intl';
import { useMediaQuery } from '@mantine/hooks';
import { Box, Divider, Grid, Group, Title } from '@mantine/core';
import { IconMessage } from '@tabler/icons-react';

import Sidebar from './components/Sidebar';
import Conversation from './components/Conversation';
import { useAppSelector } from '@/lib/hooks';

function Chats() {
  const t = useTranslations();
  const mobile = useAppSelector((state) => state.chats.isMobile);
  const isMobile = useMediaQuery('(max-width: 768px)');

  return (
    <Box p="xl">
      <Group pb={10}>
        <IconMessage size={25} color="var(--primary-bg)" />
        <Title order={1} c="var(--primary-bg)">
          {t('sidebar.chats')}
        </Title>
      </Group>

      <Box>
        <Divider pb={20} variant="dashed" color="gray" />

        <Grid>
          {isMobile ? (
            mobile ? (
              <Grid.Col span={12}>
                <Conversation />
              </Grid.Col>
            ) : (
              <Grid.Col span={12}>
                <Sidebar />
              </Grid.Col>
            )
          ) : (
            <>
              <Grid.Col span={{ base: 12, md: 12, lg: 4 }}>
                <Sidebar />
              </Grid.Col>
              <Grid.Col span={{ base: 12, md: 12, lg: 8 }}>
                <Conversation />
              </Grid.Col>
            </>
          )}
        </Grid>
      </Box>
    </Box>
  );
}

export default Chats;
