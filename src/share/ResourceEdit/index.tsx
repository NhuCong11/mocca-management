/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useMemo, useState } from 'react';
import { Formik, Form, FormikProps } from 'formik';
import { useTranslations } from 'next-intl';
import { useMediaQuery } from '@mantine/hooks';
import { Box, Modal, Title, Grid, Button, Group, Loader } from '@mantine/core';
import { IconDatabaseEdit, IconPlus, IconX } from '@tabler/icons-react';

import { getField } from './getField';
import validationSchema from './schema';
import { excludedFields, resourceCreateServices, resourceGetServices, resourceUpdateServices } from './constant';
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
  refresh?: () => void;
}

function ResourceEdit({ opened, close, selectedId, resourceName, action, columns, refresh }: ResourceEditProps) {
  const t = useTranslations();
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector((state) => {
    return (state as any)[resourceName]?.loading;
  });
  const isMobile = useMediaQuery('(max-width: 50em)');
  const fetchCreateData = useMemo(() => resourceCreateServices[resourceName], [resourceName]);
  const fetchGetData = useMemo(() => resourceGetServices[resourceName], [resourceName]);
  const fetchUpdateData = useMemo(() => resourceUpdateServices[resourceName], [resourceName]);
  const filteredColumns = [
    ...columns.filter((col) => !excludedFields.includes(col) && !(action === 'update' && col === 'is2FA')),
    ...(resourceName === 'users' && action !== 'update' ? ['password'] : []),
  ];
  const [categories, setCategories] = useState<CategoryInfo[]>([]);
  const [initialValues, setInitialValues] = useState<Record<string, string | number | boolean | File | string[]>>({});

  const handleCreate = (data: any) => {
    if (!fetchCreateData) return;

    if (data) {
      const createPromise = dispatch(fetchCreateData(data)).then((result: any) => {
        if (result?.payload?.code === 201) {
          close();
          refresh?.();
          return result?.payload?.message;
        } else {
          close();
          throw new Error(result?.payload?.message || t('system.error'));
        }
      });
      showToast('', ToastType.PROMISE, createPromise);
    }
  };

  const handleUpdate = (id: string, data: any) => {
    if (!fetchUpdateData) return;

    if (data) {
      const createPromise = dispatch(fetchUpdateData(id, data)).then((result: any) => {
        if (result?.payload?.code === 200) {
          close();
          refresh?.();
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

  useEffect(() => {
    if (!selectedId || !fetchGetData || action !== 'update') return;

    dispatch(fetchGetData(selectedId)).then((result: any) => {
      if (result?.payload?.code === 200) {
        const filteredData = { ...result?.payload?.data };
        delete filteredData.__v;
        setInitialValues(filteredData as Record<string, string | number | boolean | File>);
      } else {
        showToast(result?.payload?.message, ToastType.ERROR);
        close();
      }
    });
  }, [dispatch, selectedId, fetchGetData, close, action]);

  const FormComponent = ({ formik }: { formik: FormikProps<typeof initialValues> }) => {
    const { values, setValues } = formik;

    useEffect(() => {
      if (initialValues && action === 'update') {
        const filteredValues = Object.fromEntries(
          Object.entries(initialValues).filter(([key]) => filteredColumns.includes(key)),
        );

        if (
          typeof filteredValues.category === 'object' &&
          filteredValues.category !== null &&
          '_id' in filteredValues.category
        ) {
          filteredValues.category = (filteredValues.category as { _id: string })._id;
        }

        setValues(filteredValues);
      }
    }, [setValues]);

    return (
      <Form>
        <Box>
          <Grid gutter="xl">
            {!isLoading ? (
              filteredColumns.map((col) => (
                <Grid.Col span={{ base: 12, md: 6 }} key={col}>
                  {getField({
                    column: col,
                    formData: values,
                    resourceName,
                    categories,
                    setFieldValue: formik.setFieldValue,
                    errors: Object.fromEntries(
                      Object.entries(formik.errors).filter(([_, value]) => typeof value === 'string'),
                    ) as Record<string, string>,
                    action,
                    t,
                  })}
                </Grid.Col>
              ))
            ) : (
              <Grid.Col span={{ base: 12 }}>
                <Group justify="center" p="xl">
                  <Loader size={50} color="var(--primary-bg)" />
                </Group>
              </Grid.Col>
            )}
          </Grid>

          <Group pt="xl" justify="center">
            <Button size="xl" variant="light" color="orange" onClick={close} leftSection={<IconX size={18} />}>
              {t('button.btn06')}
            </Button>
            <Button
              size="xl"
              type="submit"
              variant="gradient"
              disabled={!formik.isValid || !formik.dirty}
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
  };

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
        enableReinitialize
        initialValues={filteredColumns.reduce((acc, col) => ({ ...acc, [col]: '' }), {})}
        validationSchema={validationSchema(t, resourceName, action)}
        onSubmit={(values) => {
          const formattedValues = Object.fromEntries(
            Object.entries(values)
              .filter(
                ([_, value]) => value !== '' && value !== undefined && String(value) !== 'false' && value !== false,
              )
              .map(([key, value]) => [key, typeof value === 'boolean' ? String(value) : value]),
          );

          const { image, ...productData } = formattedValues;
          if (action === 'create') {
            handleCreate(resourceName === 'products' ? { productData, image } : formattedValues);
          } else {
            handleUpdate(selectedId, formattedValues);
          }
        }}
      >
        {(formik) => {
          return <FormComponent formik={formik} />;
        }}
      </Formik>
    </Modal>
  );
}

export default ResourceEdit;
