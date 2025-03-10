'use client';
import { useEffect, useMemo, useState, useCallback } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { BarChart, DonutChart, LineChart } from '@mantine/charts';
import { Blockquote, Box, ComboboxItem, Grid, Group, Text, Title } from '@mantine/core';
import { IconCalendarTime, IconMessage, IconShoppingCart, IconTruckDelivery, IconUser } from '@tabler/icons-react';

import { UserInfo } from '@/types';
import SelectBox from '@/share/SelectBox';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { getVNCurrency } from '@/utils/constants';
import DateTimeDisplay from '@/utils/dateTimeFormat';
import { TIME_PERIODS, TimePeriod } from '@/constants';
import { getLocalStorageItem } from '@/utils/localStorage';
import { checkRoleAdmin, checkRoleShop } from '@/utils/checkRoleUtils';
import { getStatisticalData, getStatisticalPerformance, getStatisticalRevenue } from '@/services/dashboardServices';
import LoadingStart from '@/share/Loading';

interface StatisticalDataInfo {
  message: number;
  newUser: number;
  order: number;
  sales: number;
  statusOrder: Record<string, number>;
}

interface StatisticalRevenueItem {
  _id: string;
  totalRevenue: number;
}

export default function Home() {
  const t = useTranslations();
  const locale = useLocale();
  const dispatch = useAppDispatch();
  const userInfo: UserInfo | null = useMemo(() => getLocalStorageItem('user'), []);
  const isLoading = useAppSelector((state) => state.dashboard.loading);

  const timePeriods = useMemo(
    () => TIME_PERIODS.map((item) => ({ label: t(`dashboard.timePeriods.${item}`), value: item })),
    [t],
  );

  const [timePeriod, setTimePeriod] = useState<ComboboxItem>(timePeriods[0]);
  const [statisticalData, setStatisticalData] = useState<StatisticalDataInfo | null>(null);
  const [statisticalRevenue, setStatisticalRevenue] = useState<StatisticalRevenueItem[]>([]);
  const [statisticalPerformance, setStatisticalPerformance] = useState([]);

  const fetchData = useCallback(async () => {
    if (!timePeriod) return;

    const [dataRes, revenueRes, performanceRes] = await Promise.all([
      dispatch(getStatisticalData({ statisticalBy: timePeriod.value as TimePeriod })),
      dispatch(getStatisticalRevenue({ statisticalBy: timePeriod.value as TimePeriod })),
      dispatch(getStatisticalPerformance({ statisticalBy: timePeriod.value as TimePeriod })),
    ]);

    if (dataRes?.payload?.code === 200) setStatisticalData(dataRes.payload.data);
    if (revenueRes?.payload?.code === 200) setStatisticalRevenue(revenueRes.payload.data);
    if (performanceRes?.payload?.code === 200) setStatisticalPerformance(performanceRes.payload.data);
  }, [dispatch, timePeriod]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const statistics = useMemo(() => {
    if (!statisticalData) return [];
    return [
      {
        color: 'teal',
        icon: <IconShoppingCart />,
        value: getVNCurrency(statisticalData.sales),
        labelKey: 'dashboard.title02',
      },
      {
        color: 'cyan',
        icon: <IconUser />,
        value: statisticalData.newUser || 0,
        labelKey: 'dashboard.title03',
        hidden: checkRoleShop(userInfo?.role),
      },
      { color: 'lime', icon: <IconTruckDelivery />, value: statisticalData.order || 0, labelKey: 'dashboard.title04' },
      { color: 'orange', icon: <IconMessage />, value: statisticalData.message || 0, labelKey: 'dashboard.title05' },
    ].filter((stat) => !stat.hidden);
  }, [statisticalData, userInfo]);

  const statusOrderData = useMemo(() => {
    const statusMap = ['pending', 'canceled', 'confirmed', 'reject', 'shipping', 'success'];
    const colors = ['indigo.6', 'gray.6', 'teal.6', 'red.6', 'orange.6', 'green.6'];
    return statusMap.map((status, index) => ({
      name: t(`orderStatus.${status}`),
      value: statisticalData?.statusOrder?.[status] || 0,
      color: colors[index],
    }));
  }, [statisticalData, t]);

  const allOrderStatusEmpty = useMemo(() => statusOrderData.every((item) => item.value === 0), [statusOrderData]);

  const performanceKey = useMemo(() => {
    const mapping: Record<string, string> = {
      [TimePeriod.Month]: 'date',
      [TimePeriod.Week]: 'day',
      [TimePeriod.Quarter]: 'quarter',
      [TimePeriod.Year]: 'month',
    };
    return mapping[timePeriod.value] || 'day';
  }, [timePeriod]);

  return (
    <Box p="xl" bg="var(--content-bg)">
      <Group pb={10}>
        <Title order={1} c="var(--primary-bg)">
          {t('dashboard.title01')}
        </Title>
      </Group>
      <DateTimeDisplay lang={locale} />

      <Group mt="lg" justify="flex-end">
        <SelectBox
          required
          notNull
          data={timePeriods}
          value={timePeriod}
          onChange={setTimePeriod}
          label={t('dashboard.statisticsTime')}
          leftIcon={<IconCalendarTime size={20} />}
        />
      </Group>

      <Grid mt="xl" gutter="xl">
        {statistics.map((stat, index) => (
          <Grid.Col key={index} span={{ base: 12, md: 6, lg: 3 }}>
            <Blockquote color={stat.color} radius="sm" iconSize={40} icon={stat.icon} mt="xl">
              <Title order={4} size="h1" mb={10}>
                {stat.value}
              </Title>
              <Title order={2}>{t(stat.labelKey)}</Title>
            </Blockquote>
          </Grid.Col>
        ))}
      </Grid>

      <Grid mt="xl" p="lg" gutter="xl">
        <Grid.Col span={{ base: 12, md: 12, lg: 9 }}>
          {checkRoleAdmin(userInfo?.role) && (
            <Group>
              <Text size="xl" fw={600} c="violet">
                {t('dashboard.title07')}
              </Text>
              <LineChart
                h={300}
                withLegend
                dataKey={performanceKey}
                data={statisticalPerformance}
                series={[
                  { name: 'totalAccess', color: 'yellow.6' },
                  { name: 'totalOrder', color: 'lime.6' },
                ]}
              />
            </Group>
          )}

          <Group mt={80}>
            <Text size="xl" fw={600} c="teal">
              {t('dashboard.title08')}
            </Text>
            <BarChart
              h={300}
              withLegend
              dataKey="_id"
              data={statisticalRevenue}
              series={[{ name: 'totalRevenue', color: 'teal.6' }]}
            />
          </Group>
        </Grid.Col>

        {checkRoleShop(userInfo?.role) && (
          <Grid.Col span={{ base: 12, md: 12, lg: 3 }}>
            <Box mt="xl">
              <Group justify="center">
                <Text size="xl" fw={600} c="lime">
                  {t('dashboard.title06')}
                </Text>
                {allOrderStatusEmpty && (
                  <Text size="xl" fs="italic">
                    {t('nothingFoundMessage')}
                  </Text>
                )}
              </Group>
              <DonutChart
                withLabels
                thickness={15}
                withLabelsLine
                labelsType="percent"
                data={statusOrderData}
                style={{ width: '100%', height: '200px', fontSize: '1.6rem' }}
              />
            </Box>
          </Grid.Col>
        )}
      </Grid>
      {isLoading && <LoadingStart />}
    </Box>
  );
}
