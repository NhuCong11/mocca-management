import { OrderStatus } from '@/constants';
import { OrderItemInfo } from '@/types';
import { formatDateTime } from '@/utils/constants';
import { useTranslations } from 'next-intl';

export const statusList = [
  {
    label: 'historyOrder.statusPending',
    status: 'pending',
  },
  {
    label: 'historyOrder.statusConfirmed',
    status: 'confirmed',
  },
  {
    label: 'historyOrder.statusShipping',
    status: 'shipping',
  },
  {
    label: 'historyOrder.statusSuccess',
    status: 'success',
  },
  {
    label: 'historyOrder.statusRejected',
    status: 'reject',
  },
];

export const getPaymentMethod = (method: string | undefined, t: ReturnType<typeof useTranslations>) => {
  if (!method) return '';

  const methodMap: Record<string, string> = {
    cod: t('historyOrder.paymentType01'),
    bank: t('historyOrder.paymentType02'),
    prepaid: t('historyOrder.paymentType03'),
  };

  return methodMap[method] || '';
};

export const getPaymentStatus = (status: string | undefined, t: ReturnType<typeof useTranslations>) => {
  return status === 'unpaid' ? t('historyOrder.paymentStatus01') : t('historyOrder.paymentStatus02');
};

export const getOrderDetails = (data: OrderItemInfo, paymentMethod: string, paymentStatus: string) => [
  { label: 'historyOrder.label02', value: data?.address },
  { label: 'historyOrder.label03', value: data?.note },
  { label: 'historyOrder.label04', value: formatDateTime(data?.createdAt) },
  { label: 'historyOrder.label05', value: paymentMethod },
  {
    label: 'historyOrder.label06',
    value: paymentStatus,
    color: data?.paymentStatus === 'unpaid' ? 'red' : 'teal',
  },
];

export const getButtons = (status: string | undefined, t: ReturnType<typeof useTranslations>) => {
  switch (status) {
    case OrderStatus.Pending:
      return [
        { text: t('button.btn10'), color: 'red' },
        { text: t('button.btn11'), color: 'green' },
      ];
    case OrderStatus.Confirmed:
      return [
        { text: t('button.btn12'), color: 'orange', isCancel: true },
        { text: t('button.btn13'), color: 'teal' },
      ];
    case OrderStatus.Shipping:
      return [
        { text: t('button.btn12'), color: 'orange', isCancel: true },
        { text: t('button.btn14'), color: 'teal' },
      ];
    default:
      return [];
  }
};

export const getChangeNextStatus = (status: string) => {
  switch (status) {
    case OrderStatus.Pending:
      return OrderStatus.Confirmed;
    case OrderStatus.Confirmed:
      return OrderStatus.Shipping;
    case OrderStatus.Shipping:
      return OrderStatus.Success;
    default:
      return OrderStatus.Confirmed;
  }
};
