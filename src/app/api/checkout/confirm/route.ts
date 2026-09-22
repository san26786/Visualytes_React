import { NextResponse } from "next/server";
import Stripe from "stripe";

import { settleCheckoutSession } from "@/src/lib/packages/purchases";
import { stripeSecretKey } from "@/src/lib/server/services";

export const runtime = "nodejs";

/**
 * Called by /payment-success. The client only supplies a session id; whether it
 * was paid is read back from Stripe, so this cannot be used to fake a purchase.
 */
export async function POST(request: Request) {
  const body: unknown = await request.json().catch(() => null);
  const sessionId = body && typeof body === "object" ? (body as Record<string, unknown>).sessionId : null;
  if (typeof sessionId !== "string" || !/^cs_[A-Za-z0-9_]{10,200}$/.test(sessionId)) {
    return NextResponse.json({ error: "Invalid session." }, { status: 400 });
  }

  try {
    const session = await new Stripe(stripeSecretKey()).checkout.sessions.retrieve(sessionId);
    const purchase = await settleCheckoutSession(session);
    return NextResponse.json({ status: purchase?.status ?? "PENDING" });
  } catch (error) {
    console.error("Checkout confirmation failed", error);
    return NextResponse.json({ error: "Unable to confirm payment." }, { status: 500 });
  }
}
