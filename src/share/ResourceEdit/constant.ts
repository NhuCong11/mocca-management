import { CategoryInfo, ProductData, UpdateUserInfo } from '@/types';
import { createUser } from '@/services/usersServices';
import { createCategory } from '@/services/categoriesServices';
import { createProduct } from '@/services/productsServices';
import {
  IconCalendarTime,
  IconCoin,
  IconGenderBigender,
  IconKey,
  IconLetterCase,
  IconMail,
  IconMessage,
  IconPhotoScan,
  IconUser,
  IconUserPlus,
} from '@tabler/icons-react';
import { getEnumData } from '@/utils/constants';
import { GENDER } from '@/constants';
import { rolesSelect } from '../ShowTable/constant';

export const excludedFields = ['createdAt', 'updatedAt', 'username', 'shop', 'avatar'];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const resourceCreateServices: Record<string, (data: any) => any> = {
  users: (userCredentials: UpdateUserInfo) => createUser(userCredentials),
  categories: (data: { name: string; image?: File }) => createCategory(data),
  products: (data: { productData?: ProductData; image?: File }) => createProduct(data),
};

export const getIcon = (col: string) => {
  switch (col) {
    case 'fullname':
    case 'username':
      return IconUser;
    case 'email':
      return IconMail;
    case 'dateOfBirth':
      return IconCalendarTime;
    case 'gender':
      return IconGenderBigender;
    case 'avatar':
      return IconPhotoScan;
    case 'role':
      return IconUserPlus;
    case 'price':
      return IconCoin;
    case 'message':
      return IconMessage;
    case 'password':
      return IconKey;
    default:
      return IconLetterCase;
  }
};

export const getEnum = (col: string, t: (key: string) => string, categories: CategoryInfo[]) => {
  switch (col) {
    case 'gender':
      return getEnumData(GENDER, t, col);
    case 'role':
      return rolesSelect;
    case 'category':
      return categories.map((category, index) => ({
        value: `${category?._id}`,
        label: `${index + 1}. ${category?.name}`,
      }));
    default:
      return [];
  }
};
