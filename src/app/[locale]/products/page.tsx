'use client';
import { useCallback, useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { Box, ComboboxItem, Group, Title } from '@mantine/core';
import { IconAddressBook } from '@tabler/icons-react';

import { ProductInfo } from '@/types';
import ShowTable from '@/share/ShowTable';
import LoadingStart from '@/share/Loading';
import { linesOnThePage } from '@/constants';
import { useQueryParams } from '@/hooks/useQueryParams';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { getAllProduct } from '@/services/productsServices';

function Products() {
  const t = useTranslations();
  const dispatch = useAppDispatch();
  const { getParam, updateParams } = useQueryParams();
  const pageParam = Number(getParam('page')) || 1;
  const isLoading = useAppSelector((state) => state.products.loading);

  const [listProducts, setProducts] = useState<ProductInfo[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  const [numberLines, setNumberLines] = useState<ComboboxItem | null>(linesOnThePage[2] as ComboboxItem);

  const handleChangeNumberLines = (value: ComboboxItem) => {
    setNumberLines(value);
  };

  const fetchAllProducts = useCallback(
    (page: number, numberLines: number) => {
      dispatch(getAllProduct({ limit: numberLines, page })).then((result) => {
        if (result?.payload?.code === 200) {
          setProducts(result.payload.data.products);
          setTotalPages(result.payload.data.totalPage);
        }
      });
    },
    [dispatch],
  );

  const refreshData = () => {
    fetchAllProducts(1, Number(numberLines?.value));
    updateParams({ page: '1' });
  };

  useEffect(() => {
    fetchAllProducts(pageParam, Number(numberLines?.value));
  }, [pageParam, fetchAllProducts, numberLines]);

  return (
    <Box p="xl">
      <Group pb={10}>
        <IconAddressBook size={25} color="var(--primary-bg)" />
        <Title order={1} c="var(--primary-bg)">
          {t('sidebar.products')}
        </Title>
      </Group>
      <Box mt="xl" p="lg">
        <ShowTable
          data={listProducts}
          translate="products"
          isLoading={isLoading}
          totalPages={totalPages}
          tableName={t('sidebar.products')}
          numberLines={numberLines}
          refresh={refreshData}
          changeLines={handleChangeNumberLines}
          filterFields={['name']}
        />
      </Box>
      {isLoading && <LoadingStart />}
    </Box>
  );
}

export default Products;
