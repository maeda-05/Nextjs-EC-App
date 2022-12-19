// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { CartItemType } from "types/item";
const { cert } = require("firebase-admin/app");
const { getFirestore } = require("firebase-admin/firestore");
const serviceAccount = require("../../../nextjs-ec-app-firebase-adminsdk.json");
const admin = require("firebase-admin");

type Data = CartItemType[] | null;

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

  const COLLECTION_NAME = "users";
  const SUBCOLLECTION_NAME = "cart";
  const db = getFirestore();
  const usersCollection = db.collection(COLLECTION_NAME);

  const { method } = req;

  switch (method) {
    case "POST":
      const docRef: any = usersCollection.doc(`${req.body.uid}`);
      const insertData: CartItemType = {
        ...req.body,
        incartAt: new Date(),
      };
      await docRef.collection(SUBCOLLECTION_NAME).doc().set(insertData);
      res.status(200).end();
      break;

    case "GET":
      const subCollection = usersCollection
        .doc(`${req.query.uid}`)
        .collection(SUBCOLLECTION_NAME);
      const snapshot = await subCollection.orderBy("incartAt", "asc").get();
      const getCart = (await snapshot).docs.map((doc: any) => {
        const cartData = doc.data();
        const jsDate = cartData.incartAt.toDate();
        return { ...cartData, documentid: doc.id, incartAt: jsDate };
      });
      res.status(200).json(getCart);
      break;

    case "DELETE":
      await usersCollection
        .doc(`${req.body.uid}`)
        .collection(SUBCOLLECTION_NAME)
        .doc(req.body.documentid)
        .delete();
      res.status(200).end();
      break;

    default:
      res.status(405).end();
      break;
  }
}
