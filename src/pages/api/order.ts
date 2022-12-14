// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { CartItemType } from "types/item";
import { OrderType } from "types/order";
const { cert } = require("firebase-admin/app");
const { getFirestore } = require("firebase-admin/firestore");
const serviceAccount = require("../../../nextjs-ec-app-firebase-adminsdk.json");
const admin = require("firebase-admin");

type Data = OrderType[] | null;

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
      const snapshot = await orderCollection.get();
      const orders = snapshot.docs.map((doc: any) => {
        const order = doc.data();
        return order;
      });
      res.status(200).json(orders);
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
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/cart?uid=${req.body.uid}`
      );
      const cartItems: CartItemType[] = await response.json();

      const subCollection = usersCollection
        .doc(req.body.uid)
        .collection(SUBCOLLECTION_NAME);

      cartItems.forEach(async (CartItem: CartItemType) => {
        await subCollection.doc(CartItem.documentid).delete();
      });

      res.status(200).end();
      break;

    default:
      res.status(405).end();
      break;
  }
}
