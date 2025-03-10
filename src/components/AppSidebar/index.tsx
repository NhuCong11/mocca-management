import { useMemo } from 'react';
import { useTranslations } from 'next-intl';
import { IconChevronDown } from '@tabler/icons-react';
import { Accordion, Group, ScrollArea, Text } from '@mantine/core';

import { getRandomColor, sidebars } from './constant';
import { Link } from '@/i18n/routing';

function AppSidebar() {
  const t = useTranslations();
  const defaultOpens = useMemo(() => sidebars.map((item) => item.id), []);

  const items = useMemo(
    () =>
      sidebars.map((item) => (
        <Accordion.Item value={item.id} key={item.id} pt={10} pb={10}>
          <Accordion.Control icon={<item.Icon size={25} color={getRandomColor()} />}>
            <Text size="xl">{t(item.label)}</Text>
          </Accordion.Control>
          <Accordion.Panel>
            {item.content.map((nav) => {
              const Icon = nav.Icon;
              return (
                <Link href={nav.link} key={nav.title}>
                  <Group gap={15} p="lg">
                    <Icon size={25} color={getRandomColor()} />
                    <Text size="lg">{t(nav.title)}</Text>
                  </Group>
                </Link>
              );
            })}
          </Accordion.Panel>
        </Accordion.Item>
      )),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  return (
    <ScrollArea h="calc(100vh - 65px)">
      <Accordion
        multiple
        defaultValue={defaultOpens}
        chevronSize={30}
        chevronPosition="right"
        chevron={<IconChevronDown size={30} />}
      >
        {items}
      </Accordion>
    </ScrollArea>
  );
}

export default AppSidebar;
