import { NextResponse } from "next/server";

import { isAdmin } from "../../../../../lib/admin";
import { packageToInput, toAdminPackage } from "../../../../../lib/packages/queries";
import { packageInputSchema, toPackageData } from "../../../../../lib/packages/schema";
import { prisma } from "../../../../../lib/prisma";

type Context = { params: Promise<{ id: string }> };

/** Partial update: the body is merged over the stored row, then re-validated as a whole. */
export async function PATCH(request: Request, { params }: Context) {
  if (!(await isAdmin())) return NextResponse.json({ message: "Unauthorized" }, { status: 403 });
  const id = Number((await params).id);
  const body: unknown = await request.json().catch(() => null);
  if (!Number.isInteger(id) || !body || typeof body !== "object" || Array.isArray(body)) {
    return NextResponse.json({ message: "Invalid package details." }, { status: 400 });
  }

  const existing = await prisma.package.findUnique({ where: { id } });
  if (!existing) return NextResponse.json({ message: "Package not found." }, { status: 404 });

  // `kind` is fixed at creation: a package cannot become a plan.
  const parsed = packageInputSchema.safeParse({ ...packageToInput(existing), ...body, kind: existing.kind });
  if (!parsed.success) {
    return NextResponse.json({ message: parsed.error.issues[0]?.message ?? "Invalid package details." }, { status: 400 });
  }

  try {
    const item = await prisma.package.update({ where: { id }, data: toPackageData(parsed.data) });
    return NextResponse.json(toAdminPackage(item));
  } catch (error) {
    if ((error as { code?: string }).code === "P2002") {
      return NextResponse.json({ message: "A package or plan with that name already exists." }, { status: 409 });
    }
    console.error("Package update failed", error);
    return NextResponse.json({ message: "Unable to update this package." }, { status: 500 });
  }
}

export async function DELETE(_request: Request, { params }: Context) {
  if (!(await isAdmin())) return NextResponse.json({ message: "Unauthorized" }, { status: 403 });
  const id = Number((await params).id);
  if (!Number.isInteger(id)) return NextResponse.json({ message: "Invalid package." }, { status: 400 });

  // Orders are financial records: refuse to delete anything a customer has bought.
  const orders = await prisma.purchase.count({ where: { packageId: id } });
  if (orders > 0) {
    return NextResponse.json(
      { message: `This has ${orders} recorded order${orders === 1 ? "" : "s"} and cannot be deleted. Hide it instead to remove it from the website.` },
      { status: 409 },
    );
  }

  const removed = await prisma.package.delete({ where: { id } }).catch(() => null);
  if (!removed) return NextResponse.json({ message: "Package not found." }, { status: 404 });
  return NextResponse.json({ success: true });
}
