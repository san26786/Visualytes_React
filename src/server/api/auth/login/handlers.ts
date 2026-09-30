import bcrypt from "bcrypt";
import { NextResponse } from "next/server";
import { z } from "zod";

import { createSessionToken, isAdminRole, SESSION_COOKIE_NAME, type SessionUser } from "../../../../lib/auth";
import { prisma } from "../../../../lib/prisma";

const credentialsSchema = z.object({
  email: z.string().trim().email(),
  password: z.string().min(1),
  /** "admin" = the /admin sign-in (ADMIN only); "client" = Client Login on /seo-questionnaire (non-admins only). */
  portal: z.enum(["admin", "client"]).default("client"),
});

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const credentials = credentialsSchema.safeParse(body);
  if (!credentials.success) {
    return NextResponse.json({ message: "Enter a valid email and password." }, { status: 400 });
  }

  const user = await prisma.user.findUnique({
    where: { email: credentials.data.email.toLowerCase() },
  });
  if (!user || !(await bcrypt.compare(credentials.data.password, user.password))) {
    return NextResponse.json({ message: "Invalid email or password." }, { status: 401 });
  }

  // Each sign-in page only accepts its own kind of account; no cookie is issued otherwise.
  const admin = isAdminRole(user.role);
  if (credentials.data.portal === "admin" && !admin) {
    return NextResponse.json({ message: "This account does not have admin access." }, { status: 403 });
  }
  if (credentials.data.portal === "client" && admin) {
    return NextResponse.json({ message: "Admin accounts sign in at /admin." }, { status: 403 });
  }

  const sessionUser: SessionUser = { id: user.id, email: user.email, name: user.name, role: user.role };
  const response = NextResponse.json({ role: user.role });
  response.cookies.set({
    name: SESSION_COOKIE_NAME,
    value: createSessionToken(sessionUser),
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 8,
  });
  return response;
}
