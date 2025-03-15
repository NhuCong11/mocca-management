'use client';
import { useCallback, useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { Box, ComboboxItem, Group, Title } from '@mantine/core';
import { IconAddressBook } from '@tabler/icons-react';

import { ContactInfo } from '@/types';
import ShowTable from '@/share/ShowTable';
import LoadingStart from '@/share/Loading';
import { linesOnThePage } from '@/constants';
import { useQueryParams } from '@/hooks/useQueryParams';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { getAllContacts } from '@/services/contactsServices';

function Contacts() {
  const t = useTranslations();
  const dispatch = useAppDispatch();
  const { getParam } = useQueryParams();
  const pageParam = Number(getParam('page')) || 1;
  const isLoading = useAppSelector((state) => state.contacts.loading);

  const [listContacts, setContacts] = useState<ContactInfo[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  const [numberLines, setNumberLines] = useState<ComboboxItem | null>(linesOnThePage[2] as ComboboxItem);

  const handleChangeNumberLines = (value: ComboboxItem) => {
    setNumberLines(value);
  };

  const fetchAllContacts = useCallback(
    (page: number, numberLines: number) => {
      dispatch(getAllContacts({ limit: numberLines, page })).then((result) => {
        if (result?.payload?.code === 200) {
          setContacts(result.payload.data.contacts);
          setTotalPages(result.payload.data.totalPage);
        }
      });
    },
    [dispatch],
  );

  const refreshData = () => {
    setContacts([]);
    setNumberLines(null);
    setNumberLines(linesOnThePage[2] as ComboboxItem);
    fetchAllContacts(pageParam, Number(numberLines?.value));
  };

  useEffect(() => {
    fetchAllContacts(pageParam, Number(numberLines?.value));
  }, [pageParam, fetchAllContacts, numberLines]);

  return (
    <Box p="xl">
      <Group pb={10}>
        <IconAddressBook size={25} color="var(--primary-bg)" />
        <Title order={1} c="var(--primary-bg)">
          {t('sidebar.contacts')}
        </Title>
      </Group>
      <Box mt="xl" p="lg">
        <ShowTable
          data={listContacts}
          translate="contacts"
          isLoading={isLoading}
          totalPages={totalPages}
          tableName={t('sidebar.contacts')}
          numberLines={numberLines}
          changeLines={handleChangeNumberLines}
          filterFields={['fullname', 'email', 'phone']}
          refresh={refreshData}
        />
      </Box>
      {isLoading && <LoadingStart />}
    </Box>
  );
}

export default Contacts;
