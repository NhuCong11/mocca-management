/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMemo } from 'react';
import { useTranslations } from 'next-intl';
import { IconTrash, IconX } from '@tabler/icons-react';
import { Box, Button, Group, Modal, Text, Title } from '@mantine/core';

import { resourceServices } from './constant';
import { showToast, ToastType } from '@/utils/toastUtils';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';

interface ResourceDeleteProps {
  opened: boolean;
  close: () => void;
  selectedId?: string;
  resourceName: string;
  selectedIds: string[];
  handleDeleteSelected: () => void;
  onDeleteSuccess: (id: string) => void;
}

function ResourceDelete({
  opened,
  close,
  selectedId,
  resourceName,
  onDeleteSuccess,
  selectedIds,
  handleDeleteSelected,
}: ResourceDeleteProps) {
  const t = useTranslations();
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector((state) => {
    return (state as any)[resourceName]?.loading;
  });

  const fetchData = useMemo(() => resourceServices[resourceName], [resourceName]);

  const handleDelete = () => {
    if (!fetchData) return;

    if (selectedId) {
      const deletePromise = new Promise<string>(async (resolve, reject) => {
        try {
          const result = await dispatch(fetchData(selectedId)).unwrap();
          if (result?.code === 200) {
            onDeleteSuccess(selectedId);
            close();
            return resolve(t('modal.deleteSuccess'));
          }
          close();
          return reject(new Error(result?.message || t('system.error')));
        } catch (error) {
          return reject(error);
        }
      });
      showToast('', ToastType.PROMISE, deletePromise);
    } else if (selectedIds.length) {
      const deletePromises = selectedIds.map((id) => {
        return dispatch(fetchData(id))
          .unwrap()
          .then((result: any) => {
            if (result?.code === 200) {
              handleDeleteSelected();
              return t('modal.deleteSuccess');
            }
            throw new Error(result?.message || t('system.error'));
          });
      });

      const deleteAllPromise = Promise.allSettled(deletePromises).then((results) => {
        const hasError = results.some((res) => res?.status === 'rejected');
        close();
        return hasError
          ? Promise.reject(new Error(t('system.deleteError')))
          : Promise.resolve(t('modal.deleteSuccess'));
      });

      showToast('', ToastType.PROMISE, deleteAllPromise);
    }
  };

  return (
    <Modal
      size="lg"
      padding="xl"
      opened={opened}
      onClose={close}
      centered
      title={<Title order={1}>{t('modal.delete')}</Title>}
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
        <Text size="xl" fw={600} variant="gradient" gradient={{ from: 'cyan', to: 'teal', deg: 90 }}>
          {t('modal.confirm')}
        </Text>
        <Group mt="xl" gap="xl" justify="center">
          <Button size="xl" variant="light" color="orange" onClick={close} leftSection={<IconX size={18} />}>
            {t('button.btn06')}
          </Button>
          <Button
            size="xl"
            variant="gradient"
            disabled={isLoading}
            onClick={handleDelete}
            leftSection={<IconTrash size={18} />}
            gradient={{ from: 'red', to: 'grape', deg: 150 }}
          >
            {t('button.btn05')}
          </Button>
        </Group>
      </Box>
    </Modal>
  );
}

export default ResourceDelete;
