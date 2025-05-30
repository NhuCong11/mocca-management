import { ComboboxItem, Select } from '@mantine/core';
import { useTranslations } from 'next-intl';

export interface ItemInfo {
  value?: string | number;
  label?: string;
}

interface SelectBoxProps {
  label?: string;
  disabled?: boolean;
  required?: boolean;
  data?: ItemInfo[];
  leftIcon?: React.ReactNode;
  value?: ComboboxItem | null;
  notNull?: boolean;
  size?: string;
  maw?: number;
  onChange?: (value: ComboboxItem) => void;
  error?: string;
}

function SelectBox({
  label,
  disabled = false,
  data = [],
  required = false,
  leftIcon,
  value,
  notNull = false,
  size = 'xl',
  maw,
  onChange = () => {},
  ...props
}: SelectBoxProps) {
  const t = useTranslations();

  const formattedData = data?.map((item) => ({
    value: `${item.value}` || '',
    label: item.label || '',
  }));

  return (
    <Select
      {...props}
      size={size}
      miw={200}
      maw={maw}
      clearable={!notNull}
      searchable
      label={label}
      withScrollArea
      required={required}
      placeholder={label}
      disabled={disabled}
      leftSection={leftIcon}
      allowDeselect={false}
      maxDropdownHeight={300}
      checkIconPosition="right"
      data={formattedData}
      value={value ? value.value : null}
      onChange={(_value, option) => onChange(option)}
      nothingFoundMessage={t('nothingFoundMessage')}
      comboboxProps={{ transitionProps: { transition: 'pop-top-left', duration: 300 }, shadow: 'sm' }}
    />
  );
}

export default SelectBox;
