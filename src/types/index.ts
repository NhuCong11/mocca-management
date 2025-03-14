import { OrderStatus, TimePeriod } from '@/constants';

export interface RejectValueError {
  rejectValue: { message: string };
}

export interface DefaultParams {
  limit: number;
  page: number;
  keyword?: string;
}

export interface StatisticalProps {
  statisticalBy: TimePeriod;
}

export interface OrderStatusInfo {
  pending: number;
  canceled: number;
  confirmed: number;
  reject: number;
  shipping: number;
  success: number;
}

export interface LoginInfo {
  email: string;
  password: string;
}

export interface UserInfo {
  _id?: string;
  fullname?: string;
  email?: string;
  normalizedEmail?: string;
  dateOfBirth?: string | Date;
  gender?: string;
  isVerify?: boolean;
  verifyExpireAt?: string;
  forgotStatus?: string;
  role?: string;
  avatar?: string;
  background?: string;
  is2FA?: boolean;
  isLocked?: boolean;
  slug?: string;
  phone?: string;
  lastActive?: string;
  createdAt?: string;
  updatedAt?: string;
  secret?: string;
  username?: string;
  accountBalance?: number;
}

export interface ProductInfo {
  _id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  slug: string;
  shop?: RestaurantInfo;
  category?: CategoryInfo;
}

export interface CategoryInfo {
  _id: string;
  name: string;
  image: string;
  slug: string;
  products?: ProductInfo[];
}

export interface CategoryUpdateInfo {
  categoryId?: string;
  name?: string;
  image?: File;
}

export interface RestaurantInfo {
  _id?: string;
  fullname?: string;
  email?: string;
  normalizedEmail?: string;
  dateOfBirth?: string | Date;
  gender?: string;
  isVerify?: boolean;
  verifyExpireAt?: string;
  forgotStatus?: string;
  role?: string;
  avatar?: string;
  background?: string;
  is2FA?: boolean;
  phone?: string;
  lastActive?: string;
  createdAt?: string;
  updatedAt?: string;
  secret?: string;
  slug: string;
  description?: string;
  rating?: number;
  categories?: CategoryInfo[];
}

export interface RestaurantsInfo {
  shops: RestaurantInfo[];
  limit: number;
  totalResult: number;
  totalPage: number;
  currentPage: number;
  currentResult: number;
}

export interface UpdateUserInfo {
  userId?: string;
  userCredentials: UserInfo;
}

export interface ContactInfo {
  fullname?: string;
  email?: string;
  phone?: string;
  message?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface ProductData {
  name: string;
  description: string;
  price: number;
  category: string;
}

export interface UpdateProductInfo {
  productId?: string;
  image?: File | undefined;
  productData?: ProductData;
}

export interface ChangeOrderStatus {
  orderId: string;
  status: OrderStatus;
}
