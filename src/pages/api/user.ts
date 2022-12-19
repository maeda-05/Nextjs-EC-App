// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { adminDB } from "../../firebase/server";
import type { NextApiRequest, NextApiResponse } from "next";
import { User } from "types/user";

type Data = User | User[] | null;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const COLLECTION_NAME = "users";
  const usersCollection = adminDB.collection(COLLECTION_NAME);

  const { method } = req;

  switch (method) {
    case "GET":
      if (req.query.uid) {
        // uidを指定してユーザー情報を取得
        const userDoc = await usersCollection.doc(`${req.query.uid}`).get();
        res.status(200).json(userDoc.data() as User);
      } else {
        // 全ユーザーを取得
        const snapshot = await usersCollection.get();
        const getUsers = snapshot.docs.map((doc) => {
          return { ...doc.data() as User };
        });
        res.status(200).json(getUsers);
      }
      break;

    case "POST":
      const docRef = usersCollection.doc(`${req.body.uid}`);
      const insertData: User = req.body;
      await docRef.set(insertData);
      res.status(200).end();
      break;

    default:
      res.status(405).end();
      break;
  }
}
