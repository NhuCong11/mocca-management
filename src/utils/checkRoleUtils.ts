import { RULES } from '@/constants';

export const checkRoleAdmin = (rule: string | undefined) => rule === RULES.ADMIN || false;
export const checkRoleShop = (rule: string | undefined) => rule === RULES.SHOP || false;
