import { useTranslations } from 'next-intl';
import { Box, Group, Title } from '@mantine/core';

function Users() {
  const t = useTranslations();

  return (
    <Box p="xl">
      <Group pb={10}>
        <Title order={1} c="var(--primary-bg)">
          {t('sidebar.users')}
        </Title>
      </Group>
    </Box>
  );
}

export default Users;
