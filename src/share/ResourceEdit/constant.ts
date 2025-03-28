/* eslint-disable @typescript-eslint/no-explicit-any */
import { CategoryInfo, CategoryUpdateInfo, ProductData, UpdateUserInfo } from '@/types';
import { createUser, getUserById, updateUserById } from '@/services/usersServices';
import { createCategory, getCategoryById, updateCategoryById } from '@/services/categoriesServices';
import { createProduct, getProductById, updateProductById } from '@/services/productsServices';
import {
  IconCalendarTime,
  IconCategoryPlus,
  IconCoin,
  IconFileDescription,
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

export const resourceCreateServices: Record<string, (data: any) => any> = {
  users: (userCredentials: UpdateUserInfo) => createUser(userCredentials),
  categories: (data: { name: string; image?: File }) => createCategory(data),
  products: (data: { productData?: ProductData; image?: File }) => createProduct(data),
};

export const resourceGetServices: Record<string, (id: string) => any> = {
  users: (id) => getUserById({ userId: id } as UpdateUserInfo),
  categories: (id) => getCategoryById({ categoryId: id } as CategoryUpdateInfo),
  products: (id) => getProductById({ productId: id }),
};

export const resourceUpdateServices: Record<string, (id: string, data: any) => any> = {
  users: (id, userCredentials) => updateUserById({ userId: id, userCredentials }),
  categories: (id, data) => updateCategoryById({ categoryId: id, ...data }),
  products: (id, { image, ...data }) => updateProductById({ productId: id, image, productData: data }),
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
    case 'classifies':
      return IconCategoryPlus;
    case 'description':
      return IconFileDescription;
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
