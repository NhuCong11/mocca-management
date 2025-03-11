'use client';
import { useCallback, useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { Box, ComboboxItem, Group, Title } from '@mantine/core';
import { IconUser } from '@tabler/icons-react';

import { UserInfo } from '@/types';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { getAllUser } from '@/services/usersServices';
import ShowTable from '@/share/ShowTable';
import { useQueryParams } from '@/hooks/useQueryParams';
import LoadingStart from '@/share/Loading';
import { linesOnThePage } from '@/constants';

function Users() {
  const t = useTranslations();
  const dispatch = useAppDispatch();
  const { getParam } = useQueryParams();
  const pageParam = Number(getParam('page')) || 1;
  const isLoading = useAppSelector((state) => state.users.loading);

  const [listUsers, setListUsers] = useState<UserInfo[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  const [numberLines, setNumberLines] = useState<ComboboxItem | null>(linesOnThePage[2] as ComboboxItem);

  const handleChangeNumberLines = (value: ComboboxItem) => {
    setNumberLines(value);
  };

  const fetchAllUsers = useCallback(
    (page: number, numberLines: number) => {
      dispatch(getAllUser({ limit: numberLines, page })).then((result) => {
        if (result?.payload?.code === 200) {
          const excludedFields: (keyof UserInfo)[] = [
            '_id',
            'accountBalance',
            'normalizedEmail',
            'forgotStatus',
            'background',
            'secret',
            'lastActive',
            'isLocked',
            'slug',
            'verifyExpireAt',
          ];
          const filteredUsers = result.payload.data.users.map((user: UserInfo) => {
            return Object.fromEntries(
              Object.entries(user).filter(([key]) => !excludedFields.includes(key as keyof UserInfo)),
            ) as Partial<UserInfo>;
          });
          setListUsers(filteredUsers);
          setTotalPages(result.payload.data.totalPage);
        }
      });
    },
    [dispatch],
  );

  useEffect(() => {
    fetchAllUsers(pageParam, Number(numberLines?.value));
  }, [pageParam, fetchAllUsers, numberLines]);

  return (
    <Box p="xl">
      <Group pb={10}>
        <IconUser size={25} color="var(--primary-bg)" />
        <Title order={1} c="var(--primary-bg)">
          {t('sidebar.users')}
        </Title>
      </Group>
      <Box mt="xl" p="lg">
        <ShowTable
          data={listUsers}
          translate="users"
          isLoading={isLoading}
          totalPages={totalPages}
          tableName={t('sidebar.users')}
          numberLines={numberLines}
          changeLines={handleChangeNumberLines}
        />
      </Box>
      {isLoading && <LoadingStart />}
    </Box>
  );
}

export default Users;
