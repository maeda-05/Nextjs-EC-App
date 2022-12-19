// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { adminDB } from "../../firebase/server";
import type { NextApiRequest, NextApiResponse } from "next";
import { apiGetCartItemData, CartItemType } from "types/item";

type Data = apiGetCartItemData[] | null;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const COLLECTION_NAME = "users";
  const SUBCOLLECTION_NAME = "cart";
  const usersCollection = adminDB.collection(COLLECTION_NAME);

  const { method } = req;

  switch (method) {
    case "POST":
      const docRef = usersCollection.doc(`${req.body.uid}`);
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
      const getCart = snapshot.docs.map((doc) => {
        const cartData = doc.data() as CartItemType;
        const jsDate = cartData.incartAt.toDate();
        return { ...cartData, documentid: doc.id, incartAt: jsDate };
      });
      res.status(200).json(getCart);
      break;

    case "DELETE":
      await usersCollection
        .doc(`${req.body.uid}`)
        .collection(SUBCOLLECTION_NAME)
        .doc(`${req.body.documentid}`)
        .delete();
      res.status(200).end();
      break;

    default:
      res.status(405).end();
      break;
  }
}
