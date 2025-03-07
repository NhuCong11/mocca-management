import { useEffect, useState } from 'react';
import Image, { StaticImageData } from 'next/image';
import clsx from 'clsx';
import { removeCookie } from 'typescript-cookie';
import { Link, useRouter } from '@/i18n/routing';
import { useLocale, useTranslations } from 'next-intl';
import { IconCaretDownFilled } from '@tabler/icons-react';

import styles from './AppHeader.module.scss';
import { getUserOptions } from './constant';
import Button from '@/share/Button';
import { MOCCA } from '@/constants';
import { UserInfo } from '@/types';
import { fonts } from '@/styles/fonts';
import { Locale, locales } from '@/i18n/config';
import { logout } from '@/lib/features/authSlice';
import useClickOutside from '@/hooks/useClickOutSide';
import { showToast, ToastType } from '@/utils/toastUtils';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { getLocalStorageItem } from '@/utils/localStorage';

function AppHeader() {
  const t = useTranslations();
  const router = useRouter();
  const locale = useLocale();
  const dispatch = useAppDispatch();
  const isAuth = useAppSelector((state) => state?.auth?.isLogin);
  const userInfo: UserInfo | null = getLocalStorageItem('user');
  const token = JSON.parse(String(getLocalStorageItem('accessToken')));

  const [isLogin, setIsLogin] = useState(false);
  const [avatar, setAvatar] = useState<string | StaticImageData>(userInfo?.avatar || '');

  const {
    elementRef: languagesRef,
    triggerRef: languageBtnRef,
    isVisible: showLanguages,
    setIsVisible: setShowLanguages,
  } = useClickOutside<HTMLUListElement, HTMLDivElement>();

  const {
    elementRef: userOptionsRef,
    triggerRef: avatarRef,
    isVisible: showUserOptions,
    setIsVisible: setShowUserOptions,
  } = useClickOutside<HTMLUListElement, HTMLImageElement>();

  const handleLogOut = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    removeCookie('accessToken', { path: '/' });
    setShowUserOptions(false);
    showToast(t('login.notify02'), ToastType.SUCCESS);
    dispatch(logout());
    router.replace('/');
  };

  const userOptions = getUserOptions(handleLogOut);

  const handleLanguageChange = (lang: Locale) => {
    const newPath = [`${lang}`].join('/');
    router.replace(newPath);
    setShowLanguages(false);
  };

  const handleViewLang = (lang: Locale) => {
    return locales
      .map((locale) => ({ name: locale, img: `/images/languages/${locale}.png` }))
      .find((item) => item.name === lang);
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (isAuth || token) {
        setIsLogin(true);
        setAvatar(userInfo?.avatar ? userInfo.avatar : '/images/logo.png');
      } else {
        setIsLogin(false);
      }
    }
  }, [isAuth, token, userInfo]);

  return (
    <div className={clsx(styles['header'])}>
      <Link href={'/'}>
        <Image width={150} height={47} src={'/images/logo-vip1.png'} priority alt={MOCCA} />
      </Link>
      <div className={clsx(styles['header__actions'])}>
        {!isLogin && (
          <div className={clsx(styles['header__actions-group'])}>
            <Link href={'/auth/signin'}>
              <Button tabletLaptop action outline>
                {t('header.na02')}
              </Button>
            </Link>
          </div>
        )}
        {isLogin && (
          <div className={clsx(styles['header__actions-group'])}>
            <Image
              priority
              width={42}
              height={42}
              alt="Avatar"
              src={avatar}
              ref={avatarRef}
              onClick={() => setShowUserOptions(!showUserOptions)}
              className={clsx(
                styles['header__actions-avatar'],
                showUserOptions && styles['header__actions-avatar--open'],
              )}
            />
            <ul
              ref={userOptionsRef}
              className={clsx(styles['header__user-options'], showUserOptions && styles['header__user-options--show'])}
            >
              {userOptions?.map((option, index) => {
                const Icon = option?.Icon;
                return (
                  <li
                    key={index}
                    className={clsx(styles['header__user-option'], fonts.inter)}
                    onClick={option?.onClick}
                  >
                    <p>{t(option?.label)}</p>
                    <Icon size={22} />
                  </li>
                );
              })}
            </ul>
          </div>
        )}
        <div
          className={clsx(styles['header__actions-group'])}
          ref={languageBtnRef}
          onClick={() => setShowLanguages(!showLanguages)}
        >
          <Button
            action
            outline
            rightIcon={
              <IconCaretDownFilled
                className={clsx(
                  styles['header__language-arrow'],
                  showLanguages && styles['header__language-arrow--open'],
                )}
                width={16}
                height={16}
              />
            }
          >
            {locale.toUpperCase()}
          </Button>
        </div>

        {/* Language options */}
        <ul
          ref={languagesRef}
          className={clsx(styles['header__languages'], showLanguages && styles['header__languages--show'])}
        >
          {locales.map((locale) => {
            const lang = handleViewLang(locale);
            return (
              <li
                key={locale}
                onClick={() => handleLanguageChange(locale)}
                className={clsx(styles['header__language'], fonts.inter)}
              >
                <p>{t(`languages.${lang?.name ?? 'vi'}`)}</p>
                <Image
                  priority
                  width={30}
                  height={30}
                  alt={locale}
                  className={clsx(styles['header__language-img'])}
                  src={lang?.img || '/images/languages/vi.png'}
                />
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default AppHeader;
