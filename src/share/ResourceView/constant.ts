import { CategoryUpdateInfo, UpdateUserInfo } from '@/types';
import { getUserById } from '@/services/usersServices';
import { getProductById } from '@/services/productsServices';
import { getContactById } from '@/services/contactsServices';
import { getCategoryById } from '@/services/categoriesServices';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const resourceServices: Record<string, (id: string) => any> = {
  users: (id) => getUserById({ userId: id } as UpdateUserInfo),
  categories: (id) => getCategoryById({ categoryId: id } as CategoryUpdateInfo),
  contacts: (id) => getContactById(id),
  products: (id) => getProductById({ productId: id }),
};
