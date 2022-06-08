export interface ProductData {
  extras: any;
  price: number;
  quantity: number;
  _id: string;
  title: string;
  desc: string;
  img: string;
  prices: number[];
  extraOptions: {
    text: string;
    price: number;
    _id: string;
  }[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}
export interface OrderData {
  _id: string;
  customer: string;
  address: string;
  total: string;
  status: number;
  method: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
export interface CartData {
  products: ProductData[];
  quantity: number;
  total: number;
}
export interface State {
  cart: CartData;
}
export interface CustomerData {
  name?: string;
  customer?: string;
  address: string;
  mobileNum: string;
  total?: number;
  method?: number;
}
