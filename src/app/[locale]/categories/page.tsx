'use client';
import { useCallback, useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { Box, ComboboxItem, Group, Title } from '@mantine/core';
import { IconCategory } from '@tabler/icons-react';

import { CategoryInfo } from '@/types';
import ShowTable from '@/share/ShowTable';
import LoadingStart from '@/share/Loading';
import { linesOnThePage } from '@/constants';
import { useQueryParams } from '@/hooks/useQueryParams';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { getAllCategory } from '@/services/categoriesServices';

function Categories() {
  const t = useTranslations();
  const dispatch = useAppDispatch();
  const { getParam, updateParams } = useQueryParams();
  const pageParam = Number(getParam('page')) || 1;
  const isLoading = useAppSelector((state) => state.categories.loading);

  const [listCategories, setCategories] = useState<CategoryInfo[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  const [numberLines, setNumberLines] = useState<ComboboxItem | null>(linesOnThePage[2] as ComboboxItem);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleChangeNumberLines = (value: ComboboxItem) => {
    setNumberLines(value);
  };

  const fetchAllCategories = useCallback(
    (page: number, numberLines: number) => {
      dispatch(getAllCategory({ limit: numberLines, page })).then((result) => {
        if (result?.payload?.code === 200) {
          setCategories(result.payload.data.categories);
          setTotalPages(result.payload.data.totalPage);
        }
      });
    },
    [dispatch],
  );

  const refreshData = () => {
    setCategories([]);
    setRefreshTrigger((prev) => prev + 1);
    updateParams({ page: '1' });
    fetchAllCategories(pageParam, Number(numberLines?.value));
  };

  useEffect(() => {
    fetchAllCategories(pageParam, Number(numberLines?.value));
  }, [pageParam, fetchAllCategories, numberLines, refreshTrigger]);

  return (
    <Box p="xl">
      <Group pb={10}>
        <IconCategory size={25} color="var(--primary-bg)" />
        <Title order={1} c="var(--primary-bg)">
          {t('sidebar.categories')}
        </Title>
      </Group>
      <Box mt="xl" p="lg">
        <ShowTable
          data={listCategories}
          translate="categories"
          isLoading={isLoading}
          totalPages={totalPages}
          tableName={t('sidebar.categories')}
          refresh={refreshData}
          numberLines={numberLines}
          changeLines={handleChangeNumberLines}
          filterFields={['name']}
        />
      </Box>
      {isLoading && <LoadingStart />}
    </Box>
  );
}

export default Categories;
