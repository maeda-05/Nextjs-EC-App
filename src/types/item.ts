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
  incartAt: Date;
};
