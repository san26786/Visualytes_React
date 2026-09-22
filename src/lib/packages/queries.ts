import "server-only";

import type { Package as PackageRow, Purchase as PurchaseRow } from "../../generated/prisma-admin";
import { marketingPlans } from "../../app/end-to-end-digital-marketing-plans/data/data";
import type { MarketingPlan } from "../../app/end-to-end-digital-marketing-plans/types";
import { offers, type Offer } from "../../app/packages/data/offer";
import { prisma } from "../prisma";
import type {
  AdminPackage,
  AdminPackagesResponse,
  AdminPurchase,
  PackageFeature,
  PackageInput,
  PackageStats,
  PlanGroup,
  PurchaseStatus,
} from "./types";

export const CONTACT_LABEL = "Contact Us";

// ── JSON column parsing (tolerant: rows may predate this shape) ──────────────

function asRecord(value: unknown): Record<string, unknown> | null {
  return value && typeof value === "object" && !Array.isArray(value) ? (value as Record<string, unknown>) : null;
}

export function parseFeatures(value: unknown): PackageFeature[] {
  if (!Array.isArray(value)) return [];
  return value.flatMap((entry): PackageFeature[] => {
    if (typeof entry === "string") return entry.trim() ? [{ name: entry.trim() }] : [];
    const record = asRecord(entry);
    if (!record || typeof record.name !== "string" || !record.name.trim()) return [];
    return [{ name: record.name, ...(record.disabled === true ? { disabled: true } : {}) }];
  });
}

export function parseGroups(value: unknown): PlanGroup[] {
  if (!Array.isArray(value)) return [];
  return value.flatMap((entry): PlanGroup[] => {
    const group = asRecord(entry);
    if (!group || typeof group.title !== "string" || !Array.isArray(group.items)) return [];
    const items = group.items.flatMap((raw) => {
      const item = asRecord(raw);
      if (!item || typeof item.name !== "string") return [];
      return [{ name: item.name, enabled: item.enabled !== false, value: typeof item.value === "string" && item.value ? item.value : null }];
    });
    return [{ title: group.title, items }];
  });
}

function formatPrice(value: unknown) {
  const amount = Number(value);
  return Number.isInteger(amount) ? String(amount) : amount.toFixed(2);
}

// ── Public pages ─────────────────────────────────────────────────────────────

/**
 * Website packages for /packages. Falls back to the bundled static list only
 * when the table has no PACKAGE rows at all (or the DB is unreachable), so the
 * page never renders empty; hiding every package in admin still hides them all.
 */
export async function getPublicOffers(): Promise<Offer[]> {
  try {
    const rows = await prisma.package.findMany({ where: { kind: "PACKAGE" }, orderBy: [{ sortOrder: "asc" }, { id: "asc" }] });
    if (rows.length === 0) return offers;
    return rows
      .filter((row) => row.isActive)
      .map((row) => ({
        id: row.id,
        name: row.name,
        price: row.contactOnly ? CONTACT_LABEL : formatPrice(row.price),
        features: parseFeatures(row.features),
      }));
  } catch (error) {
    console.error("Falling back to static packages:", error);
    return offers;
  }
}

/** Marketing plans for /end-to-end-digital-marketing-plans, same fallback rule. */
export async function getPublicPlans(): Promise<MarketingPlan[]> {
  try {
    const rows = await prisma.package.findMany({ where: { kind: "PLAN" }, orderBy: [{ sortOrder: "asc" }, { id: "asc" }] });
    if (rows.length === 0) return marketingPlans;
    return rows
      .filter((row) => row.isActive)
      .map((row) => {
        const groups = parseGroups(row.groups);
        return {
          id: row.id,
          name: row.name,
          price: Number(row.price),
          productId: row.productId ?? "",
          // The first group doubles as the card header list.
          keywords: groups[0]?.items ?? [],
          groups,
        };
      });
  } catch (error) {
    console.error("Falling back to static marketing plans:", error);
    return marketingPlans;
  }
}

// ── Admin ────────────────────────────────────────────────────────────────────

const EMPTY_STATS: PackageStats = { customers: 0, orders: 0, paidOrders: 0, pendingOrders: 0, revenue: 0, lastPurchaseAt: null };

