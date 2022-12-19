// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { adminDB } from "../../firebase/server";
import type { NextApiRequest, NextApiResponse } from "next";
import { itemsData } from "../../../data/itemdb";

type Data = FirebaseFirestore.DocumentData[] | null;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const COLLECTION_NAME = "items";
  const itemsCollection = adminDB.collection(COLLECTION_NAME);

  if (req.method === "GET") {
    console.log(JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY as string));
    const snapshot = await itemsCollection.get();
    const getItems = snapshot.docs.map((doc) => {
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
