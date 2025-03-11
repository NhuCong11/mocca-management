/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { useState, useMemo, useEffect, useRef } from 'react';
import {
  Table,
  Text,
  ActionIcon,
  Group,
  Skeleton,
  Box,
  Title,
  Button,
  Anchor,
  TextInput,
  ComboboxItem,
} from '@mantine/core';
import { IconEdit, IconEye, IconTrash, IconPlus, IconDownload } from '@tabler/icons-react';
import CustomCheckbox from '../CustomCheckbox';
import AppPagination from '@/components/AppPagination';
import { useTranslations } from 'next-intl';
import { handleExportFile } from '@/utils/constants';
import SelectBox from '../SelectBox';
import { excludedFields, NOT_SORT, renderCellValue, renderSortIcon, rolesSelect } from './constant';
import { linesOnThePage } from '@/constants';
import { useDisclosure } from '@mantine/hooks';
import ResourceView from '../ResourceView';

interface ShowTableProps<T> {
  data: T[];
  tableName?: string;
  isLoading?: boolean;
  translate: string;
  totalPages: number;
  numberLines: ComboboxItem | null;
  changeLines: (value: ComboboxItem) => void;
}

function ShowTable<T extends Record<string, any>>({
  data,
  tableName,
  isLoading = false,
  translate,
  totalPages,
  numberLines,
  changeLines,
}: ShowTableProps<T>) {
  const t = useTranslations();

  const [tableData, setTableData] = useState(data);
  const [sortConfig, setSortConfig] = useState<{ key: keyof T | null; direction: 'asc' | 'desc' | null }>({
    key: null,
    direction: null,
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRows, setSelectedRows] = useState<Set<number>>(new Set());
  const [selectedRole, setSelectedRole] = useState<ComboboxItem | null>(null);
  const searchInputRef = useRef<HTMLInputElement | null>(null);
  const [selectedId, setSelectedId] = useState('');
  const [openedView, { open: openView, close: closeView }] = useDisclosure(false);

  const columns = useMemo(() => {
    if (!data.length) return [];
    return Object.keys(data[0]).filter((key) => !excludedFields.includes(key));
  }, [data]);

  const handleCheckboxChange = (index: number) => {
    setSelectedRows((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(index)) {
        newSet.delete(index);
      } else {
        newSet.add(index);
      }
      return newSet;
    });
  };

  const handleDeleteSelected = () => {
    setTableData((prevData) => prevData.filter((_, index) => !selectedRows.has(index)));
    setSelectedRows(new Set());
  };

  const filteredData = useMemo(() => {
    return tableData.filter(
      (item) =>
        (selectedRole ? item.role.toLowerCase() === selectedRole.value.toLowerCase() : true) &&
        (item.fullname.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.role.toLowerCase().includes(searchQuery.toLowerCase())),
    );
  }, [tableData, searchQuery, selectedRole]);

  const handleRoleChange = (value: ComboboxItem) => {
    setSelectedRole(value);
  };

  const handleSort = (key: keyof T) => {
    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc',
    }));
  };

  const sortedData = useMemo(() => {
    if (!sortConfig.key) return filteredData;
    const key = sortConfig.key as keyof T;
    return [...filteredData].sort((a, b) => {
      const aValue = a[key] as string | number | null | undefined;
      const bValue = b[key] as string | number | null | undefined;
      if (aValue == null || bValue == null) return 0;
      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return sortConfig.direction === 'asc' ? aValue - bValue : bValue - aValue;
      }
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return sortConfig.direction === 'asc' ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
      }
      return 0;
    });
  }, [filteredData, sortConfig]);

  const Header = () => (
    <Group mb="lg" justify="space-between">
      <Title order={2}>{tableName}</Title>
      <Group>
        <SelectBox
          label={t('users.role')}
          data={rolesSelect}
          value={selectedRole}
          onChange={(value) => handleRoleChange(value)}
        />
        <TextInput
          ref={searchInputRef}
          miw={500}
          size="xl"
          label={t('form.tp03')}
          placeholder={t('form.tp03')}
          value={searchQuery}
          onChange={(event) => setSearchQuery(event.currentTarget.value)}
        />
      </Group>
    </Group>
  );

  const TableHead = () => (
    <Table.Tr>
      <Table.Th />
      <Table.Th />
      {columns.map((key) => (
        <Table.Th key={key} miw={300}>
          <Group gap="lg" justify="center">
            <Text size="xl" fw={600} ta="center">
              {t(`${translate}.${key}`)}
            </Text>
            {!NOT_SORT.includes(key) && (
              <ActionIcon size={35} variant="transparent" onClick={() => handleSort(key)}>
                {renderSortIcon(key, sortConfig)}
              </ActionIcon>
            )}
          </Group>
        </Table.Th>
      ))}
    </Table.Tr>
  );

  const SkeletonRows = () =>
    Array.from({ length: data.length }).map((_, rowIndex) => (
      <Table.Tr key={`skeleton-row-${rowIndex}`}>
        <Table.Td miw={100}>
          <Skeleton height={40} width={40} radius="md" />
        </Table.Td>
        <Table.Td miw={250}>
          <Group>
            <Skeleton height={40} width={40} radius="md" />
            <Skeleton height={40} width={40} radius="md" />
            <Skeleton height={40} width={40} radius="md" />
          </Group>
        </Table.Td>
        {columns.map((_, colIndex) => (
          <Table.Td key={`skeleton-col-${colIndex}`}>
            <Skeleton height={20} width="100%" />
          </Table.Td>
        ))}
      </Table.Tr>
    ));

  const ActionButtons = (row: Record<string, any>) => {
    const handleView = () => {
      setSelectedId(row?.rowData?._id ?? '');
      openView();
    };

    return (
      <Group p="0 10px" justify="center">
        <ActionIcon size={45} variant="light" color="violet" onClick={handleView}>
          <IconEye size={18} />
        </ActionIcon>
        <ActionIcon size={45} variant="light" color="teal">
          <IconEdit size={18} />
        </ActionIcon>
        <ActionIcon size={45} variant="light" color="red">
          <IconTrash size={18} />
        </ActionIcon>
      </Group>
    );
  };

  const TableFooter = () => (
    <Group justify="space-between" mt="xl" gap={50}>
      <Group>
        <Button
          size="lg"
          variant="gradient"
          leftSection={<IconPlus size={15} />}
          gradient={{ from: 'teal', to: 'green', deg: 150 }}
        >
          {t('button.btn02')}
        </Button>
        {selectedRows.size > 0 && (
          <Button
            size="lg"
            variant="gradient"
            onClick={handleDeleteSelected}
            gradient={{ from: 'red', to: 'grape', deg: 150 }}
          >
            {t('button.btn03')}
          </Button>
        )}
        <Anchor href={handleExportFile(searchQuery || String(selectedRole?.value ?? ''), translate)} target="_blank">
          <Button
            size="lg"
            variant="gradient"
            leftSection={<IconDownload size={15} />}
            gradient={{ from: 'yellow', to: 'orange', deg: 150 }}
          >
            {t('button.btn04')}
          </Button>
        </Anchor>
      </Group>
      <Group gap="lg">
        <Group>
          <Text size="lg">{t('lines')}</Text>
          <SelectBox notNull size="md" maw={100} data={linesOnThePage} value={numberLines} onChange={changeLines} />
        </Group>
        <AppPagination total={totalPages} />
      </Group>
    </Group>
  );

  useEffect(() => {
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [searchQuery]);

  useEffect(() => {
    setTableData(data);
  }, [data]);

  return (
    <Box>
      <Header />
      <Table.ScrollContainer minWidth={300} h="50vh">
        <Table verticalSpacing="sm" striped highlightOnHover withColumnBorders withRowBorders={false} withTableBorder>
          <Table.Thead>
            <TableHead />
          </Table.Thead>
          <Table.Tbody>
            {isLoading ? (
              <SkeletonRows />
            ) : (
              sortedData.map((row, index) => (
                <Table.Tr key={index}>
                  <Table.Td miw={100}>
                    <Group justify="center">
                      <CustomCheckbox checked={selectedRows.has(index)} onChange={() => handleCheckboxChange(index)} />
                    </Group>
                  </Table.Td>
                  <Table.Td miw={250}>
                    <ActionButtons rowData={row} />
                  </Table.Td>
                  {columns.map((key) => (
                    <Table.Td key={key} ta="center">
                      {renderCellValue(row, key, t)}
                    </Table.Td>
                  ))}
                </Table.Tr>
              ))
            )}
          </Table.Tbody>
        </Table>
      </Table.ScrollContainer>
      <TableFooter />

      {openedView && (
        <ResourceView close={closeView} opened={openedView} selectedId={selectedId} resourceName={translate} />
      )}
    </Box>
  );
}

export default ShowTable;