export function toAdminPackage(row: PackageRow, stats: PackageStats = EMPTY_STATS): AdminPackage {
  return {
    id: row.id,
    name: row.name,
    kind: row.kind,
    category: row.category,
    description: row.description,
    price: Number(row.price),
    currency: row.currency,
    billingPeriod: row.billingPeriod,
    durationDays: row.durationDays,
    features: parseFeatures(row.features),
    groups: parseGroups(row.groups),
    contactOnly: row.contactOnly,
    productId: row.productId,
    sortOrder: row.sortOrder,
    isActive: row.isActive,
    createdAt: row.createdAt.toISOString(),
    updatedAt: row.updatedAt.toISOString(),
    stats,
  };
}

function toAdminPurchase(row: PurchaseRow & { package: { name: string; kind: AdminPackage["kind"] } }): AdminPurchase {
  return {
    id: row.id,
    packageId: row.packageId,
    packageName: row.package.name,
    packageKind: row.package.kind,
    customerName: row.customerName,
    customerEmail: row.customerEmail,
    amount: Number(row.amount),
    currency: row.currency,
    status: row.status as PurchaseStatus,
    startsAt: row.startsAt?.toISOString() ?? null,
    expiresAt: row.expiresAt?.toISOString() ?? null,
    createdAt: row.createdAt.toISOString(),
  };
}

/** Per-package order / customer / revenue figures, keyed by package id. */
async function getPackageStats(): Promise<Map<number, PackageStats>> {
  const [byStatus, paidCustomers] = await Promise.all([
    prisma.purchase.groupBy({ by: ["packageId", "status"], _count: { _all: true }, _sum: { amount: true }, _max: { createdAt: true } }),
    prisma.purchase.groupBy({ by: ["packageId", "customerEmail"], where: { status: "PAID", customerEmail: { not: null } } }),
  ]);

  const stats = new Map<number, PackageStats>();
  const entry = (id: number) => {
    let current = stats.get(id);
    if (!current) stats.set(id, (current = { ...EMPTY_STATS }));
    return current;
  };

  for (const row of byStatus) {
    const current = entry(row.packageId);
    current.orders += row._count._all;
    if (row.status === "PAID") {
      current.paidOrders += row._count._all;
      current.revenue += Number(row._sum.amount ?? 0);
    }
    if (row.status === "PENDING") current.pendingOrders += row._count._all;
    const last = row._max.createdAt?.toISOString() ?? null;
    if (last && (!current.lastPurchaseAt || last > current.lastPurchaseAt)) current.lastPurchaseAt = last;
  }
  for (const row of paidCustomers) entry(row.packageId).customers += 1;

  return stats;
}

export async function getAdminPackagesOverview(): Promise<AdminPackagesResponse> {
  const [rows, purchaseRows, stats, distinctCustomers] = await Promise.all([
    prisma.package.findMany({ orderBy: [{ kind: "asc" }, { sortOrder: "asc" }, { id: "asc" }] }),
    prisma.purchase.findMany({ include: { package: { select: { name: true, kind: true } } }, orderBy: { createdAt: "desc" }, take: 300 }),
    getPackageStats(),
    prisma.purchase.groupBy({ by: ["customerEmail"], where: { status: "PAID", customerEmail: { not: null } } }),
  ]);

  const packages = rows.map((row) => toAdminPackage(row, stats.get(row.id)));
  const summary = packages.reduce(
    (total, item) => ({
      ...total,
      revenue: total.revenue + item.stats.revenue,
      paidOrders: total.paidOrders + item.stats.paidOrders,
      pendingOrders: total.pendingOrders + item.stats.pendingOrders,
    }),
    { revenue: 0, paidOrders: 0, customers: distinctCustomers.length, pendingOrders: 0 },
  );

  return { packages, purchases: purchaseRows.map(toAdminPurchase), summary };
}

/** The editable fields of a stored row, in the shape the input schema validates. */
export function packageToInput(row: PackageRow): PackageInput {
  const item = toAdminPackage(row);
  return {
    kind: item.kind,
    name: item.name,
    category: item.category,
    description: item.description,
    price: item.price,
    currency: item.currency,
    billingPeriod: item.billingPeriod,
    durationDays: item.durationDays,
    features: item.features,
    groups: item.groups,
    contactOnly: item.contactOnly,
    productId: item.productId,
    sortOrder: item.sortOrder,
    isActive: item.isActive,
  };
}
