import { NextResponse } from "next/server";
import Stripe from "stripe";

interface Item {
  name: string;
  image: string;
  price: number;
  quantity: number;
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-02-24.acacia",
});

export async function POST(req: Request) {
  const { items } = (await req.json()) as { items: Item[] };

  const transformedItems = items.map((item: Item) => ({
    price_data: {
      currency: "usd",
      product_data: {
        name: item.name,
        images: [encodeURI(item.image)],
      },
      unit_amount: item.price,
    },
    quantity: item.quantity,
  }));

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    shipping_address_collection: {
      allowed_countries: ["US", "CA"],
    },
    line_items: transformedItems,
    mode: "payment",
    success_url: `${process.env.NEXT_PUBLIC_URL}/success`,
    cancel_url: `${process.env.NEXT_PUBLIC_URL}/canceled`,
  });

  return NextResponse.json({ id: session.id });
}
