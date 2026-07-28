import { NextResponse } from "next/server";
import Stripe from "stripe";

import { offers } from "@/src/app/packages/data/offer";
import { marketingPlans } from "@/src/app/end-to-end-digital-marketing-plans/data/data";
import { requiredText, ValidationError } from "@/src/lib/server/forms";
import { applicationUrl, stripeSecretKey } from "@/src/lib/server/services";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const body: unknown = await request.json();
    if (!body || typeof body !== "object") throw new ValidationError("Invalid request body.");
    const offerName = requiredText((body as Record<string, unknown>).name, "Package", { max: 120 });
    const offer = [...offers, ...marketingPlans].find(
      ({ name }) => name === offerName
    );
    
    if (!offer || !/^\d+$/.test(String(offer.price))) {
      throw new ValidationError("Selected package is unavailable.");
    }
    
    const unitAmount = Number(offer.price) * 100;
    if (!Number.isSafeInteger(unitAmount) || unitAmount < 50) throw new Error("Invalid configured package price.");

    const stripe = new Stripe(stripeSecretKey());
    const siteUrl = applicationUrl();
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: [{
        price_data: {
          currency: "gbp",
          product_data: { name: offer.name },
          unit_amount: unitAmount,
        },
        quantity: 1,
      }],
      success_url: `${siteUrl}/payment-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${siteUrl}/payment-cancel`,
    });

    if (!session.url) throw new Error("Stripe did not return a checkout URL.");
    return NextResponse.json({ url: session.url });
  } catch (error) {
    if (error instanceof ValidationError) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
    console.error("Checkout session creation failed", error);
    return NextResponse.json({ error: "Unable to start checkout right now." }, { status: 500 });
  }
}
