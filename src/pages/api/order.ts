// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { adminDB } from "../../firebase/server";
import type { NextApiRequest, NextApiResponse } from "next";
import { apiGetCartItemData, CartItemType } from "types/item";
import { OrderType } from "types/order";

type Data =
  | {
      items: apiGetCartItemData[];
      orderAt: Date;
      order_id: string;
    }[]
  | null;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const COLLECTION_NAME1 = "order";
  const COLLECTION_NAME2 = "users";
  const SUBCOLLECTION_NAME = "cart";

  const orderCollection = adminDB.collection(COLLECTION_NAME1);
  const usersCollection = adminDB.collection(COLLECTION_NAME2);

  const { method } = req;

  switch (method) {
    case "GET":
      const orderSnapshot = await orderCollection
        .orderBy("orderAt", "desc")
        .get();
      const orders = orderSnapshot.docs.map((doc) => {
        const order = { ...doc.data(), order_id: doc.id } as OrderType;
        return order;
      });
      const orderOfLoginUser = orders.filter(
        (order) => order.uid === req.query.uid
      );
      const orderItemsOfLoginUser = orderOfLoginUser.map((order) => {
        const jsDate = order.orderAt.toDate();
        return {
          items: order.items,
          orderAt: jsDate,
          order_id: order.order_id,
        };
      });
      res.status(200).json(orderItemsOfLoginUser);
      break;

    case "POST":
      const docRef = orderCollection.doc();
      const insertData: OrderType = {
        ...req.body,
        orderAt: new Date(),
      };
      docRef.set(insertData);
      res.status(200).end();
      break;

    case "DELETE":
      // 注文完了後カート商品を全削除

      const subCollection = usersCollection
        .doc(`${req.body.uid}`)
        .collection(SUBCOLLECTION_NAME);

      const cartSnapshot = await subCollection.get();
      const cartItems = (await cartSnapshot).docs.map((doc: any) => {
        const jsDate = doc.data().incartAt.toDate();
        return {
          ...doc.data(),
          documentid: doc.id,
          incartAt: jsDate,
        };
      });

      cartItems.forEach(async (CartItem: CartItemType) => {
        await subCollection.doc(`${CartItem.documentid}`).delete();
      });

      res.status(200).end();
      break;

    default:
      res.status(405).end();
      break;
  }
}
