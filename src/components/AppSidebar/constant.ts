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
    label: 'sidebar.system',
    Icon: IconSettings,
    content: [
      {
        title: 'sidebar.users',
        link: '/users',
        Icon: IconUser,
        rule: [RULES.ADMIN],
      },
      {
        title: 'sidebar.categories',
        link: '/categories',
        Icon: IconCategory2,
        rule: [RULES.ADMIN],
      },
      {
        title: 'sidebar.contacts',
        link: '/contacts',
        Icon: IconAddressBook,
        rule: [RULES.ADMIN],
      },
      {
        title: 'sidebar.products',
        link: '/products',
        Icon: IconBadgeTm,
        rule: [RULES.SHOP, RULES.ADMIN],
      },
    ],
  },
  {
    id: 'order',
    label: 'sidebar.order',
    Icon: IconTruckDelivery,
    content: [
      {
        title: 'sidebar.orders',
        link: '/orders',
        Icon: IconShoppingCart,
        rule: [RULES.SHOP],
      },
    ],
  },
  {
    id: 'chat',
    label: 'sidebar.chat',
    Icon: IconMailbox,
    content: [
      {
        title: 'sidebar.chats',
        link: '/chats',
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
