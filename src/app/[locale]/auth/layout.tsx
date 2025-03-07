'use client';
import Image from 'next/image';
import clsx from 'clsx';
import styles from './layout.module.scss';
import { MOCCA } from '@/constants';
import { Link } from '@/i18n/routing';

function AuthLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className={clsx(styles['wrapper'])}>
      <div className={clsx(styles['logo'])}>
        <Link href={'/'}>
          <Image
            priority
            width={145}
            height={45}
            alt={MOCCA}
            src={'/images/logo-vip1.png'}
            className={clsx(styles['logo__img'])}
          />
        </Link>
      </div>
      <div className={clsx(styles['container'])}>{children}</div>
    </div>
  );
}

export default AuthLayout;
