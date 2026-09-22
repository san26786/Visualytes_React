import { NextResponse } from "next/server";

import { isAdmin } from "@/src/lib/admin";
import { errorResponse, invalidResponse, updateServiceSchema } from "@/src/lib/services/api";
import { deleteService, getService, updateService, type ServiceInput } from "@/src/lib/services/server";

export const dynamic = "force-dynamic";

type Context = { params: Promise<{ slug: string }> };

export async function GET(_request: Request, context: Context) {
  if (!(await isAdmin())) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 403 });
  }

  const { slug } = await context.params;
  try {
    const service = await getService(slug);
    if (!service) return NextResponse.json({ message: "Service not found." }, { status: 404 });
    return NextResponse.json(service);
  } catch (error) {
    return errorResponse(error, "Failed to load service.");
  }
}

export async function PATCH(request: Request, context: Context) {
  if (!(await isAdmin())) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 403 });
  }

  const { slug } = await context.params;
  const parsed = updateServiceSchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) return invalidResponse(parsed.error);

  try {
    return NextResponse.json(await updateService(slug, parsed.data as Partial<ServiceInput>));
  } catch (error) {
    return errorResponse(error, "Failed to update service.");
  }
}

export async function DELETE(_request: Request, context: Context) {
  if (!(await isAdmin())) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 403 });
  }

  const { slug } = await context.params;
  try {
    await deleteService(slug);
    return NextResponse.json({ success: true });
  } catch (error) {
    return errorResponse(error, "Failed to delete service.");
  }
}
