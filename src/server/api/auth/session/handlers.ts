import { NextResponse } from "next/server";

import { getCurrentSession } from "../../../../lib/auth";

/** GET /api/auth/session - who is signed in (used by the header's Client Login / Logout button). */
export async function GET() {
  const session = await getCurrentSession();
  return NextResponse.json(
    { user: session ? { name: session.name, role: session.role } : null },
    { headers: { "Cache-Control": "no-store" } }
  );
}
