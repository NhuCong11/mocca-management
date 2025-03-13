/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState, useMemo } from 'react';
import { useMediaQuery } from '@mantine/hooks';
import { Box, Modal, Title, Text, SimpleGrid, Group, Loader } from '@mantine/core';
import { useTranslations } from 'next-intl';
import { IconX } from '@tabler/icons-react';

import { renderCellValue } from '../ShowTable/constant';
import { useAppDispatch } from '@/lib/hooks';
import { UpdateUserInfo, CategoryUpdateInfo, UserInfo, ContactInfo, ProductInfo } from '@/types';
import { getUserById } from '@/services/usersServices';
import { getCategoryById } from '@/services/categoriesServices';
import { getContactById } from '@/services/contactsServices';
import { getProductById } from '@/services/productsServices';
import { showToast, ToastType } from '@/utils/toastUtils';

interface ResourceViewProps {
  opened: boolean;
  close: () => void;
  selectedId: string;
  resourceName: string;
}

type ResourceDataType = UserInfo | CategoryUpdateInfo | ContactInfo | ProductInfo;

const resourceServices: Record<string, (id: string) => any> = {
  users: (id) => getUserById({ userId: id } as UpdateUserInfo),
  categories: (id) => getCategoryById({ categoryId: id } as CategoryUpdateInfo),
  contacts: (id) => getContactById(id),
  products: (id) => getProductById({ productId: id }),
};

function ResourceView({ opened, close, selectedId, resourceName }: ResourceViewProps) {
  const t = useTranslations();
  const dispatch = useAppDispatch();
  const isMobile = useMediaQuery('(max-width: 50em)');
  const [viewData, setViewData] = useState<ResourceDataType | null>(null);

  const fetchData = useMemo(() => resourceServices[resourceName], [resourceName]);

  useEffect(() => {
    if (!selectedId || !fetchData) return;

    dispatch(fetchData(selectedId)).then((result: any) => {
      if (result?.payload?.code === 200) {
        const filteredData = { ...result?.payload?.data };
        delete filteredData.__v;
        setViewData(filteredData);
      } else {
        showToast(result?.payload?.message, ToastType.ERROR);
        close();
      }
    });
  }, [dispatch, selectedId, fetchData, close]);

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
          <SimpleGrid cols={{ base: 1, sm: 2, lg: 2 }} spacing="xl">
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
