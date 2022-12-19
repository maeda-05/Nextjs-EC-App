import { Timestamp } from "firebase/firestore";

export type Item = {
  id: number;
  type: string;
  name: string;
  description: string;
  price: number;
  image_path: string;
  deleted: boolean;
};

export type CartItemType = {
  id: number;
  documentid: string;
  uid: string;
  type: string;
  name: string;
  description: string;
  price: number;
  image_path: string;
  deleted: boolean;
  quantity: number;
  totalPrice: number;
  incartAt: Timestamp;
  stripe_id: string;
};

export type apiGetCartItemData = {
  documentid: string;
  incartAt: Date;
  id: number;
  uid: string;
  type: string;
  name: string;
  description: string;
  price: number;
  image_path: string;
  deleted: boolean;
  quantity: number;
  totalPrice: number;
  stripe_id: string;
};
