// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { Item } from "types/item";

type Data = Item | { message: string } | null;

const fetchItems = async (id: string) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/items`);
  const items = await res.json();
  const targetItem = items.find((item: Item) => item.id === Number(id));
  return targetItem;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const id = req.query.id as string;
  const item: Promise<Item> = await fetchItems(id);

  if (req.method === "GET") {
    if (item) {
      res.status(200).json(await item);
    } else {
      res.status(400).json({ message: `Item id=${id} not found` });
    }
  } else {
    return res.status(405).end();
  }
}
