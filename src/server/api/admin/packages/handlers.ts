import { NextResponse } from "next/server";

import { isAdmin } from "../../../../lib/admin";
import { getAdminPackagesOverview, toAdminPackage } from "../../../../lib/packages/queries";
import { packageInputSchema, toPackageData } from "../../../../lib/packages/schema";
import { prisma } from "../../../../lib/prisma";

export async function GET() {
  if (!(await isAdmin())) return NextResponse.json({ message: "Unauthorized" }, { status: 403 });
  return NextResponse.json(await getAdminPackagesOverview());
}

export async function POST(request: Request) {
  if (!(await isAdmin())) return NextResponse.json({ message: "Unauthorized" }, { status: 403 });
  const parsed = packageInputSchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json({ message: parsed.error.issues[0]?.message ?? "Invalid package details." }, { status: 400 });
  }
  try {
    const item = await prisma.package.create({ data: toPackageData(parsed.data) });
    return NextResponse.json(toAdminPackage(item), { status: 201 });
  } catch (error) {
    if ((error as { code?: string }).code === "P2002") {
      return NextResponse.json({ message: "A package or plan with that name already exists." }, { status: 409 });
    }
    console.error("Package create failed", error);
    return NextResponse.json({ message: "Unable to create this package." }, { status: 500 });
  }
}
