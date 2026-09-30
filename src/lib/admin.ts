import "server-only";

import { getCurrentSession, isAdminRole } from "./auth";

export async function isAdmin() {
  return isAdminRole((await getCurrentSession())?.role);
}

/** Blog / content management - ADMIN only (client accounts never reach the admin panel). */
export async function getContentManager() {
  const session = await getCurrentSession();
  return session && isAdminRole(session.role) ? session : null;
}
