// Clean up + error handling
import stripe from "@/lib/stripe";
import prisma from "@/prisma/db";
import { NextResponse } from "next/server";
import type Stripe from "stripe";

export async function POST(request: Request) {
  const body = await request.text();
  const sig = request.headers.get("Stripe-Signature");

  if (!sig) {
    console.log("No signature");
    return NextResponse.json({ error: "No signature" }, { status: 400 });
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!,
    );
  } catch (error: any) {
    console.log(`Webhook signature verification failed.`, error.message);
    return new NextResponse(error.message, { status: 400 });
  }

  if (event.type !== "checkout.session.completed") {
    console.log(`Unhandled event type: ${event.type}`);
    return NextResponse.json({ received: true });
  }

  const session = event.data.object as Stripe.Checkout.Session;
  if (!session.metadata || !session.metadata.userId) {
    console.log("User id is required!");
    return new NextResponse("User id is required!", { status: 400 });
  }

  const user = await prisma.user.findUnique({
    where: { id: session.metadata.userId },
    select: {
      tokens: true,
    },
  });

  if (!user || !user.tokens) {
    console.log("User not found");
    return new NextResponse("User not found", { status: 404 });
  }

  await prisma.purchase.create({
    data: {
      userId: session.metadata.userId,
      priceInCents: Number(session.amount_total),
      tokensAmount: Number(session.metadata.tokensAmount),
      currency: session.currency!,
      email: session.customer_email!,
    },
  });

  await prisma.user.update({
    where: { id: session.metadata.userId },
    data: {
      tokens: Number(user.tokens) + Number(session.metadata.tokensAmount),
    },
  });
  console.log("User tokens were updated.");

  return NextResponse.json({ received: true });
}
