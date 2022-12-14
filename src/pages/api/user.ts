// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { OrderType } from "types/order";
import { User } from "types/user";
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

  const COLLECTION_NAME = "users";
  const db = getFirestore();
  const usersCollection = db.collection(COLLECTION_NAME);

  const { method } = req;

  switch (method) {
    case "GET":
      if (req.query.uid) {
        const userDoc = await usersCollection.doc(req.query.uid).get();
        res.status(200).json(userDoc.data());
      } else {
        const snapshot = await usersCollection.get();
        const getUsers = snapshot.docs.map((doc: any) => {
          return { ...doc.data() };
        });
        res.status(200).json(getUsers);
      }
      break;

    case "POST":
      const docRef = usersCollection.doc(req.body.uid);
      const insertData: User = req.body;
      await docRef.set(insertData);
      res.status(200).end();
      break;

    default:
      res.status(405).end();
      break;
  }
}
