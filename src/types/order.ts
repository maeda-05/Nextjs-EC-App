import { CartItemType } from "./item";
import { Timestamp } from "firebase/firestore";

export type OrderType = {
  uid: string;
  order_id: string;
  items: CartItemType[];
  name: string;
  email: string;
  zipcode: string;
  prefecture: string;
  city: string;
  tel: string;
  orderAt: Timestamp;
};
