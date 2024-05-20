export const maxDuration = 60;
export const dynamic = "force-dynamic";

import stripe from "@/lib/stripe";
import { absoluteUrl } from "@/lib/utils";
import { User } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const body: {
    price: number;
    tokensAmount: number;
    user: User;
  } = await request.json();
  const { price, tokensAmount, user } = body;

  if (!price || !tokensAmount) {
    return new NextResponse("price or tokensAmount is missing", {
      status: 400,
    });
  }

  try {
    if (!user || !user.id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const stripeSession = await stripe.checkout.sessions.create({
      success_url: absoluteUrl("/platform/token-store"),
      cancel_url: absoluteUrl("/platform/token-store"),
      payment_method_types: ["card"],
      mode: "payment",
      billing_address_collection: "auto",
      customer_email: user.email!,
      line_items: [
        {
          price_data: {
            currency: "EUR",
            product_data: {
              name: `${tokensAmount} tokens`,
            },
            unit_amount: Number(price) * 100,
          },
          quantity: 1,
        },
      ],
      metadata: {
        userId: user.id,
        tokensAmount: tokensAmount,
      },
    });
    return new NextResponse(JSON.stringify({ url: stripeSession.url }));
  } catch (error) {
    console.log(error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
