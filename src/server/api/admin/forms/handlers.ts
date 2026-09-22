import { NextResponse } from "next/server";
import { z } from "zod";

import { isAdmin } from "../../../../lib/admin";
import { checkFormRules, fieldsSchema, listForms } from "../../../../lib/forms/server";
import { prisma } from "../../../../lib/prisma";

const formSchema = z.object({ key: z.string().trim().min(1).max(80), title: z.string().trim().min(2).max(120), fields: fieldsSchema, isActive: z.boolean() });

export async function GET() {
  if (!(await isAdmin())) return NextResponse.json({ message: "Unauthorized" }, { status: 403 });
  const [forms, submissions] = await Promise.all([
    listForms(),
    prisma.formSubmission.findMany({ orderBy: { createdAt: "desc" }, take: 500, select: { id: true, formKey: true, name: true, email: true, data: true, createdAt: true } }),
  ]);
  return NextResponse.json({ forms, submissions });
}

export async function PATCH(request: Request) {
  if (!(await isAdmin())) return NextResponse.json({ message: "Unauthorized" }, { status: 403 });
  const parsed = formSchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ message: parsed.error.issues[0]?.message ?? "Invalid form configuration." }, { status: 400 });

  const { key, ...data } = parsed.data;
  const problem = checkFormRules(key, data.fields);
  if (problem) return NextResponse.json({ message: problem }, { status: 400 });

  const existing = await prisma.formDefinition.findUnique({ where: { key }, select: { id: true } });
  if (!existing) return NextResponse.json({ message: "Form not found." }, { status: 404 });
  const form = await prisma.formDefinition.update({ where: { key }, data });
  return NextResponse.json(form);
}
