/** Client-safe DTOs shared by the admin panel, the API routes and the public pages. */

export type PackageKind = "PACKAGE" | "PLAN";
export type PurchaseStatus = "PENDING" | "PAID" | "EXPIRED" | "CANCELLED";

/** A bullet on a website package card (/packages). */
export type PackageFeature = { name: string; disabled?: boolean };

/** A row inside a marketing plan group (/end-to-end-digital-marketing-plans). */
export type PlanFeature = { name: string; enabled: boolean; value?: string | null };
export type PlanGroup = { title: string; items: PlanFeature[] };

export type PackageStats = {
  /** Distinct e-mail addresses with at least one PAID order. */
  customers: number;
  /** Every order ever started, whatever its status. */
  orders: number;
  paidOrders: number;
  pendingOrders: number;
  revenue: number;
  lastPurchaseAt: string | null;
};

export type AdminPackage = {
  id: number;
  name: string;
  kind: PackageKind;
  category: string;
  description: string | null;
  price: number;
  currency: string;
  billingPeriod: string;
  durationDays: number | null;
  features: PackageFeature[];
  groups: PlanGroup[];
  contactOnly: boolean;
  productId: string | null;
  sortOrder: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  stats: PackageStats;
};

export type AdminPurchase = {
  id: number;
  packageId: number;
  packageName: string;
  packageKind: PackageKind;
  customerName: string | null;
  customerEmail: string | null;
  amount: number;
  currency: string;
  status: PurchaseStatus;
  startsAt: string | null;
  expiresAt: string | null;
  createdAt: string;
};

export type PackagesSummary = {
  revenue: number;
  paidOrders: number;
  customers: number;
  pendingOrders: number;
};

export type AdminPackagesResponse = {
  packages: AdminPackage[];
  purchases: AdminPurchase[];
  summary: PackagesSummary;
};

/** Payload the admin editor sends for create / update. */
export type PackageInput = {
  kind: PackageKind;
  name: string;
  category: string;
  description: string | null;
  price: number;
  currency: string;
  billingPeriod: string;
  durationDays: number | null;
  features: PackageFeature[];
  groups: PlanGroup[];
  contactOnly: boolean;
  productId: string | null;
  sortOrder: number;
  isActive: boolean;
};
