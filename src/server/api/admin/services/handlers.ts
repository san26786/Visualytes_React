import { NextResponse } from "next/server";

import { isAdmin } from "@/src/lib/admin";
import { createServiceSchema, errorResponse, invalidResponse } from "@/src/lib/services/api";
import { createService, listServices, type ServiceInput } from "@/src/lib/services/server";

export const dynamic = "force-dynamic";

export async function GET() {
  if (!(await isAdmin())) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 403 });
  }

  try {
    return NextResponse.json({ services: await listServices() });
  } catch (error) {
    return errorResponse(error, "Failed to load services.");
  }
}

export async function POST(request: Request) {
  if (!(await isAdmin())) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 403 });
  }

  const parsed = createServiceSchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) return invalidResponse(parsed.error);

  try {
    const created = await createService(parsed.data as ServiceInput);
    return NextResponse.json(created, { status: 201 });
  } catch (error) {
    return errorResponse(error, "Failed to create service.");
  }
}
