import Image from 'next/image';
import clsx from 'clsx';
import { Link, useRouter } from '@/i18n/routing';
import { useLocale, useTranslations } from 'next-intl';

import styles from './AppHeader.module.scss';
import Button from '@/share/Button';
import { fonts } from '@/styles/fonts';
import { IconCaretDownFilled } from '@tabler/icons-react';
import { Locale, locales } from '@/i18n/config';
import useClickOutside from '@/hooks/useClickOutSide';
import { getUserOptions } from './constant';
// import { useAppDispatch } from '@/lib/hooks';

function AppHeader() {
  const t = useTranslations();
  const router = useRouter();
  const locale = useLocale();
  //   const dispatch = useAppDispatch();

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
    // removeCookie('accessToken', { path: '/' });
    // setShowUserOptions(false);
    // showToast(t('login.notify02'), ToastType.SUCCESS);
    // dispatch(logout());
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

  return (
    <div className={clsx(styles['header'])}>
      <Link href={'/'}>
        <Image width={150} height={47} src={'/images/logo-vip1.png'} priority alt={'Mocca Cafe'} />
      </Link>
      <div className={clsx(styles['header__actions'])}>
        {true && (
          <div className={clsx(styles['header__actions-group'])}>
            <Link href={'/auth/signin'}>
              <Button tabletLaptop action outline>
                {t('header.na02')}
              </Button>
            </Link>
          </div>
        )}
        {true && (
          <div className={clsx(styles['header__actions-group'])}>
            <Image
              priority
              width={42}
              height={42}
              alt="Avatar"
              src={'/images/logo.png'}
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
