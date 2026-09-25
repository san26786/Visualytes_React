import { NextResponse } from "next/server";

import { isAdmin } from "@/src/lib/admin";
import { FORM_KEY } from "@/src/lib/seo-questionnaire/config";
import { prisma } from "@/src/lib/prisma";

export async function DELETE(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!(await isAdmin())) return NextResponse.json({ message: "Unauthorized" }, { status: 403 });
  const id = Number((await params).id);
  if (!Number.isInteger(id)) return NextResponse.json({ message: "Invalid response." }, { status: 400 });
  await prisma.formSubmission.deleteMany({ where: { id, formKey: FORM_KEY } });
  return NextResponse.json({ success: true });
}
