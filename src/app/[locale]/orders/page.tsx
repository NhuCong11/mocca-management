'use client';
import { useCallback, useEffect, useState } from 'react';
import clsx from 'clsx';
import { useTranslations } from 'next-intl';
import { Box, Grid, Group, Image, Loader, Title } from '@mantine/core';
import { IconTruckDelivery } from '@tabler/icons-react';

import { statusList } from './constant';
import styles from './Orders.module.scss';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { getOrdersByStatus } from '@/services/ordersServices';
import { showToast, ToastType } from '@/utils/toastUtils';
import { OrderStatus } from '@/constants';
import OrderItem from './OrderItem';
import { OrderItemInfo } from '@/types';
import { deleteOrder } from '@/lib/features/ordersSlice';

function Orders() {
  const t = useTranslations();
  const dispatch = useAppDispatch();
  const reduxOrders = useAppSelector((state) => state.orders);

  const [ordersData, setOrdersData] = useState([]);
  const [status, setStatus] = useState(statusList[0].status);
  const [statusSelected, setStatusSelected] = useState(statusList[0].label);

  const fetchGetOrders = useCallback(
    (status: OrderStatus) => {
      dispatch(getOrdersByStatus(status)).then((result) => {
        if (result?.payload?.code !== 200) {
          showToast(result?.payload?.message || t('system.error'), ToastType.ERROR);
        }
        setOrdersData(result?.payload?.data?.orders);
      });
    },
    [dispatch, t],
  );

  const handleSelectStatus = (status: string) => {
    setStatus(status);
    setOrdersData([]);
  };

  useEffect(() => {
    const newList = reduxOrders?.error
      ? ordersData
      : ordersData?.filter((item: OrderItemInfo) => item._id !== reduxOrders?.idOrderCancel);
    setOrdersData(newList);
    dispatch(deleteOrder(null));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduxOrders]);

  useEffect(() => {
    if (!reduxOrders?.error) {
      setOrdersData([]);
    }
    window.scrollTo(0, 0);
    fetchGetOrders(status as OrderStatus);
  }, [status, fetchGetOrders, reduxOrders?.error]);

  return (
    <Box p="xl">
      <Group pb={10}>
        <IconTruckDelivery size={25} color="var(--primary-bg)" />
        <Title order={1} c="var(--primary-bg)">
          {t('sidebar.orders')}
        </Title>
      </Group>
      <Grid pt="xl">
        <Grid.Col span={{ base: 12, sm: 2, md: 2 }}>
          <Group justify="center">
            <Image maw={300} radius="md" src="/images/deliver.gif" alt="Deliver Gif" />
          </Group>
        </Grid.Col>
        <Grid.Col span="auto">
          <div className={clsx(styles['orders__status'])}>
            {statusList?.map((item, index) => {
              return (
                <h4
                  className={clsx(
                    styles['orders__status-item'],
                    statusSelected === item.label && styles['orders__status--active'],
                  )}
                  key={index}
                  onClick={() => {
                    if (statusSelected === item.label) {
                      return;
                    }
                    setStatusSelected(item.label);
                    handleSelectStatus(item.status);
                  }}
                >
                  {t(item.label)}
                </h4>
              );
            })}
          </div>

          <div className={clsx(styles['orders__list'])}>
            {ordersData &&
              ordersData?.map((order, index) => {
                return <OrderItem key={index} data={order} />;
              })}
          </div>

          {ordersData?.length === 0 && (
            <div className={clsx(styles['empty-order'])}>
              {!reduxOrders?.loading ? (
                <>
                  <Image
                    width={206}
                    height={212}
                    alt="Empty order"
                    src={'/images/empty-order.png'}
                    className={clsx(styles['empty-order__img'])}
                  />
                  <p className={clsx(styles['empty-order__desc'])}>{t('historyOrder.desc01')}</p>
                </>
              ) : (
                <Loader size={60} color="var(--primary-bg)" />
              )}
            </div>
          )}
        </Grid.Col>
      </Grid>
    </Box>
  );
}

export default Orders;
