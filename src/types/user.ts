import { CartItemType } from "./item";

export type User = {
  uid: string;
  name: string;
  email: string;
  password: string;
  confirmationPassword: string;
  // cart: CartItemType[];
};
