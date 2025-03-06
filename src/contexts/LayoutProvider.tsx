'use client';
import { useEffect } from 'react';
import { ThemeProvider } from 'next-themes';

import AOS from 'aos';
import 'aos/dist/aos.css';
import { useDisclosure } from '@mantine/hooks';
import { AppShell, Burger, Flex, Group } from '@mantine/core';

import AppHeader from '@/components/AppHeader';

function LayoutProvider({ children }: { children: Readonly<React.ReactNode> }) {
  const [opened, { toggle }] = useDisclosure();

  useEffect(() => {
    AOS.init({
      once: true,
      duration: 800,
      easing: 'linear',
    });
  }, []);

  useEffect(() => {
    const detectDevTools = () => {
      console.log('%cĐịnh phá web của anh à 😒!', 'color: red; font-size: 20px; cursor: pointer;');
      console.log(
        '%cCần gì liên hệ anh 😉 facebook.com/Nhu.Cong1123',
        'color: blue; font-size: 14px; cursor: pointer;',
      );
    };
    detectDevTools();
  }, []);

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem={true} disableTransitionOnChange>
      <AppShell
        header={{ height: 100 }}
        navbar={{
          width: 400,
          breakpoint: 'sm',
          collapsed: { mobile: !opened },
        }}
      >
        <AppShell.Header>
          <Flex align="center" gap="lg" h="100%" bg="#181818" p="lg">
            <Group p="sm">
              <Burger color="white" opened={opened} onClick={toggle} hiddenFrom="sm" size="lg" />
            </Group>
            <AppHeader />
          </Flex>
        </AppShell.Header>

        <AppShell.Navbar p="md">Navbar</AppShell.Navbar>

        <AppShell.Main>{children}</AppShell.Main>
      </AppShell>
    </ThemeProvider>
  );
}

export default LayoutProvider;
