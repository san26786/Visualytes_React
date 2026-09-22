import "server-only";

import { getCurrentSession } from "./auth";

export async function isAdmin() {
  return (await getCurrentSession())?.role === "ADMIN";
}

/** Blog / content management is open to both ADMIN and EDITOR roles. */
export async function getContentManager() {
  const session = await getCurrentSession();
  return session && (session.role === "ADMIN" || session.role === "EDITOR")
    ? session
    : null;
}
