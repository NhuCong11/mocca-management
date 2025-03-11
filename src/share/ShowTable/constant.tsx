import { Anchor, Avatar, Badge, Group, Text } from '@mantine/core';
import { IconArrowDown, IconArrowsSort, IconArrowUp, IconCheck, IconX } from '@tabler/icons-react';
import { ItemInfo } from '../SelectBox';
import { EMPTY_CHAR, RULES } from '@/constants';
import { formatDateTime, getVNCurrency } from '@/utils/constants';

export const NOT_SORT = ['isVerify', 'is2FA', 'avatar'];
export const FIELD_DATE_FORMAT = ['dateOfBirth', 'createdAt', 'updatedAt', 'lastActive', 'verifyExpireAt'];
export const excludedFieldsUsers = [
  '_id',
  'accountBalance',
  'normalizedEmail',
  'forgotStatus',
  'background',
  'secret',
  'lastActive',
  'isLocked',
  'slug',
  'verifyExpireAt',
];

export const excludedFields: string[] = [...excludedFieldsUsers];

export const rolesSelect: ItemInfo[] = Object.values(RULES).map((rule, index) => ({
  value: rule,
  label: `${index + 1}. ${rule.toUpperCase()}`,
}));

export type SortConfig<T> = {
  key: keyof T | null;
  direction: 'asc' | 'desc' | null;
};

export const renderSortIcon = <T,>(key: keyof T, sortConfig: SortConfig<T>) => {
  if (sortConfig.key === key) {
    return sortConfig.direction === 'asc' ? (
      <IconArrowUp size={18} color="teal" />
    ) : (
      <IconArrowDown size={18} color="teal" />
    );
  }
  return <IconArrowsSort size={18} color="teal" />;
};

const getBadgeColor = (role: string) => {
  switch (role) {
    case RULES.SHOP:
      return 'orange';
    case RULES.ADMIN:
      return 'grape';
    default:
      return 'teal';
  }
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const renderCellValue = (row: Record<string, any>, key: string, t: (path: string) => string) => {
  const value = row[key];
  switch (key) {
    case 'avatar':
      return (
        <Group justify="center">
          <Avatar src={value as string} alt="Avatar" size={60} />
        </Group>
      );
    case 'background':
      return (
        <Anchor
          size="xl"
          href={value}
          target="_blank"
          underline="never"
          style={{ wordBreak: 'break-all', maxWidth: '100%' }}
        >
          {value}
        </Anchor>
      );
    case 'gender':
      return (
        <Group justify="center">
          <Badge size="xl" color={value === 'male' ? 'blue' : 'pink'} variant="light" miw={100}>
            {t(`gender.${value}`)}
          </Badge>
        </Group>
      );
    case 'email':
    case 'normalizedEmail':
      return (
        <Anchor size="xl" href={`mailto:${value}`} underline="always">
          {value}
        </Anchor>
      );
    case 'phone':
      return (
        <Anchor size="xl" href={`tel:${value}`} underline="always">
          {value}
        </Anchor>
      );
    case 'role':
      return (
        <Group justify="center">
          <Badge size="xl" color={getBadgeColor(value as string)} variant="light" miw={100}>
            {value}
          </Badge>
        </Group>
      );
    case 'accountBalance':
      return <Text size="xl">{getVNCurrency(value as number)}</Text>;
    default:
      if (typeof value === 'boolean') {
        return (
          <Group justify="center">
            {value ? <IconCheck size={20} color="green" /> : <IconX size={20} color="red" />}
          </Group>
        );
      }
      if (FIELD_DATE_FORMAT.includes(key)) {
        return <Text size="xl">{formatDateTime(value as string)}</Text>;
      }
      return <Text size="xl">{value || EMPTY_CHAR}</Text>;
  }
};
