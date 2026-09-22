import { NextResponse } from "next/server";
import Stripe from "stripe";

import { offers } from "@/src/app/packages/data/offer";
import { marketingPlans } from "@/src/app/end-to-end-digital-marketing-plans/data/data";
import { prisma } from "@/src/lib/prisma";
import { requiredText, ValidationError } from "@/src/lib/server/forms";
import { applicationUrl, stripeSecretKey } from "@/src/lib/server/services";

export const runtime = "nodejs";

type Checkout = { packageId: number | null; name: string; amount: number; currency: string };

/** Resolve what to charge from the database, never from the client. */
async function resolveCheckout(body: Record<string, unknown>): Promise<Checkout> {
  const id = Number(body.id);
  const name = typeof body.name === "string" ? body.name.trim() : "";
  if (!Number.isInteger(id) && !name) throw new ValidationError("Package is required.");

  // Until an admin has created any package, the bundled static list is what the
  // pages show, so it is what can be bought.
  if ((await prisma.package.count()) === 0) {
    const offer = [...offers, ...marketingPlans].find((item) => item.name === requiredText(name, "Package", { max: 120 }));
    if (!offer || !/^\d+$/.test(String(offer.price))) throw new ValidationError("Selected package is unavailable.");
    return { packageId: null, name: offer.name, amount: Number(offer.price), currency: "GBP" };
  }

  const pkg = Number.isInteger(id)
    ? await prisma.package.findUnique({ where: { id } })
    : await prisma.package.findUnique({ where: { name: requiredText(name, "Package", { max: 120 }) } });
  if (!pkg || !pkg.isActive || pkg.contactOnly) throw new ValidationError("Selected package is unavailable.");
  return { packageId: pkg.id, name: pkg.name, amount: Number(pkg.price), currency: pkg.currency };
}

export async function POST(request: Request) {
  try {
    const body: unknown = await request.json();
    if (!body || typeof body !== "object") throw new ValidationError("Invalid request body.");
    const checkout = await resolveCheckout(body as Record<string, unknown>);

    const unitAmount = Math.round(checkout.amount * 100);
    if (!Number.isSafeInteger(unitAmount) || unitAmount < 50) throw new Error("Invalid configured package price.");

    const stripe = new Stripe(stripeSecretKey());
    const siteUrl = applicationUrl();
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: [{
        price_data: {
          currency: checkout.currency.toLowerCase(),
          product_data: { name: checkout.name },
          unit_amount: unitAmount,
        },
        quantity: 1,
      }],
      metadata: checkout.packageId ? { packageId: String(checkout.packageId) } : undefined,
      success_url: `${siteUrl}/payment-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${siteUrl}/payment-cancel`,
    });

    if (!session.url) throw new Error("Stripe did not return a checkout URL.");

    if (checkout.packageId) {
      // Best effort: settleCheckoutSession rebuilds the row from metadata if this fails.
      await prisma.purchase
        .create({
          data: {
            packageId: checkout.packageId,
            amount: checkout.amount,
            currency: checkout.currency,
            status: "PENDING",
            stripeSessionId: session.id,
          },
        })
        .catch((error) => console.error("Unable to record pending purchase", error));
    }

    return NextResponse.json({ url: session.url });
  } catch (error) {
    if (error instanceof ValidationError) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
    console.error("Checkout session creation failed", error);
    return NextResponse.json({ error: "Unable to start checkout right now." }, { status: 500 });
  }
}
