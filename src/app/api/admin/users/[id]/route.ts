import bcrypt from "bcrypt";
import { NextResponse } from "next/server";
import { z } from "zod";

import { isAdmin } from "../../../../../lib/admin";
import { prisma } from "../../../../../lib/prisma";

const updateSchema = z.object({ name: z.string().trim().min(2).max(120), email: z.string().trim().email(), password: z.string().min(8).max(128).optional().or(z.literal("")) });

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!(await isAdmin())) return NextResponse.json({ message: "Unauthorized" }, { status: 403 });
  const parsed = updateSchema.safeParse(await request.json().catch(() => null));
  const id = Number((await params).id);
  if (!parsed.success || !Number.isInteger(id)) return NextResponse.json({ message: "Invalid user data." }, { status: 400 });
  try {
    const user = await prisma.user.update({ where: { id }, data: { name: parsed.data.name, email: parsed.data.email.toLowerCase(), ...(parsed.data.password ? { password: await bcrypt.hash(parsed.data.password, 10) } : {}) }, select: { id: true, name: true, email: true, createdAt: true } });
    return NextResponse.json(user);
  } catch { return NextResponse.json({ message: "Unable to update this user." }, { status: 400 }); }
}

export async function DELETE(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!(await isAdmin())) return NextResponse.json({ message: "Unauthorized" }, { status: 403 });
  const id = Number((await params).id);
  if (!Number.isInteger(id)) return NextResponse.json({ message: "Invalid user." }, { status: 400 });
  await prisma.user.delete({ where: { id } }).catch(() => null);
  return NextResponse.json({ success: true });
}
