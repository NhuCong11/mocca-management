import {  useMemo } from 'react';
import clsx from 'clsx';
import { useTranslations } from 'next-intl';
import { IconChevronDown } from '@tabler/icons-react';
import { Accordion, Group, ScrollArea, Text } from '@mantine/core';

import styles from './AppSideBar.module.scss';
import { getRandomColor, sidebars } from './constant';
import { Link, usePathname } from '@/i18n/routing';
import { getLocalStorageItem } from '@/utils/localStorage';
import { UserInfo } from '@/types';
import { RULES } from '@/constants';

function AppSidebar() {
  const t = useTranslations();
  const pathname = usePathname();
  const userInfo: UserInfo | null = getLocalStorageItem('user');
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
              const isDisplay = nav.rule.includes(userInfo?.role as RULES);
              return (
                isDisplay && (
                  <Link href={nav.link} key={nav.title}>
                    <Group
                      gap={15}
                      p="md"
                      className={clsx(
                        styles['sidebar__item'],
                        pathname === nav.link && styles['sidebar__item--active'],
                      )}
                    >
                      <Icon size={25} color={getRandomColor()} />
                      <Text size="lg">{t(nav.title)}</Text>
                    </Group>
                  </Link>
                )
              );
            })}
          </Accordion.Panel>
        </Accordion.Item>
      )),
    [pathname, userInfo, t],
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
