// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { QueryDocumentSnapshot, QuerySnapshot } from "firebase/firestore";
import type { NextApiRequest, NextApiResponse } from "next";
import { Item } from "types/item";
const { cert } = require("firebase-admin/app");
const { getFirestore } = require("firebase-admin/firestore");
const serviceAccount = require("../../../nextjs-ec-app-firebase-adminsdk.json");
const admin = require("firebase-admin");
import { itemsData } from "../../../data/itemdb";

type Data = Item[] | null;

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

  if (req.method === "GET") {
    const snapshot: Promise<QuerySnapshot<Item>> = await itemsCollection.get();
    const getItems = (await snapshot).docs.map((doc: QueryDocumentSnapshot<Item>) => {
      const item = doc.data();
      return item;
    });
    res.status(200).json(getItems);
  } else if (req.method === "POST") {
    itemsData.forEach(async (itemData) => {
      await itemsCollection.add(itemData);
    })
    res.status(200).end();
  }
  else {
    return res.status(405).end();
  }
}
