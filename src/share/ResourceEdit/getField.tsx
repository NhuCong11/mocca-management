import { DateInput } from '@mantine/dates';
import { IconUpload } from '@tabler/icons-react';
import {
  Avatar,
  Box,
  Button,
  ComboboxItem,
  FileButton,
  Group,
  NumberInput,
  PasswordInput,
  Switch,
  Text,
  TextInput,
} from '@mantine/core';
import { getEnum, getIcon } from './constant';
import SelectBox from '../SelectBox';
import { CategoryInfo } from '@/types';

export const getField = ({
  column,
  formData,
  resourceName,
  categories,
  setFieldValue,
  errors,
  t,
}: {
  column: string;
  formData: Record<string, string | number | File | boolean>;
  resourceName: string;
  categories: CategoryInfo[];
  setFieldValue: (field: string, value: string | number | File | boolean) => void;
  errors: Record<string, string>;
  t: (key: string) => string;
}) => {
  const Icon = getIcon(column);

  if (column.startsWith('is')) {
    return (
      <Switch
        size="xl"
        color="teal"
        checked={formData[column] === 'true' || Boolean(formData[column])}
        labelPosition="left"
        label={t(`${resourceName}.${column}`)}
        onChange={(event) => setFieldValue(column, event.currentTarget.checked)}
      />
    );
  }

  switch (column) {
    case 'dateOfBirth':
      return (
        <DateInput
          size="xl"
          clearable
          valueFormat="DD/MM/YYYY"
          value={formData[column] ? new Date(formData[column] as string) : null}
          label={t(`${resourceName}.${column}`)}
          onChange={(date) => setFieldValue(column, date?.toISOString() || '')}
          placeholder={t(`${resourceName}.${column}`)}
        />
      );

    case 'gender':
    case 'role':
    case 'category': {
      const options = getEnum(column, t, categories);
      const selectedValue = options.find((item) => item.value === formData[column]) || null;
      return (
        <SelectBox
          required
          data={options}
          leftIcon={<Icon size={20} />}
          label={t(`${resourceName}.${column}`)}
          value={selectedValue as ComboboxItem}
          error={errors[column] ? errors[column] : ''}
          onChange={(option) => setFieldValue(column, option?.value)}
        />
      );
    }

    case 'price':
      return (
        <NumberInput
          required
          size="xl"
          allowNegative={false}
          thousandSeparator=","
          value={
            typeof formData[column] === 'number' ? formData[column] : formData[column] ? Number(formData[column]) : ''
          }
          label={`${t(`${resourceName}.${column}`)} (VND)`}
          leftSection={<Icon size={20} />}
          placeholder={t(`${resourceName}.${column}`)}
          onChange={(value) => setFieldValue(column, value ?? '')}
          error={errors[column] ? errors[column] : null}
        />
      );

    case 'avatar':
    case 'image':
      return (
        <Group>
          <FileButton
            onChange={(selectedFile) => setFieldValue(column, selectedFile as File)}
            accept="image/png,image/jpeg"
          >
            {(props) => (
              <Box>
                <Text size="xl" mb="md">
                  {t(`${resourceName}.${column}`)}
                </Text>
                <Button
                  size="lg"
                  {...props}
                  variant="gradient"
                  rightSection={<IconUpload size={15} />}
                  gradient={{ from: 'yellow.8', to: 'orange.6', deg: 150 }}
                >
                  {formData[column] instanceof File ? t('button.btn08') : t('button.btn07')}
                </Button>
              </Box>
            )}
          </FileButton>
          {(formData[column] instanceof File || String(formData[column])) && (
            <Avatar
              size={150}
              src={String(formData[column]) || URL.createObjectURL(formData[column] as File)}
              alt="Preview"
            />
          )}
        </Group>
      );

    case 'password':
      return (
        <PasswordInput
          required
          size="xl"
          value={(formData[column] as string) || ''}
          label={t(`${resourceName}.${column}`)}
          leftSection={<Icon size={20} />}
          placeholder={t(`${resourceName}.${column}`)}
          onChange={(event) => setFieldValue(column, event.currentTarget.value)}
          error={errors[column] ? errors[column] : null}
        />
      );

    default:
      return (
        <TextInput
          required
          size="xl"
          value={(formData[column] as string) || ''}
          label={t(`${resourceName}.${column}`)}
          leftSection={<Icon size={20} />}
          placeholder={t(`${resourceName}.${column}`)}
          onChange={(event) => setFieldValue(column, event.currentTarget.value)}
          error={errors[column] ? errors[column] : null}
        />
      );
  }
};
