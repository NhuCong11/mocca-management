/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { useState, useMemo } from 'react';
import { Table, Text, ActionIcon, Group, Skeleton, Box, Title, Button } from '@mantine/core';
import {
  IconArrowUp,
  IconArrowDown,
  IconArrowsSort,
  IconEdit,
  IconEye,
  IconTrash,
  IconPlus,
} from '@tabler/icons-react';
import CustomCheckbox from '../CustomCheckbox';
import AppPagination from '@/components/AppPagination';
import { useTranslations } from 'next-intl';

interface ShowTableProps<T> {
  data: T[];
  tableName: string;
  isLoading?: boolean;
}

function ShowTable<T extends Record<string, any>>({ data, tableName, isLoading = false }: ShowTableProps<T>) {
  const t = useTranslations();

  const [tableData, setTableData] = useState(data);
  const [sortConfig, setSortConfig] = useState<{ key: keyof T | null; direction: 'asc' | 'desc' | null }>({
    key: null,
    direction: null,
  });
  const [selectedRows, setSelectedRows] = useState<Set<number>>(new Set());

  const columns = useMemo(() => (data.length ? Object.keys(data[0]) : []), [data]);

  const getColumnAlignment = (key: keyof T) => {
    const sampleValue = tableData[0]?.[key];
    if (typeof sampleValue === 'number') return 'right';
    if (!isNaN(Date.parse(sampleValue as string))) return 'center';
    return 'left';
  };

  const handleSort = (key: keyof T) => {
    const newDirection = sortConfig.key === key && sortConfig.direction === 'asc' ? 'desc' : 'asc';
    const sortedData = [...tableData].sort((a, b) => {
      const aValue = a[key];
      const bValue = b[key];

      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return newDirection === 'asc' ? aValue - bValue : bValue - aValue;
      }
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return newDirection === 'asc' ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
      }
      return 0;
    });

    setTableData(sortedData);
    setSortConfig({ key, direction: newDirection });
  };

  const renderSortIcon = (key: keyof T) => {
    if (sortConfig.key !== key) return <IconArrowsSort size={18} color="teal" />;
    return sortConfig.direction === 'asc' ? (
      <IconArrowUp size={18} color="teal" />
    ) : (
      <IconArrowDown size={18} color="teal" />
    );
  };

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
    setTableData((prev) => prev.filter((_, index) => !selectedRows.has(index)));
    setSelectedRows(new Set());
  };

  const Header = () => (
    <Group mb="lg" justify="space-between">
      <Title order={2}>{tableName}</Title>
    </Group>
  );

  const TableHead = () => (
    <Table.Tr>
      <Table.Th />
      <Table.Th />
      {columns.map((key) => (
        <Table.Th key={key} miw={200}>
          <Group gap="lg">
            <Text size="xl" fw={600}>
              {key.charAt(0).toUpperCase() + key.slice(1)}
            </Text>
            <ActionIcon size={35} variant="transparent" onClick={() => handleSort(key)}>
              {renderSortIcon(key)}
            </ActionIcon>
          </Group>
        </Table.Th>
      ))}
    </Table.Tr>
  );

  const SkeletonRows = () =>
    Array.from({ length: data.length }).map((_, rowIndex) => (
      <Table.Tr key={`skeleton-row-${rowIndex}`}>
        <Table.Td>
          <Skeleton height={40} width={40} radius="md" />
        </Table.Td>
        <Table.Td>
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

  const ActionButtons = () => (
    <Group p="0 10px">
      <ActionIcon size={45} variant="light" color="violet">
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

  const TableFooter = () => (
    <Group justify="space-between" mt="xl">
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
      </Group>
      <AppPagination total={10} />
    </Group>
  );

  return (
    <Box>
      <Header />
      <Table.ScrollContainer minWidth={300} h={500}>
        <Table verticalSpacing="sm" striped highlightOnHover withColumnBorders withRowBorders={false} withTableBorder>
          <Table.Thead>
            <TableHead />
          </Table.Thead>
          <Table.Tbody>
            {isLoading ? (
              <SkeletonRows />
            ) : (
              tableData.map((row, index) => (
                <Table.Tr key={index}>
                  <Table.Td>
                    <CustomCheckbox checked={selectedRows.has(index)} onChange={() => handleCheckboxChange(index)} />
                  </Table.Td>
                  <Table.Td>
                    <ActionButtons />
                  </Table.Td>
                  {columns.map((key) => (
                    <Table.Td key={key} ta={getColumnAlignment(key)}>
                      <Text size="lg">{row[key]}</Text>
                    </Table.Td>
                  ))}
                </Table.Tr>
              ))
            )}
          </Table.Tbody>
        </Table>
      </Table.ScrollContainer>
      <TableFooter />
    </Box>
  );
}

export default ShowTable;
