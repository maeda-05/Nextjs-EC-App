// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { CartItemType } from "types/item";
import { OrderType } from "types/order";
const { cert } = require("firebase-admin/app");
const { getFirestore } = require("firebase-admin/firestore");
const serviceAccount = require("../../../nextjs-ec-app-firebase-adminsdk.json");
const admin = require("firebase-admin");

type Data =
  | {
      items: CartItemType[];
      orderAt: Date;
      order_id: string;
    }[]
  | null;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  //初期化する
  if (admin.apps.length === 0) {
    admin.initializeApp({
      credential: cert(serviceAccount),
    });
  }

  const COLLECTION_NAME = "order";
  const MAINCOLLECTION_NAME = "users";
  const SUBCOLLECTION_NAME = "cart";
  const db = getFirestore();
  const orderCollection = db.collection(COLLECTION_NAME);
  const usersCollection = db.collection(MAINCOLLECTION_NAME);

  const { method } = req;

  switch (method) {
    case "GET":
      const orderSnapshot = await orderCollection
        .orderBy("orderAt", "desc")
        .get();
      const orders: OrderType[] = orderSnapshot.docs.map((doc: any) => {
        const order = { ...doc.data(), order_id: doc.id };
        return order;
      });
      const orderOfLoginUser = orders.filter(
        (order: OrderType) => order.uid === req.query.uid
      );
      const orderItemsOfLoginUser = orderOfLoginUser.map((order: OrderType) => {
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
