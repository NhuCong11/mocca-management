'use client';
import { useEffect } from 'react';
import { ThemeProvider } from 'next-themes';

import AOS from 'aos';
import 'aos/dist/aos.css';
import { Toaster } from 'react-hot-toast';
import { useDisclosure } from '@mantine/hooks';
import { AppShell, Burger, Flex, Group, MantineProvider } from '@mantine/core';

import AppHeader from '@/components/AppHeader';
import { usePathname } from '@/i18n/routing';
import { noDefaultLayoutRoutes } from '@/config/routes';
import { useAppSelector } from '@/lib/hooks';
import { getLocalStorageItem } from '@/utils/localStorage';
import AppSidebar from '@/components/AppSidebar';
import { theme } from '@/styles/mantine';
import AppThemeToggle from '@/components/AppThemeToggle';

function LayoutProvider({ children }: { children: Readonly<React.ReactNode> }) {
  const pathname = usePathname();
  const isAuth = useAppSelector((state) => state?.auth?.isLogin);
  const token = JSON.parse(String(getLocalStorageItem('accessToken')));
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
      <MantineProvider theme={theme} defaultColorScheme="auto">
        {!noDefaultLayoutRoutes.includes(pathname) && (isAuth || (typeof window !== 'undefined' && token)) ? (
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

            <AppShell.Navbar pt="sm">
              <AppSidebar />
            </AppShell.Navbar>

            <AppShell.Main>{children}</AppShell.Main>
          </AppShell>
        ) : (
          children
        )}
        <AppThemeToggle />
        <Toaster
          gutter={8}
          position="top-center"
          reverseOrder={false}
          toastOptions={{
            duration: 3000,
            removeDelay: 1000,
            style: {
              borderRadius: '12px',
              background: 'var(--white)',
              color: 'var(--coffee-color-v2)',
              border: '1px solid var(--primary-bg)',
            },
          }}
        />
      </MantineProvider>
    </ThemeProvider>
  );
}

export default LayoutProvider;
