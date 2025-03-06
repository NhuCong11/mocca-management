import { IconLogout } from '@tabler/icons-react';

export const getUserOptions = (handleLogOut: () => void) => [
  {
    onClick: handleLogOut,
    label: 'user-options.op01',
    Icon: IconLogout,
  },
];
