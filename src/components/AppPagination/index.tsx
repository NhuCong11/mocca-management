/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { Group, Pagination } from '@mantine/core';
import {
  IconChevronCompactLeft,
  IconChevronCompactRight,
  IconChevronLeftPipe,
  IconChevronRightPipe,
  IconGripHorizontal,
} from '@tabler/icons-react';
import { useQueryParams } from '@/hooks/useQueryParams';

interface AppPaginationProps {
  total: number;
}

function AppPagination({ total }: AppPaginationProps) {
  const { getParam, updateParams } = useQueryParams();
  const pageParam = getParam('page');
  const initialPage = pageParam && !isNaN(Number(pageParam)) ? Number(pageParam) : 1;
  const [activePage, setActivePage] = useState(initialPage);

  useEffect(() => {
    if (!pageParam) {
      updateParams({ page: '1' });
    } else {
      const pageNumber = Number(pageParam);
      if (!isNaN(pageNumber) && pageNumber !== activePage) {
        setActivePage(pageNumber);
      }
    }
  }, [pageParam]);

  useEffect(() => {
    if (String(activePage) !== pageParam) {
      updateParams({ page: String(activePage) });
    }
  }, [activePage]);

  if (total < 1) return null;

  return (
    <Group justify="flex-end">
      <Pagination
        size="lg"
        value={activePage}
        onChange={setActivePage}
        total={total}
        withEdges
        autoContrast
        siblings={1}
        color="var(--primary-bg)"
        nextIcon={IconChevronCompactRight}
        previousIcon={IconChevronCompactLeft}
        firstIcon={IconChevronLeftPipe}
        lastIcon={IconChevronRightPipe}
        dotsIcon={IconGripHorizontal}
      />
    </Group>
  );
}

export default AppPagination;
