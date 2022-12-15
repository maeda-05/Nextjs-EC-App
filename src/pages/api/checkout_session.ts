// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";
import { CartItemType } from "types/item";

type Data =
  | { sessionURL: string | null }
  | {
      message: string;
    };

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method !== "POST") {
    return res.status(405).end();
  }
  try {
    const cartItems: CartItemType[] = JSON.parse(req.body);
    const lineItems = cartItems.map((cartItem: CartItemType) => {
      return {
      price: cartItem.stripe_id,
      quantity: cartItem.quantity,
    }})
    const stripe = new Stripe(process.env.STRIPE_API_KEY || "", {
      apiVersion: "2022-11-15",
      maxNetworkRetries: 3,
    });
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: lineItems,
      success_url: `${process.env.NEXT_PUBLIC_API_BASE_URL}/items/ordercomplete`,
      cancel_url: `${process.env.NEXT_PUBLIC_API_BASE_URL}/items/ordercancel`,
    });
    res.status(200).json({ sessionURL: session.url });
  } catch (error: any) {
    console.log(error);
    res.status(error.statusCode || 500).json({ message: error.message });
  }
}
