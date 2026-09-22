import "server-only";

import type Stripe from "stripe";

import { prisma } from "../prisma";

const DAY_MS = 86_400_000;

/**
 * Apply a Stripe Checkout Session to its Purchase row. Idempotent: called from
 * the payment-success confirmation and the webhook, in any order, any number of
 * times. A PAID purchase is never downgraded.
 */
export async function settleCheckoutSession(session: Stripe.Checkout.Session) {
  const paid = session.payment_status === "paid";
  if (!paid && session.status !== "expired") return null;

  const existing = await prisma.purchase.findUnique({ where: { stripeSessionId: session.id } });
  if (existing?.status === "PAID") return existing;

  const status = paid ? "PAID" : "EXPIRED";
  const customerEmail = session.customer_details?.email?.trim().toLowerCase() ?? existing?.customerEmail ?? null;
  const customerName = session.customer_details?.name?.trim() || existing?.customerName || null;
  const startsAt = paid ? new Date() : (existing?.startsAt ?? null);

  const packageId = existing?.packageId ?? Number(session.metadata?.packageId);
  if (!Number.isInteger(packageId)) return null;
  const pkg = await prisma.package.findUnique({ where: { id: packageId }, select: { durationDays: true } });
  if (!pkg) return null;
  const expiresAt = paid && pkg.durationDays ? new Date(startsAt!.getTime() + pkg.durationDays * DAY_MS) : (existing?.expiresAt ?? null);

  if (existing) {
    return prisma.purchase.update({ where: { id: existing.id }, data: { status, customerEmail, customerName, startsAt, expiresAt } });
  }

  // The pending row failed to save when checkout started: rebuild it from metadata.
  if (session.amount_total == null) return null;
  return prisma.purchase.create({
    data: {
      packageId,
      customerEmail,
      customerName,
      amount: session.amount_total / 100,
      currency: (session.currency ?? "gbp").toUpperCase(),
      status,
      stripeSessionId: session.id,
      startsAt,
      expiresAt,
    },
  });
}
