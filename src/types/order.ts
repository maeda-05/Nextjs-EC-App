import { CartItemType } from "./item"

export type OrderType = {
  items: CartItemType[];
  name: string;
  email: string;
  zipcode: string;
  prefecture: string;
  city: string;
  tel: string;
  orderAt: Date;
}
