import bcrypt from "bcrypt";
import { NextResponse } from "next/server";
import { z } from "zod";

import { isAdmin } from "../../../../lib/admin";
import { prisma } from "../../../../lib/prisma";

const userSchema = z.object({ name: z.string().trim().min(2).max(120), email: z.string().trim().email(), password: z.string().min(8).max(128) });

export async function GET() {
  if (!(await isAdmin())) return NextResponse.json({ message: "Unauthorized" }, { status: 403 });
  const users = await prisma.user.findMany({ select: { id: true, name: true, email: true, createdAt: true }, orderBy: { createdAt: "desc" } });
  return NextResponse.json(users);
}

export async function POST(request: Request) {
  if (!(await isAdmin())) return NextResponse.json({ message: "Unauthorized" }, { status: 403 });
  const parsed = userSchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ message: "Enter a name, valid email, and password of at least 8 characters." }, { status: 400 });
  try {
    const user = await prisma.user.create({ data: { name: parsed.data.name, email: parsed.data.email.toLowerCase(), password: await bcrypt.hash(parsed.data.password, 10), role: "EDITOR" }, select: { id: true, name: true, email: true, createdAt: true } });
    return NextResponse.json(user, { status: 201 });
  } catch {
    return NextResponse.json({ message: "A user with that email already exists." }, { status: 409 });
  }
}
