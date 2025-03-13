import { deleteCategoryById } from '@/services/categoriesServices';
import { deleteContactById } from '@/services/contactsServices';
import { deleteProductById } from '@/services/productsServices';
import { deleteUserById } from '@/services/usersServices';
import { CategoryUpdateInfo, UpdateUserInfo } from '@/types';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const resourceServices: Record<string, (id: string) => any> = {
  users: (id) => deleteUserById({ userId: id } as UpdateUserInfo),
  categories: (id) => deleteCategoryById({ categoryId: id } as CategoryUpdateInfo),
  contacts: (id) => deleteContactById(id),
  products: (id) => deleteProductById({ productId: id }),
};
