import { NextResponse } from "next/server";

import { isAdmin } from "../../../../../../lib/admin";
import { prisma } from "../../../../../../lib/prisma";

export async function DELETE(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!(await isAdmin())) return NextResponse.json({ message: "Unauthorized" }, { status: 403 });
  const id = Number((await params).id);
  if (!Number.isInteger(id)) return NextResponse.json({ message: "Invalid submission." }, { status: 400 });
  await prisma.formSubmission.delete({ where: { id } }).catch(() => null);
  return NextResponse.json({ success: true });
}
