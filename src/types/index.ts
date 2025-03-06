export interface RejectValueError {
  rejectValue: { message: string };
}

export interface DefaultParams {
  limit: number;
  page: number;
  keyword?: string;
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

export interface CartItemInfo {
  _id: string;
  product: ProductInfo;
  quantity: number;
  totalPrice: number;
}

export interface CartInfo {
  shop: RestaurantInfo;
  cartDetails: CartItemInfo[];
  totalMoney: number;
}

export interface CartsInfo {
  carts: CartInfo[];
  totalProducts: number;
  totalMoneyAllCarts: number;
}

export interface RestaurantsInfo {
  shops: RestaurantInfo[];
  limit: number;
  totalResult: number;
  totalPage: number;
  currentPage: number;
  currentResult: number;
}

export interface CreateOrderInfo {
  cartDetails: string[];
  paymentMethod: string;
  address: string;
  note: string;
}

export interface GetOrderInfo {
  limit: number;
  page: number;
  status?: string;
}

export interface OrderItemInfo {
  _id: string;
  createdAt: string;
  updatedAt: string;
  totalMoney: number;
  status: string;
  shop: RestaurantInfo;
  paymentMethod: string;
  paymentCode: string;
  paymentStatus?: string;
  cartDetails: CartItemInfo[];
  address: string;
  note: string;
  expriedTimeBank?: string;
}
