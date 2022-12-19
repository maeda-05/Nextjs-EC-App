// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { Item } from "types/item";
import { QueryDocumentSnapshot, QuerySnapshot } from "firebase/firestore";
const { cert } = require("firebase-admin/app");
const { getFirestore } = require("firebase-admin/firestore");
const serviceAccount = require("../../../../nextjs-ec-app-firebase-adminsdk.json");
const admin = require("firebase-admin");

type Data = Item | { message: string } | null;

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

  const COLLECTION_NAME = "items";
  const db = getFirestore();
  const itemsCollection = db.collection(COLLECTION_NAME);

  const id = req.query.id as string;
  const snapshot: Promise<QuerySnapshot<Item>> = await itemsCollection.get();
  const items = (await snapshot).docs.map(
    (doc: QueryDocumentSnapshot<Item>) => {
      const item = doc.data();
      return item;
    }
  );
  const item = items.find((item: Item) => item.id === Number(id));

  if (req.method === "GET") {
    if (item) {
      res.status(200).json(item);
    } else {
      res.status(400).json({ message: `Item id=${id} not found` });
    }
  } else {
    return res.status(405).end();
  }
}
