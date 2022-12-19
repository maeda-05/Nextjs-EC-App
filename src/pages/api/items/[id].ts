// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { adminDB } from "../../../firebase/server";

type Data = FirebaseFirestore.DocumentData | { message: string } | null;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const COLLECTION_NAME = "items";
  const itemsCollection = adminDB.collection(COLLECTION_NAME);

  const id = req.query.id as string;
  const snapshot = await itemsCollection.get();
  const items = snapshot.docs.map(
    (doc) => {
      const item = doc.data();
      return item;
    }
  );
  const item = items.find((item) => item.id === Number(id));

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
