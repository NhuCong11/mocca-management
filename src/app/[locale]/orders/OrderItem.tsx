import { useTranslations } from 'next-intl';
import { IconChevronDown } from '@tabler/icons-react';
import { Accordion, Avatar, Box, Button, Divider, Flex, Group, Image, Text, Title } from '@mantine/core';

import { getButtons, getChangeNextStatus, getOrderDetails, getPaymentMethod, getPaymentStatus } from './constant';
import { getVNCurrency } from '@/utils/constants';
import { CartItemInfo, OrderItemInfo } from '@/types';
import { useAppDispatch } from '@/lib/hooks';
import { cancelOrder, changeStatus } from '@/services/ordersServices';
import { OrderStatus } from '@/constants';
import { showToast, ToastType } from '@/utils/toastUtils';
import { deleteOrder } from '@/lib/features/ordersSlice';

function OrderItem({ data }: { data: OrderItemInfo }) {
  const t = useTranslations();
  const dispatch = useAppDispatch();

  const paymentMethod = getPaymentMethod(data?.paymentMethod, t);
  const paymentStatus = getPaymentStatus(data?.paymentStatus, t);
  const orderDetails = getOrderDetails(data, paymentMethod, paymentStatus);
  const buttons = getButtons(data?.status, t);
  const nextStatus = getChangeNextStatus(data?.status);

  const handleChangeStatus = (status?: OrderStatus) => {
    if (!status) return;
    const changeStatusPromise = dispatch(changeStatus({ orderId: data?._id, status })).then((result) => {
      if (result?.payload?.code === 200) {
        return result?.payload?.message;
      } else {
        throw new Error(result?.payload?.message || t('system.error'));
      }
    });
    dispatch(deleteOrder(data?._id));
    showToast('', ToastType.PROMISE, changeStatusPromise);
  };

  const handleCancelOrder = () => {
    const cancelOrderPromise = dispatch(cancelOrder(data?._id)).then((result) => {
      if (result?.payload?.code === 200) {
        return result?.payload?.message;
      } else {
        throw new Error(result?.payload?.message || t('system.error'));
      }
    });
    dispatch(deleteOrder(data?._id));
    showToast('', ToastType.PROMISE, cancelOrderPromise);
  };

  return (
    <Box p="xl" pb={0}>
      <Accordion
        multiple
        defaultValue={['user']}
        chevronSize={30}
        chevronPosition="right"
        chevron={<IconChevronDown size={30} />}
      >
        <Accordion.Item value="user" pt={10} pb={10}>
          <Accordion.Control>
            <Group>
              <Avatar size={65} src={String(data?.user?.avatar) || '/images/logo.png'} alt={data?.user?.fullname} />
              <Text size="xl" fw={500}>
                {data?.user?.fullname}
              </Text>
            </Group>
          </Accordion.Control>
          <Accordion.Panel>
            {data?.cartDetails.map((cartDetail: CartItemInfo, index: number) => {
              return (
                <Group key={index} justify="space-between" p="lg">
                  <Group gap="xl">
                    <Image w={150} radius="lg" src={cartDetail.product.image} alt={cartDetail.product.name} />
                    <Box>
                      <Title order={4} size="h2">
                        {cartDetail.product.name}
                      </Title>
                      <Text size="lg" mt="lg" c="gray" truncate="end" lineClamp={3} style={{ textWrap: 'wrap' }}>
                        {cartDetail.product.description}
                      </Text>
                      <Text size="lg" mt="lg">
                        X {cartDetail.quantity}
                      </Text>
                    </Box>
                  </Group>
                  <Text size="xl" fw={600} c="var(--primary-bg)">
                    {cartDetail.classify} | {getVNCurrency(cartDetail.product.price)}
                  </Text>
                </Group>
              );
            })}
          </Accordion.Panel>
        </Accordion.Item>
      </Accordion>

      {orderDetails.map((detail, index) => (
        <Box key={index} pt="xl">
          <Flex gap="xl">
            <Text size="xl" fw={600} miw={150}>
              {t(detail.label)}
            </Text>
            <Text size="xl" c={detail.color}>
              {detail.value}
            </Text>
          </Flex>
        </Box>
      ))}

      <Group pt="xl" justify="flex-end" gap="xl">
        {buttons.map((btn, index) => (
          <Button
            size="lg"
            key={index}
            color={btn.color}
            onClick={() => {
              if (!btn.isCancel) {
                handleChangeStatus(nextStatus);
              } else {
                handleCancelOrder();
              }
            }}
          >
            {btn.text}
          </Button>
        ))}
      </Group>
      <Divider mt="xl" color="gray" variant="dashed" />
    </Box>
  );
}

export default OrderItem;
