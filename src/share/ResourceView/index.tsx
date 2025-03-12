import { useEffect, useState } from 'react';
import { useMediaQuery } from '@mantine/hooks';
import { Box, Modal, Title, Text, SimpleGrid, Group, Loader } from '@mantine/core';
import { useTranslations } from 'next-intl';
import { IconX } from '@tabler/icons-react';

import { renderCellValue } from '../ShowTable/constant';
import { useAppDispatch } from '@/lib/hooks';
import { CategoryUpdateInfo, UpdateUserInfo, UserInfo } from '@/types';
import { getUserById } from '@/services/usersServices';
import { getCategoryById } from '@/services/categoriesServices';
import { getContactById } from '@/services/contactsServices';

interface ResourceViewProps {
  opened: boolean;
  close: () => void;
  selectedId: string;
  resourceName: string;
}

function ResourceView({ opened, close, selectedId, resourceName }: ResourceViewProps) {
  const t = useTranslations();
  const dispatch = useAppDispatch();
  const isMobile = useMediaQuery('(max-width: 50em)');

  const [viewData, setViewData] = useState<UserInfo | null>(null);

  useEffect(() => {
    if (!selectedId || !resourceName) return;

    switch (resourceName) {
      case 'users':
        dispatch(getUserById({ userId: selectedId } as UpdateUserInfo)).then((result) => {
          if (result?.payload?.code === 200) {
            const filteredData = { ...result?.payload?.data };
            delete filteredData.__v;
            setViewData(filteredData);
          }
        });
        break;
      case 'categories':
        dispatch(getCategoryById({ categoryId: selectedId } as CategoryUpdateInfo)).then((result) => {
          if (result?.payload?.code === 200) {
            const filteredData = { ...result?.payload?.data };
            delete filteredData.__v;
            setViewData(filteredData);
          }
        });
        break;
      case 'contacts':
        dispatch(getContactById(selectedId)).then((result) => {
          if (result?.payload?.code === 200) {
            const filteredData = { ...result?.payload?.data };
            delete filteredData.__v;
            setViewData(filteredData);
          }
        });
        break;
      default:
        setViewData(null);
    }
  }, [dispatch, selectedId, resourceName]);

  return (
    <Modal
      size="70%"
      padding="xl"
      opened={opened}
      onClose={close}
      fullScreen={isMobile}
      title={<Title order={1}>{t('modal.view')}</Title>}
      overlayProps={{
        backgroundOpacity: 0.55,
        blur: 3,
      }}
      closeButtonProps={{
        icon: <IconX />,
        size: 'xl',
      }}
    >
      <Box>
        {viewData ? (
          <SimpleGrid cols={{ base: 1, sm: 2, lg: 2 }} spacing="lg">
            {Object.entries(viewData).map(([key]) => (
              <Group key={key}>
                <Text size="xl" fw={600}>
                  {t(`${resourceName}.${key}`)}:
                </Text>
                {renderCellValue(viewData, key, t)}
              </Group>
            ))}
          </SimpleGrid>
        ) : (
          <Group pt="lg" justify="center">
            <Loader size={50} color="var(--primary-bg)" />
          </Group>
        )}
      </Box>
    </Modal>
  );
}

export default ResourceView;
