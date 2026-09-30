import "server-only";

import jwt, { type JwtPayload } from "jsonwebtoken";
import { cookies } from "next/headers";

export const SESSION_COOKIE_NAME = "visualytes_session";

export type Role = "ADMIN" | "EDITOR" | "USER";
const ROLES: readonly Role[] = ["ADMIN", "EDITOR", "USER"];

export type SessionUser = {
  id: number;
  email: string;
  name: string;
  role: Role;
};

/** Only ADMIN accounts may use the admin panel; every other role is a client (SEO questionnaire only). */
export const isAdminRole = (role: Role | undefined | null) => role === "ADMIN";

function getSessionSecret() {
  const secret = process.env.SESSION_SECRET;
  if (!secret) throw new Error("SESSION_SECRET is not configured.");
  return secret;
}

export function createSessionToken(user: SessionUser) {
  return jwt.sign(user, getSessionSecret(), { expiresIn: "8h" });
}

export function getSessionFromToken(token: string): SessionUser | null {
  try {
    const payload = jwt.verify(token, getSessionSecret()) as JwtPayload;
    if (
      typeof payload.id !== "number" ||
      typeof payload.email !== "string" ||
      typeof payload.name !== "string" ||
      !ROLES.includes(payload.role)
    ) return null;

    return { id: payload.id, email: payload.email, name: payload.name, role: payload.role };
  } catch {
    return null;
  }
}

export async function getCurrentSession(): Promise<SessionUser | null> {
  const token = (await cookies()).get(SESSION_COOKIE_NAME)?.value;
  return token ? getSessionFromToken(token) : null;
}
