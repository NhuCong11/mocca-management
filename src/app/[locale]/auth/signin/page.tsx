'use client';
import { useCallback, useState } from 'react';
import clsx from 'clsx';
import { Formik, Form } from 'formik';
import { useTranslations } from 'next-intl';
import { IconLock, IconMail } from '@tabler/icons-react';
import { Loader } from '@mantine/core';
import { setCookie } from 'typescript-cookie';

import styles from '../layout.module.scss';
import { IconKeyPassword } from '../constant';
import validationSchema from './schema';
import { useRouter } from '@/i18n/routing';
import Button from '@/share/Button';
import { fonts } from '@/styles/fonts';
import InputText from '@/share/InputText';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { loginUser } from '@/services/authServices';
import useSessionStorage from '@/hooks/useSessionStorage';
import { showToast, ToastType } from '@/utils/toastUtils';
import { ADMIN_RULES } from '@/constants';
import { getLocalStorageItem } from '@/utils/localStorage';

export interface LoginInfo {
  email: string;
  password: string;
}

function SignIn() {
  const t = useTranslations();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { setItem } = useSessionStorage();
  const token = JSON.parse(String(getLocalStorageItem('accessToken')));
  const isLogin = useAppSelector((state) => state.auth.isLogin);
  const isLoading = useAppSelector((state) => state?.auth.loading);
  const [showPassword, setShowPassword] = useState(false);

  const handleShowPassword = useCallback(() => setShowPassword((prev) => !prev), []);

  const handleSubmit = async (values: LoginInfo) => {
    if (token || isLogin) {
      showToast(t('login.notify03'), ToastType.ERROR);
      router.push('/');
      return;
    }

    const loginPromise = dispatch(loginUser(values)).then((result) => {
      if (result?.payload?.code === 200) {
        if (!ADMIN_RULES.includes(result?.payload?.data.user?.role)) {
          throw new Error(t('login.notify04'));
        }
        localStorage.setItem('accessToken', JSON.stringify(result?.payload?.data.accessToken));
        setCookie('accessToken', JSON.stringify(result?.payload?.data.accessToken));
        setCookie('userRole', result?.payload?.data.user.role);
        localStorage.setItem('refreshToken', JSON.stringify(result?.payload?.data.refreshToken));
        localStorage.setItem('user', JSON.stringify(result?.payload?.data.user));
        router.push('/');
        return t('login.notify01');
      } else if (result?.payload?.code === 202) {
        setItem('token2FA', result?.payload?.data.twoFaToken);
        router.push('/auth/login-with-2fa');
        throw new Error(t('login.notify02'));
      } else if (result?.payload?.code === 500) {
        router.push('/errors/500');
        throw new Error(t('system.serverError'));
      } else {
        throw new Error(result?.payload?.message || t('system.error'));
      }
    });
    showToast('', ToastType.PROMISE, loginPromise);
  };

  return (
    <div className={clsx(styles['auth'], fonts.inter)}>
      <h1 className={clsx(styles['auth__heading'])}>{t('login.heading')}</h1>
      <p className={clsx(styles['auth__desc'], fonts.lora)}>{t('login.desc01')}</p>

      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={validationSchema(t)}
        onSubmit={(values) => {
          handleSubmit(values);
        }}
        validateOnChange={true}
        validateOnMount={true}
      >
        {({ isValid, dirty }) => {
          return (
            <Form>
              <InputText
                required
                label={t('form.tp01')}
                name="email"
                type="email"
                placeholder={t('form.tp01')}
                LeftIcon={<IconMail />}
                readOnly={isLoading}
              />
              <InputText
                required
                label={t('form.tp02')}
                name="password"
                type={showPassword ? 'text' : 'password'}
                placeholder={t('form.tp02')}
                LeftIcon={<IconLock />}
                RightIcon={<IconKeyPassword showPassword={showPassword} onToggle={handleShowPassword} />}
                readOnly={isLoading}
              />

              <div
                style={!isValid || !dirty ? { cursor: 'no-drop' } : {}}
                className={clsx(styles['form__group'], styles['auth__btn-group'])}
              >
                <Button
                  primary
                  auth
                  type="submit"
                  disabled={!isValid || !dirty || isLoading}
                  leftIcon={isLoading && <Loader size={30} color="var(--white)" />}
                >
                  {t('header.na02')}
                </Button>
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
}

export default SignIn;
