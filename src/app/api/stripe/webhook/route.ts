import { NextResponse } from "next/server";
import Stripe from "stripe";

import { settleCheckoutSession } from "@/src/lib/packages/purchases";
import { stripeSecretKey } from "@/src/lib/server/services";

export const runtime = "nodejs";

/**
 * Keeps purchases accurate when the customer never returns to /payment-success.
 * Point a Stripe webhook at /api/stripe/webhook (events: checkout.session.completed,
 * checkout.session.async_payment_succeeded, checkout.session.expired) and set
 * STRIPE_WEBHOOK_SECRET to its signing secret.
 */
export async function POST(request: Request) {
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  const signature = request.headers.get("stripe-signature");
  if (!secret) return NextResponse.json({ error: "Webhook is not configured." }, { status: 501 });
  if (!signature) return NextResponse.json({ error: "Missing signature." }, { status: 400 });

  let event: Stripe.Event;
  try {
    event = new Stripe(stripeSecretKey()).webhooks.constructEvent(await request.text(), signature, secret);
  } catch {
    return NextResponse.json({ error: "Invalid signature." }, { status: 400 });
  }

  if (
    event.type === "checkout.session.completed" ||
    event.type === "checkout.session.async_payment_succeeded" ||
    event.type === "checkout.session.expired"
  ) {
    try {
      await settleCheckoutSession(event.data.object);
    } catch (error) {
      console.error("Webhook purchase update failed", error);
      return NextResponse.json({ error: "Failed to record purchase." }, { status: 500 });
    }
  }

  return NextResponse.json({ received: true });
}
