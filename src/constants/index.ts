export const ERROR_MESSAGES = {
  JWT_EXPIRED_VI: 'jwt hết hạn',
  JWT_EXPIRED_EN: 'jwt expired',
  JWT_EXPIRED_ZH: 'jwt已过期',
  JWT_EXPIRED_KO: 'jwt가 만료되었습니다',
};

export enum RULES {
  USER = 'user',
  ADMIN = 'admin',
  SHOP = 'shop',
}
export enum TimePeriod {
  Week = 'week',
  Month = 'month',
  Quarter = 'quarter',
  Year = 'year',
}

export const ADMIN_RULES = [RULES.ADMIN, RULES.SHOP];
export const MINIMUM_AGE = 14;
export const UNKNOWN_ERROR = 'Unknown error';
export const MOCCA = 'Mocca Cafe';
export const EMPTY_CHAR = '---';
export const TIME_PERIODS = [TimePeriod.Week, TimePeriod.Month, TimePeriod.Quarter, TimePeriod.Year];
