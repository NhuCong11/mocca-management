import { RULES } from '@/constants';
import {
  IconAddressBook,
  IconBadgeTm,
  IconCategory2,
  IconMailbox,
  IconMessage,
  IconSettings,
  IconShoppingCart,
  IconTruckDelivery,
  IconUser,
} from '@tabler/icons-react';

export const sidebars = [
  {
    id: 'system',
    label: 'Quản lý hệ thống',
    Icon: IconSettings,
    content: [
      {
        title: 'Danh sách người dùng',
        link: '',
        Icon: IconUser,
        rule: [RULES.ADMIN],
      },
      {
        title: 'Danh mục',
        link: '',
        Icon: IconCategory2,
        rule: [RULES.ADMIN],
      },
      {
        title: 'Danh sách liên hệ',
        link: '',
        Icon: IconAddressBook,
        rule: [RULES.ADMIN],
      },
      {
        title: 'Danh sách sản phẩm',
        link: '',
        Icon: IconBadgeTm,
        rule: [RULES.SHOP],
      },
    ],
  },
  {
    id: 'order',
    label: 'Quản lý đặt hàng',
    Icon: IconTruckDelivery,
    content: [
      {
        title: 'Đơn đặt hàng',
        link: '',
        Icon: IconShoppingCart,
        rule: [RULES.SHOP],
      },
    ],
  },
  {
    id: 'chat',
    label: 'Quản lý tin nhắn',
    Icon: IconMailbox,
    content: [
      {
        title: 'Tin nhắn',
        link: '',
        Icon: IconMessage,
        rule: [RULES.SHOP],
      },
    ],
  },
];

export const getRandomColor = () => {
  const colors = [
    '#e64980',
    '#be4bdb',
    '#15aabf',
    '#228be6',
    '#12b886',
    '#40c057',
    '#82c91e',
    '#fd7e14',
    '#fab005',
    '#7950f2',
    '#fa5252',
    '#4c6ef5',
  ];
  return colors[Math.floor(Math.random() * colors.length)];
};
