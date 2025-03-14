/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useMemo, useState } from 'react';
import { Formik, Form } from 'formik';
import { useTranslations } from 'next-intl';
import { useMediaQuery } from '@mantine/hooks';
import { Box, Modal, Title, Grid, Button, Group } from '@mantine/core';
import { IconDatabaseEdit, IconPlus, IconX } from '@tabler/icons-react';

import { getField } from './getField';
import validationSchema from './schema';
import { excludedFields, resourceCreateServices } from './constant';
import { showToast, ToastType } from '@/utils/toastUtils';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { getAllCategory } from '@/services/categoriesServices';
import { CategoryInfo } from '@/types';

interface ResourceEditProps {
  opened: boolean;
  close: () => void;
  selectedId: string;
  resourceName: string;
  action: 'create' | 'update';
  columns: string[];
  refresh: () => void;
}

function ResourceEdit({ opened, close, selectedId, resourceName, action, columns, refresh }: ResourceEditProps) {
  const t = useTranslations();
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector((state) => {
    return (state as any)[resourceName]?.loading;
  });
  const isMobile = useMediaQuery('(max-width: 50em)');
  const fetchCreateData = useMemo(() => resourceCreateServices[resourceName], [resourceName]);
  const filteredColumns = [
    ...columns.filter((col) => !excludedFields.includes(col)),
    ...(resourceName === 'users' ? ['password'] : []),
  ];
  const [categories, setCategories] = useState<CategoryInfo[]>([]);

  const handleCreate = (data: any) => {
    if (!fetchCreateData) return;

    if (data) {
      const createPromise = dispatch(fetchCreateData(data)).then((result: any) => {
        if (result?.payload?.code === 201) {
          close();
          refresh();
          return result?.payload?.message;
        } else {
          close();
          throw new Error(result?.payload?.message || t('system.error'));
        }
      });
      showToast('', ToastType.PROMISE, createPromise);
    }
  };

  useEffect(() => {
    if (resourceName === 'products') {
      dispatch(getAllCategory({ limit: 100, page: 1 })).then((result) => {
        if (result?.payload?.code === 200) {
          setCategories(result?.payload?.data?.categories);
        }
      });
    }
  }, [resourceName, dispatch]);

  return (
    <Modal
      size="70%"
      padding="xl"
      opened={opened}
      onClose={close}
      fullScreen={isMobile}
      title={<Title order={1}>{t(`modal.${action}`)}</Title>}
      overlayProps={{
        backgroundOpacity: 0.55,
        blur: 3,
      }}
      closeButtonProps={{
        icon: <IconX />,
        size: 'xl',
      }}
    >
      <Formik
        initialValues={filteredColumns.reduce((acc, col) => ({ ...acc, [col]: '' }), {})}
        validationSchema={validationSchema(t, resourceName)}
        onSubmit={(values) => {
          const formattedValues = Object.fromEntries(
            Object.entries(values).filter(([_, value]) => value !== '' && value !== undefined && value !== 'false'),
          );
          const { image, ...productData } = formattedValues;
          handleCreate(resourceName === 'products' ? { productData, image } : formattedValues);
        }}
      >
        {({ values, setFieldValue, errors, isValid, dirty }) => {
          return (
            <Form>
              <Box>
                {action === 'create' && (
                  <Grid gutter="xl">
                    {filteredColumns.map((col) => {
                      return (
                        <Grid.Col span={{ base: 12, md: 6 }} key={col}>
                          {getField({
                            column: col,
                            formData: values,
                            resourceName,
                            categories,
                            setFieldValue,
                            errors,
                            t,
                          })}
                        </Grid.Col>
                      );
                    })}
                  </Grid>
                )}

                <Group pt="xl" justify="center">
                  <Button size="xl" variant="light" color="orange" onClick={close} leftSection={<IconX size={18} />}>
                    {t('button.btn06')}
                  </Button>
                  <Button
                    size="xl"
                    type="submit"
                    variant="gradient"
                    disabled={!isValid || !dirty}
                    gradient={
                      action === 'create'
                        ? { from: 'teal', to: 'green', deg: 150 }
                        : { from: 'grape', to: 'violet', deg: 150 }
                    }
                    leftSection={action === 'create' ? <IconPlus size={18} /> : <IconDatabaseEdit size={18} />}
                  >
                    {t(`modal.${action}`)}
                  </Button>
                </Group>
              </Box>
            </Form>
          );
        }}
      </Formik>
    </Modal>
  );
}

export default ResourceEdit;
